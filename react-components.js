/**
 * BudgetBuddy — Module: React 19 Reactive UI & Component Suite
 * Developed by: Team Member 3 (Frontend Lead & React Specialist)
 * Scope: React 19 component hierarchy, useState/useMemo hooks, What-If simulator, and Quick Logger.
 */

(function () {
  'use strict';

  if (!window.React || !window.ReactDOM) {
    console.error('BudgetBuddy React: React or ReactDOM is not loaded.');
    return;
  }

  const { createElement: h, useState, useEffect, useMemo } = window.React;

  // Helper for Indian Currency formatting
  function formatCurrency(amount) {
    const val = parseFloat(amount) || 0;
    return '₹' + val.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  // =========================================================================
  // COMPONENT 1: Quick Expense Logger (React Component)
  // =========================================================================
  function QuickExpenseLogger({ onExpenseAdded }) {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Food');
    const [selectedAccount, setSelectedAccount] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState(null);

    // Retrieve active accounts and categories from BudgetBuddy modules
    const accounts = useMemo(() => {
      const list = window.BudgetBuddy?.Accounts?.getAccounts ? window.BudgetBuddy.Accounts.getAccounts() : [];
      return list.length > 0 ? list : [
        { id: 'acc_upi', name: 'GPay / UPI', icon: '📱' },
        { id: 'acc_cash', name: 'Cash In Hand', icon: '💵' },
        { id: 'acc_bank', name: 'HDFC Bank', icon: '🏛️' },
        { id: 'acc_card', name: 'Credit Card', icon: '💳' }
      ];
    }, []);

    const categories = useMemo(() => {
      const list = window.BudgetBuddy?.Accounts?.getCategories ? window.BudgetBuddy.Accounts.getCategories('expense') : [];
      return list.length > 0 ? list : [
        { id: 'cat_food', name: 'Food' },
        { id: 'cat_travel', name: 'Travel' },
        { id: 'cat_shopping', name: 'Shopping' },
        { id: 'cat_bills', name: 'Bills' },
        { id: 'cat_entertainment', name: 'Entertainment' },
        { id: 'cat_health', name: 'Health' },
        { id: 'cat_other_exp', name: 'Other Expense' }
      ];
    }, []);

    // Set initial account selection
    useEffect(() => {
      if (accounts.length > 0 && !selectedAccount) {
        setSelectedAccount(accounts[0].id);
      }
    }, [accounts, selectedAccount]);

    const quickAmounts = [100, 250, 500, 1000, 2000];

    const handleSubmit = (e) => {
      e.preventDefault();
      const parsedAmount = parseFloat(amount);

      if (!title.trim()) {
        setFeedback({ type: 'error', msg: 'Please enter an expense description.' });
        return;
      }

      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        setFeedback({ type: 'error', msg: 'Please enter a valid positive amount.' });
        return;
      }

      // 1. Check if user is logged in
      const currentUser = window.BudgetBuddy?.Auth?.getCurrentUser();
      if (!currentUser) {
        setFeedback({
          type: 'error',
          msg: 'Authentication Required: Please sign in (or click "Demo User" at top) before recording.'
        });
        return;
      }

      setIsSubmitting(true);

      try {
        const targetAccountId = selectedAccount || (accounts[0] ? accounts[0].id : 'acc_cash');

        // 2. Format transaction payload matching BudgetBuddy.Transactions.addTransaction
        const payload = {
          description: title.trim(),
          amount: parsedAmount,
          type: 'expense',
          category: category,
          accountId: targetAccountId,
          date: new Date().toISOString().split('T')[0],
          notes: 'Logged via React Quick Logger'
        };

        // 3. Call core transaction service
        if (window.BudgetBuddy?.Transactions?.addTransaction) {
          const res = window.BudgetBuddy.Transactions.addTransaction(payload);

          if (res && res.success) {
            setTitle('');
            setAmount('');
            setFeedback({
              type: 'success',
              msg: `✓ Recorded ${formatCurrency(parsedAmount)} for "${title.trim()}"!`
            });

            // Trigger global refresh across dashboard, budget meters, and recent feed
            if (window.BudgetBuddy?.App?.refreshAll) {
              window.BudgetBuddy.App.refreshAll();
            } else if (window.BudgetBuddy?.App?.refreshDashboard) {
              window.BudgetBuddy.App.refreshDashboard();
            }

            if (onExpenseAdded) onExpenseAdded();
          } else {
            setFeedback({
              type: 'error',
              msg: res?.message || 'Transaction could not be recorded.'
            });
          }
        } else {
          // Direct storage fallback
          const allTx = window.BudgetBuddy?.Storage?.get(window.BudgetBuddy.Storage.KEYS.TRANSACTIONS, []) || [];
          payload.id = 'tx_' + Date.now();
          payload.userId = currentUser.id;
          allTx.unshift(payload);
          window.BudgetBuddy?.Storage?.set(window.BudgetBuddy.Storage.KEYS.TRANSACTIONS, allTx);

          setTitle('');
          setAmount('');
          setFeedback({
            type: 'success',
            msg: `✓ Recorded ${formatCurrency(parsedAmount)} for "${title.trim()}"!`
          });

          if (window.BudgetBuddy?.App?.refreshAll) {
            window.BudgetBuddy.App.refreshAll();
          }
        }
      } catch (err) {
        console.error('Error in QuickExpenseLogger:', err);
        setFeedback({ type: 'error', msg: 'System error: ' + (err.message || 'Failed to record entry.') });
      } finally {
        setIsSubmitting(false);
        setTimeout(() => setFeedback(null), 4000);
      }
    };

    return h('div', { className: 'card react-card' },
      h('div', { className: 'card-heading' },
        h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
            h('span', { className: 'react-badge' }, '⚛ React 19 State'),
            h('h2', { style: { margin: 0, fontSize: '1.05rem', color: 'var(--ledger-green)' } }, 'Quick Expense Logger')
          ),
          h('span', { style: { fontSize: '0.78rem', color: '#666' } }, 'Instant Synchronization')
        )
      ),

      feedback && h('div', {
        className: feedback.type === 'error' ? 'notice-danger' : 'notice-success',
        style: {
          marginBottom: '12px',
          padding: '9px 12px',
          borderRadius: '6px',
          fontSize: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }
      }, feedback.msg),

      h('form', { onSubmit: handleSubmit },
        h('div', { className: 'form-group', style: { marginBottom: '10px' } },
          h('label', { style: { fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '4px' } }, 'Description / Title'),
          h('input', {
            type: 'text',
            value: title,
            onChange: (e) => setTitle(e.target.value),
            placeholder: 'e.g. Afternoon Coffee, Grocery run, Bus pass',
            required: true,
            style: { width: '100%', padding: '9px 10px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '0.9rem' }
          })
        ),

        h('div', { style: { display: 'flex', gap: '10px', marginBottom: '10px' } },
          h('div', { style: { flex: 1 } },
            h('label', { style: { fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '4px' } }, 'Amount (₹)'),
            h('input', {
              type: 'number',
              step: '0.01',
              min: '1',
              value: amount,
              onChange: (e) => setAmount(e.target.value),
              placeholder: '250',
              required: true,
              style: { width: '100%', padding: '9px 10px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '0.9rem' }
            })
          ),
          h('div', { style: { flex: 1 } },
            h('label', { style: { fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '4px' } }, 'Category'),
            h('select', {
              value: category,
              onChange: (e) => setCategory(e.target.value),
              style: { width: '100%', padding: '9px 10px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '0.9rem', background: '#fff' }
            },
              categories.map((c) => h('option', { key: c.id || c.name, value: c.name }, `${c.icon || '🏷️'} ${c.name}`))
            )
          ),
          h('div', { style: { flex: 1 } },
            h('label', { style: { fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '4px' } }, 'Payment Account'),
            h('select', {
              value: selectedAccount,
              onChange: (e) => setSelectedAccount(e.target.value),
              style: { width: '100%', padding: '9px 10px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '0.9rem', background: '#fff' }
            },
              accounts.map((a) => h('option', { key: a.id, value: a.id }, `${a.icon || '💳'} ${a.name}`))
            )
          )
        ),

        // Quick amount presets
        h('div', { style: { marginBottom: '12px' } },
          h('span', { style: { fontSize: '0.75rem', color: '#666', marginRight: '6px' } }, 'Quick Presets:'),
          quickAmounts.map((q) =>
            h('button', {
              key: q,
              type: 'button',
              onClick: () => setAmount(String(q)),
              style: {
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                borderRadius: '14px',
                padding: '3px 9px',
                fontSize: '0.75rem',
                marginRight: '6px',
                cursor: 'pointer'
              }
            }, `+₹${q}`)
          )
        ),

        h('button', {
          type: 'submit',
          disabled: isSubmitting,
          className: 'primary-btn',
          style: { width: '100%', padding: '10px', fontSize: '0.92rem', fontWeight: 600 }
        }, isSubmitting ? 'Recording Entry...' : '⚡ Log Expense (React)')
      )
    );
  }

  // =========================================================================
  // COMPONENT 2: Interactive What-If Budget Simulator
  // =========================================================================
  function BudgetSimulator() {
    const [simulatedExtra, setSimulatedExtra] = useState(1500);
    const [selectedCategory, setSelectedCategory] = useState('Food');
    const [applyFeedback, setApplyFeedback] = useState(null);

    // Fetch live budget & expenses from BudgetBuddy modules
    const financialData = useMemo(() => {
      const budgetStatus = window.BudgetBuddy?.Budget?.getBudgetStatus ? window.BudgetBuddy.Budget.getBudgetStatus() : null;
      const budget = budgetStatus?.monthlyBudget || 20000;
      const actualSpent = budgetStatus?.monthlySpent || 0;

      return {
        budget: budget > 0 ? budget : 20000,
        actualSpent: actualSpent
      };
    }, []);

    const projectedSpent = financialData.actualSpent + simulatedExtra;
    const currentPercent = Math.min(100, Math.round((financialData.actualSpent / financialData.budget) * 100));
    const projectedPercent = Math.min(100, Math.round((projectedSpent / financialData.budget) * 100));
    const isOverBudget = projectedSpent > financialData.budget;
    const difference = financialData.budget - projectedSpent;

    const handleApplySimulation = () => {
      const currentUser = window.BudgetBuddy?.Auth?.getCurrentUser();
      if (!currentUser) {
        setApplyFeedback({ type: 'error', msg: 'Please sign in first to record simulated transactions.' });
        return;
      }

      if (simulatedExtra <= 0) {
        setApplyFeedback({ type: 'error', msg: 'Select a simulation amount greater than ₹0.' });
        return;
      }

      const payload = {
        description: `Simulated ${selectedCategory} Purchase`,
        amount: simulatedExtra,
        type: 'expense',
        category: selectedCategory,
        accountId: 'acc_upi',
        date: new Date().toISOString().split('T')[0],
        notes: 'Applied from React Budget Simulator'
      };

      if (window.BudgetBuddy?.Transactions?.addTransaction) {
        const res = window.BudgetBuddy.Transactions.addTransaction(payload);
        if (res && res.success) {
          setApplyFeedback({ type: 'success', msg: `✓ Committed ${formatCurrency(simulatedExtra)} to ledger!` });
          if (window.BudgetBuddy?.App?.refreshAll) {
            window.BudgetBuddy.App.refreshAll();
          }
        } else {
          setApplyFeedback({ type: 'error', msg: res?.message || 'Failed to commit entry.' });
        }
      }
      setTimeout(() => setApplyFeedback(null), 3500);
    };

    return h('div', { className: 'card react-card' },
      h('div', { className: 'card-heading' },
        h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' } },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
            h('span', { className: 'react-badge' }, '⚛ React useMemo'),
            h('h2', { style: { margin: 0, fontSize: '1.05rem', color: 'var(--ledger-green)' } }, 'Interactive Budget "What-If" Simulator')
          ),
          h('span', { style: { fontSize: '0.8rem', color: '#666' } }, `Monthly Cap: ${formatCurrency(financialData.budget)}`)
        )
      ),

      h('p', { style: { fontSize: '0.85rem', color: '#555', marginBottom: '14px' } },
        'Slide below to project how potential spending alters your budget threshold before spending money.'
      ),

      applyFeedback && h('div', {
        className: applyFeedback.type === 'error' ? 'notice-danger' : 'notice-success',
        style: { marginBottom: '10px', padding: '6px 12px', borderRadius: '6px', fontSize: '0.82rem' }
      }, applyFeedback.msg),

      // Interactive Slider
      h('div', { style: { marginBottom: '16px' } },
        h('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem' } },
          h('span', null, 'Simulate Spending for: ',
            h('select', {
              value: selectedCategory,
              onChange: (e) => setSelectedCategory(e.target.value),
              style: { padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--line)', marginLeft: '4px' }
            },
              ['Food', 'Travel', 'Shopping', 'Bills', 'Entertainment', 'Health'].map(c => h('option', { key: c, value: c }, c))
            )
          ),
          h('strong', { style: { color: 'var(--gold)' } }, formatCurrency(simulatedExtra))
        ),
        h('input', {
          type: 'range',
          min: '0',
          max: '10000',
          step: '100',
          value: simulatedExtra,
          onChange: (e) => setSimulatedExtra(parseFloat(e.target.value)),
          style: { width: '100%', accentColor: 'var(--gold)', cursor: 'pointer' }
        })
      ),

      // Dual Meter Progress Bar
      h('div', { style: { marginBottom: '12px' } },
        h('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#666', marginBottom: '4px' } },
          h('span', null, `Current: ${formatCurrency(financialData.actualSpent)} (${currentPercent}%)`),
          h('span', null, `Projected: ${formatCurrency(projectedSpent)} (${projectedPercent}%)`)
        ),
        h('div', { className: 'budget-bar-track', style: { height: '18px', position: 'relative' } },
          // Current Spent Fill
          h('div', {
            style: {
              height: '100%',
              width: `${currentPercent}%`,
              background: 'var(--gold)',
              transition: 'width 0.2s'
            }
          }),
          // Simulated Additional Fill
          h('div', {
            style: {
              height: '100%',
              width: `${Math.max(0, projectedPercent - currentPercent)}%`,
              background: isOverBudget ? 'var(--danger)' : 'var(--ledger-green-light)',
              opacity: 0.85,
              transition: 'all 0.2s'
            }
          })
        )
      ),

      // Status Card
      h('div', {
        style: {
          padding: '10px 14px',
          borderRadius: '6px',
          background: isOverBudget ? 'var(--danger-soft, #fde8e7)' : 'var(--income-soft, #e6f6ee)',
          borderLeft: `4px solid ${isOverBudget ? 'var(--danger)' : 'var(--income)'}`,
          fontSize: '0.86rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px'
        }
      },
        isOverBudget
          ? h('div', null,
              h('strong', { style: { color: 'var(--danger)' } }, '⚠ Warning: Over Budget! '),
              `Would exceed budget by `,
              h('strong', { style: { color: 'var(--danger)' } }, formatCurrency(Math.abs(difference)))
            )
          : h('div', null,
              h('strong', { style: { color: 'var(--income)' } }, '✓ Within Safe Threshold: '),
              `Retains `,
              h('strong', { style: { color: 'var(--income)' } }, formatCurrency(difference)),
              ` buffer`
            ),
        h('button', {
          type: 'button',
          onClick: handleApplySimulation,
          className: 'ghost-btn btn-sm',
          style: { padding: '4px 10px', fontSize: '0.78rem' }
        }, '+ Commit to Ledger')
      )
    );
  }

  // =========================================================================
  // COMPONENT 3: React Financial Health & Category Distribution
  // =========================================================================
  function ReactHealthDashboard() {
    const [tick, setTick] = useState(0);

    const metrics = useMemo(() => {
      const allTx = (window.BudgetBuddy?.Transactions?.getTransactions ? window.BudgetBuddy.Transactions.getTransactions() : null) ||
        (window.BudgetBuddy?.Storage?.get ? window.BudgetBuddy.Storage.get(window.BudgetBuddy.Storage.KEYS.TRANSACTIONS, []) : []);

      const totalIncome = allTx.filter(t => t.type === 'income').reduce((s, t) => s + (parseFloat(t.amount) || 0), 0);
      const totalExpense = allTx.filter(t => t.type === 'expense').reduce((s, t) => s + (parseFloat(t.amount) || 0), 0);
      const net = totalIncome - totalExpense;
      const savingsRate = totalIncome > 0 ? Math.max(0, Math.round((net / totalIncome) * 100)) : 0;

      // Group by category
      const catMap = {};
      allTx.filter(t => t.type === 'expense').forEach(t => {
        catMap[t.category] = (catMap[t.category] || 0) + (parseFloat(t.amount) || 0);
      });

      const categories = Object.entries(catMap)
        .map(([name, amount]) => ({ name, amount, pct: totalExpense > 0 ? Math.round((amount / totalExpense) * 100) : 0 }))
        .sort((a, b) => b.amount - a.amount);

      return { totalIncome, totalExpense, net, savingsRate, categories, count: allTx.length };
    }, [tick]);

    return h('div', { className: 'card react-card' },
      h('div', { className: 'card-heading', style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
          h('span', { className: 'react-badge' }, '⚛ React Live Engine'),
          h('h2', { style: { margin: 0, fontSize: '1.05rem', color: 'var(--ledger-green)' } }, 'Financial Health & Category Distribution')
        ),
        h('button', {
          type: 'button',
          onClick: () => setTick(t => t + 1),
          className: 'ghost-btn btn-sm',
          style: { padding: '3px 8px', fontSize: '0.75rem' }
        }, '↻ Recompute')
      ),

      h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '14px' } },
        h('div', { style: { background: 'var(--paper)', padding: '10px', borderRadius: '6px', textAlign: 'center' } },
          h('div', { style: { fontSize: '0.75rem', color: '#666' } }, 'Net Savings'),
          h('div', { style: { fontSize: '1.2rem', fontWeight: 700, color: metrics.net >= 0 ? 'var(--income)' : 'var(--danger)' } }, formatCurrency(metrics.net))
        ),
        h('div', { style: { background: 'var(--paper)', padding: '10px', borderRadius: '6px', textAlign: 'center' } },
          h('div', { style: { fontSize: '0.75rem', color: '#666' } }, 'Savings Rate'),
          h('div', { style: { fontSize: '1.2rem', fontWeight: 700, color: 'var(--gold)' } }, `${metrics.savingsRate}%`)
        ),
        h('div', { style: { background: 'var(--paper)', padding: '10px', borderRadius: '6px', textAlign: 'center' } },
          h('div', { style: { fontSize: '0.75rem', color: '#666' } }, 'Recorded Entries'),
          h('div', { style: { fontSize: '1.2rem', fontWeight: 700, color: 'var(--ledger-green)' } }, metrics.count)
        )
      ),

      h('h3', { style: { fontSize: '0.88rem', color: 'var(--ledger-green)', marginBottom: '8px' } }, 'Top Expense Outflows'),
      metrics.categories.length === 0
        ? h('p', { className: 'empty-hint', style: { padding: '10px 0' } }, 'No expense distributions recorded yet.')
        : h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
            metrics.categories.slice(0, 5).map(cat =>
              h('div', { key: cat.name },
                h('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '3px' } },
                  h('span', null, h('span', { className: 'category-tag' }, cat.name)),
                  h('strong', null, `${formatCurrency(cat.amount)} (${cat.pct}%)`)
                ),
                h('div', { style: { height: '6px', background: '#e9e4d5', borderRadius: '3px', overflow: 'hidden' } },
                  h('div', { style: { height: '100%', width: `${cat.pct}%`, background: 'var(--gold)' } })
                )
              )
            )
          )
    );
  }

  // =========================================================================
  // MOUNT INITIALIZATION
  // =========================================================================
  function initReactComponents() {
    // 1. Mount Quick Expense Logger on Dashboard
    const quickMount = document.getElementById('react-quick-logger-mount');
    if (quickMount && !quickMount.dataset.mounted) {
      const root = window.ReactDOM.createRoot(quickMount);
      root.render(h(QuickExpenseLogger));
      quickMount.dataset.mounted = 'true';
    }

    // 2. Mount Budget Simulator on Dashboard
    const simMount = document.getElementById('react-budget-simulator-mount');
    if (simMount && !simMount.dataset.mounted) {
      const root = window.ReactDOM.createRoot(simMount);
      root.render(h(BudgetSimulator));
      simMount.dataset.mounted = 'true';
    }

    // 3. Mount Full Health Dashboard in React Tab
    const labMount = document.getElementById('react-lab-mount');
    if (labMount && !labMount.dataset.mounted) {
      const root = window.ReactDOM.createRoot(labMount);
      root.render(h('div', { style: { display: 'grid', gridTemplateColumns: '1.1fr 1.3fr', gap: '20px' } },
        h(QuickExpenseLogger),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '20px' } },
          h(BudgetSimulator),
          h(ReactHealthDashboard)
        )
      ));
      labMount.dataset.mounted = 'true';
    }
  }

  // Expose to BudgetBuddy namespace
  window.BudgetBuddy = window.BudgetBuddy || {};
  window.BudgetBuddy.React = {
    init: initReactComponents,
    QuickExpenseLogger,
    BudgetSimulator,
    ReactHealthDashboard
  };

  // Auto-init when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReactComponents);
  } else {
    initReactComponents();
  }
})();

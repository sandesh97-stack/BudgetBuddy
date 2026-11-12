# BudgetBuddy — 3-Member Team Project Division & Work Allocation

This document outlines the architectural division of the **BudgetBuddy** JavaScript codebase among **3 team members** for project reports, code repository attribution, and viva/defense presentations.

---

## 🏛️ Team Architecture Overview

```
                                 [ BudgetBuddy Application ]
                                              │
         ┌────────────────────────────────────┼────────────────────────────────────┐
         │                                    │                                    │
  [ Member 1 ]                         [ Member 2 ]                         [ Member 3 ]
Core Architecture & Security         Financial & Ledger Engine            React 19 & UX Lead
  • Data Persistence (Storage)         • Transaction Engine                 • React 19 Components
  • Authentication & Roles             • Multi-Account Balance Sync         • Interactive Budget Simulator
  • Admin Governance Console           • Budget Limit Engine                • Single Page App Controller
  • Settings & Backup/Restore          • Recurring Bill Scheduler           • Analytics & Visual Metrics
```

---

## 👤 Member 1: Core Architecture, Authentication & Security Engineer

### Scope of Work:
Responsible for the system foundation, local-first data architecture, role-based security, and administrative oversight.

### Assigned Files:
1. [`js/storage.js`](file:///C:/Users/jaswa/.gemini/antigravity/scratch/paisatrack/js/storage.js) (~11.5 KB)
   - **Key Responsibilities**:
     - Built the central `BudgetBuddy.Storage` engine managing browser `localStorage`.
     - Created schema keys (`USERS`, `TRANSACTIONS`, `ACCOUNTS`, `CATEGORIES`, `BUDGETS`, `RECURRING`, `SETTINGS`, `LOGS`).
     - Engineered initial realistic seed data generator for instant offline evaluation.
     - Implemented the system-wide audit logging mechanism (`logAudit()`).
2. [`js/auth.js`](file:///C:/Users/jaswa/.gemini/antigravity/scratch/paisatrack/js/auth.js) (~4.3 KB)
   - **Key Responsibilities**:
     - Session management and authentication lifecycle (`login`, `logout`, `getCurrentUser`, `isAuthenticated`).
     - Role-Based Access Control (RBAC) separating Standard Users from Faculty Administrators.
     - New user registration with credential validation and profile generation.
3. [`js/admin.js`](file:///C:/Users/jaswa/.gemini/antigravity/scratch/paisatrack/js/admin.js) (~8.3 KB)
   - **Key Responsibilities**:
     - Administrator control console: User management (activate/deactivate users, role toggle).
     - System-wide transaction volume tracking and aggregated metrics.
     - Security audit log explorer with chronological event history.
4. [`js/settings.js`](file:///C:/Users/jaswa/.gemini/antigravity/scratch/paisatrack/js/settings.js) (~4.5 KB)
   - **Key Responsibilities**:
     - Light/Dark mode theme engine with CSS variable switching.
     - User profile updater (avatar, name, currency symbol).
     - JSON database export and backup restoration engine.

### 🎙️ Presentation / Viva Speaking Script:
> *"I designed and implemented the foundational data architecture and security layer of BudgetBuddy. I built the localStorage persistence engine with schema management and auto-seeding. I developed the Role-Based Access Control system that isolates regular personal finance users from administrator accounts, built the system audit logger to track every database mutation, and engineered the complete JSON backup and theme customization modules."*

---

## 👤 Member 2: Financial Business Logic & Ledger Systems Engineer

### Scope of Work:
Responsible for the mathematical calculations, double-entry balance synchronization, transaction filtering, and automated bill scheduling.

### Assigned Files:
1. [`js/transactions.js`](file:///C:/Users/jaswa/.gemini/antigravity/scratch/paisatrack/js/transactions.js) (~6.7 KB)
   - **Key Responsibilities**:
     - Core CRUD operations for financial records (`addTransaction`, `updateTransaction`, `deleteTransaction`).
     - Double-entry balance adjustment: automatically adjusts the balance of the designated account on every debit or credit.
     - Multi-parameter filtering engine: filter by type (income/expense), category, account, date range, and keyword search.
2. [`js/accounts.js`](file:///C:/Users/jaswa/.gemini/antigravity/scratch/paisatrack/js/accounts.js) (~4.7 KB)
   - **Key Responsibilities**:
     - Multi-account management (`acc_cash`, `acc_bank`, `acc_upi`, `acc_card`).
     - Dynamic balance tracking across accounts.
     - Category registry operations (add, edit, toggle expense and income categories).
3. [`js/budget.js`](file:///C:/Users/jaswa/.gemini/antigravity/scratch/paisatrack/js/budget.js) (~5.5 KB)
   - **Key Responsibilities**:
     - Monthly spending cap algorithms and category-level budget allocations.
     - Variance detection: percentage utilized calculation, warning triggers (80%+ threshold), and deficit calculation (`isOverBudget`).
4. [`js/recurring.js`](file:///C:/Users/jaswa/.gemini/antigravity/scratch/paisatrack/js/recurring.js) (~6.2 KB)
   - **Key Responsibilities**:
     - Automated recurring bill scheduler (subscriptions, rent, utilities).
     - Next due date calculator based on frequency (Weekly, Monthly, Yearly).
     - Upcoming payment deadline alerts and automated one-click settlement.

### 🎙️ Presentation / Viva Speaking Script:
> *"I developed the financial core and mathematical engine of BudgetBuddy. I engineered the transaction management system that automatically reconciles balances across multiple accounts (Cash, Bank, UPI, Credit Card) upon every expense or income. I implemented the multi-criteria transaction filtering engine, the budget threshold and deficit calculation algorithms, and the recurring subscription scheduler that tracks upcoming bills with automated due date projection."*

---

## 👤 Member 3: Frontend Lead, React 19 Specialist & Analytics Engineer

### Scope of Work:
Responsible for the client-side user experience, React 19 component hierarchy, real-time data visualization, and overall Single Page Application orchestration.

### Assigned Files:
1. [`js/react-components.js`](file:///C:/Users/jaswa/.gemini/antigravity/scratch/paisatrack/js/react-components.js) (~24.4 KB)
   - **Key Responsibilities**:
     - Integrated React 19 component architecture using declarative Hooks (`useState`, `useMemo`).
     - Built `<QuickExpenseLogger />` with preset quick-chips (`+₹100`, `+₹250`, etc.) and bi-directional storage synchronization.
     - Built `<BudgetSimulator />`: an interactive 'What-If' spending slider with real-time deficit projection and dual-meter progress bars.
     - Built `<ReactHealthDashboard />`: real-time financial health and category distribution meters.
2. [`js/analytics.js`](file:///C:/Users/jaswa/.gemini/antigravity/scratch/paisatrack/js/analytics.js) (~10.0 KB)
   - **Key Responsibilities**:
     - Financial analytics aggregation (monthly inflow vs outflow comparison).
     - Category breakdown percentage calculator and top spending drivers.
     - Report data preparation for CSV / statement export.
3. [`js/user.js`](file:///C:/Users/jaswa/.gemini/antigravity/scratch/paisatrack/js/user.js) (~3.5 KB)
   - **Key Responsibilities**:
     - High-level financial summary calculation (Net Balance, Total Inflow, Total Outflow, Savings Rate %).
     - Recent transaction stream extraction with chronological sorting.
4. [`js/app.js`](file:///C:/Users/jaswa/.gemini/antigravity/scratch/paisatrack/js/app.js) (~46.6 KB)
   - **Key Responsibilities**:
     - Single Page Application (SPA) tab controller and routing (`switchTab`, `showTab`).
     - Modal window lifecycle management (open, close, escape key listener).
     - Toast notification system and global DOM event delegation.
     - Re-mounting and synchronizing React 19 components with the dashboard.

### 🎙️ Presentation / Viva Speaking Script:
> *"I was responsible for the frontend architecture, Single Page Application routing, and modern React 19 integration. I built the React 19 component layer using useState and useMemo, specifically the interactive 'What-If' Budget Simulator that lets users test future spending before making purchases, and the Quick Expense Logger. I developed the SPA tab switching system, the modal and toast notification controllers, and the financial analytics visualization engine."*

---

## 📊 Summary Table for Evaluation

| Team Member | Title | Key JS Modules | Primary Technical Skills Demonstrated |
| :--- | :--- | :--- | :--- |
| **Member 1** | Data Architect & Security Engineer | `storage.js`, `auth.js`, `admin.js`, `settings.js` | LocalStorage Engine, Session Lifecycle, RBAC Security, Audit Logging, JSON Backup |
| **Member 2** | Financial Logic & Ledger Systems Engineer | `transactions.js`, `accounts.js`, `budget.js`, `recurring.js` | Double-entry Reconciler, Multi-account Balancer, Filter Engine, Budget Variance Math, Recurring Scheduler |
| **Member 3** | Frontend Lead & React Specialist | `react-components.js`, `analytics.js`, `user.js`, `app.js` | React 19 Hooks (`useState`, `useMemo`), SPA Tab Navigation, Interactive Sliders, Metric Visualization |

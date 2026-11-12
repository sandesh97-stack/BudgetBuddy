const pptxgen = require('pptxgenjs');
const path = require('path');

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.author = 'BudgetBuddy Engineering';
pres.company = 'BudgetBuddy';
pres.title = 'BudgetBuddy — Classical Ledger Expense Tracker';

// Color Palette
const COLORS = {
  ink: '1C2B23',
  paper: 'F6F4EE',
  ledgerGreen: '16382C',
  ledgerGreenLight: '23503F',
  gold: 'C99A3B',
  goldSoft: 'E9D6A8',
  danger: 'A4342A',
  line: 'D8D2C2',
  white: 'FFFFFF',
  grayText: '60665D'
};

// Helper: Content Slide Template with Header & Footer
function createContentSlide(slideNumber, category, title) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.paper };

  // Top Ledger Bar
  slide.addShape(pres.ShapeType.rect, {
    x: 0,
    y: 0,
    w: '100%',
    h: 0.85,
    fill: { color: COLORS.ledgerGreen },
    line: { color: COLORS.ledgerGreen }
  });

  // Gold accent strip below top bar
  slide.addShape(pres.ShapeType.rect, {
    x: 0,
    y: 0.85,
    w: '100%',
    h: 0.05,
    fill: { color: COLORS.gold },
    line: { color: COLORS.gold }
  });

  // Topbar Brand Mark & Category
  slide.addShape(pres.ShapeType.ellipse, {
    x: 0.45,
    y: 0.18,
    w: 0.45,
    h: 0.45,
    fill: { color: COLORS.gold }
  });

  slide.addText('₹', {
    x: 0.45,
    y: 0.18,
    w: 0.45,
    h: 0.45,
    fontSize: 14,
    bold: true,
    color: COLORS.ledgerGreen,
    align: 'center',
    valign: 'middle'
  });

  slide.addText('BudgetBuddy', {
    x: 1.0,
    y: 0.22,
    w: 2.2,
    h: 0.4,
    fontSize: 16,
    bold: true,
    color: COLORS.paper,
    fontFace: 'Segoe UI'
  });

  slide.addText(category.toUpperCase(), {
    x: 7.0,
    y: 0.28,
    w: 2.5,
    h: 0.3,
    fontSize: 9,
    bold: true,
    color: COLORS.goldSoft,
    align: 'right',
    fontFace: 'Segoe UI'
  });

  // Slide Title on Page
  slide.addText(title, {
    x: 0.5,
    y: 1.05,
    w: 9.0,
    h: 0.5,
    fontSize: 20,
    bold: true,
    color: COLORS.ledgerGreen,
    fontFace: 'Segoe UI'
  });

  // Bottom Footer
  slide.addShape(pres.ShapeType.line, {
    x: 0.5,
    y: 5.25,
    w: 9.0,
    h: 0,
    line: { color: COLORS.line, width: 1 }
  });

  slide.addText('BudgetBuddy — Classical Ledger Personal Finance & Expense Tracker', {
    x: 0.5,
    y: 5.3,
    w: 6.5,
    h: 0.25,
    fontSize: 8,
    color: COLORS.grayText,
    fontFace: 'Segoe UI'
  });

  slide.addText(`Slide ${slideNumber} of 8`, {
    x: 7.5,
    y: 5.3,
    w: 2.0,
    h: 0.25,
    fontSize: 8,
    color: COLORS.grayText,
    align: 'right',
    fontFace: 'Segoe UI'
  });

  return slide;
}

// ==========================================
// SLIDE 1: Title & Cover Slide
// ==========================================
{
  const slide = pres.addSlide();
  slide.background = { color: COLORS.ledgerGreen };

  // Decorative border
  slide.addShape(pres.ShapeType.rect, {
    x: 0.35,
    y: 0.35,
    w: 9.3,
    h: 4.925,
    fill: { type: 'none' },
    line: { color: COLORS.gold, width: 1.5 }
  });

  // Inner border
  slide.addShape(pres.ShapeType.rect, {
    x: 0.45,
    y: 0.45,
    w: 9.1,
    h: 4.725,
    fill: { type: 'none' },
    line: { color: COLORS.goldSoft, width: 0.75, dashType: 'dash' }
  });

  // Emblem circle
  slide.addShape(pres.ShapeType.ellipse, {
    x: 4.4,
    y: 0.9,
    w: 1.2,
    h: 1.2,
    fill: { color: COLORS.gold },
    line: { color: COLORS.goldSoft, width: 2 }
  });

  slide.addText('₹', {
    x: 4.4,
    y: 0.9,
    w: 1.2,
    h: 1.2,
    fontSize: 42,
    bold: true,
    color: COLORS.ledgerGreen,
    align: 'center',
    valign: 'middle',
    fontFace: 'Segoe UI'
  });

  // Main Title
  slide.addText('BudgetBuddy', {
    x: 1.0,
    y: 2.2,
    w: 8.0,
    h: 0.8,
    fontSize: 40,
    bold: true,
    color: COLORS.goldSoft,
    align: 'center',
    fontFace: 'Segoe UI'
  });

  // Subtitle
  slide.addText('Classical Ledger Personal Finance & Expense Tracker', {
    x: 1.0,
    y: 2.95,
    w: 8.0,
    h: 0.4,
    fontSize: 16,
    color: COLORS.paper,
    align: 'center',
    fontFace: 'Segoe UI'
  });

  // Divider
  slide.addShape(pres.ShapeType.rect, {
    x: 3.5,
    y: 3.45,
    w: 3.0,
    h: 0.03,
    fill: { color: COLORS.gold }
  });

  // Key Tags Box
  slide.addText('Vintage Bookkeeping Aesthetics  •  Local-First Privacy  •  Zero-Dependency Architecture', {
    x: 1.0,
    y: 3.65,
    w: 8.0,
    h: 0.35,
    fontSize: 11,
    color: COLORS.goldSoft,
    align: 'center',
    fontFace: 'Segoe UI'
  });

  // Metadata Footer
  slide.addText('Frontend Web Engineering Project  |  Comprehensive Project Overview', {
    x: 1.0,
    y: 4.6,
    w: 8.0,
    h: 0.3,
    fontSize: 9,
    color: COLORS.paper,
    opacity: 80,
    align: 'center',
    fontFace: 'Segoe UI'
  });
}

// ==========================================
// SLIDE 2: Problem Statement & Vision
// ==========================================
{
  const slide = createContentSlide(2, 'Context & Motivation', 'The Problem & The BudgetBuddy Vision');

  // Left Card: The Problem
  slide.addShape(pres.ShapeType.rect, {
    x: 0.6,
    y: 1.65,
    w: 4.2,
    h: 3.35,
    fill: { color: COLORS.white },
    line: { color: COLORS.danger, width: 1.5 }
  });

  slide.addShape(pres.ShapeType.rect, {
    x: 0.6,
    y: 1.65,
    w: 4.2,
    h: 0.45,
    fill: { color: COLORS.danger }
  });

  slide.addText('THE CHALLENGES TODAY', {
    x: 0.8,
    y: 1.72,
    w: 3.8,
    h: 0.3,
    fontSize: 11,
    bold: true,
    color: COLORS.white,
    fontFace: 'Segoe UI'
  });

  slide.addText([
    { text: '• Bloated SaaS Apps: ', options: { bold: true, break: false } },
    { text: 'Modern tools are crowded with upsells, ads, and unnecessary social features.\n\n', options: { break: false } },
    { text: '• Privacy Vulnerabilities: ', options: { bold: true, break: false } },
    { text: 'Mandatory cloud logins monetize or expose intimate spending habits.\n\n', options: { break: false } },
    { text: '• Generic & Cold Interfaces: ', options: { bold: true, break: false } },
    { text: 'Neon cards and sterile UI patterns detach users from the disciplined art of bookkeeping.\n\n', options: { break: false } },
    { text: '• High Latency & Complexity: ', options: { bold: true, break: false } },
    { text: 'Slow page loads and multi-step dialogs deter daily expense logging.', options: { break: false } }
  ], {
    x: 0.8,
    y: 2.25,
    w: 3.8,
    h: 2.6,
    fontSize: 10,
    color: COLORS.ink,
    fontFace: 'Segoe UI'
  });

  // Right Card: The Solution
  slide.addShape(pres.ShapeType.rect, {
    x: 5.2,
    y: 1.65,
    w: 4.2,
    h: 3.35,
    fill: { color: COLORS.white },
    line: { color: COLORS.ledgerGreen, width: 1.5 }
  });

  slide.addShape(pres.ShapeType.rect, {
    x: 5.2,
    y: 1.65,
    w: 4.2,
    h: 0.45,
    fill: { color: COLORS.ledgerGreen }
  });

  slide.addText('THE BudgetBuddy SOLUTION', {
    x: 5.4,
    y: 1.72,
    w: 3.8,
    h: 0.3,
    fontSize: 11,
    bold: true,
    color: COLORS.goldSoft,
    fontFace: 'Segoe UI'
  });

  slide.addText([
    { text: '• Classical Ledger Nostalgia: ', options: { bold: true, break: false } },
    { text: 'Rich parchment tones and deep forest green invoke the trusted warmth of physical accounting books.\n\n', options: { break: false } },
    { text: '• 100% Local-First Privacy: ', options: { bold: true, break: false } },
    { text: 'Every rupee stays inside the browser storage; zero external tracking or data transmission.\n\n', options: { break: false } },
    { text: '• Instant, Frictionless Speed: ', options: { bold: true, break: false } },
    { text: 'Sub-millisecond interactions with single-click logging and instant calculations.\n\n', options: { break: false } },
    { text: '• Multi-Account Discipline: ', options: { bold: true, break: false } },
    { text: 'Separate ledgers for Personal, Business, and Household finances.', options: { break: false } }
  ], {
    x: 5.4,
    y: 2.25,
    w: 3.8,
    h: 2.6,
    fontSize: 10,
    color: COLORS.ink,
    fontFace: 'Segoe UI'
  });
}

// ==========================================
// SLIDE 3: Visual Identity & Design Philosophy
// ==========================================
{
  const slide = createContentSlide(3, 'Design System', 'Visual Identity & Ledger Aesthetics');

  // Intro paragraph
  slide.addText('Designed to evoke the tactile dignity of an antique banker\'s ledger while maintaining modern web responsiveness and clear information hierarchy.', {
    x: 0.5,
    y: 1.55,
    w: 9.0,
    h: 0.4,
    fontSize: 10.5,
    color: COLORS.grayText,
    fontFace: 'Segoe UI'
  });

  // 4 Color Swatch Cards
  const colorsList = [
    { name: 'Ledger Green', hex: '#16382C', bg: COLORS.ledgerGreen, fg: COLORS.goldSoft, desc: 'Primary brand, header, and stat backgrounds. Conveys financial heritage and trust.' },
    { name: 'Warm Gold', hex: '#C99A3B', bg: COLORS.gold, fg: COLORS.ledgerGreen, desc: 'Brand emblem, button accents, progress meters, and active focus boundaries.' },
    { name: 'Parchment Paper', hex: '#F6F4EE', bg: COLORS.paper, fg: COLORS.ink, border: COLORS.line, desc: 'Soothing canvas backdrop that eliminates glare and honors paper accounting sheets.' },
    { name: 'Ledger Crimson', hex: '#A4342A', bg: COLORS.danger, fg: COLORS.white, desc: 'Negative cashflow indicator, delete triggers, and budget deficit warnings.' }
  ];

  colorsList.forEach((c, idx) => {
    const colX = 0.5 + idx * 2.3;
    const cardW = 2.15;

    slide.addShape(pres.ShapeType.rect, {
      x: colX,
      y: 2.1,
      w: cardW,
      h: 2.9,
      fill: { color: COLORS.white },
      line: { color: COLORS.line, width: 1 }
    });

    // Color Swatch Box
    slide.addShape(pres.ShapeType.rect, {
      x: colX,
      y: 2.1,
      w: cardW,
      h: 1.0,
      fill: { color: c.bg },
      line: c.border ? { color: c.border, width: 1 } : { color: c.bg }
    });

    slide.addText(c.hex, {
      x: colX,
      y: 2.45,
      w: cardW,
      h: 0.3,
      fontSize: 12,
      bold: true,
      color: c.fg,
      align: 'center',
      fontFace: 'Segoe UI'
    });

    slide.addText(c.name, {
      x: colX + 0.1,
      y: 3.2,
      w: cardW - 0.2,
      h: 0.3,
      fontSize: 11,
      bold: true,
      color: COLORS.ledgerGreen,
      align: 'center',
      fontFace: 'Segoe UI'
    });

    slide.addText(c.desc, {
      x: colX + 0.15,
      y: 3.55,
      w: cardW - 0.3,
      h: 1.3,
      fontSize: 9,
      color: COLORS.ink,
      align: 'center',
      fontFace: 'Segoe UI'
    });
  });
}

// ==========================================
// SLIDE 4: System Architecture & Tech Stack
// ==========================================
{
  const slide = createContentSlide(4, 'Technical Blueprint', 'Architecture & Zero-Dependency Stack');

  // 3 Horizontal Component Cards
  const stack = [
    {
      title: '1. Semantic Presentation Layer',
      sub: 'HTML5 & CSS3 Custom Properties',
      items: [
        'Structured with semantic tags (<header>, <main>, <form>, <section>)',
        'CSS Variables (:root) enabling centralized theme tokens and lightning re-skins',
        'Advanced CSS Grid (1.1fr 1.1fr 1.4fr) collapsing cleanly into single-column mobile view',
        'Custom tactile micro-interactions on button hover and focus rings'
      ]
    },
    {
      title: '2. React 19 Component & State Layer',
      sub: 'Declarative UI with Hooks (useState, useMemo)',
      items: [
        'Embedded React 19 runtime with createRoot and zero-dependency compilation',
        'BudgetSimulator component with real-time "what-if" projection sliders',
        'QuickExpenseLogger component with instant ledger insertion and validation',
        'Seamless bi-directional synchronization with BudgetBuddy storage engine'
      ]
    },
    {
      title: '3. Local Persistence & Serving',
      sub: 'Browser LocalStorage & Embedded Node HTTP',
      items: [
        'Multi-account structured document storage under sandboxed browser keys',
        'Instant load time with zero external network request latency',
        'Lightweight native Node.js HTTP server (zero npm dependencies for serving)',
        'Cross-platform execution across Windows, macOS, and Linux'
      ]
    }
  ];

  stack.forEach((item, idx) => {
    const cardY = 1.6 + idx * 1.15;

    slide.addShape(pres.ShapeType.rect, {
      x: 0.6,
      y: cardY,
      w: 8.8,
      h: 1.05,
      fill: { color: COLORS.white },
      line: { color: COLORS.line, width: 1 }
    });

    // Left Accent bar
    slide.addShape(pres.ShapeType.rect, {
      x: 0.6,
      y: cardY,
      w: 0.12,
      h: 1.05,
      fill: { color: idx === 0 ? COLORS.ledgerGreen : (idx === 1 ? COLORS.gold : COLORS.ledgerGreenLight) }
    });

    slide.addText(item.title, {
      x: 0.85,
      y: cardY + 0.1,
      w: 4.0,
      h: 0.25,
      fontSize: 11.5,
      bold: true,
      color: COLORS.ledgerGreen,
      fontFace: 'Segoe UI'
    });

    slide.addText(item.sub, {
      x: 0.85,
      y: cardY + 0.32,
      w: 4.0,
      h: 0.2,
      fontSize: 9,
      italic: true,
      color: COLORS.grayText,
      fontFace: 'Segoe UI'
    });

    slide.addText(item.items.map(bullet => `• ${bullet}`).join('\n'), {
      x: 4.8,
      y: cardY + 0.08,
      w: 4.4,
      h: 0.9,
      fontSize: 8.5,
      color: COLORS.ink,
      fontFace: 'Segoe UI'
    });
  });
}

// ==========================================
// SLIDE 5: Core Functional Features
// ==========================================
{
  const slide = createContentSlide(5, 'User Capabilities', 'Feature Matrix & Ledger Functionality');

  const features = [
    {
      title: 'Expense Logging',
      icon: '📝',
      desc: 'Rapid entry of transactions with title, custom date picker (defaults to today), category assignment, and precision currency amounts.'
    },
    {
      title: 'Dynamic Budgeting',
      icon: '📊',
      desc: 'Live threshold monitoring. Progress bar dynamically calculates percentage spent and flashes crimson (.over-budget) when limits are breached.'
    },
    {
      title: 'Multi-Account Ledgers',
      icon: '🏛️',
      desc: 'Isolated ledgers for Personal, Business, and Household accounts. Each account preserves its own distinct transactions, budget, and reminders.'
    },
    {
      title: 'Bill Reminders',
      icon: '⏰',
      desc: 'Integrated checklist for upcoming utilities, EMIs, and recurring payments with interactive strike-through toggle and easy deletion.'
    },
    {
      title: 'Category Filtering',
      icon: '🔍',
      desc: 'Instantly isolate outlays across Groceries, Dining, Utilities, Transport, Shopping, Health, and Education without page reload.'
    },
    {
      title: 'Persistent Storage',
      icon: '💾',
      desc: 'Automatic saving to browser localStorage. Users can close the browser or reboot their machine without losing historical entries.'
    }
  ];

  features.forEach((feat, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const cardX = 0.6 + col * 2.95;
    const cardY = 1.6 + row * 1.7;

    slide.addShape(pres.ShapeType.rect, {
      x: cardX,
      y: cardY,
      w: 2.8,
      h: 1.55,
      fill: { color: COLORS.white },
      line: { color: COLORS.line, width: 1 }
    });

    // Header badge
    slide.addShape(pres.ShapeType.rect, {
      x: cardX,
      y: cardY,
      w: 2.8,
      h: 0.35,
      fill: { color: COLORS.ledgerGreen }
    });

    slide.addText(`${feat.icon}  ${feat.title}`, {
      x: cardX + 0.15,
      y: cardY + 0.05,
      w: 2.5,
      h: 0.25,
      fontSize: 10,
      bold: true,
      color: COLORS.paper,
      fontFace: 'Segoe UI'
    });

    slide.addText(feat.desc, {
      x: cardX + 0.15,
      y: cardY + 0.45,
      w: 2.5,
      h: 1.0,
      fontSize: 8.5,
      color: COLORS.ink,
      fontFace: 'Segoe UI'
    });
  });
}

// ==========================================
// SLIDE 6: Layout & UX Deep Dive
// ==========================================
{
  const slide = createContentSlide(6, 'Interface Anatomy', '3-Column Layout & Responsive UX');

  const columns = [
    {
      colNum: 'COLUMN 1 (1.1fr)',
      title: 'Overview & Guardrails',
      components: [
        'Stat Card: Total Outflow (₹) in gold typography with transaction count badge',
        'Budget Monitor: Inline limit setter with dynamic bar and variance calculation',
        'Reminders Card: Quick bill reminders with strike-through completion status'
      ]
    },
    {
      colNum: 'COLUMN 2 (1.1fr)',
      title: 'Speed Recording Form',
      components: [
        'Focused Data Capture: Expense title with autofocus for rapid manual input',
        'Row Layout: Currency input side-by-side with semantic category dropdown',
        'Date Picker: Native HTML5 date input defaulting automatically to current day',
        'Primary Action: High-contrast green button with hover depth transitions'
      ]
    },
    {
      colNum: 'COLUMN 3 (1.4fr)',
      title: 'The Transaction Ledger',
      components: [
        'Chronological Stream: Sorted newest-first with visual category pill badges',
        'Dual Action Bar: Real-time category filter select alongside ledger Reset control',
        'Individual Controls: One-click deletion with instantaneous stat recalculation',
        'Empty States: Elegant typography hints when no records exist'
      ]
    }
  ];

  columns.forEach((col, idx) => {
    const cardX = 0.6 + idx * 2.95;

    slide.addShape(pres.ShapeType.rect, {
      x: cardX,
      y: 1.6,
      w: 2.8,
      h: 3.4,
      fill: { color: COLORS.white },
      line: { color: COLORS.line, width: 1.2 }
    });

    // Col Header
    slide.addShape(pres.ShapeType.rect, {
      x: cardX,
      y: 1.6,
      w: 2.8,
      h: 0.6,
      fill: { color: idx === 1 ? COLORS.ledgerGreenLight : COLORS.ledgerGreen }
    });

    slide.addText(col.colNum, {
      x: cardX,
      y: 1.65,
      w: 2.8,
      h: 0.2,
      fontSize: 8,
      bold: true,
      color: COLORS.gold,
      align: 'center',
      fontFace: 'Segoe UI'
    });

    slide.addText(col.title, {
      x: cardX,
      y: 1.88,
      w: 2.8,
      h: 0.25,
      fontSize: 10.5,
      bold: true,
      color: COLORS.white,
      align: 'center',
      fontFace: 'Segoe UI'
    });

    slide.addText(col.components.map(c => `✓  ${c}`).join('\n\n'), {
      x: cardX + 0.15,
      y: 2.35,
      w: 2.5,
      h: 2.5,
      fontSize: 8.5,
      color: COLORS.ink,
      fontFace: 'Segoe UI'
    });
  });
}

// ==========================================
// SLIDE 7: Technical Flow & Data Lifecycle
// ==========================================
{
  const slide = createContentSlide(7, 'System Mechanics', 'Data Flow, Lifecycle & Security');

  // Step boxes (Flowchart style)
  const steps = [
    { num: '01', title: 'User Input', desc: 'User logs title, amount, category & date in Column 2' },
    { num: '02', title: 'Input Validation', desc: 'Checks non-empty strings, positive numeric values, and valid date' },
    { num: '03', title: 'State Mutation', desc: 'Prepends new record to memory store for current account' },
    { num: '04', title: 'Storage Sync', desc: 'Serializes active state tree to browser localStorage' },
    { num: '05', title: 'Reactive Render', desc: 'Recalculates totals, updates budget meter, redraws ledger list' }
  ];

  steps.forEach((step, idx) => {
    const boxX = 0.6 + idx * 1.78;

    slide.addShape(pres.ShapeType.roundRect, {
      x: boxX,
      y: 1.65,
      w: 1.65,
      h: 1.85,
      fill: { color: COLORS.white },
      line: { color: COLORS.gold, width: 1.5 }
    });

    slide.addText(step.num, {
      x: boxX,
      y: 1.75,
      w: 1.65,
      h: 0.35,
      fontSize: 18,
      bold: true,
      color: COLORS.gold,
      align: 'center',
      fontFace: 'Segoe UI'
    });

    slide.addText(step.title, {
      x: boxX + 0.1,
      y: 2.15,
      w: 1.45,
      h: 0.3,
      fontSize: 10,
      bold: true,
      color: COLORS.ledgerGreen,
      align: 'center',
      fontFace: 'Segoe UI'
    });

    slide.addText(step.desc, {
      x: boxX + 0.1,
      y: 2.45,
      w: 1.45,
      h: 0.95,
      fontSize: 8,
      color: COLORS.ink,
      align: 'center',
      fontFace: 'Segoe UI'
    });
  });

  // Security & Resilience Highlights Box below
  slide.addShape(pres.ShapeType.rect, {
    x: 0.6,
    y: 3.75,
    w: 8.8,
    h: 1.25,
    fill: { color: COLORS.ledgerGreen },
    line: { color: COLORS.gold, width: 1 }
  });

  slide.addText('CORE TECHNICAL HIGHLIGHTS & PRIVACY GUARANTEES', {
    x: 0.8,
    y: 3.85,
    w: 8.4,
    h: 0.25,
    fontSize: 10,
    bold: true,
    color: COLORS.goldSoft,
    fontFace: 'Segoe UI'
  });

  slide.addText([
    { text: '• Zero Third-Party Telemetry: ', options: { bold: true, color: COLORS.gold } },
    { text: 'No external scripts, trackers, or marketing pixels are embedded.\n', options: { color: COLORS.paper } },
    { text: '• Resilient Error Fallbacks: ', options: { bold: true, color: COLORS.gold } },
    { text: 'Gracefully seeds sample data on initial visit and handles quota limits cleanly.\n', options: { color: COLORS.paper } },
    { text: '• Air-Gapped Capable: ', options: { bold: true, color: COLORS.gold } },
    { text: 'Runs completely offline without an active internet connection.', options: { color: COLORS.paper } }
  ], {
    x: 0.8,
    y: 4.12,
    w: 8.4,
    h: 0.75,
    fontSize: 9,
    fontFace: 'Segoe UI'
  });
}

// ==========================================
// SLIDE 8: Future Roadmap & Conclusion
// ==========================================
{
  const slide = pres.addSlide();
  slide.background = { color: COLORS.ledgerGreen };

  // Decorative border
  slide.addShape(pres.ShapeType.rect, {
    x: 0.35,
    y: 0.35,
    w: 9.3,
    h: 4.925,
    fill: { type: 'none' },
    line: { color: COLORS.gold, width: 1.5 }
  });

  slide.addText('FUTURE ROADMAP & CONCLUSION', {
    x: 0.8,
    y: 0.6,
    w: 8.4,
    h: 0.4,
    fontSize: 20,
    bold: true,
    color: COLORS.goldSoft,
    align: 'center',
    fontFace: 'Segoe UI'
  });

  // Roadmap Columns
  const milestones = [
    {
      phase: 'Phase 1: Analytics & Export',
      items: [
        'Monthly PDF accounting statements',
        'CSV/Excel spreadsheet export',
        'Interactive SVG category pie charts'
      ]
    },
    {
      phase: 'Phase 2: Automation',
      items: [
        'Recurring subscription schedules',
        'Auto-categorization rules',
        'Currency conversion rate toggle'
      ]
    },
    {
      phase: 'Phase 3: Secure Sync',
      items: [
        'End-to-End Encrypted cloud sync',
        'WebCrypto password protection',
        'PWA installable app manifest'
      ]
    }
  ];

  milestones.forEach((m, idx) => {
    const cardX = 0.8 + idx * 2.85;

    slide.addShape(pres.ShapeType.rect, {
      x: cardX,
      y: 1.25,
      w: 2.7,
      h: 2.1,
      fill: { color: COLORS.ledgerGreenLight },
      line: { color: COLORS.gold, width: 1 }
    });

    slide.addText(m.phase, {
      x: cardX + 0.1,
      y: 1.4,
      w: 2.5,
      h: 0.3,
      fontSize: 10.5,
      bold: true,
      color: COLORS.goldSoft,
      align: 'center',
      fontFace: 'Segoe UI'
    });

    slide.addText(m.items.map(item => `• ${item}`).join('\n\n'), {
      x: cardX + 0.15,
      y: 1.85,
      w: 2.4,
      h: 1.4,
      fontSize: 8.5,
      color: COLORS.paper,
      fontFace: 'Segoe UI'
    });
  });

  // Conclusion Summary Box
  slide.addShape(pres.ShapeType.rect, {
    x: 0.8,
    y: 3.55,
    w: 8.4,
    h: 1.35,
    fill: { color: COLORS.paper },
    line: { color: COLORS.gold, width: 1.5 }
  });

  slide.addText('CONCLUSION & KEY TAKEAWAYS', {
    x: 1.0,
    y: 3.7,
    w: 8.0,
    h: 0.25,
    fontSize: 11,
    bold: true,
    color: COLORS.ledgerGreen,
    align: 'center',
    fontFace: 'Segoe UI'
  });

  slide.addText('BudgetBuddy proves that intentional, bespoke styling paired with lean vanilla web technologies produces software that is faster, more secure, and significantly more delightful than generic off-the-shelf finance portals.\n\nThank You!  •  Questions & Discussions Welcome', {
    x: 1.1,
    y: 4.0,
    w: 7.8,
    h: 0.8,
    fontSize: 9.5,
    color: COLORS.ink,
    align: 'center',
    fontFace: 'Segoe UI'
  });
}

// Generate the PPTX File
const outputPath = path.join(__dirname, 'BudgetBuddy_Presentation.pptx');
pres.writeFile({ fileName: outputPath })
  .then(() => {
    console.log(`Successfully generated 8-page presentation at: ${outputPath}`);
  })
  .catch(err => {
    console.error('Error generating presentation:', err);
    process.exit(1);
  });

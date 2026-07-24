import Link from "next/link";

const navigationModules = [
  {
    title: "Executive Intelligence",
    href: "/executive",
    description: "AI-powered command center for strategic financial oversight",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    features: [
      { name: "AI Command Center", href: "/executive/command-center" },
      { name: "Executive Dashboard", href: "/executive/dashboard" },
      { name: "Real-time Alerts", href: "/executive/alerts" },
      { name: "Strategic Insights", href: "/executive/insights" },
    ],
  },
  {
    title: "Cash Flow Intelligence",
    href: "/cash-flow",
    description: "365-day AI forecasting with real-time cash position monitoring",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    features: [
      { name: "Enterprise Cash Position", href: "/cash-flow/position" },
      { name: "Cash Forecasting", href: "/cash-flow/forecasting" },
      { name: "Cash Inflow Intelligence", href: "/cash-flow/inflow" },
      { name: "Cash Outflow Intelligence", href: "/cash-flow/outflow" },
      { name: "Cash Risk Intelligence", href: "/cash-flow/risk" },
      { name: "Cash Analytics", href: "/cash-flow/analytics" },
      { name: "Cash AI Agent", href: "/cash-flow/agent" },
    ],
  },
  {
    title: "Treasury Management",
    href: "/treasury",
    description: "Centralized banking operations and liquidity optimization",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    features: [
      { name: "Bank Management", href: "/treasury/bank-management" },
      { name: "Liquidity Management", href: "/treasury/liquidity" },
      { name: "Treasury Dashboard", href: "/treasury/dashboard" },
      { name: "Treasury Risk", href: "/treasury/risk" },
      { name: "Treasury AI", href: "/treasury/ai" },
      { name: "Treasury Operations", href: "/treasury/operations" },
    ],
  },
  {
    title: "Project Finance",
    href: "/project-finance",
    description: "AI-driven project funding and capital allocation optimization",
    icon: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z",
    features: [
      { name: "Funding Sources", href: "/project-finance/funding-sources" },
      { name: "Drawdown Management", href: "/project-finance/drawdown" },
      { name: "Project Capital", href: "/project-finance/capital" },
      { name: "Project IRR", href: "/project-finance/irr" },
      { name: "Funding Analytics", href: "/project-finance/analytics" },
      { name: "Capital Allocation AI", href: "/project-finance/allocation-ai" },
    ],
  },
  {
    title: "Loan & Debt Management",
    href: "/loan-debt",
    description: "Complete debt lifecycle management with AI optimization",
    icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
    features: [
      { name: "Loan Portfolio", href: "/loan-debt/portfolio" },
      { name: "Debt Register", href: "/loan-debt/register" },
      { name: "Interest Schedule", href: "/loan-debt/interest" },
      { name: "Principal Schedule", href: "/loan-debt/principal" },
      { name: "Refinancing", href: "/loan-debt/refinancing" },
      { name: "Debt Analytics", href: "/loan-debt/analytics" },
    ],
  },
  {
    title: "Covenant Monitoring",
    href: "/covenants",
    description: "Automated covenant testing with AI breach prediction",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    features: [
      { name: "Covenant Dashboard", href: "/covenants/dashboard" },
      { name: "Compliance", href: "/covenants/compliance" },
      { name: "Breaches", href: "/covenants/breaches" },
      { name: "Early Warning", href: "/covenants/early-warning" },
      { name: "AI Recommendations", href: "/covenants/ai-recommendations" },
    ],
  },
  {
    title: "Escrow Management",
    href: "/escrow",
    description: "RERA-compliant escrow monitoring and release automation",
    icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    features: [
      { name: "Escrow Accounts", href: "/escrow/accounts" },
      { name: "Releases", href: "/escrow/releases" },
      { name: "Compliance", href: "/escrow/compliance" },
      { name: "Reconciliation", href: "/escrow/reconciliation" },
      { name: "AI Monitoring", href: "/escrow/ai-monitoring" },
    ],
  },
  {
    title: "Working Capital",
    href: "/working-capital",
    description: "Optimize receivables, payables, and cash conversion cycle",
    icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
    features: [
      { name: "Receivables", href: "/working-capital/receivables" },
      { name: "Payables", href: "/working-capital/payables" },
      { name: "Cash Conversion", href: "/working-capital/cash-conversion" },
      { name: "Dynamic Discounting", href: "/working-capital/dynamic-discounting" },
      { name: "Supply Chain Finance", href: "/working-capital/supply-chain-finance" },
    ],
  },
  {
    title: "Budget Intelligence",
    href: "/budget",
    description: "AI-powered budgeting with variance analysis and forecasting",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    features: [
      { name: "Annual Budget", href: "/budget/annual" },
      { name: "Rolling Forecast", href: "/budget/rolling-forecast" },
      { name: "Variance Analysis", href: "/budget/variance" },
      { name: "Budget Approval", href: "/budget/approval" },
      { name: "Budget AI", href: "/budget/ai" },
    ],
  },
  {
    title: "Payment Intelligence",
    href: "/payments",
    description: "Centralized payment factory with fraud detection and automation",
    icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    features: [
      { name: "Payment Factory", href: "/payments/factory" },
      { name: "Payment Queue", href: "/payments/queue" },
      { name: "Priority Engine", href: "/payments/priority" },
      { name: "Approval Workflow", href: "/payments/approvals" },
      { name: "Payment Analytics", href: "/payments/analytics" },
    ],
  },
  {
    title: "Bank Reconciliation",
    href: "/reconciliation",
    description: "AI-powered auto-matching with real-time reconciliation",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    features: [
      { name: "Auto Match", href: "/reconciliation/auto-match" },
      { name: "Exceptions", href: "/reconciliation/exceptions" },
      { name: "Manual Review", href: "/reconciliation/manual" },
      { name: "AI Match", href: "/reconciliation/ai-match" },
      { name: "Reconciliation Dashboard", href: "/reconciliation/dashboard" },
    ],
  },
  {
    title: "Collections Intelligence",
    href: "/collections",
    description: "AI-driven collection strategies with customer risk scoring",
    icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z",
    features: [
      { name: "Collections Dashboard", href: "/collections/dashboard" },
      { name: "Customer Risk", href: "/collections/customer-risk" },
      { name: "Promise to Pay", href: "/collections/promise-to-pay" },
      { name: "Collection Campaigns", href: "/collections/campaigns" },
      { name: "AI Collector", href: "/collections/ai-collector" },
    ],
  },
  {
    title: "Revenue Intelligence",
    href: "/revenue",
    description: "Revenue recognition, leakage detection, and margin analysis",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    features: [
      { name: "Revenue Dashboard", href: "/revenue/dashboard" },
      { name: "Recognition", href: "/revenue/recognition" },
      { name: "Leakage", href: "/revenue/leakage" },
      { name: "Margin", href: "/revenue/margin" },
      { name: "Revenue AI", href: "/revenue/ai" },
    ],
  },
  {
    title: "FP&A",
    href: "/fpa",
    description: "Financial planning, scenario modeling, and what-if analysis",
    icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z",
    features: [
      { name: "Planning", href: "/fpa/planning" },
      { name: "Forecasting", href: "/fpa/forecasting" },
      { name: "What-if Analysis", href: "/fpa/what-if" },
      { name: "Scenario Planning", href: "/fpa/scenarios" },
      { name: "Executive Planning", href: "/fpa/executive" },
    ],
  },
  {
    title: "Investment Management",
    href: "/investments",
    description: "Treasury investments with yield optimization and maturity tracking",
    icon: "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7",
    features: [
      { name: "Investments Dashboard", href: "/investments/dashboard" },
      { name: "Fixed Deposits", href: "/investments/fds" },
      { name: "Liquid Funds", href: "/investments/liquid-funds" },
      { name: "Portfolio", href: "/investments/portfolio" },
      { name: "Yield Analytics", href: "/investments/yield" },
    ],
  },
  {
    title: "FX & Treasury Risk",
    href: "/fx-risk",
    description: "Currency exposure management and hedging strategies",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    features: [
      { name: "FX Exposure", href: "/fx-risk/exposure" },
      { name: "Hedging", href: "/fx-risk/hedging" },
      { name: "Forward Contracts", href: "/fx-risk/forwards" },
      { name: "Interest Risk", href: "/fx-risk/interest-risk" },
      { name: "Market Risk", href: "/fx-risk/market-risk" },
    ],
  },
  {
    title: "Financial Close",
    href: "/financial-close",
    description: "Automated close management with AI narrative generation",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    features: [
      { name: "Close Calendar", href: "/financial-close/calendar" },
      { name: "Close Checklist", href: "/financial-close/checklist" },
      { name: "MIS Reports", href: "/financial-close/mis" },
      { name: "Board Reports", href: "/financial-close/board-reports" },
      { name: "Narrative AI", href: "/financial-close/narrative-ai" },
    ],
  },
  {
    title: "AI CFO Workspace",
    href: "/ai-cfo",
    description: "18 Autonomous AI Agents for end-to-end finance automation",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    features: [
      { name: "AI CFO", href: "/ai-cfo/workspace" },
      { name: "Treasury Copilot", href: "/ai-cfo/treasury-copilot" },
      { name: "Finance Copilot", href: "/ai-cfo/finance-copilot" },
      { name: "Executive Chat", href: "/ai-cfo/executive-chat" },
      { name: "Scenario Simulator", href: "/ai-cfo/simulator" },
      { name: "Autonomous Agents", href: "/ai-cfo/agents" },
      { name: "Decision Center", href: "/ai-cfo/decision-center" },
    ],
  },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-slate-950/95 via-slate-900/95 to-slate-950/95 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/80">
      <div className="mx-auto max-w-screen px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 opacity-70 blur-sm group-hover:opacity-100 transition-opacity" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 shadow-lg">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent">
                ZenBank
              </span>
              <span className="text-[10px] font-medium text-cyan-400/80 tracking-wider uppercase hidden sm:block">
                AI Finance Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Products Mega Menu */}
            <div className="group">
              <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                Products
                <svg className="h-4 w-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-full left-1/2 -translate-x-1/2 pt-0 transition-all duration-300">
                <div className="w-screen rounded-2xl border border-white/10 bg-slate-950/98 backdrop-blur-xl shadow-2xl shadow-cyan-500/10 p-6">
                  <div className="grid grid-cols-3 gap-4">
                    {navigationModules.slice(0, 9).map((module) => (
                      <Link
                        key={module.href}
                        href={module.href}
                        className="group/item flex items-start gap-3 rounded-xl p-3 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 transition-all"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20 group-hover/item:border-cyan-400/40 transition-colors">
                          <svg className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d={module.icon} />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-white group-hover/item:text-cyan-300 transition-colors">{module.title}</div>
                          <div className="text-xs text-slate-400 line-clamp-2">{module.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <Link href="/products" className="flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
                      View all 22 modules
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Solutions Mega Menu */}
            <div className="group">
              <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                Solutions
                <svg className="h-4 w-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-full left-1/2 -translate-x-1/2 pt-0 transition-all duration-300">
                <div className="w-screen rounded-2xl border border-white/10 bg-slate-950/98 backdrop-blur-xl shadow-2xl shadow-purple-500/10 p-6">
                  <div className="grid grid-cols-3 gap-4">
                    {navigationModules.slice(9, 18).map((module) => (
                      <Link
                        key={module.href}
                        href={module.href}
                        className="group/item flex items-start gap-3 rounded-xl p-3 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 transition-all"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-500/20 group-hover/item:border-purple-400/40 transition-colors">
                          <svg className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d={module.icon} />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-white group-hover/item:text-purple-300 transition-colors">{module.title}</div>
                          <div className="text-xs text-slate-400 line-clamp-2">{module.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* AI Agents Menu */}
            <div className="group">
              <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                <span className="relative flex h-2 w-2 mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                AI Agents
                <svg className="h-4 w-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-full right-0 pt-0 transition-all duration-300">
                <div className="w-screen rounded-2xl border border-white/10 bg-slate-950/98 backdrop-blur-xl shadow-2xl shadow-emerald-500/10 p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-white">18 Autonomous AI Agents</h3>
                    <p className="text-sm text-slate-400">Intelligent automation for every finance function</p>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                    {[
                      "Cash Flow Agent", "Treasury Agent", "CFO Agent", "Controller Agent",
                      "Collections Agent", "Payment Agent", "Budget Agent", "Forecast Agent",
                      "Debt Agent", "Investment Agent", "Covenant Agent", "Escrow Agent",
                      "Reconciliation Agent", "Fraud Agent", "Working Capital Agent", "Scenario Agent",
                      "Project Finance Agent", "Executive Advisor"
                    ].map((agent) => (
                      <div key={agent} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-emerald-500/10 transition-colors cursor-pointer">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-sm text-slate-300 hover:text-emerald-300 transition-colors">{agent}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link href="/pricing" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5">
              Pricing
            </Link>
            <Link href="/enterprise" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5">
              Enterprise
            </Link>
            <Link href="/resources" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5">
              Resources
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:flex items-center px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 p-[2px] font-medium text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40"
            >
              <span className="relative flex items-center gap-2 rounded-[10px] bg-slate-950 px-4 py-2 text-sm transition-all group-hover:bg-transparent">
                Start Free Trial
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Animated gradient border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
    </header>
  );
}
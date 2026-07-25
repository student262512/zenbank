import {
  LayoutDashboard,
  Zap,
  TrendingUp,
  Building2,
  FolderKanban,
  CreditCard,
  FileCheck,
  Lock,
  Wallet,
  Calculator,
  CreditCard as PaymentIcon,
  GitCompare,
  Phone,
  DollarSign,
  LineChart,
  PiggyBank,
  Globe,
  CalendarCheck,
  Bot,
  Settings,
  type LucideIcon,
} from 'lucide-react';

export interface NavigationItem {
  title: string;
  href: string;
  icon?: LucideIcon;
  badge?: string;
  badgeVariant?: 'default' | 'success' | 'warning' | 'danger';
}

export interface NavigationGroup {
  title: string;
  icon: LucideIcon;
  items: NavigationItem[];
  defaultOpen?: boolean;
}

export const navigation: NavigationGroup[] = [
  {
    title: 'Executive Intelligence',
    icon: LayoutDashboard,
    defaultOpen: true,
    items: [
      { title: 'AI Command Center', href: '/executive/command-center', badge: 'AI', badgeVariant: 'default' },
      { title: 'Executive Dashboard', href: '/executive/dashboard' },
    ],
  },
  {
    title: 'Cash Flow Intelligence',
    icon: TrendingUp,
    items: [
      { title: 'Enterprise Cash Position', href: '/cash-flow/position' },
      { title: 'Cash Forecasting', href: '/cash-flow/forecasting', badge: 'AI', badgeVariant: 'default' },
      { title: 'Cash Inflow Intelligence', href: '/cash-flow/inflow' },
      { title: 'Cash Outflow Intelligence', href: '/cash-flow/outflow' },
      { title: 'Cash Risk Intelligence', href: '/cash-flow/risk' },
      { title: 'Cash Analytics', href: '/cash-flow/analytics' },
      { title: 'Cash AI Agent', href: '/cash-flow/agent', badge: 'AI', badgeVariant: 'default' },
    ],
  },
  {
    title: 'Treasury Management',
    icon: Building2,
    items: [
      { title: 'Bank Management', href: '/treasury/bank-management' },
      { title: 'Liquidity Management', href: '/treasury/liquidity' },
      { title: 'Treasury Dashboard', href: '/treasury/dashboard' },
      { title: 'Treasury Risk', href: '/treasury/risk' },
      { title: 'Treasury AI', href: '/treasury/ai', badge: 'AI', badgeVariant: 'default' },
      { title: 'Treasury Operations', href: '/treasury/operations' },
    ],
  },
  {
    title: 'Project Finance',
    icon: FolderKanban,
    items: [
      { title: 'Funding Sources', href: '/project-finance/funding-sources' },
      { title: 'Drawdown Management', href: '/project-finance/drawdown' },
      { title: 'Capital Deployment', href: '/project-finance/capital' },
      { title: 'IRR Analysis', href: '/project-finance/irr' },
      { title: 'Project Analytics', href: '/project-finance/analytics' },
      { title: 'Allocation AI', href: '/project-finance/allocation-ai', badge: 'AI', badgeVariant: 'default' },
    ],
  },
  {
    title: 'Loan & Debt Management',
    icon: CreditCard,
    items: [
      { title: 'Debt Portfolio', href: '/loan-debt/portfolio' },
      { title: 'Loan Register', href: '/loan-debt/register' },
      { title: 'Interest Management', href: '/loan-debt/interest' },
      { title: 'Principal Schedule', href: '/loan-debt/principal' },
      { title: 'Refinancing', href: '/loan-debt/refinancing' },
      { title: 'Debt Analytics', href: '/loan-debt/analytics' },
    ],
  },
  {
    title: 'Loan Covenants',
    icon: FileCheck,
    items: [
      { title: 'Covenant Dashboard', href: '/covenants/dashboard' },
      { title: 'Compliance Tracking', href: '/covenants/compliance', badge: '3', badgeVariant: 'warning' },
      { title: 'Breach Management', href: '/covenants/breaches' },
      { title: 'Early Warning', href: '/covenants/early-warning', badge: 'AI', badgeVariant: 'default' },
      { title: 'AI Recommendations', href: '/covenants/ai-recommendations', badge: 'AI', badgeVariant: 'default' },
    ],
  },
  {
    title: 'Escrow Management',
    icon: Lock,
    items: [
      { title: 'Escrow Accounts', href: '/escrow/accounts' },
      { title: 'Release Management', href: '/escrow/releases' },
      { title: 'Escrow Compliance', href: '/escrow/compliance' },
      { title: 'Reconciliation', href: '/escrow/reconciliation' },
      { title: 'AI Monitoring', href: '/escrow/ai-monitoring', badge: 'AI', badgeVariant: 'default' },
    ],
  },
  {
    title: 'Working Capital',
    icon: Wallet,
    items: [
      { title: 'Receivables', href: '/working-capital/receivables' },
      { title: 'Payables', href: '/working-capital/payables' },
      { title: 'Cash Conversion Cycle', href: '/working-capital/cash-conversion' },
      { title: 'Dynamic Discounting', href: '/working-capital/dynamic-discounting' },
      { title: 'Supply Chain Finance', href: '/working-capital/supply-chain-finance' },
    ],
  },
  {
    title: 'Budget Intelligence',
    icon: Calculator,
    items: [
      { title: 'Annual Budget', href: '/budget/annual' },
      { title: 'Rolling Forecast', href: '/budget/rolling-forecast' },
      { title: 'Variance Analysis', href: '/budget/variance' },
      { title: 'Budget Approval', href: '/budget/approval' },
      { title: 'Budget AI', href: '/budget/ai', badge: 'AI', badgeVariant: 'default' },
    ],
  },
  {
    title: 'Payment Intelligence',
    icon: PaymentIcon,
    items: [
      { title: 'Payment Factory', href: '/payments/factory' },
      { title: 'Payment Queue', href: '/payments/queue', badge: '12', badgeVariant: 'warning' },
      { title: 'Priority Management', href: '/payments/priority' },
      { title: 'Approvals', href: '/payments/approvals', badge: '5', badgeVariant: 'danger' },
      { title: 'Payment Analytics', href: '/payments/analytics' },
    ],
  },
  {
    title: 'Bank Reconciliation',
    icon: GitCompare,
    items: [
      { title: 'Auto Match', href: '/reconciliation/auto-match' },
      { title: 'Exceptions', href: '/reconciliation/exceptions', badge: '8', badgeVariant: 'warning' },
      { title: 'Manual Matching', href: '/reconciliation/manual' },
      { title: 'AI Match', href: '/reconciliation/ai-match', badge: 'AI', badgeVariant: 'default' },
      { title: 'Recon Dashboard', href: '/reconciliation/dashboard' },
    ],
  },
  {
    title: 'Collections Intelligence',
    icon: Phone,
    items: [
      { title: 'Collections Dashboard', href: '/collections/dashboard' },
      { title: 'Customer Risk', href: '/collections/customer-risk' },
      { title: 'Promise to Pay', href: '/collections/promise-to-pay' },
      { title: 'Collection Campaigns', href: '/collections/campaigns' },
      { title: 'AI Collector', href: '/collections/ai-collector', badge: 'AI', badgeVariant: 'default' },
    ],
  },
  {
    title: 'Revenue Intelligence',
    icon: DollarSign,
    items: [
      { title: 'Revenue Dashboard', href: '/revenue/dashboard' },
      { title: 'Revenue Recognition', href: '/revenue/recognition' },
      { title: 'Leakage Detection', href: '/revenue/leakage', badge: 'AI', badgeVariant: 'default' },
      { title: 'Margin Analysis', href: '/revenue/margin' },
      { title: 'Revenue AI', href: '/revenue/ai', badge: 'AI', badgeVariant: 'default' },
    ],
  },
  {
    title: 'FP&A',
    icon: LineChart,
    items: [
      { title: 'Financial Planning', href: '/fpa/planning' },
      { title: 'Forecasting', href: '/fpa/forecasting' },
      { title: 'What-If Analysis', href: '/fpa/what-if' },
      { title: 'Scenario Planning', href: '/fpa/scenarios' },
      { title: 'Executive Reports', href: '/fpa/executive' },
    ],
  },
  {
    title: 'Investment Management',
    icon: PiggyBank,
    items: [
      { title: 'Investment Dashboard', href: '/investments/dashboard' },
      { title: 'Fixed Deposits', href: '/investments/fds' },
      { title: 'Liquid Funds', href: '/investments/liquid-funds' },
      { title: 'Portfolio View', href: '/investments/portfolio' },
      { title: 'Yield Optimization', href: '/investments/yield' },
    ],
  },
  {
    title: 'FX & Treasury Risk',
    icon: Globe,
    items: [
      { title: 'FX Exposure', href: '/fx-risk/exposure' },
      { title: 'Hedging Strategy', href: '/fx-risk/hedging' },
      { title: 'Forward Contracts', href: '/fx-risk/forwards' },
      { title: 'Interest Rate Risk', href: '/fx-risk/interest-risk' },
      { title: 'Market Risk', href: '/fx-risk/market-risk' },
    ],
  },
  {
    title: 'Financial Close',
    icon: CalendarCheck,
    items: [
      { title: 'Close Calendar', href: '/financial-close/calendar' },
      { title: 'Close Checklist', href: '/financial-close/checklist' },
      { title: 'MIS Reports', href: '/financial-close/mis' },
      { title: 'Board Reports', href: '/financial-close/board-reports' },
      { title: 'AI Narrative', href: '/financial-close/narrative-ai', badge: 'AI', badgeVariant: 'default' },
    ],
  },
  {
    title: 'AI CFO Workspace',
    icon: Bot,
    items: [
      { title: 'AI Workspace', href: '/ai-cfo/workspace' },
      { title: 'Treasury Copilot', href: '/ai-cfo/treasury-copilot', badge: 'AI', badgeVariant: 'default' },
      { title: 'Finance Copilot', href: '/ai-cfo/finance-copilot', badge: 'AI', badgeVariant: 'default' },
      { title: 'Executive Chat', href: '/ai-cfo/executive-chat', badge: 'AI', badgeVariant: 'default' },
      { title: 'Financial Simulator', href: '/ai-cfo/simulator' },
      { title: 'AI Agents', href: '/ai-cfo/agents', badge: 'AI', badgeVariant: 'default' },
      { title: 'Decision Center', href: '/ai-cfo/decision-center' },
    ],
  },
];

export const settingsNavigation: NavigationGroup = {
  title: 'Settings',
  icon: Settings,
  items: [
    { title: 'Notifications', href: '/settings/notifications' },
    { title: 'Workspace', href: '/settings/workspace' },
    { title: 'Saved Views', href: '/settings/saved-views' },
    { title: 'Users', href: '/settings/users' },
    { title: 'Roles', href: '/settings/roles' },
    { title: 'Attributes', href: '/settings/attributes' },
    { title: 'Permissions', href: '/settings/permissions' },
  ],
};

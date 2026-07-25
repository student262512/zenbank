import {
  LayoutDashboard,
  Wallet,
  TrendingUp,
  ArrowDownLeft,
  ArrowUpRight,
  Users,
  Truck,
  CreditCard,
  FolderKanban,
  AlertTriangle,
  BarChart3,
  Bot,
  type LucideIcon,
} from 'lucide-react';

export interface CashFlowNavigationItem {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
  description?: string;
  badge?: string;
  badgeVariant?: 'default' | 'success' | 'warning' | 'danger';
}

export const cashFlowNavigation: CashFlowNavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Cash Flow Dashboard',
    href: '/cash-flow/dashboard',
    icon: LayoutDashboard,
    description: 'Overview of cash position, forecasts, and insights',
  },
  {
    id: 'position',
    title: 'Enterprise Cash Position',
    href: '/cash-flow/position',
    icon: Wallet,
    description: 'Real-time cash position across all entities',
  },
  {
    id: 'forecasting',
    title: 'Cash Forecasting',
    href: '/cash-flow/forecasting',
    icon: TrendingUp,
    description: 'AI-powered cash flow forecasts and scenarios',
    badge: 'AI',
    badgeVariant: 'default',
  },
  {
    id: 'inflow',
    title: 'Cash Inflow Intelligence',
    href: '/cash-flow/inflow',
    icon: ArrowDownLeft,
    description: 'Track and predict incoming cash flows',
  },
  {
    id: 'outflow',
    title: 'Cash Outflow Intelligence',
    href: '/cash-flow/outflow',
    icon: ArrowUpRight,
    description: 'Manage and optimize outgoing payments',
  },
  {
    id: 'collections-forecast',
    title: 'Collections Forecast',
    href: '/cash-flow/collections-forecast',
    icon: Users,
    description: 'Customer collections prediction and aging',
  },
  {
    id: 'vendor-forecast',
    title: 'Vendor Payment Forecast',
    href: '/cash-flow/vendor-forecast',
    icon: Truck,
    description: 'Vendor payment scheduling and optimization',
  },
  {
    id: 'loan-forecast',
    title: 'Loan Repayment Forecast',
    href: '/cash-flow/loan-forecast',
    icon: CreditCard,
    description: 'Debt service and repayment schedules',
  },
  {
    id: 'project-forecast',
    title: 'Project Completion Forecast',
    href: '/cash-flow/project-forecast',
    icon: FolderKanban,
    description: 'Project cash requirements and milestones',
  },
  {
    id: 'risk',
    title: 'Cash Risk Intelligence',
    href: '/cash-flow/risk',
    icon: AlertTriangle,
    description: 'Liquidity risks, alerts, and mitigation',
    badge: '3',
    badgeVariant: 'warning',
  },
  {
    id: 'analytics',
    title: 'Cash Flow Analytics',
    href: '/cash-flow/analytics',
    icon: BarChart3,
    description: 'KPIs, variance analysis, and benchmarking',
  },
  {
    id: 'agent',
    title: 'Cash Flow AI Agent',
    href: '/cash-flow/agent',
    icon: Bot,
    description: 'AI copilot for cash flow management',
    badge: 'AI',
    badgeVariant: 'default',
  },
];

// Tab configurations for each page
export const cashFlowDashboardTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'forecast', label: 'Forecast' },
  { id: 'liquidity', label: 'Liquidity' },
  { id: 'risks', label: 'Risks' },
  { id: 'approvals', label: 'Approvals' },
  { id: 'insights', label: 'Insights' },
];

export const cashPositionTabs = [
  { id: 'global', label: 'Global Position' },
  { id: 'project', label: 'Project Position' },
  { id: 'spv', label: 'SPV Position' },
  { id: 'region', label: 'Region Position' },
  { id: 'bank', label: 'Bank Position' },
  { id: 'currency', label: 'Currency Position' },
  { id: 'liquidity', label: 'Liquidity View' },
];

export const cashForecastingTabs = [
  { id: 'workspace', label: 'Forecast Workspace' },
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'quarterly', label: 'Quarterly' },
  { id: 'yearly', label: 'Yearly' },
  { id: 'scenario', label: 'Scenario Planning' },
  { id: 'accuracy', label: 'Forecast Accuracy' },
  { id: 'versions', label: 'Forecast Versions' },
];

export const cashInflowTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'collections', label: 'Customer Collections' },
  { id: 'advances', label: 'Booking Advances' },
  { id: 'disbursements', label: 'Loan Disbursements' },
  { id: 'rental', label: 'Rental Income' },
  { id: 'interest', label: 'Interest Income' },
  { id: 'refunds', label: 'Refunds' },
  { id: 'other', label: 'Other Receipts' },
];

export const cashOutflowTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'vendors', label: 'Vendor Payments' },
  { id: 'construction', label: 'Construction Bills' },
  { id: 'payroll', label: 'Payroll' },
  { id: 'loan-repayments', label: 'Loan Repayments' },
  { id: 'taxes', label: 'Taxes' },
  { id: 'utilities', label: 'Utilities' },
  { id: 'construction-expenses', label: 'Construction Expenses' },
  { id: 'refunds', label: 'Refunds' },
  { id: 'other', label: 'Other Payments' },
];

export const collectionsForecastTabs = [
  { id: 'aging', label: 'Customer Aging' },
  { id: 'forecast', label: 'Collection Forecast' },
  { id: 'overdue', label: 'Overdue' },
  { id: 'ptp', label: 'Promise to Pay' },
  { id: 'recovery', label: 'Recovery Analysis' },
];

export const vendorForecastTabs = [
  { id: 'upcoming', label: 'Upcoming Payments' },
  { id: 'calendar', label: 'Payment Calendar' },
  { id: 'priority', label: 'Priority Matrix' },
  { id: 'impact', label: 'Cash Impact' },
  { id: 'exceptions', label: 'Exceptions' },
];

export const loanForecastTabs = [
  { id: 'schedule', label: 'Loan Schedule' },
  { id: 'interest', label: 'Interest' },
  { id: 'principal', label: 'Principal' },
  { id: 'upcoming', label: 'Upcoming Payments' },
  { id: 'outlook', label: 'Debt Outlook' },
];

export const projectForecastTabs = [
  { id: 'milestones', label: 'Milestones' },
  { id: 'progress', label: 'Construction Progress' },
  { id: 'requirement', label: 'Cash Requirement' },
  { id: 'timeline', label: 'Funding Timeline' },
  { id: 'forecast', label: 'Forecast' },
];

export const cashRiskTabs = [
  { id: 'liquidity', label: 'Liquidity Risk' },
  { id: 'negative', label: 'Negative Cash' },
  { id: 'funding', label: 'Funding Gap' },
  { id: 'collection', label: 'Collection Risk' },
  { id: 'payment', label: 'Payment Risk' },
  { id: 'leakage', label: 'Cash Leakage' },
  { id: 'fraud', label: 'Fraud Indicators' },
  { id: 'alerts', label: 'Alerts' },
];

export const cashAnalyticsTabs = [
  { id: 'kpis', label: 'KPIs' },
  { id: 'variance', label: 'Variance' },
  { id: 'accuracy', label: 'Forecast Accuracy' },
  { id: 'trends', label: 'Historical Trends' },
  { id: 'benchmarking', label: 'Benchmarking' },
  { id: 'reports', label: 'Executive Reports' },
];

export const cashAgentTabs = [
  { id: 'copilot', label: 'AI Copilot' },
  { id: 'recommendations', label: 'Recommendations' },
  { id: 'investigations', label: 'Investigations' },
  { id: 'simulator', label: 'Scenario Simulator' },
  { id: 'knowledge', label: 'Knowledge' },
  { id: 'automations', label: 'Automations' },
];

export default cashFlowNavigation;

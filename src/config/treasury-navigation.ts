import {
  LayoutDashboard,
  Building2,
  Plug,
  Handshake,
  Droplets,
  Layers,
  GitMerge,
  ArrowLeftRight,
  PiggyBank,
  Currency,
  AlertTriangle,
  BarChart3,
  Bot,
  FlaskConical,
  type LucideIcon,
} from 'lucide-react';

export interface TreasuryNavigationItem {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
  description?: string;
  badge?: string;
  badgeVariant?: 'default' | 'success' | 'warning' | 'danger';
}

export const treasuryNavigation: TreasuryNavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Treasury Dashboard',
    href: '/treasury/dashboard',
    icon: LayoutDashboard,
    description: 'Overview of treasury operations and key metrics',
  },
  {
    id: 'bank-management',
    title: 'Bank Management',
    href: '/treasury/bank-management',
    icon: Building2,
    description: 'Manage bank accounts, balances, and statements',
  },
  {
    id: 'bank-connectivity',
    title: 'Bank Connectivity',
    href: '/treasury/bank-connectivity',
    icon: Plug,
    description: 'Bank integrations, APIs, and file transfers',
  },
  {
    id: 'bank-relationship',
    title: 'Bank Relationship Management',
    href: '/treasury/bank-relationship',
    icon: Handshake,
    description: 'Manage bank relationships and service agreements',
  },
  {
    id: 'liquidity',
    title: 'Liquidity Management',
    href: '/treasury/liquidity',
    icon: Droplets,
    description: 'Monitor and optimize liquidity across entities',
  },
  {
    id: 'cash-pooling',
    title: 'Cash Pooling',
    href: '/treasury/cash-pooling',
    icon: Layers,
    description: 'Physical and notional cash pooling structures',
  },
  {
    id: 'cash-concentration',
    title: 'Cash Concentration',
    href: '/treasury/cash-concentration',
    icon: GitMerge,
    description: 'Automated sweeping and target balancing',
  },
  {
    id: 'intercompany',
    title: 'Intercompany Funding',
    href: '/treasury/intercompany',
    icon: ArrowLeftRight,
    description: 'Intercompany loans, transfers, and settlements',
  },
  {
    id: 'investments',
    title: 'Treasury Investments',
    href: '/treasury/investments',
    icon: PiggyBank,
    description: 'Fixed deposits, liquid funds, and money market',
  },
  {
    id: 'fx-management',
    title: 'FX Management',
    href: '/treasury/fx-management',
    icon: Currency,
    description: 'Foreign exchange exposures and hedging',
  },
  {
    id: 'risk',
    title: 'Treasury Risk',
    href: '/treasury/risk',
    icon: AlertTriangle,
    description: 'Treasury risk monitoring and mitigation',
    badge: '2',
    badgeVariant: 'warning',
  },
  {
    id: 'analytics',
    title: 'Treasury Analytics',
    href: '/treasury/analytics',
    icon: BarChart3,
    description: 'KPIs, reports, and treasury performance',
  },
  {
    id: 'agent',
    title: 'Treasury AI Agent',
    href: '/treasury/agent',
    icon: Bot,
    description: 'AI copilot for treasury operations',
    badge: 'AI',
    badgeVariant: 'default',
  },
  {
    id: 'simulator',
    title: 'Scenario Simulator',
    href: '/treasury/simulator',
    icon: FlaskConical,
    description: 'What-if analysis and scenario planning',
    badge: 'AI',
    badgeVariant: 'default',
  },
];

// Tab configurations for each treasury page
export const treasuryDashboardTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'liquidity', label: 'Liquidity' },
  { id: 'positions', label: 'Positions' },
  { id: 'alerts', label: 'Alerts' },
  { id: 'approvals', label: 'Approvals' },
  { id: 'insights', label: 'AI Insights' },
];

export const bankManagementTabs = [
  { id: 'accounts', label: 'Bank Accounts' },
  { id: 'balances', label: 'Balances' },
  { id: 'statements', label: 'Statements' },
  { id: 'transactions', label: 'Transactions' },
  { id: 'signatories', label: 'Signatories' },
  { id: 'mandates', label: 'Mandates' },
];

export const bankConnectivityTabs = [
  { id: 'connections', label: 'Connections' },
  { id: 'apis', label: 'API Integrations' },
  { id: 'file-transfers', label: 'File Transfers' },
  { id: 'formats', label: 'File Formats' },
  { id: 'schedules', label: 'Schedules' },
  { id: 'logs', label: 'Activity Logs' },
];

export const bankRelationshipTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'contacts', label: 'Bank Contacts' },
  { id: 'agreements', label: 'Service Agreements' },
  { id: 'fees', label: 'Fees & Charges' },
  { id: 'facilities', label: 'Credit Facilities' },
  { id: 'performance', label: 'Performance' },
];

export const liquidityManagementTabs = [
  { id: 'dashboard', label: 'Liquidity Dashboard' },
  { id: 'positions', label: 'Position Analysis' },
  { id: 'forecast', label: 'Liquidity Forecast' },
  { id: 'stress-test', label: 'Stress Testing' },
  { id: 'buffer', label: 'Buffer Analysis' },
  { id: 'optimization', label: 'Optimization' },
];

export const cashPoolingTabs = [
  { id: 'structures', label: 'Pool Structures' },
  { id: 'physical', label: 'Physical Pooling' },
  { id: 'notional', label: 'Notional Pooling' },
  { id: 'interest', label: 'Interest Allocation' },
  { id: 'performance', label: 'Performance' },
  { id: 'settings', label: 'Settings' },
];

export const cashConcentrationTabs = [
  { id: 'sweeps', label: 'Sweep Rules' },
  { id: 'target-balancing', label: 'Target Balancing' },
  { id: 'zba', label: 'Zero Balance' },
  { id: 'schedules', label: 'Schedules' },
  { id: 'history', label: 'History' },
  { id: 'exceptions', label: 'Exceptions' },
];

export const intercompanyFundingTabs = [
  { id: 'loans', label: 'IC Loans' },
  { id: 'transfers', label: 'IC Transfers' },
  { id: 'settlements', label: 'Settlements' },
  { id: 'netting', label: 'Netting' },
  { id: 'interest', label: 'Interest' },
  { id: 'compliance', label: 'Compliance' },
];

export const treasuryInvestmentsTabs = [
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'fixed-deposits', label: 'Fixed Deposits' },
  { id: 'liquid-funds', label: 'Liquid Funds' },
  { id: 'money-market', label: 'Money Market' },
  { id: 'maturities', label: 'Maturities' },
  { id: 'yields', label: 'Yield Analysis' },
];

export const fxManagementTabs = [
  { id: 'exposures', label: 'FX Exposures' },
  { id: 'rates', label: 'Exchange Rates' },
  { id: 'hedging', label: 'Hedging' },
  { id: 'forwards', label: 'Forwards' },
  { id: 'options', label: 'Options' },
  { id: 'settlements', label: 'Settlements' },
];

export const treasuryRiskTabs = [
  { id: 'dashboard', label: 'Risk Dashboard' },
  { id: 'liquidity-risk', label: 'Liquidity Risk' },
  { id: 'counterparty', label: 'Counterparty Risk' },
  { id: 'interest-rate', label: 'Interest Rate Risk' },
  { id: 'fx-risk', label: 'FX Risk' },
  { id: 'limits', label: 'Limits & Breaches' },
];

export const treasuryAnalyticsTabs = [
  { id: 'kpis', label: 'KPIs' },
  { id: 'performance', label: 'Performance' },
  { id: 'cost-analysis', label: 'Cost Analysis' },
  { id: 'benchmarking', label: 'Benchmarking' },
  { id: 'trends', label: 'Trends' },
  { id: 'reports', label: 'Reports' },
];

export const treasuryAgentTabs = [
  { id: 'copilot', label: 'AI Copilot' },
  { id: 'recommendations', label: 'Recommendations' },
  { id: 'investigations', label: 'Investigations' },
  { id: 'automations', label: 'Automations' },
  { id: 'knowledge', label: 'Knowledge Base' },
  { id: 'history', label: 'History' },
];

export const scenarioSimulatorTabs = [
  { id: 'scenarios', label: 'Scenarios' },
  { id: 'what-if', label: 'What-If Analysis' },
  { id: 'stress-test', label: 'Stress Testing' },
  { id: 'monte-carlo', label: 'Monte Carlo' },
  { id: 'results', label: 'Results' },
  { id: 'saved', label: 'Saved Scenarios' },
];

export default treasuryNavigation;

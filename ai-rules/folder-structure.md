# ZenBank Folder Structure & PowerShell Setup Script

## Complete Directory Tree

```
E:\apps\zenbank\
│
├── .env.local                          # Environment variables
├── .env.example                        # Environment template
├── drizzle.config.ts                   # Drizzle ORM configuration
│
├── drizzle/                            # Database migrations
│   └── migrations/
│
├── public/
│   ├── images/
│   │   ├── logo/
│   │   └── icons/
│   └── fonts/
│
└── src/
    │
    ├── app/
    │   ├── (auth)/
    │   │   ├── login/
    │   │   │   └── page.tsx
    │   │   ├── register/
    │   │   │   └── page.tsx
    │   │   ├── forgot-password/
    │   │   │   └── page.tsx
    │   │   ├── reset-password/
    │   │   │   └── page.tsx
    │   │   └── layout.tsx
    │   │
    │   ├── (dashboard)/
    │   │   ├── layout.tsx
    │   │   │
    │   │   ├── executive/
    │   │   │   ├── command-center/
    │   │   │   │   └── page.tsx
    │   │   │   └── dashboard/
    │   │   │       └── page.tsx
    │   │   │
    │   │   ├── cash-flow/
    │   │   │   ├── position/
    │   │   │   │   └── page.tsx
    │   │   │   ├── forecasting/
    │   │   │   │   └── page.tsx
    │   │   │   ├── inflow/
    │   │   │   │   └── page.tsx
    │   │   │   ├── outflow/
    │   │   │   │   └── page.tsx
    │   │   │   ├── risk/
    │   │   │   │   └── page.tsx
    │   │   │   ├── analytics/
    │   │   │   │   └── page.tsx
    │   │   │   └── agent/
    │   │   │       └── page.tsx
    │   │   │
    │   │   ├── treasury/
    │   │   │   ├── bank-management/
    │   │   │   │   └── page.tsx
    │   │   │   ├── liquidity/
    │   │   │   │   └── page.tsx
    │   │   │   ├── dashboard/
    │   │   │   │   └── page.tsx
    │   │   │   ├── risk/
    │   │   │   │   └── page.tsx
    │   │   │   ├── ai/
    │   │   │   │   └── page.tsx
    │   │   │   └── operations/
    │   │   │       └── page.tsx
    │   │   │
    │   │   ├── project-finance/
    │   │   │   ├── funding-sources/
    │   │   │   │   └── page.tsx
    │   │   │   ├── drawdown/
    │   │   │   │   └── page.tsx
    │   │   │   ├── capital/
    │   │   │   │   └── page.tsx
    │   │   │   ├── irr/
    │   │   │   │   └── page.tsx
    │   │   │   ├── analytics/
    │   │   │   │   └── page.tsx
    │   │   │   └── allocation-ai/
    │   │   │       └── page.tsx
    │   │   │
    │   │   ├── loan-debt/
    │   │   │   ├── portfolio/
    │   │   │   │   └── page.tsx
    │   │   │   ├── register/
    │   │   │   │   └── page.tsx
    │   │   │   ├── interest/
    │   │   │   │   └── page.tsx
    │   │   │   ├── principal/
    │   │   │   │   └── page.tsx
    │   │   │   ├── refinancing/
    │   │   │   │   └── page.tsx
    │   │   │   └── analytics/
    │   │   │       └── page.tsx
    │   │   │
    │   │   ├── covenants/
    │   │   │   ├── dashboard/
    │   │   │   │   └── page.tsx
    │   │   │   ├── compliance/
    │   │   │   │   └── page.tsx
    │   │   │   ├── breaches/
    │   │   │   │   └── page.tsx
    │   │   │   ├── early-warning/
    │   │   │   │   └── page.tsx
    │   │   │   └── ai-recommendations/
    │   │   │       └── page.tsx
    │   │   │
    │   │   ├── escrow/
    │   │   │   ├── accounts/
    │   │   │   │   └── page.tsx
    │   │   │   ├── releases/
    │   │   │   │   └── page.tsx
    │   │   │   ├── compliance/
    │   │   │   │   └── page.tsx
    │   │   │   ├── reconciliation/
    │   │   │   │   └── page.tsx
    │   │   │   └── ai-monitoring/
    │   │   │       └── page.tsx
    │   │   │
    │   │   ├── working-capital/
    │   │   │   ├── receivables/
    │   │   │   │   └── page.tsx
    │   │   │   ├── payables/
    │   │   │   │   └── page.tsx
    │   │   │   ├── cash-conversion/
    │   │   │   │   └── page.tsx
    │   │   │   ├── dynamic-discounting/
    │   │   │   │   └── page.tsx
    │   │   │   └── supply-chain-finance/
    │   │   │       └── page.tsx
    │   │   │
    │   │   ├── budget/
    │   │   │   ├── annual/
    │   │   │   │   └── page.tsx
    │   │   │   ├── rolling-forecast/
    │   │   │   │   └── page.tsx
    │   │   │   ├── variance/
    │   │   │   │   └── page.tsx
    │   │   │   ├── approval/
    │   │   │   │   └── page.tsx
    │   │   │   └── ai/
    │   │   │       └── page.tsx
    │   │   │
    │   │   ├── payments/
    │   │   │   ├── factory/
    │   │   │   │   └── page.tsx
    │   │   │   ├── queue/
    │   │   │   │   └── page.tsx
    │   │   │   ├── priority/
    │   │   │   │   └── page.tsx
    │   │   │   ├── approvals/
    │   │   │   │   └── page.tsx
    │   │   │   └── analytics/
    │   │   │       └── page.tsx
    │   │   │
    │   │   ├── reconciliation/
    │   │   │   ├── auto-match/
    │   │   │   │   └── page.tsx
    │   │   │   ├── exceptions/
    │   │   │   │   └── page.tsx
    │   │   │   ├── manual/
    │   │   │   │   └── page.tsx
    │   │   │   ├── ai-match/
    │   │   │   │   └── page.tsx
    │   │   │   └── dashboard/
    │   │   │       └── page.tsx
    │   │   │
    │   │   ├── collections/
    │   │   │   ├── dashboard/
    │   │   │   │   └── page.tsx
    │   │   │   ├── customer-risk/
    │   │   │   │   └── page.tsx
    │   │   │   ├── promise-to-pay/
    │   │   │   │   └── page.tsx
    │   │   │   ├── campaigns/
    │   │   │   │   └── page.tsx
    │   │   │   └── ai-collector/
    │   │   │       └── page.tsx
    │   │   │
    │   │   ├── revenue/
    │   │   │   ├── dashboard/
    │   │   │   │   └── page.tsx
    │   │   │   ├── recognition/
    │   │   │   │   └── page.tsx
    │   │   │   ├── leakage/
    │   │   │   │   └── page.tsx
    │   │   │   ├── margin/
    │   │   │   │   └── page.tsx
    │   │   │   └── ai/
    │   │   │       └── page.tsx
    │   │   │
    │   │   ├── fpa/
    │   │   │   ├── planning/
    │   │   │   │   └── page.tsx
    │   │   │   ├── forecasting/
    │   │   │   │   └── page.tsx
    │   │   │   ├── what-if/
    │   │   │   │   └── page.tsx
    │   │   │   ├── scenarios/
    │   │   │   │   └── page.tsx
    │   │   │   └── executive/
    │   │   │       └── page.tsx
    │   │   │
    │   │   ├── investments/
    │   │   │   ├── dashboard/
    │   │   │   │   └── page.tsx
    │   │   │   ├── fds/
    │   │   │   │   └── page.tsx
    │   │   │   ├── liquid-funds/
    │   │   │   │   └── page.tsx
    │   │   │   ├── portfolio/
    │   │   │   │   └── page.tsx
    │   │   │   └── yield/
    │   │   │       └── page.tsx
    │   │   │
    │   │   ├── fx-risk/
    │   │   │   ├── exposure/
    │   │   │   │   └── page.tsx
    │   │   │   ├── hedging/
    │   │   │   │   └── page.tsx
    │   │   │   ├── forwards/
    │   │   │   │   └── page.tsx
    │   │   │   ├── interest-risk/
    │   │   │   │   └── page.tsx
    │   │   │   └── market-risk/
    │   │   │       └── page.tsx
    │   │   │
    │   │   ├── financial-close/
    │   │   │   ├── calendar/
    │   │   │   │   └── page.tsx
    │   │   │   ├── checklist/
    │   │   │   │   └── page.tsx
    │   │   │   ├── mis/
    │   │   │   │   └── page.tsx
    │   │   │   ├── board-reports/
    │   │   │   │   └── page.tsx
    │   │   │   └── narrative-ai/
    │   │   │       └── page.tsx
    │   │   │
    │   │   ├── ai-cfo/
    │   │   │   ├── workspace/
    │   │   │   │   └── page.tsx
    │   │   │   ├── treasury-copilot/
    │   │   │   │   └── page.tsx
    │   │   │   ├── finance-copilot/
    │   │   │   │   └── page.tsx
    │   │   │   ├── executive-chat/
    │   │   │   │   └── page.tsx
    │   │   │   ├── simulator/
    │   │   │   │   └── page.tsx
    │   │   │   ├── agents/
    │   │   │   │   └── page.tsx
    │   │   │   └── decision-center/
    │   │   │       └── page.tsx
    │   │   │
    │   │   └── settings/
    │   │       ├── notifications/
    │   │       │   └── page.tsx
    │   │       ├── workspace/
    │   │       │   └── page.tsx
    │   │       ├── saved-views/
    │   │       │   └── page.tsx
    │   │       ├── users/
    │   │       │   └── page.tsx
    │   │       ├── roles/
    │   │       │   └── page.tsx
    │   │       ├── attributes/
    │   │       │   └── page.tsx
    │   │       └── permissions/
    │   │           └── page.tsx
    │   │
    │   ├── api/
    │   │   ├── auth/
    │   │   │   └── [...all]/
    │   │   │       └── route.ts
    │   │   ├── cash-flow/
    │   │   │   └── route.ts
    │   │   ├── treasury/
    │   │   │   └── route.ts
    │   │   ├── project-finance/
    │   │   │   └── route.ts
    │   │   ├── loan-debt/
    │   │   │   └── route.ts
    │   │   ├── covenants/
    │   │   │   └── route.ts
    │   │   ├── escrow/
    │   │   │   └── route.ts
    │   │   ├── working-capital/
    │   │   │   └── route.ts
    │   │   ├── budget/
    │   │   │   └── route.ts
    │   │   ├── payments/
    │   │   │   └── route.ts
    │   │   ├── reconciliation/
    │   │   │   └── route.ts
    │   │   ├── collections/
    │   │   │   └── route.ts
    │   │   ├── revenue/
    │   │   │   └── route.ts
    │   │   ├── fpa/
    │   │   │   └── route.ts
    │   │   ├── investments/
    │   │   │   └── route.ts
    │   │   ├── fx-risk/
    │   │   │   └── route.ts
    │   │   ├── financial-close/
    │   │   │   └── route.ts
    │   │   └── ai/
    │   │       ├── agents/
    │   │       │   └── route.ts
    │   │       └── chat/
    │   │           └── route.ts
    │   │
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── globals.css
    │   ├── not-found.tsx
    │   ├── error.tsx
    │   └── loading.tsx
    │
    ├── components/
    │   ├── ui/
    │   │   ├── button.tsx
    │   │   ├── input.tsx
    │   │   ├── select.tsx
    │   │   ├── checkbox.tsx
    │   │   ├── radio.tsx
    │   │   ├── switch.tsx
    │   │   ├── slider.tsx
    │   │   ├── textarea.tsx
    │   │   ├── label.tsx
    │   │   ├── badge.tsx
    │   │   ├── avatar.tsx
    │   │   ├── card.tsx
    │   │   ├── dialog.tsx
    │   │   ├── drawer.tsx
    │   │   ├── dropdown-menu.tsx
    │   │   ├── popover.tsx
    │   │   ├── tooltip.tsx
    │   │   ├── toast.tsx
    │   │   ├── tabs.tsx
    │   │   ├── accordion.tsx
    │   │   ├── alert.tsx
    │   │   ├── progress.tsx
    │   │   ├── skeleton.tsx
    │   │   ├── separator.tsx
    │   │   ├── scroll-area.tsx
    │   │   ├── command.tsx
    │   │   ├── calendar.tsx
    │   │   ├── date-picker.tsx
    │   │   └── index.ts
    │   │
    │   ├── layout/
    │   │   ├── top-nav.tsx
    │   │   ├── sidebar.tsx
    │   │   ├── sidebar-item.tsx
    │   │   ├── sidebar-accordion.tsx
    │   │   ├── footer.tsx
    │   │   ├── header.tsx
    │   │   ├── breadcrumb.tsx
    │   │   └── index.ts
    │   │
    │   ├── shared/
    │   │   ├── data-table/
    │   │   │   ├── data-table.tsx
    │   │   │   ├── columns.tsx
    │   │   │   ├── toolbar.tsx
    │   │   │   ├── pagination.tsx
    │   │   │   ├── filters.tsx
    │   │   │   └── index.ts
    │   │   ├── charts/
    │   │   │   ├── line-chart.tsx
    │   │   │   ├── bar-chart.tsx
    │   │   │   ├── pie-chart.tsx
    │   │   │   ├── area-chart.tsx
    │   │   │   ├── waterfall-chart.tsx
    │   │   │   ├── heatmap.tsx
    │   │   │   └── index.ts
    │   │   ├── kpi-card.tsx
    │   │   ├── stat-card.tsx
    │   │   ├── trend-indicator.tsx
    │   │   ├── currency-display.tsx
    │   │   ├── percentage-display.tsx
    │   │   ├── date-range-picker.tsx
    │   │   ├── search-input.tsx
    │   │   ├── filter-bar.tsx
    │   │   ├── export-button.tsx
    │   │   ├── import-button.tsx
    │   │   ├── bulk-actions.tsx
    │   │   ├── empty-state.tsx
    │   │   ├── loading-state.tsx
    │   │   ├── error-state.tsx
    │   │   ├── ai-insight-card.tsx
    │   │   ├── risk-badge.tsx
    │   │   ├── health-score.tsx
    │   │   ├── audit-trail.tsx
    │   │   ├── comments-panel.tsx
    │   │   ├── attachments-panel.tsx
    │   │   └── index.ts
    │   │
    │   ├── forms/
    │   │   ├── form-field.tsx
    │   │   ├── form-section.tsx
    │   │   ├── form-actions.tsx
    │   │   ├── currency-input.tsx
    │   │   ├── percentage-input.tsx
    │   │   ├── entity-select.tsx
    │   │   ├── bank-select.tsx
    │   │   ├── project-select.tsx
    │   │   ├── date-input.tsx
    │   │   └── index.ts
    │   │
    │   └── features/
    │       ├── cash-flow/
    │       │   ├── position-summary.tsx
    │       │   ├── forecast-chart.tsx
    │       │   ├── inflow-table.tsx
    │       │   ├── outflow-table.tsx
    │       │   └── index.ts
    │       ├── treasury/
    │       │   ├── bank-card.tsx
    │       │   ├── liquidity-gauge.tsx
    │       │   ├── exposure-chart.tsx
    │       │   └── index.ts
    │       ├── project-finance/
    │       │   ├── funding-stack.tsx
    │       │   ├── drawdown-timeline.tsx
    │       │   ├── irr-calculator.tsx
    │       │   └── index.ts
    │       ├── loan-debt/
    │       │   ├── debt-ladder.tsx
    │       │   ├── maturity-wall.tsx
    │       │   ├── schedule-table.tsx
    │       │   └── index.ts
    │       ├── covenants/
    │       │   ├── covenant-card.tsx
    │       │   ├── compliance-gauge.tsx
    │       │   ├── breach-alert.tsx
    │       │   └── index.ts
    │       ├── escrow/
    │       │   ├── escrow-card.tsx
    │       │   ├── release-timeline.tsx
    │       │   └── index.ts
    │       ├── working-capital/
    │       │   ├── ccc-chart.tsx
    │       │   ├── aging-chart.tsx
    │       │   └── index.ts
    │       ├── budget/
    │       │   ├── variance-chart.tsx
    │       │   ├── budget-tree.tsx
    │       │   └── index.ts
    │       ├── payments/
    │       │   ├── payment-queue.tsx
    │       │   ├── priority-badge.tsx
    │       │   └── index.ts
    │       ├── reconciliation/
    │       │   ├── match-card.tsx
    │       │   ├── exception-table.tsx
    │       │   └── index.ts
    │       ├── collections/
    │       │   ├── collection-card.tsx
    │       │   ├── risk-matrix.tsx
    │       │   └── index.ts
    │       ├── revenue/
    │       │   ├── revenue-waterfall.tsx
    │       │   ├── leakage-chart.tsx
    │       │   └── index.ts
    │       ├── fpa/
    │       │   ├── scenario-card.tsx
    │       │   ├── planning-table.tsx
    │       │   └── index.ts
    │       ├── investments/
    │       │   ├── portfolio-chart.tsx
    │       │   ├── maturity-ladder.tsx
    │       │   └── index.ts
    │       ├── fx-risk/
    │       │   ├── exposure-table.tsx
    │       │   ├── hedge-chart.tsx
    │       │   └── index.ts
    │       ├── financial-close/
    │       │   ├── close-checklist.tsx
    │       │   ├── calendar-view.tsx
    │       │   └── index.ts
    │       └── ai/
    │           ├── chat-interface.tsx
    │           ├── agent-card.tsx
    │           ├── insight-panel.tsx
    │           ├── recommendation-card.tsx
    │           └── index.ts
    │
    ├── lib/
    │   ├── auth.ts
    │   ├── auth-client.ts
    │   ├── db.ts
    │   ├── utils.ts
    │   ├── cn.ts
    │   ├── constants.ts
    │   ├── formatters.ts
    │   ├── validators.ts
    │   └── api-client.ts
    │
    ├── db/
    │   ├── index.ts
    │   ├── schema/
    │   │   ├── users.ts
    │   │   ├── sessions.ts
    │   │   ├── organizations.ts
    │   │   ├── projects.ts
    │   │   ├── bank-accounts.ts
    │   │   ├── transactions.ts
    │   │   ├── cash-positions.ts
    │   │   ├── forecasts.ts
    │   │   ├── loans.ts
    │   │   ├── covenants.ts
    │   │   ├── escrow-accounts.ts
    │   │   ├── budgets.ts
    │   │   ├── payments.ts
    │   │   ├── reconciliations.ts
    │   │   ├── collections.ts
    │   │   ├── revenues.ts
    │   │   ├── investments.ts
    │   │   ├── fx-exposures.ts
    │   │   ├── audit-logs.ts
    │   │   └── index.ts
    │   └── queries/
    │       ├── users.ts
    │       ├── cash-flow.ts
    │       ├── treasury.ts
    │       ├── project-finance.ts
    │       ├── loan-debt.ts
    │       ├── covenants.ts
    │       ├── escrow.ts
    │       ├── working-capital.ts
    │       ├── budget.ts
    │       ├── payments.ts
    │       ├── reconciliation.ts
    │       ├── collections.ts
    │       ├── revenue.ts
    │       ├── fpa.ts
    │       ├── investments.ts
    │       ├── fx-risk.ts
    │       └── index.ts
    │
    ├── services/
    │   ├── cash-flow.service.ts
    │   ├── treasury.service.ts
    │   ├── project-finance.service.ts
    │   ├── loan-debt.service.ts
    │   ├── covenants.service.ts
    │   ├── escrow.service.ts
    │   ├── working-capital.service.ts
    │   ├── budget.service.ts
    │   ├── payments.service.ts
    │   ├── reconciliation.service.ts
    │   ├── collections.service.ts
    │   ├── revenue.service.ts
    │   ├── fpa.service.ts
    │   ├── investments.service.ts
    │   ├── fx-risk.service.ts
    │   ├── ai.service.ts
    │   └── index.ts
    │
    ├── hooks/
    │   ├── use-auth.ts
    │   ├── use-user.ts
    │   ├── use-debounce.ts
    │   ├── use-local-storage.ts
    │   ├── use-media-query.ts
    │   ├── use-cash-flow.ts
    │   ├── use-treasury.ts
    │   ├── use-projects.ts
    │   ├── use-loans.ts
    │   ├── use-covenants.ts
    │   ├── use-escrow.ts
    │   ├── use-budget.ts
    │   ├── use-payments.ts
    │   ├── use-reconciliation.ts
    │   ├── use-collections.ts
    │   ├── use-revenue.ts
    │   ├── use-investments.ts
    │   ├── use-fx-risk.ts
    │   └── index.ts
    │
    ├── types/
    │   ├── auth.ts
    │   ├── user.ts
    │   ├── organization.ts
    │   ├── project.ts
    │   ├── bank-account.ts
    │   ├── transaction.ts
    │   ├── cash-flow.ts
    │   ├── treasury.ts
    │   ├── loan.ts
    │   ├── covenant.ts
    │   ├── escrow.ts
    │   ├── budget.ts
    │   ├── payment.ts
    │   ├── reconciliation.ts
    │   ├── collection.ts
    │   ├── revenue.ts
    │   ├── investment.ts
    │   ├── fx.ts
    │   ├── ai.ts
    │   ├── api.ts
    │   └── index.ts
    │
    ├── agents/
    │   ├── base-agent.ts
    │   ├── cash-flow-agent.ts
    │   ├── treasury-agent.ts
    │   ├── cfo-agent.ts
    │   ├── controller-agent.ts
    │   ├── collections-agent.ts
    │   ├── payment-agent.ts
    │   ├── budget-agent.ts
    │   ├── forecast-agent.ts
    │   ├── project-finance-agent.ts
    │   ├── debt-agent.ts
    │   ├── investment-agent.ts
    │   ├── covenant-agent.ts
    │   ├── escrow-agent.ts
    │   ├── reconciliation-agent.ts
    │   ├── fraud-agent.ts
    │   ├── working-capital-agent.ts
    │   ├── scenario-agent.ts
    │   └── index.ts
    │
    ├── config/
    │   ├── site.ts
    │   ├── navigation.ts
    │   ├── dashboard.ts
    │   └── index.ts
    │
    └── styles/
        └── themes/
            ├── light.css
            └── dark.css
```

---

## PowerShell Script - Create All Directories

Copy and run this script in PowerShell from the project root (`E:\apps\zenbank`):

```powershell
# ZenBank Folder Structure Generator
# Run from project root: E:\apps\zenbank

$baseDir = "E:\apps\zenbank"
Set-Location $baseDir

# Root level directories
$rootDirs = @(
    "drizzle/migrations",
    "public/images/logo",
    "public/images/icons",
    "public/fonts"
)

# App Router - Auth pages
$authDirs = @(
    "src/app/(auth)/login",
    "src/app/(auth)/register",
    "src/app/(auth)/forgot-password",
    "src/app/(auth)/reset-password"
)

# App Router - Dashboard modules
$dashboardDirs = @(
    # Executive Intelligence
    "src/app/(dashboard)/executive/command-center",
    "src/app/(dashboard)/executive/dashboard",

    # Cash Flow Intelligence
    "src/app/(dashboard)/cash-flow/position",
    "src/app/(dashboard)/cash-flow/forecasting",
    "src/app/(dashboard)/cash-flow/inflow",
    "src/app/(dashboard)/cash-flow/outflow",
    "src/app/(dashboard)/cash-flow/risk",
    "src/app/(dashboard)/cash-flow/analytics",
    "src/app/(dashboard)/cash-flow/agent",

    # Treasury Management
    "src/app/(dashboard)/treasury/bank-management",
    "src/app/(dashboard)/treasury/liquidity",
    "src/app/(dashboard)/treasury/dashboard",
    "src/app/(dashboard)/treasury/risk",
    "src/app/(dashboard)/treasury/ai",
    "src/app/(dashboard)/treasury/operations",

    # Project Finance
    "src/app/(dashboard)/project-finance/funding-sources",
    "src/app/(dashboard)/project-finance/drawdown",
    "src/app/(dashboard)/project-finance/capital",
    "src/app/(dashboard)/project-finance/irr",
    "src/app/(dashboard)/project-finance/analytics",
    "src/app/(dashboard)/project-finance/allocation-ai",

    # Loan & Debt Management
    "src/app/(dashboard)/loan-debt/portfolio",
    "src/app/(dashboard)/loan-debt/register",
    "src/app/(dashboard)/loan-debt/interest",
    "src/app/(dashboard)/loan-debt/principal",
    "src/app/(dashboard)/loan-debt/refinancing",
    "src/app/(dashboard)/loan-debt/analytics",

    # Loan Covenant Monitoring
    "src/app/(dashboard)/covenants/dashboard",
    "src/app/(dashboard)/covenants/compliance",
    "src/app/(dashboard)/covenants/breaches",
    "src/app/(dashboard)/covenants/early-warning",
    "src/app/(dashboard)/covenants/ai-recommendations",

    # Escrow Management
    "src/app/(dashboard)/escrow/accounts",
    "src/app/(dashboard)/escrow/releases",
    "src/app/(dashboard)/escrow/compliance",
    "src/app/(dashboard)/escrow/reconciliation",
    "src/app/(dashboard)/escrow/ai-monitoring",

    # Working Capital
    "src/app/(dashboard)/working-capital/receivables",
    "src/app/(dashboard)/working-capital/payables",
    "src/app/(dashboard)/working-capital/cash-conversion",
    "src/app/(dashboard)/working-capital/dynamic-discounting",
    "src/app/(dashboard)/working-capital/supply-chain-finance",

    # Budget Intelligence
    "src/app/(dashboard)/budget/annual",
    "src/app/(dashboard)/budget/rolling-forecast",
    "src/app/(dashboard)/budget/variance",
    "src/app/(dashboard)/budget/approval",
    "src/app/(dashboard)/budget/ai",

    # Payment Intelligence
    "src/app/(dashboard)/payments/factory",
    "src/app/(dashboard)/payments/queue",
    "src/app/(dashboard)/payments/priority",
    "src/app/(dashboard)/payments/approvals",
    "src/app/(dashboard)/payments/analytics",

    # Bank Reconciliation
    "src/app/(dashboard)/reconciliation/auto-match",
    "src/app/(dashboard)/reconciliation/exceptions",
    "src/app/(dashboard)/reconciliation/manual",
    "src/app/(dashboard)/reconciliation/ai-match",
    "src/app/(dashboard)/reconciliation/dashboard",

    # Collections Intelligence
    "src/app/(dashboard)/collections/dashboard",
    "src/app/(dashboard)/collections/customer-risk",
    "src/app/(dashboard)/collections/promise-to-pay",
    "src/app/(dashboard)/collections/campaigns",
    "src/app/(dashboard)/collections/ai-collector",

    # Revenue Intelligence
    "src/app/(dashboard)/revenue/dashboard",
    "src/app/(dashboard)/revenue/recognition",
    "src/app/(dashboard)/revenue/leakage",
    "src/app/(dashboard)/revenue/margin",
    "src/app/(dashboard)/revenue/ai",

    # FP&A
    "src/app/(dashboard)/fpa/planning",
    "src/app/(dashboard)/fpa/forecasting",
    "src/app/(dashboard)/fpa/what-if",
    "src/app/(dashboard)/fpa/scenarios",
    "src/app/(dashboard)/fpa/executive",

    # Investment Management
    "src/app/(dashboard)/investments/dashboard",
    "src/app/(dashboard)/investments/fds",
    "src/app/(dashboard)/investments/liquid-funds",
    "src/app/(dashboard)/investments/portfolio",
    "src/app/(dashboard)/investments/yield",

    # FX & Treasury Risk
    "src/app/(dashboard)/fx-risk/exposure",
    "src/app/(dashboard)/fx-risk/hedging",
    "src/app/(dashboard)/fx-risk/forwards",
    "src/app/(dashboard)/fx-risk/interest-risk",
    "src/app/(dashboard)/fx-risk/market-risk",

    # Financial Close & Reporting
    "src/app/(dashboard)/financial-close/calendar",
    "src/app/(dashboard)/financial-close/checklist",
    "src/app/(dashboard)/financial-close/mis",
    "src/app/(dashboard)/financial-close/board-reports",
    "src/app/(dashboard)/financial-close/narrative-ai",

    # AI CFO Workspace
    "src/app/(dashboard)/ai-cfo/workspace",
    "src/app/(dashboard)/ai-cfo/treasury-copilot",
    "src/app/(dashboard)/ai-cfo/finance-copilot",
    "src/app/(dashboard)/ai-cfo/executive-chat",
    "src/app/(dashboard)/ai-cfo/simulator",
    "src/app/(dashboard)/ai-cfo/agents",
    "src/app/(dashboard)/ai-cfo/decision-center",

    # Settings
    "src/app/(dashboard)/settings/notifications",
    "src/app/(dashboard)/settings/workspace",
    "src/app/(dashboard)/settings/saved-views",
    "src/app/(dashboard)/settings/users",
    "src/app/(dashboard)/settings/roles",
    "src/app/(dashboard)/settings/attributes",
    "src/app/(dashboard)/settings/permissions"
)

# API Routes
$apiDirs = @(
    "src/app/api/auth/[...all]",
    "src/app/api/cash-flow",
    "src/app/api/treasury",
    "src/app/api/project-finance",
    "src/app/api/loan-debt",
    "src/app/api/covenants",
    "src/app/api/escrow",
    "src/app/api/working-capital",
    "src/app/api/budget",
    "src/app/api/payments",
    "src/app/api/reconciliation",
    "src/app/api/collections",
    "src/app/api/revenue",
    "src/app/api/fpa",
    "src/app/api/investments",
    "src/app/api/fx-risk",
    "src/app/api/financial-close",
    "src/app/api/ai/agents",
    "src/app/api/ai/chat"
)

# Components
$componentDirs = @(
    "src/components/ui",
    "src/components/layout",
    "src/components/shared/data-table",
    "src/components/shared/charts",
    "src/components/forms",
    "src/components/features/cash-flow",
    "src/components/features/treasury",
    "src/components/features/project-finance",
    "src/components/features/loan-debt",
    "src/components/features/covenants",
    "src/components/features/escrow",
    "src/components/features/working-capital",
    "src/components/features/budget",
    "src/components/features/payments",
    "src/components/features/reconciliation",
    "src/components/features/collections",
    "src/components/features/revenue",
    "src/components/features/fpa",
    "src/components/features/investments",
    "src/components/features/fx-risk",
    "src/components/features/financial-close",
    "src/components/features/ai"
)

# Core directories
$coreDirs = @(
    "src/lib",
    "src/db/schema",
    "src/db/queries",
    "src/services",
    "src/hooks",
    "src/types",
    "src/agents",
    "src/config",
    "src/styles/themes"
)

# Create all directories
$allDirs = $rootDirs + $authDirs + $dashboardDirs + $apiDirs + $componentDirs + $coreDirs

foreach ($dir in $allDirs) {
    $fullPath = Join-Path $baseDir $dir
    if (-not (Test-Path $fullPath)) {
        New-Item -ItemType Directory -Path $fullPath -Force | Out-Null
        Write-Host "Created: $dir" -ForegroundColor Green
    }
}

Write-Host "`nAll directories created successfully!" -ForegroundColor Cyan
```

---

## PowerShell Script - Create Placeholder Files

Copy and run this script in PowerShell after creating directories:

```powershell
# ZenBank File Generator
# Run from project root: E:\apps\zenbank

$baseDir = "E:\apps\zenbank"
Set-Location $baseDir

# Function to create file with content
function New-PlaceholderFile {
    param(
        [string]$Path,
        [string]$Content = ""
    )
    $fullPath = Join-Path $baseDir $Path
    if (-not (Test-Path $fullPath)) {
        New-Item -ItemType File -Path $fullPath -Force | Out-Null
        if ($Content) {
            Set-Content -Path $fullPath -Value $Content -Encoding UTF8
        }
        Write-Host "Created: $Path" -ForegroundColor Green
    }
}

# Root config files
New-PlaceholderFile ".env.example" @"
# Database
DATABASE_URL=
DATABASE_AUTH_TOKEN=

# Auth
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000

# AI
OPENAI_API_KEY=
"@

New-PlaceholderFile "drizzle.config.ts" @"
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema/index.ts',
  out: './drizzle/migrations',
  dialect: 'mysql',
  driver: 'turso',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
});
"@

# Auth layout
New-PlaceholderFile "src/app/(auth)/layout.tsx" @"
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen flex items-center justify-center bg-background'>
      {children}
    </div>
  );
}
"@

# Dashboard layout
New-PlaceholderFile "src/app/(dashboard)/layout.tsx" @"
import { TopNav } from '@/components/layout/top-nav';
import { Sidebar } from '@/components/layout/sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen bg-background'>
      <TopNav />
      <div className='flex'>
        <Sidebar />
        <main className='flex-1 p-6'>{children}</main>
      </div>
    </div>
  );
}
"@

# App-level files
New-PlaceholderFile "src/app/not-found.tsx" @"
export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <h1>404 - Page Not Found</h1>
    </div>
  );
}
"@

New-PlaceholderFile "src/app/error.tsx" @"
'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div>
        <h1>Something went wrong</h1>
        <button onClick={reset}>Try again</button>
      </div>
    </div>
  );
}
"@

New-PlaceholderFile "src/app/loading.tsx" @"
export default function Loading() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div>Loading...</div>
    </div>
  );
}
"@

# Generate page.tsx files for all routes
$pageRoutes = @(
    "src/app/(auth)/login",
    "src/app/(auth)/register",
    "src/app/(auth)/forgot-password",
    "src/app/(auth)/reset-password",
    "src/app/(dashboard)/executive/command-center",
    "src/app/(dashboard)/executive/dashboard",
    "src/app/(dashboard)/cash-flow/position",
    "src/app/(dashboard)/cash-flow/forecasting",
    "src/app/(dashboard)/cash-flow/inflow",
    "src/app/(dashboard)/cash-flow/outflow",
    "src/app/(dashboard)/cash-flow/risk",
    "src/app/(dashboard)/cash-flow/analytics",
    "src/app/(dashboard)/cash-flow/agent",
    "src/app/(dashboard)/treasury/bank-management",
    "src/app/(dashboard)/treasury/liquidity",
    "src/app/(dashboard)/treasury/dashboard",
    "src/app/(dashboard)/treasury/risk",
    "src/app/(dashboard)/treasury/ai",
    "src/app/(dashboard)/treasury/operations",
    "src/app/(dashboard)/project-finance/funding-sources",
    "src/app/(dashboard)/project-finance/drawdown",
    "src/app/(dashboard)/project-finance/capital",
    "src/app/(dashboard)/project-finance/irr",
    "src/app/(dashboard)/project-finance/analytics",
    "src/app/(dashboard)/project-finance/allocation-ai",
    "src/app/(dashboard)/loan-debt/portfolio",
    "src/app/(dashboard)/loan-debt/register",
    "src/app/(dashboard)/loan-debt/interest",
    "src/app/(dashboard)/loan-debt/principal",
    "src/app/(dashboard)/loan-debt/refinancing",
    "src/app/(dashboard)/loan-debt/analytics",
    "src/app/(dashboard)/covenants/dashboard",
    "src/app/(dashboard)/covenants/compliance",
    "src/app/(dashboard)/covenants/breaches",
    "src/app/(dashboard)/covenants/early-warning",
    "src/app/(dashboard)/covenants/ai-recommendations",
    "src/app/(dashboard)/escrow/accounts",
    "src/app/(dashboard)/escrow/releases",
    "src/app/(dashboard)/escrow/compliance",
    "src/app/(dashboard)/escrow/reconciliation",
    "src/app/(dashboard)/escrow/ai-monitoring",
    "src/app/(dashboard)/working-capital/receivables",
    "src/app/(dashboard)/working-capital/payables",
    "src/app/(dashboard)/working-capital/cash-conversion",
    "src/app/(dashboard)/working-capital/dynamic-discounting",
    "src/app/(dashboard)/working-capital/supply-chain-finance",
    "src/app/(dashboard)/budget/annual",
    "src/app/(dashboard)/budget/rolling-forecast",
    "src/app/(dashboard)/budget/variance",
    "src/app/(dashboard)/budget/approval",
    "src/app/(dashboard)/budget/ai",
    "src/app/(dashboard)/payments/factory",
    "src/app/(dashboard)/payments/queue",
    "src/app/(dashboard)/payments/priority",
    "src/app/(dashboard)/payments/approvals",
    "src/app/(dashboard)/payments/analytics",
    "src/app/(dashboard)/reconciliation/auto-match",
    "src/app/(dashboard)/reconciliation/exceptions",
    "src/app/(dashboard)/reconciliation/manual",
    "src/app/(dashboard)/reconciliation/ai-match",
    "src/app/(dashboard)/reconciliation/dashboard",
    "src/app/(dashboard)/collections/dashboard",
    "src/app/(dashboard)/collections/customer-risk",
    "src/app/(dashboard)/collections/promise-to-pay",
    "src/app/(dashboard)/collections/campaigns",
    "src/app/(dashboard)/collections/ai-collector",
    "src/app/(dashboard)/revenue/dashboard",
    "src/app/(dashboard)/revenue/recognition",
    "src/app/(dashboard)/revenue/leakage",
    "src/app/(dashboard)/revenue/margin",
    "src/app/(dashboard)/revenue/ai",
    "src/app/(dashboard)/fpa/planning",
    "src/app/(dashboard)/fpa/forecasting",
    "src/app/(dashboard)/fpa/what-if",
    "src/app/(dashboard)/fpa/scenarios",
    "src/app/(dashboard)/fpa/executive",
    "src/app/(dashboard)/investments/dashboard",
    "src/app/(dashboard)/investments/fds",
    "src/app/(dashboard)/investments/liquid-funds",
    "src/app/(dashboard)/investments/portfolio",
    "src/app/(dashboard)/investments/yield",
    "src/app/(dashboard)/fx-risk/exposure",
    "src/app/(dashboard)/fx-risk/hedging",
    "src/app/(dashboard)/fx-risk/forwards",
    "src/app/(dashboard)/fx-risk/interest-risk",
    "src/app/(dashboard)/fx-risk/market-risk",
    "src/app/(dashboard)/financial-close/calendar",
    "src/app/(dashboard)/financial-close/checklist",
    "src/app/(dashboard)/financial-close/mis",
    "src/app/(dashboard)/financial-close/board-reports",
    "src/app/(dashboard)/financial-close/narrative-ai",
    "src/app/(dashboard)/ai-cfo/workspace",
    "src/app/(dashboard)/ai-cfo/treasury-copilot",
    "src/app/(dashboard)/ai-cfo/finance-copilot",
    "src/app/(dashboard)/ai-cfo/executive-chat",
    "src/app/(dashboard)/ai-cfo/simulator",
    "src/app/(dashboard)/ai-cfo/agents",
    "src/app/(dashboard)/ai-cfo/decision-center",
    "src/app/(dashboard)/settings/notifications",
    "src/app/(dashboard)/settings/workspace",
    "src/app/(dashboard)/settings/saved-views",
    "src/app/(dashboard)/settings/users",
    "src/app/(dashboard)/settings/roles",
    "src/app/(dashboard)/settings/attributes",
    "src/app/(dashboard)/settings/permissions"
)

foreach ($route in $pageRoutes) {
    $pageName = ($route -split '/')[-1]
    $pageTitle = (($pageName -replace '-', ' ') -split ' ' | ForEach-Object { $_.Substring(0,1).ToUpper() + $_.Substring(1) }) -join ' '
    $content = @"
export default function Page() {
  return (
    <div>
      <h1 className='text-2xl font-semibold'>$pageTitle</h1>
    </div>
  );
}
"@
    New-PlaceholderFile "$route/page.tsx" $content
}

# API route files
$apiRoutes = @(
    "src/app/api/auth/[...all]/route.ts",
    "src/app/api/cash-flow/route.ts",
    "src/app/api/treasury/route.ts",
    "src/app/api/project-finance/route.ts",
    "src/app/api/loan-debt/route.ts",
    "src/app/api/covenants/route.ts",
    "src/app/api/escrow/route.ts",
    "src/app/api/working-capital/route.ts",
    "src/app/api/budget/route.ts",
    "src/app/api/payments/route.ts",
    "src/app/api/reconciliation/route.ts",
    "src/app/api/collections/route.ts",
    "src/app/api/revenue/route.ts",
    "src/app/api/fpa/route.ts",
    "src/app/api/investments/route.ts",
    "src/app/api/fx-risk/route.ts",
    "src/app/api/financial-close/route.ts",
    "src/app/api/ai/agents/route.ts",
    "src/app/api/ai/chat/route.ts"
)

foreach ($route in $apiRoutes) {
    $content = @"
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'OK' });
}

export async function POST() {
  return NextResponse.json({ message: 'Created' });
}
"@
    New-PlaceholderFile $route $content
}

# Lib files
New-PlaceholderFile "src/lib/auth.ts" @"
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db';

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'mysql' }),
});
"@

New-PlaceholderFile "src/lib/auth-client.ts" @"
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient();
"@

New-PlaceholderFile "src/lib/db.ts" @"
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client);
"@

New-PlaceholderFile "src/lib/utils.ts" @"
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
"@

New-PlaceholderFile "src/lib/cn.ts" @"
export { cn } from './utils';
"@

New-PlaceholderFile "src/lib/constants.ts" @"
export const APP_NAME = 'ZenBank';
export const APP_DESCRIPTION = 'AI-Powered Finance & Treasury Management';
"@

New-PlaceholderFile "src/lib/formatters.ts" @"
export function formatCurrency(amount: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(amount);
}

export function formatPercentage(value: number): string {
  return new Intl.NumberFormat('en-IN', { style: 'percent', minimumFractionDigits: 2 }).format(value / 100);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-IN').format(new Date(date));
}
"@

New-PlaceholderFile "src/lib/validators.ts" @"
import { z } from 'zod';

export const emailSchema = z.string().email();
export const passwordSchema = z.string().min(8);
"@

New-PlaceholderFile "src/lib/api-client.ts" @"
const API_BASE = '/api';

export async function apiGet<T>(endpoint: string): Promise<T> {
  const res = await fetch(API_BASE + endpoint);
  if (!res.ok) throw new Error('API Error');
  return res.json();
}

export async function apiPost<T>(endpoint: string, data: unknown): Promise<T> {
  const res = await fetch(API_BASE + endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('API Error');
  return res.json();
}
"@

# DB files
New-PlaceholderFile "src/db/index.ts" @"
export * from './schema';
export { db } from '@/lib/db';
"@

New-PlaceholderFile "src/db/schema/index.ts" @"
export * from './users';
export * from './sessions';
export * from './organizations';
export * from './projects';
export * from './bank-accounts';
export * from './transactions';
"@

$schemaFiles = @(
    "users", "sessions", "organizations", "projects", "bank-accounts",
    "transactions", "cash-positions", "forecasts", "loans", "covenants",
    "escrow-accounts", "budgets", "payments", "reconciliations",
    "collections", "revenues", "investments", "fx-exposures", "audit-logs"
)

foreach ($schema in $schemaFiles) {
    $tableName = $schema -replace '-', '_'
    $content = @"
import { mysqlTable, text, int, real } from 'drizzle-orm/mysql-core';
import { uuidBinary, uuidv7 } from '@/db/uuid';

export const $tableName = mysqlTable('$tableName', {
  id: text('id').primaryKey().\`$\`defaultFn(() => uuidv7()),
  createdAt: int('created_at', { mode: 'timestamp' }).\`$\`defaultFn(() => new Date()),
  updatedAt: int('updated_at', { mode: 'timestamp' }).\`$\`defaultFn(() => new Date()),
});
"@
    New-PlaceholderFile "src/db/schema/$schema.ts" $content
}

New-PlaceholderFile "src/db/queries/index.ts" @"
export * from './users';
export * from './cash-flow';
"@

$queryFiles = @(
    "users", "cash-flow", "treasury", "project-finance", "loan-debt",
    "covenants", "escrow", "working-capital", "budget", "payments",
    "reconciliation", "collections", "revenue", "fpa", "investments", "fx-risk"
)

foreach ($query in $queryFiles) {
    $queryName = ($query -replace '-', '') + "Queries"
    $content = @"
import { db } from '@/lib/db';

export const $queryName = {
  getAll: async () => {
    // TODO: Implement
    return [];
  },
  getById: async (id: string) => {
    // TODO: Implement
    return null;
  },
};
"@
    New-PlaceholderFile "src/db/queries/$query.ts" $content
}

# Services
New-PlaceholderFile "src/services/index.ts" @"
export * from './cash-flow.service';
export * from './treasury.service';
"@

$services = @(
    "cash-flow", "treasury", "project-finance", "loan-debt", "covenants",
    "escrow", "working-capital", "budget", "payments", "reconciliation",
    "collections", "revenue", "fpa", "investments", "fx-risk", "ai"
)

foreach ($svc in $services) {
    $svcName = ($svc -replace '-', '') + "Service"
    $content = @"
export const $svcName = {
  // TODO: Implement service methods
};
"@
    New-PlaceholderFile "src/services/$svc.service.ts" $content
}

# Hooks
New-PlaceholderFile "src/hooks/index.ts" @"
export * from './use-auth';
export * from './use-debounce';
"@

$hooks = @(
    "use-auth", "use-user", "use-debounce", "use-local-storage", "use-media-query",
    "use-cash-flow", "use-treasury", "use-projects", "use-loans", "use-covenants",
    "use-escrow", "use-budget", "use-payments", "use-reconciliation",
    "use-collections", "use-revenue", "use-investments", "use-fx-risk"
)

foreach ($hook in $hooks) {
    $hookName = (($hook -replace '-', ' ') -split ' ' | ForEach-Object { $_.Substring(0,1).ToUpper() + $_.Substring(1) }) -join ''
    $content = @"
'use client';

import { useState, useEffect } from 'react';

export function $hookName() {
  // TODO: Implement hook
  return {};
}
"@
    New-PlaceholderFile "src/hooks/$hook.ts" $content
}

# Types
New-PlaceholderFile "src/types/index.ts" @"
export * from './auth';
export * from './user';
export * from './api';
"@

$types = @(
    "auth", "user", "organization", "project", "bank-account", "transaction",
    "cash-flow", "treasury", "loan", "covenant", "escrow", "budget",
    "payment", "reconciliation", "collection", "revenue", "investment", "fx", "ai", "api"
)

foreach ($type in $types) {
    $typeName = (($type -replace '-', ' ') -split ' ' | ForEach-Object { $_.Substring(0,1).ToUpper() + $_.Substring(1) }) -join ''
    $content = @"
export interface $typeName {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
"@
    New-PlaceholderFile "src/types/$type.ts" $content
}

# Agents
New-PlaceholderFile "src/agents/index.ts" @"
export * from './base-agent';
export * from './cash-flow-agent';
export * from './treasury-agent';
export * from './cfo-agent';
"@

New-PlaceholderFile "src/agents/base-agent.ts" @"
export abstract class BaseAgent {
  abstract name: string;
  abstract description: string;

  abstract analyze(context: unknown): Promise<unknown>;
  abstract recommend(context: unknown): Promise<unknown>;
}
"@

$agents = @(
    "cash-flow-agent", "treasury-agent", "cfo-agent", "controller-agent",
    "collections-agent", "payment-agent", "budget-agent", "forecast-agent",
    "project-finance-agent", "debt-agent", "investment-agent", "covenant-agent",
    "escrow-agent", "reconciliation-agent", "fraud-agent", "working-capital-agent",
    "scenario-agent"
)

foreach ($agent in $agents) {
    $agentClass = (($agent -replace '-', ' ') -split ' ' | ForEach-Object { $_.Substring(0,1).ToUpper() + $_.Substring(1) }) -join ''
    $agentDesc = $agent -replace '-', ' '
    $content = @"
import { BaseAgent } from './base-agent';

export class $agentClass extends BaseAgent {
  name = '$agent';
  description = 'AI Agent for $agentDesc';

  async analyze(context: unknown) {
    // TODO: Implement
    return {};
  }

  async recommend(context: unknown) {
    // TODO: Implement
    return [];
  }
}
"@
    New-PlaceholderFile "src/agents/$agent.ts" $content
}

# Config
New-PlaceholderFile "src/config/index.ts" @"
export * from './site';
export * from './navigation';
export * from './dashboard';
"@

New-PlaceholderFile "src/config/site.ts" @"
export const siteConfig = {
  name: 'ZenBank',
  description: 'AI-Powered Finance & Treasury Management Platform',
  url: 'https://zenbank.app',
};
"@

New-PlaceholderFile "src/config/navigation.ts" @"
export const navigation = [
  {
    title: 'Executive Intelligence',
    items: [
      { title: 'AI Command Center', href: '/executive/command-center' },
      { title: 'Executive Dashboard', href: '/executive/dashboard' },
    ],
  },
  {
    title: 'Cash Flow Intelligence',
    items: [
      { title: 'Enterprise Cash Position', href: '/cash-flow/position' },
      { title: 'Cash Forecasting', href: '/cash-flow/forecasting' },
      { title: 'Cash Inflow Intelligence', href: '/cash-flow/inflow' },
      { title: 'Cash Outflow Intelligence', href: '/cash-flow/outflow' },
      { title: 'Cash Risk Intelligence', href: '/cash-flow/risk' },
      { title: 'Cash Analytics', href: '/cash-flow/analytics' },
      { title: 'Cash AI Agent', href: '/cash-flow/agent' },
    ],
  },
  {
    title: 'Treasury Management',
    items: [
      { title: 'Bank Management', href: '/treasury/bank-management' },
      { title: 'Liquidity Management', href: '/treasury/liquidity' },
      { title: 'Treasury Dashboard', href: '/treasury/dashboard' },
      { title: 'Treasury Risk', href: '/treasury/risk' },
      { title: 'Treasury AI', href: '/treasury/ai' },
      { title: 'Treasury Operations', href: '/treasury/operations' },
    ],
  },
  // Add remaining navigation items...
];
"@

New-PlaceholderFile "src/config/dashboard.ts" @"
export const dashboardConfig = {
  defaultView: 'executive',
  refreshInterval: 30000,
};
"@

# Layout components
New-PlaceholderFile "src/components/layout/index.ts" @"
export * from './top-nav';
export * from './sidebar';
export * from './footer';
export * from './page-header';
"@

New-PlaceholderFile "src/components/layout/top-nav.tsx" @"
export function TopNav() {
  return (
    <header className='h-16 border-b bg-card flex items-center px-6'>
      <div className='flex-1'>
        <span className='font-semibold'>ZenBank</span>
      </div>
      <div className='flex items-center gap-4'>
        {/* Search, Notifications, Profile */}
      </div>
    </header>
  );
}
"@

New-PlaceholderFile "src/components/layout/sidebar.tsx" @"
export function Sidebar() {
  return (
    <aside className='w-64 border-r bg-card min-h-screen p-4'>
      {/* Navigation accordion items */}
    </aside>
  );
}
"@

New-PlaceholderFile "src/components/layout/sidebar-item.tsx" @"
export function SidebarItem({ title, href }: { title: string; href: string }) {
  return <a href={href} className='block py-2 px-4 hover:bg-muted rounded'>{title}</a>;
}
"@

New-PlaceholderFile "src/components/layout/sidebar-accordion.tsx" @"
export function SidebarAccordion({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className='font-medium py-2'>{title}</div>
      <div className='pl-4'>{children}</div>
    </div>
  );
}
"@

New-PlaceholderFile "src/components/layout/footer.tsx" @"
export function Footer() {
  return (
    <footer className='h-12 border-t flex items-center justify-center text-sm text-muted-foreground'>
      ZenBank - AI-Powered Finance & Treasury
    </footer>
  );
}
"@

New-PlaceholderFile "src/components/layout/header.tsx" @"
export function Header({ title, description }: { title: string; description?: string }) {
  return (
    <div className='mb-6'>
      <h1 className='text-2xl font-semibold'>{title}</h1>
      {description && <p className='text-muted-foreground'>{description}</p>}
    </div>
  );
}
"@

New-PlaceholderFile "src/components/layout/breadcrumb.tsx" @"
export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className='flex gap-2 text-sm text-muted-foreground mb-4'>
      {items.map((item, i) => (
        <span key={i}>
          {item.href ? <a href={item.href}>{item.label}</a> : item.label}
          {i < items.length - 1 && ' / '}
        </span>
      ))}
    </nav>
  );
}
"@

# UI components index
New-PlaceholderFile "src/components/ui/index.ts" @"
export * from './button';
export * from './input';
export * from './card';
export * from './badge';
"@

# Shared components index
New-PlaceholderFile "src/components/shared/index.ts" @"
export * from './data-table';
export * from './charts';
export * from './kpi-card';
export * from './stat-card';
"@

New-PlaceholderFile "src/components/shared/data-table/index.ts" @"
export * from './data-table';
"@

New-PlaceholderFile "src/components/shared/charts/index.ts" @"
export * from './line-chart';
export * from './bar-chart';
"@

# Forms index
New-PlaceholderFile "src/components/forms/index.ts" @"
export * from './form-field';
export * from './currency-input';
"@

# Feature component indices
$featureDirs = @(
    "cash-flow", "treasury", "project-finance", "loan-debt", "covenants",
    "escrow", "working-capital", "budget", "payments", "reconciliation",
    "collections", "revenue", "fpa", "investments", "fx-risk", "financial-close", "ai"
)

foreach ($feature in $featureDirs) {
    New-PlaceholderFile "src/components/features/$feature/index.ts" @"
// Export $feature feature components
"@
}

# Styles
New-PlaceholderFile "src/styles/themes/light.css" @"
:root {
  --background: #F8FAFC;
  --foreground: #0F172A;
  --primary: #1E3A8A;
  --secondary: #2563EB;
  --card: #FFFFFF;
  --border: #E5E7EB;
  --success: #10B981;
  --warning: #F59E0B;
  --danger: #EF4444;
}
"@

New-PlaceholderFile "src/styles/themes/dark.css" @"
:root {
  --background: #0F172A;
  --foreground: #F8FAFC;
  --primary: #3B82F6;
  --secondary: #60A5FA;
  --card: #1E293B;
  --border: #334155;
  --success: #34D399;
  --warning: #FBBF24;
  --danger: #F87171;
}
"@

Write-Host "`nAll files created successfully!" -ForegroundColor Cyan
Write-Host "Total directories and files scaffolded for ZenBank" -ForegroundColor Yellow
```

---

## Summary

| Category | Count |
|----------|-------|
| Route Groups | 2 (auth, dashboard) |
| Dashboard Modules | 18 |
| Page Routes | ~100 |
| API Routes | ~20 |
| UI Components | ~30 |
| Layout Components | ~8 |
| Shared Components | ~25 |
| Feature Components | ~50 |
| DB Schemas | ~20 |
| Services | ~17 |
| Hooks | ~20 |
| Types | ~20 |
| AI Agents | ~18 |
| Config Files | ~5 |

**Total: ~300+ directories and ~250+ files**

---

## Usage Instructions

1. Open PowerShell as Administrator
2. Navigate to project root: `cd E:\apps\zenbank`
3. Run the **Directory Creation Script** first
4. Run the **File Generation Script** second
5. Install missing dependencies:
   ```powershell
   pnpm add better-auth @libsql/client drizzle-orm uuidv7 zod lucide-react clsx tailwind-merge
   pnpm add -D drizzle-kit
   ```

# Executive Dashboard Layout

## Design Principles

- Single scrollable executive dashboard
- No multiple page tabs
- Sticky section navigation below filters
- Every card/chart supports drill-down into its respective module
- AI recommendations always visible
- Focus on enterprise KPIs instead of operational metrics

---

# Page Structure

## 1. Page Header

- Title
- Description
- Breadcrumbs
- Refresh
- Export
- Saved Views
- AI Assistant

---

## 2. Global Filters

Display horizontally.

Filters

- Company
- Business Unit
- SPV
- Project
- Bank
- Loan
- Date Range
- Currency
- Scenario
- Saved View

Sticky on scroll.

---

## 3. Sticky Section Navigation

Horizontal navigation.

- Overview
- Financials
- Liquidity
- Debt
- Projects
- Revenue
- Risk
- Forecast
- AI
- Approvals
- Activity

Clicking scrolls to each section.

---

# SECTION 1

# Executive Health Strip

Purpose

Immediate executive status.

Layout

6 Large Cards

Cards

- Enterprise Health Score
- Liquidity Score
- Enterprise Risk Score
- AI Confidence Score
- Cash Runway
- Board Status

Each card

- Score
- Trend
- Status Color
- Tooltip
- Drill-down

---

# SECTION 2

# Enterprise KPI Overview

Purpose

Highest-level financial KPIs.

Layout

8 Large KPI Cards

Cards

### Liquidity

- Available Cash
- Net Cash Position

### Financial Performance

- Revenue
- EBITDA

### Capital

- Working Capital
- Net Debt

### Investment

- Enterprise IRR

### Valuation

- Enterprise Value

Each KPI

- Current Value
- Previous Period
- Trend
- Sparkline
- Variance
- Drill-down

---

# SECTION 3

# Executive Alerts

Purpose

Critical executive actions.

Layout

Alert Feed

Alert Types

- Liquidity
- Debt
- Covenants
- Projects
- Investments
- Collections
- Treasury
- FX
- Compliance

Each Alert

- Severity
- Title
- Description
- Financial Impact
- AI Recommendation
- Action Button

---

# SECTION 4

# Financial Overview

Purpose

Overall financial performance.

Layout

Top

6 KPI Cards

KPIs

- Revenue
- EBITDA
- NOI
- NDCF
- Net Profit
- Operating Margin

Bottom

Charts

- Revenue Trend
- EBITDA Trend
- Profit Trend

---

# SECTION 5

# Liquidity & Treasury

Purpose

Enterprise liquidity position.

Layout

Left

8 KPI Cards

KPIs

- Available Cash
- Available Credit Lines
- Liquidity Ratio
- Treasury Health Score
- Cash Pool Balance
- Idle Cash
- DSRA
- MMR

Right

Charts

- Liquidity Gauge
- Cash Distribution
- Liquidity Trend

---

# SECTION 6

# Debt & Loan Health

Purpose

Enterprise debt overview.

Layout

Top

8 KPI Cards

KPIs

- Total Debt
- Debt-to-Equity
- DSCR
- ICR
- Average Interest Rate
- Floating Debt %
- Fixed Debt %
- Loan Utilization

Bottom

Charts

- Debt Maturity Timeline
- Debt Composition
- Interest Benchmark Distribution
- Loan Portfolio

---

# SECTION 7

# Project Finance

Purpose

Enterprise project health.

Layout

Top

8 KPI Cards

KPIs

- Total Projects
- Funded Projects
- Underfunded Projects
- Enterprise IRR
- Average NOI
- Average NDCF
- Drawdown Utilization
- Capital Deployment

Bottom

Components

- Project Health Table
- Funding Status
- Drawdown Timeline
- Project Risk Matrix

---

# SECTION 8

# Revenue & Collections

Purpose

Revenue generation and collections.

Layout

Top

6 KPI Cards

KPIs

- Revenue
- Collections
- Receivables
- DSO
- Booking Collections
- Rental Income

Bottom

Charts

- Collection Trend
- Aging Analysis
- Collection Forecast

---

# SECTION 9

# Investment & Treasury

Purpose

Enterprise investments.

Layout

Top

6 KPI Cards

KPIs

- Fixed Deposits
- Liquid Funds
- Treasury Investments
- Investment Yield
- Idle Cash
- Investment Return

Bottom

Charts

- Portfolio Allocation
- Investment Maturity
- Yield Trend

---

# SECTION 10

# Enterprise Risk & Compliance

Purpose

Overall enterprise risk.

Layout

Top

10 KPI Cards

Financial Risk

- DSCR
- ICR
- Debt-to-Equity
- LTV

Liquidity Risk

- Liquidity Risk Score

Treasury Risk

- Interest Rate Risk
- FX Risk

Compliance

- Covenant Score
- Fraud Risk
- ESG Score

Bottom

Visualizations

- Enterprise Risk Heatmap
- Risk Trend
- Covenant Status

---

# SECTION 11

# Enterprise Forecast

Purpose

Future outlook.

Layout

Forecast Navigation

- Cash
- Revenue
- Liquidity
- Debt
- Profit

Single Dynamic Chart

Forecast Controls

- 30 Days
- 90 Days
- 180 Days
- 365 Days

Display

- Forecast Line
- Confidence Band
- AI Assumptions
- Scenario Selector

---

# SECTION 12

# AI Executive Intelligence

Purpose

Enterprise AI decision center.

Layout

AI Recommendation Timeline

Recommendation Types

- Liquidity
- Treasury
- Debt
- Investments
- Collections
- Projects
- Cost Optimization
- Funding

Each Recommendation

- Title
- Explanation
- Financial Impact
- Confidence Score
- Priority
- Recommended Action
- Accept
- Reject
- Simulate

---

# SECTION 13

# Executive Approvals

Purpose

Pending executive decisions.

Layout

Data Table

Columns

- Type
- Description
- Entity
- Project
- Amount
- Requested By
- Requested Date
- Priority
- Status
- SLA
- Actions

Actions

- Approve
- Reject
- Delegate
- View Details

---

# SECTION 14

# Enterprise Activity Timeline

Purpose

Latest financial activities.

Timeline Categories

- Loans
- Treasury
- Investments
- Payments
- Collections
- Projects
- Bank Transfers
- AI Decisions
- Approvals

Each Event

- Timestamp
- User
- Entity
- Description
- Amount
- Status

---

# Dashboard Behavior

## Drill-down

Every

- KPI
- Chart
- Table
- Alert
- Recommendation

opens the respective module.

Examples

Available Cash
→ Cash Flow Dashboard

DSCR
→ Covenant Dashboard

Debt
→ Debt Portfolio

Investment
→ Investment Dashboard

Liquidity
→ Treasury Dashboard

Revenue
→ Revenue Dashboard

Collections
→ Collections Dashboard

Projects
→ Project Analytics

---

# Widgets To Remove From Executive Dashboard

Move these to their dedicated modules.

Cash Flow Module

- Cash Inflow
- Cash Outflow
- Net Cash Flow
- Cash Forecast

Working Capital Module

- DSO
- DPO

Treasury Module

- Bank Distribution
- Entity Distribution
- Cash by Bank
- Cash by Entity

Only display summarized enterprise-level KPIs in the Executive Dashboard.

---

# Executive Dashboard Objectives

The dashboard should answer these questions within 30 seconds.

1. Are we financially healthy?
2. Do we have sufficient liquidity?
3. Are loans or covenants at risk?
4. Which projects require executive attention?
5. What actions does the AI recommend?
6. What approvals require immediate action?
7. What major financial events occurred recently?
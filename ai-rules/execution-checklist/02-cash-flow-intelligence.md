# Execution Checklist: Part 2 - Cash Flow Intelligence

**Status Legend:**
- [ ] Pending
- [~] In Progress
- [x] Completed

**Last Updated:** 2026-07-25

---

## 1. GLOBAL FILTERS COMPONENT

**Path:** `src/components/shared/cash-flow-filters.tsx`
**Status:** [ ] Pending

| Filter | Type | Status |
|--------|------|--------|
| Company | Multi-Select | [ ] Pending |
| Business Unit | Multi-Select | [ ] Pending |
| SPV | Multi-Select | [ ] Pending |
| Project | Multi-Select | [ ] Pending |
| Region | Multi-Select | [ ] Pending |
| Bank | Multi-Select | [ ] Pending |
| Account | Multi-Select | [ ] Pending |
| Currency | Multi-Select | [ ] Pending |
| Cost Center | Multi-Select | [ ] Pending |
| Customer | Multi-Select | [ ] Pending |
| Vendor | Multi-Select | [ ] Pending |
| Loan | Multi-Select | [ ] Pending |
| Scenario | Select | [ ] Pending |
| Forecast Version | Select | [ ] Pending |
| Forecast Horizon | Select | [ ] Pending |
| Date Range | Date Picker | [ ] Pending |
| Status | Multi-Select | [ ] Pending |
| Tags | Multi-Select | [ ] Pending |

---

## 2. SIDE PANEL NAVIGATION

**Path:** `src/config/cash-flow-navigation.ts`
**Status:** [ ] Pending

| Menu Item | Path | Status |
|-----------|------|--------|
| Cash Flow Dashboard | `/cash-flow/dashboard` | [ ] Pending |
| Enterprise Cash Position | `/cash-flow/position` | [ ] Pending |
| Cash Forecasting | `/cash-flow/forecasting` | [ ] Pending |
| Cash Inflow Intelligence | `/cash-flow/inflow` | [ ] Pending |
| Cash Outflow Intelligence | `/cash-flow/outflow` | [ ] Pending |
| Collections Forecast | `/cash-flow/collections-forecast` | [ ] Pending |
| Vendor Payment Forecast | `/cash-flow/vendor-forecast` | [ ] Pending |
| Loan Repayment Forecast | `/cash-flow/loan-forecast` | [ ] Pending |
| Project Completion Forecast | `/cash-flow/project-forecast` | [ ] Pending |
| Cash Risk Intelligence | `/cash-flow/risk` | [ ] Pending |
| Cash Flow Analytics | `/cash-flow/analytics` | [ ] Pending |
| Cash Flow AI Agent | `/cash-flow/agent` | [ ] Pending |

---

## 3. PAGE 1: CASH FLOW DASHBOARD

**Path:** `src/app/(dashboard)/cash-flow/dashboard/page.tsx`
**Status:** [ ] Pending

### 3.1 Page Header
| Element | Status |
|---------|--------|
| Page Title | [ ] Pending |
| Search Button | [ ] Pending |
| Saved Views Selector | [ ] Pending |
| Global Filters | [ ] Pending |
| Export Button | [ ] Pending |
| Refresh Button | [ ] Pending |
| Share Button | [ ] Pending |
| Favorite Button | [ ] Pending |

### 3.2 Tabs Navigation
| Tab | Status |
|-----|--------|
| Overview | [ ] Pending |
| Forecast | [ ] Pending |
| Liquidity | [ ] Pending |
| Risks | [ ] Pending |
| Approvals | [ ] Pending |
| Insights | [ ] Pending |

### 3.3 KPI Cards
| Card | Mock Value | Status |
|------|------------|--------|
| Available Cash | INR 2,450 Cr | [ ] Pending |
| Net Liquidity | INR 1,890 Cr | [ ] Pending |
| Opening Balance | INR 2,100 Cr | [ ] Pending |
| Closing Balance | INR 2,450 Cr | [ ] Pending |
| Cash Inflow | INR 890 Cr | [ ] Pending |
| Cash Outflow | INR 540 Cr | [ ] Pending |
| Forecast Accuracy | 94.5% | [ ] Pending |
| Cash Burn | INR 45 Cr/month | [ ] Pending |
| Working Capital | INR 890 Cr | [ ] Pending |
| Escrow Cash | INR 560 Cr | [ ] Pending |
| Restricted Cash | INR 320 Cr | [ ] Pending |
| Idle Cash | INR 125 Cr | [ ] Pending |
| Funding Gap | INR 78 Cr | [ ] Pending |

### 3.4 Charts
| Chart | Type | Mock Data Points | Status |
|-------|------|------------------|--------|
| Cash Position Trend | Line Chart | 30 days | [ ] Pending |
| Daily Cash Forecast | Area Chart | 30 days | [ ] Pending |
| Weekly Forecast | Bar Chart | 12 weeks | [ ] Pending |
| Monthly Forecast | Bar Chart | 12 months | [ ] Pending |
| Inflow vs Outflow | Grouped Bar | 12 months | [ ] Pending |
| Liquidity Trend | Line Chart | 90 days | [ ] Pending |
| Forecast vs Actual | Line Chart | 30 days | [ ] Pending |
| Cash Waterfall | Waterfall | 8 stages | [ ] Pending |
| Forecast Accuracy | Gauge | Single value | [ ] Pending |
| Risk Heatmap | Heatmap | 5x5 matrix | [ ] Pending |

### 3.5 Tables
| Table | Columns | Rows | Status |
|-------|---------|------|--------|
| Critical Cash Events | Date, Event, Impact, Priority, Action | 10 | [ ] Pending |
| Upcoming Collections | Customer, Amount, Due Date, Status, Risk | 10 | [ ] Pending |
| Upcoming Payments | Vendor, Amount, Due Date, Priority, Status | 10 | [ ] Pending |
| Cash Alerts | Alert, Severity, Impact, Recommendation | 5 | [ ] Pending |
| Pending Approvals | Item, Amount, Requester, Status, Actions | 5 | [ ] Pending |
| Funding Requirements | Project, Amount, Due Date, Source, Status | 5 | [ ] Pending |

### 3.6 Right Sidebar
| Widget | Status |
|--------|--------|
| AI Summary | [ ] Pending |
| Today's Risks | [ ] Pending |
| Recommended Actions | [ ] Pending |
| Top Forecast Changes | [ ] Pending |

---

## 4. PAGE 2: ENTERPRISE CASH POSITION

**Path:** `src/app/(dashboard)/cash-flow/position/page.tsx`
**Status:** [ ] Pending

### 4.1 Page Header
| Element | Status |
|---------|--------|
| Page Title | [ ] Pending |
| Search | [ ] Pending |
| Saved Views | [ ] Pending |
| Global Filters | [ ] Pending |
| Actions Menu | [ ] Pending |

### 4.2 Tabs Navigation
| Tab | Status |
|-----|--------|
| Global Position | [ ] Pending |
| Project Position | [ ] Pending |
| SPV Position | [ ] Pending |
| Region Position | [ ] Pending |
| Bank Position | [ ] Pending |
| Currency Position | [ ] Pending |
| Liquidity View | [ ] Pending |

### 4.3 Position Table
| Column | Status |
|--------|--------|
| Entity | [ ] Pending |
| Opening Balance | [ ] Pending |
| Credits | [ ] Pending |
| Debits | [ ] Pending |
| Closing Balance | [ ] Pending |
| Available Cash | [ ] Pending |
| Restricted Cash | [ ] Pending |
| Escrow Cash | [ ] Pending |
| Net Liquidity | [ ] Pending |
| Variance | [ ] Pending |

**Mock Data:** 15 entities with position data

### 4.4 Charts
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| Cash Distribution | Pie Chart | 8 categories | [ ] Pending |
| Bank Exposure | Donut Chart | 6 banks | [ ] Pending |
| Currency Exposure | Pie Chart | 5 currencies | [ ] Pending |
| Liquidity Heatmap | Heatmap | 5x5 matrix | [ ] Pending |

### 4.5 Actions
| Action | Status |
|--------|--------|
| Transfer Funds | [ ] Pending |
| Export | [ ] Pending |
| Compare | [ ] Pending |
| Drill Down | [ ] Pending |

### 4.6 Detail Drawer
| Section | Status |
|---------|--------|
| Entity Details | [ ] Pending |
| Transaction History | [ ] Pending |
| Bank Accounts | [ ] Pending |
| Liquidity Timeline | [ ] Pending |
| Comments | [ ] Pending |
| Audit Trail | [ ] Pending |

---

## 5. PAGE 3: CASH FORECASTING

**Path:** `src/app/(dashboard)/cash-flow/forecasting/page.tsx`
**Status:** [ ] Pending

### 5.1 Page Header
| Element | Status |
|---------|--------|
| Page Title | [ ] Pending |
| Search | [ ] Pending |
| Saved Views | [ ] Pending |
| Global Filters | [ ] Pending |
| Actions Menu | [ ] Pending |

### 5.2 Tabs Navigation
| Tab | Status |
|-----|--------|
| Forecast Workspace | [ ] Pending |
| Daily | [ ] Pending |
| Weekly | [ ] Pending |
| Monthly | [ ] Pending |
| Quarterly | [ ] Pending |
| Yearly | [ ] Pending |
| Scenario Planning | [ ] Pending |
| Forecast Accuracy | [ ] Pending |
| Forecast Versions | [ ] Pending |

### 5.3 Forecast Parameters Form
| Field | Type | Status |
|-------|------|--------|
| Forecast Horizon | Select | [ ] Pending |
| Forecast Method | Select | [ ] Pending |
| Confidence Threshold | Slider | [ ] Pending |
| Scenario | Select | [ ] Pending |
| Include AI Predictions | Toggle | [ ] Pending |
| Base Version | Select | [ ] Pending |

### 5.4 Forecast Tables
| Table | Columns | Rows | Status |
|-------|---------|------|--------|
| Forecast Line Items | Category, Amount, Date, Probability, Source | 30 | [ ] Pending |
| Forecast Assumptions | Assumption, Value, Confidence, Owner | 15 | [ ] Pending |
| Forecast Versions | Version, Created, Owner, Status, Accuracy | 10 | [ ] Pending |
| Variance Analysis | Period, Forecast, Actual, Variance, % | 12 | [ ] Pending |

### 5.5 Charts
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| Forecast vs Actual | Line Chart | 90 days | [ ] Pending |
| Rolling Forecast | Area Chart | 180 days | [ ] Pending |
| Cash Curve | Line Chart | 365 days | [ ] Pending |
| Scenario Comparison | Multi-line | 3 scenarios | [ ] Pending |
| Confidence Band | Area Band | 90 days | [ ] Pending |

### 5.6 AI Widgets
| Widget | Status |
|--------|--------|
| Forecast Summary | [ ] Pending |
| Forecast Confidence | [ ] Pending |
| Key Drivers | [ ] Pending |
| Recommended Adjustments | [ ] Pending |

### 5.7 Actions
| Action | Status |
|--------|--------|
| Generate Forecast | [ ] Pending |
| Save Version | [ ] Pending |
| Compare Versions | [ ] Pending |
| Run Scenario | [ ] Pending |
| Export | [ ] Pending |
| Publish | [ ] Pending |

---

## 6. PAGE 4: CASH INFLOW INTELLIGENCE

**Path:** `src/app/(dashboard)/cash-flow/inflow/page.tsx`
**Status:** [ ] Pending

### 6.1 Page Header
| Element | Status |
|---------|--------|
| Page Title | [ ] Pending |
| Search | [ ] Pending |
| Saved Views | [ ] Pending |
| Global Filters | [ ] Pending |
| Actions Menu | [ ] Pending |

### 6.2 Tabs Navigation
| Tab | Status |
|-----|--------|
| Overview | [ ] Pending |
| Customer Collections | [ ] Pending |
| Booking Advances | [ ] Pending |
| Loan Disbursements | [ ] Pending |
| Rental Income | [ ] Pending |
| Interest Income | [ ] Pending |
| Refunds | [ ] Pending |
| Other Receipts | [ ] Pending |

### 6.3 KPI Cards
| Card | Mock Value | Status |
|------|------------|--------|
| Total Expected Inflow | INR 890 Cr | [ ] Pending |
| Collections Due | INR 420 Cr | [ ] Pending |
| Overdue Collections | INR 85 Cr | [ ] Pending |
| At Risk | INR 45 Cr | [ ] Pending |
| Collection Rate | 92% | [ ] Pending |

### 6.4 Inflow Table
| Column | Status |
|--------|--------|
| Source | [ ] Pending |
| Customer/Party | [ ] Pending |
| Expected Date | [ ] Pending |
| Amount | [ ] Pending |
| Probability | [ ] Pending |
| Status | [ ] Pending |
| Risk | [ ] Pending |
| Owner | [ ] Pending |
| Actions | [ ] Pending |

**Mock Data:** 25 inflow records

### 6.5 Charts
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| Collection Trend | Line Chart | 12 months | [ ] Pending |
| Receipts by Source | Pie Chart | 8 sources | [ ] Pending |
| Expected vs Actual | Bar Chart | 12 months | [ ] Pending |
| Top Customers | Horizontal Bar | 10 customers | [ ] Pending |
| Aging Analysis | Stacked Bar | 5 buckets | [ ] Pending |

### 6.6 AI Widgets
| Widget | Status |
|--------|--------|
| Collection Prediction | [ ] Pending |
| Delay Prediction | [ ] Pending |
| High Risk Collections | [ ] Pending |
| Recommendations | [ ] Pending |

### 6.7 Detail Drawer
| Section | Status |
|---------|--------|
| Inflow Details | [ ] Pending |
| Customer Profile | [ ] Pending |
| Payment History | [ ] Pending |
| Related Invoices | [ ] Pending |
| Communication Log | [ ] Pending |
| AI Analysis | [ ] Pending |
| Comments | [ ] Pending |
| Attachments | [ ] Pending |

---

## 7. PAGE 5: CASH OUTFLOW INTELLIGENCE

**Path:** `src/app/(dashboard)/cash-flow/outflow/page.tsx`
**Status:** [ ] Pending

### 7.1 Page Header
| Element | Status |
|---------|--------|
| Page Title | [ ] Pending |
| Search | [ ] Pending |
| Saved Views | [ ] Pending |
| Global Filters | [ ] Pending |
| Actions Menu | [ ] Pending |

### 7.2 Tabs Navigation
| Tab | Status |
|-----|--------|
| Overview | [ ] Pending |
| Vendor Payments | [ ] Pending |
| Construction Bills | [ ] Pending |
| Payroll | [ ] Pending |
| Loan Repayments | [ ] Pending |
| Taxes | [ ] Pending |
| Utilities | [ ] Pending |
| Construction Expenses | [ ] Pending |
| Refunds | [ ] Pending |
| Other Payments | [ ] Pending |

### 7.3 KPI Cards
| Card | Mock Value | Status |
|------|------------|--------|
| Total Outflow | INR 540 Cr | [ ] Pending |
| Pending Payments | INR 156 Cr | [ ] Pending |
| Overdue | INR 28 Cr | [ ] Pending |
| This Week | INR 45 Cr | [ ] Pending |
| Approved | INR 89 Cr | [ ] Pending |

### 7.4 Outflow Table
| Column | Status |
|--------|--------|
| Payee | [ ] Pending |
| Category | [ ] Pending |
| Due Date | [ ] Pending |
| Amount | [ ] Pending |
| Priority | [ ] Pending |
| Status | [ ] Pending |
| Risk | [ ] Pending |
| Approval Status | [ ] Pending |
| Actions | [ ] Pending |

**Mock Data:** 30 outflow records

### 7.5 Charts
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| Payment Calendar | Calendar Heatmap | 30 days | [ ] Pending |
| Outflow Trend | Line Chart | 12 months | [ ] Pending |
| Expense Categories | Pie Chart | 10 categories | [ ] Pending |
| Cash Burn | Area Chart | 12 months | [ ] Pending |
| Payment Timeline | Gantt | 30 days | [ ] Pending |

### 7.6 AI Widgets
| Widget | Status |
|--------|--------|
| Payment Priority | [ ] Pending |
| Delay Risk | [ ] Pending |
| Funding Recommendation | [ ] Pending |
| Cash Optimization | [ ] Pending |

### 7.7 Detail Drawer
| Section | Status |
|---------|--------|
| Payment Details | [ ] Pending |
| Vendor Profile | [ ] Pending |
| Invoice Details | [ ] Pending |
| Approval Workflow | [ ] Pending |
| Payment History | [ ] Pending |
| AI Analysis | [ ] Pending |
| Comments | [ ] Pending |
| Attachments | [ ] Pending |

---

## 8. PAGE 6: COLLECTIONS FORECAST

**Path:** `src/app/(dashboard)/cash-flow/collections-forecast/page.tsx`
**Status:** [ ] Pending

### 8.1 Page Header
| Element | Status |
|---------|--------|
| Page Title | [ ] Pending |
| Search | [ ] Pending |
| Saved Views | [ ] Pending |
| Global Filters | [ ] Pending |
| Actions Menu | [ ] Pending |

### 8.2 Tabs Navigation
| Tab | Status |
|-----|--------|
| Customer Aging | [ ] Pending |
| Collection Forecast | [ ] Pending |
| Overdue | [ ] Pending |
| Promise to Pay | [ ] Pending |
| Recovery Analysis | [ ] Pending |

### 8.3 KPI Cards
| Card | Mock Value | Status |
|------|------------|--------|
| Total Outstanding | INR 680 Cr | [ ] Pending |
| DSO | 45 days | [ ] Pending |
| Collection Rate | 88% | [ ] Pending |
| Overdue Amount | INR 120 Cr | [ ] Pending |
| At Risk | INR 65 Cr | [ ] Pending |

### 8.4 Collections Table
| Column | Status |
|--------|--------|
| Customer | [ ] Pending |
| Outstanding | [ ] Pending |
| Due | [ ] Pending |
| Predicted Collection Date | [ ] Pending |
| Probability | [ ] Pending |
| Risk | [ ] Pending |
| Collector | [ ] Pending |
| Last Contact | [ ] Pending |
| Actions | [ ] Pending |

**Mock Data:** 25 customer records

### 8.5 Charts
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| DSO Trend | Line Chart | 12 months | [ ] Pending |
| Collection Funnel | Funnel | 5 stages | [ ] Pending |
| Customer Risk | Scatter | 25 customers | [ ] Pending |
| Recovery Trend | Line Chart | 12 months | [ ] Pending |
| Aging Buckets | Stacked Bar | 5 buckets | [ ] Pending |

### 8.6 AI Widgets
| Widget | Status |
|--------|--------|
| Collection Score | [ ] Pending |
| Recommended Follow-up | [ ] Pending |
| Collection Strategy | [ ] Pending |
| Risk Alerts | [ ] Pending |

---

## 9. PAGE 7: VENDOR PAYMENT FORECAST

**Path:** `src/app/(dashboard)/cash-flow/vendor-forecast/page.tsx`
**Status:** [ ] Pending

### 9.1 Page Header
| Element | Status |
|---------|--------|
| Page Title | [ ] Pending |
| Search | [ ] Pending |
| Saved Views | [ ] Pending |
| Global Filters | [ ] Pending |
| Actions Menu | [ ] Pending |

### 9.2 Tabs Navigation
| Tab | Status |
|-----|--------|
| Upcoming Payments | [ ] Pending |
| Payment Calendar | [ ] Pending |
| Priority Matrix | [ ] Pending |
| Cash Impact | [ ] Pending |
| Exceptions | [ ] Pending |

### 9.3 KPI Cards
| Card | Mock Value | Status |
|------|------------|--------|
| Total Payables | INR 420 Cr | [ ] Pending |
| Due This Week | INR 56 Cr | [ ] Pending |
| Overdue | INR 28 Cr | [ ] Pending |
| Early Payment Discount | INR 2.4 Cr | [ ] Pending |
| Critical Payments | 12 | [ ] Pending |

### 9.4 Payment Table
| Column | Status |
|--------|--------|
| Vendor | [ ] Pending |
| Due Date | [ ] Pending |
| Invoice | [ ] Pending |
| Amount | [ ] Pending |
| Priority | [ ] Pending |
| Risk | [ ] Pending |
| Approval | [ ] Pending |
| Discount Available | [ ] Pending |
| Actions | [ ] Pending |

**Mock Data:** 30 vendor payment records

### 9.5 Charts
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| Vendor Payment Trend | Line Chart | 12 months | [ ] Pending |
| Payment Calendar | Calendar | 30 days | [ ] Pending |
| Cash Impact | Waterfall | 8 stages | [ ] Pending |
| Priority Distribution | Donut | 4 priorities | [ ] Pending |

### 9.6 AI Widgets
| Widget | Status |
|--------|--------|
| Suggested Payment Sequence | [ ] Pending |
| Discount Opportunities | [ ] Pending |
| Risk Alerts | [ ] Pending |
| Cash Optimization | [ ] Pending |

---

## 10. PAGE 8: LOAN REPAYMENT FORECAST

**Path:** `src/app/(dashboard)/cash-flow/loan-forecast/page.tsx`
**Status:** [ ] Pending

### 10.1 Page Header
| Element | Status |
|---------|--------|
| Page Title | [ ] Pending |
| Search | [ ] Pending |
| Saved Views | [ ] Pending |
| Global Filters | [ ] Pending |
| Actions Menu | [ ] Pending |

### 10.2 Tabs Navigation
| Tab | Status |
|-----|--------|
| Loan Schedule | [ ] Pending |
| Interest | [ ] Pending |
| Principal | [ ] Pending |
| Upcoming Payments | [ ] Pending |
| Debt Outlook | [ ] Pending |

### 10.3 KPI Cards
| Card | Mock Value | Status |
|------|------------|--------|
| Total Debt | INR 4,200 Cr | [ ] Pending |
| This Month Due | INR 45 Cr | [ ] Pending |
| Interest (YTD) | INR 186 Cr | [ ] Pending |
| Principal (YTD) | INR 320 Cr | [ ] Pending |
| Debt/Equity | 1.8x | [ ] Pending |

### 10.4 Loan Table
| Column | Status |
|--------|--------|
| Loan | [ ] Pending |
| Lender | [ ] Pending |
| Due Date | [ ] Pending |
| Principal | [ ] Pending |
| Interest | [ ] Pending |
| Total Due | [ ] Pending |
| Status | [ ] Pending |
| Covenant Status | [ ] Pending |
| Actions | [ ] Pending |

**Mock Data:** 15 loan records

### 10.5 Charts
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| Debt Maturity | Stacked Bar | 5 years | [ ] Pending |
| Repayment Timeline | Gantt | 24 months | [ ] Pending |
| Interest Trend | Line Chart | 12 months | [ ] Pending |
| Lender Exposure | Pie Chart | 6 lenders | [ ] Pending |

### 10.6 AI Widgets
| Widget | Status |
|--------|--------|
| Refinancing Suggestions | [ ] Pending |
| Repayment Risk | [ ] Pending |
| Funding Advice | [ ] Pending |
| Interest Optimization | [ ] Pending |

---

## 11. PAGE 9: PROJECT COMPLETION FORECAST

**Path:** `src/app/(dashboard)/cash-flow/project-forecast/page.tsx`
**Status:** [ ] Pending

### 11.1 Page Header
| Element | Status |
|---------|--------|
| Page Title | [ ] Pending |
| Search | [ ] Pending |
| Saved Views | [ ] Pending |
| Global Filters | [ ] Pending |
| Actions Menu | [ ] Pending |

### 11.2 Tabs Navigation
| Tab | Status |
|-----|--------|
| Milestones | [ ] Pending |
| Construction Progress | [ ] Pending |
| Cash Requirement | [ ] Pending |
| Funding Timeline | [ ] Pending |
| Forecast | [ ] Pending |

### 11.3 KPI Cards
| Card | Mock Value | Status |
|------|------------|--------|
| Active Projects | 12 | [ ] Pending |
| Total Budget | INR 8,500 Cr | [ ] Pending |
| Spent to Date | INR 4,200 Cr | [ ] Pending |
| Remaining | INR 4,300 Cr | [ ] Pending |
| Avg Completion | 65% | [ ] Pending |

### 11.4 Project Table
| Column | Status |
|--------|--------|
| Project | [ ] Pending |
| Completion % | [ ] Pending |
| Expected Completion | [ ] Pending |
| Remaining Cost | [ ] Pending |
| Cash Needed | [ ] Pending |
| Funding Status | [ ] Pending |
| Risk | [ ] Pending |
| Actions | [ ] Pending |

**Mock Data:** 12 project records

### 11.5 Charts
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| Completion Curve | Line Chart | 24 months | [ ] Pending |
| Cash Requirement | Area Chart | 24 months | [ ] Pending |
| Project Burn Rate | Bar Chart | 12 projects | [ ] Pending |
| Milestone Timeline | Gantt | 12 projects | [ ] Pending |

### 11.6 AI Widgets
| Widget | Status |
|--------|--------|
| Completion Prediction | [ ] Pending |
| Funding Recommendation | [ ] Pending |
| Delay Risk | [ ] Pending |
| Cost Overrun Alert | [ ] Pending |

---

## 12. PAGE 10: CASH RISK INTELLIGENCE

**Path:** `src/app/(dashboard)/cash-flow/risk/page.tsx`
**Status:** [ ] Pending

### 12.1 Page Header
| Element | Status |
|---------|--------|
| Page Title | [ ] Pending |
| Search | [ ] Pending |
| Saved Views | [ ] Pending |
| Global Filters | [ ] Pending |
| Actions Menu | [ ] Pending |

### 12.2 Tabs Navigation
| Tab | Status |
|-----|--------|
| Liquidity Risk | [ ] Pending |
| Negative Cash | [ ] Pending |
| Funding Gap | [ ] Pending |
| Collection Risk | [ ] Pending |
| Payment Risk | [ ] Pending |
| Cash Leakage | [ ] Pending |
| Fraud Indicators | [ ] Pending |
| Alerts | [ ] Pending |

### 12.3 KPI Cards
| Card | Mock Value | Status |
|------|------------|--------|
| Risk Score | 72/100 | [ ] Pending |
| Liquidity Score | 85/100 | [ ] Pending |
| Forecast Confidence | 94% | [ ] Pending |
| Funding Gap | INR 78 Cr | [ ] Pending |
| Negative Balance Risk | Low | [ ] Pending |
| Idle Cash | INR 125 Cr | [ ] Pending |
| Cash Leakage | INR 12 Cr | [ ] Pending |

### 12.4 Risk Table
| Column | Status |
|--------|--------|
| Risk | [ ] Pending |
| Category | [ ] Pending |
| Severity | [ ] Pending |
| Probability | [ ] Pending |
| Impact | [ ] Pending |
| Recommendation | [ ] Pending |
| Owner | [ ] Pending |
| Status | [ ] Pending |
| Actions | [ ] Pending |

**Mock Data:** 20 risk records

### 12.5 Charts
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| Risk Heatmap | Heatmap | 5x5 matrix | [ ] Pending |
| Risk Trend | Line Chart | 12 months | [ ] Pending |
| Exposure Matrix | Bubble Chart | 15 risks | [ ] Pending |
| Risk by Category | Pie Chart | 6 categories | [ ] Pending |

### 12.6 AI Widgets
| Widget | Status |
|--------|--------|
| Root Cause | [ ] Pending |
| Recommended Action | [ ] Pending |
| Confidence | [ ] Pending |
| Explainability | [ ] Pending |

---

## 13. PAGE 11: CASH FLOW ANALYTICS

**Path:** `src/app/(dashboard)/cash-flow/analytics/page.tsx`
**Status:** [ ] Pending

### 13.1 Page Header
| Element | Status |
|---------|--------|
| Page Title | [ ] Pending |
| Search | [ ] Pending |
| Saved Views | [ ] Pending |
| Global Filters | [ ] Pending |
| Actions Menu | [ ] Pending |

### 13.2 Tabs Navigation
| Tab | Status |
|-----|--------|
| KPIs | [ ] Pending |
| Variance | [ ] Pending |
| Forecast Accuracy | [ ] Pending |
| Historical Trends | [ ] Pending |
| Benchmarking | [ ] Pending |
| Executive Reports | [ ] Pending |

### 13.3 KPI Table
| Column | Status |
|--------|--------|
| KPI | [ ] Pending |
| Current | [ ] Pending |
| Previous | [ ] Pending |
| Variance | [ ] Pending |
| Target | [ ] Pending |
| Status | [ ] Pending |

**Mock Data:** 20 KPI records

### 13.4 Charts
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| Forecast Accuracy | Line Chart | 12 months | [ ] Pending |
| Variance Analysis | Bar Chart | 12 months | [ ] Pending |
| Rolling Trend | Area Chart | 24 months | [ ] Pending |
| Cash Mix | Pie Chart | 6 categories | [ ] Pending |
| Liquidity Trend | Line Chart | 12 months | [ ] Pending |
| DSO/DPO Trend | Line Chart | 12 months | [ ] Pending |

### 13.5 Executive Report Section
| Element | Status |
|---------|--------|
| Summary Card | [ ] Pending |
| Key Highlights | [ ] Pending |
| Risk Summary | [ ] Pending |
| Recommendations | [ ] Pending |
| Export to PDF | [ ] Pending |

---

## 14. PAGE 12: CASH FLOW AI AGENT

**Path:** `src/app/(dashboard)/cash-flow/agent/page.tsx`
**Status:** [ ] Pending

### 14.1 Page Header
| Element | Status |
|---------|--------|
| Page Title | [ ] Pending |
| New Conversation | [ ] Pending |
| Conversation History | [ ] Pending |
| Settings | [ ] Pending |

### 14.2 Tabs Navigation
| Tab | Status |
|-----|--------|
| AI Copilot | [ ] Pending |
| Recommendations | [ ] Pending |
| Investigations | [ ] Pending |
| Scenario Simulator | [ ] Pending |
| Knowledge | [ ] Pending |
| Automations | [ ] Pending |

### 14.3 Conversation Interface
| Element | Status |
|---------|--------|
| Chat Container | [ ] Pending |
| Message Input | [ ] Pending |
| Send Button | [ ] Pending |
| Voice Input | [ ] Pending |
| Attach Files | [ ] Pending |
| Context Panel | [ ] Pending |

### 14.4 Suggested Prompts
| Prompt | Status |
|--------|--------|
| Explain Cash Position | [ ] Pending |
| Predict Cash Shortage | [ ] Pending |
| Optimize Liquidity | [ ] Pending |
| Predict Collection Delays | [ ] Pending |
| Prioritize Payments | [ ] Pending |
| Recommend Funding | [ ] Pending |
| Run Scenario | [ ] Pending |
| Explain Forecast | [ ] Pending |

### 14.5 AI Output Components
| Component | Status |
|-----------|--------|
| Executive Summary | [ ] Pending |
| Recommendations List | [ ] Pending |
| Confidence Indicator | [ ] Pending |
| Evidence Panel | [ ] Pending |
| Related Records | [ ] Pending |
| Citations | [ ] Pending |
| Thinking Steps | [ ] Pending |

### 14.6 Actions
| Action | Status |
|--------|--------|
| Create Task | [ ] Pending |
| Assign | [ ] Pending |
| Export | [ ] Pending |
| Share | [ ] Pending |
| Approve Recommendation | [ ] Pending |
| Run Workflow | [ ] Pending |

### 14.7 Recommendations Table
| Column | Status |
|--------|--------|
| Recommendation | [ ] Pending |
| Priority | [ ] Pending |
| Impact | [ ] Pending |
| Confidence | [ ] Pending |
| Status | [ ] Pending |
| Actions | [ ] Pending |

**Mock Data:** 15 AI recommendations

### 14.8 Scenario Simulator
| Element | Status |
|---------|--------|
| Scenario Form | [ ] Pending |
| Parameter Inputs | [ ] Pending |
| Run Simulation | [ ] Pending |
| Results Display | [ ] Pending |
| Comparison View | [ ] Pending |
| Save Scenario | [ ] Pending |

---

## 15. SHARED CASH FLOW COMPONENTS

**Path:** `src/components/features/cash-flow/`
**Status:** [ ] Pending

### 15.1 Display Components
| Component | File | Status |
|-----------|------|--------|
| Cash Position Card | `cash-position-card.tsx` | [ ] Pending |
| Forecast Chart | `forecast-chart.tsx` | [ ] Pending |
| Cash Waterfall | `cash-waterfall.tsx` | [ ] Pending |
| Liquidity Gauge | `liquidity-gauge.tsx` | [ ] Pending |
| Risk Heatmap | `risk-heatmap.tsx` | [ ] Pending |
| Collection Card | `collection-card.tsx` | [ ] Pending |
| Payment Card | `payment-card.tsx` | [ ] Pending |
| Loan Card | `loan-card.tsx` | [ ] Pending |
| Project Card | `project-card.tsx` | [ ] Pending |

### 15.2 Table Components
| Component | File | Status |
|-----------|------|--------|
| Inflow Table | `inflow-table.tsx` | [ ] Pending |
| Outflow Table | `outflow-table.tsx` | [ ] Pending |
| Position Table | `position-table.tsx` | [ ] Pending |
| Forecast Table | `forecast-table.tsx` | [ ] Pending |
| Risk Table | `risk-table.tsx` | [ ] Pending |
| Collection Table | `collection-table.tsx` | [ ] Pending |
| Payment Table | `payment-table.tsx` | [ ] Pending |

### 15.3 Form Components
| Component | File | Status |
|-----------|------|--------|
| Forecast Form | `forecast-form.tsx` | [ ] Pending |
| Transfer Form | `transfer-form.tsx` | [ ] Pending |
| Payment Form | `payment-form.tsx` | [ ] Pending |
| Scenario Form | `scenario-form.tsx` | [ ] Pending |

### 15.4 Drawer Components
| Component | File | Status |
|-----------|------|--------|
| Inflow Drawer | `inflow-drawer.tsx` | [ ] Pending |
| Outflow Drawer | `outflow-drawer.tsx` | [ ] Pending |
| Position Drawer | `position-drawer.tsx` | [ ] Pending |
| Customer Drawer | `customer-drawer.tsx` | [ ] Pending |
| Vendor Drawer | `vendor-drawer.tsx` | [ ] Pending |
| Loan Drawer | `loan-drawer.tsx` | [ ] Pending |
| Project Drawer | `project-drawer.tsx` | [ ] Pending |
| Risk Drawer | `risk-drawer.tsx` | [ ] Pending |

### 15.5 AI Components
| Component | File | Status |
|-----------|------|--------|
| Cash AI Summary | `cash-ai-summary.tsx` | [ ] Pending |
| Collection Prediction | `collection-prediction.tsx` | [ ] Pending |
| Payment Priority | `payment-priority.tsx` | [ ] Pending |
| Risk Analysis | `risk-analysis.tsx` | [ ] Pending |
| Funding Recommendation | `funding-recommendation.tsx` | [ ] Pending |
| Forecast Insight | `forecast-insight.tsx` | [ ] Pending |

---

## 16. MOCK DATA REQUIREMENTS

### 16.1 Cash Flow Dashboard Mock Data
| Data Set | Records | Status |
|----------|---------|--------|
| KPI Values | 13 KPIs | [ ] Pending |
| Cash Position History | 30 days | [ ] Pending |
| Daily Forecast | 30 days | [ ] Pending |
| Weekly Forecast | 12 weeks | [ ] Pending |
| Monthly Forecast | 12 months | [ ] Pending |
| Critical Events | 10 items | [ ] Pending |
| Upcoming Collections | 10 items | [ ] Pending |
| Upcoming Payments | 10 items | [ ] Pending |
| Cash Alerts | 5 items | [ ] Pending |
| Pending Approvals | 5 items | [ ] Pending |

### 16.2 Cash Position Mock Data
| Data Set | Records | Status |
|----------|---------|--------|
| Entity Positions | 15 entities | [ ] Pending |
| Project Positions | 12 projects | [ ] Pending |
| SPV Positions | 8 SPVs | [ ] Pending |
| Bank Positions | 6 banks | [ ] Pending |
| Currency Positions | 5 currencies | [ ] Pending |

### 16.3 Cash Forecasting Mock Data
| Data Set | Records | Status |
|----------|---------|--------|
| Forecast Line Items | 30 items | [ ] Pending |
| Forecast Assumptions | 15 items | [ ] Pending |
| Forecast Versions | 10 versions | [ ] Pending |
| Variance Analysis | 12 periods | [ ] Pending |
| Scenario Data | 3 scenarios | [ ] Pending |

### 16.4 Cash Inflow Mock Data
| Data Set | Records | Status |
|----------|---------|--------|
| Inflow Records | 25 items | [ ] Pending |
| Customer Collections | 20 items | [ ] Pending |
| Booking Advances | 10 items | [ ] Pending |
| Loan Disbursements | 5 items | [ ] Pending |
| Rental Income | 8 items | [ ] Pending |

### 16.5 Cash Outflow Mock Data
| Data Set | Records | Status |
|----------|---------|--------|
| Outflow Records | 30 items | [ ] Pending |
| Vendor Payments | 25 items | [ ] Pending |
| Construction Bills | 15 items | [ ] Pending |
| Payroll Data | 8 items | [ ] Pending |
| Tax Payments | 5 items | [ ] Pending |

### 16.6 Collections Mock Data
| Data Set | Records | Status |
|----------|---------|--------|
| Customer Records | 25 customers | [ ] Pending |
| Aging Buckets | 5 buckets | [ ] Pending |
| Collection History | 100 transactions | [ ] Pending |
| PTP Records | 10 items | [ ] Pending |

### 16.7 Vendor Payment Mock Data
| Data Set | Records | Status |
|----------|---------|--------|
| Vendor Records | 30 vendors | [ ] Pending |
| Payment Schedule | 30 days | [ ] Pending |
| Invoice Data | 50 invoices | [ ] Pending |

### 16.8 Loan Repayment Mock Data
| Data Set | Records | Status |
|----------|---------|--------|
| Loan Records | 15 loans | [ ] Pending |
| Repayment Schedule | 24 months | [ ] Pending |
| Lender Data | 6 lenders | [ ] Pending |

### 16.9 Project Forecast Mock Data
| Data Set | Records | Status |
|----------|---------|--------|
| Project Records | 12 projects | [ ] Pending |
| Milestone Data | 48 milestones | [ ] Pending |
| Cash Requirement | 24 months | [ ] Pending |

### 16.10 Risk Intelligence Mock Data
| Data Set | Records | Status |
|----------|---------|--------|
| Risk Records | 20 risks | [ ] Pending |
| Risk Heatmap | 25 cells | [ ] Pending |
| Risk Trends | 12 months | [ ] Pending |

### 16.11 Analytics Mock Data
| Data Set | Records | Status |
|----------|---------|--------|
| KPI History | 20 KPIs x 12 months | [ ] Pending |
| Variance Data | 12 months | [ ] Pending |
| Benchmark Data | 10 metrics | [ ] Pending |

### 16.12 AI Agent Mock Data
| Data Set | Records | Status |
|----------|---------|--------|
| Recommendations | 15 items | [ ] Pending |
| Conversations | 10 chats | [ ] Pending |
| Scenarios | 5 scenarios | [ ] Pending |
| Automations | 8 workflows | [ ] Pending |

---

## 17. SUMMARY

### Component Count
| Category | Total | Completed | Pending |
|----------|-------|-----------|---------|
| Global Filters | 18 | 0 | 18 |
| Side Panel Items | 12 | 0 | 12 |
| Page Headers | 12 | 0 | 12 |
| Tab Navigation | 68 | 0 | 68 |
| KPI Cards | 58 | 0 | 58 |
| Charts | 52 | 0 | 52 |
| Tables | 18 | 0 | 18 |
| AI Widgets | 36 | 0 | 36 |
| Forms | 8 | 0 | 8 |
| Drawers | 10 | 0 | 10 |
| Shared Components | 28 | 0 | 28 |
| Mock Data Sets | 42 | 0 | 42 |
| **TOTAL** | **362** | **0** | **362** |

### Priority Order
1. Global Filters Component
2. Side Panel Navigation
3. Cash Flow Dashboard (Page 1)
4. Enterprise Cash Position (Page 2)
5. Cash Forecasting (Page 3)
6. Cash Inflow Intelligence (Page 4)
7. Cash Outflow Intelligence (Page 5)
8. Collections Forecast (Page 6)
9. Vendor Payment Forecast (Page 7)
10. Loan Repayment Forecast (Page 8)
11. Project Completion Forecast (Page 9)
12. Cash Risk Intelligence (Page 10)
13. Cash Flow Analytics (Page 11)
14. Cash Flow AI Agent (Page 12)
15. Shared Components
16. Mock Data Generation

---

## 18. FILE GENERATION ORDER

### Phase 1: Cash Flow Filters & Navigation
```
src/components/shared/cash-flow-filters.tsx
src/config/cash-flow-navigation.ts
```

### Phase 2: Cash Flow Dashboard
```
src/app/(dashboard)/cash-flow/dashboard/page.tsx
src/components/features/cash-flow/cash-position-card.tsx
src/components/features/cash-flow/forecast-chart.tsx
src/components/features/cash-flow/cash-waterfall.tsx
```

### Phase 3: Enterprise Cash Position
```
src/app/(dashboard)/cash-flow/position/page.tsx
src/components/features/cash-flow/position-table.tsx
src/components/features/cash-flow/position-drawer.tsx
```

### Phase 4: Cash Forecasting
```
src/app/(dashboard)/cash-flow/forecasting/page.tsx
src/components/features/cash-flow/forecast-form.tsx
src/components/features/cash-flow/forecast-table.tsx
src/components/features/cash-flow/forecast-insight.tsx
```

### Phase 5: Cash Inflow & Outflow
```
src/app/(dashboard)/cash-flow/inflow/page.tsx
src/app/(dashboard)/cash-flow/outflow/page.tsx
src/components/features/cash-flow/inflow-table.tsx
src/components/features/cash-flow/outflow-table.tsx
src/components/features/cash-flow/inflow-drawer.tsx
src/components/features/cash-flow/outflow-drawer.tsx
```

### Phase 6: Forecasts (Collections, Vendor, Loan, Project)
```
src/app/(dashboard)/cash-flow/collections-forecast/page.tsx
src/app/(dashboard)/cash-flow/vendor-forecast/page.tsx
src/app/(dashboard)/cash-flow/loan-forecast/page.tsx
src/app/(dashboard)/cash-flow/project-forecast/page.tsx
```

### Phase 7: Risk & Analytics
```
src/app/(dashboard)/cash-flow/risk/page.tsx
src/app/(dashboard)/cash-flow/analytics/page.tsx
src/components/features/cash-flow/risk-heatmap.tsx
src/components/features/cash-flow/risk-analysis.tsx
```

### Phase 8: AI Agent
```
src/app/(dashboard)/cash-flow/agent/page.tsx
src/components/features/cash-flow/cash-ai-summary.tsx
src/components/features/cash-flow/collection-prediction.tsx
src/components/features/cash-flow/payment-priority.tsx
src/components/features/cash-flow/funding-recommendation.tsx
```

---

**Next Checklist:** `03-treasury-management.md`

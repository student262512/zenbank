# Execution Checklist: Part 3 - Treasury Management

**Status Legend:**
- [ ] Pending
- [~] In Progress
- [x] Completed

**Last Updated:** 2026-07-26

---

## 1. GLOBAL FILTERS COMPONENT

**Path:** `src/components/shared/treasury-filters.tsx`
**Status:** [ ] Pending

| Filter | Type | Status |
|--------|------|--------|
| Company | Multi-Select | [ ] Pending |
| Business Unit | Multi-Select | [ ] Pending |
| SPV | Multi-Select | [ ] Pending |
| Project | Multi-Select | [ ] Pending |
| Region | Multi-Select | [ ] Pending |
| Treasury Center | Multi-Select | [ ] Pending |
| Bank | Multi-Select | [ ] Pending |
| Bank Account | Multi-Select | [ ] Pending |
| Currency | Multi-Select | [ ] Pending |
| Country | Multi-Select | [ ] Pending |
| Legal Entity | Multi-Select | [ ] Pending |
| Counterparty | Multi-Select | [ ] Pending |
| Loan | Multi-Select | [ ] Pending |
| Investment | Multi-Select | [ ] Pending |
| Date Range | Date Picker | [ ] Pending |
| Scenario | Select | [ ] Pending |
| Status | Multi-Select | [ ] Pending |
| Tags | Multi-Select | [ ] Pending |

---

## 2. SIDE PANEL NAVIGATION

**Path:** `src/config/treasury-navigation.ts`
**Status:** [ ] Pending

| Menu Item | Path | Status |
|-----------|------|--------|
| Treasury Dashboard | `/treasury/dashboard` | [ ] Pending |
| Bank Management | `/treasury/bank-management` | [ ] Pending |
| Bank Connectivity | `/treasury/connectivity` | [ ] Pending |
| Bank Relationship Management | `/treasury/relationships` | [ ] Pending |
| Liquidity Management | `/treasury/liquidity` | [ ] Pending |
| Cash Pooling | `/treasury/pooling` | [ ] Pending |
| Cash Concentration | `/treasury/concentration` | [ ] Pending |
| Intercompany Funding | `/treasury/intercompany` | [ ] Pending |
| Treasury Investments | `/treasury/investments` | [ ] Pending |
| FX Management | `/treasury/fx` | [ ] Pending |
| Treasury Risk | `/treasury/risk` | [ ] Pending |
| Treasury Analytics | `/treasury/analytics` | [ ] Pending |
| Treasury AI Agent | `/treasury/ai` | [ ] Pending |
| Scenario Simulator | `/treasury/simulator` | [ ] Pending |

---

## 3. PAGE 1: TREASURY DASHBOARD

**Path:** `src/app/(dashboard)/treasury/dashboard/page.tsx`
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
| Liquidity | [ ] Pending |
| Banking | [ ] Pending |
| Investments | [ ] Pending |
| Risk | [ ] Pending |
| AI Insights | [ ] Pending |

### 3.3 KPI Cards
| Card | Mock Value | Status |
|------|------------|--------|
| Available Liquidity | INR 2,890 Cr | [ ] Pending |
| Available Credit Lines | INR 1,200 Cr | [ ] Pending |
| Idle Cash | INR 156 Cr | [ ] Pending |
| Cash Pool Balance | INR 890 Cr | [ ] Pending |
| Investment Portfolio | INR 1,450 Cr | [ ] Pending |
| Bank Exposure | INR 4,200 Cr | [ ] Pending |
| Debt Position | INR 3,800 Cr | [ ] Pending |
| FX Exposure | USD 45M | [ ] Pending |
| Counterparty Exposure | INR 2,100 Cr | [ ] Pending |
| Treasury Health Score | 82/100 | [ ] Pending |
| Liquidity Score | 88/100 | [ ] Pending |
| Treasury Risk Score | 24/100 | [ ] Pending |

### 3.4 Charts
| Chart | Type | Mock Data Points | Status |
|-------|------|------------------|--------|
| Liquidity Trend | Line Chart | 90 days | [ ] Pending |
| Cash Pool Distribution | Donut Chart | 6 pools | [ ] Pending |
| Bank Exposure | Horizontal Bar | 8 banks | [ ] Pending |
| Investment Allocation | Pie Chart | 6 categories | [ ] Pending |
| Debt Maturity | Stacked Bar | 5 years | [ ] Pending |
| FX Exposure | Donut Chart | 5 currencies | [ ] Pending |
| Counterparty Risk | Heatmap | 4x4 matrix | [ ] Pending |
| Treasury Heatmap | Heatmap | 5x5 matrix | [ ] Pending |
| Cash Waterfall | Waterfall | 10 stages | [ ] Pending |
| Cash Utilization | Gauge | Single value | [ ] Pending |

### 3.5 Tables
| Table | Columns | Rows | Status |
|-------|---------|------|--------|
| Treasury Alerts | Alert, Severity, Impact, Time, Action | 8 | [ ] Pending |
| Upcoming Maturities | Type, Institution, Amount, Date, Status | 10 | [ ] Pending |
| Upcoming Transfers | From, To, Amount, Date, Status | 8 | [ ] Pending |
| Pending Payments | Payee, Amount, Due, Priority, Approval | 10 | [ ] Pending |
| Funding Requests | Entity, Amount, Purpose, Status, Requester | 6 | [ ] Pending |
| Treasury Tasks | Task, Priority, Due, Assignee, Status | 8 | [ ] Pending |

### 3.6 Right Sidebar
| Widget | Status |
|--------|--------|
| AI Executive Summary | [ ] Pending |
| Today's Treasury Risks | [ ] Pending |
| Recommendations | [ ] Pending |
| Quick Actions | [ ] Pending |

---

## 4. PAGE 2: BANK MANAGEMENT

**Path:** `src/app/(dashboard)/treasury/bank-management/page.tsx`
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
| Bank Directory | [ ] Pending |
| Bank Accounts | [ ] Pending |
| Virtual Accounts | [ ] Pending |
| Escrow Accounts | [ ] Pending |
| Trust Accounts | [ ] Pending |
| Nodal Accounts | [ ] Pending |
| Digital Signatures | [ ] Pending |
| Payment Approvals | [ ] Pending |
| Bank Statements | [ ] Pending |

### 4.3 KPI Cards
| Card | Mock Value | Status |
|------|------------|--------|
| Total Banks | 12 | [ ] Pending |
| Active Accounts | 48 | [ ] Pending |
| Dormant Accounts | 5 | [ ] Pending |
| Blocked Accounts | 2 | [ ] Pending |
| Statement Status | 95% Synced | [ ] Pending |
| Pending Approvals | 8 | [ ] Pending |

### 4.4 Bank Directory Table
| Column | Status |
|--------|--------|
| Bank Name | [ ] Pending |
| Branch | [ ] Pending |
| Account Number | [ ] Pending |
| Account Type | [ ] Pending |
| Currency | [ ] Pending |
| Status | [ ] Pending |
| Owner Entity | [ ] Pending |
| Available Balance | [ ] Pending |
| Actions | [ ] Pending |

**Mock Data:** 48 bank account records

### 4.5 Charts
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| Bank Distribution | Pie Chart | 12 banks | [ ] Pending |
| Account Distribution | Donut Chart | 6 types | [ ] Pending |
| Account Balance Trend | Line Chart | 90 days | [ ] Pending |
| Balance by Bank | Horizontal Bar | 12 banks | [ ] Pending |

### 4.6 Bank Master Form
| Field | Type | Status |
|-------|------|--------|
| Bank Name | Text | [ ] Pending |
| Branch Name | Text | [ ] Pending |
| Branch Code | Text | [ ] Pending |
| IFSC Code | Text | [ ] Pending |
| SWIFT Code | Text | [ ] Pending |
| Routing Code | Text | [ ] Pending |
| Address | Textarea | [ ] Pending |
| Contact Person | Text | [ ] Pending |
| Contact Email | Email | [ ] Pending |
| Contact Phone | Text | [ ] Pending |
| KYC Status | Select | [ ] Pending |
| Signatories | Multi-Select | [ ] Pending |

### 4.7 Actions
| Action | Status |
|--------|--------|
| Create Bank | [ ] Pending |
| Open Account | [ ] Pending |
| Close Account | [ ] Pending |
| Freeze Account | [ ] Pending |
| Assign Signatory | [ ] Pending |
| Update KYC | [ ] Pending |
| Download Statement | [ ] Pending |

### 4.8 Detail Drawer
| Section | Status |
|---------|--------|
| Bank Details | [ ] Pending |
| Account List | [ ] Pending |
| Transaction History | [ ] Pending |
| Signatories | [ ] Pending |
| KYC Documents | [ ] Pending |
| Relationship History | [ ] Pending |
| Comments | [ ] Pending |
| Audit Trail | [ ] Pending |

---

## 5. PAGE 3: BANK CONNECTIVITY

**Path:** `src/app/(dashboard)/treasury/connectivity/page.tsx`
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
| API Connections | [ ] Pending |
| Host-to-Host | [ ] Pending |
| SWIFT | [ ] Pending |
| ISO20022 | [ ] Pending |
| Statement Imports | [ ] Pending |
| Payment Gateway | [ ] Pending |
| UPI | [ ] Pending |
| NEFT | [ ] Pending |
| RTGS | [ ] Pending |
| IMPS | [ ] Pending |

### 5.3 KPI Cards
| Card | Mock Value | Status |
|------|------------|--------|
| Connected Banks | 10 | [ ] Pending |
| Healthy Connections | 9 | [ ] Pending |
| Failed Connections | 1 | [ ] Pending |
| Pending Sync | 3 | [ ] Pending |
| Last Sync | 5 min ago | [ ] Pending |
| Avg Latency | 120ms | [ ] Pending |

### 5.4 Connectivity Table
| Column | Status |
|--------|--------|
| Bank | [ ] Pending |
| Connection Type | [ ] Pending |
| API Version | [ ] Pending |
| Status | [ ] Pending |
| Last Sync | [ ] Pending |
| Health | [ ] Pending |
| Latency | [ ] Pending |
| Error Rate | [ ] Pending |
| Actions | [ ] Pending |

**Mock Data:** 12 connection records

### 5.5 Actions
| Action | Status |
|--------|--------|
| Connect Bank | [ ] Pending |
| Reconnect | [ ] Pending |
| Sync Now | [ ] Pending |
| Download Statement | [ ] Pending |
| Upload Statement | [ ] Pending |
| Retry Failed | [ ] Pending |
| View Logs | [ ] Pending |

### 5.6 Connection Health Chart
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| Connection Status | Donut Chart | 3 states | [ ] Pending |
| Sync History | Line Chart | 24 hours | [ ] Pending |
| Latency Trend | Line Chart | 7 days | [ ] Pending |
| Error Rate | Area Chart | 30 days | [ ] Pending |

---

## 6. PAGE 4: BANK RELATIONSHIP MANAGEMENT

**Path:** `src/app/(dashboard)/treasury/relationships/page.tsx`
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
| Relationship Overview | [ ] Pending |
| Relationship Managers | [ ] Pending |
| Bank Facilities | [ ] Pending |
| Fees | [ ] Pending |
| Ratings | [ ] Pending |
| Performance | [ ] Pending |

### 6.3 KPI Cards
| Card | Mock Value | Status |
|------|------------|--------|
| Relationship Score | 85/100 | [ ] Pending |
| Credit Facilities | INR 2,400 Cr | [ ] Pending |
| Total Bank Charges | INR 4.2 Cr/yr | [ ] Pending |
| Utilization | 68% | [ ] Pending |
| Avg Rating | A+ | [ ] Pending |
| Active RMs | 8 | [ ] Pending |

### 6.4 Relationship Table
| Column | Status |
|--------|--------|
| Bank | [ ] Pending |
| Relationship Manager | [ ] Pending |
| Facility Type | [ ] Pending |
| Limit | [ ] Pending |
| Utilized | [ ] Pending |
| Available | [ ] Pending |
| Fees | [ ] Pending |
| Rating | [ ] Pending |
| Renewal Date | [ ] Pending |
| Actions | [ ] Pending |

**Mock Data:** 15 relationship records

### 6.5 Charts
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| Facility Utilization | Gauge | 6 facilities | [ ] Pending |
| Fee Trend | Line Chart | 12 months | [ ] Pending |
| Relationship Score Trend | Line Chart | 12 months | [ ] Pending |
| Exposure by Bank | Treemap | 8 banks | [ ] Pending |

### 6.6 Detail Drawer
| Section | Status |
|---------|--------|
| Bank Profile | [ ] Pending |
| RM Contacts | [ ] Pending |
| Facilities List | [ ] Pending |
| Fee Schedule | [ ] Pending |
| Performance Metrics | [ ] Pending |
| Meeting History | [ ] Pending |
| Documents | [ ] Pending |
| Notes | [ ] Pending |

---

## 7. PAGE 5: LIQUIDITY MANAGEMENT

**Path:** `src/app/(dashboard)/treasury/liquidity/page.tsx`
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
| Liquidity Position | [ ] Pending |
| Buffers | [ ] Pending |
| Forecast | [ ] Pending |
| Liquidity Planning | [ ] Pending |
| Funding | [ ] Pending |

### 7.3 KPI Cards
| Card | Mock Value | Status |
|------|------------|--------|
| Net Liquidity | INR 2,890 Cr | [ ] Pending |
| Available Liquidity | INR 2,450 Cr | [ ] Pending |
| Minimum Buffer | INR 500 Cr | [ ] Pending |
| Liquidity Gap | INR 78 Cr | [ ] Pending |
| Emergency Funding | INR 1,200 Cr | [ ] Pending |
| Liquidity Ratio | 1.45x | [ ] Pending |

### 7.4 Liquidity Table
| Column | Status |
|--------|--------|
| Entity | [ ] Pending |
| Cash Balance | [ ] Pending |
| Net Liquidity | [ ] Pending |
| Buffer | [ ] Pending |
| Gap | [ ] Pending |
| Status | [ ] Pending |
| Recommendation | [ ] Pending |
| Actions | [ ] Pending |

**Mock Data:** 12 entity liquidity records

### 7.5 Charts
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| Liquidity Forecast | Area Chart | 90 days | [ ] Pending |
| Liquidity Trend | Line Chart | 12 months | [ ] Pending |
| Funding Gap | Waterfall | 8 stages | [ ] Pending |
| Cash Utilization | Gauge | Single | [ ] Pending |
| Entity Liquidity | Horizontal Bar | 12 entities | [ ] Pending |

### 7.6 AI Widgets
| Widget | Status |
|--------|--------|
| Optimize Liquidity | [ ] Pending |
| Recommend Transfers | [ ] Pending |
| Predict Liquidity Stress | [ ] Pending |
| Funding Recommendation | [ ] Pending |

---

## 8. PAGE 6: CASH POOLING

**Path:** `src/app/(dashboard)/treasury/pooling/page.tsx`
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
| Pool Overview | [ ] Pending |
| Physical Pooling | [ ] Pending |
| Notional Pooling | [ ] Pending |
| Zero Balancing | [ ] Pending |
| Target Balancing | [ ] Pending |
| Transfers | [ ] Pending |

### 8.3 KPI Cards
| Card | Mock Value | Status |
|------|------------|--------|
| Total Pool Balance | INR 890 Cr | [ ] Pending |
| Active Pools | 6 | [ ] Pending |
| Participants | 24 | [ ] Pending |
| Today's Sweeps | 12 | [ ] Pending |
| Interest Saved | INR 2.4 Cr/yr | [ ] Pending |
| Pool Efficiency | 94% | [ ] Pending |

### 8.4 Pool Table
| Column | Status |
|--------|--------|
| Pool Name | [ ] Pending |
| Pool Type | [ ] Pending |
| Header Account | [ ] Pending |
| Participants | [ ] Pending |
| Total Balance | [ ] Pending |
| Target Balance | [ ] Pending |
| Variance | [ ] Pending |
| Status | [ ] Pending |
| Actions | [ ] Pending |

**Mock Data:** 6 pool records with 24 participant accounts

### 8.5 Charts
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| Pool Balance Trend | Line Chart | 30 days | [ ] Pending |
| Transfer Activity | Bar Chart | 30 days | [ ] Pending |
| Pool Utilization | Donut Chart | 6 pools | [ ] Pending |
| Sweep History | Area Chart | 30 days | [ ] Pending |

### 8.6 AI Widgets
| Widget | Status |
|--------|--------|
| Optimize Pool Structure | [ ] Pending |
| Recommend Sweeps | [ ] Pending |
| Identify Inefficiencies | [ ] Pending |

### 8.7 Transfer Form
| Field | Type | Status |
|-------|------|--------|
| Source Account | Select | [ ] Pending |
| Target Account | Select | [ ] Pending |
| Amount | Currency | [ ] Pending |
| Transfer Type | Select | [ ] Pending |
| Value Date | Date | [ ] Pending |
| Reference | Text | [ ] Pending |
| Notes | Textarea | [ ] Pending |

---

## 9. PAGE 7: CASH CONCENTRATION

**Path:** `src/app/(dashboard)/treasury/concentration/page.tsx`
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
| Overview | [ ] Pending |
| Transfer Rules | [ ] Pending |
| Concentration Schedule | [ ] Pending |
| Exceptions | [ ] Pending |
| Analytics | [ ] Pending |

### 9.3 KPI Cards
| Card | Mock Value | Status |
|------|------------|--------|
| Concentrated Today | INR 156 Cr | [ ] Pending |
| Pending Transfers | 8 | [ ] Pending |
| Active Rules | 24 | [ ] Pending |
| Exception Count | 3 | [ ] Pending |
| Idle Cash Identified | INR 45 Cr | [ ] Pending |

### 9.4 Concentration Table
| Column | Status |
|--------|--------|
| Source Account | [ ] Pending |
| Target Account | [ ] Pending |
| Current Balance | [ ] Pending |
| Threshold | [ ] Pending |
| Transfer Amount | [ ] Pending |
| Schedule | [ ] Pending |
| Status | [ ] Pending |
| Last Run | [ ] Pending |
| Actions | [ ] Pending |

**Mock Data:** 24 concentration rules

### 9.5 Charts
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| Concentration Trend | Line Chart | 30 days | [ ] Pending |
| Account Distribution | Treemap | 24 accounts | [ ] Pending |
| Transfer Volume | Bar Chart | 12 months | [ ] Pending |

### 9.6 AI Widgets
| Widget | Status |
|--------|--------|
| Recommend Concentration | [ ] Pending |
| Identify Idle Cash | [ ] Pending |
| Optimize Rules | [ ] Pending |

---

## 10. PAGE 8: INTERCOMPANY FUNDING

**Path:** `src/app/(dashboard)/treasury/intercompany/page.tsx`
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
| Funding Requests | [ ] Pending |
| Intercompany Loans | [ ] Pending |
| Interest | [ ] Pending |
| Repayments | [ ] Pending |
| Compliance | [ ] Pending |

### 10.3 KPI Cards
| Card | Mock Value | Status |
|------|------------|--------|
| Total IC Loans | INR 1,200 Cr | [ ] Pending |
| Active Loans | 18 | [ ] Pending |
| Interest Income (YTD) | INR 45 Cr | [ ] Pending |
| Pending Requests | 4 | [ ] Pending |
| Due This Month | INR 85 Cr | [ ] Pending |
| Compliance Score | 98% | [ ] Pending |

### 10.4 Intercompany Loan Table
| Column | Status |
|--------|--------|
| Loan ID | [ ] Pending |
| Lender Entity | [ ] Pending |
| Borrower Entity | [ ] Pending |
| Principal | [ ] Pending |
| Interest Rate | [ ] Pending |
| Outstanding | [ ] Pending |
| Due Date | [ ] Pending |
| Status | [ ] Pending |
| Compliance | [ ] Pending |
| Actions | [ ] Pending |

**Mock Data:** 18 intercompany loan records

### 10.5 Charts
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| IC Funding Trend | Line Chart | 12 months | [ ] Pending |
| Entity Exposure | Network Diagram | 12 entities | [ ] Pending |
| Interest Income | Bar Chart | 12 months | [ ] Pending |
| Repayment Schedule | Timeline | 12 months | [ ] Pending |

### 10.6 AI Widgets
| Widget | Status |
|--------|--------|
| Funding Recommendation | [ ] Pending |
| Compliance Check | [ ] Pending |
| Interest Optimization | [ ] Pending |
| Risk Assessment | [ ] Pending |

### 10.7 Funding Request Form
| Field | Type | Status |
|-------|------|--------|
| Borrower Entity | Select | [ ] Pending |
| Lender Entity | Select | [ ] Pending |
| Amount | Currency | [ ] Pending |
| Purpose | Textarea | [ ] Pending |
| Tenure | Number | [ ] Pending |
| Interest Rate | Percentage | [ ] Pending |
| Repayment Schedule | Select | [ ] Pending |
| Documents | File Upload | [ ] Pending |

---

## 11. PAGE 9: TREASURY INVESTMENTS

**Path:** `src/app/(dashboard)/treasury/investments/page.tsx`
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
| Portfolio | [ ] Pending |
| Fixed Deposits | [ ] Pending |
| Liquid Funds | [ ] Pending |
| Money Market | [ ] Pending |
| Government Securities | [ ] Pending |
| Commercial Papers | [ ] Pending |
| Corporate Bonds | [ ] Pending |
| Maturity Calendar | [ ] Pending |
| Yield Analytics | [ ] Pending |

### 11.3 KPI Cards
| Card | Mock Value | Status |
|------|------------|--------|
| Portfolio Value | INR 1,450 Cr | [ ] Pending |
| Average Yield | 7.2% | [ ] Pending |
| Expected Return (Annual) | INR 104 Cr | [ ] Pending |
| Maturing in 30 Days | INR 180 Cr | [ ] Pending |
| Investment Score | 88/100 | [ ] Pending |
| Unrealized Gain | INR 12 Cr | [ ] Pending |

### 11.4 Investment Portfolio Table
| Column | Status |
|--------|--------|
| Investment ID | [ ] Pending |
| Type | [ ] Pending |
| Institution | [ ] Pending |
| Principal | [ ] Pending |
| Interest Rate | [ ] Pending |
| Start Date | [ ] Pending |
| Maturity Date | [ ] Pending |
| Current Value | [ ] Pending |
| Yield (%) | [ ] Pending |
| Status | [ ] Pending |
| Actions | [ ] Pending |

**Mock Data:** 35 investment records across all types

### 11.5 Charts
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| Portfolio Allocation | Donut Chart | 7 categories | [ ] Pending |
| Yield Curve | Line Chart | Multiple tenures | [ ] Pending |
| Maturity Ladder | Stacked Bar | 12 months | [ ] Pending |
| Returns Trend | Line Chart | 12 months | [ ] Pending |
| Institution Exposure | Horizontal Bar | 10 institutions | [ ] Pending |

### 11.6 AI Widgets
| Widget | Status |
|--------|--------|
| Investment Recommendation | [ ] Pending |
| Reinvestment Suggestion | [ ] Pending |
| Yield Optimization | [ ] Pending |
| Risk Assessment | [ ] Pending |

### 11.7 Investment Form
| Field | Type | Status |
|-------|------|--------|
| Investment Type | Select | [ ] Pending |
| Institution | Select | [ ] Pending |
| Principal Amount | Currency | [ ] Pending |
| Interest Rate | Percentage | [ ] Pending |
| Tenure | Number | [ ] Pending |
| Start Date | Date | [ ] Pending |
| Maturity Date | Date | [ ] Pending |
| Auto-Renewal | Toggle | [ ] Pending |
| Notes | Textarea | [ ] Pending |

---

## 12. PAGE 10: FX MANAGEMENT

**Path:** `src/app/(dashboard)/treasury/fx/page.tsx`
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
| Exposure | [ ] Pending |
| Forward Contracts | [ ] Pending |
| Options | [ ] Pending |
| Swaps | [ ] Pending |
| Natural Hedging | [ ] Pending |
| Settlements | [ ] Pending |
| Currency Gains/Losses | [ ] Pending |

### 12.3 KPI Cards
| Card | Mock Value | Status |
|------|------------|--------|
| Net FX Exposure | USD 45M | [ ] Pending |
| Hedged Amount | USD 32M | [ ] Pending |
| Hedge Coverage | 71% | [ ] Pending |
| Open Contracts | 18 | [ ] Pending |
| FX Risk Score | 35/100 | [ ] Pending |
| MTM Gain/Loss | INR 4.5 Cr | [ ] Pending |

### 12.4 FX Exposure Table
| Column | Status |
|--------|--------|
| Currency Pair | [ ] Pending |
| Gross Exposure | [ ] Pending |
| Hedged | [ ] Pending |
| Net Exposure | [ ] Pending |
| Hedge Instrument | [ ] Pending |
| Settlement Date | [ ] Pending |
| Spot Rate | [ ] Pending |
| Forward Rate | [ ] Pending |
| Status | [ ] Pending |
| Risk Level | [ ] Pending |
| Actions | [ ] Pending |

**Mock Data:** 20 FX exposure records

### 12.5 Charts
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| Exposure by Currency | Donut Chart | 5 currencies | [ ] Pending |
| FX Rate Trend | Line Chart | 90 days | [ ] Pending |
| Hedge Coverage | Gauge | Single | [ ] Pending |
| Gain/Loss Trend | Area Chart | 12 months | [ ] Pending |
| Forward Contract Timeline | Gantt | 24 contracts | [ ] Pending |

### 12.6 AI Widgets
| Widget | Status |
|--------|--------|
| Recommend Hedge Strategy | [ ] Pending |
| Exposure Analysis | [ ] Pending |
| FX Rate Forecast | [ ] Pending |
| Optimal Hedge Timing | [ ] Pending |

### 12.7 Forward Contract Form
| Field | Type | Status |
|-------|------|--------|
| Contract Type | Select | [ ] Pending |
| Currency Pair | Select | [ ] Pending |
| Notional Amount | Currency | [ ] Pending |
| Forward Rate | Number | [ ] Pending |
| Settlement Date | Date | [ ] Pending |
| Counterparty | Select | [ ] Pending |
| Purpose | Textarea | [ ] Pending |

---

## 13. PAGE 11: TREASURY RISK

**Path:** `src/app/(dashboard)/treasury/risk/page.tsx`
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
| Liquidity Risk | [ ] Pending |
| Counterparty Risk | [ ] Pending |
| Bank Risk | [ ] Pending |
| Interest Rate Risk | [ ] Pending |
| FX Risk | [ ] Pending |
| Settlement Risk | [ ] Pending |
| Concentration Risk | [ ] Pending |
| Country Risk | [ ] Pending |
| Climate Risk | [ ] Pending |

### 13.3 KPI Cards
| Card | Mock Value | Status |
|------|------------|--------|
| Overall Risk Score | 28/100 | [ ] Pending |
| High Risk Items | 5 | [ ] Pending |
| Critical Alerts | 2 | [ ] Pending |
| Risk Trend | Improving | [ ] Pending |
| VaR (1-day 99%) | INR 24 Cr | [ ] Pending |
| Stress Test Impact | INR 156 Cr | [ ] Pending |

### 13.4 Risk Register Table
| Column | Status |
|--------|--------|
| Risk ID | [ ] Pending |
| Risk Category | [ ] Pending |
| Description | [ ] Pending |
| Severity | [ ] Pending |
| Probability | [ ] Pending |
| Impact | [ ] Pending |
| Mitigation | [ ] Pending |
| Owner | [ ] Pending |
| Status | [ ] Pending |
| Actions | [ ] Pending |

**Mock Data:** 25 risk records

### 13.5 Charts
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| Risk Heatmap | Heatmap | 5x5 matrix | [ ] Pending |
| Risk Trend | Line Chart | 12 months | [ ] Pending |
| Exposure Matrix | Bubble Chart | 20 risks | [ ] Pending |
| Scenario Impact | Bar Chart | 5 scenarios | [ ] Pending |
| Risk by Category | Radar Chart | 9 categories | [ ] Pending |

### 13.6 AI Widgets
| Widget | Status |
|--------|--------|
| Root Cause Analysis | [ ] Pending |
| Mitigation Recommendation | [ ] Pending |
| Confidence Score | [ ] Pending |
| Explainability Panel | [ ] Pending |

### 13.7 Detail Drawer
| Section | Status |
|---------|--------|
| Risk Details | [ ] Pending |
| Impact Analysis | [ ] Pending |
| Mitigation Plan | [ ] Pending |
| Related Exposures | [ ] Pending |
| Historical Trend | [ ] Pending |
| Action Items | [ ] Pending |
| Comments | [ ] Pending |
| Audit Trail | [ ] Pending |

---

## 14. PAGE 12: TREASURY ANALYTICS

**Path:** `src/app/(dashboard)/treasury/analytics/page.tsx`
**Status:** [ ] Pending

### 14.1 Page Header
| Element | Status |
|---------|--------|
| Page Title | [ ] Pending |
| Search | [ ] Pending |
| Saved Views | [ ] Pending |
| Global Filters | [ ] Pending |
| Actions Menu | [ ] Pending |

### 14.2 Tabs Navigation
| Tab | Status |
|-----|--------|
| KPIs | [ ] Pending |
| Benchmarking | [ ] Pending |
| Variance | [ ] Pending |
| Forecast Accuracy | [ ] Pending |
| Executive Reports | [ ] Pending |

### 14.3 KPI Dashboard Table
| Column | Status |
|--------|--------|
| KPI Name | [ ] Pending |
| Current Value | [ ] Pending |
| Previous Period | [ ] Pending |
| Variance | [ ] Pending |
| Target | [ ] Pending |
| Benchmark | [ ] Pending |
| Status | [ ] Pending |
| Trend | [ ] Pending |

**Mock Data:** 24 treasury KPIs

### 14.4 Charts
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| Liquidity KPIs | Multi-line | 12 months | [ ] Pending |
| Cash Conversion Cycle | Line Chart | 12 months | [ ] Pending |
| Bank Performance | Horizontal Bar | 8 banks | [ ] Pending |
| Investment Returns | Bar Chart | 12 months | [ ] Pending |
| Debt Trend | Area Chart | 24 months | [ ] Pending |
| FX Performance | Line Chart | 12 months | [ ] Pending |
| Working Capital | Stacked Area | 12 months | [ ] Pending |

### 14.5 Executive Report Section
| Element | Status |
|---------|--------|
| Report Template Selector | [ ] Pending |
| Report Preview | [ ] Pending |
| Schedule Report | [ ] Pending |
| Export to PDF | [ ] Pending |
| Export to Excel | [ ] Pending |
| Share Report | [ ] Pending |

---

## 15. PAGE 13: TREASURY AI AGENT

**Path:** `src/app/(dashboard)/treasury/ai/page.tsx`
**Status:** [ ] Pending

### 15.1 Page Header
| Element | Status |
|---------|--------|
| Page Title | [ ] Pending |
| New Conversation | [ ] Pending |
| Conversation History | [ ] Pending |
| Settings | [ ] Pending |

### 15.2 Tabs Navigation
| Tab | Status |
|-----|--------|
| AI Copilot | [ ] Pending |
| Recommendations | [ ] Pending |
| Investigations | [ ] Pending |
| Knowledge | [ ] Pending |
| Decision Center | [ ] Pending |
| Automations | [ ] Pending |

### 15.3 Suggested Prompts
| Prompt | Status |
|--------|--------|
| Optimize Liquidity | [ ] Pending |
| Recommend Bank Transfer | [ ] Pending |
| Recommend Investment | [ ] Pending |
| Predict Liquidity Stress | [ ] Pending |
| Explain Treasury Risk | [ ] Pending |
| Recommend Funding Source | [ ] Pending |
| Optimize Idle Cash | [ ] Pending |
| Recommend Hedge Strategy | [ ] Pending |
| Analyze Bank Relationship | [ ] Pending |
| Forecast Cash Pool | [ ] Pending |

### 15.4 Conversation Interface
| Element | Status |
|---------|--------|
| Chat Container | [ ] Pending |
| Message Input | [ ] Pending |
| Send Button | [ ] Pending |
| Voice Input | [ ] Pending |
| Attach Files | [ ] Pending |
| Context Panel | [ ] Pending |

### 15.5 AI Output Components
| Component | Status |
|-----------|--------|
| Executive Summary | [ ] Pending |
| Recommendations List | [ ] Pending |
| Confidence Indicator | [ ] Pending |
| Evidence Panel | [ ] Pending |
| Related Records | [ ] Pending |
| Citations | [ ] Pending |
| Thinking Steps | [ ] Pending |
| Approval Actions | [ ] Pending |
| Workflow Actions | [ ] Pending |

### 15.6 Recommendations Table
| Column | Status |
|--------|--------|
| Recommendation | [ ] Pending |
| Category | [ ] Pending |
| Priority | [ ] Pending |
| Impact | [ ] Pending |
| Confidence | [ ] Pending |
| Status | [ ] Pending |
| Actions | [ ] Pending |

**Mock Data:** 20 AI recommendations

---

## 16. PAGE 14: SCENARIO SIMULATOR

**Path:** `src/app/(dashboard)/treasury/simulator/page.tsx`
**Status:** [ ] Pending

### 16.1 Page Header
| Element | Status |
|---------|--------|
| Page Title | [ ] Pending |
| New Scenario | [ ] Pending |
| Load Scenario | [ ] Pending |
| Compare Scenarios | [ ] Pending |

### 16.2 Tabs Navigation
| Tab | Status |
|-----|--------|
| Scenario Builder | [ ] Pending |
| Interest Rate Changes | [ ] Pending |
| Liquidity Stress | [ ] Pending |
| Sales Slowdown | [ ] Pending |
| Construction Delay | [ ] Pending |
| Material Cost Increase | [ ] Pending |
| FX Shock | [ ] Pending |
| Debt Refinancing | [ ] Pending |
| Best Case | [ ] Pending |
| Expected Case | [ ] Pending |
| Worst Case | [ ] Pending |

### 16.3 KPI Cards (Scenario Impact)
| Card | Mock Value | Status |
|------|------------|--------|
| Scenario Score | 72/100 | [ ] Pending |
| Financial Impact | -INR 156 Cr | [ ] Pending |
| Liquidity Impact | -INR 89 Cr | [ ] Pending |
| Risk Impact | +15 points | [ ] Pending |
| Probability | 35% | [ ] Pending |
| Recovery Time | 6 months | [ ] Pending |

### 16.4 Scenario Builder Form
| Field | Type | Status |
|-------|------|--------|
| Scenario Name | Text | [ ] Pending |
| Scenario Type | Select | [ ] Pending |
| Time Horizon | Select | [ ] Pending |
| Interest Rate Change | Slider | [ ] Pending |
| Sales Change | Slider | [ ] Pending |
| Cost Change | Slider | [ ] Pending |
| FX Rate Change | Slider | [ ] Pending |
| Collection Delay | Slider | [ ] Pending |
| Payment Acceleration | Slider | [ ] Pending |
| Custom Parameters | Dynamic | [ ] Pending |

### 16.5 Charts
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| Cash Projection | Area Chart | 12 months | [ ] Pending |
| Liquidity Curve | Line Chart | 12 months | [ ] Pending |
| Risk Comparison | Radar Chart | 3 scenarios | [ ] Pending |
| Funding Gap | Waterfall | 8 stages | [ ] Pending |
| Scenario Comparison | Multi-line | 3 scenarios | [ ] Pending |
| Impact Breakdown | Sankey | 6 factors | [ ] Pending |

### 16.6 Results Tables
| Table | Columns | Rows | Status |
|-------|---------|------|--------|
| Assumptions | Parameter, Base, Scenario, Change | 12 | [ ] Pending |
| Scenario Results | Metric, Current, Projected, Impact | 15 | [ ] Pending |
| Recommendations | Action, Impact, Priority, Owner | 8 | [ ] Pending |

### 16.7 AI Widgets
| Widget | Status |
|--------|--------|
| Explain Scenario | [ ] Pending |
| Compare Scenarios | [ ] Pending |
| Recommended Actions | [ ] Pending |
| Monte Carlo Analysis | [ ] Pending |
| Sensitivity Analysis | [ ] Pending |

---

## 17. SHARED TREASURY COMPONENTS

**Path:** `src/components/features/treasury/`
**Status:** [ ] Pending

### 17.1 Display Components
| Component | File | Status |
|-----------|------|--------|
| Liquidity Card | `liquidity-card.tsx` | [ ] Pending |
| Bank Card | `bank-card.tsx` | [ ] Pending |
| Investment Card | `investment-card.tsx` | [ ] Pending |
| FX Exposure Card | `fx-exposure-card.tsx` | [ ] Pending |
| Risk Card | `risk-card.tsx` | [ ] Pending |
| Pool Card | `pool-card.tsx` | [ ] Pending |
| Scenario Card | `scenario-card.tsx` | [ ] Pending |
| Relationship Card | `relationship-card.tsx` | [ ] Pending |

### 17.2 Chart Components
| Component | File | Status |
|-----------|------|--------|
| Liquidity Gauge | `liquidity-gauge.tsx` | [ ] Pending |
| Treasury Heatmap | `treasury-heatmap.tsx` | [ ] Pending |
| Maturity Ladder | `maturity-ladder.tsx` | [ ] Pending |
| Exposure Chart | `exposure-chart.tsx` | [ ] Pending |
| Yield Curve | `yield-curve.tsx` | [ ] Pending |
| Risk Radar | `risk-radar.tsx` | [ ] Pending |

### 17.3 Table Components
| Component | File | Status |
|-----------|------|--------|
| Bank Account Table | `bank-account-table.tsx` | [ ] Pending |
| Investment Table | `investment-table.tsx` | [ ] Pending |
| FX Exposure Table | `fx-exposure-table.tsx` | [ ] Pending |
| Risk Register Table | `risk-register-table.tsx` | [ ] Pending |
| Pool Participant Table | `pool-participant-table.tsx` | [ ] Pending |
| IC Loan Table | `ic-loan-table.tsx` | [ ] Pending |

### 17.4 Form Components
| Component | File | Status |
|-----------|------|--------|
| Bank Form | `bank-form.tsx` | [ ] Pending |
| Investment Form | `investment-form.tsx` | [ ] Pending |
| Transfer Form | `transfer-form.tsx` | [ ] Pending |
| Forward Contract Form | `forward-contract-form.tsx` | [ ] Pending |
| IC Funding Form | `ic-funding-form.tsx` | [ ] Pending |
| Scenario Form | `scenario-form.tsx` | [ ] Pending |

### 17.5 Drawer Components
| Component | File | Status |
|-----------|------|--------|
| Bank Drawer | `bank-drawer.tsx` | [ ] Pending |
| Investment Drawer | `investment-drawer.tsx` | [ ] Pending |
| FX Contract Drawer | `fx-contract-drawer.tsx` | [ ] Pending |
| Risk Drawer | `risk-drawer.tsx` | [ ] Pending |
| Pool Drawer | `pool-drawer.tsx` | [ ] Pending |
| Relationship Drawer | `relationship-drawer.tsx` | [ ] Pending |

### 17.6 AI Components
| Component | File | Status |
|-----------|------|--------|
| Treasury AI Summary | `treasury-ai-summary.tsx` | [ ] Pending |
| Liquidity Prediction | `liquidity-prediction.tsx` | [ ] Pending |
| Investment Recommendation | `investment-recommendation.tsx` | [ ] Pending |
| FX Hedge Recommendation | `fx-hedge-recommendation.tsx` | [ ] Pending |
| Risk Analysis | `treasury-risk-analysis.tsx` | [ ] Pending |
| Funding Recommendation | `funding-recommendation.tsx` | [ ] Pending |

---

## 18. MOCK DATA REQUIREMENTS

### 18.1 Treasury Dashboard Mock Data
| Data Set | Records | Status |
|----------|---------|--------|
| KPI Values | 12 KPIs | [ ] Pending |
| Liquidity Trend | 90 days | [ ] Pending |
| Bank Exposure | 8 banks | [ ] Pending |
| Investment Allocation | 7 categories | [ ] Pending |
| Treasury Alerts | 8 items | [ ] Pending |
| Upcoming Maturities | 10 items | [ ] Pending |
| Pending Payments | 10 items | [ ] Pending |
| Treasury Tasks | 8 items | [ ] Pending |

### 18.2 Bank Management Mock Data
| Data Set | Records | Status |
|----------|---------|--------|
| Bank Directory | 12 banks | [ ] Pending |
| Bank Accounts | 48 accounts | [ ] Pending |
| Virtual Accounts | 15 accounts | [ ] Pending |
| Escrow Accounts | 8 accounts | [ ] Pending |
| Digital Signatures | 24 signatories | [ ] Pending |
| Bank Statements | 90 days | [ ] Pending |

### 18.3 Bank Connectivity Mock Data
| Data Set | Records | Status |
|----------|---------|--------|
| API Connections | 12 connections | [ ] Pending |
| Sync History | 24 hours | [ ] Pending |
| Error Logs | 50 entries | [ ] Pending |
| Latency Data | 7 days | [ ] Pending |

### 18.4 Bank Relationship Mock Data
| Data Set | Records | Status |
|----------|---------|--------|
| Relationship Records | 15 records | [ ] Pending |
| Facilities | 20 facilities | [ ] Pending |
| Fee Schedule | 12 months | [ ] Pending |
| RM Contacts | 8 contacts | [ ] Pending |

### 18.5 Liquidity Management Mock Data
| Data Set | Records | Status |
|----------|---------|--------|
| Entity Liquidity | 12 entities | [ ] Pending |
| Liquidity Forecast | 90 days | [ ] Pending |
| Buffer Analysis | 12 entities | [ ] Pending |
| Funding Options | 10 options | [ ] Pending |

### 18.6 Cash Pooling Mock Data
| Data Set | Records | Status |
|----------|---------|--------|
| Pool Structures | 6 pools | [ ] Pending |
| Participant Accounts | 24 accounts | [ ] Pending |
| Sweep History | 30 days | [ ] Pending |
| Transfer Rules | 18 rules | [ ] Pending |

### 18.7 Cash Concentration Mock Data
| Data Set | Records | Status |
|----------|---------|--------|
| Concentration Rules | 24 rules | [ ] Pending |
| Transfer History | 30 days | [ ] Pending |
| Exception Log | 20 exceptions | [ ] Pending |

### 18.8 Intercompany Funding Mock Data
| Data Set | Records | Status |
|----------|---------|--------|
| IC Loans | 18 loans | [ ] Pending |
| Interest Schedule | 24 months | [ ] Pending |
| Funding Requests | 8 requests | [ ] Pending |
| Compliance Records | 18 records | [ ] Pending |

### 18.9 Treasury Investments Mock Data
| Data Set | Records | Status |
|----------|---------|--------|
| Fixed Deposits | 15 FDs | [ ] Pending |
| Liquid Funds | 8 funds | [ ] Pending |
| Money Market | 6 instruments | [ ] Pending |
| Government Securities | 4 securities | [ ] Pending |
| Commercial Papers | 5 papers | [ ] Pending |
| Corporate Bonds | 5 bonds | [ ] Pending |
| Maturity Calendar | 12 months | [ ] Pending |

### 18.10 FX Management Mock Data
| Data Set | Records | Status |
|----------|---------|--------|
| FX Exposures | 20 exposures | [ ] Pending |
| Forward Contracts | 24 contracts | [ ] Pending |
| Options | 8 options | [ ] Pending |
| Swap Contracts | 6 swaps | [ ] Pending |
| Rate History | 90 days | [ ] Pending |
| Gain/Loss Data | 12 months | [ ] Pending |

### 18.11 Treasury Risk Mock Data
| Data Set | Records | Status |
|----------|---------|--------|
| Risk Register | 25 risks | [ ] Pending |
| Risk Trends | 12 months | [ ] Pending |
| Scenario Impacts | 5 scenarios | [ ] Pending |
| Mitigation Actions | 30 actions | [ ] Pending |

### 18.12 Treasury Analytics Mock Data
| Data Set | Records | Status |
|----------|---------|--------|
| KPI History | 24 KPIs x 12 months | [ ] Pending |
| Benchmark Data | 15 metrics | [ ] Pending |
| Variance Analysis | 12 months | [ ] Pending |
| Report Templates | 8 templates | [ ] Pending |

### 18.13 Treasury AI Agent Mock Data
| Data Set | Records | Status |
|----------|---------|--------|
| AI Recommendations | 20 recommendations | [ ] Pending |
| Conversations | 15 chats | [ ] Pending |
| Knowledge Base | 50 articles | [ ] Pending |
| Automations | 12 workflows | [ ] Pending |

### 18.14 Scenario Simulator Mock Data
| Data Set | Records | Status |
|----------|---------|--------|
| Scenario Templates | 8 templates | [ ] Pending |
| Saved Scenarios | 12 scenarios | [ ] Pending |
| Simulation Results | 5 runs | [ ] Pending |
| Sensitivity Data | 8 parameters | [ ] Pending |

---

## 19. SUMMARY

### Component Count
| Category | Total | Completed | Pending |
|----------|-------|-----------|---------|
| Global Filters | 18 | 0 | 18 |
| Side Panel Items | 14 | 0 | 14 |
| Page Headers | 14 | 0 | 14 |
| Tab Navigation | 87 | 0 | 87 |
| KPI Cards | 68 | 0 | 68 |
| Charts | 65 | 0 | 65 |
| Tables | 22 | 0 | 22 |
| Forms | 12 | 0 | 12 |
| AI Widgets | 42 | 0 | 42 |
| Drawers | 12 | 0 | 12 |
| Shared Components | 32 | 0 | 32 |
| Mock Data Sets | 52 | 0 | 52 |
| **TOTAL** | **438** | **0** | **438** |

### Priority Order
1. Global Filters Component
2. Side Panel Navigation
3. Treasury Dashboard (Page 1)
4. Bank Management (Page 2)
5. Bank Connectivity (Page 3)
6. Bank Relationship Management (Page 4)
7. Liquidity Management (Page 5)
8. Cash Pooling (Page 6)
9. Cash Concentration (Page 7)
10. Intercompany Funding (Page 8)
11. Treasury Investments (Page 9)
12. FX Management (Page 10)
13. Treasury Risk (Page 11)
14. Treasury Analytics (Page 12)
15. Treasury AI Agent (Page 13)
16. Scenario Simulator (Page 14)
17. Shared Components
18. Mock Data Generation

---

## 20. FILE GENERATION ORDER

### Phase 1: Treasury Filters & Navigation
```
src/components/shared/treasury-filters.tsx
src/config/treasury-navigation.ts
```

### Phase 2: Treasury Dashboard
```
src/app/(dashboard)/treasury/dashboard/page.tsx
src/components/features/treasury/liquidity-card.tsx
src/components/features/treasury/liquidity-gauge.tsx
src/components/features/treasury/treasury-heatmap.tsx
```

### Phase 3: Bank Management & Connectivity
```
src/app/(dashboard)/treasury/bank-management/page.tsx
src/app/(dashboard)/treasury/connectivity/page.tsx
src/components/features/treasury/bank-card.tsx
src/components/features/treasury/bank-account-table.tsx
src/components/features/treasury/bank-form.tsx
src/components/features/treasury/bank-drawer.tsx
```

### Phase 4: Bank Relationships & Liquidity
```
src/app/(dashboard)/treasury/relationships/page.tsx
src/app/(dashboard)/treasury/liquidity/page.tsx
src/components/features/treasury/relationship-card.tsx
src/components/features/treasury/relationship-drawer.tsx
```

### Phase 5: Cash Pooling & Concentration
```
src/app/(dashboard)/treasury/pooling/page.tsx
src/app/(dashboard)/treasury/concentration/page.tsx
src/components/features/treasury/pool-card.tsx
src/components/features/treasury/pool-drawer.tsx
src/components/features/treasury/pool-participant-table.tsx
src/components/features/treasury/transfer-form.tsx
```

### Phase 6: Intercompany Funding
```
src/app/(dashboard)/treasury/intercompany/page.tsx
src/components/features/treasury/ic-loan-table.tsx
src/components/features/treasury/ic-funding-form.tsx
```

### Phase 7: Treasury Investments
```
src/app/(dashboard)/treasury/investments/page.tsx
src/components/features/treasury/investment-card.tsx
src/components/features/treasury/investment-table.tsx
src/components/features/treasury/investment-form.tsx
src/components/features/treasury/investment-drawer.tsx
src/components/features/treasury/maturity-ladder.tsx
src/components/features/treasury/yield-curve.tsx
```

### Phase 8: FX Management
```
src/app/(dashboard)/treasury/fx/page.tsx
src/components/features/treasury/fx-exposure-card.tsx
src/components/features/treasury/fx-exposure-table.tsx
src/components/features/treasury/forward-contract-form.tsx
src/components/features/treasury/fx-contract-drawer.tsx
src/components/features/treasury/exposure-chart.tsx
```

### Phase 9: Treasury Risk
```
src/app/(dashboard)/treasury/risk/page.tsx
src/components/features/treasury/risk-card.tsx
src/components/features/treasury/risk-register-table.tsx
src/components/features/treasury/risk-drawer.tsx
src/components/features/treasury/risk-radar.tsx
src/components/features/treasury/treasury-risk-analysis.tsx
```

### Phase 10: Treasury Analytics
```
src/app/(dashboard)/treasury/analytics/page.tsx
```

### Phase 11: Treasury AI Agent
```
src/app/(dashboard)/treasury/ai/page.tsx
src/components/features/treasury/treasury-ai-summary.tsx
src/components/features/treasury/liquidity-prediction.tsx
src/components/features/treasury/investment-recommendation.tsx
src/components/features/treasury/fx-hedge-recommendation.tsx
src/components/features/treasury/funding-recommendation.tsx
```

### Phase 12: Scenario Simulator
```
src/app/(dashboard)/treasury/simulator/page.tsx
src/components/features/treasury/scenario-card.tsx
src/components/features/treasury/scenario-form.tsx
```

---

## 21. DEPENDENCIES

### Required Shared Components (from Part 1 & 2)
| Component | Path | Status |
|-----------|------|--------|
| PageHeader | `src/components/layout/page-header.tsx` | [x] Completed |
| KPICard | `src/components/shared/kpi-card.tsx` | [x] Completed |
| KPIGrid | `src/components/shared/kpi-grid.tsx` | [x] Completed |
| DataTable | `src/components/shared/data-table.tsx` | [x] Completed |
| Drawer | `src/components/ui/drawer.tsx` | [x] Completed |
| Tabs | `src/components/ui/tabs.tsx` | [x] Completed |
| AIInsightCard | `src/components/shared/ai-insight-card.tsx` | [x] Completed |
| Charts (Area, Bar, Line, Pie) | `src/components/shared/charts/` | [x] Completed |
| FilterBar | `src/components/shared/filter-bar.tsx` | [x] Completed |

### shadcn/ui Components Required
| Component | Status |
|-----------|--------|
| Button | [x] Installed |
| Card | [x] Installed |
| Dialog | [x] Installed |
| Dropdown Menu | [x] Installed |
| Input | [x] Installed |
| Label | [x] Installed |
| Select | [x] Installed |
| Tabs | [x] Installed |
| Tooltip | [x] Installed |
| Badge | [x] Installed |
| Progress | [x] Installed |
| Slider | [x] Installed |
| Switch | [x] Installed |
| Calendar | [x] Installed |
| Popover | [x] Installed |
| Command | [x] Installed |

---

**Next Checklist:** `04-project-finance.md`

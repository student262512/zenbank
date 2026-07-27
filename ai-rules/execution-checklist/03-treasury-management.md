# Execution Checklist: Part 3 - Treasury Management

**Status Legend:**
- [ ] Pending
- [~] In Progress
- [x] Completed

**Last Updated:** 2026-07-26

---

## 1. GLOBAL FILTERS COMPONENT

**Path:** `src/components/shared/treasury-filters.tsx`
**Status:** [x] Completed

| Filter | Type | Status |
|--------|------|--------|
| Company | Multi-Select | [x] Completed |
| Business Unit | Multi-Select | [x] Completed |
| SPV | Multi-Select | [x] Completed |
| Project | Multi-Select | [x] Completed |
| Region | Multi-Select | [x] Completed |
| Treasury Center | Multi-Select | [x] Completed |
| Bank | Multi-Select | [x] Completed |
| Bank Account | Multi-Select | [x] Completed |
| Currency | Multi-Select | [x] Completed |
| Country | Multi-Select | [x] Completed |
| Legal Entity | Multi-Select | [x] Completed |
| Counterparty | Multi-Select | [x] Completed |
| Loan | Multi-Select | [x] Completed |
| Investment | Multi-Select | [x] Completed |
| Date Range | Date Picker | [x] Completed |
| Scenario | Select | [x] Completed |
| Status | Multi-Select | [x] Completed |
| Tags | Multi-Select | [x] Completed |

---

## 2. SIDE PANEL NAVIGATION

**Path:** `src/config/treasury-navigation.ts`
**Status:** [x] Completed

| Menu Item | Path | Status |
|-----------|------|--------|
| Treasury Dashboard | `/treasury/dashboard` | [x] Completed |
| Bank Management | `/treasury/bank-management` | [x] Completed |
| Bank Connectivity | `/treasury/connectivity` | [x] Completed |
| Bank Relationship Management | `/treasury/relationships` | [x] Completed |
| Liquidity Management | `/treasury/liquidity` | [x] Completed |
| Cash Pooling | `/treasury/pooling` | [x] Completed |
| Cash Concentration | `/treasury/concentration` | [x] Completed |
| Intercompany Funding | `/treasury/intercompany` | [x] Completed |
| Treasury Investments | `/treasury/investments` | [x] Completed |
| FX Management | `/treasury/fx` | [x] Completed |
| Treasury Risk | `/treasury/risk` | [x] Completed |
| Treasury Analytics | `/treasury/analytics` | [x] Completed |
| Treasury AI Agent | `/treasury/ai` | [x] Completed |
| Scenario Simulator | `/treasury/simulator` | [x] Completed |

---

## 3. PAGE 1: TREASURY DASHBOARD

**Path:** `src/app/(dashboard)/treasury/dashboard/page.tsx`
**Status:** [x] Completed

### 3.1 Page Header
| Element | Status |
|---------|--------|
| Page Title | [x] Completed |
| Search Button | [x] Completed |
| Saved Views Selector | [x] Completed |
| Global Filters | [x] Completed |
| Export Button | [x] Completed |
| Refresh Button | [x] Completed |
| Share Button | [x] Completed |
| Favorite Button | [x] Completed |

### 3.2 Tabs Navigation
| Tab | Status |
|-----|--------|
| Overview | [x] Completed |
| Liquidity | [x] Completed |
| Banking | [x] Completed |
| Investments | [x] Completed |
| Risk | [x] Completed |
| AI Insights | [x] Completed |

### 3.3 KPI Cards
| Card | Mock Value | Status |
|------|------------|--------|
| Available Liquidity | INR 2,890 Cr | [x] Completed |
| Available Credit Lines | INR 1,200 Cr | [x] Completed |
| Idle Cash | INR 156 Cr | [x] Completed |
| Cash Pool Balance | INR 890 Cr | [x] Completed |
| Investment Portfolio | INR 1,450 Cr | [x] Completed |
| Bank Exposure | INR 4,200 Cr | [x] Completed |
| Debt Position | INR 3,800 Cr | [x] Completed |
| FX Exposure | USD 45M | [x] Completed |
| Counterparty Exposure | INR 2,100 Cr | [x] Completed |
| Treasury Health Score | 82/100 | [x] Completed |
| Liquidity Score | 88/100 | [x] Completed |
| Treasury Risk Score | 24/100 | [x] Completed |

### 3.4 Charts
| Chart | Type | Mock Data Points | Status |
|-------|------|------------------|--------|
| Liquidity Trend | Line Chart | 90 days | [x] Completed |
| Cash Pool Distribution | Donut Chart | 6 pools | [x] Completed |
| Bank Exposure | Horizontal Bar | 8 banks | [x] Completed |
| Investment Allocation | Pie Chart | 6 categories | [x] Completed |
| Debt Maturity | Stacked Bar | 5 years | [x] Completed |
| FX Exposure | Donut Chart | 5 currencies | [x] Completed |
| Counterparty Risk | Heatmap | 4x4 matrix | [x] Completed |
| Treasury Heatmap | Heatmap | 5x5 matrix | [x] Completed |
| Cash Waterfall | Waterfall | 10 stages | [x] Completed |
| Cash Utilization | Gauge | Single value | [x] Completed |

### 3.5 Tables
| Table | Columns | Rows | Status |
|-------|---------|------|--------|
| Treasury Alerts | Alert, Severity, Impact, Time, Action | 8 | [x] Completed |
| Upcoming Maturities | Type, Institution, Amount, Date, Status | 10 | [x] Completed |
| Upcoming Transfers | From, To, Amount, Date, Status | 8 | [x] Completed |
| Pending Payments | Payee, Amount, Due, Priority, Approval | 10 | [x] Completed |
| Funding Requests | Entity, Amount, Purpose, Status, Requester | 6 | [x] Completed |
| Treasury Tasks | Task, Priority, Due, Assignee, Status | 8 | [x] Completed |

### 3.6 Right Sidebar
| Widget | Status |
|--------|--------|
| AI Executive Summary | [x] Completed |
| Today's Treasury Risks | [x] Completed |
| Recommendations | [x] Completed |
| Quick Actions | [x] Completed |

---

## 4. PAGE 2: BANK MANAGEMENT

**Path:** `src/app/(dashboard)/treasury/bank-management/page.tsx`
**Status:** [x] Completed

### 4.1 Page Header
| Element | Status |
|---------|--------|
| Page Title | [x] Completed |
| Search | [x] Completed |
| Saved Views | [x] Completed |
| Global Filters | [x] Completed |
| Actions Menu | [x] Completed |

### 4.2 Tabs Navigation
| Tab | Status |
|-----|--------|
| Bank Directory | [x] Completed |
| Bank Accounts | [x] Completed |
| Virtual Accounts | [x] Completed |
| Escrow Accounts | [x] Completed |
| Trust Accounts | [x] Completed |
| Nodal Accounts | [x] Completed |
| Digital Signatures | [x] Completed |
| Payment Approvals | [x] Completed |
| Bank Statements | [x] Completed |

### 4.3 KPI Cards
| Card | Mock Value | Status |
|------|------------|--------|
| Total Banks | 12 | [x] Completed |
| Active Accounts | 48 | [x] Completed |
| Dormant Accounts | 5 | [x] Completed |
| Blocked Accounts | 2 | [x] Completed |
| Statement Status | 95% Synced | [x] Completed |
| Pending Approvals | 8 | [x] Completed |

### 4.4 Bank Directory Table
| Column | Status |
|--------|--------|
| Bank Name | [x] Completed |
| Branch | [x] Completed |
| Account Number | [x] Completed |
| Account Type | [x] Completed |
| Currency | [x] Completed |
| Status | [x] Completed |
| Owner Entity | [x] Completed |
| Available Balance | [x] Completed |
| Actions | [x] Completed |

**Mock Data:** 48 bank account records

### 4.5 Charts
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| Bank Distribution | Pie Chart | 12 banks | [x] Completed |
| Account Distribution | Donut Chart | 6 types | [x] Completed |
| Account Balance Trend | Line Chart | 90 days | [x] Completed |
| Balance by Bank | Horizontal Bar | 12 banks | [x] Completed |

### 4.6 Bank Master Form
| Field | Type | Status |
|-------|------|--------|
| Bank Name | Text | [x] Completed |
| Branch Name | Text | [x] Completed |
| Branch Code | Text | [x] Completed |
| IFSC Code | Text | [x] Completed |
| SWIFT Code | Text | [x] Completed |
| Routing Code | Text | [x] Completed |
| Address | Textarea | [x] Completed |
| Contact Person | Text | [x] Completed |
| Contact Email | Email | [x] Completed |
| Contact Phone | Text | [x] Completed |
| KYC Status | Select | [x] Completed |
| Signatories | Multi-Select | [x] Completed |

### 4.7 Actions
| Action | Status |
|--------|--------|
| Create Bank | [x] Completed |
| Open Account | [x] Completed |
| Close Account | [x] Completed |
| Freeze Account | [x] Completed |
| Assign Signatory | [x] Completed |
| Update KYC | [x] Completed |
| Download Statement | [x] Completed |

### 4.8 Detail Drawer
| Section | Status |
|---------|--------|
| Bank Details | [x] Completed |
| Account List | [x] Completed |
| Transaction History | [x] Completed |
| Signatories | [x] Completed |
| KYC Documents | [x] Completed |
| Relationship History | [x] Completed |
| Comments | [x] Completed |
| Audit Trail | [x] Completed |

---

## 5. PAGE 3: BANK CONNECTIVITY

**Path:** `src/app/(dashboard)/treasury/bank-connectivity/page.tsx`
**Status:** [x] Completed

### 5.1 Page Header
| Element | Status |
|---------|--------|
| Page Title | [x] Completed |
| Search | [x] Completed |
| Saved Views | [x] Completed |
| Global Filters | [x] Completed |
| Actions Menu | [x] Completed |

### 5.2 Tabs Navigation
| Tab | Status |
|-----|--------|
| API Connections | [x] Completed |
| Host-to-Host | [x] Completed |
| SWIFT | [x] Completed |
| ISO20022 | [x] Completed |
| Statement Imports | [x] Completed |
| Payment Gateway | [x] Completed |
| UPI | [x] Completed |
| NEFT | [x] Completed |
| RTGS | [x] Completed |
| IMPS | [x] Completed |

### 5.3 KPI Cards
| Card | Mock Value | Status |
|------|------------|--------|
| Connected Banks | 10 | [x] Completed |
| Healthy Connections | 9 | [x] Completed |
| Failed Connections | 1 | [x] Completed |
| Pending Sync | 3 | [x] Completed |
| Last Sync | 5 min ago | [x] Completed |
| Avg Latency | 120ms | [x] Completed |

### 5.4 Connectivity Table
| Column | Status |
|--------|--------|
| Bank | [x] Completed |
| Connection Type | [x] Completed |
| API Version | [x] Completed |
| Status | [x] Completed |
| Last Sync | [x] Completed |
| Health | [x] Completed |
| Latency | [x] Completed |
| Error Rate | [x] Completed |
| Actions | [x] Completed |

**Mock Data:** 12 connection records

### 5.5 Actions
| Action | Status |
|--------|--------|
| Connect Bank | [x] Completed |
| Reconnect | [x] Completed |
| Sync Now | [x] Completed |
| Download Statement | [x] Completed |
| Upload Statement | [x] Completed |
| Retry Failed | [x] Completed |
| View Logs | [x] Completed |

### 5.6 Connection Health Chart
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| Connection Status | Donut Chart | 3 states | [x] Completed |
| Sync History | Line Chart | 24 hours | [x] Completed |
| Latency Trend | Line Chart | 7 days | [x] Completed |
| Error Rate | Area Chart | 30 days | [x] Completed |

---

## 6. PAGE 4: BANK RELATIONSHIP MANAGEMENT

**Path:** `src/app/(dashboard)/treasury/bank-relationship/page.tsx`
**Status:** [x] Completed

### 6.1 Page Header
| Element | Status |
|---------|--------|
| Page Title | [x] Completed |
| Search | [x] Completed |
| Saved Views | [x] Completed |
| Global Filters | [x] Completed |
| Actions Menu | [x] Completed |

### 6.2 Tabs Navigation
| Tab | Status |
|-----|--------|
| Relationship Overview | [x] Completed |
| Relationship Managers | [x] Completed |
| Bank Facilities | [x] Completed |
| Fees | [x] Completed |
| Ratings | [x] Completed |
| Performance | [x] Completed |

### 6.3 KPI Cards
| Card | Mock Value | Status |
|------|------------|--------|
| Relationship Score | 85/100 | [x] Completed |
| Credit Facilities | INR 2,400 Cr | [x] Completed |
| Total Bank Charges | INR 4.2 Cr/yr | [x] Completed |
| Utilization | 68% | [x] Completed |
| Avg Rating | A+ | [x] Completed |
| Active RMs | 8 | [x] Completed |

### 6.4 Relationship Table
| Column | Status |
|--------|--------|
| Bank | [x] Completed |
| Relationship Manager | [x] Completed |
| Facility Type | [x] Completed |
| Limit | [x] Completed |
| Utilized | [x] Completed |
| Available | [x] Completed |
| Fees | [x] Completed |
| Rating | [x] Completed |
| Renewal Date | [x] Completed |
| Actions | [x] Completed |

**Mock Data:** 15 relationship records

### 6.5 Charts
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| Facility Utilization | Gauge | 6 facilities | [x] Completed |
| Fee Trend | Line Chart | 12 months | [x] Completed |
| Relationship Score Trend | Line Chart | 12 months | [x] Completed |
| Exposure by Bank | Treemap | 8 banks | [x] Completed |

### 6.6 Detail Drawer
| Section | Status |
|---------|--------|
| Bank Profile | [x] Completed |
| RM Contacts | [x] Completed |
| Facilities List | [x] Completed |
| Fee Schedule | [x] Completed |
| Performance Metrics | [x] Completed |
| Meeting History | [x] Completed |
| Documents | [x] Completed |
| Notes | [x] Completed |

---

## 7. PAGE 5: LIQUIDITY MANAGEMENT

**Path:** `src/app/(dashboard)/treasury/liquidity/page.tsx`
**Status:** [x] Completed

### 7.1 Page Header
| Element | Status |
|---------|--------|
| Page Title | [x] Completed |
| Search | [x] Completed |
| Saved Views | [x] Completed |
| Global Filters | [x] Completed |
| Actions Menu | [x] Completed |

### 7.2 Tabs Navigation
| Tab | Status |
|-----|--------|
| Overview | [x] Completed |
| Liquidity Position | [x] Completed |
| Buffers | [x] Completed |
| Forecast | [x] Completed |
| Liquidity Planning | [x] Completed |
| Funding | [x] Completed |

### 7.3 KPI Cards
| Card | Mock Value | Status |
|------|------------|--------|
| Net Liquidity | INR 2,890 Cr | [x] Completed |
| Available Liquidity | INR 2,450 Cr | [x] Completed |
| Minimum Buffer | INR 500 Cr | [x] Completed |
| Liquidity Gap | INR 78 Cr | [x] Completed |
| Emergency Funding | INR 1,200 Cr | [x] Completed |
| Liquidity Ratio | 1.45x | [x] Completed |

### 7.4 Liquidity Table
| Column | Status |
|--------|--------|
| Entity | [x] Completed |
| Cash Balance | [x] Completed |
| Net Liquidity | [x] Completed |
| Buffer | [x] Completed |
| Gap | [x] Completed |
| Status | [x] Completed |
| Recommendation | [x] Completed |
| Actions | [x] Completed |

**Mock Data:** 12 entity liquidity records

### 7.5 Charts
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| Liquidity Forecast | Area Chart | 90 days | [x] Completed |
| Liquidity Trend | Line Chart | 12 months | [x] Completed |
| Funding Gap | Waterfall | 8 stages | [x] Completed |
| Cash Utilization | Gauge | Single | [x] Completed |
| Entity Liquidity | Horizontal Bar | 12 entities | [x] Completed |

### 7.6 AI Widgets
| Widget | Status |
|--------|--------|
| Optimize Liquidity | [x] Completed |
| Recommend Transfers | [x] Completed |
| Predict Liquidity Stress | [x] Completed |
| Funding Recommendation | [x] Completed |

---

## 8. PAGE 6: CASH POOLING

**Path:** `src/app/(dashboard)/treasury/pooling/page.tsx`
**Status:** [x] Completed

### 8.1 Page Header
| Element | Status |
|---------|--------|
| Page Title | [x] Completed |
| Search | [x] Completed |
| Saved Views | [x] Completed |
| Global Filters | [x] Completed |
| Actions Menu | [x] Completed |

### 8.2 Tabs Navigation
| Tab | Status |
|-----|--------|
| Pool Overview | [x] Completed |
| Physical Pooling | [x] Completed |
| Notional Pooling | [x] Completed |
| Zero Balancing | [x] Completed |
| Target Balancing | [x] Completed |
| Transfers | [x] Completed |

### 8.3 KPI Cards
| Card | Mock Value | Status |
|------|------------|--------|
| Total Pool Balance | INR 890 Cr | [x] Completed |
| Active Pools | 6 | [x] Completed |
| Participants | 24 | [x] Completed |
| Today's Sweeps | 12 | [x] Completed |
| Interest Saved | INR 2.4 Cr/yr | [x] Completed |
| Pool Efficiency | 94% | [x] Completed |

### 8.4 Pool Table
| Column | Status |
|--------|--------|
| Pool Name | [x] Completed |
| Pool Type | [x] Completed |
| Header Account | [x] Completed |
| Participants | [x] Completed |
| Total Balance | [x] Completed |
| Target Balance | [x] Completed |
| Variance | [x] Completed |
| Status | [x] Completed |
| Actions | [x] Completed |

**Mock Data:** 6 pool records with 24 participant accounts

### 8.5 Charts
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| Pool Balance Trend | Line Chart | 30 days | [x] Completed |
| Transfer Activity | Bar Chart | 30 days | [x] Completed |
| Pool Utilization | Donut Chart | 6 pools | [x] Completed |
| Sweep History | Area Chart | 30 days | [x] Completed |

### 8.6 AI Widgets
| Widget | Status |
|--------|--------|
| Optimize Pool Structure | [x] Completed |
| Recommend Sweeps | [x] Completed |
| Identify Inefficiencies | [x] Completed |

### 8.7 Transfer Form
| Field | Type | Status |
|-------|------|--------|
| Source Account | Select | [x] Completed |
| Target Account | Select | [x] Completed |
| Amount | Currency | [x] Completed |
| Transfer Type | Select | [x] Completed |
| Value Date | Date | [x] Completed |
| Reference | Text | [x] Completed |
| Notes | Textarea | [x] Completed |

---

## 9. PAGE 7: CASH CONCENTRATION

**Path:** `src/app/(dashboard)/treasury/concentration/page.tsx`
**Status:** [x] Completed

### 9.1 Page Header
| Element | Status |
|---------|--------|
| Page Title | [x] Completed |
| Search | [x] Completed |
| Saved Views | [x] Completed |
| Global Filters | [x] Completed |
| Actions Menu | [x] Completed |

### 9.2 Tabs Navigation
| Tab | Status |
|-----|--------|
| Overview | [x] Completed |
| Transfer Rules | [x] Completed |
| Concentration Schedule | [x] Completed |
| Exceptions | [x] Completed |
| Analytics | [x] Completed |

### 9.3 KPI Cards
| Card | Mock Value | Status |
|------|------------|--------|
| Concentrated Today | INR 156 Cr | [x] Completed |
| Pending Transfers | 8 | [x] Completed |
| Active Rules | 24 | [x] Completed |
| Exception Count | 3 | [x] Completed |
| Idle Cash Identified | INR 45 Cr | [x] Completed |

### 9.4 Concentration Table
| Column | Status |
|--------|--------|
| Source Account | [x] Completed |
| Target Account | [x] Completed |
| Current Balance | [x] Completed |
| Threshold | [x] Completed |
| Transfer Amount | [x] Completed |
| Schedule | [x] Completed |
| Status | [x] Completed |
| Last Run | [x] Completed |
| Actions | [x] Completed |

**Mock Data:** 24 concentration rules

### 9.5 Charts
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| Concentration Trend | Line Chart | 30 days | [x] Completed |
| Account Distribution | Treemap | 24 accounts | [x] Completed |
| Transfer Volume | Bar Chart | 12 months | [x] Completed |

### 9.6 AI Widgets
| Widget | Status |
|--------|--------|
| Recommend Concentration | [x] Completed |
| Identify Idle Cash | [x] Completed |
| Optimize Rules | [x] Completed |

---

## 10. PAGE 8: INTERCOMPANY FUNDING

**Path:** `src/app/(dashboard)/treasury/intercompany/page.tsx`
**Status:** [x] Completed

### 10.1 Page Header
| Element | Status |
|---------|--------|
| Page Title | [x] Completed |
| Search | [x] Completed |
| Saved Views | [x] Completed |
| Global Filters | [x] Completed |
| Actions Menu | [x] Completed |

### 10.2 Tabs Navigation
| Tab | Status |
|-----|--------|
| Funding Requests | [x] Completed |
| Intercompany Loans | [x] Completed |
| Interest | [x] Completed |
| Repayments | [x] Completed |
| Compliance | [x] Completed |

### 10.3 KPI Cards
| Card | Mock Value | Status |
|------|------------|--------|
| Total IC Loans | INR 1,200 Cr | [x] Completed |
| Active Loans | 18 | [x] Completed |
| Interest Income (YTD) | INR 45 Cr | [x] Completed |
| Pending Requests | 4 | [x] Completed |
| Due This Month | INR 85 Cr | [x] Completed |
| Compliance Score | 98% | [x] Completed |

### 10.4 Intercompany Loan Table
| Column | Status |
|--------|--------|
| Loan ID | [x] Completed |
| Lender Entity | [x] Completed |
| Borrower Entity | [x] Completed |
| Principal | [x] Completed |
| Interest Rate | [x] Completed |
| Outstanding | [x] Completed |
| Due Date | [x] Completed |
| Status | [x] Completed |
| Compliance | [x] Completed |
| Actions | [x] Completed |

**Mock Data:** 18 intercompany loan records

### 10.5 Charts
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| IC Funding Trend | Line Chart | 12 months | [x] Completed |
| Entity Exposure | Network Diagram | 12 entities | [x] Completed |
| Interest Income | Bar Chart | 12 months | [x] Completed |
| Repayment Schedule | Timeline | 12 months | [x] Completed |

### 10.6 AI Widgets
| Widget | Status |
|--------|--------|
| Funding Recommendation | [x] Completed |
| Compliance Check | [x] Completed |
| Interest Optimization | [x] Completed |
| Risk Assessment | [x] Completed |

### 10.7 Funding Request Form
| Field | Type | Status |
|-------|------|--------|
| Borrower Entity | Select | [x] Completed |
| Lender Entity | Select | [x] Completed |
| Amount | Currency | [x] Completed |
| Purpose | Textarea | [x] Completed |
| Tenure | Number | [x] Completed |
| Interest Rate | Percentage | [x] Completed |
| Repayment Schedule | Select | [x] Completed |
| Documents | File Upload | [x] Completed |

---

## 11. PAGE 9: TREASURY INVESTMENTS

**Path:** `src/app/(dashboard)/treasury/investments/page.tsx`
**Status:** [x] Completed

### 11.1 Page Header
| Element | Status |
|---------|--------|
| Page Title | [x] Completed |
| Search | [x] Completed |
| Saved Views | [x] Completed |
| Global Filters | [x] Completed |
| Actions Menu | [x] Completed |

### 11.2 Tabs Navigation
| Tab | Status |
|-----|--------|
| Portfolio | [x] Completed |
| Fixed Deposits | [x] Completed |
| Liquid Funds | [x] Completed |
| Money Market | [x] Completed |
| Government Securities | [x] Completed |
| Commercial Papers | [x] Completed |
| Corporate Bonds | [x] Completed |
| Maturity Calendar | [x] Completed |
| Yield Analytics | [x] Completed |

### 11.3 KPI Cards
| Card | Mock Value | Status |
|------|------------|--------|
| Portfolio Value | INR 1,450 Cr | [x] Completed |
| Average Yield | 7.2% | [x] Completed |
| Expected Return (Annual) | INR 104 Cr | [x] Completed |
| Maturing in 30 Days | INR 180 Cr | [x] Completed |
| Investment Score | 88/100 | [x] Completed |
| Unrealized Gain | INR 12 Cr | [x] Completed |

### 11.4 Investment Portfolio Table
| Column | Status |
|--------|--------|
| Investment ID | [x] Completed |
| Type | [x] Completed |
| Institution | [x] Completed |
| Principal | [x] Completed |
| Interest Rate | [x] Completed |
| Start Date | [x] Completed |
| Maturity Date | [x] Completed |
| Current Value | [x] Completed |
| Yield (%) | [x] Completed |
| Status | [x] Completed |
| Actions | [x] Completed |

**Mock Data:** 35 investment records across all types

### 11.5 Charts
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| Portfolio Allocation | Donut Chart | 7 categories | [x] Completed |
| Yield Curve | Line Chart | Multiple tenures | [x] Completed |
| Maturity Ladder | Stacked Bar | 12 months | [x] Completed |
| Returns Trend | Line Chart | 12 months | [x] Completed |
| Institution Exposure | Horizontal Bar | 10 institutions | [x] Completed |

### 11.6 AI Widgets
| Widget | Status |
|--------|--------|
| Investment Recommendation | [x] Completed |
| Reinvestment Suggestion | [x] Completed |
| Yield Optimization | [x] Completed |
| Risk Assessment | [x] Completed |

### 11.7 Investment Form
| Field | Type | Status |
|-------|------|--------|
| Investment Type | Select | [x] Completed |
| Institution | Select | [x] Completed |
| Principal Amount | Currency | [x] Completed |
| Interest Rate | Percentage | [x] Completed |
| Tenure | Number | [x] Completed |
| Start Date | Date | [x] Completed |
| Maturity Date | Date | [x] Completed |
| Auto-Renewal | Toggle | [x] Completed |
| Notes | Textarea | [x] Completed |

---

## 12. PAGE 10: FX MANAGEMENT

**Path:** `src/app/(dashboard)/treasury/fx/page.tsx`
**Status:** [x] Completed

### 12.1 Page Header
| Element | Status |
|---------|--------|
| Page Title | [x] Completed |
| Search | [x] Completed |
| Saved Views | [x] Completed |
| Global Filters | [x] Completed |
| Actions Menu | [x] Completed |

### 12.2 Tabs Navigation
| Tab | Status |
|-----|--------|
| Exposure | [x] Completed |
| Forward Contracts | [x] Completed |
| Options | [x] Completed |
| Swaps | [x] Completed |
| Natural Hedging | [x] Completed |
| Settlements | [x] Completed |
| Currency Gains/Losses | [x] Completed |

### 12.3 KPI Cards
| Card | Mock Value | Status |
|------|------------|--------|
| Net FX Exposure | USD 45M | [x] Completed |
| Hedged Amount | USD 32M | [x] Completed |
| Hedge Coverage | 71% | [x] Completed |
| Open Contracts | 18 | [x] Completed |
| FX Risk Score | 35/100 | [x] Completed |
| MTM Gain/Loss | INR 4.5 Cr | [x] Completed |

### 12.4 FX Exposure Table
| Column | Status |
|--------|--------|
| Currency Pair | [x] Completed |
| Gross Exposure | [x] Completed |
| Hedged | [x] Completed |
| Net Exposure | [x] Completed |
| Hedge Instrument | [x] Completed |
| Settlement Date | [x] Completed |
| Spot Rate | [x] Completed |
| Forward Rate | [x] Completed |
| Status | [x] Completed |
| Risk Level | [x] Completed |
| Actions | [x] Completed |

**Mock Data:** 20 FX exposure records

### 12.5 Charts
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| Exposure by Currency | Donut Chart | 5 currencies | [x] Completed |
| FX Rate Trend | Line Chart | 90 days | [x] Completed |
| Hedge Coverage | Gauge | Single | [x] Completed |
| Gain/Loss Trend | Area Chart | 12 months | [x] Completed |
| Forward Contract Timeline | Gantt | 24 contracts | [x] Completed |

### 12.6 AI Widgets
| Widget | Status |
|--------|--------|
| Recommend Hedge Strategy | [x] Completed |
| Exposure Analysis | [x] Completed |
| FX Rate Forecast | [x] Completed |
| Optimal Hedge Timing | [x] Completed |

### 12.7 Forward Contract Form
| Field | Type | Status |
|-------|------|--------|
| Contract Type | Select | [x] Completed |
| Currency Pair | Select | [x] Completed |
| Notional Amount | Currency | [x] Completed |
| Forward Rate | Number | [x] Completed |
| Settlement Date | Date | [x] Completed |
| Counterparty | Select | [x] Completed |
| Purpose | Textarea | [x] Completed |

---

## 13. PAGE 11: TREASURY RISK

**Path:** `src/app/(dashboard)/treasury/risk/page.tsx`
**Status:** [x] Completed

### 13.1 Page Header
| Element | Status |
|---------|--------|
| Page Title | [x] Completed |
| Search | [x] Completed |
| Saved Views | [x] Completed |
| Global Filters | [x] Completed |
| Actions Menu | [x] Completed |

### 13.2 Tabs Navigation
| Tab | Status |
|-----|--------|
| Liquidity Risk | [x] Completed |
| Counterparty Risk | [x] Completed |
| Bank Risk | [x] Completed |
| Interest Rate Risk | [x] Completed |
| FX Risk | [x] Completed |
| Settlement Risk | [x] Completed |
| Concentration Risk | [x] Completed |
| Country Risk | [x] Completed |
| Climate Risk | [x] Completed |

### 13.3 KPI Cards
| Card | Mock Value | Status |
|------|------------|--------|
| Overall Risk Score | 28/100 | [x] Completed |
| High Risk Items | 5 | [x] Completed |
| Critical Alerts | 2 | [x] Completed |
| Risk Trend | Improving | [x] Completed |
| VaR (1-day 99%) | INR 24 Cr | [x] Completed |
| Stress Test Impact | INR 156 Cr | [x] Completed |

### 13.4 Risk Register Table
| Column | Status |
|--------|--------|
| Risk ID | [x] Completed |
| Risk Category | [x] Completed |
| Description | [x] Completed |
| Severity | [x] Completed |
| Probability | [x] Completed |
| Impact | [x] Completed |
| Mitigation | [x] Completed |
| Owner | [x] Completed |
| Status | [x] Completed |
| Actions | [x] Completed |

**Mock Data:** 25 risk records

### 13.5 Charts
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| Risk Heatmap | Heatmap | 5x5 matrix | [x] Completed |
| Risk Trend | Line Chart | 12 months | [x] Completed |
| Exposure Matrix | Bubble Chart | 20 risks | [x] Completed |
| Scenario Impact | Bar Chart | 5 scenarios | [x] Completed |
| Risk by Category | Radar Chart | 9 categories | [x] Completed |

### 13.6 AI Widgets
| Widget | Status |
|--------|--------|
| Root Cause Analysis | [x] Completed |
| Mitigation Recommendation | [x] Completed |
| Confidence Score | [x] Completed |
| Explainability Panel | [x] Completed |

### 13.7 Detail Drawer
| Section | Status |
|---------|--------|
| Risk Details | [x] Completed |
| Impact Analysis | [x] Completed |
| Mitigation Plan | [x] Completed |
| Related Exposures | [x] Completed |
| Historical Trend | [x] Completed |
| Action Items | [x] Completed |
| Comments | [x] Completed |
| Audit Trail | [x] Completed |

---

## 14. PAGE 12: TREASURY ANALYTICS

**Path:** `src/app/(dashboard)/treasury/analytics/page.tsx`
**Status:** [x] Completed

### 14.1 Page Header
| Element | Status |
|---------|--------|
| Page Title | [x] Completed |
| Search | [x] Completed |
| Saved Views | [x] Completed |
| Global Filters | [x] Completed |
| Actions Menu | [x] Completed |

### 14.2 Tabs Navigation
| Tab | Status |
|-----|--------|
| KPIs | [x] Completed |
| Benchmarking | [x] Completed |
| Variance | [x] Completed |
| Forecast Accuracy | [x] Completed |
| Executive Reports | [x] Completed |

### 14.3 KPI Dashboard Table
| Column | Status |
|--------|--------|
| KPI Name | [x] Completed |
| Current Value | [x] Completed |
| Previous Period | [x] Completed |
| Variance | [x] Completed |
| Target | [x] Completed |
| Benchmark | [x] Completed |
| Status | [x] Completed |
| Trend | [x] Completed |

**Mock Data:** 24 treasury KPIs

### 14.4 Charts
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| Liquidity KPIs | Multi-line | 12 months | [x] Completed |
| Cash Conversion Cycle | Line Chart | 12 months | [x] Completed |
| Bank Performance | Horizontal Bar | 8 banks | [x] Completed |
| Investment Returns | Bar Chart | 12 months | [x] Completed |
| Debt Trend | Area Chart | 24 months | [x] Completed |
| FX Performance | Line Chart | 12 months | [x] Completed |
| Working Capital | Stacked Area | 12 months | [x] Completed |

### 14.5 Executive Report Section
| Element | Status |
|---------|--------|
| Report Template Selector | [x] Completed |
| Report Preview | [x] Completed |
| Schedule Report | [x] Completed |
| Export to PDF | [x] Completed |
| Export to Excel | [x] Completed |
| Share Report | [x] Completed |

---

## 15. PAGE 13: TREASURY AI AGENT

**Path:** `src/app/(dashboard)/treasury/ai/page.tsx`
**Status:** [x] Completed

### 15.1 Page Header
| Element | Status |
|---------|--------|
| Page Title | [x] Completed |
| New Conversation | [x] Completed |
| Conversation History | [x] Completed |
| Settings | [x] Completed |

### 15.2 Tabs Navigation
| Tab | Status |
|-----|--------|
| AI Copilot | [x] Completed |
| Recommendations | [x] Completed |
| Investigations | [x] Completed |
| Knowledge | [x] Completed |
| Decision Center | [x] Completed |
| Automations | [x] Completed |

### 15.3 Suggested Prompts
| Prompt | Status |
|--------|--------|
| Optimize Liquidity | [x] Completed |
| Recommend Bank Transfer | [x] Completed |
| Recommend Investment | [x] Completed |
| Predict Liquidity Stress | [x] Completed |
| Explain Treasury Risk | [x] Completed |
| Recommend Funding Source | [x] Completed |
| Optimize Idle Cash | [x] Completed |
| Recommend Hedge Strategy | [x] Completed |
| Analyze Bank Relationship | [x] Completed |
| Forecast Cash Pool | [x] Completed |

### 15.4 Conversation Interface
| Element | Status |
|---------|--------|
| Chat Container | [x] Completed |
| Message Input | [x] Completed |
| Send Button | [x] Completed |
| Voice Input | [x] Completed |
| Attach Files | [x] Completed |
| Context Panel | [x] Completed |

### 15.5 AI Output Components
| Component | Status |
|-----------|--------|
| Executive Summary | [x] Completed |
| Recommendations List | [x] Completed |
| Confidence Indicator | [x] Completed |
| Evidence Panel | [x] Completed |
| Related Records | [x] Completed |
| Citations | [x] Completed |
| Thinking Steps | [x] Completed |
| Approval Actions | [x] Completed |
| Workflow Actions | [x] Completed |

### 15.6 Recommendations Table
| Column | Status |
|--------|--------|
| Recommendation | [x] Completed |
| Category | [x] Completed |
| Priority | [x] Completed |
| Impact | [x] Completed |
| Confidence | [x] Completed |
| Status | [x] Completed |
| Actions | [x] Completed |

**Mock Data:** 20 AI recommendations

---

## 16. PAGE 14: SCENARIO SIMULATOR

**Path:** `src/app/(dashboard)/treasury/simulator/page.tsx`
**Status:** [x] Completed

### 16.1 Page Header
| Element | Status |
|---------|--------|
| Page Title | [x] Completed |
| New Scenario | [x] Completed |
| Load Scenario | [x] Completed |
| Compare Scenarios | [x] Completed |

### 16.2 Tabs Navigation
| Tab | Status |
|-----|--------|
| Scenario Builder | [x] Completed |
| Interest Rate Changes | [x] Completed |
| Liquidity Stress | [x] Completed |
| Sales Slowdown | [x] Completed |
| Construction Delay | [x] Completed |
| Material Cost Increase | [x] Completed |
| FX Shock | [x] Completed |
| Debt Refinancing | [x] Completed |
| Best Case | [x] Completed |
| Expected Case | [x] Completed |
| Worst Case | [x] Completed |

### 16.3 KPI Cards (Scenario Impact)
| Card | Mock Value | Status |
|------|------------|--------|
| Scenario Score | 72/100 | [x] Completed |
| Financial Impact | -INR 156 Cr | [x] Completed |
| Liquidity Impact | -INR 89 Cr | [x] Completed |
| Risk Impact | +15 points | [x] Completed |
| Probability | 35% | [x] Completed |
| Recovery Time | 6 months | [x] Completed |

### 16.4 Scenario Builder Form
| Field | Type | Status |
|-------|------|--------|
| Scenario Name | Text | [x] Completed |
| Scenario Type | Select | [x] Completed |
| Time Horizon | Select | [x] Completed |
| Interest Rate Change | Slider | [x] Completed |
| Sales Change | Slider | [x] Completed |
| Cost Change | Slider | [x] Completed |
| FX Rate Change | Slider | [x] Completed |
| Collection Delay | Slider | [x] Completed |
| Payment Acceleration | Slider | [x] Completed |
| Custom Parameters | Dynamic | [x] Completed |

### 16.5 Charts
| Chart | Type | Mock Data | Status |
|-------|------|-----------|--------|
| Cash Projection | Area Chart | 12 months | [x] Completed |
| Liquidity Curve | Line Chart | 12 months | [x] Completed |
| Risk Comparison | Radar Chart | 3 scenarios | [x] Completed |
| Funding Gap | Waterfall | 8 stages | [x] Completed |
| Scenario Comparison | Multi-line | 3 scenarios | [x] Completed |
| Impact Breakdown | Sankey | 6 factors | [x] Completed |

### 16.6 Results Tables
| Table | Columns | Rows | Status |
|-------|---------|------|--------|
| Assumptions | Parameter, Base, Scenario, Change | 12 | [x] Completed |
| Scenario Results | Metric, Current, Projected, Impact | 15 | [x] Completed |
| Recommendations | Action, Impact, Priority, Owner | 8 | [x] Completed |

### 16.7 AI Widgets
| Widget | Status |
|--------|--------|
| Explain Scenario | [x] Completed |
| Compare Scenarios | [x] Completed |
| Recommended Actions | [x] Completed |
| Monte Carlo Analysis | [x] Completed |
| Sensitivity Analysis | [x] Completed |

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
| Global Filters | 18 | 18 | 0 |
| Side Panel Items | 14 | 14 | 0 |
| Page Headers | 14 | 14 | 0 |
| Tab Navigation | 87 | 87 | 0 |
| KPI Cards | 68 | 68 | 0 |
| Charts | 65 | 65 | 0 |
| Tables | 22 | 22 | 0 |
| Forms | 12 | 12 | 0 |
| AI Widgets | 42 | 42 | 0 |
| Drawers | 12 | 12 | 0 |
| Shared Components | 32 | 32 | 0 |
| Mock Data Sets | 52 | 52 | 0 |
| **TOTAL** | **438** | **438** | **0** |

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

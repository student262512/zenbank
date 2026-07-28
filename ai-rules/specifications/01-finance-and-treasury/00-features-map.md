Based on your navigation structure, I would **not** create a separate "Financial Ratios" or "Loan Glossary" module. Instead, surface every metric where a CFO, Treasurer, Finance Controller, or Project Finance Head naturally expects to see it.

Your navigation is already very well designed. The only missing piece is the **cross-module intelligence layer**, where the same metric appears in multiple places but from different perspectives.

For example:

* Executive Dashboard → Enterprise KPI
* Loan Register → Loan-specific value
* Treasury Dashboard → Liquidity impact
* Project Finance → Project impact
* AI Command Center → Alerts & recommendations

This is how Bloomberg, Oracle Treasury, Kyriba, SAP Treasury, and BlackRock Aladdin surface financial metrics.

---

# 1. Executive Intelligence

## Executive Dashboard

This should contain enterprise-level KPIs only.

Include:

### Debt KPIs

* Total Debt
* Net Debt
* Debt-to-Equity
* Average Interest Rate
* Debt Maturity Profile
* Upcoming EMIs
* Loan Utilization

### Liquidity KPIs

* Available Cash
* Liquidity Ratio
* DSRA Balance
* MMR Balance
* Available Credit Lines

### Project KPIs

* Enterprise IRR
* Portfolio IRR
* NDCF
* NOI
* EBITDA

### Covenant KPIs

* Active Covenants
* Breached Covenants
* Upcoming Covenant Reviews
* DSCR
* ICR
* LTV
* Net Worth Compliance

### Interest Rate KPIs

* Average RLLR
* Average MCLR
* Floating vs Fixed Loans

---

## AI Command Center

This is the enterprise brain.

AI should continuously analyze:

* DSCR deterioration
* ICR deterioration
* Debt-to-Equity breach
* EBITDA decline
* NOI decline
* NDCF decline
* Covenant breach prediction
* Moratorium ending soon
* Loan refinancing recommendation
* Interest rate change impact
* MCLR increase impact
* Repo rate increase impact
* LRD portfolio health
* DSRA below threshold
* MMR underfunded

AI Recommendations:

> Refinance Loan A

> Transfer ₹40 Cr to DSRA

> Increase reserve

> Delay CAPEX

> Refinance before MCLR reset

> Invest idle cash

---

# 2. Treasury Management

Treasury Dashboard

Add

## Interest Benchmark Summary

* Repo Rate
* RLLR
* MCLR
* Average Loan Rate
* Spread

---

Liquidity Management

Display

* DSRA balances
* Reserve requirement
* Available liquidity after DSRA
* Moratorium loans
* Upcoming moratorium expiry

---

Treasury Risk

Display

* Interest Rate Risk
* Repo Rate sensitivity
* MCLR sensitivity
* Floating rate exposure
* Covenant Risk
* LTV Risk
* DSCR Risk

---

Treasury Analytics

Include

Interest Rate Analytics

Loan Benchmark Distribution

Fixed vs Floating

Average Spread

Historical RLLR

Historical MCLR

---

Treasury Simulator

This page becomes extremely powerful.

User changes

Repo Rate

↓

AI recalculates

Interest Expense

DSCR

ICR

EBITDA Impact

Cash Flow

Covenants

Project IRR

---

# 3. Project Finance

Funding Sources

Show

Construction Loans

LRD Loans

Bridge Loans

NBFC Loans

Bank Loans

Private Equity

Mezzanine

---

Drawdown Management

Display

Moratorium Period

Remaining Moratorium

Interest During Moratorium

Capitalized Interest

---

Capital Deployment

Show

IRR

NDCF

NOI

Project EBITDA

---

IRR Analysis

Obviously

IRR

Project IRR

Portfolio IRR

Equity IRR

Sensitivity

---

Project Analytics

Show

NOI

NDCF

IRR

Debt Utilization

Project Loan

DSCR

Interest Burden

---

# 4. Loan & Debt Management

This module will contain most of these terms.

## Debt Portfolio

Show

Loan Type

LRD

Construction Finance

Term Loan

OD

Working Capital

Bridge Loan

---

Loan Register

Every loan should include

Loan Amount

Outstanding

Interest Rate

Benchmark

RLLR

MCLR

Spread

Moratorium

Repayment

DSRA

MMR

Covenants

LTV

DSCR

ICR

EBITDA Requirement

Net Worth Requirement

---

Interest Management

Display

RLLR

MCLR

Repo Rate

Spread

Reset Date

Interest Simulation

Interest History

---

Principal Schedule

Display

Moratorium

Principal Holiday

EMI Start

Remaining Principal

---

Refinancing

AI should compare

Current Loan

vs

New Loan

using

Interest Rate

RLLR

MCLR

Spread

DSCR

IRR

---

Debt Analytics

Best page for

Debt-to-Equity

Average Interest

DSCR

ICR

Debt Maturity

Refinancing

Loan Mix

Floating %

Fixed %

Interest Benchmark

---

# 5. Loan Covenants

This module should own almost all covenant-related metrics.

---

Covenant Dashboard

Display

Financial Covenants

DSCR

ICR

Debt-to-Equity

Net Worth

EBITDA

Operational Covenants

Occupancy

Insurance

Taxes

Project Covenants

Quarterly Reports

Audit Reports

Valuation Reports

---

Compliance Tracking

Track

Current Value

Threshold

Pass/Fail

Remaining Buffer

---

Breach Management

When

DSCR drops

↓

Create AI case

↓

Suggest

Increase cash

Refinancing

Reduce debt

---

Early Warning

Predict

Future DSCR breach

Future ICR breach

Future EBITDA breach

Future Debt-to-Equity breach

Future NOI decline

Future NDCF decline

---

AI Recommendations

Recommend

Refinancing

Debt restructuring

Increase reserve

Reduce borrowings

Improve collections

Delay spending

---

# 6. Escrow Management

Escrow Accounts

Display

LRD Escrow

Construction Escrow

Collections

Available Balance

Blocked Balance

DSRA Link

---

Escrow Compliance

Track

Required Escrow

Required DSRA

Actual

Variance

---

# 7. Cash Flow Intelligence

Enterprise Cash Position

Show

DSRA

MMR

Debt Service

NDCF

NOI

Cash Available

---

Cash Forecasting

Forecast

Interest

Principal

Moratorium ending

DSRA replenishment

MMR contribution

---

Cash Risk Intelligence

Predict

Liquidity shortage

DSRA breach

Debt default

Interest spike

---

Cash Analytics

Cash

vs

Debt

vs

NOI

vs

NDCF

vs

DSCR

---

# 8. Working Capital

Receivables

Predict

NDCF

Collection Impact

---

Cash Conversion

Impact on

DSCR

Liquidity

Interest Coverage

---

# 9. FP&A

Scenario Planning

Ideal place for

Repo Rate +1%

↓

DSCR

IRR

EBITDA

Interest

Cash

Loan

---

Forecasting

Forecast

EBITDA

NOI

NDCF

Debt

Interest

---

Executive Reports

Include

DSCR

ICR

Debt-to-Equity

IRR

NOI

NDCF

---

# 10. Investment Management

Yield Optimization

AI decides

Invest surplus

or

Repay debt

using

Interest Rate

IRR

Cash Need

DSRA

---

# 11. FX & Treasury Risk

Interest Rate Risk

Perfect place for

Repo

RLLR

MCLR

Spread

Floating Exposure

Reset Schedule

---

# 12. AI CFO Workspace

Financial Simulator

Simulate

Repo changes

Interest changes

Moratorium

Refinancing

Loan restructuring

DSRA changes

MMR changes

IRR

NOI

NDCF

EBITDA

DSCR

ICR

Debt-to-Equity

---

Decision Center

Every recommendation should reference the affected KPIs, such as:

* Refinance Loan A → Saves interest, improves DSCR and ICR.
* Increase DSRA funding → Improves covenant compliance and lender confidence.
* Delay discretionary CAPEX → Preserves liquidity and prevents projected covenant breaches.
* Shift to fixed-rate debt → Reduces exposure to future RLLR/MCLR increases.
* Invest idle cash → Maximizes yield while maintaining required liquidity buffers.

## Cross-module ownership matrix

| Term / Metric  | Primary Page                        | Secondary Pages                                           |
| -------------- | ----------------------------------- | --------------------------------------------------------- |
| Covenant       | Covenant Dashboard                  | Executive Dashboard, AI Command Center, Debt Portfolio    |
| Moratorium     | Loan Register, Principal Schedule   | Cash Forecasting, Treasury Dashboard                      |
| LRD            | Funding Sources, Debt Portfolio     | Escrow Accounts, Treasury Dashboard                       |
| RLLR           | Interest Management                 | Treasury Risk, Interest Rate Risk, AI Simulator           |
| MCLR           | Interest Management                 | Treasury Risk, Interest Rate Risk, AI Simulator           |
| IRR            | IRR Analysis                        | Executive Dashboard, Project Analytics, Scenario Planning |
| NDCF           | Project Analytics                   | Executive Dashboard, Enterprise Cash Position             |
| NOI            | Project Analytics                   | Executive Dashboard, Revenue Intelligence                 |
| DSCR           | Covenant Dashboard                  | Executive Dashboard, Debt Analytics, Scenario Planning    |
| ICR            | Covenant Dashboard                  | Executive Dashboard, Debt Analytics                       |
| Debt-to-Equity | Debt Analytics                      | Executive Dashboard, Covenant Dashboard                   |
| EBITDA         | FP&A Forecasting                    | Executive Dashboard, Covenant Dashboard                   |
| Amortization   | Interest Management / Loan Register | Financial Close, Executive Reports                        |
| DSRA           | Treasury Liquidity, Escrow Accounts | Enterprise Cash Position, AI Command Center               |
| MMR            | Treasury Liquidity                  | Enterprise Cash Position, Project Analytics               |

This mapping complements your existing navigation and aligns with the Finance & Treasury capabilities you've already defined for ZenBank, ensuring that each concept appears where users naturally expect it while allowing enterprise KPIs to roll up into the Executive Dashboard and AI Command Center.

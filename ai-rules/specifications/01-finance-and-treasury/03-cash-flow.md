Perfect. For Claude Code, **each prompt should generate one complete Side Panel folder**, not individual screens. This keeps the context focused and results in consistent enterprise UI generation.

Your uploaded Finance & Treasury specification already defines the business capabilities for Cash Flow Intelligence. This prompt converts them into a concise AI-first UI specification while preserving all required features. 

---

# Finance & Treasury Module — Part 2 — Cash Flow Intelligence

```text
You are an expert Enterprise SaaS Product Designer, UX Architect and Staff Frontend Engineer.

Design the complete UI hierarchy for the Cash Flow Intelligence module of an Enterprise AI-powered Finance & Treasury platform for large Real Estate developers.

Generate front end code with mock data. Do NOT generate backend code.

====================================================
Hierarchy
====================================================

Finance & Treasury
→ Cash Flow Intelligence
    → Pages (include Global Filters)
        → Page
            → Tabs
                → Sections
                    → Cards
                    → Charts
                    → Tables
                    → Forms
                    → Drawers
                    → Right Sidebar
                    → AI Widgets
                    → Modals
                    → Actions

====================================================
Global Filters (Available on Every Page)
====================================================

Company

Business Unit

SPV

Project

Region

Bank

Account

Currency

Cost Center

Customer

Vendor

Loan

Scenario

Forecast Version

Forecast Horizon

Date Range

Status

Tags

====================================================
Side Panel
====================================================

Cash Flow Dashboard

Enterprise Cash Position

Cash Forecasting

Cash Inflow Intelligence

Cash Outflow Intelligence

Collections Forecast

Vendor Payment Forecast

Loan Repayment Forecast

Project Completion Forecast

Cash Risk Intelligence

Cash Flow Analytics

Cash Flow AI Agent

====================================================
Page 1

Cash Flow Dashboard
====================================================

Purpose

Enterprise cash command center.

Tabs

Overview

Forecast

Liquidity

Risks

Approvals

Insights

Cards

Available Cash

Net Liquidity

Opening Balance

Closing Balance

Cash Inflow

Cash Outflow

Forecast Accuracy

Cash Burn

Working Capital

Escrow Cash

Restricted Cash

Idle Cash

Funding Gap

Charts

Cash Position Trend

Daily Cash Forecast

Weekly Forecast

Monthly Forecast

Inflow vs Outflow

Liquidity Trend

Forecast vs Actual

Cash Waterfall

Forecast Accuracy

Risk Heatmap

Tables

Critical Cash Events

Upcoming Collections

Upcoming Payments

Cash Alerts

Pending Approvals

Funding Requirements

Right Sidebar

AI Summary

Today's Risks

Recommended Actions

Top Forecast Changes

====================================================
Page 2

Enterprise Cash Position
====================================================

Tabs

Global Position

Project Position

SPV Position

Region Position

Bank Position

Currency Position

Liquidity View

Tables

Entity

Opening Balance

Credits

Debits

Closing Balance

Available Cash

Restricted Cash

Escrow Cash

Net Liquidity

Variance

Charts

Cash Distribution

Bank Exposure

Currency Exposure

Liquidity Heatmap

Actions

Transfer Funds

Export

Compare

Drill Down

====================================================
Page 3

Cash Forecasting
====================================================

Tabs

Forecast Workspace

Daily

Weekly

Monthly

Quarterly

Yearly

Scenario Planning

Forecast Accuracy

Forecast Versions

Forms

Forecast Parameters

Forecast Horizon

Forecast Method

Confidence Threshold

Scenario

Tables

Forecast Line Items

Forecast Assumptions

Forecast Versions

Variance Analysis

Charts

Forecast vs Actual

Rolling Forecast

Cash Curve

Scenario Comparison

AI Widgets

Forecast Summary

Forecast Confidence

Key Drivers

Recommended Adjustments

====================================================
Page 4

Cash Inflow Intelligence
====================================================

Tabs

Overview

Customer Collections

Booking Advances

Loan Disbursements

Rental Income

Interest Income

Refunds

Other Receipts

Tables

Source

Expected Date

Amount

Probability

Status

Risk

Owner

Charts

Collection Trend

Receipts by Source

Expected vs Actual

Top Customers

AI Widgets

Collection Prediction

Delay Prediction

High Risk Collections

Recommendations

====================================================
Page 5

Cash Outflow Intelligence
====================================================

Tabs

Overview

Vendor Payments

Construction Bills

Payroll

Loan Repayments

Taxes

Utilities

Construction Expenses

Refunds

Other Payments

Tables

Payee

Due Date

Amount

Priority

Status

Risk

Approval Status

Charts

Payment Calendar

Outflow Trend

Expense Categories

Cash Burn

AI Widgets

Payment Priority

Delay Risk

Funding Recommendation

Cash Optimization

====================================================
Page 6

Collections Forecast
====================================================

Tabs

Customer Aging

Collection Forecast

Overdue

Promise to Pay

Recovery Analysis

Tables

Customer

Outstanding

Due

Predicted Collection Date

Probability

Risk

Collector

Charts

DSO Trend

Collection Funnel

Customer Risk

Recovery Trend

AI Widgets

Collection Score

Recommended Follow-up

Collection Strategy

====================================================
Page 7

Vendor Payment Forecast
====================================================

Tabs

Upcoming Payments

Payment Calendar

Priority Matrix

Cash Impact

Exceptions

Tables

Vendor

Due Date

Invoice

Amount

Priority

Risk

Approval

Charts

Vendor Payment Trend

Payment Calendar

Cash Impact

AI Widgets

Suggested Payment Sequence

Discount Opportunities

Risk Alerts

====================================================
Page 8

Loan Repayment Forecast
====================================================

Tabs

Loan Schedule

Interest

Principal

Upcoming Payments

Debt Outlook

Tables

Loan

Lender

Due Date

Principal

Interest

Total Due

Status

Charts

Debt Maturity

Repayment Timeline

Interest Trend

AI Widgets

Refinancing Suggestions

Repayment Risk

Funding Advice

====================================================
Page 9

Project Completion Forecast
====================================================

Tabs

Milestones

Construction Progress

Cash Requirement

Funding Timeline

Forecast

Tables

Project

Completion %

Expected Completion

Remaining Cost

Cash Needed

Risk

Charts

Completion Curve

Cash Requirement

Project Burn Rate

AI Widgets

Completion Prediction

Funding Recommendation

Delay Risk

====================================================
Page 10

Cash Risk Intelligence
====================================================

Tabs

Liquidity Risk

Negative Cash

Funding Gap

Collection Risk

Payment Risk

Cash Leakage

Fraud Indicators

Alerts

Cards

Risk Score

Liquidity Score

Forecast Confidence

Funding Gap

Negative Balance Risk

Idle Cash

Cash Leakage

Charts

Risk Heatmap

Risk Trend

Exposure Matrix

Tables

Risk

Severity

Probability

Impact

Recommendation

Owner

AI Widgets

Root Cause

Recommended Action

Confidence

Explainability

====================================================
Page 11

Cash Flow Analytics
====================================================

Tabs

KPIs

Variance

Forecast Accuracy

Historical Trends

Benchmarking

Executive Reports

Charts

Forecast Accuracy

Variance

Rolling Trend

Cash Mix

Liquidity Trend

Tables

KPI

Current

Previous

Variance

Target

====================================================
Page 12

Cash Flow AI Agent
====================================================

Tabs

AI Copilot

Recommendations

Investigations

Scenario Simulator

Knowledge

Automations

Conversation

Suggested Prompts

Explain Cash Position

Predict Cash Shortage

Optimize Liquidity

Predict Collection Delays

Prioritize Payments

Recommend Funding

Run Scenario

Explain Forecast

AI Outputs

Executive Summary

Recommendations

Confidence

Evidence

Related Records

Actions

Create Task

Assign

Export

Share

Approve Recommendation

Run Workflow

====================================================
Every Page Must Include
====================================================

Header

Search

Saved Views

Global Filters

Export

Refresh

Share

Favorite

KPIs

Charts

Tables

Column Chooser

Bulk Actions

Row Actions

Forms

Side Drawers

Right Sidebar

Comments

Attachments

Timeline

Audit History

Related Records

AI Insights

AI Recommendations

AI Actions

Responsive enterprise layout

Consistent naming

No backend

No APIs

No database

```

### Design notes for Claude Code

This prompt incorporates your uploaded requirements (cash forecasting, inflow/outflow intelligence, collections, loan repayments, project completion forecasts, and AI-driven cash analysis) while aligning the UI with enterprise treasury practices such as multi-horizon forecasting, cash positioning, liquidity dashboards, forecast-vs-actual analysis, scenario planning, variance analytics, and AI-assisted recommendations. These are common capabilities in leading treasury platforms and provide a strong blueprint for an enterprise-grade cash management workspace.
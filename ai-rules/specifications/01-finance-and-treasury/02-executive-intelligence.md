Excellent. This is exactly the approach I would recommend for Claude Code.

After reviewing both your uploaded Finance & Treasury specification and your existing UI hierarchy, I recommend **not mixing multiple business domains in one prompt**. Each prompt should generate **one complete Side Panel Folder** with all of its pages, tabs, forms, tables, drawers, AI widgets, workflows, and navigation. This keeps Claude focused and greatly reduces hallucinations while producing a consistent enterprise UI. 

The prompt below is **Part 1** of the Finance & Treasury module and covers only the executive intelligence. Later parts will cover Cash Flow Intelligence, Treasury Management, Project Finance, Loan Management, Budgeting, AI CFO, etc.

---

# Finance & Treasury Module — Part 1 (executive intelligence)

```text
You are an expert Enterprise SaaS Product Designer, UX Architect and Staff Frontend Engineer.

Design a production-ready Enterprise Finance & Treasury module for a Real Estate AI Platform.

Generate front end code with mock data. Do NOT generate backend code.

The hierarchy must ALWAYS follow this structure exactly.

Finance & Treasury
→ Side Panel Folder
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
GLOBAL DESIGN SYSTEM
====================================================

Use the same design system across every page.

Desktop-first enterprise SaaS

Responsive

Minimal

Professional

Financial dashboard style

Every page must support

• Search

• Saved Views

• Personal Views

• Public Views

• Filters

• Column Chooser

• Export

• Import

• Refresh

• Bulk Actions

• Notifications

• Activity Timeline

• Comments

• Attachments

• Audit History

• AI Insights

• AI Recommendations

• AI Actions

• Keyboard Shortcuts

• Role Based Access

• Favorite

• Follow

• Share

• Print

• Full Screen

====================================================
SIDE PANEL Accordion Folders
====================================================

Generate complete left navigation.

Executive Intelligence

Cash Flow Intelligence

Treasury Management

Project Finance

Loan & Debt Management

Loan Covenant Monitoring

Escrow Management

Working Capital

Budget Intelligence

Payment Intelligence

Bank Reconciliation

Collections

Revenue Intelligence

FP&A

Investment Management

FX Management

Financial Close

Financial Reporting

Scenario Simulator

AI Agents

Settings/Administration

====================================================
PAGE 1

Executive Dashboard

====================================================

Global Filters

Company

Business Unit

SPV

Project

Region

Cost Center

Department

Currency

Bank

Date Range

Scenario

Version

Status

====================================================

Dashboard Layout

====================================================

Header

Page Title

Business Date

Last Refresh

Search

Saved View

Export

Share

AI Assistant

Refresh

====================================================

Executive KPI Cards

====================================================

Available Cash

Net Liquidity

Cash Burn

Cash Forecast Accuracy

Working Capital

Collections

Vendor Payments Due

Debt Outstanding

Investment Value

Escrow Balance

Bank Exposure

Treasury Health Score

Finance Risk Score

====================================================

Charts

====================================================

Cash Position Trend

Cash Inflow vs Outflow

Liquidity Forecast

Collections Trend

Vendor Payment Trend

Debt Maturity

Investment Allocation

Working Capital Trend

Budget vs Actual

Revenue Trend

Treasury Risk Heatmap

Enterprise Cash Waterfall

====================================================

Executive Summary

====================================================

Top Risks

Top Opportunities

Critical Alerts

Upcoming Deadlines

Pending Approvals

Upcoming Loan Payments

Upcoming Escrow Releases

Upcoming Investments Maturity

Collections at Risk

Budget Variances

====================================================

AI Executive Summary

====================================================

Daily Summary

Today's Risks

Today's Recommendations

Suggested Actions

Priority Score

Explain Why

Confidence

====================================================

Recent Activities

====================================================

Timeline

Recent Transactions

Approvals

Collections

Payments

Forecast Changes

====================================================

Tasks

====================================================

My Tasks

Team Tasks

Pending Reviews

Overdue

Completed

====================================================

Notifications

====================================================

Finance

Treasury

Loans

Collections

Budget

Risk

AI

====================================================

Right Sidebar

====================================================

AI Copilot

Ask Finance

Quick Actions

Recent Searches

Pinned Reports

Favorite Dashboards

====================================================

Page Actions

====================================================

Create Dashboard

Save View

Schedule Report

Export PDF

Export Excel

Subscribe

Share Dashboard

Open AI Copilot

====================================================
PAGE 2

Executive Command Center

====================================================

Global Filters

Same Global Filters

====================================================

Tabs

====================================================

AI Copilot

Finance Agents

Recommendations

Investigations

Decision Center

Knowledge Search

Automations

====================================================

Tab

AI Copilot

====================================================

Conversation Panel

Suggested Prompts

Recent Conversations

Pinned Prompts

Prompt Library

Context Sources

Citations

Thinking Steps

Action History

====================================================

Tab

Finance Agents

====================================================

Cards

Cash Flow Agent

Treasury Agent

Budget Agent

Collections Agent

Payments Agent

Forecast Agent

Investment Agent

Debt Agent

Risk Agent

AI CFO

Each Card

Status

Health

Last Run

Confidence

Owner

Actions

====================================================

Tab

Recommendations

====================================================

Priority

Recommendation

Impact

Confidence

Affected Projects

Approve

Reject

Investigate

Assign

====================================================

Tab

Decision Center

====================================================

Scenario Comparison

Business Impact

Financial Impact

Risk Impact

Decision History

Approval Workflow

====================================================

Tab

Knowledge Search

====================================================

Enterprise Search

Documents

Policies

SOPs

Reports

Contracts

Bank Statements

Loan Agreements

Audit Reports

====================================================

Settings

====================================================

Generate all Settings & administration pages.

Users

Roles

Permissions

Business Units

Projects

SPVs

Currencies

Bank Master

Exchange Rates

Approval Matrix

AI Settings

Notification Rules

Saved Views

Tags

Categories

Audit Logs

System Logs

Integrations

API Keys

Feature Flags

====================================================

For EVERY page generate

Purpose

Header

Global Filters

Tabs

Cards

Charts

Tables

Columns

Forms

Field Groups

Drawer Layout

Right Sidebar

Modals

Bulk Actions

Row Actions

AI Widgets

Audit Components

Related Records

Timeline

Comments

Attachments

No backend.

No APIs.

No database.

Maintain naming consistency throughout the module.
```

### Why this structure?

This foundation prompt establishes the shared navigation, global filters, executive dashboard, AI Command Center, and administration workspace that every subsequent Finance & Treasury feature will reuse. It mirrors enterprise treasury design practices, where dashboards, liquidity overviews, AI copilots, and centralized administration provide the entry point into specialized workspaces for cash, treasury, payments, forecasting, and risk.
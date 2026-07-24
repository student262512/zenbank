Excellent. Now we'll build the **Treasury Management** workspace.

This prompt consolidates your uploaded requirements (Bank Management, Liquidity Management, Investments, FX, Treasury Dashboard, Treasury Agent, and Scenario Simulator) into a structured enterprise UI while incorporating capabilities commonly found in enterprise treasury platforms such as SAP Treasury and Kyriba (payments & bank communications, liquidity management, treasury risk, executive dashboards, bank relationship management, and AI-driven treasury operations).  ([SAP Help Portal][1])

---

# Finance & Treasury Module — Part 3 — Treasury Management

```text
You are an expert Enterprise SaaS Product Designer, UX Architect and Staff Frontend Engineer.

Design the complete Enterprise Treasury Management workspace for an AI-powered Real Estate Finance Platform.

Generate front end code with mock data. Do NOT generate backend code.

====================================================
Hierarchy
====================================================

Finance & Treasury
→ Treasury Management
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
Global Filters
====================================================

Company

Business Unit

SPV

Project

Region

Treasury Center

Bank

Bank Account

Currency

Country

Legal Entity

Counterparty

Loan

Investment

Date Range

Scenario

Status

Tags

====================================================
Side Navigation
====================================================

Treasury Dashboard

Bank Management

Bank Connectivity

Bank Accounts

Bank Relationship Management

Liquidity Management

Cash Pooling

Cash Concentration

Intercompany Funding

Treasury Investments

FX Management

Treasury Risk

Treasury Analytics

Treasury AI Agent

Scenario Simulator

====================================================
Page 1

Treasury Dashboard
====================================================

Purpose

Enterprise treasury command center.

Tabs

Overview

Liquidity

Banking

Investments

Risk

AI Insights

Cards

Available Liquidity

Available Credit Lines

Idle Cash

Cash Pool Balance

Investment Portfolio

Bank Exposure

Debt Position

FX Exposure

Counterparty Exposure

Treasury Health Score

Liquidity Score

Treasury Risk Score

Charts

Liquidity Trend

Cash Pool Distribution

Bank Exposure

Investment Allocation

Debt Maturity

FX Exposure

Counterparty Risk

Treasury Heatmap

Cash Waterfall

Cash Utilization

Tables

Treasury Alerts

Upcoming Maturities

Upcoming Transfers

Pending Payments

Funding Requests

Treasury Tasks

Right Sidebar

AI Executive Summary

Today's Treasury Risks

Recommendations

Quick Actions

====================================================
Page 2

Bank Management
====================================================

Tabs

Bank Directory

Bank Accounts

Virtual Accounts

Escrow Accounts

Trust Accounts

Nodal Accounts

Digital Signatures

Payment Approvals

Bank Statements

Cards

Total Banks

Active Accounts

Dormant Accounts

Blocked Accounts

Statement Status

Pending Approvals

Tables

Bank

Branch

Account Number

Account Type

Currency

Status

Owner

Available Balance

Charts

Bank Distribution

Account Distribution

Account Balance Trend

Forms

Bank Master

Branch

Contacts

SWIFT

IFSC

Routing Codes

Signatories

KYC

Actions

Create Bank

Open Account

Close Account

Freeze Account

Assign Signatory

====================================================
Page 3

Bank Connectivity
====================================================

Tabs

API Connections

Host-to-Host

SWIFT

ISO20022

Statement Imports

Payment Gateway

UPI

NEFT

RTGS

IMPS

Cards

Connected Banks

Healthy Connections

Failed Connections

Pending Sync

Tables

Bank

Connection Type

Status

Last Sync

API Version

Health

Latency

Actions

Connect

Reconnect

Sync

Download Statement

Upload Statement

Retry

====================================================
Page 4

Bank Relationship Management
====================================================

Tabs

Relationship Overview

Relationship Managers

Bank Facilities

Fees

Ratings

Performance

Cards

Relationship Score

Credit Facilities

Bank Charges

Utilization

Ratings

Tables

Bank

Relationship Manager

Facility

Limit

Utilization

Fees

Rating

Renewal Date

Charts

Facility Utilization

Fee Trend

Relationship Score Trend

====================================================
Page 5

Liquidity Management
====================================================

Tabs

Overview

Liquidity Position

Buffers

Forecast

Liquidity Planning

Funding

Cards

Net Liquidity

Available Liquidity

Minimum Buffer

Liquidity Gap

Emergency Funding

Charts

Liquidity Forecast

Liquidity Trend

Funding Gap

Cash Utilization

Tables

Entity

Cash

Liquidity

Buffer

Gap

Recommendation

AI Widgets

Optimize Liquidity

Recommend Transfers

Predict Liquidity Stress

====================================================
Page 6

Cash Pooling
====================================================

Tabs

Pool Overview

Physical Pooling

Notional Pooling

Zero Balancing

Target Balancing

Transfers

Tables

Pool

Participants

Balance

Target

Variance

Status

Charts

Pool Balance

Transfer Trend

Pool Utilization

AI Widgets

Optimize Pool

Recommend Sweeps

====================================================
Page 7

Cash Concentration
====================================================

Tabs

Overview

Transfer Rules

Concentration Schedule

Exceptions

Analytics

Tables

Source Account

Target Account

Balance

Transfer Amount

Status

Charts

Cash Concentration Trend

Account Distribution

AI Widgets

Recommend Concentration

Identify Idle Cash

====================================================
Page 8

Intercompany Funding
====================================================

Tabs

Funding Requests

Intercompany Loans

Interest

Repayments

Compliance

Tables

Entity

Borrower

Lender

Amount

Interest

Due Date

Status

Charts

Funding Trend

Exposure

Interest Income

AI Widgets

Funding Recommendation

Compliance Check

====================================================
Page 9

Treasury Investments
====================================================

Tabs

Portfolio

Fixed Deposits

Liquid Funds

Money Market

Government Securities

Commercial Papers

Corporate Bonds

Maturity Calendar

Yield Analytics

Cards

Portfolio Value

Average Yield

Expected Return

Maturing Soon

Investment Score

Tables

Investment

Institution

Amount

Rate

Start Date

Maturity

Yield

Status

Charts

Portfolio Allocation

Yield Curve

Maturity Ladder

Returns Trend

AI Widgets

Investment Recommendation

Reinvestment Suggestion

Yield Optimization

====================================================
Page 10

FX Management
====================================================

Tabs

Exposure

Forward Contracts

Options

Swaps

Natural Hedging

Settlements

Currency Gains/Losses

Cards

Net Exposure

Hedged Amount

Open Contracts

FX Risk Score

Charts

Exposure by Currency

FX Trend

Hedge Coverage

Gain Loss Trend

Tables

Currency

Exposure

Contract

Settlement Date

Status

Risk

AI Widgets

Recommend Hedge

Exposure Analysis

FX Forecast

====================================================
Page 11

Treasury Risk
====================================================

Tabs

Liquidity Risk

Counterparty Risk

Bank Risk

Interest Rate Risk

FX Risk

Settlement Risk

Concentration Risk

Country Risk

Climate Risk

Cards

Overall Risk Score

High Risk Items

Critical Alerts

Risk Trend

Charts

Risk Heatmap

Risk Trend

Exposure Matrix

Scenario Impact

Tables

Risk

Severity

Probability

Impact

Mitigation

Owner

AI Widgets

Root Cause

Recommendation

Confidence

====================================================
Page 12

Treasury Analytics
====================================================

Tabs

KPIs

Benchmarking

Variance

Forecast Accuracy

Executive Reports

Charts

Liquidity KPIs

Cash Conversion

Bank Performance

Investment Returns

Debt Trend

FX Trend

Tables

Metric

Current

Target

Variance

Benchmark

====================================================
Page 13

Treasury AI Agent
====================================================

Tabs

AI Copilot

Recommendations

Investigations

Knowledge

Decision Center

Automations

Suggested Prompts

Optimize Liquidity

Recommend Bank Transfer

Recommend Investment

Predict Liquidity Stress

Explain Treasury Risk

Recommend Funding

Optimize Idle Cash

Recommend Hedge Strategy

Conversation Panel

Evidence

Confidence

Reasoning

Related Records

Approval Actions

Workflow Actions

====================================================
Page 14

Scenario Simulator
====================================================

Tabs

Scenario Builder

Interest Rate Changes

Liquidity Stress

Sales Slowdown

Construction Delay

Material Cost Increase

FX Shock

Debt Refinancing

Best Case

Expected Case

Worst Case

Cards

Scenario Score

Financial Impact

Liquidity Impact

Risk Impact

Charts

Cash Projection

Liquidity Curve

Risk Comparison

Funding Gap

Tables

Assumptions

Scenario Results

Recommendations

AI Widgets

Explain Scenario

Compare Scenarios

Recommended Actions

====================================================
Every Page Must Include
====================================================

Header

Search

Saved Views

Global Filters

KPIs

Charts

Tables

Column Chooser

Bulk Actions

Row Actions

Forms

Right Sidebar

Timeline

Comments

Attachments

Audit History

Related Records

Notifications

AI Insights

AI Recommendations

AI Actions

Responsive enterprise layout

Reusable page structure

Consistent naming

No APIs

No backend

No database

```

This prompt is intentionally modular so Claude Code can generate a complete Treasury Management workspace without drifting into Project Finance, Loan Management, or Budgeting. It follows the same information architecture used in previous parts, ensuring a consistent UI across the entire Finance & Treasury module while covering bank operations, liquidity, investments, FX, treasury risk, and AI-driven decision support.
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const modules = [
  {
    id: 1,
    title: "Cash Flow Intelligence",
    subtitle: "365-Day AI Forecasting",
    description: "Real-time cash position monitoring across all entities, projects, and bank accounts. AI-powered forecasting with 99.2% accuracy.",
    features: ["Enterprise Cash Position", "ML-Powered Forecasting", "Inflow/Outflow Analytics", "Risk Detection", "Cash AI Agent"],
    gradient: "from-cyan-500 via-blue-500 to-indigo-600",
    bgGradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    stats: { value: "₹2,847 Cr", label: "Cash Monitored" },
  },
  {
    id: 2,
    title: "Treasury Management",
    subtitle: "Unified Banking Operations",
    description: "Centralize all banking operations with multi-bank connectivity, real-time liquidity dashboards, and automated cash pooling.",
    features: ["Multi-Bank Integration", "Liquidity Optimization", "Cash Pooling", "SWIFT/NEFT/RTGS", "Treasury AI Agent"],
    gradient: "from-violet-500 via-purple-500 to-fuchsia-600",
    bgGradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    stats: { value: "47", label: "Banks Connected" },
  },
  {
    id: 3,
    title: "Project Finance",
    subtitle: "AI Capital Allocation",
    description: "Intelligent project funding with IRR optimization, drawdown management, and AI-powered capital allocation recommendations.",
    features: ["Funding Sources", "Drawdown Tracking", "Project IRR/NPV", "Capital Stack", "Allocation AI"],
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    bgGradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    icon: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z",
    stats: { value: "₹12,450 Cr", label: "Projects Funded" },
  },
  {
    id: 4,
    title: "Loan & Debt Intelligence",
    subtitle: "Complete Debt Lifecycle",
    description: "Manage your entire debt portfolio with intelligent refinancing recommendations, maturity tracking, and interest optimization.",
    features: ["Debt Portfolio", "Interest Schedules", "Refinancing Planner", "Maturity Calendar", "Debt Health Score"],
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    bgGradient: "from-orange-500/20 via-amber-500/10 to-transparent",
    icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
    stats: { value: "₹8,920 Cr", label: "Debt Managed" },
  },
  {
    id: 5,
    title: "Covenant Monitoring",
    subtitle: "AI Breach Prediction",
    description: "Automated covenant testing with predictive breach alerts. Never miss a compliance deadline with AI-powered early warning.",
    features: ["DSCR/ICR/LTV Tracking", "Auto Testing", "Breach Prediction", "Early Warning", "AI Recommendations"],
    gradient: "from-red-500 via-rose-500 to-pink-600",
    bgGradient: "from-red-500/20 via-rose-500/10 to-transparent",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    stats: { value: "99.8%", label: "Compliance Rate" },
  },
  {
    id: 6,
    title: "Escrow Management",
    subtitle: "RERA Compliance",
    description: "Automated escrow monitoring with milestone-based releases, RERA compliance tracking, and reconciliation automation.",
    features: ["Escrow Accounts", "Milestone Releases", "RERA Compliance", "Auto Reconciliation", "AI Monitoring"],
    gradient: "from-blue-500 via-indigo-500 to-violet-600",
    bgGradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    stats: { value: "₹1,240 Cr", label: "Escrow Balance" },
  },
  {
    id: 7,
    title: "Working Capital",
    subtitle: "Cash Conversion Optimizer",
    description: "Optimize your cash conversion cycle with receivables/payables management, dynamic discounting, and supply chain finance.",
    features: ["Receivables Analytics", "Payables Optimization", "CCC Dashboard", "Dynamic Discounting", "SCF Integration"],
    gradient: "from-teal-500 via-emerald-500 to-green-600",
    bgGradient: "from-teal-500/20 via-emerald-500/10 to-transparent",
    icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
    stats: { value: "23 Days", label: "Avg CCC Reduced" },
  },
  {
    id: 8,
    title: "Budget Intelligence",
    subtitle: "AI Variance Analysis",
    description: "Create, approve, and track budgets with AI-powered variance analysis, rolling forecasts, and root cause detection.",
    features: ["Annual Budgets", "Rolling Forecasts", "Variance Analysis", "Approval Workflows", "Budget AI"],
    gradient: "from-pink-500 via-rose-500 to-red-600",
    bgGradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    stats: { value: "₹4,200 Cr", label: "Budget Tracked" },
  },
  {
    id: 9,
    title: "Payment Intelligence",
    subtitle: "Centralized Payment Factory",
    description: "Unified payment processing with AI fraud detection, priority routing, and intelligent vendor payment optimization.",
    features: ["Payment Factory", "Priority Queue", "Fraud Detection", "Sanctions Screening", "Payment Analytics"],
    gradient: "from-amber-500 via-orange-500 to-red-500",
    bgGradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    stats: { value: "₹15,890 Cr", label: "Payments Processed" },
  },
  {
    id: 10,
    title: "Bank Reconciliation",
    subtitle: "AI Auto-Matching",
    description: "Intelligent reconciliation with 98% auto-match rate. AI handles exceptions, identifies duplicates, and suggests corrections.",
    features: ["Auto Matching", "AI Exceptions", "Bulk Processing", "Real-time Recon", "Dashboard Analytics"],
    gradient: "from-sky-500 via-blue-500 to-indigo-600",
    bgGradient: "from-sky-500/20 via-blue-500/10 to-transparent",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    stats: { value: "98.4%", label: "Auto-Match Rate" },
  },
  {
    id: 11,
    title: "Collections Intelligence",
    subtitle: "AI-Driven Recovery",
    description: "Maximize collection efficiency with AI risk scoring, intelligent dunning, and WhatsApp/Voice collection automation.",
    features: ["Customer Risk Score", "Promise to Pay", "AI Campaigns", "WhatsApp/Voice", "Collection Dashboard"],
    gradient: "from-lime-500 via-green-500 to-emerald-600",
    bgGradient: "from-lime-500/20 via-green-500/10 to-transparent",
    icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z",
    stats: { value: "34%", label: "Collection Improved" },
  },
  {
    id: 12,
    title: "Revenue Intelligence",
    subtitle: "Leakage Detection AI",
    description: "Track revenue from booking to recognition. Detect leakage, analyze margins, and forecast future revenue with precision.",
    features: ["Revenue Dashboard", "Recognition Tracking", "Leakage Detection", "Margin Analysis", "Revenue AI"],
    gradient: "from-fuchsia-500 via-pink-500 to-rose-600",
    bgGradient: "from-fuchsia-500/20 via-pink-500/10 to-transparent",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    stats: { value: "₹320 Cr", label: "Leakage Prevented" },
  },
  {
    id: 13,
    title: "FP&A",
    subtitle: "Scenario Planning Engine",
    description: "Strategic financial planning with driver-based modeling, what-if scenarios, and Monte Carlo simulation for risk analysis.",
    features: ["Driver-Based Planning", "What-If Analysis", "Scenario Modeling", "Monte Carlo", "Executive Planning"],
    gradient: "from-purple-500 via-violet-500 to-indigo-600",
    bgGradient: "from-purple-500/20 via-violet-500/10 to-transparent",
    icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z",
    stats: { value: "500+", label: "Scenarios Modeled" },
  },
  {
    id: 14,
    title: "Investment Management",
    subtitle: "Yield Optimization",
    description: "Manage treasury investments with intelligent yield optimization, maturity tracking, and automated reinvestment suggestions.",
    features: ["FD Portfolio", "Liquid Funds", "Maturity Ladder", "Yield Analytics", "Investment AI"],
    gradient: "from-yellow-500 via-amber-500 to-orange-600",
    bgGradient: "from-yellow-500/20 via-amber-500/10 to-transparent",
    icon: "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7",
    stats: { value: "₹890 Cr", label: "Investments Managed" },
  },
  {
    id: 15,
    title: "FX & Treasury Risk",
    subtitle: "Hedging Automation",
    description: "Manage multi-currency exposure with AI-driven hedging strategies, forward contract tracking, and real-time risk dashboards.",
    features: ["FX Exposure", "Hedging Strategy", "Forward Contracts", "Interest Risk", "Market Risk"],
    gradient: "from-cyan-500 via-teal-500 to-emerald-600",
    bgGradient: "from-cyan-500/20 via-teal-500/10 to-transparent",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    stats: { value: "$245M", label: "FX Hedged" },
  },
  {
    id: 16,
    title: "Financial Close",
    subtitle: "AI Narrative Generation",
    description: "Accelerate month-end close with automated checklists, AI-generated narratives, and board-ready reporting packages.",
    features: ["Close Calendar", "Auto Checklists", "MIS Reports", "Board Packs", "Narrative AI"],
    gradient: "from-indigo-500 via-blue-500 to-cyan-600",
    bgGradient: "from-indigo-500/20 via-blue-500/10 to-transparent",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    stats: { value: "5 Days", label: "Close Cycle Reduced" },
  },
  {
    id: 17,
    title: "AI CFO Workspace",
    subtitle: "18 Autonomous Agents",
    description: "Your AI-powered finance command center with 18 specialized agents working 24/7 to optimize every aspect of treasury.",
    features: ["AI CFO Agent", "Treasury Copilot", "Finance Copilot", "Scenario Simulator", "Decision Center"],
    gradient: "from-rose-500 via-pink-500 to-purple-600",
    bgGradient: "from-rose-500/20 via-pink-500/10 to-transparent",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    stats: { value: "18", label: "AI Agents Active" },
  },
  {
    id: 18,
    title: "Executive Intelligence",
    subtitle: "Command Center",
    description: "Real-time visibility across all finance functions with AI-powered insights, alerts, and strategic recommendations.",
    features: ["Live Dashboard", "AI Alerts", "KPI Scorecards", "Strategic Insights", "Board Reports"],
    gradient: "from-slate-500 via-gray-500 to-zinc-600",
    bgGradient: "from-slate-500/20 via-gray-500/10 to-transparent",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    stats: { value: "360°", label: "Financial Visibility" },
  },
];

function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % modules.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const currentModule = modules[currentSlide];

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${currentModule.bgGradient} transition-all duration-1000`} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Module Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-medium text-slate-300">
                Module {currentSlide + 1} of {modules.length}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r ${currentModule.gradient} text-white`}>
                {currentModule.subtitle}
              </span>
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
                <span className="text-white">{currentModule.title.split(" ")[0]}</span>
                <br />
                <span className={`bg-gradient-to-r ${currentModule.gradient} bg-clip-text text-transparent`}>
                  {currentModule.title.split(" ").slice(1).join(" ")}
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-slate-400 max-w-xl leading-relaxed">
                {currentModule.description}
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2">
              {currentModule.features.map((feature, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-white/10 transition-colors cursor-default"
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className={`group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r ${currentModule.gradient} px-8 py-4 font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40`}
              >
                Start Free Trial
                <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-sm hover:bg-white/10 transition-all"
              >
                <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Demo
              </Link>
            </div>

            {/* Stats */}
            <div className="pt-8 border-t border-white/10">
              <div className="flex items-center gap-8">
                <div>
                  <div className={`text-3xl font-bold bg-gradient-to-r ${currentModule.gradient} bg-clip-text text-transparent`}>
                    {currentModule.stats.value}
                  </div>
                  <div className="text-sm text-slate-400">{currentModule.stats.label}</div>
                </div>
                <div className="h-12 w-px bg-white/10" />
                <div>
                  <div className="text-3xl font-bold text-white">500+</div>
                  <div className="text-sm text-slate-400">Enterprise Clients</div>
                </div>
                <div className="h-12 w-px bg-white/10" />
                <div>
                  <div className="text-3xl font-bold text-emerald-400">99.99%</div>
                  <div className="text-sm text-slate-400">Uptime SLA</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Module Visualization */}
          <div className="relative">
            <div className={`absolute -inset-4 bg-gradient-to-r ${currentModule.gradient} opacity-20 blur-3xl rounded-3xl`} />
            <div className="relative rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-xl p-8 shadow-2xl">
              {/* Module Icon */}
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${currentModule.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={currentModule.icon} />
                </svg>
              </div>

              {/* Mini Dashboard Preview */}
              <div className="space-y-4">
                <div className="h-4 bg-white/10 rounded-full w-3/4" />
                <div className="h-4 bg-white/10 rounded-full w-1/2" />
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 rounded-xl bg-white/5 border border-white/10 p-3">
                      <div className="h-2 bg-white/20 rounded-full w-1/2 mb-2" />
                      <div className={`h-8 rounded-lg bg-gradient-to-r ${currentModule.gradient} opacity-30`} />
                    </div>
                  ))}
                </div>
                <div className="h-32 rounded-xl bg-white/5 border border-white/10 mt-4 p-4">
                  <div className="flex gap-2 mb-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className={`h-16 flex-1 rounded-lg bg-gradient-to-t ${currentModule.gradient} opacity-${20 + i * 10}`} />
                    ))}
                  </div>
                  <div className="h-2 bg-white/10 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            onClick={() => {
              setIsAutoPlaying(false);
              setCurrentSlide((prev) => (prev - 1 + modules.length) % modules.length);
            }}
            className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Progress Dots */}
          <div className="flex gap-2">
            {modules.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentSlide(idx);
                }}
                className={`h-2 rounded-full transition-all ${
                  idx === currentSlide
                    ? `w-8 bg-gradient-to-r ${currentModule.gradient}`
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => {
              setIsAutoPlaying(false);
              setCurrentSlide((prev) => (prev + 1) % modules.length);
            }}
            className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="ml-4 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
          >
            {isAutoPlaying ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

function PromoBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" />
      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <span className="text-white font-semibold">Limited Time Offer</span>
          </div>
          <span className="text-white/90">
            Get <span className="font-bold text-yellow-300">50% OFF</span> on Annual Enterprise Plans + <span className="font-bold text-yellow-300">3 Months Free</span> AI Agents Access
          </span>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-blue-600 font-semibold hover:bg-white/90 transition-colors"
          >
            Claim Offer
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturesGrid() {
  return (
    <section className="relative py-24 lg:py-32 bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <span className="text-cyan-400 text-sm font-medium">22 Enterprise Finance Domains</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Complete AI Financial
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Operating System</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Every module you need to transform your finance function into an AI-powered, autonomous operation.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, idx) => (
            <Link
              key={module.id}
              href={`/${module.title.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`}
              className="group relative rounded-2xl border border-white/10 bg-slate-900/50 p-6 hover:border-white/20 hover:bg-slate-900/80 transition-all duration-300"
            >
              {/* Hover Gradient */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${module.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="relative">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={module.icon} />
                  </svg>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {module.title}
                </h3>
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">{module.description}</p>

                {/* Features Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {module.features.slice(0, 3).map((feature, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-white/5 text-xs text-slate-400">
                      {feature}
                    </span>
                  ))}
                  {module.features.length > 3 && (
                    <span className="px-2 py-0.5 rounded-md bg-white/5 text-xs text-slate-500">
                      +{module.features.length - 3} more
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div>
                    <span className={`text-lg font-bold bg-gradient-to-r ${module.gradient} bg-clip-text text-transparent`}>
                      {module.stats.value}
                    </span>
                    <span className="text-xs text-slate-500 ml-1">{module.stats.label}</span>
                  </div>
                  <svg className="h-5 w-5 text-slate-500 group-hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformAnalytics() {
  const stats = [
    { value: "₹45,000+ Cr", label: "Cash Managed Daily", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "cyan" },
    { value: "500+", label: "Enterprise Clients", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", color: "purple" },
    { value: "2.5M+", label: "Transactions/Day", icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "yellow" },
    { value: "99.99%", label: "Uptime SLA", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "emerald" },
    { value: "18", label: "AI Agents Active", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", color: "pink" },
    { value: "<50ms", label: "Avg Response Time", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", color: "blue" },
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 text-sm font-medium">Live Platform Stats</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Trusted by Leading
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent"> Real Estate Enterprises</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Real-time metrics that demonstrate the scale and reliability of our platform.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl border border-white/10 bg-slate-900/50 p-6 text-center hover:border-white/20 transition-all"
            >
              <div className={`w-12 h-12 rounded-xl bg-${stat.color}-500/20 flex items-center justify-center mx-auto mb-4`}>
                <svg className={`h-6 w-6 text-${stat.color}-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                </svg>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      quote: "ZenBank transformed our treasury operations. We went from manual reconciliation taking 3 days to automated matching in under 10 minutes. The AI agents are incredibly accurate.",
      author: "Rajesh Sharma",
      role: "CFO, Prestige Estates",
      avatar: "RS",
      rating: 5,
    },
    {
      quote: "The cash flow forecasting is phenomenal. 99% accuracy on 90-day forecasts has completely changed how we plan our project funding. We've reduced our working capital needs by 40%.",
      author: "Priya Menon",
      role: "Treasury Head, DLF Limited",
      avatar: "PM",
      rating: 5,
    },
    {
      quote: "Managing covenants across 50+ loans was a nightmare. ZenBank's AI predicts potential breaches weeks in advance, giving us time to take corrective action.",
      author: "Amit Patel",
      role: "VP Finance, Godrej Properties",
      avatar: "AP",
      rating: 5,
    },
    {
      quote: "The AI CFO agent has become our 24/7 finance advisor. It catches anomalies we would have missed and provides actionable recommendations instantly.",
      author: "Sunita Reddy",
      role: "Group CFO, Brigade Enterprises",
      avatar: "SR",
      rating: 5,
    },
    {
      quote: "Escrow compliance was always stressful. Now, ZenBank automatically tracks every RERA requirement and alerts us before any deadline. Zero compliance issues in 18 months.",
      author: "Vikram Joshi",
      role: "Finance Director, Sobha Limited",
      avatar: "VJ",
      rating: 5,
    },
    {
      quote: "We consolidated 47 bank accounts across 12 entities into a single dashboard. The liquidity optimization alone saved us ₹8 Cr in interest costs last year.",
      author: "Neha Gupta",
      role: "Treasury Manager, Mahindra Lifespaces",
      avatar: "NG",
      rating: 5,
    },
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <svg className="h-4 w-4 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-purple-400 text-sm font-medium">Loved by Finance Teams</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            What Our Customers
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"> Say About Us</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Join 500+ enterprises that have transformed their finance operations with ZenBank.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl border border-white/10 bg-slate-900/50 p-6 hover:border-purple-500/30 transition-all"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-300 mb-6 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.author}</div>
                  <div className="text-sm text-slate-400">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Partners() {
  const partners = [
    { name: "Microsoft Azure", category: "Cloud Infrastructure" },
    { name: "AWS", category: "Cloud Infrastructure" },
    { name: "Google Cloud", category: "AI/ML Platform" },
    { name: "SAP", category: "ERP Integration" },
    { name: "Oracle", category: "ERP Integration" },
    { name: "Salesforce", category: "CRM Integration" },
    { name: "HDFC Bank", category: "Banking Partner" },
    { name: "ICICI Bank", category: "Banking Partner" },
    { name: "Axis Bank", category: "Banking Partner" },
    { name: "Yes Bank", category: "Banking Partner" },
    { name: "Deloitte", category: "Implementation Partner" },
    { name: "KPMG", category: "Implementation Partner" },
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Trusted Technology
            <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent"> Partners</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Seamlessly integrated with the enterprise tools you already use.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-slate-900/30 p-6 hover:border-cyan-500/30 hover:bg-slate-900/50 transition-all"
            >
              <div className="h-12 w-full flex items-center justify-center mb-3">
                <span className="text-xl font-bold text-white/60 group-hover:text-white transition-colors">
                  {partner.name}
                </span>
              </div>
              <span className="text-xs text-slate-500">{partner.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SponsorSection() {
  const sponsors = [
    {
      title: "AWS Credits",
      description: "Get up to $100,000 in AWS credits for ZenBank Enterprise customers",
      cta: "Learn More",
      gradient: "from-orange-500 to-yellow-500",
    },
    {
      title: "Free Implementation",
      description: "Complimentary implementation support from our certified partners",
      cta: "Get Started",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      title: "Training Academy",
      description: "Free access to ZenBank Academy with 50+ certification courses",
      cta: "Enroll Now",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-slate-950">
      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
            <svg className="h-4 w-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
            <span className="text-yellow-400 text-sm font-medium">Exclusive Partner Offers</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Partner Benefits &
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> Exclusive Deals</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {sponsors.map((sponsor, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 p-8 hover:border-white/20 transition-all"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${sponsor.gradient} opacity-10 blur-3xl`} />
              <div className="relative">
                <h3 className="text-2xl font-bold text-white mb-3">{sponsor.title}</h3>
                <p className="text-slate-400 mb-6">{sponsor.description}</p>
                <button className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${sponsor.gradient} text-white font-semibold hover:opacity-90 transition-opacity`}>
                  {sponsor.cta}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What makes ZenBank different from traditional Treasury Management Systems?",
      answer: "ZenBank is an AI-native platform built from the ground up with 18 autonomous AI agents. Unlike traditional TMS that require manual intervention, our agents work 24/7 to monitor, analyze, and optimize your entire finance function. We offer predictive capabilities, natural language interactions, and autonomous workflow execution that legacy systems simply cannot match.",
    },
    {
      question: "How long does implementation typically take?",
      answer: "Most enterprise implementations are completed within 8-12 weeks. This includes ERP integration, bank connectivity setup, data migration, and team training. Our modular architecture allows you to go live with critical modules first and add more over time.",
    },
    {
      question: "Is ZenBank secure enough for enterprise financial data?",
      answer: "Absolutely. We're SOC 2 Type II certified, ISO 27001 compliant, and GDPR ready. All data is encrypted at rest and in transit using AES-256 encryption. We maintain 99.99% uptime SLA and have never experienced a security breach.",
    },
    {
      question: "Which ERPs and banks do you integrate with?",
      answer: "We have pre-built connectors for SAP, Oracle, Microsoft Dynamics, Yardi, MRI, and 50+ other ERPs. For banking, we support 100+ banks globally including all major Indian banks with SWIFT, NEFT, RTGS, and IMPS integration. Custom integrations are also available.",
    },
    {
      question: "How does the AI forecasting work?",
      answer: "Our ML models analyze historical cash flows, seasonal patterns, project milestones, customer payment behavior, and external factors to generate forecasts. We achieve 99.2% accuracy on 30-day forecasts and 95% on 90-day forecasts. The models continuously learn and improve from your data.",
    },
    {
      question: "What kind of support do you provide?",
      answer: "Enterprise customers get 24/7 priority support with a dedicated Customer Success Manager. We offer phone, email, and in-app chat support with < 15 minute response times for critical issues. Training, documentation, and a community forum are also included.",
    },
    {
      question: "Can we start with just one module?",
      answer: "Yes! Our modular architecture lets you start with the most critical module (typically Cash Flow or Treasury) and expand over time. All modules share the same data foundation, so adding new modules is seamless.",
    },
    {
      question: "What's included in the free trial?",
      answer: "The 14-day free trial includes full access to all 22 modules, all 18 AI agents, and up to 5 user seats. You can connect your sandbox ERP and test bank accounts to experience the platform with real workflows. No credit card required.",
    },
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-blue-400 text-sm font-medium">Got Questions?</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Frequently Asked
            <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent"> Questions</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-slate-900/50 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-semibold text-white pr-8">{faq.question}</span>
                <svg
                  className={`h-5 w-5 text-slate-400 transition-transform ${openIndex === idx ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-6">
                  <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-700" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/10 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Ready to Transform Your
            <br />
            Finance Operations?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Join 500+ enterprises that have revolutionized their treasury with AI-powered automation.
            Start your free trial today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/register"
              className="group inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-lg hover:bg-white/90 transition-all"
            >
              Start Free 14-Day Trial
              <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-all"
            >
              Schedule Demo
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-white/70">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Full access to all features</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <PromoBanner />
      <FeaturesGrid />
      <PlatformAnalytics />
      <Testimonials />
      <Partners />
      <SponsorSection />
      <FAQ />
      <CTASection />
    </>
  );
}

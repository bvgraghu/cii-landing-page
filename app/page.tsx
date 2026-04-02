"use client"

import { useEffect, useState } from "react"
import Hero from "@/app/components/home/hero"
import KPIStrip from "@/app/components/home/kpi-strip"
import AuditPipelineFlow from "@/app/components/home/audit-pipeline-flow"
import EnergyConversionLayer from "@/app/components/home/energy-conversion"
import EnergyImpactChart from "@/app/components/home/energy-impact-chart"
import SectorTrendChart from "@/app/components/home/sector-trend-chart"
import EnergySankeyFlow from "@/app/components/home/energy-sankey-flow"
import TelanganaImpactMap from "@/app/components/home/telangana-impact-map"
import SectorImpact from "@/app/components/home/sector-impact"
import TopPerformers from "@/app/components/home/top-performers"
import EfficiencyDistribution from "@/app/components/home/efficiency-distribution"
import ActivitySnapshot from "@/app/components/home/activity-snapshot"
import RecentActivityFeed from "@/app/components/home/recent-activity-feed"
import TransitionStory from "@/app/components/home/transition-story"
import ConsequenceStory from "@/app/components/home/consequence-story"
import { ChevronRight, LayoutDashboard, Sparkles, Target, Compass, Zap, Waves, Leaf } from "lucide-react"

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">

      {/* ── Sticky Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl border-b border-slate-200/40 dark:border-slate-800/40 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center shadow-xl">
            <Leaf size={16} className="text-emerald-500 fill-current" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-tight leading-none uppercase tracking-widest">
              CII <span className="text-emerald-500">Energy Assessment</span> Workflow
            </h1>
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
              Govt. of Telangana · RAMP · RICH · CII
            </p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <a href="#vision"       className="hover:text-emerald-500 transition-colors flex items-center gap-1.5"><Target  size={12}/> Vision</a>
          <a href="#pipeline"     className="hover:text-emerald-500 transition-colors flex items-center gap-1.5"><Compass size={12}/> Pipeline</a>
          <a href="#complexity"   className="hover:text-emerald-500 transition-colors flex items-center gap-1.5"><Zap     size={12}/> Energy Flows</a>
          <a href="#consequences" className="hover:text-emerald-500 transition-colors flex items-center gap-1.5"><Waves   size={12}/> Impact</a>
        </div>

        <a
          href={process.env.NEXT_PUBLIC_WORKFLOW_APP_URL ?? "http://localhost:3000"}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 h-9 px-5 text-[9px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all shadow-sm"
        >
          <LayoutDashboard size={14} />
          <span>Operational Console</span>
        </a>
      </nav>

      <main className="max-w-[1500px] mx-auto px-6 space-y-32">

        {/* Section 1 — Vision */}
        <section id="vision" className="pt-24 border-b border-slate-100 dark:border-slate-800 pb-20">
          <Hero />
          <KPIStrip />
        </section>

        {/* Section 2 — Assessment Pipeline */}
        <section id="pipeline" className="space-y-12">
          <div className="max-w-2xl">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-teal-600 mb-4 opacity-70">Assessment Operations</h3>
            <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
              The MSME Assessment Pipeline
            </h2>
            <p className="mt-3 text-base text-slate-500 dark:text-slate-400 font-medium max-w-xl">
              Track every MSME through Expression of Interest, site scheduling, walk-through and detailed assessments to post-implementation reporting.
            </p>
          </div>
          <AuditPipelineFlow />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1"><EfficiencyDistribution /></div>
            <div className="lg:col-span-2"><EnergyImpactChart /></div>
            <div className="lg:col-span-1"><SectorImpact /></div>
          </div>
        </section>

        {/* Section 3 — Transition */}
        <section id="transition">
          <TransitionStory />
        </section>

        {/* Section 4 — Energy Flows */}
        <section id="complexity" className="space-y-12">
          <div className="max-w-3xl space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-500 opacity-70 leading-none">Sankey Narrative</h3>
            <h2 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white leading-none capitalize">
              Mapping the Industrial Energy Mix
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Visualize how energy sources translate through transformation nodes into Telangana's regional industrial hub impact.
            </p>
          </div>
          <EnergySankeyFlow />
          <EnergyConversionLayer />
        </section>

        {/* Section 5 — Regional Intelligence */}
        <section id="spatial" className="space-y-12 pt-20 border-t border-slate-100 dark:border-slate-800">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
            <div className="xl:col-span-2">
              <div className="mb-10 max-w-xl">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-600 mb-4 opacity-70">Regional Analysis</h3>
                <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                  Telangana District-wise Distribution
                </h2>
              </div>
              <TelanganaImpactMap />
            </div>
            <div className="xl:col-span-1 space-y-8">
              <TopPerformers />
              <SectorTrendChart />
            </div>
          </div>
        </section>

        {/* Section 6 — Impact */}
        <section id="consequences" className="pb-32">
          <ConsequenceStory />
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1"><ActivitySnapshot /></div>
            <div className="lg:col-span-2"><RecentActivityFeed /></div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="bg-slate-900 text-white px-10 py-24 border-t border-slate-800">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-20">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400">
                <Leaf size={20} className="fill-current" />
              </div>
              <h2 className="text-lg font-black tracking-tight uppercase tracking-widest">
                CII Energy Assessment Workflow
              </h2>
            </div>
            <p className="text-base text-slate-400 max-w-lg font-medium leading-relaxed">
              Telangana's unified platform for MSME energy assessments — connecting expression of interest to implementation outcomes with full transparency.
            </p>
            <div className="flex gap-4">
              {["emerald", "teal", "blue", "indigo"].map((c, i) => (
                <div key={i} className={`w-8 h-8 rounded-full border border-white/10 bg-${c}-500`} />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Platform Sections</h4>
            <ul className="space-y-4 text-xs font-bold text-slate-300 uppercase tracking-widest">
              <li><a href="#vision"       className="hover:text-emerald-400 transition-colors">Vision &amp; KPIs</a></li>
              <li><a href="#pipeline"     className="hover:text-emerald-400 transition-colors">Assessment Pipeline</a></li>
              <li><a href="#complexity"   className="hover:text-emerald-400 transition-colors">Energy Flows</a></li>
              <li><a href="#consequences" className="hover:text-emerald-400 transition-colors">Impact &amp; Outcomes</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Partners</h4>
            <ul className="space-y-4 text-xs font-bold text-slate-300 uppercase tracking-widest">
              <li>Govt. of Telangana</li>
              <li>RAMP — Ministry of MSME</li>
              <li>RICH — Hyderabad</li>
              <li>CII</li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1500px] mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
          <p>© 2026 CII Energy Assessment Workflow · Govt. of Telangana</p>
          <div className="flex gap-10 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Data Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Gov Portal</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

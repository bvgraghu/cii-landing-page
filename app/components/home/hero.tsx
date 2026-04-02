"use client"

import { Sparkles, ArrowRight, Zap, Target, Globe, ShieldCheck, Flame } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Hero() {
  return (
    <div className="relative pt-12 pb-20 overflow-hidden">
      {/* Background Subtle Gradient & Grid */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(16,185,129,0.05)_0%,rgba(255,255,255,0)_100%)] dark:bg-[radial-gradient(45%_45%_at_50%_50%,rgba(16,185,129,0.05)_0%,rgba(15,23,42,0)_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.02] dark:opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
          
          {/* Narrative Vision */}
          <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-[0.25em] shadow-2xl">
               <ShieldCheck size={14} className="text-emerald-400" />
               India's Energy Commitment 2070
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.92]">
               Charting the <br /> 
               <span className="text-emerald-500 italic">Net-Zero</span> Industrial 
               <span className="block bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Pathways</span>
            </h1>
            
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl">
               The Energy Audit Intelligence Platform transforms granular audit data into a national narrative of efficiency, decarbonization, and industrial resilience.
            </p>

            <div className="flex items-center gap-6 pt-4">
              <button className="h-12 px-8 rounded-full bg-emerald-600 text-white text-[11px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:scale-105 transition-all shadow-xl shadow-emerald-500/20 flex items-center gap-3">
                 Explore National Dashboard <ArrowRight size={16} />
              </button>
              <div className="flex items-center gap-3 py-2 px-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 shadow-sm">
                 <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <Target size={16} className="text-emerald-600" />
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">NDC Targets 2030</p>
              </div>
            </div>
          </div>

          {/* Commitment Cards (The "Story" Cards) */}
          <div className="w-full lg:w-[400px] grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-right-4 duration-700 delay-300">
             <div className="group p-6 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 shadow-sm transition-all hover:border-emerald-500/50 hover:shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                   <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600"><Zap size={20} fill="currentColor" /></div>
                   <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Efficiency Goal</span>
                </div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 leading-none">Energy Intensity Reduction</h3>
                <p className="text-3xl font-black tabular-nums tracking-tighter text-slate-900 dark:text-white leading-none">45% <span className="text-sm font-bold text-slate-400">by 2030</span></p>
             </div>

             <div className="group p-6 rounded-[2.5rem] bg-slate-900 text-white dark:bg-white dark:text-slate-900 border border-slate-800 dark:border-slate-100 shadow-2xl transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                   <div className="w-10 h-10 rounded-2xl bg-white/10 dark:bg-slate-100 flex items-center justify-center text-emerald-400 dark:text-emerald-600"><Flame size={20} fill="currentColor" /></div>
                   <span className="text-[10px] font-black opacity-60 uppercase tracking-widest italic">Climate Payout</span>
                </div>
                <h3 className="text-xs font-black opacity-60 uppercase tracking-widest mb-2 leading-none">Decarbonization Delta</h3>
                <p className="text-3xl font-black tabular-nums tracking-tighter leading-none">1.2 <span className="text-sm font-bold opacity-60">Bn Tonnes CO2</span></p>
             </div>
          </div>
        </div>

        {/* Global Metric strip below hero */}
        <div className="mt-24 pt-8 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
           {[
             { label: "India Population", value: "142.8 Cr", color: "text-blue-500" },
             { label: "GDP Contribution", value: "14.2%", color: "text-emerald-500" },
             { label: "Total Forest Cover", value: "24.6%", color: "text-emerald-600" },
             { label: "RE Capacity", value: "172 GW", color: "text-amber-500" },
             { label: "Emissions Rank", value: "03 Global", color: "text-slate-400" },
           ].map(m => (
             <div key={m.label} className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{m.label}</p>
                <p className={cn("text-lg font-black tracking-tighter uppercase", m.color)}>{m.value}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  )
}

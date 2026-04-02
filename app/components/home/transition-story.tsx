"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { Sun, Wind, Flame, Zap, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const RE_TRANSITION_DATA = [
  { year: 2018, solar: 24, wind: 36, hydro: 18, other: 8 },
  { year: 2019, solar: 32, wind: 38, hydro: 19, other: 10 },
  { year: 2020, solar: 45, wind: 40, hydro: 20, other: 12 },
  { year: 2021, solar: 68, wind: 44, hydro: 22, other: 15 },
  { year: 2022, solar: 94, wind: 48, hydro: 24, other: 20 },
  { year: 2023, solar: 142, wind: 54, hydro: 28, other: 28 },
]

export default function TransitionStory() {
  return (
    <div className="space-y-10 py-16">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-slate-100 dark:border-slate-800/40 pb-12">
        <div className="max-w-2xl space-y-6">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 text-[10px] font-black uppercase tracking-widest border border-amber-100 dark:border-amber-800/30">
              <Sun size={14} className="fill-current" />
              The Energy Transition
           </div>
           <h2 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">Aggressive Scaling of <br /><span className="text-amber-500 italic">Renewable</span> Assets</h2>
           <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Moving from fossil-heavy transformation to a diversified, cleaner industrial energy mix.
           </p>
        </div>

        <div className="p-6 rounded-[2.5rem] bg-amber-500 text-white min-w-[280px] shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-10 opacity-[0.15] scale-150 rotate-12 group-hover:scale-110 transition-transform"><Sun size={80} strokeWidth={3} /></div>
           <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Target Vision</p>
           <h4 className="text-4xl font-black tracking-tighter mb-4">500 GW</h4>
           <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white/10 px-3 py-2 rounded-xl border border-white/10">
              <CheckCircle2 size={12} className="text-emerald-300" /> Commit 2030 Non-Fossil
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Transition Stacked Bar */}
        <div className="lg:col-span-3">
          <Card className="rounded-3xl border border-slate-200 bg-white dark:bg-slate-900 shadow-sm p-8 overflow-hidden">
             <div className="h-[380px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={RE_TRANSITION_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.08)" />
                      <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 900, fill: "rgba(148, 163, 184, 0.6)" }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 900, fill: "rgba(148, 163, 184, 0.6)" }} unit=" GW" />
                      <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: '#0f172a', padding: '16px' }} itemStyle={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 900 }} />
                      <Legend iconType="circle" />
                      <Bar dataKey="solar" name="Solar" stackId="mix" fill="#fbbf24" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="wind" name="Wind" stackId="mix" fill="#60a5fa" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="hydro" name="Hydro" stackId="mix" fill="#34d399" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="other" name="Biomass/Other" stackId="mix" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                   </BarChart>
                </ResponsiveContainer>
             </div>
          </Card>
        </div>

        {/* Breakdown Context */}
        <div className="space-y-6">
           {[
             { label: "Solar Energy", value: "32.4%", status: "Increasing", icon: Sun, color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-900/30" },
             { label: "Coal Dependancy", value: "54.0%", status: "Declining", icon: Flame, color: "text-slate-400", bg: "bg-slate-100 dark:bg-slate-800" },
             { label: "National Grid Share", value: "42.8%", status: "At Target", icon: Zap, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" },
           ].map(item => (
              <div key={item.label} className="p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm transition-all hover:-translate-x-2">
                 <div className="flex items-center gap-4 mb-4">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-transform", item.bg, item.color)}><item.icon size={20} /></div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 opacity-60 leading-none">{item.status}</p>
                 </div>
                 <h4 className="text-xs font-black text-slate-900 mb-1">{item.label}</h4>
                 <p className={cn("text-2xl font-black tabular-nums tracking-tighter", item.color)}>{item.value}</p>
              </div>
           ))}
        </div>
      </div>
    </div>
  )
}

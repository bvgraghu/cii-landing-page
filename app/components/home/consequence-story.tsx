"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { Wind, Waves, Thermometer, Leaf, Sparkles, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

const EMISSIONS_DATA = [
  { year: 2018, em: 2.1, wt: 1.4, dea: 0.7 },
  { year: 2019, em: 2.4, wt: 1.6, dea: 0.8 },
  { year: 2020, em: 2.2, wt: 1.5, dea: 0.7 },
  { year: 2021, em: 2.6, wt: 1.8, dea: 0.8 },
  { year: 2022, em: 3.1, wt: 2.2, dea: 0.9 },
  { year: 2023, em: 3.8, wt: 2.8, dea: 1.0 },
]

export default function ConsequenceStory() {
  return (
    <div className="space-y-12 py-20 bg-slate-50 dark:bg-slate-900/40 rounded-[4rem] px-10 border border-slate-100 dark:border-slate-800/40">
      <div className="max-w-4xl space-y-6">
         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-600 text-[10px] font-black uppercase tracking-widest border border-rose-100 dark:border-rose-800/30">
            <Thermometer size={14} className="fill-current" />
            Impact & Consequences
         </div>
         <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white uppercase tracking-widest">Beyond Efficiency</h2>
         <p className="text-base text-slate-500 dark:text-slate-400 font-medium max-w-2xl leading-relaxed italic opacity-60">
            Audits drive more than just GWh savings—they are the front-line defense against rising GHG emissions and resource depletion.
         </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* GHG Emissions Story (Ridge Chart Style) */}
        <Card className="xl:col-span-2 rounded-3xl border border-slate-200/60 transition-all bg-white dark:bg-slate-900 shadow-sm overflow-hidden p-6">
           <CardHeader className="p-0 mb-6">
              <div className="flex items-center justify-between">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">GHG Avoided</p>
                    <CardTitle className="text-xl font-black tracking-tight text-slate-900 dark:text-white uppercase tracking-widest">Decarbonization Ridge</CardTitle>
                 </div>
                 <div className="p-3 bg-slate-900 text-white rounded-2xl flex items-center gap-3">
                    <Wind size={16} className="text-emerald-400" />
                    <span className="text-lg font-black tracking-tighter">3.8M <span className="text-[8px] opacity-60">Tonnes</span></span>
                 </div>
              </div>
           </CardHeader>
           <CardContent className="p-0">
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={EMISSIONS_DATA}>
                      <defs>
                         <linearGradient id="colorEm" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
                         <linearGradient id="colorWt" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.08)" />
                      <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: "rgba(148, 163, 184, 0.6)" }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: "rgba(148, 163, 184, 0.6)" }} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: '#0f172a', color: '#fff', fontSize: '10px' }} />
                      <Area type="monotone" dataKey="em" stackId="1" stroke="#10b981" strokeWidth={3} fill="url(#colorEm)" />
                      <Area type="monotone" dataKey="wt" stackId="1" stroke="#3b82f6" strokeWidth={2} fill="url(#colorWt)" fillOpacity={0.1} />
                   </AreaChart>
                </ResponsiveContainer>
              </div>
           </CardContent>
        </Card>

        {/* Resource Gauges (The "Scarcity" Story) */}
        <div className="space-y-6">
           <div className="p-8 rounded-[2.5rem] bg-white border border-slate-200/60 shadow-sm flex flex-col items-center text-center group">
              <div className="relative w-32 h-32 mb-6">
                 <div className="absolute inset-0 rounded-full border-4 border-blue-50/50 flex flex-col items-center justify-center overflow-hidden">
                    <div className="absolute bottom-0 w-full bg-blue-500 animate-liquid transition-all duration-1000" style={{ height: '64%' }} />
                    <p className="relative z-10 text-2xl font-black text-slate-800 group-hover:text-white transition-colors duration-500">64%</p>
                 </div>
                 <div className="absolute -top-2 -right-2 p-2 bg-blue-100 rounded-xl text-blue-600"><Waves size={16} /></div>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Water Footprint Payout</p>
              <h4 className="text-base font-black text-slate-800 uppercase tracking-tight">Systemic Recirculation</h4>
           </div>

           <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl flex items-center justify-between group">
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Impact Potential</p>
                 <h4 className="text-xl font-black tracking-tight leading-none">Biodiversity Gain</h4>
                 <div className="flex items-center gap-2 mt-4 text-emerald-400 text-[10px] font-black uppercase">
                    <TrendingUp size={12} /> +12.4% Annual
                 </div>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-400"><Leaf size={32} /></div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
         {[
           { label: "Ground Water State", value: "Semi-Critical", color: "text-amber-500" },
           { label: "Waste Diversion", value: "84.2%", color: "text-emerald-500" },
           { label: "Climate Severity", value: "Medium", color: "text-blue-500" },
           { label: "Audit Resilience", value: "92 / 100", color: "text-indigo-500" },
         ].map(m => (
           <div key={m.label} className="p-6 rounded-2xl bg-white border border-slate-100 text-center transition-all hover:border-slate-300">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">{m.label}</p>
              <p className={cn("text-base font-black uppercase", m.color)}>{m.value}</p>
           </div>
         ))}
      </div>
    </div>
  )
}

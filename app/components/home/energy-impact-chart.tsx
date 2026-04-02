"use client"

import { useState, useMemo } from "react"
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  ComposedChart, Area, Line
} from "recharts"
import { ENERGY_IMPACT_HISTORY } from "@/lib/mock-home-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, BarChart3, Download, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

type TimeFilter = "monthly" | "quarterly" | "yearly"

export default function EnergyImpactChart() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("monthly")
  const [visibleCategories, setVisibleCategories] = useState({ wt: true, dea: true, total: true })

  const chartData = useMemo(() => {
    if (timeFilter === "monthly") return ENERGY_IMPACT_HISTORY
    if (timeFilter === "quarterly") {
      const quarters = [{ month: "Q1", saved: 0, audits: 0, wt: 0, dea: 0 }, { month: "Q2", saved: 0, audits: 0, wt: 0, dea: 0 }, { month: "Q3", saved: 0, audits: 0, wt: 0, dea: 0 }, { month: "Q4", saved: 0, audits: 0, wt: 0, dea: 0 }]
      ENERGY_IMPACT_HISTORY.forEach((m, idx) => { const qIdx = Math.floor(idx / 3); quarters[qIdx].saved += m.saved; quarters[qIdx].audits += m.audits; quarters[qIdx].wt += m.wt; quarters[qIdx].dea += m.dea })
      return quarters.map(q => ({ ...q, saved: Number(q.saved.toFixed(1)), wt: Number(q.wt.toFixed(1)), dea: Number(q.dea.toFixed(1)) }))
    }
    return ENERGY_IMPACT_HISTORY
  }, [timeFilter])

  const latestData = chartData[chartData.length - 1]
  const prevData = chartData.length > 1 ? chartData[chartData.length - 2] : null
  const growthRate = prevData ? ((latestData.saved - prevData.saved) / prevData.saved * 100).toFixed(1) : "0"

  return (
    <Card className="rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      <CardHeader className="p-6 pb-2">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <BarChart3 size={16} className="text-emerald-700 dark:text-emerald-400" />
             </div>
             <CardTitle className="text-base font-black tracking-tight uppercase tracking-widest text-slate-800">Impact Analysis</CardTitle>
          </div>
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-100 dark:bg-slate-800">
             {(["monthly", "quarterly"] as TimeFilter[]).map((f) => (
                <button key={f} onClick={() => setTimeFilter(f)} className={cn("text-[9px] font-black px-3 py-1 rounded-md uppercase transition-all", timeFilter === f ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-700")}>{f}</button>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pb-4">
           <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-800/40">
              <p className="text-[9px] font-black uppercase tracking-widest text-emerald-600 mb-1">Growth</p>
              <div className="flex items-center gap-1">
                 <TrendingUp size={14} className="text-emerald-500" />
                 <span className="text-xl font-black text-emerald-700 dark:text-emerald-300">+{growthRate}%</span>
              </div>
           </div>
           <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-800/40">
              <p className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-1">Intensity</p>
              <div className="flex items-baseline gap-1">
                 <span className="text-xl font-black text-blue-700 dark:text-blue-300">{latestData.audits}</span>
                 <span className="text-[8px] font-bold text-blue-600 uppercase">Ops</span>
              </div>
           </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-2">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <defs>
                <linearGradient id="colorDEA_sm" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
                <linearGradient id="colorWT_sm" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.08)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 800, fill: "rgba(148, 163, 184, 0.6)" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 800, fill: "rgba(148, 163, 184, 0.6)" }} unit=" G" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', fontSize: '10px', padding: '12px' }} />
              <Area type="monotone" dataKey="dea" stackId="1" stroke="#10b981" strokeWidth={0} fill="url(#colorDEA_sm)" />
              <Area type="monotone" dataKey="wt" stackId="1" stroke="#6366f1" strokeWidth={0} fill="url(#colorWT_sm)" />
              <Line type="monotone" dataKey="saved" stroke="#0f172a" strokeWidth={3} dot={false} activeDot={{ r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

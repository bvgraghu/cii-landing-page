"use client"

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { EFFICIENCY_DISTRIBUTION } from "@/lib/mock-home-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Target, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

export default function EfficiencyDistribution() {
  const avgEfficiency = 24.5

  return (
    <Card className="rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-sm overflow-hidden flex flex-col h-full group">
      <CardHeader className="p-6 pb-2 group">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center p-2 group-hover:rotate-6 transition-transform">
            <BarChart3 size={16} />
          </div>
          <p className="text-[9px] font-black uppercase tracking-widest text-emerald-600">Yield Analytics</p>
        </div>
        <CardTitle className="text-lg font-black tracking-tight text-slate-800 dark:text-white uppercase tracking-widest leading-none">Efficiency Spread</CardTitle>
      </CardHeader>

      <CardContent className="p-6 pt-4 flex-1 flex flex-col gap-6">
        <div className="bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800/40 p-4 flex-1">
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={EFFICIENCY_DISTRIBUTION} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                <XAxis 
                  dataKey="range" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 9, fontWeight: 800, fill: "rgba(148, 163, 184, 0.7)" }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 9, fontWeight: 800, fill: "rgba(148, 163, 184, 0.7)" }}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)', 
                    padding: '12px',
                    backgroundColor: '#0f172a',
                    color: '#fff',
                    fontSize: '10px'
                  }}
                  itemStyle={{ color: '#fff', fontWeight: 900, textTransform: 'uppercase' }}
                  cursor={{ fill: 'rgba(148, 163, 184, 0.05)', radius: 8 }}
                />
                <ReferenceLine x={avgEfficiency} stroke="#10b981" strokeDasharray="3 3" label={{ position: 'top', value: 'AVG', fill: '#10b981', fontSize: 8, fontWeight: 900 }} />
                <Bar 
                  dataKey="count" 
                  radius={[6, 6, 0, 0]} 
                  animationDuration={1500}
                >
                  {EFFICIENCY_DISTRIBUTION.map((entry: any, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.isPeak ? "#10b981" : "#94a3b8"} 
                      fillOpacity={entry.isPeak ? 1 : 0.3}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-auto">
          <div className="p-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900">
             <div className="flex items-center gap-2 mb-2">
                <Target size={14} className="text-emerald-400" />
                <p className="text-[8px] font-black uppercase tracking-widest opacity-60">Median Yield</p>
             </div>
             <p className="text-2xl font-black tabular-nums tracking-tighter leading-none">24.5%</p>
          </div>
          
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
             <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={14} className="text-blue-500" />
                <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Peak Cluster</p>
             </div>
             <p className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tight">20-30% Range</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 italic text-[9px] font-medium text-slate-500 text-center justify-center">
            Most audits deliver significant efficiency yields in the mid-range.
        </div>
      </CardContent>
    </Card>
  )
}

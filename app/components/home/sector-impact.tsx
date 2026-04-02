"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { SECTOR_DATA } from "@/lib/mock-home-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Factory, Zap, TrendingUp } from "lucide-react"

const COLORS = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#475569"]

export default function SectorImpact() {
  return (
    <Card className="rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-sm h-full flex flex-col overflow-hidden group transition-all hover:bg-slate-50/50">
      <CardHeader className="p-6 pb-0 group">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center p-2 group-hover:rotate-6 transition-transform">
            <Factory size={16} className="text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-[9px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">Distribution Analysis</p>
        </div>
        <CardTitle className="text-lg font-black tracking-tight text-slate-800 dark:text-white uppercase tracking-widest leading-none">Sectoral Impact</CardTitle>
      </CardHeader>

      <CardContent className="p-6 flex-1 flex flex-col gap-6">
        <div className="h-[220px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={SECTOR_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={5} dataKey="value" stroke="none">
                {SECTOR_DATA.map((entry, index) => ( <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: 'none', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)', 
                  padding: '12px', 
                  backgroundColor: 'white', 
                  fontSize: '10px' 
                }}
                itemStyle={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">428.5</p>
            <p className="text-[8px] font-black uppercase tracking-[0.1em] text-slate-500">GWh Saved</p>
          </div>
        </div>

        <div className="space-y-3 flex-1 overflow-auto pr-2 custom-scrollbar">
          {SECTOR_DATA.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100/50 dark:border-slate-800/20 transition-all hover:bg-white dark:hover:bg-slate-800 group/row">
               <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <div>
                    <p className="text-[10px] font-black text-slate-800 dark:text-white uppercase tracking-tight leading-none mb-1">{item.name}</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{item.value}% Impact Share</p>
                  </div>
               </div>
               <div className="text-right">
                  <p className="text-[11px] font-black tabular-nums text-slate-900 dark:text-white leading-none flex items-center justify-end gap-1 group-hover/row:text-emerald-500 transition-colors">
                     <Zap size={10} className="text-emerald-500 fill-current" />
                     {item.saved} GWh
                  </p>
               </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-800/40 flex items-center justify-between mt-auto">
           <div className="flex items-center gap-3">
              <TrendingUp size={14} className="text-emerald-600 dark:text-emerald-400" />
              <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Growth Sector</p>
           </div>
           <p className="text-xs font-black text-emerald-700 dark:text-emerald-300 uppercase tracking-widest">Solar Manufacturing</p>
        </div>
      </CardContent>
    </Card>
  )
}

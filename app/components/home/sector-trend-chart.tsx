"use client"

import { useState, useMemo } from "react"
import { 
  LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, 
} from "recharts"
import { SECTOR_TREND_DATA } from "@/lib/mock-home-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Factory, TrendingUp, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const SECTORS = [
  { id: "Steel", color: "#3b82f6", label: "Steel" },
  { id: "Textiles", color: "#8b5cf6", label: "Textiles" },
  { id: "Chemicals", color: "#10b981", label: "Chemicals" },
  { id: "FMCG", color: "#f59e0b", label: "FMCG" },
  { id: "Food", color: "#f43f5e", label: "Food" },
]

export default function SectorTrendChart() {
  const [normalized, setNormalized] = useState(false)
  const [focusedSector, setFocusedSector] = useState<string | null>(null)

  const processedData = useMemo(() => {
    if (!normalized) return SECTOR_TREND_DATA
    return SECTOR_TREND_DATA.map(d => {
      const entry: any = { ...d }
      SECTORS.forEach(s => { entry[s.id] = Number((d[s.id as keyof typeof d] as number / (d.audits / 10)).toFixed(2)) })
      return entry
    })
  }, [normalized])

  const topPerformer = useMemo(() => {
    const latest = SECTOR_TREND_DATA[SECTOR_TREND_DATA.length - 1]
    let topId = SECTORS[0].id
    let max = 0
    SECTORS.forEach(s => { const val = latest[s.id as keyof typeof latest] as number; if (val > max) { max = val; topId = s.id } })
    return SECTORS.find(s => s.id === topId)
  }, [])

  return (
    <Card className="rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      <CardHeader className="p-6 pb-2">
        <div className="flex items-center justify-between gap-4 mb-4">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                 <Factory size={16} className="text-blue-700 dark:text-blue-400" />
              </div>
              <CardTitle className="text-base font-black tracking-tight uppercase tracking-widest text-slate-800">Sectoral Velocity</CardTitle>
           </div>
           
           <div className="flex items-center p-1 rounded-lg bg-slate-100 dark:bg-slate-800">
              <button onClick={() => setNormalized(false)} className={cn("text-[9px] font-black px-3 py-1 rounded-md uppercase transition-all", !normalized ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-700")}>Total</button>
              <button onClick={() => setNormalized(true)} className={cn("text-[9px] font-black px-3 py-1 rounded-md uppercase transition-all", normalized ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-700")}>Yield</button>
           </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-white/10 dark:bg-slate-100 flex items-center justify-center">
               <TrendingUp size={16} className="text-emerald-400 dark:text-emerald-600" />
            </div>
            <div>
               <p className="text-[8px] font-black uppercase tracking-widest opacity-60 leading-none mb-1">Vertical Leadership</p>
               <h4 className="text-xs font-black tracking-tight">{topPerformer?.label} Leading</h4>
            </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-2">
        <div className="flex flex-wrap gap-2 mb-4">
          {SECTORS.map((s) => (
            <button key={s.id} onClick={() => setFocusedSector(focusedSector === s.id ? null : s.id)} className={cn("flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all text-[9px] font-black uppercase tracking-widest", focusedSector === s.id ? "border-slate-800 bg-slate-800 text-white" : "border-slate-100 text-slate-400 bg-slate-50")}>
               <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
               {s.label}
            </button>
          ))}
        </div>

        <div className="h-[230px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={processedData} onMouseLeave={() => setFocusedSector(null)}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.08)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 800, fill: "rgba(148, 163, 184, 0.6)" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 800, fill: "rgba(148, 163, 184, 0.6)" }} unit={normalized ? "" : " G"} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', fontSize: '10px', padding: '12px' }} />
              {SECTORS.map((s) => (
                  <Line key={s.id} type="monotone" dataKey={s.id} name={s.label} stroke={s.color} strokeWidth={focusedSector === s.id ? 3 : focusedSector ? 1 : 2} strokeOpacity={focusedSector && focusedSector !== s.id ? 0.2 : 1} dot={false} activeDot={{ r: 4 }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

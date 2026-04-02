"use client"

import { useEffect, useState } from "react"
import { HOME_KPI_DATA } from "@/lib/mock-home-data"
import { TrendingUp, TrendingDown, Zap, Activity, Target, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

function CountUp({ end, duration = 2000, decimals = 0 }: { end: number, duration?: number, decimals?: number }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(progress * end)
      if (progress < 1) window.requestAnimationFrame(step)
    }
    window.requestAnimationFrame(step)
  }, [end, duration])
  return <span>{count.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</span>
}

export default function KPIStrip() {
  const data = [
    { label: "Energy Saved", value: HOME_KPI_DATA.totalEnergySaved.value, unit: "GWh", delta: HOME_KPI_DATA.totalEnergySaved.delta, icon: Zap, color: "emerald", decimals: 1 },
    { label: "Audits Done", value: HOME_KPI_DATA.totalAudits.value, unit: "", delta: HOME_KPI_DATA.totalAudits.delta, icon: Activity, color: "blue", decimals: 0 },
    { label: "Efficiency Gain", value: HOME_KPI_DATA.avgEfficiency.value, unit: "%", delta: HOME_KPI_DATA.avgEfficiency.delta, icon: Target, color: "amber", decimals: 1 },
    { label: "Active Ops", value: HOME_KPI_DATA.activeAudits.value, unit: "", delta: HOME_KPI_DATA.activeAudits.delta, icon: ShieldCheck, color: "indigo", decimals: 0 },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((item) => (
        <div key={item.label} className="group relative bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/60 dark:border-slate-800/60 shadow-sm overflow-hidden transition-all hover:bg-slate-50">
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                item.color === "emerald" ? "bg-emerald-50 text-emerald-600" :
                item.color === "blue" ? "bg-blue-50 text-blue-600" :
                item.color === "amber" ? "bg-amber-50 text-amber-600" : "bg-indigo-50 text-indigo-600"
              )}>
                <item.icon size={18} strokeWidth={2.5} />
              </div>
              <div className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest",
                item.delta > 0 ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
              )}>
                {item.delta > 0 ? <TrendingUp size={10} strokeWidth={3} /> : <TrendingDown size={10} strokeWidth={3} />}
                {Math.abs(item.delta)}%
              </div>
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 leading-none">{item.label}</p>
              <div className="flex items-baseline gap-1">
                <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-none tabular-nums">
                  <CountUp end={item.value} decimals={item.decimals} />
                </h3>
                {item.unit && <span className="text-[10px] font-black text-slate-400 uppercase">{item.unit}</span>}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

"use client"

import { useState } from "react"
import { HOME_KPI_DATA } from "@/lib/mock-home-data"
import { 
  ArrowRight, Activity, TrendingUp, Zap, 
  Wind, ShieldCheck, ChevronRight, Info
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NodeProps {
  icon: any
  value: string | number
  label: string
  unit?: string
  color: "blue" | "indigo" | "emerald" | "teal"
  delay?: string
  breakdown?: React.ReactNode
  tooltipContent?: string
}

const COLOR_MAP = {
  blue: { border: "group-hover:border-blue-500", text: "text-blue-500", bg: "bg-blue-500" },
  indigo: { border: "group-hover:border-indigo-500", text: "text-indigo-500", bg: "bg-indigo-500" },
  emerald: { border: "group-hover:border-emerald-500", text: "text-emerald-500", bg: "bg-emerald-500" },
  teal: { border: "group-hover:border-teal-500", text: "text-teal-500", bg: "bg-teal-500" }
}

function ConversionNode({ icon: Icon, value, label, unit, color, delay, breakdown, tooltipContent }: NodeProps) {
  const [hovered, setHovered] = useState(false)
  const colors = COLOR_MAP[color]

  return (
    <div className={cn("relative flex flex-col items-center group transition-all duration-700 animate-in fade-in slide-in-from-bottom-2", delay)} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="relative">
        <div className={cn("w-32 h-32 rounded-3xl flex flex-col items-center justify-center p-6 transition-all duration-300 shadow-sm relative z-10 overflow-hidden bg-white dark:bg-slate-900 border-2", hovered ? `${colors.border} scale-105` : "border-slate-100 dark:border-slate-800")}>
          <div className={cn("absolute inset-0 z-0 opacity-0 transition-opacity duration-300", hovered && "opacity-[0.05]", colors.bg)} />
          <Icon className={cn("w-6 h-6 mb-3 transition-transform duration-300", colors.text, hovered && "scale-110 -rotate-3")} strokeWidth={2.5} />
          <p className="text-2xl font-black tracking-tighter tabular-nums text-slate-900 dark:text-white leading-none mb-1 text-center truncate w-full">{value}<span className="text-[10px] font-black text-slate-400 ml-1">{unit}</span></p>
        </div>
        <div className="mt-4 text-center">
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 leading-none mb-2">{label}</p>
          {breakdown && <div className="flex items-center justify-center gap-2">{breakdown}</div>}
        </div>
        {hovered && tooltipContent && (
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 p-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xl z-[100] text-[10px] font-medium leading-normal animate-in zoom-in-95 fade-in duration-200"><div className="flex items-center gap-2 mb-2"><Info size={10} className={colors.text} /><span className="font-black uppercase tracking-widest opacity-60">Insight</span></div>{tooltipContent}<div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-slate-900 dark:bg-white" /></div>
        )}
      </div>
    </div>
  )
}

function Connector({ color, delay }: { color: "blue" | "emerald" | "teal", delay: string }) {
  const colors = COLOR_MAP[color]
  return (
    <div className={cn("hidden lg:flex flex-1 items-center justify-center mb-16 animate-in fade-in duration-1000", delay)}>
      <div className="relative w-full h-[1px] bg-slate-100 dark:bg-slate-800 overflow-hidden max-w-[60px]"><div className={cn("absolute inset-0 animate-shimmer", colors.bg)} style={{ width: '40%' }} /></div>
      <div className={cn("w-7 h-7 rounded-full flex items-center justify-center bg-white dark:bg-slate-900 border shadow-sm z-20 transition-all duration-300 border-slate-200 text-slate-300 group-hover:border-primary group-hover:text-primary", `border-${color}-500 text-${color}-500`)}><ChevronRight size={14} strokeWidth={3} /></div>
    </div>
  )
}

export default function EnergyConversionLayer() {
  const d = HOME_KPI_DATA
  const co2Reduced = (d.totalEnergySaved.value * 0.705).toFixed(1)
  return (
    <div className="relative bg-white dark:bg-slate-950 rounded-[3rem] border border-slate-200/40 dark:border-slate-800/40 p-10 shadow-sm overflow-hidden">
      <div className="relative z-10 text-center mb-12">
         <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase tracking-widest">The Intelligence Loop</h2>
         <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 font-medium max-w-xl mx-auto leading-relaxed italic opacity-60">Transformation lifecycle from raw audits to national energy conservation.</p>
      </div>
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto">
         <ConversionNode icon={Activity} value={d.totalAudits.value} label="Audits" color="blue" delay="delay-100" breakdown={<><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /><span className="text-[8px] font-bold text-slate-500">68% DEA</span></>} tooltipContent="Volume of industrial assessments performed across national clusters." />
         <Connector color="blue" delay="delay-200" />
         <ConversionNode icon={TrendingUp} value={d.avgEfficiency.value} unit="%" label="Yield" color="indigo" delay="delay-300" breakdown={<div className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-[8px] font-black uppercase tracking-widest">+2.1%</div>} tooltipContent="Average realized energy intensity reduction identified." />
         <Connector color="emerald" delay="delay-500" />
         <ConversionNode icon={Zap} value={d.totalEnergySaved.value} unit=" GWh" label="Impact" color="emerald" delay="delay-700" breakdown={<div className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[8px] font-black uppercase tracking-widest">Live</div>} tooltipContent="Cumulative verified energy conservation achieved." />
         <Connector color="teal" delay="delay-1000" />
         <ConversionNode icon={Wind} value={co2Reduced} unit=" kT" label="Carbon Offset" color="teal" delay="delay-1000" breakdown={<div className="text-[8px] font-bold text-slate-400">ISO 14064</div>} tooltipContent="Equivalent CO2 reduction calculated based on national grid emission factors." />
      </div>
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto pt-8 border-t border-slate-50 dark:border-slate-800">
        {[
          { label: "Audit Accuracy", value: "98.2%" },
          { label: "Cluster Hubs", value: "12 Areas" },
          { label: "Payback ROI", value: "1.4 Yrs" },
          { label: "Green Certs", value: "840" },
        ].map((stat, i) => (
          <div key={stat.label} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 transition-all text-center">
            <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
            <p className="text-lg font-black text-slate-900 dark:text-white leading-none">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

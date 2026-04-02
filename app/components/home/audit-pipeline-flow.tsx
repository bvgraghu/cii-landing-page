"use client"

import { PIPELINE_DATA } from "@/lib/mock-home-data"
import { cn } from "@/lib/utils"
import { CheckCircle2, Info, AlertCircle } from "lucide-react"

function Step({ id, label, count, wt, dea, highlight, isLast }: any) {
  const isBottleneck = highlight === "bottleneck"
  
  return (
    <div className="flex-1 min-w-[120px] relative">
      <div className="flex items-center gap-2 mb-3">
        <div className={cn(
          "w-7 h-7 rounded-lg flex items-center justify-center z-10 transition-all shadow-sm",
          isBottleneck ? "bg-amber-500 text-white" : id === "approved" ? "bg-emerald-500 text-white" : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400"
        )}>
          {id === "approved" ? <CheckCircle2 size={14} /> : id === "review" ? <Info size={14} /> : id === "in-progress" ? <AlertCircle size={14} /> : <div className="w-1 h-1 rounded-full bg-current" />}
        </div>
        {!isLast && <div className="flex-1 h-px border-t border-dashed border-slate-200 dark:border-slate-800" />}
      </div>

      <div className="space-y-3">
        <div>
          <h4 className={cn("text-[8px] font-black uppercase tracking-widest leading-none mb-1", isBottleneck ? "text-amber-600" : "text-slate-400")}>{label}</h4>
          <div className="flex items-baseline gap-1">
            <p className="text-lg font-black tabular-nums text-slate-800 dark:text-white leading-none">{count.toLocaleString()}</p>
            {isBottleneck && <span className="text-[7px] font-black px-1 py-0.5 rounded bg-amber-100 text-amber-600 uppercase tracking-tighter">Bottleneck</span>}
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-[8px] font-bold text-slate-400 group-hover:text-slate-600">
             <span>WT</span><span className="tabular-nums text-slate-700">{wt.toLocaleString()}</span>
          </div>
          <div className="w-full h-0.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden"><div className="h-full bg-blue-500" style={{ width: `${(wt / count) * 100}%` }} /></div>
          
          <div className="flex justify-between text-[8px] font-bold text-slate-400 group-hover:text-slate-600">
             <span>DEA</span><span className="tabular-nums text-slate-700">{dea.toLocaleString()}</span>
          </div>
          <div className="w-full h-0.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: `${(dea / count) * 100}%` }} /></div>
        </div>
      </div>
    </div>
  )
}

export default function AuditPipelineFlow() {
  const data = PIPELINE_DATA
  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 p-6 shadow-sm overflow-hidden">
      <div className="relative flex flex-wrap lg:flex-nowrap gap-6 justify-between z-10">
        {data.map((step, idx) => ( <Step key={step.id} {...step} isLast={idx === data.length - 1} /> ))}
      </div>
    </div>
  )
}

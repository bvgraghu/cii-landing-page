"use client"

import { useState } from "react"
import { TOP_DISTRICTS } from "@/lib/mock-home-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Star, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

export default function TopPerformers() {
  const [activeMetric, setActiveMetric] = useState<"saved" | "efficiency">("saved")
  
  return (
    <Card className="rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-sm overflow-hidden flex flex-col h-full group">
      <CardHeader className="p-6 pb-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center transition-transform">
            <Trophy size={16} className="text-amber-600 dark:text-amber-400" />
          </div>
          <CardTitle className="text-lg font-black tracking-tight text-slate-800 dark:text-white uppercase tracking-widest">Leadership</CardTitle>
        </div>

        <div className="flex items-center p-1 rounded-lg bg-slate-100 dark:bg-slate-800">
          <button 
            onClick={() => setActiveMetric("saved")}
            className={cn("text-[9px] font-black px-4 py-1.5 rounded-md uppercase transition-all", activeMetric === "saved" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-700")}
          >
            Energy
          </button>
          <button 
            onClick={() => setActiveMetric("efficiency")}
            className={cn("text-[9px] font-black px-4 py-1.5 rounded-md uppercase transition-all", activeMetric === "efficiency" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-700")}
          >
            Efficiency
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-4 space-y-6 flex-1">
        {TOP_DISTRICTS.map((district, idx) => (
          <div key={district.name} className="space-y-2 group/item">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className={cn(
                   "w-8 h-8 rounded-lg flex items-center justify-center border",
                   idx === 0 ? "bg-amber-50 border-amber-200 text-amber-600" : "bg-slate-50 border-slate-100 text-slate-400"
                 )}>
                    {idx === 0 ? <Trophy size={14} className="fill-current" /> : <Star size={14} className="fill-current" />}
                 </div>
                 <div>
                    <h4 className="text-[10px] font-black text-slate-800 dark:text-white uppercase tracking-tight leading-none mb-1">{district.name}</h4>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none">Rank 0{idx+1}</p>
                 </div>
              </div>
              
              <div className="text-right flex flex-col items-end gap-0.5">
                <span className="text-lg font-black tabular-nums tracking-tighter text-slate-900 dark:text-white leading-none">
                  {activeMetric === "saved" ? `${district.saved}` : `${district.efficiency}`}
                  <span className="text-[9px] font-bold ml-1 text-slate-400 uppercase">{activeMetric === "saved" ? "GWh" : "%"}</span>
                </span>
              </div>
            </div>
            
            <div className="relative h-1.5 rounded-full bg-slate-50 dark:bg-slate-800 overflow-hidden">
               <div 
                 className={cn("absolute top-0 left-0 h-full transition-all duration-1000", activeMetric === "saved" ? "bg-emerald-500" : "bg-blue-600")}
                 style={{ width: activeMetric === "saved" ? `${(district.saved / TOP_DISTRICTS[0].saved) * 100}%` : `${(district.efficiency / 35) * 100}%` }}
               />
            </div>
          </div>
        ))}
        
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[8px] font-bold text-slate-400 uppercase tracking-widest">
           <div className="flex items-center gap-2">
              <Zap size={10} className="text-amber-500 fill-current" />
              <span>Real-time Sync</span>
           </div>
           <button className="hover:text-amber-500 transition-colors uppercase font-black">View All</button>
        </div>
      </CardContent>
    </Card>
  )
}

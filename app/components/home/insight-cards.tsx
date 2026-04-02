"use client"

import { INSIGHT_CARDS } from "@/lib/mock-home-data"
import { TrendingUp, Award, Zap, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

export default function InsightCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
      {INSIGHT_CARDS.map((card) => (
        <div key={card.id} className={cn(
          "relative group overflow-hidden p-8 rounded-[2.5rem] border transition-all duration-300",
          card.type === "impact" 
            ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/40" 
            : "bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/40"
        )}>
          <div className="absolute top-0 right-0 p-10 opacity-[0.03] dark:opacity-[0.08] transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-700">
            {card.type === "impact" ? <TrendingUp size={120} strokeWidth={3} /> : <Award size={120} strokeWidth={3} />}
          </div>
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center",
                card.type === "impact" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
              )}>
                {card.type === "impact" ? <Zap size={20} className="fill-current" /> : <ShieldCheck size={20} className="fill-current" />}
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{card.label}</p>
            </div>
            
            <div className="mt-auto">
              <h3 className={cn(
                "text-4xl font-black mb-3 tracking-tighter leading-none transition-transform duration-300 group-hover:translate-x-1",
                card.type === "impact" ? "text-emerald-700 dark:text-emerald-300" : "text-blue-700 dark:text-blue-300"
              )}>
                {card.value}
              </h3>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 leading-relaxed max-w-[85%]">
                {card.text}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

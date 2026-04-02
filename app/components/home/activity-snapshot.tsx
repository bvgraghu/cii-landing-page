"use client"

import { RECENT_ACTIVITY } from "@/lib/mock-home-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, ChevronRight, Activity } from "lucide-react"

export default function ActivitySnapshot() {
  const upcoming = RECENT_ACTIVITY.slice(3)
  const recent = RECENT_ACTIVITY.slice(0, 3)

  return (
    <Card className="rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-2xl shadow-slate-200/50 dark:shadow-black/20 h-full flex flex-col overflow-hidden">
      <CardHeader className="p-8 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
            <Clock size={16} className="text-indigo-600 dark:text-indigo-400" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Timeline</p>
        </div>
        <CardTitle className="text-xl font-black tracking-tight text-slate-900 dark:text-white leading-none">Activity Snapshot</CardTitle>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">Logistics and execution timeline</p>
      </CardHeader>

      <CardContent className="p-8 flex-1 space-y-10">
        <div>
           <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Recently Completed</h4>
           </div>
           <div className="space-y-4">
              {recent.map((item) => (
                <div key={item.company} className="relative pl-6 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-px before:bg-slate-100 dark:before:bg-slate-800 last:before:h-2">
                   <div className="absolute left-[-2.5px] top-2 w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700" />
                   <div>
                      <p className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-tight">{item.company}</p>
                      <div className="flex items-center gap-2 mt-1">
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.type}</span>
                         <span className="w-1 h-1 rounded-full bg-slate-300" />
                         <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">{item.date}</span>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div>
           <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Upcoming Visits</h4>
           </div>
           <div className="space-y-4">
              {upcoming.map((item) => (
                <div key={item.company} className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100/50 dark:border-slate-800/40 hover:border-blue-200 dark:hover:border-blue-800 transition-all group">
                   <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center p-2 group-hover:bg-blue-500 transition-colors">
                             <Calendar size={18} className="text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                          </div>
                          <div>
                            <p className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-tight">{item.company}</p>
                            <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight mt-0.5">{item.type} • Tomorrow</p>
                          </div>
                       </div>
                       <ChevronRight size={14} className="text-slate-300 dark:text-slate-700 group-hover:text-blue-600 transition-colors" />
                   </div>
                </div>
              ))}
           </div>
        </div>
      </CardContent>
    </Card>
  )
}

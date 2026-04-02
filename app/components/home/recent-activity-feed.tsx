"use client"

import { RECENT_ACTIVITY } from "@/lib/mock-home-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Download, ListFilter, Search } from "lucide-react"

export default function RecentActivityFeed() {
  return (
    <Card className="rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-3xl shadow-2xl shadow-slate-200/50 dark:shadow-black/20 overflow-hidden flex flex-col h-full">
      <CardHeader className="p-8 pb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
           <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <Activity size={16} className="text-slate-600 dark:text-slate-400" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 font-black">Audit Stream</p>
          </div>
          <CardTitle className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Recent Activity Feed</CardTitle>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">Latest updates from the audit operations pipeline</p>
        </div>

        <div className="flex items-center gap-3">
           <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search Audits..." 
                className="bg-slate-50 dark:bg-slate-800 rounded-full py-2.5 pl-10 pr-4 text-[10px] font-bold uppercase tracking-widest border-none focus:ring-2 focus:ring-emerald-500/20 w-[200px] transition-all"
              />
           </div>
           <button className="w-10 h-10 p-0 rounded-full bg-slate-50 dark:bg-slate-800 border-none flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"><ListFilter size={16}/></button>
           <button className="w-10 h-10 p-0 rounded-full bg-slate-50 dark:bg-slate-800 border-none flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"><Download size={16}/></button>
        </div>
      </CardHeader>

      <CardContent className="p-8 flex-1">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <th className="pb-4 px-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Industry / MSME</th>
                <th className="pb-4 px-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Type</th>
                <th className="pb-4 px-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Impact</th>
                <th className="pb-4 px-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="pb-4 px-2 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50/50 dark:divide-slate-800/30">
              {RECENT_ACTIVITY.map((activity, idx) => (
                <tr key={idx} className="group transition-all hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-5 px-2">
                    <p className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {activity.company}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-tight">Active Operation</p>
                  </td>
                  <td className="py-5 px-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1">
                      {activity.type}
                    </span>
                  </td>
                  <td className="py-5 px-2">
                     <div className="flex items-center gap-1.5">
                        <div className="flex gap-0.5">
                           {[1,2,3].map(v => (
                             <div key={v} className={`w-1.5 h-1.5 rounded-full ${activity.impact === "High" || activity.impact === "Ultra" ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-700"}`} />
                           ))}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-tight text-slate-400">{activity.impact}</span>
                     </div>
                  </td>
                  <td className="py-5 px-2">
                    <Badge variant="outline" className={`
                      rounded-full px-3 py-1 border-none text-[10px] font-black uppercase tracking-widest
                      ${activity.status === "Approved" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" : 
                        activity.status === "In Review" ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" : 
                        "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"}
                    `}>
                      {activity.status}
                    </Badge>
                  </td>
                  <td className="py-5 px-2 text-right">
                    <p className="text-xs font-black tabular-nums text-slate-900 dark:text-white">{activity.date}</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-tight">Processed</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

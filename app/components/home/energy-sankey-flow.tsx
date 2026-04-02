"use client"

import { useState } from "react"
import { Sankey, Tooltip, ResponsiveContainer, Rectangle, Layer } from "recharts"
import { SANKEY_DATA } from "@/lib/mock-home-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share2, Info, Maximize2, Download, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const SHADES: any = {
  "Walkthrough Audits": "#60a5fa",
  "Detailed Audits (DEA)": "#2563eb",
  "Textiles": "#a78bfa",
  "Steel & Metals": "#8b5cf6",
  "FMCG": "#7c3aed",
  "Chemicals": "#6d28d9",
  "Hyderabad": "#34d399",
  "Rangareddy": "#10b981",
  "Medchal": "#059669",
  "Sangareddy": "#047857",
  "Others": "#064e3b",
}

export default function EnergySankeyFlow() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <Card className="rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      <CardHeader className="p-6 pb-2">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                <Share2 size={16} className="text-indigo-600 dark:text-indigo-400" />
             </div>
             <CardTitle className="text-base font-black tracking-tight uppercase tracking-widest text-slate-800">Ecosystem Flow</CardTitle>
          </div>

          <div className="flex items-center gap-2">
             <button className="h-8 px-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 text-[8px] font-black uppercase tracking-widest hover:bg-slate-100 hover:text-slate-900 flex items-center gap-2 transition-all">
                <Download size={12} /> CSV Export
             </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-[8px] font-black uppercase tracking-[0.1em] pt-4 border-t border-slate-100 dark:border-slate-800/40">
           {[{ label: "Audit", color: "bg-blue-500" }, { label: "Sector", color: "bg-violet-500" }, { label: "Geo", color: "bg-emerald-500" }].map(l => (
             <div key={l.label} className="flex items-center gap-1.5 opacity-60">
                <div className={cn("w-2 h-2 rounded-full", l.color)} />
                <span>{l.label}</span>
             </div>
           ))}
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-6">
        <div className="h-[380px] w-full bg-slate-50/50 dark:bg-slate-950/20 rounded-2xl p-6 border border-slate-100 dark:border-slate-800/60 relative">
          <ResponsiveContainer width="100%" height="100%">
            <Sankey
              data={SANKEY_DATA}
              node={<CustomNode />}
              link={<CustomLink activeIndex={activeIndex} setActiveIndex={setActiveIndex} />}
              nodePadding={25}
              margin={{ top: 20, left: 60, right: 60, bottom: 20 }}
            >
              <Tooltip content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    const isNode = data.name !== undefined && data.source === undefined
                    return (
                      <div className="bg-slate-900 text-white p-4 rounded-xl shadow-2xl border border-slate-800 min-w-[200px] text-[10px]">
                        {isNode ? (
                          <>
                             <p className="font-black uppercase tracking-widest opacity-60 mb-1">Ecosystem Node</p>
                             <h4 className="text-sm font-black mb-2">{data.name}</h4>
                             <div className="flex items-center justify-between"><span className="opacity-60 uppercase font-black">Impact Yield</span><span className="font-black text-emerald-400">{data.value.toFixed(1)} GWh</span></div>
                          </>
                        ) : (
                          <>
                             <p className="font-black uppercase tracking-widest opacity-60 mb-1">Flow Intelligence</p>
                             <div className="flex items-center gap-2 mb-3">
                                <span className="font-black uppercase">{data.source.name}</span>
                                <ChevronRight size={10} className="opacity-40" />
                                <span className="font-black uppercase">{data.target.name}</span>
                             </div>
                             <div className="flex items-center justify-between"><span className="opacity-60 uppercase font-black">Contribution</span><span className="font-black text-emerald-400">{data.value.toFixed(1)} GWh</span></div>
                          </>
                        )}
                      </div>
                    )
                  }
                  return null
              }} />
            </Sankey>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

function CustomNode({ x, y, width, height, payload, depth }: any) {
  const isAudit = payload.type === "audit"
  const isSector = payload.type === "sector"
  const isRightSide = depth > 1
  return (
    <Layer>
      <Rectangle x={x} y={y} width={width} height={height} fill={SHADES[payload.name] || "#cbd5e1"} fillOpacity={0.9} radius={[2, 2, 2, 2]} />
      <text x={isRightSide ? x + width + 8 : x - 8} y={y + height / 2} textAnchor={isRightSide ? "start" : "end"} fontSize="8" fontWeight="900" fill={isAudit ? "#3b82f6" : isSector ? "#8b5cf6" : "#10b981"} className="uppercase tracking-tighter select-none" dy=".35em">{payload.name}</text>
    </Layer>
  )
}

function CustomLink({ sourceX, sourceY, targetX, targetY, linkWidth, index, activeIndex, setActiveIndex, payload }: any) {
  const isActive = activeIndex === index
  const isOthersMuted = activeIndex !== null && activeIndex !== index
  const path = `M${sourceX},${sourceY}C${(sourceX + targetX) / 2},${sourceY} ${(sourceX + targetX) / 2},${targetY} ${targetX},${targetY}`
  return (
    <path d={path} fill="none" stroke={SHADES[payload.source.name] || "#e2e8f0"} strokeWidth={Math.max(linkWidth, 1.5)} strokeOpacity={isActive ? 0.6 : isOthersMuted ? 0.05 : 0.25} onMouseEnter={() => setActiveIndex(index)} onMouseLeave={() => setActiveIndex(null)} className="transition-all duration-300 cursor-pointer" />
  )
}

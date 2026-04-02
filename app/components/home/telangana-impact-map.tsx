"use client"

import { useEffect, useState, useRef, useMemo } from "react"
import { TELANGANA_DISTRICT_DATA } from "@/lib/mock-home-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Map as MapIcon, Layers, Info, MousePointer2, LayoutGrid, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { TELANGANA_SVG_URL, SVG_NAME_TO_DISTRICT } from "@/components/dashboard/telangana-map-data"

const CATEGORIES = [
   { id: "saved", label: "Energy", unit: "GWh", color: "#10b981", bg: "bg-emerald-50 text-emerald-600" },
   { id: "audits", label: "Audits", unit: "Count", color: "#3b82f6", bg: "bg-blue-50 text-blue-600" },
   { id: "efficiency", label: "Efficiency", unit: "%", color: "#f59e0b", bg: "bg-amber-50 text-amber-600" },
]

export default function TelanganaImpactMap() {
   const svgContainerRef = useRef<HTMLDivElement>(null)
   const [svgLoaded, setSvgLoaded] = useState(false)
   const [activeCategory, setActiveCategory] = useState("saved")
   const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null)
   const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
   const categoryConfig = CATEGORIES.find(c => c.id === activeCategory)!

   const maxValue = useMemo(() => {
      let max = 0
      Object.values(TELANGANA_DISTRICT_DATA).forEach((m) => {
         const val = (m as any)[activeCategory] as number
         if (val > max) max = val
      })
      return max
   }, [activeCategory])

   function getHeatColor(value: number, max: number, baseColor: string): string {
      if (max === 0) return "#f8fafc"
      const ratio = Math.min(value / max, 1)
      const h = activeCategory === "saved" ? 150 : activeCategory === "audits" ? 210 : 35
      const s = 60 + ratio * 20
      const l = 95 - ratio * 50
      return `hsl(${h}, ${s}%, ${l}%)`
   }

   useEffect(() => {
      const container = svgContainerRef.current
      if (!container) return

      fetch(TELANGANA_SVG_URL)
         .then((res) => res.text())
         .then((svgText) => {
            const parser = new DOMParser()
            const doc = parser.parseFromString(svgText, "image/svg+xml")
            const svg = doc.querySelector("svg")
            if (!svg) return
            svg.setAttribute("viewBox", "0 0 928 875")
            svg.setAttribute("class", "w-full h-full p-2")
            svg.style.maxHeight = "380px"
            svg.style.overflow = "visible"
            const firstPath = svg.querySelector("path:not([name])")
            if (firstPath) firstPath.remove()
            svg.querySelectorAll("path[name]").forEach((path) => {
               const el = path as SVGPathElement
               const svgName = el.getAttribute("name") || ""
               const districtName = SVG_NAME_TO_DISTRICT[svgName] || svgName
               el.style.cursor = "pointer"
               el.style.transition = "fill 0.3s ease, stroke 0.2s ease"
               el.style.stroke = "white"
               el.style.strokeWidth = "1"
               el.addEventListener("mouseenter", (e) => {
                  setHoveredDistrict(districtName)
                  const rect = container.getBoundingClientRect()
                  setTooltipPos({ x: (e as MouseEvent).clientX - rect.left, y: (e as MouseEvent).clientY - rect.top })
                  el.style.strokeWidth = "2"
                  el.style.stroke = "rgba(0,0,0,0.2)"
               })
               el.addEventListener("mousemove", (e) => {
                  const rect = container.getBoundingClientRect()
                  setTooltipPos({ x: (e as MouseEvent).clientX - rect.left, y: (e as MouseEvent).clientY - rect.top })
               })
               el.addEventListener("mouseleave", () => {
                  setHoveredDistrict(null)
                  el.style.strokeWidth = "1"
                  el.style.stroke = "white"
               })
            })
            container.innerHTML = ""
            container.appendChild(svg)
            setSvgLoaded(true)
         })
   }, [])

   useEffect(() => {
      const container = svgContainerRef.current
      if (!container || !svgLoaded) return
      container.querySelectorAll("path[name]").forEach((path) => {
         const el = path as SVGPathElement
         const svgName = el.getAttribute("name") || ""
         const districtName = SVG_NAME_TO_DISTRICT[svgName] || svgName
         const m = TELANGANA_DISTRICT_DATA[districtName]
         if (m) {
            const val = (m as any)[activeCategory] as number
            el.style.fill = getHeatColor(val, maxValue, categoryConfig.color)
         } else { el.style.fill = "#f8fafc" }
      })
   }, [svgLoaded, activeCategory, maxValue])

   return (
      <Card className="rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
         <CardHeader className="p-6 pb-2 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
               <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center p-2", categoryConfig.bg)}>
                  <MapIcon size={16} />
               </div>
               <CardTitle className="text-base font-black tracking-tight uppercase tracking-widest leading-none">Telangana Impact</CardTitle>
            </div>
            <div className="flex gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-800">
               {CATEGORIES.map((cat) => (
                  <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={cn("text-[9px] font-black px-3 py-1 rounded-md uppercase transition-all", activeCategory === cat.id ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-700")}>{cat.label}</button>
               ))}
            </div>
         </CardHeader>

         <CardContent className="p-6 pt-4 flex flex-col lg:flex-row gap-8">
            <div className="flex-1 bg-slate-50/50 dark:bg-slate-950/20 rounded-2xl border border-slate-100 dark:border-slate-800/60 p-4 relative overflow-hidden flex items-center justify-center min-h-[380px]">
               <div ref={svgContainerRef} className="w-full h-full flex items-center justify-center relative z-10" />
               <div className="absolute bottom-6 left-6 flex items-center gap-2 text-[8px] font-black uppercase text-slate-400">
                  <span>Low Intensity</span><div className="flex gap-0.5">{[0.2, 0.4, 0.6, 0.8].map(o => <div key={o} className="w-4 h-1 rounded-full" style={{ backgroundColor: categoryConfig.color, opacity: o }} />)}</div><span>High</span>
               </div>
            </div>

            <div className="lg:w-[320px] space-y-4">
               <div className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 p-6 rounded-2xl shadow-lg">
                  <p className="text-[9px] font-black uppercase tracking-widest text-emerald-400 mb-4 tracking-[0.2em]">Top Performers</p>
                  <div className="space-y-4">
                     {Object.entries(TELANGANA_DISTRICT_DATA).slice(0, 4).map(([region, metrics], idx) => (
                        <div key={region} className="space-y-1.5">
                           <div className="flex justify-between text-[10px] font-bold uppercase tracking-tight"><span>{region}</span><span>{(metrics as any)[activeCategory]} {categoryConfig.unit}</span></div>
                           <div className="h-1 rounded-full bg-slate-800 dark:bg-slate-200"><div className="h-full bg-emerald-500" style={{ width: `${((metrics as any)[activeCategory] / maxValue) * 100}%` }} /></div>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-4">Operations Feed</h4>
                  <div className="space-y-3">
                     {[ { name: "Hyderabad Central", value: "34.5%" }, { name: "Warangal Corridor", value: "22.2%" }].map(cluster => (
                        <div key={cluster.name} className="flex justify-between text-[10px] font-bold p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                           <span className="text-slate-500 uppercase">{cluster.name}</span><span className="text-emerald-500">{cluster.value}</span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </CardContent>

         {hoveredDistrict && TELANGANA_DISTRICT_DATA[hoveredDistrict] && (
            <div className="absolute pointer-events-none z-[100] transform" style={{ left: tooltipPos.x + 20, top: tooltipPos.y - 10 }}>
               <div className="bg-slate-900 text-white p-4 rounded-xl shadow-xl min-w-[200px] border border-slate-800 text-[10px]">
                  <p className="opacity-60 uppercase font-black mb-1">District Info</p>
                  <p className="text-sm font-black mb-3">{hoveredDistrict}</p>
                  <div className="flex justify-between mb-1"><span>Energy</span><span className="font-black">{TELANGANA_DISTRICT_DATA[hoveredDistrict].saved} GWh</span></div>
                  <div className="flex justify-between"><span>Efficiency</span><span className="font-black">{TELANGANA_DISTRICT_DATA[hoveredDistrict].efficiency}%</span></div>
               </div>
            </div>
          )}
      </Card>
   )
}

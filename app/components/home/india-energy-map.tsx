"use client"

import { useState, useMemo } from "react"
import { INDIA_REGIONAL_DATA } from "@/lib/mock-home-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Map as MapIcon, Layers, Info } from "lucide-react"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  { id: "saved", label: "Energy Saved", unit: "GWh", color: "#10b981", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
  { id: "audits", label: "Audit Count", unit: "Count", color: "#3b82f6", bg: "bg-blue-100 dark:bg-blue-900/30" },
  { id: "efficiency", label: "Efficiency %", unit: "%", color: "#f59e0b", bg: "bg-amber-100 dark:bg-amber-900/30" },
]

export default function IndiaEnergyMap() {
  const [activeCategory, setActiveCategory] = useState("saved")
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  
  const categoryConfig = CATEGORIES.find(c => c.id === activeCategory)!
  
  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPos({ x: e.clientX, y: e.clientY })
  }

  return (
    <Card className="rounded-[3rem] border border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-3xl shadow-2xl shadow-slate-200/50 dark:shadow-black/20 overflow-hidden">
      <CardHeader className="p-10 pb-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="space-y-2">
           <div className="flex items-center gap-2 mb-2">
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center transition-colors", categoryConfig.bg)}>
              <MapIcon size={18} className={cn(activeCategory === "saved" ? "text-emerald-600 dark:text-emerald-400" : activeCategory === "audits" ? "text-blue-600 dark:text-blue-400" : "text-amber-600 dark:text-amber-400")} />
            </div>
            <p className={cn("text-xs font-black uppercase tracking-widest leading-none", activeCategory === "saved" ? "text-emerald-600 dark:text-emerald-400" : activeCategory === "audits" ? "text-blue-600 dark:text-blue-400" : "text-amber-600 dark:text-amber-400")}>
               Regional Performance
            </p>
          </div>
          <CardTitle className="text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-[0.95]">
             National Energy Impact <br /> Geographic Distribution
          </CardTitle>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mt-2 font-medium">
             Spatial visualization of audit operations and energy conservation progress across India's states and industrial clusters.
          </p>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 p-1 rounded-full bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
          {CATEGORIES.map((cat) => (
            <Button 
              key={cat.id}
              variant="ghost" 
              size="sm" 
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "rounded-full text-[10px] font-black px-5 transition-all h-9 uppercase tracking-widest",
                activeCategory === cat.id ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-lg" : "text-slate-500 hover:text-slate-700"
              )}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-10 pt-4 flex flex-col lg:flex-row gap-12 min-h-[600px]">
        {/* Simplified Map Area - Functional Representation */}
        <div className="flex-1 bg-slate-50 dark:bg-slate-950/40 rounded-[2.5rem] border border-slate-200/40 dark:border-slate-800/30 p-12 relative group" onMouseMove={handleMouseMove}>
           <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              {/* Replace with a high-quality SVG in a real app, here we will create a high-impact placeholder with interactive points */}
              <div className="relative w-full h-full max-w-[500px] max-h-[600px] flex items-center justify-center">
                 {/* Decorative India Map Silhouette placeholder */}
                 <div className="absolute inset-0 opacity-10 dark:opacity-20 flex items-center justify-center scale-110 blur-[1px]">
                    <svg viewBox="0 0 200 240" className="w-full h-full fill-slate-300 dark:fill-slate-700">
                       <path d="M70,20 L100,10 L130,20 L140,50 L160,70 L180,100 L170,150 L140,200 L100,230 L60,200 L30,150 L20,100 L40,50 Z" />
                    </svg>
                 </div>
                 
                 {/* Impact Points across India */}
                 {Object.entries(INDIA_REGIONAL_DATA).map(([region, metrics], idx) => {
                    const posRatio = idx / Object.keys(INDIA_REGIONAL_DATA).length
                    const angle = posRatio * Math.PI * 2
                    const rx = Math.sin(angle) * 150 + (idx % 2 === 0 ? 30 : -30)
                    const ry = Math.cos(angle) * 200 + (idx % 3 === 0 ? 40 : -20)
                    const normalizedX = 250 + rx * 0.8
                    const normalizedY = 300 + ry * 0.8
                    
                    const value = (metrics as any)[activeCategory]
                    const size = activeCategory === "saved" ? 30 + value * 4 : activeCategory === "audits" ? 30 + value * 0.1 : 30 + value * 0.5
                    
                    return (
                        <div 
                          key={region}
                          className="absolute transition-all duration-700 ease-out cursor-pointer z-10"
                          style={{
                            left: `${normalizedX}px`,
                            top: `${normalizedY}px`,
                            transform: `translate(-50%, -50%)`,
                          }}
                          onMouseEnter={() => setHoveredRegion(region)}
                          onMouseLeave={() => setHoveredRegion(null)}
                        >
                           <div className="relative flex items-center justify-center">
                              <div 
                                className={cn(
                                    "rounded-full transition-all duration-500",
                                    activeCategory === "saved" ? "bg-emerald-500/20" : activeCategory === "audits" ? "bg-blue-500/20" : "bg-amber-500/20",
                                    hoveredRegion === region ? "scale-150 animate-glow" : "scale-100"
                                )}
                                style={{ width: size, height: size }}
                              />
                              <div 
                                className={cn(
                                    "absolute rounded-full transition-all duration-300",
                                    activeCategory === "saved" ? "bg-emerald-600 shadow-xl shadow-emerald-500/30" : activeCategory === "audits" ? "bg-blue-600 shadow-xl shadow-blue-500/30" : "bg-amber-600 shadow-xl shadow-amber-500/30",
                                    hoveredRegion === region ? "w-4 h-4" : "w-3 h-3"
                                )}
                              />
                              
                              {hoveredRegion === region && (
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest shadow-2xl">
                                    {region}
                                </div>
                              )}
                           </div>
                        </div>
                    )
                 })}
              </div>
           </div>
           
           <div className="absolute bottom-10 left-10 p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 backdrop-blur-lg">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Metrics Layer</p>
              <div className="flex items-center gap-3">
                 <span className="text-xs text-slate-500 uppercase font-black">Low</span>
                 <div className="flex gap-1 h-2">
                    {[1,2,3,4,5,6].map(v => (
                        <div key={v} className="w-4 h-full rounded-sm" style={{ backgroundColor: categoryConfig.color, opacity: v/10 + 0.2 }} />
                    ))}
                 </div>
                 <span className="text-xs text-slate-500 uppercase font-black">High</span>
              </div>
           </div>
           
           <div className="absolute top-10 right-10 flex flex-col gap-2">
              <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-xl bg-white dark:bg-slate-800 border-slate-200 shadow-sm"><Layers size={16}/></Button>
              <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-xl bg-white dark:bg-slate-800 border-slate-200 shadow-sm"><Info size={16}/></Button>
           </div>
        </div>

        {/* Sidebar Data Details */}
        <div className="lg:w-[350px] space-y-8 flex flex-col">
           <div className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 p-8 rounded-[2.5rem] shadow-2xl">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Selected View</p>
              <h3 className="text-2xl font-black tracking-tight">{categoryConfig.label}</h3>
              <p className="text-xs text-slate-500 mt-2 font-medium">Measuring impact in {categoryConfig.unit}</p>
              
              <div className="mt-8 space-y-6">
                 {Object.entries(INDIA_REGIONAL_DATA).slice(0, 5).map(([region, metrics], idx) => (
                    <div key={region} className="flex items-center gap-4">
                       <span className="text-xs font-black text-slate-500 tabular-nums w-4">0{idx+1}</span>
                       <div className="flex-1">
                          <div className="flex items-center justify-between mb-1.5">
                             <span className="text-xs font-bold uppercase tracking-tight">{region}</span>
                             <span className="text-xs font-black tabular-nums">{(metrics as any)[activeCategory]} {categoryConfig.unit}</span>
                          </div>
                          <div className="h-1 rounded-full bg-slate-800 dark:bg-slate-200 overflow-hidden">
                             <div 
                                className="h-full bg-emerald-500 transition-all duration-1000" 
                                style={{ width: `${((metrics as any)[activeCategory] / (INDIA_REGIONAL_DATA["Gujarat"] as any)[activeCategory]) * 100}%` }} 
                             />
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
              
              <Button className="w-full mt-8 rounded-full border border-slate-800 dark:border-slate-200 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-widest py-6">
                 Download Regional Report
              </Button>
           </div>
           
           <div className="flex-1 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
              <h4 className="text-sm font-black uppercase tracking-widest mb-6">Cluster Analysis</h4>
              <div className="space-y-4">
                 {[
                    { name: "Gujarat SEZ", type: "Energy Hub", value: "24.5%", color: "text-emerald-500" },
                    { name: "Pune Pharma", type: "Chemicals", value: "18.2%", color: "text-amber-500" },
                    { name: "Chennai Solar", type: "Renewables", value: "31.0%", color: "text-emerald-500" },
                 ].map(cluster => (
                    <div key={cluster.name} className="flex items-center justify-between p-4 rounded-3xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100/50 dark:border-slate-800/40">
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-tight text-slate-400 group-hover:text-emerald-500 transition-colors">{cluster.type}</p>
                          <p className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-tight">{cluster.name}</p>
                       </div>
                       <div className={cn("text-lg font-black tabular-nums", cluster.color)}>
                          {cluster.value}
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </CardContent>
      
      {/* State Tooltip Overlay */}
      {hoveredRegion && (
        <div 
          className="fixed pointer-events-none z-[100] transform transition-transform duration-200"
          style={{ 
            left: tooltipPos.x + 20, 
            top: tooltipPos.y - 20,
            transform: tooltipPos.x > window.innerWidth / 2 ? "translateX(-110%)" : undefined
          }}
        >
          <div className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] min-w-[240px] border border-slate-800 dark:border-slate-200 backdrop-blur-lg">
             <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Regional Insight</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500 text-[8px] font-black text-white uppercase tracking-widest">Active</span>
             </div>
             <p className="text-xl font-black tracking-tight mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-emerald-500" />
                {hoveredRegion}
             </p>
             
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                   <p className="text-[9px] font-bold text-slate-500 uppercase">Energy Saved</p>
                   <p className="text-lg font-black tabular-nums">{INDIA_REGIONAL_DATA[hoveredRegion].saved} <span className="text-[10px] font-bold">GWh</span></p>
                </div>
                <div className="space-y-1">
                   <p className="text-[9px] font-bold text-slate-500 uppercase">Efficiency</p>
                   <p className="text-lg font-black tabular-nums">{INDIA_REGIONAL_DATA[hoveredRegion].efficiency}%</p>
                </div>
             </div>
             
             <div className="mt-4 pt-4 border-t border-slate-800 dark:border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                   <div className="w-2 h-2 rounded-full bg-blue-500" />
                   <span className="text-[10px] font-bold text-slate-400">{INDIA_REGIONAL_DATA[hoveredRegion].audits} Audits Conducted</span>
                </div>
                <ArrowRight size={10} className="text-slate-600" />
             </div>
          </div>
        </div>
      )}
    </Card>
  )
}

function ArrowRight({ size, className }: any) {
    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
    )
}

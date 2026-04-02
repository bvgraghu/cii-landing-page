// Elite version mock data focused on Telangana Impact

export const HOME_KPI_DATA = {
  totalAudits: { value: 1284, delta: 12 },
  totalEnergySaved: { value: 428.5, unit: "GWh", delta: 18.4 },
  avgEfficiency: { value: 24.5, unit: "%", delta: 2.1 },
  activeAudits: { value: 156, delta: -4 },
  approvalRate: { value: 88, unit: "%", delta: 1.5 },
}

export const INSIGHT_CARDS = [
  {
    id: "growth",
    label: "Quarterly Growth",
    value: "+32%",
    text: "Energy savings have increased by 32% this quarter across industrial clusters.",
    type: "impact"
  },
  {
    id: "lead",
    label: "Top Regional Lead",
    value: "Hyderabad",
    text: "Hyderabad cluster leads with the highest total energy savings (42 GWh).",
    type: "leader"
  }
]

export const PIPELINE_DATA = [
  { id: "eoi", label: "EOI", count: 2450, wt: 1500, dea: 950 },
  { id: "eligible", label: "Eligible", count: 1820, wt: 1100, dea: 720 },
  { id: "scheduled", label: "Scheduled", count: 1240, wt: 800, dea: 440 },
  { id: "in-progress", label: "In Progress", count: 850, wt: 500, dea: 350 },
  { id: "review", label: "Review", count: 320, wt: 200, dea: 120, highlight: "bottleneck" },
  { id: "approved", label: "Approved", count: 680, wt: 400, dea: 280 },
]

export const ENERGY_IMPACT_HISTORY = [
  { month: "Jan", saved: 12.4, audits: 85, wt: 5.1, dea: 7.3 },
  { month: "Feb", saved: 15.1, audits: 92, wt: 6.4, dea: 8.7 },
  { month: "Mar", saved: 18.8, audits: 110, wt: 7.6, dea: 11.2 },
  { month: "Apr", saved: 22.2, audits: 125, wt: 9.9, dea: 12.3 },
  { month: "May", saved: 26.9, audits: 140, wt: 12.1, dea: 14.8 },
  { month: "Jun", saved: 32.5, audits: 155, wt: 14.3, dea: 18.2 },
  { month: "Jul", saved: 38.2, audits: 172, wt: 16.6, dea: 21.6 },
  { month: "Aug", saved: 45.8, audits: 188, wt: 19.4, dea: 26.4 },
  { month: "Sep", saved: 54.5, audits: 205, wt: 23.2, dea: 31.3 },
  { month: "Oct", saved: 64.4, audits: 218, wt: 28.5, dea: 35.9 },
  { month: "Nov", saved: 75.2, audits: 235, wt: 33.9, dea: 41.3 },
  { month: "Dec", saved: 88.5, audits: 260, wt: 40.5, dea: 48.0 },
]

export const SECTOR_TREND_DATA = [
  { month: "Jan", Textiles: 2.1, Steel: 3.5, FMCG: 1.2, Chemicals: 2.8, Food: 0.8, audits: 85 },
  { month: "Feb", Textiles: 2.4, Steel: 3.8, FMCG: 1.5, Chemicals: 3.2, Food: 1.2, audits: 92 },
  { month: "Mar", Textiles: 3.1, Steel: 4.2, FMCG: 1.8, Chemicals: 3.8, Food: 1.5, audits: 110 },
  { month: "Apr", Textiles: 3.8, Steel: 4.8, FMCG: 2.2, Chemicals: 4.2, Food: 1.8, audits: 125 },
  { month: "May", Textiles: 4.5, Steel: 5.5, FMCG: 2.8, Chemicals: 4.9, Food: 2.2, audits: 140 },
  { month: "Jun", Textiles: 5.2, Steel: 6.2, FMCG: 3.4, Chemicals: 5.8, Food: 2.8, audits: 155 },
  { month: "Jul", Textiles: 6.1, Steel: 7.2, FMCG: 4.1, Chemicals: 6.5, Food: 3.5, audits: 172 },
  { month: "Aug", Textiles: 7.2, Steel: 8.5, FMCG: 4.8, Chemicals: 7.4, Food: 4.2, audits: 188 },
  { month: "Sep", Textiles: 8.5, Steel: 10.2, FMCG: 5.8, Chemicals: 8.5, Food: 5.1, audits: 205 },
  { month: "Oct", Textiles: 10.2, Steel: 11.8, FMCG: 7.2, Chemicals: 10.2, Food: 6.2, audits: 218 },
  { month: "Nov", Textiles: 12.5, Steel: 13.5, FMCG: 8.8, Chemicals: 12.5, Food: 7.8, audits: 235 },
  { month: "Dec", Textiles: 14.8, Steel: 15.8, FMCG: 10.5, Chemicals: 14.8, Food: 9.5, audits: 260 },
]

export const SANKEY_DATA = {
  nodes: [
    { name: "Walkthrough Audits", type: "audit" }, // 0
    { name: "Detailed Audits (DEA)", type: "audit" }, // 1
    { name: "Textiles", type: "sector" }, // 2
    { name: "Steel & Metals", type: "sector" }, // 3
    { name: "FMCG", type: "sector" }, // 4
    { name: "Chemicals", type: "sector" }, // 5
    { name: "Hyderabad", type: "geo" }, // 6
    { name: "Rangareddy", type: "geo" }, // 7
    { name: "Medchal", type: "geo" }, // 8
    { name: "Sangareddy", type: "geo" }, // 9
    { name: "Others", type: "geo" }, // 10
  ],
  links: [
    // Audit -> Sector
    { source: 0, target: 2, value: 45 },
    { source: 0, target: 3, value: 32 },
    { source: 0, target: 4, value: 28 },
    { source: 0, target: 5, value: 35 },
    { source: 1, target: 2, value: 85 },
    { source: 1, target: 3, value: 112 },
    { source: 1, target: 4, value: 65 },
    { source: 1, target: 5, value: 26.5 },

    // Sector -> Geo
    { source: 2, target: 6, value: 40 },
    { source: 2, target: 7, value: 35 },
    { source: 2, target: 10, value: 55 },
    { source: 3, target: 6, value: 60 },
    { source: 3, target: 8, value: 44 },
    { source: 3, target: 9, value: 40 },
    { source: 4, target: 7, value: 30 },
    { source: 4, target: 8, value: 40 },
    { source: 4, target: 10, value: 23 },
    { source: 5, target: 6, value: 21.5 },
    { source: 5, target: 9, value: 40 },
  ]
}

export const SECTOR_DATA = [
  { name: "Solar Manufacturing", value: 35, saved: 150.0 },
  { name: "Textiles", value: 25, saved: 107.1 },
  { name: "Phasing & Chemicals", value: 18, saved: 77.1 },
  { name: "Steel & Metals", value: 12, saved: 51.4 },
  { name: "Food Processing", value: 10, saved: 42.9 },
]

// Mapping for Telangana districts with Impact data
export const TELANGANA_DISTRICT_DATA: Record<string, { saved: number, audits: number, efficiency: number }> = {
  "Hyderabad": { saved: 85.4, audits: 240, efficiency: 32.5 },
  "Rangareddy": { saved: 72.2, audits: 210, efficiency: 28.2 },
  "Medchal-Malkajgiri": { saved: 68.8, audits: 195, efficiency: 27.8 },
  "Sangareddy": { saved: 55.5, audits: 160, efficiency: 24.1 },
  "Siddipet": { saved: 42.9, audits: 145, efficiency: 23.5 },
  "Nizamabad": { saved: 38.8, audits: 120, efficiency: 22.8 },
  "Nalgonda": { saved: 24.4, audits: 85, efficiency: 21.5 },
  "Warangal Urban": { saved: 18.8, audits: 60, efficiency: 20.2 },
  "Khammam": { saved: 12.2, audits: 45, efficiency: 19.8 },
  "Karimnagar": { saved: 8.5, audits: 30, efficiency: 18.5 },
}

export const TOP_DISTRICTS = [
  { name: "Hyderabad", saved: 85.4, efficiency: 32.5 },
  { name: "Rangareddy", saved: 72.2, efficiency: 28.2 },
  { name: "Medchal", saved: 68.8, efficiency: 27.8 },
  { name: "Sangareddy", saved: 55.5, efficiency: 24.1 },
  { name: "Siddipet", saved: 42.9, efficiency: 23.5 },
]

export const EFFICIENCY_DISTRIBUTION = [
  { range: "0-10%", count: 120 },
  { range: "11-20%", count: 450 },
  { range: "21-30%", count: 480, isPeak: true },
  { range: "31-40%", count: 180 },
  { range: "41-50%+", count: 54 },
]

export const RECENT_ACTIVITY = [
  { company: "Adani Solar Ltd", type: "DEA", status: "Approved", date: "2024-03-28", impact: "High" },
  { company: "Vardhman Textiles", type: "Walkthrough", status: "In Review", date: "2024-03-27", impact: "Medium" },
  { company: "Dr Reddy's Labs", type: "DEA", status: "Approved", date: "2024-03-26", impact: "High" },
  { company: "JSW Steel", type: "DEA", status: "In Progress", date: "2024-03-25", impact: "Ultra" },
  { company: "Amul Dairy", type: "Walkthrough", status: "Scheduled", date: "2024-03-24", impact: "Medium" },
]

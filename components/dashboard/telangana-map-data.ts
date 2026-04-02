// Telangana district map data and dummy metrics

export interface DistrictMetrics {
  // Intake
  received: number
  eligible: number
  ineligible: number
  // Execution
  scheduled: number
  overdue: number
  inProgress: number
  // Review & Outcomes
  pending: number
  approved: number
  rejected: number
}

export function generateDummyMetrics(districtName: string): DistrictMetrics {
  // Seed based on district name for deterministic dummy data
  let seed = 0
  for (let i = 0; i < districtName.length; i++) seed += districtName.charCodeAt(i)
  const r = (min: number, max: number) => {
    seed = (seed * 9301 + 49297) % 233280
    return min + Math.floor((seed / 233280) * (max - min + 1))
  }
  const received = r(5, 80)
  const ineligible = r(0, Math.floor(received * 0.3))
  const eligible = received - ineligible
  const scheduled = r(0, Math.floor(eligible * 0.5))
  const overdue = r(0, Math.min(5, scheduled))
  const inProgress = r(0, Math.floor(eligible * 0.3))
  const pending = r(0, Math.floor(eligible * 0.2))
  const approved = r(0, Math.floor(eligible * 0.4))
  const rejected = r(0, Math.min(3, approved))

  return { received, eligible, ineligible, scheduled, overdue, inProgress, pending, approved, rejected }
}

// Map SVG URL from GitHub (open-source Telangana districts map)
export const TELANGANA_SVG_URL = "https://raw.githubusercontent.com/mranilkish/TelanganaMap/main/t.svg"

// District name mapping from SVG `name` attribute to our TELANGANA_DISTRICTS array
export const SVG_NAME_TO_DISTRICT: Record<string, string> = {
  "Hyderabad": "Hyderabad",
  "Ranga Reddy": "Rangareddy",
  "Medchal": "Medchal-Malkajgiri",
  "Sangareddy": "Sangareddy",
  "Medak": "Medak",
  "Siddipet": "Siddipet",
  "Kamareddy": "Kamareddy",
  "Nizamabad": "Nizamabad",
  "Nirmal": "Nirmal",
  "Adilabad": "Adilabad",
  "Komaram Bheem": "Komaram Bheem",
  "Mancherial": "Mancherial",
  "Peddapalli": "Peddapalli",
  "Jayashankar": "Jayashankar Bhupalpally",
  "Bhadradri": "Bhadradri Kothagudem",
  "Khammam": "Khammam",
  "Nalgonda": "Nalgonda",
  "Suryapet": "Suryapet",
  "Yadadri": "Yadadri Bhuvanagiri",
  "Jangaon": "Jangaon",
  "Warangal(urban)": "Warangal Urban",
  "Warangal(rural)": "Warangal Rural",
  "Mahabubabad": "Mahabubabad",
  "Karimnagar": "Karimnagar",
  "Jagtial": "Jagtial",
  "Rajanna": "Rajanna Sircilla",
  "Vikarabad": "Vikarabad",
  "Nagarkurnool": "Nagarkurnool",
  "Wanaparthy": "Wanaparthy",
  "Gadwal": "Jogulamba Gadwal",
  "Mahbubnagar": "Mahbubnagar",
  "Narayanpet": "Narayanpet",
  "Mulugu": "Mulugu",
}

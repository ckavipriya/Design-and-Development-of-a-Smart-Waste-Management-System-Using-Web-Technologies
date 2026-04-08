import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useCallback } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Bar, Line, Doughnut } from 'react-chartjs-2'
import {
  Trash2,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Recycle,
  MapPin,
  Bell,
  Activity,
  RefreshCw,
  Truck,
} from 'lucide-react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

export const Route = createFileRoute('/')({
  component: Home,
})

// --- Data Definitions ---

type BinStatus = 'critical' | 'warning' | 'normal' | 'empty'

interface WasteBin {
  id: string
  location: string
  zone: string
  fillLevel: number
  lastCollected: string
  type: string
  status: BinStatus
}

interface Zone {
  id: string
  name: string
  bins: number
  avgFill: number
  nextCollection: string
  color: string
}

interface Alert {
  id: string
  binId: string
  location: string
  message: string
  severity: 'high' | 'medium' | 'low'
  time: string
}

const initialBins: WasteBin[] = [
  { id: 'B001', location: '12 Oak Street', zone: 'Zone A', fillLevel: 92, lastCollected: '2 days ago', type: 'General', status: 'critical' },
  { id: 'B002', location: '45 Maple Ave', zone: 'Zone A', fillLevel: 78, lastCollected: '1 day ago', type: 'Recycling', status: 'warning' },
  { id: 'B003', location: '7 Pine Road', zone: 'Zone B', fillLevel: 45, lastCollected: '3 days ago', type: 'Organic', status: 'normal' },
  { id: 'B004', location: '88 Elm Drive', zone: 'Zone B', fillLevel: 95, lastCollected: '3 days ago', type: 'General', status: 'critical' },
  { id: 'B005', location: '23 Cedar Blvd', zone: 'Zone C', fillLevel: 61, lastCollected: '1 day ago', type: 'Recycling', status: 'warning' },
  { id: 'B006', location: '56 Birch Lane', zone: 'Zone C', fillLevel: 18, lastCollected: 'Today', type: 'General', status: 'empty' },
  { id: 'B007', location: '34 Walnut St', zone: 'Zone D', fillLevel: 83, lastCollected: '2 days ago', type: 'Organic', status: 'warning' },
  { id: 'B008', location: '91 Spruce Ave', zone: 'Zone D', fillLevel: 30, lastCollected: 'Today', type: 'General', status: 'normal' },
]

const zones: Zone[] = [
  { id: 'A', name: 'Zone A – Downtown', bins: 14, avgFill: 72, nextCollection: 'Today, 2:00 PM', color: 'bg-red-500' },
  { id: 'B', name: 'Zone B – Residential', bins: 22, avgFill: 55, nextCollection: 'Tomorrow, 8:00 AM', color: 'bg-amber-500' },
  { id: 'C', name: 'Zone C – Commercial', bins: 18, avgFill: 48, nextCollection: 'Tomorrow, 11:00 AM', color: 'bg-blue-500' },
  { id: 'D', name: 'Zone D – Industrial', bins: 10, avgFill: 38, nextCollection: 'Wed, 7:00 AM', color: 'bg-emerald-500' },
]

const initialAlerts: Alert[] = [
  { id: 'A1', binId: 'B004', location: '88 Elm Drive', message: 'Bin at 95% capacity – immediate collection needed', severity: 'high', time: '5 min ago' },
  { id: 'A2', binId: 'B001', location: '12 Oak Street', message: 'Bin at 92% capacity – schedule collection today', severity: 'high', time: '12 min ago' },
  { id: 'A3', binId: 'B007', location: '34 Walnut St', message: 'Bin at 83% capacity – collection due soon', severity: 'medium', time: '1 hr ago' },
  { id: 'A4', binId: 'B005', location: '23 Cedar Blvd', message: 'Bin at 61% capacity – monitor closely', severity: 'low', time: '2 hr ago' },
]

const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

const wasteGenerationData = {
  labels: months,
  datasets: [
    {
      label: 'General Waste (tons)',
      data: [142, 138, 155, 162, 170, 158, 145, 148, 153, 160, 157, 165],
      backgroundColor: 'rgba(99, 102, 241, 0.75)',
      borderRadius: 5,
      stack: 'stack',
    },
    {
      label: 'Recycling (tons)',
      data: [58, 62, 65, 70, 68, 72, 75, 78, 80, 82, 84, 88],
      backgroundColor: 'rgba(16, 185, 129, 0.75)',
      borderRadius: 5,
      stack: 'stack',
    },
    {
      label: 'Organic (tons)',
      data: [34, 36, 33, 38, 40, 37, 35, 34, 38, 39, 41, 43],
      backgroundColor: 'rgba(245, 158, 11, 0.75)',
      borderRadius: 5,
      stack: 'stack',
    },
  ],
}

const recyclingTrendData = {
  labels: months,
  datasets: [
    {
      label: 'Recycling Rate (%)',
      data: [24, 26, 25, 27, 26, 28, 30, 31, 30, 32, 33, 34],
      borderColor: 'rgb(16, 185, 129)',
      backgroundColor: 'rgba(16, 185, 129, 0.12)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: 'rgb(16, 185, 129)',
      pointRadius: 4,
    },
  ],
}

const wasteCompositionData = {
  labels: ['General Waste', 'Recycling', 'Organic', 'Hazardous', 'E-Waste'],
  datasets: [
    {
      data: [48, 29, 14, 5, 4],
      backgroundColor: [
        'rgba(99, 102, 241, 0.85)',
        'rgba(16, 185, 129, 0.85)',
        'rgba(245, 158, 11, 0.85)',
        'rgba(239, 68, 68, 0.85)',
        'rgba(139, 92, 246, 0.85)',
      ],
      borderWidth: 0,
    },
  ],
}

const collectionEfficiencyData = {
  labels: months,
  datasets: [
    {
      label: 'On-Time Collections (%)',
      data: [88, 85, 90, 87, 82, 91, 93, 95, 92, 94, 96, 97],
      backgroundColor: 'rgba(59, 130, 246, 0.7)',
      borderRadius: 5,
    },
  ],
}

// --- Helper Components ---

function FillLevelBar({ level, status }: { level: number; status: BinStatus }) {
  const colorMap: Record<BinStatus, string> = {
    critical: 'bg-red-500',
    warning: 'bg-amber-400',
    normal: 'bg-emerald-500',
    empty: 'bg-gray-300',
  }
  return (
    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
      <div
        className={`${colorMap[status]} h-2.5 rounded-full transition-all duration-700`}
        style={{ width: `${level}%` }}
      />
    </div>
  )
}

function StatusBadge({ status }: { status: BinStatus }) {
  const map: Record<BinStatus, { label: string; cls: string }> = {
    critical: { label: 'Critical', cls: 'bg-red-100 text-red-700' },
    warning: { label: 'Warning', cls: 'bg-amber-100 text-amber-700' },
    normal: { label: 'Normal', cls: 'bg-emerald-100 text-emerald-700' },
    empty: { label: 'Empty', cls: 'bg-gray-100 text-gray-500' },
  }
  const { label, cls } = map[status]
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cls}`}>
      {label}
    </span>
  )
}

function AlertBadge({ severity }: { severity: Alert['severity'] }) {
  const map = {
    high: 'bg-red-100 text-red-700 border-red-200',
    medium: 'bg-amber-100 text-amber-700 border-amber-200',
    low: 'bg-blue-100 text-blue-700 border-blue-200',
  }
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${map[severity]}`}>
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </span>
  )
}

// --- Route Map Component ---

function RouteMap() {
  const stops = [
    { x: 12, y: 20, label: 'Depot', icon: '🏭', active: false },
    { x: 28, y: 15, label: 'B001\n92%', icon: '🗑️', active: true },
    { x: 45, y: 30, label: 'B004\n95%', icon: '🗑️', active: true },
    { x: 62, y: 22, label: 'B007\n83%', icon: '🗑️', active: false },
    { x: 75, y: 42, label: 'B002\n78%', icon: '🗑️', active: false },
    { x: 55, y: 60, label: 'B005\n61%', icon: '🗑️', active: false },
    { x: 35, y: 55, label: 'B003\n45%', icon: '🗑️', active: false },
    { x: 20, y: 72, label: 'B008\n30%', icon: '🗑️', active: false },
    { x: 12, y: 20, label: 'Return', icon: '', active: false },
  ]

  return (
    <div className="relative w-full bg-emerald-50 rounded-xl overflow-hidden border border-emerald-100" style={{ paddingBottom: '56%' }}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 85" preserveAspectRatio="xMidYMid meet">
        {/* Grid lines */}
        {[20, 40, 60, 80].map(v => (
          <line key={`h${v}`} x1="0" y1={v} x2="100" y2={v} stroke="#d1fae5" strokeWidth="0.4" />
        ))}
        {[20, 40, 60, 80].map(v => (
          <line key={`v${v}`} x1={v} y1="0" x2={v} y2="85" stroke="#d1fae5" strokeWidth="0.4" />
        ))}

        {/* Route path */}
        <polyline
          points={stops.slice(0, -1).map(s => `${s.x},${s.y}`).join(' ')}
          fill="none"
          stroke="#6366f1"
          strokeWidth="0.8"
          strokeDasharray="2,1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Stops */}
        {stops.slice(0, -1).map((stop, i) => (
          <g key={i}>
            <circle
              cx={stop.x}
              cy={stop.y}
              r={stop.active ? 3 : 2}
              fill={i === 0 ? '#6366f1' : stop.active ? '#ef4444' : '#10b981'}
              stroke="white"
              strokeWidth="0.5"
            />
            {stop.label && (
              <text
                x={stop.x + 3.5}
                y={stop.y + 1}
                fontSize="3.5"
                fill="#374151"
                fontWeight={stop.active ? '700' : '400'}
              >
                {stop.label.split('\n')[0]}
              </text>
            )}
          </g>
        ))}

        {/* Truck icon label */}
        <text x="30" y="10" fontSize="4" fill="#6366f1" fontWeight="600">🚛 Route 1 – Priority Collection</text>
      </svg>

      {/* Legend */}
      <div className="absolute bottom-2 right-2 bg-white/90 rounded-lg px-3 py-2 text-xs space-y-1">
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> Critical bins</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Scheduled stop</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" /> Depot</div>
      </div>
    </div>
  )
}

// --- Main Component ---

function Home() {
  const [mounted, setMounted] = useState(false)
  const [bins, setBins] = useState<WasteBin[]>(initialBins)
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts)
  const [lastUpdated, setLastUpdated] = useState('Just now')
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set())

  useEffect(() => setMounted(true), [])

  const simulateUpdate = useCallback(() => {
    setBins(prev => prev.map(bin => {
      const delta = Math.floor(Math.random() * 5) - 1
      const newLevel = Math.min(100, Math.max(0, bin.fillLevel + delta))
      let status: BinStatus = 'empty'
      if (newLevel >= 85) status = 'critical'
      else if (newLevel >= 60) status = 'warning'
      else if (newLevel >= 20) status = 'normal'
      return { ...bin, fillLevel: newLevel, status }
    }))
    setLastUpdated('Just now')
  }, [])

  const dismissAlert = (id: string) => {
    setDismissedAlerts(prev => new Set([...prev, id]))
  }

  const visibleAlerts = alerts.filter(a => !dismissedAlerts.has(a.id))

  const totalBins = bins.length
  const criticalBins = bins.filter(b => b.status === 'critical').length
  const avgFillLevel = Math.round(bins.reduce((s, b) => s + b.fillLevel, 0) / bins.length)
  const recyclingRate = 34

  const summaryStats = [
    { title: 'Total Bins Monitored', value: `${totalBins * 8}`, sub: `${totalBins} in view`, icon: Trash2, color: 'bg-indigo-500' },
    { title: 'Critical Bins', value: String(criticalBins + 14), sub: 'Needs immediate pickup', icon: AlertTriangle, color: 'bg-red-500' },
    { title: 'Avg Fill Level', value: `${avgFillLevel}%`, sub: 'Across all zones', icon: Activity, color: 'bg-amber-500' },
    { title: 'Recycling Rate', value: `${recyclingRate}%`, sub: '+2% vs last month', icon: Recycle, color: 'bg-emerald-500' },
  ]

  const chartOpts = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } },
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
              <Trash2 className="w-8 h-8 text-emerald-600" />
              Smart Waste Management
            </h1>
            <p className="text-slate-500 mt-1 text-sm">Real-time monitoring · Collection optimization · Analytics</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Updated: {lastUpdated}</span>
            <button
              onClick={simulateUpdate}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {summaryStats.map(stat => (
            <div key={stat.title} className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4 border border-slate-100">
              <div className={`${stat.color} p-3 rounded-xl`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">{stat.title}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Alerts */}
        {visibleAlerts.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <Bell className="w-5 h-5 text-red-500" />
                Active Alerts
                <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  {visibleAlerts.filter(a => a.severity === 'high').length} High
                </span>
              </h2>
            </div>
            <div className="divide-y divide-slate-50">
              {visibleAlerts.map(alert => (
                <div key={alert.id} className="flex items-start sm:items-center justify-between gap-3 px-6 py-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className={`w-4 h-4 mt-0.5 shrink-0 ${alert.severity === 'high' ? 'text-red-500' : alert.severity === 'medium' ? 'text-amber-500' : 'text-blue-400'}`} />
                    <div>
                      <p className="text-sm font-medium text-slate-800">{alert.location} <span className="text-slate-400 font-normal">· {alert.binId}</span></p>
                      <p className="text-xs text-slate-500">{alert.message}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <AlertBadge severity={alert.severity} />
                    <span className="text-xs text-slate-400 hidden sm:block">{alert.time}</span>
                    <button
                      onClick={() => dismissAlert(alert.id)}
                      className="text-xs text-slate-400 hover:text-slate-600 underline"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Zone Overview */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-indigo-500" />
            Zone Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {zones.map(zone => (
              <div key={zone.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 text-sm">{zone.name}</span>
                  <span className={`${zone.color} text-white text-xs font-bold px-2 py-0.5 rounded-full`}>
                    Zone {zone.id}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Avg fill level</span>
                    <span className="font-semibold text-slate-700">{zone.avgFill}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full ${zone.avgFill >= 70 ? 'bg-red-500' : zone.avgFill >= 50 ? 'bg-amber-400' : 'bg-emerald-500'}`}
                      style={{ width: `${zone.avgFill}%` }}
                    />
                  </div>
                </div>
                <div className="text-xs text-slate-500 space-y-1">
                  <div className="flex justify-between">
                    <span>Bins</span>
                    <span className="font-medium text-slate-700">{zone.bins}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Next collection</span>
                    <span className="font-medium text-slate-700">{zone.nextCollection}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bin Monitoring Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-500" />
              Bin Monitoring – Live Fill Levels
            </h2>
            <div className="flex gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" />Critical ≥85%</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" />Warning ≥60%</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" />Normal</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wide">
                <tr>
                  <th className="px-6 py-3 text-left">Bin ID</th>
                  <th className="px-6 py-3 text-left">Location</th>
                  <th className="px-6 py-3 text-left">Zone</th>
                  <th className="px-6 py-3 text-left">Type</th>
                  <th className="px-6 py-3 text-left">Fill Level</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Last Collected</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {bins.map(bin => (
                  <tr key={bin.id} className={`hover:bg-slate-50 transition-colors ${bin.status === 'critical' ? 'bg-red-50/40' : ''}`}>
                    <td className="px-6 py-3 font-mono text-slate-700 font-medium">{bin.id}</td>
                    <td className="px-6 py-3 text-slate-600">{bin.location}</td>
                    <td className="px-6 py-3 text-slate-500">{bin.zone}</td>
                    <td className="px-6 py-3 text-slate-500">{bin.type}</td>
                    <td className="px-6 py-3 min-w-[160px]">
                      <div className="flex items-center gap-2">
                        <FillLevelBar level={bin.fillLevel} status={bin.status} />
                        <span className={`text-xs font-bold w-9 text-right ${bin.status === 'critical' ? 'text-red-600' : bin.status === 'warning' ? 'text-amber-600' : 'text-slate-600'}`}>
                          {bin.fillLevel}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3"><StatusBadge status={bin.status} /></td>
                    <td className="px-6 py-3 text-slate-400 text-xs">{bin.lastCollected}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Collection Route */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-1 flex items-center gap-2">
            <Truck className="w-5 h-5 text-indigo-500" />
            Optimized Collection Route – Today
          </h2>
          <p className="text-xs text-slate-400 mb-4">Priority-based route planning: critical and warning bins first · Estimated completion: 3h 20min</p>
          <RouteMap />
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            {[
              { label: 'Total Stops', value: '7 bins' },
              { label: 'Route Distance', value: '24.6 km' },
              { label: 'Est. Duration', value: '3h 20min' },
              { label: 'CO₂ Saved', value: '~18 kg' },
            ].map(item => (
              <div key={item.label} className="bg-slate-50 rounded-lg px-4 py-3 text-center">
                <p className="text-slate-400 text-xs uppercase tracking-wide">{item.label}</p>
                <p className="text-slate-800 font-bold text-lg">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Charts */}
        {mounted && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              Analytics & Trends
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Waste Generation Trend */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-1">Waste Generation by Type (tons/month)</h3>
                <p className="text-xs text-slate-400 mb-4">12-month trend across all zones</p>
                <Bar
                  data={wasteGenerationData}
                  options={{
                    responsive: true,
                    plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } } },
                    scales: { y: { beginAtZero: true, stacked: true }, x: { stacked: true } },
                  }}
                />
              </div>

              {/* Recycling Rate Trend */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-1">Recycling Rate Trend (%)</h3>
                <p className="text-xs text-slate-400 mb-4">Monthly recycling rate — target: 40% by year-end</p>
                <Line
                  data={recyclingTrendData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: false },
                      tooltip: { callbacks: { label: ctx => ` ${ctx.parsed.y}%` } },
                    },
                    scales: {
                      y: {
                        beginAtZero: false,
                        min: 20,
                        max: 45,
                        ticks: { callback: v => `${v}%` },
                      },
                    },
                  }}
                />
                {/* Target line annotation manual */}
                <div className="mt-3 flex items-center gap-2 text-xs text-emerald-600">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Current rate: 34% · Target: 40% · Progress: 85%
                </div>
              </div>

              {/* Waste Composition */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-1">Waste Composition Breakdown</h3>
                <p className="text-xs text-slate-400 mb-4">Distribution across waste categories</p>
                <div className="max-w-xs mx-auto">
                  <Doughnut
                    data={wasteCompositionData}
                    options={{
                      responsive: true,
                      plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } } },
                      cutout: '65%',
                    }}
                  />
                </div>
              </div>

              {/* Collection Efficiency */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-1">Collection Efficiency (%)</h3>
                <p className="text-xs text-slate-400 mb-4">On-time collection rate per month</p>
                <Bar
                  data={collectionEfficiencyData}
                  options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: {
                      y: {
                        min: 70,
                        max: 100,
                        ticks: { callback: v => `${v}%` },
                      },
                    },
                  }}
                />
                <div className="mt-3 flex items-center gap-2 text-xs text-indigo-600">
                  <TrendingUp className="w-3.5 h-3.5" />
                  +9% improvement over the past year
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-slate-400 pb-4">
          Smart Waste Management Dashboard · Data refreshed every 5 minutes · © 2026
        </div>

      </div>
    </div>
  )
}

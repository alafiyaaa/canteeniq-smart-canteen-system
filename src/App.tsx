// @ts-nocheck
 import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  BrainCircuit, 
  Package, 
  ClipboardList, 
  BarChart3, 
  UtensilsCrossed, 
  FileText, 
  Settings as SettingsIcon, 
  Plus, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Edit3, 
  Download, 
  Printer, 
  ChevronRight, 
  TrendingUp, 
  DollarSign, 
  Scale, 
  Calendar, 
  Sun, 
  Cloud, 
  CloudRain, 
  GraduationCap, 
  PartyPopper, 
  Info, 
  Bell, 
  User, 
  Sparkles, 
  Leaf, 
  RefreshCw,
  Check,
  X
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';

// Initial Demo Data
const INITIAL_FOOD_ITEMS = [
  { id: 'f1', name: 'Veg Biryani', category: 'Main Course', price: 80, avgDemand: 140, status: 'Available' },
  { id: 'f2', name: 'Chicken Biryani', category: 'Main Course', price: 120, avgDemand: 110, status: 'Available' },
  { id: 'f3', name: 'Rajma Rice', category: 'Main Course', price: 60, avgDemand: 85, status: 'Available' },
  { id: 'f4', name: 'Masala Dosa', category: 'Breakfast/Snack', price: 50, avgDemand: 95, status: 'Available' },
  { id: 'f5', name: 'Chole Bhature', category: 'Main Course', price: 70, avgDemand: 75, status: 'Available' },
  { id: 'f6', name: 'Samosa', category: 'Snacks', price: 20, avgDemand: 160, status: 'Available' },
  { id: 'f7', name: 'Cold Coffee', category: 'Beverages', price: 50, avgDemand: 65, status: 'Available' },
];

const INITIAL_INVENTORY = [
  { id: 'i1', name: 'Basmati Rice', category: 'Grains', stock: 68, unit: 'kg', minLevel: 30, lastUpdated: '2026-10-06' },
  { id: 'i2', name: 'Fresh Vegetables', category: 'Fresh Produce', stock: 31, unit: 'kg', minLevel: 25, lastUpdated: '2026-10-06' },
  { id: 'i3', name: 'Cooking Oil', category: 'Oils', stock: 18, unit: 'L', minLevel: 25, lastUpdated: '2026-10-05' },
  { id: 'i4', name: 'Potatoes', category: 'Vegetables', stock: 24, unit: 'kg', minLevel: 20, lastUpdated: '2026-10-06' },
  { id: 'i5', name: 'Milk', category: 'Dairy', stock: 12, unit: 'L', minLevel: 20, lastUpdated: '2026-10-06' },
  { id: 'i6', name: 'Chicken', category: 'Meat', stock: 45, unit: 'kg', minLevel: 20, lastUpdated: '2026-10-06' },
  { id: 'i7', name: 'Paneer', category: 'Dairy', stock: 15, unit: 'kg', minLevel: 10, lastUpdated: '2026-10-06' },
];

const INITIAL_DAILY_RECORDS = [
  { id: 'r1', date: '2026-10-06', foodItem: 'Veg Biryani', prepared: 150, sold: 138, leftover: 12, wasteKg: 3.6, revenue: 11040, demandLevel: 'HIGH' },
  { id: 'r2', date: '2026-10-06', foodItem: 'Masala Dosa', prepared: 105, sold: 94, leftover: 11, wasteKg: 2.2, revenue: 4700, demandLevel: 'MEDIUM' },
  { id: 'r3', date: '2026-10-06', foodItem: 'Rajma Rice', prepared: 82, sold: 71, leftover: 11, wasteKg: 2.8, revenue: 4260, demandLevel: 'MEDIUM' },
  { id: 'r4', date: '2026-10-06', foodItem: 'Cold Coffee', prepared: 70, sold: 61, leftover: 9, wasteKg: 1.8, revenue: 3050, demandLevel: 'LOW' },
  { id: 'r5', date: '2026-10-05', foodItem: 'Veg Biryani', prepared: 140, sold: 135, leftover: 5, wasteKg: 1.5, revenue: 10800, demandLevel: 'HIGH' },
  { id: 'r6', date: '2026-10-05', foodItem: 'Chicken Biryani', prepared: 115, sold: 108, leftover: 7, wasteKg: 2.1, revenue: 12960, demandLevel: 'HIGH' },
  { id: 'r7', date: '2026-10-05', foodItem: 'Samosa', prepared: 180, sold: 175, leftover: 5, wasteKg: 0.8, revenue: 3500, demandLevel: 'HIGH' },
];

// Helper Charts Data
const WEEKLY_DEMAND_TREND = [
  { day: 'Mon', predicted: 450, actual: 440 },
  { day: 'Tue', predicted: 470, actual: 462 },
  { day: 'Wed', predicted: 486, actual: 421 },
  { day: 'Thu', predicted: 460, actual: 455 },
  { day: 'Fri', predicted: 510, actual: 498 },
  { day: 'Sat', predicted: 320, actual: 310 },
];

const WASTE_TREND_7_DAYS = [
  { day: 'Thu', waste: 24.2 },
  { day: 'Fri', waste: 21.5 },
  { day: 'Sat', waste: 14.8 },
  { day: 'Sun', waste: 10.2 },
  { day: 'Mon', waste: 19.4 },
  { day: 'Tue', waste: 16.8 },
  { day: 'Wed', waste: 18.6 },
];

const POPULAR_ITEMS = [
  { name: 'Veg Biryani', count: 142 },
  { name: 'Chicken Biryani', count: 115 },
  { name: 'Masala Dosa', count: 98 },
  { name: 'Rajma Rice', count: 76 },
  { name: 'Cold Coffee', count: 64 },
];

const CATEGORY_WASTE_DATA = [
  { name: 'Main Course', value: 45 },
  { name: 'Snacks', value: 25 },
  { name: 'Breakfast', value: 18 },
  { name: 'Beverages', value: 12 },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [foodItems, setFoodItems] = useState(INITIAL_FOOD_ITEMS);
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [dailyRecords, setDailyRecords] = useState(INITIAL_DAILY_RECORDS);
  const [toast, setToast] = useState(null);

  // Settings state
  const [settings, setSettings] = useState({
    canteenName: 'Green Valley Central Canteen',
    collegeName: 'Green Valley Institute of Technology',
    contactEmail: 'canteen.admin@gvit.edu.in',
    safetyBuffer: 5,
    minConfidence: 85,
    forecastPeriod: '1 Day',
    lowStockAlerts: true,
    highWasteAlerts: true,
    dailyPredictionReminder: true,
  });

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg bg-slate-900 text-white text-sm animate-bounce">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header activeTab={activeTab} />
        
        <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && (
            <DashboardView 
              dailyRecords={dailyRecords} 
              setActiveTab={setActiveTab} 
            />
          )}

          {activeTab === 'prediction' && (
            <DemandPredictionView 
              foodItems={foodItems} 
              settings={settings}
              showToast={showToast}
            />
          )}

          {activeTab === 'inventory' && (
            <InventoryView 
              inventory={inventory} 
              setInventory={setInventory} 
              showToast={showToast}
            />
          )}

          {activeTab === 'records' && (
            <DailyRecordsView 
              dailyRecords={dailyRecords} 
              setDailyRecords={setDailyRecords}
              foodItems={foodItems}
              showToast={showToast}
            />
          )}

          {activeTab === 'analytics' && (
            <WasteAnalyticsView 
              dailyRecords={dailyRecords} 
            />
          )}

          {activeTab === 'menu' && (
            <MenuManagementView 
              foodItems={foodItems} 
              setFoodItems={setFoodItems} 
              showToast={showToast}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsView 
              dailyRecords={dailyRecords} 
              showToast={showToast}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView 
              settings={settings} 
              setSettings={setSettings} 
              showToast={showToast}
            />
          )}
        </main>
      </div>
    </div>
  );
}

function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'prediction', label: 'Demand Prediction', icon: BrainCircuit },
    { id: 'inventory', label: 'Food Inventory', icon: Package },
    { id: 'records', label: 'Daily Records', icon: ClipboardList },
    { id: 'analytics', label: 'Waste Analytics', icon: BarChart3 },
    { id: 'menu', label: 'Menu Management', icon: UtensilsCrossed },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between shrink-0 shadow-xl">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white tracking-wide">CanteenIQ</h1>
            <p className="text-xs text-slate-400 font-medium">Predict Better. Waste Less.</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Admin Profile Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center font-bold text-sm">
            GV
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-200 truncate">Admin</p>
            <p className="text-xs text-slate-400 truncate">Green Valley College</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function Header({ activeTab }) {
  const titles = {
    dashboard: 'Canteen Overview',
    prediction: 'AI Demand Prediction',
    inventory: 'Food Inventory',
    records: 'Daily Sales & Waste Records',
    analytics: 'Waste Reduction Analytics',
    menu: 'Menu Management',
    reports: 'Performance & Analytics Reports',
    settings: 'System Settings & Architecture',
  };

  const currentDateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sticky top-0 z-10 shadow-xs">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">{titles[activeTab] || 'Overview'}</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Monitor today's demand, preparation, inventory and food waste.
        </p>
      </div>

      <div className="flex items-center gap-3 self-end sm:self-auto">
        <div className="flex items-center gap-2 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200">
          <Calendar className="w-3.5 h-3.5 text-indigo-600" />
          <span>{currentDateStr}</span>
        </div>
        <button className="relative p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
        </button>
      </div>
    </header>
  );
}

function DashboardView({ dailyRecords, setActiveTab }) {
  return (
    <div className="space-y-6">
      {/* Top 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Predicted Meals"
          value="486"
          unit="meals"
          change="+5.2%"
          isPositive={true}
          description="vs last week average"
          icon={BrainCircuit}
          iconBg="bg-indigo-50 text-indigo-600"
        />
        <SummaryCard
          title="Meals Served"
          value="421"
          unit="meals"
          change="+3.8%"
          isPositive={true}
          description="today's live count"
          icon={UtensilsCrossed}
          iconBg="bg-blue-50 text-blue-600"
        />
        <SummaryCard
          title="Food Waste"
          value="18.6"
          unit="kg"
          change="-14.2%"
          isPositive={true} // Lower waste is good
          description="vs last week"
          icon={Scale}
          iconBg="bg-emerald-50 text-emerald-600"
        />
        <SummaryCard
          title="Estimated Savings"
          value="₹8,420"
          unit=""
          change="+18.5%"
          isPositive={true}
          description="this month via optimization"
          icon={TrendingUp}
          iconBg="bg-amber-50 text-amber-600"
        />
      </div>

      {/* Main AI Prediction Spotlight Banner & Sustainability Indicator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl shadow-md relative overflow-hidden flex flex-col justify-between">
          <div className="absolute right-0 top-0 opacity-10 transform translate-x-12 -translate-y-8">
            <BrainCircuit className="w-72 h-72 text-indigo-300" />
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/30 border border-indigo-400/30 text-indigo-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> AI Demand Insight
              </span>
              <span className="text-xs text-slate-400">Target Date: Today</span>
            </div>

            <div className="flex flex-wrap items-baseline gap-4 mb-2">
              <h3 className="text-3xl font-extrabold text-white">486 Meals</h3>
              <span className="text-xs px-2.5 py-1 rounded-md font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                HIGH DEMAND
              </span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 92% Confidence Score
              </span>
            </div>

            <p className="text-slate-300 text-sm max-w-xl leading-relaxed mt-2">
              Based on historical sales, weekday patterns, expected student attendance (1,250), and warm weather conditions, demand is expected to be higher today.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 mt-4">
            <div className="flex items-center gap-4 text-xs text-slate-300">
              <div>
                <span className="text-slate-400 block">Recommended Prep:</span>
                <span className="font-bold text-white text-base">510 Meals</span>
              </div>
              <div className="h-8 w-px bg-slate-800"></div>
              <div>
                <span className="text-slate-400 block">Safety Buffer:</span>
                <span className="font-bold text-indigo-300 text-base">+5% (+24 meals)</span>
              </div>
            </div>

            <button 
              onClick={() => setActiveTab('prediction')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition"
            >
              <span>View Full Prediction Model</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sustainability / Waste Reduction Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-slate-800 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-emerald-600" />
                Waste Reduction
              </h4>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                Monthly Goal
              </span>
            </div>

            <div className="my-4 text-center p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
              <span className="text-4xl font-extrabold text-emerald-600">12.8%</span>
              <p className="text-xs font-medium text-emerald-800 mt-1">
                Improvement in food waste reduction this month!
              </p>
            </div>

            <ul className="text-xs text-slate-600 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Saved ~140 kg raw produce this month</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Reduced landfill methane footprint by ~210 kg CO₂e</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '78%' }}></div>
            </div>
            <div className="flex justify-between text-2xs text-slate-400 mt-1 font-medium">
              <span>Target: 15% Reduction</span>
              <span>78% achieved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Weekly Demand vs Actual */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-bold text-slate-900">Weekly Demand Trend</h4>
              <p className="text-xs text-slate-500">Predicted Demand vs Actual Meals Served (Mon-Sat)</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-indigo-600">
                <span className="w-3 h-3 rounded-full bg-indigo-600"></span> Predicted
              </span>
              <span className="flex items-center gap-1.5 text-emerald-600">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Actual Served
              </span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={WEEKLY_DEMAND_TREND}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} domain={[200, 600]} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="predicted" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Food Waste Trend */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-bold text-slate-900">Food Waste Trend</h4>
              <p className="text-xs text-slate-500">Daily waste (kg) over last 7 days</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WASTE_TREND_7_DAYS}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="waste" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Popular Food Items & Today's Food Demand Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Popular Food Items Bar Chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <h4 className="font-bold text-slate-900 mb-1">Popular Food Items</h4>
          <p className="text-xs text-slate-500 mb-4">Highest demand meal portions today</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={POPULAR_ITEMS} layout="vertical" margin={{ top: 0, right: 10, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={11} tickLine={false} width={90} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="count" fill="#6366f1" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Today's Food Demand Summary Table */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-bold text-slate-900">Today's Food Demand Schedule</h4>
                <p className="text-xs text-slate-500">Live comparison of preparation vs consumption</p>
              </div>
              <button 
                onClick={() => setActiveTab('records')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>View All Logs</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-2xs uppercase tracking-wider text-slate-400 font-semibold">
                    <th className="py-2.5 px-3">Food Item</th>
                    <th className="py-2.5 px-3">Predicted</th>
                    <th className="py-2.5 px-3">Prepared</th>
                    <th className="py-2.5 px-3">Served</th>
                    <th className="py-2.5 px-3">Leftover</th>
                    <th className="py-2.5 px-3">Demand Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {dailyRecords.slice(0, 4).map((record) => (
                    <tr key={record.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-3 font-semibold text-slate-900">{record.foodItem}</td>
                      <td className="py-3 px-3">{record.prepared - 8}</td>
                      <td className="py-3 px-3">{record.prepared}</td>
                      <td className="py-3 px-3 font-medium text-emerald-600">{record.sold}</td>
                      <td className="py-3 px-3 font-medium text-amber-600">{record.leftover}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-2xs font-bold ${
                          record.demandLevel === 'HIGH'
                            ? 'bg-amber-100 text-amber-800'
                            : record.demandLevel === 'MEDIUM'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {record.demandLevel}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, unit, change, isPositive, description, icon: Icon, iconBg }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</span>
        <div className={`p-2.5 rounded-xl ${iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black text-slate-900">{value}</span>
          {unit && <span className="text-xs font-semibold text-slate-500">{unit}</span>}
        </div>

        <div className="flex items-center gap-1.5 mt-2">
          <span className={`text-xs font-bold flex items-center ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
            {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
            {change}
          </span>
          <span className="text-2xs text-slate-400 truncate">{description}</span>
        </div>
      </div>
    </div>
  );
}

function DemandPredictionView({ foodItems, settings, showToast }) {
  const [formData, setFormData] = useState({
    foodItem: 'Veg Biryani',
    date: '2026-10-07',
    dayOfWeek: 'Wednesday',
    expectedStudents: 1250,
    weather: 'Sunny',
    temperature: 31,
    examDay: false,
    collegeEvent: false,
    prevDaySales: 138,
    prevWeekSameDaySales: 135,
  });

  const [predictionResult, setPredictionResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showArchModal, setShowArchModal] = useState(false);

  const handleGeneratePrediction = (e) => {
    e.preventDefault();
    setIsCalculating(true);

    setTimeout(() => {
      // Mock calculation logic representing an ML model outcome
      let baseDemand = parseInt(formData.prevWeekSameDaySales) || 120;
      if (formData.examDay) baseDemand *= 0.85; // Students study elsewhere / skip heavy meals
      if (formData.collegeEvent) baseDemand *= 1.25; // Higher turnout
      if (formData.weather === 'Rainy') baseDemand *= 0.90; // Lower attendance

      const predictedVal = Math.round(baseDemand);
      const safetyBufferAmount = Math.round(predictedVal * (settings.safetyBuffer / 100));
      const recommendedPrep = predictedVal + safetyBufferAmount;
      const expectedLeftover = Math.max(2, Math.round(recommendedPrep * 0.05));
      const estimatedWasteKg = (expectedLeftover * 0.25).toFixed(1);
      const estimatedCostSaving = Math.round(predictedVal * 3.5);

      const level = predictedVal > 130 ? 'HIGH' : predictedVal > 80 ? 'MEDIUM' : 'LOW';

      setPredictionResult({
        predictedDemand: predictedVal,
        recommendedPrep: recommendedPrep,
        demandLevel: level,
        confidence: Math.floor(88 + Math.random() * 8), // 88% - 95%
        expectedLeftover: expectedLeftover,
        estimatedWasteKg: estimatedWasteKg,
        costSaving: estimatedCostSaving,
        item: formData.foodItem,
        explanation: `Demand for ${formData.foodItem} is rated ${level} due to student turnout (~${formData.expectedStudents}), ${formData.weather.toLowerCase()} conditions, and past same-day historical baseline of ${formData.prevWeekSameDaySales} meals.`,
      });

      setIsCalculating(false);
      showToast(`Prediction generated for ${formData.foodItem}!`, 'success');
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner explaining ML architecture transparency */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-600/30 border border-indigo-500/30 rounded-xl text-indigo-400">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">Scikit-Learn ML Backend Pipeline Ready</h3>
            <p className="text-xs text-slate-300">
              Demo model logic active. Front-end is structured for seamless Python FastAPI / Random Forest integration.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowArchModal(true)}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5 shrink-0"
        >
          <Info className="w-4 h-4 text-indigo-400" />
          <span>View ML Architecture</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Prediction Form Section */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 mb-1">Demand Forecast Parameters</h3>
          <p className="text-xs text-slate-500 mb-5">Input operational metrics to compute estimated daily demand</p>

          <form onSubmit={handleGeneratePrediction} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target Food Item</label>
              <select
                value={formData.foodItem}
                onChange={(e) => setFormData({ ...formData, foodItem: e.target.value })}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {foodItems.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name} ({item.category})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Day of Week</label>
                <select
                  value={formData.dayOfWeek}
                  onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-indigo-500"
                >
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Expected Students</label>
                <input
                  type="number"
                  value={formData.expectedStudents}
                  onChange={(e) => setFormData({ ...formData, expectedStudents: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Weather</label>
                <select
                  value={formData.weather}
                  onChange={(e) => setFormData({ ...formData, weather: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Sunny">Sunny</option>
                  <option value="Cloudy">Cloudy</option>
                  <option value="Rainy">Rainy</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Temp (°C)</label>
                <input
                  type="number"
                  value={formData.temperature}
                  onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Event & Exam Toggles */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.examDay}
                  onChange={(e) => setFormData({ ...formData, examDay: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                />
                <span className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-indigo-600" /> Exam Day
                </span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.collegeEvent}
                  onChange={(e) => setFormData({ ...formData, collegeEvent: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                />
                <span className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
                  <PartyPopper className="w-4 h-4 text-amber-500" /> Fest / Event
                </span>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Prev Day Sales</label>
                <input
                  type="number"
                  value={formData.prevDaySales}
                  onChange={(e) => setFormData({ ...formData, prevDaySales: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Same Day Last Wk</label>
                <input
                  type="number"
                  value={formData.prevWeekSameDaySales}
                  onChange={(e) => setFormData({ ...formData, prevWeekSameDaySales: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isCalculating}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 transition"
            >
              {isCalculating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Computing AI Features...</span>
                </>
              ) : (
                <>
                  <BrainCircuit className="w-4 h-4" />
                  <span>Generate Prediction</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Prediction Results Display Card */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          {predictionResult ? (
            <div className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-md flex-1 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-2xs uppercase tracking-wider font-bold text-indigo-600">Generated Model Result</span>
                    <h4 className="text-xl font-extrabold text-slate-900">{predictionResult.item}</h4>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-black ${
                    predictionResult.demandLevel === 'HIGH' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {predictionResult.demandLevel} DEMAND
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 my-6">
                  <div className="p-4 bg-indigo-50/60 rounded-xl border border-indigo-100">
                    <span className="text-xs font-semibold text-slate-500 block">Predicted Demand</span>
                    <span className="text-3xl font-black text-indigo-700">{predictionResult.predictedDemand}</span>
                    <span className="text-xs text-slate-500 ml-1">meals</span>
                  </div>

                  <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100">
                    <span className="text-xs font-semibold text-slate-500 block">Recommended Prep</span>
                    <span className="text-3xl font-black text-emerald-700">{predictionResult.recommendedPrep}</span>
                    <span className="text-xs text-slate-500 ml-1">meals (+{settings.safetyBuffer}%)</span>
                  </div>
                </div>

                {/* Secondary Indicators */}
                <div className="grid grid-cols-3 gap-2 text-center bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <div>
                    <span className="text-2xs text-slate-400 font-semibold block">Confidence</span>
                    <span className="text-sm font-bold text-slate-800">{predictionResult.confidence}%</span>
                  </div>
                  <div className="border-x border-slate-200">
                    <span className="text-2xs text-slate-400 font-semibold block">Expected Waste</span>
                    <span className="text-sm font-bold text-slate-800">{predictionResult.estimatedWasteKg} kg</span>
                  </div>
                  <div>
                    <span className="text-2xs text-slate-400 font-semibold block">Cost Savings</span>
                    <span className="text-sm font-bold text-emerald-600">₹{predictionResult.costSaving}</span>
                  </div>
                </div>

                <div className="mt-5 p-3.5 rounded-xl bg-slate-900 text-slate-200 text-xs leading-relaxed flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span>{predictionResult.explanation}</span>
                </div>
              </div>

              <div className="text-2xs text-slate-400 text-center border-t border-slate-100 pt-3">
                Calculated using heuristic baseline mimicking Random Forest Regressor logic.
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center h-full min-h-[350px]">
              <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center mb-3">
                <BrainCircuit className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-800 mb-1">No Prediction Generated Yet</h4>
              <p className="text-xs text-slate-500 max-w-xs mb-4">
                Fill in the operational inputs on the left and click "Generate Prediction" to view forecasted demand.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Architecture Explanation Modal */}
      {showArchModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-indigo-600" />
                ML System Architecture Pipeline
              </h3>
              <button onClick={() => setShowArchModal(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs text-slate-600">
              <p>This application is designed for modular backend integration with a Python ML model:</p>
              
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 font-mono text-2xs text-slate-800">
                <div className="text-indigo-600 font-bold">[React UI] Form Input</div>
                <div className="text-slate-400 text-center">↓ POST /api/v1/predict</div>
                <div className="text-emerald-600 font-bold">[FastAPI Backend] Feature Vector</div>
                <div className="text-slate-400 text-center">↓ Random Forest Regressor (.pkl)</div>
                <div className="text-amber-600 font-bold">[ML Engine] Forecasted Quantities</div>
              </div>

              <div className="space-y-1">
                <p className="font-semibold text-slate-800">Model Features:</p>
                <ul className="list-disc pl-4 space-y-1 text-slate-600">
                  <li>Day of Week, Expected Student Attendance</li>
                  <li>Weather Condition & Ambient Temperature</li>
                  <li>Exam Day / College Event Flags</li>
                  <li>Historical Sales (Prev Day & Same Day Last Week)</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setShowArchModal(false)}
              className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition"
            >
              Close Technical Modal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function InventoryView({ inventory, setInventory, showToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', category: 'Grains', stock: 10, unit: 'kg', minLevel: 15 });

  const lowStockItems = useMemo(() => {
    return inventory.filter((i) => i.stock <= i.minLevel);
  }, [inventory]);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name) return;
    const added = {
      id: 'i' + (inventory.length + 1),
      ...newItem,
      stock: Number(newItem.stock),
      minLevel: Number(newItem.minLevel),
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    setInventory([added, ...inventory]);
    setShowAddModal(false);
    setNewItem({ name: '', category: 'Grains', stock: 10, unit: 'kg', minLevel: 15 });
    showToast(`Added ${added.name} to inventory!`, 'success');
  };

  const handleStockChange = (id, delta) => {
    setInventory(
      inventory.map((item) => {
        if (item.id === id) {
          const updatedStock = Math.max(0, item.stock + delta);
          return { ...item, stock: updatedStock, lastUpdated: new Date().toISOString().split('T')[0] };
        }
        return item;
      })
    );
    showToast('Updated stock level', 'info');
  };

  const filteredInventory = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-2xs font-semibold text-slate-500 uppercase">Total Ingredients</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{inventory.length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-2xs font-semibold text-slate-500 uppercase">Low Stock Alerts</span>
          <p className="text-2xl font-black text-amber-600 mt-1">{lowStockItems.length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-2xs font-semibold text-slate-500 uppercase">Est. Inventory Value</span>
          <p className="text-2xl font-black text-slate-900 mt-1">₹48,200</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-2xs font-semibold text-slate-500 uppercase">Expiring in 3 Days</span>
          <p className="text-2xl font-black text-indigo-600 mt-1">2 Items</p>
        </div>
      </div>

      {/* Low Stock Warning Header if applicable */}
      {lowStockItems.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900">
            <p className="font-bold mb-0.5">Inventory Stock Warnings Detected:</p>
            <p>
              {lowStockItems.map((i) => `${i.name} (${i.stock} ${i.unit})`).join(', ')} are currently below minimum recommended safety thresholds. Consider restocking.
            </p>
          </div>
        </div>
      )}

      {/* Main Inventory Table Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search ingredient or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Ingredient</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-2xs uppercase tracking-wider text-slate-400 font-semibold">
                <th className="py-3 px-3">Ingredient</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Stock Progress</th>
                <th className="py-3 px-3">Min Threshold</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Last Updated</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredInventory.map((item) => {
                const isLow = item.stock <= item.minLevel;
                const isCritical = item.stock <= item.minLevel * 0.5;
                const percent = Math.min(100, Math.round((item.stock / (item.minLevel * 2)) * 100));

                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-3 font-bold text-slate-900">{item.name}</td>
                    <td className="py-3 px-3 text-slate-500">{item.category}</td>
                    <td className="py-3 px-3 min-w-[140px]">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{item.stock} {item.unit}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                        <div
                          className={`h-full rounded-full ${
                            isCritical ? 'bg-rose-500' : isLow ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="py-3 px-3">{item.minLevel} {item.unit}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-2xs font-extrabold ${
                        isCritical
                          ? 'bg-rose-100 text-rose-800'
                          : isLow
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {isCritical ? 'CRITICAL' : isLow ? 'LOW' : 'GOOD'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-400 text-2xs">{item.lastUpdated}</td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleStockChange(item.id, 5)}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-2xs font-bold"
                          title="Restock +5"
                        >
                          +5
                        </button>
                        <button
                          onClick={() => handleStockChange(item.id, -5)}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-2xs font-bold"
                          title="Deduct -5"
                        >
                          -5
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Ingredient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="font-bold text-slate-900 text-base mb-4">Add Inventory Item</h3>
            <form onSubmit={handleAddItem} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Ingredient Name</label>
                <input
                  type="text"
                  required
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="e.g. Tomato Puree"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Category</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50"
                >
                  <option value="Grains">Grains</option>
                  <option value="Fresh Produce">Fresh Produce</option>
                  <option value="Oils">Oils & Spices</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Meat">Meat</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Current Stock</label>
                  <input
                    type="number"
                    value={newItem.stock}
                    onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Unit</label>
                  <input
                    type="text"
                    value={newItem.unit}
                    onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Min Threshold</label>
                  <input
                    type="number"
                    value={newItem.minLevel}
                    onChange={(e) => setNewItem({ ...newItem, minLevel: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function DailyRecordsView({ dailyRecords, setDailyRecords, foodItems, showToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [newRecord, setNewRecord] = useState({
    date: '2026-10-07',
    foodItem: 'Veg Biryani',
    prepared: 100,
    sold: 90,
    demandLevel: 'MEDIUM'
  });

  const totals = useMemo(() => {
    return dailyRecords.reduce(
      (acc, r) => {
        acc.prepared += r.prepared;
        acc.sold += r.sold;
        acc.wasteKg += r.wasteKg;
        acc.revenue += r.revenue;
        return acc;
      },
      { prepared: 0, sold: 0, wasteKg: 0, revenue: 0 }
    );
  }, [dailyRecords]);

  const handleAddRecordSubmit = (e) => {
    e.preventDefault();
    const prep = Number(newRecord.prepared);
    const sold = Number(newRecord.sold);
    const leftover = Math.max(0, prep - sold);
    const wasteKg = parseFloat((leftover * 0.25).toFixed(1));
    const price = foodItems.find((f) => f.name === newRecord.foodItem)?.price || 60;
    const revenue = sold * price;

    const record = {
      id: 'r' + (dailyRecords.length + 1),
      date: newRecord.date,
      foodItem: newRecord.foodItem,
      prepared: prep,
      sold: sold,
      leftover: leftover,
      wasteKg: wasteKg,
      revenue: revenue,
      demandLevel: newRecord.demandLevel
    };

    setDailyRecords([record, ...dailyRecords]);
    setShowAddRecord(false);
    showToast(`Recorded entry for ${newRecord.foodItem}!`, 'success');
  };

  const filteredRecords = dailyRecords.filter(
    (r) =>
      r.foodItem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.date.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Dynamic Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-2xs font-semibold text-slate-500 uppercase">Total Meals Prepared</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{totals.prepared}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-2xs font-semibold text-slate-500 uppercase">Total Meals Sold</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">{totals.sold}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-2xs font-semibold text-slate-500 uppercase">Logged Waste (kg)</span>
          <p className="text-2xl font-black text-rose-600 mt-1">{totals.wasteKg.toFixed(1)} kg</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-2xs font-semibold text-slate-500 uppercase">Recorded Revenue</span>
          <p className="text-2xl font-black text-slate-900 mt-1">₹{totals.revenue.toLocaleString('en-IN')}</p>
        </div>
      </div>

      {/* Daily Records Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by meal or date..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={() => setShowAddRecord(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Log Daily Preparation</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-2xs uppercase tracking-wider text-slate-400 font-semibold">
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Food Item</th>
                <th className="py-3 px-3">Prepared</th>
                <th className="py-3 px-3">Sold</th>
                <th className="py-3 px-3">Leftover</th>
                <th className="py-3 px-3">Waste (kg)</th>
                <th className="py-3 px-3">Revenue (₹)</th>
                <th className="py-3 px-3">Demand</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredRecords.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-3 font-medium text-slate-500 text-2xs">{r.date}</td>
                  <td className="py-3 px-3 font-bold text-slate-900">{r.foodItem}</td>
                  <td className="py-3 px-3">{r.prepared}</td>
                  <td className="py-3 px-3 text-emerald-600 font-semibold">{r.sold}</td>
                  <td className="py-3 px-3 text-amber-600 font-semibold">{r.leftover}</td>
                  <td className="py-3 px-3 text-rose-600 font-semibold">{r.wasteKg} kg</td>
                  <td className="py-3 px-3 font-bold text-slate-900">₹{r.revenue}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-2xs font-bold ${
                      r.demandLevel === 'HIGH' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {r.demandLevel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Record Modal */}
      {showAddRecord && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="font-bold text-slate-900 text-base mb-4">Log Daily Meal Sales</h3>
            <form onSubmit={handleAddRecordSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={newRecord.date}
                  onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Food Item</label>
                <select
                  value={newRecord.foodItem}
                  onChange={(e) => setNewRecord({ ...newRecord, foodItem: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50"
                >
                  {foodItems.map((f) => (
                    <option key={f.id} value={f.name}>{f.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Prepared Qty</label>
                  <input
                    type="number"
                    value={newRecord.prepared}
                    onChange={(e) => setNewRecord({ ...newRecord, prepared: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Sold Qty</label>
                  <input
                    type="number"
                    value={newRecord.sold}
                    onChange={(e) => setNewRecord({ ...newRecord, sold: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Demand Level</label>
                <select
                  value={newRecord.demandLevel}
                  onChange={(e) => setNewRecord({ ...newRecord, demandLevel: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50"
                >
                  <option value="HIGH">HIGH</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="LOW">LOW</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddRecord(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold"
                >
                  Save Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function WasteAnalyticsView({ dailyRecords }) {
  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-6">
      {/* Waste Stat Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-2xs font-semibold text-slate-500 uppercase">Monthly Waste Total</span>
          <p className="text-2xl font-black text-rose-600 mt-1">115.4 kg</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-2xs font-semibold text-slate-500 uppercase">Waste Reduction</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">12.8%</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-2xs font-semibold text-slate-500 uppercase">Estimated Money Saved</span>
          <p className="text-2xl font-black text-indigo-600 mt-1">₹8,420</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-2xs font-semibold text-slate-500 uppercase">Avg Daily Waste</span>
          <p className="text-2xl font-black text-slate-900 mt-1">16.4 kg</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Food Waste Area Chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <h4 className="font-bold text-slate-900 mb-1">Daily Food Waste Volume (kg)</h4>
          <p className="text-xs text-slate-500 mb-4">Tracking overall kitchen and table waste</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={WASTE_TREND_7_DAYS}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey="waste" stroke="#ef4444" fill="#fca5a5" fillOpacity={0.4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Waste Breakdown by Category */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <h4 className="font-bold text-slate-900 mb-1">Waste Distribution by Category</h4>
          <p className="text-xs text-slate-500 mb-4">Proportion of wasted food weight</p>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_WASTE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {CATEGORY_WASTE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Waste Producing Items & Actionable AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <h4 className="font-bold text-slate-900 mb-3">Top Waste-Producing Items</h4>
          <div className="space-y-3">
            {[
              { item: 'Veg Biryani', qty: '42 kg', pct: '36%' },
              { item: 'Rice & Dal', qty: '31 kg', pct: '26%' },
              { item: 'Chapati', qty: '24 kg', pct: '20%' },
              { item: 'Vegetables', qty: '18 kg', pct: '15%' },
            ].map((w, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <span className="font-bold text-slate-800">{w.item}</span>
                <div className="flex items-center gap-2">
                  <span className="text-rose-600 font-bold">{w.qty}</span>
                  <span className="text-2xs text-slate-400">({w.pct})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6 rounded-2xl shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <h4 className="font-bold text-base text-white">AI Waste Reduction Insights</h4>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
                <p className="font-bold text-indigo-300 mb-0.5">Veg Biryani Buffer Adjustment:</p>
                <p>Reduce preparation volume by ~8% on low-attendance days (Tuesdays/Thursdays) to eliminate ~12 kg monthly excess.</p>
              </div>

              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
                <p className="font-bold text-amber-300 mb-0.5">Cooking Oil Consumption Pattern:</p>
                <p>Cooking oil consumption is 14% higher than recommended meal portion standards. Review deep frying batch schedules.</p>
              </div>

              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
                <p className="font-bold text-emerald-300 mb-0.5">Friday Demand Dip:</p>
                <p>Friday evening demand is consistently 18% lower due to student weekend departures. Adjust prep timers accordingly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuManagementView({ foodItems, setFoodItems, showToast }) {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', category: 'Main Course', price: 60, avgDemand: 100 });

  const handleAddMenuItem = (e) => {
    e.preventDefault();
    if (!newItem.name) return;
    const added = {
      id: 'f' + (foodItems.length + 1),
      ...newItem,
      price: Number(newItem.price),
      avgDemand: Number(newItem.avgDemand),
      status: 'Available',
    };
    setFoodItems([...foodItems, added]);
    setShowAddMenu(false);
    setNewItem({ name: '', category: 'Main Course', price: 60, avgDemand: 100 });
    showToast(`Added ${added.name} to Canteen Menu!`, 'success');
  };

  const toggleStatus = (id) => {
    setFoodItems(
      foodItems.map((item) => {
        if (item.id === id) {
          const nextStatus = item.status === 'Available' ? 'Unavailable' : 'Available';
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
    showToast('Updated item availability status');
  };

  const handleDelete = (id) => {
    setFoodItems(foodItems.filter((f) => f.id !== id));
    showToast('Removed item from menu');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-slate-900 text-lg">Canteen Menu Offerings</h3>
          <p className="text-xs text-slate-500">Manage food dishes, price listings, and operational availability</p>
        </div>

        <button
          onClick={() => setShowAddMenu(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Menu Item</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {foodItems.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{item.name}</h4>
                  <span className="text-2xs text-slate-400 font-medium">{item.category}</span>
                </div>
                <span className="text-lg font-black text-indigo-600">₹{item.price}</span>
              </div>

              <div className="flex items-center gap-2 mt-3 text-xs text-slate-600">
                <span className="text-slate-400">Avg Daily Demand:</span>
                <span className="font-bold text-slate-800">{item.avgDemand} portions</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
              <button
                onClick={() => toggleStatus(item.id)}
                className={`px-3 py-1 rounded-full text-2xs font-extrabold transition ${
                  item.status === 'Available'
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {item.status}
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Menu Item Modal */}
      {showAddMenu && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="font-bold text-slate-900 text-base mb-4">Add Dish to Menu</h3>
            <form onSubmit={handleAddMenuItem} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Item Name</label>
                <input
                  type="text"
                  required
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="e.g. Chole Kulche"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Category</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50"
                >
                  <option value="Main Course">Main Course</option>
                  <option value="Breakfast/Snack">Breakfast/Snack</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Beverages">Beverages</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Avg Demand</label>
                  <input
                    type="number"
                    value={newItem.avgDemand}
                    onChange={(e) => setNewItem({ ...newItem, avgDemand: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddMenu(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ReportsView({ dailyRecords, showToast }) {
  const [timeframe, setTimeframe] = useState('Weekly');

  const handleExportCSV = () => {
    showToast('Exporting CanteenIQ_Performance_Report.csv...', 'info');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Timeframe & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          {['Daily', 'Weekly', 'Monthly'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                timeframe === tf ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 transition"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Summary Matrix */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
        <h3 className="font-bold text-slate-900 text-base">{timeframe} Executive Summary</h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-2xs font-semibold text-slate-400 block">Total Meals Served</span>
            <span className="text-xl font-black text-slate-900">2,840</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-2xs font-semibold text-slate-400 block">Avg Demand Accuracy</span>
            <span className="text-xl font-black text-emerald-600">92.4%</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-2xs font-semibold text-slate-400 block">Total Waste Weight</span>
            <span className="text-xl font-black text-rose-600">118.2 kg</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-2xs font-semibold text-slate-400 block">Total Revenue</span>
            <span className="text-xl font-black text-indigo-600">₹1,84,500</span>
          </div>
        </div>

        {/* Report Chart */}
        <div>
          <h4 className="font-bold text-slate-800 text-sm mb-3">Revenue vs Food Waste Cost Impact</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_DEMAND_TREND}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="predicted" fill="#4f46e5" name="Revenue Proxy" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" fill="#10b981" name="Optimized Demand" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsView({ settings, setSettings, showToast }) {
  const handleSave = (e) => {
    e.preventDefault();
    showToast('System settings updated successfully!', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <h3 className="font-bold text-slate-900 text-base mb-1">Canteen & AI Model Configuration</h3>
        <p className="text-xs text-slate-500 mb-6">Manage system metadata, safety thresholds, and alerts</p>

        <form onSubmit={handleSave} className="space-y-6 text-xs">
          {/* Canteen Info */}
          <div>
            <h4 className="font-bold text-slate-800 text-sm mb-3 border-b border-slate-100 pb-2">
              Canteen Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Canteen Name</label>
                <input
                  type="text"
                  value={settings.canteenName}
                  onChange={(e) => setSettings({ ...settings, canteenName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">College Name</label>
                <input
                  type="text"
                  value={settings.collegeName}
                  onChange={(e) => setSettings({ ...settings, collegeName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50"
                />
              </div>
            </div>
          </div>

          {/* Prediction Model Tuning */}
          <div>
            <h4 className="font-bold text-slate-800 text-sm mb-3 border-b border-slate-100 pb-2">
              Demand Forecast Tuning
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Preparation Safety Buffer (%)</label>
                <input
                  type="number"
                  value={settings.safetyBuffer}
                  onChange={(e) => setSettings({ ...settings, safetyBuffer: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Min Confidence Target (%)</label>
                <input
                  type="number"
                  value={settings.minConfidence}
                  onChange={(e) => setSettings({ ...settings, minConfidence: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Default Horizon</label>
                <select
                  value={settings.forecastPeriod}
                  onChange={(e) => setSettings({ ...settings, forecastPeriod: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50"
                >
                  <option value="1 Day">1 Day Ahead</option>
                  <option value="3 Days">3 Days Ahead</option>
                  <option value="1 Week">1 Week Ahead</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-xs transition"
            >
              Save Configuration Changes
            </button>
          </div>
        </form>
      </div>

      {/* Database Schema Reference Card for College Project Submission */}
      <div className="bg-slate-900 text-slate-300 p-6 rounded-2xl shadow-xs space-y-3">
        <h4 className="font-bold text-white text-sm flex items-center gap-2">
          <Info className="w-4 h-4 text-indigo-400" />
          Backend Database Schema Structure
        </h4>
        <p className="text-2xs text-slate-400">
          Relational database structure prepared for PostgreSQL / Supabase migration:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-2xs">
          <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
            <p className="font-bold text-indigo-300 mb-1">food_items</p>
            <p>id (UUID, PK)</p>
            <p>name (VARCHAR)</p>
            <p>category (VARCHAR)</p>
            <p>price (NUMERIC)</p>
            <p>avg_demand (INT)</p>
          </div>

          <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
            <p className="font-bold text-indigo-300 mb-1">daily_records</p>
            <p>id (UUID, PK)</p>
            <p>food_item_id (FK)</p>
            <p>prepared_qty (INT)</p>
            <p>sold_qty (INT)</p>
            <p>waste_kg (NUMERIC)</p>
          </div>

          <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
            <p className="font-bold text-indigo-300 mb-1">predictions</p>
            <p>id (UUID, PK)</p>
            <p>food_item_id (FK)</p>
            <p>expected_students (INT)</p>
            <p>predicted_demand (INT)</p>
            <p>confidence (NUMERIC)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
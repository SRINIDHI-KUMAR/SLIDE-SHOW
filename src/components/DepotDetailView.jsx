import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ZoomOut,
  ArrowRight,
  Boxes,
  DollarSign,
  Truck,
  Clock,
  RefreshCw,
  CheckCircle,
  TrendingUp,
  ShieldCheck,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  Package,
  Layers,
  Send
} from 'lucide-react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

export default function DepotDetailView({
  depot,
  onZoomOut,
  onNextDepot
}) {
  const chartLabels = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00', '02:00', '04:00'];

  const lineChartData = useMemo(() => {
    return {
      labels: chartLabels,
      datasets: [
        {
          label: 'Sales Demand (units)',
          data: depot.hourlySales || [],
          borderColor: '#059669',
          backgroundColor: 'rgba(5, 150, 105, 0.15)',
          borderWidth: 2.5,
          tension: 0.35,
          fill: true,
          pointBackgroundColor: '#059669',
          pointRadius: 2.5
        },
        {
          label: 'Dispatched (units)',
          data: depot.hourlyDispatch || [],
          borderColor: '#0284c7',
          backgroundColor: 'rgba(2, 132, 199, 0.15)',
          borderWidth: 2.5,
          tension: 0.35,
          fill: true,
          pointBackgroundColor: '#0284c7',
          pointRadius: 2.5
        }
      ]
    };
  }, [depot]);

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#0369a1',
        bodyColor: '#1e293b',
        borderColor: '#cbd5e1',
        borderWidth: 1,
        padding: 8,
        usePointStyle: true
      }
    },
    scales: {
      x: { grid: { color: 'rgba(226, 232, 240, 0.7)' }, ticks: { color: '#64748b', font: { size: 9 } } },
      y: { grid: { color: 'rgba(226, 232, 240, 0.7)' }, ticks: { color: '#64748b', font: { size: 9 } } }
    }
  };

  const donutChartData = useMemo(() => {
    return {
      labels: ['Fast Moving', 'Standard Velocity', 'Safety Buffer'],
      datasets: [
        {
          data: depot.stockPie || [60, 30, 10],
          backgroundColor: ['#10b981', '#0ea5e9', '#f59e0b'],
          borderColor: '#ffffff',
          borderWidth: 3
        }
      ]
    };
  }, [depot]);

  const donutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#0369a1',
        bodyColor: '#1e293b',
        borderColor: '#cbd5e1',
        borderWidth: 1
      }
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.92, opacity: 0, filter: 'blur(6px)' }}
      animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
      exit={{ scale: 0.92, opacity: 0, filter: 'blur(6px)' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="w-full flex flex-col gap-3 py-1"
    >
      
      {/* Top Depot Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/95 border border-slate-200/90 rounded-xl p-3.5 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center text-white font-black text-xl shadow-md shadow-sky-500/25">
            0{depot.id}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Depot 0{depot.id} — {depot.name}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                ACTIVE DISPATCH
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 flex flex-wrap items-center gap-2.5">
              <span>📍 {depot.region}</span>
              <span>•</span>
              <span>🏢 Storage & Dispatch Center</span>
              <span>•</span>
              <span className="text-sky-700 font-mono font-semibold">CODE: {depot.code}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={onZoomOut}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-slate-300 transition shadow-xs"
            title="Zoom out to Network Matrix"
          >
            <ZoomOut className="w-3.5 h-3.5 text-sky-600" />
            <span>Zoom Out (Matrix)</span>
          </button>
          
          <button
            onClick={onNextDepot}
            className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition"
          >
            <span>Next Depot</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 6 Key Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        
        {/* KPI 1 */}
        <div className="glass-card rounded-xl p-3 flex flex-col justify-between border-l-4 border-l-sky-500 hover:border-sky-600 transition-all group">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Current Stock</span>
            <div className="p-1 rounded-md bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition">
              <Boxes className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 tracking-tight">{depot.stockUnits.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-[10px] text-sky-700 font-semibold mt-0.5">
              <span>{depot.stockSkus.toLocaleString()} SKUs Active</span>
            </div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="glass-card rounded-xl p-3 flex flex-col justify-between border-l-4 border-l-emerald-500 hover:border-emerald-600 transition-all group">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Today's Sales</span>
            <div className="p-1 rounded-md bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition">
              <DollarSign className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 tracking-tight">${depot.salesRevenue.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-semibold mt-0.5">
              <TrendingUp className="w-3 h-3" />
              <span>{depot.salesVolume.toLocaleString()} units sold</span>
            </div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="glass-card rounded-xl p-3 flex flex-col justify-between border-l-4 border-l-blue-500 hover:border-blue-600 transition-all group">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Dispatched Today</span>
            <div className="p-1 rounded-md bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
              <Truck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 tracking-tight">{depot.dispatchUnits.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-[10px] text-blue-700 font-semibold mt-0.5">
              <span>{depot.fulfillmentRate}% Fulfillment</span>
            </div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="glass-card rounded-xl p-3 flex flex-col justify-between border-l-4 border-l-amber-500 hover:border-amber-600 transition-all group">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Pending Orders</span>
            <div className="p-1 rounded-md bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 tracking-tight">{depot.pendingOrders}</div>
            <div className="flex items-center gap-1 text-[10px] text-amber-700 font-semibold mt-0.5">
              <span>{depot.urgentOrders} High Priority</span>
            </div>
          </div>
        </div>

        {/* KPI 5 */}
        <div className="glass-card rounded-xl p-3 flex flex-col justify-between border-l-4 border-l-purple-500 hover:border-purple-600 transition-all group">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Stock Turnover</span>
            <div className="p-1 rounded-md bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition">
              <RefreshCw className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 tracking-tight">{depot.stockDays} Days</div>
            <div className="w-full bg-slate-200 rounded-full h-1 mt-1.5 overflow-hidden">
              <div className="bg-purple-500 h-full rounded-full" style={{ width: `${Math.min(100, depot.stockDays * 6)}%` }}></div>
            </div>
          </div>
        </div>

        {/* KPI 6 */}
        <div className="glass-card rounded-xl p-3 flex flex-col justify-between border-l-4 border-l-teal-500 hover:border-teal-600 transition-all group">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Dispatch OTD</span>
            <div className="p-1 rounded-md bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition">
              <CheckCircle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 tracking-tight">{depot.otd}%</div>
            <div className="flex items-center gap-1 text-[10px] text-teal-700 font-semibold mt-0.5">
              <ShieldCheck className="w-3 h-3" />
              <span>Target: &gt;95.0%</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        
        {/* Left: Line Chart */}
        <div className="lg:col-span-8 glass-card rounded-xl p-3.5 shadow-xs flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between mb-2 pb-2 border-b border-slate-100 gap-2">
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <LineChartIcon className="w-4 h-4 text-sky-600" />
                Sales Orders vs. Dispatch Throughput
              </h3>
              <p className="text-[11px] text-slate-500">Hourly sales intake vs outbound dispatch volume across operating shifts</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-emerald-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Sales Volume
              </span>
              <span className="flex items-center gap-1.5 text-sky-600">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span> Dispatched
              </span>
            </div>
          </div>
          <div className="h-[180px] w-full">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>

        {/* Right: Donut Chart */}
        <div className="lg:col-span-4 glass-card rounded-xl p-3.5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-emerald-600" />
                Inventory Distribution
              </h3>
              <p className="text-[11px] text-slate-500">Stock turnover velocity mix</p>
            </div>
            <span className="text-xs font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
              {(depot.stockUnits / 1000).toFixed(1)}k Units
            </span>
          </div>

          <div className="flex items-center justify-center gap-4 py-1">
            <div className="w-[120px] h-[120px] relative flex items-center justify-center">
              <Doughnut data={donutChartData} options={donutChartOptions} />
            </div>
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-1 text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Fast Moving
                </span>
                <b className="font-mono text-slate-900">{depot.stockPie[0]}%</b>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-1 text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-sky-500"></span> Standard
                </span>
                <b className="font-mono text-slate-900">{depot.stockPie[1]}%</b>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-1 text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span> Safety Buffer
                </span>
                <b className="font-mono text-slate-900">{depot.stockPie[2]}%</b>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Row: Top SKUs & Live Outbound Dispatch Manifest */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        
        {/* Top SKUs */}
        <div className="lg:col-span-5 glass-card rounded-xl p-3.5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Package className="w-4 h-4 text-sky-600" />
              High Velocity Stock SKUs
            </h3>
            <span className="text-[10px] text-slate-500">Stock Availability</span>
          </div>
          <div className="space-y-2">
            {(depot.topSkus || []).map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200/90 rounded-lg p-2 flex flex-col justify-between gap-1 hover:border-sky-300 transition shadow-2xs"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 truncate max-w-[220px]" title={item.name}>
                    {item.name}
                  </span>
                  <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded font-bold ${
                    item.status === 'Healthy'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                      : 'bg-amber-50 text-amber-700 border border-amber-300'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>Sold Today: <b className="text-slate-800">{item.sold.toLocaleString()}</b></span>
                  <span>In Stock: <b className="text-sky-700 font-bold">{item.stock.toLocaleString()}</b></span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-sky-500 to-emerald-500 h-full rounded-full"
                    style={{ width: `${Math.min(100, (item.sold / item.stock) * 300)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Outbound Dispatch Manifest */}
        <div className="lg:col-span-7 glass-card rounded-xl p-3.5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Send className="w-4 h-4 text-emerald-600" />
              Live Outbound Dispatch Manifest
            </h3>
            <span className="text-[10px] font-mono text-slate-500">Showing 4 latest dispatches</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-slate-400 border-b border-slate-200">
                  <th className="pb-1.5 font-bold">Order ID</th>
                  <th className="pb-1.5 font-bold">Client / Destination</th>
                  <th className="pb-1.5 font-bold">Quantity</th>
                  <th className="pb-1.5 font-bold">Value</th>
                  <th className="pb-1.5 font-bold">Status</th>
                  <th className="pb-1.5 font-bold">Bay</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(depot.orders || []).map((ord, idx) => {
                  let badge = "bg-sky-50 text-sky-700 border-sky-200";
                  if (ord.status === 'Dispatched') badge = "bg-emerald-50 text-emerald-700 border-emerald-300";
                  if (ord.status === 'Loading') badge = "bg-blue-50 text-blue-700 border-blue-300";
                  if (ord.status === 'Picking') badge = "bg-amber-50 text-amber-700 border-amber-300";
                  if (ord.status === 'Ready to Ship') badge = "bg-purple-50 text-purple-700 border-purple-300";

                  return (
                    <tr key={idx} className="hover:bg-slate-50/80 transition">
                      <td className="py-1.5 font-mono text-sky-700 font-bold">{ord.id}</td>
                      <td className="py-1.5 text-slate-800 font-medium">{ord.client}</td>
                      <td className="py-1.5 font-mono text-slate-900 font-bold">{ord.qty}</td>
                      <td className="py-1.5 font-mono text-emerald-700 font-bold">{ord.val}</td>
                      <td className="py-1.5">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${badge}`}>
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-1.5 font-mono text-slate-500">{ord.bay}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </motion.div>
  );
}

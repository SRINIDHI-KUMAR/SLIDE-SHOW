import React from 'react';
import { Network } from 'lucide-react';

export default function PillsNav({ depots, activeDepotIndex, onSelectDepot }) {
  const totalStock = depots.reduce((acc, d) => acc + (d.stockUnits || 0), 0);
  const totalSales = depots.reduce((acc, d) => acc + (d.salesRevenue || 0), 0);
  const totalDispatch = depots.reduce((acc, d) => acc + (d.dispatchUnits || 0), 0);
  const avgFulfillment = (
    depots.reduce((acc, d) => acc + (d.fulfillmentRate || 0), 0) / (depots.length || 1)
  ).toFixed(1);

  return (
    <nav className="bg-white/95 border-b border-slate-200/90 py-1.5 px-4 overflow-x-auto shadow-2xs">
      <div className="max-w-[1750px] mx-auto flex items-center justify-between gap-4 min-w-max">
        
        {/* 7 Depot Quick Pills */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
            <Network className="w-3.5 h-3.5 text-sky-600" /> Depots (1-7):
          </span>
          <div className="flex items-center gap-1.5">
            {depots.map((depot, idx) => {
              const isCurrent = idx === activeDepotIndex;
              const isReached = idx < activeDepotIndex;

              let pillStyle = "bg-white text-slate-600 border-slate-200 hover:bg-slate-50";
              let dotColor = "bg-slate-300";

              if (isCurrent) {
                pillStyle = "bg-sky-50 text-sky-700 border-sky-300 shadow-xs font-bold";
                dotColor = "bg-sky-500 animate-ping";
              } else if (isReached) {
                pillStyle = "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 font-semibold";
                dotColor = "bg-emerald-500";
              }

              return (
                <button
                  key={depot.id}
                  onClick={() => onSelectDepot(idx)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 border ${pillStyle}`}
                >
                  <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                  <span>0{depot.id}</span>
                  <span className="hidden md:inline text-[11px] opacity-75">{depot.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Real-time Global Counters */}
        <div className="flex items-center gap-4 text-xs text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Total Stock: <b className="text-slate-900 font-mono">{totalStock.toLocaleString()}</b> units
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-500"></span>
            Daily Sales: <b className="text-sky-700 font-mono">${totalSales.toLocaleString()}</b>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Dispatched: <b className="text-blue-700 font-mono">{totalDispatch.toLocaleString()}</b> units (
            <span className="text-emerald-600 font-bold">{avgFulfillment}%</span>)
          </span>
        </div>

      </div>
    </nav>
  );
}

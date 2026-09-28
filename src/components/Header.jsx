import React, { useState, useEffect } from 'react';
import { Network, LayoutDashboard, FileSpreadsheet, Pause, Play, ChevronLeft, ChevronRight, Maximize, RotateCcw } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function Header({
  activeDepotIndex,
  depots,
  viewMode,
  setViewMode,
  isPlaying,
  setIsPlaying,
  remainingSeconds,
  stepDuration,
  setStepDuration,
  onStepChange,
  onDepotsUpdate,
  onReplaySequence,
  isWaitingAtDepot2
}) {
  const [liveTime, setLiveTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setLiveTime(new Date().toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleExcelUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(firstSheet);

        if (rows && rows.length > 0) {
          const updated = [...depots];
          rows.slice(0, 7).forEach((row, idx) => {
            if (updated[idx]) {
              if (row.Depot || row.Name) updated[idx].name = row.Depot || row.Name;
              if (row.Region) updated[idx].region = row.Region;
              if (row.Code) updated[idx].code = row.Code;
              if (row.Stock || row.StockUnits) updated[idx].stockUnits = Number(row.Stock || row.StockUnits);
              if (row.Sales || row.SalesRevenue) updated[idx].salesRevenue = Number(row.Sales || row.SalesRevenue);
              if (row.Dispatch || row.DispatchUnits) updated[idx].dispatchUnits = Number(row.Dispatch || row.DispatchUnits);
              if (row.Fulfillment || row.FulfillmentRate) updated[idx].fulfillmentRate = Number(row.Fulfillment || row.FulfillmentRate);
              if (row.OTD) updated[idx].otd = Number(row.OTD);
            }
          });
          onDepotsUpdate(updated);
          alert(`✅ Excel successfully loaded for ${Math.min(rows.length, 7)} depots!`);
        }
      } catch (err) {
        console.error(err);
        alert('Error parsing Excel / CSV file. Please upload a valid spreadsheet.');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => console.log(err));
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  };

  const currentDepot = depots[activeDepotIndex] || depots[0];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/90 py-2.5 px-4 sticky top-0 z-40 shadow-xs">
      <div className="max-w-[1750px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center text-white font-black text-lg shadow-sm shadow-sky-500/30">
            7D
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-black text-sm sm:text-base tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-sky-700 bg-clip-text text-transparent">
                STOCK, SALES & DISPATCH COMMAND
              </h1>
              <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-200">
                React Slideshow
              </span>
            </div>
            <p className="text-[11px] text-slate-500 flex items-center gap-2">
              <span>Inventory • Daily Sales • Live Dispatch Telemetry</span>
              <span>•</span>
              <span className="font-mono text-sky-600 font-semibold">{liveTime || '12:00:00 PM'}</span>
            </p>
          </div>
        </div>

        {/* Center: Direct View Switch Buttons */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-1 rounded-xl shadow-2xs">
          <button
            onClick={() => setViewMode('network')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border ${
              viewMode === 'network'
                ? 'bg-sky-50 text-sky-700 border-sky-300 shadow-xs font-bold'
                : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900'
            }`}
          >
            <Network className="w-3.5 h-3.5 text-sky-600" />
            <span>Network Matrix</span>
          </button>
          
          <button
            onClick={() => setViewMode('depot')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border ${
              viewMode === 'depot'
                ? 'bg-sky-50 text-sky-700 border-sky-300 shadow-xs font-bold'
                : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-emerald-600" />
            <span>#{currentDepot.id.toString().padStart(2, '0')} {currentDepot.name.split(' ')[0]}</span>
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 flex-wrap justify-end">
          
          {/* Replay Demonstration Flow Button */}
          <button
            onClick={onReplaySequence}
            title="Replay sequence: 01 Zoom In -> 01 Zoom Out -> Advance to 02 -> Wait at 02"
            className="px-2.5 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5 text-sky-600" />
            <span>Replay Sequence</span>
          </button>

          {/* Excel Upload */}
          <label className="cursor-pointer px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-xs">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Upload Excel</span>
            <input type="file" accept=".xlsx, .xls, .csv" className="hidden" onChange={handleExcelUpload} />
          </label>

          {/* Countdown Indicator */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-2.5 py-1.5 rounded-xl text-xs shadow-xs">
            <div className="relative w-5 h-5 flex items-center justify-center">
              <svg className="w-5 h-5 -rotate-90">
                <circle cx="10" cy="10" r="7.5" stroke="currentColor" stroke-width="2" className="text-slate-200" fill="none" />
                <circle
                  cx="10"
                  cy="10"
                  r="7.5"
                  stroke="currentColor"
                  stroke-width="2"
                  className="text-sky-600 transition-all duration-100"
                  strokeDasharray="47.1"
                  strokeDashoffset={47.1 * (1 - (remainingSeconds / (stepDuration / 1000)))}
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-[9px] font-mono font-bold text-sky-700">{Math.ceil(remainingSeconds)}</span>
            </div>
            <span className="hidden sm:inline text-slate-600 text-[11px] font-medium">
              {isWaitingAtDepot2 ? 'Holding at 02' : 'Timer'}
            </span>
          </div>

          {/* Play / Pause Toggle */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition shadow-xs active:scale-95 text-white ${
              isPlaying ? 'bg-sky-600 hover:bg-sky-500' : 'bg-emerald-600 hover:bg-emerald-500'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Resume'}</span>
          </button>

          {/* Step Arrows */}
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-0.5 shadow-xs">
            <button
              onClick={() => onStepChange(-1)}
              title="Previous Depot"
              className="p-1 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onStepChange(1)}
              title="Next Depot"
              className="p-1 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Speed Select */}
          <select
            value={stepDuration}
            onChange={(e) => setStepDuration(Number(e.target.value))}
            className="bg-white text-slate-700 border border-slate-200 text-xs rounded-xl px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer shadow-xs"
          >
            <option value={5000}>5s</option>
            <option value={8000}>8s</option>
            <option value={12000}>12s</option>
          </select>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            title="Toggle Fullscreen"
            className="p-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 rounded-xl transition shadow-xs"
          >
            <Maximize className="w-4 h-4" />
          </button>

        </div>

      </div>
    </header>
  );
}

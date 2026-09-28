import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { NODE_POSITIONS, SVG_SEGMENTS } from '../data/depots';

export default function NetworkView({
  depots,
  activeDepotIndex,
  onNodeClick,
  zoomState,
  zoomTargetIndex,
  animatingSegmentIndex,
  segmentProgress
}) {
  const containerRef = useRef(null);

  // Compute transform origin percentage for the zoom target depot
  const zoomTargetPos = NODE_POSITIONS[zoomTargetIndex] || NODE_POSITIONS[0];
  const originStyle = {
    transformOrigin: `${zoomTargetPos.xPct}% ${zoomTargetPos.yPct}%`
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-center items-center py-4 h-full overflow-hidden">
      
      {/* Clean Transparent Pipeline Stage */}
      <div className="relative w-full flex-1 min-h-[460px] flex items-center justify-center overflow-hidden px-4 sm:px-6">
        
        {/* Zoomable Container with smooth Framer Motion transform */}
        <motion.div
          ref={containerRef}
          style={originStyle}
          animate={{
            scale: zoomState === 'zooming-in' || zoomState === 'zoomed-in' ? 3.8 : 1,
            opacity: zoomState === 'zooming-in' || zoomState === 'zoomed-in' ? 0 : 1,
            filter: zoomState === 'zooming-in' || zoomState === 'zoomed-in' ? 'blur(6px)' : 'blur(0px)'
          }}
          transition={{
            scale: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.5, ease: 'easeOut' },
            filter: { duration: 0.5, ease: 'easeOut' }
          }}
          className="relative w-full min-w-[1100px] max-w-[1600px] h-[360px] mx-auto pointer-events-auto"
        >
          
          {/* Static SVG Wave Timeline with 6 Dynamic Segments */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1200 360"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="activeTrackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="50%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>

            {SVG_SEGMENTS.map((seg) => {
              const isFullyReached = seg.to <= activeDepotIndex;
              const isCurrentlyDrawing = seg.id === animatingSegmentIndex;

              return (
                <g key={seg.id} id={`segment-${seg.id}`}>
                  {/* Background Base Track */}
                  <path
                    d={seg.d}
                    stroke="#cbd5e1"
                    strokeWidth="5"
                    strokeLinecap="round"
                    fill="none"
                    opacity={isFullyReached ? 0 : 0.4}
                  />

                  {/* Upcoming Dotted Line */}
                  <path
                    d={seg.d}
                    stroke="#0284c7"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="6 9"
                    fill="none"
                    opacity={isFullyReached ? 0 : 0.85}
                  />

                  {/* Active Glow Path */}
                  {(isFullyReached || isCurrentlyDrawing) && (
                    <path
                      d={seg.d}
                      stroke="#38bdf8"
                      strokeWidth="16"
                      strokeLinecap="round"
                      strokeOpacity="0.32"
                      fill="none"
                      style={{
                        strokeDasharray: isCurrentlyDrawing ? 350 : 'none',
                        strokeDashoffset: isCurrentlyDrawing ? 350 * (1 - segmentProgress) : 0,
                        transition: isCurrentlyDrawing ? 'stroke-dashoffset 0.05s linear' : 'none'
                      }}
                    />
                  )}

                  {/* Active Solid Gradient Tube */}
                  {(isFullyReached || isCurrentlyDrawing) && (
                    <path
                      d={seg.d}
                      stroke="url(#activeTrackGrad)"
                      strokeWidth="7"
                      strokeLinecap="round"
                      fill="none"
                      style={{
                        strokeDasharray: isCurrentlyDrawing ? 350 : 'none',
                        strokeDashoffset: isCurrentlyDrawing ? 350 * (1 - segmentProgress) : 0,
                        transition: isCurrentlyDrawing ? 'stroke-dashoffset 0.05s linear' : 'none'
                      }}
                    />
                  )}

                  {/* Pulse Flow Particle Dash */}
                  {isFullyReached && (
                    <path
                      d={seg.d}
                      stroke="#ffffff"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="8 14"
                      fill="none"
                      className="pipeline-flow-fast"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* 7 Node Medallions Layer */}
          <div className="absolute inset-0 w-full h-full pointer-events-auto">
            {depots.map((depot, idx) => {
              const pos = NODE_POSITIONS[idx];
              const isCurrent = idx === activeDepotIndex;
              const isReached = idx < activeDepotIndex;

              let circleClasses = "bg-white border-2 border-dashed border-slate-300 hover:border-slate-400 text-slate-800 shadow-sm hover:scale-105";
              let depotLabelColor = "text-slate-400";
              let numColor = "text-slate-800";
              let badgeHtml = (
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full mt-0.5 bg-slate-100 text-slate-500 border border-slate-200">
                  {depot.fulfillmentRate}% Fill
                </span>
              );

              if (isCurrent) {
                circleClasses = "bg-gradient-to-br from-sky-500 via-teal-500 to-blue-600 text-white ring-4 ring-sky-300 scale-110 shadow-xl shadow-sky-500/30";
                depotLabelColor = "text-sky-100 font-bold";
                numColor = "text-white font-black";
                badgeHtml = (
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full mt-0.5 bg-black/25 text-white">
                    {depot.fulfillmentRate}% Fill
                  </span>
                );
              } else if (isReached) {
                circleClasses = "bg-white border-4 border-sky-600 text-slate-900 shadow-lg hover:scale-105";
                depotLabelColor = "text-sky-600 font-semibold";
                numColor = "text-slate-900 font-black";
                badgeHtml = (
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full mt-0.5 bg-emerald-50 text-emerald-700 border border-emerald-300">
                    ✓ {depot.fulfillmentRate}%
                  </span>
                );
              }

              return (
                <div
                  key={depot.id}
                  onClick={() => onNodeClick(idx)}
                  style={{
                    left: `${pos.xPct}%`,
                    top: `${pos.yPct}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  className="absolute flex flex-col items-center justify-center cursor-pointer group select-none"
                >
                  {/* Outer Ping Glow on Active Node */}
                  {isCurrent && (
                    <div className="absolute -inset-3 rounded-full border-2 border-sky-400/80 animate-ping pointer-events-none" />
                  )}

                  {/* Main Circle Medallion */}
                  <div
                    id={`node-circle-${idx}`}
                    className={`relative w-20 h-20 sm:w-22 sm:h-22 rounded-full flex flex-col items-center justify-center transition-all duration-300 ${circleClasses}`}
                  >
                    <span className={`text-[9px] font-mono uppercase tracking-widest ${depotLabelColor}`}>
                      Depot
                    </span>
                    <span className={`text-xl sm:text-2xl font-black ${numColor}`}>
                      0{depot.id}
                    </span>
                    {badgeHtml}
                  </div>

                  {/* Bottom Text Label & Sales */}
                  <div className="mt-2 text-center transition-all duration-300 pointer-events-none">
                    <div className={`text-xs font-bold ${isCurrent ? 'text-sky-700 scale-105' : 'text-slate-700 group-hover:text-slate-900'}`}>
                      {depot.name}
                    </div>
                    <div className="text-[10px] font-mono font-bold text-emerald-600">
                      ${(depot.salesRevenue / 1000).toFixed(0)}k Sales
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </motion.div>

      </div>
    </div>
  );
}

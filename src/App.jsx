import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import PillsNav from './components/PillsNav';
import NetworkView from './components/NetworkView';
import DepotDetailView from './components/DepotDetailView';
import { INITIAL_DEPOTS } from './data/depots';

export default function App() {
  const [depots, setDepots] = useState(INITIAL_DEPOTS);
  const [activeDepotIndex, setActiveDepotIndex] = useState(0);
  const [viewMode, setViewMode] = useState('network'); // 'network' | 'depot'
  
  // Zoom animation states
  const [zoomState, setZoomState] = useState('normal'); // 'normal' | 'zooming-in' | 'zoomed-in' | 'zooming-out'
  const [zoomTargetIndex, setZoomTargetIndex] = useState(0);

  // Timeline segment drawing animation
  const [animatingSegmentIndex, setAnimatingSegmentIndex] = useState(null);
  const [segmentProgress, setSegmentProgress] = useState(0);

  // Sequence and timer controls
  const [isPlaying, setIsPlaying] = useState(true);
  const [stepDuration, setStepDuration] = useState(8000);
  const [remainingSeconds, setRemainingSeconds] = useState(3.5);
  const [sequenceStep, setSequenceStep] = useState(0); // 0: Start at 01, 1: In 01, 2: Zooming out, 3: Advancing to 02, 4: Holding at 02
  const [isWaitingAtDepot2, setIsWaitingAtDepot2] = useState(false);

  const sequenceRef = useRef({
    step: 0,
    isPlaying: true,
    viewMode: 'network',
    activeDepotIndex: 0
  });

  // Keep ref synchronized
  useEffect(() => {
    sequenceRef.current = {
      step: sequenceStep,
      isPlaying,
      viewMode,
      activeDepotIndex
    };
  }, [sequenceStep, isPlaying, viewMode, activeDepotIndex]);

  // Main Automated Demo Sequence
  // Step 0: On Network Matrix at 01 -> Zoom into 01
  // Step 1: In Depot 01 dashboard -> Zoom out from 01
  // Step 2: Back on Network Matrix at 01 -> Animate timeline to 02
  // Step 3: Arrived at 02 -> HOLD THERE!
  useEffect(() => {
    if (!isPlaying || isWaitingAtDepot2) return;

    let timeoutId;

    if (sequenceStep === 0) {
      // Step 0: Start at Depot 01 on Network Matrix. Wait 3.5s then zoom in to 1st depot!
      setRemainingSeconds(3.5);
      const timerStart = Date.now();
      const interval = setInterval(() => {
        const elapsed = (Date.now() - timerStart) / 1000;
        setRemainingSeconds(Math.max(0, 3.5 - elapsed));
      }, 100);

      timeoutId = setTimeout(() => {
        clearInterval(interval);
        executeZoomIn(0, () => {
          setSequenceStep(1);
        });
      }, 3500);

      return () => {
        clearInterval(interval);
        clearTimeout(timeoutId);
      };
    } else if (sequenceStep === 1) {
      // Step 1: Detailed Depot 01 view is shown. Wait 5s then zoom out from 1st depot!
      setRemainingSeconds(5.0);
      const timerStart = Date.now();
      const interval = setInterval(() => {
        const elapsed = (Date.now() - timerStart) / 1000;
        setRemainingSeconds(Math.max(0, 5.0 - elapsed));
      }, 100);

      timeoutId = setTimeout(() => {
        clearInterval(interval);
        executeZoomOut(0, () => {
          setSequenceStep(2);
        });
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeoutId);
      };
    } else if (sequenceStep === 2) {
      // Step 2: We have zoomed out to Network Matrix at Depot 01.
      // Pause 700ms, then smoothly animate the timeline & marker from 01 to 02!
      timeoutId = setTimeout(() => {
        animateTimelineToNext(0, 1, () => {
          // Step 3: Arrived at Depot 02 -> WAIT THERE!
          setSequenceStep(3);
          setIsWaitingAtDepot2(true);
          setIsPlaying(false);
          setRemainingSeconds(0);
        });
      }, 700);

      return () => clearTimeout(timeoutId);
    }
  }, [sequenceStep, isPlaying, isWaitingAtDepot2]);

  // Zoom In Function
  const executeZoomIn = (targetIdx, callback) => {
    setZoomTargetIndex(targetIdx);
    setZoomState('zooming-in');

    setTimeout(() => {
      setViewMode('depot');
      setActiveDepotIndex(targetIdx);
      setZoomState('normal');
      if (callback) callback();
    }, 650);
  };

  // Zoom Out Function
  const executeZoomOut = (targetIdx, callback) => {
    setZoomTargetIndex(targetIdx);
    setViewMode('network');
    setZoomState('zooming-out');

    setTimeout(() => {
      setZoomState('normal');
      if (callback) callback();
    }, 650);
  };

  // Animate Timeline Line Drawing from 01 to 02
  const animateTimelineToNext = (fromIdx, toIdx, callback) => {
    setAnimatingSegmentIndex(fromIdx);
    setSegmentProgress(0);

    const duration = 1000; // 1 second smooth beam travel
    const startTime = Date.now();

    const frame = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      setSegmentProgress(progress);

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        // Line reached destination depot
        setActiveDepotIndex(toIdx);
        setAnimatingSegmentIndex(null);
        setSegmentProgress(0);
        if (callback) callback();
      }
    };

    requestAnimationFrame(frame);
  };

  // Replay Sequence Handler
  const handleReplaySequence = () => {
    setIsWaitingAtDepot2(false);
    setIsPlaying(true);
    setViewMode('network');
    setActiveDepotIndex(0);
    setZoomTargetIndex(0);
    setZoomState('normal');
    setAnimatingSegmentIndex(null);
    setSegmentProgress(0);
    setSequenceStep(0);
  };

  // Manual Node Click
  const handleNodeClick = (idx) => {
    setActiveDepotIndex(idx);
    executeZoomIn(idx);
  };

  // Manual Step Change
  const handleStepChange = (direction) => {
    const nextIdx = (activeDepotIndex + direction + depots.length) % depots.length;
    setActiveDepotIndex(nextIdx);
  };

  const currentDepot = depots[activeDepotIndex] || depots[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-sky-500 selection:text-white">
      
      {/* Top Header Bar */}
      <Header
        activeDepotIndex={activeDepotIndex}
        depots={depots}
        viewMode={viewMode}
        setViewMode={setViewMode}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        remainingSeconds={remainingSeconds}
        stepDuration={stepDuration}
        setStepDuration={setStepDuration}
        onStepChange={handleStepChange}
        onDepotsUpdate={setDepots}
        onReplaySequence={handleReplaySequence}
        isWaitingAtDepot2={isWaitingAtDepot2}
      />

      {/* 7 Depot Quick Navigator Pills */}
      <PillsNav
        depots={depots}
        activeDepotIndex={activeDepotIndex}
        onSelectDepot={(idx) => {
          setActiveDepotIndex(idx);
          if (viewMode === 'network') {
            executeZoomIn(idx);
          }
        }}
      />

      {/* Main Interactive Stage */}
      <main className="flex-1 max-w-[1750px] w-full mx-auto p-3 sm:p-4 flex flex-col justify-start relative overflow-hidden">
        
        {viewMode === 'network' ? (
          <NetworkView
            depots={depots}
            activeDepotIndex={activeDepotIndex}
            onNodeClick={handleNodeClick}
            zoomState={zoomState}
            zoomTargetIndex={zoomTargetIndex}
            animatingSegmentIndex={animatingSegmentIndex}
            segmentProgress={segmentProgress}
          />
        ) : (
          <DepotDetailView
            depot={currentDepot}
            onZoomOut={() => executeZoomOut(activeDepotIndex)}
            onNextDepot={() => handleStepChange(1)}
          />
        )}

      </main>

      {/* Sequence Notification Toast */}
      {isWaitingAtDepot2 && (
        <div className="fixed bottom-4 right-4 z-50 bg-white/95 backdrop-blur-md border border-sky-300 shadow-xl rounded-2xl p-4 max-w-md animate-bounce">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white font-bold flex items-center justify-center text-base shadow-sm">
              ✓
            </div>
            <div>
              <div className="text-sm font-extrabold text-slate-900">
                Sequence Completed & Holding at Depot 02!
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                Zoomed in at 01 → Zoomed out at 01 → Advanced timeline to 02 (Coimbatore) → Paused.
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

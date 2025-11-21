'use client';

import { useEffect, useState } from 'react';
import { Html, PerformanceMonitor as DreiPerformanceMonitor } from '@react-three/drei';

export default function PerformanceMonitor() {
  const [factor, setFactor] = useState(1);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--animation-factor', factor.toString());
  }, [factor]);

  return (
    <DreiPerformanceMonitor
      onChange={({ factor: next }) => setFactor(next)}
      onFallback={() => setFactor(0.6)}
    >
      <Html position={[0, 4, 0]} center>
        <div className="rounded-full bg-black/70 px-4 py-1 text-xs uppercase tracking-widest text-orange-200">
          {`Perf x${factor.toFixed(2)}`}
        </div>
      </Html>
    </DreiPerformanceMonitor>
  );
}

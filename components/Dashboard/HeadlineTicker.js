'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

export default function HeadlineTicker({
  items = [],
  speed = 50,          // normal speed
  hoverSpeed = 20,     // 👈 slow speed on hover
  className = '',
  rightToLeft = true,
}) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);

  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(20);
  const [hovered, setHovered] = useState(false);

  // duplicate items for seamless loop
  const loopItems = useMemo(() => {
  if (items.length <= 2) {
    // repeat aggressively to avoid visible seams
    return [...items, ...items, ...items, ...items, ...items];
  }
  return [...items, ...items];
}, [items]);


  useEffect(() => {
    const calc = () => {
      if (!wrapRef.current || !trackRef.current) return;

      const trackWidth = trackRef.current.scrollWidth / 2; // 👈 EXACT half
      setDistance(trackWidth);

      const pxPerSec = hovered ? hoverSpeed : speed;
      const sec = Math.max(8, trackWidth / pxPerSec);

      setDuration(sec);
    };

    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [items, speed, hoverSpeed, hovered]);

  if (!items.length) return null;

  return (
    <div
      ref={wrapRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={[
        'w-full overflow-hidden rounded-2xl border border-[var(--selago)] bg-white shadow-xl',
        'transition-all duration-200',
        'hover:shadow-2xl hover:border-[var(--rock-blue)]/40',
        className,
      ].join(' ')}
    >
      <div
        className="relative"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div
          ref={trackRef}
          className="flex items-center w-max gap-8 px-6 py-3 animate-ticker"
          style={{
            ['--distance']: `${distance}px`,
            ['--duration']: `${duration}s`,
          }}
        >
          {loopItems.map((it, idx) => (
            <div key={`${it.key}-${idx}`} className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-xs font-semibold text-[var(--regent-gray)]">
                {it.label}
              </span>
              <span className="text-sm font-bold text-[var(--port-gore)]">
                {it.value}
              </span>
              {it.subValue && (
                <span className="text-xs text-[var(--regent-gray)]">
                  {it.subValue}
                </span>
              )}
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--selago)]" />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-ticker {
          animation: ticker var(--duration) linear infinite;
        }

        @keyframes ticker {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(${rightToLeft ? 'calc(-1 * var(--distance))' : 'var(--distance)'});
          }
        }
      `}</style>
    </div>
  );
}

'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

export default function HeadlineTicker({
  title,
  subtitle,
  leftIcon: LeftIcon,
  rightSlot = null, // header right content (we will put base selector + refresh here)
  items = [],
  speed = 120,
  pauseOnHover = true,
  className = '',
  rightToLeft = true,
  gap = 28,
}) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);

  const [duration, setDuration] = useState(18);
  const [repeat, setRepeat] = useState(2);

  const hasHeader = Boolean(title || subtitle || LeftIcon || rightSlot);

  const repeatedItems = useMemo(() => {
    if (!items?.length) return [];
    const out = [];
    for (let i = 0; i < repeat; i++) out.push(...items);
    return out;
  }, [items, repeat]);

  useEffect(() => {
    const calc = () => {
      if (!wrapRef.current || !trackRef.current) return;

      const wrapW = wrapRef.current.getBoundingClientRect().width;
      const trackW = trackRef.current.getBoundingClientRect().width;

      // ✅ ensure track is long enough (kills blank gaps)
      if (trackW < wrapW * 2 && items.length > 0 && repeat < 10) {
        setRepeat((r) => Math.min(10, r + 1));
        return;
      }

      const travel = Math.max(trackW / 2, wrapW);
      const sec = Math.max(10, travel / speed);
      setDuration(sec);
    };

    calc();
    const t = setTimeout(calc, 60);

    window.addEventListener('resize', calc);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', calc);
    };
  }, [items, speed, repeat]);

  if (!items?.length) return null;

  return (
    <div
      ref={wrapRef}
      className={[
        'group w-full overflow-hidden rounded-2xl border border-[var(--selago)] bg-white shadow-xl',
        'transition-all duration-200 hover:shadow-2xl hover:border-[var(--rock-blue)]/40',
        className,
      ].join(' ')}
    >
      {/* ✅ HEADER ROW */}
      {hasHeader && (
        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          <div className="flex items-center gap-2 min-w-0">
            {LeftIcon ? (
              <div className="w-8 h-8 rounded-xl bg-[var(--selago)] flex items-center justify-center">
                <LeftIcon className="w-4 h-4 text-[var(--port-gore)]" />
              </div>
            ) : null}

            <div className="min-w-0">
              {title ? (
                <div className="text-sm font-bold text-[var(--port-gore)] leading-tight truncate">
                  {title}
                </div>
              ) : null}
              {subtitle ? (
                <div className="text-xs text-[var(--regent-gray)] leading-tight truncate">
                  {subtitle}
                </div>
              ) : null}
            </div>
          </div>

          {rightSlot ? <div className="shrink-0">{rightSlot}</div> : null}
        </div>
      )}

      {/* ✅ TICKER ROW — FORCED BELOW HEADER */}
      <div
        className={hasHeader ? 'pt-2 pb-3' : 'py-3'}
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
        }}
      >
        <div
          ref={trackRef}
          className={[
            'flex items-center w-max px-4',
            'animate-ticker',
            pauseOnHover ? 'group-hover:[animation-play-state:paused]' : '',
          ].join(' ')}
          style={{
            ['--ticker-duration']: `${duration}s`,
            columnGap: `${gap}px`,
          }}
        >
          {repeatedItems.map((it, idx) => {
            const Icon = it.icon;
            return (
              <div
                key={`${it.key}-${idx}`}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                {Icon ? (
                  <Icon className="w-4 h-4 text-[var(--regent-gray)]" />
                ) : null}

                <span className="text-xs font-semibold text-[var(--regent-gray)]">
                  {it.label}
                </span>

                <span className="text-sm font-bold text-[var(--port-gore)]">
                  {it.value}
                </span>

                {it.subValue ? (
                  <span className="text-xs text-[var(--regent-gray)]">
                    {it.subValue}
                  </span>
                ) : null}

                <span className="w-1.5 h-1.5 rounded-full bg-[var(--selago)]" />
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .animate-ticker {
          animation: ticker var(--ticker-duration) linear infinite;
        }
        @keyframes ticker {
          from {
            transform: translateX(${rightToLeft ? '0' : '-50%'});
          }
          to {
            transform: translateX(${rightToLeft ? '-50%' : '0'});
          }
        }
      `}</style>
    </div>
  );
}

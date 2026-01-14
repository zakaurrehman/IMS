'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

export default function HeadlineTicker({
  title,
  subtitle,
  leftIcon: LeftIcon,
  rightSlot = null,
  items = [],
  speed = 60,
  pauseOnHover = true,
  className = '',
  rightToLeft = true,
  gap = 28,
  variant = 'fx', // "fx" | "metal"
}) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);

  const [duration, setDuration] = useState(18);
  const [repeat, setRepeat] = useState(2);

  const hasHeader = Boolean(title || subtitle || LeftIcon || rightSlot);

  // ✅ THEME MAP
  // IMPORTANT: metal is now SAME as fx (blue theme)
  const theme = useMemo(() => {
    const fxTheme = {
      shell:
        'border border-blue-100/70 bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-cyan-50/60 shadow-[0_12px_30px_-18px_rgba(37,99,235,0.45)]',
      headerIconWrap:
        'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-[0_10px_20px_-12px_rgba(37,99,235,0.6)]',
      titleText: 'text-slate-900',
      subText: 'text-slate-500',
      tickerDot: 'bg-blue-500/70',
      itemLabel: 'text-slate-600',
      itemValue: 'text-slate-900',
      itemSub: 'text-slate-500',
      itemPill:
        'bg-white/55 border border-blue-100/70 shadow-[0_10px_18px_-16px_rgba(37,99,235,0.35)]',
      itemIcon: 'text-blue-600/70',
      hover:
        'hover:shadow-[0_16px_38px_-18px_rgba(37,99,235,0.55)] hover:border-blue-200/70',
      mask:
        'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
    };

    if (variant === 'metal') return fxTheme; // ✅ metal uses blue theme
    return fxTheme; // fx uses blue theme
  }, [variant]);

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

      // ✅ kill blank gaps by increasing repeat until long enough
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
        'group w-full overflow-hidden rounded-2xl',
        theme.shell,
        theme.hover,
        'transition-all duration-200',
        className,
      ].join(' ')}
    >
      {/* HEADER */}
      {hasHeader && (
        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          <div className="flex items-center gap-3 min-w-0">
        {LeftIcon ? (
  <div className="w-8 h-8 rounded-xl bg-[var(--selago)] flex items-center justify-center">
    <LeftIcon className="w-4 h-4 text-[var(--endeavour)]" />
  </div>
) : null}


            <div className="min-w-0">
              {title ? (
                <div
                  className={[
                    'text-sm font-bold leading-tight truncate',
                    theme.titleText,
                  ].join(' ')}
                >
                  {title}
                </div>
              ) : null}
              {subtitle ? (
                <div
                  className={[
                    'text-xs leading-tight truncate',
                    theme.subText,
                  ].join(' ')}
                >
                  {subtitle}
                </div>
              ) : null}
            </div>
          </div>

          {rightSlot ? <div className="shrink-0">{rightSlot}</div> : null}
        </div>
      )}

      {/* TICKER */}
      <div
        className={hasHeader ? 'pt-1 pb-3' : 'py-3'}
        style={{
          maskImage: theme.mask,
          WebkitMaskImage: theme.mask,
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
                className={[
                  'flex items-center gap-3 whitespace-nowrap rounded-full px-4 py-2',
                  theme.itemPill,
                ].join(' ')}
              >
                {Icon ? (
                  <Icon className={['w-4 h-4', theme.itemIcon].join(' ')} />
                ) : null}

                <span className={['text-xs font-semibold', theme.itemLabel].join(' ')}>
                  {it.label}
                </span>

                <span className={['text-sm font-bold', theme.itemValue].join(' ')}>
                  {it.value}
                </span>

                {it.subValue ? (
                  <span className={['text-xs', theme.itemSub].join(' ')}>
                    {it.subValue}
                  </span>
                ) : null}

                <span className={['w-1.5 h-1.5 rounded-full', theme.tickerDot].join(' ')} />
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .animate-ticker {
          animation: ticker var(--ticker-duration) linear infinite;
          will-change: transform;
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

'use client';

import { useMemo, useState } from 'react';
import HeadlineTicker from './HeadlineTicker';
import useExchangeRates from '../../hooks/useExchangeRates';
import useMetalPrices from '../../hooks/useMetalPrices';
import { HiRefresh, HiCube, HiCubeTransparent } from 'react-icons/hi';
import { FaDollarSign, FaEuroSign, FaPoundSign, FaRubleSign } from 'react-icons/fa';
import { TbCurrencyShekel } from 'react-icons/tb';

const currencyNames = {
  USD: 'US Dollar',
  EUR: 'Euro',
  GBP: 'British Pound',
  ILS: 'Israeli Shekel',
  RUB: 'Russian Ruble',
};

const currencyIcons = {
  USD: FaDollarSign,
  EUR: FaEuroSign,
  GBP: FaPoundSign,
  ILS: TbCurrencyShekel,
  RUB: FaRubleSign,
};

const metalIcons = {
  nickel: HiCube,
  copper: HiCubeTransparent,
};

export default function MarketsTicker({ className = '' }) {
  const fx = useExchangeRates();
  const metals = useMetalPrices();

  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [fxRefreshing, setFxRefreshing] = useState(false);

  const getFxRate = (rates, currency) => {
    if (!rates || !rates[currency]) return null;
    if (baseCurrency === 'USD') return rates[currency];
    return rates[currency] / rates[baseCurrency];
  };

  const fxItems = useMemo(() => {
    const list = ['USD', 'EUR', 'GBP', 'ILS', 'RUB'].filter((c) => c !== baseCurrency);
    return list.map((c) => {
      const r = getFxRate(fx.rates, c);
      return {
        key: `fx-${c}`,
        icon: currencyIcons[c],
        label: `${currencyNames[baseCurrency]} → ${currencyNames[c]}`,
        value: r ? fx.formatRate(r) : '—',
        subValue: `1 ${baseCurrency} = ${r ? fx.formatRate(r) : '—'} ${c}`,
      };
    });
  }, [fx.rates, baseCurrency]);

  const metalItems = useMemo(() => {
    return ['nickel', 'copper'].map((k) => {
      const m = metals.prices?.[k];
      if (!m) {
        return {
          key: `m-${k}`,
          icon: metalIcons[k],
          label: k.toUpperCase(),
          value: '—',
          subValue: '',
        };
      }

      const ch = m.change ?? null;
      const pct = m.changePercent ?? null;
      const sign = ch !== null ? (ch >= 0 ? '+' : '') : '';

      return {
        key: `m-${k}`,
        icon: metalIcons[k],
        label: `${m.name || k} (${m.unit || 'USD/MT'})`,
        value: metals.formatPrice(m.price),
        subValue: ch !== null ? `${sign}${ch.toFixed(2)} (${(pct ?? 0).toFixed(2)}%)` : '',
      };
    });
  }, [metals.prices]);

  const fxSubtitle = fx.error ? 'Failed to load' : fx.loading ? 'Loading…' : `Base: ${baseCurrency}`;
  const metalSubtitle = metals.error ? 'Failed to load' : metals.loading ? 'Loading…' : 'LME Spot Prices';

  const refreshFx = async () => {
    try {
      setFxRefreshing(true);
      const res = fx.refresh?.();
      if (res && typeof res.then === 'function') await res;
    } finally {
      setTimeout(() => setFxRefreshing(false), 400);
    }
  };

  const refreshMetals = () => metals.refresh?.();

  const BaseIcon = currencyIcons[baseCurrency] || FaDollarSign;

  return (
    <div className={['mt-4 mb-4 space-y-2', className].join(' ')}>
      {/* ===== FX ===== */}
      <HeadlineTicker
        title="Exchange Rates"
        subtitle={fxSubtitle}
        leftIcon={BaseIcon}
        rightSlot={
          <div className="flex items-center gap-2">
            {/* ✅ base selector INLINE with heading */}
            <div className="hidden md:flex items-center gap-1">
              {['USD', 'EUR', 'GBP', 'ILS', 'RUB'].map((cur) => (
                <button
                  key={cur}
                  onClick={() => setBaseCurrency(cur)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition
                    ${
                      baseCurrency === cur
                        ? 'bg-[var(--endeavour)] text-white'
                        : 'bg-[var(--selago)] text-[var(--port-gore)] hover:bg-[var(--rock-blue)]/30'
                    }`}
                >
                  {cur}
                </button>
              ))}
            </div>

            {/* ✅ refresh stays on far right */}
            <button
              onClick={refreshFx}
              disabled={fxRefreshing}
              title="Refresh exchange rates"
              className={[
                'inline-flex items-center justify-center',
                'h-9 w-11 rounded-full',
                'bg-[var(--selago)] text-[var(--port-gore)]',
                'hover:bg-[var(--rock-blue)]/30 transition-colors',
                fxRefreshing ? 'opacity-60 cursor-not-allowed' : '',
              ].join(' ')}
            >
              <HiRefresh className={['w-5 h-5', fxRefreshing ? 'animate-spin' : ''].join(' ')} />
            </button>
          </div>
        }
        items={fxItems}
        speed={110}
        pauseOnHover
        rightToLeft
        gap={28}
      />

      {/* ✅ mobile base selector (wrap under header nicely) */}
      <div className="flex md:hidden items-center gap-2 px-1 -mt-2">
        {['USD', 'EUR', 'GBP', 'ILS', 'RUB'].map((cur) => (
          <button
            key={cur}
            onClick={() => setBaseCurrency(cur)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition
              ${
                baseCurrency === cur
                  ? 'bg-[var(--endeavour)] text-white'
                  : 'bg-[var(--selago)] text-[var(--port-gore)] hover:bg-[var(--rock-blue)]/30'
              }`}
          >
            {cur}
          </button>
        ))}
      </div>

      {/* ===== METALS ===== */}
      <HeadlineTicker
        title="Metal Prices"
        subtitle={metalSubtitle}
        leftIcon={HiCube}
        rightSlot={
          <button
            onClick={refreshMetals}
            disabled={metals.loading}
            title="Refresh metal prices"
            className={[
              'inline-flex items-center justify-center',
              'h-9 w-11 rounded-full',
              'bg-[var(--selago)] text-[var(--port-gore)]',
              'hover:bg-[var(--rock-blue)]/30 transition-colors',
              metals.loading ? 'opacity-60 cursor-not-allowed' : '',
            ].join(' ')}
          >
            <HiRefresh className={['w-5 h-5', metals.loading ? 'animate-spin' : ''].join(' ')} />
          </button>
        }
        items={metalItems}
        speed={140}
        pauseOnHover
        rightToLeft
        gap={36}
      />
    </div>
  );
}

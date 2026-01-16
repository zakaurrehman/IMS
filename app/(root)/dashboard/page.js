
'use client';
import { useContext, useEffect, useMemo, useState } from 'react';
import Spinner from '@components/spinner';
import { UserAuth } from "@contexts/useAuthContext"
import { SettingsContext } from "@contexts/useSettingsContext";
import Toast from '@components/toast.js'
import Spin from '@components/spinTable';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { loadData, groupedArrayInvoice, getInvoices } from '@utils/utils'
import { setMonthsInvoices, calContracts } from './funcs'
import { getTtl } from '@utils/languages';
import DateRangePicker from '@components/dateRangePicker';
import TooltipComp from '@components/tooltip';
import MarketsTicker from '@components/Dashboard/MarketsTicker';
import dateFormat from "dateformat";

import { BarChartContracts, HorizontalBar, LineChartSmall } from './charts';

ChartJS.register(
  CategoryScale,
  ArcElement,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const fmtMoney = (n, decimals = 2) => {
  const num = typeof n === "string"
    ? Number(n.replace(/[^0-9.-]+/g, ""))
    : Number(n);

  if (!Number.isFinite(num)) return (0).toFixed(decimals);

  return num.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};
const fmtK = (n, decimals = 2) => {
  const num = Number(n);
  if (!Number.isFinite(num)) return `$0.00K`;
  return `$${fmtMoney(num / 1000, decimals)}K`;
};
const fmtAutoKM = (n, decimals = 2) => {
  const num = Number(n);
  if (!Number.isFinite(num)) return "$0";

  if (Math.abs(num) >= 1_000_000) {
    return `$${fmtMoney(num / 1_000_000, decimals)}M`;
  }

  if (Math.abs(num) >= 1_000) {
    return `$${fmtMoney(num / 1_000, decimals)}K`;
  }

  return `$${fmtMoney(num, decimals)}`;
};


const loadInvoices = async (uidCollection, con) => {
  let yrs = [...new Set(con.invoices.map(x => x.date.substring(0, 4)))]
  let arrTmp = [];
  for (let i = 0; i < yrs.length; i++) {
    let yr = yrs[i]
    let tmpDt = [...new Set(con.invoices.filter(x => x.date.substring(0, 4) === yr).map(y => y.invoice))]
    let obj = { yr: yr, arrInv: tmpDt }
    arrTmp.push(obj)
  }

  let tmpInv = await getInvoices(uidCollection, 'invoices', arrTmp)
  return groupedArrayInvoice(tmpInv)
};

// ---------- UI helpers ----------
const sumObj = (obj) => Object.values(obj || {}).reduce((a, v) => a + (Number(v) || 0), 0);

function IconChip({ variant = "indigo", children }) {
  const map = {
    indigo: "from-indigo-600 to-blue-600",
    emerald: "from-emerald-600 to-teal-600",
    amber: "from-amber-500 to-orange-600",
    rose: "from-rose-600 to-pink-600",
    violet: "from-violet-600 to-fuchsia-600",
    cyan: "from-cyan-600 to-sky-600",
    slate: "from-slate-700 to-slate-900",
  };
  return (
    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${map[variant] || map.indigo} grid place-items-center shadow-lg ring-1 ring-white/20`}>
      {children}
    </div>
  );
}

function CardShell({
  className = "",
  glow = "glow-indigo",
  delay = 0,
  children
}) {
  return (
    <div
      className={[
        "group relative rounded-3xl overflow-hidden",
        "border border-white/60 bg-white/70 backdrop-blur-xl",
        "shadow-[0_12px_30px_rgba(12,18,28,0.10)]",
        "hover:shadow-[0_20px_50px_rgba(12,18,28,0.18)] transition-all duration-500",
        "will-change-transform hover:-translate-y-1",
        "animate-cardIn",
        glow,
        className
      ].join(" ")}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 bg-gradient-to-br from-white to-transparent" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 bg-gradient-to-br from-white to-transparent" />
      {children}
    </div>
  );
}

function StatKpiCard({
  title,
  badgeText,
  badgeTone = "good",
  value,
  chartData,
  chartColor = "rgba(255,255,255,0.92)",
  grad = "from-indigo-700 to-blue-800",
  delay = 0,
  iconVariant = "indigo",
  icon,
}) {
  const badgeMap = {
    good: "bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-400/20",
    warn: "bg-amber-500/20 text-amber-200 ring-1 ring-amber-400/20",
    bad: "bg-rose-500/20 text-rose-200 ring-1 ring-rose-400/20",
    neutral: "bg-white/15 text-white/85 ring-1 ring-white/20",
  };

  return (
    <div
      className={[
        "relative rounded-3xl overflow-hidden",
        "shadow-[0_12px_30px_rgba(12,18,28,0.12)]",
        "hover:shadow-[0_20px_55px_rgba(12,18,28,0.20)]",
        "transition-all duration-500 will-change-transform hover:-translate-y-1",
        "animate-cardIn",
        `bg-gradient-to-br ${grad}`
      ].join(" ")}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(900px_circle_at_20%_0%,rgba(255,255,255,0.35),transparent_45%)]" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(700px_circle_at_100%_10%,rgba(255,255,255,0.18),transparent_40%)]" />
      <div className="p-4 relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <IconChip variant={iconVariant}>
              {icon}
            </IconChip>
            <div>
              <div className="text-white/80 text-sm font-semibold">{title}</div>
              <div className="mt-1 text-xl md:text-2xl font-extrabold text-white tracking-tight">{value}</div>
            </div>
          </div>

          <div className={`px-3 py-1.5 rounded-xl text-xs font-bold ${badgeMap[badgeTone] || badgeMap.neutral}`}>
            {badgeText}
          </div>
        </div>

        <div className="mt-3 h-[64px] min-w-[200px] min-h-[60px]">
          <Line data={LineChartSmall(chartData, chartColor).obj} options={LineChartSmall().options} />
        </div>
      </div>
    </div>
  );
}

const Dash = () => {
  const { settings, dateSelect, setLoading, loading, ln } = useContext(SettingsContext);
  const [dataInvoices, setDataInvoices] = useState([])
  const [dataContracts, setDataContracts] = useState([])
  const [dataExpenses, setDataExpenses] = useState([])
  const [dataPL, setDataPL] = useState([])
  const [dataPieSupps, setDataPieSupps] = useState([])
  const [dataPieClnts, setDataPieClnts] = useState([])
  const { uidCollection } = UserAuth();

  useEffect(() => {
    const Load = async () => {
      const year = dateSelect?.start?.substring(0, 4) || new Date().getFullYear();
      setLoading(true);

      let dtContracts = await loadData(uidCollection, 'contracts', {
        start: dateSelect?.start || `${year}-01-01`,
        end: dateSelect?.end || `${year}-12-31`,
      });

      let dtConTmp = [...dtContracts];
      dtConTmp = await Promise.all(
        dtConTmp.map(async (x) => {
          const Invoices = await loadInvoices(uidCollection, x);
          return {
            ...x,
            invoicesData: Invoices,
          };
        })
      );

      let tmpData = calContracts(dtConTmp, settings);
      setDataContracts(tmpData.accumulatedPmnt);
      setDataExpenses(tmpData.accumulatedExp);
      setDataPieSupps(tmpData.pieArrSupps);

      const summedArr = Object.keys(tmpData.accumulatedPmnt).reduce((acc, key) => {
        acc[key] = tmpData.accumulatedPmnt[key] + tmpData.accumulatedExp[key];
        return acc;
      }, {});

      let arrInvoices = setMonthsInvoices(dtConTmp, settings);
      setDataInvoices(arrInvoices.accumulatedPmnt);
      setDataPieClnts(arrInvoices.pieArrClnts);

      const tmpPL = Object.keys(arrInvoices.accumulatedPmnt).reduce((acc, key) => {
        acc[key] = arrInvoices.accumulatedPmnt[key] - summedArr[key];
        return acc;
      }, {});

      setDataExpenses(tmpData.accumulatedExp);
      setDataContracts(tmpData.accumulatedPmnt);

      setDataPL(Object.values(tmpPL));
      setLoading(false);
    };

    Object.keys(settings).length !== 0 && Load();
  }, [dateSelect, settings, setLoading, uidCollection]);

  const currentYear = dateSelect?.start?.substring(0, 4) || new Date().getFullYear();

  const totalPL = useMemo(() => (dataPL || []).reduce((a, v) => a + (Number(v) || 0), 0), [dataPL]);
  const totalInvoices = useMemo(() => sumObj(dataInvoices), [dataInvoices]);
  const totalContracts = useMemo(() => sumObj(dataContracts), [dataContracts]);
  const totalExpenses = useMemo(() => sumObj(dataExpenses), [dataExpenses]);

  const profitTone = totalPL > 0 ? "good" : "bad";
  const cons = Object.keys(dataPieSupps || {}).length;
  const barH = cons < 10 ? 190 : cons < 15 ? 260 : 320;

  if (Object.keys(settings).length === 0) return <Spinner />;

  return (
    <div className="w-full max-w-[98%] mx-auto px-1 sm:px-2 md:px-3 pb-10 md:pb-0 min-h-screen
      bg-[radial-gradient(900px_circle_at_10%_0%,rgba(90,108,255,0.10),transparent_40%),radial-gradient(700px_circle_at_100%_10%,rgba(26,198,255,0.08),transparent_40%),linear-gradient(135deg,rgba(250,252,255,1),rgba(243,247,255,1))]">
      <style jsx global>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(10px) scale(0.99); filter: blur(6px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        .animate-cardIn { animation: cardIn 520ms cubic-bezier(.2,.8,.2,1) both; }
        .glow-indigo { box-shadow: 0 10px 30px rgba(75, 89, 255, 0.10), 0 0 0 1px rgba(255,255,255,0.55) inset; }
        .glow-emerald { box-shadow: 0 10px 30px rgba(16, 185, 129, 0.12), 0 0 0 1px rgba(255,255,255,0.55) inset; }
        .glow-amber { box-shadow: 0 10px 30px rgba(245, 158, 11, 0.13), 0 0 0 1px rgba(255,255,255,0.55) inset; }
        .glow-rose { box-shadow: 0 10px 30px rgba(244, 63, 94, 0.12), 0 0 0 1px rgba(255,255,255,0.55) inset; }
        .glow-cyan { box-shadow: 0 10px 30px rgba(6, 182, 212, 0.12), 0 0 0 1px rgba(255,255,255,0.55) inset; }
        .glow-violet { box-shadow: 0 10px 30px rgba(139, 92, 246, 0.12), 0 0 0 1px rgba(255,255,255,0.55) inset; }
      `}</style>

      <Toast />
      {loading && <Spin />}

      <div className="mb-6">
        <MarketsTicker />
      </div>

      {/* Header */}
      <div className="pt-1 pb-4">
        <div className='flex items-center justify-between flex-wrap gap-4'>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-10 bg-gradient-to-b from-[var(--endeavour)] to-[var(--chathams-blue)] rounded-full" />
            <div>
              <h1 className="text-2xl font-extrabold text-[var(--port-gore)] tracking-tight">
                {getTtl('Dashboard', ln)}
              </h1>
              <p className="text-sm text-[var(--regent-gray)] mt-1">
                Financial overview and analytics
              </p>
            </div>
          </div>

         <div className="p-4 mt-8 relative">
             <div className='flex items-center justify-between flex-wrap pb-2'>
               <div className='flex group items-center gap-3'>
                 <DateRangePicker />
                 <TooltipComp txt='Select Dates Range' />
               </div>
             </div>
           </div>

       
       
        </div>
      </div>

      {/* ====== NEW LAYOUT ====== */}

<div className="grid grid-cols-1 xl:grid-cols-12 gap-4">

  {/* Row 1: Total Revenue FULL WIDTH */}
  <div className="xl:col-span-12">
    {/* Total Revenue */}
    <CardShell glow="glow-indigo" delay={60}>
      <div className="p-4">
        <div className='flex items-center justify-between mb-3'>
          <div className="flex items-center gap-3">
            <IconChip variant="indigo">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </IconChip>
            <div>
              <h3 className='text-[var(--port-gore)] font-extrabold text-lg'>Total Revenue</h3>
              <p className="text-xs text-[var(--regent-gray)] -mt-0.5">Income vs Outcome</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
              Income: ${fmtMoney(totalContracts / 1_000_000)}M
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-50 text-slate-700 text-xs font-bold border border-slate-100">
              Outcome: ${fmtMoney((totalContracts + totalExpenses) / 1_000_000)}M
            </div>
          </div>
        </div>

        <div className='h-[280px] min-w-[240px] min-h-[160px]'>
          <Bar
            data={BarChartContracts(dataContracts, dataInvoices, '#103a7a', '#9fb8d4').obj}
            options={BarChartContracts().options}
          />
        </div>

        <div className='flex items-center justify-center gap-6 mt-4 pt-3 border-t border-[var(--selago)]'>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 rounded-full bg-[#103a7a]' />
            <span className='text-sm text-[var(--regent-gray)] font-medium'>Total Income</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 rounded-full bg-[#9fb8d4]' />
            <span className='text-sm text-[var(--regent-gray)] font-medium'>Total Outcome</span>
          </div>
        </div>
      </div>
    </CardShell>
  </div>

  {/* Row 2+: Left = Contracts/Co-signed, Right = KPI grid */}
  <div className="xl:col-span-12 grid grid-cols-1 xl:grid-cols-12 gap-4">

    {/* LEFT big cards (stacked) */}
    <div className="xl:col-span-4 space-y-4">

      {/* Contracts (big) */}
      <CardShell glow="glow-amber" delay={120} className="h-[260px]">
        <div className='p-3 h-full flex flex-col'>
          <div className='flex items-center gap-3 mb-3'>
            <IconChip variant="amber">
              <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </IconChip>
            <div>
              <h3 className='text-[var(--port-gore)] font-extrabold text-base'>Contracts - $</h3>
              <p className="text-xs text-[var(--regent-gray)] -mt-0.5">Top suppliers & contracts</p>
            </div>
          </div>

          <div className="flex-1 min-h-0">
            <Bar
              data={HorizontalBar(dataPieSupps, '#103a7a').obj}
              options={HorizontalBar().options}
            />
          </div>
        </div>
      </CardShell>

      {/* Co-signed (big) */}
      <CardShell glow="glow-cyan" delay={160} className="h-[260px]">
        <div className='p-3 h-full flex flex-col'>
          <div className='flex items-center gap-3 mb-3'>
            <IconChip variant="cyan">
              <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </IconChip>
            <div>
              <h3 className='text-[var(--port-gore)] font-extrabold text-base'>Co-signed - $</h3>
              <p className="text-xs text-[var(--regent-gray)] -mt-0.5">Top clients contribution</p>
            </div>
          </div>

          <div className="flex-1 min-h-0">
            <Bar
              data={HorizontalBar(dataPieClnts, '#0366ae').obj}
              options={HorizontalBar().options}
            />
          </div>
        </div>
      </CardShell>
    </div>

    {/* RIGHT KPI GRID (2 cols x 3 rows) */}
    <div className="xl:col-span-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* IMPORTANT: titles now -$K and values use fmtK() */}

        <StatKpiCard
          delay={80}
          title={`${getTtl('P&L', ln)} - $K`}
          badgeText={totalPL > 0 ? getTtl('Profit', ln) : "Loss"}
          badgeTone={profitTone}
          value={fmtAutoKM(totalPL)}

          chartData={dataPL}
          chartColor="rgba(255, 255, 255, 0.95)"
          grad="from-violet-700 to-indigo-900"
          iconVariant="violet"
          icon={
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 12v-2m9-4a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />

        <StatKpiCard
          delay={110}
          title={`${getTtl('Invoices', ln)} - $K`}
          badgeText={getTtl('Sales', ln)}
          badgeTone="good"
          value={fmtAutoKM(totalInvoices)}
          chartData={dataInvoices}
          chartColor="rgba(255,255,255,0.92)"
          grad="from-emerald-700 to-teal-900"
          iconVariant="emerald"
          icon={
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 14l2 2 4-4M7 7h10M7 11h10M7 15h6" />
            </svg>
          }
        />

        <StatKpiCard
          delay={140}
          title={`${getTtl('Contracts & Expenses', ln)} - $K`}
          badgeText={getTtl('Costs', ln)}
          badgeTone="bad"
          value={fmtAutoKM(totalInvoices - totalPL)}
          chartData={dataContracts}
          chartColor="rgba(255,255,255,0.92)"
          grad="from-rose-700 to-fuchsia-900"
          iconVariant="rose"
          icon={
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />

        <StatKpiCard
          delay={170}
          title={`Sales Contracts - $K`}
          badgeText="Sales"
          badgeTone="good"
          value={fmtAutoKM(totalContracts)}
          chartData={dataContracts}
          chartColor="rgba(255,255,255,0.92)"
          grad="from-indigo-700 to-sky-900"
          iconVariant="indigo"
          icon={
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
        />

        <StatKpiCard
          delay={200}
          title={`Expenses - $K`}
          badgeText="Costs"
          badgeTone="bad"
          value={fmtAutoKM(totalExpenses)}
          chartData={dataExpenses}
          chartColor="rgba(255,255,255,0.92)"
          grad="from-rose-700 to-red-900"
          iconVariant="rose"
          icon={
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 12v-2" />
            </svg>
          }
        />

        <StatKpiCard
          delay={230}
          title={`Purchase Contracts - $K`}
          badgeText="Purchases"
          badgeTone="warn"
          value={fmtAutoKM(totalInvoices)}
          chartData={dataInvoices}
          chartColor="rgba(255,255,255,0.92)"
          grad="from-amber-600 to-orange-900"
          iconVariant="amber"
          icon={
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.3 5.2A1 1 0 006.7 20H19a1 1 0 001-1v-1M7 13l.4-2M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
          }
        />
      </div>
    </div>
  </div>
</div>


      <div className="h-10" />
    </div>
  )
}

export default Dash;

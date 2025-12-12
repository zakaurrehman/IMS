'use client';
import { useContext, useEffect, useState } from 'react';
import Spinner from '../../../components/spinner';
import { UserAuth } from "../../../contexts/useAuthContext"
import { SettingsContext } from "../../../contexts/useSettingsContext";
import Toast from '../../../components/toast.js'
import Spin from '../../../components/spinTable';
import { BarChart, BarChartContracts, HorizontalBar, LineChart, GroupedBarChart } from './charts';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { loadData, groupedArrayInvoice, getInvoices } from '../../../utils/utils'
import { setMonthsInvoices, calContracts, frmNum } from './funcs'
import { getTtl } from '../../../utils/languages';
import DateRangePicker from '../../../components/dateRangePicker';
import { HiOutlineFolder, HiOutlineUserGroup, HiOutlineClipboardList, HiOutlineViewGrid } from 'react-icons/hi';
import styles from './dashboard.module.css';
import { StatCard, ChartCard, ChartLegend, StatCardWithChart, SubscriptionsStatistic, TaskStatistic, SubscriptionsList, ClientsPayment } from './components';

ChartJS.register(
  CategoryScale,
  ArcElement,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

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
}

const Dash = () => {

  const { settings, dateSelect, setLoading, loading, ln, setToast } = useContext(SettingsContext);
  const [dataInvoices, setDataInvoices] = useState([])
  const [dataContracts, setDataContracts] = useState([])
  const [dataExpenses, setDataExpenses] = useState([])
  const [dataPL, setDataPL] = useState([])
  const [dataPieSupps, setDataPieSupps] = useState([])
  const [dataPieClnts, setDataPieClnts] = useState([])
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const { uidCollection } = UserAuth();

  useEffect(() => {

    const Load = async () => {
      setLoading(true)

      let dtContracts = await loadData(uidCollection, 'contracts', dateSelect);
      let dtConTmp = [...dtContracts]
      dtConTmp = await Promise.all(
        dtConTmp.map(async (x) => {
          const Invoices = await loadInvoices(uidCollection, x)
          return {
            ...x,
            invoicesData: Invoices,
          };
        })
      );

      let tmpData = calContracts(dtConTmp, settings)
      setDataContracts(tmpData.accumulatedPmnt)
      setDataExpenses(tmpData.accumulatedExp)
      setDataPieSupps(tmpData.pieArrSupps)

      const summedArr = Object.keys(tmpData.accumulatedPmnt).reduce((acc, key) => {
        acc[key] = tmpData.accumulatedPmnt[key] + tmpData.accumulatedExp[key];
        return acc;
      }, {});

      let arrInvoices = setMonthsInvoices(dtConTmp, settings)
   
      setDataInvoices(arrInvoices.accumulatedPmnt)
      setDataPieClnts(arrInvoices.pieArrClnts)
      
      const tmpPL = Object.keys(arrInvoices.accumulatedPmnt).reduce((acc, key) => {
        acc[key] = arrInvoices.accumulatedPmnt[key] - summedArr[key];
        return acc;
      }, {});

      setDataPL(tmpPL)
      setLoading(false)
    }

    if (dateSelect?.start?.substring(0, 4) !== dateSelect?.end?.substring(0, 4)) {
      setToast({ show: true, text: getTtl('DashbordDatesAlert', ln), clr: 'fail' })
      return
    }

    Object.keys(settings).length !== 0 && Load();

  }, [dateSelect, settings])

  // Calculate totals for stat cards
  const totalSales = Object.values(dataInvoices).reduce((acc, val) => acc + val, 0);
  const totalContracts = Object.values(dataContracts).reduce((acc, val) => acc + val, 0);
  const totalExpenses = Object.values(dataExpenses).reduce((acc, val) => acc + val, 0);
  const totalProfit = Object.values(dataPL).reduce((acc, val) => acc + val, 0);

  // Normalize data for charts (scale to 0-100 range for display like Figma)
  const normalizeData = (data) => {
    const values = Object.values(data);
    if (values.length === 0) return Array(12).fill(0);
    const max = Math.max(...values);
    if (max === 0) return values;
    return values.map(v => (v / max) * 100);
  };

  const normalizedInvoices = normalizeData(dataInvoices);
  const normalizedContracts = normalizeData(dataContracts);
  const normalizedPL = normalizeData(dataPL);

  return (
    <div className={styles.dashboardContainer}>
      {Object.keys(settings).length === 0 ? <Spinner /> :
        <>
          <Toast />
          {loading && <Spin />}
          
          {/* Header with Date Picker */}
          <div className={styles.headerSection}>
            <h1 className={styles.headerTitle}>{getTtl('Dashboard', ln)}</h1>
            <div className={styles.headerActions}>
              <DateRangePicker />
            </div>
          </div>

          {/* Stats Cards Row - Matching Figma Blue Design */}
          <div className={styles.statsSection}>
            <div className={styles.statsGrid}>
              <StatCard
                title={getTtl('Sales', ln)}
                value={(totalSales / 1000).toFixed(0)}
                icon={HiOutlineFolder}
                delay={0}
              />
              <StatCard
                title={getTtl('Contracts', ln)}
                value={(totalContracts / 1000).toFixed(0)}
                icon={HiOutlineUserGroup}
                delay={100}
              />
              <StatCard
                title={getTtl('Invoices', ln)}
                value={(Object.keys(dataPieClnts).length * 327).toFixed(0)}
                icon={HiOutlineClipboardList}
                delay={200}
              />
              <StatCard
                title={getTtl('Expenses', ln)}
                value={(totalExpenses / 1000).toFixed(0)}
                icon={HiOutlineViewGrid}
                delay={300}
              />
            </div>
          </div>

          {/* Charts Row - Total Revenue & Sales Overview */}
          <div className={styles.chartsSection}>
            <div className={styles.chartsGrid}>
              {/* Total Revenue - Grouped Bar Chart */}
              <ChartCard 
                title="Total Revenue"
                delay={400}
                showYearDropdown={true}
                year={selectedYear}
                setYear={setSelectedYear}
              >
                <div className={styles.chartWrapper}>
                  <Bar 
                    data={GroupedBarChart(normalizedInvoices, normalizedContracts).obj} 
                    options={GroupedBarChart().options} 
                  />
                </div>
                <ChartLegend 
                  items={[
                    { label: 'Total Income', color: '#9fb8d4' },
                    { label: 'Total Outcome', color: '#103a7a' }
                  ]} 
                />
              </ChartCard>

              {/* Sales Overview - Line Chart */}
              <ChartCard 
                title="Sales Overview"
                delay={500}
                showYearDropdown={true}
                year={selectedYear}
                setYear={setSelectedYear}
              >
                <div className={styles.chartWrapper}>
                  <Line 
                    data={LineChart(normalizedInvoices, normalizedPL.map(v => Math.abs(v))).obj} 
                    options={LineChart().options} 
                  />
                </div>
                <ChartLegend 
                  items={[
                    { label: 'Total Sales', color: '#9fb8d4' },
                    { label: 'Total Revenue', color: '#103a7a' }
                  ]} 
                />
              </ChartCard>
            </div>
          </div>

          {/* Additional Charts - Consignees & Contracts */}
          <div className={styles.chartsSection}>
            <div className={styles.chartsGrid}>
              <ChartCard 
                title={getTtl('Top 5 Consignees - $', ln)}
                delay={600}
              >
                <div className={styles.chartWrapper}>
                  <Bar 
                    data={HorizontalBar(dataPieClnts, '#0366ae').obj} 
                    options={HorizontalBar().options} 
                  />
                </div>
              </ChartCard>

              <ChartCard 
                title={getTtl('Top 5 Contracts - $', ln)}
                delay={700}
              >
                <div className={styles.chartWrapper}>
                  <Bar 
                    data={HorizontalBar(dataPieSupps, '#103a7a').obj} 
                    options={HorizontalBar().options} 
                  />
                </div>
              </ChartCard>
            </div>
          </div>

          {/* 3rd Section - Stat Cards With Mini Charts (Figma Blue Pills) */}
          <div className={styles.statsSection}>
            <div className={styles.statsGrid}>
              <StatCardWithChart
                title={getTtl('New Employees', ln)}
                value={200}
                change={10}
                chartData={Object.values(dataContracts).map(v => Math.max(v, 1))}
                delay={800}
              />
              <StatCardWithChart
                title={getTtl('Earnings', ln)}
                value={totalSales}
                prefix="$"
                change={20}
                chartData={Object.values(dataInvoices).map(v => Math.max(v, 1))}
                delay={900}
              />
              <StatCardWithChart
                title={getTtl('Expenses', ln)}
                value={totalExpenses}
                prefix="$"
                change={-5}
                chartData={Object.values(dataExpenses).map(v => Math.max(v, 1))}
                delay={1000}
              />
              <StatCardWithChart
                title={getTtl('Profit', ln)}
                value={Math.abs(totalProfit)}
                prefix="$"
                change={-15}
                chartData={Object.values(dataPL).map(v => Math.abs(v) + 1)}
                delay={1100}
              />
            </div>
          </div>

          {/* 4th Section - Bottom Cards (Subscriptions, Tasks, List) */}
          <div className={styles.bottomSection}>
            <div className={styles.bottomGrid}>
              <SubscriptionsStatistic delay={1200} />
              <TaskStatistic delay={1300} />
              <SubscriptionsList count={4} delay={1400} />
            </div>
          </div>

          {/* 5th Section - Clients Payment Table */}
          <ClientsPayment delay={1500} />
        </>
      }
    </div>
  )
}

export default Dash;

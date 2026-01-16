
'use client'


// Fade-in animation for badges
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`;
  document.head.appendChild(style);
}

// Custom cell hover effect
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML += `
    .cell-hover-effect {
      transition: background 0.25s cubic-bezier(0.4,0,0.2,1), color 0.25s cubic-bezier(0.4,0,0.2,1);
    }
    .cell-hovered {
      background: linear-gradient(90deg, #c7d2fe 0%, #f0abfc 100%);
      color: #312e81 !important;
      box-shadow: 0 4px 16px rgba(99,102,241,0.13);
      border-radius: 10px;
      z-index: 2;
    }
  `;
  document.head.appendChild(style);
}

import Header from "../../../components/table/header";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";

import { useEffect, useMemo, useState, useContext } from "react";
import { TbSortDescending, TbSortAscending } from "react-icons/tb";
import { Paginator } from "../../../components/table/Paginator";
import RowsIndicator from "../../../components/table/RowsIndicator";
import Image from "next/image";
import './style.css';

import { SettingsContext } from "../../../contexts/useSettingsContext";
import { usePathname } from "next/navigation";
import { getTtl } from "../../../utils/languages";

import FiltersIcon from '../../../components/table/filters/filters';
import ResetFilterTableIcon from '../../../components/table/filters/resetTabe';
import dateBetweenFilterFn from '../../../components/table/filters/date-between-filter';
import { Filter } from "../../../components/table/filters/filterFunc";

// ==================== EXACT DASHBOARD COLOR SYSTEM ====================
const DASHBOARD_COLORS = {
  // Primary Card Gradients (from your exact cards)
  purple: {
    start: '#A855F7',    // Purple-500 (P&L card top)
    mid: '#9333EA',      // Purple-600 
    end: '#7E22CE',      // Purple-700 (P&L card bottom)
  },
  teal: {
    start: '#14B8A6',    // Teal-500 (Invoices card top)
    mid: '#0D9488',      // Teal-600
    end: '#0F766E',      // Teal-700 (Invoices card bottom)
  },
  crimson: {
    start: '#E11D48',    // Rose-600 (Contracts & Expenses card top)
    mid: '#BE123C',      // Rose-700
    end: '#9F1239',      // Rose-800 (Contracts & Expenses card bottom)
  },
  blue: {
    start: '#6366F1',    // Indigo-500 (Sales Contracts card top)
    mid: '#4F46E5',      // Indigo-600
    end: '#4338CA',      // Indigo-700 (Sales Contracts card bottom)
  },
  orange: {
    start: '#F97316',    // Orange-500 (Purchase Contracts card top)
    mid: '#EA580C',      // Orange-600
    end: '#C2410C',      // Orange-700 (Purchase Contracts card bottom)
  },
  
  // Badge Colors (from cards)
  successBadge: '#10B981',      // "Profit", "Sales" badges
  warningBadge: '#F59E0B',      // "Working" badges  
  dangerBadge: '#EF4444',       // "Costs", "Loss" badges
  infoBadge: '#3B82F6',         // Info badges
  
  // Neutrals
  white: '#FFFFFF',
  offWhite: '#FAFAFA',
  lightGray: '#F5F5F5',
  borderLight: '#E5E7EB',
  textDark: '#111827',
  textMedium: '#6B7280',
  textLight: '#9CA3AF',
  
  // Glass effect
  glassBg: 'rgba(255, 255, 255, 0.75)',
  glassBorder: 'rgba(255, 255, 255, 0.65)',
};

const Customtable = ({
  data,
  columns,
  invisible,
  SelectRow,
  excellReport,
  setFilteredData,
  highlightId,
  onCellUpdate
}) => {

  const [globalFilter, setGlobalFilter] = useState('')
  const [columnVisibility, setColumnVisibility] = useState(invisible)
  const [filterOn, setFilterOn] = useState(false)

  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25
  })

  const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])

  const pathName = usePathname()
  const { ln } = useContext(SettingsContext);

  const [quickSumEnabled, setQuickSumEnabled] = useState(false);
  const [quickSumColumns, setQuickSumColumns] = useState([]);
  const [showSelectionDropdown, setShowSelectionDropdown] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false)
  const [rowSelection, setRowSelection] = useState({});

  const [columnFilters, setColumnFilters] = useState([])

  // ---------- Selection Column ----------
  const columnsWithSelection = useMemo(() => {
    if (!quickSumEnabled) return columns;

    const selectCol = {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          ref={el => {
            if (!el) return;
            el.indeterminate = table.getIsSomePageRowsSelected();
          }}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
          className="w-4 h-4 cursor-pointer rounded"
          style={{ accentColor: DASHBOARD_COLORS.blue.mid }}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
          className="w-4 h-4 cursor-pointer rounded"
          style={{ accentColor: DASHBOARD_COLORS.blue.mid }}
        />
      ),
      enableSorting: false,
      enableColumnFilter: false,
      size: 50,
      minSize: 50,
      maxSize: 50,
    };

    return [selectCol, ...(columns || [])];
  }, [columns, quickSumEnabled]);

  // ---------- TABLE ----------
  const table = useReactTable({
    meta: {
      isEditMode,
      updateData: (rowIndex, columnId, value) => {
        if (!isEditMode) return;
        onCellUpdate?.({ rowIndex, columnId, value });
      },
    },
    columns: columnsWithSelection,
    data,
    enableRowSelection: quickSumEnabled,
    getCoreRowModel: getCoreRowModel(),
    filterFns: { dateBetweenFilterFn },
    state: {
      globalFilter,
      columnVisibility,
      pagination,
      columnFilters,
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  })

  const resetTable = () => table.resetColumnFilters()

  useEffect(() => resetTable(), [])

  useEffect(() => {
    setFilteredData(
      table.getFilteredRowModel().rows.map(x => x.original)
    )
  }, [columnFilters, globalFilter])

  const currentRows = table.getRowModel().rows.length;
  const dynamicMaxHeight = currentRows > 0
    ? `${Math.min(currentRows * 48 + 250, 850)}px`
    : '400px';

  return (
    <div className="w-full">
      <style jsx global>{`
        /* Professional gradient scrollbar matching cards */
        .dashboard-scroll::-webkit-scrollbar { width: 10px; height: 10px; }
        .dashboard-scroll::-webkit-scrollbar-track { 
          background: linear-gradient(180deg, ${DASHBOARD_COLORS.lightGray}, ${DASHBOARD_COLORS.offWhite}); 
          border-radius: 6px; 
        }
        .dashboard-scroll::-webkit-scrollbar-thumb { 
          background: linear-gradient(180deg, ${DASHBOARD_COLORS.blue.start}, ${DASHBOARD_COLORS.blue.end}); 
          border-radius: 6px; 
          border: 2px solid ${DASHBOARD_COLORS.lightGray};
          transition: all 0.3s ease;
        }
        .dashboard-scroll::-webkit-scrollbar-thumb:hover { 
          background: linear-gradient(180deg, ${DASHBOARD_COLORS.purple.start}, ${DASHBOARD_COLORS.purple.end});
          border-color: ${DASHBOARD_COLORS.offWhite};
        }

        /* Glassmorphic professional table */
        .glass-table {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.85) 0%, 
            rgba(250, 250, 250, 0.90) 50%,
            rgba(255, 255, 255, 0.85) 100%
          );
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
        }

        /* Smooth cell hover animation */
        @keyframes cellPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.01); }
        }
      `}</style>

      <div 
        className="flex flex-col rounded-3xl shadow-xl overflow-hidden glass-table"
        style={{ 
          border: `1px solid ${DASHBOARD_COLORS.glassBorder}`,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), 0 0 1px rgba(99, 102, 241, 0.1) inset',
        }}
      >

        {/* HEADER */}
        <div 
          className="flex-shrink-0"
          style={{ 
            borderBottom: `2px solid ${DASHBOARD_COLORS.borderLight}`,
            background: 'linear-gradient(90deg, rgba(255,255,255,0.95), rgba(250,250,250,0.98))'
          }}
        >
          <Header
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            table={table}
            excellReport={excellReport}
            filterIcon={FiltersIcon(ln, filterOn, setFilterOn)}
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            resetFilterTable={ResetFilterTableIcon(ln, resetTable, filterOn)}
            quickSumEnabled={quickSumEnabled}
            setQuickSumEnabled={setQuickSumEnabled}
            quickSumColumns={quickSumColumns}
            setQuickSumColumns={setQuickSumColumns}
          />
        </div>

        {/* DESKTOP */}
        <div className="hidden md:block">
          <div className="overflow-auto dashboard-scroll" style={{ maxHeight: dynamicMaxHeight }}>
            <table className="w-full border-collapse" style={{ tableLayout: 'auto' }}>

              {/* THEAD - Multi-color gradient inspired by all cards */}
              <thead 
                className="sticky top-0 z-10"
                style={{ 
                  background: `linear-gradient(135deg, 
                    ${DASHBOARD_COLORS.blue.start} 0%, 
                    ${DASHBOARD_COLORS.blue.mid} 25%,
                    ${DASHBOARD_COLORS.purple.mid} 50%,
                    ${DASHBOARD_COLORS.teal.mid} 75%,
                    ${DASHBOARD_COLORS.blue.end} 100%
                  )`,
                  boxShadow: '0 4px 20px rgba(99, 102, 241, 0.25), 0 1px 3px rgba(0, 0, 0, 0.05)',
                }}
              >
                {table.getHeaderGroups().map(hdGroup => (
                  <tr 
                    key={hdGroup.id}
                    style={{ borderBottom: `1px solid rgba(255, 255, 255, 0.2)` }}
                  >
                    {hdGroup.headers.map(header => (
                      <th
                        key={header.id}
                        className="px-4 py-3.5 text-left uppercase font-bold tracking-wider whitespace-nowrap"
                        style={{
                          color: DASHBOARD_COLORS.white,
                          minWidth: header.column.id === 'select' ? '50px' : '110px',
                          maxWidth: header.column.id === 'select' ? '50px' : 'none',
                          fontSize: 'clamp(9px, 0.8vw, 11px)',
                          textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {header.column.getCanSort() ? (
                          <div
                            onClick={header.column.getToggleSortingHandler()}
                            className="flex items-center gap-2 cursor-pointer select-none transition-all hover:opacity-90 hover:translate-x-0.5"
                          >
                            <span className="truncate">{header.column.columnDef.header}</span>
                            <span className="flex-shrink-0">
                              {{
                                asc: <TbSortAscending className="w-4 h-4" />,
                                desc: <TbSortDescending className="w-4 h-4" />
                              }[header.column.getIsSorted()]}
                            </span>
                          </div>
                        ) : (
                          <span className="truncate block">{header.column.columnDef.header}</span>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}

                {/* Filter Row */}
                {filterOn && (
                  <tr style={{ backgroundColor: DASHBOARD_COLORS.white }}>
                    {table.getHeaderGroups()[0].headers.map(header => (
                      <th
                        key={header.id}
                        className="px-3 py-2.5"
                        style={{
                          backgroundColor: DASHBOARD_COLORS.white,
                          borderBottom: `2px solid ${DASHBOARD_COLORS.borderLight}`,
                          minWidth: header.column.id === 'select' ? '50px' : '110px',
                          maxWidth: header.column.id === 'select' ? '50px' : 'none',
                        }}
                      >
                        {header.column.getCanFilter() && (
                          <Filter column={header.column} table={table} filterOn={filterOn} />
                        )}
                      </th>
                    ))}
                  </tr>
                )}
              </thead>

              {/* TBODY - Professional rows with card-inspired hover */}
              <tbody>
                {table.getRowModel().rows.map((row, rowIndex) => (
                  <tr
                    key={row.id}
                    onDoubleClick={() => SelectRow(row.original)}
                    tabIndex={0}
                    className={`cursor-pointer transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    style={{
                      backgroundColor: highlightId === row.original.id 
                        ? 'rgba(245, 158, 11, 0.08)'
                        : rowIndex % 2 === 0 
                          ? DASHBOARD_COLORS.white 
                          : DASHBOARD_COLORS.offWhite,
                      borderBottom: `1px solid ${DASHBOARD_COLORS.borderLight}`,
                      borderLeft: '4px solid transparent',
                    }}
                    onMouseEnter={e => {
                      if (highlightId !== row.original.id) {
                        e.currentTarget.style.background = 'linear-gradient(90deg, rgba(99, 102, 241, 0.04), rgba(168, 85, 247, 0.03), rgba(20, 184, 166, 0.04))';
                        e.currentTarget.style.boxShadow = '0 6px 24px rgba(99, 102, 241, 0.10)';
                        e.currentTarget.style.transform = 'scale(1.012)';
                        e.currentTarget.style.borderLeft = '4px solid #6366f1';
                      }
                    }}
                    onMouseLeave={e => {
                      if (highlightId !== row.original.id) {
                        e.currentTarget.style.background = rowIndex % 2 === 0 
                          ? DASHBOARD_COLORS.white 
                          : DASHBOARD_COLORS.offWhite;
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.borderLeft = '4px solid transparent';
                      }
                    }}
                  >
                    {row.getVisibleCells().map((cell, cellIdx) => (
                      <td
                        key={cell.id}
                        className="px-4 py-3.5 transition-all duration-200 group/cell relative cell-hover-effect"
                        style={{
                          color: DASHBOARD_COLORS.textDark,
                          minWidth: cell.column.id === 'select' ? '50px' : '110px',
                          maxWidth: cell.column.id === 'select' ? '50px' : '220px',
                          fontSize: 'clamp(10px, 0.9vw, 12px)',
                          fontWeight: '500',
                          zIndex: 1,
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.classList.add('cell-hovered');
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.classList.remove('cell-hovered');
                        }}
                      >
                        <div className="break-words overflow-hidden leading-relaxed flex items-center gap-2">
                          {cell.column.id === 'completed' ? (
                            cell.getValue() ? (
                              <span
                                className="px-3 py-1 text-[12px] font-medium flex items-center justify-center min-w-[90px] text-center whitespace-nowrap bg-gradient-to-r from-green-100 to-green-300 text-green-700 shadow transition-all duration-300 ease-in-out hover:from-green-400 hover:to-green-600 hover:text-white hover:shadow-lg fade-in"
                                aria-label="Completed"
                                style={{ letterSpacing: '0.03em', animation: 'fadeIn 0.7s' }}
                              >Completed</span>
                            ) : (
                              <span
                                className="px-3 py-1 text-[12px] font-medium flex items-center justify-center min-w-[90px] text-center whitespace-nowrap bg-gradient-to-r from-red-100 to-red-300 text-red-700 shadow transition-all duration-300 ease-in-out hover:from-red-400 hover:to-red-600 hover:text-white hover:shadow-lg fade-in"
                                aria-label="Not Completed"
                                style={{ letterSpacing: '0.03em', animation: 'fadeIn 0.7s' }}
                              >Not Completed</span>
                            )
                          ) : cell.column.id === 'status' && cell.getValue() ? (
                            <span
                              className={`px-3 py-1 text-[12px] font-medium flex items-center justify-center min-w-[90px] text-center whitespace-nowrap shadow transition-all duration-300 ease-in-out fade-in ${cell.getValue() === 'Active' ? 'bg-gradient-to-r from-green-100 to-green-300 text-green-700 hover:from-green-400 hover:to-green-600 hover:text-white hover:shadow-lg' : cell.getValue() === 'Pending' ? 'bg-gradient-to-r from-yellow-100 to-yellow-300 text-yellow-700 hover:from-yellow-400 hover:to-yellow-600 hover:text-white hover:shadow-lg' : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 hover:from-gray-400 hover:to-gray-600 hover:text-white hover:shadow-lg'}`}
                              aria-label={cell.getValue()}
                              style={{ letterSpacing: '0.03em', animation: 'fadeIn 0.7s' }}
                            >{cell.getValue()}</span>
                          ) : (
                            flexRender(cell.column.columnDef.cell, cell.getContext())
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}

                {/* EMPTY STATE */}
                {table.getRowModel().rows.length === 0 && (
                  <tr>
                    <td
                      colSpan={columnsWithSelection.length}
                      className="py-24 text-center"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <div 
                          className="w-24 h-24 mb-5 rounded-full flex items-center justify-center shadow-lg"
                          style={{ 
                            background: `linear-gradient(135deg, ${DASHBOARD_COLORS.blue.start}, ${DASHBOARD_COLORS.purple.start})`,
                          }}
                        >
                          <svg 
                            className="w-12 h-12" 
                            style={{ color: DASHBOARD_COLORS.white }}
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <p 
                          className="font-bold mb-2" 
                          style={{ 
                            color: DASHBOARD_COLORS.textDark,
                            fontSize: 'clamp(11px, 0.9vw, 13px)' 
                          }}
                        >
                          {getTtl('No data available', ln)}
                        </p>
                        <p 
                          style={{ 
                            color: DASHBOARD_COLORS.textMedium,
                            fontSize: 'clamp(8px, 0.7vw, 10px)' 
                          }}
                        >
                          Try adjusting your filters or date range
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>

        {/* MOBILE VIEW - Card Layout */}
        <div className="block md:hidden">
          <div 
            className="overflow-y-auto dashboard-scroll px-3 py-3 space-y-3"
            style={{ maxHeight: dynamicMaxHeight }}
          >
            {table.getRowModel().rows.map((row, rowIndex) => (
              <div
                key={row.id}
                onClick={() => SelectRow(row.original)}
                className="rounded-2xl overflow-hidden shadow-lg transition-all duration-300 active:scale-[0.98]"
                style={{
                  backgroundColor: DASHBOARD_COLORS.white,
                  border: highlightId === row.original.id 
                    ? `2px solid ${DASHBOARD_COLORS.orange.mid}` 
                    : `1px solid ${DASHBOARD_COLORS.borderLight}`,
                  boxShadow: highlightId === row.original.id 
                    ? '0 12px 28px rgba(249, 115, 22, 0.2)'
                    : '0 4px 12px rgba(0, 0, 0, 0.06)'
                }}
              >
                {/* Card Header - Multi-gradient */}
                <div 
                  className="px-4 py-3 flex items-center justify-between"
                  style={{ 
                    background: `linear-gradient(135deg, 
                      ${DASHBOARD_COLORS.blue.start}, 
                      ${DASHBOARD_COLORS.purple.mid}, 
                      ${DASHBOARD_COLORS.teal.mid}
                    )`,
                  }}
                >
                  <span 
                    className="font-bold"
                    style={{ 
                      color: DASHBOARD_COLORS.white,
                      fontSize: 'clamp(11px, 1vw, 13px)',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    {getTtl('Row', ln)} {rowIndex + 1}
                  </span>
                  {quickSumEnabled && (
                    <input
                      type="checkbox"
                      checked={row.getIsSelected()}
                      disabled={!row.getCanSelect()}
                      onChange={row.getToggleSelectedHandler()}
                      onClick={(e) => e.stopPropagation()}
                      className="w-4 h-4 cursor-pointer rounded"
                      style={{ accentColor: DASHBOARD_COLORS.white }}
                    />
                  )}
                </div>

                {/* Card Content */}
                <div className="p-4 space-y-2.5">
                  {row.getVisibleCells().map((cell) => {
                    if (cell.column.id === 'select') return null;
                    
                    return (
                      <div 
                        key={cell.id} 
                        className="flex flex-col space-y-1.5 pb-2.5 last:pb-0"
                        style={{ borderBottom: `1px solid ${DASHBOARD_COLORS.borderLight}` }}
                      >
                        <div 
                          className="uppercase tracking-wider font-bold" 
                          style={{ 
                            color: DASHBOARD_COLORS.textMedium,
                            fontSize: 'clamp(7px, 0.65vw, 9px)' 
                          }}
                        >
                          {cell.column.columnDef.header}
                        </div>
                        <div 
                          className="font-medium break-words px-3 py-2 rounded-xl leading-relaxed min-h-[28px] flex items-center shadow-sm" 
                          style={{ 
                            color: DASHBOARD_COLORS.textDark,
                            background: `linear-gradient(135deg, ${DASHBOARD_COLORS.offWhite}, ${DASHBOARD_COLORS.lightGray})`,
                            fontSize: 'clamp(10px, 0.9vw, 12px)',
                            border: `1px solid ${DASHBOARD_COLORS.borderLight}`
                          }}
                        >
                          {/* Custom rendering for 'completed' column */}
                          {cell.column.id === 'completed' ? (
                            cell.getValue() ? (
                              <div 
                                className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-md"
                                style={{ 
                                  background: `linear-gradient(135deg, ${DASHBOARD_COLORS.teal.start}, ${DASHBOARD_COLORS.teal.end})`,
                                  color: DASHBOARD_COLORS.white
                                }}
                              >
                                <Image src="/logo/right.svg" alt="Completed" width={12} height={12} className="brightness-0 invert" />
                                Completed
                              </div>
                            ) : (
                              <div 
                                className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm"
                                style={{ 
                                  background: `linear-gradient(135deg, ${DASHBOARD_COLORS.lightGray}, ${DASHBOARD_COLORS.borderLight})`,
                                  color: DASHBOARD_COLORS.textMedium
                                }}
                              >
                                <Image src="/logo/cross.svg" alt="Not completed" width={12} height={12} />
                                Pending
                              </div>
                            )
                          ) : (
                            flexRender(cell.column.columnDef.cell, cell.getContext())
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Empty state for mobile */}
            {table.getRowModel().rows.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 px-4">
                <div 
                  className="w-24 h-24 mb-5 rounded-full flex items-center justify-center shadow-lg"
                  style={{ 
                    background: `linear-gradient(135deg, ${DASHBOARD_COLORS.blue.start}, ${DASHBOARD_COLORS.purple.start})`,
                  }}
                >
                  <svg 
                    className="w-12 h-12" 
                    style={{ color: DASHBOARD_COLORS.white }}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p 
                  className="font-bold mb-2 text-center" 
                  style={{ 
                    color: DASHBOARD_COLORS.textDark,
                    fontSize: 'clamp(11px, 0.9vw, 13px)' 
                  }}
                >
                  {getTtl('No data available', ln)}
                </p>
                <p 
                  className="text-center" 
                  style={{ 
                    color: DASHBOARD_COLORS.textMedium,
                    fontSize: 'clamp(8px, 0.7vw, 10px)' 
                  }}
                >
                  Try adjusting your filters or date range
                </p>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER - Professional Style */}
        <div 
          className="flex-shrink-0"
          style={{ 
            borderTop: `2px solid ${DASHBOARD_COLORS.borderLight}`,
            background: 'linear-gradient(90deg, rgba(255,255,255,0.95), rgba(250,250,250,0.98))'
          }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3.5">
            <div className="flex items-center">
              <Paginator table={table} />
            </div>
            <div className="flex items-center gap-4">
              <div 
                className="whitespace-nowrap font-semibold" 
                style={{ 
                  color: DASHBOARD_COLORS.textMedium,
                  fontSize: 'clamp(9px, 0.8vw, 11px)' 
                }}
              >
                {`${
                  table.getState().pagination.pageIndex * table.getState().pagination.pageSize +
                  (table.getFilteredRowModel().rows.length ? 1 : 0)
                } - ${
                  table.getRowModel().rows.length + table.getState().pagination.pageIndex * table.getState().pagination.pageSize
                } ${getTtl('of', ln)} ${table.getFilteredRowModel().rows.length}`}
              </div>
              <RowsIndicator table={table} />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Customtable
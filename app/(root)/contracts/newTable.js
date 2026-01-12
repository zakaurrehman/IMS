

'use client'

import Header from "../../../components/table/header";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"

import { useEffect, useMemo, useState, useContext } from "react"
import { TbSortDescending, TbSortAscending } from "react-icons/tb";

import { Paginator } from "../../../components/table/Paginator";
import RowsIndicator from "../../../components/table/RowsIndicator";
import './style.css';

import { SettingsContext } from "../../../contexts/useSettingsContext";
import { usePathname } from "next/navigation";
import { getTtl } from "../../../utils/languages";

import FiltersIcon from '../../../components/table/filters/filters';
import ResetFilterTableIcon from '../../../components/table/filters/resetTabe';
import dateBetweenFilterFn from '../../../components/table/filters/date-between-filter';
import { Filter } from "../../../components/table/filters/filterFunc";

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
    pageSize: 200
  })

  const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])

  const pathName = usePathname()
  const { ln } = useContext(SettingsContext);

  const [quickSumEnabled, setQuickSumEnabled] = useState(false);
  const [quickSumColumns, setQuickSumColumns] = useState([]);

  const [isEditMode, setIsEditMode] = useState(false)
  const [rowSelection, setRowSelection] = useState({});

  const [columnFilters, setColumnFilters] = useState([])

  // ----- Responsive + Touch-Friendly Selection Column -----
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
          className="w-4 h-4 cursor-pointer accent-blue-600 rounded shadow-sm"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
          className="w-4 h-4 cursor-pointer accent-blue-600 rounded shadow-sm"
        />
      ),
      enableSorting: false,
      enableColumnFilter: false,
      size: 56,
    };

    return [selectCol, ...(columns || [])];
  }, [columns, quickSumEnabled]);

  // ---------- TABLE CONFIG ----------
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

  return (
    <div className="flex flex-col relative">

      {/* HEADER - Enhanced with 3D depth */}
      <div className="relative  shadow-lg">
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

      {/* ---------- DESKTOP VIEW - Enhanced 3D Container ---------- */}
      <div className="hidden md:block overflow-x-auto overflow-y-auto 
        border-2 border-gray-300
        shadow-[0_8px_16px_rgba(0,0,0,0.15),0_4px_8px_rgba(0,0,0,0.1)]
        max-h-[720px] md:max-h-[700px] 2xl:max-h-[900px] 
        relative rounded-lg bg-gradient-to-br from-gray-50 to-gray-100">

        <table className="w-full border-collapse table-auto" style={{ minWidth: '100%' }}>

          {/* THEAD - Enhanced 3D Sticky Header */}
          <thead>

            {/* Header Row - Premium 3D Effect */}
            {table.getHeaderGroups().map(hdGroup =>
              <tr key={hdGroup.id}
                className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 
                  shadow-[0_4px_12px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.2)]">

                {hdGroup.headers.map(header =>
                  <th
                    key={header.id}
                    className="relative px-6 py-4 text-left text-xs text-white uppercase 
                      font-bold tracking-wide
                      border-r border-blue-500/30 last:border-r-0
                      transition-all duration-200
                      hover:bg-gradient-to-br hover:from-blue-500 hover:via-blue-600 hover:to-blue-700
                      whitespace-nowrap
                      shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]"
                    style={{ 
                      minWidth: '140px',
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}>

                    {/* SORTABLE HEADERS with 3D Icons */}
                    {header.column.getCanSort() ? (
                      <div
                        onClick={header.column.getToggleSortingHandler()}
                        className="flex items-center gap-3 cursor-pointer select-none group"
                      >
                        <span className="leading-tight drop-shadow-md">
                          {header.column.columnDef.header}
                        </span>
                        <span className="transition-transform group-hover:scale-110 drop-shadow-lg">
                          {{
                            asc: <TbSortAscending className="scale-125 flex-shrink-0" />,
                            desc: <TbSortDescending className="scale-125 flex-shrink-0" />
                          }[header.column.getIsSorted()]}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs font-bold leading-tight block drop-shadow-md">
                        {header.column.columnDef.header}
                      </span>
                    )}

                  </th>
                )}

              </tr>
            )}

            {/* Filter Row - Enhanced 3D Depth */}
            {filterOn && (
              <tr className="bg-gradient-to-b from-white to-gray-50 
                 
                shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
                {table.getHeaderGroups()[0].headers.map(header => (
                  <th 
                    key={header.id} 
                    className="px-4 py-3 text-left bg-white/95 relative
                      "
                    style={{ 
                      position: 'relative', 
                      zIndex: header.column.id === 'supplier' ? 100 : 50 
                    }}
                  >
                    {header.column.getCanFilter() ? (
                      <div className="flex items-center justify-start w-full">
                        <div className="w-full min-w-[160px] relative" style={{ zIndex: 'inherit' }}>
                          <Filter 
                            column={header.column} 
                            table={table} 
                            filterOn={filterOn} 
                          />
                        </div>
                      </div>
                    ) : null}
                  </th>
                ))}
              </tr>
            )}

          </thead>

          {/* TBODY - Perfect 3D Cell Design */}
          <tbody className=" bg-gradient-to-b from-gray-50 to-white">

            {table.getRowModel().rows.map((row, rowIndex) => (
              <tr
                key={row.id}
                className={`cursor-pointer transition-all duration-200
                  ${row.getIsSelected() 
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 shadow-[inset_0_2px_8px_rgba(59,130,246,0.15)]' 
                    : 'bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50'}
                  hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]
                  ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                onDoubleClick={() => SelectRow(row.original)}
              >

                {row.getVisibleCells().map((cell, cellIndex) => (
                  <td
                    key={cell.id}
                    data-label={cell.column.columnDef.header}
                    className="px-4 py-3 text-xs 
                      transition-all duration-150"
                    style={{ minWidth: '140px' }}
                  >
                    {/* Perfect 3D Cell Container */}
                    <div className={`
                      w-full px-4 py-2.5
                      bg-white
                      text-gray-800 font-medium
                      rounded-lg
                      shadow-[0_2px_6px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)]
                      hover:shadow-[0_4px_12px_rgba(0,0,0,0.12),0_2px_4px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,1)]
                      hover:bg-gradient-to-br hover:from-white hover:to-blue-50/30
                      transition-all duration-200
                      leading-relaxed
                      min-h-[40px]
                      ${cell.column.id === 'select' ? 'flex items-center justify-center' : ''}
                    `}>
                      <div className="text-[13px] font-medium text-gray-900 antialiased">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* ---------- MOBILE VIEW - Card Layout ---------- */}
      <div className="block md:hidden">
        <div className="space-y-4 p-2 max-h-[600px] overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
          {table.getRowModel().rows.map((row, rowIndex) => (
            <div
              key={row.id}
              className={`
                relative
                bg-white
                rounded-xl
                border-2 border-gray-300
                shadow-[0_4px_12px_rgba(0,0,0,0.1),0_2px_6px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.8)]
                transition-all duration-300
                overflow-hidden
                ${row.getIsSelected() ? 'ring-2 ring-blue-500 bg-blue-50/30' : ''}
              `}
            >
              {/* Card Header with Gradient */}
              <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-4 py-3 
                shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2)]">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold text-sm drop-shadow-md">
                    {getTtl('Row', ln)} {rowIndex + 1}
                  </span>
                  {quickSumEnabled && (
                    <input
                      type="checkbox"
                      checked={row.getIsSelected()}
                      disabled={!row.getCanSelect()}
                      onChange={row.getToggleSelectedHandler()}
                      onClick={(e) => e.stopPropagation()}
                      className="w-5 h-5 cursor-pointer accent-blue-600 rounded shadow-lg"
                    />
                  )}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4 space-y-3">
                {row.getVisibleCells().map((cell) => {
                  // Skip select column in mobile view content (already in header)
                  if (cell.column.id === 'select') return null;
                  
                  return (
                    <div
                      key={cell.id}
                      className="flex flex-col space-y-1.5 pb-3 "
                    >
                      {/* Label */}
                      <div className="text-xs font-bold text-blue-700 uppercase tracking-wide 
                        drop-shadow-sm">
                        {cell.column.columnDef.header}
                      </div>
                      
                      {/* Value with 3D Effect */}
                      <div className="
                        bg-gradient-to-br from-white via-gray-50 to-white
                        px-4 py-3
                        rounded-lg
                        border border-gray-300
                        shadow-[0_2px_6px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.9)]
                        text-sm font-semibold text-gray-900
                        break-words
                        min-h-[44px]
                        flex items-center
                      ">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </div>
                  );
                })}
              </div>


            </div>
          ))}

          {/* No Data Message for Mobile */}
          {table.getRowModel().rows.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="font-medium">{getTtl('No data available', ln)}</p>
            </div>
          )}
        </div>
      </div>

      {/* ---------- FOOTER - Enhanced 3D Depth ---------- */}
      <div className="table-toolbar flex p-4 
        border-2 border-t-0 border-gray-300
        flex-wrap 
        bg-gradient-to-br from-white via-gray-50 to-white
        rounded-b-xl 
        shadow-[0_8px_16px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.8)]
        gap-3 items-center">

        <div className="hidden lg:flex text-gray-700 text-sm font-medium w-auto px-3 py-2 
          flex-shrink-0 bg-white rounded-lg border border-gray-200 
          shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
          {`${getTtl('Showing', ln)} ${
            table.getState().pagination.pageIndex * table.getState().pagination.pageSize +
            (table.getFilteredRowModel().rows.length ? 1 : 0)
          }-${table.getRowModel().rows.length + table.getState().pagination.pageIndex * table.getState().pagination.pageSize}
          ${getTtl('of', ln)} ${table.getFilteredRowModel().rows.length}`}
        </div>

        <Paginator table={table} />
        <RowsIndicator table={table} />
      </div>

    </div>
  )
}

export default Customtable


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
          className="w-4 h-4 cursor-pointer accent-blue-600 rounded outline-none focus:outline-none focus:ring-0 border-0"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
          className="w-4 h-4 cursor-pointer accent-blue-600 rounded outline-none focus:outline-none focus:ring-0 border-0"
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
    <div className="flex flex-col relative border-2 border-[var(--selago)] rounded-lg shadow-sm">

      {/* HEADER - Enhanced with 3D depth */}
      <div className="relative">
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

      {/* ---------- DESKTOP VIEW - Table area with constrained height ---------- */}
      <div className="hidden md:block overflow-x-auto relative custom-scroll">
        <div className="overflow-y-auto max-h-[60vh] custom-scroll" style={{ scrollbarGutter: 'stable' }}>
        <table className="w-full border-collapse table-auto table-cell-uniform" style={{ minWidth: '100%' }}>

          {/* THEAD - Enhanced 3D Sticky Header */}
          <thead className="md:sticky md:top-0">

            {table.getHeaderGroups().map(hdGroup =>
              <tr key={hdGroup.id} className="bg-[var(--endeavour)] border-b border-[var(--selago)]/20">

                {hdGroup.headers.map(header =>
                  <th
                    key={header.id}
                    className="relative px-3 py-2 text-left responsiveTextTitle text-white uppercase text-sm font-semibold tracking-wide whitespace-nowrap"
                    style={{ minWidth: '110px' }}>

                    {/* SORTABLE HEADERS with 3D Icons */}
                    {header.column.getCanSort() ? (
                      <div
                        onClick={header.column.getToggleSortingHandler()}
                        className="flex items-center gap-3 cursor-pointer select-none group"
                      >
                        <span className="responsiveTextTitle leading-tight">
                          {header.column.columnDef.header}
                        </span>
                        <span className="transition-transform">
                          {{
                            asc: <TbSortAscending className="flex-shrink-0" />,
                            desc: <TbSortDescending className="flex-shrink-0" />
                          }[header.column.getIsSorted()]}
                        </span>
                      </div>
                      ) : (
                      <span className="responsiveTextTitle font-semibold leading-tight block">
                        {header.column.columnDef.header}
                      </span>
                    )}

                  </th>
                )}

              </tr>
            )}

            {filterOn && (
              <tr className="bg-white">
                {table.getHeaderGroups()[0].headers.map(header => (
                  <th 
                    key={header.id} 
                    className="px-4 py-3 text-left bg-white/95 relative"
                  >
                    {header.column.getCanFilter() ? (
                      <div className="flex items-center justify-start w-full">
                        <div className="w-full min-w-[160px] relative">
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

          {/* TBODY - flat design */}
          <tbody>

            {table.getRowModel().rows.map((row, rowIndex) => (
            <tr
  key={row.id}
  onDoubleClick={() => SelectRow(row.original)}
  className="
    cursor-pointer
    transition
    sm:hover:shadow-[0_10px_26px_rgba(0,0,0,0.18)]
    hover:bg-[#F9F9F9]
  "
>


                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    data-label={cell.column.columnDef.header}
                    className="px-1 py-0.5 text-[0.72rem] leading-tight responsiveTextTable text-[var(--port-gore)] transition-colors truncate"
                    style={{ minWidth: '86px' }}
                  >
                    <div
                      className="inline-block
    px-2 py-2
    rounded-md
    w-full
    transition-colors
    hover:text-[var(--endeavour)]
    hover:bg-gray-200"
                      
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  </td>
                ))}
              </tr>
            ))}

          </tbody>

        </table>
        </div>

      </div>

      {/* ---------- MOBILE VIEW - Card Layout ---------- */}
              <div className="block md:hidden">
              <div className="space-y-3 p-2 max-h-[560px] overflow-y-auto custom-scroll">
          {table.getRowModel().rows.map((row, rowIndex) => (
            <div
              key={row.id}
              className="relative bg-white rounded-md border border-[var(--selago)]/30 overflow-hidden transform transition-all duration-300 ease-out hover:shadow-sm hover:border-[var(--endeavour)]/20 hover:-translate-y-0.5"
            >
              {/* Card Header */}
              <div className="bg-[var(--endeavour)] px-2 py-1 relative">
                <div className="flex items-center justify-between">
                    <span className="responsiveTextTitle text-white text-sm font-semibold">
                      {getTtl('Row', ln)} {rowIndex + 1}
                    </span>
                </div>
                {quickSumEnabled && (
                  <input
                    type="checkbox"
                    checked={row.getIsSelected()}
                    disabled={!row.getCanSelect()}
                    onChange={row.getToggleSelectedHandler()}
                    onClick={(e) => e.stopPropagation()}
                    className="w-5 h-5 cursor-pointer accent-blue-600 rounded absolute right-2 top-2"
                  />
                )}
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
                      <div className="text-xs font-bold text-[var(--chathams-blue)] uppercase tracking-wide responsiveTextTitle">
                        {cell.column.columnDef.header}
                      </div>
                      
                      {/* Value with 3D Effect */}
                      <div className="px-1.5 py-0.5 rounded-md border border-[var(--selago)]/40 responsiveTextTable font-medium text-[var(--port-gore)] break-words min-h-[24px] flex items-center hover:bg-[var(--selago)]/12 transition-all duration-300 ease-out">
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

      {/* ---------- FOOTER - Table toolbar (sticky on desktop) ---------- */}
      {/* ---------- FOOTER - Modern Table Toolbar ---------- */}
<div className="flex flex-col md:flex-row items-center justify-between gap-3 py-4 bg-white md:sticky md:bottom-0">

  {/* Left: Pagination */}
  <div className="flex items-center  ml-3  md:ml-3">
    <Paginator table={table} />
  </div>

  {/* Right: Rows info + Rows per page */}
  <div className="flex items-center gap-4">
    <div className="text-[var(--port-gore)] text-[0.72rem] font-medium">
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
  )
}

export default Customtable
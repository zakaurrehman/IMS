
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
import Image from "next/image";
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
          className="w-4 h-4 cursor-pointer accent-blue-600"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
          className="w-4 h-4 cursor-pointer accent-blue-600"
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
      <div className="flex flex-col border-2 border-[var(--selago)] rounded-lg shadow-sm bg-white hover:shadow-lg">

        {/* HEADER */}
        <div className="flex-shrink-0 border-b border-[var(--selago)]">
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
          <div className="overflow-auto custom-scroll" style={{ maxHeight: dynamicMaxHeight }}>
            <table className="w-full border-collapse" style={{ tableLayout: 'auto' }}>

              {/* THEAD */}
              <thead className="sticky top-0  bg-[var(--endeavour)] shadow-lg">
                {table.getHeaderGroups().map(hdGroup => (
                  <tr key={hdGroup.id} className="border-b border-[var(--selago)]/20">
                    {hdGroup.headers.map(header => (
                      <th
                        key={header.id}
                        className="px-2 py-2.5 text-left text-white uppercase font-normal tracking-wide whitespace-nowrap shadow-lg"
                        style={{
                          minWidth: header.column.id === 'select' ? '50px' : '80px',
                          maxWidth: header.column.id === 'select' ? '50px' : 'none',
                          fontSize: 'clamp(9px, 0.8vw, 11px)',
                        }}
                      >
                        {header.column.getCanSort() ? (
                          <div
                            onClick={header.column.getToggleSortingHandler()}
                            className="flex items-center gap-1 cursor-pointer select-none hover:text-blue-200 transition-colors"
                          >
                            <span className="truncate">{header.column.columnDef.header}</span>
                            <span className="flex-shrink-0">
                              {{
                                asc: <TbSortAscending className="w-3 h-3" />,
                                desc: <TbSortDescending className="w-3 h-3" />
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

                {filterOn && (
                  <tr className="bg-white border-b border-[var(--selago)]">
                    {table.getHeaderGroups()[0].headers.map(header => (
                      <th
                        key={header.id}
                        className="px-2 py-1.5 bg-white"
                        style={{
                          minWidth: header.column.id === 'select' ? '50px' : '80px',
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

              {/* TBODY */}
              <tbody className="bg-white">
                {table.getRowModel().rows.map((row, rowIndex) => (
                  <tr
                    key={row.id}
                    onDoubleClick={() => SelectRow(row.original)}
                    className={`
                      cursor-pointer border-b border-[var(--selago)]/20 transition-all duration-150
                      hover:bg-gray-50 hover:shadow-lg
                      ${highlightId === row.original.id ? 'bg-yellow-50 ring-2 ring-yellow-400 ring-inset' : ''}
                      ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}
                    `}
                  >
                    {row.getVisibleCells().map(cell => (
                      <td
                        key={cell.id}
                        className="px-2 py-2 text-[var(--port-gore)]  transition-colors duration-100 hover:bg-gray-200 hover:text-[var(--endeavour)] hover:rounded-md hover:shadow-lg "
                        style={{
                          minWidth: cell.column.id === 'select' ? '50px' : '80px',
                          maxWidth: cell.column.id === 'select' ? '50px' : '200px',
                          fontSize: 'clamp(10px, 0.9vw, 12px)',
                        }}
                      >
                        <div className="break-words overflow-hidden leading-relaxed">
                          {/* Custom rendering for 'completed' column: use SVGs */}
                          {cell.column.id === 'completed' ? (
                            cell.getValue() ? (
                              <Image src="/logo/right.svg" alt="Completed" width={18} height={18} />
                            ) : (
                              <Image src="/logo/cross.svg" alt="Not completed" width={18} height={18} />
                            )
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
                      className="py-20 text-center"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-20 h-20 mb-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <p className="text-gray-700 mb-1" style={{ fontSize: 'clamp(9px, 0.8vw, 11px)' }}>{getTtl('No data available', ln)}</p>
                        <p className="text-gray-500" style={{ fontSize: 'clamp(7px, 0.6vw, 9px)' }}>Try adjusting your filters or date range</p>
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
            className="overflow-y-auto custom-scroll px-2 py-2 space-y-2"
            style={{ maxHeight: dynamicMaxHeight }}
          >
            {table.getRowModel().rows.map((row, rowIndex) => (
              <div
                key={row.id}
                onClick={() => SelectRow(row.original)}
                className={`
                  bg-white rounded-lg border overflow-hidden 
                  shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]
                  ${highlightId === row.original.id ? 'bg-yellow-50 ring-2 ring-yellow-400 border-yellow-300' : 'border-[var(--selago)]/40'}
                `}
              >
                {/* Card Header */}
                <div className="bg-[var(--endeavour)] px-2.5 py-1.5 flex items-center justify-between">
                  <span className="text-white" style={{ fontSize: 'clamp(10px, 0.9vw, 12px)' }}>
                    {getTtl('Row', ln)} {rowIndex + 1}
                  </span>
                  {quickSumEnabled && (
                    <input
                      type="checkbox"
                      checked={row.getIsSelected()}
                      disabled={!row.getCanSelect()}
                      onChange={row.getToggleSelectedHandler()}
                      onClick={(e) => e.stopPropagation()}
                      className="w-4 h-4 cursor-pointer accent-blue-600 rounded"
                    />
                  )}
                </div>

                {/* Card Content */}
                <div className="p-2 space-y-1.5">
                  {row.getVisibleCells().map((cell) => {
                    if (cell.column.id === 'select') return null;
                    
                    return (
                      <div key={cell.id} className="flex flex-col space-y-0.5 border-b border-gray-100/50 last:border-0 pb-1.5 last:pb-0">
                        <div className="text-[var(--chathams-blue)] uppercase tracking-wide" style={{ fontSize: 'clamp(7px, 0.6vw, 9px)' }}>
                          {cell.column.columnDef.header}
                        </div>
                        <div className="text-[var(--port-gore)] font-normal break-words bg-gray-50 px-2 py-1 rounded leading-relaxed min-h-[26px] flex items-center" style={{ fontSize: 'clamp(10px, 0.9vw, 12px)' }}>
                          {/* Custom rendering for 'completed' column: use SVGs */}
                          {cell.column.id === 'completed' ? (
                            cell.getValue() ? (
                              <Image src="/logo/right.svg" alt="Completed" width={18} height={18} />
                            ) : (
                              <Image src="/logo/cross.svg" alt="Not completed" width={18} height={18} />
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
              <div className="flex flex-col items-center justify-center py-20 px-4">
                <div className="w-20 h-20 mb-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                </div>
                <p className="text-gray-700 mb-1 text-center" style={{ fontSize: 'clamp(9px, 0.8vw, 11px)' }}>{getTtl('No data available', ln)}</p>
                <p className="text-gray-500 text-center" style={{ fontSize: 'clamp(7px, 0.6vw, 9px)' }}>Try adjusting your filters or date range</p>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex-shrink-0 border-t border-[var(--selago)] bg-white">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-3 py-2">
            <div className="flex items-center">
              <Paginator table={table} />
            </div>
            <div className="flex items-center gap-3">
              <div className="text-[var(--port-gore)] whitespace-nowrap" style={{ fontSize: 'clamp(9px, 0.8vw, 11px)' }}>
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
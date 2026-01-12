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

import { Fragment, useEffect, useMemo, useState } from "react"
import { TbSortDescending, TbSortAscending } from "react-icons/tb";

import { Paginator } from "../../../components/table/Paginator";
import RowsIndicator from "../../../components/table/RowsIndicator";
import { usePathname } from "next/navigation";
import '../contracts/style.css';
import { getTtl } from "../../../utils/languages";
import { Filter } from '../../../components/table/filters/filterFunc'
import FiltersIcon from '../../../components/table/filters/filters';
import ResetFilterTableIcon from '../../../components/table/filters/resetTabe';
import dateBetweenFilterFn from '../../../components/table/filters/date-between-filter';

const Customtable = ({
  data,
  columns,
  invisible,
  SelectRow,
  excellReport,
  cb,
  setFilteredData,
  ln
}) => {

  const [globalFilter, setGlobalFilter] = useState('')
  const [columnVisibility, setColumnVisibility] = useState(invisible)
  const [filterOn, setFilterOn] = useState(false)

  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 500
  })

  const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])

  const pathName = usePathname()
  const [columnFilters, setColumnFilters] = useState([])

  const [quickSumEnabled, setQuickSumEnabled] = useState(false)
  const [quickSumColumns, setQuickSumColumns] = useState([])
  const [rowSelection, setRowSelection] = useState({})

  const columnsWithSelection = useMemo(() => {
    if (!quickSumEnabled) return columns

    const selectCol = {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          ref={el => el && (el.indeterminate = table.getIsSomePageRowsSelected())}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
          className="w-4 h-4 accent-blue-600 cursor-pointer rounded"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
          className="w-4 h-4 accent-blue-600 cursor-pointer rounded"
        />
      ),
      enableSorting: false,
      enableColumnFilter: false,
      size: 48,
    }

    return [selectCol, ...(columns || [])]
  }, [columns, quickSumEnabled])

  const table = useReactTable({
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

  useEffect(() => {
    setFilteredData(table.getFilteredRowModel().rows.map(x => x.original))
  }, [globalFilter, columnFilters])

  const resetTable = () => table.resetColumnFilters()

  return (
    <div className="flex flex-col relative">

      {/* HEADER */}
      <div className="relative  shadow-lg">
        <Header
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          table={table}
          excellReport={excellReport}
          cb={cb}
          filterIcon={FiltersIcon(ln, filterOn, setFilterOn)}
          resetFilterTable={ResetFilterTableIcon(ln, resetTable, filterOn)}
          quickSumEnabled={quickSumEnabled}
          setQuickSumEnabled={setQuickSumEnabled}
          quickSumColumns={quickSumColumns}
          setQuickSumColumns={setQuickSumColumns}
        />
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block
        overflow-x-auto overflow-y-auto
        border-2 border-gray-300
        rounded-xl
        shadow-[0_10px_24px_rgba(0,0,0,0.18),0_6px_12px_rgba(0,0,0,0.12)]
        bg-gradient-to-br from-gray-50 to-gray-100
        max-h-[360px] md:max-h-[310px] 2xl:max-h-[550px]
        relative">

        <table className="w-full border-collapse table-auto">

          <thead className="sticky top-0 ">
            {table.getHeaderGroups().map(hdGroup => (
              <Fragment key={hdGroup.id}>

                <tr className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
                  {hdGroup.headers.map(header => (
                    <th key={header.id}
                      className="px-6 py-4 text-xs font-bold uppercase text-white border-r border-blue-500/30 whitespace-nowrap"
                    >
                      {header.column.getCanSort() ? (
                        <div
                          onClick={header.column.getToggleSortingHandler()}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          {header.column.columnDef.header}
                          {{
                            asc: <TbSortAscending />,
                            desc: <TbSortDescending />
                          }[header.column.getIsSorted()]}
                        </div>
                      ) : header.column.columnDef.header}
                    </th>
                  ))}
                </tr>

                {filterOn && (
                  <tr className="bg-white">
                    {hdGroup.headers.map(header => (
                      <th key={header.id} className="px-3 py-3">
                        {header.column.getCanFilter() && (
                          <Filter column={header.column} table={table} filterOn={filterOn} />
                        )}
                      </th>
                    ))}
                  </tr>
                )}

              </Fragment>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}
                className="hover:bg-blue-50 cursor-pointer"
                onDoubleClick={() => SelectRow(row.original)}
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-5 py-3 text-xs">
                    <div className="bg-white rounded-lg px-4 py-2 shadow">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* ================= MOBILE CARD VIEW ================= */}
      <div className="block md:hidden">
        <div className="space-y-4 p-2 max-h-[600px] overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">

          {table.getRowModel().rows.map((row, rowIndex) => (
            <div key={row.id}
              className={`bg-white rounded-xl border-2 border-gray-300 shadow-md overflow-hidden
              ${row.getIsSelected() ? 'ring-2 ring-blue-500 bg-blue-50/30' : ''}`}
              onDoubleClick={() => SelectRow(row.original)}
            >

              <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-3 flex justify-between">
                <span className="text-white font-bold text-sm">
                  {getTtl('Row', ln)} {rowIndex + 1}
                </span>

                {quickSumEnabled && (
                  <input
                    type="checkbox"
                    checked={row.getIsSelected()}
                    onChange={row.getToggleSelectedHandler()}
                    className="w-5 h-5 accent-blue-600"
                  />
                )}
              </div>

              <div className="p-4 space-y-3">
                {row.getVisibleCells().map(cell => {
                  if (cell.column.id === 'select') return null
                  return (
                    <div key={cell.id}>
                      <div className="text-xs font-bold text-blue-700 uppercase">
                        {cell.column.columnDef.header}
                      </div>
                      <div className="mt-1 bg-gray-50 px-4 py-3 rounded-lg border shadow text-sm font-semibold">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </div>
                  )
                })}
              </div>

            </div>
          ))}

        </div>
      </div>

      {/* FOOTER */}
      <div className="flex p-4 gap-3 items-center border-2 border-t-0 border-gray-300 bg-white">
        <Paginator table={table} />
        <RowsIndicator table={table} />
      </div>

    </div>
  )
}

export default Customtable

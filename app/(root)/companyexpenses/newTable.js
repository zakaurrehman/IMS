
// 'use client'

// import Header from "../../../components/table/header";
// import {
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable
// } from "@tanstack/react-table"
// import { Fragment, useEffect, useMemo, useState, useContext } from "react"
// import { TbSortDescending, TbSortAscending } from "react-icons/tb";

// import { Paginator } from "../../../components/table/Paginator";
// import RowsIndicator from "../../../components/table/RowsIndicator";
// import '../contracts/style.css';
// import { SettingsContext } from "../../../contexts/useSettingsContext";
// import { getTtl } from "../../../utils/languages";
// import FiltersIcon from '../../../components/table/filters/filters';
// import ResetFilterTableIcon from '../../../components/table/filters/resetTabe';
// import dateBetweenFilterFn from '../../../components/table/filters/date-between-filter';
// import { Filter } from "../../../components/table/filters/filterFunc";

// const Customtable = ({ data, columns, SelectRow, excellReport, setFilteredId, invisible }) => {

//   const [globalFilter, setGlobalFilter] = useState('')
//   const [columnVisibility, setColumnVisibility] = useState(invisible)
//   const [filterOn, setFilterOn] = useState(false)
//   const [columnFilters, setColumnFilters] = useState([])

//   const [{ pageIndex, pageSize }, setPagination] = useState({
//     pageIndex: 0,
//     pageSize: 500
//   })

//   const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])
//   const { ln } = useContext(SettingsContext)

//   const [quickSumEnabled, setQuickSumEnabled] = useState(false)
//   const [quickSumColumns, setQuickSumColumns] = useState([])
//   const [rowSelection, setRowSelection] = useState({})

//   const columnsWithSelection = useMemo(() => {
//     if (!quickSumEnabled) return columns

//     const selectCol = {
//       id: "select",
//       header: ({ table }) => (
//         <input
//           type="checkbox"
//           checked={table.getIsAllPageRowsSelected()}
//           ref={el => el && (el.indeterminate = table.getIsSomePageRowsSelected())}
//           onChange={table.getToggleAllPageRowsSelectedHandler()}
//           className="qs-checkbox"
//         />
//       ),
//       cell: ({ row }) => (
//         <input
//           type="checkbox"
//           checked={row.getIsSelected()}
//           onChange={row.getToggleSelectedHandler()}
//           className="qs-checkbox"
//         />
//       ),
//       enableSorting: false,
//       enableColumnFilter: false,
//       size: 48,
//     }

//     return [selectCol, ...columns]
//   }, [columns, quickSumEnabled])

//   const table = useReactTable({
//     data,
//     columns: columnsWithSelection,
//     enableRowSelection: quickSumEnabled,
//     filterFns: { dateBetweenFilterFn },
//     state: {
//       globalFilter,
//       columnVisibility,
//       pagination,
//       columnFilters,
//       rowSelection,
//     },
//     onRowSelectionChange: setRowSelection,
//     onColumnFiltersChange: setColumnFilters,
//     onGlobalFilterChange: setGlobalFilter,
//     onColumnVisibilityChange: setColumnVisibility,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     onPaginationChange: setPagination,
//   })

//   const resetTable = () => table.resetColumnFilters()

//   useEffect(() => {
//     setFilteredId(
//       table.getFilteredRowModel().rows.map(r => r.original.id)
//     )
//   }, [columnFilters, globalFilter])

//   const formatCurrency = (val, cur) =>
//     new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: cur,
//       minimumFractionDigits: 2
//     }).format(val)

//   const totalUSD = formatCurrency(
//     table.getFilteredRowModel().rows.reduce(
//       (s, r) => s + (r.original.cur === 'USD' ? r.original.amount : 0),
//       0
//     ),
//     'USD'
//   )

//   const totalEUR = formatCurrency(
//     table.getFilteredRowModel().rows.reduce(
//       (s, r) => s + (r.original.cur === 'EUR' ? r.original.amount : 0),
//       0
//     ),
//     'EUR'
//   )

//   return (
//     <div className="flex flex-col relative w-full">

//       {/* HEADER */}
//       <Header
//         globalFilter={globalFilter}
//         setGlobalFilter={setGlobalFilter}
//         table={table}
//         excellReport={excellReport}
//         filterIcon={FiltersIcon(ln, filterOn, setFilterOn)}
//         resetFilterTable={ResetFilterTableIcon(ln, resetTable, filterOn)}
//         quickSumEnabled={quickSumEnabled}
//         setQuickSumEnabled={setQuickSumEnabled}
//         quickSumColumns={quickSumColumns}
//         setQuickSumColumns={setQuickSumColumns}
//       />

//       {/* TABLE */}
//       <div className="w-full overflow-x-auto overflow-y-auto border-2 border-gray-300 rounded-xl bg-white shadow-lg
//                       max-h-[70vh] md:max-h-[650px] 2xl:max-h-[850px]">

//         <table className="min-w-[1200px] w-full border-collapse">

//           <thead className="sticky top-0 ">
//             {table.getHeaderGroups().map(group => (
//               <Fragment key={group.id}>

//                 {/* TOTAL USD */}
//                 <tr className="bg-[var(--rock-blue)]/50">
//                   {group.headers.map(h => (
//                     <th key={h.id} className="px-4 py-2 text-xs font-semibold">
//                       {h.id === 'supplier' ? 'Total $:' : h.id === 'amount' ? totalUSD : ''}
//                     </th>
//                   ))}
//                 </tr>

//                 {/* TOTAL EUR */}
//                 <tr className="bg-[var(--rock-blue)]/50">
//                   {group.headers.map(h => (
//                     <th key={h.id} className="px-4 py-2 text-xs font-semibold">
//                       {h.id === 'supplier' ? 'Total €:' : h.id === 'amount' ? totalEUR : ''}
//                     </th>
//                   ))}
//                 </tr>

//                 {/* HEADER */}
//                 <tr className="bg-gradient-to-r from-blue-600 to-blue-800">
//                   {group.headers.map(h => (
//                     <th key={h.id} className="px-4 py-3 text-xs text-white font-bold whitespace-nowrap">
//                       {h.column.getCanSort() ? (
//                         <div
//                           onClick={h.column.getToggleSortingHandler()}
//                           className="flex items-center gap-1 cursor-pointer"
//                         >
//                           {h.column.columnDef.header}
//                           {{
//                             asc: <TbSortAscending />,
//                             desc: <TbSortDescending />
//                           }[h.column.getIsSorted()]}
//                         </div>
//                       ) : h.column.columnDef.header}
//                     </th>
//                   ))}
//                 </tr>

//                 {/* FILTER */}
//                 {filterOn && (
//                   <tr>
//                     {group.headers.map(h => (
//                       <th key={h.id} className="px-3 py-2">
//                         {h.column.getCanFilter() && (
//                           <Filter column={h.column} table={table} filterOn={filterOn} />
//                         )}
//                       </th>
//                     ))}
//                   </tr>
//                 )}
//               </Fragment>
//             ))}
//           </thead>

//           <tbody>
//             {table.getRowModel().rows.map(row => (
//               <tr
//                 key={row.id}
//                 onDoubleClick={() => SelectRow(row.original)}
//                 className="hover:bg-blue-50 cursor-pointer"
//               >
//                 {row.getVisibleCells().map(cell => (
//                   <td key={cell.id} className="px-4 py-3 text-xs whitespace-nowrap">
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>

//         </table>
//       </div>

//       {/* FOOTER */}
//       <div className="flex flex-wrap items-center gap-4 p-3 border border-t-0 rounded-b-xl bg-gray-50">
//         <span className="text-sm text-gray-600 hidden md:block">
//           {`${getTtl('Showing', ln)} ${pageIndex * pageSize + 1} - ${pageIndex * pageSize + table.getRowModel().rows.length}
//           ${getTtl('of', ln)} ${table.getFilteredRowModel().rows.length}`}
//         </span>

//         <Paginator table={table} />
//         <RowsIndicator table={table} />
//       </div>

//     </div>
//   )
// }

// export default Customtable
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

import { Fragment, useEffect, useMemo, useState, useContext } from "react"
import { TbSortDescending, TbSortAscending } from "react-icons/tb";

import { Paginator } from "../../../components/table/Paginator";
import RowsIndicator from "../../../components/table/RowsIndicator";
import { SettingsContext } from "../../../contexts/useSettingsContext";
import { getTtl } from "../../../utils/languages";
import FiltersIcon from '../../../components/table/filters/filters';
import ResetFilterTableIcon from '../../../components/table/filters/resetTabe';
import dateBetweenFilterFn from '../../../components/table/filters/date-between-filter';
import { Filter } from "../../../components/table/filters/filterFunc";

const Customtable = ({ data, columns, SelectRow, excellReport, setFilteredId, invisible }) => {

  const [globalFilter, setGlobalFilter] = useState('')
  const [columnVisibility, setColumnVisibility] = useState(invisible)
  const [filterOn, setFilterOn] = useState(false)
  const [columnFilters, setColumnFilters] = useState([])

  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 500
  })

  const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])
  const { ln } = useContext(SettingsContext)

  const [quickSumEnabled, setQuickSumEnabled] = useState(false)
  const [quickSumColumns, setQuickSumColumns] = useState([])
  const [rowSelection, setRowSelection] = useState({})

  const columnsWithSelection = useMemo(() => {
    if (!quickSumEnabled) return columns

    return [
      {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            ref={el => el && (el.indeterminate = table.getIsSomePageRowsSelected())}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            className="w-4 h-4 accent-blue-600 cursor-pointer"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="w-4 h-4 accent-blue-600 cursor-pointer"
          />
        ),
        enableSorting: false,
        enableColumnFilter: false,
        size: 48,
      },
      ...columns
    ]
  }, [columns, quickSumEnabled])

  const table = useReactTable({
    data,
    columns: columnsWithSelection,
    enableRowSelection: quickSumEnabled,
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
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  })

  const resetTable = () => table.resetColumnFilters()

  useEffect(() => {
    setFilteredId(
      table.getFilteredRowModel().rows.map(r => r.original.id)
    )
  }, [columnFilters, globalFilter])

  return (
    <div className="flex flex-col relative w-full">

      {/* HEADER */}
      <Header
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        table={table}
        excellReport={excellReport}
        filterIcon={FiltersIcon(ln, filterOn, setFilterOn)}
        resetFilterTable={ResetFilterTableIcon(ln, resetTable, filterOn)}
        quickSumEnabled={quickSumEnabled}
        setQuickSumEnabled={setQuickSumEnabled}
        quickSumColumns={quickSumColumns}
        setQuickSumColumns={setQuickSumColumns}
      />

      {/* ================= DESKTOP TABLE ================= */}
      <div className="
        hidden md:block
        overflow-x-auto overflow-y-auto
        border-2 border-gray-300
        rounded-xl
        bg-gradient-to-br from-gray-50 to-gray-100
        shadow-[0_10px_24px_rgba(0,0,0,0.18)]
        max-h-[70vh] md:max-h-[650px] 2xl:max-h-[850px]
      ">
        <table className="w-full border-collapse table-auto">

          <thead className="sticky top-0 ">
            {table.getHeaderGroups().map(group => (
              <Fragment key={group.id}>
                <tr className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
                  {group.headers.map(h => (
                    <th
                      key={h.id}
                      className="px-6 py-4 text-xs uppercase font-bold text-white border-r border-blue-500/30 whitespace-nowrap"
                    >
                      {h.column.getCanSort() ? (
                        <div
                          onClick={h.column.getToggleSortingHandler()}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          {h.column.columnDef.header}
                          {{
                            asc: <TbSortAscending />,
                            desc: <TbSortDescending />
                          }[h.column.getIsSorted()]}
                        </div>
                      ) : h.column.columnDef.header}
                    </th>
                  ))}
                </tr>

                {filterOn && (
                  <tr className="bg-white">
                    {group.headers.map(h => (
                      <th key={h.id} className="px-3 py-3">
                        {h.column.getCanFilter() && (
                          <Filter column={h.column} table={table} filterOn={filterOn} />
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
              <tr
                key={row.id}
                onDoubleClick={() => SelectRow(row.original)}
                className={`cursor-pointer transition
                  ${row.getIsSelected() ? 'bg-blue-100' : 'hover:bg-blue-50'}`}
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-3 text-xs">
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

          {table.getRowModel().rows.map((row, index) => (
            <div
              key={row.id}
              className={`bg-white rounded-xl border-2 border-gray-300 shadow-md overflow-hidden
                ${row.getIsSelected() ? 'ring-2 ring-blue-500 bg-blue-50/30' : ''}`}
            >
              <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-4 py-3 flex justify-between">
                <span className="text-white font-bold text-sm">
                  {getTtl('Row', ln)} {index + 1}
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
      <div className="flex p-4 gap-3 items-center border-2 border-t-0 border-gray-300 bg-white rounded-b-xl">
        <Paginator table={table} />
        <RowsIndicator table={table} />
      </div>

    </div>
  )
}

export default Customtable

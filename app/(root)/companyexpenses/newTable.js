

// 'use client'

// import Header from "../../../components/table/header";
// import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
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

//     const [globalFilter, setGlobalFilter] = useState('')
//     const [columnVisibility, setColumnVisibility] = useState(invisible)
//     const [filterOn, setFilterOn] = useState(false)
//     const [columnFilters, setColumnFilters] = useState([])

//     const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 500 })
//     const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])
//     const { ln } = useContext(SettingsContext);

//     const [quickSumEnabled, setQuickSumEnabled] = useState(false);
//     const [quickSumColumns, setQuickSumColumns] = useState([]);
//     const [rowSelection, setRowSelection] = useState({});

//     const columnsWithSelection = useMemo(() => {
//         if (!quickSumEnabled) return columns;
//         const selectCol = {
//             id: "select",
//             header: ({ table }) => (
//                 <input 
//                     type="checkbox" 
//                     checked={table.getIsAllPageRowsSelected()}
//                     ref={(el) => { if (el) el.indeterminate = table.getIsSomePageRowsSelected(); }}
//                     onChange={table.getToggleAllPageRowsSelectedHandler()}
//                     className="qs-checkbox"
//                 />
//             ),
//             cell: ({ row }) => (
//                 <input 
//                     type="checkbox" 
//                     checked={row.getIsSelected()} 
//                     disabled={!row.getCanSelect()}
//                     onChange={row.getToggleSelectedHandler()}
//                     className="qs-checkbox"
//                 />
//             ),
//             enableSorting: false, 
//             enableColumnFilter: false, 
//             size: 48,
//         };
//         return [selectCol, ...(columns || [])];
//     }, [columns, quickSumEnabled]);

//     const table = useReactTable({
//         columns: columnsWithSelection, 
//         data,
//         enableRowSelection: quickSumEnabled,
//         getCoreRowModel: getCoreRowModel(),
//         filterFns: { dateBetweenFilterFn },
//         state: { globalFilter, columnVisibility, pagination, columnFilters, rowSelection },
//         onRowSelectionChange: setRowSelection,
//         onColumnFiltersChange: setColumnFilters,
//         onGlobalFilterChange: setGlobalFilter,
//         onColumnVisibilityChange: setColumnVisibility,
//         getFilteredRowModel: getFilteredRowModel(),
//         getSortedRowModel: getSortedRowModel(),
//         getPaginationRowModel: getPaginationRowModel(),
//         onPaginationChange: setPagination,
//     });

//     const resetTable = () => table.resetColumnFilters()

//     useEffect(() => {
//         setFilteredId(table.getFilteredRowModel().rows.map(r => r.original.id))
//     }, [columnFilters, globalFilter]);

//     const formatCurrency = (val, cur) => new Intl.NumberFormat('en-US', { style: 'currency', currency: cur, minimumFractionDigits: 2 }).format(val);

//     const totalUSD = formatCurrency(
//         table.getFilteredRowModel().rows.reduce((sum, row) => sum + (row.original.cur === 'USD' ? row.original.amount : 0), 0),
//         'USD'
//     );

//     const totalEUR = formatCurrency(
//         table.getFilteredRowModel().rows.reduce((sum, row) => sum + (row.original.cur === 'EUR' ? row.original.amount : 0), 0),
//         'EUR'
//     );

//     const styledCell = (row, cell) => {
//         const field = cell.column?.columnDef?.accessorKey;
//         return ['description','sType','supplier'].includes(field) ? 'bg-[var(--selago)]/50' : 'bg-white';
//     }

//     return (
//         <div className="flex flex-col relative">

//             {/* HEADER */}
//             <div className="relative z-30">
//                 <Header 
//                     globalFilter={globalFilter} 
//                     setGlobalFilter={setGlobalFilter}
//                     table={table} 
//                     excellReport={excellReport}
//                     filterIcon={FiltersIcon(ln, filterOn, setFilterOn)}
//                     resetFilterTable={ResetFilterTableIcon(ln, resetTable, filterOn)}
//                     quickSumEnabled={quickSumEnabled}
//                     setQuickSumEnabled={setQuickSumEnabled}
//                     quickSumColumns={quickSumColumns}
//                     setQuickSumColumns={setQuickSumColumns}
//                 />
//             </div>

//             {/* TABLE CONTAINER */}
//             <div className="overflow-x-auto overflow-y-auto border-2 border-gray-300 rounded-xl shadow-lg md:max-h-[650px] 2xl:max-h-[850px] bg-white">
//                 <table className="w-full border-collapse table-auto">

//                     {/* TABLE HEAD */}
//                     <thead className="md:sticky md:top-0 md:z-20">
//                         {table.getHeaderGroups().map(group => (
//                             <Fragment key={group.id}>

//                                 {/* Total USD Row */}
//                                 <tr className="cursor-pointer bg-[var(--rock-blue)]/50">
//                                     {group.headers.map(header => (
//                                         <th key={header.id} className="px-5 py-2 text-xs font-semibold text-[var(--port-gore)] text-left whitespace-nowrap">
//                                             {header.id === 'supplier' ? 'Total $:' : header.id === 'amount' ? totalUSD : ''}
//                                         </th>
//                                     ))}
//                                 </tr>

//                                 {/* Total EUR Row */}
//                                 <tr className="cursor-pointer bg-[var(--rock-blue)]/50">
//                                     {group.headers.map(header => (
//                                         <th key={header.id} className="px-5 py-2 text-xs font-semibold text-[var(--port-gore)] text-left whitespace-nowrap">
//                                             {header.id === 'supplier' ? 'Total €:' : header.id === 'amount' ? totalEUR : ''}
//                                         </th>
//                                     ))}
//                                 </tr>

//                                 {/* Header Row */}
//                                 <tr className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-md">
//                                     {group.headers.map(header => (
//                                         <th key={header.id} className="px-5 py-3 text-left text-xs font-bold text-white uppercase border-r border-white/30 last:border-r-0 whitespace-nowrap">
//                                             {header.column.getCanSort() ? (
//                                                 <div onClick={header.column.getToggleSortingHandler()} className="flex items-center gap-2 cursor-pointer select-none">
//                                                     {header.column.columnDef.header}
//                                                     {{
//                                                         asc: <TbSortAscending className="text-white" />,
//                                                         desc: <TbSortDescending className="text-white" />
//                                                     }[header.column.getIsSorted()]}
//                                                 </div>
//                                             ) : header.column.columnDef.header}
//                                         </th>
//                                     ))}
//                                 </tr>

//                                 {/* Filter Row */}
//                                 {filterOn && (
//                                     <tr className="bg-white border-b-2 border-[var(--selago)]">
//                                         {group.headers.map(header => (
//                                             <th key={header.id} className="px-3 py-2 text-left" style={{ zIndex: ['supplier','cur'].includes(header.column.id) ? 100 : 50 }}>
//                                                 {header.column.getCanFilter() && <Filter column={header.column} table={table} filterOn={filterOn} />}
//                                             </th>
//                                         ))}
//                                     </tr>
//                                 )}
//                             </Fragment>
//                         ))}
//                     </thead>

//                     {/* TABLE BODY */}
//                     <tbody className="bg-white divide-y divide-[var(--selago)]">
//                         {table.getRowModel().rows.map(row => (
//                             <tr key={row.id} onDoubleClick={() => SelectRow(row.original)}
//                                 className={`transition-all duration-200 cursor-pointer hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 ${row.getIsSelected() ? 'bg-gradient-to-r from-blue-50 to-blue-100' : ''}`}>
//                                 {row.getVisibleCells().map(cell => (
//                                     <td key={cell.id} data-label={cell.column.columnDef.header}
//                                         className={`px-4 py-3 text-xs whitespace-nowrap ${styledCell(row, cell)}`}>
//                                         <div className="w-full px-3 py-2 bg-white rounded-lg shadow-inner hover:shadow-md transition-all duration-200">
//                                             {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                                         </div>
//                                     </td>
//                                 ))}
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* FOOTER */}
//             <div className="flex p-4 gap-3 items-center border-2 border-t-0 border-gray-300 rounded-b-xl bg-gradient-to-br from-white via-gray-50 to-white shadow-inner">
//                 <div className="hidden lg:flex text-sm text-gray-600">
//                     {`${getTtl('Showing', ln)} ${table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-${table.getRowModel().rows.length + table.getState().pagination.pageIndex * table.getState().pagination.pageSize} ${getTtl('of', ln)} ${table.getFilteredRowModel().rows.length}`}
//                 </div>
//                 <Paginator table={table} />
//                 <RowsIndicator table={table} />
//             </div>

//         </div>
//     )
// }

// export default Customtable;
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
import '../contracts/style.css';
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

    const selectCol = {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          ref={el => el && (el.indeterminate = table.getIsSomePageRowsSelected())}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
          className="qs-checkbox"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          className="qs-checkbox"
        />
      ),
      enableSorting: false,
      enableColumnFilter: false,
      size: 48,
    }

    return [selectCol, ...columns]
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

  const formatCurrency = (val, cur) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: cur,
      minimumFractionDigits: 2
    }).format(val)

  const totalUSD = formatCurrency(
    table.getFilteredRowModel().rows.reduce(
      (s, r) => s + (r.original.cur === 'USD' ? r.original.amount : 0),
      0
    ),
    'USD'
  )

  const totalEUR = formatCurrency(
    table.getFilteredRowModel().rows.reduce(
      (s, r) => s + (r.original.cur === 'EUR' ? r.original.amount : 0),
      0
    ),
    'EUR'
  )

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

      {/* TABLE */}
      <div className="w-full overflow-x-auto overflow-y-auto border-2 border-gray-300 rounded-xl bg-white shadow-lg
                      max-h-[70vh] md:max-h-[650px] 2xl:max-h-[850px]">

        <table className="min-w-[1200px] w-full border-collapse">

          <thead className="sticky top-0 ">
            {table.getHeaderGroups().map(group => (
              <Fragment key={group.id}>

                {/* TOTAL USD */}
                <tr className="bg-[var(--rock-blue)]/50">
                  {group.headers.map(h => (
                    <th key={h.id} className="px-4 py-2 text-xs font-semibold">
                      {h.id === 'supplier' ? 'Total $:' : h.id === 'amount' ? totalUSD : ''}
                    </th>
                  ))}
                </tr>

                {/* TOTAL EUR */}
                <tr className="bg-[var(--rock-blue)]/50">
                  {group.headers.map(h => (
                    <th key={h.id} className="px-4 py-2 text-xs font-semibold">
                      {h.id === 'supplier' ? 'Total €:' : h.id === 'amount' ? totalEUR : ''}
                    </th>
                  ))}
                </tr>

                {/* HEADER */}
                <tr className="bg-gradient-to-r from-blue-600 to-blue-800">
                  {group.headers.map(h => (
                    <th key={h.id} className="px-4 py-3 text-xs text-white font-bold whitespace-nowrap">
                      {h.column.getCanSort() ? (
                        <div
                          onClick={h.column.getToggleSortingHandler()}
                          className="flex items-center gap-1 cursor-pointer"
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

                {/* FILTER */}
                {filterOn && (
                  <tr>
                    {group.headers.map(h => (
                      <th key={h.id} className="px-3 py-2">
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
                className="hover:bg-blue-50 cursor-pointer"
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-3 text-xs whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* FOOTER */}
      <div className="flex flex-wrap items-center gap-4 p-3 border border-t-0 rounded-b-xl bg-gray-50">
        <span className="text-sm text-gray-600 hidden md:block">
          {`${getTtl('Showing', ln)} ${pageIndex * pageSize + 1} - ${pageIndex * pageSize + table.getRowModel().rows.length}
          ${getTtl('of', ln)} ${table.getFilteredRowModel().rows.length}`}
        </span>

        <Paginator table={table} />
        <RowsIndicator table={table} />
      </div>

    </div>
  )
}

export default Customtable

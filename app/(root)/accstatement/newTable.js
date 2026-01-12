
// 'use client'

// import Header from "../../../components/table/header";
// import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
// import { Fragment, useEffect, useMemo, useState } from "react"
// import { TbSortDescending } from "react-icons/tb";
// import { TbSortAscending } from "react-icons/tb";

// import { Paginator } from "../../../components/table/Paginator";
// import RowsIndicator from "../../../components/table/RowsIndicator";
// import { usePathname } from "next/navigation";
// import '../contracts/style.css';
// import { getTtl } from "../../../utils/languages";
// import { Filter } from '../../../components/table/filters/filterFunc'
// import FiltersIcon from '../../../components/table/filters/filters';
// import ResetFilterTableIcon from '../../../components/table/filters/resetTabe';
// import dateBetweenFilterFn from '../../../components/table/filters/date-between-filter';


// const Customtable = ({ data, columns, invisible, SelectRow, excellReport, cb, setFilteredData, ln }) => {

//     const [globalFilter, setGlobalFilter] = useState('')
//     const [columnVisibility, setColumnVisibility] = useState(invisible)
//     const [filterOn, setFilterOn] = useState(false)
//     const [columnFilters, setColumnFilters] = useState([]) //Column filter

//     const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 500 })
//     const pagination = useMemo(() => ({ pageIndex, pageSize, }), [pageIndex, pageSize])
//     const pathName = usePathname()

//     // Quick Sum state
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
//         filterFns: {
//             dateBetweenFilterFn,
//         },
//         state: {
//             globalFilter,
//             columnVisibility,
//             pagination,
//             columnFilters,
//             rowSelection,
//         },
//         onRowSelectionChange: setRowSelection,
//         onColumnFiltersChange: setColumnFilters,
//         getFilteredRowModel: getFilteredRowModel(),
//         onGlobalFilterChange: setGlobalFilter,
//         onColumnVisibilityChange: setColumnVisibility,
//         getSortedRowModel: getSortedRowModel(),
//         getPaginationRowModel: getPaginationRowModel(),
//         onPaginationChange: setPagination,
//     })

//     useEffect(() => {
//         setFilteredData(table.getFilteredRowModel().rows.map(x => x.original))
//     }, [globalFilter, columnFilters])

//     const resetTable = () => {
//         table.resetColumnFilters()
//     }

//     return (
//         <div className="flex flex-col relative">
            
//             {/* HEADER - Higher z-index to stay above everything */}
//             <div className="relative ">
//                 <Header 
//                     globalFilter={globalFilter} 
//                     setGlobalFilter={setGlobalFilter}
//                     table={table} 
//                     excellReport={excellReport} 
//                     cb={cb} 
//                     type='accstatement'
//                     filterIcon={FiltersIcon(ln, filterOn, setFilterOn)}
//                     resetFilterTable={ResetFilterTableIcon(ln, resetTable, filterOn)}
//                     quickSumEnabled={quickSumEnabled}
//                     setQuickSumEnabled={setQuickSumEnabled}
//                     quickSumColumns={quickSumColumns}
//                     setQuickSumColumns={setQuickSumColumns}
//                 />
//             </div>

//             {/* SCROLL CONTAINER */}
//             <div className="overflow-x-auto overflow-y-auto border-x border-[var(--selago)] max-h-[700px] md:max-h-[650px] 2xl:max-h-[850px] relative ">
//                 <table className="w-full border-collapse table-auto" style={{ minWidth: '100%' }}>
                    
//                     {/* THEAD - Sticky with proper z-index */}
//                     <thead className="divide-y divide-[var(--selago)] md:sticky md:top-0 md:z-20">
//                         {table.getHeaderGroups().map((hdGroup, i) =>
//                             <Fragment key={hdGroup.id}>
//                                 {/* Total USD Row */}
//                                 <tr className="cursor-pointer bg-[var(--rock-blue)]/50">
//                                     {hdGroup.headers.map(header => (
//                                         <th 
//                                             key={header.id} 
//                                             className="text-[var(--port-gore)] font-semibold px-5 py-2 text-xs text-left whitespace-nowrap"
//                                             style={{ minWidth: '120px' }}
//                                         >
//                                             {header.column.columnDef.ttlUS}
//                                         </th>
//                                     ))}
//                                 </tr>

//                                 {/* Total EUR Row */}
//                                 <tr className="cursor-pointer bg-[var(--rock-blue)]/50">
//                                     {hdGroup.headers.map(header => (
//                                         <th 
//                                             key={header.id} 
//                                             className="text-[var(--port-gore)] font-semibold px-5 py-2 text-xs text-left whitespace-nowrap"
//                                             style={{ minWidth: '120px' }}
//                                         >
//                                             {header.column.columnDef.ttlEU}
//                                         </th>
//                                     ))}
//                                 </tr>

//                                 {/* Header Row */}
//                                 <tr 
//                                     key={hdGroup.id + '-row'} 
//                                     className='border-b border-[var(--selago)] bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)]'
//                                 >
//                                     {hdGroup.headers.map(header => (
//                                         <th 
//                                             key={header.id + '-header'} 
//                                             className="relative px-5 py-3 text-left text-xs font-semibold text-white uppercase border-b border-[var(--selago)] whitespace-nowrap"
//                                             style={{ minWidth: '120px' }}
//                                         >
//                                             {header.column.getCanSort() ? (
//                                                 <div 
//                                                     onClick={header.column.getToggleSortingHandler()}
//                                                     className='flex items-center gap-2 cursor-pointer select-none'
//                                                 >
//                                                     <span className="leading-tight">{header.column.columnDef.header}</span>
//                                                     {{
//                                                         asc: <TbSortAscending className="text-white scale-125 flex-shrink-0" />,
//                                                         desc: <TbSortDescending className="text-white scale-125 flex-shrink-0" />
//                                                     }[header.column.getIsSorted()]}
//                                                 </div>
//                                             ) : (
//                                                 <span className="text-white text-xs font-medium leading-tight block">
//                                                     {header.column.columnDef.header}
//                                                 </span>
//                                             )}
//                                         </th>
//                                     ))}
//                                 </tr>

//                                 {/* Filter Row - Separate row with better spacing and z-index */}
//                                 {filterOn && (
//                                     <tr className="bg-white border-b-2 border-[var(--selago)]">
//                                         {hdGroup.headers.map(header => (
//                                             <th 
//                                                 key={header.id} 
//                                                 className="px-2 py-2.5 text-left bg-white relative"
//                                                 style={{ 
//                                                     position: 'relative', 
//                                                     zIndex: ['supplier', 'client', 'type'].includes(header.column.id) ? 100 : 50 
//                                                 }}
//                                             >
//                                                 {header.column.getCanFilter() ? (
//                                                     <div className="flex items-center justify-start w-full">
//                                                         <div className="w-full min-w-[140px] relative" style={{ zIndex: 'inherit' }}>
//                                                             <Filter 
//                                                                 column={header.column} 
//                                                                 table={table} 
//                                                                 filterOn={filterOn} 
//                                                             />
//                                                         </div>
//                                                     </div>
//                                                 ) : null}
//                                             </th>
//                                         ))}
//                                     </tr>
//                                 )}
//                             </Fragment>
//                         )}
//                     </thead>

//                     <tbody className="divide-y divide-[var(--selago)] bg-white">
//                         {table.getRowModel().rows.map(row => (
//                             <tr 
//                                 key={row.id} 
//                                 className={`cursor-pointer transition-colors ${row.getIsSelected() ? 'bg-blue-50' : 'bg-white'} hover:bg-[var(--selago)]/30`}
//                             >
//                                 {row.getVisibleCells().map(cell => (
//                                     <td 
//                                         key={cell.id} 
//                                         data-label={cell.column.columnDef.header} 
//                                         className={`px-5 py-2.5 text-xs whitespace-nowrap leading-relaxed
//                                             ${(cell.getValue() > 5 && cell.column.columnDef.accessorKey === 'notPaid') ? 'text-red-700 font-semibold' : ''}`}
//                                         style={{ minWidth: '120px' }}
//                                     >
//                                         <div className="w-full">
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
//             <div className="flex p-3 border-t flex-wrap bg-[var(--selago)]/50 border border-[var(--selago)] rounded-b-xl gap-2 items-center">
//                 <div className="hidden lg:flex text-[var(--port-gore)] text-sm w-auto p-1 flex-shrink-0">
//                     {`${getTtl('Showing', ln)} ${table.getState().pagination.pageIndex * table.getState().pagination.pageSize +
//                         (table.getFilteredRowModel().rows.length ? 1 : 0)}-${table.getRowModel().rows.length + table.getState().pagination.pageIndex * table.getState().pagination.pageSize}
//                         ${getTtl('of', ln)} ${table.getFilteredRowModel().rows.length}`}
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
import { Fragment, useEffect, useMemo, useState } from "react"
import { TbSortDescending, TbSortAscending } from "react-icons/tb";

import { Paginator } from "../../../components/table/Paginator";
import RowsIndicator from "../../../components/table/RowsIndicator";
import { getTtl } from "../../../utils/languages";
import { Filter } from '../../../components/table/filters/filterFunc'
import FiltersIcon from '../../../components/table/filters/filters';
import ResetFilterTableIcon from '../../../components/table/filters/resetTabe';
import dateBetweenFilterFn from '../../../components/table/filters/date-between-filter';
import '../contracts/style.css';

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
  const [columnFilters, setColumnFilters] = useState([])

  const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 500 })
  const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])

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
      ...(columns || [])
    ]
  }, [columns, quickSumEnabled])

  const table = useReactTable({
    columns: columnsWithSelection,
    data,
    enableRowSelection: quickSumEnabled,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    filterFns: { dateBetweenFilterFn },
    state: { globalFilter, columnVisibility, pagination, columnFilters, rowSelection },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection
  })

  useEffect(() => {
    setFilteredData?.(table.getFilteredRowModel().rows.map(r => r.original))
  }, [globalFilter, columnFilters])

  const resetTable = () => table.resetColumnFilters()

  return (
    <div className="flex flex-col relative">

      {/* HEADER */}
      <Header
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        table={table}
        excellReport={excellReport}
        cb={cb}
        type="accstatement"
        filterIcon={FiltersIcon(ln, filterOn, setFilterOn)}
        resetFilterTable={ResetFilterTableIcon(ln, resetTable, filterOn)}
        quickSumEnabled={quickSumEnabled}
        setQuickSumEnabled={setQuickSumEnabled}
        quickSumColumns={quickSumColumns}
        setQuickSumColumns={setQuickSumColumns}
      />

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto overflow-y-auto border-2 border-gray-300 rounded-xl shadow-[0_10px_24px_rgba(0,0,0,0.18)] bg-gradient-to-br from-gray-50 to-gray-100 md:max-h-[650px]">

        <table className="w-full table-auto border-collapse">

          <thead>
            {table.getHeaderGroups().map(group => (
              <Fragment key={group.id}>
                <tr className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 shadow-lg">
                  {group.headers.map(header => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-xs font-bold uppercase text-white border-r border-blue-500/30 last:border-r-0 whitespace-nowrap"
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
                    {group.headers.map(header => (
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

          <tbody className="bg-white">
            {table.getRowModel().rows.map((row, idx) => (
              <tr
                key={row.id}
                onDoubleClick={() => SelectRow?.(row.original)}
                className={`transition-all hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50
                ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-5 py-3 text-xs whitespace-nowrap">
                    <div className="px-4 py-2.5 bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="block md:hidden space-y-4 mt-3">
        {table.getRowModel().rows.map((row, idx) => (
          <div
            key={row.id}
            className="bg-white border-2 border-gray-300 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden"
          >
            <div className="px-4 py-3 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white flex justify-between items-center">
              <span className="text-sm font-bold">
                #{idx + 1}
              </span>
              {quickSumEnabled && (
                <input
                  type="checkbox"
                  checked={row.getIsSelected()}
                  onChange={row.getToggleSelectedHandler()}
                  className="w-4 h-4 accent-white"
                />
              )}
            </div>

            <div className="p-4 space-y-3">
              {row.getVisibleCells().map(cell => (
                <div key={cell.id}>
                  <div className="text-[10px] font-bold text-blue-700 uppercase mb-1">
                    {cell.column.columnDef.header}
                  </div>
                  <div className="px-3 py-2 bg-white rounded-lg shadow-inner text-xs">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="flex p-4 gap-3 items-center border-2 border-t-0 border-gray-300 rounded-b-xl bg-gradient-to-br from-white via-gray-50 to-white shadow-[0_8px_16px_rgba(0,0,0,0.15)]">
        <div className="hidden lg:flex text-sm text-gray-600">
          {`${getTtl('Showing', ln)} ${pageIndex * pageSize + 1}-${table.getRowModel().rows.length + pageIndex * pageSize} ${getTtl('of', ln)} ${table.getFilteredRowModel().rows.length}`}
        </div>
        <Paginator table={table} />
        <RowsIndicator table={table} />
      </div>

    </div>
  )
}

export default Customtable

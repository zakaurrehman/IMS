
// 'use client'

// import Header from "../../../components/table/header";
// import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
// import { useMemo, useState } from "react"

// import { Paginator } from "../../../components/table/Paginator";
// import RowsIndicator from "../../../components/table/RowsIndicator";
// import '../contracts/style.css';
// import { useContext } from 'react';
// import { SettingsContext } from "../../../contexts/useSettingsContext";
// import { getTtl } from "../../../utils/languages";
// import { Filter } from '../../../components/table/filters/filterFunc'
// import FiltersIcon from '../../../components/table/filters/filters';
// import ResetFilterTableIcon from '../../../components/table/filters/resetTabe';
// import dateBetweenFilterFn from '../../../components/table/filters/date-between-filter';

// const Customtable = ({ data, columns, invisible, excellReport, onCellUpdate }) => {

//     const [globalFilter, setGlobalFilter] = useState('')
//     const [columnVisibility, setColumnVisibility] = useState(invisible)
//     const [filterOn, setFilterOn] = useState(false)

//     const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 500 })
//     const pagination = useMemo(() => ({ pageIndex, pageSize, }), [pageIndex, pageSize])
//     const [columnFilters, setColumnFilters] = useState([]) //Column filter

//     const [quickSumEnabled, setQuickSumEnabled] = useState(false);
//     const [quickSumColumns, setQuickSumColumns] = useState([]);
//     const [rowSelection, setRowSelection] = useState({});
//     const [isEditMode, setIsEditMode] = useState(false)

//     const { ln } = useContext(SettingsContext);

//     const columnsWithSelection = useMemo(() => {
//         if (!quickSumEnabled) return columns;

//         const selectCol = {
//             id: "select",
//             header: ({ table }) => (
//                 <input
//                     type="checkbox"
//                     checked={table.getIsAllPageRowsSelected()}
//                     ref={(el) => {
//                         if (!el) return;
//                         el.indeterminate = table.getIsSomePageRowsSelected();
//                     }}
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
//         meta: {
//             isEditMode,
//             updateData: (rowIndex, columnId, value) => {
//                 if (!isEditMode) return;           // extra safety
//                 onCellUpdate?.({ rowIndex, columnId, value });
//             },
//         },
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
//         onColumnFiltersChange: setColumnFilters, ////Column filter
//         getFilteredRowModel: getFilteredRowModel(),
//         onGlobalFilterChange: setGlobalFilter,
//         onColumnVisibilityChange: setColumnVisibility,
//         getPaginationRowModel: getPaginationRowModel(),
//         onPaginationChange: setPagination,
//     })

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
//                     filterIcon={FiltersIcon(ln, filterOn, setFilterOn)}
//                     resetFilterTable={ResetFilterTableIcon(ln, resetTable, filterOn)}
//                     isEditMode={isEditMode}
//                     setIsEditMode={setIsEditMode}
//                     quickSumEnabled={quickSumEnabled}
//                     setQuickSumEnabled={setQuickSumEnabled}
//                     quickSumColumns={quickSumColumns}
//                     setQuickSumColumns={setQuickSumColumns}
//                 />
//             </div>

//             {/* SCROLL CONTAINER */}
//             <div className="overflow-x-auto overflow-y-auto border-x border-[var(--selago)] md:max-h-[400px] 2xl:max-h-[550px] relative ">
//                 <table className="w-full border-collapse table-auto" style={{ minWidth: '100%' }}>
                    
//                     {/* THEAD - Sticky with proper z-index */}
//                     <thead className="md:sticky md:top-0 md:z-20">
//                         {table.getHeaderGroups().map(hdGroup =>
//                             <tr 
//                                 key={hdGroup.id} 
//                                 className='bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)]'
//                             >
//                                 {hdGroup.headers.map(header => (
//                                     <th 
//                                         key={header.id} 
//                                         className="relative px-5 py-3 text-left text-xs font-semibold text-white uppercase hover:bg-[var(--rock-blue)] hover:text-[var(--bunting)] whitespace-nowrap"
//                                         style={{ minWidth: '120px' }}
//                                     >
//                                         <span className="leading-tight block">{header.column.columnDef.header}</span>
//                                     </th>
//                                 ))}
//                             </tr>
//                         )}

//                         {/* Filter Row - Separate row with better spacing and z-index */}
//                         {filterOn && table.getHeaderGroups().map(hdGroup => (
//                             <tr key={`${hdGroup.id}-filter`} className="bg-white border-b-2 border-[var(--selago)]">
//                                 {hdGroup.headers.map(header => (
//                                     <th 
//                                         key={header.id} 
//                                         className="px-2 py-2.5 text-left bg-white relative"
//                                         style={{ 
//                                             position: 'relative', 
//                                             zIndex: ['description', 'supplier', 'client'].includes(header.column.id) ? 100 : 50 
//                                         }}
//                                     >
//                                         {header.column.getCanFilter() ? (
//                                             <div className="flex items-center justify-start w-full">
//                                                 <div className="w-full min-w-[140px] relative" style={{ zIndex: 'inherit' }}>
//                                                     <Filter 
//                                                         column={header.column} 
//                                                         table={table} 
//                                                         filterOn={filterOn} 
//                                                     />
//                                                 </div>
//                                             </div>
//                                         ) : null}
//                                     </th>
//                                 ))}
//                             </tr>
//                         ))}
//                     </thead>

//                     <tbody className="border-r border-[var(--selago)] bg-white divide-y divide-[var(--selago)]">
//                         {table.getRowModel().rows.map((row, rowIndex) => {
//                             let bottomRow = table.getRowModel().rows[rowIndex]?.original.invoice * 1 !== table.getRowModel().rows[rowIndex + 1]?.original.invoice * 1

//                             return (
//                                 <tr 
//                                     key={row.id} 
//                                     className={`
//                                         ${bottomRow ? 'border-b-2 border-[var(--rock-blue)]' : 'border-b border-[var(--selago)]'}
//                                         hover:bg-[var(--rock-blue)] hover:text-[var(--bunting)] transition-colors
//                                     `}
//                                 >
//                                     {row.getVisibleCells().map(cell => {
//                                         let hideTD = !row.original.span && cell.column?.id === 'num';
//                                         let brdr = cell.column?.id === 'num' && row.original?.span;

//                                         return (
//                                             !hideTD &&
//                                             <td 
//                                                 rowSpan={cell.column?.id === 'num' && row.original?.span ? row.original.span : null}
//                                                 key={cell.id} 
//                                                 data-label={cell.column.columnDef.header}
//                                                 className={`
//                                                     px-5 py-2.5
//                                                     text-xs 
//                                                     text-[var(--port-gore)] 
//                                                     whitespace-nowrap
//                                                     leading-relaxed
//                                                     hover:bg-[var(--rock-blue)] hover:text-[var(--bunting)]  
//                                                     ${brdr ? 'border border-[var(--rock-blue)] bg-[var(--selago)]/30 font-medium' : ''}
//                                                 `}
//                                                 style={{ minWidth: '120px' }}
//                                             >
//                                                 <div className="w-full">
//                                                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                                                 </div>
//                                             </td>
//                                         )
//                                     })}
//                                 </tr>
//                             )
//                         })}
//                     </tbody>
//                 </table>
//             </div>

//             {/* FOOTER */}
//             <div className="flex p-3 border-t border-[var(--selago)] flex-wrap bg-[var(--selago)]/50 rounded-b-xl gap-2 items-center">
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

import { Fragment, useMemo, useState, useContext, useEffect } from "react"
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

const Customtable = ({ data, columns, invisible, excellReport, onCellUpdate }) => {

  const [globalFilter, setGlobalFilter] = useState('')
  const [columnVisibility, setColumnVisibility] = useState(invisible)
  const [filterOn, setFilterOn] = useState(false)

  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 500,
  })

  const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])
  const { ln } = useContext(SettingsContext);

  const [columnFilters, setColumnFilters] = useState([])
  const [quickSumEnabled, setQuickSumEnabled] = useState(false)
  const [quickSumColumns, setQuickSumColumns] = useState([])
  const [rowSelection, setRowSelection] = useState({})
  const [isEditMode, setIsEditMode] = useState(false)

  /* ---------- Selection Column ---------- */
  const columnsWithSelection = useMemo(() => {
    if (!quickSumEnabled) return columns;

    const selectCol = {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          ref={el => el && (el.indeterminate = table.getIsSomePageRowsSelected())}
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

  /* ---------- TABLE ---------- */
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

  return (
    <div className="flex flex-col relative">

      {/* HEADER */}
      <div className="relative  shadow-lg">
        <Header
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          table={table}
          excellReport={excellReport}
          filterIcon={FiltersIcon(ln, filterOn, setFilterOn)}
          resetFilterTable={ResetFilterTableIcon(ln, resetTable, filterOn)}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          quickSumEnabled={quickSumEnabled}
          setQuickSumEnabled={setQuickSumEnabled}
          quickSumColumns={quickSumColumns}
          setQuickSumColumns={setQuickSumColumns}
        />
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block overflow-x-auto overflow-y-auto
        border-2 border-gray-300
        shadow-[0_8px_16px_rgba(0,0,0,0.15),0_4px_8px_rgba(0,0,0,0.1)]
        rounded-lg
        bg-gradient-to-br from-gray-50 to-gray-100
        max-h-[550px]
        relative">

        <table className="w-full border-collapse table-auto" style={{ minWidth: '100%' }}>

          <thead className="sticky top-0 ">
            {table.getHeaderGroups().map(hdGroup => (
              <Fragment key={hdGroup.id}>

                <tr className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800
                  shadow-[0_4px_12px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.2)]">

                  {hdGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-xs text-white uppercase font-bold
                        border-r border-blue-500/30 last:border-r-0
                        hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-700"
                      style={{ minWidth: '140px' }}
                    >
                      {header.column.getCanSort() ? (
                        <div
                          onClick={header.column.getToggleSortingHandler()}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <span>{header.column.columnDef.header}</span>
                          {{
                            asc: <TbSortAscending className="scale-125" />,
                            desc: <TbSortDescending className="scale-125" />
                          }[header.column.getIsSorted()]}
                        </div>
                      ) : header.column.columnDef.header}
                    </th>
                  ))}
                </tr>

                {filterOn && (
                  <tr className="bg-gradient-to-b from-white to-gray-50 shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
                    {hdGroup.headers.map(header => (
                      <th
                        key={header.id}
                        className="px-4 py-3 bg-white/95"
                        style={{
                          zIndex: ['description', 'supplier', 'client'].includes(header.column.id) ? 100 : 50
                        }}
                      >
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

          <tbody className="bg-gradient-to-b from-gray-50 to-white">
            {table.getRowModel().rows.map((row, rowIndex) => {

              const bottomRow =
                table.getRowModel().rows[rowIndex]?.original.invoice * 1 !==
                table.getRowModel().rows[rowIndex + 1]?.original.invoice * 1

              return (
                <tr
                  key={row.id}
                  className={`transition-all
                    ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                    hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50
                    ${bottomRow ? 'border-b-2 border-blue-300' : ''}
                  `}
                >
                  {row.getVisibleCells().map(cell => {

                    const hideTD = !row.original.span && cell.column.id === 'num';
                    const brdr = cell.column.id === 'num' && row.original.span;

                    if (hideTD) return null;

                    return (
                      <td
                        key={cell.id}
                        rowSpan={brdr ? row.original.span : undefined}
                        className={`px-4 py-3 text-xs ${brdr ? 'bg-blue-50 font-semibold' : ''}`}
                        style={{ minWidth: '140px' }}
                      >
                        <div className="bg-white rounded-lg px-4 py-2.5
                          shadow-[0_2px_6px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)]">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>

        </table>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="block md:hidden">
        <div className="space-y-4 p-2 max-h-[600px] overflow-y-auto
          bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">

          {table.getRowModel().rows.map((row, rowIndex) => (
            <div
              key={row.id}
              className="bg-white rounded-xl border-2 border-gray-300
                shadow-[0_4px_12px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.8)]">

              <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-4 py-3">
                <div className="flex justify-between items-center">
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
              </div>

              <div className="p-4 space-y-3">
                {row.getVisibleCells().map(cell => {
                  if (cell.column.id === 'select' || cell.column.id === 'num') return null;
                  return (
                    <div key={cell.id}>
                      <div className="text-xs font-bold text-blue-700 uppercase">
                        {cell.column.columnDef.header}
                      </div>
                      <div className="bg-white px-4 py-3 rounded-lg border
                        shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
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
      <div className="flex p-4 border-2 border-t-0 border-gray-300
        bg-gradient-to-br from-white via-gray-50 to-white
        rounded-b-xl shadow-[0_8px_16px_rgba(0,0,0,0.15)]
        gap-3 items-center">
        <Paginator table={table} />
        <RowsIndicator table={table} />
      </div>

    </div>
  )
}

export default Customtable



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

// import { Fragment, useMemo, useState, useContext, useEffect } from "react"
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

// const Customtable = ({ data, columns, invisible, excellReport, onCellUpdate }) => {

//   const [globalFilter, setGlobalFilter] = useState('')
//   const [columnVisibility, setColumnVisibility] = useState(invisible)
//   const [filterOn, setFilterOn] = useState(false)

//   const [{ pageIndex, pageSize }, setPagination] = useState({
//     pageIndex: 0,
//     pageSize: 500,
//   })

//   const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])
//   const { ln } = useContext(SettingsContext);

//   const [columnFilters, setColumnFilters] = useState([])
//   const [quickSumEnabled, setQuickSumEnabled] = useState(false)
//   const [quickSumColumns, setQuickSumColumns] = useState([])
//   const [rowSelection, setRowSelection] = useState({})
//   const [isEditMode, setIsEditMode] = useState(false)

//   /* ---------- Selection Column ---------- */
//   const columnsWithSelection = useMemo(() => {
//     if (!quickSumEnabled) return columns;

//     const selectCol = {
//       id: "select",
//       header: ({ table }) => (
//         <input
//           type="checkbox"
//           checked={table.getIsAllPageRowsSelected()}
//           ref={el => el && (el.indeterminate = table.getIsSomePageRowsSelected())}
//           onChange={table.getToggleAllPageRowsSelectedHandler()}
//           className="w-4 h-4 cursor-pointer accent-blue-600 rounded shadow-sm"
//         />
//       ),
//       cell: ({ row }) => (
//         <input
//           type="checkbox"
//           checked={row.getIsSelected()}
//           disabled={!row.getCanSelect()}
//           onChange={row.getToggleSelectedHandler()}
//           className="w-4 h-4 cursor-pointer accent-blue-600 rounded shadow-sm"
//         />
//       ),
//       enableSorting: false,
//       enableColumnFilter: false,
//       size: 56,
//     };

//     return [selectCol, ...(columns || [])];
//   }, [columns, quickSumEnabled]);

//   /* ---------- TABLE ---------- */
//   const table = useReactTable({
//     meta: {
//       isEditMode,
//       updateData: (rowIndex, columnId, value) => {
//         if (!isEditMode) return;
//         onCellUpdate?.({ rowIndex, columnId, value });
//       },
//     },
//     columns: columnsWithSelection,
//     data,
//     enableRowSelection: quickSumEnabled,
//     getCoreRowModel: getCoreRowModel(),
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
//     getFilteredRowModel: getFilteredRowModel(),
//     onGlobalFilterChange: setGlobalFilter,
//     onColumnVisibilityChange: setColumnVisibility,
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     onPaginationChange: setPagination,
//   })

//   const resetTable = () => table.resetColumnFilters()
//   useEffect(() => resetTable(), [])

//   return (
//     <div className="flex flex-col relative">

//       {/* HEADER */}
//       <div className="relative  shadow-lg">
//         <Header
//           globalFilter={globalFilter}
//           setGlobalFilter={setGlobalFilter}
//           table={table}
//           excellReport={excellReport}
//           filterIcon={FiltersIcon(ln, filterOn, setFilterOn)}
//           resetFilterTable={ResetFilterTableIcon(ln, resetTable, filterOn)}
//           isEditMode={isEditMode}
//           setIsEditMode={setIsEditMode}
//           quickSumEnabled={quickSumEnabled}
//           setQuickSumEnabled={setQuickSumEnabled}
//           quickSumColumns={quickSumColumns}
//           setQuickSumColumns={setQuickSumColumns}
//         />
//       </div>

//       {/* ================= DESKTOP ================= */}
//       <div className="hidden md:block overflow-x-auto overflow-y-auto
//         border-2 border-gray-300
//         shadow-[0_8px_16px_rgba(0,0,0,0.15),0_4px_8px_rgba(0,0,0,0.1)]
//         rounded-lg
//         bg-gradient-to-br from-gray-50 to-gray-100
//         max-h-[550px]
//         relative">

//         <table className="w-full border-collapse table-auto" style={{ minWidth: '100%' }}>

//           <thead className="sticky top-0 ">
//             {table.getHeaderGroups().map(hdGroup => (
//               <Fragment key={hdGroup.id}>

//                 <tr className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800
//                   shadow-[0_4px_12px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.2)]">

//                   {hdGroup.headers.map(header => (
//                     <th
//                       key={header.id}
//                       className="px-6 py-4 text-xs text-white uppercase font-bold
//                         border-r border-blue-500/30 last:border-r-0
//                         hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-700"
//                       style={{ minWidth: '140px' }}
//                     >
//                       {header.column.getCanSort() ? (
//                         <div
//                           onClick={header.column.getToggleSortingHandler()}
//                           className="flex items-center gap-3 cursor-pointer group"
//                         >
//                           <span>{header.column.columnDef.header}</span>
//                           {{
//                             asc: <TbSortAscending className="scale-125" />,
//                             desc: <TbSortDescending className="scale-125" />
//                           }[header.column.getIsSorted()]}
//                         </div>
//                       ) : header.column.columnDef.header}
//                     </th>
//                   ))}
//                 </tr>

//                 {filterOn && (
//                   <tr className="bg-gradient-to-b from-white to-gray-50 shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
//                     {hdGroup.headers.map(header => (
//                       <th
//                         key={header.id}
//                         className="px-4 py-3 bg-white/95"
//                         style={{
//                           zIndex: ['description', 'supplier', 'client'].includes(header.column.id) ? 100 : 50
//                         }}
//                       >
//                         {header.column.getCanFilter() && (
//                           <Filter column={header.column} table={table} filterOn={filterOn} />
//                         )}
//                       </th>
//                     ))}
//                   </tr>
//                 )}

//               </Fragment>
//             ))}
//           </thead>

//           <tbody className="bg-gradient-to-b from-gray-50 to-white">
//             {table.getRowModel().rows.map((row, rowIndex) => {

//               const bottomRow =
//                 table.getRowModel().rows[rowIndex]?.original.invoice * 1 !==
//                 table.getRowModel().rows[rowIndex + 1]?.original.invoice * 1

//               return (
//                 <tr
//                   key={row.id}
//                   className={`transition-all
//                     ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
//                     hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50
//                     ${bottomRow ? 'border-b-2 border-blue-300' : ''}
//                   `}
//                 >
//                   {row.getVisibleCells().map(cell => {

//                     const hideTD = !row.original.span && cell.column.id === 'num';
//                     const brdr = cell.column.id === 'num' && row.original.span;

//                     if (hideTD) return null;

//                     return (
//                       <td
//                         key={cell.id}
//                         rowSpan={brdr ? row.original.span : undefined}
//                         className={`px-4 py-3 text-xs ${brdr ? 'bg-blue-50 font-semibold' : ''}`}
//                         style={{ minWidth: '140px' }}
//                       >
//                         <div className="bg-white rounded-lg px-4 py-2.5
//                           shadow-[0_2px_6px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)]">
//                           {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                         </div>
//                       </td>
//                     )
//                   })}
//                 </tr>
//               )
//             })}
//           </tbody>

//         </table>
//       </div>

//       {/* ================= MOBILE ================= */}
//       <div className="block md:hidden">
//         <div className="space-y-4 p-2 max-h-[600px] overflow-y-auto
//           bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">

//           {table.getRowModel().rows.map((row, rowIndex) => (
//             <div
//               key={row.id}
//               className="bg-white rounded-xl border-2 border-gray-300
//                 shadow-[0_4px_12px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.8)]">

//               <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-4 py-3">
//                 <div className="flex justify-between items-center">
//                   <span className="text-white font-bold text-sm">
//                     {getTtl('Row', ln)} {rowIndex + 1}
//                   </span>
//                   {quickSumEnabled && (
//                     <input
//                       type="checkbox"
//                       checked={row.getIsSelected()}
//                       onChange={row.getToggleSelectedHandler()}
//                       className="w-5 h-5 accent-blue-600"
//                     />
//                   )}
//                 </div>
//               </div>

//               <div className="p-4 space-y-3">
//                 {row.getVisibleCells().map(cell => {
//                   if (cell.column.id === 'select' || cell.column.id === 'num') return null;
//                   return (
//                     <div key={cell.id}>
//                       <div className="text-xs font-bold text-blue-700 uppercase">
//                         {cell.column.columnDef.header}
//                       </div>
//                       <div className="bg-white px-4 py-3 rounded-lg border
//                         shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
//                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                       </div>
//                     </div>
//                   )
//                 })}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* FOOTER */}
//       <div className="flex p-4 border-2 border-t-0 border-gray-300
//         bg-gradient-to-br from-white via-gray-50 to-white
//         rounded-b-xl shadow-[0_8px_16px_rgba(0,0,0,0.15)]
//         gap-3 items-center">
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
  const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 500 })
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
    state: { globalFilter, columnVisibility, pagination, columnFilters, rowSelection },
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
      <div className="relative shadow-lg">
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
        max-h-[720px]
        relative">

        <table className="w-full border-collapse table-auto" style={{ minWidth: '100%' }}>

          <thead>
            {table.getHeaderGroups().map(hdGroup => (
              <Fragment key={hdGroup.id}>
                <tr className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800
                  shadow-[0_4px_12px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.2)]">
                  {hdGroup.headers.map(header => (
                    <th key={header.id}
                      className="px-6 py-4 text-xs text-white uppercase font-bold
                        border-r border-blue-500/30 last:border-r-0
                        hover:bg-gradient-to-br hover:from-blue-500 hover:via-blue-600 hover:to-blue-700
                        whitespace-nowrap shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]"
                      style={{ minWidth: '140px', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                      {header.column.getCanSort() ? (
                        <div onClick={header.column.getToggleSortingHandler()} className="flex items-center gap-3 cursor-pointer group">
                          <span className="leading-tight drop-shadow-md">{header.column.columnDef.header}</span>
                          <span className="transition-transform group-hover:scale-110 drop-shadow-lg">
                            {{
                              asc: <TbSortAscending className="scale-125 flex-shrink-0" />,
                              desc: <TbSortDescending className="scale-125 flex-shrink-0" />
                            }[header.column.getIsSorted()]}
                          </span>
                        </div>
                      ) : <span className="text-xs font-bold leading-tight block drop-shadow-md">{header.column.columnDef.header}</span>}
                    </th>
                  ))}
                </tr>

                {filterOn && (
                  <tr className="bg-gradient-to-b from-white to-gray-50 shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
                    {hdGroup.headers.map(header => (
                      <th key={header.id} className="px-4 py-3 bg-white/95"
                        style={{ zIndex: ['description', 'supplier', 'client'].includes(header.column.id) ? 100 : 50 }}>
                        {header.column.getCanFilter() && <Filter column={header.column} table={table} filterOn={filterOn} />}
                      </th>
                    ))}
                  </tr>
                )}
              </Fragment>
            ))}
          </thead>

          <tbody className="bg-gradient-to-b from-gray-50 to-white">
            {table.getRowModel().rows.map((row, rowIndex) => (
              <tr key={row.id} className={`cursor-pointer transition-all duration-200
                ${row.getIsSelected() ? 'bg-gradient-to-r from-blue-50 to-blue-100 shadow-[inset_0_2px_8px_rgba(59,130,246,0.15)]' : 'bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50'}
                ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} data-label={cell.column.columnDef.header} className="px-4 py-3 text-xs transition-all duration-150" style={{ minWidth: '140px' }}>
                    <div className={`w-full px-4 py-2.5 bg-white text-gray-800 font-medium rounded-lg
                      shadow-[0_2px_6px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)]
                      hover:shadow-[0_4px_12px_rgba(0,0,0,0.12),0_2px_4px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,1)]
                      hover:bg-gradient-to-br hover:from-white hover:to-blue-50/30
                      transition-all duration-200
                      leading-relaxed min-h-[48px]
                      ${cell.column.id === 'select' ? 'flex items-center justify-center' : ''}`}>
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

      {/* ================= MOBILE ================= */}
      <div className="block md:hidden">
        <div className="space-y-4 p-2 max-h-[600px] overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
          {table.getRowModel().rows.map((row, rowIndex) => (
            <div key={row.id} className={`relative bg-white rounded-xl border-2 border-gray-300
              shadow-[0_4px_12px_rgba(0,0,0,0.1),0_2px_6px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.8)]`}>
              <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-4 py-3
                shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2)]">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold text-sm drop-shadow-md">
                    {getTtl('Row', ln)} {rowIndex + 1}
                  </span>
                  {quickSumEnabled && (
                    <input type="checkbox" checked={row.getIsSelected()} disabled={!row.getCanSelect()} onChange={row.getToggleSelectedHandler()} className="w-5 h-5 cursor-pointer accent-blue-600 rounded shadow-lg" />
                  )}
                </div>
              </div>
              <div className="p-4 space-y-3">
                {row.getVisibleCells().map(cell => {
                  if (cell.column.id === 'select') return null;
                  return (
                    <div key={cell.id} className="flex flex-col space-y-1.5 pb-3">
                      <div className="text-xs font-bold text-blue-700 uppercase tracking-wide drop-shadow-sm">
                        {cell.column.columnDef.header}
                      </div>
                      <div className="bg-gradient-to-br from-white via-gray-50 to-white px-4 py-3 rounded-lg border border-gray-300
                        shadow-[0_2px_6px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.9)]
                        text-sm font-semibold text-gray-900 break-words min-h-[44px] flex items-center">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </div>
                  );
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

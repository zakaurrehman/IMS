// 'use client'

// import Header from "../../../components/table/header";
// import {
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   getExpandedRowModel,
//   useReactTable
// } from "@tanstack/react-table"

// import { Fragment, useEffect, useMemo, useState } from "react"
// import { TbSortDescending, TbSortAscending } from "react-icons/tb";

// import { Paginator } from "../../../components/table/Paginator";
// import RowsIndicator from "../../../components/table/RowsIndicator";
// import { usePathname } from "next/navigation";
// import '../contracts/style.css';
// import { getTtl } from "../../../utils/languages";
// import { Filter } from '../../../components/table/filters/filterFunc'
// import FiltersIcon from '../../../components/table/filters/filters';
// import ResetFilterTableIcon from '../../../components/table/filters/resetTabe';
// import dateBetweenFilterFn from '../../../components/table/filters/date-between-filter';

// const Customtable = ({
//   data,
//   columns,
//   invisible,
//   excellReport,
//   ln,
//   setFilteredData,
//   tableModes,
//   type
// }) => {

//   const [globalFilter, setGlobalFilter] = useState('')
//   const [columnVisibility, setColumnVisibility] = useState(invisible)
//   const [filterOn, setFilterOn] = useState(false)

//   const [{ pageIndex, pageSize }, setPagination] = useState({
//     pageIndex: 0,
//     pageSize: 500
//   })

//   const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])

//   const [expanded, setExpanded] = useState({})
//   const [columnFilters, setColumnFilters] = useState([])

//   const [quickSumEnabled, setQuickSumEnabled] = useState(false)
//   const [quickSumColumns, setQuickSumColumns] = useState([])
//   const [rowSelection, setRowSelection] = useState({})

//   usePathname()

//   const columnsWithSelection = useMemo(() => {
//     if (!quickSumEnabled) return columns

//     return [
//       {
//         id: "select",
//         header: ({ table }) => (
//           <input
//             type="checkbox"
//             checked={table.getIsAllPageRowsSelected()}
//             ref={el => el && (el.indeterminate = table.getIsSomePageRowsSelected())}
//             onChange={table.getToggleAllPageRowsSelectedHandler()}
//             className="qs-checkbox"
//           />
//         ),
//         cell: ({ row }) => (
//           <input
//             type="checkbox"
//             checked={row.getIsSelected()}
//             disabled={!row.getCanSelect()}
//             onChange={row.getToggleSelectedHandler()}
//             className="qs-checkbox"
//           />
//         ),
//         enableSorting: false,
//         enableColumnFilter: false,
//         size: 48,
//       },
//       ...(columns || [])
//     ]
//   }, [columns, quickSumEnabled])

//   const table = useReactTable({
//     data,
//     columns: columnsWithSelection,
//     enableRowSelection: quickSumEnabled,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getExpandedRowModel: getExpandedRowModel(),
//     getSubRows: row => row.subRows,
//     filterFns: { dateBetweenFilterFn },
//     state: {
//       globalFilter,
//       columnVisibility,
//       pagination,
//       expanded,
//       columnFilters,
//       rowSelection,
//     },
//     onGlobalFilterChange: setGlobalFilter,
//     onColumnVisibilityChange: setColumnVisibility,
//     onColumnFiltersChange: setColumnFilters,
//     onPaginationChange: setPagination,
//     onExpandedChange: setExpanded,
//     onRowSelectionChange: setRowSelection,
//   })

//   useEffect(() => {
//     setFilteredData(
//       table.getFilteredRowModel().rows.map(r => r.original)
//     )
//   }, [globalFilter, columnFilters])

//   const resetTable = () => table.resetColumnFilters()

//   return (
//     <div className="flex flex-col relative">

//       {/* ================= HEADER ================= */}
//       <div className="relative ">
//         <Header
//           globalFilter={globalFilter}
//           setGlobalFilter={setGlobalFilter}
//           table={table}
//           excellReport={excellReport}
//           filterIcon={FiltersIcon(ln, filterOn, setFilterOn)}
//           resetFilterTable={ResetFilterTableIcon(ln, resetTable, filterOn)}
//           quickSumEnabled={quickSumEnabled}
//           setQuickSumEnabled={setQuickSumEnabled}
//           quickSumColumns={quickSumColumns}
//           setQuickSumColumns={setQuickSumColumns}
//           tableModes={tableModes}
//           type={type}
//         />
//       </div>

//       {/* ================= DESKTOP TABLE ================= */}
//       <div className="
//         hidden md:block
//         overflow-x-auto overflow-y-auto
//         border-2 border-gray-300
//         rounded-xl
//           bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden
//         shadow-[0_10px_24px_rgba(0,0,0,0.18)]
//         max-h-[360px] md:max-h-[310px] 2xl:max-h-[550px]
//       ">
//         <table className="w-full border-collapse table-auto">

//           <thead className="sticky top-0 ">
//             {table.getHeaderGroups().map(group => (
//               <Fragment key={group.id}>

//                 <tr className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
//                   {group.headers.map(header => (
//                     <th
//                       key={header.id}
//                       className="px-6 py-4 text-xs uppercase font-bold text-white border-r border-blue-500/30 whitespace-nowrap"
//                     >
//                       {header.column.getCanSort() ? (
//                         <div
//                           onClick={header.column.getToggleSortingHandler()}
//                           className="flex items-center gap-2 cursor-pointer"
//                         >
//                           {header.column.columnDef.header}
//                           {{
//                             asc: <TbSortAscending />,
//                             desc: <TbSortDescending />
//                           }[header.column.getIsSorted()]}
//                         </div>
//                       ) : header.column.columnDef.header}
//                     </th>
//                   ))}
//                 </tr>

//                 {filterOn && (
//                   <tr className="bg-white">
//                     {group.headers.map(header => (
//                       <th key={header.id} className="px-3 py-3">
//                         {header.column.getCanFilter() && (
//                           <Filter
//                             column={header.column}
//                             table={table}
//                             filterOn={filterOn}
//                           />
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
//               <Fragment key={row.id}>
//                 <tr
//                   onClick={() => row.getCanExpand() && row.toggleExpanded()}
//                   className={`cursor-pointer transition
//                     ${row.getIsSelected() ? 'bg-blue-100' : 'hover:bg-blue-50'}`}
//                 >
//                   {row.getVisibleCells().map(cell => (
//                     <td key={cell.id} className="px-4 py-3 text-xs">
//                       <div className="bg-white rounded-lg px-4 py-2 shadow">
//                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                       </div>
//                     </td>
//                   ))}
//                 </tr>

//                 {row.getIsExpanded() && row.subRows && row.subRows.length > 0 && (
//                   <tr className="bg-gray-50">
//                     <td colSpan={row.getVisibleCells().length} className="p-0">
//                       <div className="p-4">
//                         <table className="w-full">
//                           <tbody>
//                             {row.subRows.map(sub => (
//                               <tr key={sub.id} className="border-b last:border-b-0">
//                                 {sub.getVisibleCells().map(cell => (
//                                   <td key={cell.id} className="px-4 py-2 text-xs align-top">
//                                     <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
//                                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                                     </div>
//                                   </td>
//                                 ))}
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </Fragment>
//             ))}
//           </tbody>

//         </table>
//       </div>

//       {/* ================= MOBILE CARD VIEW ================= */}
//       <div className="block md:hidden">
//         <div className="space-y-4 p-2 max-h-[600px] overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">

//           {table.getRowModel().rows.map((row, rowIndex) => (
//             <div
//               key={row.id}
//               className={`bg-white rounded-xl border-2 border-gray-300 shadow-md overflow-hidden
//                 ${row.getIsSelected() ? 'ring-2 ring-blue-500 bg-blue-50/30' : ''}`}
//               onClick={() => row.getCanExpand() && row.toggleExpanded()}
//             >

//               {/* Card Header */}
//               <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-4 py-3 flex justify-between">
//                 <span className="text-white font-bold text-sm">
//                   {getTtl('Row', ln)} {rowIndex + 1}
//                 </span>

//                 {quickSumEnabled && (
//                   <input
//                     type="checkbox"
//                     checked={row.getIsSelected()}
//                     onChange={row.getToggleSelectedHandler()}
//                     onClick={e => e.stopPropagation()}
//                     className="w-5 h-5 accent-blue-600"
//                   />
//                 )}
//               </div>

//               {/* Card Content */}
//               <div className="p-4 space-y-3">
//                     {row.getVisibleCells().map(cell => {
//                       if (cell.column.id === 'select') return null
//                       return (
//                         <div key={cell.id}>
//                           <div className="text-xs font-bold text-blue-700 uppercase">
//                             {cell.column.columnDef.header}
//                           </div>
//                           <div className="mt-1 bg-gray-50 px-4 py-3 rounded-lg border shadow text-sm font-semibold">
//                             {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                           </div>
//                         </div>
//                       )
//                     })}

//                     {row.getIsExpanded() && row.subRows && row.subRows.length > 0 && (
//                       <div className="mt-3 border-t pt-3">
//                         {row.subRows.map(sub => (
//                           <div key={sub.id} className="mb-3">
//                             {sub.getVisibleCells().map(cell => (
//                               <div key={cell.id} className="flex justify-between items-center py-1">
//                                 <span className="font-semibold text-[var(--port-gore)] text-xs uppercase pr-2">{cell.column.columnDef.header}</span>
//                                 <span className="text-[0.95rem]">{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
//                               </div>
//                             ))}
//                           </div>
//                         ))}
//                       </div>
//                     )}
//               </div>

//             </div>
//           ))}

//         </div>
//       </div>

//       {/* ================= FOOTER ================= */}
//       <div className="flex p-4 gap-3 items-center border-2 border-t-0 border-gray-300 bg-white rounded-b-xl">
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
  getExpandedRowModel,
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
  excellReport,
  ln,
  setFilteredData,
  tableModes,
  type
}) => {

  const [globalFilter, setGlobalFilter] = useState('')
  const [columnVisibility, setColumnVisibility] = useState(invisible)
  const [filterOn, setFilterOn] = useState(false)

  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 500
  })

  const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])

  const [expanded, setExpanded] = useState({})
  const [columnFilters, setColumnFilters] = useState([])

  const [quickSumEnabled, setQuickSumEnabled] = useState(false)
  const [quickSumColumns, setQuickSumColumns] = useState([])
  const [rowSelection, setRowSelection] = useState({})

  usePathname()

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
            className="qs-checkbox"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
            className="qs-checkbox"
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
    data,
    columns: columnsWithSelection,
    enableRowSelection: quickSumEnabled,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: row => row.subRows,
    filterFns: { dateBetweenFilterFn },
    state: {
      globalFilter,
      columnVisibility,
      pagination,
      expanded,
      columnFilters,
      rowSelection,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onExpandedChange: setExpanded,
    onRowSelectionChange: setRowSelection,
  })

  useEffect(() => {
    setFilteredData(
      table.getFilteredRowModel().rows.map(r => r.original)
    )
  }, [globalFilter, columnFilters])

  const resetTable = () => table.resetColumnFilters()

  return (
    <div className="flex flex-col relative">

      {/* ================= HEADER ================= */}
      <div className="relative ">
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
          tableModes={tableModes}
          type={type}
        />
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="
        hidden md:block
        overflow-x-auto overflow-y-auto
        border-2 border-gray-300
        rounded-xl
        bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden
        shadow-[0_10px_24px_rgba(0,0,0,0.18)]
        max-h-[360px] md:max-h-[310px] 2xl:max-h-[550px]
      ">
        <table className="w-full border-collapse table-auto">

          <thead>
            {table.getHeaderGroups().map(group => (
              <Fragment key={group.id}>

                <tr className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
                  {group.headers.map(header => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-xs uppercase font-bold text-white border-r border-blue-500/30 whitespace-nowrap"
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
                          }[header.column.getIsSorted()] || null}
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
                          <Filter
                            column={header.column}
                            table={table}
                            filterOn={filterOn}
                          />
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
              <Fragment key={row.id}>
                <tr
                  onClick={() => row.getCanExpand() && row.toggleExpanded()}
                  className={`cursor-pointer transition
                    ${row.getIsSelected() ? 'bg-blue-100' : 'hover:bg-blue-50'}`}
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-4 py-3 text-xs">
                      <div className="bg-white rounded-lg px-4 py-2 min-h-[44px] flex items-center justify-start whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext()) || '\u00A0'}
                      </div>
                    </td>
                  ))}
                </tr>

                {row.getIsExpanded() && row.subRows && row.subRows.length > 0 && (
                  <tr className="bg-gray-50">
                    <td colSpan={row.getVisibleCells().length} className="p-0">
                      <div className="p-4">
                        <table className="w-full">
                          <tbody>
                            {row.subRows.map(sub => (
                              <tr key={sub.id} className="border-b last:border-b-0">
                                {sub.getVisibleCells().map(cell => (
                                  <td key={cell.id} className="px-4 py-2 text-xs align-top">
                                    <div className="bg-white rounded-lg px-3 py-2 min-h-[44px] flex items-center justify-start whitespace-nowrap">
                                      {flexRender(cell.column.columnDef.cell, cell.getContext()) || '\u00A0'}
                                    </div>
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>

        </table>
      </div>

      {/* ================= MOBILE CARD VIEW ================= */}
      <div className="block md:hidden">
        <div className="space-y-4 p-2 max-h-[600px] overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">

          {table.getRowModel().rows.map((row, rowIndex) => (
            <div
              key={row.id}
              className={`bg-white rounded-xl border-2 border-gray-300 shadow-md overflow-hidden
                ${row.getIsSelected() ? 'ring-2 ring-blue-500 bg-blue-50/30' : ''}`}
              onClick={() => row.getCanExpand() && row.toggleExpanded()}
            >

              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-4 py-3 flex justify-between">
                <span className="text-white font-bold text-sm">
                  {getTtl('Row', ln)} {rowIndex + 1}
                </span>

                {quickSumEnabled && (
                  <input
                    type="checkbox"
                    checked={row.getIsSelected()}
                    onChange={row.getToggleSelectedHandler()}
                    onClick={e => e.stopPropagation()}
                    className="w-5 h-5 accent-blue-600"
                  />
                )}
              </div>

              {/* Card Content */}
              <div className="p-4 space-y-3">
                    {row.getVisibleCells().map(cell => {
                      if (cell.column.id === 'select') return null
                      return (
                        <div key={cell.id}>
                          <div className="text-xs font-bold text-blue-700 uppercase">
                            {cell.column.columnDef.header}
                          </div>
                          <div className="mt-1 bg-gray-50 px-4 py-3 rounded-lg border shadow min-h-[44px] flex items-center justify-start whitespace-nowrap text-sm font-semibold">
                            {flexRender(cell.column.columnDef.cell, cell.getContext()) || '\u00A0'}
                          </div>
                        </div>
                      )
                    })}

                    {row.getIsExpanded() && row.subRows && row.subRows.length > 0 && (
                      <div className="mt-3 border-t pt-3">
                        {row.subRows.map(sub => (
                          <div key={sub.id} className="mb-3">
                            {sub.getVisibleCells().map(cell => (
                              <div key={cell.id} className="flex justify-between items-center py-1 min-h-[36px]">
                                <span className="font-semibold text-[var(--port-gore)] text-xs uppercase pr-2 whitespace-nowrap">{cell.column.columnDef.header}</span>
                                <span className="text-[0.95rem] truncate">{flexRender(cell.column.columnDef.cell, cell.getContext()) || '\u00A0'}</span>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
              </div>

            </div>
          ))}

        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="flex p-4 gap-3 items-center border-2 border-t-0 border-gray-300 bg-white rounded-b-xl">
        <Paginator table={table} />
        <RowsIndicator table={table} />
      </div>

    </div>
  )
}

export default Customtable

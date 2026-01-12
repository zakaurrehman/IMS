
// 'use client'

// import Header from "../../../components/table/header";
// import {
//     flexRender,
//     getCoreRowModel,
//     getFilteredRowModel,
//     getPaginationRowModel,
//     getSortedRowModel,
//     useReactTable
// } from "@tanstack/react-table";

// import { Fragment, useEffect, useMemo, useState, useContext } from "react";
// import { TbSortDescending, TbSortAscending } from "react-icons/tb";

// import { Paginator } from "../../../components/table/Paginator";
// import RowsIndicator from "../../../components/table/RowsIndicator";
// import { SettingsContext } from "../../../contexts/useSettingsContext";
// import { getTtl } from "../../../utils/languages";
// import { Filter } from "../../../components/table/filters/filterFunc";
// import FiltersIcon from '../../../components/table/filters/filters';
// import ResetFilterTableIcon from '../../../components/table/filters/resetTabe';
// import dateBetweenFilterFn from '../../../components/table/filters/date-between-filter';

// const Customtable = ({
//     data,
//     columns,
//     invisible,
//     SelectRow,
//     excellReport,
//     setFilteredData
// }) => {

//     const { ln } = useContext(SettingsContext)

//     const [globalFilter, setGlobalFilter] = useState('')
//     const [columnVisibility, setColumnVisibility] = useState(invisible)
//     const [filterOn, setFilterOn] = useState(false)
//     const [columnFilters, setColumnFilters] = useState([])
//     const [rowSelection, setRowSelection] = useState({})

//     const [{ pageIndex, pageSize }, setPagination] = useState({
//         pageIndex: 0,
//         pageSize: 500
//     })

//     const pagination = useMemo(
//         () => ({ pageIndex, pageSize }),
//         [pageIndex, pageSize]
//     )

//     const [quickSumEnabled, setQuickSumEnabled] = useState(false)
//     const [quickSumColumns, setQuickSumColumns] = useState([])

//     /* SELECTION COLUMN */
//     const columnsWithSelection = useMemo(() => {
//         if (!quickSumEnabled) return columns
//         return [
//             {
//                 id: "select",
//                 header: ({ table }) => (
//                     <input
//                         type="checkbox"
//                         checked={table.getIsAllPageRowsSelected()}
//                         ref={el => el && (el.indeterminate = table.getIsSomePageRowsSelected())}
//                         onChange={table.getToggleAllPageRowsSelectedHandler()}
//                         className="w-4 h-4 accent-blue-600 cursor-pointer"
//                     />
//                 ),
//                 cell: ({ row }) => (
//                     <input
//                         type="checkbox"
//                         checked={row.getIsSelected()}
//                         disabled={!row.getCanSelect()}
//                         onChange={row.getToggleSelectedHandler()}
//                         className="w-4 h-4 accent-blue-600 cursor-pointer"
//                     />
//                 ),
//                 enableSorting: false,
//                 enableColumnFilter: false,
//                 size: 48
//             },
//             ...(columns || [])
//         ]
//     }, [columns, quickSumEnabled])

//     const table = useReactTable({
//         data,
//         columns: columnsWithSelection,
//         enableRowSelection: quickSumEnabled,
//         getCoreRowModel: getCoreRowModel(),
//         getFilteredRowModel: getFilteredRowModel(),
//         getSortedRowModel: getSortedRowModel(),
//         getPaginationRowModel: getPaginationRowModel(),
//         filterFns: { dateBetweenFilterFn },
//         state: {
//             globalFilter,
//             columnVisibility,
//             pagination,
//             columnFilters,
//             rowSelection
//         },
//         onGlobalFilterChange: setGlobalFilter,
//         onColumnFiltersChange: setColumnFilters,
//         onColumnVisibilityChange: setColumnVisibility,
//         onPaginationChange: setPagination,
//         onRowSelectionChange: setRowSelection
//     })

//     useEffect(() => {
//         table.resetColumnFilters()
//     }, [])

//     useEffect(() => {
//         setFilteredData(
//             table.getFilteredRowModel().rows.map(r => r.original)
//         )
//     }, [columnFilters, globalFilter])

//     const styledCell = (row, cell) => {
//         const field = cell.column?.columnDef?.accessorKey
//         return ['description', 'sType', 'supplier'].includes(field)
//             ? 'bg-[var(--selago)]/50'
//             : 'bg-white'
//     }

//     const resetTable = () => table.resetColumnFilters()

//     return (
//         <div className="flex flex-col relative">

//             {/* HEADER */}
//             <Header
//                 globalFilter={globalFilter}
//                 setGlobalFilter={setGlobalFilter}
//                 table={table}
//                 excellReport={excellReport}
//                 filterIcon={FiltersIcon(ln, filterOn, setFilterOn)}
//                 resetFilterTable={ResetFilterTableIcon(ln, resetTable, filterOn)}
//                 quickSumEnabled={quickSumEnabled}
//                 setQuickSumEnabled={setQuickSumEnabled}
//                 quickSumColumns={quickSumColumns}
//                 setQuickSumColumns={setQuickSumColumns}
//             />

//             {/* DESKTOP TABLE */}
//             <div className="hidden md:block overflow-x-auto overflow-y-auto border-2 border-gray-300 rounded-xl shadow-lg md:max-h-[650px] 2xl:max-h-[850px] bg-white">
//                 <table className="w-full border-collapse table-auto">

//                     <thead className="sticky top-0 ">
//                         {table.getHeaderGroups().map(group => (
//                             <Fragment key={group.id}>

//                                 <tr className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 shadow-md">
//                                     {group.headers.map(header => (
//                                         <th
//                                             key={header.id}
//                                             className="px-5 py-3 text-left text-xs font-bold text-white uppercase border-r border-blue-500/30 last:border-r-0 whitespace-nowrap"
//                                         >
//                                             {header.column.getCanSort() ? (
//                                                 <div
//                                                     onClick={header.column.getToggleSortingHandler()}
//                                                     className="flex items-center gap-2 cursor-pointer select-none"
//                                                 >
//                                                     {header.column.columnDef.header}
//                                                     {{
//                                                         asc: <TbSortAscending />,
//                                                         desc: <TbSortDescending />
//                                                     }[header.column.getIsSorted()] || null}
//                                                 </div>
//                                             ) : header.column.columnDef.header}
//                                         </th>
//                                     ))}
//                                 </tr>

//                                 {filterOn && (
//                                     <tr className="bg-white">
//                                         {group.headers.map(header => (
//                                             <th key={header.id} className="px-3 py-3">
//                                                 {header.column.getCanFilter() && (
//                                                     <Filter column={header.column} table={table} filterOn={filterOn} />
//                                                 )}
//                                             </th>
//                                         ))}
//                                     </tr>
//                                 )}

//                             </Fragment>
//                         ))}
//                     </thead>

//                     <tbody className="bg-white">
//                         {table.getRowModel().rows.map(row => (
//                             <tr
//                                 key={row.id}
//                                 onDoubleClick={() => SelectRow(row.original)}
//                                 className={`transition-all duration-200 cursor-pointer
//                                   hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50
//                                   ${row.getIsSelected() ? 'bg-gradient-to-r from-blue-50 to-blue-100' : ''}`}
//                             >
//                                 {row.getVisibleCells().map(cell => (
//                                     <td
//                                         key={cell.id}
//                                         className={`px-4 py-3 text-xs whitespace-nowrap ${styledCell(row, cell)}`}
//                                     >
//                                         <div className="w-full px-4 py-2.5 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
//                                             {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                                         </div>
//                                     </td>
//                                 ))}
//                             </tr>
//                         ))}
//                     </tbody>

//                 </table>
//             </div>

//             {/* MOBILE CARDS (FROM FIRST FILE – EXACT STYLE) */}
//             <div className="block md:hidden space-y-4 p-2 max-h-[600px] overflow-y-auto">
//                 {table.getRowModel().rows.map((row, idx) => (
//                     <div
//                         key={row.id}
//                         className={`bg-white rounded-xl border-2 border-gray-300 shadow-md p-4
//                           ${row.getIsSelected() ? 'ring-2 ring-blue-500' : ''}`}
//                     >
//                         <div className="flex justify-between items-center mb-3
//                           bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800
//                           text-white px-3 py-2 rounded-lg"
//                         >
//                             <span className="font-bold text-sm">
//                                 {getTtl('Row', ln)} {idx + 1}
//                             </span>

//                             {quickSumEnabled && (
//                                 <input
//                                     type="checkbox"
//                                     checked={row.getIsSelected()}
//                                     onChange={row.getToggleSelectedHandler()}
//                                     className="accent-white"
//                                 />
//                             )}
//                         </div>

//                         <div className="space-y-2">
//                             {row.getVisibleCells().map(cell => {
//                                 if (cell.column.id === 'select') return null
//                                 return (
//                                     <div key={cell.id}>
//                                         <div className="text-xs font-bold text-blue-700">
//                                             {cell.column.columnDef.header}
//                                         </div>
//                                         <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm">
//                                             {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                                         </div>
//                                     </div>
//                                 )
//                             })}
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* FOOTER */}
//             <div className="flex p-4 gap-3 items-center border-2 border-t-0 border-gray-300 rounded-b-xl
//               bg-gradient-to-br from-white via-gray-50 to-white shadow-md"
//             >
//                 <div className="hidden lg:flex text-sm text-gray-600">
//                     {`${getTtl('Showing', ln)} ${pageIndex * pageSize + 1}-${table.getRowModel().rows.length + pageIndex * pageSize} ${getTtl('of', ln)} ${table.getFilteredRowModel().rows.length}`}
//                 </div>
//                 <Paginator table={table} />
//                 <RowsIndicator table={table} />
//             </div>

//         </div>
//     )
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
} from "@tanstack/react-table";

import { Fragment, useEffect, useMemo, useState, useContext } from "react";
import { TbSortDescending, TbSortAscending } from "react-icons/tb";

import { Paginator } from "../../../components/table/Paginator";
import RowsIndicator from "../../../components/table/RowsIndicator";
import { SettingsContext } from "../../../contexts/useSettingsContext";
import { getTtl } from "../../../utils/languages";
import { Filter } from "../../../components/table/filters/filterFunc";
import FiltersIcon from '../../../components/table/filters/filters';
import ResetFilterTableIcon from '../../../components/table/filters/resetTabe';
import dateBetweenFilterFn from '../../../components/table/filters/date-between-filter';

const Customtable = ({
    data,
    columns,
    invisible,
    SelectRow,
    excellReport,
    setFilteredData
}) => {

    const { ln } = useContext(SettingsContext)

    const [globalFilter, setGlobalFilter] = useState('')
    const [columnVisibility, setColumnVisibility] = useState(invisible)
    const [filterOn, setFilterOn] = useState(false)
    const [columnFilters, setColumnFilters] = useState([])
    const [rowSelection, setRowSelection] = useState({})

    const [{ pageIndex, pageSize }, setPagination] = useState({
        pageIndex: 0,
        pageSize: 500
    })

    const pagination = useMemo(
        () => ({ pageIndex, pageSize }),
        [pageIndex, pageSize]
    )

    const [quickSumEnabled, setQuickSumEnabled] = useState(false)
    const [quickSumColumns, setQuickSumColumns] = useState([])

    /* SELECTION COLUMN */
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
                        disabled={!row.getCanSelect()}
                        onChange={row.getToggleSelectedHandler()}
                        className="w-4 h-4 accent-blue-600 cursor-pointer"
                    />
                ),
                enableSorting: false,
                enableColumnFilter: false,
                size: 48
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
        filterFns: { dateBetweenFilterFn },
        state: {
            globalFilter,
            columnVisibility,
            pagination,
            columnFilters,
            rowSelection
        },
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        onRowSelectionChange: setRowSelection
    })

    useEffect(() => {
        table.resetColumnFilters()
    }, [])

    useEffect(() => {
        setFilteredData(
            table.getFilteredRowModel().rows.map(r => r.original)
        )
    }, [columnFilters, globalFilter])

    const styledCell = (row, cell) => {
        const field = cell.column?.columnDef?.accessorKey
        return ['description', 'sType', 'supplier'].includes(field)
            ? 'bg-[var(--selago)]/50'
            : 'bg-white'
    }

    const resetTable = () => table.resetColumnFilters()

    return (
        <div className="flex flex-col relative">

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

            {/* DESKTOP TABLE */}
            <div className="hidden md:block overflow-x-auto overflow-y-auto border-2 border-gray-300 rounded-xl shadow-lg md:max-h-[650px] 2xl:max-h-[850px] bg-white">
                <table className="w-full border-collapse table-auto">
                    <thead>
                        {table.getHeaderGroups().map(group => (
                            <Fragment key={group.id}>
                                <tr className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 shadow-md">
                                    {group.headers.map(header => (
                                        <th
                                            key={header.id}
                                            className="px-5 py-3 text-left text-xs font-bold text-white uppercase border-r border-blue-500/30 last:border-r-0 whitespace-nowrap"
                                        >
                                            {header.column.getCanSort() ? (
                                                <div
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    className="flex items-center gap-2 cursor-pointer select-none"
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
                        {table.getRowModel().rows.map(row => (
                            <tr
                                key={row.id}
                                onDoubleClick={() => SelectRow(row.original)}
                                className={`transition-all duration-200 cursor-pointer
                                  hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50
                                  ${row.getIsSelected() ? 'bg-gradient-to-r from-blue-50 to-blue-100' : ''}`}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <td
                                        key={cell.id}
                                        className={`px-4 py-3 text-xs whitespace-nowrap ${styledCell(row, cell)}`}
                                    >
                                        {/* Adjusted Cell Height */}
                                        <div className="w-full px-4 py-2.5 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 min-h-[44px] flex items-center">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext()) || '\u00A0'}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="block md:hidden space-y-4 p-2 max-h-[600px] overflow-y-auto">
                {table.getRowModel().rows.map((row, idx) => (
                    <div
                        key={row.id}
                        className={`bg-white rounded-xl border-2 border-gray-300 shadow-md p-4
                          ${row.getIsSelected() ? 'ring-2 ring-blue-500' : ''}`}
                    >
                        <div className="flex justify-between items-center mb-3
                          bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800
                          text-white px-3 py-2 rounded-lg"
                        >
                            <span className="font-bold text-sm">
                                {getTtl('Row', ln)} {idx + 1}
                            </span>

                            {quickSumEnabled && (
                                <input
                                    type="checkbox"
                                    checked={row.getIsSelected()}
                                    onChange={row.getToggleSelectedHandler()}
                                    className="accent-white"
                                />
                            )}
                        </div>

                        <div className="space-y-2">
                            {row.getVisibleCells().map(cell => {
                                if (cell.column.id === 'select') return null
                                return (
                                    <div key={cell.id}>
                                        <div className="text-xs font-bold text-blue-700">
                                            {cell.column.columnDef.header}
                                        </div>
                                        <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm min-h-[44px] flex items-center">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext()) || '\u00A0'}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* FOOTER */}
            <div className="flex p-4 gap-3 items-center border-2 border-t-0 border-gray-300 rounded-b-xl
              bg-gradient-to-br from-white via-gray-50 to-white shadow-md"
            >
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

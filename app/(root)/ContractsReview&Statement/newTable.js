

// 'use client'

// import Header from "../../../components/table/header";
// import {
//     flexRender,
//     getCoreRowModel,
//     getFilteredRowModel,
//     getPaginationRowModel,
//     getSortedRowModel,
//     useReactTable
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

// const Customtable = ({ data, columns, invisible, SelectRow, excellReport, cb, setFilteredData, ln }) => {

//     const [globalFilter, setGlobalFilter] = useState('')
//     const [columnVisibility, setColumnVisibility] = useState(invisible)
//     const [filterOn, setFilterOn] = useState(false)

//     const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 500 })
//     const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])

//     const pathName = usePathname()
//     const [columnFilters, setColumnFilters] = useState([])

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
//                     ref={el => { if (el) el.indeterminate = table.getIsSomePageRowsSelected(); }}
//                     onChange={table.getToggleAllPageRowsSelectedHandler()}
//                     className="w-4 h-4 accent-blue-600 cursor-pointer rounded"
//                 />
//             ),
//             cell: ({ row }) => (
//                 <input
//                     type="checkbox"
//                     checked={row.getIsSelected()}
//                     disabled={!row.getCanSelect()}
//                     onChange={row.getToggleSelectedHandler()}
//                     className="w-4 h-4 accent-blue-600 cursor-pointer rounded"
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

//     const resetTable = () => table.resetColumnFilters()

//     return (
//         <div className="flex flex-col relative">

//             {/* HEADER */}
//             <div className="relative z-10 shadow-lg">
//                 <Header
//                     globalFilter={globalFilter}
//                     setGlobalFilter={setGlobalFilter}
//                     table={table}
//                     excellReport={excellReport}
//                     cb={cb}
//                     filterIcon={FiltersIcon(ln, filterOn, setFilterOn)}
//                     resetFilterTable={ResetFilterTableIcon(ln, resetTable, filterOn)}
//                     quickSumEnabled={quickSumEnabled}
//                     setQuickSumEnabled={setQuickSumEnabled}
//                     quickSumColumns={quickSumColumns}
//                     setQuickSumColumns={setQuickSumColumns}
//                 />
//             </div>

//             {/* TABLE CONTAINER */}
//             <div className="
//                 overflow-x-auto overflow-y-auto
//                 border-2 border-gray-300
//                 rounded-xl
//                 shadow-[0_10px_24px_rgba(0,0,0,0.18),0_6px_12px_rgba(0,0,0,0.12)]
//                 bg-gradient-to-br from-gray-50 to-gray-100
//                 max-h-[360px] md:max-h-[310px] 2xl:max-h-[550px]
//                 relative
//             ">
//                 <table className="w-full border-collapse table-auto" style={{ minWidth: '100%' }}>

//                     {/* THEAD */}
//                     <thead className="sticky top-0 z-20">
//                         {table.getHeaderGroups().map(hdGroup => (
//                             <Fragment key={hdGroup.id}>

//                                 {/* HEADER ROW */}
//                                 <tr className="
//                                     bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800
//                                     shadow-[0_4px_14px_rgba(0,0,0,0.25)]
//                                 ">
//                                     {hdGroup.headers.map(header => (
//                                         <th
//                                             key={header.id}
//                                             className="
//                                                 px-6 py-4
//                                                 text-xs font-bold uppercase tracking-wide text-white
//                                                 border-r border-blue-500/30 last:border-r-0
//                                                 whitespace-nowrap
//                                                 hover:bg-blue-700 transition
//                                             "
//                                             style={{ minWidth: '120px' }}
//                                         >
//                                             {header.column.getCanSort() ? (
//                                                 <div
//                                                     onClick={header.column.getToggleSortingHandler()}
//                                                     className="flex items-center gap-2 cursor-pointer select-none"
//                                                 >
//                                                     <span>{header.column.columnDef.header}</span>
//                                                     {{
//                                                         asc: <TbSortAscending className="scale-125" />,
//                                                         desc: <TbSortDescending className="scale-125" />
//                                                     }[header.column.getIsSorted()]}
//                                                 </div>
//                                             ) : (
//                                                 header.column.columnDef.header
//                                             )}
//                                         </th>
//                                     ))}
//                                 </tr>

//                                 {/* FILTER ROW */}
//                                 {filterOn && (
//                                     <tr className="bg-white shadow-[inset_0_-1px_0_rgba(0,0,0,0.1)]">
//                                         {hdGroup.headers.map(header => (
//                                             <th
//                                                 key={header.id}
//                                                 className="px-3 py-3 bg-white"
//                                                 style={{
//                                                     zIndex: ['description', 'supplier', 'type'].includes(header.column.id) ? 100 : 50
//                                                 }}
//                                             >
//                                                 {header.column.getCanFilter() && (
//                                                     <Filter
//                                                         column={header.column}
//                                                         table={table}
//                                                         filterOn={filterOn}
//                                                     />
//                                                 )}
//                                             </th>
//                                         ))}
//                                     </tr>
//                                 )}

//                             </Fragment>
//                         ))}
//                     </thead>

//                     {/* TBODY */}
//                     <tbody className="bg-white divide-y divide-gray-200">
//                         {table.getRowModel().rows.map(row => (
//                             <tr
//                                 key={row.id}
//                                 className={`
//                                     transition-all duration-200 cursor-pointer
//                                     ${row.getIsSelected() ? 'bg-blue-50' : 'bg-white'}
//                                     hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50
//                                 `}
//                                 onDoubleClick={() => SelectRow(row.original)}
//                             >
//                                 {row.getVisibleCells().map(cell => (
//                                     <td
//                                         key={cell.id}
//                                         className="px-5 py-3 text-xs text-gray-700 whitespace-nowrap"
//                                         style={{ minWidth: '120px' }}
//                                     >
//                                         <div className="
//                                             w-full px-4 py-2.5
//                                             bg-white rounded-lg
//                                             shadow-[0_2px_8px_rgba(0,0,0,0.1)]
//                                             hover:shadow-[0_6px_16px_rgba(0,0,0,0.16)]
//                                             transition
//                                         ">
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
//             <div className="
//                 flex p-4 flex-wrap gap-3 items-center
//                 border-2 border-t-0 border-gray-300
//                 rounded-b-xl
//                 bg-gradient-to-br from-white via-gray-50 to-white
//                 shadow-[0_8px_16px_rgba(0,0,0,0.15)]
//             ">
//                 <div className="hidden lg:flex text-sm text-gray-600">
//                     {`${getTtl('Showing', ln)} ${
//                         table.getState().pagination.pageIndex * table.getState().pagination.pageSize +
//                         (table.getFilteredRowModel().rows.length ? 1 : 0)
//                     }-${table.getRowModel().rows.length +
//                         table.getState().pagination.pageIndex * table.getState().pagination.pageSize}
//                     ${getTtl('of', ln)} ${table.getFilteredRowModel().rows.length}`}
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
} from "@tanstack/react-table"

import { Fragment, useEffect, useMemo, useState } from "react"
import { TbSortDescending, TbSortAscending } from "react-icons/tb";

import { Paginator } from "../../../components/table/Paginator";
import RowsIndicator from "../../../components/table/RowsIndicator";
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
    const [columnFilters, setColumnFilters] = useState([])

    const [{ pageIndex, pageSize }, setPagination] = useState({
        pageIndex: 0,
        pageSize: 500
    })

    const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])

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
                    ref={el => { if (el) el.indeterminate = table.getIsSomePageRowsSelected() }}
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
            rowSelection
        },
        onRowSelectionChange: setRowSelection,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onColumnVisibilityChange: setColumnVisibility,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination
    })

    useEffect(() => {
        setFilteredData(table.getFilteredRowModel().rows.map(r => r.original))
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

            {/* TABLE CONTAINER */}
            <div className="
                overflow-x-auto overflow-y-auto
                border-2 border-gray-300
                rounded-xl
                bg-gradient-to-br from-gray-50 to-gray-100
                shadow-[0_10px_24px_rgba(0,0,0,0.18),0_6px_12px_rgba(0,0,0,0.12)]
                max-h-[360px] md:max-h-[360px] 2xl:max-h-[550px]
            ">
                <table className="border-collapse table-fixed min-w-[1200px] w-full">

                    {/* THEAD */}
                    <thead className="sticky top-0 ">
                        {table.getHeaderGroups().map(group => (
                            <Fragment key={group.id}>

                                {/* HEADER ROW */}
                                <tr className="
                                    bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800
                                    shadow-[0_4px_14px_rgba(0,0,0,0.25)]
                                ">
                                    {group.headers.map(header => (
                                        <th
                                            key={header.id}
                                            className="
                                                px-6 py-4
                                                text-xs font-bold uppercase tracking-wide text-white
                                                border-r border-blue-500/30 last:border-r-0
                                                whitespace-nowrap
                                                hover:bg-blue-700 transition
                                            "
                                        >
                                            {header.column.getCanSort() ? (
                                                <div
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    className="flex items-center gap-2 cursor-pointer select-none"
                                                >
                                                    {header.column.columnDef.header}
                                                    {{
                                                        asc: <TbSortAscending className="scale-125" />,
                                                        desc: <TbSortDescending className="scale-125" />
                                                    }[header.column.getIsSorted()]}
                                                </div>
                                            ) : (
                                                header.column.columnDef.header
                                            )}
                                        </th>
                                    ))}
                                </tr>

                                {/* FILTER ROW */}
                                {filterOn && (
                                    <tr className="bg-white shadow-[inset_0_-1px_0_rgba(0,0,0,0.1)]">
                                        {group.headers.map(header => (
                                            <th
                                                key={header.id}
                                                className="px-3 py-3 bg-white"
                                                style={{
                                                    zIndex: ['description', 'supplier', 'type'].includes(header.column.id) ? 100 : 50
                                                }}
                                            >
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

                    {/* TBODY */}
                    <tbody className="bg-white divide-y divide-gray-200">
                        {table.getRowModel().rows.map(row => (
                            <tr
                                key={row.id}
                                onDoubleClick={() => SelectRow(row.original)}
                                className={`
                                    transition-all duration-200 cursor-pointer
                                    ${row.getIsSelected() ? 'bg-blue-50' : 'bg-white'}
                                    hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50
                                `}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <td
                                        key={cell.id}
                                        className="px-5 py-3 text-xs text-gray-700 whitespace-nowrap"
                                    >
                                        <div className="
                                            w-full px-4 py-2.5
                                            bg-white rounded-lg
                                            shadow-[0_2px_8px_rgba(0,0,0,0.1)]
                                            hover:shadow-[0_6px_16px_rgba(0,0,0,0.16)]
                                            transition
                                        ">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {/* FOOTER */}
            <div className="
                flex p-4 flex-wrap gap-3 items-center
                border-2 border-t-0 border-gray-300
                rounded-b-xl
                bg-gradient-to-br from-white via-gray-50 to-white
                shadow-[0_8px_16px_rgba(0,0,0,0.15)]
            ">
                <div className="hidden lg:flex text-sm text-gray-600">
                    {`${getTtl('Showing', ln)} ${
                        table.getState().pagination.pageIndex * table.getState().pagination.pageSize +
                        (table.getFilteredRowModel().rows.length ? 1 : 0)
                    }-${table.getRowModel().rows.length +
                        table.getState().pagination.pageIndex * table.getState().pagination.pageSize}
                    ${getTtl('of', ln)} ${table.getFilteredRowModel().rows.length}`}
                </div>

                <Paginator table={table} />
                <RowsIndicator table={table} />
            </div>

        </div>
    )
}

export default Customtable

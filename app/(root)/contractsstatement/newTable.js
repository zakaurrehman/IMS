

// 'use client'

// import Header from "../../../components/table/header";
// import {
//     flexRender,
//     getCoreRowModel,
//     getFilteredRowModel,
//     getPaginationRowModel,
//     getSortedRowModel,
//     getExpandedRowModel,
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

// const Customtable = ({
//     data,
//     columns,
//     invisible,
//     excellReport,
//     ln,
//     setFilteredData,
//     tableModes,
//     type
// }) => {

//     const [globalFilter, setGlobalFilter] = useState('')
//     const [columnVisibility, setColumnVisibility] = useState(invisible)
//     const [filterOn, setFilterOn] = useState(false)

//     const [{ pageIndex, pageSize }, setPagination] = useState({
//         pageIndex: 0,
//         pageSize: 500
//     })

//     const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])
//     const [expanded, setExpanded] = useState({})
//     const [columnFilters, setColumnFilters] = useState([])

//     const [quickSumEnabled, setQuickSumEnabled] = useState(false)
//     const [quickSumColumns, setQuickSumColumns] = useState([])
//     const [rowSelection, setRowSelection] = useState({})

//     usePathname()

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
//                         className="qs-checkbox"
//                     />
//                 ),
//                 cell: ({ row }) => (
//                     <input
//                         type="checkbox"
//                         checked={row.getIsSelected()}
//                         disabled={!row.getCanSelect()}
//                         onChange={row.getToggleSelectedHandler()}
//                         className="qs-checkbox"
//                     />
//                 ),
//                 enableSorting: false,
//                 enableColumnFilter: false,
//                 size: 48,
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
//         getExpandedRowModel: getExpandedRowModel(),
//         getSubRows: row => row.subRows,
//         filterFns: { dateBetweenFilterFn },
//         state: {
//             globalFilter,
//             columnVisibility,
//             pagination,
//             expanded,
//             columnFilters,
//             rowSelection,
//         },
//         onGlobalFilterChange: setGlobalFilter,
//         onColumnVisibilityChange: setColumnVisibility,
//         onColumnFiltersChange: setColumnFilters,
//         onPaginationChange: setPagination,
//         onExpandedChange: setExpanded,
//         onRowSelectionChange: setRowSelection,
//     })

//     useEffect(() => {
//         setFilteredData(
//             table.getFilteredRowModel().rows.map(r => r.original)
//         )
//     }, [globalFilter, columnFilters])

//     const resetTable = () => table.resetColumnFilters()

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
//                     tableModes={tableModes}
//                     type={type}
//                 />
//             </div>

//             {/* PREMIUM SCROLL CONTAINER */}
//             <div className="
//                 overflow-x-auto overflow-y-auto
//                 border-2 border-gray-300
//                 rounded-xl
//                 bg-gradient-to-br from-gray-50 to-gray-100
//                 shadow-[0_10px_24px_rgba(0,0,0,0.18)]
//                 max-h-[360px] md:max-h-[310px] 2xl:max-h-[550px]
//             ">
//                 <table className="w-full border-collapse table-auto">

//                     {/* THEAD */}
//                     <thead className="md:sticky md:top-0 md:z-20">
//                         {table.getHeaderGroups().map(group => (
//                             <Fragment key={group.id}>

//                                 {/* HEADER ROW */}
//                                 <tr className="
//                                     bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800
//                                     shadow-[0_4px_12px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.25)]
//                                 ">
//                                     {group.headers.map(header => (
//                                         <th
//                                             key={header.id}
//                                             className="
//                                                 px-6 py-4
//                                                 text-xs uppercase font-bold text-white
//                                                 border-r border-blue-500/30 last:border-r-0
//                                                 whitespace-nowrap
//                                             "
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
//                                                     }[header.column.getIsSorted()]}
//                                                 </div>
//                                             ) : header.column.columnDef.header}
//                                         </th>
//                                     ))}
//                                 </tr>

//                                 {/* FILTER ROW */}
//                                 {filterOn && (
//                                     <tr className="
//                                         bg-gradient-to-b from-white to-gray-50
//                                         shadow-[0_4px_8px_rgba(0,0,0,0.12)]
//                                     ">
//                                         {group.headers.map(header => (
//                                             <th
//                                                 key={header.id}
//                                                 className="px-3 py-3 relative"
//                                                 style={{
//                                                     zIndex: ['description', 'supplier', 'client', 'type']
//                                                         .includes(header.column.id) ? 100 : 50
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
//                     <tbody className="bg-white">
//                         {table.getRowModel().rows.map(row => (
//                             <tr
//                                 key={row.id}
//                                 onClick={() => row.getCanExpand() && row.toggleExpanded()}
//                                 className={`
//                                     transition-all duration-200 cursor-pointer
//                                     ${row.getIsSelected()
//                                         ? 'bg-gradient-to-r from-blue-50 to-blue-100'
//                                         : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50'}
//                                 `}
//                             >
//                                 {row.getVisibleCells().map(cell => (
//                                     <td key={cell.id} className="px-4 py-3 text-xs">
//                                         <div className="
//                                             w-full px-4 py-2.5
//                                             bg-white
//                                             rounded-lg
//                                             shadow-[0_2px_6px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)]
//                                             hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]
//                                             transition-all duration-200
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
//                 flex p-4 gap-3 items-center
//                 border-2 border-t-0 border-gray-300
//                 rounded-b-xl
//                 bg-gradient-to-br from-white via-gray-50 to-white
//                 shadow-[0_8px_16px_rgba(0,0,0,0.15)]
//             ">
//                 <div className="hidden lg:flex text-sm text-gray-600">
//                     {`${getTtl('Showing', ln)} ${
//                         pageIndex * pageSize + 1
//                     }-${table.getRowModel().rows.length + pageIndex * pageSize}
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
    getExpandedRowModel,
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

            {/* HEADER */}
            <div className="relative  shadow-lg">
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

            {/* TABLE CONTAINER */}
            <div className="
                overflow-x-auto overflow-y-auto
                border-2 border-gray-300
                rounded-xl
                bg-gradient-to-br from-gray-50 to-gray-100
                shadow-[0_10px_24px_rgba(0,0,0,0.18)]
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
                                    shadow-[0_4px_12px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.25)]
                                ">
                                    {group.headers.map(header => (
                                        <th
                                            key={header.id}
                                            className="
                                                px-6 py-4
                                                text-xs uppercase font-bold text-white
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
                                            ) : header.column.columnDef.header}
                                        </th>
                                    ))}
                                </tr>

                                {/* FILTER ROW */}
                                {filterOn && (
                                    <tr className="
                                        bg-gradient-to-b from-white to-gray-50
                                        shadow-[0_4px_8px_rgba(0,0,0,0.12)]
                                    ">
                                        {group.headers.map(header => (
                                            <th
                                                key={header.id}
                                                className="px-3 py-3 relative"
                                                style={{
                                                    zIndex: ['description', 'supplier', 'client', 'type']
                                                        .includes(header.column.id) ? 100 : 50
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
                                onClick={() => row.getCanExpand() && row.toggleExpanded()}
                                className={`
                                    transition-all duration-200 cursor-pointer
                                    ${row.getIsSelected()
                                        ? 'bg-gradient-to-r from-blue-50 to-blue-100'
                                        : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50'}
                                `}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <td
                                        key={cell.id}
                                        className="px-5 py-3 text-xs text-gray-700 whitespace-nowrap"
                                    >
                                        <div className="
                                            w-full px-4 py-2.5
                                            bg-white
                                            rounded-lg
                                            shadow-[0_2px_6px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)]
                                            hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]
                                            transition-all duration-200
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
                flex p-4 gap-3 items-center
                border-2 border-t-0 border-gray-300
                rounded-b-xl
                bg-gradient-to-br from-white via-gray-50 to-white
                shadow-[0_8px_16px_rgba(0,0,0,0.15)]
            ">
                <div className="hidden lg:flex text-sm text-gray-600">
                    {`${getTtl('Showing', ln)} ${
                        pageIndex * pageSize + (table.getFilteredRowModel().rows.length ? 1 : 0)
                    }-${table.getRowModel().rows.length + pageIndex * pageSize}
                    ${getTtl('of', ln)} ${table.getFilteredRowModel().rows.length}`}
                </div>

                <Paginator table={table} />
                <RowsIndicator table={table} />
            </div>
        </div>
    )
}

export default Customtable

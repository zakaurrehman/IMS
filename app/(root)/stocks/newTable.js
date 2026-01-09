
// 'use client'

// import Header from "../../../components/table/header";
// import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
// import { useEffect, useMemo, useState } from "react"
// import { TbSortDescending } from "react-icons/tb";
// import { TbSortAscending } from "react-icons/tb";

// import { Paginator } from "../../../components/table/Paginator";
// import RowsIndicator from "../../../components/table/RowsIndicator";
// import '../contracts/style.css';
// import { usePathname } from "next/navigation";
// import { getTtl } from "../../../utils/languages";
// import { Filter } from '../../../components/table/filters/filterFunc'
// import FiltersIcon from '../../../components/table/filters/filters';
// import ResetFilterTableIcon from '../../../components/table/filters/resetTabe';
// import dateBetweenFilterFn from '../../../components/table/filters/date-between-filter';


// const Customtable = ({ data, columns, invisible, SelectRow, excellReport, cb, type, ln, setFilteredArray1 }) => {

//     const [globalFilter, setGlobalFilter] = useState('')
//     const [columnVisibility, setColumnVisibility] = useState(invisible)
//     const [filterOn, setFilterOn] = useState(false)

//     const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 500 })
//     const pagination = useMemo(() => ({ pageIndex, pageSize, }), [pageIndex, pageSize])
//     const pathName = usePathname()
//     const [columnFilters, setColumnFilters] = useState([
//         {
//             id: 'sType',
//             value: 'Warehouse', // filter the name column by 'Warehouse' by default
//         },
//     ]) //Column filter

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
//         setFilteredArray1(table.getFilteredRowModel().rows.map(x => x.original))
//     }, [globalFilter, columnFilters])

//     const resetTable = () => {
//         table.resetColumnFilters()
//     }

//     return (
//         <div className="flex flex-col relative">
            
//             {/* HEADER - Higher z-index to stay above everything */}
//             <div className="relative">
//                 <Header 
//                     globalFilter={globalFilter} 
//                     setGlobalFilter={setGlobalFilter}
//                     table={table} 
//                     excellReport={excellReport} 
//                     cb={cb}
//                     type={type}
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
//                                         {header.column.getCanSort() ? (
//                                             <div 
//                                                 onClick={header.column.getToggleSortingHandler()} 
//                                                 className="flex items-center gap-2 cursor-pointer select-none"
//                                             >
//                                                 <span className="leading-tight">{header.column.columnDef.header}</span>
//                                                 {{
//                                                     asc: <TbSortAscending className="text-white scale-125 flex-shrink-0" />,
//                                                     desc: <TbSortDescending className="text-white scale-125 flex-shrink-0" />
//                                                 }[header.column.getIsSorted()]}
//                                             </div>
//                                         ) : (
//                                             <span className="text-xs font-medium text-white leading-tight block">
//                                                 {header.column.columnDef.header}
//                                             </span>
//                                         )}
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
//                                             zIndex: ['description', 'sType', 'supplier'].includes(header.column.id) ? 100 : 50 
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

//                     <tbody className="divide-y divide-[var(--selago)] bg-white">
//                         {table.getRowModel().rows.map(row => (
//                             <tr 
//                                 key={row.id} 
//                                 className={`cursor-pointer transition-colors ${row.getIsSelected() ? 'bg-blue-50' : 'bg-white'} hover:bg-[var(--rock-blue)] hover:text-[var(--bunting)]`}
//                                 onDoubleClick={() => SelectRow(row.original)}
//                             >
//                                 {row.getVisibleCells().map(cell => (
//                                     <td 
//                                         key={cell.id} 
//                                         data-label={cell.column.columnDef.header} 
//                                         className="px-5 py-2.5 text-xs text-[var(--bunting)] whitespace-nowrap leading-relaxed hover:bg-[var(--rock-blue)] hover:text-[var(--bunting)]"
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
//             <div className="flex p-3 border-t border-[var(--selago)] flex-wrap bg-white rounded-b-2xl gap-2 items-center">
//                 <div className="hidden lg:flex text-[var(--regent-gray)] text-sm w-auto p-1 flex-shrink-0">
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
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
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

const Customtable = ({ data, columns, invisible, SelectRow, excellReport, cb, type, ln, setFilteredArray1 }) => {

    const [globalFilter, setGlobalFilter] = useState('')
    const [columnVisibility, setColumnVisibility] = useState(invisible)
    const [filterOn, setFilterOn] = useState(false)
    const [columnFilters, setColumnFilters] = useState([
        { id: 'sType', value: 'Warehouse' }
    ]);

    const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 500 })
    const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])

    const [quickSumEnabled, setQuickSumEnabled] = useState(false);
    const [quickSumColumns, setQuickSumColumns] = useState([]);
    const [rowSelection, setRowSelection] = useState({});

    const columnsWithSelection = useMemo(() => {
        if (!quickSumEnabled) return columns;
        return [
            {
                id: "select",
                header: ({ table }) => (
                    <input
                        type="checkbox"
                        checked={table.getIsAllPageRowsSelected()}
                        ref={el => el && (el.indeterminate = table.getIsSomePageRowsSelected())}
                        onChange={table.getToggleAllPageRowsSelectedHandler()}
                        className="qs-checkbox accent-blue-600 hover:accent-blue-500"
                    />
                ),
                cell: ({ row }) => (
                    <input
                        type="checkbox"
                        checked={row.getIsSelected()}
                        disabled={!row.getCanSelect()}
                        onChange={row.getToggleSelectedHandler()}
                        className="qs-checkbox accent-blue-600 hover:accent-blue-500"
                    />
                ),
                enableSorting: false,
                enableColumnFilter: false,
                size: 48
            },
            ...(columns || [])
        ];
    }, [columns, quickSumEnabled]);

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
    });

    useEffect(() => setFilteredArray1(table.getFilteredRowModel().rows.map(r => r.original)), [globalFilter, columnFilters])

    const styledOutDiv = (row, cell) => {
        const field = cell.column?.columnDef?.accessorKey;
        return ['description','sType','supplier'].includes(field) ? 'bg-[var(--selago)]/50' : 'bg-white';
    }

    const resetTable = () => table.resetColumnFilters();

    return (
        <div className="flex flex-col relative">

            {/* HEADER */}
            <div className="relative z-30">
                <Header
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                    table={table}
                    excellReport={excellReport}
                    cb={cb}
                    type={type}
                    filterIcon={FiltersIcon(ln, filterOn, setFilterOn)}
                    resetFilterTable={ResetFilterTableIcon(ln, resetTable, filterOn)}
                    quickSumEnabled={quickSumEnabled}
                    setQuickSumEnabled={setQuickSumEnabled}
                    quickSumColumns={quickSumColumns}
                    setQuickSumColumns={setQuickSumColumns}
                />
            </div>

            {/* SCROLL CONTAINER */}
            <div className="overflow-x-auto overflow-y-auto border border-gray-300 rounded-2xl shadow-xl md:max-h-[650px] 2xl:max-h-[850px] relative bg-white">
                <table className="w-full border-collapse table-auto">

                    <thead className="md:sticky md:top-0 md:z-20">
                        {table.getHeaderGroups().map(group => (
                            <Fragment key={group.id}>

                                {/* HEADER ROW */}
                                <tr className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 shadow-md">
                                    {group.headers.map(header => (
                                        <th
                                            key={header.id}
                                            className="px-6 py-3 text-left text-sm font-semibold text-white uppercase border-r border-white/20 last:border-r-0 whitespace-nowrap"
                                        >
                                            {header.column.getCanSort() ? (
                                                <div onClick={header.column.getToggleSortingHandler()} className="flex items-center gap-2 cursor-pointer select-none">
                                                    {header.column.columnDef.header}
                                                    {{
                                                        asc: <TbSortAscending className="text-white" />,
                                                        desc: <TbSortDescending className="text-white" />
                                                    }[header.column.getIsSorted()]}
                                                </div>
                                            ) : header.column.columnDef.header}
                                        </th>
                                    ))}
                                </tr>

                                {/* FILTER ROW */}
                                {filterOn && (
                                    <tr className="bg-gray-50">
                                        {group.headers.map(header => (
                                            <th key={header.id + '-filter'} className="px-3 py-2" style={{ zIndex: ['description','sType','supplier'].includes(header.column.id) ? 100 : 50 }}>
                                                {header.column.getCanFilter() && <Filter column={header.column} table={table} filterOn={filterOn} />}
                                            </th>
                                        ))}
                                    </tr>
                                )}
                            </Fragment>
                        ))}
                    </thead>

                    {/* TABLE BODY */}
                    <tbody className="bg-white">
                        {table.getRowModel().rows.map(row => (
                            <tr
                                key={row.id}
                                onDoubleClick={() => SelectRow(row.original)}
                                className={`transition-all duration-200 cursor-pointer hover:bg-gradient-to-r hover:from-gray-100 hover:to-blue-50 ${row.getIsSelected() ? 'bg-gradient-to-r from-blue-50 to-blue-100' : ''}`}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <td
                                        key={cell.id}
                                        data-label={cell.column.columnDef.header}
                                        className={`px-4 py-3 text-sm whitespace-nowrap ${styledOutDiv(row, cell)}`}
                                    >
                                        <div className="w-full px-3 py-2 bg-white rounded-xl shadow-inner hover:shadow-lg transition-all duration-200">
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
            <div className="flex p-4 gap-3 items-center border border-t-0 border-gray-300 rounded-b-2xl bg-gradient-to-r from-white via-gray-50 to-white shadow-md">
                <div className="hidden lg:flex text-sm text-gray-700">
                    {`${getTtl('Showing', ln)} ${pageIndex * pageSize + 1}-${table.getRowModel().rows.length + pageIndex * pageSize} ${getTtl('of', ln)} ${table.getFilteredRowModel().rows.length}`}
                </div>
                <Paginator table={table} />
                <RowsIndicator table={table} />
            </div>
        </div>
    )
}

export default Customtable;

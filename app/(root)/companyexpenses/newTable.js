
// 'use client'

// import Header from "../../../components/table/header";
// import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
// import { Fragment, useEffect, useMemo, useState } from "react"
// import { TbSortDescending } from "react-icons/tb";
// import { TbSortAscending } from "react-icons/tb";

// import { Paginator } from "../../../components/table/Paginator";
// import RowsIndicator from "../../../components/table/RowsIndicator";
// import '../contracts/style.css';
// import { useContext } from 'react';
// import { SettingsContext } from "../../../contexts/useSettingsContext";
// import { usePathname } from "next/navigation";
// import { getTtl } from "../../../utils/languages";
// import FiltersIcon from '../../../components/table/filters/filters';
// import ResetFilterTableIcon from '../../../components/table/filters/resetTabe';
// import dateBetweenFilterFn from '../../../components/table/filters/date-between-filter';
// import { Filter } from "../../../components/table/filters/filterFunc";


// const Customtable = ({ data, columns, SelectRow, excellReport, setFilteredId, invisible }) => {

//     const [globalFilter, setGlobalFilter] = useState('')
//     const [columnVisibility, setColumnVisibility] = useState(invisible)
//     const [filterOn, setFilterOn] = useState(false)

//     const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 500, })
//     const pagination = useMemo(() => ({ pageIndex, pageSize, }), [pageIndex, pageSize])
//     const pathName = usePathname()
//     const { ln } = useContext(SettingsContext);

//     const [columnFilters, setColumnFilters] = useState([]) //Column filter

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

//     const resetTable = () => {
//         table.resetColumnFilters()
//     }

//     useEffect(() => {
//         setFilteredId(table.getFilteredRowModel().rows.map(x => x.original).map(x => x.id))
//     }, [columnFilters, globalFilter])

//     let showAmount = (val, cur) => {
//         return new Intl.NumberFormat('en-US', {
//             style: 'currency',
//             currency: cur,
//             minimumFractionDigits: 2
//         }).format(val)
//     }

//     let amountUSD = showAmount(table.getFilteredRowModel().rows.map(x => x.original).reduce((sum, row) => {
//         const value = row.cur === 'USD' ? row.amount : 0
//         return sum + (value * 1 || 0)
//     }, 0), 'usd')

//     let amountEur = showAmount(table.getFilteredRowModel().rows.map(x => x.original).reduce((sum, row) => {
//         const value = row.cur === 'EUR' ? row.amount : 0
//         return sum + (value * 1 || 0)
//     }, 0), 'eur')

//     return (
//         <div className="flex flex-col relative">
            
//             {/* HEADER - Higher z-index to stay above everything */}
//             <div className="relative">
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

//             {/* SCROLL CONTAINER */}
//             <div className="overflow-x-auto overflow-y-auto border-x border-[var(--selago)] md:max-h-[310px] 2xl:max-h-[550px] relative ">
//                 <table className="w-full border-collapse table-auto" style={{ minWidth: '100%' }}>
                    
//                     {/* THEAD - Sticky with proper z-index */}
//                     <thead className="divide-y divide-[var(--selago)] md:sticky md:top-0 md:z-20">
//                         {table.getHeaderGroups().map(hdGroup =>
//                             <Fragment key={hdGroup.id}>
//                                 {/* Total USD Row */}
//                                 <tr className="cursor-pointer bg-[var(--rock-blue)]/50">
//                                     {hdGroup.headers.map(header => (
//                                         <th 
//                                             key={header.id} 
//                                             className="text-[var(--port-gore)] font-semibold px-5 py-2 text-xs text-left whitespace-nowrap"
//                                             style={{ minWidth: '120px' }}
//                                         >
//                                             {header.id === 'supplier' ? 'Total $:' :
//                                                 header.id === 'cur' ? 'USD' :
//                                                     header.id === 'amount' ? amountUSD : ''}
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
//                                             {header.id === 'supplier' ? 'Total €:' :
//                                                 header.id === 'cur' ? 'EUR' :
//                                                     header.id === 'amount' ? amountEur : ''}
//                                         </th>
//                                     ))}
//                                 </tr>

//                                 {/* Header Row */}
//                                 <tr 
//                                     key={hdGroup.id} 
//                                     className='border-b border-[var(--selago)] bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)]'
//                                 >
//                                     {hdGroup.headers.map(header => (
//                                         <th 
//                                             key={header.id} 
//                                             className="relative px-5 py-3 text-left text-xs font-semibold text-white uppercase whitespace-nowrap"
//                                             style={{ minWidth: '120px' }}
//                                         >
//                                             {header.column.getCanSort() ? (
//                                                 <div 
//                                                     onClick={header.column.getToggleSortingHandler()} 
//                                                     className="flex items-center gap-2 cursor-pointer select-none"
//                                                 >
//                                                     <span className="leading-tight">{header.column.columnDef.header}</span>
//                                                     {{
//                                                         asc: <TbSortAscending className="text-white scale-125 flex-shrink-0" />,
//                                                         desc: <TbSortDescending className="text-white scale-125 flex-shrink-0" />
//                                                     }[header.column.getIsSorted()]}
//                                                 </div>
//                                             ) : (
//                                                 <span className="text-xs font-medium text-white leading-tight block">
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
//                                                     zIndex: ['supplier', 'cur'].includes(header.column.id) ? 100 : 50 
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
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
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

    const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 500 })
    const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])
    const { ln } = useContext(SettingsContext);

    const [quickSumEnabled, setQuickSumEnabled] = useState(false);
    const [quickSumColumns, setQuickSumColumns] = useState([]);
    const [rowSelection, setRowSelection] = useState({});

    const columnsWithSelection = useMemo(() => {
        if (!quickSumEnabled) return columns;
        const selectCol = {
            id: "select",
            header: ({ table }) => (
                <input 
                    type="checkbox" 
                    checked={table.getIsAllPageRowsSelected()}
                    ref={(el) => { if (el) el.indeterminate = table.getIsSomePageRowsSelected(); }}
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
        };
        return [selectCol, ...(columns || [])];
    }, [columns, quickSumEnabled]);

    const table = useReactTable({
        columns: columnsWithSelection, 
        data,
        enableRowSelection: quickSumEnabled,
        getCoreRowModel: getCoreRowModel(),
        filterFns: { dateBetweenFilterFn },
        state: { globalFilter, columnVisibility, pagination, columnFilters, rowSelection },
        onRowSelectionChange: setRowSelection,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onColumnVisibilityChange: setColumnVisibility,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
    });

    const resetTable = () => table.resetColumnFilters()

    useEffect(() => {
        setFilteredId(table.getFilteredRowModel().rows.map(r => r.original.id))
    }, [columnFilters, globalFilter]);

    const formatCurrency = (val, cur) => new Intl.NumberFormat('en-US', { style: 'currency', currency: cur, minimumFractionDigits: 2 }).format(val);

    const totalUSD = formatCurrency(
        table.getFilteredRowModel().rows.reduce((sum, row) => sum + (row.original.cur === 'USD' ? row.original.amount : 0), 0),
        'USD'
    );

    const totalEUR = formatCurrency(
        table.getFilteredRowModel().rows.reduce((sum, row) => sum + (row.original.cur === 'EUR' ? row.original.amount : 0), 0),
        'EUR'
    );

    const styledCell = (row, cell) => {
        const field = cell.column?.columnDef?.accessorKey;
        return ['description','sType','supplier'].includes(field) ? 'bg-[var(--selago)]/50' : 'bg-white';
    }

    return (
        <div className="flex flex-col relative">

            {/* HEADER */}
            <div className="relative z-30">
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
            </div>

            {/* TABLE CONTAINER */}
            <div className="overflow-x-auto overflow-y-auto border-2 border-gray-300 rounded-xl shadow-lg md:max-h-[650px] 2xl:max-h-[850px] bg-white">
                <table className="w-full border-collapse table-auto">

                    {/* TABLE HEAD */}
                    <thead className="md:sticky md:top-0 md:z-20">
                        {table.getHeaderGroups().map(group => (
                            <Fragment key={group.id}>

                                {/* Total USD Row */}
                                <tr className="cursor-pointer bg-[var(--rock-blue)]/50">
                                    {group.headers.map(header => (
                                        <th key={header.id} className="px-5 py-2 text-xs font-semibold text-[var(--port-gore)] text-left whitespace-nowrap">
                                            {header.id === 'supplier' ? 'Total $:' : header.id === 'amount' ? totalUSD : ''}
                                        </th>
                                    ))}
                                </tr>

                                {/* Total EUR Row */}
                                <tr className="cursor-pointer bg-[var(--rock-blue)]/50">
                                    {group.headers.map(header => (
                                        <th key={header.id} className="px-5 py-2 text-xs font-semibold text-[var(--port-gore)] text-left whitespace-nowrap">
                                            {header.id === 'supplier' ? 'Total €:' : header.id === 'amount' ? totalEUR : ''}
                                        </th>
                                    ))}
                                </tr>

                                {/* Header Row */}
                                <tr className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-md">
                                    {group.headers.map(header => (
                                        <th key={header.id} className="px-5 py-3 text-left text-xs font-bold text-white uppercase border-r border-white/30 last:border-r-0 whitespace-nowrap">
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

                                {/* Filter Row */}
                                {filterOn && (
                                    <tr className="bg-white border-b-2 border-[var(--selago)]">
                                        {group.headers.map(header => (
                                            <th key={header.id} className="px-3 py-2 text-left" style={{ zIndex: ['supplier','cur'].includes(header.column.id) ? 100 : 50 }}>
                                                {header.column.getCanFilter() && <Filter column={header.column} table={table} filterOn={filterOn} />}
                                            </th>
                                        ))}
                                    </tr>
                                )}
                            </Fragment>
                        ))}
                    </thead>

                    {/* TABLE BODY */}
                    <tbody className="bg-white divide-y divide-[var(--selago)]">
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} onDoubleClick={() => SelectRow(row.original)}
                                className={`transition-all duration-200 cursor-pointer hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 ${row.getIsSelected() ? 'bg-gradient-to-r from-blue-50 to-blue-100' : ''}`}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} data-label={cell.column.columnDef.header}
                                        className={`px-4 py-3 text-xs whitespace-nowrap ${styledCell(row, cell)}`}>
                                        <div className="w-full px-3 py-2 bg-white rounded-lg shadow-inner hover:shadow-md transition-all duration-200">
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
            <div className="flex p-4 gap-3 items-center border-2 border-t-0 border-gray-300 rounded-b-xl bg-gradient-to-br from-white via-gray-50 to-white shadow-inner">
                <div className="hidden lg:flex text-sm text-gray-600">
                    {`${getTtl('Showing', ln)} ${table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-${table.getRowModel().rows.length + table.getState().pagination.pageIndex * table.getState().pagination.pageSize} ${getTtl('of', ln)} ${table.getFilteredRowModel().rows.length}`}
                </div>
                <Paginator table={table} />
                <RowsIndicator table={table} />
            </div>

        </div>
    )
}

export default Customtable;


// 'use client'

// import Header from "../../../components/table/header";
// import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
// import { useEffect, useMemo, useState } from "react"
// import { TbSortDescending } from "react-icons/tb";
// import { TbSortAscending } from "react-icons/tb";

// import { Paginator } from "../../../components/table/Paginator";
// import RowsIndicator from "../../../components/table/RowsIndicator";
// import '../contracts/style.css';
// import { getTtl } from "../../../utils/languages";
// import { Filter } from '../../../components/table/filters/filterFunc'
// import FiltersIcon from '../../../components/table/filters/filters';
// import ResetFilterTableIcon from '../../../components/table/filters/resetTabe';
// import dateBetweenFilterFn from '../../../components/table/filters/date-between-filter';


// const Customtable = ({ data, columns, invisible, SelectRow, excellReport, ln, setFilteredArray }) => {

//     const [globalFilter, setGlobalFilter] = useState('')
//     const [columnVisibility, setColumnVisibility] = useState(invisible)
//     const [filterOn, setFilterOn] = useState(false)


//     const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 500 })
//     const pagination = useMemo(() => ({ pageIndex, pageSize, }), [pageIndex, pageSize])

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
//                 <input type="checkbox" checked={table.getIsAllPageRowsSelected()}
//                     ref={(el) => { if (el) el.indeterminate = table.getIsSomePageRowsSelected(); }}
//                     onChange={table.getToggleAllPageRowsSelectedHandler()} />
//             ),
//             cell: ({ row }) => (
//                 <input type="checkbox" checked={row.getIsSelected()} disabled={!row.getCanSelect()}
//                     onChange={row.getToggleSelectedHandler()} />
//             ),
//             enableSorting: false, enableColumnFilter: false, size: 40,
//         };
//         return [selectCol, ...(columns || [])];
//     }, [columns, quickSumEnabled]);

//     const table = useReactTable({
//         columns: columnsWithSelection, data,
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
//         getSortedRowModel: getSortedRowModel(),
//         getPaginationRowModel: getPaginationRowModel(),
//         onPaginationChange: setPagination,
//     })

//     useEffect(() => {
//         setFilteredArray(table.getFilteredRowModel().flatRows)
//     }, [globalFilter])

//     useEffect(() => {
    
//         setFilteredArray(table.getFilteredRowModel().rows.map(x => x.original))
//     }, [columnFilters])


//     const styledOutDiv = (obj, x) => {

//         let ob = obj.original;

//         let field = x.column?.columnDef?.accessorKey;

//         let isTrue1 = (field === 'supplier' || field === 'supInvoices' || field === 'expType' ||
//             field === 'invAmount' || field === 'pmntAmount')

//         let isTrue2 = (field === 'InvNum' || field === 'dateInv' || field === 'client' || field === 'totalInvoices' ||
//             field === 'totalPrepayment1' || field === 'prepaidPer')

//         let isTrue3 = field === 'blnc';
//         let isTrue4 = field === 'inDebt';

//         return ((((ob.type === 'exp' && ob.invData.paid === '111') ||
//             (ob.type === 'con' && ob.pmntAmount > 0)) && isTrue1) ||
//             (ob.type === 'con' && ob.totalPmnts > 0 && isTrue2)
//             ?
//             'bg-[var(--selago)]/50' :
//             (ob.type === 'con' && ob.blnc === 0 && ob.invAmount > 0 && isTrue3) ||
//                 (ob.type === 'con' && ob.inDebt === 0 && ob.totalInvoices > 0 && isTrue4) ?
//                 'bg-[var(--selago)]/50' :
//                 'bg-white'
//         )
//     }

//     const resetTable = () => {
//         table.resetColumnFilters()
//     }



//     return (
//         <div className="flex flex-col relative ">
//             <div >
//                 {/* HEADER - Desktop: higher z-index + overflow visible, Mobile: normal */}
//                 <div className="relative md:z-30 md:overflow-visible">
//                     <Header globalFilter={globalFilter} setGlobalFilter={setGlobalFilter}
//                         table={table} excellReport={excellReport}
//                         filterIcon={FiltersIcon(ln, filterOn, setFilterOn)}
//                         resetFilterTable={ResetFilterTableIcon(ln, resetTable, filterOn)}
//                         quickSumEnabled={quickSumEnabled}
//                         setQuickSumEnabled={setQuickSumEnabled}
//                         quickSumColumns={quickSumColumns}
//                         setQuickSumColumns={setQuickSumColumns}
//                     />
//                 </div>

//                 {/* SCROLL CONTAINER - Desktop: lower z-index, Mobile: normal */}
//                 <div className="overflow-x-auto border-x border-[var(--selago)] relative md:z-10">
//                     <table className="w-full">
//                         {/* THEAD - Desktop: lowest z-index, Mobile: normal */}
//                         <thead className="bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)] divide-y divide-[var(--selago)] md:sticky md:top-0 md:z-[5]">
//                             {table.getHeaderGroups().map(hdGroup => (
//                                 <tr key={hdGroup.id} className='border-b border-[var(--selago)]'>
//                                     {hdGroup.headers.map(header => (
//                                         <th
//                                             key={header.id}
//                                             className="relative px-6 py-2 text-left text-sm font-medium text-white uppercase hover:bg-[var(--rock-blue)] hover:text-[var(--bunting)] "
//                                         >
//                                             {header.column.getCanSort() ? (
//                                                 <div
//                                                     onClick={header.column.getToggleSortingHandler()}
//                                                     className="text-xs table-caption cursor-pointer items-center gap-1"
//                                                 >
//                                                     {header.column.columnDef.header}
//                                                     {
//                                                         {
//                                                             asc: <TbSortAscending className="text-white scale-125" />,
//                                                             desc: <TbSortDescending className="text-white scale-125" />,
//                                                         }[header.column.getIsSorted()]
//                                                     }
//                                                 </div>
//                                             ) : (
//                                                 <span className="text-xs table-caption">
//                                                     {header.column.columnDef.header}
//                                                 </span>
//                                             )}
//                                             {header.column.getCanFilter() && (
//                                                 <div>
//                                                     <Filter column={header.column} table={table} filterOn={filterOn} />
//                                                 </div>
//                                             )}
//                                         </th>
//                                     ))}
//                                 </tr>
//                             ))}
//                         </thead>
//                         <tbody className="divide-y divide-[var(--selago)]">
//                             {table.getRowModel().rows.map(row => (
//                                 <tr
//                                     key={row.id}
//                                     className='cursor-pointer hover:bg-[var(--rock-blue)] hover:text-[var(--bunting)] '
//                                     onDoubleClick={() => SelectRow(row.original)}
//                                 >
//                                     {row.getVisibleCells().map(cell => (
//                                         <td
//                                             key={cell.id}
//                                             data-label={cell.column.columnDef.header}
//                                             className={`table_cell text-xs md:py-2 items-center hover:bg-[var(--rock-blue)] hover:text-[var(--bunting)]`}
//                                         >
//                                             {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                                         </td>
//                                     ))}
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//                 <div className="flex p-2 border-t flex-wrap bg-[var(--selago)]/50 border border-[var(--selago)] rounded-b-xl">
//                     <div className="hidden lg:flex text-[var(--port-gore)] text-sm w-48 xl:w-96 p-2 items-center">
//                         {`${getTtl('Showing', ln)} ${table.getState().pagination.pageIndex * table.getState().pagination.pageSize +
//                             (table.getFilteredRowModel().rows.length ? 1 : 0)}-${table.getRowModel().rows.length + table.getState().pagination.pageIndex * table.getState().pagination.pageSize}
//                             ${getTtl('of', ln)} ${table.getFilteredRowModel().rows.length}`}
//                     </div>
//                     <Paginator table={table} />
//                     <RowsIndicator table={table} />
//                 </div>
//             </div>
//         </div>
//     )
// }


// export default Customtable;
'use client'

import Header from "../../../components/table/header";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { useEffect, useMemo, useState } from "react"
import { TbSortDescending } from "react-icons/tb";
import { TbSortAscending } from "react-icons/tb";

import { Paginator } from "../../../components/table/Paginator";
import RowsIndicator from "../../../components/table/RowsIndicator";
import '../contracts/style.css';
import { getTtl } from "../../../utils/languages";
import { Filter } from '../../../components/table/filters/filterFunc'
import FiltersIcon from '../../../components/table/filters/filters';
import ResetFilterTableIcon from '../../../components/table/filters/resetTabe';
import dateBetweenFilterFn from '../../../components/table/filters/date-between-filter';


const Customtable = ({ data, columns, invisible, SelectRow, excellReport, ln, setFilteredArray }) => {

    const [globalFilter, setGlobalFilter] = useState('')
    const [columnVisibility, setColumnVisibility] = useState(invisible)
    const [filterOn, setFilterOn] = useState(false)

    const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 500 })
    const pagination = useMemo(() => ({ pageIndex, pageSize, }), [pageIndex, pageSize])

    const [columnFilters, setColumnFilters] = useState([]) //Column filter

    // Quick Sum state
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
        filterFns: {
            dateBetweenFilterFn,
        },
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

    useEffect(() => {
        setFilteredArray(table.getFilteredRowModel().flatRows)
    }, [globalFilter])

    useEffect(() => {
        setFilteredArray(table.getFilteredRowModel().rows.map(x => x.original))
    }, [columnFilters])

    const styledOutDiv = (obj, x) => {
        let ob = obj.original;
        let field = x.column?.columnDef?.accessorKey;

        let isTrue1 = (field === 'supplier' || field === 'supInvoices' || field === 'expType' ||
            field === 'invAmount' || field === 'pmntAmount')

        let isTrue2 = (field === 'InvNum' || field === 'dateInv' || field === 'client' || field === 'totalInvoices' ||
            field === 'totalPrepayment1' || field === 'prepaidPer')

        let isTrue3 = field === 'blnc';
        let isTrue4 = field === 'inDebt';

        return ((((ob.type === 'exp' && ob.invData.paid === '111') ||
            (ob.type === 'con' && ob.pmntAmount > 0)) && isTrue1) ||
            (ob.type === 'con' && ob.totalPmnts > 0 && isTrue2)
            ?
            'bg-[var(--selago)]/50' :
            (ob.type === 'con' && ob.blnc === 0 && ob.invAmount > 0 && isTrue3) ||
                (ob.type === 'con' && ob.inDebt === 0 && ob.totalInvoices > 0 && isTrue4) ?
                'bg-[var(--selago)]/50' :
                'bg-white'
        )
    }

    const resetTable = () => {
        table.resetColumnFilters()
    }

    return (
        <div className="flex flex-col relative">
            
            {/* HEADER - Higher z-index to stay above everything */}
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
                />
            </div>

            {/* SCROLL CONTAINER */}
            <div className="overflow-x-auto overflow-y-auto border-x border-[var(--selago)] max-h-[700px] md:max-h-[650px] 2xl:max-h-[850px] relative ">
                <table className="w-full border-collapse table-auto" style={{ minWidth: '100%' }}>
                    
                    {/* THEAD - Sticky with proper z-index */}
                    <thead className="bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)] md:sticky md:top-0 md:z-20">
                        {table.getHeaderGroups().map(hdGroup => (
                            <tr key={hdGroup.id} className='border-b border-[var(--selago)]'>
                                {hdGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        className="relative px-5 py-3 text-left text-xs font-semibold text-white uppercase hover:bg-[var(--rock-blue)] hover:text-[var(--bunting)] whitespace-nowrap"
                                        style={{ minWidth: '120px' }}
                                    >
                                        {header.column.getCanSort() ? (
                                            <div
                                                onClick={header.column.getToggleSortingHandler()}
                                                className="flex items-center gap-2 cursor-pointer select-none"
                                            >
                                                <span className="leading-tight">{header.column.columnDef.header}</span>
                                                {{
                                                    asc: <TbSortAscending className="text-white scale-125 flex-shrink-0" />,
                                                    desc: <TbSortDescending className="text-white scale-125 flex-shrink-0" />,
                                                }[header.column.getIsSorted()]}
                                            </div>
                                        ) : (
                                            <span className="text-xs font-medium leading-tight block">
                                                {header.column.columnDef.header}
                                            </span>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}

                        {/* Filter Row - Separate row with better spacing and z-index */}
                        {filterOn && table.getHeaderGroups().map(hdGroup => (
                            <tr key={`${hdGroup.id}-filter`} className="bg-white border-b-2 border-[var(--selago)]">
                                {hdGroup.headers.map(header => (
                                    <th 
                                        key={header.id} 
                                        className="px-2 py-2.5 text-left bg-white relative"
                                        style={{ 
                                            position: 'relative', 
                                            zIndex: ['supplier', 'client', 'expType', 'InvNum'].includes(header.column.id) ? 100 : 50 
                                        }}
                                    >
                                        {header.column.getCanFilter() ? (
                                            <div className="flex items-center justify-start w-full">
                                                <div className="w-full min-w-[140px] relative" style={{ zIndex: 'inherit' }}>
                                                    <Filter 
                                                        column={header.column} 
                                                        table={table} 
                                                        filterOn={filterOn} 
                                                    />
                                                </div>
                                            </div>
                                        ) : null}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody className="divide-y divide-[var(--selago)]">
                        {table.getRowModel().rows.map(row => (
                            <tr
                                key={row.id}
                                className={`cursor-pointer transition-colors ${row.getIsSelected() ? 'bg-blue-50' : ''} hover:bg-[var(--rock-blue)] hover:text-[var(--bunting)]`}
                                onDoubleClick={() => SelectRow(row.original)}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <td
                                        key={cell.id}
                                        data-label={cell.column.columnDef.header}
                                        className={`px-5 py-2.5 text-xs whitespace-nowrap leading-relaxed hover:bg-[var(--rock-blue)] hover:text-[var(--bunting)] ${styledOutDiv(row, cell)}`}
                                        style={{ minWidth: '120px' }}
                                    >
                                        <div className="w-full">
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
            <div className="flex p-3 border-t flex-wrap bg-[var(--selago)]/50 border border-[var(--selago)] rounded-b-xl gap-2 items-center">
                <div className="hidden lg:flex text-[var(--port-gore)] text-sm w-auto p-1 flex-shrink-0">
                    {`${getTtl('Showing', ln)} ${table.getState().pagination.pageIndex * table.getState().pagination.pageSize +
                        (table.getFilteredRowModel().rows.length ? 1 : 0)}-${table.getRowModel().rows.length + table.getState().pagination.pageIndex * table.getState().pagination.pageSize}
                        ${getTtl('of', ln)} ${table.getFilteredRowModel().rows.length}`}
                </div>
                <Paginator table={table} />
                <RowsIndicator table={table} />
            </div>
        </div>
    )
}

export default Customtable;
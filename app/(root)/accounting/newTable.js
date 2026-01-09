
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
    useReactTable
} from "@tanstack/react-table"

import { useMemo, useState, useContext } from "react"
import { Paginator } from "../../../components/table/Paginator";
import RowsIndicator from "../../../components/table/RowsIndicator";
import '../contracts/style.css';

import { SettingsContext } from "../../../contexts/useSettingsContext";
import { getTtl } from "../../../utils/languages";
import { Filter } from '../../../components/table/filters/filterFunc'
import FiltersIcon from '../../../components/table/filters/filters';
import ResetFilterTableIcon from '../../../components/table/filters/resetTabe';
import dateBetweenFilterFn from '../../../components/table/filters/date-between-filter';

const Customtable = ({ data, columns, invisible, excellReport, onCellUpdate }) => {

    const [globalFilter, setGlobalFilter] = useState('')
    const [columnVisibility, setColumnVisibility] = useState(invisible)
    const [filterOn, setFilterOn] = useState(false)

    const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 500 })
    const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])

    const [columnFilters, setColumnFilters] = useState([])
    const [quickSumEnabled, setQuickSumEnabled] = useState(false);
    const [quickSumColumns, setQuickSumColumns] = useState([]);
    const [rowSelection, setRowSelection] = useState({});
    const [isEditMode, setIsEditMode] = useState(false)

    const { ln } = useContext(SettingsContext);

    const columnsWithSelection = useMemo(() => {
        if (!quickSumEnabled) return columns;

        const selectCol = {
            id: "select",
            header: ({ table }) => (
                <input
                    type="checkbox"
                    checked={table.getIsAllPageRowsSelected()}
                    ref={el => {
                        if (!el) return;
                        el.indeterminate = table.getIsSomePageRowsSelected();
                    }}
                    onChange={table.getToggleAllPageRowsSelectedHandler()}
                    className="w-4 h-4 accent-blue-600 cursor-pointer rounded shadow-sm"
                />
            ),
            cell: ({ row }) => (
                <input
                    type="checkbox"
                    checked={row.getIsSelected()}
                    disabled={!row.getCanSelect()}
                    onChange={row.getToggleSelectedHandler()}
                    className="w-4 h-4 accent-blue-600 cursor-pointer rounded shadow-sm"
                />
            ),
            enableSorting: false,
            enableColumnFilter: false,
            size: 48,
        };

        return [selectCol, ...(columns || [])];
    }, [columns, quickSumEnabled]);

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
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
    })

    const resetTable = () => table.resetColumnFilters()

    return (
        <div className="flex flex-col relative">

            {/* HEADER */}
            <div className="relative z-10 shadow-lg">
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

            {/* TABLE CONTAINER */}
            <div className="
                overflow-x-auto overflow-y-auto
                border-2 border-gray-300
                rounded-xl
                shadow-[0_10px_24px_rgba(0,0,0,0.18),0_6px_12px_rgba(0,0,0,0.12)]
                bg-gradient-to-br from-gray-50 to-gray-100
                md:max-h-[400px] 2xl:max-h-[550px]
                relative
            ">
                <table className="w-full border-collapse table-auto" style={{ minWidth: '100%' }}>

                    {/* THEAD */}
                    <thead className="sticky top-0 z-20">
                        {table.getHeaderGroups().map(hdGroup => (
                            <>
                                <tr
                                    key={hdGroup.id}
                                    className="
                                        bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800
                                        shadow-[0_4px_14px_rgba(0,0,0,0.25)]
                                    "
                                >
                                    {hdGroup.headers.map(header => (
                                        <th
                                            key={header.id}
                                            className="
                                                px-6 py-4
                                                text-xs font-bold uppercase tracking-wide
                                                text-white
                                                border-r border-blue-500/30 last:border-r-0
                                                whitespace-nowrap
                                                hover:bg-blue-700
                                                transition-all
                                            "
                                            style={{ minWidth: '120px' }}
                                        >
                                            {header.column.columnDef.header}
                                        </th>
                                    ))}
                                </tr>

                                {/* FILTER ROW */}
                                {filterOn && (
                                    <tr className="bg-white shadow-[inset_0_-1px_0_rgba(0,0,0,0.1)]">
                                        {hdGroup.headers.map(header => (
                                            <th
                                                key={header.id}
                                                className="px-3 py-3 bg-white"
                                                style={{
                                                    zIndex: ['description', 'supplier', 'client'].includes(header.column.id) ? 100 : 50
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
                            </>
                        ))}
                    </thead>

                    {/* TBODY */}
                    <tbody className="bg-white divide-y divide-gray-200">
                        {table.getRowModel().rows.map((row, rowIndex) => {

                            let bottomRow =
                                table.getRowModel().rows[rowIndex]?.original.invoice * 1 !==
                                table.getRowModel().rows[rowIndex + 1]?.original.invoice * 1

                            return (
                                <tr
                                    key={row.id}
                                    className={`
                                        transition-all duration-200
                                        ${bottomRow ? 'border-b-2 border-blue-300' : ''}
                                        hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50
                                    `}
                                >
                                    {row.getVisibleCells().map(cell => {

                                        let hideTD = !row.original.span && cell.column?.id === 'num';
                                        let brdr = cell.column?.id === 'num' && row.original?.span;

                                        return (
                                            !hideTD && (
                                                <td
                                                    key={cell.id}
                                                    rowSpan={cell.column?.id === 'num' && row.original?.span ? row.original.span : null}
                                                    className={`
                                                        px-5 py-3 text-xs text-gray-700 whitespace-nowrap
                                                        ${brdr ? 'bg-blue-50 font-semibold border border-blue-200' : ''}
                                                    `}
                                                    style={{ minWidth: '120px' }}
                                                >
                                                    <div className="
                                                        w-full px-4 py-2.5
                                                        bg-white rounded-lg
                                                        shadow-[0_2px_8px_rgba(0,0,0,0.1)]
                                                        hover:shadow-[0_6px_16px_rgba(0,0,0,0.16)]
                                                        transition-all
                                                    ">
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </div>
                                                </td>
                                            )
                                        )
                                    })}
                                </tr>
                            )
                        })}
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
                    {`${getTtl('Showing', ln)} ${table.getState().pagination.pageIndex * table.getState().pagination.pageSize +
                        (table.getFilteredRowModel().rows.length ? 1 : 0)}-${table.getRowModel().rows.length +
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

'use client'

import Header from "../../../components/table/header";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { useMemo, useState } from "react"
import { TbSortDescending } from "react-icons/tb";
import { TbSortAscending } from "react-icons/tb";

import { Paginator } from "../../../components/table/Paginator";
import RowsIndicator from "../../../components/table/RowsIndicator";
import '../contracts/style.css';
import { useContext } from 'react';
import { SettingsContext } from "../../../contexts/useSettingsContext";
import { usePathname } from "next/navigation";
import { getTtl } from "../../../utils/languages";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../../..//components/ui/tooltip"
import Tltip from "../../../components/tlTip";
import { Filter } from "../../../components/table/filters/filterFunc";
import { MdDeleteOutline } from "react-icons/md";

const Customtable = ({ data, columns }) => {

    const [globalFilter, setGlobalFilter] = useState('')
    const [filterOn, setFilterOn] = useState(false)

    const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 500, })
    const pagination = useMemo(() => ({ pageIndex, pageSize, }), [pageIndex, pageSize])
    const pathName = usePathname()
    const { ln } = useContext(SettingsContext);

    const [columnFilters, setColumnFilters] = useState([])

    const table = useReactTable({
        columns, data,
        getCoreRowModel: getCoreRowModel(),
        filterFns: {},
        state: {
            globalFilter,
            pagination,
            columnFilters
        },
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
    })

    return (
        <div className="flex flex-col relative pt-7">
            <div>
                <div className="overflow-x-auto rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white md:max-h-[310px] 2xl:max-h-[550px]">
                    <table className="table-cell-uniform w-full min-w-[600px] sm:table hidden border-collapse">
                        <thead className="md:sticky md:top-0 md:z-10">
                            {table.getHeaderGroups().map(hdGroup => (
                                <tr key={hdGroup.id} className="bg-[#2563eb]">
                                    {hdGroup.headers.map((header, idx) => {
                                        const isFirst = idx === 0
                                        const isLast = idx === hdGroup.headers.length - 1
                                        return (
                                            <th
                                                key={header.id}
                                                className={`relative px-3 py-3 text-white text-[13px] font-semibold text-center whitespace-nowrap ${header.id === 'material' ? 'min-w-[120px] max-w-[200px] text-left' : 'min-w-[80px] max-w-[90px]'}
                                                ${isFirst ? 'rounded-tl-xl' : ''}
                                                ${isLast ? 'rounded-tr-xl' : ''}
                                                `}
                                                scope="col"
                                            >
                                                {header.column.columnDef.header}
                                            </th>
                                        )
                                    })}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="bg-white">
                            {table.getRowModel().rows.map((row, rowIdx) => (
                                <tr key={row.id} className={`cursor-pointer hover:bg-[#f8fafb] transition-colors duration-100 ${rowIdx !== table.getRowModel().rows.length - 1 ? 'border-b border-gray-100' : ''}`}>
                                    {row.getVisibleCells().map(cell => (
                                        <td
                                            key={cell.id}
                                            data-label={cell.column.columnDef.header}
                                            className={`px-3 py-2.5  text-[13px] text-center ${cell.column.id === 'material' ? 'min-w-[120px] max-w-[200px] text-left' : 'min-w-[80px] max-w-[90px]'} bg-white`}
                                        >
                                            {cell.column.id !== 'del' ? (
                                                <div
                                                    className={`text-gray-700 px-2 py-1.5 bg-[#ECF3FC] rounded-lg shadow-md font-normal items-center text-[13px] flex ${cell.column.id === 'material' ? 'justify-start' : 'justify-center'} w-full min-w-0`}
                                                >
                                                    {cell.column.id !== 'material'
                                                        ? new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(cell.getContext().getValue())
                                                        : cell.getContext().getValue()}
                                                </div>
                                            ) : (
                                                <div className="flex justify-center items-center px-2 py-1.5 bg-[#ECF3FC] rounded-lg shadow-md">
                                                    <button
                                                        className="text-gray-700  cursor-pointer hover:text-gray-400 transition-colors duration-150"
                                                        aria-label="Delete material"
                                                    >
                                                        <MdDeleteOutline className="w-[18px] h-[18px]" />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {/* Mobile stacked table */}
                    <div className="sm:hidden flex flex-col gap-4 p-4">
                        {table.getRowModel().rows.map(row => (
                            <div key={row.id} className="rounded-xl border border-gray-200 bg-white shadow-md overflow-hidden">
                                {row.getVisibleCells().map(cell => (
                                    <div key={cell.id} className="flex justify-between items-center py-3 px-4 border-b last:border-b-0 border-gray-100">
                                        <span className="font-semibold text-sm text-gray-700">{cell.column.columnDef.header}</span>
                                        <span className="text-sm font-normal text-right break-all text-gray-700">
                                            {cell.column.id !== 'del'
                                                ? (cell.column.id !== 'material'
                                                    ? new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(cell.getContext().getValue())
                                                    : cell.getContext().getValue())
                                                : (
                                                    <button
                                                        className="text-gray-300 cursor-pointer hover:text-gray-400 transition-colors"
                                                        aria-label="Delete material"
                                                    >
                                                        <MdDeleteOutline className="w-5 h-5" />
                                                    </button>
                                                )}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Customtable;
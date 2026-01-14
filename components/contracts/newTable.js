'use client'

import Header from "@components/table/header";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { useEffect, useMemo, useState } from "react"
import { TbSortDescending } from "react-icons/tb";
import { TbSortAscending } from "react-icons/tb";

import { Paginator } from "@components/table/Paginator";
import RowsIndicator from "@components/table/RowsIndicator";
import { useContext } from 'react';
import { SettingsContext } from "@contexts/useSettingsContext";
import { usePathname } from "next/navigation";
import { getTtl } from "@utils/languages";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@components/ui/tooltip"
import Tltip from "@components/tlTip";
import FiltersIcon from '../../../components/table/filters/filters';
import ResetFilterTableIcon from '../../../components/table/filters/resetTabe';
import dateBetweenFilterFn from '../../../components/table/filters/date-between-filter';
import { Filter } from "@components/table/filters/filterFunc";


const Customtable = ({ data, columns, invisible, SelectRow, excellReport, setFilteredData }) => {



    const [globalFilter, setGlobalFilter] = useState('')
    const [columnVisibility, setColumnVisibility] = useState(invisible)
    const [filterOn, setFilterOn] = useState(false)


    const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 25, })
    const pagination = useMemo(() => ({ pageIndex, pageSize, }), [pageIndex, pageSize])
    const pathName = usePathname()
    const { ln } = useContext(SettingsContext);

    const [columnFilters, setColumnFilters] = useState([]) //Column filter

    const table = useReactTable({
        columns, data,
        getCoreRowModel: getCoreRowModel(),
        filterFns: {
            dateBetweenFilterFn,
        },
        state: {
            globalFilter,
            columnVisibility,
            pagination,
            columnFilters
        },
        onColumnFiltersChange: setColumnFilters, ////Column filter
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        onColumnVisibilityChange: setColumnVisibility,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
    })

    const resetTable = () => {
        table.resetColumnFilters()
    }

    useEffect(() => {
        resetTable()
    }, [])

    useEffect(() => {
        setFilteredData(table.getFilteredRowModel().rows.map(x => x.original))
    }, [columnFilters, globalFilter])

    return (
        <div className="flex flex-col relative ">
            <div >
                <Header globalFilter={globalFilter} setGlobalFilter={setGlobalFilter}
                    table={table} excellReport={excellReport}
                    filterIcon={FiltersIcon(ln, filterOn, setFilterOn)}
                    resetFilterTable={ResetFilterTableIcon(ln, resetTable, filterOn)}
                />

                <div className="overflow-x-auto md:max-h-[80vh] 2xl:max-h-[80vh]">
                    <table className="w-full border-collapse">
                        <thead className="bg-[var(--endeavour)] md:sticky md:top-0 md:z-10">
                            {table.getHeaderGroups().map(hdGroup =>
                                <tr key={hdGroup.id}>
                                    {hdGroup.headers.map(
                                        header =>
                                            <th key={header.id} className="relative px-1 py-0.5 text-left text-[0.6rem] font-medium text-white uppercase responsiveTextTitle">
                                                {header.column.getCanSort() ?
                                                    <div onClick={header.column.getToggleSortingHandler()} className="cursor-pointer items-center gap-2 responsiveTextTitle font-medium flex">
                                                        {/* <Tltip direction='top' tltpText='sdsd ffgf'> */}
                                                        {header.column.columnDef.header}
                                                        {/* </Tltip> */}

                                                        {
                                                            {
                                                                asc: <TbSortAscending className="text-[var(--selago)] scale-100" />,
                                                                desc: <TbSortDescending className="text-[var(--selago)] scale-100" />
                                                            }[header.column.getIsSorted()]
                                                        }
                                                    </div>
                                                    :
                                                    <span className="responsiveTextTitle font-medium">{header.column.columnDef.header}</span>
                                                }
                                                {header.column.getCanFilter() ? (
                                                    <div>
                                                        <Filter column={header.column} table={table} filterOn={filterOn} />
                                                    </div>
                                                ) : null}
                                            </th>
                                    )}
                                </tr>)}
                        </thead>
                        <tbody className="bg-white">
                            {table.getRowModel().rows.map(row => (
                                <tr key={row.id} className='cursor-pointer transition-all duration-150' onDoubleClick={() => SelectRow(row.original)}>

                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} data-label={cell.column.columnDef.header} className="px-0.5 py-0 text-[0.55rem] leading-none responsiveTextTable text-[var(--port-gore)] hover:bg-[var(--selago)]/12 hover:text-[var(--endeavour)] hover:border-b hover:border-[var(--endeavour)] transition-colors truncate">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between p-1 flex-wrap gap-2">
                    <div className="hidden lg:flex text-[var(--port-gore)] text-[0.6rem] w-48 xl:w-96 p-1 items-center responsiveTextTable">
                        {`${getTtl('Showing', ln)} ${table.getState().pagination.pageIndex * table.getState().pagination.pageSize +
                            (table.getFilteredRowModel().rows.length ? 1 : 0)}-${table.getRowModel().rows.length + table.getState().pagination.pageIndex * table.getState().pagination.pageSize}
                            ${getTtl('of', ln)} ${table.getFilteredRowModel().rows.length}`}
                    </div>
                    <div className="flex items-center gap-2">
                        <Paginator table={table} />
                        <RowsIndicator table={table} />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Customtable;

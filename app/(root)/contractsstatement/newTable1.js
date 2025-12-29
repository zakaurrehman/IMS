'use client'

import Header from "../../../components/table/header";
import {
    flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel,
    useReactTable, getExpandedRowModel, ExpandedState
} from "@tanstack/react-table"
import { useEffect, useMemo, useState } from "react"
import { TbSortDescending } from "react-icons/tb";
import { TbSortAscending } from "react-icons/tb";

import { Paginator } from "../../../components/table/Paginator";
import RowsIndicator from "../../../components/table/RowsIndicator";
import '../contracts/style.css';
import { usePathname } from "next/navigation";
import { getTtl } from "../../../utils/languages";
import { Filter } from '../../../components/table/filters/filterFunc'
import FiltersIcon from '../../../components/table/filters/filters';
import ResetFilterTableIcon from '../../../components/table/filters/resetTabe';
import dateBetweenFilterFn from '../../../components/table/filters/date-between-filter';


const Customtable = ({ data, columns, invisible, excellReport, ln, setFilteredData, tableModes, type }) => {

    const [globalFilter, setGlobalFilter] = useState('')
    const [columnVisibility, setColumnVisibility] = useState(invisible)
    const [filterOn, setFilterOn] = useState(false)

    const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 500 })
    const pagination = useMemo(() => ({ pageIndex, pageSize, }), [pageIndex, pageSize]);

    const pathName = usePathname()
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
        setFilteredData(table.getFilteredRowModel().rows.map(x => x.original))
    }, [columnFilters])


    return (
        <div className="flex flex-col relative ">
            <div >
                <Header globalFilter={globalFilter} setGlobalFilter={setGlobalFilter}
                    table={table} excellReport={excellReport}
                    filterIcon={FiltersIcon(ln, filterOn, setFilterOn)}
                    resetFilterTable={ResetFilterTableIcon(ln, resetTable, filterOn)}
                    tableModes={tableModes} type={type}
                />

                <div className="w-full border-x border-[var(--selago)] max-h-[360px] md:max-h-[310px] 2xl:max-h-[550px]">
                    <table className="w-full min-w-0">
                        <thead className="md:sticky md:top-0 md:z-10">
                            {table.getHeaderGroups().map(hdGroup =>
                                <tr key={hdGroup.id} className="bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)]">
                                    {hdGroup.headers.map(header =>
                                        <th
                                            key={header.id}
                                            className="relative px-6 py-3 text-left text-sm text-white uppercase font-semibold hover:bg-[var(--rock-blue)]"
                                        >
                                            {header.column.getCanSort() ? (
                                                <div
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    className="flex items-center gap-1 whitespace-nowrap cursor-pointer"
                                                >
                                                    {header.column.columnDef.header}
                                                    {{
                                                        asc: <TbSortAscending className="scale-125" />,
                                                        desc: <TbSortDescending className="scale-125" />
                                                    }[header.column.getIsSorted()]}
                                                </div>
                                            ) : (
                                                <span className="text-xs font-medium">
                                                    {header.column.columnDef.header}
                                                </span>
                                            )}
                                            {header.column.getCanFilter() && filterOn && (
                                                <div className="mt-1 sm:mt-0 dropdown-left-space">
                                                    <Filter column={header.column} table={table} filterOn={filterOn} />
                                                </div>
                                            )}
                                        </th>
                                    )}
                                </tr>
                            )}
                        </thead>
                        <tbody className="divide-y divide-[var(--selago)]">
                            {table.getRowModel().rows.map(row => (
                                <tr
                                    key={row.id}
                                    className={`cursor-pointer ${row.getIsSelected ? 'bg-blue-100' : ''} hover:bg-[var(--rock-blue)]`}
                                    onDoubleClick={() => row.getCanExpand && row.toggleExpanded && row.getCanExpand() && row.toggleExpanded()}
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <td
                                            key={cell.id}
                                            data-label={cell.column.columnDef.header}
                                            className={`
                                                table_cell
                                                text-xs sm:text-sm
                                                break-words whitespace-normal
                                                w-full max-w-full
                                                hover:bg-[var(--rock-blue)] hover:text-[var(--bunting)]
                                            `}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="table-toolbar flex p-2.5 border-t border-[var(--selago)] flex-wrap bg-white rounded-b-2xl">
                    <div className="hidden lg:flex text-[var(--regent-gray)] text-sm w-48 xl:w-96 p-2">
                        {`${getTtl('Showing', ln)} ${
                            table.getState().pagination.pageIndex * table.getState().pagination.pageSize +
                            (table.getFilteredRowModel().rows.length ? 1 : 0)
                        }-${table.getRowModel().rows.length + table.getState().pagination.pageIndex * table.getState().pagination.pageSize}
                        ${getTtl('of', ln)} ${table.getFilteredRowModel().rows.length}`}
                    </div>
                    <Paginator table={table} />
                    <RowsIndicator table={table} />
                </div>
            </div>
        </div>
    )
}


export default Customtable;

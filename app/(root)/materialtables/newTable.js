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
//import FiltersIcon from '../../../components/table/filters/filters';
//import ResetFilterTableIcon from '../../../components/table/filters/resetTabe';
//import dateBetweenFilterFn from '../../../components/table/filters/date-between-filter';
import { Filter } from "../../../components/table/filters/filterFunc";
import { MdDeleteOutline } from "react-icons/md";

const Customtable = ({ data, columns, excellReport, addMaterial, editCell, table1, delMaterial, delTable, runPdf }) => {



    const [globalFilter, setGlobalFilter] = useState('')
    const [filterOn, setFilterOn] = useState(false)


    const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 500, })
    const pagination = useMemo(() => ({ pageIndex, pageSize, }), [pageIndex, pageSize])
    const pathName = usePathname()
    const { ln } = useContext(SettingsContext);

    const [columnFilters, setColumnFilters] = useState([]) //Column filter

    const table = useReactTable({
        columns, data,
        getCoreRowModel: getCoreRowModel(),
        filterFns: {
            //   dateBetweenFilterFn,
        },
        state: {
            globalFilter,
            pagination,
            columnFilters
        },
        onColumnFiltersChange: setColumnFilters, ////Column filter
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
    })

    return (
        <div className="flex flex-col relative pt-7">
            <div >
                <Header globalFilter={globalFilter} setGlobalFilter={setGlobalFilter}
                    table={table} excellReport={excellReport}
                    type='mTable'
                    addMaterial={addMaterial}
                    delTable={delTable}
                    table1={table1}
                    runPdf={runPdf}
                // filterIcon={FiltersIcon(ln, filterOn, setFilterOn)}
                //  resetFilterTable={ResetFilterTableIcon(ln, resetTable, filterOn)}
                />

                <div className=" overflow-x-auto border-x border-[var(--selago)] md:max-h-[310px] 2xl:max-h-[550px]">
                    <table className="w-full">
                        <thead className="divide-y divide-[var(--selago)] md:sticky md:top-0 md:z-10 ">
                            {table.getHeaderGroups().map(hdGroup =>
                                <tr key={hdGroup.id} className='border border-b-[var(--endeavour)] bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)]'>
                                    {hdGroup.headers.map(
                                        header =>

                                            <th key={header.id}
                                                className={`relative px-4 py-2 text-sm text-white
                                            ${header.id === 'material' || header.id === 'kgs' ? 'bg-[var(--chathams-blue)] font-bold ' : 'bg-[var(--endeavour)]/80'}
                                            ${header.id === 'material' ? 'w-96' : 'w-3'}
                                            `}>
                                                {header.column.getCanSort() ?
                                                    <div onClick={header.column.getToggleSortingHandler()} className="font-bold cursor-pointer justify-center flex items-center gap-1 text-xs
                                              ">
                                                        {/* <Tltip direction='top' tltpText='sdsd ffgf'> */}
                                                        {header.column.columnDef.header}
                                                        {/* </Tltip> */}

                                                        {
                                                            {
                                                                asc: <TbSortAscending className="text-white scale-125" />,
                                                                desc: <TbSortDescending className="text-white scale-125" />
                                                            }[header.column.getIsSorted()]
                                                        }
                                                    </div>
                                                    :
                                                    <span className="text-xs py-1 font-medium text-white">{header.column.columnDef.header}</span>
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
                        <tbody className="divide-y divide-[var(--selago)]">
                            {table.getRowModel().rows.map(row => (
                                <tr
                                    key={row.id}
                                    className={`cursor-pointer hover:bg-[var(--rock-blue)] hover:text-white transition-colors`}
                                >

                                    {row.getVisibleCells().map(cell => {
                                        let isInFirstTwoColumns = cell.column.id === 'material' || cell.column.id === 'kgs';

                                        let showAmount = (nStr) => {
                                            nStr += '';
                                            var x = nStr.split('.');
                                            var x1 = x[0];
                                            var x2 = x.length > 1 ? '.' + x[1] : '';
                                            var rgx = /(\d+)(\d{3})/;
                                            while (rgx.test(x1)) {
                                                x1 = x1.replace(rgx, '$1,$2');
                                            }

                                            x2 = x2.length > 3 ? x2.substring(0, 3) : x2
                                            return (x1 + x2);
                                        }

                                        return (
                                            <td key={cell.id} data-label={cell.column.columnDef.header}
                                                className={`table_cell text-xs text-center p-1  w-20  ${cell.column.id === 'material' || cell.column.id === 'kgs' ? 'bg-[var(--rock-blue)]/50 font-bold' : ''}`}>
                                                {cell.column.id !== 'del' ?
                                                    <input
                                                        type={cell.column.id === 'material' || cell.column.id === 'kgs' ? 'text' : 'number'}
                                                        className={`text-center indent-0 input h-8 border-none font-bold ${cell.column.id === 'material' || cell.column.id === 'kgs' ? 'bg-[var(--rock-blue)]/50 font-bold' : ''}
                                                    ${cell.column.id === 'material' ? ' w-80' : 'w-20'}`}
                                                        onChange={(e) => editCell(table1, e, cell)}
                                                        value={cell.column.id === 'kgs' ? showAmount(cell.getContext().getValue()) : cell.getContext().getValue()} />

                                                    :
                                                    <div className="flex justify-center">
                                                        <MdDeleteOutline className='text-[var(--endeavour)] cursor-pointer scale-[1.8]' onClick={() => delMaterial(table1, cell)} />
                                                    </div>
                                                }
                                            </td>
                                        )
                                    }
                                    )}
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)] font-bold hover:bg-[var(--rock-blue)] hover:text-white transition-colors">
                            <tr className="border border-y-[var(--endeavour)]">
                                {table.getHeaderGroups()[0].headers.map((header) => {
                                    const columnId = header.id;
                                    const isNumeric = columnId !== "material"; // Adjust based on numeric columns

                                    const totalKGS = table.getFilteredRowModel().rows.reduce((sum, row) => {
                                        const cellValue = row.getValue('kgs');
                                        return sum + (parseFloat(cellValue) || 0);
                                    }, 0);

                                    const total = header.id === 'material' ? table.getFilteredRowModel().rows.length + ' items' :
                                        header.id === 'kgs' ? totalKGS
                                            : (table.getFilteredRowModel().rows.reduce((sum, row) => {
                                                const kgs = parseFloat(row.getValue('kgs')) || 0;
                                                const columnValue = parseFloat(row.getValue(header.id)) || 0; // Get the value of the current column
                                                return sum + (kgs * columnValue); // Multiply it with kgs and sum up
                                            }, 0) / totalKGS).toFixed(2);

                                    return (
                                        <td key={columnId} className={`px-2 py-1 w-20 text-sm text-center text-white ${!isNumeric ? 'font-normal' :
                                            columnId === 'kgs' ? 'bg-[var(--chathams-blue)] font-bold border border-y-[var(--endeavour)]' : 'bg-[var(--endeavour)]/80 '}`}>
                                            {header.id !== 'del' ? isNumeric ? total != 'NaN' ? total.toLocaleString() : '' : total : ''}
                                        </td>
                                    );
                                })}
                            </tr>
                        </tfoot>

                    </table>
                </div>
            </div>
        </div>
    )
}


export default Customtable;

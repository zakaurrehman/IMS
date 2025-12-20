'use client'

import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"

import { TbSortDescending } from "react-icons/tb";
import { TbSortAscending } from "react-icons/tb";
import { usePathname } from 'next/navigation'
import '../../contracts/style.css';
import Tltip from "../../../../components/tlTip";
import { expensesToolTip } from "./funcs";

const Customtable = ({ data, columns, expensesData, settings, title, filt }) => {


    const table1 = useReactTable({
        columns, data,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),

    })

    let showAmount = (x, y) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: y,
            minimumFractionDigits: 2
        }).format(x)
    }

    return (
        <div className="flex flex-col relative w-full max-w-full overflow-x-hidden">
            <div className="border-x border-[var(--selago)] w-full max-w-full overflow-x-hidden">
                <table className="w-full">
                    <thead className="bg-[var(--rock-blue)]/50 divide-y divide-[var(--selago)]">
                        {table1.getHeaderGroups().map(hdGroup => (
                            <tr key={hdGroup.id} className='border-b border-[var(--selako)]'>
                                {hdGroup.headers.map(header => (
                                    <th key={header.id} className="relative px-4 py-3 text-left text-sm font-semibold text-white uppercase">
                                        {header.column.getCanSort() ? (
                                            <div onClick={header.column.getToggleSortingHandler()} className="text-xs flex cursor-pointer items-center gap-1">
                                                {header.column.columnDef.header}
                                                {{
                                                    asc: <TbSortAscending className="text-[var(--endeavour)] scale-125" />,
                                                    desc: <TbSortDescending className="text-[var(--endeavour)] scale-125" />
                                                }[header.column.getIsSorted()]}
                                            </div>
                                        ) : (
                                            <span className="text-xs">{header.column.columnDef.header}</span>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="divide-y divide-[var(--selago)]">
                        {table1.getRowModel().rows.map(row => (
                            <tr key={row.id} className='cursor-pointer hover:bg-[var(--selago)]/30'>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} data-label={cell.column.columnDef.header} className={`table_cell text-xs px-4 md:py-3`}>
                                        <Tltip direction='right' tltpText={expensesToolTip(row, expensesData, settings, filt)}>
                                            <span className="text-[0.8rem] items-center flex outline-none whitespace-normal break-words cursor-default">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </span>
                                        </Tltip>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="border-t border-[var(--selako)] bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)]">
                            <th className="relative px-6 py-2 text-left text-[0.8rem] font-medium text-white uppercase">
                                Total $
                            </th>
                            <th className="relative px-6 py-2 text-left text-[0.8rem] font-medium text-white uppercase">
                                {showAmount(
                                    data.filter(item => item.cur === "us").reduce((sum, item) => sum * 1 + item.total * 1, 0),
                                    'usd'
                                )}
                            </th>
                        </tr>
                        <tr className="border-t border-[var(--selako)] bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)]">
                            <th className="relative px-6 py-2 text-left text-[0.8rem] font-medium text-white uppercase">
                                Total €
                            </th>
                            <th className="relative px-6 py-2 text-left text-[0.8rem] font-medium text-white uppercase">
                                {showAmount(
                                    data.filter(item => item.cur === "eu").reduce((sum, item) => sum + item.total, 0),
                                    'eur'
                                )}
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}

export default Customtable;

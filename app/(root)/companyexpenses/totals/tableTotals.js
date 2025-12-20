'use client'

import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"

import { TbSortDescending } from "react-icons/tb";
import { TbSortAscending } from "react-icons/tb";
import { usePathname } from 'next/navigation'
import '../../contracts/style.css';
import { getTtl } from "../../../../utils/languages";
import Tltip from "../../../../components/tlTip";
import { expensesToolTip } from "./funcs";

const Customtable = ({ data, columns, expensesData, settings, title, filt }) => {

    const pathname = usePathname()

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
            <div className="border border-[var(--selago)] rounded-xl w-full max-w-full overflow-x-hidden">
                <div className="justify-between flex p-2 flex-wrap bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)] rounded-t-xl border-b border-[var(--selago)]">
                    <p className="text-white font-semibold p-2">{title}</p>
                </div>

                <div className="w-full max-w-full overflow-x-hidden">
                    <table className="w-full">
                        <thead className="bg-[var(--rock-blue)]/50 divide-y divide-[var(--selago)]">
                            {table1.getHeaderGroups().map(hdGroup =>
                                <tr key={hdGroup.id} className='border-b border-[var(--selago)]'>
                                    {hdGroup.headers.map(
                                        header =>
                                            <th key={header.id} className="relative px-6 py-2 text-left text-sm font-medium text-[var(--port-gore)] uppercase">
                                                {header.column.getCanSort() ?
                                                    <div onClick={header.column.getToggleSortingHandler()} className="text-xs flex cursor-pointer items-center gap-1">
                                                        {header.column.columnDef.header}
                                                        {
                                                            {
                                                                asc: <TbSortAscending className="text-[var(--endeavour)] scale-125" />,
                                                                desc: <TbSortDescending className="text-[var(--endeavour)] scale-125" />
                                                            }[header.column.getIsSorted()]
                                                        }
                                                    </div>
                                                    :
                                                    <span className="text-xs">{header.column.columnDef.header}</span>
                                                }
                                            </th>
                                    )}
                                </tr>)}
                        </thead>
                        <tbody className="divide-y divide-[var(--selago)]">
                            {table1.getRowModel().rows.map(row => (
                                <tr key={row.id} className='cursor-pointer hover:bg-[var(--selago)]/30'>

                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} data-label={cell.column.columnDef.header} className={`table_cell text-xs md:py-3 items-center `}>
                                            <Tltip direction='right' tltpText={expensesToolTip(row, expensesData, settings, filt)}>
                                                <span className="text-[0.8rem] items-center flex outline-none w-44 truncate cursor-default"
                                                >
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </span>
                                            </Tltip>
                                        </td>
                                    ))}

                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="border-t border-[var(--selago)] bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)]">
                                <th className="relative px-6 py-2 text-left text-[0.8rem] font-medium text-white uppercase                                  ">
                                    Total $
                                </th>
                                <th className="relative px-6 py-2 text-right text-[0.8rem] font-medium text-white uppercase pr-8 break-words min-w-0 w-full overflow-x-auto">
                                    <div className="inline-block text-right break-words min-w-0 w-full">
                                        {showAmount(data
                                            .filter(item => item.cur === "us")
                                            .reduce((sum, item) => sum + item.amount, 0), 'usd')}
                                    </div>
                                </th>
                            </tr>
                            <tr className="border-t border-[var(--selago)] bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)]">
                                <th className="relative px-6 py-2 text-left text-[0.8rem] font-medium text-white uppercase">
                                    Total €
                                </th>
                                <th className="relative px-6 py-2 text-right text-[0.8rem] font-medium text-white uppercase pr-8 break-words min-w-0 w-full overflow-x-auto">
                                    <div className="inline-block text-right break-words min-w-0 w-full">
                                        {showAmount(data
                                            .filter(item => item.cur === "eu")
                                            .reduce((sum, item) => sum + item.amount, 0), 'eur')}
                                    </div>
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div >
    )
}


export default Customtable;

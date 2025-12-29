'use client'

import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"

import { TbSortDescending } from "react-icons/tb";
import { TbSortAscending } from "react-icons/tb";
import { usePathname } from 'next/navigation';
import '../../contracts/style.css';
import { getTtl } from "@utils/languages";
import Tltip from "@components/tlTip";
import { detailsToolTip } from "./tablesFuncs";



const Customtable = ({ data, columns, ln, ttl, settings, dataTable, rmrk }) => {

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

    let showAmount1 = (x,) => {
        return new Intl.NumberFormat('en-US', {
            //     style: 'currency',
            //     currency: y,
            minimumFractionDigits: 3
        }).format(x)
    }
    return (
        <div className="flex flex-col relative w-full">
            <div className="overflow-x-auto border-x border-[var(--selago)]">
                <table className="w-full">
                    <thead className="bg-[var(--rock-blue)]/50 divide-y divide-[var(--selago)]">
                        {table1.getHeaderGroups().map(hdGroup => (
                            <tr key={hdGroup.id} className='border-b border-[var(--selako)]'>
                                {hdGroup.headers.map(header => (
                                    <th key={header.id} className="relative px-4 py-3 text-left text-sm font-semibold text-white uppercase">
                                        {header.column.getCanSort() ? (
                                            <div onClick={header.column.getToggleSortingHandler()} className="text-[10px] md:text-xs flex cursor-pointer items-center gap-1">
                                                {header.column.columnDef.header}
                                                {{
                                                    asc: <TbSortAscending className="text-[var(--endeavour)] scale-110 md:scale-125" />,
                                                    desc: <TbSortDescending className="text-[var(--endeavour)] scale-110 md:scale-125" />
                                                }[header.column.getIsSorted()]}
                                            </div>
                                        ) : (
                                            <span className="text-[10px] md:text-xs">{header.column.columnDef.header}</span>
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
                                        <Tltip direction='right' tltpText={detailsToolTip(row, data, settings, dataTable, rmrk)}>
                                            <span>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </span>
                                        </Tltip>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="border-t border-[var(--selako)] bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)] z-[50] sticky bottom-0" style={{position:'sticky', zIndex:50, background:'#1751a1', marginBottom:'80px'}}>
                            <td colSpan={columns.length} className="px-2 py-2 md:px-8 md:py-3 !pb-6">
                                <div className="grid grid-cols-4 gap-2 md:gap-4 min-w-0 w-full" style={{minWidth:'320px'}}>
                                    <span className="text-[0.8rem] md:text-[1rem] font-bold text-white uppercase break-words min-w-[60px]">Total $</span>
                                    <span className="text-[0.8rem] md:text-[1rem] font-bold text-white uppercase break-words min-w-[30px]"></span>
                                    <span className="text-[0.8rem] md:text-[1rem] font-bold text-white uppercase break-words min-w-[80px] text-right block">
                                        {showAmount1(data
                                            .filter(item => item.cur === "USD")
                                            .reduce((sum, item) => sum + item.qnty, 0))}
                                    </span>
                                    <span className="text-[0.8rem] md:text-[1rem] font-bold text-white uppercase pr-24 md:pr-32 text-right block break-words min-w-[120px]" style={{paddingRight:'3.5rem', background:'#1751a1'}}>
                                        {showAmount(data
                                            .filter(item => item.cur === "USD")
                                            .reduce((sum, item) => sum + item.total, 0), 'usd')}
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr className="border-t border-[var(--selako)] bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)] z-[50] sticky bottom-0" style={{position:'sticky', zIndex:50, background:'#1751a1', marginBottom:'80px'}}>
                            <td colSpan={columns.length} className="px-2 py-2 md:px-8 md:py-3 !pb-6">
                                <div className="grid grid-cols-4 gap-2 md:gap-4 min-w-0 w-full" style={{minWidth:'320px'}}>
                                    <span className="text-[0.8rem] md:text-[1rem] font-bold text-white uppercase break-words min-w-[60px]">Total €</span>
                                    <span className="text-[0.8rem] md:text-[1rem] font-bold text-white uppercase break-words min-w-[30px]"></span>
                                    <span className="text-[0.8rem] md:text-[1rem] font-bold text-white uppercase break-words min-w-[80px] text-right block">
                                        {showAmount1(data
                                            .filter(item => item.cur === "EUR")
                                            .reduce((sum, item) => sum + item.qnty, 0))}
                                    </span>
                                    <span className="text-[0.8rem] md:text-[1rem] font-bold text-white uppercase pr-24 md:pr-32 text-right block break-words min-w-[120px]" style={{paddingRight:'3.5rem', background:'#1751a1'}}>
                                        {showAmount(data
                                            .filter(item => item.cur === "EUR")
                                            .reduce((sum, item) => sum + item.total, 0), 'eur')}
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}

    export default Customtable;
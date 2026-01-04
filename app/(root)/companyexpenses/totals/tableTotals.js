
// 'use client'

// import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
// import { TbSortDescending, TbSortAscending } from "react-icons/tb"
// import { usePathname } from 'next/navigation'
// import '../../contracts/style.css'
// import { getTtl } from "../../../../utils/languages"
// import Tltip from "../../../../components/tlTip"
// import { expensesToolTip } from "./funcs"

// const Customtable = ({ data, columns, expensesData, settings, title, filt }) => {
//     const pathname = usePathname()

//     const table1 = useReactTable({
//         columns, 
//         data,
//         getCoreRowModel: getCoreRowModel(),
//         getFilteredRowModel: getFilteredRowModel(),
//         getSortedRowModel: getSortedRowModel(),
//     })

//     let showAmount = (x, y) => {
//         return new Intl.NumberFormat('en-US', {
//             style: 'currency',
//             currency: y,
//             minimumFractionDigits: 2
//         }).format(x)
//     }

//     return (
//         <div className="flex flex-col relative w-full max-w-full px-2 sm:px-0">
//             <div className="border border-[var(--selago)] rounded-xl w-full overflow-hidden">
//                 {/* Header */}
//                 <div className="justify-between flex p-3 sm:p-2 flex-wrap bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)] border-b border-[var(--selago)]">
//                     <p className="text-white font-semibold p-1 sm:p-2 text-sm sm:text-base break-words w-full">{title}</p>
//                 </div>

//                 {/* Desktop Table View */}
//                 <div className="hidden md:block w-full">
//                     <table className="w-full table-fixed">
//                         <thead className="bg-[var(--rock-blue)]/50">
//                             {table1.getHeaderGroups().map(hdGroup =>
//                                 <tr key={hdGroup.id} className='border-b border-[var(--selago)]'>
//                                     {hdGroup.headers.map(header =>
//                                         <th key={header.id} className="relative px-4 lg:px-6 py-2 text-left text-sm font-medium text-[var(--port-gore)] uppercase">
//                                             {header.column.getCanSort() ?
//                                                 <div onClick={header.column.getToggleSortingHandler()} className="text-xs flex cursor-pointer items-center gap-1">
//                                                     <span className="truncate">{header.column.columnDef.header}</span>
//                                                     {{
//                                                         asc: <TbSortAscending className="text-[var(--endeavour)] scale-125 flex-shrink-0" />,
//                                                         desc: <TbSortDescending className="text-[var(--endeavour)] scale-125 flex-shrink-0" />
//                                                     }[header.column.getIsSorted()]}
//                                                 </div>
//                                                 :
//                                                 <span className="text-xs truncate block">{header.column.columnDef.header}</span>
//                                             }
//                                         </th>
//                                     )}
//                                 </tr>
//                             )}
//                         </thead>
//                         <tbody className="divide-y divide-[var(--selago)]">
//                             {table1.getRowModel().rows.map(row => (
//                                 <tr key={row.id} className='cursor-pointer hover:bg-[var(--selago)]/30 transition-colors'>
//                                     {row.getVisibleCells().map(cell => (
//                                         <td key={cell.id} className="text-xs md:text-sm py-3 px-4 lg:px-6">
//                                             <Tltip direction='right' tltpText={expensesToolTip(row, expensesData, settings, filt)}>
//                                                 <span className="text-[0.8rem] items-center flex outline-none truncate cursor-default w-full">
//                                                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                                                 </span>
//                                             </Tltip>
//                                         </td>
//                                     ))}
//                                 </tr>
//                             ))}
//                         </tbody>
//                         <tfoot>
//                             <tr className="border-t-2 border-[var(--selago)] bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)]">
//                                 <th className="relative px-4 lg:px-2 py-3 text-left text-xs sm:text-sm font-bold text-white uppercase">
//                                     Total $
//                                 </th>
//                                 <th className="relative px-4 lg:px-2 py-3 text-left text-xs sm:text-sm font-bold text-white uppercase truncate">
//                                     {showAmount(data.filter(item => item.cur === "us").reduce((sum, item) => sum + item.amount, 0), 'usd')}
//                                 </th>
//                             </tr>
//                             <tr className="border-t border-[var(--selago)] bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)]">
//                                 <th className="relative px-4 lg:px-2 py-3 text-left text-xs sm:text-sm font-bold text-white uppercase">
//                                     Total €
//                                 </th>
//                                 <th className="relative px-4 lg:px-2 py-3 text-left text-xs sm:text-sm font-bold text-white uppercase truncate">
//                                     {showAmount(data.filter(item => item.cur === "eu").reduce((sum, item) => sum + item.amount, 0), 'eur')}
//                                 </th>
//                             </tr>
//                         </tfoot>
//                     </table>
//                 </div>

//                 {/* Tablet/Mobile Compact Table View */}
//                 <div className="block md:hidden w-full">
//                     <table className="w-full table-fixed">
//                         <thead className="bg-[var(--rock-blue)]/50">
//                             {table1.getHeaderGroups().map(hdGroup =>
//                                 <tr key={hdGroup.id} className='border-b border-[var(--selago)]'>
//                                     {hdGroup.headers.map(header =>
//                                         <th key={header.id} className="relative px-3 py-2 text-left font-medium text-[var(--port-gore)] uppercase">
//                                             {header.column.getCanSort() ?
//                                                 <div onClick={header.column.getToggleSortingHandler()} className="text-[0.65rem] flex cursor-pointer items-center gap-1">
//                                                     <span className="truncate leading-tight">{header.column.columnDef.header}</span>
//                                                     {{
//                                                         asc: <TbSortAscending className="text-[var(--endeavour)] scale-110 flex-shrink-0" />,
//                                                         desc: <TbSortDescending className="text-[var(--endeavour)] scale-110 flex-shrink-0" />
//                                                     }[header.column.getIsSorted()]}
//                                                 </div>
//                                                 :
//                                                 <span className="text-[0.65rem] truncate block leading-tight">{header.column.columnDef.header}</span>
//                                             }
//                                         </th>
//                                     )}
//                                 </tr>
//                             )}
//                         </thead>
//                         <tbody className="divide-y divide-[var(--selago)]">
//                             {table1.getRowModel().rows.map(row => (
//                                 <tr key={row.id} className='cursor-pointer hover:bg-[var(--selago)]/30 transition-colors'>
//                                     {row.getVisibleCells().map(cell => (
//                                         <td key={cell.id} className="py-2.5 px-3">
//                                             <Tltip direction='left' tltpText={expensesToolTip(row, expensesData, settings, filt)}>
//                                                 <span className="text-[0.7rem] items-center flex outline-none cursor-default w-full truncate leading-tight">
//                                                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                                                 </span>
//                                             </Tltip>
//                                         </td>
//                                     ))}
//                                 </tr>
//                             ))}
//                         </tbody>
//                         <tfoot>
//                             <tr className="border-t-2 border-[var(--selago)] bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)]">
//                                 <th className="relative px-3 py-2.5 text-left font-bold text-white uppercase">
//                                     <span className="text-[0.7rem] block leading-tight">Total $</span>
//                                 </th>
//                                 <th className="relative px-3 py-2.5 text-left font-bold text-white uppercase">
//                                     <span className="text-[0.7rem] block truncate leading-tight">
//                                         {showAmount(data.filter(item => item.cur === "us").reduce((sum, item) => sum + item.amount, 0), 'usd')}
//                                     </span>
//                                 </th>
//                             </tr>
//                             <tr className="border-t border-[var(--selago)] bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)]">
//                                 <th className="relative px-3 py-2.5 text-left font-bold text-white uppercase">
//                                     <span className="text-[0.7rem] block leading-tight">Total €</span>
//                                 </th>
//                                 <th className="relative px-3 py-2.5 text-left font-bold text-white uppercase">
//                                     <span className="text-[0.7rem] block truncate leading-tight">
//                                         {showAmount(data.filter(item => item.cur === "eu").reduce((sum, item) => sum + item.amount, 0), 'eur')}
//                                     </span>
//                                 </th>
//                             </tr>
//                         </tfoot>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Customtable;
'use client'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"

import { TbSortAscending, TbSortDescending } from "react-icons/tb"
import Tltip from "../../../../components/tlTip"
import { expensesToolTip } from "./funcs"

const TABLE_WIDTH = "340px"   // 👈 same width as 2nd table

const Customtable = ({ data, columns, expensesData, settings, title, filt }) => {

  const table1 = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const showAmount = (x, y) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: y,
      minimumFractionDigits: 2
    }).format(x)

  const rows = table1.getRowModel().rows
  const isMulti = rows.length > 1

  return (
    <div
      className="bg-white rounded-xl shadow border overflow-hidden"
      style={{ width: TABLE_WIDTH }}   // 👈 fixed equal width
    >

      {/* HEADER */}
      <div className="px-4 py-2.5 bg-gradient-to-r from-[var(--endeavour)] to-[var(--chathams-blue)]">
        <p className="text-white text-sm font-semibold truncate">{title}</p>
      </div>

      {/* TABLE HEADERS */}
      <div className="grid grid-cols-[1fr_auto] px-4 py-2 bg-[var(--rock-blue)]/40 border-b">
        {table1.getHeaderGroups().map(h =>
          h.headers.map(header => (
            <div key={header.id} className="text-[0.7rem] font-semibold text-[var(--port-gore)] uppercase flex items-center gap-1">
              {header.column.getCanSort()
                ? (
                  <div
                    onClick={header.column.getToggleSortingHandler()}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <span className="truncate">{header.column.columnDef.header}</span>
                    {{
                      asc: <TbSortAscending className="text-[var(--endeavour)]" />,
                      desc: <TbSortDescending className="text-[var(--endeavour)]" />
                    }[header.column.getIsSorted()]}
                  </div>
                )
                : <span className="truncate">{header.column.columnDef.header}</span>
              }
            </div>
          ))
        )}
      </div>

      {/* BODY */}
      <div className={isMulti ? "divide-y" : ""}>
        {rows.map(row => (
          <Tltip
            key={row.id}
            direction="right"
            tltpText={expensesToolTip(row, expensesData, settings, filt)}
          >
            <div className="grid grid-cols-[1fr_auto] px-4 py-2.5 items-center hover:bg-gray-50 transition">
              {row.getVisibleCells().map(cell => (
                <div
                  key={cell.id}
                  className={
                    cell.column.id === "amount"
                      ? "text-sm font-medium text-gray-900 text-right"
                      : "text-sm text-gray-700 truncate"
                  }
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          </Tltip>
        ))}
      </div>

      {/* TOTALS */}
      <div className={`border-t px-4 py-3 ${isMulti ? "bg-gray-50" : "bg-white"}`}>
        <div className="flex justify-between text-sm font-semibold text-gray-900">
          <span>Total $</span>
          <span>
            {showAmount(
              data.filter(i => i.cur === "us").reduce((s, i) => s + i.amount, 0),
              "usd"
            )}
          </span>
        </div>

        <div className="flex justify-between text-sm font-semibold text-gray-900 mt-1">
          <span>Total €</span>
          <span>
            {showAmount(
              data.filter(i => i.cur === "eu").reduce((s, i) => s + i.amount, 0),
              "eur"
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Customtable

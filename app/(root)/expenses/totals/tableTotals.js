// 'use client'

// import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"

// import { TbSortDescending } from "react-icons/tb";
// import { TbSortAscending } from "react-icons/tb";
// import { usePathname } from 'next/navigation'
// import '../../contracts/style.css';
// import { getTtl } from "../../../../utils/languages";
// import Tltip from "../../../../components/tlTip";
// import { expensesToolTip } from "./funcs";

// const Customtable = ({ data, columns, expensesData, settings, title, filt }) => {

//     const pathname = usePathname()

//     const table1 = useReactTable({
//         columns, data,
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
//         <div className={`flex flex-col relative max-w-[486px] min-w-[22rem]`}>
//             <div className="border border-[var(--selago)] rounded-xl shadow-md overflow-hidden">
//                 <div className="justify-between flex p-2 flex-wrap bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)] rounded-t-xl">
//                     <p className="text-white font-semibold p-2">{title}</p>
//                 </div>

//                 <div className=" overflow-x-auto ">
//                     <table className="w-full">
//                         <thead className="bg-gradient-to-r from-[var(--endeavour)] to-[var(--chathams-blue)]">
//                             {table1.getHeaderGroups().map(hdGroup =>
//                                 <tr key={hdGroup.id} className=''>
//                                     {hdGroup.headers.map(
//                                         header =>
//                                             <th key={header.id} className="relative px-6 py-2 text-left text-sm font-semibold text-white uppercase">
//                                                 {header.column.getCanSort() ?
//                                                     <div onClick={header.column.getToggleSortingHandler()} className="text-xs flex cursor-pointer items-center gap-1">
//                                                         {header.column.columnDef.header}
//                                                         {
//                                                             {
//                                                                 asc: <TbSortAscending className="text-white scale-125" />,
//                                                                 desc: <TbSortDescending className="text-white scale-125" />
//                                                             }[header.column.getIsSorted()]
//                                                         }
//                                                     </div>
//                                                     :
//                                                     <span className="text-xs">{header.column.columnDef.header}</span>
//                                                 }
//                                             </th>
//                                     )}
//                                 </tr>)}
//                         </thead>
//                         <tbody className="divide-y divide-[var(--selago)] bg-white">
//                             {table1.getRowModel().rows.map(row => (
//                                 <tr key={row.id} className='cursor-pointer '>

//                                     {row.getVisibleCells().map(cell => (
//                                         <td key={cell.id} data-label={cell.column.columnDef.header} className={`table_cell text-xs md:py-3 items-center `}>
//                                             <Tltip direction='right' tltpText={expensesToolTip(row, expensesData, settings, filt)}>
//                                                 <span className="text-[0.8rem] items-center flex outline-none w-44 truncate cursor-default"
//                                                 >
//                                                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                                                 </span>
//                                             </Tltip>
//                                         </td>
//                                     ))}

//                                 </tr>
//                             ))}
//                         </tbody>
//                         <tfoot>
//                             <tr className="border-t border-[var(--selago)] bg-[var(--rock-blue)]/30">
//                                 <th className="relative px-6 py-2 text-left text-[0.8rem] font-semibold text-[var(--port-gore)] uppercase">
//                                     Total $
//                                 </th>
//                                 <th className="relative px-6 py-2 text-left text-[0.8rem] font-semibold text-[var(--port-gore)] uppercase">
//                                     {showAmount(data
//                                         .filter(item => item.cur === "us")
//                                         .reduce((sum, item) => sum + item.amount, 0), 'usd')}
//                                 </th>
//                             </tr>
//                             <tr className="border-t border-[var(--selago)] bg-[var(--rock-blue)]/30">
//                                 <th className="relative px-6 py-2 text-left text-[0.8rem] font-semibold text-[var(--port-gore)] uppercase">
//                                     Total €
//                                 </th>
//                                 <th className="relative px-6 py-2 text-left text-[0.8rem] font-semibold text-[var(--port-gore)] uppercase">
//                                     {showAmount(data
//                                         .filter(item => item.cur === "eu")
//                                         .reduce((sum, item) => sum + item.amount, 0), 'eur')}
//                                 </th>
//                             </tr>
//                         </tfoot>
//                     </table>
//                 </div>
//             </div>
//         </div >
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

import Tltip from "../../../../components/tlTip"
import { expensesToolTip } from "./funcs"

const TABLE_WIDTH = "340px"   // 👈 single source of truth

const Customtable = ({ data, columns, expensesData, settings, title, filt }) => {

  const table1 = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const showAmount = (x, y) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
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
        <p className="text-white text-sm font-semibold">{title}</p>
      </div>

      {/* BODY */}
      <div className={isMulti ? 'divide-y' : ''}>
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
                    cell.column.id === 'amount'
                      ? 'text-sm font-medium text-gray-900 text-right'
                      : 'text-sm text-gray-700 truncate'
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
      <div className={`border-t px-4 py-3 ${isMulti ? 'bg-gray-50' : 'bg-white'}`}>
        <div className="flex justify-between text-sm font-semibold text-gray-900">
          <span>Total $</span>
          <span>
            {showAmount(
              data.filter(i => i.cur === 'us').reduce((s, i) => s + i.amount, 0),
              'usd'
            )}
          </span>
        </div>

        <div className="flex justify-between text-sm font-semibold text-gray-900 mt-1">
          <span>Total €</span>
          <span>
            {showAmount(
              data.filter(i => i.cur === 'eu').reduce((s, i) => s + i.amount, 0),
              'eur'
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Customtable  
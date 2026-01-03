'use client'

import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { TbSortDescending, TbSortAscending } from "react-icons/tb"
import { usePathname } from 'next/navigation'
import { useMemo, useCallback } from 'react'
import '../../contracts/style.css'
import { getTtl } from "@utils/languages"
import Tltip from "@components/tlTip"
import { detailsToolTip } from "./tablesFuncs"

const CURRENCIES = {
  USD: { symbol: '$', code: 'usd', label: 'Total $' },
  EUR: { symbol: '€', code: 'eur', label: 'Total €' }
}

const Customtable = ({ data, columns, ln, ttl, settings, dataTable, rmrk }) => {
  const pathname = usePathname()

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  // Memoized formatters
  const formatCurrency = useCallback((amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2
    }).format(amount)
  }, [])

  const formatNumber = useCallback((amount) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 3
    }).format(amount)
  }, [])

  // Memoized totals calculation
  const totals = useMemo(() => {
    const result = {}
    Object.keys(CURRENCIES).forEach(cur => {
      const filtered = data.filter(item => item.cur === cur)
      result[cur] = {
        quantity: filtered.reduce((sum, item) => sum + (item.qnty || 0), 0),
        total: filtered.reduce((sum, item) => sum + (item.total || 0), 0)
      }
    })
    return result
  }, [data])

  const renderTotalRow = useCallback((currency) => {
    const config = CURRENCIES[currency]
    const { quantity, total } = totals[currency]

    return (
      <tr 
        key={currency}
        className="border-t border-[var(--selako)] bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)]"
      >
        {columns.map((col, index) => {
          if (index === 0) {
            return (
              <td key={`${currency}-${index}`} className="px-2 py-2 md:px-3 md:py-2">
                <span className="text-[0.7rem] md:text-[0.75rem] font-medium text-white uppercase whitespace-nowrap">
                  {config.label}
                </span>
              </td>
            )
          } else if (index === 1) {
            return (
              <td key={`${currency}-${index}`} className="px-2 py-2 md:px-3 md:py-2">
                <span className="text-[0.7rem] md:text-[0.75rem] font-medium text-white uppercase" />
              </td>
            )
          } else if (index === 2) {
            return (
              <td key={`${currency}-${index}`} className="px-2 py-2 md:px-3 md:py-2 text-left">
                <span className="text-[0.7rem] md:text-[0.75rem] font-medium text-white uppercase whitespace-nowrap">
                  {formatNumber(quantity)}
                </span>
              </td>
            )
          } else if (index === 3) {
            return (
              <td key={`${currency}-${index}`} className="px-2 py-2 md:px-3 md:py-2 text-right">
                <span className="text-[0.7rem] md:text-[0.75rem] font-medium text-white uppercase whitespace-nowrap">
                  {formatCurrency(total, config.code)}
                </span>
              </td>
            )
          }
          return <td key={`${currency}-${index}`} className="px-2 py-2 md:px-3 md:py-2" />
        })}
      </tr>
    )
  }, [totals, columns, formatNumber, formatCurrency])

  return (
    <div className="flex flex-col relative w-full">
      <div className="overflow-x-auto border-x border-[var(--selago)]">
        <table className="w-full min-w-0 table-auto">
          <thead className="bg-[var(--rock-blue)]/50 divide-y divide-[var(--selago)]">
            {table.getHeaderGroups().map(hdGroup => (
              <tr key={hdGroup.id} className='border-b border-[var(--selako)]'>
                {hdGroup.headers.map((header, idx) => (
                  <th 
                    key={header.id} 
                    className={`relative px-2 py-2 md:px-3 md:py-2 ${
                        idx === 3 ? 'text-right' : 'text-left'
                      } text-sm font-semibold text-white uppercase bg-[var(--endeavour)] ${
                        idx === 0 ? 'w-[18%]' : idx === 1 ? 'w-[12%]' : idx === 2 ? 'w-[20%]' : 'w-[20%]'
                      }`}
                  >
                    {header.column.getCanSort() ? (
                      <div 
                        onClick={header.column.getToggleSortingHandler()} 
                        className={`text-[10px] md:text-xs flex cursor-pointer items-center gap-1 hover:opacity-80 transition-opacity ${
                          idx === 3 ? 'justify-end' : 'justify-start'
                        }`}
                        role="button"
                        tabIndex={0}
                        aria-label={`Sort by ${header.column.columnDef.header}`}
                      >
                        <span className="truncate max-w-[150px] block">
                          {header.column.columnDef.header}
                        </span>
                        {header.column.getIsSorted() === 'asc' && (
                          <TbSortAscending className="text-white scale-110 md:scale-125" />
                        )}
                        {header.column.getIsSorted() === 'desc' && (
                          <TbSortDescending className="text-white scale-110 md:scale-125" />
                        )}
                      </div>
                    ) : (
                      <span className="text-[10px] md:text-xs truncate max-w-[150px] block">
                        {header.column.columnDef.header}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-[var(--selago)]">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <tr 
                  key={row.id} 
                  className='cursor-pointer hover:bg-[var(--selago)]/30 transition-colors'
                >
                  {row.getVisibleCells().map((cell, idx) => (
                    <td 
                      key={cell.id} 
                      data-label={cell.column.columnDef.header} 
                      className={`table_cell text-xs px-2 md:px-3 py-1.5 md:py-2 ${
                        idx === 3 ? 'text-right' : 'text-left'
                      } max-w-[160px]`}
                    >
                      <Tltip 
                        direction='right' 
                        tltpText={detailsToolTip(row, data, settings, dataTable, rmrk)}
                      >
                        <span className="inline-block max-w-[140px] truncate">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </span>
                      </Tltip>
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={columns.length} 
                  className="text-center py-8 text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            {Object.keys(CURRENCIES).map(currency => renderTotalRow(currency))}
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default Customtable;
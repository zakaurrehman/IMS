
'use client'

import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { useMemo, useState, useContext } from "react"
import { TbSortDescending, TbSortAscending } from "react-icons/tb"
import { MdDeleteOutline } from "react-icons/md"
import Header from "../../../components/table/header"
import { Filter } from "../../../components/table/filters/filterFunc"
import { SettingsContext } from "../../../contexts/useSettingsContext"
import '../contracts/style.css'

const Customtable = ({ 
  data, 
  columns, 
  excellReport, 
  addMaterial, 
  editCell, 
  table1, 
  delMaterial, 
  delTable, 
  runPdf,
  showHeader = true,
  showFooter = true,
  editable = true
}) => {
  const [globalFilter, setGlobalFilter] = useState('')
  const [filterOn, setFilterOn] = useState(false)
  const [{ pageIndex, pageSize }, setPagination] = useState({ 
    pageIndex: 0, 
    pageSize: 500 
  })
  const [columnFilters, setColumnFilters] = useState([])

  const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])
  const { ln } = useContext(SettingsContext)

  const table = useReactTable({
    columns, 
    data,
    getCoreRowModel: getCoreRowModel(),
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

  // Utility: Format numbers with commas
  const formatNumber = (nStr) => {
    if (!nStr && nStr !== 0) return ''
    nStr += ''
    const x = nStr.split('.')
    let x1 = x[0]
    let x2 = x.length > 1 ? '.' + x[1] : ''
    const rgx = /(\d+)(\d{3})/
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1,$2')
    }
    x2 = x2.length > 3 ? x2.substring(0, 3) : x2
    return x1 + x2
  }

  // Footer totals
  const calculateFooterTotals = (header) => {
    const columnId = header.id
    if (columnId === 'del') return ''
    const filteredRows = table.getFilteredRowModel().rows
    if (columnId === 'material') return `${filteredRows.length} items`
    const totalKGS = filteredRows.reduce((sum, row) => sum + (parseFloat(row.getValue('kgs')) || 0), 0)
    if (columnId === 'kgs') return formatNumber(totalKGS.toFixed(2))
    const weightedTotal = filteredRows.reduce((sum, row) => {
      const kgs = parseFloat(row.getValue('kgs')) || 0
      const val = parseFloat(row.getValue(columnId)) || 0
      return sum + kgs * val
    }, 0)
    const average = totalKGS > 0 ? (weightedTotal / totalKGS).toFixed(2) : 0
    return average !== 'NaN' ? formatNumber(average) : ''
  }

  // Cell helpers
  const getCellWidthClass = (columnId) => {
    if (columnId === 'material') return 'min-w-[120px] lg:min-w-[150px]'
    if (columnId === 'kgs') return 'min-w-[100px] lg:min-w-[120px]'
    return 'min-w-[80px] lg:min-w-[90px]'
  }
  const getCellBgClass = (columnId) => 'bg-white'
  const getTextAlignClass = (columnId) => columnId === 'material' ? 'text-left' : 'text-center'

  return (
    <div className="flex flex-col w-full px-4 py-6 ">
      {/* Header Controls */}
      {showHeader && (
        <div className="w-full mb-4">
          <Header 
            globalFilter={globalFilter} 
            setGlobalFilter={setGlobalFilter}
            table={table} 
            excellReport={excellReport}
            type='mTable'
            addMaterial={addMaterial}
            delTable={delTable}
            table1={table1}
            runPdf={runPdf}
          />
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-hidden rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] ">
        <div className="overflow-x-auto" style={{ maxHeight: 'calc(100vh - 250px)' }}>
          <table className="w-full min-w-full border-collapse">
            {/* THEAD */}
            <thead className="sticky top-0">
              {table.getHeaderGroups().map(hdGroup => (
                <tr key={hdGroup.id} className='bg-[#2563eb]'>
                  {hdGroup.headers.map((header, idx) => {
                    const isMaterial = header.id === 'material'
                    const isFirst = idx === 0
                    const isLast = idx === hdGroup.headers.length - 1
                    return (
                      <th 
                        key={header.id}
                        className={`relative px-3 py-3 text-[13px] text-white whitespace-nowrap font-semibold
                          ${getCellWidthClass(header.id)}
                          ${getTextAlignClass(header.id)}
                          ${isFirst ? 'rounded-tl-xl' : ''}
                          ${isLast ? 'rounded-tr-xl' : ''}
                        `}
                      >
                        {header.column.getCanSort() ? (
                          <div 
                            onClick={header.column.getToggleSortingHandler()} 
                            className={`cursor-pointer flex items-center gap-1.5 ${isMaterial ? 'justify-start' : 'justify-center'}`}
                          >
                            {header.column.columnDef.header}
                            {{
                              asc: <TbSortAscending className="text-white w-4 h-4" />,
                              desc: <TbSortDescending className="text-white w-4 h-4" />
                            }[header.column.getIsSorted()]}
                          </div>
                        ) : (
                          <span className="text-[13px] font-semibold text-white">
                            {header.column.columnDef.header}
                          </span>
                        )}
                        {header.column.getCanFilter() && (
                          <div>
                            <Filter column={header.column} table={table} filterOn={filterOn} />
                          </div>
                        )}
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>

            {/* TBODY */}
            <tbody className="bg-white">
              {table.getRowModel().rows.map((row, rowIdx) => (
                <tr key={row.id} className={`cursor-pointer hover:bg-[#f8fafb] transition-colors duration-100 ${rowIdx !== table.getRowModel().rows.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  {row.getVisibleCells().map(cell => {
                    const isMaterialOrKgs = cell.column.id === 'material' || cell.column.id === 'kgs'
                    const isDel = cell.column.id === 'del'
                    return (
                      <td 
                        key={cell.id} 
                        data-label={cell.column.columnDef.header}
                        className={`px-3 py-2.5 text-[13px] bg-[#ECF3FC] ${getCellBgClass(cell.column.id)} ${getCellWidthClass(cell.column.id)} ${getTextAlignClass(cell.column.id)}`}
                      >
                        {!isDel ? (
                          <input
                            type={isMaterialOrKgs ? 'text' : 'number'}
                            className={`w-full px-2 py-1.5 border-none rounded-lg shadow-md shadow-gray-500 text-[13px] font-normal text-gray-700 focus:outline-none focus:ring-0 ${getTextAlignClass(cell.column.id)}`}
                            onChange={(e) => editCell(table1, e, cell)}
                            value={cell.column.id === 'kgs' ? formatNumber(cell.getContext().getValue()) : cell.getContext().getValue()}
                          />
                        ) : (
                          <div className="flex justify-center items-center px-2 py-1.5 bg-[#ECF3FC] rounded-lg shadow-md">
                            <button
                              onClick={() => delMaterial(table1, cell)}
                              className="text-gray-700 cursor-pointer hover:text-gray-400 transition-colors duration-150"
                            >
                              <MdDeleteOutline className="w-[18px] h-[18px]" />
                            </button>
                          </div>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>

            {/* TFOOT - Footer Totals */}
            {showFooter && (
              <tfoot className="bg-[#2563eb] sticky bottom-0">
                <tr>
                  {table.getHeaderGroups()[0].headers.map((header, idx) => {
                    const isMaterial = header.id === 'material'
                    const isFirst = idx === 0
                    const isLast = idx === table.getHeaderGroups()[0].headers.length - 1
                    return (
                      <td key={header.id} className={`px-3 py-3 text-[13px] text-white whitespace-nowrap font-bold ${isMaterial ? 'font-normal text-left' : 'text-center'} ${getCellWidthClass(header.id)} ${isFirst ? 'rounded-bl-xl' : ''} ${isLast ? 'rounded-br-xl' : ''}`}>
                        {calculateFooterTotals(header)}
                      </td>
                    )
                  })}
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>

      {/* Mobile Table/Card View */}
      <div className="sm:hidden space-y-4">
        {table.getRowModel().rows.map(row => (
          <div key={row.id} className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden">
            {row.getVisibleCells().map(cell => {
              const isDel = cell.column.id === 'del'
              const isMaterialOrKgs = cell.column.id === 'material' || cell.column.id === 'kgs'
              if (isDel) {
                return (
                  <div key={cell.id} className="p-4 border-t border-gray-200 bg-red-50 flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-700">Actions</span>
                    <button
                      onClick={() => delMaterial(table1, cell)}
                      className="text-gray-400 hover:text-red-500 hover:bg-red-100 p-2 rounded-lg transition-all duration-200"
                    >
                      <MdDeleteOutline className="w-6 h-6" />
                    </button>
                  </div>
                )
              }
              return (
                <div key={cell.id} className={`p-4 border-t first:border-t-0 border-gray-200 flex flex-col gap-2 shadow-lg bg-white`}>
                  <label className="text-sm font-semibold text-gray-700">{cell.column.columnDef.header}</label>
                  <input
                    type={isMaterialOrKgs ? 'text' : 'number'}
                    className={`w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${getTextAlignClass(cell.column.id)}`}
                    onChange={(e) => editCell(table1, e, cell)}
                    value={cell.column.id === 'kgs' ? formatNumber(cell.getContext().getValue()) : cell.getContext().getValue()}
                  />
                </div>
              )
            })}
          </div>
        ))}

        {/* Mobile Footer Summary */}
        {showFooter && (
          <div className="bg-[#2563eb] rounded-xl p-4 space-y-2.5 shadow-lg">
            <h3 className="text-white font-semibold text-base mb-3">Summary</h3>
            {table.getHeaderGroups()[0].headers
              .filter(header => header.id !== 'del')
              .map((header) => (
                <div key={header.id} className="flex justify-between items-center text-white text-sm py-1">
                  <span className="font-medium">{header.column.columnDef.header}:</span>
                  <span className={`font-semibold ${getTextAlignClass(header.id)}`}>
                    {calculateFooterTotals(header)}
                  </span>
                </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Customtable

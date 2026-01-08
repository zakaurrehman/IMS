// // 'use client'

// // import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
// // import { useMemo, useState, useContext } from "react"
// // import { TbSortDescending, TbSortAscending } from "react-icons/tb"
// // import { MdDeleteOutline } from "react-icons/md"
// // import Header from "../../../components/table/header"
// // import { Filter } from "../../../components/table/filters/filterFunc"
// // import { SettingsContext } from "../../../contexts/useSettingsContext"
// // import '../contracts/style.css'

// // const Customtable = ({ 
// //   data, 
// //   columns, 
// //   excellReport, 
// //   addMaterial, 
// //   editCell, 
// //   table1, 
// //   delMaterial, 
// //   delTable, 
// //   runPdf 
// // }) => {
// //   const [globalFilter, setGlobalFilter] = useState('')
// //   const [filterOn, setFilterOn] = useState(false)
// //   const [{ pageIndex, pageSize }, setPagination] = useState({ 
// //     pageIndex: 0, 
// //     pageSize: 500 
// //   })
// //   const [columnFilters, setColumnFilters] = useState([])
  
// //   const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])
// //   const { ln } = useContext(SettingsContext)

// //   const table = useReactTable({
// //     columns, 
// //     data,
// //     getCoreRowModel: getCoreRowModel(),
// //     state: {
// //       globalFilter,
// //       pagination,
// //       columnFilters
// //     },
// //     onColumnFiltersChange: setColumnFilters,
// //     getFilteredRowModel: getFilteredRowModel(),
// //     onGlobalFilterChange: setGlobalFilter,
// //     getSortedRowModel: getSortedRowModel(),
// //     getPaginationRowModel: getPaginationRowModel(),
// //     onPaginationChange: setPagination,
// //   })

// //   // Utility function to format numbers with commas
// //   const formatNumber = (nStr) => {
// //     if (!nStr && nStr !== 0) return ''
// //     nStr += ''
// //     const x = nStr.split('.')
// //     let x1 = x[0]
// //     let x2 = x.length > 1 ? '.' + x[1] : ''
// //     const rgx = /(\d+)(\d{3})/
// //     while (rgx.test(x1)) {
// //       x1 = x1.replace(rgx, '$1,$2')
// //     }
// //     x2 = x2.length > 3 ? x2.substring(0, 3) : x2
// //     return x1 + x2
// //   }

// //   // Calculate footer totals
// //   const calculateFooterTotals = (header) => {
// //     const columnId = header.id
    
// //     if (columnId === 'del') return ''
    
// //     const filteredRows = table.getFilteredRowModel().rows
    
// //     if (columnId === 'material') {
// //       return `${filteredRows.length} items`
// //     }
    
// //     const totalKGS = filteredRows.reduce((sum, row) => {
// //       return sum + (parseFloat(row.getValue('kgs')) || 0)
// //     }, 0)
    
// //     if (columnId === 'kgs') {
// //       return formatNumber(totalKGS.toFixed(2))
// //     }
    
// //     const weightedTotal = filteredRows.reduce((sum, row) => {
// //       const kgs = parseFloat(row.getValue('kgs')) || 0
// //       const columnValue = parseFloat(row.getValue(columnId)) || 0
// //       return sum + (kgs * columnValue)
// //     }, 0)
    
// //     const average = totalKGS > 0 ? (weightedTotal / totalKGS).toFixed(2) : 0
// //     return average != 'NaN' ? formatNumber(average) : ''
// //   }

// //   return (
// //     <div className="flex flex-col relative pt-4 sm:pt-7 w-full">
// //       {/* Header with controls */}
// //       <div className="w-full">
// //         <Header 
// //           globalFilter={globalFilter} 
// //           setGlobalFilter={setGlobalFilter}
// //           table={table} 
// //           excellReport={excellReport}
// //           type='mTable'
// //           addMaterial={addMaterial}
// //           delTable={delTable}
// //           table1={table1}
// //           runPdf={runPdf}
// //         />

// //         {/* Desktop Table View - Hidden on mobile */}
// //         <div className="hidden md:block overflow-x-auto border-x border-[var(--selago)] md:max-h-[310px] lg:max-h-[450px] 2xl:max-h-[550px]">
// //           <table className="w-full min-w-full">
// //             <thead className="divide-y divide-[var(--selago)] sticky top-0 z-10">
// //               {table.getHeaderGroups().map(hdGroup => (
// //                 <tr 
// //                   key={hdGroup.id} 
// //                   className='border border-b-[var(--endeavour)] bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)]'
// //                 >
// //                   {hdGroup.headers.map(header => {
// //                     const isMaterialOrKgs = header.id === 'material' || header.id === 'kgs'
// //                     const isMaterial = header.id === 'material'
                    
// //                     return (
// //                       <th 
// //                         key={header.id}
// //                         className={`relative px-2 lg:px-4 py-2 text-xs lg:text-sm text-white whitespace-nowrap
// //                           ${isMaterialOrKgs ? 'bg-[var(--chathams-blue)] font-bold' : 'bg-[var(--endeavour)]/80'}
// //                           ${isMaterial ? 'min-w-[200px] lg:min-w-[300px] text-left' : 'min-w-[80px] text-right'}
// //                         `}
// //                       >
// //                         {header.column.getCanSort() ? (
// //                           <div 
// //                             onClick={header.column.getToggleSortingHandler()} 
// //                             className={`font-bold cursor-pointer flex items-center gap-1 ${isMaterial ? 'justify-start' : 'justify-end'}`}
// //                             role="button"
// //                             aria-label={`Sort by ${header.column.columnDef.header}`}
// //                           >
// //                             {header.column.columnDef.header}
// //                             {
// //                               {
// //                                 asc: <TbSortAscending className="text-white scale-110 lg:scale-125" />,
// //                                 desc: <TbSortDescending className="text-white scale-110 lg:scale-125" />
// //                               }[header.column.getIsSorted()]
// //                             }
// //                           </div>
// //                         ) : (
// //                           <span className="text-xs py-1 font-medium text-white">
// //                             {header.column.columnDef.header}
// //                           </span>
// //                         )}
// //                         {header.column.getCanFilter() && (
// //                           <div>
// //                             <Filter column={header.column} table={table} filterOn={filterOn} />
// //                           </div>
// //                         )}
// //                       </th>
// //                     )
// //                   })}
// //                 </tr>
// //               ))}
// //             </thead>
            
// //             <tbody className="divide-y divide-[var(--selago)]">
// //               {table.getRowModel().rows.map(row => (
// //                 <tr
// //                   key={row.id}
// //                   className="cursor-pointer hover:bg-[var(--rock-blue)] hover:text-[var(--bunting)] transition-colors"
// //                 >
// //                   {row.getVisibleCells().map(cell => {
// //                     const isMaterialOrKgs = cell.column.id === 'material' || cell.column.id === 'kgs'
// //                     const isMaterial = cell.column.id === 'material'
// //                     const isDel = cell.column.id === 'del'
                    
// //                     return (
// //                       <td 
// //                         key={cell.id} 
// //                         data-label={cell.column.columnDef.header}
// //                         className={`table_cell text-xs p-1 
// //                           ${isMaterialOrKgs ? 'bg-[var(--rock-blue)]/50 font-bold' : ''}
// //                           ${isMaterial ? 'text-left' : 'text-right'}
// //                         `}
// //                       >
// //                         {!isDel ? (
// //                           <input
// //                             type={isMaterialOrKgs ? 'text' : 'number'}
// //                             className={`indent-0 input h-8 border-none font-bold w-full
// //                               ${isMaterialOrKgs ? 'bg-[var(--rock-blue)]/50 font-bold' : ''}
// //                               ${isMaterial ? 'text-left min-w-[180px] lg:min-w-[280px]' : 'text-right min-w-[70px]'}
// //                             `}
// //                             onChange={(e) => editCell(table1, e, cell)}
// //                             value={
// //                               cell.column.id === 'kgs' 
// //                                 ? formatNumber(cell.getContext().getValue()) 
// //                                 : cell.getContext().getValue()
// //                             }
// //                             aria-label={`Edit ${cell.column.columnDef.header}`}
// //                           />
// //                         ) : (
// //                           <div className="flex justify-center">
// //                             <button
// //                               onClick={() => delMaterial(table1, cell)}
// //                               className="text-[var(--endeavour)] cursor-pointer hover:scale-110 transition-transform p-1"
// //                               aria-label="Delete material"
// //                             >
// //                               <MdDeleteOutline className="scale-150 lg:scale-[1.8]" />
// //                             </button>
// //                           </div>
// //                         )}
// //                       </td>
// //                     )
// //                   })}
// //                 </tr>
// //               ))}
// //             </tbody>
            
// //             <tfoot className="bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)] font-bold hover:bg-[var(--rock-blue)] hover:text-[var(--bunting)] transition-colors sticky bottom-0">
// //               <tr className="border border-y-[var(--endeavour)]">
// //                 {table.getHeaderGroups()[0].headers.map((header) => {
// //                   const isKgs = header.id === 'kgs'
// //                   const isMaterial = header.id === 'material'
                  
// //                   return (
// //                     <td 
// //                       key={header.id} 
// //                       className={`px-2 py-1 text-xs lg:text-sm text-white whitespace-nowrap
// //                         ${isMaterial ? 'font-normal text-left' : 'text-right'}
// //                         ${isKgs ? 'bg-[var(--chathams-blue)] font-bold border border-y-[var(--endeavour)]' : ''}
// //                         ${!isMaterial && !isKgs ? 'bg-[var(--endeavour)]/80' : ''}
// //                       `}
// //                     >
// //                       {calculateFooterTotals(header)}
// //                     </td>
// //                   )
// //                 })}
// //               </tr>
// //             </tfoot>
// //           </table>
// //         </div>

// //         {/* Mobile Card View - Visible only on mobile */}
// //         <div className="md:hidden space-y-3 mt-4">
// //           {table.getRowModel().rows.map(row => (
// //             <div 
// //               key={row.id} 
// //               className="bg-white border border-[var(--selago)] rounded-lg shadow-sm overflow-hidden"
// //             >
// //               {row.getVisibleCells().map(cell => {
// //                 const isDel = cell.column.id === 'del'
// //                 const isMaterialOrKgs = cell.column.id === 'material' || cell.column.id === 'kgs'
// //                 const isMaterial = cell.column.id === 'material'
                
// //                 if (isDel) {
// //                   return (
// //                     <div key={cell.id} className="p-3 border-t border-[var(--selago)] bg-red-50 flex justify-between items-center">
// //                       <span className="text-sm font-semibold text-gray-700">Actions</span>
// //                       <button
// //                         onClick={() => delMaterial(table1, cell)}
// //                         className="text-[var(--endeavour)] hover:bg-[var(--rock-blue)]/20 p-2 rounded-lg transition-colors"
// //                         aria-label="Delete material"
// //                       >
// //                         <MdDeleteOutline className="scale-150" />
// //                       </button>
// //                     </div>
// //                   )
// //                 }
                
// //                 return (
// //                   <div 
// //                     key={cell.id} 
// //                     className={`p-3 border-t first:border-t-0 border-[var(--selago)] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2
// //                       ${isMaterialOrKgs ? 'bg-[var(--rock-blue)]/10' : 'bg-white'}
// //                     `}
// //                   >
// //                     <label className="text-sm font-semibold text-gray-700 min-w-[100px]">
// //                       {cell.column.columnDef.header}
// //                     </label>
// //                     <input
// //                       type={isMaterialOrKgs ? 'text' : 'number'}
// //                       className={`flex-1 min-w-0 px-3 py-2 border border-[var(--selago)] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--endeavour)] focus:border-transparent
// //                         ${isMaterialOrKgs ? 'font-bold bg-[var(--rock-blue)]/10' : 'bg-white'}
// //                         ${isMaterial ? 'text-left' : 'text-right'}
// //                       `}
// //                       onChange={(e) => editCell(table1, e, cell)}
// //                       value={
// //                         cell.column.id === 'kgs' 
// //                           ? formatNumber(cell.getContext().getValue()) 
// //                           : cell.getContext().getValue()
// //                       }
// //                       aria-label={`Edit ${cell.column.columnDef.header}`}
// //                     />
// //                   </div>
// //                 )
// //               })}
// //             </div>
// //           ))}
          
// //           {/* Mobile Footer Summary */}
// //           <div className="bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)] rounded-lg p-4 space-y-2 shadow-lg">
// //             <h3 className="text-white font-bold text-sm mb-3">Summary</h3>
// //             {table.getHeaderGroups()[0].headers
// //               .filter(header => header.id !== 'del')
// //               .map((header) => {
// //                 const isMaterial = header.id === 'material'
// //                 return (
// //                   <div key={header.id} className="flex justify-between items-center text-white text-xs py-1">
// //                     <span className="font-medium">{header.column.columnDef.header}:</span>
// //                     <span className={`font-bold ${isMaterial ? 'text-left' : 'text-right'}`}>
// //                       {calculateFooterTotals(header)}
// //                     </span>
// //                   </div>
// //                 )
// //               })}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Customtable;
// 'use client'

// import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
// import { useMemo, useState, useContext } from "react"
// import { TbSortDescending, TbSortAscending } from "react-icons/tb"
// import { MdDeleteOutline } from "react-icons/md"
// import Header from "../../../components/table/header"
// import { Filter } from "../../../components/table/filters/filterFunc"
// import { SettingsContext } from "../../../contexts/useSettingsContext"
// import '../contracts/style.css'

// const Customtable = ({ 
//   data, 
//   columns, 
//   excellReport, 
//   addMaterial, 
//   editCell, 
//   table1, 
//   delMaterial, 
//   delTable, 
//   runPdf,
//   showHeader = true,
//   showFooter = true,
//   editable = true
// }) => {
//   const [globalFilter, setGlobalFilter] = useState('')
//   const [filterOn, setFilterOn] = useState(false)
//   const [{ pageIndex, pageSize }, setPagination] = useState({ 
//     pageIndex: 0, 
//     pageSize: 500 
//   })
//   const [columnFilters, setColumnFilters] = useState([])
  
//   const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])
//   const { ln } = useContext(SettingsContext)

//   const table = useReactTable({
//     columns, 
//     data,
//     getCoreRowModel: getCoreRowModel(),
//     state: {
//       globalFilter,
//       pagination,
//       columnFilters
//     },
//     onColumnFiltersChange: setColumnFilters,
//     getFilteredRowModel: getFilteredRowModel(),
//     onGlobalFilterChange: setGlobalFilter,
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     onPaginationChange: setPagination,
//   })

//   // Utility function to format numbers with commas
//   const formatNumber = (nStr) => {
//     if (!nStr && nStr !== 0) return ''
//     nStr += ''
//     const x = nStr.split('.')
//     let x1 = x[0]
//     let x2 = x.length > 1 ? '.' + x[1] : ''
//     const rgx = /(\d+)(\d{3})/
//     while (rgx.test(x1)) {
//       x1 = x1.replace(rgx, '$1,$2')
//     }
//     x2 = x2.length > 3 ? x2.substring(0, 3) : x2
//     return x1 + x2
//   }

//   // Calculate footer totals
//   const calculateFooterTotals = (header) => {
//     const columnId = header.id
    
//     if (columnId === 'del') return ''
    
//     const filteredRows = table.getFilteredRowModel().rows
    
//     if (columnId === 'material') {
//       return `${filteredRows.length} items`
//     }
    
//     const totalKGS = filteredRows.reduce((sum, row) => {
//       return sum + (parseFloat(row.getValue('kgs')) || 0)
//     }, 0)
    
//     if (columnId === 'kgs') {
//       return formatNumber(totalKGS.toFixed(2))
//     }
    
//     const weightedTotal = filteredRows.reduce((sum, row) => {
//       const kgs = parseFloat(row.getValue('kgs')) || 0
//       const columnValue = parseFloat(row.getValue(columnId)) || 0
//       return sum + (kgs * columnValue)
//     }, 0)
    
//     const average = totalKGS > 0 ? (weightedTotal / totalKGS).toFixed(2) : 0
//     return average != 'NaN' ? formatNumber(average) : ''
//   }

//   // Common cell width classes
//   const getCellWidthClass = (columnId) => {
//     if (columnId === 'material') return 'min-w-[180px] lg:min-w-[280px]'
//     if (columnId === 'kgs') return 'min-w-[100px] lg:min-w-[120px]'
//     return 'min-w-[80px] lg:min-w-[90px]'
//   }

//   // Common cell background classes
//   const getCellBgClass = (columnId) => {
//     const isMaterialOrKgs = columnId === 'material' || columnId === 'kgs'
//     if (isMaterialOrKgs) return 'bg-[var(--rock-blue)]/50'
//     return 'bg-white'
//   }

//   // Common text alignment classes
//   const getTextAlignClass = (columnId) => {
//     return columnId === 'material' ? 'text-left' : 'text-right'
//   }

//   return (
//     <div className="flex flex-col relative pt-4 sm:pt-7 w-full">
//       {/* Header with controls */}
//       {showHeader && (
//         <div className="w-full mb-4">
//           <Header 
//             globalFilter={globalFilter} 
//             setGlobalFilter={setGlobalFilter}
//             table={table} 
//             excellReport={excellReport}
//             type='mTable'
//             addMaterial={addMaterial}
//             delTable={delTable}
//             table1={table1}
//             runPdf={runPdf}
//           />
//         </div>
//       )}

//       {/* Desktop Table View - Hidden on mobile */}
//       <div className="hidden sm:block overflow-x-auto border-x border-[var(--selago)] md:max-h-[310px] lg:max-h-[450px] 2xl:max-h-[550px]">
//         <table className="table-cell-uniform w-full min-w-full">
//           {/* THEAD - Header Row */}
//           <thead className="divide-y divide-[var(--selago)] sticky top-0 z-10">
//             {table.getHeaderGroups().map(hdGroup => (
//               <tr 
//                 key={hdGroup.id} 
//                 className='border border-b-[var(--endeavour)] bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)]'
//               >
//                 {hdGroup.headers.map(header => {
//                   const isMaterialOrKgs = header.id === 'material' || header.id === 'kgs'
//                   const isMaterial = header.id === 'material'
                  
//                   return (
//                     <th 
//                       key={header.id}
//                       className={`relative px-3 py-2 text-xs lg:text-sm text-white whitespace-nowrap font-bold
//                         ${isMaterialOrKgs ? 'bg-[var(--chathams-blue)]' : 'bg-[var(--endeavour)]/80'}
//                         ${getCellWidthClass(header.id)}
//                         ${getTextAlignClass(header.id)}
//                         ${isMaterial ? 'material-col' : ''}
//                       `}
//                     >
//                       {header.column.getCanSort() ? (
//                         <div 
//                           onClick={header.column.getToggleSortingHandler()} 
//                           className={`cursor-pointer flex items-center gap-1 ${isMaterial ? 'justify-start' : 'justify-end'}`}
//                           role="button"
//                           aria-label={`Sort by ${header.column.columnDef.header}`}
//                         >
//                           {header.column.columnDef.header}
//                           {
//                             {
//                               asc: <TbSortAscending className="text-white scale-110 lg:scale-125" />,
//                               desc: <TbSortDescending className="text-white scale-110 lg:scale-125" />
//                             }[header.column.getIsSorted()]
//                           }
//                         </div>
//                       ) : (
//                         <span className="text-xs py-1 font-bold text-white">
//                           {header.column.columnDef.header}
//                         </span>
//                       )}
//                       {header.column.getCanFilter() && (
//                         <div>
//                           <Filter column={header.column} table={table} filterOn={filterOn} />
//                         </div>
//                       )}
//                     </th>
//                   )
//                 })}
//               </tr>
//             ))}
//           </thead>
          
//           {/* TBODY - Data Rows */}
//           <tbody className="divide-y divide-[var(--selago)]">
//             {table.getRowModel().rows.map(row => (
//               <tr
//                 key={row.id}
//                 className="cursor-pointer hover:bg-[var(--selago)]/30 transition-colors"
//               >
//                 {row.getVisibleCells().map(cell => {
//                   const isMaterialOrKgs = cell.column.id === 'material' || cell.column.id === 'kgs'
//                   const isMaterial = cell.column.id === 'material'
//                   const isDel = cell.column.id === 'del'
                  
//                   return (
//                     <td 
//                       key={cell.id} 
//                       data-label={cell.column.columnDef.header}
//                       className={`table_cell px-2 py-1 text-xs lg:text-sm
//                         ${getCellBgClass(cell.column.id)}
//                         ${getCellWidthClass(cell.column.id)}
//                         ${getTextAlignClass(cell.column.id)}
//                         ${isMaterial ? 'material-col' : ''}
//                       `}
//                     >
//                       {!isDel ? (
//                           <input
//                             type={isMaterialOrKgs ? 'text' : 'number'}
//                             className={`w-full h-8 px-2 border-none font-bold text-[var(--port-gore)] material-input
//                               ${getCellBgClass(cell.column.id)}
//                               ${getTextAlignClass(cell.column.id)}
//                             `}
//                             onChange={(e) => editCell(table1, e, cell)}
//                             value={
//                               cell.column.id === 'kgs' 
//                                 ? formatNumber(cell.getContext().getValue()) 
//                                 : cell.getContext().getValue()
//                             }
//                             aria-label={`Edit ${cell.column.columnDef.header}`}
//                           />
//                       ) : (
//                         <div className="flex justify-center items-center h-8">
//                           <button
//                             onClick={() => delMaterial(table1, cell)}
//                             className="text-[var(--endeavour)] cursor-pointer hover:scale-110 transition-transform p-1"
//                             aria-label="Delete material"
//                           >
//                             <MdDeleteOutline className="scale-150 lg:scale-[1.8]" />
//                           </button>
//                         </div>
//                       )}
//                     </td>
//                   )
//                 })}
//               </tr>
//             ))}
//           </tbody>
          
//           {/* TFOOT - Footer Totals */}
//           {showFooter && (
//             <tfoot className="bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)] sticky bottom-0">
//               <tr className="border border-y-[var(--endeavour)]">
//                 {table.getHeaderGroups()[0].headers.map((header) => {
//                   const isKgs = header.id === 'kgs'
//                   const isMaterial = header.id === 'material'
                  
//                   return (
//                     <td 
//                       key={header.id} 
//                       className={`px-3 py-2 text-xs lg:text-sm text-white whitespace-nowrap font-bold
//                         ${isMaterial ? 'font-normal text-left' : 'text-right'}
//                         ${isKgs ? 'bg-[var(--chathams-blue)] border border-y-[var(--endeavour)]' : ''}
//                         ${!isMaterial && !isKgs ? 'bg-[var(--endeavour)]/80' : ''}
//                         ${getCellWidthClass(header.id)}
//                       `}
//                     >
//                       {calculateFooterTotals(header)}
//                     </td>
//                   )
//                 })}
//               </tr>
//             </tfoot>
//           )}
//         </table>
//       </div>

//       {/* Mobile Card View - Visible only on mobile */}
//       <div className="sm:hidden space-y-3 mt-4">
//         {table.getRowModel().rows.map(row => (
//           <div 
//             key={row.id} 
//             className="bg-white border border-[var(--selago)] rounded-lg shadow-sm overflow-hidden"
//           >
//             {row.getVisibleCells().map(cell => {
//               const isDel = cell.column.id === 'del'
//               const isMaterialOrKgs = cell.column.id === 'material' || cell.column.id === 'kgs'
//               const isMaterial = cell.column.id === 'material'
              
//               if (isDel) {
//                 return (
//                   <div key={cell.id} className="p-3 border-t border-[var(--selago)] bg-red-50 flex justify-between items-center">
//                     <span className="text-sm font-semibold text-gray-700">Actions</span>
//                     <button
//                       onClick={() => delMaterial(table1, cell)}
//                       className="text-[var(--endeavour)] hover:bg-[var(--rock-blue)]/20 p-2 rounded-lg transition-colors"
//                       aria-label="Delete material"
//                     >
//                       <MdDeleteOutline className="scale-150" />
//                     </button>
//                   </div>
//                 )
//               }
              
//               return (
//                 <div 
//                   key={cell.id} 
//                   className={`p-3 border-t first:border-t-0 border-[var(--selago)] flex flex-col gap-2
//                     ${isMaterialOrKgs ? 'bg-[var(--rock-blue)]/10' : 'bg-white'}
//                   `}
//                 >
//                   <label className="text-sm font-semibold text-gray-700">
//                     {cell.column.columnDef.header}
//                   </label>
//                   <input
//                     type={isMaterialOrKgs ? 'text' : 'number'}
//                     className={`w-full px-3 py-2 border border-[var(--selago)] rounded-md text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[var(--endeavour)] focus:border-transparent
//                       ${isMaterialOrKgs ? 'bg-[var(--rock-blue)]/10' : 'bg-white'}
//                       ${getTextAlignClass(cell.column.id)} material-input
//                     `}
//                     onChange={(e) => editCell(table1, e, cell)}
//                     value={
//                       cell.column.id === 'kgs' 
//                         ? formatNumber(cell.getContext().getValue()) 
//                         : cell.getContext().getValue()
//                     }
//                     aria-label={`Edit ${cell.column.columnDef.header}`}
//                   />
//                 </div>
//               )
//             })}
//           </div>
//         ))}
        
//         {/* Mobile Footer Summary */}
//         {showFooter && (
//           <div className="bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)] rounded-lg p-4 space-y-2 shadow-lg">
//             <h3 className="text-white font-bold text-sm mb-3">Summary</h3>
//             {table.getHeaderGroups()[0].headers
//               .filter(header => header.id !== 'del')
//               .map((header) => {
//                 const isMaterial = header.id === 'material'
//                 return (
//                   <div key={header.id} className="flex justify-between items-center text-white text-xs py-1">
//                     <span className="font-medium">{header.column.columnDef.header}:</span>
//                     <span className={`font-bold ${getTextAlignClass(header.id)}`}>
//                       {calculateFooterTotals(header)}
//                     </span>
//                   </div>
//                 )
//               })}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Customtable;
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

  // Utility function to format numbers with commas
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

  // Calculate footer totals
  const calculateFooterTotals = (header) => {
    const columnId = header.id
    
    if (columnId === 'del') return ''
    
    const filteredRows = table.getFilteredRowModel().rows
    
    if (columnId === 'material') {
      return `${filteredRows.length} items`
    }
    
    const totalKGS = filteredRows.reduce((sum, row) => {
      return sum + (parseFloat(row.getValue('kgs')) || 0)
    }, 0)
    
    if (columnId === 'kgs') {
      return formatNumber(totalKGS.toFixed(2))
    }
    
    const weightedTotal = filteredRows.reduce((sum, row) => {
      const kgs = parseFloat(row.getValue('kgs')) || 0
      const columnValue = parseFloat(row.getValue(columnId)) || 0
      return sum + (kgs * columnValue)
    }, 0)
    
    const average = totalKGS > 0 ? (weightedTotal / totalKGS).toFixed(2) : 0
    return average != 'NaN' ? formatNumber(average) : ''
  }

  // Common cell width classes
  const getCellWidthClass = (columnId) => {
    if (columnId === 'material') return 'min-w-[120px] lg:min-w-[150px]'
    if (columnId === 'kgs') return 'min-w-[100px] lg:min-w-[120px]'
    return 'min-w-[80px] lg:min-w-[90px]'
  }

  // Common cell background classes
  const getCellBgClass = (columnId) => {
    const isMaterialOrKgs = columnId === 'material' || columnId === 'kgs'
    if (isMaterialOrKgs) return 'bg-white'
    return 'bg-white'
  }

  // Common text alignment classes
  const getTextAlignClass = (columnId) => {
    return columnId === 'material' ? 'text-left' : 'text-center'
  }

  return (
    <div className="flex flex-col w-full px-4 py-6 ">
      {/* Header with controls */}
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

      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden sm:block overflow-hidden rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] ">
        <div className="overflow-x-auto" style={{ maxHeight: 'calc(100vh - 250px)' }}>
          <table className="w-full min-w-full border-collapse">
            {/* THEAD - Header Row */}
            <thead className="sticky top-0 z-10">
              {table.getHeaderGroups().map(hdGroup => (
                <tr 
                  key={hdGroup.id} 
                  className='bg-[#2563eb]'
                >
                  {hdGroup.headers.map((header, idx) => {
                    const isMaterialOrKgs = header.id === 'material' || header.id === 'kgs'
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
                            role="button"
                            aria-label={`Sort by ${header.column.columnDef.header}`}
                          >
                            {header.column.columnDef.header}
                            {
                              {
                                asc: <TbSortAscending className="text-white w-4 h-4" />,
                                desc: <TbSortDescending className="text-white w-4 h-4" />
                              }[header.column.getIsSorted()]
                            }
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
            
            {/* TBODY - Data Rows */}
            <tbody className="bg-white">
              {table.getRowModel().rows.map((row, rowIdx) => (
                <tr
                  key={row.id}
                  className={`cursor-pointer hover:bg-[#f8fafb] transition-colors duration-100
                    ${rowIdx !== table.getRowModel().rows.length - 1 ? 'border-b border-gray-100' : ''}
                  `}
                >
                  {row.getVisibleCells().map(cell => {
                    const isMaterialOrKgs = cell.column.id === 'material' || cell.column.id === 'kgs'
                    const isMaterial = cell.column.id === 'material'
                    const isDel = cell.column.id === 'del'
                    
                    return (
                      <td 
                        key={cell.id} 
                        data-label={cell.column.columnDef.header}
                        className={`px-3 py-2.5 text-[13px]
                          ${getCellBgClass(cell.column.id)}
                          ${getCellWidthClass(cell.column.id)}
                          ${getTextAlignClass(cell.column.id)}
                        `}
                      >
                        {!isDel ? (
                          <input
                            type={isMaterialOrKgs ? 'text' : 'number'}
                            className={`w-full px-2 py-1.5 border-none bg-[#ECF3FC] rounded-lg shadow-md shadow-gray-500  text-[13px] font-normal text-gray-700 focus:outline-none focus:ring-0 bg-transparent
                              ${getTextAlignClass(cell.column.id)}
                            `}
                            onChange={(e) => editCell(table1, e, cell)}
                            value={
                              cell.column.id === 'kgs' 
                                ? formatNumber(cell.getContext().getValue()) 
                                : cell.getContext().getValue()
                            }
                            aria-label={`Edit ${cell.column.columnDef.header}`}
                          />
                        ) : (
                          <div className="flex justify-center items-center px-2 py-1.5 bg-[#ECF3FC] rounded-lg shadow-md">
                            <button
                              onClick={() => delMaterial(table1, cell)}
                              className="text-gray-700  cursor-pointer hover:text-gray-400 transition-colors duration-150"
                              aria-label="Delete material"
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
                    const isKgs = header.id === 'kgs'
                    const isMaterial = header.id === 'material'
                    const isFirst = idx === 0
                    const isLast = idx === table.getHeaderGroups()[0].headers.length - 1
                    
                    return (
                      <td 
                        key={header.id} 
                        className={`px-3 py-3 text-[13px]   text-white whitespace-nowrap font-bold
                          ${isMaterial ? 'font-normal text-left' : 'text-center'}
                          ${getCellWidthClass(header.id)}
                          ${isFirst ? 'rounded-bl-xl' : ''}
                          ${isLast ? 'rounded-br-xl' : ''}
                        `}
                      >
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

      {/* Mobile Card View - Visible only on mobile */}
      <div className="sm:hidden space-y-4">
        {table.getRowModel().rows.map(row => (
          <div 
            key={row.id} 
            className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden"
          >
            {row.getVisibleCells().map(cell => {
              const isDel = cell.column.id === 'del'
              const isMaterialOrKgs = cell.column.id === 'material' || cell.column.id === 'kgs'
              const isMaterial = cell.column.id === 'material'
              
              if (isDel) {
                return (
                  <div key={cell.id} className="p-4 border-t border-gray-200 bg-red-50 flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-700">Actions</span>
                    <button
                      onClick={() => delMaterial(table1, cell)}
                      className="text-gray-400 hover:text-red-500 hover:bg-red-100 p-2 rounded-lg transition-all duration-200"
                      aria-label="Delete material"
                    >
                      <MdDeleteOutline className="w-6 h-6" />
                    </button>
                  </div>
                )
              }
              
              return (
                <div 
                  key={cell.id} 
                  className={`p-4 border-t first:border-t-0 border-gray-200 flex flex-col gap-2 shadow-lg
                    ${isMaterialOrKgs ? 'bg-white' : 'bg-white'}
                  `}
                >
                  <label className="text-sm font-semibold text-gray-700">
                    {cell.column.columnDef.header}
                  </label>
                  <input
                    type={isMaterialOrKgs ? 'text' : 'number'}
                    className={`w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200
                      ${isMaterialOrKgs ? 'bg-white' : 'bg-white'}
                      ${getTextAlignClass(cell.column.id)}
                    `}
                    onChange={(e) => editCell(table1, e, cell)}
                    value={
                      cell.column.id === 'kgs' 
                        ? formatNumber(cell.getContext().getValue()) 
                        : cell.getContext().getValue()
                    }
                    aria-label={`Edit ${cell.column.columnDef.header}`}
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
              .map((header) => {
                const isMaterial = header.id === 'material'
                return (
                  <div key={header.id} className="flex justify-between items-center text-white text-sm py-1">
                    <span className="font-medium">{header.column.columnDef.header}:</span>
                    <span className={`font-semibold ${getTextAlignClass(header.id)}`}>
                      {calculateFooterTotals(header)}
                    </span>
                  </div>
                )
              })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Customtable;
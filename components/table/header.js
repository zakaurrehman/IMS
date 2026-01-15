
'use client';

import { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import ColFilter from "./ColumnsFilter";
import { getTtl } from '../../utils/languages';
import { SettingsContext } from "../../contexts/useSettingsContext";
import { usePathname } from 'next/navigation'
import { GrAddCircle } from "react-icons/gr";
import Image from 'next/image';
import Tltip from "../../components/tlTip";
import { MdDeleteOutline } from "react-icons/md";
import { GrDocumentPdf } from "react-icons/gr";
import QuickSumControl from './quicksum/QuickSumControl';

const Header = ({ 
  data, 
  cb, 
  cb1, 
  type, 
  excellReport,
  globalFilter, 
  setGlobalFilter, 
  table, 
  filterIcon, 
  resetFilterTable, 
  addMaterial, 
  delTable, 
  table1, 
  runPdf,
  tableModes, 
  datattl,
  isEditMode,
  setIsEditMode, 
  quickSumEnabled = false,
  setQuickSumEnabled = () => {},
  quickSumColumns = [],
  setQuickSumColumns = () => {},
}) => {

  const { ln } = useContext(SettingsContext);
  const pathname = usePathname()
  
  const editEnabledRoutes = [
    '/invoices',
    '/expenses',
    '/accounting',
    '/contracts',
  ];

  const showEditButton = editEnabledRoutes.some(route =>
    pathname.startsWith(route)
  );

  return (
    <div className="flex justify-between items-center p-2 flex-wrap gap-2 sticky top-0  bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
      
      {/* Left Section - Search & Callback */}
      <div className='flex items-center gap-2 w-full sm:w-auto'>
        {pathname !== '/accounting' && (
          <div className="flex items-center relative w-auto min-w-[100px] sm:min-w-[140px] md:w-48 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all bg-white">
            <input
              className="bg-transparent border-0 shadow-none pr-7 pl-2.5 focus:outline-none focus:ring-0 w-full text-gray-700 placeholder:text-gray-400 h-7"
              placeholder={getTtl('Search', ln)}
              value={globalFilter ?? ''}
              onChange={e => setGlobalFilter(e.target.value)}
              type='text'
              style={{ fontSize: 'clamp(9px, 0.8vw, 11px)' }}
            />

            {globalFilter === '' ? (
              <FaSearch className="text-gray-400 absolute right-2.5" style={{ fontSize: 'clamp(9px, 0.8vw, 11px)' }} />
            ) : (
              <TiDeleteOutline 
                className="text-gray-500 absolute right-2.5 cursor-pointer hover:text-red-500 transition-colors" 
                onClick={() => setGlobalFilter('')}
                style={{ fontSize: 'clamp(10px, 0.9vw, 12px)' }}
              />
            )}
          </div>
        )}
        
        {cb && (
          <div className={`${
            type === 'stock' ? 'max-w-[14rem]' :
            (type === 'analysis' || type === 'accstatement') ? 'lg:w-[18em]' : 'w-[7rem]'
          }`} style={{ fontSize: 'clamp(9px, 0.8vw, 11px)' }}>
            {cb}
          </div>
        )}
      </div>

      {/* Right Section - Actions */}
      <div className='flex items-center justify-end flex-wrap gap-1.5'>
        
        {/* Material Table Actions */}
        {type === 'mTable' && (
          <div className='flex items-center gap-1'>
            <Tltip direction='bottom' tltpText='Add new material'>
              <button
                onClick={addMaterial}
                className="hover:bg-blue-50 text-gray-600 inline-flex items-center rounded-lg p-1.5 hover:shadow-sm focus:outline-none transition-all border border-transparent hover:border-blue-200"
              >
                <GrAddCircle className="cursor-pointer hover:text-blue-600 transition-colors" style={{ fontSize: 'clamp(11px, 1vw, 13px)' }} />
              </button>
            </Tltip>
            
            <Tltip direction='bottom' tltpText='Export to PDF'>
              <button
                onClick={() => runPdf(table1)}
                className="hover:bg-blue-50 text-gray-600 inline-flex items-center rounded-lg p-1.5 hover:shadow-sm focus:outline-none transition-all border border-transparent hover:border-blue-200"
              >
                <GrDocumentPdf className="cursor-pointer hover:text-blue-600 transition-colors" style={{ fontSize: 'clamp(11px, 1vw, 13px)' }} />
              </button>
            </Tltip>

            <Tltip direction='bottom' tltpText='Delete Table'>
              <button
                onClick={() => delTable(table1)}
                className="hover:bg-red-50 text-gray-600 inline-flex items-center rounded-lg p-1.5 hover:shadow-sm focus:outline-none transition-all border border-transparent hover:border-red-200"
              >
                <MdDeleteOutline className="cursor-pointer hover:text-red-600 transition-colors" style={{ fontSize: 'clamp(11px, 1vw, 13px)' }} />
              </button>
            </Tltip>
          </div>
        )}

        {/* Contract Statement Table Modes */}
        {type === 'contractStatementTableModes' && tableModes}

        {/* Filter Controls */}
        <div className="flex items-center gap-1">
          {resetFilterTable}
          {filterIcon}
          {excellReport}
          <ColFilter table={table} />
        </div>

        {/* Edit Mode Toggle */}
        {showEditButton && typeof setIsEditMode === 'function' && (
          <button
            onClick={() => setIsEditMode(prev => !prev)}
            className={`
              px-2 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 border h-7
              ${isEditMode
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-700 shadow-sm'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'}
            `}
            style={{ fontSize: 'clamp(9px, 0.8vw, 11px)' }}
            title={isEditMode ? 'Editing ON' : 'Edit'}
          >
            <Image src="/logo/edit.svg" alt="Edit" width={22} height={22} className="scale-[1.4] inline-block align-middle" />
          </button>
        )}

        {/* Quick Sum Control */}
        <div className="border border-gray-200 rounded-lg px-1.5 py-1 flex items-center h-7 bg-white hover:border-gray-300 transition-colors">
          <QuickSumControl
            table={table}
            enabled={quickSumEnabled}
            setEnabled={setQuickSumEnabled}
            selectedColumnIds={quickSumColumns}
            setSelectedColumnIds={setQuickSumColumns}
          />
        </div>
      </div>
    </div>
  )
}

export default Header;
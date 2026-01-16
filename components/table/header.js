
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
    <div className="flex justify-between items-center p-3 flex-wrap gap-3 sticky top-0 z-20 bg-gradient-to-r from-indigo-200 via-purple-100 to-pink-100 shadow-lg rounded-2xl border-0 backdrop-blur-[2px]">
      
      {/* Left Section - Search & Callback */}
      <div className='flex items-center gap-3 w-full sm:w-auto'>
        {pathname !== '/accounting' && (
          <div className="flex items-center relative w-auto min-w-[120px] sm:min-w-[160px] md:w-56 border-0 rounded-xl bg-gradient-to-r from-white via-indigo-50 to-purple-50 shadow focus-within:ring-2 focus-within:ring-indigo-300 transition-all">
            <input
              className="bg-transparent border-0 shadow-none pr-8 pl-3 focus:outline-none focus:ring-0 w-full text-indigo-900 placeholder:text-indigo-400 h-8 text-[13px]"
              placeholder={getTtl('Search', ln)}
              value={globalFilter ?? ''}
              onChange={e => setGlobalFilter(e.target.value)}
              type='text'
              style={{ fontSize: 'clamp(11px, 1vw, 14px)' }}
            />
            {globalFilter === '' ? (
              <FaSearch className="text-indigo-300 absolute right-3 top-2.5" style={{ fontSize: 'clamp(12px, 1vw, 15px)' }} />
            ) : (
              <TiDeleteOutline 
                className="text-indigo-400 absolute right-3 top-2.5 cursor-pointer hover:text-pink-500 transition-colors" 
                onClick={() => setGlobalFilter('')}
                style={{ fontSize: 'clamp(13px, 1vw, 16px)' }}
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
      <div className='flex items-center justify-end flex-wrap gap-2'>
        
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


        {/* Filter Controls + Chat Button */}
        <div className="flex items-center gap-1">
          {resetFilterTable}
          {filterIcon}
          {excellReport}
          <ColFilter table={table} />
          {/* Chat Button */}
          <Tltip direction="bottom" tltpText={getTtl('Ask question', ln) || 'Ask question'}>
            <div
              onClick={() => {
                if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('ims:openChat'));
              }}
              className="justify-center size-10 inline-flex items-center text-sm rounded-full focus:outline-none cursor-pointer"
              style={{ fontSize: 'clamp(13px, 1vw, 16px)' }}
              aria-label={getTtl('Ask question', ln) || 'Ask question'}
              title={getTtl('Ask question', ln) || 'Ask question'}
            >
              <Image src="/logo/chat.svg" alt="Chat" width={32} height={32} className="w-8 h-8 object-cover inline-block align-middle" priority />
            </div>
          </Tltip>
        </div>

        {/* Edit Mode Toggle */}
        {showEditButton && typeof setIsEditMode === 'function' && (
          <Tltip direction="bottom" tltpText={isEditMode ? 'Editing ON' : 'Edit'}>
            <div
              onClick={() => setIsEditMode(prev => !prev)}
              className="justify-center size-10 inline-flex items-center text-sm rounded-full focus:outline-none cursor-pointer"
              style={{ fontSize: 'clamp(13px, 1vw, 16px)' }}
              title={isEditMode ? 'Editing ON' : 'Edit'}
            >
              <Image src="/logo/edit.svg" alt="Edit" width={32} height={32} className="w-8 h-8 object-cover inline-block align-middle" priority />
            </div>
          </Tltip>
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
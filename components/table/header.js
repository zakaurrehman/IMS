'use client';

import { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import ColFilter from "./ColumnsFilter";
import { getTtl } from '../../utils/languages';
import { SettingsContext } from "../../contexts/useSettingsContext";
import { usePathname } from 'next/navigation'
import { GrAddCircle } from "react-icons/gr";
import Tltip from "../../components/tlTip";
import { MdDeleteOutline } from "react-icons/md";
import { GrDocumentPdf } from "react-icons/gr";
import QuickSumControl from './quicksum/QuickSumControl';



const Header = ({ data, cb, cb1, type, excellReport,
	globalFilter, setGlobalFilter, table, filterIcon, resetFilterTable, addMaterial, delTable, table1, runPdf,
	 tableModes, datattl ,isEditMode,
  setIsEditMode, quickSumEnabled = false,
  setQuickSumEnabled = () => {},
  quickSumColumns = [],
  setQuickSumColumns = () => {},}) => {

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
		<div className="justify-between flex p-1.5 flex-wrap rounded-t-xl sticky top-0 shadow-sm" style={{ position: 'sticky', top: 0,  background: '#ffffff' }}>
			<div className='flex items-center gap-3 w-full sm:w-auto'>
				{pathname !== '/accounting' &&
					<div className="flex items-center relative w-auto md:w-20">
						<input
							className="bg-white border-0 shadow-none pr-6 focus:outline-none focus:ring-0 focus:border-0 w-full text-[0.65rem] py-0.5 text-[var(--port-gore)] placeholder:text-[var(--port-gore)]"
							placeholder={getTtl('Search', ln)}
							value={globalFilter ?? ''}
							onChange={e => setGlobalFilter(e.target.value)}
							type='text'
						/>

						{globalFilter === '' ?
							<FaSearch className="text-[var(--port-gore)] absolute right-1 text-[0.6rem]" />
							:
							<TiDeleteOutline className="text-[var(--port-gore)] absolute right-1 cursor-pointer text-[0.65rem] hover:text-[var(--endeavour)]"
								onClick={() => setGlobalFilter('')} />
						}

					</div>
				}
				<div className={`${type === 'stock' ? 'max-w-[14rem]' :
					(type === 'analysis' || type === 'accstatement') ? 'lg:w-[18em]' : 'w-[7rem]'}`}>
					{cb}
				</div>

			</div>

			<div className='self-center justify-content flex'>
				<div className="flex items-center justify-center space-x-1 flex-wrap">
					{/* {type === 'stock' &&
						<div className='flex items-center gap-1'>
							<p className='text-[0.85rem] font-medium text-gray-500'>{getTtl('Weight', ln)}:</p>
							<div className='w-[10rem]'>{cb1}</div>
						</div>
					} */}
					{type === 'mTable' &&
						<div className='flex items-center '>
							<Tltip direction='bottom' tltpText='Add new material'>
								<div onClick={addMaterial}
									className="hover:bg-[var(--selago)] text-[var(--port-gore)] inline-flex items-center text-xs rounded-full p-1 hover:drop-shadow-sm focus:outline-none transition-colors"
								>
									<GrAddCircle className="cursor-pointer text-[var(--port-gore)] text-xs hover:text-[var(--endeavour)]" />
								</div>
							</Tltip>
							<Tltip direction='bottom' tltpText='Export to PDF'>
								<div onClick={() => runPdf(table1)}
									className="hover:bg-[var(--selago)] text-[var(--port-gore)] inline-flex items-center text-xs rounded-full p-1 hover:drop-shadow-sm focus:outline-none transition-colors"
								>
									<GrDocumentPdf className="cursor-pointer text-[var(--port-gore)] text-xs hover:text-[var(--endeavour)]" />
								</div>
							</Tltip>

							<Tltip direction='bottom' tltpText='Delete Table'>
								<div onClick={() => delTable(table1)}
									className="hover:bg-[var(--selago)] text-[var(--port-gore)] inline-flex items-center text-xs rounded-full p-1 hover:drop-shadow-sm focus:outline-none transition-colors"
								>
									<MdDeleteOutline className="cursor-pointer text-[var(--port-gore)] text-xs hover:text-[var(--endeavour)]" />
								</div>

							</Tltip>



						</div>
					}

					{type === 'contractStatementTableModes' && tableModes}

					{resetFilterTable}
					{filterIcon}
					{excellReport}
					<ColFilter table={table} />
										{showEditButton && typeof setIsEditMode === 'function' && (
	<button
		onClick={() => setIsEditMode(prev => !prev)}
		className={`px-1.5 py-0.5 rounded-md text-[0.6rem] font-medium transition-all flex items-center
			${isEditMode
				? 'bg-[var(--endeavour)] text-white'
				: 'bg-white text-[var(--port-gore)] hover:bg-[var(--selago)]'}
		`}
	>
		 {isEditMode ? 'Editing ON' : 'Edit'}
	</button>
)}
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

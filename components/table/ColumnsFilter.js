import { HiMiniViewColumns } from 'react-icons/hi2';
import ChkBox from '../../components/checkbox.js'
import { useState } from 'react';
import Tooltip from '../../components/tooltip';
import { useContext } from 'react';
import { SettingsContext } from "../../contexts/useSettingsContext";
import { getTtl } from '../../utils/languages';
import Tltip from '../../components/tlTip';


const ColFilter = ({ table }) => {

	const [open, setOpen] = useState(false)
	const { ln } = useContext(SettingsContext);


	return (
		<div className="relative">
			<Tltip direction='bottom' tltpText={getTtl('Columns', ln)}>
				<div onClick={() => setOpen(!open)}
					className="hover:bg-[var(--selago)] text-[var(--port-gore)] justify-center w-10 h-10 inline-flex
				 items-center text-sm rounded-full hover:drop-shadow-md focus:outline-none z-50 transition-colors"
				>
					<HiMiniViewColumns className="scale-[1.4] text-[var(--endeavour)]" />
				</div>
			</Tltip>

			{open &&
				<div className="md:right-0 absolute z-10 mt-3 transform px-2 sm:px-0 z-20">
					<div className="overflow-auto max-h-96 2xl:max-h-full 2xl:overflow-hidden rounded-xl 
					shadow-lg bg-white py-4 px-2 w-full border border-[var(--selago)]">
						<div className='pb-1 text-sm pl-2 text-[var(--port-gore)] font-medium'>{getTtl('Columns', ln)}</div>
						<div>
							{
								table.getAllColumns().filter(column => column.getCanHide()).map(col => {
									return (
										<div key={col.id}
											onClick={col.columnDef.accessorKey !==
												'expander' ? col.getToggleVisibilityHandler() : () => { }
											}
											className='whitespace-nowrap text-left py-2 items-center flex hover:bg-[var(--selago)]/50 w-full rounded-lg px-2 cursor-pointer transition-colors'>
											<ChkBox checked={col.getIsVisible()} size='h-5 w-5'
												onChange={col.columnDef.accessorKey !==
													'expander' ? col.getToggleVisibilityHandler() : () => { }} />
											<span className='ml-2 text-xs text-[var(--port-gore)]'>{col.columnDef.header} </span>
										</div>
									)
								})
							}
						</div>
					</div>
				</div>
			}

			{open ? (<div className='fixed top-0 right-0 bottom-0 left-0' onClick={() => setOpen(false)} />) : null}
		</div>

	);

};

export default ColFilter;

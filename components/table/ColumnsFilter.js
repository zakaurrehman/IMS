"use client"
import { HiMiniViewColumns } from 'react-icons/hi2';
import ChkBox from '../../components/checkbox.js'
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Tooltip from '../../components/tooltip';
import { useContext } from 'react';
import { SettingsContext } from "../../contexts/useSettingsContext";
import { getTtl } from '../../utils/languages';
import Tltip from '../../components/tlTip';


const ColFilter = ({ table }) => {

	const [open, setOpen] = useState(false)
	const { ln } = useContext(SettingsContext);
	const portalNodeRef = useRef(null)
	const triggerRef = useRef(null)
    const dropdownRef = useRef(null)
    const [dropdownStyle, setDropdownStyle] = useState({ position: 'absolute', top: 0, left: 0 })

	useEffect(() => {
		// create portal node
		const node = document.createElement('div')
		node.setAttribute('id', 'columns-filter-portal')
		portalNodeRef.current = node
		document.body.appendChild(node)
		return () => {
			const node = portalNodeRef.current
			if (node) {
				if (node.parentNode) node.parentNode.removeChild(node)
				portalNodeRef.current = null
			}
		}
	}, [])

	useEffect(() => {
		if (!open) return;
		const updatePos = () => {
			const trig = triggerRef.current;
			const dd = dropdownRef.current;
			if (!trig || !dd) return;
			const rect = trig.getBoundingClientRect();
			const ddWidth = dd.offsetWidth || 288; // w-72 => 288px
			const ddHeight = dd.offsetHeight || 300;
			const margin = 12; // larger margin for desktop
			const desktopOffset = 16; // space between trigger and dropdown on desktop

			const isDesktop = window.innerWidth >= 768; // md breakpoint
			if (isDesktop) {
				let top = rect.bottom + desktopOffset + window.scrollY;
				let left = rect.right - ddWidth + window.scrollX;
				const maxLeft = window.innerWidth - ddWidth - margin + window.scrollX;
				if (left > maxLeft) left = maxLeft;
				if (left < margin + window.scrollX) left = margin + window.scrollX;

				// avoid bottom overflow - try place above if needed
				const bottomOverflow = top + ddHeight - (window.innerHeight + window.scrollY);
				if (bottomOverflow > 0) {
					const aboveTop = rect.top - ddHeight - desktopOffset + window.scrollY;
					if (aboveTop >= margin + window.scrollY) top = aboveTop;
					else top = Math.max(margin + window.scrollY, top - bottomOverflow);
				}

				setDropdownStyle({ position: 'absolute', top: Math.round(top) + 'px', left: Math.round(left) + 'px', zIndex: 9999, minWidth: ddWidth + 'px' });
			} else {
				// Mobile/tablet: fallback to fixed top/right like before
				const topFixed = 64; // matches previous top-16 (64px)
				setDropdownStyle({ position: 'fixed', top: topFixed + 'px', right: '16px', zIndex: 9999, minWidth: ddWidth + 'px' });
			}
		}

		// measure after render
		const raf = requestAnimationFrame(updatePos);
		const onResize = () => requestAnimationFrame(updatePos);
		window.addEventListener('resize', onResize);
		window.addEventListener('scroll', onResize, true);

		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('resize', onResize);
			window.removeEventListener('scroll', onResize, true);
		}
	}, [open])

	const DropdownContent = (
		<div ref={dropdownRef} style={dropdownStyle} className="md:w-72 md:max-h-[70vh] overflow-auto max-h-96 2xl:max-h-full 2xl:overflow-hidden rounded-xl shadow-lg bg-white py-4 px-2 w-72 border border-[var(--selago)]" aria-hidden={open ? 'false' : 'true'}>
			<div className='pb-1 text-sm pl-2 text-[var(--port-gore)] font-medium'>{getTtl('Columns', ln)}</div>
			<div>
				{
					table.getAllColumns().filter(column => column.getCanHide()).map(col => {
						return (
							<div key={col.id}
								onClick={col.columnDef.accessorKey !== 'expander' ? col.getToggleVisibilityHandler() : () => { }}
								className='whitespace-nowrap text-left py-2 items-center flex hover:bg-[var(--selago)]/50 w-full rounded-lg px-2 cursor-pointer transition-colors'>
								<ChkBox checked={col.getIsVisible()} size='h-5 w-5'
									onChange={col.columnDef.accessorKey !== 'expander' ? col.getToggleVisibilityHandler() : () => { }} />
								<span className='ml-2 text-xs text-[var(--port-gore)]'>{col.columnDef.header} </span>
							</div>
						)
					})
				}
			</div>
		</div>
	)

	return (
		<div className="relative">
			<Tltip direction='bottom' tltpText={getTtl('Columns', ln)}>
				<div ref={triggerRef} onClick={() => setOpen(!open)}
					className="hover:bg-[var(--selago)] text-[var(--port-gore)] justify-center w-10 h-10 inline-flex items-center text-sm rounded-full hover:drop-shadow-md focus:outline-none z-50 transition-colors"
				>
					<HiMiniViewColumns className="scale-[1.4] text-[var(--endeavour)]" />
				</div>
			</Tltip>

			{open && portalNodeRef.current ? createPortal(
				<>
					{DropdownContent}
					<div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, zIndex: 9998 }} onClick={() => setOpen(false)} />
				</>,
				portalNodeRef.current
			) : null}
		</div>

	);

};

export default ColFilter;

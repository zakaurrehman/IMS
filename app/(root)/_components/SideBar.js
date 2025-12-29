// "use client";
// import { FaAngleLeft } from "react-icons/fa";
// import { FaAngleRight } from "react-icons/fa";
// import { FaAngleUp, FaAngleDown } from "react-icons/fa";
// import { useState, useContext } from "react"
// import Tltip from "../../../components/tlTip";
// import imsLogo from '../../../public/logo/logoNew.svg';
// import Image from 'next/image'
// import { FiSettings } from "react-icons/fi";
// import { sideBar } from '../../../components/const'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation';
// import { SettingsContext } from "../../../contexts/useSettingsContext";
// import { UserAuth } from "../../../contexts/useAuthContext";
// import { getTtl } from "../../../utils/languages";
// import styles from "./SideBar.module.css";

// export default function Sidebar() {
//   const pathName = usePathname();
//   const { setDates, compData } = useContext(SettingsContext);
//   const { userTitle, gisAccount, SignOut } = UserAuth();
//   const ln = compData?.lng || 'English';
//   const [openDropdowns, setOpenDropdowns] = useState({});

//   const showLink = userTitle !== 'Accounting';

//   const toggleDropdown = (itemName) => {
//     setOpenDropdowns(prev => ({
//       ...prev,
//       [itemName]: !prev[itemName]
//     }));
//   };

//   return showLink && (
//     <nav
//       className="relative bg-gradient-to-br from-white via-[var(--endeavour)] to-[var(--port-gore)] flex flex-col border-r shadow-sm shrink-0 h-screen overflow-x-hidden z-[10500]"
//       style={{
//         width: '260px',
//         minWidth: '260px',
//         maxWidth: '260px',
//         color: 'var(--selago)',
//       }}
//     >
//     <div className={`flex-1 min-h-0 overflow-y-auto ${styles['custom-scrollbar']}`}> 
//       {/* Logo fixed at top */}
//       <div className="px-6 pt-6 pb-4 flex items-center bg-transparent">
//         <Image
//           src={imsLogo}
//           className="overflow-hidden transition-all w-32 2xl:w-36 rounded-lg p-1"
//           priority
//           alt="IMS Logo"
//           width={250}
//           height={250}
//         />
//       </div>
//       {/* Scrollable menu area */}

//         <ul className="mt-2">
//           {/* Render all sidebar groups dynamically from const.js */}
//           {sideBar().map((x, i) => (
//             <div key={i} className="mb-2">
//               {x.ttl && (
//                 <div className="text-[11px] 2xl:text-xs font-bold tracking-widest uppercase text-white/80 px-6 pb-2 pt-6" style={{letterSpacing: '0.12em'}}>{getTtl(x.ttl, ln)}</div>
//               )}
//               <div>
//                 {x.items.map((y, k) => {
//                   const isActive = pathName.slice(1) === y.page || pathName.startsWith(`/${y.page}/`);
//                   const isDropdownOpen = openDropdowns[y.item];
                  
//                   // Check if any sub-item is active
//                   const isSubItemActive = y.subItems?.some(sub => pathName.slice(1) === sub.page);
                  
//                   if (y.hasDropdown) {
//                     return (
//                       <div key={k}>
//                         {/* Dropdown Header */}
//                         <div 
//                           onClick={() => toggleDropdown(y.item)}
//                           className={`group flex items-center justify-between px-6 py-3 my-1 rounded-xl cursor-pointer transition-all duration-150
//                             ${isSubItemActive ? 'bg-[var(--rock-blue)] bg-opacity-30' : 'text-[var(--selago)] hover:bg-[var(--rock-blue)] hover:bg-opacity-20 hover:text-[var(--endeavour)]'}
//                           `} 
//                           style={{ minHeight: 48 }}
//                         >
//                           <div className="flex items-center gap-3 min-w-0">
//                             <span className={`text-xl transition-colors shrink-0 ${isSubItemActive ? 'text-white' : 'text-[var(--rock-blue)]'} group-hover:text-[var(--endeavour)]`}>{y.img}</span>
//                             <span className={`ml-2 text-sm font-medium leading-tight tracking-wide text-[var(--selago)] group-hover:text-[var(--endeavour)]`}>{getTtl(y.item, ln)}</span>
//                           </div>
//                           <span className="text-[var(--selago)]">
//                             {isDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
//                           </span>
//                         </div>
                        
//                         {/* Dropdown Items */}
//                         <div className={`overflow-hidden transition-all duration-300 ${isDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
//                           <div className="ml-4 mr-2 bg-[var(--rock-blue)]/30 rounded-xl overflow-hidden">
//                             {y.subItems.map((sub, si) => {
//                               const isSubActive = pathName.slice(1) === sub.page;
//                               return (
//                                 <Link href={`/${sub.page}`} key={si} onClick={setDates}>
//                                   <div className={`group flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-150
//                                     ${isSubActive 
//                                       ? 'bg-white text-[var(--endeavour)] font-semibold' 
//                                       : 'text-white hover:bg-white/20 hover:text-[var(--endeavour)]'}
//                                   `}>
//                                     <span className={`text-lg ${isSubActive ? 'text-[var(--endeavour)]' : 'text-white'} group-hover:text-[var(--endeavour)]`}>{sub.img}</span>
//                                     <span className={`text-sm ${isSubActive ? 'text-[var(--endeavour)]' : 'text-white'} group-hover:text-[var(--endeavour)]`}>{getTtl(sub.item, ln)}</span>
//                                   </div>
//                                 </Link>
//                               );
//                             })}
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   }
                  
//                   return (
//                     <Link href={`/${y.page}`} key={k} onClick={setDates}>
//                       <div className={`group flex items-center gap-3 px-6 py-3 my-1 rounded-xl cursor-pointer transition-all duration-150
//                         ${isActive ? 'bg-[var(--rock-blue)] bg-opacity-80 text-[var(--endeavour)] shadow-md font-bold' : 'text-[var(--selago)] hover:bg-[var(--rock-blue)] hover:text-[var(--endeavour)]'}
//                       `} style={{ minHeight: 48 }}>
//                         <span className={`text-xl transition-colors shrink-0 ${isActive ? 'text-[var(--endeavour)]' : 'text-[var(--rock-blue)]'} group-hover:text-[var(--endeavour)]`}>{y.img}</span>
//                         <span className={`ml-2 text-sm font-medium leading-tight tracking-wide group-hover:text-[var(--endeavour)]`}>{getTtl(y.item, ln)}</span>
//                       </div>
//                     </Link>
//                   );
//                 })}
//               </div>
//             </div>
//           ))}
//         </ul>
//       </div>
//       {/* Fixed bottom area for settings and logout */}
//       <div className="shrink-0 pb-2 pt-2">
//         <div className="flex flex-col gap-2 px-0">
//           <Tltip direction='right' tltpText={getTtl('Settings', ln)} show={false}>
//             <Link href='/settings'>
//               <div className="flex items-center gap-3 px-6 py-3 rounded-xl cursor-pointer transition-all duration-150 text-[var(--selago)] hover:bg-[var(--rock-blue)] hover:text-[var(--endeavour)]">
//                 <FiSettings className='text-xl shrink-0' />
//                 <span className="ml-2 text-sm font-medium leading-tight tracking-wide">{getTtl('Settings', ln)}</span>
//               </div>
//             </Link>
//           </Tltip>
//           {/* Logout button example, adjust as needed */}
//           <Tltip direction='right' tltpText={getTtl('Logout', ln)} show={false}>
//             <button
//               onClick={async () => {
//                 await SignOut();
//                 window.location.href = '/';
//               }}
//               className="flex items-center gap-3 px-6 py-3 rounded-xl cursor-pointer transition-all duration-150 text-[var(--selago)] hover:bg-[var(--rock-blue)] hover:text-[var(--endeavour)] w-full text-left"
//             >
//               <span className="text-xl shrink-0"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 19C7.58172 19 4 15.4183 4 11C4 6.58172 7.58172 3 12 3C13.6569 3 15.1566 3.63214 16.2426 4.75736" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
//               <span className="ml-2 text-sm font-medium leading-tight tracking-wide">{getTtl('Logout', ln)}</span>
//             </button>
//           </Tltip>
//         </div>
//       </div>
      
//     </nav>
//   );
// }
"use client";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { useState, useContext } from "react"
import Tltip from "../../../components/tlTip";
import imsLogo from '../../../public/logo/logoNew.svg';
import Image from 'next/image'
import { FiSettings } from "react-icons/fi";
import { sideBar } from '../../../components/const'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { SettingsContext } from "../../../contexts/useSettingsContext";
import { UserAuth } from "../../../contexts/useAuthContext";
import { getTtl } from "../../../utils/languages";
import styles from "./SideBar.module.css";

export default function Sidebar() {
  const pathName = usePathname();
  const { setDates, compData } = useContext(SettingsContext);
  const { userTitle, gisAccount, SignOut } = UserAuth();
  const ln = compData?.lng || 'English';
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [showShadow, setShowShadow] = useState(false);

  const showLink = userTitle !== 'Accounting';

  const toggleDropdown = (itemName) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const handleScroll = (e) => {
    setShowShadow(e.target.scrollTop > 10);
  };

  return showLink && (
    <nav
      className="relative flex flex-col shrink-0 h-screen overflow-hidden z-[10500]"
      style={{
        width: '260px',
        minWidth: '260px',
        maxWidth: '260px',
        boxShadow: '2px 0 8px rgba(0, 0, 0, 0.08)'
      }}
    >
      {/* Logo section with lighter background and subtle animation */}
      <div 
        className="shrink-0 px-6 py-5 flex items-center justify-center relative z-10 transition-all duration-300"
        style={{
          background: 'linear-gradient(180deg, #f7fbff 0%, #fafcff 50%, #ffffff 100%)',
          boxShadow: showShadow ? '0 3px 10px rgba(0, 61, 110, 0.12)' : 'none',
          borderBottom: showShadow ? '1px solid rgba(13, 90, 158, 0.08)' : '1px solid transparent'
        }}
      >
        <Image
          src={imsLogo}
          className="overflow-hidden transition-all w-28 2xl:w-32 hover:scale-105 duration-300"
          priority
          alt="IMS Logo"
          width={250}
          height={250}
        />
      </div>

      {/* Scrollable menu area with enhanced blue gradient */}
      <div 
        className={`flex-1 min-h-0 overflow-y-auto ${styles['custom-scrollbar']}`}
        onScroll={handleScroll}
        style={{
          background: 'linear-gradient(180deg, #0e5fa5 0%, #0a4d84 30%, #064378 60%, #003d6e 100%)'
        }}
      > 
        <ul className="py-3">
          {/* Render all sidebar groups dynamically from const.js */}
          {sideBar().map((x, i) => (
            <div key={i} className="mb-1">
              {x.ttl && (
                <div 
                  className="text-[10px] 2xl:text-[11px] font-semibold tracking-[0.15em] uppercase px-6 pb-2.5 pt-4"
                  style={{
                    color: 'rgba(255, 255, 255, 0.45)',
                    letterSpacing: '0.15em'
                  }}
                >
                  {getTtl(x.ttl, ln)}
                </div>
              )}
              <div>
                {x.items.map((y, k) => {
                  const isActive = pathName.slice(1) === y.page || pathName.startsWith(`/${y.page}/`);
                  const isDropdownOpen = openDropdowns[y.item];
                  
                  // Check if any sub-item is active
                  const isSubItemActive = y.subItems?.some(sub => pathName.slice(1) === sub.page);
                  
                  if (y.hasDropdown) {
                    return (
                      <div key={k} className="px-2.5">
                        {/* Dropdown Items - Always visible, no header */}
                        <div className="ml-1 mb-1">
                          {y.subItems.map((sub, si) => {
                            const isSubActive = pathName.slice(1) === sub.page;
                            return (
                              <Link href={`/${sub.page}`} key={si} onClick={setDates}>
                                <div className={`group flex items-center gap-3 px-4 py-2.5 mx-1 my-0.5 rounded-md cursor-pointer transition-all duration-200
                                  ${isSubActive 
                                    ? 'bg-gradient-to-r from-[#7ba7cc] to-[#6b9ac2] text-white font-medium shadow-lg scale-[1.02]' 
                                    : 'text-white/90 hover:bg-white/10 hover:translate-x-1'}
                                `}>
                                  <span className={`text-[16px] transition-all duration-200 ${isSubActive ? 'scale-110' : ''} group-hover:scale-110`}>{sub.img}</span>
                                  <span className="text-[14px]">{getTtl(sub.item, ln)}</span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }
                  
                  return (
                    <Link href={`/${y.page}`} key={k} onClick={setDates}>
                      <div className={`group flex items-center gap-3 px-6 py-3 mx-2.5 my-0.5 rounded-lg cursor-pointer transition-all duration-200
                        ${isActive 
                          ? 'bg-gradient-to-r from-[#7ba7cc] to-[#6b9ac2] text-white font-medium shadow-lg scale-[1.02]' 
                          : 'text-white hover:bg-[#0a4d84]/50 hover:translate-x-0.5'}
                      `}>
                        <span className={`text-[18px] shrink-0 transition-all duration-200 ${isActive ? 'scale-110' : ''} group-hover:scale-110`}>{y.img}</span>
                        <span className="text-[15px] font-medium tracking-wide">{getTtl(y.item, ln)}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </ul>
      </div>
      
      {/* Fixed bottom area with better separation */}
      <div 
        className="shrink-0 py-2.5"
        style={{
          background: 'linear-gradient(180deg, #064378 0%, #003d6e 100%)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="flex flex-col gap-0.5">
          <Tltip direction='right' tltpText={getTtl('Settings', ln)} show={false}>
            <Link href='/settings'>
              <div className="group flex items-center gap-3 px-6 py-3 mx-2.5 rounded-lg cursor-pointer transition-all duration-200 text-white hover:bg-[#0a4d84]/50 hover:translate-x-0.5">
                <FiSettings className='text-[18px] shrink-0 transition-transform duration-200 group-hover:rotate-90 group-hover:scale-110' />
                <span className="text-[15px] font-medium tracking-wide">{getTtl('Settings', ln)}</span>
              </div>
            </Link>
          </Tltip>
          <Tltip direction='right' tltpText={getTtl('Logout', ln)} show={false}>
            <button
              onClick={async () => {
                await SignOut();
                window.location.href = '/';
              }}
              className="group flex items-center gap-3 px-6 py-3 mx-2.5 rounded-lg cursor-pointer transition-all duration-200 text-white hover:bg-red-500/20 hover:translate-x-0.5 w-full text-left"
            >
              <span className="text-[18px] shrink-0 transition-transform duration-200 group-hover:translate-x-1">
                <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 19C7.58172 19 4 15.4183 4 11C4 6.58172 7.58172 3 12 3C13.6569 3 15.1566 3.63214 16.2426 4.75736" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="text-[15px] font-medium tracking-wide">{getTtl('Logout', ln)}</span>
            </button>
          </Tltip>
        </div>
      </div>
      
    </nav>
  );
}
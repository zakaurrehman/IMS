import { Fragment, useContext } from 'react'
import imsLogo from '../../../public/logo/logoNew.svg';
import Image from 'next/image'
import { BiLogOutCircle } from 'react-icons/bi';
import { UserAuth } from "../../../contexts/useAuthContext";
import { useRouter } from "next/navigation";
import { Menu, MenuButton, Transition, MenuItems } from '@headlessui/react'
import { sideBar } from '../../../components/const'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { FiSettings } from "react-icons/fi";
import { ImMenu } from "react-icons/im";
import CompanySelect from './companySelect';
import { SettingsContext } from "../../../contexts/useSettingsContext";
import { getTtl } from "../../../utils/languages";

const SideBarMini = () => {
  const pathName = usePathname();
  const router = useRouter()
  const { SignOut } = UserAuth();
  const { setDates, compData } = useContext(SettingsContext);
  const ln = compData?.lng || 'English';

  const LogOut = async () => {
    router.push("/");
    await SignOut();
  }

  return (
    <nav className="w-full h-fit flex shadow-sm bg-gradient-to-br from-white via-[var(--endeavour)] to-[var(--port-gore)]" >
      <div className='flex w-full justify-between'>
        <div className='items-center flex'>
       
 <div className='p-2'>
          <Image
            src={imsLogo}
            className='overflow-hidden transition-all w-12'
            alt="IMS Logo"
            priority
          />
        </div>

        </div>
       


           <Menu as="div" className="relative inline-block text-left">
            <div className='flex h-full'>
              <MenuButton className="flex items-center justify-center px-4 text-lg text-white focus:outline-none">
                <ImMenu className='opacity-90' />
              </MenuButton>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute right-2 mt-1 w-76 origin-top-left divide-y divide-[var(--rock-blue)]/30 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none h-[450px] overflow-auto" style={{ background: 'linear-gradient(180deg, var(--endeavour) 0%, var(--chathams-blue) 100%)' }}>

                <div className="text-sm text-[var(--selago)] px-3 pt-3">
                  <CompanySelect />
                </div>

                <ul className="flex-1 divide-[var(--rock-blue)]/30 divide-y">
                  {sideBar().map((x, i) => (
                    <div key={i} className="py-2">
                      {x.ttl && (
                        <div className='text-[11px] font-bold tracking-widest uppercase text-white/80 px-4 pb-2 pt-3' style={{letterSpacing: '0.12em'}}>
                          {getTtl(x.ttl, ln)}
                        </div>
                      )}
                      <div>
                        {x.items.map((y, k) => {
                          const isActive = pathName.slice(1) === y.page;
                          // If item has subItems (dropdown), render them as sub-menu
                          if (y.hasDropdown && y.subItems && y.subItems.length > 0) {
                            return (
                              <div key={k}>
                                <div className="flex px-2 py-1 text-sm items-center">
                                  <div className={`gap-3 w-full flex items-center px-3 py-2 rounded-xl transition-all duration-150 text-[var(--selago)] bg-[var(--rock-blue)]/10`}>
                                    <span className="text-lg text-[var(--rock-blue)]">{y.img}</span>
                                    <span className="text-[0.85rem] whitespace-nowrap font-medium">{getTtl(y.item, ln)}</span>
                                  </div>
                                </div>
                                {/* Render subItems as links */}
                                <div className="ml-6">
                                  {y.subItems.map((sub, subIdx) => {
                                    const isSubActive = pathName.slice(1) === sub.page;
                                    return (
                                      <Link href={`/${sub.page}`} key={subIdx} onClick={setDates}>
                                        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-150 text-sm mt-1
                                          ${isSubActive ? 'bg-[var(--rock-blue)] bg-opacity-80 text-[var(--endeavour)] font-bold' : 'text-[var(--selago)] hover:bg-[var(--rock-blue)] hover:text-[var(--selago)]'}`}
                                        >
                                          <span className={`text-base ${isSubActive ? 'text-[var(--endeavour)]' : 'text-[var(--rock-blue)]'}`}>{sub.img}</span>
                                          <span className="text-[0.85rem] whitespace-nowrap font-medium">{getTtl(sub.item, ln)}</span>
                                        </div>
                                      </Link>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          }
                          // Otherwise, render as normal link
                          return (
                            <Link href={`/${y.page}`} key={k} onClick={setDates}>
                              <div className="flex px-2 py-1 text-sm items-center">
                                <div className={`gap-3 w-full flex items-center px-3 py-2 rounded-xl transition-all duration-150
                                  ${isActive ? 'bg-[var(--rock-blue)] bg-opacity-80 text-[var(--endeavour)] shadow-md font-bold' : 'text-[var(--selago)] hover:bg-[var(--rock-blue)] hover:text-[var(--selago)]'}`}>
                                  <span className={`text-lg transition-colors ${isActive ? 'text-[var(--endeavour)]' : 'text-[var(--rock-blue)]'}`}>{y.img}</span>
                                  <span className="text-[0.85rem] whitespace-nowrap font-medium">{getTtl(y.item, ln)}</span>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </ul>

                <div className='py-2'>
                  <Link href='/settings'>
                    <div className="flex px-2 py-1 text-sm items-center">
                      <div className="gap-3 w-full flex items-center px-3 py-2 rounded-xl transition-all duration-150 text-[var(--selago)] hover:bg-[var(--rock-blue)] hover:text-[var(--selago)]">
                        <FiSettings className='text-lg text-[var(--rock-blue)]' />
                        <span className='text-[0.85rem] font-medium'>{getTtl('Settings', ln)}</span>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='py-2'>
                  <div className="flex px-2 py-1 text-sm items-center cursor-pointer" onClick={LogOut}>
                    <div className="gap-3 w-full flex items-center px-3 py-2 rounded-xl transition-all duration-150 text-[var(--selago)] hover:bg-[var(--rock-blue)] hover:text-[var(--selago)]">
                      <BiLogOutCircle className='text-lg text-[var(--rock-blue)]' />
                      <span className='text-[0.85rem] font-medium'>{getTtl('Logout', ln)}</span>
                    </div>
                  </div>
                </div>

              </MenuItems>
            </Transition>
          </Menu>
      </div>
    </nav>
  )
}

export default SideBarMini

/* 
 <div className='flex-1'></div>
<div className='flex items-center gap-1 pr-2 text-sm text-slate-700' onClick={LogOut}>
          <BiLogOutCircle />
          Logout
        </div>

*/

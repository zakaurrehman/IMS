
// function useIsMobile() {
//     const [isMobile, setIsMobile] = React.useState(false);
//     React.useEffect(() => {
//         const checkMobile = () => setIsMobile(window.innerWidth < 768);
//         checkMobile();
//         window.addEventListener('resize', checkMobile);
//         return () => window.removeEventListener('resize', checkMobile);
//     }, []);
//     return isMobile;
// }

// import React, { useContext, useState, useEffect } from "react";
// import Datepicker from "react-tailwindcss-datepicker";
// import { SettingsContext } from "../contexts/useSettingsContext";
// import dateFormat from 'dateformat';

// // Helper to convert string (yyyy-mm-dd) to Date
// const toDate = (val) => val ? new Date(val) : null;
// // Helper to convert Date to string (yyyy-mm-dd)
// const toStr = (val) => val ? dateFormat(val, "yyyy-mm-dd") : null;

// const DateRangePicker = () => {
//     const { setDateSelect, dateSelect } = useContext(SettingsContext);

//     // Always keep value as Date objects for the picker
//     const [value, setValue] = useState({
//         startDate: toDate(dateSelect.start),
//         endDate: toDate(dateSelect.end)
//     });

//     // Sync with context changes
//     useEffect(() => {
//         setValue({
//             startDate: toDate(dateSelect.start),
//             endDate: toDate(dateSelect.end)
//         });
//     }, [dateSelect]);

//     const yr = new Date().getFullYear();
//     const today = new Date();
//     const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
//     const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

//     const handleValueChange = (newValue) => {
//         setValue(newValue);
//         setDateSelect({
//             ...dateSelect,
//             start: toStr(newValue.startDate),
//             end: toStr(newValue.endDate)
//         });
//     };

//     const isMobile = useIsMobile();
    
//     // Inject styles directly for desktop only
//     useEffect(() => {
//         if (isMobile) return;

//         const styleId = 'datepicker-desktop-styles';
        
//         // Check if style already exists
//         if (document.getElementById(styleId)) return;

//         const style = document.createElement('style');
//         style.id = styleId;
//         style.textContent = `
//             @media (min-width: 768px) {
//                 .datepicker-desktop-fix .react-tailwindcss-datepicker > div[class*="absolute"],
//                 .datepicker-desktop-fix .react-tailwindcss-datepicker .absolute[role="dialog"],
//                 .datepicker-desktop-fix .react-tailwindcss-datepicker [data-testid="dropdown"] {
//                     z-index: 100 !important;
//                     position: fixed !important;
//                 }
                
//                 .datepicker-desktop-fix ~ div[class*="absolute"],
//                 .datepicker-desktop-fix + div[class*="absolute"] {
//                     z-index: 100 !important;
//                 }
//             }

//             /* Broad rule: when chat is open, hide any datepicker dropdowns appended anywhere in the DOM */
//             .ims-chat-open [data-testid="dropdown"],
//             .ims-chat-open .react-tailwindcss-datepicker__dropdown,
//             .ims-chat-open .react-tailwindcss-datepicker-dropdown {
//                 display: none !important;
//                 visibility: hidden !important;
//                 opacity: 0 !important;
//                 pointer-events: none !important;
//             }
//         `;
//         document.head.appendChild(style);

//         return () => {
//             const existingStyle = document.getElementById(styleId);
//             if (existingStyle) {
//                 existingStyle.remove();
//             }
//         };
//     }, [isMobile]);
    
//     return (
//         <div className={!isMobile ? 'datepicker-desktop-fix' : ''} style={!isMobile ? {position: 'relative', zIndex: 100} : {}}>
//             <Datepicker
//                 inputClassName='border border-[var(--rock-blue)]/50 text-sm/6 p-1.5 px-2 rounded-xl text-[var(--port-gore)] w-60
//                  focus:outline-none cursor-pointer z-0 bg-white shadow-sm hover:border-[var(--endeavour)] transition-colors'
//                 useRange={false}
//                 value={value}
//                 onChange={handleValueChange}
//                 displayFormat={"DD-MMM-YY"}
//                 placeholder="Select range"
//                 showShortcuts={true}
//                 readOnly={true}
//                 configs={{
//                     shortcuts: {
//                         customToday: {
//                             text: "Today",
//                             period: {
//                                 start: today,
//                                 end: today
//                             }
//                         },
//                         customMonth: {
//                             text: "This month",
//                             period: {
//                                 start: firstDayOfMonth,
//                                 end: lastDayOfMonth
//                             }
//                         },
//                         custom: {
//                             text: "This year",
//                             period: {
//                                 start: new Date(`${yr}-01-01`),
//                                 end: new Date(`${yr}-12-31`)
//                             },
//                         },
//                         custom1: {
//                             text: "Last year",
//                             period: {
//                                 start: new Date(`${yr - 1}-01-01`),
//                                 end: new Date(`${yr - 1}-12-31`)
//                             },
//                         },
//                     }
//                 }}
//                 containerClassName="relative"
//                 popoverDirection="down"
//             />
//         </div>
//     );
// };

// export default DateRangePicker;
'use client'

import React, { useContext, useState, useEffect } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { SettingsContext } from "../contexts/useSettingsContext";
import dateFormat from "dateformat";

/* ================================
   Hook: Detect Mobile
================================ */
function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return isMobile;
}

/* ================================
   Helpers
================================ */
// string (yyyy-mm-dd) -> Date
const toDate = (val) => (val ? new Date(val) : null);

// Date -> string (yyyy-mm-dd)
const toStr = (val) => (val ? dateFormat(val, "yyyy-mm-dd") : null);

/* ================================
   Component
================================ */
const DateRangePicker = () => {
    const { setDateSelect, dateSelect } = useContext(SettingsContext);

    // Keep picker value as Date objects
    const [value, setValue] = useState({
        startDate: toDate(dateSelect.start),
        endDate: toDate(dateSelect.end),
    });

    // Sync when context changes
    useEffect(() => {
        setValue({
            startDate: toDate(dateSelect.start),
            endDate: toDate(dateSelect.end),
        });
    }, [dateSelect]);

    /* ================================
       Shortcut Dates (UNCHANGED)
    ================================ */
    const yr = new Date().getFullYear();
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const handleValueChange = (newValue) => {
        setValue(newValue);
        setDateSelect({
            ...dateSelect,
            start: toStr(newValue.startDate),
            end: toStr(newValue.endDate),
        });
    };

    const isMobile = useIsMobile();

    /* ================================
       Z-INDEX FIX (LOW PRIORITY)
       Datepicker will NEVER overlay modals
    ================================ */
    useEffect(() => {
        const styleId = "datepicker-low-zindex";
        if (document.getElementById(styleId)) return;

        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = `
            /* Force LOW z-index for datepicker dropdown */
            .react-tailwindcss-datepicker > div[class*="absolute"],
            .react-tailwindcss-datepicker [role="dialog"],
            .react-tailwindcss-datepicker [data-testid="dropdown"] {
                z-index: 10 !important;
            }

            /* When any popup/chat/modal is open */
            .ims-chat-open .react-tailwindcss-datepicker [data-testid="dropdown"],
            .ims-chat-open .react-tailwindcss-datepicker [role="dialog"] {
                display: none !important;
                pointer-events: none !important;
                opacity: 0 !important;
            }
        `;
        document.head.appendChild(style);

        return () => {
            const s = document.getElementById(styleId);
            if (s) s.remove();
        };
    }, []);

    return (
        <div
            className="relative"
            style={{ zIndex: 5 }}   // 🔑 LOW z-index container
        >
            <Datepicker
                inputClassName="
                    border border-[var(--rock-blue)]/50
                    text-sm p-1.5 px-2
                    rounded-xl
                    text-[var(--port-gore)]
                    w-60
                    bg-white
                    shadow-sm
                    cursor-pointer
                    hover:border-[var(--endeavour)]
                    focus:outline-none
                    transition-colors
                "
                useRange={false}
                value={value}
                onChange={handleValueChange}
                displayFormat="DD-MMM-YY"
                placeholder="Select range"
                showShortcuts={true}
                readOnly={true}
                popoverDirection="down"
                containerClassName="relative z-[5]"
                configs={{
                    shortcuts: {
                        customToday: {
                            text: "Today",
                            period: {
                                start: today,
                                end: today,
                            },
                        },
                        customMonth: {
                            text: "This month",
                            period: {
                                start: firstDayOfMonth,
                                end: lastDayOfMonth,
                            },
                        },
                        custom: {
                            text: "This year",
                            period: {
                                start: new Date(`${yr}-01-01`),
                                end: new Date(`${yr}-12-31`),
                            },
                        },
                        custom1: {
                            text: "Last year",
                            period: {
                                start: new Date(`${yr - 1}-01-01`),
                                end: new Date(`${yr - 1}-12-31`),
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

export default DateRangePicker;

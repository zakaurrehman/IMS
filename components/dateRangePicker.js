
'use client'

import React, { useContext, useState, useEffect } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { SettingsContext } from "../contexts/useSettingsContext";
import dateFormat from "dateformat";

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

    // Get display label based on selected date range
    const getDisplayLabel = () => {
        const start = dateSelect.start;
        const end = dateSelect.end;
        
        if (!start || !end) return null;
        
        const todayStr = dateFormat(today, "yyyy-mm-dd");
        const firstOfMonthStr = dateFormat(firstDayOfMonth, "yyyy-mm-dd");
        const lastOfMonthStr = dateFormat(lastDayOfMonth, "yyyy-mm-dd");
        
        // Also calculate expected year strings with local dates
        const thisYearStart = dateFormat(new Date(yr, 0, 1), "yyyy-mm-dd");
        const thisYearEnd = dateFormat(new Date(yr, 11, 31), "yyyy-mm-dd");
        const lastYearStart = dateFormat(new Date(yr - 1, 0, 1), "yyyy-mm-dd");
        const lastYearEnd = dateFormat(new Date(yr - 1, 11, 31), "yyyy-mm-dd");
        
        // Check which shortcut matches
        if (start === todayStr && end === todayStr) {
            return "Today";
        }
        if (start === firstOfMonthStr && end === lastOfMonthStr) {
            return dateFormat(firstDayOfMonth, "mmmm yyyy");
        }
        
        // Current year check (using formatted dates)
        if (start === thisYearStart && end === thisYearEnd) {
            return `Year ${yr}`;
        }
        
        // Last year check (using formatted dates)
        if (start === lastYearStart && end === lastYearEnd) {
            return `Year ${yr - 1}`;
        }
        
        // Generic year check: extract and compare
        const startYear = start?.substring(0, 4);
        const endYear = end?.substring(0, 4);
        const startMonthDay = start?.substring(5); // "01-01"
        const endMonthDay = end?.substring(5); // "12-31"
        
        // Any full year (Jan 1 to Dec 31 of same year)
        if (startYear === endYear && startMonthDay === "01-01" && endMonthDay === "12-31") {
            return `Year ${startYear}`;
        }
        
        return null; // Custom range, no label
    };

    const displayLabel = getDisplayLabel();

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

            /* Remove ALL borders from datepicker input */
            .react-tailwindcss-datepicker input,
            .react-tailwindcss-datepicker input:focus,
            .react-tailwindcss-datepicker input:active,
            .react-tailwindcss-datepicker input:hover,
            .react-tailwindcss-datepicker > div,
            .react-tailwindcss-datepicker > div:focus-within {
                border: none !important;
                box-shadow: none !important;
                outline: none !important;
                ring: none !important;
            }

            /* Remove ring/focus styles */
            .react-tailwindcss-datepicker .focus\\:ring-2,
            .react-tailwindcss-datepicker .focus\\:ring,
            .react-tailwindcss-datepicker [class*="ring"] {
                --tw-ring-shadow: none !important;
                --tw-ring-color: transparent !important;
                box-shadow: none !important;
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
            className="relative flex items-center gap-2 border-2 border-[var(--selago)] rounded-md "
            style={{ zIndex: 5 }}   // 🔑 LOW z-index container
        >
            {displayLabel && (
                <span className="text-xs font-medium text-[var(--port-gore)] bg-[var(--selago)]/60 px-2 py-0.5 rounded-md whitespace-nowrap">
                    {displayLabel}
                </span>
            )}
            <Datepicker
                inputClassName="
                    text-xs p-1 px-2
                    rounded-md
                    text-[var(--port-gore)]
                    font-medium
                    w-48
                    bg-transparent
                    cursor-pointer
                    hover:bg-[var(--selago)]/50
                    focus:outline-none
                    focus:ring-0
                    focus:border-none
                    border-none
                    outline-none
                    shadow-none
                    transition-all
                    duration-200
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
                                start: new Date(yr, 0, 1),      // Jan 1 (local time)
                                end: new Date(yr, 11, 31),      // Dec 31 (local time)
                            },
                        },
                        custom1: {
                            text: "Last year",
                            period: {
                                start: new Date(yr - 1, 0, 1),  // Jan 1 last year (local time)
                                end: new Date(yr - 1, 11, 31),  // Dec 31 last year (local time)
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

export default DateRangePicker;

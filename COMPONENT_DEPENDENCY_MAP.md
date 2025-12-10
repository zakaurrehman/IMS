# 🎯 COMPLETE COMPONENT & DEPENDENCY MAP

## 📦 PROJECT DEPENDENCIES

### **Core Dependencies**
```
Next.js 14.2.4          - React framework
React 18                - UI library
Firebase 10.12.3        - Backend (Auth + Firestore)
Tailwind CSS 3.4.1      - Styling
```

### **UI & Components**
```
@radix-ui/              - Accessible UI primitives
@headlessui/react       - Unstyled, accessible components
Lucide-react            - Icon library
react-icons             - Additional icons
```

### **Data Management**
```
@tanstack/react-table   - Advanced table library
ExcelJS 4.4.0           - Excel generation
XLSX 0.18.5             - Excel reading
jsPDF 2.5.1             - PDF generation
jspdf-autotable         - PDF table formatting
```

### **Utilities**
```
date-fns 3.6.0          - Date manipulation
dayjs 1.11.13           - Date library
dateformat 5.0.3        - Date formatting
uuid 10.0.0             - Unique ID generation
react-number-format     - Number formatting
mathjs 13.0.2           - Math operations
clsx 2.1.1              - Conditional classes
class-variance-authority - Component variants
```

### **Drag & Drop**
```
@dnd-kit/core           - Drag and drop
@dnd-kit/modifiers      - DnD modifiers
@dnd-kit/sortable       - Sortable lists
```

### **Other Libraries**
```
react-idle-timer        - Session timeout
react-chartjs-2         - Charts
chart.js                - Chart library
react-spinners          - Loading spinners
file-saver              - File downloads
react-tailwindcss-datepicker - Date picker
react-day-picker        - Calendar component
framer-motion           - Animations
```

---

## 🌳 FILE DEPENDENCY TREE

### **Entry Point**
```
package.json
└── package.json > npm scripts
    ├── npm run dev ......... next dev (development server)
    ├── npm run build ....... next build (production build)
    ├── npm start ........... next start (production server)
    └── npm run lint ........ next lint (linting)
```

### **App Root**
```
app/
├── layout.js ..................... ROOT LAYOUT
│   ├── imports: ./globals.css
│   ├── imports: ./providers
│   └── imports: @next/font
│
├── page.js ....................... LANDING/LOGIN
│   ├── imports: ./providers (Actually in layout, not here)
│   ├── imports: ./(auth)/signin/login.js
│   └── imports: next/image
│
├── providers.js .................. CONTEXT WRAPPER
│   ├── imports: @contexts/useSettingsContext.js
│   ├── imports: @contexts/useAuthContext.js
│   ├── imports: @contexts/useContractsContext.js
│   ├── imports: @contexts/useInvoiceContext.js
│   └── imports: @contexts/useExpensesContext.js
│
├── globals.css ................... GLOBAL STYLES
│   └── Tailwind CSS + Custom styles
│
└── (root)/ ....................... PROTECTED ROUTES
    ├── layout.js ............. PROTECTED LAYOUT
    │   ├── imports: ./src/_components/SideBar.js
    │   ├── imports: ./src/_components/SideBarMini.js
    │   ├── imports: ./src/_components/MainNav.js
    │   ├── imports: @components/spinner.js
    │   ├── imports: @contexts/useAuthContext.js
    │   └── imports: next/navigation
    │
    ├── _components/ ......... LAYOUT COMPONENTS
    │   ├── SideBar.js ......... Desktop sidebar
    │   │   ├── imports: react-icons
    │   │   ├── imports: next/link
    │   │   ├── imports: next/image
    │   │   ├── imports: @components/const.js (sidebar links)
    │   │   ├── imports: @contexts/useAuthContext.js
    │   │   ├── imports: @contexts/useSettingsContext.js
    │   │   └── imports: ./companySelect.js
    │   │
    │   ├── SideBarMini.js .... Mobile sidebar
    │   │   ├── imports: @headlessui/react (Menu)
    │   │   ├── imports: react-icons
    │   │   ├── imports: @contexts/useAuthContext.js
    │   │   └── imports: ./companySelect.js
    │   │
    │   ├── MainNav.js ........ Top navbar
    │   │   ├── imports: react-icons
    │   │   ├── imports: @components/signOut.js
    │   │   ├── imports: @contexts/useAuthContext.js
    │   │   └── imports: ./companySelect.js
    │   │
    │   └── companySelect.js . Company selector dropdown
    │       ├── imports: @contexts/useSettingsContext.js
    │       └── imports: react-icons
    │
    ├── contracts/ ............ CONTRACTS MODULE
    │   ├── page.js ........... Main page
    │   │   ├── imports: ./newTable.js
    │   │   ├── imports: ./modals/dataModal.js
    │   │   ├── imports: @contexts/
    │   │   ├── imports: @utils/utils.js (loadData)
    │   │   ├── imports: @components/ (Modal, Toast, etc)
    │   │   └── imports: ./excel.js
    │   │
    │   ├── newTable.js ....... Table component
    │   │   ├── imports: @tanstack/react-table
    │   │   ├── imports: @components/table/header.js
    │   │   ├── imports: @components/table/Paginator.js
    │   │   ├── imports: @components/table/RowsIndicator.js
    │   │   ├── imports: @components/table/filters/
    │   │   └── imports: @utils/utils.js
    │   │
    │   ├── modals/
    │   │   ├── dataModal.js .. Create/Edit form modal
    │   │   │   ├── imports: @headlessui/react
    │   │   │   ├── imports: @components/modal.js
    │   │   │   ├── imports: @contexts/
    │   │   │   ├── imports: ./products.js
    │   │   │   ├── imports: ./invoices.js
    │   │   │   ├── imports: ./expenses.js
    │   │   │   └── imports: @utils/utils.js
    │   │   │
    │   │   ├── products.js ... Product line items
    │   │   │   ├── imports: react-icons
    │   │   │   ├── imports: @components/
    │   │   │   └── imports: @utils/utils.js
    │   │   │
    │   │   ├── invoices.js ... Linked invoices
    │   │   │   ├── imports: @contexts/useInvoiceContext.js
    │   │   │   ├── imports: react-icons
    │   │   │   └── imports: @components/
    │   │   │
    │   │   ├── expenses.js ... Linked expenses
    │   │   │   ├── imports: @contexts/useExpensesContext.js
    │   │   │   ├── imports: react-icons
    │   │   │   └── imports: @components/
    │   │   │
    │   │   ├── pdf/ .......... PDF generation
    │   │   │   ├── pdfAccountStatement.js
    │   │   │   └── [other PDF files]
    │   │   │
    │   │   └── delayedResponse.js .... Alert notifications
    │   │       └── imports: @utils/utils.js
    │   │
    │   ├── excel.js .......... Excel export
    │   │   ├── imports: exceljs
    │   │   ├── imports: file-saver
    │   │   └── imports: @utils/utils.js (formatting)
    │   │
    │   └── style.css ......... Module styles
    │
    ├── invoices/ ............. INVOICES MODULE
    │   ├── page.js
    │   ├── newTable.js
    │   ├── modals/
    │   │   ├── dataModal.js
    │   │   ├── delayedResponse.js
    │   │   └── products.js
    │   └── excel.js
    │
    ├── invoicesreview/ ....... INVOICES REVIEW
    │   ├── page.js
    │   ├── newTable.js
    │   ├── funcs.js (calculation functions)
    │   └── excel.js
    │
    ├── invoicesstatement/ .... INVOICES STATEMENT
    │   ├── page.js
    │   ├── newTable.js
    │   └── totals/
    │
    ├── expenses/ ............. EXPENSES MODULE
    │   ├── page.js
    │   ├── newTable.js
    │   ├── modals/dataModal.js
    │   ├── excel.js
    │   └── totals/
    │
    ├── companyexpenses/ ...... COMPANY EXPENSES
    │   ├── page.js
    │   ├── newTable.js
    │   ├── excel.js
    │   └── totals/
    │
    ├── stocks/ ............... INVENTORY
    │   ├── page.js
    │   ├── whModal.js (Warehouse modal)
    │   ├── shipmentsTable.js
    │   └── excel.js
    │
    ├── inventoryreview/ ...... INVENTORY REVIEW
    │   ├── page.js
    │   └── excel.js
    │
    ├── materialtables/ ....... MATERIAL TABLES
    │   ├── page.js
    │   ├── newTable.js
    │   └── totals.js
    │
    ├── contractsreview/ ...... CONTRACT REVIEW
    │   ├── page.js
    │   ├── newTable.js
    │   ├── funcs.js
    │   └── excel.js
    │
    ├── contractsstatement/ ... CONTRACT STATEMENT
    │   ├── page.js
    │   ├── newTable.js
    │   ├── newTable1.js
    │   └── totals/
    │
    ├── accstatement/ ......... ACCOUNTING STATEMENT
    │   ├── page.js
    │   ├── newTable.js
    │   └── excel.js
    │
    ├── analysis/ ............. WEIGHT ANALYSIS
    │   ├── page.js
    │   ├── newTable.js
    │   └── excel.js
    │
    ├── margins/ .............. MARGIN ANALYSIS
    │   ├── page.js
    │   └── newTable.js
    │
    ├── cashflow/ ............. CASH FLOW
    │   ├── page.js
    │   ├── accordion.js
    │   └── funcs.js
    │
    ├── dashboard/ ............ DASHBOARD
    │   └── page.js
    │
    ├── accounting/ ........... ACCOUNTING
    │   └── page.js
    │
    ├── passes/ ............... PASSES
    │   └── page.js
    │
    ├── specialinvoices/ ...... SPECIAL INVOICES
    │   ├── page.js
    │   └── newTable.js
    │
    ├── settings/ ............. SETTINGS
    │   └── page.js
    │
    └── formulas/ ............. FORMULAS
        └── page.js
```

### **Components**
```
components/
├── backToLoginPage.js ......... Login page redirect
├── calculate.js .............. Calculation helpers
├── checkbox.js ............... Checkbox component
├── combobox.js ............... Dropdown select
├── comboboxPNL.js ............ P&L combobox
├── comboboxProductSelect.js .. Product selector
├── comboboxRemarks.js ........ Remarks selector
├── comboboxSelectStock.js .... Stock selector
├── comboboxStockAvailability. Stock availability
├── comboboxWH.js ............. Warehouse selector
├── const.js .................. Constants & sidebar links
├── dateRangePicker.js ........ Date range selector
├── exchangeApi.js ............ Currency exchange rates
├── idle.js ................... Session idle detection
├── invoicePrdSlct.js ......... Invoice product selector
├── list.js ................... List component
├── modal.js .................. Generic modal wrapper
├── modalCopyInvoice.js ....... Copy invoice modal
├── modalToProceed.js ......... Confirmation modal
├── monthSelect.js ............ Month selector
├── selectWH.js ............... Warehouse selector
├── signOut.js ................ Sign out button
├── spinner.js ................ Loading spinner
├── spinTable.js .............. Table loading spinner
├── switch.js ................. Toggle switch
├── tablePnl.js ............... P&L table
├── tlTip.js .................. Tooltip component
├── toast.js .................. Toast notifications
├── tooltip.js ................ Tooltip
├── yearSelect.js ............. Year selector
│
├── table/ .................... TABLE COMPONENTS
│   ├── ColumnsFilter.js ....... Column filter control
│   ├── header.js ............. Table header
│   ├── Paginator.js .......... Pagination control
│   ├── RowsIndicator.js ...... Rows per page indicator
│   └── filters/ .............. Filter modules
│       ├── date-between-filter.js
│       ├── filters.js
│       └── resetTabe.js
│
└── ui/ ....................... SHADCN UI COMPONENTS
    ├── accordion.jsx ......... Accordion
    ├── button.jsx ............ Button
    ├── calendar.jsx .......... Calendar
    ├── popover-form.jsx ...... Popover form
    ├── popover.jsx ........... Popover
    ├── select.jsx ............ Select
    ├── switch.jsx ............ Switch
    ├── table.jsx ............. Table
    └── tooltip.jsx ........... Tooltip
```

### **Contexts (State Management)**
```
contexts/
├── useAuthContext.js ......... Authentication context
│   ├── User state
│   ├── Sign in/out methods
│   ├── Loading state
│   └── Role-based access
│
├── useSettingsContext.js ..... Settings & company context
│   ├── Settings (dropdowns)
│   ├── Company data
│   ├── Date selection
│   ├── Language
│   └── Loading state
│
├── useContractsContext.js .... Contracts state
│   ├── Contracts data array
│   ├── Selected contract
│   ├── Modal state
│   ├── CRUD methods
│   └── Error state
│
├── useInvoiceContext.js ...... Invoices state
│   ├── Invoices data array
│   ├── Selected invoice
│   ├── Modal state
│   ├── CRUD methods
│   └── Error state
│
└── useExpensesContext.js ..... Expenses state
    ├── Expenses data array
    ├── Selected expense
    ├── Modal state
    ├── CRUD methods
    └── Error state
```

### **Hooks**
```
hooks/
├── useContractsState.js ...... Contracts state logic
├── useExpensesState.js ....... Expenses state logic
├── useInvoiceState.js ........ Invoices state logic
└── useSettingsState.js ....... Settings state logic
```

### **Utils**
```
utils/
├── firebase.js ............... Firebase initialization
│   ├── initializeApp()
│   ├── getAuth()
│   ├── getFirestore()
│   └── getStorage()
│
├── utils.js .................. Main utilities (800+ lines)
│   ├── Data fetching functions
│   │   ├── loadData()
│   │   ├── loadDataSettings()
│   │   ├── loadDataWeightAnalysis()
│   │   ├── loadCompanyExpenses()
│   │   ├── loadAcntStatement()
│   │   └── loadStockData()
│   │
│   ├── Data saving functions
│   │   ├── saveData()
│   │   ├── saveDataSettings()
│   │   ├── saveStockIn()
│   │   └── updateDocument()
│   │
│   ├── Data manipulation
│   │   ├── sortArr()
│   │   ├── getD()
│   │   ├── reOrderTable()
│   │   ├── groupedArrayInvoice()
│   │   └── filteredArray()
│   │
│   ├── Validation functions
│   │   ├── validate()
│   │   └── ErrDiv()
│   │
│   └── Deletion functions
│       ├── delDoc()
│       ├── delField()
│       └── delExpenseInContracts()
│
├── languages.js .............. Multi-language translations
│   └── getTtl() - Get translated text
│
└── actions/
    ├── validations.js ........ Email validation
    └── pass.js ............... Pass management
```

### **Public Assets**
```
public/
├── fonts/ .................... Font files
├── logo/
│   ├── gisLogo.svg
│   ├── logoNew.svg
│   ├── imsLogo.png
│   └── [other logos]
└── [other public assets]
```

### **Configuration Files**
```
Root Directory/
├── package.json .............. Dependencies & scripts
├── package-lock.json ......... Dependency lock
├── jsconfig.json ............. Path aliases & compiler options
├── tailwind.config.js ........ Tailwind CSS config
├── postcss.config.mjs ........ PostCSS config
├── next.config.mjs ........... Next.js config
├── components.json ........... Shadcn UI config
├── .env.local ................ Environment variables (NOT in repo)
├── .env.example .............. Example env file
├── .gitignore ................ Git ignore rules
├── README.md ................. Project documentation
└── ARCHITECTURE.md ........... This documentation
```

---

## 🔌 COMPONENT IMPORTS PATTERN

### **Alias Imports**
```javascript
// Instead of: ../../../utils/utils.js
import { loadData } from '@utils/utils'

// Instead of: ../../../../contexts/useAuthContext.js
import { UserAuth } from '@contexts/useAuthContext'

// Instead of: ../../../components/modal.js
import Modal from '@components/modal'

// Instead of: ../../../../app/(root)/_components/SideBar.js
import Sidebar from '@app/(root)/_components/SideBar'
```

### **Configuration in jsconfig.json**
```json
{
  "compilerOptions": {
    "paths": {
      "@*": ["./*"]  // All @alias paths resolve to root
    }
  }
}
```

---

## 🚀 COMPONENT INSTANTIATION EXAMPLE

### **How a page loads and renders**

```javascript
// 1. User navigates to /contracts
// 2. Next.js routing loads: app/(root)/contracts/page.js

// 3. page.js imports and uses:
import { useContext, useEffect, useState } from 'react';
import { SettingsContext } from "@contexts/useSettingsContext";
import { ContractsContext } from "@contexts/useContractsContext";
import { loadData } from '@utils/utils';
import Customtable from './newTable';
import MyDetailsModal from './modals/dataModal.js';

const Contracts = () => {
  // 4. Gets context values
  const { settings, dateSelect } = useContext(SettingsContext);
  const { contractsData, setContractsData } = useContext(ContractsContext);

  // 5. Loads data on mount
  useEffect(() => {
    const Load = async () => {
      let dt = await loadData(uidCollection, 'contracts', dateSelect);
      setContractsData(dt);
    };
    Load();
  }, [dateSelect]);

  // 6. Renders components
  return (
    <div>
      <Customtable data={contractsData} />
      <MyDetailsModal />
    </div>
  );
};

// 7. Component tree:
// page.js (Container)
//   ├── Customtable (newTable.js)
//   │   ├── Header (table/header.js)
//   │   ├── Rows (with icons, buttons)
//   │   └── Paginator (table/Paginator.js)
//   │
//   └── MyDetailsModal (modals/dataModal.js)
//       ├── Form inputs (combobox, dateRangePicker, etc)
//       ├── Tabs (products, invoices, expenses)
//       └── Save/Cancel buttons
```

---

This complete dependency and component map shows exactly how every file relates to every other file!

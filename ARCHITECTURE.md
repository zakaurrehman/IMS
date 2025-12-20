# 🏗️ MetalsTrade - Complete Architecture & Routing Guide

## 📍 TABLE OF CONTENTS
1. [Frontend Routing Structure](#frontend-routing-structure)
2. [Backend Integration](#backend-integration)
3. [Data Flow & State Management](#data-flow--state-management)
4. [Component Hierarchy](#component-hierarchy)
5. [File-by-File Breakdown](#file-by-file-breakdown)

---

## 🗺️ FRONTEND ROUTING STRUCTURE

### **URL Routes Map**

```
🏠 http://localhost:3000
├── / ........................... Landing/Login Page (PUBLIC)
│   └── app/page.js
│
├── (auth) ...................... Authentication Group (NOT PROTECTED)
│   ├── /signin ................. Sign In Page
│   │   └── app/(auth)/signin/login.js
│   └── /signup ................. Sign Up Page (Not implemented)
│       └── app/(auth)/signup/page.js
│
└── (root) ...................... PROTECTED ROUTES (Requires Authentication)
    ├── Sidebar & Navigation
    │   ├── app/(root)/layout.js ........... Main Layout (Sidebar + Navbar)
    │   └── app/(root)/_components/
    │       ├── SideBar.js ................ Desktop Sidebar
    │       ├── SideBarMini.js ............ Mobile Sidebar
    │       ├── MainNav.js ............... Top Navbar
    │       └── companySelect.js ......... Company Selection Dropdown
    │
    ├── 📋 CONTRACTS MANAGEMENT
    │   ├── /contracts ................... Contracts List (View/Create)
    │   │   ├── page.js ................. Main page
    │   │   ├── newTable.js ............. Data table with TanStack React Table
    │   │   ├── modals/dataModal.js ..... Create/Edit modal
    │   │   └── excel.js ................ Excel export functionality
    │   │
    │   ├── /contractsreview ............ Contract Review & Analysis
    │   │   ├── page.js
    │   │   ├── newTable.js
    │   │   ├── funcs.js ............... Calculation functions
    │   │   └── excel.js
    │   │
    │   └── /contractsstatement ......... Contract Statements & Reports
    │       ├── page.js
    │       ├── newTable.js
    │       ├── newTable1.js
    │       └── totals/tableTotals.js
    │
    ├── 📄 INVOICES MANAGEMENT
    │   ├── /invoices ................... Invoices List (View/Create)
    │   │   ├── page.js
    │   │   ├── newTable.js
    │   │   ├── modals/dataModal.js
    │   │   └── excel.js
    │   │
    │   ├── /invoicesreview ............ Invoice Analysis & Review
    │   │   ├── page.js
    │   │   ├── newTable.js
    │   │   └── excel.js
    │   │
    │   └── /invoicesstatement ......... Invoice Statements
    │       ├── page.js
    │       └── totals/tableTotals.js
    │
    ├── 💰 EXPENSES MANAGEMENT
    │   ├── /expenses ................... Company Expenses
    │   │   ├── page.js
    │   │   ├── newTable.js
    │   │   ├── modals/dataModal.js
    │   │   └── excel.js
    │   │
    │   └── /companyexpenses ........... Company-wide Expenses
    │       ├── page.js
    │       ├── newTable.js
    │       └── excel.js
    │
    ├── 📊 ANALYTICS & REPORTING
    │   ├── /analysis .................. Weight/Quantity Analysis
    │   │   ├── page.js
    │   │   ├── newTable.js
    │   │   └── excel.js
    │   │
    │   ├── /margins ................... Profit Margin Analysis
    │   │   ├── page.js
    │   │   └── newTable.js
    │   │
    │   └── /cashflow .................. Cash Flow Analysis
    │       ├── page.js
    │       ├── accordion.js
    │       └── funcs.js
    │
    ├── 📦 INVENTORY & STOCK
    │   ├── /stocks .................... Stock Tracking
    │   │   ├── page.js
    │   │   ├── whModal.js ............. Warehouse modal
    │   │   └── shipmentsTable.js
    │   │
    │   ├── /inventoryreview ........... Inventory Review
    │   │   ├── page.js
    │   │   └── excel.js
    │   │
    │   ├── /materialtables ............ Material/Goods Tables
    │   │   ├── page.js
    │   │   ├── newTable.js
    │   │   └── totals.js
    │   │
    │   └── /accstatement .............. Accounting Statement
    │       ├── page.js
    │       ├── newTable.js
    │       └── excel.js
    │
    ├── ⚙️ CONFIGURATION
    │   ├── /settings .................. User Settings
    │   │   └── page.js
    │   │
    │   ├── /formulas .................. Business Formulas
    │   │   └── page.js
    │   │
    │   └── /dashboard ................. Main Dashboard (if exists)
    │       └── page.js
    │
    └── 👤 SPECIAL ROUTES
        ├── /accounting ................ Accounting User View
        │   └── page.js
        │
        ├── /passes .................... Pass Management
        │   └── page.js
        │
        └── /specialinvoices ........... Special Invoice Handling
            ├── page.js
            └── newTable.js
```

---

## 🔌 BACKEND INTEGRATION

### **Firebase Backend Structure**

```
Firebase Project: "metalstrade-web"
├── Authentication (Firebase Auth)
│   ├── Email/Password Sign In
│   ├── Custom Claims Storage
│   │   ├── uidCollection ........ User's unique database ID
│   │   └── title ................. User role (Accounting, Manager, etc)
│   └── Session Management
│
└── Firestore Database
    └── [uidCollection] (User Account Root)
        ├── /data/
        │   ├── contracts_2024 ... Contracts for year 2024
        │   ├── contracts_2025 ... Contracts for year 2025
        │   ├── invoices_2024 .... Invoices for year 2024
        │   ├── invoices_2025 .... Invoices for year 2025
        │   ├── expenses_2024 .... Expenses for year 2024
        │   ├── expenses_2025 .... Expenses for year 2025
        │   └── [More data collections]
        │
        ├── cmpnyData ............. Company Information
        │   ├── name
        │   ├── currency
        │   ├── lng (language)
        │   └── [Other company settings]
        │
        ├── settings .............. User Settings
        │   ├── Supplier .......... Supplier dropdown options
        │   ├── Shipment .......... Shipment types
        │   ├── Origin ............ Origin countries
        │   ├── Delivery Terms .... Terms options
        │   ├── POL ............... Port of Loading
        │   ├── POD ............... Port of Discharge
        │   ├── Currency .......... Currency options
        │   └── [More settings]
        │
        ├── invoiceNum ............ Invoice counter
        │   └── num: 12345
        │
        └── [Other document collections]
```

---

## 📊 DATA FLOW & STATE MANAGEMENT

### **Authentication Flow**

```
1. USER VISITS SITE
   ↓
2. app/page.js (Landing Page)
   ├── Shows Login Modal
   └── User enters Email & Password
   ↓
3. LOGIN.JS HANDLES SUBMISSION
   ├── Calls SignIn(email, password)
   └── Firebase Auth validates
   ↓
4. useAuthContext.js HANDLES AUTH
   ├── onAuthStateChanged() listener
   ├── Gets Firebase custom claims
   │   ├── uidCollection
   │   └── userTitle (role)
   ├── Sets sessionStorage values
   ├── Loads user data
   │   ├── cmpnyData → SettingsContext
   │   └── settings → SettingsContext
   └── Redirects based on role
       ├── If "Accounting" → /accounting
       └── Else → /contracts
   ↓
5. (root)/layout.js LOADS
   ├── Checks authentication
   ├── Loads Sidebar & Navbar
   └── Renders page content
   ↓
6. PAGE CONTENT LOADS
   ├── Fetches data from Firestore
   ├── Updates Context state
   └── Displays in table/cards
```

### **State Management Architecture**

```
📦 Context Providers (app/providers.js)
│
├── 🔐 AuthContext (useAuthContext.js)
│   ├── user (Firebase user object)
│   ├── uidCollection (User's DB ID)
│   ├── userTitle (Role: Accounting, etc)
│   ├── loadingPage (Loading state)
│   └── Methods: SignIn(), SignOut()
│
├── ⚙️ SettingsContext (useSettingsContext.js)
│   ├── settings (Dropdown options)
│   ├── compData (Company info)
│   ├── dateSelect (Date range filter)
│   ├── loading (Page loading state)
│   ├── ln (Language)
│   └── Methods: setSettings(), setCompData()
│
├── 📋 ContractsContext (useContractsContext.js)
│   ├── contractsData (All contracts)
│   ├── valueCon (Selected contract)
│   ├── isOpenCon (Modal open state)
│   └── Methods: addContract(), saveData()
│
├── 📄 InvoiceContext (useInvoiceContext.js)
│   ├── invoicesData (All invoices)
│   ├── valueInv (Selected invoice)
│   ├── isOpen (Modal open state)
│   └── Methods: addInvoice(), saveData()
│
└── 💰 ExpensesContext (useExpensesContext.js)
    ├── expensesData (All expenses)
    ├── valueExp (Selected expense)
    ├── isOpen (Modal open state)
    └── Methods: addExpense(), saveData()
```

---

## 🎯 COMPONENT HIERARCHY

### **Layout Structure**

```
app/layout.js (Root Layout)
└── Providers (All Context Providers)
    └── app/page.js (Landing/Login) OR
    
    └── (root)/layout.js (Protected Layout)
        ├── Sidebar (Desktop)
        │   └── Links to all pages
        ├── SideBarMini (Mobile)
        │   └── Mobile version of sidebar
        ├── MainNav (Top Navbar)
        │   ├── Logo
        │   ├── Company selector
        │   ├── Notifications
        │   └── User menu
        │
        └── Page Content
            ├── DateRangePicker (Filter)
            ├── Table Component
            │   ├── Header (Sorting, Filtering)
            │   ├── Body (Data rows)
            │   ├── Footer (Pagination)
            │   └── Actions (Edit, Delete, Export)
            └── Modals
                ├── Create/Edit Modal
                ├── Delete Confirmation
                └── Toast Notifications
```

---

## 📂 FILE-BY-FILE BREAKDOWN

### **Core Application Files**

| File | Purpose | Called By |
|------|---------|-----------|
| `app/layout.js` | Root layout, loads providers | Next.js |
| `app/page.js` | Landing/Login page | Root route `/` |
| `app/providers.js` | All context providers wrapper | app/layout.js |
| `app/globals.css` | Global styles & Tailwind | app/layout.js |

### **Authentication Files**

| File | Purpose | Called By |
|------|---------|-----------|
| `contexts/useAuthContext.js` | Auth state & logic | All pages in (root) |
| `app/(auth)/signin/login.js` | Login modal form | app/page.js |
| `utils/firebase.js` | Firebase initialization | useAuthContext.js |
| `actions/validations.js` | Email/password validation | login.js |

### **Navigation & Layout Files**

| File | Purpose | Called By |
|------|---------|-----------|
| `app/(root)/layout.js` | Protected routes layout | (root) route group |
| `app/(root)/_components/SideBar.js` | Desktop navigation sidebar | (root)/layout.js |
| `app/(root)/_components/SideBarMini.js` | Mobile navigation | (root)/layout.js |
| `app/(root)/_components/MainNav.js` | Top navbar | (root)/layout.js |
| `app/(root)/_components/companySelect.js` | Company selector | SideBar.js, MainNav.js |

### **Data Management Files**

| File | Purpose | Called By |
|------|---------|-----------|
| `contexts/useContractsContext.js` | Contracts state | contract pages |
| `contexts/useInvoiceContext.js` | Invoices state | invoice pages |
| `contexts/useExpensesContext.js` | Expenses state | expense pages |
| `contexts/useSettingsContext.js` | Settings & company data | All pages |
| `utils/utils.js` | Firebase data operations | All pages |

### **Page Files (Example: Contracts)**

| File | Purpose | Data Flow |
|------|---------|-----------|
| `app/(root)/contracts/page.js` | Main contracts page | Loads → Sets state → Renders table |
| `app/(root)/contracts/newTable.js` | Contracts table component | Receives data → Shows formatted table |
| `app/(root)/contracts/modals/dataModal.js` | Create/Edit modal | Form → Saves to Firebase |
| `app/(root)/contracts/excel.js` | Excel export logic | Formats data → ExcelJS → Download |

### **Reusable Components**

| File | Purpose | Used In |
|------|---------|---------|
| `components/modal.js` | Generic modal wrapper | All pages with dialogs |
| `components/toast.js` | Toast notifications | Success/error messages |
| `components/dateRangePicker.js` | Date range selector | Contracts, Invoices, Expenses |
| `components/table/header.js` | Table header with sorting | All data tables |
| `components/table/Paginator.js` | Pagination controls | All data tables |
| `components/table/filters/` | Filter components | Advanced filtering |

### **Utility Files**

| File | Purpose | Key Functions |
|------|---------|---|
| `utils/utils.js` | Firestore operations | loadData(), saveData(), updateDoc(), etc |
| `utils/firebase.js` | Firebase SDK init | auth, db, storage exports |
| `utils/languages.js` | Multi-language support | getTtl() for translations |
| `components/exchangeApi.js` | Currency exchange rates | getCur() for historical rates |

---

## 🔄 COMPLETE DATA FLOW EXAMPLE: Creating a Contract

```
1. USER CLICKS "NEW CONTRACT" BUTTON
   └── app/(root)/contracts/page.js → addNewContract()

2. MODAL OPENS
   └── ContractsContext → setIsOpenCon(true)

3. USER FILLS FORM
   ├── Changes trigger: setValueCon({ ...valueCon, field: value })
   └── Form data stored in ContractsContext

4. USER CLICKS "SAVE"
   └── contracts/modals/dataModal.js → handleSave()

5. DATA VALIDATION
   └── utils/utils.js → validate()

6. SAVE TO FIREBASE
   ├── utils/utils.js → saveData(uidCollection, 'contracts', contract)
   ├── Gets year from date: const y = contract.date.substring(0, 4)
   ├── Firestore path: uidCollection/data/contracts_2024
   └── setDoc(doc(db, uidCollection, 'data', 'contracts_' + y, contract.id), contract)

7. UPDATE CONTEXT
   └── ContractsContext → setContractsData([...contracts, newContract])

8. REFRESH TABLE
   └── page.js → re-renders with new data

9. SHOW SUCCESS
   └── components/toast.js → Toast("Contract saved!")
```

---

## 🌐 API & External Services

### **External APIs Used**

```
1. 📈 OpenExchangeRates API
   ├── Endpoint: https://openexchangerates.org/api/historical/{date}.json
   ├── Purpose: Get historical currency exchange rates
   ├── Called in: components/exchangeApi.js
   └── Used for: Invoice currency conversion

2. 🔌 Firebase Services
   ├── Authentication
   ├── Firestore (Database)
   └── Cloud Storage (File uploads)
```

---

## 🚀 DEPLOYMENT & HOSTING

```
Production:
├── Frontend: Deployed on Vercel (Next.js)
├── Backend: Firebase (Firestore + Auth + Storage)
└── Environment Variables (.env.local):
    ├── NEXT_PUBLIC_API_KEY
    ├── NEXT_PUBLIC_AUTH_DOMAIN
    ├── NEXT_PUBLIC_PROJECT_ID
    └── [Other Firebase config]
```

---

## 📋 QUICK REFERENCE

### **Common Tasks & Files**

| Task | Files Involved |
|------|---|
| Add new page | Create `app/(root)/newpage/page.js` |
| Add new context | Create `contexts/useNewContext.js`, add to providers.js |
| Fetch Firestore data | Use `utils/utils.js` → `loadData()` |
| Save to Firestore | Use `utils/utils.js` → `saveData()` |
| Create modal form | Use `components/modal.js` wrapper |
| Add table | Use `components/table/` components + TanStack React Table |
| Export Excel | Use `excel.js` file in each module |
| Add translation | Edit `utils/languages.js` |
| Style component | Use Tailwind CSS classes |

---

## 🎓 UNDERSTANDING THE FLOW

### **User Journey: From Login to Viewing Contracts**

```
1. User lands on http://localhost:3000
   ↓ (app/page.js renders)
   
2. Clicks "Sign In"
   ↓ (login.js opens modal)
   
3. Enters credentials & submits
   ↓ (Firebase Auth validates)
   
4. Auth successful
   ↓ (useAuthContext.js updates state)
   
5. Redirected to /contracts
   ↓ (app/(root)/layout.js loads)
   
6. Layout renders with Sidebar + Navbar
   ↓ (app/(root)/contracts/page.js mounts)
   
7. useEffect() triggers
   ├── loadData(uidCollection, 'contracts', dateSelect)
   ├── Queries Firestore
   └── Returns array of contracts
   
8. setContractsData(data) updates context
   ↓ (app/(root)/contracts/newTable.js re-renders)
   
9. TanStack React Table formats data
   ↓ (Displays in interactive table)
   
10. User can now:
    ├── Sort columns
    ├── Filter by date/supplier
    ├── Paginate
    ├── Select & edit rows
    ├── Export to Excel
    └── Create new contracts
```

---

**This document explains the complete architecture. Reference it when:**
- Adding new features
- Debugging data flow
- Understanding component relationships
- Planning database queries
- Creating new pages


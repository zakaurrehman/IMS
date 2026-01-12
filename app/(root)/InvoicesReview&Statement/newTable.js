'use client'

import Header from "../../../components/table/header";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";

import { useEffect, useMemo, useState, useContext } from "react";
import { TbSortDescending, TbSortAscending } from "react-icons/tb";

import { Paginator } from "../../../components/table/Paginator";
import RowsIndicator from "../../../components/table/RowsIndicator";


import { SettingsContext } from "../../../contexts/useSettingsContext";
import { usePathname } from "next/navigation";
import { getTtl } from "../../../utils/languages";

import FiltersIcon from '../../../components/table/filters/filters';
import ResetFilterTableIcon from '../../../components/table/filters/resetTabe';
import dateBetweenFilterFn from '../../../components/table/filters/date-between-filter';
import { Filter } from "../../../components/table/filters/filterFunc";

const Customtable = ({
  data,
  columns,
  invisible,
  SelectRow,
  excellReport,
  setFilteredData,
  highlightId,
  onCellUpdate
}) => {

  const [globalFilter, setGlobalFilter] = useState('');
  const [columnVisibility, setColumnVisibility] = useState(invisible);
  const [filterOn, setFilterOn] = useState(false);

  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 200
  });

  const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]);

  usePathname();
  const { ln } = useContext(SettingsContext);

  const [quickSumEnabled, setQuickSumEnabled] = useState(false);
  const [quickSumColumns, setQuickSumColumns] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);

  /* ---------- Selection Column ---------- */
  const columnsWithSelection = useMemo(() => {
    if (!quickSumEnabled) return columns;

    return [
      {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            ref={el => el && (el.indeterminate = table.getIsSomePageRowsSelected())}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            className="w-4 h-4 accent-blue-600 cursor-pointer"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
            className="w-4 h-4 accent-blue-600 cursor-pointer"
          />
        ),
        enableSorting: false,
        enableColumnFilter: false,
        size: 56,
      },
      ...(columns || [])
    ];
  }, [columns, quickSumEnabled]);

  /* ---------- TABLE ---------- */
  const table = useReactTable({
    data,
    columns: columnsWithSelection,
    enableRowSelection: quickSumEnabled,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    filterFns: { dateBetweenFilterFn },
    state: {
      globalFilter,
      columnVisibility,
      pagination,
      columnFilters,
      rowSelection,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
  });

  const resetTable = () => table.resetColumnFilters();

  useEffect(() => {
    setFilteredData(
      table.getFilteredRowModel().rows.map(r => r.original)
    );
  }, [globalFilter, columnFilters]);

  return (
    <div className="flex flex-col relative">

      {/* ---------- HEADER ---------- */}
      <Header
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        table={table}
        excellReport={excellReport}
        filterIcon={FiltersIcon(ln, filterOn, setFilterOn)}
        resetFilterTable={ResetFilterTableIcon(ln, resetTable, filterOn)}
        quickSumEnabled={quickSumEnabled}
        setQuickSumEnabled={setQuickSumEnabled}
        quickSumColumns={quickSumColumns}
        setQuickSumColumns={setQuickSumColumns}
      />

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-auto max-h-[720px]
        border-2 border-gray-300 rounded-xl
        bg-gradient-to-br from-gray-50 to-gray-100
        shadow-[0_10px_24px_rgba(0,0,0,0.18)]">

        <table className="w-full table-auto border-collapse">

          {/* THEAD */}
          <thead className="sticky top-0 z-20">
            {table.getHeaderGroups().map(group => (
              <tr key={group.id}
                className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800
                shadow-[0_4px_12px_rgba(0,0,0,0.25)]">

                {group.headers.map(header => (
                  <th key={header.id}
                    className="px-6 py-4 text-xs uppercase font-bold text-white
                    border-r border-blue-500/30 last:border-r-0 whitespace-nowrap">

                    {header.column.getCanSort() ? (
                      <div
                        onClick={header.column.getToggleSortingHandler()}
                        className="flex items-center gap-2 cursor-pointer select-none">
                        {header.column.columnDef.header}
                        {{
                          asc: <TbSortAscending />,
                          desc: <TbSortDescending />
                        }[header.column.getIsSorted()]}
                      </div>
                    ) : header.column.columnDef.header}
                  </th>
                ))}
              </tr>
            ))}

            {filterOn && (
              <tr className="bg-white shadow-md">
                {table.getHeaderGroups()[0].headers.map(header => (
                  <th key={header.id} className="px-4 py-3">
                    {header.column.getCanFilter() && (
                      <Filter column={header.column} table={table} filterOn={filterOn} />
                    )}
                  </th>
                ))}
              </tr>
            )}
          </thead>

          {/* TBODY */}
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr
                key={row.id}
                onDoubleClick={() => SelectRow(row.original)}
                className={`transition-all cursor-pointer
                  ${row.getIsSelected()
                    ? 'bg-blue-50'
                    : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50'}`}
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-3 text-xs">
                    <div className="px-4 py-2 bg-white rounded-lg
                      shadow-[0_2px_6px_rgba(0,0,0,0.1)]
                      hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARD VIEW ================= */}
      <div className="block md:hidden p-2 space-y-4 max-h-[600px] overflow-y-auto
        bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">

        {table.getRowModel().rows.map((row, index) => (
          <div key={row.id}
            className={`rounded-xl border-2 border-gray-300 bg-white
            shadow-[0_6px_16px_rgba(0,0,0,0.15)]
            ${row.getIsSelected() ? 'ring-2 ring-blue-500' : ''}`}>

            {/* Card Header */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800
              px-4 py-3 rounded-t-xl flex justify-between items-center">
              <span className="text-white font-bold text-sm">
                {getTtl('Row', ln)} {index + 1}
              </span>
              {quickSumEnabled && (
                <input
                  type="checkbox"
                  checked={row.getIsSelected()}
                  onChange={row.getToggleSelectedHandler()}
                  className="w-5 h-5 accent-blue-600"
                />
              )}
            </div>

            {/* Card Content */}
            <div className="p-4 space-y-3">
              {row.getVisibleCells().map(cell => {
                if (cell.column.id === 'select') return null;
                return (
                  <div key={cell.id}>
                    <div className="text-xs font-bold text-blue-700 uppercase mb-1">
                      {cell.column.columnDef.header}
                    </div>
                    <div className="px-4 py-3 bg-white rounded-lg
                      shadow-[0_2px_6px_rgba(0,0,0,0.1)]">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ================= FOOTER ================= */}
      <div className="flex flex-wrap items-center gap-3 p-4
        border-2 border-t-0 border-gray-300 rounded-b-xl
        bg-gradient-to-br from-white via-gray-50 to-white
        shadow-[0_8px_16px_rgba(0,0,0,0.15)]">

        <div className="hidden lg:flex text-sm text-gray-700 font-medium">
          {`${getTtl('Showing', ln)} ${pageIndex * pageSize + 1}–
          ${table.getRowModel().rows.length + pageIndex * pageSize}
          ${getTtl('of', ln)} ${table.getFilteredRowModel().rows.length}`}
        </div>

        <Paginator table={table} />
        <RowsIndicator table={table} />
      </div>

    </div>
  );
};

export default Customtable;

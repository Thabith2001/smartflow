'use client';
import { useState } from 'react';
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa';

interface Column {
  header: string;
  accessor: string;
  render?: (row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  title?: string;
}

export default function DataTable({ columns, data, onEdit, onDelete, title }: DataTableProps) {
  const [query, setQuery] = useState('');

  const filteredData = data.filter((row) =>
    Object.values(row).some((val) => String(val).toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden transition-all">
      {/* Table Header with Search */}
      <div className="p-8 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {title && <h2 className="text-xl font-bold text-slate-800">{title}</h2>}
        <div className="relative group">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Search records..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-11 pr-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-full md:w-64"
          />
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-y border-slate-100">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="py-4 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest"
                >
                  {col.header}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="py-4 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredData.map((row, rowIdx) => (
              <tr key={rowIdx} className="group hover:bg-slate-50/80 transition-all">
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className="py-5 px-8 text-sm text-slate-600 font-medium">
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}

                {/* Action Buttons */}
                {(onEdit || onDelete) && (
                  <td className="py-5 px-8 text-right">
                    <div className="flex justify-end gap-2">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="p-2.5 bg-white text-slate-400 rounded-xl border border-slate-100 hover:text-blue-600 hover:border-blue-200 hover:shadow-sm transition-all"
                        >
                          <FaEdit size={14} />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="p-2.5 bg-white text-red-400 rounded-xl border border-slate-100 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all"
                        >
                          <FaTrash size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="p-6 bg-slate-50/30 border-t border-slate-50 text-center">
        <p className="text-[10px] font-bold text-slate-400 uppercase">
          Showing {filteredData.length} of {data.length} records
        </p>
      </div>
    </div>
  );
}

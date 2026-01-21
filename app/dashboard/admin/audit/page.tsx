'use client';
import RoleGuard from '../../../components/RoleGuard';
import { FaClipboardList } from 'react-icons/fa';
import { useState, useMemo } from 'react';

type Log = {
  id: number;
  action: string;
  actor: string;
  role: string;
  module: string;
  description: string;
  oldValue?: string;
  newValue?: string;
  time: string;
  ip?: string;
  device?: string;
};

const initialLogs: Log[] = [
  {
    id: 1,
    action: 'LOGIN',
    actor: 'Alice Admin',
    role: 'ADMIN',
    module: 'Authentication',
    description: 'User logged in successfully',
    time: '2026-01-13 20:45',
    ip: '192.168.1.10',
    device: 'Chrome on Windows 11',
  },
  {
    id: 2,
    action: 'DELETE',
    actor: 'Alice Admin',
    role: 'ADMIN',
    module: 'Users',
    description: 'Deleted Manager account',
    oldValue: 'Manager: Bob Manager',
    newValue: 'Removed',
    time: '2026-01-13 20:50',
    ip: '192.168.1.10',
    device: 'Chrome on Windows 11',
  },
  {
    id: 3,
    action: 'UPDATE',
    actor: 'Alice Admin',
    role: 'ADMIN',
    module: 'Finance',
    description: 'Updated payout policy',
    oldValue: 'Monthly payout: 5000',
    newValue: 'Monthly payout: 5500',
    time: '2026-01-13 21:05',
    ip: '192.168.1.10',
    device: 'Chrome on Windows 11',
  },
  {
    id: 4,
    action: 'CREATE',
    actor: 'Bob Manager',
    role: 'MANAGER',
    module: 'Employees',
    description: 'Added new technician',
    oldValue: '-',
    newValue: 'Technician: Charlie Tech',
    time: '2026-01-14 10:30',
    ip: '192.168.1.11',
    device: 'Firefox on Windows 10',
  },
];

export default function AdminAuditPage() {
  const [logs] = useState<Log[]>(initialLogs);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<keyof Log>('time');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 5;

  // Filtered and sorted logs
  const filteredLogs = useMemo(() => {
    let filtered = logs.filter(
      (log) =>
        log.actor.toLowerCase().includes(search.toLowerCase()) ||
        log.action.toLowerCase().includes(search.toLowerCase()) ||
        log.module.toLowerCase().includes(search.toLowerCase()) ||
        log.role.toLowerCase().includes(search.toLowerCase())
    );

    filtered.sort((a, b) => {
      const aVal = a[sortKey] || '';
      const bVal = b[sortKey] || '';
      if (sortKey === 'time') {
        return sortOrder === 'asc'
          ? new Date(a.time).getTime() - new Date(b.time).getTime()
          : new Date(b.time).getTime() - new Date(a.time).getTime();
      }
      return sortOrder === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    return filtered;
  }, [logs, search, sortKey, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const currentLogs = filteredLogs.slice(
    (currentPage - 1) * logsPerPage,
    currentPage * logsPerPage
  );

  const toggleSort = (key: keyof Log) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const actionColor = (action: string) => {
    switch (action) {
      case 'DELETE':
        return 'text-red-700 border-red-200';
      case 'UPDATE':
        return 'text-yellow-800 border-yellow-200';
      case 'CREATE':
        return 'text-green-700 border-green-200';
      case 'LOGIN':
        return 'text-blue-700 border-blue-200';
      default:
        return 'text-gray-700 border-gray-200';
    }
  };

  return (
    <RoleGuard allow={['ADMIN']}>
      <div className="p-8 space-y-6 font-sans text-gray-800">
        {/* Header */}
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
            <FaClipboardList className="text-blue-600 text-xl" /> Audit Logs
          </h1>
          <p className="text-sm text-slate-500">View, search and manage all system audit logs</p>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by actor, action, module, role..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />

        {/* Table Container */}
        <div className="bg-white rounded-lg border border-gray-300 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px] text-sm">
            <thead className="bg-gray-50 border-b border-gray-300">
              <tr>
                {[
                  { label: 'Action', key: 'action' },
                  { label: 'Actor', key: 'actor' },
                  { label: 'Role', key: 'role' },
                  { label: 'Module', key: 'module' },
                  { label: 'Description', key: 'description' },
                  { label: 'Old Value', key: 'oldValue' },
                  { label: 'New Value', key: 'newValue' },
                  { label: 'IP', key: 'ip' },
                  { label: 'Device', key: 'device' },
                  { label: 'Time', key: 'time' },
                ].map((col) => (
                  <th
                    key={col.key}
                    className="px-4 py-3 text-gray-600 font-medium cursor-pointer select-none border-b border-gray-300"
                    onClick={() => toggleSort(col.key as keyof Log)}
                  >
                    {col.label}{' '}
                    {sortKey === col.key ? <span>{sortOrder === 'asc' ? '▲' : '▼'}</span> : ''}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentLogs.map((log) => (
                <tr
                  key={log.id}
                  className="border-b border-gray-200 hover:bg-blue-50 transition-colors duration-150"
                >
                  <td
                    className={`px-4 py-2 font-semibold rounded-lg border ${actionColor(log.action)}`}
                  >
                    {log.action}
                  </td>
                  <td className="px-4 py-2 border">{log.actor}</td>
                  <td className="px-4 py-2 border">{log.role}</td>
                  <td className="px-4 py-2 border">{log.module}</td>
                  <td className="px-4 py-2 border">{log.description}</td>
                  <td className="px-4 py-2 border">{log.oldValue || '-'}</td>
                  <td className="px-4 py-2 border">{log.newValue || '-'}</td>
                  <td className="px-4 py-2 border">{log.ip || '-'}</td>
                  <td className="px-4 py-2 border">{log.device || '-'}</td>
                  <td className="px-4 py-2 border">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-slate-600">
            Page {currentPage} of {totalPages}
          </span>

          <div className="space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-4 py-2 border rounded-lg text-sm text-blue-600 hover:bg-blue-50 disabled:opacity-40"
            >
              Previous
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 py-2 border rounded-lg text-sm text-blue-600 hover:bg-blue-50 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}

'use client';
import RoleGuard from '../../components/RoleGuard';
import { useState, useMemo } from 'react';
import { FaTrash, FaEdit, FaEye, FaPlus, FaFileCsv, FaFilePdf } from 'react-icons/fa';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Vendor Type
type Vendor = {
  id: string;
  name: string;
  service: string;
  status: 'Active' | 'Inactive';
};

// Initial dummy data
const initialVendors: Vendor[] = [
  { id: 'v1', name: 'CleanPro', service: 'Cleaning', status: 'Active' },
  { id: 'v2', name: 'FixItNow', service: 'Repairs', status: 'Active' },
  { id: 'v3', name: 'SafeGuard', service: 'Security', status: 'Inactive' },
  { id: 'v4', name: 'SparkTech', service: 'Maintenance', status: 'Active' },
];

export default function VendorsDashboard() {
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
  const [search, setSearch] = useState('');
  const [filterService, setFilterService] = useState('All');
  const [modal, setModal] = useState<{ type: 'add' | 'edit' | 'view'; vendor?: Vendor } | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  // Filtered & searched vendors
  const filteredVendors = useMemo(() => {
    return vendors
      .filter((v) => (filterService === 'All' ? true : v.service === filterService))
      .filter((v) => v.name.toLowerCase().includes(search.toLowerCase()));
  }, [vendors, search, filterService]);

  // Pagination
  const paginatedVendors = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filteredVendors.slice(start, start + perPage);
  }, [filteredVendors, currentPage]);

  // Stats
  const totalVendors = vendors.length;
  const activeVendors = vendors.filter((v) => v.status === 'Active').length;
  const inactiveVendors = vendors.filter((v) => v.status === 'Inactive').length;

  // Handlers
  const toggleStatus = (id: string) => {
    setVendors(
      vendors.map((v) =>
        v.id === id ? { ...v, status: v.status === 'Active' ? 'Inactive' : 'Active' } : v
      )
    );
  };

  const deleteVendor = (id: string) => {
    if (confirm('Are you sure you want to delete this vendor?')) {
      setVendors(vendors.filter((v) => v.id !== id));
    }
  };

  const saveVendor = (vendor: Vendor) => {
    if (modal?.type === 'add') {
      setVendors([...vendors, vendor]);
    } else if (modal?.type === 'edit') {
      setVendors(vendors.map((v) => (v.id === vendor.id ? vendor : v)));
    }
    setModal(null);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Vendor List', 14, 16);
    const tableData = vendors.map((v) => [v.name, v.service, v.status]);
    (doc as any).autoTable({
      head: [['Name', 'Service', 'Status']],
      body: tableData,
      startY: 20,
    });
    doc.save('vendors.pdf');
  };

  return (
    <RoleGuard allow={['MANAGER', 'ADMIN']}>
      <div className="p-8 space-y-6 font-inter bg-neutral-50 min-h-full">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-semibold text-neutral-900 tracking-tight">
            Vendor <span className="text-blue-600">Dashboard</span>
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => setModal({ type: 'add' })}
              className="flex items-center gap-2 bg-blue-600 px-4 py-2 text-white rounded hover:bg-blue-500"
            >
              <FaPlus /> Add Vendor
            </button>
            <CSVLink
              data={vendors}
              filename="vendors.csv"
              className="bg-green-600 px-4 py-2 text-white rounded hover:bg-green-500 flex items-center gap-2"
            >
              <FaFileCsv /> CSV
            </CSVLink>
            <button
              onClick={exportPDF}
              className="bg-red-600 px-4 py-2 text-white rounded hover:bg-red-500 flex items-center gap-2"
            >
              <FaFilePdf /> PDF
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard label="Total Vendors" value={totalVendors} color="blue" />
          <StatCard label="Active Vendors" value={activeVendors} color="green" />
          <StatCard label="Inactive Vendors" value={inactiveVendors} color="red" />
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
          <input
            type="text"
            placeholder="Search Vendor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterService}
            onChange={(e) => setFilterService(e.target.value)}
            className="border rounded px-4 py-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>All</option>
            <option>Cleaning</option>
            <option>Repairs</option>
            <option>Maintenance</option>
            <option>Security</option>
          </select>
        </div>

        {/* Vendor Table */}
        <div className="overflow-x-auto rounded border bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Service</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedVendors.map((v) => (
                <tr key={v.id} className="border-t hover:bg-neutral-50">
                  <td className="px-4 py-2">{v.name}</td>
                  <td className="px-4 py-2">{v.service}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => toggleStatus(v.id)}
                      className={`px-2 py-1 rounded text-white ${
                        v.status === 'Active'
                          ? 'bg-green-600 hover:bg-green-500'
                          : 'bg-red-600 hover:bg-red-500'
                      }`}
                    >
                      {v.status}
                    </button>
                  </td>
                  <td className="px-4 py-2 text-center flex justify-center gap-2">
                    <button
                      onClick={() => setModal({ type: 'view', vendor: v })}
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <FaEye /> View
                    </button>
                    <button
                      onClick={() => setModal({ type: 'edit', vendor: v })}
                      className="text-amber-600 hover:underline flex items-center gap-1"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => deleteVendor(v.id)}
                      className="text-red-600 hover:underline flex items-center gap-1"
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end gap-2 mt-2">
          {Array.from({ length: Math.ceil(filteredVendors.length / perPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Modal */}
        {modal && (
          <VendorModal
            type={modal.type}
            vendor={modal.vendor}
            onClose={() => setModal(null)}
            onSave={saveVendor}
          />
        )}
      </div>
    </RoleGuard>
  );
}

// StatCard Component
function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  const colorMap: any = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
  };
  return (
    <div
      className={`p-6 rounded-xl border border-neutral-200 ${colorMap[color]} font-medium shadow-sm`}
    >
      <p className="text-xs">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

// Vendor Modal Component
function VendorModal({ type, vendor, onClose, onSave }: any) {
  const [name, setName] = useState(vendor?.name || '');
  const [service, setService] = useState(vendor?.service || 'Cleaning');
  const [status, setStatus] = useState(vendor?.status || 'Active');

  const handleSubmit = () => {
    const id = vendor?.id || `v${Date.now()}`;
    onSave({ id, name, service, status });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold">
          {type === 'add' && 'Add Vendor'}
          {type === 'edit' && 'Edit Vendor'}
          {type === 'view' && 'Vendor Details'}
        </h2>

        {type !== 'view' ? (
          <>
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Service</label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="mt-1 w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option>Cleaning</option>
                <option>Repairs</option>
                <option>Maintenance</option>
                <option>Security</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={status === 'Active'}
                onChange={() => setStatus(status === 'Active' ? 'Inactive' : 'Active')}
              />
              <span>Status Active</span>
            </div>
          </>
        ) : (
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {name}
            </p>
            <p>
              <strong>Service:</strong> {service}
            </p>
            <p>
              <strong>Status:</strong> {status}
            </p>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 rounded border hover:bg-gray-100">
            Close
          </button>
          {type !== 'view' && (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

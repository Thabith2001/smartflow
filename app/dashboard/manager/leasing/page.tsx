'use client';
import { useState, useMemo } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

type Lease = {
  id: string;
  property: string;
  tenant: string;
  rent: number;
  status: 'Active' | 'Pending' | 'Ended';
  startDate: string;
  endDate: string;
};

const initialLeases: Lease[] = [
  {
    id: 'l1',
    property: 'Apartment A1',
    tenant: 'Meera Silva',
    rent: 45000,
    status: 'Active',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
  },
  {
    id: 'l2',
    property: 'Apartment B2',
    tenant: 'Nuwan Perera',
    rent: 52000,
    status: 'Pending',
    startDate: '2026-02-01',
    endDate: '2026-12-31',
  },
];

export default function LeasingPage() {
  const [leases, setLeases] = useState<Lease[]>(initialLeases);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const leasesPerPage = 5;

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLease, setEditingLease] = useState<Lease | null>(null);
  const [leaseForm, setLeaseForm] = useState<Partial<Lease>>({
    property: '',
    tenant: '',
    rent: 0,
    status: 'Active',
    startDate: '',
    endDate: '',
  });

  // Filter leases
  const filteredLeases = useMemo(() => {
    return leases.filter(
      (l) =>
        l.property.toLowerCase().includes(search.toLowerCase()) ||
        l.tenant.toLowerCase().includes(search.toLowerCase()) ||
        l.status.toLowerCase().includes(search.toLowerCase())
    );
  }, [leases, search]);

  const totalPages = Math.ceil(filteredLeases.length / leasesPerPage);
  const currentLeases = filteredLeases.slice(
    (currentPage - 1) * leasesPerPage,
    currentPage * leasesPerPage
  );

  // Actions
  const endLease = (id: string) =>
    setLeases(leases.map((l) => (l.id === id ? { ...l, status: 'Ended' } : l)));

  const deleteLease = (id: string) => setLeases(leases.filter((l) => l.id !== id));

  const openAddModal = () => {
    setLeaseForm({
      property: '',
      tenant: '',
      rent: 0,
      status: 'Active',
      startDate: '',
      endDate: '',
    });
    setEditingLease(null);
    setIsModalOpen(true);
  };

  const openEditModal = (lease: Lease) => {
    setLeaseForm({ ...lease });
    setEditingLease(lease);
    setIsModalOpen(true);
  };

  const saveLease = () => {
    if (!leaseForm.property || !leaseForm.tenant || !leaseForm.startDate || !leaseForm.endDate)
      return alert('Please fill all fields');

    if (editingLease) {
      // Update existing lease
      setLeases(
        leases.map((l) => (l.id === editingLease.id ? { ...editingLease, ...leaseForm } : l))
      );
    } else {
      // Add new lease
      const lease: Lease = {
        id: `l${leases.length + 1}`,
        property: leaseForm.property!,
        tenant: leaseForm.tenant!,
        rent: leaseForm.rent!,
        status: leaseForm.status! as 'Active' | 'Pending' | 'Ended',
        startDate: leaseForm.startDate!,
        endDate: leaseForm.endDate!,
      };
      setLeases([lease, ...leases]);
    }

    setIsModalOpen(false);
    setEditingLease(null);
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'text-green-700 border-green-200';
      case 'Pending':
        return 'text-yellow-700 border-yellow-200';
      case 'Ended':
        return 'text-gray-500 border-gray-200';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div className="p-8 space-y-6 font-sans text-gray-800">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
          Leasing Management
        </h1>
        <p className="text-sm text-slate-500">View, create, update, and manage property leases</p>
      </div>

      {/* Search & Add */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by property, tenant, or status..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/2 p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg text-blue-600 hover:bg-blue-50 text-sm"
        >
          <FaPlus /> Add New Lease
        </button>
      </div>

      {/* Lease Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-gray-50 border-b border-gray-300">
            <tr>
              {['Property', 'Tenant', 'Rent', 'Status', 'Start Date', 'End Date', 'Actions'].map(
                (col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left font-medium text-gray-600 border-b border-gray-300"
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {currentLeases.map((l) => (
              <tr
                key={l.id}
                className="border-b border-gray-200 hover:bg-blue-50 transition-colors duration-150"
              >
                <td className="px-4 py-2">{l.property}</td>
                <td className="px-4 py-2">{l.tenant}</td>
                <td className="px-4 py-2">₹{l.rent}</td>
                <td className={`px-4 py-2 font-semibold border rounded ${statusColor(l.status)}`}>
                  {l.status}
                </td>
                <td className="px-4 py-2">{l.startDate}</td>
                <td className="px-4 py-2">{l.endDate}</td>
                <td className="px-4 py-2 flex gap-2">
                  {l.status !== 'Ended' && (
                    <button
                      onClick={() => endLease(l.id)}
                      className="px-2 py-1 border rounded text-red-600 hover:bg-red-50 text-sm flex items-center gap-1"
                    >
                      <FaTrash /> End
                    </button>
                  )}
                  <button
                    onClick={() => openEditModal(l)}
                    className="px-2 py-1 border rounded text-blue-600 hover:bg-blue-50 text-sm flex items-center gap-1"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => deleteLease(l.id)}
                    className="px-2 py-1 border rounded text-red-600 hover:bg-red-50 text-sm flex items-center gap-1"
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md border">
            <h2 className="text-xl font-semibold mb-4">
              {editingLease ? 'Edit Lease' : 'Add New Lease'}
            </h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Property"
                value={leaseForm.property}
                onChange={(e) => setLeaseForm({ ...leaseForm, property: e.target.value })}
                className="w-full p-2 border rounded text-sm"
              />
              <input
                type="text"
                placeholder="Tenant"
                value={leaseForm.tenant}
                onChange={(e) => setLeaseForm({ ...leaseForm, tenant: e.target.value })}
                className="w-full p-2 border rounded text-sm"
              />
              <input
                type="number"
                placeholder="Rent"
                value={leaseForm.rent}
                onChange={(e) => setLeaseForm({ ...leaseForm, rent: Number(e.target.value) })}
                className="w-full p-2 border rounded text-sm"
              />
              <select
                value={leaseForm.status}
                onChange={(e) =>
                  setLeaseForm({ ...leaseForm, status: e.target.value as Lease['status'] })
                }
                className="w-full p-2 border rounded text-sm"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Ended">Ended</option>
              </select>
              <input
                type="date"
                placeholder="Start Date"
                value={leaseForm.startDate}
                onChange={(e) => setLeaseForm({ ...leaseForm, startDate: e.target.value })}
                className="w-full p-2 border rounded text-sm"
              />
              <input
                type="date"
                placeholder="End Date"
                value={leaseForm.endDate}
                onChange={(e) => setLeaseForm({ ...leaseForm, endDate: e.target.value })}
                className="w-full p-2 border rounded text-sm"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded text-sm text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={saveLease}
                className="px-4 py-2 border rounded text-sm text-blue-600 hover:bg-blue-50"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

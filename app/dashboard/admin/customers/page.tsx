'use client';

import { useState, useEffect } from 'react';

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: 'Active' | 'Inactive';
};

const initialCustomers: Customer[] = [
  {
    id: 'CUS-001',
    name: 'Meera Silva',
    email: 'meera@gmail.com',
    phone: '0771234567',
    location: 'Colombo',
    status: 'Active',
  },
  {
    id: 'CUS-002',
    name: 'Nuwan Perera',
    email: 'nuwan@gmail.com',
    phone: '0719876543',
    location: 'Galle',
    status: 'Inactive',
  },
  {
    id: 'CUS-003',
    name: 'Kasun Fernando',
    email: 'kasun@gmail.com',
    phone: '0755555555',
    location: 'Kandy',
    status: 'Active',
  },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pageSize = 5;

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    fetch('/api/manager/customers')
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        if (!data?.ok) {
          setError(data?.error || 'Failed to load customers');
          setCustomers([]);
          return;
        }

        // Map returned customers to the view type, filling missing fields
        const mapped = (data.customers || []).map((c: any) => ({
          id: c.id,
          name: c.name || '',
          email: c.email || '',
          phone: c.phone || '',
          location: c.location || '',
          status: c.status === 'Inactive' ? 'Inactive' : 'Active',
        })) as Customer[];

        setCustomers(mapped);
      })
      .catch((err) => {
        console.error('Failed to fetch customers', err);
        if (!mounted) return;
        setError('Network error');
        setCustomers([]);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const saveUpdate = () => {
    if (!editingCustomer) return;
    setCustomers((prev) => prev.map((c) => (c.id === editingCustomer.id ? editingCustomer : c)));
    setEditingCustomer(null);
  };

  const deleteCustomer = (id: string) => {
    if (confirm('Delete this customer?')) {
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="p-8 min-h-full bg-slate-50 space-y-6 font-inter">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Customers</h1>
        <p className="text-sm text-slate-500">View, update and manage customer information</p>
      </div>

      {/* Search */}
      <div className="max-w-sm">
        <input
          className="w-full px-4 py-2 border rounded-lg text-sm"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-6 text-center">Loading customers...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-600">{error}</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="px-5 py-3 text-left">ID</th>
                <th className="px-5 py-3 text-left">Customer</th>
                <th className="px-5 py-3 text-left">Phone</th>
                <th className="px-5 py-3 text-left">Location</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginated.map((c) => (
                <tr key={c.id} className="border-t hover:bg-slate-50">
                  <td className="px-5 py-3 font-mono text-xs text-slate-500">{c.id}</td>

                  <td className="px-5 py-3">
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-slate-500">{c.email}</div>
                  </td>

                  <td className="px-5 py-3">{c.phone}</td>
                  <td className="px-5 py-3">{c.location}</td>

                  <td className="px-5 py-3 text-center">
                    <span
                      className={`px-3 py-1 border rounded-lg text-xs ${
                        c.status === 'Active'
                          ? 'border-emerald-300 text-emerald-700'
                          : 'border-rose-300 text-rose-700'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>

                  <td className="px-5 py-3 text-right space-x-2">
                    <button
                      onClick={() => setEditingCustomer(c)}
                      className="px-4 py-2 border rounded-lg text-sm hover:bg-blue-600 hover:text-white"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => deleteCustomer(c.id)}
                      className="px-4 py-2 border rounded-lg text-sm hover:bg-red-600 hover:text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-slate-600">
          Page {page} of {totalPages}
        </span>

        <div className="space-x-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border rounded-lg text-sm disabled:opacity-40"
          >
            Previous
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded-lg text-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {/* Update Modal */}
      {editingCustomer && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white border rounded-lg w-full max-w-md p-6 space-y-4">
            <h2 className="text-lg font-semibold">Update Customer</h2>

            {(['name', 'email', 'phone', 'location'] as const).map((field) => (
              <input
                key={field}
                className="w-full px-4 py-2 border rounded-lg text-sm"
                placeholder={field}
                value={editingCustomer[field]}
                onChange={(e) =>
                  setEditingCustomer({
                    ...editingCustomer,
                    [field]: e.target.value,
                  })
                }
              />
            ))}

            <select
              className="w-full px-4 py-2 border rounded-lg text-sm"
              value={editingCustomer.status}
              onChange={(e) =>
                setEditingCustomer({
                  ...editingCustomer,
                  status: e.target.value as 'Active' | 'Inactive',
                })
              }
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setEditingCustomer(null)}
                className="px-4 py-2 border rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={saveUpdate}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

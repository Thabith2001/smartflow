'use client';
import { useState, useEffect } from 'react';

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    fetch('/api/manager/customers')
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        if (!data?.ok) {
          setError(data?.error || 'Failed to load customers');
          setCustomers([]);
          return;
        }
        setCustomers(data.customers || []);
      })
      .catch((err) => {
        console.error('Fetch customers error', err);
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

  if (loading) return <div className="p-8">Loading customers...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div className="p-8 space-y-6 bg-neutral-50 min-h-full font-inter">
      <h1 className="text-2xl font-semibold text-neutral-900">Customer Portal</h1>
      <p className="text-neutral-500 text-sm">View all customer details here.</p>

      <div className="overflow-x-auto rounded border bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="px-4 py-2">{c.name}</td>
                <td className="px-4 py-2">{c.email}</td>
                <td className="px-4 py-2">{c.phone}</td>
                <td className="px-4 py-2">{c.status}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    onClick={() => alert(`Viewing details for ${c.name}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

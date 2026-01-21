'use client';
import { useState } from 'react';

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
};

const initialCustomers: Customer[] = [
  {
    id: 'c1',
    name: 'Meera Silva',
    email: 'meera@gmail.com',
    phone: '0771234567',
    status: 'Active',
  },
  {
    id: 'c2',
    name: 'Nuwan Perera',
    email: 'nuwan@gmail.com',
    phone: '0719876543',
    status: 'Inactive',
  },
  {
    id: 'c3',
    name: 'Amal Fernando',
    email: 'amal@gmail.com',
    phone: '0765554444',
    status: 'Active',
  },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);

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

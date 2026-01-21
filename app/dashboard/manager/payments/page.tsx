'use client';

import { useMemo, useState } from 'react';
import {
  FaSearch,
  FaTrash,
  FaUserTie,
  FaUsers,
  FaArrowUp,
  FaArrowDown,
  FaUniversity,
} from 'react-icons/fa';

type VendorPayment = {
  id: string;
  vendor: string;
  amount: number;
  status: string;
};

type CustomerPayment = {
  id: string;
  customer: string;
  amount: number;
  date: string;
};

const VENDORS: VendorPayment[] = [
  { id: 'vp1', vendor: 'CleanPro', amount: 30000, status: 'Completed' },
  { id: 'vp2', vendor: 'FixItNow', amount: 25000, status: 'Scheduled' },
  { id: 'vp3', vendor: 'CleanPro', amount: 30000, status: 'Completed' },
  { id: 'vp4', vendor: 'FixItNow', amount: 25000, status: 'Scheduled' },
  { id: 'vp5', vendor: 'CleanPro', amount: 30000, status: 'Completed' },
  { id: 'vp6', vendor: 'FixItNow', amount: 25000, status: 'Scheduled' },
];

const CUSTOMERS: CustomerPayment[] = [
  { id: 'cp1', customer: 'Meera Silva', amount: 45000, date: '2026-01-01' },
  { id: 'cp2', customer: 'Nuwan Perera', amount: 52000, date: '2026-01-05' },
];

const PAGE_SIZE = 5;

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState<'vendor' | 'customer'>('vendor');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const [vendors, setVendors] = useState(VENDORS);
  const [customers, setCustomers] = useState(CUSTOMERS);

  /* -------------------- CALCULATIONS -------------------- */
  const totalIncome = customers.reduce((s, c) => s + c.amount, 0);
  const totalExpenses = vendors.reduce((s, v) => s + v.amount, 0);
  const bankBalance = totalIncome - totalExpenses;

  /* -------------------- FILTER -------------------- */
  const filteredVendors = useMemo(
    () => vendors.filter((v) => v.vendor.toLowerCase().includes(search.toLowerCase())),
    [vendors, search]
  );

  const filteredCustomers = useMemo(
    () => customers.filter((c) => c.customer.toLowerCase().includes(search.toLowerCase())),
    [customers, search]
  );

  const data = activeTab === 'vendor' ? filteredVendors : filteredCustomers;
  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const paginatedData = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  /* -------------------- ACTIONS -------------------- */
  const deleteVendor = (id: string) => setVendors(vendors.filter((v) => v.id !== id));

  const deleteCustomer = (id: string) => setCustomers(customers.filter((c) => c.id !== id));

  return (
    <div className="space-y-8 p-6">
      {/* ================= TITLE ================= */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Payments Management</h1>
        <p className="text-sm text-slate-500">
          Track income, expenses and overall financial status
        </p>
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard title="Total Income" amount={totalIncome} icon={<FaArrowUp />} />
        <SummaryCard title="Total Expenses" amount={totalExpenses} icon={<FaArrowDown />} />
        <SummaryCard title="Bank Balance" amount={bankBalance} icon={<FaUniversity />} highlight />
      </div>

      {/* ================= TABS ================= */}
      <div className="flex gap-3">
        <TabButton
          active={activeTab === 'vendor'}
          onClick={() => {
            setActiveTab('vendor');
            setSearch('');
            setPage(1);
          }}
          icon={<FaUserTie />}
          label="Vendor Payments"
        />

        <TabButton
          active={activeTab === 'customer'}
          onClick={() => {
            setActiveTab('customer');
            setSearch('');
            setPage(1);
          }}
          icon={<FaUsers />}
          label="Customer Payments"
        />
      </div>

      {/* ================= SEARCH ================= */}
      <div className="relative max-w-sm">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder={`Search ${activeTab === 'vendor' ? 'vendor' : 'customer'}`}
          className="w-full rounded border border-slate-300 pl-10 pr-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto rounded border border-slate-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-left">
                {activeTab === 'vendor' ? 'Vendor' : 'Customer'}
              </th>
              <th className="px-5 py-3 text-left">Amount</th>
              <th className="px-5 py-3 text-left">{activeTab === 'vendor' ? 'Status' : 'Date'}</th>
              <th className="px-5 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item: any) => (
              <tr key={item.id} className="border-t">
                <td className="px-5 py-3">
                  {activeTab === 'vendor' ? item.vendor : item.customer}
                </td>
                <td className="px-5 py-3">₹{item.amount}</td>
                <td className="px-5 py-3">{activeTab === 'vendor' ? item.status : item.date}</td>
                <td className="px-5 py-3 text-center">
                  <button
                    onClick={() =>
                      activeTab === 'vendor' ? deleteVendor(item.id) : deleteCustomer(item.id)
                    }
                    className="inline-flex items-center gap-1 rounded border border-blue-500 px-3 py-1 text-blue-600 hover:bg-blue-50"
                  >
                    <FaTrash size={12} />
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {paginatedData.length === 0 && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-slate-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`rounded border px-3 py-1 text-sm ${
                page === i + 1
                  ? 'border-blue-600 text-blue-600'
                  : 'border-slate-300 hover:border-blue-500 hover:text-blue-500'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ================= COMPONENTS ================= */

function SummaryCard({
  title,
  amount,
  icon,
  highlight,
}: {
  title: string;
  amount: number;
  icon: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className="rounded border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-3 text-blue-600">
        {icon}
        <h3 className="text-sm font-medium text-slate-600">{title}</h3>
      </div>
      <p className={`mt-2 text-xl font-semibold ${highlight ? 'text-blue-600' : 'text-slate-900'}`}>
        ₹{amount}
      </p>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded border px-4 py-2 text-sm font-medium ${
        active
          ? 'border-blue-600 text-blue-600'
          : 'border-slate-300 text-slate-600 hover:border-blue-500 hover:text-blue-500'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

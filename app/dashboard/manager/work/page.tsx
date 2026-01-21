'use client';
import RoleGuard from '../../../components/RoleGuard';
import { useState, useMemo } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

// Work Order Type
type WorkOrder = {
  id: string;
  vendor: string;
  task: string;
  property: string;
  assignedDate: string;
  dueDate: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  priority: 'High' | 'Medium' | 'Low';
  technician: string;
};

// Dummy Work Orders
const initialWorkOrders: WorkOrder[] = [
  {
    id: 'wo1',
    vendor: 'CleanPro',
    task: 'Monthly Cleaning',
    property: 'Sunset Apartments',
    assignedDate: '2026-01-20',
    dueDate: '2026-01-25',
    status: 'Scheduled',
    priority: 'High',
    technician: 'John Doe',
  },
  {
    id: 'wo2',
    vendor: 'FixItNow',
    task: 'AC Repair',
    property: 'Skyline Tower',
    assignedDate: '2026-01-18',
    dueDate: '2026-01-22',
    status: 'In Progress',
    priority: 'Medium',
    technician: 'Jane Smith',
  },
];

export default function WorkOrdersPage() {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(initialWorkOrders);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | WorkOrder['status']>('All');
  const [modal, setModal] = useState<{ type: 'view' | 'edit'; workOrder: WorkOrder } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  // Filter & Search
  const filteredWorkOrders = useMemo(() => {
    return workOrders
      .filter((wo) => (filterStatus === 'All' ? true : wo.status === filterStatus))
      .filter(
        (wo) =>
          wo.vendor.toLowerCase().includes(search.toLowerCase()) ||
          wo.task.toLowerCase().includes(search.toLowerCase()) ||
          wo.property.toLowerCase().includes(search.toLowerCase())
      );
  }, [workOrders, search, filterStatus]);

  // Pagination
  const paginatedWorkOrders = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filteredWorkOrders.slice(start, start + perPage);
  }, [filteredWorkOrders, currentPage]);

  // Handlers
  const deleteWorkOrder = (id: string) => {
    if (confirm('Are you sure to delete this work order?'))
      setWorkOrders(workOrders.filter((wo) => wo.id !== id));
  };

  const saveWorkOrder = (wo: WorkOrder) => {
    setWorkOrders(workOrders.map((j) => (j.id === wo.id ? wo : j)));
    setModal(null);
  };

  return (
    <RoleGuard allow={['MANAGER', 'ADMIN']}>
      <div className="p-6 space-y-6 bg-neutral-50 min-h-full font-inter">
        <h1 className="text-2xl font-semibold text-neutral-900">Work Orders</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Search Vendor, Task or Property..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-4 py-2 w-full md:w-1/3 focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="border rounded px-4 py-2 w-full md:w-1/4 focus:ring-2 focus:ring-blue-500"
          >
            <option>All</option>
            <option>Scheduled</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>

        {/* Work Orders Table */}
        <div className="overflow-x-auto rounded border bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Vendor</th>
                <th className="px-4 py-2 text-left">Task</th>
                <th className="px-4 py-2 text-left">Property</th>
                <th className="px-4 py-2 text-left">Due Date</th>
                <th className="px-4 py-2 text-left">Technician</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Priority</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedWorkOrders.map((wo) => (
                <tr key={wo.id} className="border-t hover:bg-neutral-50">
                  <td className="px-4 py-2">{wo.vendor}</td>
                  <td className="px-4 py-2">{wo.task}</td>
                  <td className="px-4 py-2">{wo.property}</td>
                  <td className="px-4 py-2">{wo.dueDate}</td>
                  <td className="px-4 py-2">{wo.technician}</td>
                  <td className="px-4 py-2">{wo.status}</td>
                  <td className="px-4 py-2">{wo.priority}</td>
                  <td className="px-4 py-2 text-center flex justify-center gap-2">
                    <button
                      onClick={() => setModal({ type: 'view', workOrder: wo })}
                      className="text-blue-600 hover:underline"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => setModal({ type: 'edit', workOrder: wo })}
                      className="text-amber-600 hover:underline"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteWorkOrder(wo.id)}
                      className="text-red-600 hover:underline"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end gap-2 mt-2">
          {Array.from({ length: Math.ceil(filteredWorkOrders.length / perPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Work Order Modal */}
        {modal && (
          <WorkOrderModal
            workOrder={modal.workOrder}
            type={modal.type}
            onClose={() => setModal(null)}
            onSave={saveWorkOrder}
          />
        )}
      </div>
    </RoleGuard>
  );
}

// Work Order Modal
function WorkOrderModal({ workOrder, type, onClose, onSave }: any) {
  const [status, setStatus] = useState(workOrder.status);
  const [priority, setPriority] = useState(workOrder.priority);
  const [technician, setTechnician] = useState(workOrder.technician);

  const handleSave = () => onSave({ ...workOrder, status, priority, technician });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold">
          {type === 'view' ? 'Work Order Details' : 'Edit Work Order'}
        </h2>

        <div className="space-y-2">
          <p>
            <strong>Vendor:</strong> {workOrder.vendor}
          </p>
          <p>
            <strong>Task:</strong> {workOrder.task}
          </p>
          <p>
            <strong>Property:</strong> {workOrder.property}
          </p>
          <p>
            <strong>Assigned Date:</strong> {workOrder.assignedDate}
          </p>
          <p>
            <strong>Due Date:</strong> {workOrder.dueDate}
          </p>
          {type !== 'view' && (
            <>
              <div>
                <label className="block text-sm font-medium">Technician</label>
                <input
                  type="text"
                  value={technician}
                  onChange={(e) => setTechnician(e.target.value)}
                  className="mt-1 w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="mt-1 w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option>Scheduled</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="mt-1 w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 rounded border hover:bg-gray-100">
            Close
          </button>
          {type !== 'view' && (
            <button
              onClick={handleSave}
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

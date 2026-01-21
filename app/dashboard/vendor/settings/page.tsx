'use client';
import RoleGuard from '../../../components/RoleGuard';
import { useState } from 'react';
import { FaSave, FaUpload, FaTimes, FaUserAlt } from 'react-icons/fa';

export default function VendorSettingsPage() {
  // Basic Info
  const [vendorName, setVendorName] = useState('CleanPro Services');
  const [email, setEmail] = useState('contact@cleanpro.com');
  const [phone, setPhone] = useState('+94 77 123 4567');
  const [service, setService] = useState('Cleaning');
  const [active, setActive] = useState(true);

  // Password
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Business & Payment
  const [address, setAddress] = useState('123 Main Street, Colombo');
  const [taxID, setTaxID] = useState('TAX-0012345');
  const [bankName, setBankName] = useState('Bank of Sri Lanka');
  const [bankAccount, setBankAccount] = useState('1234567890');
  const [autoPay, setAutoPay] = useState(false);

  // Profile Image
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Services List
  const [servicesList, setServicesList] = useState<{ name: string; rate: number }[]>([
    { name: 'Cleaning', rate: 50 },
  ]);

  const handleAddService = () => {
    setServicesList([...servicesList, { name: '', rate: 0 }]);
  };

  const handleRemoveService = (index: number) => {
    setServicesList(servicesList.filter((_, i) => i !== index));
  };

  const handleServiceChange = (index: number, key: 'name' | 'rate', value: string | number) => {
    const updated = [...servicesList];
    updated[index][key] = value;
    setServicesList(updated);
  };

  // Profile Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = () => {
    // TODO: connect to backend API
    alert('Vendor settings updated successfully!');
  };

  return (
    <RoleGuard allow={['MANAGER', 'ADMIN']}>
      <div className="p-8 space-y-8 bg-neutral-50 min-h-full font-inter">
        <h1 className="text-2xl font-semibold">Vendor Settings</h1>

        {/* Profile Section */}
        <div className="grid md:grid-cols-2 gap-6 bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center overflow-hidden">
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <FaUserAlt className="text-3xl text-gray-400" />
                )}
              </div>
              <div className="space-y-2">
                <label className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer flex items-center gap-2">
                  <FaUpload /> Upload
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                {previewUrl && (
                  <button
                    onClick={() => {
                      setPreviewUrl(null);
                      setProfileImage(null);
                    }}
                    className="px-3 py-1 bg-red-600 text-white rounded flex items-center gap-1"
                  >
                    <FaTimes /> Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Vendor Name</label>
              <input
                type="text"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                className="mt-1 w-full rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={active}
                onChange={() => setActive(!active)}
                className="h-4 w-4"
              />
              <span className="text-sm text-gray-700">Active Vendor</span>
            </div>
          </div>
        </div>

        {/* Business & Payment */}
        <div className="grid md:grid-cols-2 gap-6 bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
          <div>
            <label className="block text-sm font-medium text-gray-700">Business Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 w-full rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tax ID</label>
            <input
              type="text"
              value={taxID}
              onChange={(e) => setTaxID(e.target.value)}
              className="mt-1 w-full rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bank Name</label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="mt-1 w-full rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bank Account</label>
            <input
              type="text"
              value={bankAccount}
              onChange={(e) => setBankAccount(e.target.value)}
              className="mt-1 w-full rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <input
              type="checkbox"
              checked={autoPay}
              onChange={() => setAutoPay(!autoPay)}
              className="h-4 w-4"
            />
            <span className="text-sm text-gray-700">Enable Auto-Pay</span>
          </div>
        </div>

        {/* Services */}
        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-neutral-900">Services & Rates</h2>
          {servicesList.map((s, i) => (
            <div key={i} className="flex gap-4 items-center">
              <input
                type="text"
                placeholder="Service Name"
                value={s.name}
                onChange={(e) => handleServiceChange(i, 'name', e.target.value)}
                className="flex-1 rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Rate"
                value={s.rate}
                onChange={(e) => handleServiceChange(i, 'rate', Number(e.target.value))}
                className="w-24 rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleRemoveService(i)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={handleAddService}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          >
            Add Service
          </button>
        </div>

        {/* Password Update */}
        <div className="grid md:grid-cols-3 gap-6 bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1 w-full rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 w-full rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 flex items-center gap-2"
          >
            <FaSave /> Save All Changes
          </button>
        </div>
      </div>
    </RoleGuard>
  );
}

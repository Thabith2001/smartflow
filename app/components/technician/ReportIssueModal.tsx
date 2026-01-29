'use client';
import { useState } from 'react';
import { FaExclamationTriangle, FaTimes, FaPaperPlane } from 'react-icons/fa';

export const ReportIssueModal = ({ job, onClose, onSendReport }) => {
  const [issueType, setIssueType] = useState('Parts Missing');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const reportData = {
      jobId: job.id,
      customer: job.name,
      issueType,
      description,
      timestamp: new Date().toLocaleString(),
    };
    onSendReport(reportData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/10 backdrop-blur-sm animate-in zoom-in duration-200">
      <div className="bg-white w-full max-w-md shadow-2xl border-t-4 border-red-500">
        <div className="p-6 flex justify-between items-center border-b">
          <h3 className="flex items-center gap-2 text-red-600 font-black uppercase text-xs tracking-widest">
            <FaExclamationTriangle /> Report Job Issue
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">
              Issue Category
            </label>
            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              className="w-full bg-gray-50 border-2 border-gray-100 p-3 text-xs font-bold focus:border-[#eab308] outline-none"
            >
              <option>Parts Missing</option>
              <option>Customer Not Home</option>
              <option>Safety Hazard</option>
              <option>Wrong Equipment</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">
              Detailed Message
            </label>
            <textarea
              required
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain the problem to the Admin..."
              className="w-full bg-gray-50 border-2 border-gray-100 p-3 text-xs font-medium focus:border-[#eab308] outline-none resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-4 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all"
          >
            <FaPaperPlane /> Send Report to Admin
          </button>
        </form>
      </div>
    </div>
  );
};

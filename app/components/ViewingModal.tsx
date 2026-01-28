'use client';

import React, { useState } from 'react';
import {
  FaTimes,
  FaPaperPlane,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaPhoneAlt,
} from 'react-icons/fa';

interface ViewingModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle: string;
}

const ViewingModal = ({ isOpen, onClose, propertyTitle }: ViewingModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    }, 1500);
  };

  const boxStyles =
    'flex items-center gap-2 border border-gray-300 px-3 focus-within:border-[#1e3a8a] focus-within:ring-0 transition-all bg-white rounded-none';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={handleOverlayClick}
    >
      {/* MODAL CONTAINER - Added max-h for mobile scrolling */}
      <div className="bg-white w-full max-w-xl max-h-[95vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300 relative rounded-none flex flex-col">
        {/* HEADER - Fixed at top */}
        <div className="sticky top-0 z-10 bg-[#1e3a8a] px-4 md:px-6 py-4 flex justify-between items-center">
          <div className="min-w-0">
            {' '}
            {/* min-w-0 allows truncate to work in flex */}
            <h2 className="text-white text-xs md:text-base font-bold uppercase tracking-widest">
              Schedule Viewing
            </h2>
            <p className="text-white/60 text-[9px] md:text-[10px] uppercase truncate max-w-full">
              {propertyTitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-[#facc15] transition-colors ml-4"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* SUCCESS MESSAGE */}
        {isSuccess ? (
          <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in-90">
            <FaCheckCircle className="text-green-500" size={50} />
            <h3 className="text-lg md:text-xl font-bold text-blue-900">Request Sent!</h3>
            <p className="text-gray-500 text-sm">
              We will contact you shortly to confirm your viewing.
            </p>
          </div>
        ) : (
          <form className="p-4 md:p-8 space-y-4 md:space-y-5" onSubmit={handleSubmit}>
            {/* DATE & TIME */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div className="space-y-1">
                <label className="text-[9px] md:text-[10px] font-bold text-blue-900 uppercase tracking-tighter">
                  Preferred Date
                </label>
                <div className={boxStyles}>
                  <FaCalendarAlt className="text-gray-400 text-sm" />
                  <input
                    required
                    type="date"
                    className="w-full py-2.5 md:py-3 text-sm outline-none bg-transparent cursor-pointer accent-[#1e3a8a]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] md:text-[10px] font-bold text-blue-900 uppercase tracking-tighter">
                  Preferred Time
                </label>
                <div className={boxStyles}>
                  <FaClock className="text-gray-400 text-sm" />
                  <select
                    required
                    className="w-full py-2.5 md:py-3 text-sm outline-none bg-transparent cursor-pointer appearance-none rounded-none"
                  >
                    <option value="">Select Time</option>
                    <option>09:00 AM - 11:00 AM</option>
                    <option>11:00 AM - 01:00 PM</option>
                    <option>02:00 PM - 05:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* NAME */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div className={boxStyles}>
                <input
                  required
                  type="text"
                  placeholder="First Name"
                  className="w-full py-2.5 md:py-3 text-sm focus:outline-none bg-transparent rounded-none"
                />
              </div>
              <div className={boxStyles}>
                <input
                  required
                  type="text"
                  placeholder="Last Name"
                  className="w-full py-2.5 md:py-3 text-sm focus:outline-none bg-transparent rounded-none"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className={boxStyles}>
              <input
                required
                type="email"
                placeholder="Email Address"
                className="w-full py-2.5 md:py-3 text-sm focus:outline-none bg-transparent rounded-none"
              />
            </div>

            {/* PHONE */}
            <div className="relative group">
              <div className={boxStyles}>
                <FaPhoneAlt className="text-gray-300 text-[10px]" />
                <input
                  required
                  type="tel"
                  pattern="[0-9]{10}"
                  placeholder="Phone: (555) 000-0000"
                  className="w-full py-2.5 md:py-3 text-sm font-bold placeholder:font-normal focus:outline-none bg-transparent rounded-none"
                />
              </div>
              <span className="hidden md:block absolute right-0 -bottom-5 text-[8px] text-gray-400 group-focus-within:text-[#1e3a8a] font-black uppercase tracking-tighter transition-colors">
                Enter 10-digit US mobile or landline
              </span>
            </div>

            {/* MESSAGE */}
            <textarea
              placeholder="Your Message..."
              rows={3}
              className="w-full border border-gray-300 p-3 md:p-4 text-sm focus:outline-none focus:border-blue-900 transition-all resize-none bg-white rounded-none shadow-none"
            ></textarea>

            {/* FOOTER */}
            <div className="flex flex-col-reverse md:flex-row justify-end items-center gap-4 md:gap-6 pt-2 md:pt-6">
              <button
                type="button"
                onClick={onClose}
                className="w-full md:w-auto text-gray-400 font-bold text-[10px] md:text-xs hover:text-blue-900 uppercase tracking-widest transition-colors py-2"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`${
                  isSubmitting ? 'bg-gray-400' : 'bg-[#eab308] hover:bg-[#1e3a8a] hover:text-white'
                } w-full md:w-auto text-blue-900 px-8 py-3.5 md:py-3 flex items-center justify-center gap-3 text-[10px] md:text-xs font-black uppercase tracking-widest transition-all shadow-md active:scale-95 disabled:cursor-not-allowed rounded-none`}
              >
                <FaPaperPlane size={12} className={isSubmitting ? 'animate-pulse' : ''} />
                {isSubmitting ? 'Sending...' : 'Submit Request'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ViewingModal;

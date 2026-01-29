'use client';
import React, { useState, useRef } from 'react';
import { FaTimes, FaSave, FaCamera, FaUserCircle } from 'react-icons/fa';

const UpdateProfileModal = ({ techInfo, onClose, onSave }) => {
  const [name, setName] = useState(techInfo?.name || '');
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  if (!techInfo) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      name,
      profileImage: previewImage || techInfo.image,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-t-4 border-[#eab308] overflow-hidden">
        {/* Header */}
        <div className="bg-blue-900 p-6 flex justify-between items-center border-b border-gray-100">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-black uppercase tracking-[0.1em] text-white">
              Account Settings
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-yellow-400 transition-all p-2"
          >
            <FaTimes size={18} />
          </button>
        </div>

        <form className="p-8 space-y-8" onSubmit={handleSubmit}>
          {/*  IMAGE UPLOAD */}
          <div className="flex flex-col items-center">
            <div
              className="relative group cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              <div className="w-28 h-28 rounded-full border-4 border-gray-50 shadow-xl overflow-hidden bg-gray-100 flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
                {previewImage || techInfo.image ? (
                  <img
                    src={previewImage || techInfo.image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="text-gray-300 text-7xl" />
                )}

                <div className="absolute inset-0 bg-[#1e3a8a]/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <FaCamera className="text-white text-xl mb-1" />
                  <span className="text-[8px] text-white font-black uppercase">Upload</span>
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
            </div>
          </div>

          <div className="space-y-6">
            {/*  NAME */}
            <div className="relative">
              <label className="absolute -top-2 left-3 bg-white px-2 text-[9px] font-black text-[#eab308] uppercase tracking-widest z-10">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border-2 border-gray-100 p-4 text-xs font-black uppercase outline-none focus:border-[#1e3a8a] transition-all text-[#1e3a8a]"
              />
            </div>

            {/*  PHONE */}
            <div className="relative opacity-50">
              <label className="absolute -top-2 left-3 bg-white px-2 text-[9px] font-black text-gray-400 uppercase tracking-widest z-10">
                Verified Phone (Locked)
              </label>
              <input
                type="tel"
                value={techInfo.phone}
                readOnly
                className="w-full bg-gray-50 border-2 border-gray-100 p-4 text-xs font-bold cursor-not-allowed outline-none"
              />
            </div>

            {/*  EMAIL */}
            <div className="relative opacity-50">
              <label className="absolute -top-2 left-3 bg-white px-2 text-[9px] font-black text-gray-400 uppercase tracking-widest z-10">
                System Email (Locked)
              </label>
              <input
                type="email"
                value={techInfo.email}
                readOnly
                className="w-full bg-gray-50 border-2 border-gray-100 p-4 text-xs font-bold cursor-not-allowed outline-none"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 text-[10px] font-black uppercase text-gray-400 border-2 border-transparent hover:border-gray-100 transition-all"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-[2] bg-[#1e3a8a] text-white py-4 text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#eab308] hover:text-[#1e3a8a] transition-all shadow-lg active:scale-95"
            >
              <FaSave /> Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;

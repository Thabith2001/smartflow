'use client';

import React, { useState } from 'react';
import {
  FaMapMarkerAlt,
  FaBath,
  FaBed,
  FaRulerCombined,
  FaExpandArrowsAlt,
  FaCalendarAlt,
} from 'react-icons/fa';

import ViewingModal from './ViewingModal';

export default function PropertyCard({ item, onExpand }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const brandGold = '#eab308';
  const brandNavy = '#1e3a8a';

  return (
    <>
      <div className="group bg-white border border-zinc-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
        {/* IMAGE SECTION */}
        <div className="relative aspect-[16/9] overflow-hidden bg-zinc-200">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute bottom-0 left-0 bg-black/80 text-white text-sm font-bold px-4 py-2 min-w-[100px] text-center uppercase tracking-tighter">
            {item.category}
          </div>

          {item.isFeatured && (
            <div
              style={{ backgroundColor: brandGold }}
              className="absolute top-4 left-4 text-blue-900 text-[10px] font-black uppercase px-3 py-1.5 tracking-widest shadow-sm"
            >
              LATEST
            </div>
          )}

          <div
            className="absolute top-4 right-4 bg-white/90 p-2.5 text-blue-900 cursor-pointer hover:bg-[#eab308] transition-colors shadow-sm"
            onClick={() => onExpand(item.image)}
          >
            <FaExpandArrowsAlt size={16} />
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start gap-4 mb-1">
            <h3 className="text-lg font-black uppercase text-blue-900 leading-tight flex-1 tracking-tight">
              {item.title}
            </h3>
            <span className="text-lg font-black text-[#eab308]">
              ${item.price.toLocaleString()}
            </span>
          </div>

          <p className="text-zinc-400 text-xs flex items-center gap-1 mb-3 font-bold">
            <FaMapMarkerAlt className="text-zinc-300" size={12} /> {item.location}
          </p>

          <p className="text-zinc-500 text-xs leading-relaxed mb-4 line-clamp-2">
            {item.description ||
              'Premium property listing featuring modern amenities and prime location.'}
          </p>

          {/* AMENITIES */}
          <div className="flex items-center text-blue-900 justify-between mb-6 border-t border-zinc-100 pt-4">
            {item.category !== 'Land' ? (
              <>
                <div className="flex items-center gap-1.5">
                  <FaBed size={16} className="text-blue-900/40" />
                  <span className="text-[10px] font-black uppercase">{item.beds} Beds</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FaBath size={14} className="text-blue-900/40" />
                  <span className="text-[10px] font-black uppercase">{item.baths} Baths</span>
                </div>
              </>
            ) : (
              <span className="text-[10px] font-black uppercase text-zinc-400">
                Ready for Development
              </span>
            )}
            <div className="flex items-center gap-1.5">
              <FaRulerCombined size={14} className="text-blue-900/40" />
              <span className="text-[10px] font-black uppercase">
                {item.landSize.toLocaleString()} Sqft
              </span>
            </div>
          </div>

          {/* ACTION BUTTON */}
          <button
            className="mt-auto w-full bg-blue-900 text-white text-[10px] font-black uppercase py-4 flex items-center justify-center gap-2 hover:bg-[#eab308] hover:text-blue-900 transition-all duration-300 tracking-[0.2em] shadow-lg active:scale-[0.98]"
            onClick={() => setIsModalOpen(true)}
          >
            <FaCalendarAlt size={12} />
            Schedule a Viewing
          </button>
        </div>
      </div>

      {/* MODAL INTEGRATION */}
      <ViewingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        propertyTitle={item.title}
      />
    </>
  );
}

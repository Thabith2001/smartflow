'use client';

import {
  FaMapMarkerAlt,
  FaExpandArrowsAlt,
  FaBed,
  FaBath,
  FaTree,
  FaCalendarAlt,
} from 'react-icons/fa';
import { LuRuler, LuLayers } from 'react-icons/lu';
import { Property } from '../data/properties';

interface CardProps {
  house: Property;
  onExpand: (img: string) => void;
}

const Card = ({ house, onExpand }: CardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group flex flex-col h-full bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden cursor-default">
      {/* --- IMAGE SECTION --- */}
      <div
        className="relative h-60 overflow-hidden bg-zinc-200 cursor-pointer"
        onClick={() => onExpand(house.image)}
      >
        <img
          src={house.image}
          alt={house.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />

        {house.isFeatured && (
          <div className="absolute top-4 left-4 bg-[#FFB800] text-[#0A1D37] text-[11px] font-black px-4 py-1.5 uppercase tracking-wider shadow-md z-10">
            LATEST
          </div>
        )}

        <button className="absolute top-4 right-4 bg-white/90 p-2 text-[#0A1D37] hover:bg-[#FFB800] hover:text-white transition-all duration-300 shadow-sm z-20 scale-0 group-hover:scale-100 origin-center cursor-pointer">
          <FaExpandArrowsAlt size={18} />
        </button>

        <div className="absolute bottom-0 left-0 bg-black/60 px-6 py-2 backdrop-blur-sm">
          <span className="text-white text-base font-bold tracking-tight">{house.category}</span>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="text-[#1E3A8A] text-xl font-black uppercase leading-tight">
            {house.title}
          </h3>
          <span className="text-[#FFB800] text-xl font-bold whitespace-nowrap">
            {formatPrice(house.price)}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-zinc-400 mb-4">
          <FaMapMarkerAlt size={12} className="text-[#1E3A8A]" />
          <span className="text-sm font-bold uppercase tracking-tight">{house.location}</span>
        </div>

        <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-2">
          {house.description ||
            'Exclusive property featuring modern architecture and exclusive amenities.'}
        </p>

        <hr className="border-gray-100 mb-5 mt-auto" />

        {/* Property Specs */}
        <div className="flex justify-between items-center text-[#1E3A8A] font-black text-[11px] uppercase tracking-wider mb-6">
          {house.category === 'Land' ? (
            <div className="flex w-full justify-around">
              <div className="flex items-center gap-2">
                <FaTree size={16} /> PLOT
              </div>
              <div className="flex items-center gap-2">
                <LuRuler size={16} /> {house.landSize || house.sqft} SQFT
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <FaBed size={18} />
                <span>{house.beds} BEDS</span>
              </div>
              <div className="flex items-center gap-2 border-x border-gray-100 px-4">
                <FaBath size={16} />
                <span>{house.baths} BATHS</span>
              </div>
              <div className="flex items-center gap-2">
                {house.category === 'Apartment' ? <LuLayers size={16} /> : <LuRuler size={16} />}
                <span>{house.sqft?.toLocaleString()} SQFT</span>
              </div>
            </>
          )}
        </div>

        {/* --- BUTTON SECTION --- */}
        <button className="w-full bg-[#1E3A8A] hover:bg-[#FFB800] text-white hover:text-[#0A1D37] py-4 text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group/btn">
          <FaCalendarAlt size={14} className="group-hover/btn:animate-bounce" />
          Schedule a Viewing
        </button>
      </div>
    </div>
  );
};

export default Card;

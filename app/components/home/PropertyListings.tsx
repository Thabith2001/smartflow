'use client';

import React, { useState } from 'react';
import { ArrowRight, Maximize2, BedDouble, Bath, Square, X } from 'lucide-react';

const properties = [
  {
    id: 1,
    title: 'Skyline Penthouse',
    price: '$2,500,000',
    location: 'Downtown, Miami',
    description:
      'Experience unparalleled luxury with floor-to-ceiling glass walls and private infinity pool.',
    specs: { beds: 4, baths: 3.5, sqft: '3,200' },
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Emerald Garden Villa',
    price: '$1,850,000',
    location: 'Coral Gables, FL',
    description:
      'A lush oasis featuring Mediterranean architecture and expansive botanical gardens.',
    specs: { beds: 5, baths: 4, sqft: '4,500' },
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Azure Waterfront',
    price: '$3,200,000',
    location: 'Coconut Grove',
    description: 'Direct ocean access with a private dock and modern minimalist interior design.',
    specs: { beds: 3, baths: 3, sqft: '2,800' },
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'The Golden Heights',
    price: '$2,000,000',
    location: 'Orlando, FL',
    description: 'A vibrant urban oasis with modern architecture and a bustling nightlife.',
    specs: { beds: 4, baths: 3.5, sqft: '3,200' },
    image:
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2074&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'The Emerald Heights',
    price: '$2,500,000',
    location: 'Miami Beach, FL',
    description:
      'A luxurious coastal retreat with breathtaking ocean views and a private infinity pool.',
    specs: { beds: 4, baths: 3.5, sqft: '3,200' },
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Sunset Villa',
    price: '$1,950,000',
    location: 'Tampa, FL',
    description: 'A serene waterfront property with modern amenities and stunning sunset views.',
    specs: { beds: 5, baths: 4, sqft: '4,000' },
    image:
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 7,
    title: 'Modern Onyx Estate',
    price: '$4,100,000',
    location: 'Star Island, Miami',
    description:
      'Ultra-modern dark-themed architecture with smart-glass technology and 10-car garage.',
    specs: { beds: 6, baths: 7, sqft: '7,200' },
    image:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 8,
    title: 'Palm Breeze Manor',
    price: '$980,000',
    location: 'Naples, FL',
    description: 'Coastal farmhouse charm with wrap-around porches and proximity to the gulf.',
    specs: { beds: 3, baths: 2, sqft: '2,100' },
    image:
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 9,
    title: 'Sapphire Bay Condo',
    price: '$1,200,000',
    location: 'Brickell, Miami',
    description:
      'High-rise living with boutique finishes and access to a world-class wellness spa.',
    specs: { beds: 2, baths: 2, sqft: '1,650' },
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 10,
    title: 'The Ivory Pavilion',
    price: '$5,400,000',
    location: 'Palm Beach, FL',
    description:
      'An iconic white-stone mansion featuring Neoclassical lines and a private beach strip.',
    specs: { beds: 7, baths: 8.5, sqft: '12,000' },
    image:
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 11,
    title: 'Urban Loft X',
    price: '$750,000',
    location: 'Wynwood, Miami',
    description:
      'Industrial chic loft with double-height ceilings and exposed brick in the arts district.',
    specs: { beds: 1, baths: 1.5, sqft: '1,200' },
    image:
      'https://plus.unsplash.com/premium_photo-1661876449499-26de7959878f?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 12,
    title: 'Marble Arch Villa',
    price: '$3,150,000',
    location: 'Boca Raton, FL',
    description:
      'Classic European elegance meets Florida sunshine with marble flooring throughout.',
    specs: { beds: 5, baths: 5.5, sqft: '5,800' },
    image:
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2084&auto=format&fit=crop',
  },
];

const PropertyListings = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <section className="bg-gray-50 py-24 px-6 relative">
      {selectedImg && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
          onClick={() => setSelectedImg(null)}
        >
          <button
            className="absolute top-8 right-8 text-white hover:text-[#FFB800] transition-colors"
            onClick={() => setSelectedImg(null)}
          >
            <X size={48} strokeWidth={1.5} />
          </button>
          <img
            src={selectedImg}
            alt="Full size property"
            className="max-w-full max-h-full object-contain rounded-sm shadow-2xl animate-in zoom-in-95 duration-300"
          />
        </div>
      )}

      <div className="container mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-[#FFB800] text-sm font-black uppercase tracking-[0.4em] mb-4">
              Our Portfolio
            </h2>
            <h3 className="text-5xl md:text-5xl font-black text-blue-900 uppercase">
              Latest <span className="text-gray-400">Additions.</span>
            </h3>
          </div>
          <button className="hidden md:flex items-center gap-3 bg-blue-900 text-white px-8 py-4 font-bold text-xs uppercase tracking-widest hover:bg-[#FFB800] hover:text-blue-900 transition-all group">
            View All Properties{' '}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* PROPERTY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((item) => (
            <div
              key={item.id}
              className="group bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-[300px] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-blue-900 text-white px-3 py-1 text-xs font-bold">
                  LATEST
                </div>

                <div
                  className="absolute top-4 right-4 bg-[#FFB800] text-blue-900 p-2 cursor-pointer hover:bg-white transition-colors"
                  onClick={() => setSelectedImg(item.image)}
                >
                  <Maximize2 className="h-4 w-4" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 border-b-4 border-transparent group-hover:border-[#FFB800] transition-all">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-black text-blue-900 uppercase truncate">
                    {item.title}
                  </h4>
                  <span className="text-[#FFB800] font-black">{item.price}</span>
                </div>
                <p className="text-gray-400 text-sm mb-6 flex items-center gap-1 font-medium">
                  {item.location}
                </p>

                <div className="flex justify-between border-t border-gray-100 pt-4 text-gray-500">
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <BedDouble className="h-4 w-4 text-blue-900" /> {item.specs.beds} BEDS
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <Bath className="h-4 w-4 text-blue-900" /> {item.specs.baths} BATHS
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <Square className="h-4 w-4 text-blue-900" /> {item.specs.sqft} SQFT
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE VIEW ALL BUTTON */}
        <div className="mt-12 md:hidden">
          <button className="w-full flex items-center justify-center gap-3 bg-blue-900 text-white px-8 py-5 font-bold text-xs uppercase tracking-widest">
            View All Properties <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PropertyListings;

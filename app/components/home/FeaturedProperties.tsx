'use client';

import React, { useState } from 'react';
import { Maximize2, BedDouble, Bath, Square, ArrowRight, X } from 'lucide-react';

const featuredData = [
  {
    id: 1,
    title: 'The Obsidian Manor',
    price: '$4,800,000',
    location: 'Star Island, Miami',
    specs: { beds: 6, baths: 7, sqft: '8,400' },
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    tag: 'Exclusive',
  },
  {
    id: 2,
    title: 'Glass House Pavilion',
    price: '$2,100,000',
    location: 'Design District, FL',
    specs: { beds: 3, baths: 3, sqft: '2,900' },
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
    tag: 'New Listing',
  },
  {
    id: 3,
    title: 'The Ivory Penthouse',
    price: '$3,450,000',
    location: 'Brickell Avenue, Miami',
    specs: { beds: 4, baths: 4.5, sqft: '4,100' },
    image:
      'https://images.unsplash.com/photo-1600607687940-4e5a48a259c9?q=80&w=2070&auto=format&fit=crop',
    tag: 'Limited Edition',
  },
];

const FeaturedProperties = () => {
  const [selectedId, setSelectedId] = useState<number>(1);
  const [fullScreenImg, setFullScreenImg] = useState<string | null>(null);

  return (
    <section className="bg-white py-24 px-6 border-t border-gray-200">
      {/* FULLSCREEN PREVIEW */}
      {fullScreenImg && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
          onClick={() => setFullScreenImg(null)}
        >
          <button className="absolute top-8 right-8 text-white hover:text-[#FFB800] transition-colors">
            <X size={48} strokeWidth={2} />
          </button>
          <img
            src={fullScreenImg}
            className="max-w-full max-h-full object-contain rounded-sm shadow-2xl animate-in zoom-in-95 duration-300"
            alt="Preview"
          />
        </div>
      )}

      <div className="container mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className=" pl-6">
            <h2 className="text-gray-400 text-xs font-black uppercase tracking-[0.5em] mb-2">
              Featured Portfolio
            </h2>
            <h3 className="text-5xl md:text-5xl font-black text-blue-900 uppercase leading-none tracking-tighter">
              Selected <span className="text-gray-300">Assets.</span>
            </h3>
          </div>
          <button className="flex items-center gap-4 bg-blue-900 text-white px-10 py-5 text-xs font-black uppercase tracking-widest hover:bg-[#FFB800] hover:text-blue-900 transition-all rounded-none">
            Explore All <ArrowRight size={18} />
          </button>
        </div>

        {/* BORDERED GRID BOX */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-gray-200">
          <div className="lg:col-span-4 flex flex-col divide-y divide-gray-200">
            {featuredData.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`group cursor-pointer p-10 transition-all duration-300 rounded-none relative ${
                  selectedId === item.id ? 'bg-gray-50' : 'bg-white hover:bg-gray-50/50'
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <span
                    className={`text-[10px] font-black uppercase tracking-widest ${
                      selectedId === item.id ? 'text-[#FFB800]' : 'text-gray-400'
                    }`}
                  >
                    {item.tag}
                  </span>
                  <span className="font-black text-lg text-blue-900">{item.price}</span>
                </div>
                <h4
                  className={`text-2xl font-black uppercase leading-tight transition-colors ${
                    selectedId === item.id
                      ? 'text-blue-900'
                      : 'text-gray-400 group-hover:text-blue-900'
                  }`}
                >
                  {item.title}
                </h4>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-2">
                  {item.location}
                </p>

                {selectedId === item.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FFB800]" />
                )}
              </div>
            ))}
          </div>

          {/* DYNAMIC IMAGE DISPLAY  */}
          <div className="lg:col-span-8 border-l border-gray-200 relative bg-gray-50">
            {featuredData.map(
              (item) =>
                selectedId === item.id && (
                  <div
                    key={item.id}
                    className="relative h-full min-h-[600px] w-full animate-in fade-in duration-700"
                  >
                    <img
                      src={item.image}
                      className="w-full h-full object-cover rounded-none"
                      alt={item.title}
                    />

                    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-8 flex flex-col md:flex-row justify-between items-center">
                      <div className="flex gap-12">
                        <div className="flex items-center gap-3">
                          <BedDouble className="text-[#FFB800]" size={20} />
                          <div>
                            <p className="text-[10px] font-black uppercase text-gray-400 leading-none">
                              Beds
                            </p>
                            <p className="text-sm font-black text-blue-900">{item.specs.beds}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Bath className="text-[#FFB800]" size={20} />
                          <div>
                            <p className="text-[10px] font-black uppercase text-gray-400 leading-none">
                              Baths
                            </p>
                            <p className="text-sm font-black text-blue-900">{item.specs.baths}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Square className="text-[#FFB800]" size={20} />
                          <div>
                            <p className="text-[10px] font-black uppercase text-gray-400 leading-none">
                              Sqft
                            </p>
                            <p className="text-sm font-black text-blue-900">{item.specs.sqft}</p>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setFullScreenImg(item.image)}
                        className="bg-blue-900 text-white p-4 hover:bg-[#FFB800] hover:text-blue-900 transition-all rounded-none mt-4 md:mt-0"
                      >
                        <Maximize2 size={24} />
                      </button>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;

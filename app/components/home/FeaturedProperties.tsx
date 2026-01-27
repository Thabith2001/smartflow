'use client';

import React, { useState } from 'react';
import { Maximize2, BedDouble, Bath, Square, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';
import { portfolioData } from '../../data/properties';

const FeaturedProperties = () => {
  const featured = portfolioData.filter((item) => item.isFeatured).slice(0, 5);
  const [selectedId, setSelectedId] = useState(featured[0]?.id || '');
  const [fullScreenImg, setFullScreenImg] = useState<string | null>(null);

  return (
    <section className="bg-white py-20 px-6 border-t border-gray-100">
      {/* LIGHTBOX */}
      {fullScreenImg && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setFullScreenImg(null)}
        >
          <button className="absolute top-8 right-8 text-white hover:text-[#FFB800]">
            <X size={40} />
          </button>
          <img
            src={fullScreenImg}
            className="max-w-full max-h-[90vh] object-contain"
            alt="Preview"
          />
        </div>
      )}

      <div className="container mx-auto max-w-7xl">
        {/* COMPACT HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-gray-100 pb-8">
          <div>
            <span className="text-[#FFB800] text-xs font-black uppercase tracking-[0.3em]">
              Curated Selection
            </span>
            <h2 className="text-5xl md:text-5xl font-black text-blue-900 uppercase tracking-tighter">
              Featured <span className="text-gray-300">Properties</span>
            </h2>
          </div>
          <Link href="/portfolio">
            <button className="hidden md:flex items-center gap-3 bg-blue-900 text-white px-8 py-4 font-bold text-xs uppercase tracking-widest hover:bg-[#FFB800] hover:text-blue-900 transition-all group">
              View All Properties{' '}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* LEFT SIDE*/}
          <div className="lg:w-1/3 flex flex-col gap-3">
            {featured.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`p-6 cursor-pointer transition-all border ${
                  selectedId === item.id
                    ? 'border-blue-900 bg-blue-900 text-white shadow-lg'
                    : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-blue-200'
                }`}
              >
                <p
                  className={`text-[10px] font-black uppercase mb-1 ${selectedId === item.id ? 'text-[#FFB800]' : 'text-gray-400'}`}
                >
                  {item.category}
                </p>
                <h4 className="text-lg font-bold uppercase leading-tight truncate">{item.title}</h4>
                <p className="text-sm mt-1 opacity-80">{item.location}</p>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:w-2/3 relative min-h-[500px] bg-gray-100 group">
            {featured.map(
              (item) =>
                item.id === selectedId && (
                  <div key={item.id} className="h-full animate-in fade-in duration-500">
                    <img
                      src={item.image}
                      className="w-full h-full object-cover shadow-2xl"
                      alt={item.title}
                    />

                    {/* FLOATING INFO BAR */}
                    <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-6 flex justify-between items-center shadow-xl border-l-4 border-[#FFB800]">
                      <div className="flex gap-8">
                        <div className="flex items-center gap-2">
                          <BedDouble size={18} className="text-blue-900" />
                          <span className="text-sm font-black text-blue-900">
                            {item.beds} <span className="text-gray-400 font-normal">Beds</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bath size={18} className="text-blue-900" />
                          <span className="text-sm font-black text-blue-900">
                            {item.baths} <span className="text-gray-400 font-normal">Baths</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Square size={16} className="text-blue-900" />
                          <span className="text-sm font-black text-blue-900">
                            {item.sqft?.toLocaleString()}{' '}
                            <span className="text-gray-400 font-normal">Sqft</span>
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setFullScreenImg(item.image)}
                        className="p-3 bg-blue-900 text-white hover:bg-[#FFB800] hover:text-blue-900 transition-colors"
                      >
                        <Maximize2 size={20} />
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

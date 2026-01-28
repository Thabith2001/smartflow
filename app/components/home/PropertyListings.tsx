'use client';

import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import Link from 'next/link';
import Card from '../../components/Card';
import { portfolioData } from '../../data/properties';

const PropertyListings = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const closeExpaned = () => setSelectedImg(null);

  const latestProperties = [...portfolioData]
    .reverse()
    .slice(0, 15)
    .map((property) => ({
      ...property,
      isFeatured: true,
    }));

  return (
    <section className="bg-gray-50 py-24 px-6 relative">
      {selectedImg && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
          onClick={closeExpaned}
        >
          <button
            className="absolute top-8 right-8 text-white hover:text-[#FFB800] transition-colors z-[10000]"
            onClick={closeExpaned}
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
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-[#FFB800] text-xs md:text-sm font-black uppercase tracking-[0.4em] mb-4">
              Our Portfolio
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-blue-900 uppercase">
              Latest <span className="text-gray-400">Additions.</span>
            </h3>
          </div>
          <Link href="/portfolio" className="inline-block w-full md:w-auto">
            <button className="w-full md:w-auto flex items-center justify-center gap-4 bg-[#1E3A8A] text-white px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-[#FFB800] hover:text-[#0A1D37] transition-all">
              View Portfolio <ArrowRight size={14} />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestProperties.map((property) => (
            <Card key={property.id} house={property} onExpand={(img) => setSelectedImg(img)} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyListings;

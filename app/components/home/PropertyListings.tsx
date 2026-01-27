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
            <h2 className="text-[#FFB800] text-sm font-black uppercase tracking-[0.4em] mb-4">
              Our Portfolio
            </h2>
            <h3 className="text-5xl md:text-5xl font-black text-blue-900 uppercase">
              Latest <span className="text-gray-400">Additions.</span>
            </h3>
          </div>
          <Link href="/portfolio">
            <button className="hidden md:flex items-center gap-3 bg-blue-900 text-white px-8 py-4 font-bold text-xs uppercase tracking-widest hover:bg-[#FFB800] hover:text-blue-900 transition-all group">
              View All Properties{' '}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestProperties.map((property) => (
            <Card key={property.id} house={property} onExpand={(img) => setSelectedImg(img)} />
          ))}
        </div>

        <Link href="/portfolio">
          <div className="mt-12 md:hidden">
            <button className="w-full flex items-center justify-center gap-3 bg-blue-900 text-white px-8 py-5 font-bold text-xs uppercase tracking-widest">
              View All Properties <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default PropertyListings;

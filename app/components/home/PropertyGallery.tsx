'use client';

import React, { useState } from 'react';
import { X, ImageIcon, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { portfolioData } from '../../data/properties';

const PropertyGallery = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const galleryImages = [...portfolioData]
    .reverse()
    .slice(0, 16)
    .map((item) => item.image);

  return (
    <section className="bg-white py-24">
      {/* --- LIGHTBOX MODAL --- */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
          onClick={() => setSelectedImg(null)}
        >
          <button className="absolute top-8 right-8 text-white hover:text-[#FFB800] transition-colors">
            <X size={48} strokeWidth={1.5} />
          </button>
          <img
            src={selectedImg}
            alt="Property Gallery View"
            className="max-w-full max-h-full object-contain shadow-2xl animate-in zoom-in-95 duration-300"
          />
        </div>
      )}

      <div className="mx-auto max-w-7xl px-6">
        {/* --- HEADER AREA --- */}
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-[#FFB800] text-sm font-black uppercase tracking-[0.4em] mb-3">
              Property Media
            </h2>
            <h3 className="text-5xl md:text-5xl font-black text-[#1E3A8A] uppercase">
              Visual <span className="text-gray-400">Gallery.</span>
            </h3>
          </div>

          <Link href="/portfolio">
            <button className="flex items-center gap-3 bg-[#1E3A8A] text-white px-8 py-4 font-bold text-xs uppercase tracking-widest hover:bg-[#FFB800] hover:text-[#0A1D37] transition-all group">
              View All Media{' '}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        {/* --- GALLERY GRID --- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedImg(img)}
              className="group relative overflow-hidden bg-zinc-200 aspect-square cursor-pointer"
            >
              <img
                src={img}
                alt={`Property view ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-[#1E3A8A]/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <div className="bg-white p-3 rounded-full scale-50 group-hover:scale-100 transition-transform duration-300">
                  <ImageIcon className="text-[#1E3A8A] w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyGallery;

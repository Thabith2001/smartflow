'use client';

import React from 'react';

const galleryImages = [
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
  'https://images.unsplash.com/photo-1613977257363-707ba9348227',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
  'https://images.unsplash.com/photo-1600607687644-c7171bb3e29b',
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
  'https://images.unsplash.com/photo-1599423300746-b62533397364',
];

const PropertyGallery = () => {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header Area */}
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Property Media
            </h2>
            <h3 className="text-2xl font-bold text-blue-950">Property Gallery</h3>
          </div>

          <button className="mt-4 md:mt-0 rounded-md border border-gray-200 px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all uppercase tracking-tight">
            Download All Assets
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl bg-gray-100 aspect-square sm:aspect-auto sm:h-48 cursor-pointer"
            >
              <img
                src={`${img}?auto=format&fit=crop&w=600&q=80`}
                alt={`Property view ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyGallery;

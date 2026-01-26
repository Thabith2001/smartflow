'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  FaMapMarkerAlt,
  FaSearch,
  FaExpandArrowsAlt,
  FaChevronLeft,
  FaChevronRight,
  FaRulerCombined,
  FaTree,
  FaTimes as X,
} from 'react-icons/fa';
import { useState } from 'react';

const lands = [
  {
    id: 1,
    title: 'Mountain Ridge Plot',
    location: 'Asheville, NC',
    type: 'Residential',
    size: '5.5 Acres',
    price: '$245,000',
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 2,
    title: 'Coastal Development Lot',
    location: 'Malibu, CA',
    type: 'Commercial',
    size: '0.8 Acres',
    price: '$3,200,000',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 3,
    title: 'Desert View Acreage',
    location: 'Sedona, AZ',
    type: 'Vacant Land',
    size: '10 Acres',
    price: '$580,000',
    image:
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 4,
    title: 'Suburban Building Lot',
    location: 'Austin, TX',
    type: 'Residential',
    size: '15,000 SQFT',
    price: '$185,000',
    image:
      'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 5,
    title: 'Lakeside Retreat Plot',
    location: 'Lake Tahoe, NV',
    type: 'Residential',
    size: '2.5 Acres',
    price: '$890,000',
    image:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 6,
    title: 'Downtown Infill Lot',
    location: 'Nashville, TN',
    type: 'Commercial',
    size: '0.4 Acres',
    price: '$1,100,000',
    image:
      'https://images.unsplash.com/photo-1500322969630-a26ab6eb64bb?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 7,
    title: 'Rolling Hills Farmstead',
    location: 'Lexington, KY',
    type: 'Agricultural',
    size: '40 Acres',
    price: '$750,000',
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 8,
    title: 'Forest Edge Parcel',
    location: 'Portland, OR',
    type: 'Timber Land',
    size: '12 Acres',
    price: '$320,000',
    image:
      'https://images.unsplash.com/photo-1448375235591-282273b1503c?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 9,
    title: 'Pacific Vista Cliff',
    location: 'Big Sur, CA',
    type: 'Residential',
    size: '1.2 Acres',
    price: '$4,500,000',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 10,
    title: 'Zoned Industrial Site',
    location: 'Houston, TX',
    type: 'Industrial',
    size: '5 Acres',
    price: '$950,000',
    image:
      'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 11,
    title: 'Riverfront Acreage',
    location: 'Missoula, MT',
    type: 'Ranch Land',
    size: '25 Acres',
    price: '$640,000',
    image:
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 12,
    title: 'Aspen Valley Slope',
    location: 'Aspen, CO',
    type: 'Residential',
    size: '3 Acres',
    price: '$2,800,000',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 13,
    title: 'High Desert Plateau',
    location: 'Santa Fe, NM',
    type: 'Vacant Land',
    size: '50 Acres',
    price: '$410,000',
    image:
      'https://images.unsplash.com/photo-1439337153520-7082a56a81f4?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 14,
    title: 'Citrus Grove Land',
    location: 'Orlando, FL',
    type: 'Agricultural',
    size: '20 Acres',
    price: '$850,000',
    image:
      'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 15,
    title: 'Everglades Frontier',
    location: 'Miami, FL',
    type: 'Wetland',
    size: '100 Acres',
    price: '$1,200,000',
    image:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 16,
    title: 'Green Mountain Acres',
    location: 'Burlington, VT',
    type: 'Residential',
    size: '8 Acres',
    price: '$295,000',
    image:
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 17,
    title: 'Grand Canyon Vista',
    location: 'Flagstaff, AZ',
    type: 'Unimproved',
    size: '5.2 Acres',
    price: '$350,000',
    image:
      'https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 18,
    title: 'Luxury Vineyard Land',
    location: 'Napa, CA',
    type: 'Vineyard',
    size: '15 Acres',
    price: '$6,700,000',
    image:
      'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 19,
    title: 'Pecan Grove Estate',
    location: 'Savannah, GA',
    type: 'Residential',
    size: '4 Acres',
    price: '$480,000',
    image:
      'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 20,
    title: 'Smoky Mountain Peaks',
    location: 'Gatlinburg, TN',
    type: 'Cabin Land',
    size: '2.8 Acres',
    price: '$190,000',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000',
  },
];

export default function LandsPage() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImg, setSelectedImg] = useState(null);
  const itemsPerPage = 6;

  const filteredLands = lands.filter(
    (land) =>
      land.title.toLowerCase().includes(search.toLowerCase()) ||
      land.location.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLands.length / itemsPerPage);
  const currentItems = filteredLands.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative py-28 text-white text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000"
            alt="USA Land Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0A1D37]/40 backdrop-blur-[2px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h1 className="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tighter">
            Verified <span className="text-[#FFB800]">USA Lands</span>
          </h1>
          <p className="text-zinc-300 font-medium text-lg max-w-2xl mx-auto">
            Discover premium acreage, agricultural plots, and development sites across the United
            States.
          </p>

          <div className="max-w-xl mx-auto mt-10 relative">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 z-20" />
            <input
              className="w-full py-5 pl-14 pr-6 rounded-md text-black outline-none shadow-2xl border-none relative z-10 text-lg"
              placeholder="Search by state or land title..."
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {currentItems.map((land, index) => {
            const absoluteIndex = (currentPage - 1) * itemsPerPage + index;

            return (
              <div
                key={land.id}
                className="group border border-gray-100 shadow-sm rounded-sm bg-white overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={land.image}
                    alt={land.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-1000"
                  />

                  {absoluteIndex < 10 && (
                    <div className="absolute top-4 left-4 bg-[#1E3A8A] text-white text-[10px] font-bold px-3 py-1.5 tracking-widest uppercase rounded-sm">
                      Latest
                    </div>
                  )}

                  <div
                    className="absolute top-4 right-4 bg-[#FFB800] p-2.5 text-[#0A1D37] cursor-pointer hover:bg-white transition-colors"
                    onClick={() => setSelectedImg(land.image)}
                  >
                    <FaExpandArrowsAlt size={16} />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-[#1E3A8A] text-xl font-black uppercase tracking-tight leading-tight">
                      {land.title}
                    </h3>
                    <span className="text-[#FFB800] text-xl font-bold whitespace-nowrap">
                      {land.price}
                    </span>
                  </div>
                  <p className="text-gray-400 font-medium text-sm mb-6 flex items-center gap-1">
                    <FaMapMarkerAlt className="text-xs" /> {land.location}
                  </p>

                  <hr className="border-gray-100 mb-5" />

                  <div className="flex justify-between items-center text-[#4B5E7D] font-bold text-xs uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <FaTree className="text-[#1E3A8A] text-lg" />
                      <span>{land.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaRulerCombined className="text-[#1E3A8A] text-lg" />
                      <span>{land.size}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right-Aligned Pagination */}
        {totalPages > 1 && (
          <div className="mt-20 flex justify-end items-center gap-3">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-3 border rounded-md hover:bg-[#1E3A8A] hover:text-white transition-all disabled:opacity-30"
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-12 h-12 rounded-md font-black transition-all border ${currentPage === i + 1 ? 'bg-blue-900 border-blue-900 text-white shadow-lg' : 'bg-white text-blue-900 hover:border-blue-900'}`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-3 border rounded-md hover:bg-blue-900 hover:text-white transition-all disabled:opacity-30"
              disabled={currentPage === totalPages}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 md:p-12"
          onClick={() => setSelectedImg(null)}
        >
          <button
            className="absolute top-8 right-8 text-white hover:text-[#FFB800] transition-colors"
            onClick={() => setSelectedImg(null)}
          >
            <X size={40} />
          </button>
          <img
            src={selectedImg}
            alt="Full size property"
            className="max-w-4xl w-full max-h-full object-contain rounded-sm shadow-2xl"
          />
        </div>
      )}

      <Footer />
    </div>
  );
}

'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  FaMapMarkerAlt,
  FaSearch,
  FaExpandArrowsAlt,
  FaChevronLeft,
  FaChevronRight,
  FaBed,
  FaBath,
  FaTimes as X,
} from 'react-icons/fa';
import { LuRuler } from 'react-icons/lu';
import { useState } from 'react';

const houses = [
  {
    id: 1,
    title: 'Modern Glass Villa',
    location: 'Los Angeles, CA',
    beds: 5,
    baths: 4,
    sqft: '4,200',
    price: '$3,450,000',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 2,
    title: 'Beachfront Mansion',
    location: 'Miami, FL',
    beds: 6,
    baths: 7,
    sqft: '6,800',
    price: '$8,200,000',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 3,
    title: 'Mountain View Estate',
    location: 'Aspen, CO',
    beds: 4,
    baths: 3.5,
    sqft: '3,500',
    price: '$2,150,000',
    image:
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 4,
    title: 'Urban Luxury Loft',
    location: 'New York, NY',
    beds: 2,
    baths: 2,
    sqft: '1,800',
    price: '$1,850,000',
    image:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 5,
    title: 'Desert Oasis Home',
    location: 'Scottsdale, AZ',
    beds: 3,
    baths: 3,
    sqft: '2,900',
    price: '$980,000',
    image:
      'https://images.unsplash.com/photo-1449156001437-37c645dcf501?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 6,
    title: 'Colonial Heritage',
    location: 'Charleston, SC',
    beds: 5,
    baths: 4.5,
    sqft: '5,100',
    price: '$1,400,000',
    image:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 7,
    title: 'Pacific Horizon Villa',
    location: 'Malibu, CA',
    beds: 5,
    baths: 6,
    sqft: '5,500',
    price: '$5,900,000',
    image:
      'https://images.unsplash.com/photo-1575517111478-7f6afd0973db?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 8,
    title: 'Seattle Glass Tower',
    location: 'Seattle, WA',
    beds: 3,
    baths: 2,
    sqft: '2,100',
    price: '$1,250,000',
    image:
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 9,
    title: 'The Golden Gate Suite',
    location: 'San Francisco, CA',
    beds: 4,
    baths: 3,
    sqft: '3,200',
    price: '$4,100,000',
    image:
      'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 10,
    title: 'Rustic Ranch Estate',
    location: 'Austin, TX',
    beds: 5,
    baths: 4,
    sqft: '4,800',
    price: '$1,750,000',
    image:
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 11,
    title: 'Key West Hideaway',
    location: 'Key West, FL',
    beds: 3,
    baths: 2,
    sqft: '1,900',
    price: '$1,150,000',
    image:
      'https://images.unsplash.com/photo-1572120339559-0137c159fc8b?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 12,
    title: 'Chicago Sky Palace',
    location: 'Chicago, IL',
    beds: 4,
    baths: 4,
    sqft: '3,900',
    price: '$2,800,000',
    image:
      'https://images.unsplash.com/photo-1600607687940-4e524cb350b1?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 13,
    title: 'Portland Zen Retreat',
    location: 'Portland, OR',
    beds: 3,
    baths: 2.5,
    sqft: '2,400',
    price: '$890,000',
    image:
      'https://images.unsplash.com/photo-1513584684374-8bdb7489feef?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 14,
    title: 'Buckhead Manor',
    location: 'Atlanta, GA',
    beds: 6,
    baths: 5,
    sqft: '6,200',
    price: '$2,100,000',
    image:
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 15,
    title: 'Nashville Music Villa',
    location: 'Nashville, TN',
    beds: 4,
    baths: 3.5,
    sqft: '3,300',
    price: '$1,250,000',
    image:
      'https://images.unsplash.com/photo-1512914890251-2f96a9b0bbe2?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 16,
    title: 'Blue Ridge Cabin',
    location: 'Asheville, NC',
    beds: 3,
    baths: 2,
    sqft: '2,100',
    price: '$720,000',
    image:
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 17,
    title: 'Vegas Strip Flat',
    location: 'Las Vegas, NV',
    beds: 2,
    baths: 2,
    sqft: '1,600',
    price: '$950,000',
    image:
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 18,
    title: 'Silicon Valley Smart',
    location: 'Palo Alto, CA',
    beds: 5,
    baths: 4,
    sqft: '4,100',
    price: '$4,800,000',
    image:
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 19,
    title: 'New Orleans Heritage',
    location: 'New Orleans, LA',
    beds: 4,
    baths: 3,
    sqft: '3,100',
    price: '$1,300,000',
    image:
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 20,
    title: 'Hamptons Summer House',
    location: 'The Hamptons, NY',
    beds: 7,
    baths: 8,
    sqft: '9,500',
    price: '$12,500,000',
    image:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1000',
  },
];

export default function HousesPage() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImg, setSelectedImg] = useState(null);
  const itemsPerPage = 6;

  const filteredHouses = houses.filter(
    (house) =>
      house.title.toLowerCase().includes(search.toLowerCase()) ||
      house.location.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredHouses.length / itemsPerPage);
  const currentItems = filteredHouses.slice(
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
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury Houses Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0A1D37]/40 backdrop-blur-[1px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h1 className="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tighter">
            Premium <span className="text-[#FFB800]">USA Houses</span>
          </h1>
          <p className="text-zinc-300 font-medium text-lg max-w-2xl mx-auto">
            Find your dream home from our curated selection of luxury estates and modern villas.
          </p>

          <div className="max-w-xl mx-auto mt-10 relative">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 z-20" />
            <input
              className="w-full py-5 pl-14 pr-6 rounded-md text-black outline-none shadow-2xl border-none relative z-10 text-lg"
              placeholder="Search by city or property name..."
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
          {currentItems.map((house, index) => {
            // Logic to show "Latest" only for the first 10 items globally
            const absoluteIndex = (currentPage - 1) * itemsPerPage + index;

            return (
              <div
                key={house.id}
                className="group border border-gray-100 shadow-sm rounded-sm bg-white overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={house.image}
                    alt={house.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-1000"
                  />

                  {/* Latest Badge logic */}
                  {absoluteIndex < 10 && (
                    <div className="absolute top-4 left-4 bg-[#1E3A8A] text-white text-[10px] font-bold px-3 py-1.5 tracking-widest uppercase rounded-sm">
                      Latest
                    </div>
                  )}

                  <div
                    className="absolute top-4 right-4 bg-[#FFB800] p-2.5 text-[#0A1D37] cursor-pointer hover:bg-white transition-colors"
                    onClick={() => setSelectedImg(house.image)}
                  >
                    <FaExpandArrowsAlt size={16} />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-[#1E3A8A] text-xl font-black uppercase tracking-tight leading-tight">
                      {house.title}
                    </h3>
                    <span className="text-[#FFB800] text-xl font-bold whitespace-nowrap">
                      {house.price}
                    </span>
                  </div>
                  <p className="text-gray-400 font-medium text-sm mb-6 flex items-center gap-1">
                    <FaMapMarkerAlt className="text-xs" /> {house.location}
                  </p>

                  <hr className="border-gray-100 mb-5" />

                  <div className="flex justify-between items-center text-[#4B5E7D] font-bold text-xs uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <FaBed className="text-[#1E3A8A] text-xl" />
                      <span>{house.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaBath className="text-[#1E3A8A] text-xl" />
                      <span>{house.baths} Baths</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <LuRuler className="text-[#1E3A8A] text-xl" />
                      <span>{house.sqft} Sqft</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Logic - Right Aligned */}
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

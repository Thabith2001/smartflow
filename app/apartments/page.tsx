'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  FaMapMarkerAlt,
  FaSearch,
  FaExpandArrowsAlt,
  FaChevronLeft,
  FaChevronRight,
  FaBuilding,
  FaPaw,
  FaTimes as X,
} from 'react-icons/fa';
import { LuBedDouble, LuBath } from 'react-icons/lu';
import { useState } from 'react';

const apartments = [
  {
    id: 1,
    title: 'Skyline Penthouse',
    location: 'Manhattan, NY',
    beds: 3,
    baths: 3,
    floor: '42nd',
    pets: 'Allowed',
    price: '$12,500/mo',
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 2,
    title: 'Industrial Loft',
    location: 'Brooklyn, NY',
    beds: 1,
    baths: 1,
    floor: '4th',
    pets: 'Cats Only',
    price: '$4,200/mo',
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 3,
    title: 'Lakeside Highrise',
    location: 'Chicago, IL',
    beds: 2,
    baths: 2,
    floor: '15th',
    pets: 'Allowed',
    price: '$3,800/mo',
    image:
      'https://images.unsplash.com/photo-1560448204-61dc36dc98ce?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 4,
    title: 'Modern Studio',
    location: 'Seattle, WA',
    beds: 0,
    baths: 1,
    floor: 'Grd',
    pets: 'No Pets',
    price: '$2,100/mo',
    image:
      'https://images.unsplash.com/photo-1536376074432-8d640596717d?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 5,
    title: 'The Glass House',
    location: 'Miami, FL',
    beds: 2,
    baths: 2.5,
    floor: '22nd',
    pets: 'Allowed',
    price: '$6,500/mo',
    image:
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 6,
    title: 'Heritage Flat',
    location: 'Boston, MA',
    beds: 2,
    baths: 1,
    floor: '2nd',
    pets: 'Allowed',
    price: '$3,200/mo',
    image:
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 7,
    title: 'Marina Bay Condo',
    location: 'San Francisco, CA',
    beds: 1,
    baths: 1,
    floor: '10th',
    pets: 'Allowed',
    price: '$4,900/mo',
    image:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 8,
    title: 'Urban Garden Suite',
    location: 'Portland, OR',
    beds: 2,
    baths: 1,
    floor: '1st',
    pets: 'Dogs Only',
    price: '$2,400/mo',
    image:
      'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 9,
    title: 'The Platinum Tower',
    location: 'Dallas, TX',
    beds: 3,
    baths: 3.5,
    floor: '30th',
    pets: 'Allowed',
    price: '$5,100/mo',
    image:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 10,
    title: 'Capitol Hill Apt',
    location: 'Washington, DC',
    beds: 1,
    baths: 1,
    floor: '5th',
    pets: 'No Pets',
    price: '$2,900/mo',
    image:
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 11,
    title: 'Sunset Blvd Studio',
    location: 'Los Angeles, CA',
    beds: 0,
    baths: 1,
    floor: '3rd',
    pets: 'Allowed',
    price: '$2,750/mo',
    image:
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 12,
    title: 'River North Loft',
    location: 'Chicago, IL',
    beds: 2,
    baths: 2,
    floor: '8th',
    pets: 'Allowed',
    price: '$4,100/mo',
    image:
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 13,
    title: 'Arts District Flat',
    location: 'New Orleans, LA',
    beds: 1,
    baths: 1,
    floor: '2nd',
    pets: 'Allowed',
    price: '$1,950/mo',
    image:
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 14,
    title: 'Tech Hub Residence',
    location: 'Austin, TX',
    beds: 2,
    baths: 2,
    floor: '12th',
    pets: 'Allowed',
    price: '$3,400/mo',
    image:
      'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 15,
    title: 'Midtown Terrace',
    location: 'Atlanta, GA',
    beds: 2,
    baths: 2,
    floor: '6th',
    pets: 'Cats Only',
    price: '$2,650/mo',
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 16,
    title: 'Pike Place Pad',
    location: 'Seattle, WA',
    beds: 1,
    baths: 1,
    floor: '14th',
    pets: 'No Pets',
    price: '$2,850/mo',
    image:
      'https://images.unsplash.com/photo-1499916078039-922301b0eb9b?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 17,
    title: 'Cherry Creek Condo',
    location: 'Denver, CO',
    beds: 2,
    baths: 2,
    floor: '4th',
    pets: 'Allowed',
    price: '$3,100/mo',
    image:
      'https://images.unsplash.com/photo-1493246318656-5bbd4afb09b7?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 18,
    title: 'Brickell Avenue Apt',
    location: 'Miami, FL',
    beds: 1,
    baths: 1.5,
    floor: '35th',
    pets: 'Allowed',
    price: '$4,200/mo',
    image:
      'https://images.unsplash.com/photo-1469022563428-aa04fef9f5a2?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 19,
    title: 'Upper East Side',
    location: 'New York, NY',
    beds: 2,
    baths: 2,
    floor: '18th',
    pets: 'No Pets',
    price: '$7,200/mo',
    image:
      'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 20,
    title: 'French Quarter Loft',
    location: 'New Orleans, LA',
    beds: 1,
    baths: 1,
    floor: '3rd',
    pets: 'Allowed',
    price: '$2,100/mo',
    image:
      'https://images.unsplash.com/photo-1556912177-c54030639814?auto=format&fit=crop&q=80&w=1000',
  },
];

export default function ApartmentsPage() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImg, setSelectedImg] = useState(null);
  const itemsPerPage = 6;

  const filteredItems = apartments.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
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
            src="https://images.unsplash.com/photo-1534655610770-dd69616f05ff?q=80&w=2156&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="City Apartments Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0A1D37]/40 backdrop-blur-[2px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h1 className="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tighter">
            Urban <span className="text-[#FFB800]">Apartments</span>
          </h1>
          <p className="text-zinc-300 font-medium text-lg max-w-2xl mx-auto">
            Discover luxury rentals and modern condos in the heart of the city's most vibrant
            neighborhoods.
          </p>

          <div className="max-w-xl mx-auto mt-10 relative">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 z-20" />
            <input
              className="w-full py-5 pl-14 pr-6 rounded-md text-black outline-none shadow-2xl border-none relative z-10 text-lg"
              placeholder="Search by city or apartment name..."
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
          {currentItems.map((item, index) => {
            const absoluteIndex = (currentPage - 1) * itemsPerPage + index;

            return (
              <div
                key={item.id}
                className="group border border-gray-100 shadow-sm rounded-sm bg-white overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-1000"
                  />

                  {/* Latest  */}
                  {absoluteIndex < 10 && (
                    <div className="absolute top-4 left-4 bg-[#1E3A8A] text-white text-[10px] font-bold px-3 py-1.5 tracking-widest uppercase rounded-sm">
                      Latest
                    </div>
                  )}

                  <div
                    className="absolute top-4 right-4 bg-[#FFB800] p-2.5 text-[#0A1D37] cursor-pointer hover:bg-white transition-colors"
                    onClick={() => setSelectedImg(item.image)}
                  >
                    <FaExpandArrowsAlt size={16} />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-[#1E3A8A] text-xl font-black uppercase tracking-tight leading-tight">
                      {item.title}
                    </h3>
                    <div className="text-right">
                      <span className="text-[#FFB800] text-xl font-bold block">{item.price}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 font-medium text-sm mb-6 flex items-center gap-1">
                    <FaMapMarkerAlt className="text-xs" /> {item.location}
                  </p>

                  <hr className="border-gray-100 mb-5" />

                  <div className="grid grid-cols-4 gap-2 text-[#4B5E7D] font-bold text-[10px] uppercase tracking-wider">
                    <div className="flex flex-col items-center gap-1">
                      <LuBedDouble className="text-[#1E3A8A] text-lg" />
                      <span>{item.beds} Bed</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <LuBath className="text-[#1E3A8A] text-lg" />
                      <span>{item.baths} Bath</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <FaBuilding className="text-[#1E3A8A] text-lg" />
                      <span>{item.floor}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <FaPaw className="text-[#1E3A8A] text-lg" />
                      <span>{item.pets}</span>
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

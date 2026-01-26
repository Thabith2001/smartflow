'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaClock,
  FaArrowRight,
} from 'react-icons/fa';
import { useState } from 'react';

const blogPosts = [
  {
    id: 1,
    category: 'Investment',
    title: 'Real Estate Trends to Watch in 2026',
    excerpt:
      'Discover the emerging markets and technologies shaping the future of property investment...',
    date: 'Jan 24, 2026',
    readTime: '5 min',
    image:
      'https://images.unsplash.com/photo-1460472178825-e52506135b27?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 2,
    category: 'Interior',
    title: 'Minimalist Decor: Less is More',
    excerpt:
      'How to transform your apartment into a serene sanctuary using clean lines and neutral tones...',
    date: 'Jan 22, 2026',
    readTime: '4 min',
    image:
      'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 3,
    category: 'Legal',
    title: 'Understanding Land Zoning Laws',
    excerpt:
      'A comprehensive guide for first-time land buyers on navigating complex zoning regulations...',
    date: 'Jan 20, 2026',
    readTime: '8 min',
    image:
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 4,
    category: 'Lifestyle',
    title: 'Top 10 Rooftop Gardens in NYC',
    excerpt:
      'Exploring the lush green escapes hidden atop Manhattan’s most exclusive luxury high-rises...',
    date: 'Jan 18, 2026',
    readTime: '6 min',
    image:
      'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 5,
    category: 'Market',
    title: 'Is Now the Time to Buy Land?',
    excerpt:
      'Analyzing the current economic shift and its impact on rural acreage prices across the USA...',
    date: 'Jan 15, 2026',
    readTime: '7 min',
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 6,
    category: 'Architecture',
    title: 'Sustainable Modern Villas',
    excerpt:
      'How architects are integrating solar and smart tech into luxury home designs seamlessly...',
    date: 'Jan 12, 2026',
    readTime: '10 min',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 7,
    category: 'Tips',
    title: 'Staging Your Home for a Fast Sale',
    excerpt:
      'Proven techniques from pro stagers to make your house irresistible to potential buyers...',
    date: 'Jan 10, 2026',
    readTime: '5 min',
    image:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 8,
    category: 'Apartment',
    title: 'Small Space Living Hacks',
    excerpt:
      'Maximize every square foot of your urban apartment with these creative furniture solutions...',
    date: 'Jan 08, 2026',
    readTime: '4 min',
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 9,
    category: 'Investment',
    title: 'Flipping Houses in the Digital Age',
    excerpt:
      'Using AI and data analytics to find the perfect fix-and-flip properties in competitive markets...',
    date: 'Jan 05, 2026',
    readTime: '9 min',
    image:
      'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 10,
    category: 'Lifestyle',
    title: 'Why Montana is the New Malibu',
    excerpt:
      'The massive migration of luxury buyers to the mountains of Big Sky Country explained...',
    date: 'Jan 02, 2026',
    readTime: '6 min',
    image:
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=1000',
  },

  {
    id: 11,
    category: 'Market',
    title: 'Interest Rates Update',
    excerpt: 'What the latest Fed announcement means for your next mortgage or land loan...',
    date: 'Dec 28, 2025',
    readTime: '3 min',
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 12,
    category: 'Interior',
    title: 'Color of the Year 2026',
    excerpt: 'Introducing "Midnight Sage"—how to use this calming hue in your master bedroom...',
    date: 'Dec 25, 2025',
    readTime: '4 min',
    image:
      'https://images.unsplash.com/photo-1616489953149-808620242270?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 13,
    category: 'Land',
    title: 'Soil Testing 101',
    excerpt: 'Why every land buyer needs a perc test before signing the final contract...',
    date: 'Dec 20, 2025',
    readTime: '6 min',
    image:
      'https://images.unsplash.com/photo-1500322969630-a26ab6eb64bb?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 14,
    category: 'Legal',
    title: 'Title Insurance Explained',
    excerpt:
      'Don’t lose your property to old claims—everything you need to know about title safety...',
    date: 'Dec 15, 2025',
    readTime: '5 min',
    image:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 15,
    category: 'Architecture',
    title: 'The Rise of A-Frames',
    excerpt: 'Why modern cabin designs are becoming the preferred second home for city dwellers...',
    date: 'Dec 10, 2025',
    readTime: '7 min',
    image:
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 16,
    category: 'Tips',
    title: 'Smart Home Security',
    excerpt: 'Comparing the best integrated security systems for high-value residential estates...',
    date: 'Dec 05, 2025',
    readTime: '8 min',
    image:
      'https://images.unsplash.com/photo-1558002038-103792e17734?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 17,
    category: 'Investment',
    title: 'Commercial vs Residential',
    excerpt: 'Which asset class offers better ROI in the current shifting urban landscape...',
    date: 'Dec 01, 2025',
    readTime: '11 min',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 18,
    category: 'Apartment',
    title: 'Lease Negotiation Secrets',
    excerpt: 'How to get better amenities or rent credits in luxury apartment buildings...',
    date: 'Nov 28, 2025',
    readTime: '5 min',
    image:
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 19,
    category: 'Lifestyle',
    title: 'Expat Living in the US',
    excerpt: 'A guide for international buyers looking to relocate to Florida or California...',
    date: 'Nov 25, 2025',
    readTime: '9 min',
    image:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 20,
    category: 'Architecture',
    title: 'Glass Walls & Privacy',
    excerpt:
      'Innovative smart-glass solutions for modern villas that want both views and seclusion...',
    date: 'Nov 20, 2025',
    readTime: '6 min',
    image:
      'https://images.unsplash.com/photo-1600607687940-4e524cb350b1?auto=format&fit=crop&q=80&w=1000',
  },
];

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.category.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const currentItems = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Blog Hero Section */}

      <section className="relative py-28 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
            alt="Blog Background"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1D37]/40 via-[#0A1D37]/80 to-[#0A1D37]/95 backdrop-blur-[2px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <span className="text-[#FFB800] font-black uppercase tracking-[0.3em] text-xs block mb-4">
            Insights & News
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8">
            The <span className="text-[#FFB800]">Knowledge</span> Base
          </h1>

          <div className="max-w-xl mx-auto relative group">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#1E3A8A] transition-colors z-20" />
            <input
              className="w-full py-5 pl-14 pr-6 rounded-lg bg-white border-none outline-none focus:ring-4 ring-[#FFB800]/30 transition-all text-lg shadow-2xl relative z-10 text-black"
              placeholder="Search articles, tips, or categories..."
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {currentItems.map((post, index) => {
            const absoluteIndex = (currentPage - 1) * itemsPerPage + index;

            return (
              <article key={post.id} className="group cursor-pointer">
                <div className="relative h-64 mb-6 overflow-hidden rounded-sm bg-zinc-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Category Overlay */}
                  <div className="absolute bottom-0 left-0 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[#1E3A8A]">
                    {post.category}
                  </div>

                  {/* Trending Badge  */}
                  {absoluteIndex < 10 && (
                    <div className="absolute top-4 right-4 bg-[#FFB800] text-[#0A1D37] text-[10px] font-black px-3 py-1 uppercase tracking-tighter shadow-lg">
                      Trending
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-zinc-400 text-xs font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-1.5">
                      <FaCalendarAlt className="text-[#FFB800]" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaClock className="text-[#FFB800]" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-[#0A1D37] leading-tight group-hover:text-[#1E3A8A] transition-colors line-clamp-2 uppercase tracking-tighter">
                    {post.title}
                  </h3>

                  <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="pt-4 flex items-center gap-2 text-[#1E3A8A] font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                    Read Story <FaArrowRight />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Pagination - Right Aligned */}
        {totalPages > 1 && (
          <div className="mt-24 flex justify-end items-center gap-3">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-3 border border-zinc-200 rounded-md hover:bg-[#1E3A8A] hover:text-white transition-all disabled:opacity-30"
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-12 h-12 rounded-md font-black transition-all border ${
                  currentPage === i + 1
                    ? 'bg-[#1E3A8A] border-[#1E3A8A] text-white shadow-xl'
                    : 'bg-white text-[#1E3A8A] border-zinc-200 hover:border-[#1E3A8A]'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-3 border border-zinc-200 rounded-md hover:bg-[#1E3A8A] hover:text-white transition-all disabled:opacity-30"
              disabled={currentPage === totalPages}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="bg-[#0A1D37] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">
            Never Miss an <span className="text-[#FFB800]">Update</span>
          </h2>
          <p className="text-zinc-400 mb-8 font-medium">
            Join 5,000+ investors and get the latest property market insights delivered weekly.
          </p>
          <form className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-sm bg-white/5 border border-white/10 text-white outline-none focus:border-[#FFB800] transition-colors"
            />
            <button className="bg-[#FFB800] text-[#0A1D37] px-10 py-4 font-black uppercase tracking-widest hover:bg-white transition-all">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}

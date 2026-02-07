'use client';
import { useState, useMemo, useEffect } from 'react';
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

interface BlogPost {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
}

const blogPosts: BlogPost[] = [
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
];

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // When the search term changes, reset to page 1 only if not already 1
  useEffect(() => {
    setCurrentPage((prev) => (prev === 1 ? prev : 1));
  }, [search]);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const currentItems = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F2F4F7] flex flex-col font-sans">
      <Header />

      {/* Hero Section  */}
      <section className="relative py-24 text-white overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
          alt="Blog Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative max-w-[1400px] mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
            The <span className="text-[#FFB800]">Knowledge</span> Hub
          </h1>
          <p className="mt-6 text-zinc-300 font-bold uppercase tracking-[0.3em] text-xs flex items-center gap-3">
            <span className="w-12 h-[2px] bg-[#FFB800]"></span> Insights, Trends & Market Analytics
          </p>

          <div className="mt-10 max-w-xl relative group">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#FFB800] transition-colors" />
            <input
              className="w-full py-4 pl-14 pr-6 bg-white/10 backdrop-blur-md border border-white/20 outline-none focus:border-[#FFB800] transition-all text-sm text-white placeholder:text-zinc-400"
              placeholder="Search by topic or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <main className="max-w-[1400px] mx-auto px-6 py-16 flex-1 w-full">
        {currentItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems.map((post) => (
              <article
                key={post.id}
                className="group bg-white border border-zinc-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-video overflow-hidden bg-zinc-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-0 left-0 bg-blue-900 text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest">
                    {post.category}
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1.5">
                      <FaCalendarAlt className="text-[#FFB800]" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaClock className="text-[#FFB800]" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-blue-900 uppercase tracking-tight leading-tight mb-4 group-hover:text-[#FFB800] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto pt-6 border-t border-zinc-100 flex items-center gap-2 text-blue-900 font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                    Read Full Analysis <FaArrowRight className="text-[#FFB800]" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-dashed border-zinc-300">
            <p className="text-zinc-400 uppercase font-black text-sm tracking-widest">
              No articles found matching your search
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center md:justify-end items-center gap-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center border bg-white text-blue-900 hover:bg-[#FFB800] disabled:opacity-30 transition-colors"
            >
              <FaChevronLeft size={12} />
            </button>
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-10 h-10 text-xs font-black border transition-all ${
                    currentPage === i + 1
                      ? 'bg-blue-900 text-white border-blue-900'
                      : 'bg-white text-blue-900 border-zinc-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center border bg-white text-blue-900 hover:bg-[#FFB800] disabled:opacity-30 transition-colors"
            >
              <FaChevronRight size={12} />
            </button>
          </div>
        )}
      </main>

      {/* Newsletter Section */}
      <section className="bg-blue-900 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">
            Elite <span className="text-[#FFB800]">Newsletter</span>
          </h2>
          <p className="text-zinc-300 mb-10 font-bold uppercase tracking-widest text-xs">
            Market analytics delivered directly to your inbox.
          </p>
          <form className="flex flex-col md:flex-row gap-0 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="YOUR EMAIL ADDRESS"
              className="flex-1 px-6 py-4 bg-white text-blue-900 font-bold outline-none text-xs tracking-widest"
            />
            <button className="bg-[#FFB800] text-blue-900 px-10 py-4 font-black uppercase tracking-widest hover:bg-white transition-all">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}

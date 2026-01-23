'use client';

import Header from './components/Header';
import Footer from './components/Footer';
import HeroBanner from './components/home/HeroBanner';
import WhyChooseUs from './components/home/WhyChooseUs';
import PropertyListings from './components/home/PropertyListings';
import PropertyGallery from './components/home/PropertyGallery';
import FeaturedProperties from './components/home/FeaturedProperties';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-zinc-900">
      <Header />

      <main className="flex-grow">
        {/* TOP SECTION*/}
        <HeroBanner />

        {/* WHY CHOOSE US SECTION */}
        <WhyChooseUs />

        {/* PROPERTY LISTINGS SECTION */}
        <PropertyListings />

        {/* FEATURED PROPERTIES */}
        <FeaturedProperties />

        {/* --- PROPERTY GALLERY --- */}
        <PropertyGallery />
      </main>

      <Footer />
    </div>
  );
}

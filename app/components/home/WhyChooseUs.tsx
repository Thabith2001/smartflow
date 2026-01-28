'use client';

import React from 'react';
import { Lightbulb, ShieldCheck, PenTool, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="group relative p-6 md:p-8 transition-all duration-500 hover:bg-blue-900 border-b border-gray-100 last:border-b-0">
      <div className="flex items-start gap-4 md:gap-6">
        <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 bg-gray-50 group-hover:bg-[#FFB800]/20 transition-colors duration-500">
          {icon}
        </div>

        <div>
          <h4 className="text-lg font-black uppercase tracking-tighter text-blue-900 group-hover:text-[#FFB800] mb-2 transition-colors duration-500">
            {title}
          </h4>

          <p className="text-sm text-gray-500 group-hover:text-white/80 leading-relaxed font-medium transition-colors duration-500">
            {description}
          </p>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-1 h-0 bg-[#FFB800] transition-all duration-500 group-hover:h-full" />
    </div>
  );
};

const WhyChooseUs = () => {
  return (
    <section className="bg-white overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row">
          {/* LEFT SIDE: CONTENT */}
          <div className="lg:w-1/2 py-16 md:py-24 px-6 lg:pr-16 order-2 lg:order-1">
            <div className="mb-12">
              <p className="text-gray-400 text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-4">
                <span className="w-8 md:w-10 h-[2px] bg-[#FFB800]"></span>
                Property Excellence
              </p>

              <h2 className="text-4xl md:text-5xl font-black text-blue-900 uppercase leading-none mb-6">
                APARTMENTS <br />
                <span className="text-gray-300">FOR SALE.</span>
              </h2>

              <p className="text-gray-500 max-w-md mb-8 font-medium leading-relaxed text-sm md:text-base">
                Elevating the standard of luxury residential living through meticulous attention to
                detail and world-class architectural design.
              </p>

              <Link href="/portfolio">
                <button className="flex items-center gap-3 font-black text-xs uppercase tracking-widest text-blue-900 hover:text-[#FFB800] transition-colors group border-b-2 border-gray-100 pb-2">
                  View All Units
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform text-[#FFB800]" />
                </button>
              </Link>
            </div>

            <div className="border-t-2 border-gray-100">
              <FeatureCard
                title="INNOVATION"
                icon={<Lightbulb className="h-6 w-6 text-[#FFB800]" />}
                description="Cutting-edge smart home integration and sustainable infrastructure for urban living."
              />
              <FeatureCard
                title="TRUST"
                icon={<ShieldCheck className="h-6 w-6 text-[#FFB800]" />}
                description="Decades of excellence in development with transparent processes and quality."
              />
              <FeatureCard
                title="DESIGN"
                icon={<PenTool className="h-6 w-6 text-[#FFB800]" />}
                description="Architectural mastery focused on spatial flow and premium materials."
              />
            </div>
          </div>

          {/* RIGHT SIDE: IMAGE */}
          <div className="lg:w-1/2 relative min-h-[400px] md:min-h-[500px] lg:min-h-full order-1 lg:order-2">
            <div className="absolute inset-0 group">
              <img
                src="https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=2070&auto=format&fit=crop"
                alt="Luxury Apartment Building"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
              />

              {/* FLOATING INFO BOX (Hidden on very small mobiles to prevent clutter) */}
              <div className="absolute bottom-6 md:bottom-12 right-0 bg-blue-900 p-6 md:p-10 max-w-[200px] md:max-w-xs">
                <h3 className="text-white font-black text-xl md:text-2xl uppercase mb-2 leading-tight">
                  Modern <br /> Heritage
                </h3>
                <p className="text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 md:mb-6">
                  Miami, Florida
                </p>
                <div className="h-1 w-12 bg-[#FFB800]"></div>
              </div>

              {/* PRICE TAG */}
              <div className="absolute top-6 left-6 md:top-12 md:left-12 bg-[#FFB800] text-blue-900 px-4 py-2 md:px-6 md:py-2 font-black text-xs md:text-sm uppercase tracking-tighter shadow-lg">
                Starting from $850k
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

'use client';

import Link from 'next/link';
import {
  FaArrowRight,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaWifi,
  FaParking,
  FaSwimmingPool,
  FaShieldAlt,
  FaChartPie,
  FaFileInvoiceDollar,
  FaTools,
} from 'react-icons/fa';
import Header from './components/Header';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-zinc-900">
      <Header />

      <main className="flex-grow">
        {/* TOP SECTION: HERO */}
        <section className="relative h-[85vh] w-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
            alt="Luxury Property"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Subtle Gradient Overlay for readability */}
          <div className="absolute inset-0 " />

          <div className="container relative z-10 mx-auto flex h-full items-center px-6">
            <div className="max-w-3xl text-white">
              <div className="mb-4 inline-flex items-center rounded bg-yellow-500 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-950">
                Miami Beach • Florida
              </div>

              <h1 className="mb-4 text-5xl font-bold uppercase text-white md:text-7xl leading-tight">
                The Skyline <br /> Residence.
              </h1>

              <p className="mb-8 flex items-center gap-2 text-xl text-zinc-100 font-medium">
                <FaMapMarkerAlt className="text-yellow-500" /> 1100 Biscayne Blvd, Miami, FL 33132
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/signup"
                  className="rounded-md bg-blue-950 px-8 py-4 font-bold text-white transition-all hover:bg-blue-900 shadow-xl"
                >
                  Book a Viewing
                </Link>
                <Link
                  href="/properties"
                  className="rounded-md border border-white/40 bg-white/10 px-8 py-4 font-bold backdrop-blur-md transition-all hover:bg-white/20"
                >
                  Explore Features
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* PROPERTY GALLERY & DETAILS SECTION */}
        <section className="bg-zinc-50 py-20">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="flex flex-col gap-12 lg:flex-row">
              <div className="lg:w-2/3">
                {/* Stats Header */}
                <div className="mb-8 flex items-center justify-between border-b border-zinc-200 pb-6">
                  <div className="flex gap-8">
                    <div className="text-center">
                      <p className="text-xs font-bold uppercase text-zinc-400">Bedrooms</p>
                      <p className="flex items-center gap-2 text-xl font-bold text-blue-950">
                        <FaBed /> 4
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-bold uppercase text-zinc-400">Bathrooms</p>
                      <p className="flex items-center gap-2 text-xl font-bold text-blue-950">
                        <FaBath /> 3.5
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-bold uppercase text-zinc-400">Square Ft</p>
                      <p className="flex items-center gap-2 text-xl font-bold text-blue-950">
                        <FaRulerCombined /> 3,200
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold uppercase text-zinc-400">Status</p>
                    <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                      Available
                    </span>
                  </div>
                </div>

                <h3 className="mb-4 text-2xl font-bold text-blue-950">Description</h3>
                <p className="mb-8 text-zinc-600 leading-relaxed">
                  Experience the pinnacle of coastal living at The Skyline Residence. This
                  state-of-the-art property features open-concept living, integrated SmartFlow home
                  automation, and floor-to-ceiling windows that frame the Miami skyline.
                </p>

                <h3 className="mb-6 text-xl font-bold text-blue-950">Property Amenities</h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-12">
                  {[
                    { icon: <FaWifi />, label: 'Fiber Internet' },
                    { icon: <FaParking />, label: 'Valet Parking' },
                    { icon: <FaSwimmingPool />, label: 'Rooftop Pool' },
                    { icon: <FaShieldAlt />, label: 'Biometric Security' },
                  ].map((amenity, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-lg bg-white p-4 border border-zinc-200 shadow-sm transition-all hover:border-blue-200"
                    >
                      <div className="text-blue-600">{amenity.icon}</div>
                      <span className="text-sm font-semibold text-zinc-700">{amenity.label}</span>
                    </div>
                  ))}
                </div>

                <h3 className="mb-6 text-xl font-bold text-blue-950">
                  Climate Resilient Architecture
                </h3>
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 mb-12">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'Impact Resistant Windows',
                      'Reinforced Structure',
                      'Backup Power',
                      'High-Efficiency HVAC',
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm font-medium text-zinc-700"
                      >
                        <FaCheckCircle className="text-green-500" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:w-1/3">
                <h3 className="mb-6 text-xl font-bold text-blue-950">Interior Gallery</h3>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  <img
                    src="https://images.unsplash.com/photo-1600607687940-4e5a48a259c9?auto=format&fit=crop&w=400&q=80"
                    className="rounded-lg object-cover h-32 w-full"
                    alt="Kitchen"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=400&q=80"
                    className="rounded-lg object-cover h-32 w-full"
                    alt="Living"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&w=400&q=80"
                    className="rounded-lg object-cover h-32 w-full"
                    alt="Bed"
                  />
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=400&q=80"
                      className="h-32 w-full object-cover brightness-50"
                      alt="More"
                    />
                    <span className="absolute inset-0 flex items-center justify-center font-bold text-white">
                      +12 More
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-blue-950 p-6 text-white shadow-xl sticky top-24">
                  <div className="mb-4 flex items-center gap-3">
                    <FaChartPie className="text-yellow-400" />
                    <h4 className="font-bold">Portfolio Insights</h4>
                  </div>
                  <div className="space-y-3 text-sm opacity-80">
                    <div className="flex justify-between">
                      <span>Annual Yield:</span>{' '}
                      <span className="font-bold text-yellow-400">6.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Occupancy:</span> <span className="font-bold">100%</span>
                    </div>
                  </div>
                  <button className="mt-6 w-full rounded bg-yellow-400 py-3 text-xs font-black uppercase text-blue-950 hover:bg-yellow-300">
                    View Asset Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- NEW SECTION: ENHANCED PROPERTY IMAGES --- */}
        <section className="bg-white py-16">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-blue-600">
                  Visual Assets
                </h2>
                <h3 className="text-3xl font-bold text-blue-950">Property Gallery</h3>
              </div>
              <button className="rounded-lg border border-zinc-200 px-5 py-2 text-sm font-bold text-blue-950 hover:bg-zinc-50 transition-colors">
                Download All HQ Images
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Large Featured Image */}
              <div className="md:col-span-2 md:row-span-2 overflow-hidden rounded-2xl group relative">
                <img
                  src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80"
                  alt="Exterior"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
              </div>
              {/* Smaller Grid Images */}
              <div className="overflow-hidden rounded-2xl h-64 group relative">
                <img
                  src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=500&q=80"
                  alt="Kitchen"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="overflow-hidden rounded-2xl h-64 group relative">
                <img
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80"
                  alt="Pool"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="overflow-hidden rounded-2xl h-64 group relative">
                <img
                  src="https://images.unsplash.com/photo-1600607687644-c7171bb3e29b?auto=format&fit=crop&w=500&q=80"
                  alt="Dining"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="overflow-hidden rounded-2xl h-64 group relative">
                <img
                  src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=500&q=80"
                  alt="Bathroom"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- NEW SECTION: DETAILED PROPERTY SPECS --- */}
        <section className="bg-zinc-50 py-20 border-y border-zinc-200">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Technical Specs Table */}
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold text-blue-950 mb-8">Asset Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  {[
                    { label: 'Property Type', value: 'Luxury Condominium' },
                    { label: 'Year Built', value: '2023' },
                    { label: 'Lot Size', value: 'N/A (High-Rise)' },
                    { label: 'Cooling', value: 'Central, Zoned' },
                    { label: 'Heating', value: 'Electric' },
                    { label: 'Parking', value: '2 Assigned Spaces' },
                    { label: 'HOA Fees', value: '$1,250 / mo' },
                    { label: 'Tax ID', value: '30-4231-042-0010' },
                  ].map((spec, i) => (
                    <div key={i} className="flex justify-between py-3 border-b border-zinc-200">
                      <span className="text-zinc-500 font-medium">{spec.label}</span>
                      <span className="text-blue-950 font-bold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Asset Management Note */}
              <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
                <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                  <FaShieldAlt size={24} />
                </div>
                <h4 className="text-xl font-bold text-blue-950 mb-4">Management Note</h4>
                <p className="text-sm text-zinc-500 leading-relaxed mb-6">
                  This asset is under **Premium Management**. All exterior maintenance, landscaping,
                  and pool sanitation are handled by our approved Florida vendors. Digital logs for
                  all services are available in the landlord portal.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-black text-blue-600 hover:gap-3 transition-all"
                >
                  Request Compliance Documents <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* STICKY PMS QUICK-ACTION BAR */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-blue-950 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-8 backdrop-blur-md border border-white/10">
        <button className="flex items-center gap-2 text-xs font-bold hover:text-yellow-400 transition-colors">
          <FaFileInvoiceDollar /> Collect Rent
        </button>
        <div className="h-4 w-[1px] bg-white/20" />
        <button className="flex items-center gap-2 text-xs font-bold hover:text-yellow-400 transition-colors">
          <FaTools /> New Request
        </button>
        <div className="h-4 w-[1px] bg-white/20" />
        <button className="flex items-center gap-2 text-xs font-bold hover:text-yellow-400 transition-colors">
          <FaChartPie /> Report
        </button>
      </div>

      <Footer />
    </div>
  );
}

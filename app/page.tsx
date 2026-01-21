'use client';

import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans text-zinc-900">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white py-24 border-b border-zinc-200">
          <div className="container mx-auto max-w-6xl px-6 text-center">
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-zinc-900 md:text-6xl">
              Property Management <br />
              <span className="text-zinc-500 text-4xl md:text-5xl">Made Simple.</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-zinc-600">
              A secure, all-in-one platform to manage properties, tenants, payments, and maintenance
              requests for owners and vendors.
            </p>

            <div className="flex justify-center gap-4">
              <Link
                href="/signup"
                className="rounded-full bg-zinc-900 px-8 py-3 font-medium text-white transition-all hover:bg-zinc-700"
              >
                Get Started
              </Link>
              <Link
                href="/properties"
                className="rounded-full border border-zinc-300 bg-white px-8 py-3 font-medium text-zinc-900 transition-all hover:bg-zinc-50"
              >
                Browse Listings
              </Link>
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="container mx-auto max-w-6xl px-6 py-20">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-zinc-900">Professional Features</h2>
            <div className="mt-2 h-1 w-20 bg-zinc-900 mx-auto"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: 'Property Management', desc: 'Real-time tracking of assets and inventory.' },
              {
                title: 'Tenant Management',
                desc: 'Secure database for customer and tenant profiles.',
              },
              { title: 'Rental Tracking', desc: 'Monitor lease agreements and expiration dates.' },
              {
                title: 'Payments & Invoicing',
                desc: 'Automated billing and secure payment history.',
              },
              {
                title: 'Maintenance Portal',
                desc: 'Vendors can track and update service requests.',
              },
              { title: 'Analytics', desc: 'Detailed financial and occupancy reporting.' },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-zinc-200 bg-white p-8 transition-all hover:bg-zinc-50"
              >
                <h3 className="mb-3 text-lg font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Role-Based Access Section */}
        <section className="bg-zinc-100 py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <h2 className="mb-12 text-center text-3xl font-bold text-zinc-900">
              One System, Four Roles
            </h2>
            <div className="grid gap-6 md:grid-cols-4">
              {['Admin', 'Manager', 'Vendor', 'Tenant'].map((role) => (
                <div
                  key={role}
                  className="rounded-lg border border-zinc-200 bg-white p-6 text-center"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200 text-zinc-900 font-bold">
                    {role[0]}
                  </div>
                  <h3 className="font-semibold text-zinc-900">{role}</h3>
                  <p className="mt-2 text-xs text-zinc-600">Custom dashboard for {role} tools.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="container mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold tracking-tight text-zinc-900">
                Why Choose Our PMS?
              </h2>
              <p className="mt-4 text-zinc-600">
                Our system is built on the latest technology to ensure your data is secure and your
                workflow is optimized.
              </p>
            </div>
            <div className="grid w-full grid-cols-2 gap-4 md:w-1/2">
              {['Simple UI', 'Secure', 'Centralized', 'Scalable'].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white p-4"
                >
                  <div className="h-2 w-2 rounded-full bg-zinc-900"></div>
                  <span className="text-sm font-medium text-zinc-900">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

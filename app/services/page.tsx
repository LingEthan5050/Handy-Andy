'use client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useReveal from '@/components/useReveal';

const services = [
  {
    title: 'Kitchen & Bath Remodeling',
    body: 'From cabinet installation to full renovations — we modernize your space with high-end finishes and practical design. Whether it\'s a powder room refresh or a complete kitchen overhaul, we work around your life and budget.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=85',
    tags: ['Cabinets', 'Tile', 'Countertops', 'Fixtures'],
  },
  {
    title: 'General Handyman Services',
    body: 'No job is too small. We handle everything from drywall repair to door replacements, fixture swaps, shelving, window repairs, and general home maintenance. If something needs fixing, we can handle it.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&q=85',
    tags: ['Drywall', 'Doors & Windows', 'Fixtures', 'Carpentry'],
  },
  {
    title: 'Exterior Repairs & Decks',
    body: 'Wood rot repair, pressure washing, siding, gutters, and custom deck builds. We keep your home\'s exterior performing and looking great through every Georgia season.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=85',
    tags: ['Decks', 'Siding', 'Gutters', 'Wood Rot'],
  },
  {
    title: 'Painting & Drywall',
    body: 'Interior and exterior painting, drywall patching, texturing, and finishing for a smooth, updated look. We prep properly so our paint jobs last.',
    image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=900&q=85',
    tags: ['Interior', 'Exterior', 'Patching', 'Texture'],
  },
  {
    title: 'Flooring Installation',
    body: 'Professional installation of hardwood, vinyl plank, tile, or laminate. We prep the subfloor, install with precision, and finish every transition and edge cleanly.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=85',
    tags: ['Hardwood', 'Luxury Vinyl', 'Tile', 'Laminate'],
  },
  {
    title: 'Real Estate Prep & Inspections',
    body: 'Fast, reliable repair work for realtors and homeowners prepping for sale or closing. We also assist with 203k renovation loans and foreclosure assessments.',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&q=85',
    tags: ['Pre-Sale Repairs', '203k Loans', 'Foreclosures', 'Inspections'],
  },
];

export default function ServicesPage() {
  useReveal();
  return (
    <div style={{ background: 'var(--cream)' }}>
      <Navbar />

      {/* Header */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '5rem 1.5rem 4rem' }}>
        <span className="pill reveal" style={{ marginBottom: '1.25rem', display: 'inline-block' }}>What we offer</span>
        <h1 className="serif reveal" data-delay="100" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 500, color: '#1c1917', lineHeight: 1.08, maxWidth: 700, margin: '0 0 1.25rem' }}>
          Every home improvement service, under one roof.
        </h1>
        <p className="reveal" data-delay="200" style={{ fontSize: 16, color: '#78716c', lineHeight: 1.75, maxWidth: 520 }}>
          From small repairs to complete renovations — HandyANDY is Metro Atlanta's one-stop solution for home improvement.
        </p>
      </section>

      {/* Services */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem 6rem' }}>
        {services.map((s, i) => (
          <div key={s.title} className="reveal" data-delay={0}
            style={{
              display: 'grid',
              gridTemplateColumns: i % 2 === 0 ? '1.1fr 0.9fr' : '0.9fr 1.1fr',
              gap: '3.5rem', alignItems: 'center',
              marginBottom: i < services.length - 1 ? '5rem' : 0,
            }}
            className={`reveal service-row-${i}`}>
            <style>{`@media(max-width:767px){.service-row-${i}{grid-template-columns:1fr!important;}}`}</style>

            {/* Image — swap order on odd rows */}
            <div className="zoom-img" style={{ borderRadius: 20, overflow: 'hidden', height: 320, order: i % 2 === 0 ? 0 : 1 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.image} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>

            {/* Text */}
            <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
              <span className="serif" style={{ fontSize: '1rem', color: '#c65b37', letterSpacing: '.04em' }}>0{i+1}</span>
              <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 600, color: '#1c1917', margin: '.4rem 0 1rem', lineHeight: 1.25 }}>
                {s.title}
              </h2>
              <p style={{ fontSize: 14.5, color: '#78716c', lineHeight: 1.8, marginBottom: '1.5rem' }}>{s.body}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {s.tags.map(t => (
                  <span key={t} className="pill" style={{ fontSize: 11 }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section style={{ background: '#1c1917', position: 'relative', overflow: 'hidden' }}>
        <div style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 50" style={{ width: '100%', display: 'block' }} preserveAspectRatio="none">
            <path d="M0,0 L1440,50 L0,50 Z" fill="#f7f3ee" />
          </svg>
        </div>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '4rem 1.5rem 5rem', textAlign: 'center' }}>
          <h2 className="serif" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 500, color: '#fafaf9', marginBottom: '1rem' }}>
            Don't see what you're looking for?
          </h2>
          <p style={{ color: '#a8a29e', marginBottom: '2rem', fontSize: 15 }}>
            Give us a call — if it involves your home, we can probably help.
          </p>
          <Link href="/contact" style={{
            background: '#c65b37', color: '#fff', borderRadius: 10,
            padding: '14px 36px', fontSize: 13, fontWeight: 600,
            letterSpacing: '.09em', textTransform: 'uppercase', textDecoration: 'none',
            boxShadow: '0 4px 24px rgba(198,91,55,.35)',
          }}>Get an Estimate</Link>
        </div>
        <div style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 50" style={{ width: '100%', display: 'block' }} preserveAspectRatio="none">
            <path d="M0,50 L1440,0 L1440,50 Z" fill="#f7f3ee" />
          </svg>
        </div>
      </section>

      <Footer />
    </div>
  );
}

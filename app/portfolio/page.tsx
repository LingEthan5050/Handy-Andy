'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useReveal from '@/components/useReveal';

const projects = [
  { title:'Modern Kitchen Remodel',      tag:'Kitchen',  img:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=85', desc:'Custom cabinets, quartz countertops, and a full layout redesign in this Marietta home.' },
  { title:'Spa-Style Bathroom',          tag:'Bathroom', img:'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=85', desc:'Walk-in tile shower, frameless glass door, and a floating vanity.' },
  { title:'Basement Transformation',     tag:'Basement', img:'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=85', desc:'Unfinished basement converted into a comfortable living space with LVP flooring.' },
  { title:'Custom Cedar Deck',           tag:'Outdoor',  img:'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=85', desc:'Pressure-treated deck with composite railing and integrated lighting.' },
  { title:'Exterior Repaint & Repair',   tag:'Exterior', img:'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=85', desc:'Full exterior repaint with wood rot repair and new trim caulking.' },
  { title:'Engineered Hardwood Install', tag:'Flooring', img:'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=85', desc:'1,200 sq ft of engineered hardwood throughout the main level and stairs.' },
  { title:'Kitchen Backsplash & Tile',   tag:'Kitchen',  img:'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=85', desc:'Subway tile backsplash, regrouted floors, and new under-cabinet lighting.' },
  { title:'Deck Restoration',            tag:'Outdoor',  img:'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=85', desc:'Full sanding, wood rot repair, and stain refresh on an aging backyard deck.' },
  { title:'Guest Bath Refresh',          tag:'Bathroom', img:'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=85', desc:'New vanity, mirror, tile surround, and fixtures throughout.' },
];

const tabs = ['All', 'Kitchen', 'Bathroom', 'Basement', 'Outdoor', 'Exterior', 'Flooring'];

export default function PortfolioPage() {
  const [active, setActive] = useState('All');
  useReveal();

  const filtered = active === 'All' ? projects : projects.filter(p => p.tag === active);

  return (
    <div style={{ background: 'var(--cream)' }}>
      <Navbar />

      {/* Header */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '5rem 1.5rem 3.5rem' }}>
        <span className="pill reveal" style={{ marginBottom: '1.25rem', display: 'inline-block' }}>Our work</span>
        <h1 className="serif reveal" data-delay="100" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 500, color: '#1c1917', lineHeight: 1.08, maxWidth: 700, margin: '0 0 1.25rem' }}>
          Projects we're proud of.
        </h1>
        <p className="reveal" data-delay="200" style={{ fontSize: 16, color: '#78716c', lineHeight: 1.75, maxWidth: 500 }}>
          A look at some of the renovation and repair projects we've completed across Metro Atlanta.
        </p>
      </section>

      {/* Filter tabs */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem 2.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setActive(t)} style={{
              padding: '8px 20px', borderRadius: 999, fontSize: 13, fontWeight: 500,
              cursor: 'pointer', transition: 'all .2s', border: 'none',
              background: active === t ? '#1c1917' : 'white',
              color: active === t ? '#fafaf9' : '#78716c',
              boxShadow: active === t ? '0 2px 12px rgba(28,25,23,.18)' : '0 1px 4px rgba(28,25,23,.08)',
            }}>{t}</button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem 6rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {filtered.map((p, i) => (
            <div key={p.title + i} className="card reveal" data-delay={i % 3 * 80}
              style={{ overflow: 'hidden', cursor: 'default' }}>
              <div className="zoom-img" style={{ height: 240, overflow: 'hidden', position: 'relative' }}>
                <Image src={p.img} alt={p.title} fill style={{ objectFit: 'cover' }} sizes="400px" />
                <span className="pill" style={{ position: 'absolute', top: 14, left: 14, fontSize: 11, zIndex: 1 }}>{p.tag}</span>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 className="serif" style={{ fontSize: 20, fontWeight: 500, color: '#1c1917', margin: '0 0 8px' }}>{p.title}</h3>
                <p style={{ fontSize: 13.5, color: '#78716c', lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#1c1917', position: 'relative', overflow: 'hidden' }}>
        <div style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 50" style={{ width: '100%', display: 'block' }} preserveAspectRatio="none">
            <path d="M0,0 L1440,50 L0,50 Z" fill="#f7f3ee" />
          </svg>
        </div>
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '4rem 1.5rem 5rem', textAlign: 'center' }}>
          <h2 className="serif" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 500, color: '#fafaf9', marginBottom: '1rem' }}>
            Ready for your own project?
          </h2>
          <p style={{ color: '#a8a29e', marginBottom: '2rem', fontSize: 15 }}>
            Get in touch for a free, no-obligation estimate.
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

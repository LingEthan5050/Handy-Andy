'use client';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useReveal from '@/components/useReveal';

const HERO_IMG    = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=85';
const FOUNDER_IMG = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&q=85';

const services = [
  ['Kitchen & Bath',       'Complete remodels with high-end finishes and custom design.'],
  ['Handyman Services',    'No job too small — repairs, fixtures, drywall, and more.'],
  ['Exterior & Decks',     'Siding, gutters, wood rot repair, and custom deck builds.'],
  ['Painting & Drywall',   'Interior and exterior painting. Clean, lasting results.'],
  ['Flooring',             'Hardwood, vinyl, tile, and laminate professionally installed.'],
  ['Real Estate Prep',     'Inspection repairs and pre-sale work for realtors and sellers.'],
];

const stats = [
  { n: '29+',    l: 'Years in business'  },
  { n: '5,000+', l: 'Projects completed' },
  { n: '4th Gen',l: 'Contractor family'  },
  { n: '13 yr',  l: 'Avg. team tenure'   },
];

export default function HomePage() {
  useReveal();

  return (
    <div style={{ background: 'var(--cream)' }}>

      {/* ══════════ HERO ══════════ */}
      <section style={{ position: 'relative', background: '#1c1917', overflow: 'hidden', minHeight: '92vh', display: 'flex', alignItems: 'center' }}>
        {/* Background image — right half */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src={HERO_IMG} alt="HandyANDY at work" fill style={{ objectFit: 'cover', objectPosition: 'center' }} priority />
          {/* Dark overlay, heavy on left */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(28,25,23,0.97) 0%, rgba(28,25,23,0.88) 45%, rgba(28,25,23,0.45) 100%)' }} />
        </div>

        <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '5rem 1.5rem', width: '100%' }}>
          <div style={{ maxWidth: 640 }}>
            <div className="pill reveal" data-delay="0" style={{ marginBottom: '1.5rem' }}>
              Metro Atlanta · Est. 1995
            </div>

            <h1 className="serif reveal" data-delay="100" style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', lineHeight: 1.04, color: '#fafaf9', margin: '0 0 1.5rem', fontWeight: 500 }}>
              Craftsmanship<br />
              <em style={{ color: '#c65b37' }}>you can count on.</em>
            </h1>

            <p className="reveal" data-delay="200" style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#a8a29e', lineHeight: 1.75, maxWidth: 460, marginBottom: '2.5rem' }}>
              From small repairs to full renovations — honest work, fair pricing, and results that stand the test of time.
            </p>

            <div className="reveal" data-delay="300" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link href="/contact" style={{
                background: '#c65b37', color: '#fff', borderRadius: 10,
                padding: '14px 32px', fontSize: 13, fontWeight: 600,
                letterSpacing: '.09em', textTransform: 'uppercase', textDecoration: 'none',
                boxShadow: '0 4px 24px rgba(198,91,55,.4)',
                transition: 'background .2s, transform .2s',
              }}>Get a Free Estimate</Link>
              <Link href="/portfolio" style={{
                border: '1.5px solid rgba(255,255,255,.25)', color: '#e7e5e4',
                borderRadius: 10, padding: '14px 32px', fontSize: 13, fontWeight: 500,
                letterSpacing: '.07em', textDecoration: 'none',
                transition: 'border-color .2s, color .2s',
              }}>View Our Work →</Link>
            </div>
          </div>
        </div>

        {/* Smooth diagonal bottom edge */}
        <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 72" style={{ width: '100%', display: 'block' }} preserveAspectRatio="none">
            <path d="M0,72 L1440,0 L1440,72 Z" fill="#f7f3ee" />
          </svg>
        </div>
      </section>

      {/* ══════════ FLOATING STATS ══════════ */}
      <section style={{ maxWidth: 1200, margin: '-2rem auto 0', padding: '0 1.5rem 5rem', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {stats.map((s, i) => (
            <div key={s.l} className="card reveal" data-delay={i * 80}
              style={{ padding: '1.75rem 2rem', textAlign: 'center' }}>
              <div className="serif" style={{ fontSize: '2.6rem', fontWeight: 500, color: '#c65b37', lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 13, color: '#78716c', marginTop: 6, fontWeight: 500 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ SERVICES ══════════ */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem 7rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem', alignItems: 'start' }} className="services-grid">
          {/* Sticky label column */}
          <div className="reveal" style={{ position: 'sticky', top: 100 }}>
            <span className="pill">What we do</span>
            <h2 className="serif" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 500, lineHeight: 1.15, margin: '1rem 0 1.25rem', color: '#1c1917' }}>
              Every corner<br />of your home.
            </h2>
            <p style={{ fontSize: 14, color: '#78716c', lineHeight: 1.75, marginBottom: '2rem' }}>
              From urgent fixes to complete transformations — we bring the same care and craft to every job.
            </p>
            <Link href="/services" style={{
              color: '#c65b37', fontSize: 13, fontWeight: 600,
              letterSpacing: '.08em', textTransform: 'uppercase',
              textDecoration: 'none', borderBottom: '1.5px solid #c65b37', paddingBottom: 2,
            }}>All Services →</Link>
          </div>

          {/* Service list */}
          <div>
            {services.map(([title, desc], i) => (
              <div key={title} className="reveal" data-delay={i * 60}
                style={{
                  display: 'flex', gap: '1.5rem', alignItems: 'flex-start',
                  padding: '1.75rem 0',
                  borderBottom: i < services.length - 1 ? '1px solid rgba(28,25,23,.08)' : 'none',
                }}>
                <span className="serif" style={{ fontSize: '1.4rem', color: '#d4b5a3', fontWeight: 400, minWidth: 36, paddingTop: 2 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: '#1c1917', marginBottom: 4 }}>{title}</h3>
                  <p style={{ fontSize: 14, color: '#78716c', lineHeight: 1.65, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:767px){.services-grid{grid-template-columns:1fr!important;}.services-grid>div:first-child{position:static!important;}}`}</style>
      </section>

      {/* ══════════ ABOUT TEASER ══════════ */}
      <section style={{ background: '#1c1917', position: 'relative', overflow: 'hidden' }}>
        {/* Top diagonal */}
        <div style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" style={{ width: '100%', display: 'block' }} preserveAspectRatio="none">
            <path d="M0,0 L1440,60 L0,60 Z" fill="#f7f3ee" />
          </svg>
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 1.5rem 5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="about-grid">
          {/* Image */}
          <div className="zoom-img reveal" style={{ borderRadius: 20, overflow: 'hidden', height: 440, position: 'relative' }}>
            <Image src={FOUNDER_IMG} alt="Andy Luick, Founder" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
          </div>

          {/* Text */}
          <div>
            <span className="pill reveal" style={{ background: 'rgba(198,91,55,.18)', color: '#e9927a', marginBottom: '1.5rem', display: 'inline-block' }}>
              Our story
            </span>
            <h2 className="serif reveal" data-delay="100" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 500, color: '#fafaf9', lineHeight: 1.15, margin: '0 0 1.25rem' }}>
              A family business<br />built on integrity.
            </h2>
            <p className="reveal" data-delay="200" style={{ fontSize: 14, color: '#a8a29e', lineHeight: 1.8, marginBottom: 14 }}>
              HandyANDY was founded in 1995 by Andy Luick, a 4th-generation contractor and real estate investor. With over 29 years of experience, Andy brings a wealth of knowledge and integrity to every job.
            </p>
            <p className="reveal" data-delay="300" style={{ fontSize: 14, color: '#a8a29e', lineHeight: 1.8, marginBottom: '2rem' }}>
              Our team has been together for years — some for over 13. When you hire HandyANDY, you get a consistent, experienced crew that genuinely cares about your home.
            </p>
            <Link href="/about" style={{
              color: '#c65b37', fontSize: 13, fontWeight: 600,
              letterSpacing: '.08em', textTransform: 'uppercase',
              textDecoration: 'none', borderBottom: '1.5px solid #c65b37', paddingBottom: 2,
            }} className="reveal">Our Story →</Link>
          </div>
        </div>

        {/* Bottom diagonal */}
        <div style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" style={{ width: '100%', display: 'block' }} preserveAspectRatio="none">
            <path d="M0,60 L1440,0 L1440,60 Z" fill="#f7f3ee" />
          </svg>
        </div>
        <style>{`@media(max-width:767px){.about-grid{grid-template-columns:1fr!important;}.about-grid>div:first-child{height:280px!important;}}`}</style>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '7rem 1.5rem', textAlign: 'center' }}>
        <span className="pill reveal" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>Ready to start?</span>
        <h2 className="serif reveal" data-delay="100" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 500, color: '#1c1917', lineHeight: 1.1, margin: '0 0 1.25rem' }}>
          Let's work on your<br />home together.
        </h2>
        <p className="reveal" data-delay="200" style={{ fontSize: 15, color: '#78716c', lineHeight: 1.75, marginBottom: '2.5rem' }}>
          Get in touch for a free, no-obligation estimate. We'll respond within one business day.
        </p>
        <div className="reveal" data-delay="300" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/contact" style={{
            background: '#c65b37', color: '#fff', borderRadius: 10,
            padding: '14px 36px', fontSize: 13, fontWeight: 600,
            letterSpacing: '.09em', textTransform: 'uppercase', textDecoration: 'none',
            boxShadow: '0 4px 24px rgba(198,91,55,.3)',
          }}>Contact Us Today</Link>
          <a href="tel:7709122829" style={{
            border: '1.5px solid rgba(28,25,23,.2)', color: '#1c1917',
            borderRadius: 10, padding: '14px 36px', fontSize: 13, fontWeight: 500,
            textDecoration: 'none',
          }}>Call 770.912.2829</a>
        </div>
      </section>

    </div>
  );
}

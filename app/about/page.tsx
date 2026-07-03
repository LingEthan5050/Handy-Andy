'use client';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useReveal from '@/components/useReveal';

const FOUNDER_IMG = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=85';
const TEAM_IMG    = 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=85';
const WORK_IMG    = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=85';

const values = [
  { n: '01', t: 'Honest Pricing',      d: 'Clear, detailed quotes with no hidden fees or surprise charges — ever.' },
  { n: '02', t: 'Quality Materials',   d: 'We use durable, high-grade materials on every job. No shortcuts.' },
  { n: '03', t: 'Long-Term Warranties',d: 'We stand behind our work with warranties that protect your investment.' },
  { n: '04', t: 'Reliable Scheduling', d: 'We show up when we say we will, and communicate every step of the way.' },
];

export default function AboutPage() {
  useReveal();
  return (
    <div style={{ background: 'var(--cream)' }}>
      <Navbar />

      {/* Header */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '5rem 1.5rem 5rem' }}>
        <span className="pill reveal" style={{ marginBottom: '1.25rem', display: 'inline-block' }}>Our story</span>
        <h1 className="serif reveal" data-delay="100" style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 500, lineHeight: 1.05, color: '#1c1917', margin: '0 0 1.25rem', maxWidth: 760 }}>
          A family business built on integrity.
        </h1>
        <p className="reveal" data-delay="200" style={{ fontSize: 16, color: '#78716c', lineHeight: 1.75, maxWidth: 520 }}>
          Honest, reliable, and value-priced — serving Atlanta homes since 1995.
        </p>
      </section>

      {/* Founder */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem 6rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="two-col">
        <div className="zoom-img reveal" style={{ borderRadius: 20, overflow: 'hidden', height: 460, position: 'relative' }}>
          <Image src={FOUNDER_IMG} alt="Andy Luick" fill style={{ objectFit: 'cover' }} sizes="50vw" />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(28,25,23,.8), transparent)', padding: '2rem 1.75rem 1.75rem' }}>
            <p className="serif" style={{ color: '#fafaf9', fontSize: 20, fontStyle: 'italic', margin: 0 }}>Andy Luick, Founder</p>
            <p style={{ color: '#a8a29e', fontSize: 13, margin: '4px 0 0' }}>4th-Generation Contractor</p>
          </div>
        </div>
        <div>
          <h2 className="serif reveal" data-delay="100" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 500, color: '#1c1917', lineHeight: 1.2, margin: '0 0 1.25rem' }}>
            Founded by Andy Luick
          </h2>
          <p className="reveal" data-delay="200" style={{ fontSize: 14.5, color: '#78716c', lineHeight: 1.85, marginBottom: '1rem' }}>
            HandyANDY was founded in 1995 by Andy Luick, a 4th-generation contractor and real estate investor. With over 29 years of full-time handyman experience, Andy brings a wealth of knowledge and integrity to every job.
          </p>
          <p className="reveal" data-delay="300" style={{ fontSize: 14.5, color: '#78716c', lineHeight: 1.85 }}>
            Our roots run deep in craftsmanship — it's not just what we do, it's who we are. Every project reflects the same dedication to quality that Andy's family has built over generations.
          </p>
        </div>
        <style>{`@media(max-width:767px){.two-col{grid-template-columns:1fr!important;}.two-col>div:first-child{height:280px!important;}}`}</style>
      </section>

      {/* Quote break */}
      <section style={{ background: '#1c1917', position: 'relative', overflow: 'hidden' }}>
        <div style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 50" style={{ width: '100%', display: 'block' }} preserveAspectRatio="none">
            <path d="M0,0 L1440,50 L0,50 Z" fill="#f7f3ee" />
          </svg>
        </div>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '4.5rem 1.5rem', textAlign: 'center' }}>
          <div className="serif reveal" style={{ fontSize: 'clamp(1.4rem, 3vw, 2.4rem)', fontStyle: 'italic', color: '#e7e5e4', lineHeight: 1.55, fontWeight: 400 }}>
            "To provide the highest level of home repair services across Metro Atlanta — with quality materials, long-term warranties, and fair, transparent pricing every time."
          </div>
          <div className="reveal" data-delay="100" style={{ marginTop: '1.5rem', fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#57534e', fontWeight: 600 }}>
            Our Mission
          </div>
        </div>
        <div style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 50" style={{ width: '100%', display: 'block' }} preserveAspectRatio="none">
            <path d="M0,50 L1440,0 L1440,50 Z" fill="#f7f3ee" />
          </svg>
        </div>
      </section>

      {/* Team */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '5rem 1.5rem 6rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="two-col-rev">
        <div>
          <h2 className="serif reveal" data-delay="100" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 500, color: '#1c1917', lineHeight: 1.2, margin: '0 0 1.25rem' }}>
            Family-owned &amp;<br />operated.
          </h2>
          <p className="reveal" data-delay="200" style={{ fontSize: 14.5, color: '#78716c', lineHeight: 1.85, marginBottom: '1rem' }}>
            We're more than coworkers — we're family. Our team has been together for years, with some members staying for over 13 years. Each person brings unique skills, pride, and heart to every project.
          </p>
          <p className="reveal" data-delay="300" style={{ fontSize: 14.5, color: '#78716c', lineHeight: 1.85 }}>
            When you hire HandyANDY, you're not getting a rotating crew of strangers — you get a consistent, experienced team that genuinely cares about your home.
          </p>
        </div>
        <div className="zoom-img reveal" style={{ borderRadius: 20, overflow: 'hidden', height: 400, position: 'relative' }}>
          <Image src={TEAM_IMG} alt="The HandyANDY Team" fill style={{ objectFit: 'cover' }} sizes="50vw" />
        </div>
        <style>{`@media(max-width:767px){.two-col-rev{grid-template-columns:1fr!important;}.two-col-rev>div:last-child{height:260px!important;}}`}</style>
      </section>

      {/* Values */}
      <section style={{ background: '#ede8e1', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="pill reveal" style={{ marginBottom: '1rem', display: 'inline-block' }}>How we work</span>
            <h2 className="serif reveal" data-delay="100" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 500, color: '#1c1917', margin: 0 }}>
              What you can expect.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {values.map((v, i) => (
              <div key={v.t} className="card reveal" data-delay={i * 80} style={{ padding: '2rem 1.75rem' }}>
                <div className="serif" style={{ fontSize: 36, color: '#ddd0c8', fontWeight: 400, marginBottom: 12 }}>{v.n}</div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1c1917', marginBottom: 8 }}>{v.t}</h3>
                <p style={{ fontSize: 13.5, color: '#78716c', lineHeight: 1.7, margin: 0 }}>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 680, margin: '0 auto', padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h2 className="serif reveal" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 500, color: '#1c1917', marginBottom: '1rem' }}>
          Let's work together.
        </h2>
        <p className="reveal" data-delay="100" style={{ color: '#78716c', marginBottom: '2rem', fontSize: 15 }}>
          Contact us today for a free estimate on your next project.
        </p>
        <Link href="/contact" className="reveal" data-delay="200" style={{
          background: '#c65b37', color: '#fff', borderRadius: 10,
          padding: '14px 40px', fontSize: 13, fontWeight: 600,
          letterSpacing: '.09em', textTransform: 'uppercase', textDecoration: 'none',
          boxShadow: '0 4px 24px rgba(198,91,55,.3)', display: 'inline-block',
        }}>Get an Estimate</Link>
      </section>

      <Footer />
    </div>
  );
}

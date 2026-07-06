'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Home',      href: '/' },
  { name: 'About',     href: '/about' },
  { name: 'Services',  href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Contact',   href: '/contact' },
];

export default function Navbar() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const img = new Image();
    img.src = '/handyandylogo.png';
    img.onerror = () => setLogoError(true);
  }, []);

  return (
    <nav
      style={{
        position: 'sticky', top: 0, zIndex: 50,
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        backgroundColor: scrolled ? 'rgba(247,243,238,.92)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(28,25,23,.08)' : '1px solid transparent',
        transition: 'background-color .3s, border-color .3s, backdrop-filter .3s',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          {!logoError && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/handyandylogo.png" alt="HandyANDY" style={{ height: 40, width: 'auto' }}
                onError={() => setLogoError(true)} />
            </>
          )}
          {logoError && (
            <div>
              <div style={{ fontSize: 10, letterSpacing: '0.18em', color: '#a8a29e', textTransform: 'uppercase', fontWeight: 500, lineHeight: 1 }}>Since 1995</div>
              <div style={{ fontSize: 30, fontWeight:700, color: '#1c1917', lineHeight: 1.3 }}>
                Handy<span style={{ color: '#c65b37' }}>ANDY</span>
              </div>
            </div>
          )}
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="hidden-mobile">
          {links.map(l => (
            <Link key={l.name} href={l.href} style={{
              textDecoration: 'none',
              fontSize: 13.5, fontWeight: 500, letterSpacing: '.02em',
              color: pathname === l.href ? '#c65b37' : '#44403c',
              borderBottom: pathname === l.href ? '1.5px solid #c65b37' : '1.5px solid transparent',
              paddingBottom: 2,
              transition: 'color .2s, border-color .2s',
            }}
              onMouseEnter={e => { if (pathname !== l.href) { (e.target as HTMLElement).style.color='#c65b37'; } }}
              onMouseLeave={e => { if (pathname !== l.href) { (e.target as HTMLElement).style.color='#44403c'; } }}
            >{l.name}</Link>
          ))}
          <a href="tel:7709122829" style={{ fontSize: 13.5, fontWeight: 500, color: '#44403c', textDecoration: 'none', marginLeft: 8 }}>770.912.2829</a>
          <Link href="/contact" style={{
            background: '#c65b37', color: '#fff', borderRadius: 8,
            padding: '9px 22px', fontSize: 12.5, fontWeight: 600,
            letterSpacing: '.07em', textTransform: 'uppercase', textDecoration: 'none',
            boxShadow: '0 2px 12px rgba(198,91,55,.3)',
            transition: 'background .2s, box-shadow .2s',
          }}
            onMouseEnter={e => { (e.target as HTMLElement).style.background='#a84c2e'; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.background='#c65b37'; }}
          >Get an Estimate</Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(v => !v)} className="show-mobile"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, display: 'flex', flexDirection: 'column', gap: 5 }}>
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block', height: 1.5, background: '#1c1917', borderRadius: 2,
              width: i === 1 ? 18 : 24,
              transform: open ? (i===0?'rotate(45deg) translate(4.5px,4.5px)': i===1?'scaleX(0)':'rotate(-45deg) translate(4.5px,-4.5px)') : 'none',
              opacity: open && i===1 ? 0 : 1,
              transition: 'transform .25s, opacity .25s, width .25s',
            }} />
          ))}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{ background: 'rgba(247,243,238,.97)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(28,25,23,.08)', padding: '1.25rem 1.5rem 1.5rem' }}>
          {links.map(l => (
            <Link key={l.name} href={l.href} style={{
              display: 'block', padding: '10px 0', fontSize: 15, fontWeight: 500,
              color: pathname === l.href ? '#c65b37' : '#1c1917',
              borderBottom: '1px solid rgba(28,25,23,.06)', textDecoration: 'none',
            }}>{l.name}</Link>
          ))}
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a href="tel:7709122829" style={{ fontSize: 14, color: '#44403c', textDecoration: 'none' }}>📞 770.912.2829</a>
            <Link href="/contact" style={{
              background: '#c65b37', color: '#fff', borderRadius: 8, padding: '11px 0',
              textAlign: 'center', fontSize: 13, fontWeight: 600, letterSpacing: '.07em',
              textTransform: 'uppercase', textDecoration: 'none',
            }}>Get an Estimate</Link>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) { .hidden-mobile { display: flex !important; } .show-mobile { display: none !important; } }
        @media (max-width: 767px) { .hidden-mobile { display: none !important; } .show-mobile { display: flex !important; } }
      `}</style>
    </nav>
  );
}

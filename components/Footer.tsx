"use client";
import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: '#1c1917', color: '#a8a29e' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 1.5rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem' }}>

        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/handyandylogo.png" alt="HandyANDY" style={{ height: 44, filter: 'brightness(0) invert(1)', marginBottom: 16 }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontSize: 20, color: '#e7e5e4', marginBottom: 12, lineHeight: 1.5 }}>
            Craftsmanship you<br />can count on.
          </p>
          <p style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 260 }}>
            Family-owned home repair & renovation serving Metro Atlanta since 1995.
          </p>
        </div>

        <div>
          <p style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, color: '#57534e', marginBottom: 20 }}>Pages</p>
          {['/', '/about', '/services', '/portfolio', '/contact'].map((href, i) => {
            const names = ['Home', 'About', 'Services', 'Portfolio', 'Contact'];
            return (
              <Link key={href} href={href} style={{
                display: 'block', fontSize: 14, color: '#a8a29e', textDecoration: 'none',
                marginBottom: 10, transition: 'color .2s',
              }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color='#c65b37'; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color='#a8a29e'; }}
              >{names[i]}</Link>
            );
          })}
        </div>

        <div>
          <p style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, color: '#57534e', marginBottom: 20 }}>Contact</p>
          {[
            ['1225 Johnson Ferry Road', null],
            ['Marietta, GA 30068', null],
            ['770.912.2829', 'tel:7709122829'],
            ['handyandyhome@aol.com', 'mailto:handyandyhome@aol.com'],
          ].map(([text, href]) => (
            href
              ? <a key={text!} href={href} style={{ display: 'block', fontSize: 14, color: '#a8a29e', textDecoration: 'none', marginBottom: 10, transition: 'color .2s' }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color='#c65b37'; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color='#a8a29e'; }}
                >{text}</a>
              : <p key={text!} style={{ fontSize: 14, marginBottom: 10 }}>{text}</p>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', maxWidth: 1200, margin: '0 auto', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, fontSize: 12, color: '#57534e' }}>
        <span>© {year} HandyANDY Home Repair. All rights reserved.</span>
        <span>Metro Atlanta's Trusted Handyman Since 1995</span>
      </div>
    </footer>
  );
}

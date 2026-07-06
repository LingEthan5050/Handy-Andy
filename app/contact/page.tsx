'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useReveal from '@/components/useReveal';

type Status = 'idle' | 'loading' | 'success' | 'error';

const input = {
  width: '100%', border: '1px solid rgba(28,25,23,.15)',
  background: '#fff', padding: '12px 16px', borderRadius: 10,
  fontSize: 14, color: '#1c1917', outline: 'none',
  transition: 'border-color .2s',
  fontFamily: 'inherit',
};

export default function ContactPage() {
  const [form,   setForm]   = useState({ name:'', email:'', phone:'', message:'', inquiry:'General Inquiry' });
  const [status, setStatus] = useState<Status>('idle');
  useReveal();

  const set = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) setForm({ name:'', email:'', phone:'', message:'', inquiry:'General Inquiry' });
    } catch { setStatus('error'); }
  };

  return (
    <div style={{ background: 'var(--cream)' }}>
      <Navbar />

      {/* Header */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '5rem 1.5rem 4rem', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center' }} className="contact-header">
        <div>
          <span className="pill reveal" style={{ marginBottom: '1.25rem', display: 'inline-block' }}>Reach out</span>
          <h1 className="serif reveal" data-delay="100" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 500, color: '#1c1917', lineHeight: 1.08, maxWidth: 640, margin: '0 0 1.25rem' }}>
            Let's talk about your project.
          </h1>
          <p className="reveal" data-delay="200" style={{ fontSize: 16, color: '#78716c', lineHeight: 1.75, maxWidth: 500 }}>
            Drop us a line or give us a call. We're happy to help and will respond within one business day.
          </p>
        </div>

        <div className="reveal" data-delay="300" style={{ height: 400, borderRadius: 20, overflow: 'hidden', boxShadow: '0 8px 32px rgba(28,25,23,.08)', border: '1px solid rgba(28,25,23,.06)' }}>
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://maps.google.com/maps?q=1225%20Johnson%20Ferry%20Road%2C%20Marietta%2C%20GA%2030068&t=&z=12&ie=UTF8&iwloc=&output=embed`}
          ></iframe>
        </div>
        <style>{`
          @media(max-width:767px){
            .contact-header{grid-template-columns:1fr!important; gap: 3rem!important;}
          }
        `}</style>
      </section>

      {/* Main grid */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem 6rem', display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '4rem', alignItems: 'start' }} className="contact-grid">

        {/* Info */}
        <div>
          {/* Contact details */}
          <div className="card-sm reveal" style={{ padding: '2rem', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, color: '#a8a29e', marginBottom: '1.25rem' }}>Contact</h3>
            {[
              { icon:'📍', label:'Address', val:'1225 Johnson Ferry Road\nMarietta, GA 30068', href:null },
              { icon:'📞', label:'Phone',   val:'770.912.2829',             href:'tel:7709122829' },
              { icon:'✉️', label:'Email',   val:'handyandyhome@aol.com',    href:'mailto:handyandyhome@aol.com' },
            ].map(item => (
              <div key={item.label} style={{ display:'flex', gap:14, marginBottom:20 }}>
                <span style={{ fontSize:18, marginTop:2 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color:'#a8a29e', marginBottom:2 }}>{item.label}</div>
                  {item.href
                    ? <a href={item.href} style={{ fontSize:14, color:'#1c1917', textDecoration:'none' }}>{item.val}</a>
                    : item.val.split('\n').map(l => <p key={l} style={{ fontSize:14, color:'#44403c', margin:0 }}>{l}</p>)
                  }
                </div>
              </div>
            ))}
          </div>

          {/* Hours */}
          <div className="card-sm reveal" data-delay="100" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, color: '#a8a29e', marginBottom: '1.25rem' }}>Business Hours</h3>
            {[['Mon – Fri','7:00 AM – 6:00 PM'],['Saturday','8:00 AM – 4:00 PM'],['Sunday','Closed']].map(([d,h]) => (
              <div key={d} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid rgba(28,25,23,.06)', fontSize:14 }}>
                <span style={{ color:'#44403c' }}>{d}</span>
                <span style={{ fontWeight:500, color: h==='Closed'?'#a8a29e':'#1c1917' }}>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="card reveal" data-delay="100" style={{ padding: '2.5rem' }}>
          <h2 className="serif" style={{ fontSize: 28, fontWeight: 500, color: '#1c1917', marginBottom: '1.75rem' }}>Send a Message</h2>

          <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:20 }}>
            {/* Inquiry type */}
            <div>
              <label style={{ fontSize:12, fontWeight:600, letterSpacing:'.08em', textTransform:'uppercase', color:'#a8a29e', display:'block', marginBottom:8 }}>
                Reason for Inquiry
              </label>
              <select name="inquiry" value={form.inquiry} onChange={set} style={{ ...input, appearance:'none', cursor:'pointer' }}>
                {['General Inquiry','Getting an Estimate','Update on Current Renovation','Contractor Inquiry','Job Application','Billing Question'].map(o => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>

            {/* Name / Email / Phone */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16 }} className="form-three">
              {[
                { l:'Full Name',  n:'name',  t:'text',  req:true  },
                { l:'Email',      n:'email', t:'email', req:true  },
                { l:'Phone',      n:'phone', t:'tel',   req:false },
              ].map(f => (
                <div key={f.n}>
                  <label style={{ fontSize:12, fontWeight:600, letterSpacing:'.08em', textTransform:'uppercase', color:'#a8a29e', display:'block', marginBottom:8 }}>{f.l}</label>
                  <input type={f.t} name={f.n} value={(form as Record<string,string>)[f.n]} onChange={set} required={f.req} style={input}
                    onFocus={e => e.target.style.borderColor='#c65b37'}
                    onBlur={e  => e.target.style.borderColor='rgba(28,25,23,.15)'} />
                </div>
              ))}
            </div>

            {/* Message */}
            <div>
              <label style={{ fontSize:12, fontWeight:600, letterSpacing:'.08em', textTransform:'uppercase', color:'#a8a29e', display:'block', marginBottom:8 }}>Message</label>
              <textarea name="message" value={form.message} onChange={set} rows={6} required
                placeholder="Tell us about your project..."
                style={{ ...input, resize:'vertical' }}
                onFocus={e => e.target.style.borderColor='#c65b37'}
                onBlur={e  => e.target.style.borderColor='rgba(28,25,23,.15)'} />
            </div>

            <button type="submit" disabled={status==='loading'} style={{
              background: '#c65b37', color:'#fff', border:'none', borderRadius:10,
              padding:'14px 0', fontSize:13, fontWeight:600, letterSpacing:'.09em',
              textTransform:'uppercase', cursor: status==='loading'?'not-allowed':'pointer',
              opacity: status==='loading'?0.7:1, boxShadow:'0 4px 20px rgba(198,91,55,.3)',
              transition:'background .2s',
            }}>
              {status === 'loading' ? 'Sending…' : 'Send Message'}
            </button>

            {status === 'success' && (
              <div style={{ background:'#f0fdf4', border:'1px solid #bbf7d0', color:'#166534', borderRadius:10, padding:'12px 16px', fontSize:14 }}>
                ✅ Message sent! We'll be in touch within one business day.
              </div>
            )}
            {status === 'error' && (
              <div style={{ background:'#fef2f2', border:'1px solid #fecaca', color:'#991b1b', borderRadius:10, padding:'12px 16px', fontSize:14 }}>
                ❌ Something went wrong. Please call us at 770.912.2829.
              </div>
            )}
          </form>
        </div>

        <style>{`
          @media(max-width:767px){
            .contact-grid{grid-template-columns:1fr!important;}
            .form-three{grid-template-columns:1fr!important;}
          }
        `}</style>
      </section>

      <Footer />
    </div>
  );
}

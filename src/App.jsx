/**
 * ============================================================
 * LUMIÈRE — Photography & Film Studio Landing Page
 * ============================================================
 *
 * LOCAL IMAGES — ADD THESE FILES TO src/assets/ BEFORE DEPLOYING:
 *   src/assets/img1.jpg  — Golden Hour (Wedding/Portrait)
 *   src/assets/img2.jpg  — City Lights (Commercial)
 *   src/assets/img3.jpg  — Forest Mist (Documentary)
 *   src/assets/img4.jpg  — Ocean Dusk (Wedding)
 *   src/assets/img5.jpg  — Desert Wind (Commercial)
 *   src/assets/img6.jpg  — Monsoon (Documentary)
 *   src/assets/portrait.jpg — Moody about-section portrait
 *
 * QUICK SWAP — Edit the config objects below:
 *   YOUTUBE_LINKS  → change VIDEO_ID to your YouTube video IDs
 *   PORTFOLIO_IMAGES → swap src values, update title/category
 *   SERVICES → edit titles and descriptions
 * ============================================================
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';

// ---------------------------------------------------------------------------
// EDITABLE CONFIG — swap without touching JSX
// ---------------------------------------------------------------------------

const YOUTUBE_LINKS = [
  { id: 'dQw4w9WgXcQ', title: 'Wedding Reel 2024' },
  { id: 'ScMzIvxBSi4', title: 'Commercial Reel 2024' },
];

// When you add real images, import them and replace the placeholder src values:
// import img1 from './assets/img1.jpg';
// import img2 from './assets/img2.jpg';  ... etc.
// Then: { src: img1, title: 'Golden Hour', category: 'Wedding' }
const PORTFOLIO_IMAGES = [
  { src: null, title: 'Golden Hour', category: 'Wedding', aspect: 'tall' },
  { src: null, title: 'City Lights', category: 'Commercial', aspect: 'wide' },
  { src: null, title: 'Forest Mist', category: 'Documentary', aspect: 'square' },
  { src: null, title: 'Ocean Dusk', category: 'Wedding', aspect: 'tall' },
  { src: null, title: 'Desert Wind', category: 'Commercial', aspect: 'wide' },
  { src: null, title: 'Monsoon', category: 'Documentary', aspect: 'square' },
];

const SERVICES = [
  {
    icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 10 L5 30 L35 30 L35 10 Z"/>
      <circle cx="20" cy="20" r="6"/>
      <circle cx="20" cy="20" r="2"/>
      <path d="M28 12 L32 8"/>
      <path d="M28 12 L24 12 L24 16"/>
    </svg>`,
    title: 'Wedding Films',
    desc: 'Cinematic storytelling that captures every unrepeatable moment of your day.',
  },
  {
    icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="10" width="20" height="20" rx="2"/>
      <path d="M26 16 L34 12 L34 28 L26 24"/>
      <circle cx="16" cy="20" r="4"/>
    </svg>`,
    title: 'Commercial Photography',
    desc: 'Brand imagery engineered to stop the scroll and earn the click.',
  },
  {
    icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="20" r="14"/>
      <circle cx="20" cy="20" r="5"/>
      <path d="M20 6 L20 10"/>
      <path d="M20 30 L20 34"/>
      <path d="M6 20 L10 20"/>
      <path d="M30 20 L34 20"/>
      <path d="M10 10 L13 13"/>
      <path d="M27 27 L30 30"/>
      <path d="M30 10 L27 13"/>
      <path d="M13 27 L10 30"/>
    </svg>`,
    title: 'Documentary',
    desc: 'Long-form visual essays that give voice to stories the world needs to hear.',
  },
];

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Showreel', href: '#showreel' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

// ---------------------------------------------------------------------------
// PLACEHOLDER COLOURS — unique moodboard tones for each portfolio slot
// ---------------------------------------------------------------------------
const PLACEHOLDER_GRADIENTS = [
  'linear-gradient(135deg, #1a1008 0%, #3d2810 50%, #1a0e05 100%)',
  'linear-gradient(135deg, #08101a 0%, #102030 50%, #051018 100%)',
  'linear-gradient(135deg, #0a1a0e 0%, #152a1a 50%, #081408 100%)',
  'linear-gradient(135deg, #0e0818 0%, #1a1030 50%, #080a1e 100%)',
  'linear-gradient(135deg, #1a1208 0%, #352615 50%, #1a0e05 100%)',
  'linear-gradient(135deg, #081418 0%, #102030 50%, #061020 100%)',
];

// ---------------------------------------------------------------------------
// GLOBAL STYLES — injected once as a <style> tag
// ---------------------------------------------------------------------------
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Barlow+Condensed:wght@200;300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --gold: #c9a96e;
    --gold-bright: #e8c87a;
    --bg: #080808;
    --bg2: #0f0f0f;
    --cream: #f0e8d8;
    --cream-dim: #b8a898;
    --serif: 'Cormorant Garamond', Georgia, serif;
    --sans: 'Barlow Condensed', system-ui, sans-serif;
    --transition: 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--cream);
    font-family: var(--sans);
    font-weight: 300;
    letter-spacing: 0.04em;
    cursor: none;
    overflow-x: hidden;
  }

  /* ── Custom cursor ── */
  #cursor {
    position: fixed;
    width: 10px; height: 10px;
    border-radius: 50%;
    background: var(--gold);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: transform 0.08s linear, width 0.2s, height 0.2s, opacity 0.2s;
    mix-blend-mode: screen;
  }
  #cursor-ring {
    position: fixed;
    width: 36px; height: 36px;
    border-radius: 50%;
    border: 1px solid rgba(201,169,110,0.5);
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    transition: transform 0.18s cubic-bezier(0.25,0.46,0.45,0.94), width 0.3s, height 0.3s, opacity 0.2s;
  }
  body:has(a:hover) #cursor, body:has(button:hover) #cursor { width: 16px; height: 16px; }
  body:has(a:hover) #cursor-ring, body:has(button:hover) #cursor-ring { width: 54px; height: 54px; opacity: 0.4; }

  /* ── Film grain overlay ── */
  .grain {
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
    background-size: 200px 200px;
    opacity: 0.35;
    pointer-events: none;
    z-index: 2;
    animation: grain-drift 8s steps(1) infinite;
  }
  @keyframes grain-drift {
    0%   { background-position: 0 0; }
    10%  { background-position: -5% -10%; }
    20%  { background-position: -15% 5%; }
    30%  { background-position: 7% -25%; }
    40%  { background-position: -5% 25%; }
    50%  { background-position: -15% 10%; }
    60%  { background-position: 15% 0; }
    70%  { background-position: 0 15%; }
    80%  { background-position: 3% 35%; }
    90%  { background-position: -10% 10%; }
    100% { background-position: 0 0; }
  }

  /* ── Cinematic letterbox bars ── */
  .letterbox-top, .letterbox-bottom {
    position: absolute;
    left: 0; right: 0;
    height: clamp(40px, 7vh, 80px);
    background: #000;
    z-index: 3;
  }
  .letterbox-top { top: 0; }
  .letterbox-bottom { bottom: 0; }

  /* ── Scroll entrance animation ── */
  .reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── Hero text stagger ── */
  @keyframes hero-word-in {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .hero-word {
    display: inline-block;
    opacity: 0;
    animation: hero-word-in 0.9s cubic-bezier(0.16,1,0.3,1) forwards;
  }

  /* ── CTA border-draw ── */
  .cta-btn {
    position: relative;
    display: inline-block;
    padding: 14px 40px;
    font-family: var(--sans);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    background: transparent;
    border: none;
    cursor: none;
    overflow: hidden;
  }
  .cta-btn::before, .cta-btn::after,
  .cta-btn span::before, .cta-btn span::after {
    content: '';
    position: absolute;
    background: var(--gold);
    transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
  }
  /* top & bottom borders */
  .cta-btn::before { top: 0; left: 0; width: 100%; height: 1px; transform: scaleX(0); transform-origin: left; }
  .cta-btn::after  { bottom: 0; right: 0; width: 100%; height: 1px; transform: scaleX(0); transform-origin: right; }
  /* left & right borders */
  .cta-btn span::before { left: 0; top: 0; width: 1px; height: 100%; transform: scaleY(0); transform-origin: bottom; }
  .cta-btn span::after  { right: 0; bottom: 0; width: 1px; height: 100%; transform: scaleY(0); transform-origin: top; }
  .cta-btn:hover::before, .cta-btn:hover::after { transform: scaleX(1); transition-delay: 0s, 0.2s; }
  .cta-btn:hover span::before, .cta-btn:hover span::after { transform: scaleY(1); transition-delay: 0.2s; }

  /* ── Shimmer sweep ── */
  @keyframes shimmer-sweep {
    0%   { transform: translateX(-120%) skewX(-20deg); }
    100% { transform: translateX(220%) skewX(-20deg); }
  }
  .shimmer-btn {
    position: relative;
    overflow: hidden;
  }
  .shimmer-btn::after {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(201,169,110,0.25), transparent);
    transform: translateX(-120%) skewX(-20deg);
  }
  .shimmer-btn:hover::after {
    animation: shimmer-sweep 0.7s ease forwards;
  }

  /* ── Ken Burns ── */
  @keyframes ken-burns {
    from { transform: scale(1); }
    to   { transform: scale(1.08); }
  }
  .portfolio-card:hover .portfolio-img {
    animation: ken-burns 6s ease forwards;
  }

  /* ── Gold rule ── */
  .gold-rule {
    border: none;
    border-top: 1px solid var(--gold);
    opacity: 0.5;
    margin: 24px 0;
  }

  /* ── Lightbox ── */
  .lightbox-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.95);
    backdrop-filter: blur(12px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: lb-in 0.3s ease;
  }
  @keyframes lb-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* ── YouTube play button ── */
  .yt-play {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: none;
    background: rgba(0,0,0,0.3);
    transition: background 0.3s;
  }
  .yt-play:hover { background: rgba(0,0,0,0.1); }
  .yt-play-circle {
    width: 80px; height: 80px;
    border-radius: 50%;
    border: 2px solid var(--gold);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s, background 0.3s;
  }
  .yt-play:hover .yt-play-circle {
    transform: scale(1.1);
    background: rgba(201,169,110,0.15);
  }

  /* ── Form inputs ── */
  .form-field {
    position: relative;
    margin-bottom: 32px;
  }
  .form-field input,
  .form-field textarea,
  .form-field select {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(201,169,110,0.3);
    color: var(--cream);
    font-family: var(--sans);
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 0.08em;
    padding: 10px 0;
    outline: none;
    transition: border-color 0.3s;
    appearance: none;
  }
  .form-field select option { background: #111; color: var(--cream); }
  .form-field input:focus,
  .form-field textarea:focus,
  .form-field select:focus { border-color: var(--gold); }
  .form-field label {
    position: absolute;
    top: 10px; left: 0;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--cream-dim);
    transition: top 0.25s, font-size 0.25s, color 0.25s;
    pointer-events: none;
  }
  .form-field input:focus ~ label,
  .form-field input:not(:placeholder-shown) ~ label,
  .form-field textarea:focus ~ label,
  .form-field textarea:not(:placeholder-shown) ~ label,
  .form-field.has-value label {
    top: -16px;
    font-size: 9px;
    color: var(--gold);
  }
  .form-field textarea { resize: none; min-height: 90px; }

  /* ── Nav ── */
  nav a {
    text-decoration: none;
    color: var(--cream-dim);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    transition: color 0.3s;
    position: relative;
  }
  nav a::after {
    content: '';
    position: absolute;
    bottom: -3px; left: 0;
    width: 0; height: 1px;
    background: var(--gold);
    transition: width 0.3s;
  }
  nav a:hover { color: var(--gold); }
  nav a:hover::after { width: 100%; }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--gold); opacity: 0.5; }

  /* ── Section spacing ── */
  section { position: relative; }

  /* ── Mobile ── */
  @media (max-width: 768px) {
    body { cursor: auto; }
    #cursor, #cursor-ring { display: none; }
    .letterbox-top, .letterbox-bottom { height: 32px; }
  }
`;

// ---------------------------------------------------------------------------
// HOOKS
// ---------------------------------------------------------------------------

function useIntersection(ref, options = {}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.12, ...options });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

function useMousePosition() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          ringRef.current.x += (pos.x - ringRef.current.x) * 0.15;
          ringRef.current.y += (pos.y - ringRef.current.y) * 0.15;
          setRingPos({ ...ringRef.current });
          rafRef.current = null;
        });
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [pos.x, pos.y]);
  return { pos, ringPos };
}

// ---------------------------------------------------------------------------
// COMPONENTS
// ---------------------------------------------------------------------------

function Cursor() {
  const { pos, ringPos } = useMousePosition();
  return (
    <>
      <div id="cursor" style={{ left: pos.x, top: pos.y }} />
      <div id="cursor-ring" style={{ left: pos.x, top: pos.y }} />
    </>
  );
}

function RevealSection({ children, style, className = '' }) {
  const ref = useRef();
  const visible = useIntersection(ref);
  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`} style={style}>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// NAV
// ---------------------------------------------------------------------------
function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '20px 5vw',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(8,8,8,0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(201,169,110,0.08)' : 'none',
      transition: 'background 0.4s, backdrop-filter 0.4s, border-color 0.4s',
    }}>
      <a href="#hero" style={{ textDecoration: 'none', cursor: 'none' }}>
        <span style={{
          fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500,
          letterSpacing: '0.12em', color: 'var(--cream)',
        }}>LUMIÈRE</span>
      </a>

      {/* Desktop Nav */}
      <nav style={{ display: 'flex', gap: 36, alignItems: 'center' }}
           className="desktop-nav">
        {NAV_LINKS.map(l => (
          <a key={l.label} href={l.href}>{l.label}</a>
        ))}
        <a href="#contact" style={{
          padding: '8px 22px', border: '1px solid rgba(201,169,110,0.4)',
          color: 'var(--gold)', fontFamily: 'var(--sans)', fontSize: 11,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          transition: 'background 0.3s, border-color 0.3s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,169,110,0.1)'; e.currentTarget.style.borderColor = 'var(--gold)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(201,169,110,0.4)'; }}
        >Book Now</a>
      </nav>

      {/* Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none', background: 'none', border: 'none',
          cursor: 'pointer', padding: 8, flexDirection: 'column',
          gap: 5, alignItems: 'flex-end',
        }}
        className="hamburger"
        aria-label="Toggle menu"
      >
        {[1,2,3].map(i => (
          <span key={i} style={{
            display: 'block', height: 1, background: 'var(--gold)',
            width: i === 2 ? 20 : 28,
            transition: 'width 0.3s',
          }} />
        ))}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(8,8,8,0.97)',
          backdropFilter: 'blur(20px)', zIndex: 200,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 40,
        }}>
          <button onClick={() => setMenuOpen(false)} style={{
            position: 'absolute', top: 24, right: '5vw',
            background: 'none', border: 'none', color: 'var(--cream)',
            fontSize: 28, cursor: 'pointer',
          }}>✕</button>
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href}
               style={{ fontFamily: 'var(--serif)', fontSize: 32, color: 'var(--cream)', textDecoration: 'none' }}
               onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

// ---------------------------------------------------------------------------
// HERO
// ---------------------------------------------------------------------------
function Hero() {
  const words = ['Where', 'Light', 'Becomes', 'Legend.'];

  return (
    <section id="hero" style={{
      position: 'relative', height: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', background: '#000',
    }}>
      {/* Background gradient mesh */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: `
          radial-gradient(ellipse 80% 60% at 20% 60%, rgba(35,18,5,0.9) 0%, transparent 60%),
          radial-gradient(ellipse 60% 80% at 80% 30%, rgba(10,8,20,0.8) 0%, transparent 60%),
          radial-gradient(ellipse 100% 100% at 50% 50%, #0d0d0d 0%, #050505 100%)
        `,
      }} />

      {/* Film grain */}
      <div className="grain" />

      {/* Letterbox */}
      <div className="letterbox-top" />
      <div className="letterbox-bottom" />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 4, textAlign: 'center', padding: '0 5vw', maxWidth: 900 }}>
        <p style={{
          fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 500,
          letterSpacing: '0.35em', textTransform: 'uppercase',
          color: 'var(--gold)', marginBottom: 32,
          opacity: 0, animation: 'hero-word-in 0.8s ease 0.2s forwards',
        }}>
          Photography & Cinematic Film
        </p>

        <h1 style={{
          fontFamily: 'var(--serif)', fontSize: 'clamp(52px, 9vw, 110px)',
          fontWeight: 300, lineHeight: 1.05,
          color: 'var(--cream)', marginBottom: 32,
        }}>
          {words.map((word, i) => (
            <React.Fragment key={word}>
              <span
                className="hero-word"
                style={{ animationDelay: `${0.5 + i * 0.15}s` }}
              >
                {word}
              </span>
              {i < words.length - 1 && ' '}
            </React.Fragment>
          ))}
        </h1>

        <p style={{
          fontFamily: 'var(--sans)', fontSize: 'clamp(14px, 1.5vw, 18px)',
          fontWeight: 200, letterSpacing: '0.12em',
          color: 'var(--cream-dim)', marginBottom: 52, lineHeight: 1.7,
          opacity: 0, animation: 'hero-word-in 0.9s ease 1.2s forwards',
        }}>
          Award-winning photography & cinematic film for brands,<br />
          couples, and stories that refuse to be ordinary.
        </p>

        <div style={{
          opacity: 0, animation: 'hero-word-in 0.8s ease 1.5s forwards',
          display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap',
        }}>
          <a href="#work" className="cta-btn shimmer-btn">
            <span>View Our Work</span>
          </a>
          <a href="#contact" style={{
            display: 'inline-block', padding: '14px 40px',
            fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 500,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--cream-dim)', textDecoration: 'none',
            transition: 'color 0.3s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--cream-dim)'}
          >
            Get in Touch →
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 'clamp(60px, 10vh, 100px)',
        left: '50%', transform: 'translateX(-50%)', zIndex: 4,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        opacity: 0, animation: 'hero-word-in 0.8s ease 2s forwards',
      }}>
        <span style={{ fontFamily: 'var(--sans)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)' }}>Scroll</span>
        <div style={{
          width: 1, height: 48, background: 'linear-gradient(to bottom, var(--gold), transparent)',
          animation: 'scroll-line 1.8s ease infinite',
        }} />
        <style>{`
          @keyframes scroll-line {
            0%, 100% { opacity: 0.4; transform: scaleY(1); }
            50% { opacity: 1; transform: scaleY(0.7); }
          }
        `}</style>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// SHOWREEL
// ---------------------------------------------------------------------------
function Showreel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => setPlaying(true);

  return (
    <section id="showreel" style={{ background: '#000', padding: '120px 5vw' }}>
      <RevealSection style={{ maxWidth: 1100, margin: '0 auto' }}>
        <p style={{
          fontFamily: 'var(--sans)', fontSize: 10, fontWeight: 500,
          letterSpacing: '0.4em', textTransform: 'uppercase',
          color: 'var(--gold)', marginBottom: 16,
        }}>
          ✦ Showreel
        </p>

        {/* Tab selector if multiple reels */}
        {YOUTUBE_LINKS.length > 1 && (
          <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
            {YOUTUBE_LINKS.map((link, i) => (
              <button
                key={link.id}
                onClick={() => { setActiveIdx(i); setPlaying(false); }}
                style={{
                  background: 'none', border: 'none', cursor: 'none',
                  fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 400,
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: activeIdx === i ? 'var(--gold)' : 'var(--cream-dim)',
                  borderBottom: activeIdx === i ? '1px solid var(--gold)' : '1px solid transparent',
                  paddingBottom: 4, transition: 'color 0.3s',
                }}
              >
                {link.title}
              </button>
            ))}
          </div>
        )}

        {/* 16:9 video frame */}
        <div style={{
          position: 'relative', width: '100%', paddingBottom: '56.25%',
          background: '#0a0a0a',
          border: '1px solid rgba(201,169,110,0.1)',
          boxShadow: '0 0 0 1px rgba(201,169,110,0)',
          transition: 'box-shadow 0.4s, border-color 0.4s',
        }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 0 40px rgba(201,169,110,0.08)';
            e.currentTarget.style.borderColor = 'rgba(201,169,110,0.35)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = '0 0 0 1px rgba(201,169,110,0)';
            e.currentTarget.style.borderColor = 'rgba(201,169,110,0.1)';
          }}
        >
          {playing ? (
            <iframe
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
              src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_LINKS[activeIdx].id}?autoplay=1&rel=0&modestbranding=1&color=white`}
              title={YOUTUBE_LINKS[activeIdx].title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              {/* Thumbnail placeholder */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, #0d0a04 0%, #1a1208 50%, #080808 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `url(https://img.youtube.com/vi/${YOUTUBE_LINKS[activeIdx].id}/maxresdefault.jpg)`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  opacity: 0.6, filter: 'brightness(0.5) saturate(0.8)',
                }} />
              </div>
              <div className="yt-play" onClick={handlePlay}>
                <div className="yt-play-circle">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--gold)">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </div>
              </div>
              <div style={{
                position: 'absolute', bottom: 24, left: 24,
                fontFamily: 'var(--serif)', fontSize: 18, fontStyle: 'italic',
                color: 'var(--cream)', textShadow: '0 2px 12px rgba(0,0,0,0.8)',
                zIndex: 2, pointerEvents: 'none',
              }}>
                {YOUTUBE_LINKS[activeIdx].title}
              </div>
            </>
          )}
        </div>
      </RevealSection>
    </section>
  );
}

// ---------------------------------------------------------------------------
// PORTFOLIO / WORK GRID
// ---------------------------------------------------------------------------
function Portfolio() {
  const [lightbox, setLightbox] = useState(null); // { index }

  const open = useCallback((i) => setLightbox({ index: i }), []);
  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => {
    setLightbox(lb => ({ index: (lb.index - 1 + PORTFOLIO_IMAGES.length) % PORTFOLIO_IMAGES.length }));
  }, []);
  const next = useCallback(() => {
    setLightbox(lb => ({ index: (lb.index + 1) % PORTFOLIO_IMAGES.length }));
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, close, prev, next]);

  // Asymmetric grid layout weights
  const gridTemplates = [
    { gridColumn: 'span 1', gridRow: 'span 2' },
    { gridColumn: 'span 2', gridRow: 'span 1' },
    { gridColumn: 'span 1', gridRow: 'span 1' },
    { gridColumn: 'span 1', gridRow: 'span 1' },
    { gridColumn: 'span 1', gridRow: 'span 2' },
    { gridColumn: 'span 2', gridRow: 'span 1' },
  ];

  return (
    <section id="work" style={{ background: 'var(--bg)', padding: '120px 5vw' }}>
      <RevealSection style={{ marginBottom: 60 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 10, fontWeight: 500, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>
              ✦ Selected Work
            </p>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, lineHeight: 1.1, color: 'var(--cream)' }}>
              The Portfolio
            </h2>
          </div>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--cream-dim)', maxWidth: 300, lineHeight: 1.7, fontWeight: 300, letterSpacing: '0.06em' }}>
            Every frame a decision. Every edit an intention. Click any image to explore.
          </p>
        </div>
      </RevealSection>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(3, 280px)',
        gap: 4,
        maxWidth: 1200, margin: '0 auto',
      }}>
        {PORTFOLIO_IMAGES.map((img, i) => (
          <PortfolioCard
            key={i}
            img={img}
            index={i}
            gridStyle={gridTemplates[i]}
            onOpen={open}
            gradient={PLACEHOLDER_GRADIENTS[i]}
          />
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <Lightbox
          index={lightbox.index}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}

      <style>{`
        @media (max-width: 900px) {
          #work .portfolio-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-template-rows: auto !important;
          }
          #work .portfolio-grid > * {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
          }
        }
        @media (max-width: 600px) {
          #work .portfolio-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function PortfolioCard({ img, index, gridStyle, onOpen, gradient }) {
  const ref = useRef();
  const visible = useIntersection(ref);

  return (
    <div
      ref={ref}
      className="portfolio-card reveal"
      onClick={() => onOpen(index)}
      style={{
        ...gridStyle,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'none',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`,
      }}
    >
      {/* Image or placeholder */}
      <div
        className="portfolio-img"
        style={{
          position: 'absolute', inset: 0,
          background: img.src ? undefined : gradient,
          backgroundImage: img.src ? `url(${img.src})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'transform 6s ease',
          willChange: 'transform',
        }}
      />

      {/* Placeholder text watermark */}
      {!img.src && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: 0.12,
        }}>
          <span style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 5vw, 70px)', fontWeight: 300, color: 'var(--gold)' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      )}

      {/* Hover overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
        opacity: 0, transition: 'opacity 0.4s ease',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', padding: 24,
      }}
        onMouseEnter={e => e.currentTarget.style.opacity = 1}
        onMouseLeave={e => e.currentTarget.style.opacity = 0}
      >
        <p style={{
          fontFamily: 'var(--sans)', fontSize: 9, fontWeight: 500,
          letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'var(--gold)', marginBottom: 6,
          transform: 'translateY(10px)', transition: 'transform 0.4s ease',
        }}>
          {img.category}
        </p>
        <h3 style={{
          fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 400,
          color: 'var(--cream)',
          transform: 'translateY(10px)', transition: 'transform 0.4s ease 0.05s',
        }}>
          {img.title}
        </h3>
      </div>

      {/* Permanent index badge */}
      <div style={{
        position: 'absolute', top: 16, right: 16, zIndex: 3,
        fontFamily: 'var(--sans)', fontSize: 9, fontWeight: 400,
        letterSpacing: '0.15em', color: 'rgba(201,169,110,0.5)',
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>
    </div>
  );
}

function Lightbox({ index, onClose, onPrev, onNext }) {
  const img = PORTFOLIO_IMAGES[index];
  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button onClick={e => { e.stopPropagation(); onPrev(); }} style={{
        position: 'absolute', left: '4vw', top: '50%', transform: 'translateY(-50%)',
        background: 'none', border: '1px solid rgba(201,169,110,0.3)',
        color: 'var(--gold)', width: 48, height: 48, cursor: 'pointer',
        fontSize: 18, transition: 'background 0.3s',
      }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,169,110,0.1)'}
        onMouseLeave={e => e.currentTarget.style.background = 'none'}
      >←</button>

      <div onClick={e => e.stopPropagation()} style={{
        maxWidth: '85vw', maxHeight: '85vh', position: 'relative',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
      }}>
        <div style={{
          width: '100%', maxWidth: 900,
          aspectRatio: img.aspect === 'tall' ? '3/4' : img.aspect === 'wide' ? '16/9' : '1/1',
          background: PLACEHOLDER_GRADIENTS[index],
          backgroundImage: img.src ? `url(${img.src})` : undefined,
          backgroundSize: 'cover', backgroundPosition: 'center',
          position: 'relative',
        }}>
          {!img.src && (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center', opacity: 0.15,
            }}>
              <span style={{ fontFamily: 'var(--serif)', fontSize: 90, fontWeight: 300, color: 'var(--gold)' }}>
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)' }}>
            {img.category}
          </p>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 400, color: 'var(--cream)' }}>
            {img.title}
          </h3>
        </div>

        <p style={{ fontFamily: 'var(--sans)', fontSize: 9, letterSpacing: '0.2em', color: 'var(--cream-dim)', opacity: 0.5 }}>
          {index + 1} / {PORTFOLIO_IMAGES.length} — press ESC to close, ← → to navigate
        </p>
      </div>

      <button onClick={e => { e.stopPropagation(); onNext(); }} style={{
        position: 'absolute', right: '4vw', top: '50%', transform: 'translateY(-50%)',
        background: 'none', border: '1px solid rgba(201,169,110,0.3)',
        color: 'var(--gold)', width: 48, height: 48, cursor: 'pointer',
        fontSize: 18, transition: 'background 0.3s',
      }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,169,110,0.1)'}
        onMouseLeave={e => e.currentTarget.style.background = 'none'}
      >→</button>

      <button onClick={onClose} style={{
        position: 'absolute', top: 24, right: 24,
        background: 'none', border: 'none', color: 'var(--cream-dim)',
        fontSize: 20, cursor: 'pointer',
      }}>✕</button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SERVICES
// ---------------------------------------------------------------------------
function Services() {
  return (
    <section id="services" style={{
      background: 'var(--bg2)',
      padding: '120px 5vw',
      borderTop: '1px solid rgba(201,169,110,0.06)',
      borderBottom: '1px solid rgba(201,169,110,0.06)',
    }}>
      <RevealSection style={{ textAlign: 'center', marginBottom: 80 }}>
        <p style={{ fontFamily: 'var(--sans)', fontSize: 10, fontWeight: 500, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>
          ✦ What We Do
        </p>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, color: 'var(--cream)' }}>
          Our Services
        </h2>
      </RevealSection>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 1,
        maxWidth: 1100, margin: '0 auto',
        background: 'rgba(201,169,110,0.08)',
      }}>
        {SERVICES.map((svc, i) => (
          <ServiceCard key={svc.title} svc={svc} delay={i * 0.15} />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ svc, delay }) {
  const ref = useRef();
  const visible = useIntersection(ref);

  return (
    <div ref={ref} style={{
      background: 'var(--bg2)', padding: '56px 40px',
      display: 'flex', flexDirection: 'column', gap: 20,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(40px)',
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
    }}
      onMouseEnter={e => e.currentTarget.style.background = '#131313'}
      onMouseLeave={e => e.currentTarget.style.background = 'var(--bg2)'}
    >
      <div style={{ color: 'var(--gold)' }} dangerouslySetInnerHTML={{ __html: svc.icon }} />
      <hr className="gold-rule" />
      <h3 style={{ fontFamily: 'var(--serif)', fontSize: 26, fontWeight: 400, color: 'var(--cream)', lineHeight: 1.2 }}>
        {svc.title}
      </h3>
      <p style={{ fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 300, letterSpacing: '0.06em', color: 'var(--cream-dim)', lineHeight: 1.7 }}>
        {svc.desc}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ABOUT
// ---------------------------------------------------------------------------
function About() {
  return (
    <section id="about" style={{ background: 'var(--bg)', padding: '120px 5vw', overflow: 'hidden' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '5vw',
        maxWidth: 1200, margin: '0 auto',
        alignItems: 'center',
      }}
        className="about-grid"
      >
        {/* Portrait */}
        <RevealSection style={{ aspectRatio: '3/4', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, #1a1008 0%, #2a1c0c 40%, #0d0d0d 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {/* Placeholder portrait visual */}
            <div style={{ opacity: 0.1 }}>
              <svg width="120" height="160" viewBox="0 0 120 160" fill="none">
                <ellipse cx="60" cy="55" rx="28" ry="32" stroke="#c9a96e" strokeWidth="1"/>
                <path d="M20 160 Q20 110 60 100 Q100 110 100 160" stroke="#c9a96e" strokeWidth="1" fill="none"/>
              </svg>
            </div>
            {/* Add: <img src={portraitImg} ... /> */}
          </div>
          {/* Gold corner accent */}
          <div style={{
            position: 'absolute', top: 0, left: 0,
            width: 40, height: 40,
            borderTop: '2px solid var(--gold)',
            borderLeft: '2px solid var(--gold)',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, right: 0,
            width: 40, height: 40,
            borderBottom: '2px solid var(--gold)',
            borderRight: '2px solid var(--gold)',
          }} />
          <p style={{
            position: 'absolute', bottom: 24, left: 24,
            fontFamily: 'var(--sans)', fontSize: 9, letterSpacing: '0.3em',
            textTransform: 'uppercase', color: 'var(--gold)',
          }}>
            Place portrait.jpg here →
          </p>
        </RevealSection>

        {/* Text */}
        <RevealSection>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 10, fontWeight: 500, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>
            ✦ The Studio
          </p>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.15, marginBottom: 32 }}>
            We don't take photos.<br />We architect memory.
          </h2>

          {/* Pull quote */}
          <blockquote style={{
            borderLeft: '2px solid var(--gold)',
            paddingLeft: 24, marginBottom: 32,
            fontFamily: 'var(--serif)', fontSize: 'clamp(18px, 2vw, 22px)',
            fontStyle: 'italic', fontWeight: 300,
            color: 'var(--cream-dim)', lineHeight: 1.6,
          }}>
            "The best photograph is one that has been felt with the heart, not captured with the eye."
          </blockquote>

          <hr className="gold-rule" />

          <p style={{ fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 300, letterSpacing: '0.06em', color: 'var(--cream-dim)', lineHeight: 1.85, marginBottom: 28 }}>
            Founded by Maya Chen and James Okafor, Lumière began as a quiet obsession with light and became a decade-long pursuit of the unrepeatable. We have filmed in 34 countries, shot editorials for twelve international magazines, and documented stories that deserved to outlive the moment they were made in.
          </p>

          <p style={{ fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 300, letterSpacing: '0.06em', color: 'var(--cream-dim)', lineHeight: 1.85 }}>
            We are not the biggest studio. We are deliberate. We take on only the work we believe in — because belief is the only light that doesn't lie.
          </p>

          <div style={{ marginTop: 40, display: 'flex', gap: 40 }}>
            {[['12+', 'Years'], ['34', 'Countries'], ['800+', 'Stories']].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 40, fontWeight: 300, color: 'var(--gold)', lineHeight: 1 }}>{num}</div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--cream-dim)', marginTop: 6 }}>{label}</div>
              </div>
            ))}
          </div>
        </RevealSection>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ---------------------------------------------------------------------------
// CONTACT
// ---------------------------------------------------------------------------
function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', type: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
  const notConfigured = !endpoint;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (notConfigured) return;
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          type: formState.type,
          message: formState.message,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json().catch(() => ({}));
        const msg =
          data?.errors?.[0]?.message ||
          data?.error ||
          'Failed to send message. Please try again.';
        setSubmitError(msg);
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" style={{ background: 'var(--bg2)', padding: '120px 5vw', borderTop: '1px solid rgba(201,169,110,0.06)' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <RevealSection style={{ marginBottom: 64, textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 10, fontWeight: 500, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>
            ✦ Let's Create Together
          </p>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, color: 'var(--cream)' }}>
            Begin a Conversation
          </h2>
        </RevealSection>

        {submitted ? (
          <RevealSection style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 48, color: 'var(--gold)', marginBottom: 16 }}>✦</div>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 300, color: 'var(--cream)', marginBottom: 16 }}>
              Message Received
            </h3>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--cream-dim)', letterSpacing: '0.08em' }}>
              We'll be in touch within 24 hours.
            </p>
          </RevealSection>
        ) : (
          <RevealSection>
            {notConfigured && (
              <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: '#e07070', textAlign: 'center', marginBottom: 32, letterSpacing: '0.04em' }}>
                Contact form is not configured. Set <code>VITE_FORMSPREE_ENDPOINT</code> in your environment to enable submissions.
              </p>
            )}
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 40px' }}>
                <div className="form-field">
                  <input
                    type="text" id="name" placeholder=" "
                    value={formState.name}
                    onChange={e => setFormState(p => ({ ...p, name: e.target.value }))}
                    required
                  />
                  <label htmlFor="name">Full Name</label>
                </div>
                <div className="form-field">
                  <input
                    type="email" id="email" placeholder=" "
                    value={formState.email}
                    onChange={e => setFormState(p => ({ ...p, email: e.target.value }))}
                    required
                  />
                  <label htmlFor="email">Email Address</label>
                </div>
              </div>

              <div className={`form-field${formState.type ? ' has-value' : ''}`}>
                <select
                  id="type"
                  value={formState.type}
                  onChange={e => setFormState(p => ({ ...p, type: e.target.value }))}
                  required
                >
                  <option value="" disabled hidden> </option>
                  <option value="wedding">Wedding Film</option>
                  <option value="commercial">Commercial Photography</option>
                  <option value="documentary">Documentary</option>
                  <option value="other">Other / Just Saying Hi</option>
                </select>
                <label htmlFor="type">Project Type</label>
              </div>

              <div className="form-field">
                <textarea
                  id="message" placeholder=" "
                  value={formState.message}
                  onChange={e => setFormState(p => ({ ...p, message: e.target.value }))}
                  required
                />
                <label htmlFor="message">Tell Us About Your Project</label>
              </div>

              {submitError && (
                <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: '#e07070', textAlign: 'center', marginTop: 24, letterSpacing: '0.04em' }}>
                  {submitError}
                </p>
              )}

              <div style={{ textAlign: 'center', marginTop: 48 }}>
                <button type="submit" className="shimmer-btn" disabled={isSubmitting || notConfigured} style={{
                  padding: '16px 64px',
                  background: 'transparent',
                  border: '1px solid var(--gold)',
                  color: 'var(--gold)',
                  fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 500,
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  cursor: (isSubmitting || notConfigured) ? 'default' : 'none',
                  transition: 'background 0.3s',
                  opacity: (isSubmitting || notConfigured) ? 0.6 : 1,
                }}
                  onMouseEnter={e => { if (!isSubmitting && !notConfigured) e.currentTarget.style.background = 'rgba(201,169,110,0.08)'; }}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  {isSubmitting ? 'Sending…' : 'Send Message'}
                </button>
              </div>
            </form>
          </RevealSection>
        )}

        {/* Contact details */}
        <RevealSection style={{ marginTop: 80, paddingTop: 48, borderTop: '1px solid rgba(201,169,110,0.12)', display: 'flex', justifyContent: 'center', gap: '6vw', flexWrap: 'wrap' }}>
          {[
            { label: 'Email', value: 'hello@lumiere.film', href: 'mailto:hello@lumiere.film' },
            { label: 'Phone', value: '+1 (555) 000-0000', href: 'tel:+15550000000' },
            { label: 'Instagram', value: '@lumiere.film', href: '#' },
          ].map(item => (
            <div key={item.label} style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>{item.label}</p>
              <a href={item.href} style={{
                fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 300,
                letterSpacing: '0.08em', color: 'var(--cream-dim)',
                textDecoration: 'none', transition: 'color 0.3s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--cream)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--cream-dim)'}
              >
                {item.value}
              </a>
            </div>
          ))}
        </RevealSection>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// FOOTER
// ---------------------------------------------------------------------------
function Footer() {
  return (
    <footer style={{
      background: '#000', padding: '24px 5vw',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: 12,
      borderTop: '1px solid rgba(201,169,110,0.08)',
    }}>
      <span style={{ fontFamily: 'var(--serif)', fontSize: 16, letterSpacing: '0.1em', color: 'var(--cream)' }}>
        LUMIÈRE
      </span>
      <nav style={{ display: 'flex', gap: 24 }}>
        {NAV_LINKS.map(l => (
          <a key={l.label} href={l.href} style={{ fontSize: 9 }}>{l.label}</a>
        ))}
      </nav>
      <span style={{ fontFamily: 'var(--sans)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--cream-dim)', opacity: 0.5 }}>
        © 2024 Lumière Studio. All rights reserved.
      </span>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// APP
// ---------------------------------------------------------------------------
export default function App() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Showreel />
        <Portfolio />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import letterImage from './assets/letter-reference.png';
import calendarImage from './assets/calendar-reference.png';
import envelopeImage from './assets/envelope-reference.png';

const SITE_URL = 'https://anwesha-birthday.onrender.com';

function playPop() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(760, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.07, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
    osc.connect(gain).connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.2);
  } catch {}
}

function Confetti({ burst }) {
  const pieces = useMemo(() => Array.from({ length: 56 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.45,
    duration: 2.6 + Math.random() * 2.2,
    rotate: Math.random() * 360,
    size: 4 + Math.random() * 7,
    hue: Math.random() > 0.5 ? 'rose' : 'gold'
  })), []);
  if (!burst) return null;
  return <div className="confetti" aria-hidden="true">{pieces.map(p => <i key={p.id} style={{left:`${p.x}%`, animationDelay:`${p.delay}s`, animationDuration:`${p.duration}s`, transform:`rotate(${p.rotate}deg)`, width:p.size, height:p.size*1.5}} className={p.hue}/>)}</div>;
}

function FloatingHearts() {
  const hearts = useMemo(() => Array.from({ length: 13 }, (_, i) => ({
    id: i, left: 3 + Math.random()*94, delay: Math.random()*6, duration: 7 + Math.random()*6, size: 10 + Math.random()*15
  })), []);
  return <div className="hearts" aria-hidden="true">{hearts.map(h => <span key={h.id} style={{left:`${h.left}%`, animationDelay:`-${h.delay}s`, animationDuration:`${h.duration}s`, fontSize:h.size}}>♥</span>)}</div>;
}

function WaxSeal() {
  return <div className="seal" aria-hidden="true"><span>♥</span></div>;
}

function Envelope({ onOpen }) {
  const [open, setOpen] = useState(false);
  const click = () => { playPop(); setOpen(true); setTimeout(onOpen, 850); };
  return <button className={`envelope ${open ? 'is-open' : ''}`} onClick={click} aria-label="Open your letter">
    <div className="env-back" />
    <div className="env-paper"><div className="paper-mini">For you,<br/><span>with love</span> ♥</div></div>
    <div className="env-front" />
    <div className="env-flap" />
    <WaxSeal />
    <div className="env-caption">Tap to open</div>
  </button>;
}

function CalendarCard({ onOpen }) {
  const [lift, setLift] = useState(false);

  const days = [
    '', '', 1, 2, 3, 4, 5,
    6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, '', '', ''
  ];

  return (
    <button
      className={`calendar-wrap ${lift ? 'lift' : ''}`}
      onClick={() => {
        playPop();
        setLift(true);
        setTimeout(onOpen, 720);
      }}
      aria-label="Open the special date"
    >
      <div className="calendar-shadow" />

      <div className="calendar-card">

        <div className="calendar-top">September</div>

        <div className="calendar-week">
          <b>S</b>
          <b>M</b>
          <b>T</b>
          <b>W</b>
          <b>T</b>
          <b>F</b>
          <b>S</b>
        </div>

        <div className="calendar-grid">
          {days.map((day, i) => (
            <span
              key={i}
              className={day === 9 ? 'special' : ''}
            >
              {day}
            </span>
          ))}
        </div>

        {/* Handmade ribbon */}
       </div>

<div className="ribbon-h ribbon-left" />
<div className="ribbon-v" />
<div className="ribbon-knot" />

<div className="tiny-heart">♥</div>

</div>

      <div className="calendar-hint">Tap the date ♥</div>
    </button>
  );
}

function Letter({ onClose }) {
  return <div className="letter-stage">
    <div className="letter-toolbar">
      <span>Written just for you</span>
      <button onClick={onClose}>×</button>
    </div>
    <div className="letter-frame">
      <div className="letter-glow" />
      <img src={letterImage} alt="Handwritten birthday letter" />
      <div className="letter-note">Keep this one forever ♥</div>
    </div>
  </div>;
}

function App() {
  const [step, setStep] = useState('home');
  const [burst, setBurst] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const appRef = useRef(null);

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') { setStep('home'); setShowQR(false); } };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const celebrate = () => {
    playPop(); setBurst(true); setTimeout(() => setBurst(false), 4200);
  };

  return <main ref={appRef} className="app">
    <div className="grain" />
    <FloatingHearts />
    <Confetti burst={burst} />

    <header className="topbar">
      <div className="brand"><span className="brand-dot"/> for you <span>♥</span></div>
      <button className="qr-btn" onClick={() => setShowQR(true)}><span>▦</span> QR</button>
    </header>

    {step === 'home' && <section className="hero page-in">
      <div className="hero-copy">
        <p className="eyebrow">A little corner of the internet, made only for you</p>
        <h1>Happy<br/><em>Birthday</em> <span>♥</span></h1>
        <p className="subcopy">Today is yours. So I made you something you can open, keep, and come back to whenever you want a little extra smile.</p>
        <div className="hero-actions">
          <button className="primary" onClick={celebrate}>Celebrate <span>✦</span></button>
          <button className="letter-link" onClick={() => { playPop(); setStep('envelope'); }}>Letter for you <span>→</span></button>
        </div>
        <div className="tiny-meta"><span>made with too much love</span><i>•</i><span>09.09.2026</span></div>
      </div>
      <div className="hero-art">
        <div className="halo" />
        <div className="photo-stack">
          <div className="photo-back" />
          <div className="photo-main">
            <img src={calendarImage} alt="A tiny handmade calendar card" />
            <div className="photo-caption">save this day</div>
          </div>
          <div className="doodle d1">✦</div><div className="doodle d2">♥</div><div className="doodle d3">✧</div>
        </div>
      </div>
    </section>}

    {step === 'envelope' && <section className="scene page-in">
      <div className="scene-heading"><p className="eyebrow">There is one more thing…</p><h2>A little <em>letter</em> for you</h2><p>Don’t rush this one.</p></div>
      <Envelope onOpen={() => setStep('calendar')} />
      <button className="back" onClick={() => setStep('home')}>← Back</button>
    </section>}

    {step === 'calendar' && <section className="scene page-in">
      <div className="scene-heading"><p className="eyebrow">One date. One memory.</p><h2>Keep this <em>day</em> close</h2><p>Tap the card when you're ready.</p></div>
      <CalendarCard onOpen={() => setStep('letter')} />
      <button className="back" onClick={() => setStep('envelope')}>← Back</button>
    </section>}

    {step === 'letter' && <section className="scene page-in letter-page"><Letter onClose={() => setStep('calendar')} /></section>}

    {showQR && <div className="modal" onClick={() => setShowQR(false)}>
      <div className="qr-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setShowQR(false)}>×</button>
        <div className="qr-eyebrow">Scan this little doorway</div>
        <h3>Open it on another device ♥</h3>
        <div className="qr-box"><img src="/qr.png" alt="QR code for this birthday website" /></div>
        <p>Point your phone camera here and let the surprise begin.</p>
      </div>
    </div>}

    <footer className="footer">made for one very special person <span>♥</span></footer>
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);

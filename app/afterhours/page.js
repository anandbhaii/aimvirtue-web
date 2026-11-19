'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import {
  FiAward, FiCalendar, FiCoffee, FiCompass,
  FiCpu, FiLayers, FiMapPin, FiMic, FiPlay, FiUsers,
} from 'react-icons/fi';

const ACTIVITIES = [
  {
    badge: 'Zero-Lecture Zone',
    title: 'Arrival, Chai & Quick Intros',
    desc: 'Grab your coffee and share a quick intro: your name and what you are currently learning or building-zero stage pressure.',
    Icon: FiCoffee,
  },
  {
    badge: 'Open Debate',
    title: 'Tech Chai & Rapid News',
    desc: 'Zero slides, pure open-table conversation on the week’s biggest AI breakthroughs, new dev tools, and what actually matters.',
    Icon: FiCpu,
  },
  {
    badge: 'Show & Tell',
    title: 'Showcase Your Work or Ideas',
    desc: 'Open your laptop and showcase a live project, website, or raw startup idea-and get honest, constructive peer feedback.',
    Icon: FiMic,
  },
  {
    badge: 'Games & Trivia',
    title: 'Tech Trivia & Prompt Battles',
    desc: 'Team prompt-battles, tech quizzes, and quick logic games that break the ice and spark sharp problem-solving.',
    Icon: FiAward,
  },
  {
    badge: 'Skill Swap',
    title: 'Tool Drops & Workflow Hacks',
    desc: 'Share a coding shortcut, AI workflow, or resource you recently discovered-everyone leaves having taught and learned something new.',
    Icon: FiLayers,
  },
  {
    badge: 'Open Table',
    title: 'Team-Ups & Much More...',
    desc: 'Find hackathon partners, co-builders for your next project, spontaneous mini-challenges, and plenty more driven by the table.',
    Icon: FiCompass,
  },
];

const WHO_SHOULD_JOIN = [
  {
    title: 'Curious Learners & Beginners',
    text: 'Just starting out in tech or AI? Come listen, ask beginner-friendly questions, and find mentors without any classroom pressure.',
  },
  {
    title: 'Student Builders & Coders',
    text: 'Built a side project, AI tool, or portfolio site? Demo it live on the table, get constructive feedback, and find collaborators.',
  },
  {
    title: 'Idea-Stage Thinkers',
    text: 'Have a raw startup or community idea but need tech teammates? Pitch it openly and connect with Gwalior’s active builders.',
  },
];

export default function AfterhoursPage() {
  const [activeSec, setActiveSec] = useState('top');
  const [passType, setPassType] = useState('attendee'); // 'attendee' | 'speaker'
  const [name, setName] = useState('');
  const [campus, setCampus] = useState('');
  const [topic, setTopic] = useState('');

  useEffect(() => {
    const ids = ['top', 'activities', 'who', 'rsvp'];
    const onScroll = () => {
      const pos = window.scrollY + window.innerHeight * 0.35;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.offsetTop <= pos) {
          setActiveSec(ids[i]);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleRsvp = (e) => {
    e.preventDefault();
    const cleanName = name.trim() || 'a Gwalior Builder';
    const cleanCampus = campus.trim() ? ` (${campus.trim()})` : '';
    const msg =
      passType === 'speaker'
        ? `Hello AIMVIRTUE Team! I am ${cleanName}${cleanCampus}. I would like to book a Show & Tell Demo Slot at the upcoming AIMVIRTUE Afterhours meetup. Project/Idea: ${topic.trim() || 'Will share details shortly'}.`
        : `Hello AIMVIRTUE Team! I am ${cleanName}${cleanCampus}. I would like to reserve a seat for the upcoming AIMVIRTUE Afterhours ("Chai, Code & Demo") weekend cafe meetup in Gwalior.`;

    window.open(`https://wa.me/916388640308?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <nav className="nav">
        <Link href="/">Home</Link>
        <Link href="/#skills">Pathways</Link>
        <Link href="/#partners">Collaborate</Link>
        <Link href="/#contact">Connect</Link>
      </nav>

      {/* Floating Side Section Dots */}
      <aside className="side-dots" aria-label="Section progress">
        {[
          ['Top', 'top'],
          ['What Happens', 'activities'],
          ['Who Joins', 'who'],
          ['Reserve Spot', 'rsvp'],
        ].map(([label, id]) => (
          <a
            key={id}
            href={`#${id}`}
            className={`side-dot ${activeSec === id ? 'active' : ''}`}
            aria-label={label}
          >
            <span>{label}</span>
          </a>
        ))}
      </aside>

      <main className="wrap" style={{ paddingTop: '120px', paddingBottom: '50px' }}>
        {/* 1. Hero Header */}
        <div id="top" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 60px', scrollMarginTop: '100px' }}>
          <span className="tag">Weekend Cafe Meetup · Gwalior</span>
          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              margin: '20px 0 16px',
            }}
          >
            AIMVIRTUE <span className="grad">Afterhours</span>
          </h1>
          <p style={{ color: 'var(--mut)', fontSize: '17px', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--tx)' }}>Chai, Code &amp; Demo</strong> is Gwalior&apos;s open weekend cafe table for tech enthusiasts and student builders. Whether you want to debate the latest AI news, showcase a project you built, pitch a new idea for honest feedback, or learn a new workflow over coffee-this is where peer-to-peer learning happens without classrooms, slides, or stage pressure.
          </p>
        </div>

        {/* 2. What Happens Here (Left-Aligned Header, Original Content, No Fixed Clock Timings) */}
        <div id="activities" style={{ maxWidth: '840px', margin: '0 auto 64px', scrollMarginTop: '100px' }}>
          <span className="tag">What Happens Here</span>
          <h2 style={{ fontSize: 'clamp(26px, 3.8vw, 38px)', margin: '16px 0 28px' }}>
            Pure Signal, Live Demos &amp; Tech Games
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {ACTIVITIES.map(({ badge, title, desc, Icon }) => (
              <div className="win rv in" key={title} style={{ padding: '22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span className="job-mark">
                    <Icon />
                  </span>
                  <span
                    style={{
                      fontSize: '11.5px',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      color: 'var(--ac2)',
                      background: 'rgba(255, 122, 26, 0.1)',
                      border: '1px solid rgba(255, 122, 26, 0.25)',
                      padding: '3px 10px',
                      borderRadius: '999px',
                    }}
                  >
                    {badge}
                  </span>
                </div>
                <h3 style={{ fontSize: '17px', margin: '0 0 8px', color: 'var(--tx)' }}>{title}</h3>
                <p style={{ fontSize: '13.5px', color: 'var(--mut)', lineHeight: 1.6, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Who Belongs at Afterhours (Left-Aligned Header) */}
        <div id="who" style={{ maxWidth: '840px', margin: '0 auto 64px', scrollMarginTop: '100px' }}>
          <span className="tag">Open To All Builders</span>
          <h2 style={{ fontSize: 'clamp(26px, 3.8vw, 38px)', margin: '16px 0 28px' }}>
            Who Belongs at Afterhours?
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {WHO_SHOULD_JOIN.map((item) => (
              <div className="win rv in" key={item.title} style={{ padding: '22px' }}>
                <h3 style={{ fontSize: '16.5px', margin: '0 0 8px', color: 'var(--ac2)' }}>{item.title}</h3>
                <p style={{ fontSize: '13.5px', color: 'var(--mut)', lineHeight: 1.6, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Final Section: Reserve Your Spot Form */}
        <div id="rsvp" style={{ maxWidth: '840px', margin: '0 auto 24px', scrollMarginTop: '100px' }}>
          <span className="tag">Reserve Your Spot</span>
          <h2 style={{ fontSize: 'clamp(26px, 3.8vw, 38px)', margin: '16px 0 28px' }}>
            Book Your Seat at the Table
          </h2>

          <div className="win rv in" style={{ padding: '26px 28px' }}>
            <div className="dots"><i /><i /><i /></div>

            {/* Edition Meta Strip */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px',
                paddingBottom: '18px',
                marginBottom: '22px',
                borderBottom: '1px solid var(--line)',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#22c55e',
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  ● Upcoming Weekend Edition · Limited to 20 Seats
                </span>
                <h3 style={{ fontSize: '20px', margin: 0, color: 'var(--tx)' }}>
                  Chai, Code &amp; Demo - Gwalior Chapter
                </h3>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <span className="job-date">
                  <FiCalendar /> Sat / Sun Weekend
                </span>
                <span className="job-date">
                  <FiMapPin /> Gwalior Cafe (Venue on RSVP)
                </span>
              </div>
            </div>

            {/* Mode Switcher: Attendee vs Show & Tell Speaker */}
            <div style={{ marginBottom: '18px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--mut)',
                  marginBottom: '10px',
                }}
              >
                Choose Your Pass Type
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setPassType('attendee')}
                  className={`track-tab${passType === 'attendee' ? ' active' : ''}`}
                >
                  <FiUsers /> Join as Attendee (Learn, Play &amp; Network)
                </button>
                <button
                  type="button"
                  onClick={() => setPassType('speaker')}
                  className={`track-tab${passType === 'speaker' ? ' active' : ''}`}
                >
                  <FiPlay /> Book Show &amp; Tell Demo Slot
                </button>
              </div>
            </div>

            {/* Quick RSVP Form -> Opens Pre-filled WhatsApp */}
            <form onSubmit={handleRsvp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--mut)', marginBottom: '6px' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aryan Gupta"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1px solid var(--line)',
                      background: '#080605',
                      color: 'var(--tx)',
                      fontSize: '14.5px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--mut)', marginBottom: '6px' }}>
                    College / School / Organization
                  </label>
                  <input
                    type="text"
                    value={campus}
                    onChange={(e) => setCampus(e.target.value)}
                    placeholder="e.g. MITS / IIITM / ITM / VU Gwalior"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1px solid var(--line)',
                      background: '#080605',
                      color: 'var(--tx)',
                      fontSize: '14.5px',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {passType === 'speaker' && (
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--ac2)', marginBottom: '6px', fontWeight: 600 }}>
                    What will you showcase or pitch? *
                  </label>
                  <input
                    type="text"
                    required
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. AI Resume Analyzer web app, or a startup idea for local shops"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 122, 26, 0.45)',
                      background: '#080605',
                      color: 'var(--tx)',
                      fontSize: '14.5px',
                      outline: 'none',
                    }}
                  />
                </div>
              )}

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  marginTop: '6px',
                }}
              >
                <span style={{ fontSize: '12.5px', color: 'var(--mut)' }}>
                  Zero entry fee · Pay only for your own cafe chai/snacks
                </span>

                <button
                  type="submit"
                  className="btn"
                  style={{
                    background: 'linear-gradient(135deg, var(--ac), #d95b00)',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '9px',
                    padding: '13px 24px',
                  }}
                >
                  <FaWhatsapp size={17} />
                  {passType === 'speaker' ? 'Request Demo Slot on WhatsApp' : 'Reserve My Seat on WhatsApp'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <div className="subpages-bar">
        <a href="/team">Our Team</a>
        <a href="/afterhours">Afterhours</a>
        <a href="/verify">Verify Certificate</a>
        <a href="/feedback">Feedback</a>
      </div>

      <footer>
        © {new Date().getFullYear()} AIMVIRTUE
      </footer>
    </>
  );
}
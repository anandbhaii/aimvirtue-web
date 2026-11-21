'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FiCompass, FiInstagram, FiLinkedin,
  FiMapPin, FiShield, FiUsers,
} from 'react-icons/fi';

const PILLARS = [
  {
    Icon: FiUsers,
    title: 'By Students, For Students',
    text: 'Built from the ground up by active tech builders in Gwalior who understand the exact gap between college classrooms and real industry expectations.',
  },
  {
    Icon: FiShield,
    title: 'Zero-Fluff, Zero-Plagiarism Ethics',
    text: 'We stand firmly against passive video courses and AI shortcutting-championing honest Socratic learning and real proof-of-work.',
  },
  {
    Icon: FiCompass,
    title: 'Grassroots to Corporate Loop',
    text: 'From free NEP 2020-aligned AI literacy sessions for school students to Day-1 job readiness for graduates.',
  },
];

const TEAM_MEMBERS = [
  {
    name: 'Anurag Rana',
    role: 'Head of Technology & Curriculum',
    bio: 'Architecting AIMVIRTUE’s technical ecosystem and designing NEP-aligned AI & builder curriculums that bridge classroom theory with real industry workflows.',
    img: '/team/anurag.jpeg',
    linkedin: 'https://www.linkedin.com/in/anurag-rana12/',
  },
  {
    name: 'Akash Yadav',
    role: 'Operations & Program Coordinator',
    bio: 'Managing end-to-end campus drive logistics, program schedules, MIS tracking, and smooth on-ground execution across cohorts and community meetups.',
    img: '/team/akash.jpeg',
    linkedin: 'https://www.linkedin.com/in/akash94/',
  },
  {
    name: 'Mohit Rajak',
    role: 'Outreach & Growth Associate',
    bio: 'Driving campus connections, coordinating with school leaders, and building strong student & partner pipelines across the region.',
    img: '/team/mohit.jpeg',
    linkedin: 'https://www.linkedin.com/in/mohit-kumar-rajak-973b13404/',
  },
  {
    name: 'Anamika Pandey',
    role: 'AI Mentor & Facilitator',
    bio: 'Blending student leadership from IEEE and AI Club initiatives to facilitate engaging campus sessions-making generative AI, ethical usage, and smart study workflows accessible for students.',
    img: '/team/anamika.jpeg',
    linkedin: 'https://www.linkedin.com/in/anamika-pandey-04b538347/',
  },
  {
    name: 'Dhanushka Pal',
    role: 'AI Facilitator & Prompt Specialist',
    bio: 'Drawing on hands-on LLM and prompt engineering experience to lead practical workshops, helping students master structured prompting, digital safety, and real-world AI fluency.',
    img: '/team/dhanushka.png',
    linkedin: 'https://www.linkedin.com/in/dhanushka-pal-2a445b342/',
  },
  {
    name: 'Himanshu Singh Sengar',
    role: 'Technical Mentor & AI Facilitator',
    bio: 'Leveraging foundations in Python, C++, and applied AI engineering to guide student cohorts through live coding labs, logic building, and hands-on builder sprints.',
    img: '/team/himanshu.jpeg',
    linkedin: 'https://www.linkedin.com/in/himanshu-singh-sengar-4455a1379/',
  },
];

export default function TeamPage() {
  const [activeSec, setActiveSec] = useState('top');

  useEffect(() => {
    const ids = ['top', 'squad', 'members', 'story', 'values'];
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

  return (
    <>
      <nav className="nav">
        <Link href="/">Home</Link>
        <Link href="/#skills">Pathways</Link>
        <Link href="/#partners">Collaborate</Link>
        <Link href="/#contact">Connect</Link>
      </nav>

      <aside className="side-dots" aria-label="Section progress">
        {[
          ['Top', 'top'],
          ['Our Squad', 'squad'],
          ['Members', 'members'],
          ['Our Story', 'story'],
          ['Core Values', 'values'],
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

      <main className="wrap" style={{ paddingTop: '120px', paddingBottom: '40px' }}>
        {/* Header */}
        <div id="top" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 44px' }}>
          <span className="tag">Meet The Team</span>
          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              margin: '20px 0 16px',
            }}
          >
            The Squad Behind <span className="grad">AIMVIRTUE</span>
          </h1>
          <p style={{ color: 'var(--mut)', fontSize: '17px', lineHeight: 1.65 }}>
            Born in Gwalior with a single conviction: talent exists in every classroom, it just needs the right spark, ethical AI fluency, and real-world direction.
          </p>
        </div>

        {/* Center Team Photo Window */}
        <div id="squad" className="win rv in" style={{ maxWidth: '860px', margin: '0 auto 64px', scrollMarginTop: '100px' }}>
          <div className="dots"><i /><i /><i /></div>
          <div
            style={{
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid var(--line)',
              background: '#0b0806',
            }}
          >
            <img
              src="/team.jpg"
              alt="AIMVIRTUE Founding & Core Team"
              style={{
                width: '100%',
                maxHeight: '520px',
                objectFit: 'cover',
                objectPosition: 'center 25%',
                display: 'block',
              }}
            />
            <div
              style={{
                padding: '16px 20px',
                background: 'linear-gradient(180deg, rgba(17,13,11,0.92), #0a0706)',
                borderTop: '1px solid var(--line)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              <div>
                <b style={{ fontSize: '15px', color: 'var(--tx)', display: 'block' }}>
                  Core Founding &amp; Execution Team · AIMVIRTUE
                </b>
                <span style={{ fontSize: '13px', color: 'var(--mut)' }}>
                  Building India&apos;s Peer-Led AI &amp; Career Launchpad from Ground Zero
                </span>
              </div>
              <span className="job-date">
                <FiMapPin /> Gwalior HQ, MP
              </span>
            </div>
          </div>
        </div>

        {/* Individual Team Members Grid */}
        <div id="members" style={{ maxWidth: '860px', margin: '0 auto 64px', scrollMarginTop: '100px' }}>
          <span className="tag">People Driving The Mission</span>
          <h2 style={{ fontSize: 'clamp(26px, 3.8vw, 38px)', margin: '16px 0 28px' }}>
            Core Builders &amp; Leads
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '18px',
            }}
          >
            {TEAM_MEMBERS.map((m) => (
              <div
                className="win rv in"
                key={m.name}
                style={{
                  padding: '22px 20px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      width: '92px',
                      height: '92px',
                      borderRadius: '50%',
                      padding: '3px',
                      margin: '0 auto 14px',
                      background: 'linear-gradient(135deg, var(--ac), rgba(255,176,102,0.25))',
                    }}
                  >
                    <img
                      src={m.img}
                      alt={m.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        display: 'block',
                        background: '#16110e',
                      }}
                    />
                  </div>

                  <h3 style={{ fontSize: '17px', margin: '0 0 6px', color: 'var(--tx)' }}>
                    {m.name}
                  </h3>

                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      color: 'var(--ac2)',
                      background: 'rgba(255, 122, 26, 0.1)',
                      border: '1px solid rgba(255, 122, 26, 0.25)',
                      padding: '3px 10px',
                      borderRadius: '999px',
                      marginBottom: '12px',
                    }}
                  >
                    {m.role}
                  </span>

                  <p style={{ fontSize: '13.5px', color: 'var(--mut)', lineHeight: 1.55, margin: '0 0 16px' }}>
                    {m.bio}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="icon-btn"
                      style={{ width: '36px', height: '36px', borderRadius: '10px', fontSize: '16px' }}
                      aria-label={`${m.name} LinkedIn`}
                    >
                      <FiLinkedin />
                    </a>
                  )}
                  {m.instagram && (
                    <a
                      href={m.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="icon-btn"
                      style={{ width: '36px', height: '36px', borderRadius: '10px', fontSize: '16px' }}
                      aria-label={`${m.name} Instagram`}
                    >
                      <FiInstagram />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About AIMVIRTUE Story */}
        <div id="story" style={{ maxWidth: '860px', margin: '0 auto 28px', scrollMarginTop: '100px' }}>
          <span className="tag">Who We Are</span>
          <h2 style={{ fontSize: 'clamp(26px, 3.8vw, 38px)', margin: '16px 0 28px' }}>
            Bridging Classrooms to Careers with Applied Intelligence
          </h2>

          <div className="win rv in" style={{ padding: '26px 28px' }}>
            <div className="dots"><i /><i /><i /></div>
            <p style={{ color: 'var(--mut)', fontSize: '15.5px', lineHeight: 1.75, marginBottom: '14px' }}>
              <strong style={{ color: 'var(--tx)' }}>AIMVIRTUE</strong> started with a simple observation: school students were either treating AI as a shortcut for homework or staying completely unaware of its potential, while college graduates were struggling with skill gaps despite holding degrees.
            </p>
            <p style={{ color: 'var(--mut)', fontSize: '15.5px', lineHeight: 1.75, margin: 0 }}>
              Operating through two integrated engines-<strong style={{ color: 'var(--ac2)' }}>Seed To Start</strong> and <strong style={{ color: 'var(--ac2)' }}>Great To Greatness</strong> - our student-led squad is on a mission to impact 10,000+ learners across campuses.
            </p>
          </div>
        </div>

        {/* 3 Core Values Grid */}
        <div
          id="values"
          style={{
            maxWidth: '860px',
            margin: '0 auto 40px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px',
            scrollMarginTop: '100px',
          }}
        >
          {PILLARS.map(({ Icon, title, text }) => (
            <div className="win rv in" key={title} style={{ padding: '20px' }}>
              <span className="job-mark" style={{ marginBottom: '12px' }}>
                <Icon />
              </span>
              <h3 style={{ fontSize: '17px', marginBottom: '8px', color: 'var(--tx)' }}>{title}</h3>
              <p style={{ fontSize: '13.5px', color: 'var(--mut)', lineHeight: 1.6, margin: 0 }}>{text}</p>
            </div>
          ))}
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
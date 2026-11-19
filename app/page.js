'use client';
import { useEffect, useState } from 'react';
import * as SI from 'react-icons/si';
import {
  FiAward, FiBookOpen, FiBriefcase, FiCalendar, FiCheckCircle,
  FiCpu, FiInstagram, FiLayers, FiLinkedin, FiMail,
  FiMapPin, FiShield, FiTrendingUp, FiZap,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const NAME = ['AIMVIRTUE'];

const NAV = [
  ['Pathways', '#skills'],
  ['Engines', '#experience'],
  ['Collaborate', '#partners'],
  ['Connect', '#contact'],
];

const STATS = [
  ['10,000+', 'Students Targeted Across Campuses'],
  ['100% Live', 'No Passive Recorded Video Courses'],
  ['0% Copy', 'Strict Anti-Plagiarism AI Ethics'],
  ['Day-1', 'Production-Ready Talent Pipeline'],
];

// [label, react-icons/si name, brand color]
const TRACKS = [
  {
    id: 'school',
    tab: 'School Student',
    pillar: 'Pillar 01 · Seed To Start',
    headline: 'Turn AI from a distraction into your 24/7 personal tutor',
    before: 'Rote memorization, exam anxiety, and confusion about future careers across Science, Commerce & Arts.',
    after: '2x faster concept mastery, strict cyber & anti-plagiarism ethics, and an official AIMVIRTUE AI Credential.',
    skills: [
      ['Generative AI Basics', 'SiGooglegemini', '#a78bfa'],
      ['Smart Study Prompting', '', '#ff7a1a'],
      ['Anti-Plagiarism Ethics', '', '#22c55e'],
      ['Cyber Safety & Privacy', '', '#38BDF8'],
      ['NEP 2020 Readiness', '', '#ffb066'],
    ],
    takeaways: [
      'Zero coding required - tailored equally for Science, Commerce, and Humanities.',
      'Learn structured prompting to break down tough chapters and self-quiz before exams.',
      'Delivered via complimentary 90-minute campus orientations at your school.',
    ],
    cta: 'Book for your school',
    href: 'https://wa.me/916388640308?text=Hi%20AIMVIRTUE%20Team%2C%20I%20would%20like%20to%20book%20a%20complimentary%20%22Seed%20To%20Start%22%20AI%20literacy%20workshop%20for%20our%20school.',
  },
  {
    id: 'college',
    tab: 'College & Tech Builder',
    pillar: 'Bridge Track · Applied Builders',
    headline: 'Move beyond textbook theory to shipping real digital products',
    before: 'Passive semester lectures, blank GitHub profiles, and zero hands-on experience building modern tools.',
    after: 'Live AI-integrated web/no-code projects, mentor-reviewed portfolios, and real problem-solving confidence.',
    skills: [
      ['AI Workflows & Automation', 'SiOpenai', '#10a37f'],
      ['No-Code Product Building', '', '#ff7a1a'],
      ['Modern Web Fundamentals', 'SiReact', '#61DAFB'],
      ['Data & Research Fluency', '', '#38BDF8'],
      ['Capstone Problem Solving', '', '#ffb066'],
    ],
    takeaways: [
      'Build and deploy working AI tools and web apps in intensive weekend sprints.',
      'Collaborate in our "By Students, For Students" peer builder network.',
      'Create tangible proof-of-work that stands out far above generic certificates.',
    ],
    cta: 'Join builder sprints',
    href: 'https://wa.me/916388640308?text=Hi%20AIMVIRTUE%20Team%2C%20I%20am%20a%20college%20student%20and%20want%20to%20join%20your%20upcoming%20AI%20%26%20Builder%20Sprints.',
  },
  {
    id: 'graduate',
    tab: 'Graduate & Job Seeker',
    pillar: 'Pillar 02 · Great To Greatness',
    headline: 'Bridge your exact skill gaps and land direct corporate interviews',
    before: 'Endless resume rejections, lack of real industry exposure, and uncertainty about what recruiters actually test.',
    after: '1-on-1 Skill-Gap Scorecard, live production internship experience, and direct B2B placement drives.',
    skills: [
      ['1-on-1 Skill-Gap Audits', '', '#ff7a1a'],
      ['Industry Internships', '', '#38BDF8'],
      ['Mock Tech Interviews', '', '#a78bfa'],
      ['Communication & Soft Skills', '', '#ffb066'],
      ['Direct Hiring Drives', '', '#22c55e'],
    ],
    takeaways: [
      'Precision diagnostic audit pinpointing exact technical and communication bottlenecks.',
      'Hands-on internship execution on real workflows before facing company panels.',
      'Direct hiring access to startups and corporate partners across Gwalior & beyond.',
    ],
    cta: 'Start your career audit',
    href: 'https://wa.me/916388640308?text=Hi%20AIMVIRTUE%20Team%2C%20I%20am%20a%20graduate%2Fjob%20seeker%20and%20would%20like%20to%20start%20my%201-on-1%20Skill-Gap%20Career%20Audit.',
  },
];

const Chip = ({ n, i, c, d }) => {
  const I = SI[i] || FiZap;
  return (
    <span className="chip" style={{ '--c': c, '--d': `${d * 0.18}s` }}>
      <I className="ic" />
      {n}
    </span>
  );
};

const JOBS = [
  {
    role: 'Seed To Start - School Literacy Mission',
    org: 'Grades 8th-12th · All Streams (Science, Commerce & Arts)',
    date: 'Grassroots Foundation',
    points: [
      {
        title: 'Beyond Textbook Definitions',
        text: 'Live visual demonstrations replacing passive rote memorization with real AI fluency.',
        Icon: FiBookOpen,
      },
      {
        title: 'Zero Coding Prerequisite',
        text: 'Designed intuitively so Arts and Commerce students learn just as fast as Science cohorts.',
        Icon: FiCpu,
      },
      {
        title: 'Character & Cyber Discipline',
        text: 'Drawing a strict line between ethical Socratic learning and homework shortcuts.',
        Icon: FiShield,
      },
      {
        title: 'Verifiable Student Credentials',
        text: 'Every participant earns an official certificate and curated Prompt & Safety Guide.',
        Icon: FiAward,
      },
    ],
  },
  {
    role: 'Great To Greatness - Career Accelerator',
    org: 'Final-Year Students, Graduates & Job Seekers',
    date: 'Industry Launchpad',
    points: [
      {
        title: 'Diagnostic Skill Bootcamps',
        text: 'Customized training sprints fixing exact resume, coding, and communication gaps.',
        Icon: FiTrendingUp,
      },
      {
        title: 'Production-Grade Execution',
        text: 'Working on live client/product workflows instead of dummy textbook assignments.',
        Icon: FiLayers,
      },
      {
        title: 'Direct Recruiter Access',
        text: 'Bridging Tier-2/3 talent directly with fast-growing startups and corporate HR teams.',
        Icon: FiBriefcase,
      },
      {
        title: 'End-to-End Mentorship',
        text: 'Continuous guidance until the candidate clears interviews and lands on the floor.',
        Icon: FiZap,
      },
    ],
  },
];

const PROJECTS = [
  {
    name: 'Mission Digital Gwalior (School Drive)',
    badge: 'ACTIVE',
    tag: 'Grassroots Outreach · Complimentary',
    desc: 'Reaching secondary and senior secondary schools across Gwalior to bring free AI literacy to 10,000+ students.',
    cta: 'Book for your school',
  },
  {
    name: 'Zero-Plagiarism Campus Pledge',
    badge: 'ACTIVE',
    tag: 'Academic Integrity Campaign',
    desc: 'Partnering with school educators to curb AI homework copying and promote honest, Socratic self-learning.',
    cta: 'Adopt campus pledge',
  },
  {
    name: 'By Students, For Students Community',
    badge: 'ACTIVE',
    tag: 'Peer Mentorship Network',
    desc: 'An active peer-led network where college builders mentor school juniors and collaborate on weekend tech sprints.',
    cta: 'Join peer network',
  },
  {
    name: 'Weekend AI & Builder Sprints',
    badge: 'COHORT OPEN',
    tag: 'Hands-On Labs · College Cohorts',
    desc: 'Fast-paced practical workshops where college students build and deploy live AI-integrated tools in 48 hours.',
    cta: 'Register for next sprint',
  },
  {
    name: 'Campus-to-Corporate Placement Drives',
    badge: 'HIRING LIVE',
    tag: 'Hiring Events · Final-Year Students',
    desc: 'Dedicated interview drives connecting Tier-2/3 college graduates directly with startup founders and HR leaders.',
    cta: 'Explore hiring drives',
  },
  {
    name: 'Parent & Educator AI Townhalls',
    badge: 'ON REQUEST',
    tag: 'Awareness Sessions · Hybrid',
    desc: 'Interactive Q&A forums helping parents and teachers understand modern digital safety and emerging career paths.',
    cta: 'Schedule a townhall',
  },
];

const FAQS = [
  {
    sender: 'School Principal · Gwalior',
    q: 'Will this workshop encourage students to use AI to copy homework or cheat?',
    a: 'Not at all. Academic honesty is our core pillar-we train students to use AI strictly as a 24/7 Socratic tutor for concept clarity, never as an assignment shortcut.',
  },
  {
    sender: 'Academic Coordinator',
    q: 'What are the charges and schedule requirements for our school?',
    a: 'Zero cost (₹0) under our Grassroots Outreach Charter. We only need one 90-minute auditorium slot-zero timetable disruption and zero teacher workload.',
  },
  {
    sender: 'School IT & Lab Head',
    q: 'Do we need a computer lab or laptops for every attending student?',
    a: 'No individual hardware is needed. Our mentors conduct the session via live master demonstrations, interactive prompts, and guided exercises in your auditorium or smart hall.',
  },
  {
    sender: 'Parent · Class 10th Student',
    q: 'My child is in Commerce / Humanities. Is AI literacy useful for non-science streams?',
    a: '100% yes! Modern AI is transforming finance, law, design, management, and research. We teach stream-agnostic workflows so every student gains an academic edge.',
  },
  {
    sender: 'School Management',
    q: 'Does this session align with NEP 2020 and CBSE / MP Board skill guidelines?',
    a: 'Yes, completely. We also provide official event documentation and verifiable Digital Certificates of Participation for every attending student.',
  },
  {
    sender: 'Undergraduate Student',
    q: 'I have zero coding background. Can I still join AIMVIRTUE programs?',
    a: 'Absolutely! We start from absolute fundamentals-guiding you step-by-step from practical AI fluency to building real-world digital products.',
  },
  {
    sender: 'Final-Year Graduate',
    q: 'How does AIMVIRTUE help with internships and job placements?',
    a: 'Through our "Great To Greatness" engine, we run 1-on-1 Skill-Gap Audits, place you on live industry projects, and connect you directly with hiring partners.',
  },
  {
    sender: 'Job Seeker · Tier-2 City',
    q: 'What makes AIMVIRTUE different from regular recorded online courses?',
    a: 'We don’t sell passive videos. We run diagnostic skill audits, live mentor-led execution sprints, and direct B2B hiring loops until you are interview-ready.',
  },
  {
    sender: 'Startup Founder / HR Lead',
    q: 'Can we hire pre-vetted interns or junior developers from AIMVIRTUE?',
    a: 'Yes! Our B2B Placement Engine supplies disciplined, AI-fluent candidates trained on real production workflows-saving your team weeks of screening time.',
  },
  {
    sender: 'Institute / Campus Head',
    q: 'How quickly can we schedule a workshop or campus drive with AIMVIRTUE?',
    a: 'Just drop a message or call via our Contact section below-our Gwalior HQ team will confirm your date and complete execution plan within 24 hours.',
  },
];

const Win = ({ children, className = '' }) => (
  <div className={`win rv ${className}`}>
    <div className="dots"><i /><i /><i /></div>
    {children}
  </div>
);

const PARTNERS = [
  {
    id: 'institutions',
    audience: 'For Academic Institutions · Schools & Colleges',
    title: 'Turn your campus into an NEP-aligned AI & innovation hub',
    subtitle:
      'Partner with AIMVIRTUE to equip your students with practical AI fluency and career clarity-with zero operational burden on your faculty.',
    badge: 'Zero-Cost Campus Charter',
    cta: 'Partner your institution',
    href: 'https://wa.me/916388640308?text=Hi%20AIMVIRTUE%20Team%2C%20we%20would%20like%20to%20partner%20our%20School%2FCollege%20with%20you.',
    points: [
      {
        title: 'Zero-Cost, Zero-Disruption Delivery',
        desc: 'Complimentary 90-minute orientations and hands-on builder labs scheduled seamlessly within your academic calendar.',
      },
      {
        title: 'Strict Anti-Plagiarism & Cyber Discipline',
        desc: 'Unlike generic tech talks, we enforce ethical Socratic AI usage so students master concepts rather than copying assignments.',
      },
      {
        title: 'Stream-Agnostic Curriculum (Grades 8th to UG)',
        desc: 'Equally impactful for Science, Commerce, Humanities, and Engineering cohorts with zero coding prerequisites.',
      },
      {
        title: 'Official Campus Documentation & Credentials',
        desc: 'Complete event summary for school/college records plus verifiable Digital Certificates for every participant.',
      },
    ],
  },
  {
    id: 'companies',
    audience: 'For Startups & Corporate Hiring Partners',
    title: 'Hire pre-vetted, AI-fluent talent ready from Day One',
    subtitle:
      'Stop wasting weeks filtering unverified resumes. Tap into our disciplined, execution-tested talent pipeline built for modern teams.',
    badge: 'Pre-Vetted Talent Pipeline',
    cta: 'Hire from AIMVIRTUE',
    href: 'https://wa.me/916388640308?text=Hi%20AIMVIRTUE%20Team%2C%20we%20are%20looking%20to%20hire%20interns%2Fcandidates%20through%20your%20placement%20network.',
    points: [
      {
        title: '3-Stage Pre-Vetted Candidates',
        desc: 'Every candidate clears our 1-on-1 Skill-Gap Audit, real project sprints, and mock interviews before reaching your panel.',
      },
      {
        title: 'Zero Screening Fatigue & Faster Turnaround',
        desc: 'Review curated portfolios with live proof-of-work instead of sifting through hundreds of generic CVs.',
      },
      {
        title: '10x AI-Workflow Productivity',
        desc: 'Our graduates use modern AI, research, and automation workflows natively to deliver faster output on real business tasks.',
      },
      {
        title: 'Custom Campus & Role-Specific Drives',
        desc: 'Dedicated hiring sprints tailored to your exact tech stack, internship roles, or full-time fresher requirements.',
      },
    ],
  },
];

export default function Home() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.rv').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const [step, setStep] = useState(0);
  const [activeTrack, setActiveTrack] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const stage = step % 4;
    // Typing stages fast (1.3s), reading Q&A stages comfortable (2.4s & 3.6s)
    const delay = stage === 0 || stage === 2 ? 1300 : stage === 1 ? 2200 : 3600;
    const timer = setTimeout(() => {
      setStep((prev) => (prev + 1) % (FAQS.length * 4));
    }, delay);
    return () => clearTimeout(timer);
  }, [step, paused]);

const [activeSec, setActiveSec] = useState('about');

useEffect(() => {
  const ids = ['about', 'skills', 'experience', 'projects', 'partners', 'faq', 'contact'];
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
        {NAV.map(([t, h]) => (
          <a key={t} href={h}>{t}</a>
        ))}
      </nav>

      <aside className="side-dots" aria-label="Section progress">
  {[
    ['Top', 'about'],
    ['Pathways', 'skills'],
    ['Engines', 'experience'],
    ['Drives', 'projects'],
    ['Collaborate', 'partners'],
    ['FAQ', 'faq'],
    ['Connect', 'contact'],
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

      <main className="wrap">
        <header className="hero" id="about">
          <div>
            <span className="tag">Gwalior&apos;s Student-Led AI &amp; Career Hub</span>
            <h1 className="nm" aria-label="AIMVIRTUE">
              {NAME.map((w, wi) => (
                <span className="w" key={w} aria-hidden="true">
                  {[...w].map((ch, i) => (
                    <span
                      key={i}
                      style={{
                        animationDelay: `${(wi * 7 + i) * 0.06}s, ${1.6 + (wi * 7 + i) * 0.12}s`,
                      }}
                    >
                      {ch}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
            <h2 className="sub">
              Bridging classrooms to careers with <span className="grad">Applied Intelligence</span>.
            </h2>
            <p>
              By Students, For Students. From demystifying AI for school minds to engineering job-ready tech talent for top companies-we are your lifelong learning &amp; career partner.
            </p>
            <div className="cta">
              <a className="btn" href="#projects">Explore Programs</a>
              <a className="btn" href="#contact">Schedule a Workshop</a>
              <a className="btn" href="#contact">Become a Partner</a>
            </div>
            <div className="stats">
              {STATS.map(([n, l]) => (
                <div className="stat rv" key={l}>
                  <b className="grad">{n}</b>
                  <span>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </header>

        <section id="skills">
          <span className="tag">Choose Your Roadmap</span>
          <h2>Select your stage to see how we transform it</h2>

          <div className="track-tabs" role="tablist">
            {TRACKS.map((t, idx) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={activeTrack === idx}
                className={`track-tab${activeTrack === idx ? ' active' : ''}`}
                onClick={() => setActiveTrack(idx)}
              >
                {t.tab}
              </button>
            ))}
          </div>

          {(() => {
            const current = TRACKS[activeTrack];
            return (
              <Win>
                <div className="track-panel" key={current.id}>
                  <div className="track-journey">
                    <div>
                      <span className="tag" style={{ marginBottom: '10px' }}>{current.pillar}</span>
                      <h3 style={{ fontSize: '20px', lineHeight: '1.35', margin: '0 0 14px' }}>
                        {current.headline}
                      </h3>
                    </div>

                    <div className="journey-step">
                      <small>Where You Start (Current Challenge)</small>
                      <p>{current.before}</p>
                    </div>

                    <div className="journey-step after">
                      <small>Where You Land (AIMVIRTUE Outcome)</small>
                      <p>{current.after}</p>
                    </div>
                  </div>

                  <div className="track-details">
                    <div>
                      <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--mut)', marginBottom: '12px' }}>
                        Core Skills &amp; Tools You Master
                      </h4>
                      <div className="chips" style={{ marginBottom: '18px' }}>
                        {current.skills.map(([n, i, c], k) => (
                          <Chip key={n} n={n} i={i} c={c} d={k} />
                        ))}
                      </div>

                      <ul className="track-points">
                        {current.takeaways.map((point) => (
                          <li key={point}>
                            <FiCheckCircle />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ paddingTop: '12px', display: 'flex', justifyContent: 'center' }}>
                      <a
                        className="link"
                        style={{ marginTop: 0 }}
                        href={current.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {current.cta} ↗
                      </a>
                    </div>
                  </div>
                </div>
              </Win>
            );
          })()}
        </section>

        <section id="experience">
          <span className="tag">How We Operate</span>
          <h2>From first spark to final placement</h2>
          {JOBS.map((j) => (
            <Win className="job" key={j.role}>
              <div className="job-top">
                <div className="job-title">
                  <span className="job-mark"><FiBriefcase /></span>
                  <div>
                    <h3>{j.role}</h3>
                    <div className="org"><FiMapPin />{j.org}</div>
                  </div>
                </div>
                <span className="job-date"><FiCalendar />{j.date}</span>
              </div>
              <div className="job-highlights">
                {j.points.map(({ title, text, Icon }) => (
                  <div className="job-highlight" key={title}>
                    <span className="highlight-icon"><Icon /></span>
                    <div><h4>{title}</h4><p>{text}</p></div>
                  </div>
                ))}
              </div>
            </Win>
          ))}
        </section>

        <section id="projects">
          <span className="tag">On-Ground Initiatives</span>
          <h2>Campaigns &amp; Drives in Motion</h2>
          <div className="grid">
            {PROJECTS.map((p) => (
              <Win key={p.name}>
                <div className={`thumb${p.img ? ' shot' : ''}`}>
                  {p.badge && <div className="live">{p.badge}</div>}
                  {p.img ? (
                    <img src={p.img} alt={`${p.name} preview`} loading="lazy" />
                  ) : (
                    <>
                      <b>{p.name}</b>
                      <span>{p.tag}</span>
                    </>
                  )}
                </div>
                {p.img && (
                  <h3 className="pn">
                    {p.name}
                    <small>{p.tag}</small>
                  </h3>
                )}
                <p className="pd">{p.desc}</p>
                <a className="link" href="#contact">{p.cta} ↗</a>
              </Win>
            ))}
          </div>
        </section>

        <section id="partners">
          <span className="tag">Strategic Partnerships</span>
          <h2>Institutions that educate &amp; Companies that hire</h2>
          <div className="partner-grid">
            {PARTNERS.map((p, idx) => {
              const Icon = idx === 0 ? FiBookOpen : FiBriefcase;
              return (
                <Win key={p.id} className="partner-card">
                  <div>
                    <div className="partner-head">
                      <span className="partner-icon"><Icon /></span>
                      <div>
                        <small>{p.audience}</small>
                        <h3>{p.title}</h3>
                      </div>
                    </div>
                    <p className="partner-sub">{p.subtitle}</p>
                  </div>

                  <ul className="partner-list">
                    {p.points.map((pt) => (
                      <li key={pt.title}>
                        <FiCheckCircle />
                        <div>
                          <b>{pt.title}</b>
                          <span>{pt.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="partner-foot">
                    <span className="partner-badge">{p.badge}</span>
                    <a
                      className="link"
                      style={{ marginTop: 0 }}
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {p.cta} ↗
                    </a>
                  </div>
                </Win>
              );
            })}
          </div>
        </section>

        <section id="faq">
          <span className="tag">Quick Answers</span>
          <h2>Questions every campus &amp; learner asks</h2>
          <Win>
            <div
              className="chat-box"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {(() => {
                const qIndex = Math.floor(step / 4);
                const stage = step % 4;
                const current = FAQS[qIndex];

                return (
                  <>
                    {stage === 0 && (
                      <div key={`tq-${qIndex}`} className="typing q">
                        {current.sender} is typing <i /><i /><i />
                      </div>
                    )}

                    {stage >= 1 && (
                      <div key={`q-${qIndex}`} className="msg q">
                        <div className="msg-head">
                          <span>{current.sender}</span>
                          <span>
                            {String(qIndex + 1).padStart(2, '0')} / {String(FAQS.length).padStart(2, '0')}
                          </span>
                        </div>
                        <p>{current.q}</p>
                      </div>
                    )}

                    {stage === 2 && (
                      <div key={`ta-${qIndex}`} className="typing a">
                        AIMVIRTUE Official is typing <i /><i /><i />
                      </div>
                    )}

                    {stage === 3 && (
                      <div key={`a-${qIndex}`} className="msg a">
                        <div className="msg-head">
                          <span>AIMVIRTUE Official</span>
                          <span>✓ Verified Reply</span>
                        </div>
                        <p>{current.a}</p>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </Win>
        </section>

        <section id="contact">
          <Win className="contact">
            <span className="tag">Connect With Us</span>
            <h2>Bring AIMVIRTUE to your Campus or Company</h2>
            <p>
              Whether you are a School Principal scheduling a complimentary &quot;Seed To Start&quot; AI workshop, a student leveling up your career, or a company hiring pre-vetted talent - let&apos;s build together.
            </p>
            <div className="links">
              <a
                className="icon-btn"
                href="mailto:helloaimvirtue@gimail.com"
                title="Mail Us"
                aria-label="Mail Us"
              >
                <FiMail />
              </a>
              <a
                className="icon-btn"
                href="https://wa.me/916388640308?text=Hi%20AIMVIRTUE%20Team%2C%20I%20would%20like%20to%20connect%20regarding..."
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp Us"
                aria-label="WhatsApp Us"
              >
                <FaWhatsapp />
              </a>
              <a
                className="icon-btn"
                href="https://www.google.com/maps/search/?api=1&query=7th+Floor%2C+Keshar+Tower%2C+Racecourse+Rd%2C+Gwalior%2C+Madhya+Pradesh%2C+India"
                target="_blank"
                rel="noopener noreferrer"
                title="Visit Our Office (Gwalior HQ)"
                aria-label="Visit Our Office"
              >
                <FiMapPin />
              </a>
              <a
                className="icon-btn"
                href="https://instagram.com/theaimvirtue"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                aria-label="Instagram"
              >
                <FiInstagram />
              </a>
              <a
                className="icon-btn"
                href="https://www.linkedin.com/company/aimvirtue/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <FiLinkedin />
              </a>
            </div>
          </Win>
        </section>
      </main>
      <div className="subpages-bar">
        <a href="/team">Our Team</a>
        <a href="/verify">Verify Certificate</a>
        <a href="/feedback">Feedback</a>
      </div>

      <footer>
        © {new Date().getFullYear()} AIMVIRTUE
      </footer>
    </>
  );
}
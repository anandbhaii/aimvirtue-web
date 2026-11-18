'use client';
import { useEffect, useRef, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import {
  FiCompass, FiMessageSquare, FiRefreshCw, FiSend, FiX,
} from 'react-icons/fi';

// Branching Question Trees (Har Role ke liye alag-alag questions)
const FLOWS = {
  'School Student (8th–12th)': {
    q1: {
      text: 'Awesome! Aap abhi kaunsi class mein ho?',
      options: ['Class 8th – 9th', 'Class 10th (Boards)', 'Class 11th – 12th'],
    },
    q2: {
      text: 'Abhi aapka sabse bada focus ya challenge kya hai?',
      options: [
        'AI tools ko sahi & ethical tareeke se seekhna',
        'Exam revision & tough topics jaldi samajhna',
        '12th ke baad sahi tech career choose karna',
      ],
    },
    getPlan: (ans) => ({
      track: 'Seed To Start - School AI Literacy Track',
      summary: `${ans.q1} ke students ke liye humara NEP 2020-aligned workshop best rahega - jahan aap bina cheating ke Socratic AI prompting, cyber safety, aur smart study workflows seekhoge.`,
      ctaLabel: 'Request Free Workshop in My School',
      waMsg: `Hi AIMVIRTUE! Main ${ans.name} hoon (${ans.q1}). Main apne school mein Seed To Start AI Literacy Workshop ke baare mein baat karna chahta/chahti hoon. Focus: ${ans.q2}.`,
    }),
  },

  'College Builder': {
    q1: {
      text: 'Great! Aapka current tech / coding level kya hai?',
      options: ['Beginner (Abhi start kiya hai)', 'Intermediate (Basic coding aati hai)', 'Builder (Projects bana chuka hoon)'],
    },
    q2: {
      text: 'Aap AIMVIRTUE ke saath kya achieve karna chahte ho?',
      options: [
        '48-Hour Builder Sprint mein live AI/Web product banana',
        'Strong GitHub portfolio & internship readiness',
        'Apne college mein AIMVIRTUE workshop organize karna',
      ],
    },
    getPlan: (ans) => ({
      track: 'Applied AI & Weekend Builder Sprint',
      summary: `Aapke ${ans.q1} level ke hisaab se hum aapko hands-on Weekend Builder Sprint recommend karte hain - zero boring lectures, sirf real deployment aur proof-of-work portfolio.`,
      ctaLabel: 'Join Next Builder Sprint',
      waMsg: `Hi AIMVIRTUE! Main ${ans.name} hoon (College Builder - ${ans.q1}). Mera goal hai: ${ans.q2}. Mujhe next sprint ki details chahiye.`,
    }),
  },

  'Graduate / Job Seeker': {
    q1: {
      text: 'Aap kis tarah ke role ko target kar rahe ho?',
      options: ['Software / AI / Tech Role', 'Product / Operations / Growth', 'Abhi clarity chahiye'],
    },
    q2: {
      text: 'Abhi placement ya job hunt mein sabse badi rukawat kya aa rahi hai?',
      options: [
        'Resume shortlist nahi ho raha (Skill-gap)',
        'Real-world projects & interview confidence ki kami',
        'Direct hiring companies tak reach nahi mil rahi',
      ],
    },
    getPlan: (ans) => ({
      track: 'Great To Greatness - Career & Hiring Loop',
      summary: `${ans.q1} ke liye aapko sabse pehle 1-on-1 Skill-Gap Audit aur Proof-of-Work Sprint ki zaroorat hai, jisse aap Day-1 job-ready ban kar partner companies mein place ho sakein.`,
      ctaLabel: 'Book 1-on-1 Skill-Gap Audit',
      waMsg: `Hi AIMVIRTUE! Main ${ans.name} hoon (Job Seeker - ${ans.q1}). Meri main challenge hai: ${ans.q2}. Mujhe Great To Greatness audit ke baare mein jaanna hai.`,
    }),
  },

  'School / Company Partner': {
    q1: {
      text: 'Aap kis organization ko represent kar rahe hain?',
      options: ['School (Principal / Coordinator)', 'College / University', 'Startup / Hiring Company'],
    },
    q2: {
      text: 'Aap AIMVIRTUE ke saath kis tarah collaborate karna chahte hain?',
      options: [
        'Complimentary School AI Literacy Session',
        'Campus Builder Sprint / Hackathon',
        'Pre-vetted Freshers Hire karna (Zero Hiring Fee)',
      ],
    },
    getPlan: (ans) => ({
      track: 'Institutional & B2B Partnership Desk',
      summary: `${ans.q1} partners ke liye humari Gwalior HQ team end-to-end execution handle karti hai - zero administrative burden ke saath measurable student & hiring outcomes.`,
      ctaLabel: 'Connect with Partnerships Team',
      waMsg: `Hello AIMVIRTUE Team! Main ${ans.name} (${ans.q1}) se baat kar raha/rahi hoon. Hum "${ans.q2}" ke liye collaborate karna chahte hain.`,
    }),
  },
};

export default function SarthiBot() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState('ask_name'); // ask_name | ask_role | ask_q1 | ask_q2 | result
  const [nameInput, setNameInput] = useState('');
  const [answers, setAnswers] = useState({ name: '', role: '', q1: '', q2: '' });
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: 'Namaste! Main SARTHI hoon - aapka AIMVIRTUE career aur AI mentor. Shuru karne se pehle, aapka shubh naam kya hai?',
    },
  ]);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, step, open]);

  const resetChat = () => {
    setStep('ask_name');
    setNameInput('');
    setAnswers({ name: '', role: '', q1: '', q2: '' });
    setMessages([
      {
        from: 'bot',
        text: 'Namaste! Main SARTHI hoon - aapka AIMVIRTUE career aur AI mentor. Shuru karne se pehle, aapka shubh naam kya hai?',
      },
    ]);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    const cleanName = nameInput.trim();
    if (!cleanName) return;

    setAnswers((prev) => ({ ...prev, name: cleanName }));
    setMessages((prev) => [
      ...prev,
      { from: 'user', text: cleanName },
      {
        from: 'bot',
        text: `Badhiya ${cleanName}! Ab bataiye aap abhi kis stage par hain? (Isse main aapse sahi sawal pooch paunga)`,
      },
    ]);
    setNameInput('');
    setStep('ask_role');
  };

  const handleRoleSelect = (role) => {
    const flow = FLOWS[role];
    setAnswers((prev) => ({ ...prev, role }));
    setMessages((prev) => [
      ...prev,
      { from: 'user', text: role },
      { from: 'bot', text: flow.q1.text },
    ]);
    setStep('ask_q1');
  };

  const handleQ1Select = (opt) => {
    const flow = FLOWS[answers.role];
    setAnswers((prev) => ({ ...prev, q1: opt }));
    setMessages((prev) => [
      ...prev,
      { from: 'user', text: opt },
      { from: 'bot', text: flow.q2.text },
    ]);
    setStep('ask_q2');
  };

  const handleQ2Select = (opt) => {
    const updated = { ...answers, q2: opt };
    const flow = FLOWS[answers.role];
    const plan = flow.getPlan(updated);

    setAnswers(updated);
    setMessages((prev) => [
      ...prev,
      { from: 'user', text: opt },
      {
        from: 'bot',
        text: `${updated.name}, aapke answers ke hisaab se aapka personalized roadmap ready hai:`,
        plan,
      },
    ]);
    setStep('result');
  };

  const currentFlow = FLOWS[answers.role];

  return (
    <>
      {/* Floating SARTHI Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open SARTHI Assistant"
        style={{
          position: 'fixed',
          right: '20px',
          bottom: '20px',
          zIndex: 90,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: open ? '12px' : '12px 18px',
          borderRadius: '999px',
          border: '1px solid rgba(255, 122, 26, 0.55)',
          background: 'linear-gradient(135deg, #1b130e, #0f0a08)',
          color: 'var(--tx)',
          fontWeight: 700,
          fontSize: '14px',
          cursor: 'pointer',
          boxShadow: '0 12px 34px rgba(0, 0, 0, 0.65), 0 0 24px rgba(255, 122, 26, 0.25)',
        }}
      >
        <span
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--ac), #d95b00)',
            color: '#fff',
            display: 'grid',
            placeItems: 'center',
            fontSize: '15px',
          }}
        >
          {open ? <FiX /> : <FiCompass />}
        </span>
        {!open && <span>Ask SARTHI</span>}
      </button>

      {/* SARTHI Chat Window */}
      {open && (
        <div
          style={{
            position: 'fixed',
            right: '20px',
            bottom: '80px',
            width: 'min(390px, calc(100vw - 32px))',
            height: '520px',
            maxHeight: 'calc(100vh - 110px)',
            zIndex: 95,
            borderRadius: '18px',
            border: '1px solid rgba(255, 122, 26, 0.35)',
            background: 'linear-gradient(180deg, #140f0c, #0a0706)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '14px 16px',
              borderBottom: '1px solid var(--line)',
              background: 'rgba(255, 122, 26, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, var(--ac), #d95b00)',
                  color: '#fff',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '17px',
                }}
              >
                <FiCompass />
              </span>
              <div>
                <b style={{ fontSize: '14.5px', color: 'var(--tx)', display: 'block', lineHeight: 1.2 }}>
                  SARTHI · AIMVIRTUE AI
                </b>
                <span style={{ fontSize: '11.5px', color: '#22c55e', fontWeight: 600 }}>
                  ● Online · Personalized Path Finder
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                type="button"
                onClick={resetChat}
                title="Restart Chat"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--line)',
                  color: 'var(--mut)',
                  borderRadius: '8px',
                  padding: '6px',
                  cursor: 'pointer',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <FiRefreshCw size={14} />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                title="Close"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--line)',
                  color: 'var(--mut)',
                  borderRadius: '8px',
                  padding: '6px',
                  cursor: 'pointer',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <FiX size={15} />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '86%',
                }}
              >
                <div
                  style={{
                    padding: '10px 13px',
                    borderRadius: m.from === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                    background: m.from === 'user'
                      ? 'linear-gradient(135deg, var(--ac), #d95b00)'
                      : 'rgba(255, 255, 255, 0.04)',
                    border: m.from === 'user' ? 'none' : '1px solid var(--line)',
                    color: m.from === 'user' ? '#fff' : 'var(--tx)',
                    fontSize: '13.5px',
                    lineHeight: 1.5,
                  }}
                >
                  {m.text}
                </div>

                {/* Final Personalized Recommendation Card */}
                {m.plan && (
                  <div
                    style={{
                      marginTop: '10px',
                      padding: '14px',
                      borderRadius: '14px',
                      background: 'rgba(255, 122, 26, 0.08)',
                      border: '1px solid rgba(255, 122, 26, 0.35)',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: 'var(--ac2)',
                        display: 'block',
                        marginBottom: '4px',
                      }}
                    >
                      Recommended Track
                    </span>
                    <b style={{ fontSize: '14.5px', color: 'var(--tx)', display: 'block', marginBottom: '6px' }}>
                      {m.plan.track}
                    </b>
                    <p style={{ fontSize: '12.5px', color: 'var(--mut)', lineHeight: 1.5, margin: '0 0 12px' }}>
                      {m.plan.summary}
                    </p>
                    <a
                      href={`https://wa.me/916388640308?text=${encodeURIComponent(m.plan.waMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '7px',
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, var(--ac), #d95b00)',
                        color: '#fff',
                        fontSize: '13px',
                        fontWeight: 700,
                        textDecoration: 'none',
                      }}
                    >
                      <FaWhatsapp size={16} /> {m.plan.ctaLabel}
                    </a>
                  </div>
                )}
              </div>
            ))}

            {/* Dynamic Choice Buttons based on Current Step */}
            {step === 'ask_role' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
                {Object.keys(FLOWS).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleRoleSelect(role)}
                    style={{
                      textAlign: 'left',
                      padding: '9px 12px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 122, 26, 0.3)',
                      background: 'rgba(255, 122, 26, 0.06)',
                      color: 'var(--ac2)',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    → {role}
                  </button>
                ))}
              </div>
            )}

            {step === 'ask_q1' && currentFlow && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
                {currentFlow.q1.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleQ1Select(opt)}
                    style={{
                      textAlign: 'left',
                      padding: '9px 12px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 122, 26, 0.3)',
                      background: 'rgba(255, 122, 26, 0.06)',
                      color: 'var(--ac2)',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    → {opt}
                  </button>
                ))}
              </div>
            )}

            {step === 'ask_q2' && currentFlow && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
                {currentFlow.q2.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleQ2Select(opt)}
                    style={{
                      textAlign: 'left',
                      padding: '9px 12px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 122, 26, 0.3)',
                      background: 'rgba(255, 122, 26, 0.06)',
                      color: 'var(--ac2)',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    → {opt}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input Footer (Active on Name step, or Reset on Result step) */}
          {step === 'ask_name' ? (
            <form
              onSubmit={handleNameSubmit}
              style={{
                padding: '10px 12px',
                borderTop: '1px solid var(--line)',
                display: 'flex',
                gap: '8px',
                background: '#080605',
              }}
            >
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Apna naam likhein..."
                style={{
                  flex: 1,
                  padding: '9px 12px',
                  borderRadius: '10px',
                  border: '1px solid var(--line)',
                  background: '#110d0b',
                  color: 'var(--tx)',
                  fontSize: '13.5px',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                aria-label="Send Name"
                style={{
                  padding: '0 14px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(135deg, var(--ac), #d95b00)',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <FiSend size={15} />
              </button>
            </form>
          ) : (
            <div
              style={{
                padding: '9px 14px',
                borderTop: '1px solid var(--line)',
                background: '#080605',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '11.5px',
                color: 'var(--mut)',
              }}
            >
              <span>Powered by AIMVIRTUE</span>
              <button
                type="button"
                onClick={resetChat}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--ac2)',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '12px',
                }}
              >
                Start Over ↺
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  FiCheckCircle, FiLock, FiSend, FiStar,
} from 'react-icons/fi';

const FEEDBACK_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzI1pbMQnNTiECsQLOGTcYmEmjCYDxjj6omj48NfPfUcfrRcXSK68DMqbekXIt9wGRdng/exec';

const ROLES = [
  'School Student',
  'Principal / Educator',
  'College Builder',
  'Graduate / Job Seeker',
  'Corporate Partner',
  'Visitor / Suggestion',
];

const PROGRAMS = [
  'Seed To Start (School Workshop)',
  'Weekend AI & Builder Sprint',
  'Great To Greatness (Career Audit)',
  'Website / General Suggestion',
];

export default function FeedbackPage() {
  const [role, setRole] = useState('School Student');
  const [program, setProgram] = useState('Seed To Start (School Workshop)');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [org, setOrg] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || submitting) return;

    setSubmitting(true);
    try {
      if (FEEDBACK_SCRIPT_URL && !FEEDBACK_SCRIPT_URL.includes('YOUR_GOOGLE_APPS_SCRIPT')) {
        await fetch(FEEDBACK_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim() || 'Anonymous',
            role,
            institution: org.trim() || 'Not specified',
            program,
            rating: `${rating}/5`,
            message: message.trim(),
          }),
        });
      }
      setSubmitted(true);
    } catch (err) {
      console.error('Feedback submit error:', err);
      alert('Network issue - please try again in a moment.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <nav className="nav">
        <Link href="/">Home</Link>
        <Link href="/#skills">Pathways</Link>
        <Link href="/team">Our Team</Link>
        <Link href="/verify">Verify</Link>
      </nav>

      <main className="wrap" style={{ paddingTop: '120px', paddingBottom: '50px', minHeight: '85vh' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 38px' }}>
          <span className="tag">Feedback &amp; Ideas</span>
          <h1
            style={{
              fontSize: 'clamp(30px, 5vw, 52px)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              margin: '20px 0 14px',
            }}
          >
            Help Us Build <span className="grad">AIMVIRTUE</span> Better
          </h1>
          <p style={{ color: 'var(--mut)', fontSize: '16.5px', lineHeight: 1.6 }}>
            Attended a workshop, completed a sprint, or have an idea for our team? Share your honest review or suggestion directly-no phone number or login required.
          </p>
        </div>

        {/* Form Card */}
        <div className="win rv in" style={{ maxWidth: '680px', margin: '0 auto', padding: '26px 28px' }}>
          <div className="dots"><i /><i /><i /></div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '28px 10px' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(34, 197, 94, 0.14)',
                  color: '#22c55e',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '28px',
                  margin: '0 auto 14px',
                }}
              >
                <FiCheckCircle />
              </div>
              <h2 style={{ fontSize: '24px', margin: '0 0 8px' }}>
                Feedback Recorded!
              </h2>
              <p style={{ color: 'var(--mut)', fontSize: '15px', maxWidth: '460px', margin: '0 auto 22px' }}>
                Thank you for sharing your thoughts. Your response has been safely logged with the AIMVIRTUE core team.
              </p>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                style={{ background: 'transparent', color: 'var(--ac2)', cursor: 'pointer' }}
              >
                Submit Another Suggestion
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Role Pills */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--mut)', marginBottom: '10px' }}>
                  1. Who are you?
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {ROLES.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`track-tab${role === r ? ' active' : ''}`}
                      style={{ padding: '8px 14px', fontSize: '13px' }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Program Select */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--mut)', marginBottom: '8px' }}>
                  2. Which experience or area is this about?
                </label>
                <select
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
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
                >
                  {PROGRAMS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              {/* Star Rating */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--mut)' }}>
                    3. Rate your overall experience
                  </label>
                  <span style={{ fontSize: '13px', color: 'var(--ac2)', fontWeight: 700, whiteSpace: 'nowrap' }}>
                    {rating}/5 Stars
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  {[1, 2, 3, 4, 5].map((star) => {
                    const active = (hoverRating || rating) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        aria-label={`Rate ${star} stars`}
                        style={{
                          flex: '1 1 42px',
                          maxWidth: '52px',
                          background: 'rgba(255,255,255,0.03)',
                          border: `1px solid ${active ? 'rgba(255, 122, 26, 0.5)' : 'var(--line)'}`,
                          borderRadius: '10px',
                          padding: '9px 0',
                          cursor: 'pointer',
                          color: active ? '#ff7a1a' : 'var(--mut)',
                          fontSize: '19px',
                          display: 'grid',
                          placeItems: 'center',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <FiStar style={{ fill: active ? '#ff7a1a' : 'transparent' }} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Campus */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--mut)', marginBottom: '6px' }}>
                    Your Name (Optional - can stay Anonymous)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Riya Verma"
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
                    School / College / City (Optional)
                  </label>
                  <input
                    type="text"
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                    placeholder="e.g. Gwalior"
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

              {/* Feedback Message */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--mut)', marginBottom: '8px' }}>
                  4. Your Feedback, Review, or Suggestion *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you loved, what we can improve, or any new workshop topic you want AIMVIRTUE to launch..."
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1px solid var(--line)',
                    background: '#080605',
                    color: 'var(--tx)',
                    fontSize: '14.5px',
                    lineHeight: 1.55,
                    resize: 'vertical',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Privacy Note + Submit Button */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '4px' }}>
                <span style={{ fontSize: '12.5px', color: 'var(--mut)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <FiLock color="var(--ac)" /> 100% Private · No phone number or account login required
                </span>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn"
                  style={{
                    background: 'linear-gradient(135deg, var(--ac), #d95b00)',
                    color: '#fff',
                    border: 'none',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '14px 24px',
                    fontSize: '15px',
                    opacity: submitting ? 0.75 : 1,
                  }}
                >
                  <FiSend /> {submitting ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </div>
            </form>
          )}
        </div>
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
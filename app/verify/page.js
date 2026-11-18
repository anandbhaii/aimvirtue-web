'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  FiAlertCircle, FiAward, FiCalendar, FiCheckCircle,
  FiMapPin, FiSearch, FiShield, FiUser,
} from 'react-icons/fi';

// Apna Google Sheet "Publish to web -> CSV" link yahan paste karein:
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQGDsuneSFj0Te_v2C9hLI83d7Hd0cE-IDMzqD2VaL0Mvhy9V2e7JFJPx4sn8zC72EnjYO_JTfkeCYA/pub?gid=0&single=true&output=csv';

// Fallback demo data (jab tak aap apna Sheet URL paste nahi karte, testing ke liye kaam karega)
const DEMO_CERTS = [
  {
    id: 'AV-2026-001',
    name: 'Aarav Sharma',
    institution: 'Delhi Public School, Gwalior',
    program: 'Seed To Start - AI Literacy Workshop',
    date: '18 Nov 2026',
    grade: 'Verified Participant',
  },
];

function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
  return lines.slice(1).map((line) => {
    const values = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || line.split(',');
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = (values[i] || '').replace(/^"|"$/g, '').trim();
    });
    return obj;
  });
}

function VerifyContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null); // { status: 'found' | 'not_found', data?: object }

  // Google Sheet se live data fetch karna
  useEffect(() => {
    async function loadSheet() {
      if (!SHEET_CSV_URL || SHEET_CSV_URL.includes('YOUR_GOOGLE_SHEET')) {
        setCerts(DEMO_CERTS);
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${SHEET_CSV_URL}&t=${Date.now()}`, { cache: 'no-store' });
        const csvText = await res.text();
        const parsed = parseCSV(csvText);
        setCerts(parsed);
      } catch (err) {
        console.error('Sheet fetch error:', err);
        setCerts(DEMO_CERTS);
      } finally {
        setLoading(false);
      }
    }
    loadSheet();
  }, []);

  // Agar URL mein ?id=AV-2026-001 ho (QR Code scan karne par), toh auto-verify karega
  useEffect(() => {
    if (loading) return;
    const urlId = searchParams.get('id');
    if (urlId) {
      setQuery(urlId);
      runSearch(urlId, certs);
    }
  }, [loading, searchParams, certs]);

  const runSearch = (rawId, list = certs) => {
    const cleanId = rawId.trim().toUpperCase();
    if (!cleanId) return;
    const match = list.find((c) => (c.id || '').toUpperCase() === cleanId);
    if (match) {
      setResult({ status: 'found', data: match });
    } else {
      setResult({ status: 'not_found', searchedId: cleanId });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runSearch(query);
  };

  return (
    <main className="wrap" style={{ paddingTop: '120px', paddingBottom: '60px', minHeight: '85vh' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 38px' }}>
        <span className="tag">Credential Verification</span>
        <h1
          style={{
            fontSize: 'clamp(30px, 5vw, 52px)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            margin: '20px 0 14px',
          }}
        >
          Verify an <span className="grad">AIMVIRTUE</span> Certificate
        </h1>
        <p style={{ color: 'var(--mut)', fontSize: '16.5px', lineHeight: 1.6 }}>
          Enter the unique Certificate ID printed on the credential (e.g., <strong style={{ color: 'var(--tx)' }}>AV-2026-001</strong>) to confirm its authenticity instantly.
        </p>
      </div>

      {/* Search Box Card */}
      <div className="win rv in" style={{ maxWidth: '640px', margin: '0 auto 28px', padding: '24px' }}>
        <div className="dots"><i /><i /><i /></div>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
          }}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Certificate ID (e.g. AV-2026-001)"
            aria-label="Certificate ID"
            style={{
              flex: '1 1 240px',
              padding: '13px 16px',
              borderRadius: '12px',
              border: '1px solid var(--line)',
              background: '#080605',
              color: 'var(--tx)',
              fontSize: '15px',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            disabled={loading}
            className="btn"
            style={{
              background: 'linear-gradient(135deg, var(--ac), #d95b00)',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '13px 24px',
            }}
          >
            <FiSearch /> {loading ? 'Syncing...' : 'Verify Now'}
          </button>
        </form>
      </div>

      {/* Result Display: VERIFIED */}
      {result?.status === 'found' && (
        <div
          className="win rv in"
          style={{
            maxWidth: '640px',
            margin: '0 auto',
            padding: '26px',
            borderColor: 'rgba(34, 197, 94, 0.5)',
            boxShadow: '0 18px 50px rgba(34, 197, 94, 0.12)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
            <span
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                display: 'grid',
                placeItems: 'center',
                background: 'rgba(34, 197, 94, 0.14)',
                color: '#22c55e',
                fontSize: '22px',
              }}
            >
              <FiCheckCircle />
            </span>
            <div>
              <span
                style={{
                  fontSize: '11.5px',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#22c55e',
                  display: 'block',
                }}
              >
                ✓ Official Verified Credential
              </span>
              <h2 style={{ fontSize: '22px', margin: '2px 0 0', color: 'var(--tx)' }}>
                {result.data.name}
              </h2>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '12px',
              padding: '16px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--line)',
            }}
          >
            <div>
              <small style={{ color: 'var(--mut)', fontSize: '11.5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiShield color="var(--ac)" /> Certificate ID
              </small>
              <b style={{ fontSize: '14.5px', color: 'var(--ac2)' }}>{result.data.id}</b>
            </div>

            <div>
              <small style={{ color: 'var(--mut)', fontSize: '11.5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiAward color="var(--ac)" /> Program / Track
              </small>
              <b style={{ fontSize: '14.5px', color: 'var(--tx)' }}>{result.data.program}</b>
            </div>

            <div>
              <small style={{ color: 'var(--mut)', fontSize: '11.5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiMapPin color="var(--ac)" /> School / Campus
              </small>
              <b style={{ fontSize: '14.5px', color: 'var(--tx)' }}>{result.data.institution}</b>
            </div>

            <div>
              <small style={{ color: 'var(--mut)', fontSize: '11.5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiCalendar color="var(--ac)" /> Issue Date &amp; Standing
              </small>
              <b style={{ fontSize: '14.5px', color: 'var(--tx)' }}>
                {result.data.date} {result.data.grade ? `· ${result.data.grade}` : ''}
              </b>
            </div>
          </div>
        </div>
      )}

      {/* Result Display: NOT FOUND */}
      {result?.status === 'not_found' && (
        <div
          className="win rv in"
          style={{
            maxWidth: '640px',
            margin: '0 auto',
            padding: '22px 24px',
            borderColor: 'rgba(239, 68, 68, 0.45)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <FiAlertCircle style={{ color: '#ef4444', fontSize: '24px', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h3 style={{ fontSize: '17px', color: '#f87171', margin: '0 0 4px' }}>
                Certificate ID &ldquo;{result.searchedId}&rdquo; Not Found
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--mut)', margin: 0, lineHeight: 1.55 }}>
                Please double-check the ID printed on the bottom corner of your certificate. If you recently completed a workshop, records take up to 24 hours to sync.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function VerifyPage() {
  return (
    <>
      <nav className="nav">
        <Link href="/">Home</Link>
        <Link href="/#skills">Pathways</Link>
        <Link href="/team">Our Team</Link>
        <Link href="/#contact">Connect</Link>
      </nav>

      <Suspense fallback={<div style={{ paddingTop: '140px', textAlign: 'center', color: 'var(--mut)' }}>Loading Verification Portal...</div>}>
        <VerifyContent />
      </Suspense>

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
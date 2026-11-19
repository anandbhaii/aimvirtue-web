'use client';
import { useEffect, useRef, useState } from 'react';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';

export default function SoundEffects() {
  const [enabled, setEnabled] = useState(true);
  const enabledRef = useRef(true);
  const audioCtxRef = useRef(null);
  const lastHoveredEl = useRef(null);
  const lastPlayTime = useRef(0);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  useEffect(() => {
    const getContext = () => {
      if (typeof window === 'undefined') return null;
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => {});
      }
      return audioCtxRef.current;
    };

    // Ultra-lightweight synthesized tactile sounds (Zero network/file lag)
    const playTone = (type) => {
      if (!enabledRef.current) return;
      const nowMs = performance.now();
      // Cooldown prevents lag when sweeping mouse fast across many elements
      if (type === 'hover' && nowMs - lastPlayTime.current < 55) return;
      lastPlayTime.current = nowMs;

      const ctx = getContext();
      if (!ctx || ctx.state !== 'running') return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === 'hover') {
        // Subtle soft glass tick
        osc.type = 'sine';
        osc.frequency.setValueAtTime(760, now);
        osc.frequency.exponentialRampToValueAtTime(380, now + 0.025);

        gain.gain.setValueAtTime(0.035, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.026);
      } else {
        // Crisp tactile mechanical click
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.045);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.046);
      }
    };

    const selector = 'a, button, select, .win, .stat, .job-highlight, .partner-list li, .track-tab, .chip, .icon-btn, .side-dot';

    const onMouseOver = (e) => {
      if (!enabledRef.current) return;
      const target = e.target.closest(selector);
      if (target && target !== lastHoveredEl.current) {
        lastHoveredEl.current = target;
        playTone('hover');
      } else if (!target) {
        lastHoveredEl.current = null;
      }
    };

    const onPointerDown = (e) => {
      // Unlock audio context on first user tap/click
      const ctx = getContext();
      if (!enabledRef.current || !ctx) return;
      const target = e.target.closest(selector);
      if (target) {
        playTone('click');
      }
    };

    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('pointerdown', onPointerDown, { passive: true });

    return () => {
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => setEnabled((prev) => !prev)}
      aria-label={enabled ? 'Mute UI Sounds' : 'Unmute UI Sounds'}
      title={enabled ? 'Sound On (Click to Mute)' : 'Sound Off (Click to Unmute)'}
      style={{
        position: 'fixed',
        left: '20px',
        bottom: '20px',
        zIndex: 90,
        width: '44px',
        height: '44px',
        borderRadius: '999px',
        border: '1px solid rgba(255, 122, 26, 0.38)',
        background: 'linear-gradient(135deg, #1b130e, #0f0a08)',
        color: enabled ? 'var(--ac2)' : 'var(--mut)',
        display: 'grid',
        placeItems: 'center',
        fontSize: '18px',
        cursor: 'pointer',
        boxShadow: '0 10px 28px rgba(0, 0, 0, 0.6)',
        transition: 'transform 0.2s ease, color 0.2s ease',
      }}
    >
      {enabled ? <FiVolume2 /> : <FiVolumeX />}
    </button>
  );
}
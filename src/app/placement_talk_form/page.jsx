"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import PlacementTalkForm from '../../components/PlacementTalkForm/PlacementTalkForm';
import styles from './page.module.css';

export default function PlacementTalkPage() {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  const parallaxOffset = scrollY * 0.3;

  return (
    <div className={styles.page}>
      {/* ── Background layer ─────────────── */}
      <div className={styles.bgLayer}>
        <div
          className={styles.bgWrapper}
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        >
          <Image
            src="/placement-talk-bg.webp"
            alt="Developer desk background"
            fill
            priority
            quality={95}
            className={styles.bgImg}
          />
        </div>
        {/* dark gradient overlay */}
        <div className={styles.bgOverlay} />
        {/* subtle green vignette at bottom */}
        <div className={styles.bgGlow} />
      </div>

      {/* ── Page content ─────────────────── */}
      <div className={styles.content}>

        {/* ── Hero header ──────────────────── */}
        <header className={styles.hero}>
          <div className={styles.heroChip}>
            Dept. of Computer Science &amp; Engineering
          </div>

          <h1 className={styles.heroTitle}>
            Placement
            <span className={styles.heroAccent}> Talk</span>
          </h1>

          <div className={styles.heroMeta}>
            <span className={styles.heroBadge}>v2.0.26</span>
            <span className={styles.heroDot}></span>
            <span className={styles.heroSubtitle}>career.main()</span>
          </div>

          <p className={styles.heroDesc}>
            An interactive session with our distinguished alumni from&nbsp;
            <strong>Google</strong>, <strong>Morgan Stanley</strong> &amp; more.
          </p>

          <div className={styles.heroPills}>
            {["17th April 2026", "1:45 PM Onwards", "DES Seminar Hall‑1"].map((t) => (
              <span key={t} className={styles.pill}>{t}</span>
            ))}
          </div>
        </header>

        {/* ── Form card ────────────────────── */}
        <section className={styles.formSection}>
          <div className={styles.formCard}>
            <div className={styles.formCardHeader}>
              <div className={styles.formCardDot} />
              <div className={styles.formCardDot} />
              <div className={styles.formCardDot} />
              <span className={styles.formCardTitle}>register.jsx</span>
            </div>

            <div className={styles.formCardBody}>
              <h2 className={styles.formHeading}>Secure Your Spot</h2>
              <p className={styles.formSubheading}>Open to all 1st, 2nd &amp; 3rd year students</p>
              <PlacementTalkForm />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

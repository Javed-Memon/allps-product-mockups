import { useState, useEffect, useRef } from "react";

// ─── DESIGN TOKENS ───────────────────────────────────────────────
const C = {
  navy: "#0F2A4A",
  blue: "#1B5FA8",
  blueMid: "#2E7DD6",
  blueLight: "#E8F1FB",
  teal: "#0D7E6E",
  tealLight: "#E6F5F2",
  amber: "#B45309",
  amberLight: "#FEF3C7",
  red: "#991B1B",
  redLight: "#FEE2E2",
  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray600: "#4B5563",
  gray700: "#374151",
  gray900: "#111827",
  white: "#FFFFFF",
};

// ─── ICONS ───────────────────────────────────────────────────────
const Icon = ({ name, size = 16, color = "currentColor" }) => {
  const icons = {
    check: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />,
    x: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />,
    arrow_right: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />,
    arrow_left: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />,
    user: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
    bell: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />,
    mic: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />,
    play: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />,
    pause: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
    info: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    shield: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
    star: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />,
    lightning: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
    globe: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    chat: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />,
    document: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
    download: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />,
    mail: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    people: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />,
    briefcase: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    chart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
    home: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
  };
  return (
    <svg width={size} height={size} fill="none" stroke={color} viewBox="0 0 24 24">
      {icons[name]}
    </svg>
  );
};

// ─── SHARED COMPONENTS ───────────────────────────────────────────
const Badge = ({ label, color = C.blue, bg = C.blueLight }) => (
  <span style={{ background: bg, color, fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20, letterSpacing: "0.04em", display: "inline-flex", alignItems: "center" }}>
    {label}
  </span>
);

const Tag = ({ children, color = C.gray600, bg = C.gray100 }) => (
  <span style={{ background: bg, color, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 4, border: `1px solid ${C.gray200}` }}>
    {children}
  </span>
);

const Pill = ({ children, active, onClick }) => (
  <button onClick={onClick} style={{
    padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
    background: active ? C.navy : C.white, color: active ? C.white : C.gray600,
    border: `1.5px solid ${active ? C.navy : C.gray300}`,
  }}>{children}</button>
);

const Btn = ({ children, variant = "primary", onClick, size = "md", icon, disabled }) => {
  const styles = {
    primary: { bg: C.blue, color: C.white, border: C.blue },
    secondary: { bg: C.white, color: C.gray700, border: C.gray300 },
    ghost: { bg: "transparent", color: C.blue, border: "transparent" },
    teal: { bg: C.teal, color: C.white, border: C.teal },
    danger: { bg: C.redLight, color: C.red, border: C.red },
  };
  const s = styles[variant];
  const p = size === "sm" ? "6px 14px" : size === "lg" ? "12px 28px" : "9px 20px";
  const fs = size === "sm" ? 12 : size === "lg" ? 15 : 13;
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: p, fontSize: fs, fontWeight: 600, borderRadius: 8, cursor: disabled ? "not-allowed" : "pointer",
      background: disabled ? C.gray100 : s.bg, color: disabled ? C.gray400 : s.color,
      border: `1.5px solid ${disabled ? C.gray200 : s.border}`,
      display: "inline-flex", alignItems: "center", gap: 6, transition: "all 0.15s",
      opacity: disabled ? 0.6 : 1,
    }}>
      {icon && <Icon name={icon} size={14} />}
      {children}
    </button>
  );
};

const Card = ({ children, style = {}, onClick, ...rest }) => (
  <div onClick={onClick} {...rest} style={{ background: C.white, borderRadius: 12, border: `1px solid ${C.gray200}`, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: 20, ...style }}>
    {children}
  </div>
);

const Divider = () => <div style={{ height: 1, background: C.gray200, margin: "16px 0" }} />;

const SectionTitle = ({ children, rec }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
    {rec && <span style={{ background: C.navy, color: C.white, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4, letterSpacing: "0.06em" }}>{rec}</span>}
    <h3 style={{ fontSize: 14, fontWeight: 700, color: C.gray900, margin: 0 }}>{children}</h3>
  </div>
);

const ProgressBar = ({ value, max = 100, color = C.blue, showLabel = true }) => (
  <div>
    <div style={{ height: 6, background: C.gray100, borderRadius: 99, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${(value / max) * 100}%`, background: color, borderRadius: 99, transition: "width 0.6s ease" }} />
    </div>
    {showLabel && <div style={{ fontSize: 11, color: C.gray500, marginTop: 4, textAlign: "right" }}>{value}%</div>}
  </div>
);

const RecLabel = ({ id }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 4, padding: "2px 8px", marginBottom: 10 }}>
    <Icon name="lightning" size={10} color={C.blue} />
    <span style={{ fontSize: 10, fontWeight: 700, color: C.blue, letterSpacing: "0.05em" }}>{id}</span>
  </div>
);

// ─── NAV SECTIONS ────────────────────────────────────────────────
const SECTIONS = [
  { id: "outreach", label: "Outreach", icon: "mail", desc: "First Contact & AI Sourcing" },
  { id: "interview_brief", label: "Pre-Interview", icon: "document", desc: "Briefing & Setup" },
  { id: "interview_live", label: "Live Interview", icon: "mic", desc: "During Interview UX" },
  { id: "interview_post", label: "Post-Interview", icon: "check", desc: "Completion & Feedback" },
  { id: "portal", label: "Portal", icon: "home", desc: "Candidate Dashboard" },
  { id: "profile", label: "Profile", icon: "user", desc: "AI Profile & Transparency" },
  { id: "status", label: "Status", icon: "chart", desc: "Pipeline Visibility" },
  { id: "messaging", label: "Messaging", icon: "chat", desc: "Communication Design" },
  { id: "features", label: "New Features", icon: "star", desc: "Practice & Community" },
  { id: "docs", label: "Trust Docs", icon: "shield", desc: "Rights & Transparency" },
];

// ══════════════════════════════════════════════════════════════════
// SCREEN: OUTREACH
// ══════════════════════════════════════════════════════════════════
function OutreachScreen() {
  const [lang, setLang] = useState("en");
  const [optDown, setOptDown] = useState(null);
  const [matchCard, setMatchCard] = useState(false);

  const msgs = {
    en: { greeting: "Hi Sarah,", body: "Our AI hiring platform identified your background in embedded systems and your 6-year tenure at ABB as a strong fit for this role. You were selected from a pool of 2,847 profiles based on your embedded C/C++ skills and automotive domain experience.", cta: "View Match Details →" },
    de: { greeting: "Guten Tag Frau Müller,", body: "Unsere KI-Plattform hat Ihr Profil als starke Übereinstimmung für diese Stelle identifiziert. Sie wurden aus einem Pool von 2.847 Profilen aufgrund Ihrer Embedded-Systeme Kenntnisse ausgewählt.", cta: "Match-Details anzeigen →" },
    fr: { greeting: "Bonjour Sarah,", body: "Notre plateforme IA a identifié votre profil comme une excellente correspondance pour ce poste, notamment grâce à votre expérience en systèmes embarqués chez ABB.", cta: "Voir les détails →" },
  };

  const m = msgs[lang];

  return (
    <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
      {/* Email mockup */}
      <div style={{ flex: "1 1 360px" }}>
        <RecLabel id="REC 2.1 · 2.4 · 2.3" />
        <SectionTitle>AI-Sourced Outreach Email</SectionTitle>
        <Card>
          {/* Language switcher */}
          <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
            {["en", "de", "fr"].map(l => (
              <Pill key={l} active={lang === l} onClick={() => setLang(l)}>
                {{ en: "🇬🇧 EN", de: "🇨🇭 DE", fr: "🇫🇷 FR" }[l]}
              </Pill>
            ))}
          </div>
          {/* Email chrome */}
          <div style={{ background: C.gray50, borderRadius: 8, border: `1px solid ${C.gray200}`, overflow: "hidden" }}>
            <div style={{ background: C.white, padding: "10px 14px", borderBottom: `1px solid ${C.gray200}` }}>
              <div style={{ fontSize: 11, color: C.gray400, marginBottom: 2 }}>From: <b style={{ color: C.gray700 }}>Clara Meier</b> · Talent Acquisition · Bosch Automotive CH</div>
              <div style={{ fontSize: 11, color: C.gray400 }}>Subject: <b style={{ color: C.gray700 }}>Senior Embedded Engineer — Zurich (AI-Matched)</b></div>
            </div>
            <div style={{ padding: 16 }}>
              {/* AI disclosure badge */}
              <div style={{ background: C.blueLight, border: `1px solid #BFDBFE`, borderRadius: 6, padding: "6px 12px", marginBottom: 12, display: "flex", gap: 8, alignItems: "flex-start" }}>
                <Icon name="info" size={14} color={C.blue} />
                <p style={{ margin: 0, fontSize: 11, color: C.blue, lineHeight: 1.5 }}>
                  <b>AI-assisted outreach.</b> This message was prepared with AI assistance and reviewed by Clara Meier. You were identified by our hiring AI — not from a job board.
                </p>
              </div>
              <p style={{ fontSize: 13, color: C.gray700, marginBottom: 8 }}>{m.greeting}</p>
              <p style={{ fontSize: 13, color: C.gray700, lineHeight: 1.6, marginBottom: 10 }}>{m.body}</p>
              <div style={{ background: C.white, border: `1px solid ${C.gray200}`, borderRadius: 8, padding: "10px 14px", marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.gray400, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Role</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.gray900 }}>Senior Embedded Software Engineer</div>
                <div style={{ fontSize: 12, color: C.gray500, marginBottom: 8 }}>Bosch Automotive CH · Zurich · CHF 130–155k</div>
                <button onClick={() => setMatchCard(true)} style={{ fontSize: 12, color: C.blue, fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0 }}>{m.cta}</button>
              </div>
              <p style={{ fontSize: 12, color: C.gray500, lineHeight: 1.5 }}>Questions? Reply to this email or contact Clara directly at <span style={{ color: C.blue }}>c.meier@bosch-ch.com</span> · reply within 1 business day.</p>
            </div>
          </div>

          {/* Opt-down strip */}
          <div style={{ marginTop: 12, padding: "10px 12px", background: C.gray50, borderRadius: 8, border: `1px solid ${C.gray200}` }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.gray600, marginBottom: 8 }}>
              <RecLabel id="REC 2.5" /> <span style={{ marginLeft: 4 }}>Opt-down options (not just opt-out)</span>
            </div>
            {optDown ? (
              <div style={{ fontSize: 12, color: C.teal, fontWeight: 600 }}>✓ Preference saved. Clara will follow up accordingly.</div>
            ) : (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["✓ I'm interested", "⏸ Not now, keep me in mind", "↩ Wrong role, but open to others", "✕ Remove me"].map((opt, i) => (
                  <button key={i} onClick={() => setOptDown(opt)} style={{
                    fontSize: 11, padding: "5px 12px", borderRadius: 20, cursor: "pointer", fontWeight: 600,
                    background: i === 0 ? C.teal : C.white, color: i === 0 ? C.white : C.gray600,
                    border: `1.5px solid ${i === 0 ? C.teal : C.gray300}`,
                  }}>{opt}</button>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Match Card */}
      <div style={{ flex: "1 1 280px" }}>
        <RecLabel id="REC 2.2" />
        <SectionTitle>Match Explanation Card</SectionTitle>
        <Card>
          <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.gray900 }}>Why you were matched</div>
              <div style={{ fontSize: 11, color: C.gray500 }}>Senior Embedded Engineer · Bosch CH</div>
            </div>
            <div style={{ background: C.tealLight, color: C.teal, fontSize: 20, fontWeight: 800, padding: "6px 14px", borderRadius: 8 }}>87%</div>
          </div>
          <Divider />
          {[
            { label: "Embedded C/C++", score: 95, match: true },
            { label: "AUTOSAR / automotive domain", score: 88, match: true },
            { label: "Real-time OS (FreeRTOS)", score: 72, match: true },
            { label: "French language (B2+)", score: 20, match: false },
            { label: "Team lead experience", score: 40, match: false },
          ].map(item => (
            <div key={item.label} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontSize: 12, color: C.gray700 }}>{item.label}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: item.match ? C.teal : C.amber }}>{item.score}%</span>
              </div>
              <ProgressBar value={item.score} color={item.match ? C.teal : C.amber} showLabel={false} />
            </div>
          ))}
          <Divider />
          <div style={{ fontSize: 11, color: C.gray500, lineHeight: 1.5 }}>
            <b style={{ color: C.amber }}>Areas to strengthen:</b> Adding French proficiency and team lead examples to your profile would unlock 31 additional roles in our Swiss pipeline.
          </div>
          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <Btn variant="teal" size="sm" icon="check">Apply to this role</Btn>
            <Btn variant="secondary" size="sm">Update profile</Btn>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// SCREEN: PRE-INTERVIEW BRIEFING
// ══════════════════════════════════════════════════════════════════
function PreInterviewScreen() {
  const [step, setStep] = useState(0);
  const [techCheck, setTechCheck] = useState({ mic: null, browser: null, connection: null });
  const [confirmed, setConfirmed] = useState(false);

  const runCheck = (key) => {
    setTimeout(() => setTechCheck(p => ({ ...p, [key]: true })), 600 + Math.random() * 800);
  };

  return (
    <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
      <div style={{ flex: "1 1 340px" }}>
        <RecLabel id="REC 3.1 · 3.2" />
        <SectionTitle>Interview Briefing Page</SectionTitle>
        <Card>
          {/* AI Persona intro */}
          <div style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.blue})`, borderRadius: 10, padding: 16, marginBottom: 14, color: C.white }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🤖</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>Hi, I'm Lena</div>
                <div style={{ fontSize: 11, opacity: 0.8 }}>AI Hiring Assistant · Bosch Automotive CH</div>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <RecLabel id="REC 3.2" />
              </div>
            </div>
            <p style={{ fontSize: 12, lineHeight: 1.6, margin: 0, opacity: 0.9 }}>
              I'll guide you through a structured screening interview today — there are no trick questions. Your responses will be reviewed by <b>Clara Meier</b>, Talent Acquisition Lead.
            </p>
          </div>

          {/* What to expect */}
          {[
            { icon: "⏱", label: "Duration", val: "~25 minutes · 7 questions" },
            { icon: "🎯", label: "Format", val: "Audio responses, no camera required" },
            { icon: "👤", label: "Reviewed by", val: "Clara Meier · within 5 business days" },
            { icon: "🔁", label: "Retakes", val: "1 retake allowed per question" },
            { icon: "⏸", label: "Pause", val: "1 pause up to 5 minutes permitted" },
            { icon: "🌍", label: "Language", val: "English (FR/DE option available)" },
          ].map(item => (
            <div key={item.label} style={{ display: "flex", gap: 10, alignItems: "center", padding: "7px 0", borderBottom: `1px solid ${C.gray100}` }}>
              <span style={{ fontSize: 16, width: 24, textAlign: "center" }}>{item.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: C.gray700, width: 100 }}>{item.label}</span>
              <span style={{ fontSize: 12, color: C.gray600 }}>{item.val}</span>
            </div>
          ))}

          {/* Anti-bias disclosure */}
          <div style={{ marginTop: 12, background: C.tealLight, border: `1px solid #A7F3D0`, borderRadius: 8, padding: "10px 12px" }}>
            <RecLabel id="REC 3.8" />
            <div style={{ fontSize: 11, color: "#065F46", lineHeight: 1.6, marginTop: 4 }}>
              <b>Fairness guarantee:</b> Lena does NOT evaluate your accent, speech speed, nationality, or gender. She evaluates: relevance of content, competency signals, and response structure. You can request any question be rephrased once.
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <label style={{ display: "flex", gap: 8, alignItems: "flex-start", cursor: "pointer" }}>
              <input type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} style={{ marginTop: 2 }} />
              <span style={{ fontSize: 12, color: C.gray600, lineHeight: 1.5 }}>I have read the briefing and understand how this interview works. I consent to my responses being reviewed by Bosch CH recruitment team.</span>
            </label>
          </div>
          <div style={{ marginTop: 12 }}>
            <Btn variant={confirmed ? "teal" : "secondary"} size="lg" disabled={!confirmed} icon="play">
              Begin Interview with Lena
            </Btn>
          </div>
        </Card>
      </div>

      <div style={{ flex: "1 1 260px" }}>
        <RecLabel id="REC 3.3" />
        <SectionTitle>Live Technical Health Check</SectionTitle>
        <Card>
          <p style={{ fontSize: 12, color: C.gray600, marginBottom: 14, lineHeight: 1.5 }}>Before we start, let's make sure everything is working. Click each check to run it.</p>
          {[
            { key: "mic", label: "Microphone", icon: "🎤", desc: "We'll record a 3-second test clip" },
            { key: "browser", label: "Browser compatibility", icon: "🌐", desc: "Chrome 90+ or Firefox 88+ recommended" },
            { key: "connection", label: "Connection stability", icon: "📶", desc: "Minimum 1 Mbps required" },
          ].map(item => (
            <div key={item.key} style={{ padding: "10px 12px", background: C.gray50, borderRadius: 8, marginBottom: 8, display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.gray800 }}>{item.label}</div>
                <div style={{ fontSize: 11, color: C.gray400 }}>{item.desc}</div>
              </div>
              {techCheck[item.key] === null ? (
                <button onClick={() => runCheck(item.key)} style={{ fontSize: 11, fontWeight: 600, color: C.blue, background: C.blueLight, border: "none", padding: "4px 10px", borderRadius: 6, cursor: "pointer" }}>Test</button>
              ) : techCheck[item.key] ? (
                <div style={{ color: C.teal, fontWeight: 700, fontSize: 13 }}>✓ OK</div>
              ) : (
                <div style={{ color: C.red, fontWeight: 700, fontSize: 13 }}>✗ Fail</div>
              )}
            </div>
          ))}
          {/* Audio level visualizer */}
          <div style={{ marginTop: 12, padding: "10px 12px", background: "#F0FDF4", border: `1px solid #A7F3D0`, borderRadius: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.teal, marginBottom: 8 }}>Live audio level — speak now to test</div>
            <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 28 }}>
              {Array.from({ length: 18 }).map((_, i) => {
                const h = 4 + Math.abs(Math.sin(i * 0.8 + Date.now() / 300)) * 20;
                return (
                  <div key={i} style={{ flex: 1, height: `${8 + (i % 3) * 7}px`, background: C.teal, borderRadius: 2, opacity: 0.5 + (i % 4) * 0.15 }} />
                );
              })}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// SCREEN: LIVE INTERVIEW
// ══════════════════════════════════════════════════════════════════
function LiveInterviewScreen() {
  const [qIndex, setQIndex] = useState(1);
  const [paused, setPaused] = useState(false);
  const [recording, setRecording] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [rephraseUsed, setRephraseUsed] = useState(false);
  const totalQ = 7;

  const questions = [
    "Tell me about a time you debugged a critical embedded system failure under time pressure.",
    "Describe your experience with AUTOSAR architecture in an automotive context.",
    "How do you approach real-time constraint analysis in a resource-limited environment?",
  ];

  return (
    <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
      <div style={{ flex: "1 1 360px" }}>
        <RecLabel id="REC 3.4 · 3.5 · 3.6 · 3.7" />
        <SectionTitle>Live AI Interview Interface</SectionTitle>
        <Card style={{ padding: 0, overflow: "hidden" }}>
          {/* Header bar */}
          <div style={{ background: C.navy, padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 28, height: 28, background: "rgba(255,255,255,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🤖</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.white }}>Lena · AI Interviewer</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)" }}>Bosch Automotive CH · Screening Interview</div>
              </div>
            </div>
            {/* Progress */}
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", marginBottom: 4 }}>Question {qIndex} of {totalQ}</div>
              <div style={{ display: "flex", gap: 3 }}>
                {Array.from({ length: totalQ }).map((_, i) => (
                  <div key={i} style={{ width: 16, height: 4, borderRadius: 2, background: i < qIndex ? "#34D399" : i === qIndex - 1 ? C.white : "rgba(255,255,255,0.25)" }} />
                ))}
              </div>
            </div>
          </div>

          {/* Question area */}
          <div style={{ padding: 20 }}>
            {paused ? (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>⏸</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.gray800, marginBottom: 4 }}>Interview Paused</div>
                <div style={{ fontSize: 12, color: C.gray500, marginBottom: 16 }}>You have 1 pause of up to 5 minutes. Take a moment.</div>
                <Btn variant="teal" onClick={() => setPaused(false)} icon="play">Resume Interview</Btn>
              </div>
            ) : (
              <>
                <div style={{ background: C.gray50, border: `1px solid ${C.gray200}`, borderRadius: 10, padding: "14px 16px", marginBottom: 14 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: C.gray400, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Lena asks:</div>
                  <p style={{ fontSize: 14, color: C.gray800, lineHeight: 1.6, margin: 0 }}>{questions[Math.min(qIndex - 1, 2)]}</p>
                </div>

                {/* Recording UI */}
                {!confirmed ? (
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <button onClick={() => setRecording(!recording)} style={{
                        width: 44, height: 44, borderRadius: "50%", border: "none", cursor: "pointer",
                        background: recording ? C.red : C.teal, display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: recording ? "0 0 0 6px rgba(153,27,27,0.15)" : "none", transition: "all 0.2s"
                      }}>
                        <Icon name={recording ? "pause" : "mic"} size={20} color={C.white} />
                      </button>
                      {recording ? (
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: C.red }}>● Recording…</div>
                          <div style={{ display: "flex", gap: 2, marginTop: 4 }}>
                            {Array.from({ length: 24 }).map((_, i) => (
                              <div key={i} style={{ width: 3, height: `${4 + Math.abs(Math.sin(i * 1.2)) * 16}px`, background: C.red, borderRadius: 2, opacity: 0.7 }} />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div style={{ fontSize: 12, color: C.gray600 }}>Click to record your response</div>
                      )}
                    </div>

                    {recording && (
                      <div style={{ background: "#FEF9C3", border: `1px solid #FDE68A`, borderRadius: 6, padding: "6px 10px", marginBottom: 10, fontSize: 11, color: C.amber }}>
                        <RecLabel id="REC 3.5" /> Lena is listening. Your response is being processed in real time.
                      </div>
                    )}

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {recording && <Btn variant="teal" size="sm" onClick={() => { setRecording(false); setConfirmed(true); }}>✓ Done — submit answer</Btn>}
                      {!rephraseUsed && <Btn variant="ghost" size="sm" onClick={() => setRephraseUsed(true)}>
                        💬 Rephrase this question (1 left)
                      </Btn>}
                      <Btn variant="secondary" size="sm" onClick={() => setPaused(true)}>⏸ Pause</Btn>
                    </div>
                    {rephraseUsed && <div style={{ marginTop: 8, background: C.blueLight, borderRadius: 6, padding: "6px 10px", fontSize: 11, color: C.blue }}>Rephrased: "Can you describe a situation where you had to find and fix a serious bug in an embedded system quickly?"</div>}
                  </div>
                ) : (
                  <div style={{ background: C.tealLight, border: `1px solid #A7F3D0`, borderRadius: 8, padding: "12px 14px" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.teal, marginBottom: 4 }}>✓ Got it, thank you!</div>
                    <div style={{ fontSize: 12, color: "#065F46" }}>Your answer was recorded. Moving to the next question.</div>
                    <div style={{ marginTop: 10 }}>
                      <Btn variant="teal" size="sm" onClick={() => { setQIndex(Math.min(qIndex + 1, totalQ)); setConfirmed(false); setRecording(false); setRephraseUsed(false); }}>
                        Next Question →
                      </Btn>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </Card>
      </div>

      <div style={{ flex: "1 1 240px" }}>
        <div style={{ marginBottom: 16 }}>
          <RecLabel id="REC 3.4" />
          <SectionTitle>Progress Architecture</SectionTitle>
          <Card>
            <div style={{ fontSize: 12, color: C.gray600, marginBottom: 10 }}>Complete visibility across the interview</div>
            {Array.from({ length: totalQ }).map((_, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0" }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: i < qIndex - 1 ? C.teal : i === qIndex - 1 ? C.blue : C.gray200, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: i <= qIndex - 1 ? C.white : C.gray500, flexShrink: 0 }}>
                  {i < qIndex - 1 ? "✓" : i + 1}
                </div>
                <div style={{ fontSize: 12, color: i < qIndex ? C.gray800 : C.gray400, fontWeight: i === qIndex - 1 ? 600 : 400 }}>
                  {["Background & Experience", "Technical Skills", "Problem-Solving", "Collaboration Style", "Domain Knowledge", "Career Goals", "Role-Specific Scenario"][i]}
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// SCREEN: POST-INTERVIEW
// ══════════════════════════════════════════════════════════════════
function PostInterviewScreen() {
  const [rating, setRating] = useState(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  return (
    <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
      <div style={{ flex: "1 1 340px" }}>
        <RecLabel id="REC 3.9 · 3.11" />
        <SectionTitle>Post-Interview Completion Screen</SectionTitle>
        <Card>
          <div style={{ textAlign: "center", padding: "16px 0 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>✅</div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: C.gray900, margin: "0 0 6px" }}>Interview Complete</h2>
            <p style={{ fontSize: 13, color: C.gray600, lineHeight: 1.6, maxWidth: 300, margin: "0 auto" }}>
              Well done, Sarah. Your responses have been recorded and will be reviewed by Clara Meier.
            </p>
          </div>

          {/* Summary of what was assessed */}
          <div style={{ background: C.gray50, borderRadius: 10, padding: "12px 14px", marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.gray500, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Topics assessed in this interview</div>
            {["Technical background & embedded experience", "Problem-solving under pressure", "AUTOSAR & automotive domain", "Team collaboration style", "Career motivation & role fit"].map(topic => (
              <div key={topic} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 0" }}>
                <span style={{ color: C.teal, fontSize: 12 }}>✓</span>
                <span style={{ fontSize: 12, color: C.gray700 }}>{topic}</span>
              </div>
            ))}
          </div>

          {/* CRITICAL: Timeline commitment */}
          <div style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.blue})`, color: C.white, borderRadius: 10, padding: "14px 16px", marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.7, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>What happens next</div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Clara will contact you by <u>Thursday, 19 March</u></div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>Her review is complete within 5 business days. If you haven't heard back by then, email c.meier@bosch-ch.com</div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <Btn variant="primary" size="sm" icon="home">Go to my Dashboard</Btn>
            <Btn variant="secondary" size="sm" icon="document">View my profile</Btn>
          </div>
        </Card>
      </div>

      <div style={{ flex: "1 1 260px" }}>
        <RecLabel id="REC 3.10" />
        <SectionTitle>Candidate Feedback on Interview</SectionTitle>
        <Card>
          {feedbackSent ? (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>🙏</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.gray900, marginBottom: 4 }}>Thank you for your feedback!</div>
              <div style={{ fontSize: 12, color: C.gray500 }}>We use this to improve the interview experience for every candidate.</div>
            </div>
          ) : (
            <>
              <p style={{ fontSize: 12, color: C.gray600, marginBottom: 14, lineHeight: 1.5 }}>60 seconds to help us improve the experience for everyone:</p>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.gray700, marginBottom: 8 }}>How easy was Lena to understand?</div>
                <div style={{ display: "flex", gap: 6 }}>
                  {["😕", "😐", "🙂", "😄", "🤩"].map((em, i) => (
                    <button key={i} onClick={() => setRating(i)} style={{ fontSize: 22, background: rating === i ? C.blueLight : C.gray50, border: `2px solid ${rating === i ? C.blue : C.gray200}`, borderRadius: 8, padding: "6px 10px", cursor: "pointer" }}>{em}</button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.gray700, marginBottom: 6 }}>Were the questions relevant to the role?</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {["Yes, very relevant", "Somewhat", "Not really"].map(opt => (
                    <Pill key={opt}>{opt}</Pill>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.gray700, marginBottom: 6 }}>Any technical issues?</div>
                <textarea placeholder="Describe any issues (optional)…" style={{ width: "100%", height: 56, fontSize: 12, padding: "8px 10px", borderRadius: 6, border: `1px solid ${C.gray300}`, resize: "none", color: C.gray700, boxSizing: "border-box" }} />
              </div>
              <Btn variant="teal" size="sm" onClick={() => setFeedbackSent(true)}>Submit Feedback</Btn>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// SCREEN: PORTAL / DASHBOARD
// ══════════════════════════════════════════════════════════════════
function PortalScreen() {
  return (
    <div>
      <RecLabel id="REC 4.5 · 4.6 · 6.3" />
      <SectionTitle>Candidate Dashboard — Pipeline Visibility</SectionTitle>
      <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
        {[
          { label: "Active Applications", val: 3, icon: "briefcase", color: C.blue, bg: C.blueLight },
          { label: "Interviews Completed", val: 2, icon: "check", color: C.teal, bg: C.tealLight },
          { label: "Profile Strength", val: "78%", icon: "chart", color: C.amber, bg: C.amberLight },
        ].map(stat => (
          <Card key={stat.label} style={{ flex: "1 1 140px", display: "flex", gap: 12, alignItems: "center", padding: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: stat.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={stat.icon} size={18} color={stat.color} />
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: C.gray900 }}>{stat.val}</div>
              <div style={{ fontSize: 11, color: C.gray500 }}>{stat.label}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Applications with full stage labels */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 360px" }}>
          <SectionTitle>Active Applications — Stage-Labelled Pipeline</SectionTitle>
          {[
            {
              role: "Senior Embedded Engineer", co: "Bosch Automotive CH",
              stage: "Skills Interview Scheduled", stageColor: C.blue, stageBg: C.blueLight,
              date: "March 15, 2026 · 14:00", steps: [1, 1, 1, 0, 0],
              action: "Join interview",
            },
            {
              role: "Firmware Engineer", co: "u-blox · Thalwil",
              stage: "AI Screening Complete — Recruiter Review", stageColor: C.teal, stageBg: C.tealLight,
              date: "Expected: March 18 · by end of day",
              steps: [1, 1, 0, 0, 0],
              action: "View details",
            },
            {
              role: "Embedded Systems Lead", co: "Sensirion · Stäfa",
              stage: "Application Submitted", stageColor: C.gray600, stageBg: C.gray100,
              date: "Submitted March 10",
              steps: [1, 0, 0, 0, 0],
              action: "View details",
            },
          ].map(app => (
            <Card key={app.role} style={{ marginBottom: 10, padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.gray900 }}>{app.role}</div>
                  <div style={{ fontSize: 11, color: C.gray500 }}>{app.co}</div>
                </div>
                <Badge label={app.stage} color={app.stageColor} bg={app.stageBg} />
              </div>
              {/* Journey map progress */}
              <div style={{ display: "flex", gap: 0, marginBottom: 8, alignItems: "center" }}>
                {["Applied", "AI Screen", "Recruiter", "Mgr Review", "Decision"].map((s, i) => (
                  <div key={s} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: app.steps[i] ? C.teal : C.gray200, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: C.white, fontWeight: 700, marginBottom: 2 }}>
                        {app.steps[i] ? "✓" : i + 1}
                      </div>
                      <div style={{ fontSize: 9, color: app.steps[i] ? C.teal : C.gray400, textAlign: "center", lineHeight: 1.2 }}>{s}</div>
                    </div>
                    {i < 4 && <div style={{ height: 2, flex: 0.5, background: app.steps[i] && app.steps[i + 1] ? C.teal : C.gray200, marginBottom: 14 }} />}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 11, color: C.gray500 }}>📅 {app.date}</span>
                <Btn variant="ghost" size="sm" icon="arrow_right">{app.action}</Btn>
              </div>
            </Card>
          ))}
        </div>

        {/* Notifications */}
        <div style={{ flex: "1 1 240px" }}>
          <RecLabel id="REC 4.6 · 4.7" />
          <SectionTitle>Proactive Status Notifications</SectionTitle>
          {[
            { icon: "🎯", title: "Interview confirmed", body: "Your Skills Interview with Bosch CH is set for March 15 at 14:00.", time: "2 hours ago", color: C.blue, bg: C.blueLight },
            { icon: "✅", title: "Screening complete", body: "AI screening reviewed. Clara Meier will now review your responses.", time: "Yesterday", color: C.teal, bg: C.tealLight },
            { icon: "💡", title: "Profile tip", body: "Adding French proficiency would match you to 23 more open roles.", time: "2 days ago", color: C.amber, bg: C.amberLight },
            { icon: "⚠️", title: "Application not progressed", body: "Regarding Novartis · Basel: The team has moved forward with candidates with more direct regulatory experience. Your profile remains active for future roles.", time: "3 days ago", color: C.red, bg: C.redLight },
          ].map(n => (
            <Card key={n.title} style={{ marginBottom: 8, padding: "10px 12px" }}>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: n.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{n.icon}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.gray900, marginBottom: 2 }}>{n.title}</div>
                  <div style={{ fontSize: 11, color: C.gray600, lineHeight: 1.5, marginBottom: 4 }}>{n.body}</div>
                  <div style={{ fontSize: 10, color: C.gray400 }}>{n.time}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// SCREEN: AI PROFILE TRANSPARENCY
// ══════════════════════════════════════════════════════════════════
function ProfileScreen() {
  const [editing, setEditing] = useState(false);

  return (
    <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
      <div style={{ flex: "1 1 340px" }}>
        <RecLabel id="REC 4.1 · 4.2 · 4.3" />
        <SectionTitle>AI Profile Summary — Candidate Visible</SectionTitle>
        <Card>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(135deg, ${C.navy}, ${C.blueMid})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: C.white, fontWeight: 800 }}>SM</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.gray900 }}>Sarah Müller</div>
              <div style={{ fontSize: 12, color: C.gray500 }}>Embedded Software Engineer · Basel, CH</div>
            </div>
          </div>

          <div style={{ background: C.blueLight, borderRadius: 10, padding: "12px 14px", marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.blue, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>How our AI reads your profile</div>
            <p style={{ fontSize: 12, color: "#1E3A5F", lineHeight: 1.6, margin: 0 }}>
              Based on your CV and interview responses, we've identified you as a <b>strong match for Senior Embedded Software and Firmware Engineering roles</b> in the Zurich and Basel markets. Your strongest signals are embedded C/C++, AUTOSAR, and real-time OS. Areas where more detail would help: spoken languages and team lead scope.
            </p>
          </div>

          {/* Profile completeness with actionable explanations */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.gray700 }}>Profile Strength</span>
              <span style={{ fontSize: 12, fontWeight: 800, color: C.amber }}>78%</span>
            </div>
            <ProgressBar value={78} color={C.amber} showLabel={false} />
          </div>

          {/* Actionable completeness items */}
          {[
            { label: "Add spoken languages", impact: "+23 roles unlocked", done: false },
            { label: "Add team lead examples", impact: "+15 senior roles", done: false },
            { label: "Verify Python skill", impact: "+8 ML-adjacent roles", done: false },
            { label: "CV uploaded", impact: "Core profile", done: true },
            { label: "AI Screening complete", impact: "Competency signals captured", done: true },
          ].map(item => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", borderBottom: `1px solid ${C.gray100}` }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: item.done ? C.tealLight : C.amberLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>
                {item.done ? "✓" : "!"}
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 12, color: item.done ? C.gray500 : C.gray800, textDecoration: item.done ? "line-through" : "none" }}>{item.label}</span>
              </div>
              <span style={{ fontSize: 11, color: item.done ? C.teal : C.amber, fontWeight: 600 }}>{item.impact}</span>
            </div>
          ))}
        </Card>
      </div>

      <div style={{ flex: "1 1 260px" }}>
        {/* Skills verification */}
        <div style={{ marginBottom: 16 }}>
          <RecLabel id="REC 4.3" />
          <SectionTitle>Skills Verification</SectionTitle>
          <Card>
            <p style={{ fontSize: 12, color: C.gray600, marginBottom: 12, lineHeight: 1.5 }}>Verify skills to stand out to recruiters. Verified badges appear on your recruiter-visible profile.</p>
            {[
              { skill: "Embedded C/C++", level: "Expert", verified: true },
              { skill: "AUTOSAR", level: "Advanced", verified: true },
              { skill: "Python", level: "Intermediate", verified: false },
              { skill: "French (B2)", level: "Language", verified: false },
            ].map(s => (
              <div key={s.skill} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: `1px solid ${C.gray100}` }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.gray800 }}>{s.skill}</div>
                  <div style={{ fontSize: 10, color: C.gray400 }}>{s.level}</div>
                </div>
                {s.verified ? (
                  <div style={{ background: C.tealLight, color: C.teal, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4, display: "flex", alignItems: "center", gap: 4 }}>
                    <span>✓</span> Verified
                  </div>
                ) : (
                  <Btn variant="secondary" size="sm">Verify now</Btn>
                )}
              </div>
            ))}
          </Card>
        </div>

        {/* nLPD Data Rights */}
        <RecLabel id="REC 4.4" />
        <SectionTitle>Data Rights (nLPD)</SectionTitle>
        <Card>
          <p style={{ fontSize: 12, color: C.gray600, marginBottom: 12, lineHeight: 1.5 }}>You have full control over your data under Swiss nLPD regulations.</p>
          {[
            { icon: "📥", label: "Download my data", desc: "Full JSON/PDF export" },
            { icon: "🗑️", label: "Delete my profile", desc: "Permanent, all data removed" },
            { icon: "👁️", label: "View data usage log", desc: "See how your data was used" },
          ].map(item => (
            <div key={item.label} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: `1px solid ${C.gray100}`, alignItems: "center" }}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.gray800 }}>{item.label}</div>
                <div style={{ fontSize: 11, color: C.gray400 }}>{item.desc}</div>
              </div>
              <Btn variant="ghost" size="sm" icon="arrow_right"> </Btn>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// SCREEN: STATUS TRACKING
// ══════════════════════════════════════════════════════════════════
function StatusScreen() {
  return (
    <div>
      <RecLabel id="REC 4.5 · 6.3" />
      <SectionTitle>Full Journey Progress Tracker</SectionTitle>
      <Card style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.gray900, marginBottom: 4 }}>Senior Embedded Engineer · Bosch Automotive CH</div>
        <div style={{ fontSize: 12, color: C.gray500, marginBottom: 20 }}>Applied March 8, 2026 · Reference: BCH-2026-EE-047</div>
        {/* Full horizontal journey */}
        <div style={{ overflowX: "auto" }}>
          <div style={{ display: "flex", gap: 0, minWidth: 600, alignItems: "flex-start" }}>
            {[
              { step: "Application Submitted", date: "Mar 8", done: true, active: false },
              { step: "AI Screening", date: "Mar 10–11", done: true, active: false },
              { step: "Recruiter Review", date: "Mar 12–14", done: true, active: false },
              { step: "Skills Interview", date: "Mar 15", done: false, active: true },
              { step: "Hiring Manager", date: "Mar 18–21", done: false, active: false },
              { step: "Decision", date: "~Mar 24", done: false, active: false },
            ].map((s, i, arr) => (
              <div key={s.step} style={{ display: "flex", alignItems: "flex-start", flex: 1 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", marginBottom: 6, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, flexShrink: 0,
                    background: s.active ? C.blue : s.done ? C.teal : C.gray200,
                    color: (s.done || s.active) ? C.white : C.gray400,
                    boxShadow: s.active ? `0 0 0 4px ${C.blueLight}` : "none",
                  }}>
                    {s.done ? "✓" : i + 1}
                  </div>
                  <div style={{ fontSize: 11, fontWeight: s.active ? 700 : 500, color: s.active ? C.blue : s.done ? C.teal : C.gray400, textAlign: "center", marginBottom: 2 }}>{s.step}</div>
                  <div style={{ fontSize: 10, color: C.gray400 }}>{s.date}</div>
                </div>
                {i < arr.length - 1 && (
                  <div style={{ height: 3, flex: 0.3, background: s.done ? C.teal : C.gray200, marginTop: 16 }} />
                )}
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 20, background: C.blueLight, borderRadius: 8, padding: "10px 14px", display: "flex", gap: 10, alignItems: "center" }}>
          <Icon name="bell" size={16} color={C.blue} />
          <div>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.blue }}>Current stage: Skills Interview scheduled for March 15, 14:00. </span>
            <span style={{ fontSize: 12, color: C.blue }}>You'll receive a calendar invite and joining link by March 13.</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// SCREEN: MESSAGING / COMMUNICATION DESIGN
// ══════════════════════════════════════════════════════════════════
function MessagingScreen() {
  const [activeTab, setActiveTab] = useState("before");

  const beforeText = `Hi,\n\nYour application has been received and is under review.\n\nRegards,\nThe Hiring Team`;
  const afterText = `Hi Sarah,\n\nQuick update — Clara Meier has completed her review of your AI screening responses and has moved your application to the Skills Interview stage.\n\nYour interview is confirmed for Tuesday, March 15 at 14:00 (Zurich time). You'll receive a calendar invite and joining link by tomorrow.\n\nThis message was prepared with AI assistance and reviewed by Clara Meier.\n\nQuestions? Email Clara at c.meier@bosch-ch.com — she replies within 1 business day.\n\nBest,\nClara Meier\nTalent Acquisition Lead · Bosch Automotive Switzerland`;

  return (
    <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
      <div style={{ flex: "1 1 340px" }}>
        <RecLabel id="REC 5.1 · 5.2 · 5.3 · 5.5" />
        <SectionTitle>Before & After — Communication Redesign</SectionTitle>
        <Card>
          <div style={{ display: "flex", gap: 0, marginBottom: 16, background: C.gray100, borderRadius: 8, padding: 4 }}>
            {["before", "after"].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                flex: 1, padding: "7px 0", fontSize: 12, fontWeight: 700, border: "none", cursor: "pointer", borderRadius: 6, transition: "all 0.2s",
                background: activeTab === tab ? C.white : "transparent",
                color: activeTab === tab ? C.navy : C.gray500,
                boxShadow: activeTab === tab ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
              }}>{tab === "before" ? "❌ Before" : "✅ After"}</button>
            ))}
          </div>
          <div style={{ background: C.gray50, border: `1px solid ${C.gray200}`, borderRadius: 8, overflow: "hidden" }}>
            <div style={{ background: C.white, padding: "8px 12px", borderBottom: `1px solid ${C.gray200}` }}>
              <div style={{ fontSize: 11, color: C.gray400 }}>Subject: {activeTab === "before" ? "Application Update" : "Skills Interview Confirmed — Bosch CH · March 15 ✓"}</div>
            </div>
            <div style={{ padding: 14 }}>
              {activeTab === "after" && (
                <div style={{ background: C.blueLight, border: `1px solid #BFDBFE`, borderRadius: 6, padding: "6px 10px", marginBottom: 10, fontSize: 11, color: C.blue }}>
                  🤖 <b>AI-assisted.</b> Prepared with AI assistance, reviewed by Clara Meier.
                </div>
              )}
              <pre style={{ fontSize: 12, color: C.gray700, lineHeight: 1.7, margin: 0, fontFamily: "inherit", whiteSpace: "pre-wrap" }}>
                {activeTab === "before" ? beforeText : afterText}
              </pre>
            </div>
          </div>
          {activeTab === "before" && (
            <div style={{ marginTop: 10, padding: "8px 12px", background: C.redLight, borderRadius: 6, fontSize: 11, color: C.red }}>
              ❌ Generic, no human name, no timeline, no next steps, no contact path
            </div>
          )}
          {activeTab === "after" && (
            <div style={{ marginTop: 10, padding: "8px 12px", background: C.tealLight, borderRadius: 6, fontSize: 11, color: C.teal }}>
              ✅ Named human, specific date, AI disclosure, clear next steps, direct contact path
            </div>
          )}
        </Card>
      </div>

      <div style={{ flex: "1 1 260px" }}>
        <RecLabel id="REC 5.4" />
        <SectionTitle>Swiss Register Localisation</SectionTitle>
        <Card>
          <p style={{ fontSize: 12, color: C.gray600, marginBottom: 12, lineHeight: 1.5 }}>Outreach register adapts by language. Not just translated — re-registered.</p>
          {[
            { flag: "🇨🇭", lang: "Swiss German", note: "Formal 'Sie' by default. Direct, no small talk.", example: "Sehr geehrte Frau Müller, unsere Plattform hat Ihr Profil…" },
            { flag: "🇫🇷", lang: "Swiss French", note: "Slightly warmer, vouvoiement, formal close.", example: "Madame Müller, notre système a identifié votre profil…" },
            { flag: "🇮🇹", lang: "Swiss Italian", note: "Lei form, professional but warmer register.", example: "Gentile Sig.ra Müller, la nostra piattaforma ha identificato…" },
            { flag: "🇬🇧", lang: "English", note: "Business casual, direct, active voice.", example: "Hi Sarah, our AI matched your profile to a role…" },
          ].map(item => (
            <div key={item.lang} style={{ padding: "8px 0", borderBottom: `1px solid ${C.gray100}` }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontSize: 16 }}>{item.flag}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.gray800 }}>{item.lang}</span>
                <Tag>{item.note}</Tag>
              </div>
              <div style={{ fontSize: 11, color: C.gray500, fontStyle: "italic", paddingLeft: 24 }}>{item.example}</div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// SCREEN: NEW FEATURES
// ══════════════════════════════════════════════════════════════════
function FeaturesScreen() {
  const [practiceStarted, setPracticeStarted] = useState(false);
  const [qaQuery, setQaQuery] = useState("");
  const [qaAnswer, setQaAnswer] = useState("");

  const qaAnswers = {
    visa: "Bosch CH actively sponsors work visas for candidates with exceptional technical backgrounds. The process typically takes 8–12 weeks. Your current permit type would need to be assessed by the HR team.",
    salary: "The role offers CHF 130,000–155,000 base, plus a 10–15% annual bonus. The final offer depends on experience level and interview outcomes.",
    remote: "This role is hybrid — 3 days in the Zurich office, 2 remote. Occasional travel to Stuttgart (2–3x per year) for engineering syncs.",
  };

  const handleQA = () => {
    const lower = qaQuery.toLowerCase();
    if (lower.includes("visa") || lower.includes("permit")) setQaAnswer(qaAnswers.visa);
    else if (lower.includes("salary") || lower.includes("pay") || lower.includes("compensation")) setQaAnswer(qaAnswers.salary);
    else if (lower.includes("remote") || lower.includes("hybrid") || lower.includes("office")) setQaAnswer(qaAnswers.remote);
    else setQaAnswer("Great question! For specific details not covered here, contact Clara Meier at c.meier@bosch-ch.com — she typically responds within 1 business day.");
  };

  return (
    <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
      {/* Practice Mode */}
      <div style={{ flex: "1 1 300px" }}>
        <RecLabel id="REC 7.2" />
        <SectionTitle>AI Interview Practice Mode</SectionTitle>
        <Card>
          {!practiceStarted ? (
            <div>
              <div style={{ textAlign: "center", padding: "12px 0 16px" }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>🎯</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.gray900, marginBottom: 6 }}>Practice with Lena</div>
                <p style={{ fontSize: 12, color: C.gray600, lineHeight: 1.6, maxWidth: 240, margin: "0 auto 16px" }}>
                  Unscored practice interview. Same question format, same AI persona. Zero pressure, maximum preparation.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                  {["Full screening simulation (~20 min)", "Instant feedback on answer structure", "See example strong answers after each Q", "Unlimited retakes"].map(f => (
                    <div key={f} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ color: C.teal, fontSize: 14 }}>✓</span>
                      <span style={{ fontSize: 12, color: C.gray700 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Btn variant="teal" size="lg" icon="play" onClick={() => setPracticeStarted(true)}>
                  Start Practice Session
                </Btn>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ background: "#FFF7ED", border: `1px solid #FDE68A`, borderRadius: 8, padding: "8px 12px", marginBottom: 12, fontSize: 11, color: C.amber, fontWeight: 600 }}>
                🟡 PRACTICE MODE — This session is not scored
              </div>
              <div style={{ background: C.gray50, borderRadius: 8, padding: "12px 14px", marginBottom: 12 }}>
                <div style={{ fontSize: 11, color: C.gray400, marginBottom: 4 }}>Practice Q1:</div>
                <p style={{ fontSize: 13, color: C.gray800, margin: 0, lineHeight: 1.6 }}>Tell me about a complex embedded debugging challenge you solved. Walk me through your approach.</p>
              </div>
              <div style={{ background: C.blueLight, borderRadius: 8, padding: "10px 12px", marginBottom: 10, fontSize: 11, color: C.blue, lineHeight: 1.5 }}>
                💡 <b>Tip:</b> Strong answers to this type of question follow a STAR structure: Situation, Task, Action, Result. Aim for 90–120 seconds.
              </div>
              <Btn variant="secondary" size="sm" onClick={() => setPracticeStarted(false)}>← Back to Practice Menu</Btn>
            </div>
          )}
        </Card>
      </div>

      {/* Role Fit Q&A */}
      <div style={{ flex: "1 1 260px" }}>
        <RecLabel id="REC 7.4" />
        <SectionTitle>Role Fit Q&A — Ask About This Role</SectionTitle>
        <Card>
          <div style={{ background: C.gray50, borderRadius: 8, padding: "10px 12px", marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.gray700, marginBottom: 6 }}>Senior Embedded Engineer · Bosch CH</div>
            <p style={{ fontSize: 11, color: C.gray600, margin: 0 }}>Ask any question about this role. Answers are sourced from the job description, company info, and recruiter notes.</p>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
            {["Visa sponsorship?", "Salary range?", "Remote/hybrid?"].map(q => (
              <button key={q} onClick={() => { setQaQuery(q); setQaAnswer(""); }} style={{ fontSize: 11, padding: "4px 10px", background: C.blueLight, color: C.blue, border: "none", borderRadius: 20, cursor: "pointer", fontWeight: 600 }}>{q}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
            <input value={qaQuery} onChange={e => setQaQuery(e.target.value)} placeholder="Ask anything about this role…" style={{ flex: 1, fontSize: 12, padding: "8px 10px", borderRadius: 6, border: `1px solid ${C.gray300}`, color: C.gray700 }} />
            <Btn variant="primary" size="sm" onClick={handleQA}>Ask</Btn>
          </div>
          {qaAnswer && (
            <div style={{ background: C.gray50, border: `1px solid ${C.gray200}`, borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ fontSize: 10, color: C.gray400, marginBottom: 4 }}>🤖 Lena answers:</div>
              <p style={{ fontSize: 12, color: C.gray700, margin: 0, lineHeight: 1.6 }}>{qaAnswer}</p>
            </div>
          )}
        </Card>

        {/* Talent Community */}
        <div style={{ marginTop: 16 }}>
          <RecLabel id="REC 7.3" />
          <SectionTitle>Talent Community</SectionTitle>
          <Card>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ fontSize: 28 }}>🌐</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.gray900, marginBottom: 4 }}>Swiss Embedded Engineering Community</div>
                <p style={{ fontSize: 11, color: C.gray600, margin: "0 0 10px", lineHeight: 1.5 }}>Join without applying. AI matches you to roles as they open. 847 engineers currently active.</p>
                <div style={{ display: "flex", gap: 6 }}>
                  <Btn variant="teal" size="sm">Join Community</Btn>
                  <Btn variant="ghost" size="sm">Learn more</Btn>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// SCREEN: TRUST DOCUMENTATION
// ══════════════════════════════════════════════════════════════════
// ─── TRUST DOCUMENT DATA (from TRUST-001 through TRUST-004) ──────

const TRUST_DOCS = {
  howai: {
    id: "howai",
    ref: "TRUST-001",
    icon: "🤖",
    title: "How Our AI Works",
    subtitle: "A Plain-Language Guide for Candidates",
    tag: "Plain Language",
    tagColor: C.blue,
    tagBg: C.blueLight,
    langs: ["EN", "DE", "FR", "IT"],
    updated: "March 2026 · v1.0",
    desc: "Everything you need to know about AI in our hiring process — what it does, what it never does, and how your data is handled.",
    commitment: {
      label: "Our commitment",
      color: C.teal,
      bg: C.tealLight,
      points: [
        "AI supports human decision-making. It does not make hiring decisions.",
        "Every invitation and rejection is a human decision made by a recruiter or hiring manager.",
        "We will always be transparent about where and how AI is involved in your journey.",
      ],
    },
    sections: [
      {
        num: "01", title: "How the AI Matches You to Roles", color: C.navy,
        items: [
          {
            type: "h2", text: "What data does the AI use?",
            body: "When you create a profile or upload a CV, our platform reads and interprets the following to match you to open roles:",
            bullets: [
              "Your professional experience — job titles, companies, industries, and years of experience",
              "Your skills — both those you list explicitly and those inferred from your experience",
              "Your education and qualifications",
              "Your location and language preferences",
              "Your responses to any interviews or assessments completed on the platform",
            ],
            note: { label: "Never used", color: C.red, bg: C.redLight, text: "The AI does not use: photographs, national origin, age, gender, religion, marital status, disability status, or social media profiles unless you explicitly grant permission." },
          },
          {
            type: "h2", text: "How does matching work?",
            body: "When a recruiter opens a new role, they define requirements: skills, experience level, location, language needs. Our AI compares those requirements against all candidate profiles and generates a ranked shortlist. The ranking is based on relevance — how closely your background aligns with what the role needs. A high match score does not guarantee an interview, and a lower score does not prevent one. Recruiters use the AI shortlist as a starting point, not a final decision.",
          },
          {
            type: "h2", text: "Can I see why I was matched?",
            body: "Yes. When you receive an outreach message or invitation, you can view a Match Explanation Card in your portal. This shows which skills were strong matches, and which areas the employer wants to learn more about. We believe you should always know why you were contacted.",
          },
        ],
      },
      {
        num: "02", title: "How AI Interviews Work", color: C.blue,
        items: [
          {
            type: "h2", text: "What is an AI interview?",
            body: "Some roles use AI-assisted interviews as part of screening. An AI interviewer — named Lena — asks a set of predefined questions relevant to the role. Your responses are recorded and reviewed by a human recruiter. An AI interview is not a final evaluation — it is an initial conversation to help recruiters understand your background more efficiently.",
            note: { label: "Important", color: C.blue, bg: C.blueLight, text: "AI interview responses are always reviewed by a human recruiter before any decision is made." },
          },
          {
            type: "h2", text: "What does the AI evaluate?",
            body: "Our AI interview system assesses specific, job-relevant competencies only:",
            bullets: [
              "Relevance of content — does your answer address what was asked?",
              "Competency signals — do your examples demonstrate the required skills?",
              "Response structure — is your answer clear and organised enough to be useful to the reviewer?",
            ],
            note: { label: "What the AI does NOT evaluate", color: C.teal, bg: C.tealLight, text: "Accent · pronunciation · speech pace · pauses · nationality · gender · age · background noise · appearance · non-verbal cues. You can also ask Lena to rephrase any question once, without penalty." },
          },
          {
            type: "h2", text: "Are scores shared with me?",
            body: "Raw AI scores are not shared with candidates. After your interview you will see a summary of topics assessed — the competency areas covered — so you know your interview was comprehensive. Detailed evaluation goes to the recruiter.",
          },
        ],
      },
      {
        num: "03", title: "How AI Scores Are Used by Recruiters", color: C.blue,
        items: [
          {
            type: "h2", text: "Do recruiters follow AI recommendations?",
            body: "Recruiters use AI outputs as one input among many — alongside your CV, your interview, and their professional judgement. The AI recommendation is advisory. Recruiters regularly select candidates with lower AI scores and decline candidates with higher scores based on their broader assessment.",
          },
          {
            type: "h2", text: "Is the AI the final decision-maker?",
            body: "No. Unambiguously, no. No hiring decision — invitation, progression, offer, or rejection — is made by AI alone. Every decision requires a human to review and confirm. If you believe a decision was made without appropriate human review, you have the right to request a review. See the Candidate Rights Charter.",
          },
        ],
      },
      {
        num: "04", title: "Your Data & Privacy", color: C.navy,
        items: [
          {
            type: "h2", text: "What data is collected and why?",
            body: "We collect only what is necessary to match you to relevant roles and facilitate a fair assessment: your CV and profile, interview responses (audio, video, or text), skills assessments, and your preferences and interaction data.",
          },
          {
            type: "h2", text: "Is your data shared with anyone?",
            body: "Your data is shared only with the specific employer you are applying to. It is not shared with other employers without your consent. We do not sell candidate data. We do not share with data brokers, advertisers, or any party outside the hiring relationship.",
          },
          {
            type: "h2", text: "Is this platform compliant with Swiss law?",
            body: "Yes. This platform operates in full compliance with the Swiss Federal Act on Data Protection (nLPD / revised DSG, in force since 1 September 2023). A Data Protection Impact Assessment (DPIA) has been conducted for all AI-assisted hiring processes. Contact our DPO at dpo@[platform].ch.",
          },
        ],
      },
    ],
    faqs: [
      { q: "If the AI ranks me lower, will a human ever see my profile?", a: "Yes. AI matching generates a shortlist, but recruiters can and do search beyond it. You remain visible to recruiters. Strengthen your profile to improve your match score — the Match Explanation Card tells you exactly which gaps to address." },
      { q: "Can I opt out of AI-assisted processes?", a: "You can request human-only review at any stage by contacting the named recruiter. Note that some processes are only offered with AI assistance — opting out may mean you cannot participate in that specific process. We will always tell you clearly when this applies." },
      { q: "Will my data be used to train AI models?", a: "No — not without your explicit, separate consent. Your data is used exclusively to facilitate your hiring process. If we ever introduce an optional data contribution programme, it will be presented clearly and separately." },
      { q: "Who do I contact if something went wrong?", a: "Technical interview issues: contact the named recruiter immediately. Data questions: dpo@[platform].ch. Fairness concerns: use 'Request Human Review' in your portal or email candidatesupport@[platform].ch." },
      { q: "How do I know the AI is not biased against me?", a: "We conduct regular bias audits testing for differential outcomes across gender, nationality, language background, age, and education. Results are reviewed by our AI Ethics Committee. Submit concerns via the portal." },
    ],
  },

  rights: {
    id: "rights",
    ref: "TRUST-002",
    icon: "🛡️",
    title: "Candidate Rights Charter",
    subtitle: "Your Rights in Our AI-Assisted Hiring Process",
    tag: "Binding Policy",
    tagColor: C.teal,
    tagBg: C.tealLight,
    langs: ["EN", "DE", "FR", "IT"],
    updated: "March 2026 · v1.0",
    desc: "A binding commitment from our platform to every candidate — not a disclaimer. Nine rights, each actionable, each guaranteed.",
    commitment: {
      label: "How to use this Charter",
      color: C.navy,
      bg: C.blueLight,
      points: [
        "Every right described here is actionable — we tell you exactly how to use it.",
        "If you believe a right has not been respected, the final section explains how to raise a concern.",
        "This Charter is a living document — if our policies change, we will notify you.",
      ],
    },
    rights: [
      {
        num: "RIGHT 1", title: "The Right to Know When AI Is Involved",
        commitment: "Every AI-assisted communication says so — not in fine print, but in the body text. Every AI interview invitation explains what it is and that responses will be reviewed by a human. Every automated status update provides a named human contact.",
        howTo: "If you receive a communication and are unsure whether AI was involved, ask. Email candidatesupport@[platform].ch and we will tell you specifically what AI involvement occurred and when.",
      },
      {
        num: "RIGHT 2", title: "The Right to Know Why You Were Matched",
        commitment: "Every role you are matched to includes a Match Explanation Card — a plain-language breakdown of why you were identified as a strong candidate, showing which skills matched and which areas the employer wants to explore.",
        howTo: "View the Match Explanation Card in your portal for every active application. For more detail, contact the recruiter named in your application.",
      },
      {
        num: "RIGHT 3", title: "The Right to Human Review",
        commitment: "You can request that a human recruiter — not an AI — reviews your application at any stage, even after an automated decision. We process all human review requests within 5 business days. Requesting human review will not disadvantage your application.",
        howTo: "Use the 'Request Human Review' button in your portal on any active or recently closed application. Or email candidatesupport@[platform].ch with your name, role reference, and 'Human Review Request' in the subject line.",
      },
      {
        num: "RIGHT 4", title: "The Right to a Reason for Non-Progression",
        commitment: "Every candidate who is not progressed receives a notification within 5 business days of the decision, with a brief honest reason. We do not use vague language without explanation. You may request more detail and we will respond within 3 business days.",
        howTo: "If you have not received a reason within 5 business days of a stage closing, email candidatesupport@[platform].ch with your name and role reference.",
      },
      {
        num: "RIGHT 5", title: "The Right to Access Your Data",
        commitment: "Under Swiss nLPD, you have the right to know what personal data we hold and to receive a copy in a portable format. We hold: profile information, CV and documents, interview recordings and transcripts, AI evaluation outputs, communication logs, assessment results, and application history.",
        howTo: "Go to Profile Settings → 'Download My Data'. Your export (JSON and PDF) is ready within 24 hours. Or email dpo@[platform].ch. We respond within 30 days as required by nLPD — but portal exports are immediate.",
      },
      {
        num: "RIGHT 6", title: "The Right to Correct Your Data",
        commitment: "If any information we hold is inaccurate or outdated, you have the right to correct it. All profile information is editable at any time. You can also add a plain-language note to any profile section explaining context the AI may have missed. Corrections are reflected in AI matching within 24 hours.",
        howTo: "Edit your profile directly in the portal. For data you cannot edit yourself (historical records, communication logs), email dpo@[platform].ch with the specific correction.",
      },
      {
        num: "RIGHT 7", title: "The Right to Delete Your Data",
        commitment: "You have the right to request permanent deletion of your personal data at any time. Deletion covers: your profile, CV, interview recordings, AI evaluation outputs, and application history. Swiss law may require us to retain certain compliance records — we will notify you specifically if this applies.",
        howTo: "Go to Profile Settings → 'Delete My Profile'. Confirm. Deletion is processed within 72 hours and you will receive email confirmation. Or email dpo@[platform].ch.",
      },
      {
        num: "RIGHT 8", title: "The Right to Withdraw at Any Time",
        commitment: "You can withdraw from any hiring process at any time, for any reason, with no consequences to your ability to apply for future roles. Withdrawal from one process does not affect your standing in any other. We will not contact you about the withdrawn application after confirmation.",
        howTo: "Click 'Withdraw Application' on any active application in your portal. The withdrawal is immediate. If you cannot access the portal, reply to any communication from the recruiter or platform.",
      },
      {
        num: "RIGHT 9", title: "The Right to Raise a Concern",
        commitment: "If you believe any right has not been respected, you can raise a concern and receive a substantive response. We acknowledge within 1 business day and provide a substantive response within 10 business days. Concerns involving an AI decision include human review as part of our response.",
        howTo: "Use 'Raise a Concern' in your portal under Help & Support. Or email candidatesupport@[platform].ch. For data concerns: dpo@[platform].ch. If unsatisfied with our response, contact the Swiss FDPIC at www.edoeb.admin.ch.",
      },
    ],
  },

  prep: {
    id: "prep",
    ref: "TRUST-003",
    icon: "📋",
    title: "Interview Preparation Guides",
    subtitle: "Role-Specific Advice for AI-Assisted Screening Interviews",
    tag: "By Role Type",
    tagColor: C.amber,
    tagBg: C.amberLight,
    langs: ["EN"],
    updated: "March 2026 · v1.0",
    desc: "Tailored preparation guides for Engineering, Finance, Sales, and Operations candidates. Includes question types, answer frameworks, and Swiss-specific tips.",
    commitment: {
      label: "Universal tips for any AI interview",
      color: C.teal,
      bg: C.tealLight,
      points: [
        "Speak clearly and at a comfortable pace — Lena evaluates content, not delivery style.",
        "Use specific examples from your own experience, not hypotheticals or general statements.",
        "Structure your answers using the frameworks below — structure helps reviewers extract the signal they need.",
        "You can ask Lena to rephrase any question once per question — use this option if needed.",
        "It is fine to pause briefly to collect your thoughts. A thoughtful answer is better than a fast one.",
      ],
    },
    roles: [
      {
        icon: "⚙️", title: "Engineering & Technical", color: "#1B3A6B",
        overview: "Engineering interviews assess technical depth, problem-solving approach, and team effectiveness. Lena asks across three areas: technical knowledge, behavioural scenarios, and role-specific domain knowledge. You will not write code live in a screening interview — technical assessments follow separately.",
        questionTypes: [
          { type: "Technical Depth", example: "Walk me through your experience with AUTOSAR middleware and how you've applied it in a real project.", desc: "Assesses your command of specific technologies, architectures, or methodologies." },
          { type: "Problem-Solving Scenarios", example: "Describe a technically complex bug you encountered in an embedded system. How did you isolate and resolve it?", desc: "Assesses how you approach complex challenges — your methodology matters as much as the solution." },
          { type: "Collaboration & Communication", example: "Tell me about a time you had to explain a complex technical decision to a non-technical stakeholder.", desc: "Engineering roles always involve cross-functional work — this assesses how you operate in teams." },
        ],
        framework: { name: "STAR", steps: ["Situation — Set the context: the project, product, or system.", "Task — Your specific responsibility or challenge.", "Action — What you did, specifically. This is the most important part.", "Result — The outcome. Quantify where possible (performance improvements, time saved, defects reduced)."] },
        tips: ["Prepare 4–5 strong technical project examples with quantified outcomes.", "Review the JD and identify the 3 most important technical requirements — prepare a specific example for each.", "Be ready to explain trade-offs you made. Interviewers want to understand how you think, not just what you did.", "For senior roles, prepare examples demonstrating both technical contribution and influence on team decisions.", "If the role involves tools you have less experience in, acknowledge this honestly and explain your learning approach."],
      },
      {
        icon: "📊", title: "Finance & Accounting", color: "#0F4C75",
        overview: "Finance interviews assess technical accounting or financial analysis skills, understanding of Swiss regulatory frameworks, and judgement in high-stakes situations. Expect a mix of technical and behavioural questions. For senior roles, expect questions about stakeholder management, process improvement, and strategic thinking.",
        questionTypes: [
          { type: "Technical & Analytical", example: "Describe a complex financial model you built. What were the key assumptions and how did you validate them?", desc: "Assesses your command of financial concepts, modelling, reporting, or audit processes." },
          { type: "Regulatory & Compliance", example: "How have you applied IFRS 16 (lease accounting) in practice? What were the key judgements involved?", desc: "For roles involving Swiss GAAP, IFRS, OR-Rechnungslegung, or FINMA requirements." },
          { type: "Judgement & Stakeholder", example: "Tell me about a time you identified a material risk or error in a financial process. How did you handle it?", desc: "Finance roles require sound judgement and clear communication to senior stakeholders." },
        ],
        framework: { name: "CAR", steps: ["Context — The financial environment, process, or challenge you were operating in.", "Action — The specific analytical, advisory, or leadership action you took.", "Result — The measurable outcome: financial, operational, or risk reduction."] },
        tips: ["Prepare examples with specific numbers — deal sizes, budget amounts, percentage improvements.", "For Swiss roles, be familiar with OR-Rechnungslegung even if your background is IFRS or US GAAP.", "Prepare one example of catching something others missed — this demonstrates analytical rigour.", "For leadership roles, prepare examples where you influenced a financial decision, not just executed one.", "Be ready to explain how you communicate complex financial information to non-financial colleagues."],
      },
      {
        icon: "🤝", title: "Sales & Business Development", color: "#14532D",
        overview: "Sales interviews assess your ability to prospect, qualify, and close — and your understanding of how to build genuine commercial relationships. Lena focuses on your track record, your process and methodology, your resilience, and for enterprise roles, your ability to manage complex multi-stakeholder deals. Be ready with specific pipeline and revenue numbers.",
        questionTypes: [
          { type: "Track Record & Results", example: "What was your quota in your most recent role, and what percentage did you achieve over the past 3 years?", desc: "Your pipeline, quota attainment, deal sizes, and win rates are fair game. Prepare with real figures." },
          { type: "Process & Methodology", example: "Walk me through how you typically approach a new prospective account from first contact to closed deal.", desc: "Assesses whether you have a structured approach to prospecting, qualification, discovery, and closing." },
          { type: "Resilience & Adaptability", example: "Describe a deal you lost that you believed you should have won. What did you learn from it?", desc: "Sales involves rejection and change. These questions assess how you respond." },
        ],
        framework: { name: "SOAR", steps: ["Situation — The commercial context: the account, the opportunity, the market.", "Obstacle — The specific challenge: a competitor, budget freeze, or complex procurement process.", "Action — What you did specifically to address the obstacle.", "Result — Revenue, deal size, quota performance, or relationship built."] },
        tips: ["Memorise your key numbers: quota, attainment, average deal size, sales cycle length, win rate.", "Prepare your most impressive deal story in full detail — context, your specific role, obstacles, outcome.", "For Swiss enterprise sales, be ready to discuss navigating formal procurement processes and long decision cycles.", "Prepare an example of a deal that went wrong and what you did differently afterwards.", "Know the product or solution category you are applying into — Lena may ask about competitive positioning."],
      },
      {
        icon: "⚡", title: "Operations & Supply Chain", color: "#4A1942",
        overview: "Operations interviews assess your ability to design and optimise processes, manage complexity and ambiguity, lead cross-functional teams, and deliver results with competing priorities. For Swiss operations roles, expect questions about working across geographies, languages, and regulatory environments. Data literacy and process rigour are usually heavily weighted.",
        questionTypes: [
          { type: "Process Improvement", example: "Describe a significant process improvement you led. What was the problem, your approach, and the measurable outcome?", desc: "Operations roles require continuous improvement mindset and measurable results." },
          { type: "Problem-Solving Under Pressure", example: "Tell me about a time a major operational failure or supply disruption occurred. What was your role in resolving it?", desc: "Operational environments involve disruption — how you respond to unexpected events is closely assessed." },
          { type: "Cross-Functional Alignment", example: "Describe a situation where you needed to align multiple teams around a process change they initially resisted.", desc: "Operations requires influencing people you do not directly manage across procurement, logistics, finance, sales." },
        ],
        framework: { name: "STAR-D", steps: ["Situation — The operational context: the process, team, or constraint.", "Task — Your specific mandate or responsibility.", "Action — Specific actions taken: process design, team coordination, supplier management.", "Result — The measurable outcome.", "Data — The KPIs or data you used to identify the problem and validate the solution."] },
        tips: ["Quantify every outcome: cost savings (CHF or %), lead time reduction, defect rate improvements, inventory turns.", "Prepare examples across both strategic design (how you designed a system) and hands-on execution.", "For Swiss operations, familiarity with EU supply chain regulations, Incoterms, and Swiss customs is a differentiator.", "Be ready to discuss how you have used data to identify problems and measure the impact of changes.", "Prepare one example of a significant failure and the process improvements that followed."],
      },
    ],
  },

  faq: {
    id: "faq",
    ref: "TRUST-004",
    icon: "💬",
    title: "Candidate FAQ",
    subtitle: "Real Questions from Real Candidates — Answered Honestly",
    tag: "Updated Q1 2026",
    tagColor: C.gray600,
    tagBg: C.gray100,
    langs: ["EN", "DE", "FR", "IT"],
    updated: "March 2026 · Q1 · 38 questions",
    desc: "Built from actual candidate support emails, post-interview feedback, and quarterly surveys. Updated every quarter.",
    commitment: null,
    categories: [
      {
        id: "platform", label: "About the Platform", icon: "🏢",
        items: [
          { q: "What exactly is this platform and how is it different from a job board?", a: "We are an AI-native hiring platform — AI is built into the core of how we match candidates to roles, not bolted on as an afterthought. Unlike a job board where you browse and apply, our platform actively matches you to roles you may not have found on your own. Think of it less like a shop window and more like a specialist talent agency — powered by AI and available 24/7." },
          { q: "Do I need to actively apply, or does the platform do that for me?", a: "Both. You can actively apply to roles in your portal. But the bigger value is passive matching — once your profile is complete, the AI continuously matches you against new roles as they are added. For passive candidates not actively looking but open to the right opportunity, this is particularly useful: invest time once in your profile, and the platform does the ongoing work." },
          { q: "Is this platform only for Swiss-based candidates?", a: "Our primary focus is the Swiss market. Employers on our platform are primarily Switzerland-based and most roles require Swiss residency or a valid work permit. Candidates based outside Switzerland can register, but most roles require either Swiss residency or the right work authorisation." },
          { q: "How much does it cost to use as a candidate?", a: "Nothing. The platform is entirely free for candidates. We are paid by employers. You will never be asked to pay — no subscription, no premium tier, no pay-to-be-seen." },
          { q: "Is my profile visible to my current employer?", a: "No — unless your current employer is also a client and you have applied to a role there. Your profile is not publicly searchable. You can set 'confidential mode' in settings to limit visibility to only employers you have specifically applied to." },
        ],
      },
      {
        id: "matching", label: "About AI Matching", icon: "🎯",
        items: [
          { q: "How does the AI decide I'm a good match for a role?", a: "The AI compares your profile — skills, experience, location, language, and interview responses — against the requirements the employer has defined. It generates a match score based on relevance. A higher score does not guarantee an interview; a lower score does not block one. The score is one input for the recruiter who applies their own judgement." },
          { q: "I applied for a role and never heard back. Did the AI filter me out?", a: "It is possible AI matching ranked your profile lower for that specific role. However, recruiters can and do review beyond the AI shortlist. If you applied more than 10 business days ago and have not heard back, email candidatesupport@[platform].ch with the role reference number — we will find out what happened." },
          { q: "Can I improve my match score?", a: "Yes. Most effective ways: complete your profile fully (especially skills, languages, location), add verified skills through our in-platform assessments, complete AI screening interviews (which add competency signals beyond your CV), and update your profile to reflect recent experience. Your Match Explanation Card tells you specifically which gaps to address." },
          { q: "I got matched to a role I'm clearly underqualified for. Why?", a: "Occasionally the AI matches candidates where there is a strong match on some dimensions but weaker on others. The Match Explanation Card shows exactly where the match is strong and where it is weaker. If you believe the match was clearly wrong, use 'Not relevant' on the match card — this feedback helps improve accuracy over time." },
        ],
      },
      {
        id: "interviews", label: "About AI Interviews", icon: "🎤",
        items: [
          { q: "I'm nervous about being interviewed by an AI. Is that normal?", a: "Yes, completely. Most candidates feel anxiety before their first AI interview — it is an unfamiliar experience and the stakes feel high. Use Practice Mode before your real interview (free and unscored). Remember: Lena is not looking for perfect language — she is helping a recruiter understand your background. A human reviews your responses before any decision is made." },
          { q: "English is not my first language. Will this put me at a disadvantage?", a: "Our interview system is explicitly designed so that it does not. Lena does not evaluate accent, pronunciation, grammatical precision, or speech patterns — she evaluates the relevance and content of what you say. If a question's phrasing is confusing, you can ask for it to be rephrased once. You can also select German, French, or Italian before the interview begins." },
          { q: "What if I freeze during the interview and can't answer a question?", a: "It happens and it is okay. You can ask for more time, ask for the question to be rephrased, or request to move on and return to a question at the end. If you freeze completely and feel the session was not representative of your ability, contact the recruiter immediately after — many recruiters will accommodate a genuinely exceptional circumstance." },
          { q: "Will the recruiter see my full interview recording?", a: "The recruiter has access to your transcript and, if applicable, your recording. They will also see the AI's competency evaluation summary. In practice, most recruiters focus on the transcript and AI summary rather than watching full recordings." },
          { q: "I had a technical problem during my interview. What should I do?", a: "Contact the recruiter named in your interview confirmation immediately — do not wait. Explain what happened and when. Technical issues reported promptly are almost always accommodated; issues reported days later are harder to address." },
        ],
      },
      {
        id: "status", label: "Application & Status", icon: "📊",
        items: [
          { q: "How long does it take to hear back after an AI interview?", a: "We commit to a specific timeline at the end of every AI interview — it appears on the final screen and in your confirmation email. Typically, recruiter review takes 3–7 business days after the interview. If the committed date passes without contact, email the named recruiter or candidatesupport@[platform].ch." },
          { q: "What does 'AI Screening Complete — Recruiter Review' mean?", a: "It means your AI interview has been processed and is in the queue for a human recruiter to review. This is a good sign — no technical issues occurred and no disqualifying flags were raised. It does not mean you have been progressed; it means you are under active human review." },
          { q: "I was rejected but I think I was a strong candidate. Can I appeal?", a: "You can request a human review of any decision using the 'Request Human Review' option in your portal or by emailing candidatesupport@[platform].ch. A human recruiter will actively reconsider your application. This is a genuine re-evaluation, not a guaranteed different outcome — but it ensures a human has actively considered your candidacy." },
          { q: "I withdrew from a process by accident. Can I undo it?", a: "Contact candidatesupport@[platform].ch immediately. If you contact us within 24 hours and the process has not already moved forward with other candidates, we can usually reinstate your application. After 24 hours, reinstatement depends on the process status — we will always try to help." },
        ],
      },
      {
        id: "data", label: "Data & Privacy", icon: "🔒",
        items: [
          { q: "Who can see my profile?", a: "Recruiters at companies you have actively applied to can see your full profile. In our talent community, recruiters searching for candidates see a limited view — without your contact details until you consent to share them. Your current employer cannot see your profile unless they are a client and you have applied to a role there." },
          { q: "Is my interview recording stored permanently?", a: "Interview recordings are retained for the duration of your active profile and for a legally-required period after closure (typically 12 months, to fulfil Swiss equal opportunity obligations). You can request deletion of recordings at any time through your data rights settings — subject to any ongoing legal retention requirements we will notify you of." },
          { q: "Will my data be used to train AI models?", a: "No — not without your separate explicit consent. Your data is used exclusively to facilitate your hiring process. It is not used for AI model training. If we ever introduce an optional contribution programme, it will be presented clearly and separately — never buried in terms and conditions." },
          { q: "What happens to my data if the platform is acquired or shuts down?", a: "Your data rights remain unchanged in any acquisition or shutdown scenario. You will be notified in advance and given the opportunity to download and/or request deletion before any transfer. Data will not be transferred to a new entity without your consent where required by law." },
        ],
      },
      {
        id: "help", label: "Getting Help", icon: "💁",
        items: [
          { q: "Who do I contact if I have a question not answered here?", a: "Email candidatesupport@[platform].ch — we respond within 1 business day. For urgent issues (such as a technical problem during an interview in progress), contact the recruiter named in your interview confirmation directly." },
          { q: "I think the AI treated me unfairly. What do I do?", a: "Submit a concern through 'Raise a Concern' in your portal, or email candidatesupport@[platform].ch with as much detail as possible. We will arrange a human review of your application and investigate the concern. If unsatisfied with our response, contact the Swiss FDPIC at www.edoeb.admin.ch." },
          { q: "I have a disability that might affect my AI interview performance. Is there support?", a: "Yes. Contact candidatesupport@[platform].ch before your interview is scheduled. We offer: audio-only interviews (no camera required), extended time per question, written response formats as an alternative to spoken responses, and human-conducted telephone interviews where AI interview is not accessible. We will work with you to find the right format." },
        ],
      },
    ],
  },
};

// ─── DOCUMENT VIEWER COMPONENTS ──────────────────────────────────

function DocViewerHowAI({ doc }) {
  const [openSection, setOpenSection] = useState(0);
  const [faqOpen, setFaqOpen] = useState(null);

  return (
    <div>
      {/* Commitment callout */}
      <div style={{ background: doc.commitment.bg, border: `1px solid ${doc.commitment.color}33`, borderLeft: `4px solid ${doc.commitment.color}`, borderRadius: 8, padding: "12px 16px", marginBottom: 20 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: doc.commitment.color, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>{doc.commitment.label}</div>
        {doc.commitment.points.map((p, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
            <span style={{ color: doc.commitment.color, marginTop: 1, flexShrink: 0 }}>✓</span>
            <span style={{ fontSize: 12, color: C.gray700, lineHeight: 1.5 }}>{p}</span>
          </div>
        ))}
      </div>

      {/* Accordion sections */}
      {doc.sections.map((sec, si) => (
        <div key={si} style={{ marginBottom: 8 }}>
          <button onClick={() => setOpenSection(openSection === si ? null : si)} style={{
            width: "100%", textAlign: "left", padding: "10px 14px", background: openSection === si ? C.navy : C.gray50,
            border: `1px solid ${openSection === si ? C.navy : C.gray200}`, borderRadius: 8, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: openSection === si ? "rgba(255,255,255,0.6)" : C.gray400, background: openSection === si ? "rgba(255,255,255,0.1)" : C.gray200, padding: "2px 7px", borderRadius: 4 }}>{sec.num}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: openSection === si ? C.white : C.gray800 }}>{sec.title}</span>
            </div>
            <span style={{ fontSize: 16, color: openSection === si ? C.white : C.gray400 }}>{openSection === si ? "−" : "+"}</span>
          </button>
          {openSection === si && (
            <div style={{ border: `1px solid ${C.gray200}`, borderTop: "none", borderRadius: "0 0 8px 8px", padding: "16px 16px 8px", background: C.white }}>
              {sec.items.map((item, ii) => (
                <div key={ii} style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.blue, marginBottom: 6 }}>{item.text}</div>
                  <p style={{ fontSize: 12, color: C.gray700, lineHeight: 1.65, margin: "0 0 8px" }}>{item.body}</p>
                  {item.bullets && (
                    <div style={{ paddingLeft: 12 }}>
                      {item.bullets.map((b, bi) => (
                        <div key={bi} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                          <span style={{ color: C.blue, flexShrink: 0 }}>•</span>
                          <span style={{ fontSize: 12, color: C.gray600, lineHeight: 1.5 }}>{b}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {item.note && (
                    <div style={{ marginTop: 8, background: item.note.bg, border: `1px solid ${item.note.color}33`, borderLeft: `3px solid ${item.note.color}`, borderRadius: 6, padding: "8px 12px" }}>
                      <div style={{ fontSize: 10, fontWeight: 800, color: item.note.color, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{item.note.label}</div>
                      <p style={{ fontSize: 11, color: C.gray700, margin: 0, lineHeight: 1.5 }}>{item.note.text}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* FAQ */}
      <div style={{ marginTop: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.gray700, marginBottom: 10 }}>Frequently Asked Questions</div>
        {doc.faqs.map((item, i) => (
          <div key={i} style={{ marginBottom: 6, border: `1px solid ${C.gray200}`, borderRadius: 8, overflow: "hidden" }}>
            <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} style={{ width: "100%", textAlign: "left", padding: "9px 12px", background: faqOpen === i ? C.blueLight : C.white, border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: faqOpen === i ? C.blue : C.gray800, paddingRight: 8 }}>{item.q}</span>
              <span style={{ fontSize: 14, color: C.gray400, flexShrink: 0 }}>{faqOpen === i ? "−" : "+"}</span>
            </button>
            {faqOpen === i && (
              <div style={{ padding: "8px 12px 12px", borderTop: `1px solid ${C.gray200}` }}>
                <p style={{ fontSize: 12, color: C.gray600, lineHeight: 1.65, margin: 0 }}>{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DocViewerRights({ doc }) {
  const [openRight, setOpenRight] = useState(null);

  return (
    <div>
      <div style={{ background: doc.commitment.bg, border: `1px solid ${C.navy}22`, borderLeft: `4px solid ${C.navy}`, borderRadius: 8, padding: "12px 16px", marginBottom: 20 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: C.navy, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>{doc.commitment.label}</div>
        {doc.commitment.points.map((p, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
            <span style={{ color: C.navy, flexShrink: 0 }}>→</span>
            <span style={{ fontSize: 12, color: C.gray700, lineHeight: 1.5 }}>{p}</span>
          </div>
        ))}
      </div>

      {/* Rights grid summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginBottom: 16 }}>
        {doc.rights.map((r, i) => (
          <button key={i} onClick={() => setOpenRight(openRight === i ? null : i)} style={{
            padding: "8px 10px", background: openRight === i ? C.navy : C.gray50, border: `1.5px solid ${openRight === i ? C.navy : C.gray200}`,
            borderRadius: 8, cursor: "pointer", textAlign: "left", transition: "all 0.15s",
          }}>
            <div style={{ fontSize: 9, fontWeight: 800, color: openRight === i ? "rgba(255,255,255,0.5)" : C.gray400, letterSpacing: "0.06em", marginBottom: 2 }}>{r.num}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: openRight === i ? C.white : C.gray800, lineHeight: 1.3 }}>{r.title.replace("The Right to ", "")}</div>
          </button>
        ))}
      </div>

      {/* Expanded right detail */}
      {openRight !== null && (
        <div style={{ background: C.white, border: `2px solid ${C.navy}`, borderRadius: 10, padding: 16, marginBottom: 12 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 10, fontWeight: 800, color: C.white, background: C.navy, padding: "3px 10px", borderRadius: 4, letterSpacing: "0.06em" }}>{doc.rights[openRight].num}</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: C.navy }}>{doc.rights[openRight].title}</span>
          </div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.teal, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>What we commit to</div>
            <p style={{ fontSize: 12, color: C.gray700, lineHeight: 1.65, margin: 0 }}>{doc.rights[openRight].commitment}</p>
          </div>
          <div style={{ background: C.tealLight, borderRadius: 8, padding: "10px 12px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.teal, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>How to exercise this right</div>
            <p style={{ fontSize: 12, color: "#065F46", lineHeight: 1.65, margin: 0 }}>{doc.rights[openRight].howTo}</p>
          </div>
        </div>
      )}

      <div style={{ background: C.gray50, border: `1px solid ${C.gray200}`, borderRadius: 8, padding: "10px 14px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.gray600, marginBottom: 6 }}>Contact</div>
        <div style={{ fontSize: 11, color: C.gray600, lineHeight: 1.8 }}>
          General support: <span style={{ color: C.blue }}>candidatesupport@[platform].ch</span><br />
          Data protection: <span style={{ color: C.blue }}>dpo@[platform].ch</span><br />
          Swiss FDPIC: <span style={{ color: C.blue }}>www.edoeb.admin.ch</span>
        </div>
      </div>
    </div>
  );
}

function DocViewerPrep({ doc }) {
  const [activeRole, setActiveRole] = useState(0);
  const role = doc.roles[activeRole];

  return (
    <div>
      <div style={{ background: doc.commitment.bg, border: `1px solid ${C.teal}33`, borderLeft: `4px solid ${C.teal}`, borderRadius: 8, padding: "12px 16px", marginBottom: 16 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: C.teal, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>{doc.commitment.label}</div>
        {doc.commitment.points.map((p, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
            <span style={{ color: C.teal, flexShrink: 0 }}>✓</span>
            <span style={{ fontSize: 12, color: C.gray700, lineHeight: 1.5 }}>{p}</span>
          </div>
        ))}
      </div>

      {/* Role tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {doc.roles.map((r, i) => (
          <button key={i} onClick={() => setActiveRole(i)} style={{
            padding: "7px 14px", fontSize: 12, fontWeight: 700, borderRadius: 8, cursor: "pointer", transition: "all 0.15s",
            background: activeRole === i ? r.color : C.gray50,
            color: activeRole === i ? C.white : C.gray700,
            border: `1.5px solid ${activeRole === i ? r.color : C.gray200}`,
          }}>{r.icon} {r.title}</button>
        ))}
      </div>

      {/* Role content */}
      <div style={{ animation: "fadeIn 0.2s ease" }}>
        <div style={{ background: role.color, borderRadius: 10, padding: "14px 16px", marginBottom: 14, color: C.white }}>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 6 }}>{role.icon} {role.title}</div>
          <p style={{ fontSize: 12, lineHeight: 1.6, margin: 0, opacity: 0.9 }}>{role.overview}</p>
        </div>

        {/* Question types */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.gray700, marginBottom: 8 }}>Question Types You'll Encounter</div>
          {role.questionTypes.map((qt, i) => (
            <div key={i} style={{ background: C.gray50, border: `1px solid ${C.gray200}`, borderRadius: 8, padding: "10px 12px", marginBottom: 6 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.navy, marginBottom: 3 }}>{qt.type}</div>
              <div style={{ fontSize: 11, color: C.gray600, marginBottom: 5, lineHeight: 1.5 }}>{qt.desc}</div>
              <div style={{ fontSize: 11, color: C.blue, fontStyle: "italic", background: C.blueLight, padding: "5px 8px", borderRadius: 5 }}>Example: "{qt.example}"</div>
            </div>
          ))}
        </div>

        {/* Framework */}
        <div style={{ background: `${role.color}12`, border: `1.5px solid ${role.color}44`, borderRadius: 10, padding: "12px 14px", marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: role.color, marginBottom: 8 }}>Answer Framework: {role.framework.name}</div>
          {role.framework.steps.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 5, alignItems: "flex-start" }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: role.color, color: C.white, fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
              <span style={{ fontSize: 12, color: C.gray700, lineHeight: 1.5 }}>{s}</span>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.gray700, marginBottom: 8 }}>Swiss Market Tips</div>
          {role.tips.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
              <span style={{ color: C.amber, flexShrink: 0, fontSize: 13 }}>→</span>
              <span style={{ fontSize: 12, color: C.gray600, lineHeight: 1.5 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DocViewerFAQ({ doc }) {
  const [activeCategory, setActiveCategory] = useState("platform");
  const [openItem, setOpenItem] = useState(null);
  const [search, setSearch] = useState("");

  const cat = doc.categories.find(c => c.id === activeCategory);
  const filtered = search.trim().length > 1
    ? doc.categories.flatMap(c => c.items.filter(i => i.q.toLowerCase().includes(search.toLowerCase()) || i.a.toLowerCase().includes(search.toLowerCase())))
    : cat.items;

  return (
    <div>
      {/* Search */}
      <div style={{ position: "relative", marginBottom: 14 }}>
        <input value={search} onChange={e => { setSearch(e.target.value); setOpenItem(null); }}
          placeholder="Search all 38 questions…"
          style={{ width: "100%", padding: "9px 12px 9px 36px", fontSize: 13, borderRadius: 8, border: `1.5px solid ${C.gray300}`, color: C.gray700, boxSizing: "border-box", background: C.white }} />
        <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>🔍</span>
      </div>

      {/* Category tabs */}
      {!search.trim() && (
        <div style={{ display: "flex", gap: 4, marginBottom: 14, flexWrap: "wrap" }}>
          {doc.categories.map(c => (
            <button key={c.id} onClick={() => { setActiveCategory(c.id); setOpenItem(null); }} style={{
              padding: "5px 12px", fontSize: 11, fontWeight: 600, borderRadius: 20, cursor: "pointer",
              background: activeCategory === c.id ? C.navy : C.gray50,
              color: activeCategory === c.id ? C.white : C.gray600,
              border: `1.5px solid ${activeCategory === c.id ? C.navy : C.gray200}`,
            }}>{c.icon} {c.label}</button>
          ))}
        </div>
      )}

      {search.trim() && filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "24px 0", color: C.gray400 }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>🤷</div>
          <div style={{ fontSize: 13 }}>No results for "{search}" — try different keywords or <button onClick={() => setSearch("")} style={{ color: C.blue, background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>browse all questions</button></div>
        </div>
      )}

      {/* Q&A items */}
      {filtered.map((item, i) => (
        <div key={i} style={{ marginBottom: 6, border: `1px solid ${C.gray200}`, borderRadius: 8, overflow: "hidden" }}>
          <button onClick={() => setOpenItem(openItem === i ? null : i)} style={{
            width: "100%", textAlign: "left", padding: "10px 14px", background: openItem === i ? C.blueLight : C.white,
            border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8,
          }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: openItem === i ? C.blue : C.gray800, lineHeight: 1.5 }}>{item.q}</span>
            <span style={{ fontSize: 16, color: C.gray400, flexShrink: 0, marginTop: 1 }}>{openItem === i ? "−" : "+"}</span>
          </button>
          {openItem === i && (
            <div style={{ padding: "10px 14px 14px", borderTop: `1px solid ${C.gray200}`, background: C.white }}>
              <p style={{ fontSize: 12, color: C.gray600, lineHeight: 1.7, margin: 0 }}>{item.a}</p>
            </div>
          )}
        </div>
      ))}

      <div style={{ marginTop: 14, background: C.gray50, border: `1px solid ${C.gray200}`, borderRadius: 8, padding: "10px 14px" }}>
        <div style={{ fontSize: 11, color: C.gray600, lineHeight: 1.7 }}>
          <b>Still have a question?</b> Email <span style={{ color: C.blue }}>candidatesupport@[platform].ch</span> — response within 1 business day. This FAQ is updated quarterly.
        </div>
      </div>
    </div>
  );
}

// ─── MAIN DOCS SCREEN ────────────────────────────────────────────
function DocsScreen() {
  const [activeDoc, setActiveDoc] = useState(null);
  const [npsScore, setNpsScore] = useState(null);
  const [npsSent, setNpsSent] = useState(false);

  const docList = [
    { key: "howai", ...TRUST_DOCS.howai },
    { key: "rights", ...TRUST_DOCS.rights },
    { key: "prep", ...TRUST_DOCS.prep },
    { key: "faq", ...TRUST_DOCS.faq },
  ];

  const openDoc = activeDoc ? TRUST_DOCS[activeDoc] : null;

  const renderers = {
    howai: <DocViewerHowAI doc={TRUST_DOCS.howai} />,
    rights: <DocViewerRights doc={TRUST_DOCS.rights} />,
    prep: <DocViewerPrep doc={TRUST_DOCS.prep} />,
    faq: <DocViewerFAQ doc={TRUST_DOCS.faq} />,
  };

  return (
    <div>
      <RecLabel id="REC 8.1 · 8.2 · 8.3 · 8.4" />
      <SectionTitle rec="" >Trust Documentation Hub — Full Document Viewer</SectionTitle>

      {!activeDoc ? (
        /* ── LIBRARY VIEW ── */
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 580px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14, marginBottom: 20 }}>
              {docList.map(doc => (
                <Card key={doc.key} style={{ padding: 0, overflow: "hidden", cursor: "pointer", transition: "box-shadow 0.2s", border: `1px solid ${C.gray200}` }}
                  onClick={() => setActiveDoc(doc.key)}>
                  {/* Top band */}
                  <div style={{ background: C.navy, padding: "16px 16px 12px" }}>
                    <div style={{ fontSize: 28, marginBottom: 6 }}>{doc.icon}</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: C.white, lineHeight: 1.3, marginBottom: 4 }}>{doc.title}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{doc.subtitle}</div>
                  </div>
                  {/* Body */}
                  <div style={{ padding: "12px 16px" }}>
                    <p style={{ fontSize: 12, color: C.gray600, lineHeight: 1.6, margin: "0 0 12px" }}>{doc.desc}</p>
                    <div style={{ display: "flex", gap: 6, alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: doc.tagColor, background: doc.tagBg, padding: "2px 8px", borderRadius: 20 }}>{doc.tag}</span>
                        <span style={{ fontSize: 10, color: C.gray400, background: C.gray100, padding: "2px 8px", borderRadius: 20 }}>{doc.ref}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 4, marginTop: 10 }}>
                      {doc.langs.map(l => (
                        <span key={l} style={{ fontSize: 10, fontWeight: 600, color: C.gray500, background: C.gray100, border: `1px solid ${C.gray200}`, padding: "1px 6px", borderRadius: 4 }}>{l}</span>
                      ))}
                    </div>
                    <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 10, color: C.gray400 }}>Updated {doc.updated}</span>
                      <Btn variant="primary" size="sm" icon="arrow_right" onClick={(e) => { e.stopPropagation(); setActiveDoc(doc.key); }}>Open</Btn>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Contact strip */}
            <Card style={{ padding: "12px 16px", background: C.gray50 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.gray700, marginBottom: 6 }}>Candidate Support Contacts</div>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                {[
                  { label: "General support", val: "candidatesupport@[platform].ch" },
                  { label: "Data protection (DPO)", val: "dpo@[platform].ch" },
                  { label: "Swiss FDPIC", val: "www.edoeb.admin.ch" },
                ].map(c => (
                  <div key={c.label}>
                    <div style={{ fontSize: 10, color: C.gray400 }}>{c.label}</div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: C.blue }}>{c.val}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* NPS survey */}
          <div style={{ flex: "1 1 240px" }}>
            <RecLabel id="REC 7.5" />
            <SectionTitle>Post-Process NPS Survey</SectionTitle>
            <Card>
              {npsSent ? (
                <div style={{ textAlign: "center", padding: "24px 0" }}>
                  <div style={{ fontSize: 36, marginBottom: 8 }}>🙏</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.gray900, marginBottom: 4 }}>Thank you!</div>
                  <div style={{ fontSize: 12, color: C.gray500, lineHeight: 1.5 }}>Your feedback helps us improve the experience for every candidate on the platform.</div>
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.gray900, marginBottom: 4 }}>How was your experience?</div>
                    <p style={{ fontSize: 12, color: C.gray600, lineHeight: 1.5, margin: 0 }}>3 questions · 60 seconds · helps improve the experience for all candidates</p>
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.gray700, marginBottom: 8 }}>How likely are you to recommend this platform to a colleague?</div>
                    <div style={{ display: "flex", gap: 3 }}>
                      {[1,2,3,4,5,6,7,8,9,10].map(n => (
                        <button key={n} onClick={() => setNpsScore(n)} style={{
                          flex: 1, padding: "6px 0", fontSize: 11, fontWeight: 700, cursor: "pointer", borderRadius: 5, transition: "all 0.15s",
                          background: npsScore === n ? C.navy : n >= 9 ? C.tealLight : C.white,
                          color: npsScore === n ? C.white : n >= 9 ? C.teal : C.gray600,
                          border: `1.5px solid ${npsScore === n ? C.navy : n >= 9 ? C.teal : C.gray300}`,
                        }}>{n}</button>
                      ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                      <span style={{ fontSize: 10, color: C.gray400 }}>Not likely</span>
                      <span style={{ fontSize: 10, color: C.gray400 }}>Very likely</span>
                    </div>
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.gray700, marginBottom: 5 }}>What was the most positive part?</div>
                    <textarea placeholder="What worked well…" style={{ width: "100%", height: 48, fontSize: 12, padding: "7px 10px", borderRadius: 6, border: `1px solid ${C.gray300}`, resize: "none", boxSizing: "border-box", color: C.gray700 }} />
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.gray700, marginBottom: 5 }}>What was most frustrating?</div>
                    <textarea placeholder="What could be better…" style={{ width: "100%", height: 48, fontSize: 12, padding: "7px 10px", borderRadius: 6, border: `1px solid ${C.gray300}`, resize: "none", boxSizing: "border-box", color: C.gray700 }} />
                  </div>
                  <Btn variant="teal" size="sm" onClick={() => setNpsSent(true)}>Submit Feedback</Btn>
                </>
              )}
            </Card>
          </div>
        </div>
      ) : (
        /* ── DOCUMENT VIEWER ── */
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 520px" }}>
            {/* Doc header */}
            <div style={{ background: C.navy, borderRadius: "12px 12px 0 0", padding: "16px 20px" }}>
              <button onClick={() => setActiveDoc(null)} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 6, cursor: "pointer", marginBottom: 12, display: "flex", alignItems: "center", gap: 4 }}>
                ← Back to Library
              </button>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: 32 }}>{openDoc.icon}</span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: C.white }}>{openDoc.title}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>{openDoc.subtitle}</div>
                  <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: C.white, background: "rgba(255,255,255,0.12)", padding: "2px 8px", borderRadius: 20 }}>{openDoc.ref}</span>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.08)", padding: "2px 8px", borderRadius: 20 }}>Updated {openDoc.updated}</span>
                    {openDoc.langs.map(l => <span key={l} style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.08)", padding: "2px 6px", borderRadius: 4 }}>{l}</span>)}
                  </div>
                </div>
              </div>
            </div>
            {/* Doc body */}
            <div style={{ background: C.white, border: `1px solid ${C.gray200}`, borderTop: "none", borderRadius: "0 0 12px 12px", padding: 20, maxHeight: 680, overflowY: "auto" }}>
              {renderers[activeDoc]}
            </div>
          </div>

          {/* Side panel: doc switcher */}
          <div style={{ flex: "0 0 200px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.gray500, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>All Documents</div>
            {docList.map(doc => (
              <button key={doc.key} onClick={() => setActiveDoc(doc.key)} style={{
                width: "100%", textAlign: "left", padding: "9px 12px", marginBottom: 6, borderRadius: 8, cursor: "pointer",
                background: activeDoc === doc.key ? C.navy : C.white,
                border: `1.5px solid ${activeDoc === doc.key ? C.navy : C.gray200}`,
                display: "flex", gap: 8, alignItems: "center",
              }}>
                <span style={{ fontSize: 18 }}>{doc.icon}</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: activeDoc === doc.key ? C.white : C.gray800, lineHeight: 1.3 }}>{doc.title}</div>
                  <div style={{ fontSize: 10, color: activeDoc === doc.key ? "rgba(255,255,255,0.5)" : C.gray400 }}>{doc.ref}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════════════════════════
export default function App() {
  const [active, setActive] = useState("outreach");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const screens = {
    outreach: <OutreachScreen />,
    interview_brief: <PreInterviewScreen />,
    interview_live: <LiveInterviewScreen />,
    interview_post: <PostInterviewScreen />,
    portal: <PortalScreen />,
    profile: <ProfileScreen />,
    status: <StatusScreen />,
    messaging: <MessagingScreen />,
    features: <FeaturesScreen />,
    docs: <DocsScreen />,
  };

  const activeSection = SECTIONS.find(s => s.id === active);

  return (
    <div style={{ fontFamily: "'DM Sans', 'Instrument Sans', system-ui, sans-serif", background: C.gray100, minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* Top header */}
      <div style={{ background: C.navy, padding: "0 20px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", gap: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF6058" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FFBD2E" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28CA42" }} />
          </div>
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)" }} />
          <div style={{ fontSize: 13, fontWeight: 700, color: C.white }}>Candidate Experience</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Mockup Simulator</div>
          <div style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 4, padding: "2px 8px", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "0.06em" }}>FOR DESIGN & DEV TEAM</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>30+ Recommendations · 10 Screens · Light Mode</div>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.blue, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: C.white }}>JA</div>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <div style={{ width: sidebarOpen ? 220 : 56, background: C.white, borderRight: `1px solid ${C.gray200}`, flexShrink: 0, transition: "width 0.25s ease", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {/* Sidebar toggle */}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ padding: "12px 16px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, color: C.gray400, borderBottom: `1px solid ${C.gray100}` }}>
            <Icon name={sidebarOpen ? "arrow_left" : "arrow_right"} size={14} />
            {sidebarOpen && <span style={{ fontSize: 11, fontWeight: 600 }}>Collapse</span>}
          </button>

          {SECTIONS.map((sec, idx) => {
            const isActive = active === sec.id;
            return (
              <button key={sec.id} onClick={() => setActive(sec.id)} style={{
                padding: sidebarOpen ? "10px 16px" : "12px 16px",
                background: isActive ? C.blueLight : "none",
                border: "none", borderLeft: `3px solid ${isActive ? C.blue : "transparent"}`,
                cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 10, transition: "all 0.15s",
              }}>
                <div style={{ width: 20, flexShrink: 0 }}>
                  <Icon name={sec.icon} size={16} color={isActive ? C.blue : C.gray400} />
                </div>
                {sidebarOpen && (
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: isActive ? C.blue : C.gray700, whiteSpace: "nowrap" }}>{sec.label}</div>
                    <div style={{ fontSize: 10, color: C.gray400, whiteSpace: "nowrap" }}>{sec.desc}</div>
                  </div>
                )}
              </button>
            );
          })}

          {sidebarOpen && (
            <div style={{ marginTop: "auto", padding: "12px 16px", borderTop: `1px solid ${C.gray100}` }}>
              <div style={{ fontSize: 10, color: C.gray400, lineHeight: 1.6 }}>
                <b style={{ color: C.gray600 }}>Legend:</b><br />
                <span style={{ background: "#EFF6FF", color: C.blue, padding: "1px 5px", borderRadius: 3, fontSize: 9 }}>REC X.X</span> = Specific recommendation from strategy doc
              </div>
            </div>
          )}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, overflow: "auto", padding: 20 }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
            <span style={{ fontSize: 11, color: C.gray400 }}>Simulator</span>
            <Icon name="arrow_right" size={12} color={C.gray400} />
            <span style={{ fontSize: 11, fontWeight: 600, color: C.gray700 }}>{activeSection?.label}</span>
            <span style={{ fontSize: 11, color: C.gray400 }}>·</span>
            <span style={{ fontSize: 11, color: C.gray400 }}>{activeSection?.desc}</span>
          </div>

          {/* Screen render */}
          <div style={{ animation: "fadeIn 0.2s ease" }}>
            {screens[active]}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; }
        button:hover:not(:disabled) { filter: brightness(0.96); }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #F3F4F6; }
        ::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 99px; }
      `}</style>
    </div>
  );
}

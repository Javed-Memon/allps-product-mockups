import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════
   ALLPS AI × SICTIC — Bilingual + Dark/Light Mode
   ═══════════════════════════════════════════════ */

// ─── Theme tokens (ALLPS brand) ───
const themes = {
  light: {
    bg: "#fafaf8",
    bgAlt: "#fff",
    bgCard: "#fff",
    bgCardHover: "#f8faf8",
    bgInput: "#fafaf8",
    bgMuted: "#f5f5f2",
    bgTicker: "#111",
    bgBottom: "#111",
    bgFooter: "#0a0a0a",
    bgGreen: "#f0fdf4",
    bgYellow: "#fefce8",
    border: "#e8e8e4",
    borderGreen: "#bbf7d0",
    borderYellow: "#fef08a",
    borderCard: "#e0e0dc",
    text: "#1a1a1a",
    textStrong: "#111",
    textBody: "#555",
    textMuted: "#777",
    textFaint: "#888",
    textDim: "#aaa",
    textOnDark: "#888",
    accent: "#16a36a",
    accentDark: "#0d8a56",
    accentGlow: "rgba(22,163,106,0.2)",
    accentSoft: "rgba(22,163,106,0.06)",
    accentBorder: "#16a36a",
    highlight: "#c4b5fd",
    badgeBg: "#dc2626",
    navBg: "rgba(250,250,248,0.88)",
    navBorder: "rgba(0,0,0,0.06)",
    toggleBg: "#f0f0ed",
    checkGreen: "#16a34a",
    checkYellow: "#ca8a04",
    checkNull: "#d4d4d8",
    takeawayBg: "#f0fdf4",
    takeawayBorder: "#bbf7d0",
    takeawayText: "#166534",
    quoteColor: "#16a36a",
    signupGrad: "linear-gradient(180deg, #fff 0%, #f0fdf4 100%)",
    offerBorder: "#16a36a",
    tableAlt: "rgba(0,0,0,0.01)",
    tableHead: "#f5f5f2",
    shadow: "0 12px 40px rgba(0,0,0,0.06)",
    shadowOffer: "0 20px 60px rgba(22,163,106,0.08), 0 1px 3px rgba(0,0,0,0.04)",
    pipelineBg: "rgba(255,255,255,0.03)",
    featureInactive: "#f0f0ed",
  },
  dark: {
    bg: "#0a0a12",
    bgAlt: "#0f0f1a",
    bgCard: "rgba(255,255,255,0.03)",
    bgCardHover: "rgba(255,255,255,0.06)",
    bgInput: "rgba(255,255,255,0.05)",
    bgMuted: "rgba(255,255,255,0.04)",
    bgTicker: "#060609",
    bgBottom: "#060609",
    bgFooter: "#030306",
    bgGreen: "rgba(22,163,106,0.08)",
    bgYellow: "rgba(251,191,36,0.08)",
    border: "rgba(255,255,255,0.06)",
    borderGreen: "rgba(22,163,106,0.2)",
    borderYellow: "rgba(251,191,36,0.2)",
    borderCard: "rgba(255,255,255,0.08)",
    text: "#e4e4ef",
    textStrong: "#fff",
    textBody: "#a0a0b4",
    textMuted: "#8888a0",
    textFaint: "#6b6b7b",
    textDim: "#555566",
    textOnDark: "#6b6b7b",
    accent: "#22c55e",
    accentDark: "#16a34a",
    accentGlow: "rgba(34,197,94,0.2)",
    accentSoft: "rgba(34,197,94,0.06)",
    accentBorder: "#22c55e",
    highlight: "#c4b5fd",
    badgeBg: "#dc2626",
    navBg: "rgba(10,10,18,0.92)",
    navBorder: "rgba(255,255,255,0.06)",
    toggleBg: "rgba(255,255,255,0.06)",
    checkGreen: "#22c55e",
    checkYellow: "#eab308",
    checkNull: "#4a4a5a",
    takeawayBg: "rgba(34,197,94,0.06)",
    takeawayBorder: "rgba(34,197,94,0.15)",
    takeawayText: "#86efac",
    quoteColor: "#22c55e",
    signupGrad: "linear-gradient(180deg, rgba(15,15,26,1) 0%, rgba(22,163,106,0.04) 100%)",
    offerBorder: "#22c55e",
    tableAlt: "rgba(255,255,255,0.015)",
    tableHead: "rgba(255,255,255,0.04)",
    shadow: "0 12px 40px rgba(0,0,0,0.3)",
    shadowOffer: "0 20px 60px rgba(34,197,94,0.06), 0 1px 3px rgba(0,0,0,0.2)",
    pipelineBg: "rgba(255,255,255,0.03)",
    featureInactive: "rgba(255,255,255,0.05)",
  },
};

// ─── Translations ───
const T = {
  en: {
    nav: { features: "Features", compare: "Compare", signup: "Sign Up", cta: "Start Free Trial" },
    hero: {
      badge: "SICTIC Startup Marketplace Partner Offer",
      h1a: "Hire with ", h1b: "certainty", h1c: ",", h1d: "not guesswork.",
      sub: "The AI-native hiring platform built for lean teams. From sourcing to AI interviews — replace your entire recruitment stack with one intelligent platform.",
      cta: "Start Free Trial →", noCc: "No credit card required",
      trust: ["Swiss-hosted", "nLPD / GDPR", "EU AI Act Ready"],
    },
    offer: {
      tag: "SICTIC MEMBER OFFER", pct: "40", disc: "Discount for SICTIC members",
      items: [
        { icon: "♾️", text: "Unlimited Jobs — post as many roles as you need", hl: true },
        { icon: "👥", text: "Unlimited Users — your whole team, no per-seat fees", hl: true },
        { icon: "🔍", text: "Additional discount on AI Sourcing platform", tag: "COMING SOON" },
      ],
      cta: "Claim Your SICTIC Offer",
    },
    stats: [
      { value: "80%", label: "Time saved on screening" }, { value: "4h+", label: "Reclaimed per day" },
      { value: "600M+", label: "Candidate profiles" }, { value: "24/7", label: "AI interviews available" },
    ],
    pipeline: { label: "THE AI HIRING PIPELINE", h2: "One platform. Zero recruiters needed.", sub: "From sourcing passive candidates to conducting technical interviews — ALLPS AI handles the entire pipeline so lean teams can hire like enterprises." },
    features: [
      { icon: "🔍", title: "AI Sourcing", desc: "Search 600M+ profiles. Our AI finds passive candidates your competitors miss — before they even start looking.", tag: "Source" },
      { icon: "🎯", title: "AI Matching & Ranking", desc: "Every CV scored and ranked by fit. No more reading 200 resumes — see the top 10 in seconds.", tag: "Match" },
      { icon: "🎙️", title: "AI Screening Interviews", desc: "Automated 24/7 voice interviews that screen candidates on your criteria. Reclaim 4+ hours per day.", tag: "Screen" },
      { icon: "💻", title: "AI Skills Interviews", desc: "Technical and role-specific assessments conducted by AI — the capability no other European platform offers.", tag: "Assess" },
      { icon: "📋", title: "Full AI-Native ATS", desc: "Pipeline management, career pages, collaboration — a complete applicant tracking system built around AI, not bolted on.", tag: "Manage" },
      { icon: "🌐", title: "Talent Platform", desc: "Candidates create profiles and get matched to your roles. Build a living talent pool that grows with every hire.", tag: "Grow" },
    ],
    compare: {
      label: "WHY ALLPS AI", h2: "What others can't do",
      sub: "Most platforms track applicants. ALLPS AI actually finds, screens, and interviews them — autonomously.",
      colCap: "Capability", colAllps: "ALLPS AI", colOther: "Typical ATS",
      rows: ["AI-Conducted Screening Interviews", "AI Skills & Technical Interviews", "AI Sourcing (Passive Candidates)", "AI Matching & Ranking", "Full ATS Workflow", "Swiss Data Residency (nLPD)", "Candidate Talent Platform", "EU AI Act Ready"],
      takeaway: "ALLPS AI is the only European platform that combines AI Sourcing, AI Matching, AI Interviews (both screening and skills assessment), and a full ATS — purpose-built for lean teams.",
    },
    testimonials: [
      { quote: "We were drowning in CVs and spending days on screening calls. ALLPS AI's screening interviews changed our hiring completely.", role: "Head of People, DACH Scaleup" },
      { quote: "The AI skills interviews give us structured assessment data we never had. We finally know why we're hiring someone, not just that we liked them.", role: "CTO, Swiss Tech Startup" },
      { quote: "As a 15-person startup with no recruiter, ALLPS AI is our entire hiring department. Sourcing, screening, interviews — all handled.", role: "CEO, Zurich-based SaaS" },
    ],
    signupSection: {
      label: "EXCLUSIVE SICTIC OFFER", h2a: "Start hiring smarter —", h2b: "today.",
      sub: "Sign up for your free trial and unlock your exclusive SICTIC member benefits. No credit card, no commitment — just smarter hiring from day one.",
      benefits: [
        { icon: "💰", title: "40% Discount", desc: "Exclusive savings for SICTIC community members" },
        { icon: "♾️", title: "Unlimited Jobs & Users", desc: "No per-seat pricing. Your whole team gets full access" },
        { icon: "🔍", title: "AI Sourcing Discount", desc: "Additional savings on our sourcing platform (coming soon)" },
        { icon: "🚀", title: "14-Day Free Trial", desc: "Full platform access. AI interviews, matching, the works" },
      ],
      dataNote: "Your data is stored securely in Switzerland. ALLPS AI is nLPD/GDPR compliant and EU AI Act ready.",
    },
    form: {
      h3: "Create your free account", sub: "14-day free trial · SICTIC 40% discount applied automatically",
      company: "Company / Organisation *", companyPh: "Your company name",
      first: "First Name *", firstPh: "First name", last: "Last Name *", lastPh: "Last name",
      email: "Work Email *", emailPh: "you@company.com",
      phone: "Phone (optional)", phonePh: "79 123 45 67",
      password: "Password *", passwordPh: "Min. 8 characters",
      show: "Show", hide: "Hide",
      submit: "Start Free Trial — 40% SICTIC Discount",
      legal: "By signing up you agree to the ALLPS AI Terms of Service and Privacy Policy. Your SICTIC 40% discount will be applied at checkout.",
      successH: "Welcome to ALLPS AI!", successP1: "We've sent a confirmation email to",
      successP2: ". Click the link to activate your account and start your 14-day free trial with your SICTIC 40% discount.",
    },
    bottom: { h2: "Stop drowning in CVs.", sub: "Join the SICTIC community members already hiring smarter with ALLPS AI. Your 40% discount is waiting.", cta: "Start Your Free Trial →" },
  },
  de: {
    nav: { features: "Funktionen", compare: "Vergleich", signup: "Registrieren", cta: "Kostenlos testen" },
    hero: {
      badge: "SICTIC Startup Marketplace Partner-Angebot",
      h1a: "Stellen Sie mit ", h1b: "Sicherheit", h1c: " ein,", h1d: "nicht auf gut Glück.",
      sub: "Die KI-native Recruiting-Plattform für schlanke Teams. Vom Sourcing bis zum KI-Interview — ersetzen Sie Ihren gesamten Recruiting-Stack durch eine einzige intelligente Plattform.",
      cta: "Kostenlos testen →", noCc: "Keine Kreditkarte erforderlich",
      trust: ["Gehostet in der Schweiz", "nLPD / DSGVO", "EU AI Act konform"],
    },
    offer: {
      tag: "SICTIC-MITGLIEDER-ANGEBOT", pct: "40", disc: "Rabatt für SICTIC-Mitglieder",
      items: [
        { icon: "♾️", text: "Unbegrenzte Jobs — so viele Stellen wie Sie brauchen", hl: true },
        { icon: "👥", text: "Unbegrenzte Nutzer — Ihr ganzes Team, keine Kosten pro Sitzplatz", hl: true },
        { icon: "🔍", text: "Zusätzlicher Rabatt auf die KI-Sourcing-Plattform", tag: "BALD VERFÜGBAR" },
      ],
      cta: "SICTIC-Angebot sichern",
    },
    stats: [
      { value: "80%", label: "Zeitersparnis beim Screening" }, { value: "4h+", label: "Pro Tag zurückgewonnen" },
      { value: "600M+", label: "Kandidatenprofile" }, { value: "24/7", label: "KI-Interviews verfügbar" },
    ],
    pipeline: { label: "DIE KI-RECRUITING-PIPELINE", h2: "Eine Plattform. Kein Recruiter nötig.", sub: "Vom Sourcing passiver Kandidaten bis zur Durchführung technischer Interviews — ALLPS AI übernimmt die gesamte Pipeline, damit schlanke Teams wie Grossunternehmen einstellen können." },
    features: [
      { icon: "🔍", title: "KI-Sourcing", desc: "Durchsuchen Sie 600M+ Profile. Unsere KI findet passive Kandidaten, die Ihren Mitbewerbern entgehen — bevor diese überhaupt suchen.", tag: "Suchen" },
      { icon: "🎯", title: "KI-Matching & Ranking", desc: "Jeder Lebenslauf wird nach Eignung bewertet und gerankt. Kein manuelles Durchlesen von 200 CVs mehr — sehen Sie sofort die Top 10.", tag: "Matchen" },
      { icon: "🎙️", title: "KI-Screening-Interviews", desc: "Automatisierte 24/7-Interviews, die Kandidaten nach Ihren Kriterien prüfen. Gewinnen Sie 4+ Stunden pro Tag zurück.", tag: "Screenen" },
      { icon: "💻", title: "KI-Skills-Interviews", desc: "Technische und rollenspezifische Assessments durch KI — eine Fähigkeit, die keine andere europäische Plattform bietet.", tag: "Bewerten" },
      { icon: "📋", title: "Vollständiges KI-ATS", desc: "Pipeline-Management, Karriereseiten, Zusammenarbeit — ein komplettes Bewerbermanagement-System, das um KI herum gebaut wurde.", tag: "Verwalten" },
      { icon: "🌐", title: "Talent-Plattform", desc: "Kandidaten erstellen Profile und werden mit Ihren Stellen gematcht. Bauen Sie einen lebendigen Talent-Pool auf, der mit jeder Einstellung wächst.", tag: "Wachsen" },
    ],
    compare: {
      label: "WARUM ALLPS AI", h2: "Was andere nicht können",
      sub: "Die meisten Plattformen verwalten Bewerbungen. ALLPS AI findet, prüft und interviewt Kandidaten — autonom.",
      colCap: "Fähigkeit", colAllps: "ALLPS AI", colOther: "Typisches ATS",
      rows: ["KI-geführte Screening-Interviews", "KI-Skills- & Technik-Interviews", "KI-Sourcing (passive Kandidaten)", "KI-Matching & Ranking", "Vollständiger ATS-Workflow", "Schweizer Datenresidenz (nLPD)", "Kandidaten-Talent-Plattform", "EU AI Act konform"],
      takeaway: "ALLPS AI ist die einzige europäische Plattform, die KI-Sourcing, KI-Matching, KI-Interviews (Screening und Skills-Assessment) und ein vollständiges ATS kombiniert — speziell für schlanke Teams entwickelt.",
    },
    testimonials: [
      { quote: "Wir ertranken in CVs und verbrachten Tage mit Screening-Calls. Die KI-Interviews von ALLPS AI haben unser Hiring komplett verändert.", role: "Head of People, DACH Scaleup" },
      { quote: "Die KI-Skills-Interviews liefern uns strukturierte Bewertungsdaten, die wir nie hatten. Wir wissen endlich, warum wir jemanden einstellen.", role: "CTO, Schweizer Tech-Startup" },
      { quote: "Als 15-köpfiges Startup ohne Recruiter ist ALLPS AI unsere gesamte HR-Abteilung. Sourcing, Screening, Interviews — alles abgedeckt.", role: "CEO, Zürcher SaaS-Unternehmen" },
    ],
    signupSection: {
      label: "EXKLUSIVES SICTIC-ANGEBOT", h2a: "Beginnen Sie heute —", h2b: "smarter zu rekrutieren.",
      sub: "Registrieren Sie sich für Ihre kostenlose Testphase und sichern Sie sich Ihre exklusiven SICTIC-Mitglieder-Vorteile. Keine Kreditkarte, keine Verpflichtung — einfach smarteres Hiring ab Tag eins.",
      benefits: [
        { icon: "💰", title: "40% Rabatt", desc: "Exklusive Ersparnis für SICTIC-Community-Mitglieder" },
        { icon: "♾️", title: "Unbegrenzte Jobs & Nutzer", desc: "Keine Pro-Sitzplatz-Preise. Ihr ganzes Team hat vollen Zugang" },
        { icon: "🔍", title: "KI-Sourcing-Rabatt", desc: "Zusätzliche Ersparnis auf unsere Sourcing-Plattform (bald verfügbar)" },
        { icon: "🚀", title: "14 Tage kostenlos testen", desc: "Voller Plattformzugang. KI-Interviews, Matching, alles inklusive" },
      ],
      dataNote: "Ihre Daten werden sicher in der Schweiz gespeichert. ALLPS AI ist nLPD/DSGVO-konform und EU AI Act ready.",
    },
    form: {
      h3: "Kostenloses Konto erstellen", sub: "14 Tage kostenlos testen · SICTIC 40% Rabatt wird automatisch angewandt",
      company: "Firma / Organisation *", companyPh: "Ihr Firmenname",
      first: "Vorname *", firstPh: "Vorname", last: "Nachname *", lastPh: "Nachname",
      email: "Geschäftliche E-Mail *", emailPh: "sie@firma.com",
      phone: "Telefon (optional)", phonePh: "79 123 45 67",
      password: "Passwort *", passwordPh: "Mind. 8 Zeichen",
      show: "Zeigen", hide: "Verbergen",
      submit: "Kostenlos testen — 40% SICTIC-Rabatt",
      legal: "Mit der Registrierung stimmen Sie den AGB und der Datenschutzrichtlinie von ALLPS AI zu. Ihr SICTIC 40%-Rabatt wird bei der Bestellung angewandt.",
      successH: "Willkommen bei ALLPS AI!", successP1: "Wir haben eine Bestätigungs-E-Mail an",
      successP2: " gesendet. Klicken Sie auf den Link, um Ihr Konto zu aktivieren und Ihre 14-tägige Testphase mit 40% SICTIC-Rabatt zu starten.",
    },
    bottom: { h2: "Schluss mit dem CV-Chaos.", sub: "Schliessen Sie sich den SICTIC-Mitgliedern an, die bereits smarter rekrutieren mit ALLPS AI. Ihr 40%-Rabatt wartet.", cta: "Jetzt kostenlos testen →" },
  },
};

const COMP_DATA = [
  { allps: true, others: false }, { allps: true, others: false },
  { allps: true, others: "partial" }, { allps: true, others: "partial" },
  { allps: true, others: true }, { allps: true, others: false },
  { allps: true, others: false }, { allps: true, others: false },
];

function CheckIcon({ val, c }) {
  if (val === true) return <span style={{ color: c.checkGreen, fontSize: 18, fontWeight: 700 }}>✓</span>;
  if (val === "partial") return <span style={{ color: c.checkYellow, fontSize: 16 }}>◐</span>;
  return <span style={{ color: c.checkNull, fontSize: 18 }}>✗</span>;
}

// ─── Sun / Moon icons ───
function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function SICTICLanding() {
  const [lang, setLang] = useState("en");
  const [mode, setMode] = useState("light");
  const [form, setForm] = useState({ company: "", firstName: "", lastName: "", email: "", phone: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [visible, setVisible] = useState(new Set());
  const observerRefs = useRef({});

  const t = T[lang];
  const c = themes[mode];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setVisible((p) => new Set([...p, e.target.dataset.section])); }); },
      { threshold: 0.12 }
    );
    Object.values(observerRefs.current).forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };
  const sectionRef = (key) => (el) => { observerRefs.current[key] = el; };
  const fadeIn = (key, delay = 0) => ({
    opacity: visible.has(key) ? 1 : 0, transform: visible.has(key) ? "translateY(0)" : "translateY(28px)",
    transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
  });

  const serif = "'Playfair Display', Georgia, serif";
  const sans = "'Plus Jakarta Sans', 'Helvetica Neue', sans-serif";
  const mono = "'IBM Plex Mono', Menlo, monospace";

  const inputStyle = {
    width: "100%", padding: "12px 14px", border: `1px solid ${c.border}`, borderRadius: 10,
    fontSize: 14, fontFamily: sans, background: c.bgInput, color: c.text, transition: "all 0.2s",
  };

  return (
    <div style={{ fontFamily: sans, background: c.bg, color: c.text, minHeight: "100vh", overflowX: "hidden", transition: "background 0.4s, color 0.4s" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; }
        ::selection { background: ${mode === "dark" ? "#1a3a2a" : "#d1fae5"}; color: ${mode === "dark" ? "#e8f5e0" : "#065f46"}; }
        @keyframes pulse-ring { 0%{box-shadow:0 0 0 0 ${c.accentGlow}} 70%{box-shadow:0 0 0 12px transparent} 100%{box-shadow:0 0 0 0 transparent} }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .cta-btn:hover { transform: translateY(-2px) !important; box-shadow: 0 8px 32px ${c.accentGlow} !important; }
        .form-input:focus { border-color: ${c.accent} !important; box-shadow: 0 0 0 3px ${c.accentGlow} !important; outline: none; }
        .nav-link:hover { color: ${c.accent} !important; }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0 30px ${c.bgCard} inset !important; -webkit-text-fill-color: ${c.text} !important; }
        .toggle-pill { display:flex; align-items:center; gap:2px; padding:2px; border-radius:6px; background:${c.toggleBg}; }
        .toggle-btn { cursor:pointer; border:none; font-size:13px; font-weight:500; padding:4px 10px; border-radius:4px; transition:all 0.2s; font-family:${sans}; display:flex; align-items:center; gap:5px; }
        .toggle-btn:hover { background: ${mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"}; }
      `}</style>

      {/* ══════ NAV ══════ */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100, background: c.navBg, backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${c.navBorder}`, padding: "0 40px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between", transition: "background 0.4s",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${c.accent}, ${c.accentDark})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 16, letterSpacing: -0.5 }}>A</div>
          <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: -0.3, color: c.textStrong }}>ALLPS AI</span>
          <span style={{ fontSize: 11, fontFamily: mono, color: c.textFaint, marginLeft: 4, padding: "2px 8px", background: c.toggleBg, borderRadius: 4 }}>× SICTIC</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <a href="#features" className="nav-link" style={{ fontSize: 13, fontWeight: 500, color: c.textMuted, textDecoration: "none", transition: "color 0.2s" }}>{t.nav.features}</a>
          <a href="#compare" className="nav-link" style={{ fontSize: 13, fontWeight: 500, color: c.textMuted, textDecoration: "none", transition: "color 0.2s" }}>{t.nav.compare}</a>
          <a href="#signup" className="nav-link" style={{ fontSize: 13, fontWeight: 500, color: c.textMuted, textDecoration: "none", transition: "color 0.2s" }}>{t.nav.signup}</a>

          {/* Language */}
          <div className="toggle-pill">
            {["en", "de"].map((l) => (
              <button key={l} className="toggle-btn" onClick={() => setLang(l)} style={{ background: lang === l ? `${c.accent}18` : "none", color: lang === l ? c.accent : c.textFaint, fontWeight: lang === l ? 700 : 500 }}>{l.toUpperCase()}</button>
            ))}
          </div>

          {/* Theme */}
          <button onClick={() => setMode(mode === "light" ? "dark" : "light")} style={{
            cursor: "pointer", border: `1px solid ${c.border}`, borderRadius: 8, padding: "6px 10px",
            background: c.toggleBg, color: c.textMuted, display: "flex", alignItems: "center", gap: 6,
            fontSize: 12, fontWeight: 500, fontFamily: sans, transition: "all 0.3s",
          }}>
            {mode === "light" ? <MoonIcon /> : <SunIcon />}
            {mode === "light" ? (lang === "de" ? "Dunkel" : "Dark") : (lang === "de" ? "Hell" : "Light")}
          </button>

          <a href="#signup" className="cta-btn" style={{ background: c.accent, color: "#fff", padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none", transition: "all 0.2s" }}>{t.nav.cta}</a>
        </div>
      </nav>

      {/* ══════ HERO ══════ */}
      <section style={{ position: "relative", overflow: "hidden", padding: "80px 40px 60px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ position: "absolute", top: -120, right: -80, width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${c.accentSoft} 0%, transparent 70%)`, pointerEvents: "none" }} />

        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 100, padding: "6px 16px 6px 8px", marginBottom: 28, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <span style={{ background: c.badgeBg, color: "#fff", fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 100, letterSpacing: 0.8, textTransform: "uppercase" }}>{lang === "de" ? "EXKLUSIV" : "EXCLUSIVE"}</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: c.textBody }}>{t.hero.badge}</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <h1 style={{ fontFamily: serif, fontSize: 52, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1.5, margin: "0 0 20px", color: c.textStrong }}>
              {t.hero.h1a}<span style={{ fontStyle: "italic", color: c.accent }}>{t.hero.h1b}</span>{t.hero.h1c}<br />{t.hero.h1d}
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: c.textBody, margin: "0 0 28px", maxWidth: 480, fontWeight: 400 }}>{t.hero.sub}</p>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 32 }}>
              <a href="#signup" className="cta-btn" style={{ background: `linear-gradient(135deg, ${c.accent}, ${c.accentDark})`, color: "#fff", padding: "14px 32px", borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: "none", transition: "all 0.25s", display: "inline-block", boxShadow: `0 4px 16px ${c.accentGlow}` }}>{t.hero.cta}</a>
              <span style={{ fontSize: 13, color: c.textFaint }}>{t.hero.noCc}</span>
            </div>
            <div style={{ display: "flex", gap: 24 }}>
              {["🇨🇭", "🔒", "⚡"].map((icon, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 14 }}>{icon}</span>
                  <span style={{ fontSize: 12, color: c.textMuted, fontWeight: 500 }}>{t.hero.trust[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Offer */}
          <div style={{ background: c.bgCard, border: `2px solid ${c.offerBorder}`, borderRadius: 20, padding: "36px 32px", boxShadow: c.shadowOffer, position: "relative", transition: "all 0.4s" }}>
            <div style={{ position: "absolute", top: -14, left: 24, background: `linear-gradient(135deg, ${c.accent}, ${c.accentDark})`, color: "#fff", fontFamily: mono, fontSize: 11, fontWeight: 600, padding: "6px 16px", borderRadius: 8, letterSpacing: 0.5, textTransform: "uppercase" }}>{t.offer.tag}</div>
            <div style={{ marginTop: 8 }}>
              <div style={{ fontFamily: serif, fontSize: 64, fontWeight: 700, color: c.accent, lineHeight: 1, letterSpacing: -2 }}>{t.offer.pct}<span style={{ fontSize: 40 }}>%</span></div>
              <div style={{ fontSize: 16, fontWeight: 600, color: c.text, marginBottom: 24 }}>{t.offer.disc}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {t.offer.items.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 16px", borderRadius: 10, background: item.hl ? c.bgGreen : c.bgYellow, border: `1px solid ${item.hl ? c.borderGreen : c.borderYellow}`, transition: "all 0.4s" }}>
                    <span style={{ fontSize: 20, flexShrink: 0, marginTop: -2 }}>{item.icon}</span>
                    <div>
                      <span style={{ fontSize: 14, fontWeight: 500, color: c.text, lineHeight: 1.5 }}>{item.text}</span>
                      {item.tag && <span style={{ display: "inline-block", marginLeft: 8, background: "#fbbf24", color: "#78350f", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4, letterSpacing: 0.5, verticalAlign: "middle" }}>{item.tag}</span>}
                    </div>
                  </div>
                ))}
              </div>
              <a href="#signup" className="cta-btn" style={{ display: "block", textAlign: "center", marginTop: 24, background: mode === "dark" ? "#fff" : "#111", color: mode === "dark" ? "#111" : "#fff", padding: "14px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: "none", transition: "all 0.25s" }}>{t.offer.cta}</a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ STATS TICKER ══════ */}
      <section style={{ background: c.bgTicker, padding: "20px 0", overflow: "hidden", transition: "background 0.4s" }}>
        <div style={{ display: "flex", animation: "marquee 20s linear infinite", width: "max-content" }}>
          {[...t.stats, ...t.stats, ...t.stats].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 48px" }}>
              <span style={{ fontFamily: mono, fontSize: 28, fontWeight: 600, color: c.accent }}>{s.value}</span>
              <span style={{ fontSize: 13, color: c.textOnDark, fontWeight: 400 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ PIPELINE ══════ */}
      <section id="features" data-section="pipeline" ref={sectionRef("pipeline")} style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px" }}>
        <div style={fadeIn("pipeline")}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontFamily: mono, fontSize: 12, color: c.accent, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" }}>{t.pipeline.label}</span>
            <h2 style={{ fontFamily: serif, fontSize: 40, fontWeight: 700, margin: "12px 0 16px", letterSpacing: -1, color: c.textStrong }}>{t.pipeline.h2}</h2>
            <p style={{ fontSize: 16, color: c.textBody, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>{t.pipeline.sub}</p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", marginBottom: 48 }}>
          {t.features.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start" }}>
              <div onClick={() => setActiveFeature(i)} style={{ cursor: "pointer", textAlign: "center", width: 150, padding: "0 8px", opacity: activeFeature === i ? 1 : 0.5, transform: activeFeature === i ? "scale(1.05)" : "scale(1)", transition: "all 0.3s ease" }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, margin: "0 auto 10px", background: activeFeature === i ? c.accent : c.featureInactive, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, transition: "all 0.3s ease", boxShadow: activeFeature === i ? `0 6px 20px ${c.accentGlow}` : "none" }}>
                  {activeFeature === i ? <span style={{ filter: "brightness(10)" }}>{f.icon}</span> : f.icon}
                </div>
                <div style={{ fontFamily: mono, fontSize: 10, fontWeight: 600, color: activeFeature === i ? c.accent : c.textDim, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{f.tag}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: activeFeature === i ? c.textStrong : c.textFaint }}>{f.title}</div>
              </div>
              {i < t.features.length - 1 && <div style={{ display: "flex", alignItems: "center", marginTop: 24, color: c.textDim, fontSize: 18 }}>→</div>}
            </div>
          ))}
        </div>

        <div style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 16, padding: "32px 40px", maxWidth: 640, margin: "0 auto", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", transition: "all 0.4s" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 28 }}>{t.features[activeFeature].icon}</span>
            <h3 style={{ fontFamily: serif, fontSize: 24, fontWeight: 600, margin: 0, color: c.textStrong }}>{t.features[activeFeature].title}</h3>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: c.textBody, margin: 0 }}>{t.features[activeFeature].desc}</p>
        </div>
      </section>

      {/* ══════ COMPARISON ══════ */}
      <section id="compare" data-section="compare" ref={sectionRef("compare")} style={{ background: c.bgAlt, padding: "80px 40px", transition: "background 0.4s" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", ...fadeIn("compare") }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontFamily: mono, fontSize: 12, color: c.accent, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" }}>{t.compare.label}</span>
            <h2 style={{ fontFamily: serif, fontSize: 40, fontWeight: 700, margin: "12px 0 16px", letterSpacing: -1, color: c.textStrong }}>{t.compare.h2}</h2>
            <p style={{ fontSize: 16, color: c.textBody, maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>{t.compare.sub}</p>
          </div>

          <div style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 16, overflow: "hidden", transition: "all 0.4s" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 120px", padding: "14px 24px", borderBottom: `1px solid ${c.border}`, background: c.tableHead }}>
              <span style={{ fontFamily: mono, fontSize: 11, color: c.textFaint, fontWeight: 500, letterSpacing: 0.5, textTransform: "uppercase" }}>{t.compare.colCap}</span>
              <span style={{ fontFamily: mono, fontSize: 11, color: c.accent, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", textAlign: "center" }}>{t.compare.colAllps}</span>
              <span style={{ fontFamily: mono, fontSize: 11, color: c.textFaint, fontWeight: 500, letterSpacing: 0.5, textTransform: "uppercase", textAlign: "center" }}>{t.compare.colOther}</span>
            </div>
            {t.compare.rows.map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 120px 120px", padding: "14px 24px", borderBottom: i < t.compare.rows.length - 1 ? `1px solid ${mode === "dark" ? "rgba(255,255,255,0.03)" : "#f0f0ed"}` : "none", background: i % 2 === 0 ? "transparent" : c.tableAlt }}>
                <span style={{ fontSize: 14, color: c.text, fontWeight: 500 }}>{row}</span>
                <span style={{ textAlign: "center" }}><CheckIcon val={COMP_DATA[i].allps} c={c} /></span>
                <span style={{ textAlign: "center" }}><CheckIcon val={COMP_DATA[i].others} c={c} /></span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, background: c.takeawayBg, border: `1px solid ${c.takeawayBorder}`, borderRadius: 12, padding: "20px 24px", textAlign: "center", transition: "all 0.4s" }}>
            <p style={{ margin: 0, fontSize: 14, color: c.takeawayText, lineHeight: 1.6 }}><strong>{t.compare.takeaway}</strong></p>
          </div>
        </div>
      </section>

      {/* ══════ TESTIMONIALS ══════ */}
      <section data-section="proof" ref={sectionRef("proof")} style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px" }}>
        <div style={fadeIn("proof")}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
            {t.testimonials.map((te, i) => (
              <div key={i} style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 16, padding: "28px 24px", transition: "all 0.4s", ...fadeIn("proof", i * 0.15) }}>
                <div style={{ fontSize: 28, color: c.quoteColor, marginBottom: 12, fontFamily: serif }}>"</div>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: c.textBody, margin: "0 0 16px", fontStyle: "italic" }}>{te.quote}</p>
                <p style={{ fontSize: 12, color: c.textDim, margin: 0, fontWeight: 500 }}>{te.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ SIGNUP ══════ */}
      <section id="signup" data-section="signup" ref={sectionRef("signup")} style={{ background: c.signupGrad, padding: "80px 40px", transition: "background 0.4s" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", ...fadeIn("signup") }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "flex-start" }}>
            <div>
              <span style={{ fontFamily: mono, fontSize: 12, color: c.accent, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" }}>{t.signupSection.label}</span>
              <h2 style={{ fontFamily: serif, fontSize: 38, fontWeight: 700, margin: "12px 0 20px", letterSpacing: -1, color: c.textStrong }}>
                {t.signupSection.h2a}<br /><span style={{ color: c.accent, fontStyle: "italic" }}>{t.signupSection.h2b}</span>
              </h2>
              <p style={{ fontSize: 15, color: c.textBody, lineHeight: 1.7, marginBottom: 28 }}>{t.signupSection.sub}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {t.signupSection.benefits.map((b, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 22, flexShrink: 0 }}>{b.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{b.title}</div>
                      <div style={{ fontSize: 13, color: c.textMuted, marginTop: 2 }}>{b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 32, padding: "16px 20px", background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 12, display: "flex", alignItems: "center", gap: 12, transition: "all 0.4s" }}>
                <span style={{ fontSize: 16 }}>🇨🇭</span>
                <p style={{ margin: 0, fontSize: 12, color: c.textMuted, lineHeight: 1.5 }}>{t.signupSection.dataNote}</p>
              </div>
            </div>

            {/* Form */}
            <div style={{ background: c.bgCard, borderRadius: 20, padding: "36px 32px", border: `1px solid ${c.borderCard}`, boxShadow: c.shadow, transition: "all 0.4s" }}>
              {!submitted ? (
                <>
                  <h3 style={{ fontFamily: serif, fontSize: 22, fontWeight: 600, margin: "0 0 4px", color: c.textStrong }}>{t.form.h3}</h3>
                  <p style={{ fontSize: 13, color: c.textFaint, margin: "0 0 24px" }}>{t.form.sub}</p>
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: c.textBody, marginBottom: 6, display: "block" }}>{t.form.company}</label>
                      <input className="form-input" type="text" required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder={t.form.companyPh} style={inputStyle} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 600, color: c.textBody, marginBottom: 6, display: "block" }}>{t.form.first}</label>
                        <input className="form-input" type="text" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} placeholder={t.form.firstPh} style={inputStyle} />
                      </div>
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 600, color: c.textBody, marginBottom: 6, display: "block" }}>{t.form.last}</label>
                        <input className="form-input" type="text" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} placeholder={t.form.lastPh} style={inputStyle} />
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: c.textBody, marginBottom: 6, display: "block" }}>{t.form.email}</label>
                      <input className="form-input" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder={t.form.emailPh} style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: c.textBody, marginBottom: 6, display: "block" }}>{t.form.phone}</label>
                      <div style={{ display: "flex", gap: 8 }}>
                        <div style={{ padding: "12px 12px", border: `1px solid ${c.border}`, borderRadius: 10, fontSize: 14, background: c.bgMuted, color: c.textMuted, display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>🇨🇭 +41</div>
                        <input className="form-input" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder={t.form.phonePh} style={inputStyle} />
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: c.textBody, marginBottom: 6, display: "block" }}>{t.form.password}</label>
                      <div style={{ position: "relative" }}>
                        <input className="form-input" type={showPassword ? "text" : "password"} required minLength={8} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder={t.form.passwordPh} style={{ ...inputStyle, paddingRight: 60 }} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: c.textFaint, fontFamily: sans }}>{showPassword ? t.form.hide : t.form.show}</button>
                      </div>
                    </div>
                    <input type="hidden" name="partner" value="sictic" />
                    <input type="hidden" name="discount_code" value="SICTIC40" />
                    <input type="hidden" name="lang" value={lang} />
                    <input type="hidden" name="theme" value={mode} />
                    <button type="submit" className="cta-btn" style={{ width: "100%", padding: "15px", background: `linear-gradient(135deg, ${c.accent}, ${c.accentDark})`, color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all 0.25s", boxShadow: `0 4px 16px ${c.accentGlow}`, marginTop: 4, fontFamily: sans }}>{t.form.submit}</button>
                    <p style={{ fontSize: 11, color: c.textDim, margin: "4px 0 0", textAlign: "center", lineHeight: 1.5 }}>{t.form.legal}</p>
                  </form>
                </>
              ) : (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: c.bgGreen, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 28, color: c.accent, animation: "pulse-ring 2s infinite" }}>✓</div>
                  <h3 style={{ fontFamily: serif, fontSize: 24, fontWeight: 600, margin: "0 0 10px", color: c.textStrong }}>{t.form.successH}</h3>
                  <p style={{ fontSize: 14, color: c.textBody, lineHeight: 1.7, maxWidth: 360, margin: "0 auto" }}>
                    {t.form.successP1} <strong style={{ color: c.textStrong }}>{form.email}</strong>{t.form.successP2}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════ BOTTOM CTA ══════ */}
      <section style={{ background: c.bgBottom, padding: "64px 40px", textAlign: "center", transition: "background 0.4s" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: serif, fontSize: 32, fontWeight: 700, color: "#fff", margin: "0 0 12px", letterSpacing: -0.5 }}>{t.bottom.h2}</h2>
          <p style={{ fontSize: 15, color: c.textOnDark, lineHeight: 1.7, margin: "0 0 28px" }}>{t.bottom.sub}</p>
          <a href="#signup" className="cta-btn" style={{ display: "inline-block", background: c.accent, color: "#fff", padding: "14px 36px", borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: "none", transition: "all 0.25s" }}>{t.bottom.cta}</a>
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: c.bgFooter, padding: "40px", transition: "background 0.4s" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: `linear-gradient(135deg, ${c.accent}, ${c.accentDark})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 12 }}>A</div>
            <span style={{ color: "#666", fontSize: 13 }}>ALLPS AI — Zürich, {lang === "de" ? "Schweiz" : "Switzerland"}</span>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            <a href="https://allps.ai" style={{ color: "#666", fontSize: 12, textDecoration: "none" }}>allps.ai</a>
            <a href="https://allps.ai/privacy" style={{ color: "#666", fontSize: 12, textDecoration: "none" }}>{lang === "de" ? "Datenschutz" : "Privacy"}</a>
            <a href="https://allps.ai/terms" style={{ color: "#666", fontSize: 12, textDecoration: "none" }}>{lang === "de" ? "AGB" : "Terms"}</a>
            <span style={{ color: "#444", fontSize: 12 }}>© 2026 ALLPS GmbH</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

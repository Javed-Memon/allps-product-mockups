import { useState, useEffect, useCallback } from "react";
import AppV5 from './AI-Sourcing-Hub_v5';
import AppV6 from './AI-Sourcing-Hub-Integrated-v6';

/* ═══════════════════════════════════════════════════════════════
   TALENTOS · VERSION LAUNCHER (Light Mode)
   ─────────────────────────────────────────
   Entry point for the TalentOS Simulator repository.
   Lets you choose between:
     • v5.0 — AI Sourcing Hub (standalone ATS platform)
     • v6.0 — Integrated Hub + Browser Extension
   
   GIT REPO USAGE:
   ───────────────
   In your actual repo, replace the inline stubs below with:
   
     import AppV5 from './AI-Sourcing-Hub_v5';
     import AppV6 from './AI-Sourcing-Hub-Integrated-v6';
   
   Then the launcher simply renders <AppV5 /> or <AppV6 />
   based on user selection. Both files export their App as default.

   FILE STRUCTURE:
   ───────────────
   /simulators
     ├── TalentOS-Launcher.jsx              ← this file (entry point)
     ├── AI-Sourcing-Hub_v5.jsx             ← export default function AppV5()
     ├── AI-Sourcing-Hub-Integrated-v6.jsx  ← export default function AppV6()
     └── ai-talent-scout-simulator.jsx      ← standalone extension (reference)
═══════════════════════════════════════════════════════════════ */

const FONTS = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap";


/* ═══════════════════════════════════════════════
   LAUNCHER
═══════════════════════════════════════════════ */

const VERSIONS = [
  {
    id: "v5",
    version: "5.0",
    title: "AI Sourcing Hub",
    subtitle: "Standalone ATS Platform",
    desc: "Full-featured hiring platform with AI-powered candidate search, smart shortlists, candidate pools, job pipelines, outreach workflows, credit system, and GDPR compliance tracking.",
    features: ["AI Prompt Search", "Boolean Mode", "Smart Shortlist", "Candidate Pool", "Job Pipeline (Kanban)", "Outreach Templates", "GDPR Notifications", "Credits System", "Corporate Dashboard", "Light/Dark Mode"],
    color1: "#00897B",
    color2: "#2563EB",
    icon: "◎",
    status: "Stable",
    lines: "1,808",
    Component: AppV5,
  },
  {
    id: "v6",
    version: "6.0",
    title: "Integrated Simulator",
    subtitle: "Hub + Browser Extension",
    desc: "Unified experience combining the AI Sourcing Hub with the AI Talent Scout browser extension. Demonstrates bidirectional data flow: capture candidates from LinkedIn/GitHub/Indeed/Xing and import directly into the ATS.",
    features: ["Version Launcher", "Browser Extension Sim", "Profile Capture Flow", "AI Match Scoring", "Duplicate Detection", "GDPR Compliance", "Pool/Pipeline Sync", "Outreach Integration", "Source Attribution", "Light/Dark Mode"],
    color1: "#6D28D9",
    color2: "#3B82F6",
    icon: "🧩",
    status: "Latest",
    lines: "755",
    Component: AppV6,
  },
];

export default function TalentOSLauncher() {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  // If a version is selected, render it full-screen
  if (active) {
    const ver = VERSIONS.find(v => v.id === active);
    const Comp = ver.Component;
    return (
      <div style={{ height: "100vh", overflow: "hidden", position: "relative" }}>
        <link href={FONTS} rel="stylesheet" />
        <style>{`
          @import url('${FONTS}');
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html, body, #root { height: 100%; }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        `}</style>
        {/* Floating back button */}
        <button
          onClick={() => setActive(null)}
          style={{
            position: "fixed", bottom: 14, right: 14, zIndex: 9999,
            padding: "7px 14px", borderRadius: 9,
            background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)",
            border: "1px solid rgba(0,0,0,0.1)",
            color: "#334155", fontSize: 12, fontWeight: 600, cursor: "pointer",
            fontFamily: "'Plus Jakarta Sans',sans-serif",
            display: "flex", alignItems: "center", gap: 6,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(0,0,0,0.12)"; e.currentTarget.style.transform = "scale(1.03)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.92)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "scale(1)"; }}
        >
          <span style={{ fontSize: 11 }}>←</span> Launcher
          <span style={{
            padding: "2px 7px", borderRadius: 4, fontSize: 9, fontWeight: 700,
            background: `${ver.color1}14`, color: ver.color1,
          }}>v{ver.version}</span>
        </button>
        <div style={{ height: "100%", animation: "fadeIn 0.3s ease" }}>
          <Comp />
        </div>
      </div>
    );
  }

  // Launcher screen — Light mode
  return (
    <div style={{
      minHeight: "100vh",
      background: "#F7F8FC",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      color: "#1E293B",
      overflow: "hidden",
      position: "relative",
    }}>
      <link href={FONTS} rel="stylesheet" />
      <style>{`
        @import url('${FONTS}');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.08); border-radius: 3px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>

      {/* Background atmosphere — soft gradients */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 20% 20%, rgba(0,137,123,0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(109,40,217,0.035) 0%, transparent 50%), radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.025) 0%, transparent 40%)",
      }} />
      {/* Subtle dot pattern */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.4,
        backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.035) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 880, margin: "0 auto", padding: "60px 28px 40px" }}>
        {/* Header */}
        <div style={{
          textAlign: "center", marginBottom: 50,
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: 20,
            background: "linear-gradient(135deg, #00897B, #2563EB)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 22px",
            boxShadow: "0 16px 48px rgba(0,137,123,0.18), 0 0 0 6px rgba(0,137,123,0.06)",
            animation: "float 6s ease-in-out infinite",
          }}>
            <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: 28, color: "#fff" }}>T</span>
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 38,
            color: "#0F172A", marginBottom: 10, letterSpacing: "-.03em",
          }}>
            TalentOS Simulator
          </h1>
          <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>
            AI-powered hiring platform by Talentos. Select a simulator version to launch.
          </p>
        </div>

        {/* Version Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
          {VERSIONS.map((ver, vi) => (
            <div
              key={ver.id}
              onClick={() => setActive(ver.id)}
              onMouseEnter={() => setHovered(ver.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: "#FFFFFF",
                border: `1.5px solid ${hovered === ver.id ? `${ver.color1}40` : "rgba(0,0,0,0.06)"}`,
                borderRadius: 18,
                padding: "28px 26px 24px",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                transform: hovered === ver.id ? "translateY(-5px)" : "translateY(0)",
                boxShadow: hovered === ver.id
                  ? `0 20px 48px rgba(0,0,0,0.07), 0 0 0 1px ${ver.color1}15`
                  : "0 2px 12px rgba(0,0,0,0.035)",
                position: "relative",
                overflow: "hidden",
                opacity: loaded ? 1 : 0,
                animation: loaded ? `fadeUp 0.5s ease ${0.2 + vi * 0.12}s both` : "none",
              }}
            >
              {/* Corner gradient accent */}
              <div style={{
                position: "absolute", top: 0, right: 0, width: 150, height: 150,
                borderRadius: "0 18px 0 110px",
                background: `linear-gradient(135deg, ${ver.color1}08, ${ver.color2}06)`,
                opacity: hovered === ver.id ? 1 : 0.6,
                transition: "opacity 0.3s",
              }} />

              {/* Header row */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18, position: "relative" }}>
                <div style={{
                  width: 50, height: 50, borderRadius: 14,
                  background: `linear-gradient(135deg, ${ver.color1}, ${ver.color2})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: ver.id === "v5" ? 22 : 20,
                  boxShadow: `0 8px 24px ${ver.color1}22`,
                }}>
                  <span style={{ color: "#fff" }}>{ver.icon}</span>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span style={{
                    padding: "3px 10px", borderRadius: 6,
                    background: ver.status === "Latest" ? "rgba(5,150,105,0.07)" : "rgba(0,0,0,0.03)",
                    color: ver.status === "Latest" ? "#059669" : "#94A3B8",
                    fontSize: 10, fontWeight: 700, letterSpacing: ".04em",
                    border: `1px solid ${ver.status === "Latest" ? "rgba(5,150,105,0.16)" : "rgba(0,0,0,0.06)"}`,
                  }}>
                    {ver.status === "Latest" && <span style={{ display: "inline-block", width: 5, height: 5, borderRadius: "50%", background: "#059669", marginRight: 5, animation: "pulse 2s infinite" }} />}
                    {ver.status}
                  </span>
                  <span style={{
                    padding: "3px 8px", borderRadius: 6,
                    background: `${ver.color1}0C`, color: ver.color1,
                    fontSize: 10, fontWeight: 700,
                    border: `1px solid ${ver.color1}1A`,
                  }}>v{ver.version}</span>
                </div>
              </div>

              {/* Title */}
              <h2 style={{
                fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 21,
                color: "#0F172A", marginBottom: 4, letterSpacing: "-.02em",
              }}>{ver.title}</h2>
              <div style={{ fontSize: 12, color: "#94A3B8", fontWeight: 600, marginBottom: 12 }}>
                {ver.subtitle}
              </div>

              {/* Description */}
              <p style={{ fontSize: 12.5, color: "#64748B", lineHeight: 1.7, marginBottom: 18 }}>
                {ver.desc}
              </p>

              {/* Feature tags */}
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 18 }}>
                {ver.features.slice(0, 6).map(f => (
                  <span key={f} style={{
                    padding: "3px 9px", borderRadius: 14,
                    background: `${ver.color1}0A`, color: ver.color1,
                    fontSize: 10, fontWeight: 600,
                    border: `1px solid ${ver.color1}18`,
                  }}>{f}</span>
                ))}
                {ver.features.length > 6 && (
                  <span style={{
                    padding: "3px 9px", borderRadius: 14,
                    background: "rgba(0,0,0,0.02)", color: "#94A3B8",
                    fontSize: 10, fontWeight: 500,
                    border: "1px solid rgba(0,0,0,0.05)",
                  }}>+{ver.features.length - 6} more</span>
                )}
              </div>

              {/* Footer */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                paddingTop: 14, borderTop: "1px solid rgba(0,0,0,0.05)",
              }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <span style={{ fontSize: 10, color: "#94A3B8" }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", color: "#64748B" }}>{ver.lines}</span> lines
                  </span>
                  <span style={{ fontSize: 10, color: "#94A3B8" }}>
                    React JSX
                  </span>
                </div>
                <div style={{
                  display: "flex", alignItems: "center", gap: 5,
                  color: ver.color1, fontSize: 12, fontWeight: 700,
                  opacity: hovered === ver.id ? 1 : 0.5,
                  transition: "opacity 0.2s",
                }}>
                  Launch <span style={{ fontSize: 14, transition: "transform 0.2s", transform: hovered === ver.id ? "translateX(3px)" : "none" }}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          padding: "12px 20px", borderRadius: 12,
          background: "#FFFFFF",
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.025)",
          opacity: loaded ? 1 : 0,
          animation: loaded ? "fadeUp 0.5s ease 0.5s both" : "none",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#059669", animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: 11.5, color: "#64748B" }}>
            Both versions share the same data models, themes, and candidate profiles. Extension-sourced candidates in v6 flow into the same ATS views as v5.
          </span>
        </div>


		


        {/* Footer */}
        <div style={{
          textAlign: "center", marginTop: 20, fontSize: 11, color: "#94A3B8",
          opacity: loaded ? 1 : 0,
          animation: loaded ? "fadeUp 0.5s ease 0.7s both" : "none",
        }}>
          TalentOS Platform · Talentos AG · Simulator Launcher v1.0
        </div>
      </div>
    </div>
  );
}

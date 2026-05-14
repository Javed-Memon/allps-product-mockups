import { useState } from "react";

// ─────────────────────────────────────────────
// SEED DATA
// ─────────────────────────────────────────────

const CLIENT_CANDIDATES = [
  { id:"C001", name:"Sarah Müller",    c2:"active",    c3:"active",    c4:"expiring",  c4Exp:"2026-07-08", dsrs:0,  dsrTypes:[] },
  { id:"C002", name:"David Keller",   c2:"withdrawn", c3:"n/a",       c4:"n/a",       c4Exp:null,         dsrs:1,  dsrTypes:["Access"] },
  { id:"C003", name:"Priya Sharma",   c2:"active",    c3:"active",    c4:"active",    c4Exp:"2026-08-03", dsrs:0,  dsrTypes:[] },
  { id:"C004", name:"Marco Rossi",    c2:"active",    c3:"pending",   c4:"expired",   c4Exp:"2026-04-12", dsrs:1,  dsrTypes:["Deletion"] },
  { id:"C005", name:"Anna Berger",    c2:"active",    c3:"n/a",       c4:"expiring",  c4Exp:"2026-08-14", dsrs:0,  dsrTypes:[] },
  { id:"C006", name:"Luca Bianchi",   c2:"withdrawn", c3:"n/a",       c4:"active",    c4Exp:"2026-09-01", dsrs:1,  dsrTypes:["Correction"] },
  { id:"C007", name:"Isabelle Dubois",c2:"active",    c3:"active",    c4:"active",    c4Exp:"2026-07-30", dsrs:0,  dsrTypes:[] },
];

const CLIENT_DSRS = [
  { id:"DSR-0041", candidate:"David Keller",   type:"Access",     filed:"2026-05-01", due:"2026-05-31", status:"open",        assignee:"L. Weber" },
  { id:"DSR-0038", candidate:"Marco Rossi",    type:"Deletion",   filed:"2026-04-18", due:"2026-05-18", status:"fulfilled",   assignee:"L. Weber" },
  { id:"DSR-0045", candidate:"Luca Bianchi",   type:"Correction", filed:"2026-05-08", due:"2026-06-07", status:"in_progress", assignee:"T. Hofer" },
  { id:"DSR-0033", candidate:"Anna Berger",    type:"Access",     filed:"2026-04-02", due:"2026-05-02", status:"fulfilled",   assignee:"L. Weber" },
];

const CLIENT_ROLES = [
  { id:"R01", title:"Senior Embedded Engineer",  m4:true,  m5:true,  o2:true,  o3:true  },
  { id:"R02", title:"Firmware Engineer",          m4:true,  m5:true,  o2:false, o3:true  },
  { id:"R03", title:"Embedded Systems Lead",      m4:false, m5:true,  o2:true,  o3:false },
  { id:"R04", title:"Finance Analyst",            m4:true,  m5:false, o2:false, o3:false },
  { id:"R05", title:"Sales Executive",            m4:true,  m5:true,  o2:true,  o3:true  },
];

const CLIENT_STAFF = [
  { id:"S1", name:"Klaus Bauer",    role:"Hiring Manager",    status:"current",  completed:"2026-02-10", version:"v2.1", nextDue:"2027-02-10" },
  { id:"S2", name:"Petra Müller",   role:"Recruiter",         status:"current",  completed:"2026-03-04", version:"v2.1", nextDue:"2027-03-04" },
  { id:"S3", name:"Jan Fischer",    role:"HR Director",       status:"overdue",  completed:"2025-01-15", version:"v1.8", nextDue:"2026-01-15" },
  { id:"S4", name:"Monika Schmidt", role:"Recruiter",         status:"current",  completed:"2026-04-01", version:"v2.1", nextDue:"2027-04-01" },
  { id:"S5", name:"Andreas Koch",   role:"Talent Partner",    status:"overdue",  completed:"2025-03-10", version:"v1.9", nextDue:"2026-03-10" },
];

const ONBOARDING_ITEMS = [
  { id:"OB1", label:"AI Transparency Briefing received",      ref:"Art. 13",   status:"done"    },
  { id:"OB2", label:"AI Disclosure implemented on job postings",ref:"Art.26(7)",status:"done"    },
  { id:"OB3", label:"Data Processing Agreement (DPA) signed", ref:"GDPR",      status:"done"    },
  { id:"OB4", label:"Candidate Rights page linked in JDs",    ref:"Art. 13/14",status:"pending" },
  { id:"OB5", label:"Annual compliance review scheduled",     ref:"Art. 9",    status:"pending" },
];

const PLATFORM_CLIENTS = [
  { id:"PL01", name:"Bosch Automotive CH", plan:"Enterprise", health:94, expiring:2, openDsrs:1, humanGate:true,  aiDisclosure:true,  onboarded:true  },
  { id:"PL02", name:"u-blox",              plan:"Growth",     health:88, expiring:4, openDsrs:0, humanGate:true,  aiDisclosure:true,  onboarded:true  },
  { id:"PL03", name:"Sensirion",           plan:"Growth",     health:100,expiring:0, openDsrs:0, humanGate:true,  aiDisclosure:false, onboarded:false },
  { id:"PL04", name:"Novartis Basel",      plan:"Enterprise", health:91, expiring:1, openDsrs:2, humanGate:false, aiDisclosure:true,  onboarded:true  },
  { id:"PL05", name:"SAP Switzerland",     plan:"Growth",     health:97, expiring:0, openDsrs:0, humanGate:true,  aiDisclosure:true,  onboarded:true  },
  { id:"PL06", name:"Nestlé CH",           plan:"Starter",    health:100,expiring:0, openDsrs:0, humanGate:true,  aiDisclosure:true,  onboarded:true  },
];

const PLATFORM_DSRS = [
  { id:"DSR-0041", candidate:"CAND-88291", client:"Bosch Automotive CH", type:"Access",     filed:"2026-05-01", due:"2026-05-31", status:"open",        assignee:"L. Weber" },
  { id:"DSR-0045", candidate:"CAND-71049", client:"u-blox",              type:"Correction", filed:"2026-05-08", due:"2026-06-07", status:"in_progress", assignee:"T. Hofer" },
  { id:"DSR-0048", candidate:"CAND-30912", client:"Novartis Basel",      type:"Deletion",   filed:"2026-05-10", due:"2026-06-09", status:"open",        assignee:"R. Gruber" },
  { id:"DSR-0049", candidate:"CAND-55183", client:"Novartis Basel",      type:"Access",     filed:"2026-05-11", due:"2026-06-10", status:"open",        assignee:"R. Gruber" },
];

const RETENTION_JOBS = [
  { id:"J1", name:"Unsuccessful candidate — 12-month deletion", schedule:"Daily 02:00 UTC", lastRun:"2026-05-12 02:01", nextRun:"2026-05-13 02:00", processed:3,  status:"running" },
  { id:"J2", name:"Talent pool — 6-month renewal reminders",    schedule:"Daily 06:00 UTC", lastRun:"2026-05-12 06:00", nextRun:"2026-05-13 06:00", processed:11, status:"running" },
  { id:"J3", name:"Talent pool — 12-month forced deletion",     schedule:"Daily 02:30 UTC", lastRun:"2026-05-12 02:31", nextRun:"2026-05-13 02:30", processed:1,  status:"running" },
  { id:"J4", name:"Consent version audit sweep",                schedule:"Weekly Sun 03:00", lastRun:"2026-05-11 03:00", nextRun:"2026-05-18 03:00", processed:248,status:"running" },
];

const PLATFORM_AI_MODULES = [
  { id:"M01", name:"AI Sourcing",            version:"v1.8.3", dpia:"complete",     risk:"complete",     techFile:"in_progress", registered:false },
  { id:"M02", name:"AI Matching",            version:"v3.1.0", dpia:"complete",     risk:"complete",     techFile:"in_progress", registered:false },
  { id:"M03", name:"AI Screening Interview", version:"v2.4.1", dpia:"complete",     risk:"complete",     techFile:"pending",     registered:false },
  { id:"M04", name:"AI Skills Interview",    version:"v2.4.1", dpia:"in_progress",  risk:"pending",      techFile:"pending",     registered:false },
];

const PLATFORM_STAFF = [
  { name:"Javed A.",       role:"CPO",               status:"current",  completed:"2026-02-15", version:"v2.1", nextDue:"2027-02-15" },
  { name:"Yuki T.",        role:"Lead Engineer",      status:"current",  completed:"2026-03-01", version:"v2.1", nextDue:"2027-03-01" },
  { name:"Marina B.",      role:"Product Manager",    status:"current",  completed:"2026-04-10", version:"v2.1", nextDue:"2027-04-10" },
  { name:"Felix G.",       role:"ML Engineer",        status:"overdue",  completed:"2025-02-20", version:"v1.9", nextDue:"2026-02-20" },
  { name:"Camille D.",     role:"Customer Success",   status:"overdue",  completed:"2025-01-30", version:"v1.8", nextDue:"2026-01-30" },
  { name:"Omar K.",        role:"Support Engineer",   status:"current",  completed:"2026-04-22", version:"v2.1", nextDue:"2027-04-22" },
];

const PLATFORM_AUDIT_LOG = [
  { ts:"2026-05-13 09:41", client:"Bosch Automotive CH", candidate:"CAND-88291", module:"AI Screening Interview v2.4.1", event:"Screening completed", humanAction:"Reviewed",  outcome:"Progressed" },
  { ts:"2026-05-13 08:22", client:"u-blox",              candidate:"CAND-71049", module:"AI Matching v3.1.0",            event:"Match score generated",humanAction:"Accepted",  outcome:"Shortlisted" },
  { ts:"2026-05-12 16:05", client:"Novartis Basel",      candidate:"CAND-30912", module:"AI Skills Interview v2.4.1",    event:"Skills eval completed", humanAction:"Override",  outcome:"Advanced" },
  { ts:"2026-05-12 14:18", client:"SAP Switzerland",     candidate:"CAND-55183", module:"AI Sourcing v1.8.3",            event:"Candidate sourced",     humanAction:"Accepted",  outcome:"Shortlisted" },
  { ts:"2026-05-12 11:30", client:"Sensirion",           candidate:"CAND-19302", module:"AI Matching v3.1.0",            event:"Match score generated",  humanAction:"Reviewed",  outcome:"Progressed" },
  { ts:"2026-05-11 17:45", client:"Nestlé CH",           candidate:"CAND-40127", module:"AI Screening Interview v2.4.1", event:"Screening completed",    humanAction:"Accepted",  outcome:"Shortlisted" },
  { ts:"2026-05-11 10:02", client:"Bosch Automotive CH", candidate:"CAND-22891", module:"AI Skills Interview v2.4.1",    event:"Skills eval completed",  humanAction:"Reviewed",  outcome:"Progressed" },
];

// ─────────────────────────────────────────────
// SHARED UTILITIES
// ─────────────────────────────────────────────

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const diff = new Date(dateStr) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function aug2026Days() {
  return daysUntil("2026-08-02");
}

// ─────────────────────────────────────────────
// SHARED UI PRIMITIVES
// ─────────────────────────────────────────────

function ConsentBadge({ status }) {
  const map = {
    active:    { bg:"#E4F5EA", color:"#1A6B3A", label:"Active" },
    withdrawn: { bg:"#F5E4E4", color:"#7A1E1E", label:"Withdrawn" },
    expired:   { bg:"#F0EDE8", color:"#6B5B3A", label:"Expired" },
    expiring:  { bg:"#FEF3E0", color:"#8B5500", label:"Expiring" },
    pending:   { bg:"#EEF2FE", color:"#2D52C0", label:"Pending" },
    "n/a":     { bg:"#F5F4F2", color:"#999790", label:"N/A" },
  };
  const s = map[status] || map["n/a"];
  return (
    <span style={{ background: s.bg, color: s.color, borderRadius: 100, padding: "2px 8px", fontSize: 11, fontWeight: 600, letterSpacing: "0.02em", whiteSpace: "nowrap" }}>
      {s.label}
    </span>
  );
}

function DsrBadge({ status }) {
  const map = {
    open:        { bg:"#FEF3E0", color:"#8B5500",  label:"Open" },
    in_progress: { bg:"#EEF2FE", color:"#2D52C0",  label:"In Progress" },
    fulfilled:   { bg:"#E4F5EA", color:"#1A6B3A",  label:"Fulfilled" },
    overdue:     { bg:"#F5E4E4", color:"#7A1E1E",  label:"Overdue" },
  };
  const s = map[status] || map.open;
  return <span style={{ background: s.bg, color: s.color, borderRadius: 100, padding: "2px 8px", fontSize: 11, fontWeight: 600 }}>{s.label}</span>;
}

function DocBadge({ status }) {
  const map = {
    complete:    { bg:"#E4F5EA", color:"#1A6B3A", label:"Complete" },
    in_progress: { bg:"#FEF3E0", color:"#8B5500", label:"In Progress" },
    pending:     { bg:"#F0EDE8", color:"#6B5B3A", label:"Pending" },
  };
  const s = map[status] || map.pending;
  return <span style={{ background: s.bg, color: s.color, borderRadius: 100, padding: "2px 7px", fontSize: 11, fontWeight: 600 }}>{s.label}</span>;
}

function OkCell({ value, na }) {
  if (na) return <span style={{ color: "#999", fontSize: 13 }}>—</span>;
  return <span style={{ fontSize: 15 }}>{value ? "✓" : "✗"}</span>;
}

function KpiCard({ icon, value, label, sub, accent, warn }) {
  return (
    <div style={{ background: warn ? "#FEF3E0" : "#F7F6F3", borderRadius: 10, padding: "14px 16px", border: `1px solid ${warn ? "#F5D08A" : "rgba(0,0,0,0.07)"}` }}>
      <div style={{ fontSize: 18, marginBottom: 4 }}>{icon}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: warn ? "#8B5500" : (accent || "#1A1A18") }}>{value}</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#555", marginTop: 2 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: "#888", marginTop: 1 }}>{sub}</div>}
    </div>
  );
}

function SectionLabel({ type, refs }) {
  const isMandatory = type === "mandatory";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
      <span style={{ background: isMandatory ? "#FCEBEB" : "#FEF3E0", color: isMandatory ? "#A32D2D" : "#8B5500", borderRadius: 100, padding: "2px 9px", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em" }}>
        {isMandatory ? "MANDATORY" : "OPTIONAL"}
      </span>
      {refs.map(r => (
        <span key={r} style={{ background: "#F0EDE8", color: "#6B5B3A", borderRadius: 100, padding: "2px 8px", fontSize: 11, fontWeight: 500 }}>{r}</span>
      ))}
    </div>
  );
}

function TabBar({ tabs, active, onChange, accent }) {
  return (
    <div style={{ display: "flex", borderBottom: "1px solid rgba(0,0,0,0.09)", gap: 0, marginBottom: 20 }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)}
          style={{ padding: "9px 16px", fontSize: 13, fontWeight: active === t.id ? 600 : 400,
            color: active === t.id ? (accent || "#1553AA") : "#666",
            borderBottom: active === t.id ? `2px solid ${accent || "#1553AA"}` : "2px solid transparent",
            background: "none", border: "none", borderBottomWidth: 2,
            borderBottomStyle: "solid", borderBottomColor: active === t.id ? (accent || "#1553AA") : "transparent",
            cursor: "pointer", transition: "all 0.12s", whiteSpace: "nowrap" }}>
          {t.label}
        </button>
      ))}
    </div>
  );
}

function InfoBanner({ color, icon, text }) {
  const bgs = { blue:"#EEF2FE", amber:"#FEF3E0", red:"#FCEBEB", green:"#E4F5EA" };
  const colors = { blue:"#1553AA", amber:"#8B5500", red:"#A32D2D", green:"#1A6B3A" };
  return (
    <div style={{ background: bgs[color], color: colors[color], borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 16, display: "flex", gap: 8 }}>
      <span>{icon}</span><span>{text}</span>
    </div>
  );
}

function Th({ children, right }) {
  return <th style={{ textAlign: right ? "right" : "left", fontSize: 11, fontWeight: 600, color: "#888", padding: "8px 10px", whiteSpace: "nowrap", borderBottom: "1px solid rgba(0,0,0,0.08)", letterSpacing: "0.04em" }}>{children}</th>;
}

function Td({ children, right, muted }) {
  return <td style={{ padding: "10px 10px", fontSize: 13, color: muted ? "#888" : "#1A1A18", borderBottom: "1px solid rgba(0,0,0,0.05)", textAlign: right ? "right" : "left", verticalAlign: "middle" }}>{children}</td>;
}

function Btn({ children, onClick, size, variant, accent }) {
  const small = size === "sm";
  const ghost = variant === "ghost";
  return (
    <button onClick={onClick}
      style={{ padding: small ? "4px 10px" : "7px 14px", fontSize: small ? 12 : 13, fontWeight: 500,
        borderRadius: 6, cursor: "pointer", border: `1px solid ${accent || "#1553AA"}`,
        background: ghost ? "transparent" : (accent || "#1553AA"),
        color: ghost ? (accent || "#1553AA") : "#fff", transition: "opacity 0.12s" }}>
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────
// DEADLINE BANNER
// ─────────────────────────────────────────────

function DeadlineBanner({ accent }) {
  const days = aug2026Days();
  const isUrgent = days < 120;
  const color = isUrgent ? "#A32D2D" : "#8B5500";
  const bg = isUrgent ? "#FCEBEB" : "#FEF3E0";
  return (
    <div style={{ background: bg, border: `1px solid ${isUrgent ? "#F09595" : "#F5D08A"}`, borderRadius: 8, padding: "10px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
      <span style={{ fontSize: 16 }}>{isUrgent ? "🔴" : "⚠️"}</span>
      <span style={{ color, fontWeight: 600 }}>EU AI Act Deadline: 2 August 2026 — {days} days remaining.</span>
      <span style={{ color: "#555" }}>All high-risk AI obligations (Arts. 9–15, 26, 49, 86) must be met.</span>
    </div>
  );
}

// ─────────────────────────────────────────────
// CLIENT — CONSENT TABLE (M1)
// ─────────────────────────────────────────────

function ClientConsentTable() {
  const [filter, setFilter] = useState("all");
  const [drawer, setDrawer] = useState(null);

  const filters = ["all","active","expiring","expired","withdrawn","pending"];
  const filtered = filter === "all" ? CLIENT_CANDIDATES : CLIENT_CANDIDATES.filter(c => {
    const statuses = [c.c2, c.c3, c.c4];
    if (filter === "expiring") return statuses.includes("expiring");
    if (filter === "expired")  return statuses.includes("expired");
    if (filter === "withdrawn")return statuses.includes("withdrawn");
    if (filter === "pending")  return statuses.includes("pending");
    if (filter === "active")   return statuses.every(s => ["active","n/a"].includes(s));
    return true;
  });

  const all = CLIENT_CANDIDATES;
  const kpis = {
    valid:     all.filter(c => [c.c2,c.c3,c.c4].every(s => ["active","n/a"].includes(s))).length,
    expiring:  all.filter(c => [c.c2,c.c3,c.c4].includes("expiring")).length,
    withdrawn: all.filter(c => [c.c2,c.c3,c.c4].includes("withdrawn")).length,
    expired:   all.filter(c => [c.c2,c.c3,c.c4].includes("expired")).length,
    dsrs:      all.filter(c => c.dsrs > 0).length,
  };

  const sel = drawer ? CLIENT_CANDIDATES.find(c => c.id === drawer) : null;

  return (
    <div>
      <SectionLabel type="mandatory" refs={["R-02","R-03","GDPR Art. 6(1)(a)","Art. 7"]} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10, marginBottom: 20 }}>
        <KpiCard icon="✅" value={kpis.valid}     label="All Consents Valid"   accent="#1A6B3A" />
        <KpiCard icon="⏳" value={kpis.expiring}  label="Expiring ≤60 days"    warn={kpis.expiring > 0} />
        <KpiCard icon="↩️" value={kpis.withdrawn} label="Withdrawn"            accent="#7A1E1E" />
        <KpiCard icon="❌" value={kpis.expired}   label="Expired"              warn={kpis.expired > 0} />
        <KpiCard icon="📋" value={kpis.dsrs}      label="Candidates with DSRs" />
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: "5px 14px", borderRadius: 100, fontSize: 12, fontWeight: 500, cursor: "pointer",
              background: filter === f ? "#1553AA" : "#F0EDE8", color: filter === f ? "#fff" : "#555",
              border: `1px solid ${filter === f ? "#1553AA" : "rgba(0,0,0,0.1)"}` }}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead>
          <tr style={{ background:"#F7F6F3" }}>
            <Th>Candidate</Th>
            <Th>C2 — AI Screening</Th>
            <Th>C3 — AI Skills Interview</Th>
            <Th>C4 — Talent Pool</Th>
            <Th>C4 Expires</Th>
            <Th>DSRs</Th>
            <Th></Th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(c => (
            <tr key={c.id} style={{ background: [c.c2,c.c3,c.c4].some(s=>["expired","withdrawn"].includes(s)) ? "#FFF9F5" : "white" }}>
              <Td><span style={{ fontWeight:600 }}>{c.name}</span><br/><span style={{ fontSize:11, color:"#888" }}>{c.id}</span></Td>
              <Td><ConsentBadge status={c.c2} /></Td>
              <Td><ConsentBadge status={c.c3} /></Td>
              <Td><ConsentBadge status={c.c4} /></Td>
              <Td muted={!c.c4Exp}>
                {c.c4Exp ? (() => {
                  const d = daysUntil(c.c4Exp);
                  const color = d < 30 ? "#A32D2D" : d < 60 ? "#8B5500" : "#333";
                  return <span style={{ color, fontWeight: d < 60 ? 600 : 400 }}>{c.c4Exp} <span style={{ fontSize:11 }}>({d}d)</span></span>;
                })() : "—"}
              </Td>
              <Td>{c.dsrs > 0 ? <span style={{ color:"#1553AA", fontWeight:600 }}>{c.dsrs}</span> : <span style={{ color:"#aaa" }}>0</span>}</Td>
              <Td><Btn size="sm" variant="ghost" onClick={() => setDrawer(drawer === c.id ? null : c.id)}>View</Btn></Td>
            </tr>
          ))}
        </tbody>
      </table>

      {sel && (
        <div style={{ margin: "16px 0", background: "#F7F6F3", borderRadius: 10, padding: 18, border: "1px solid rgba(0,0,0,0.08)" }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>{sel.name} — Consent Detail</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
            {[
              { label: "C1 — Application & Matching", status: "Platform-managed (LI)", note: "Rests on Legitimate Interest (Art. 6(1)(f)). No client action required.", platform: true },
              { label: "C2 — AI Screening Consent",   status: sel.c2, note: "Candidate must consent before AI screening interview is scheduled." },
              { label: "C3 — AI Skills Interview",    status: sel.c3, note: "Required before AI skills evaluation begins." },
              { label: "C4 — Talent Pool",             status: sel.c4, note: sel.c4Exp ? `Expiry: ${sel.c4Exp}. Requires renewal every 6 months (nLPD Art. 6).` : "Not in talent pool." },
            ].map(item => (
              <div key={item.label} style={{ background: "white", borderRadius: 8, padding: 12, border: "1px solid rgba(0,0,0,0.07)" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#888", marginBottom: 6 }}>{item.label}</div>
                {item.platform
                  ? <span style={{ background:"#E8E6FF", color:"#3C3489", borderRadius:100, padding:"2px 8px", fontSize:11, fontWeight:600 }}>Platform-managed</span>
                  : <ConsentBadge status={item.status} />
                }
                <div style={{ fontSize: 12, color: "#666", marginTop: 8, lineHeight: 1.5 }}>{item.note}</div>
              </div>
            ))}
          </div>
          {sel.dsrs > 0 && (
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 8, textTransform:"uppercase", letterSpacing:"0.05em" }}>Linked DSRs</div>
              {CLIENT_DSRS.filter(d => d.candidate === sel.name).map(d => (
                <div key={d.id} style={{ display:"flex", gap:12, alignItems:"center", padding:"8px 0", borderTop:"1px solid rgba(0,0,0,0.06)" }}>
                  <span style={{ fontFamily:"monospace", fontSize:12, color:"#555" }}>{d.id}</span>
                  <span style={{ fontSize:13 }}>{d.type}</span>
                  <DsrBadge status={d.status} />
                  <span style={{ fontSize:12, color:"#888" }}>Filed: {d.filed}</span>
                  <span style={{ fontSize:12, color:"#888" }}>Due: {d.due}</span>
                </div>
              ))}
            </div>
          )}
          <button onClick={() => setDrawer(null)} style={{ marginTop:12, fontSize:12, color:"#888", background:"none", border:"none", cursor:"pointer" }}>Close ↑</button>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// CLIENT — RENEWAL QUEUE (M2)
// ─────────────────────────────────────────────

function ClientRenewalQueue() {
  const queue = CLIENT_CANDIDATES.filter(c => ["expiring","expired"].includes(c.c4));
  return (
    <div>
      <SectionLabel type="mandatory" refs={["R-04","GDPR Art. 7","nLPD Art. 6"]} />
      <InfoBanner color="amber" icon="ℹ️" text="Talent pool consent (C4) must be renewed every 6 months. Expired consent means the candidate cannot remain in the talent pool without re-consent." />
      <div style={{ display:"flex", justifyContent:"flex-end", gap:8, marginBottom:12 }}>
        <Btn size="sm" variant="ghost">Export Report</Btn>
        <Btn size="sm">Send All Renewal Reminders</Btn>
      </div>
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead>
          <tr style={{ background:"#F7F6F3" }}>
            <Th>Candidate</Th>
            <Th>C4 Status</Th>
            <Th>Expiry Date</Th>
            <Th>Days Remaining</Th>
            <Th>Renewals Sent</Th>
            <Th></Th>
          </tr>
        </thead>
        <tbody>
          {queue.map(c => {
            const d = daysUntil(c.c4Exp);
            const isExpired = c.c4 === "expired";
            return (
              <tr key={c.id} style={{ background: isExpired ? "#FFF5F5" : "white" }}>
                <Td><span style={{ fontWeight:600 }}>{c.name}</span></Td>
                <Td><ConsentBadge status={c.c4} /></Td>
                <Td>{c.c4Exp || "—"}</Td>
                <Td>
                  {d !== null
                    ? <span style={{ color: d < 0 ? "#A32D2D" : d < 30 ? "#8B5500" : "#333", fontWeight: d < 30 ? 600 : 400 }}>
                        {d < 0 ? `${Math.abs(d)}d overdue` : `${d}d`}
                      </span>
                    : "—"
                  }
                </Td>
                <Td>0</Td>
                <Td><Btn size="sm">Send Renewal</Btn></Td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────
// CLIENT — DSR TRACKER (M3)
// ─────────────────────────────────────────────

function ClientDsrTracker() {
  return (
    <div>
      <SectionLabel type="mandatory" refs={["R-27","R-28","GDPR Art. 12","Art. 15–22"]} />
      <InfoBanner color="blue" icon="⚖️" text="As data controller, you have 30 days from receipt to fulfil a DSR. Acknowledgement must be sent within 3 business days. Types: Access, Deletion, Correction, Portability, Objection." />
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead>
          <tr style={{ background:"#F7F6F3" }}>
            <Th>DSR ID</Th>
            <Th>Candidate</Th>
            <Th>Type</Th>
            <Th>Filed Date</Th>
            <Th>Due Date (SLA)</Th>
            <Th>Status</Th>
            <Th>Assignee</Th>
            <Th></Th>
          </tr>
        </thead>
        <tbody>
          {CLIENT_DSRS.map(d => {
            const due = daysUntil(d.due);
            const overdue = due !== null && due < 0 && d.status !== "fulfilled";
            return (
              <tr key={d.id} style={{ background: overdue ? "#FFF5F5" : "white" }}>
                <Td><span style={{ fontFamily:"monospace", fontSize:12 }}>{d.id}</span></Td>
                <Td><span style={{ fontWeight:600 }}>{d.candidate}</span></Td>
                <Td>{d.type}</Td>
                <Td muted>{d.filed}</Td>
                <Td>
                  <span style={{ color: overdue ? "#A32D2D" : (due < 7 && d.status !== "fulfilled" ? "#8B5500" : "#333"), fontWeight: (overdue || due < 7) ? 600 : 400 }}>
                    {d.due} {d.status !== "fulfilled" && due !== null && <span style={{ fontSize:11 }}>({overdue ? `${Math.abs(due)}d overdue` : `${due}d`})</span>}
                  </span>
                </Td>
                <Td><DsrBadge status={overdue ? "overdue" : d.status} /></Td>
                <Td muted>{d.assignee}</Td>
                <Td><Btn size="sm" variant="ghost">{d.status === "fulfilled" ? "View" : "Open"}</Btn></Td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────
// CLIENT — AI ACT: ROLE CHECKLIST (M4 + M5)
// ─────────────────────────────────────────────

function ClientRoleChecklist() {
  const [drawer, setDrawer] = useState(null);
  const issues = CLIENT_ROLES.filter(r => !r.m4 || !r.m5).length;
  const ok = CLIENT_ROLES.length - issues;

  return (
    <div>
      <DeadlineBanner />
      <SectionLabel type="mandatory" refs={["R-07","R-16","Art. 26(7)","GDPR Art. 22","Art. 14"]} />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:20 }}>
        <KpiCard icon="✅" value={ok}    label="Roles Mandatory OK"     accent="#1A6B3A" />
        <KpiCard icon="⚠️" value={issues} label="Roles Needing Action"   warn={issues > 0} />
        <KpiCard icon="🎓" value={CLIENT_STAFF.filter(s=>s.status==="overdue").length} label="Staff Training Overdue" warn />
        <KpiCard icon="📋" value={ONBOARDING_ITEMS.filter(o=>o.status==="done").length + "/" + ONBOARDING_ITEMS.length} label="Onboarding Items Done" />
      </div>
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead>
          <tr style={{ background:"#F7F6F3" }}>
            <Th>Role</Th>
            <Th>M4 — AI Disclosure <span style={{ fontWeight:400, color:"#aaa" }}>(Art. 26(7))</span></Th>
            <Th>M5 — Human Gate <span style={{ fontWeight:400, color:"#aaa" }}>(Art. 14)</span></Th>
            <Th>Overall</Th>
            <Th></Th>
          </tr>
        </thead>
        <tbody>
          {CLIENT_ROLES.map(r => {
            const allOk = r.m4 && r.m5;
            return (
              <tr key={r.id} style={{ background: !allOk ? "#FFF9F5" : "white" }}>
                <Td><span style={{ fontWeight:600 }}>{r.title}</span></Td>
                <Td>
                  <span style={{ fontSize:16, color: r.m4 ? "#1A6B3A" : "#A32D2D" }}>{r.m4 ? "✓" : "✗"}</span>
                </Td>
                <Td>
                  <span style={{ fontSize:16, color: r.m5 ? "#1A6B3A" : "#A32D2D" }}>{r.m5 ? "✓" : "✗"}</span>
                </Td>
                <Td>
                  <span style={{ background: allOk ? "#E4F5EA" : "#FCEBEB", color: allOk ? "#1A6B3A" : "#A32D2D", borderRadius:100, padding:"2px 9px", fontSize:11, fontWeight:700 }}>
                    {allOk ? "Compliant" : "Action Needed"}
                  </span>
                </Td>
                <Td><Btn size="sm" variant="ghost" onClick={() => setDrawer(drawer===r.id?null:r.id)}>Details</Btn></Td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {drawer && (() => {
        const r = CLIENT_ROLES.find(x=>x.id===drawer);
        const items = [
          { label:"M4 — AI Disclosure",     ok:r.m4, type:"mandatory", ref:"Art. 26(7)", desc:"Candidates must be informed AI is used in hiring before the process begins.", action:"Enable AI Disclosure" },
          { label:"M5 — Human Gate",         ok:r.m5, type:"mandatory", ref:"Art. 14 + GDPR Art. 22", desc:"A human must review AI assessment before any rejection is communicated.", action:"Enable Human Gate" },
          { label:"O2 — Override Logging",   ok:r.o2, type:"optional",  ref:"Art. 14",   desc:"Platform-automated. All human overrides of AI decisions are logged immutably. No client action required." },
          { label:"O3 — Explain My Assessment",ok:r.o3,type:"optional", ref:"Art. 86",   desc:"Platform-managed feature. Candidates can request explanation of AI assessment. Status shown for information only." },
        ];
        return (
          <div style={{ margin:"16px 0", background:"#F7F6F3", borderRadius:10, padding:18, border:"1px solid rgba(0,0,0,0.08)" }}>
            <div style={{ fontWeight:700, fontSize:15, marginBottom:12 }}>{r.title} — Obligation Detail</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              {items.map(item => (
                <div key={item.label} style={{ background:"white", borderRadius:8, padding:12, border:"1px solid rgba(0,0,0,0.07)" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
                    <span style={{ fontSize:13, fontWeight:600 }}>{item.label}</span>
                    <span style={{ background: item.type==="mandatory" ? "#FCEBEB" : "#FEF3E0", color: item.type==="mandatory" ? "#A32D2D" : "#8B5500", borderRadius:100, padding:"1px 7px", fontSize:10, fontWeight:700, letterSpacing:"0.04em" }}>
                      {item.type.toUpperCase()}
                    </span>
                  </div>
                  <span style={{ background:"#F0EDE8", color:"#6B5B3A", borderRadius:100, padding:"1px 7px", fontSize:11 }}>{item.ref}</span>
                  <div style={{ fontSize:12, color:"#666", marginTop:8, lineHeight:1.5 }}>{item.desc}</div>
                  {!item.ok && item.type === "mandatory" && (
                    <Btn size="sm" onClick={()=>{}}>{item.action} →</Btn>
                  )}
                  {item.ok && <div style={{ marginTop:8, fontSize:12, color:"#1A6B3A", fontWeight:600 }}>✓ Active</div>}
                </div>
              ))}
            </div>
            <button onClick={() => setDrawer(null)} style={{ marginTop:12, fontSize:12, color:"#888", background:"none", border:"none", cursor:"pointer" }}>Close ↑</button>
          </div>
        );
      })()}
    </div>
  );
}

// ─────────────────────────────────────────────
// CLIENT — STAFF TRAINING (M6)
// ─────────────────────────────────────────────

function ClientStaffTraining() {
  return (
    <div>
      <SectionLabel type="mandatory" refs={["EU AI Act Art. 4"]} />
      <InfoBanner color="red" icon="🚨" text="Art. 4 AI literacy obligation deadline has already passed — February 2025. Any overdue staff must be enrolled immediately." />
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead>
          <tr style={{ background:"#F7F6F3" }}>
            <Th>Staff Member</Th>
            <Th>Role</Th>
            <Th>Status</Th>
            <Th>Completed</Th>
            <Th>Version</Th>
            <Th>Next Due</Th>
            <Th></Th>
          </tr>
        </thead>
        <tbody>
          {CLIENT_STAFF.map(s => (
            <tr key={s.id} style={{ background: s.status==="overdue" ? "#FFF5F5" : "white" }}>
              <Td><span style={{ fontWeight:600 }}>{s.name}</span></Td>
              <Td muted>{s.role}</Td>
              <Td>
                <span style={{ background: s.status==="current" ? "#E4F5EA" : "#FCEBEB", color: s.status==="current" ? "#1A6B3A" : "#A32D2D", borderRadius:100, padding:"2px 9px", fontSize:11, fontWeight:700 }}>
                  {s.status === "current" ? "Current" : "OVERDUE"}
                </span>
              </Td>
              <Td muted>{s.completed}</Td>
              <Td muted>{s.version}</Td>
              <Td><span style={{ color: s.status==="overdue" ? "#A32D2D" : "#333", fontWeight: s.status==="overdue" ? 700 : 400 }}>{s.nextDue}</span></Td>
              <Td>
                {s.status === "overdue"
                  ? <Btn size="sm">Enrol Now</Btn>
                  : <Btn size="sm" variant="ghost">View Record</Btn>
                }
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────
// CLIENT — OPTIONAL FEATURES
// ─────────────────────────────────────────────

function ClientOptionalFeatures() {
  const features = [
    { id:"O1", label:"Audit Log Export",              ref:"Art. 12", status:"active",   desc:"Art. 12 logging is a provider obligation (Allps AI). You have read-only access to your data slice. No active monitoring required.", action:"Export Log" },
    { id:"O2", label:"Override Logging",              ref:"Art. 14", status:"active",   desc:"Fully automated by the platform. All human overrides of AI decisions are logged immutably. No client configuration needed.", action:"View by Role" },
    { id:"O3", label:"Explain My Assessment",         ref:"Art. 86", status:"active",   desc:"Platform-managed feature. Candidates may request an explanation of their AI assessment. Delivery is handled by Allps AI.", action:"View Status" },
    { id:"O4", label:"Candidate Retention Timeline",  ref:"GDPR Art. 5(1)(e)", status:"active", desc:"Platform-automated. Candidate data is deleted per your configured retention schedule. You can view current timelines.", action:"View Schedule" },
    { id:"O5", label:"Privacy Notice Version Log",    ref:"GDPR Art. 13/14", status:"active",  desc:"Platform records the privacy notice version shown to each candidate. Accessible reactively for DSR defence or audit.", action:"View Log" },
    { id:"O6", label:"Deployer Onboarding Checklist", ref:"Art. 13", status:"pending",  desc:"One-time sign-off confirming you have completed deployer obligations briefing, DPA, candidate rights page, and annual review schedule.", action:"View Checklist" },
  ];

  return (
    <div>
      <SectionLabel type="optional" refs={["R-10","R-17","R-19","Art. 14","Art. 86"]} />
      <InfoBanner color="blue" icon="ℹ️" text="These features are managed by Allps AI on your behalf. No active monitoring is required — they are shown here for your transparency and reactive use." />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
        {features.map(f => (
          <div key={f.id} style={{ background:"#F7F6F3", borderRadius:10, padding:16, border:"1px solid rgba(0,0,0,0.07)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
              <span style={{ fontWeight:700, fontSize:13 }}>{f.label}</span>
              <span style={{ background: f.status==="active" ? "#E4F5EA" : "#FEF3E0", color: f.status==="active" ? "#1A6B3A" : "#8B5500", borderRadius:100, padding:"2px 8px", fontSize:11, fontWeight:600 }}>
                {f.status === "active" ? "Active" : "Pending"}
              </span>
            </div>
            <span style={{ background:"#F0EDE8", color:"#6B5B3A", borderRadius:100, padding:"1px 7px", fontSize:11 }}>{f.ref}</span>
            <div style={{ fontSize:12, color:"#555", marginTop:10, lineHeight:1.6 }}>{f.desc}</div>
            <div style={{ marginTop:12 }}><Btn size="sm" variant="ghost">{f.action}</Btn></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// CLIENT DASHBOARD
// ─────────────────────────────────────────────

function ClientDashboard() {
  const [tab, setTab] = useState("consent");
  const [consentSub, setConsentSub] = useState("m1");
  const [aiSub, setAiSub] = useState("roles");

  const consentTabs = [
    { id:"m1", label:"M1 — Consent Table" },
    { id:"m2", label:"M2 — Renewal Queue" },
    { id:"m3", label:"M3 — DSR Tracker" },
  ];
  const aiTabs = [
    { id:"roles",    label:"M4+M5 — Role Checklist" },
    { id:"training", label:"M6 — Staff Training" },
    { id:"optional", label:"Optional Features" },
  ];

  return (
    <div>
      <div style={{ background:"#EEF4FF", borderRadius:10, padding:"12px 16px", marginBottom:20, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <div style={{ fontWeight:700, fontSize:14, color:"#1553AA" }}>🏢 Client Compliance Dashboard</div>
          <div style={{ fontSize:12, color:"#1553AA", opacity:0.8, marginTop:2 }}>Deployer obligations — GDPR Art. 7, EU AI Act Art. 26(7), Art. 14, Art. 4</div>
        </div>
        <div style={{ fontSize:12, color:"#1553AA" }}>Bosch Automotive CH · Enterprise</div>
      </div>

      <TabBar tabs={[{id:"consent",label:"🔐 Consent & DSR"},{id:"aiact",label:"🤖 AI Act Obligations"}]} active={tab} onChange={t=>{setTab(t); setConsentSub("m1"); setAiSub("roles");}} accent="#1553AA" />

      {tab === "consent" && (
        <div>
          <TabBar tabs={consentTabs} active={consentSub} onChange={setConsentSub} accent="#1553AA" />
          {consentSub === "m1" && <ClientConsentTable />}
          {consentSub === "m2" && <ClientRenewalQueue />}
          {consentSub === "m3" && <ClientDsrTracker />}
        </div>
      )}
      {tab === "aiact" && (
        <div>
          <TabBar tabs={aiTabs} active={aiSub} onChange={setAiSub} accent="#1553AA" />
          {aiSub === "roles"    && <ClientRoleChecklist />}
          {aiSub === "training" && <ClientStaffTraining />}
          {aiSub === "optional" && <ClientOptionalFeatures />}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// PLATFORM — CONSENT OVERVIEW
// ─────────────────────────────────────────────

function PlatformConsentOverview() {
  const total = PLATFORM_CLIENTS.reduce((a, c) => a + 10, 0); // illustrative
  const avgHealth = Math.round(PLATFORM_CLIENTS.reduce((a, c) => a + c.health, 0) / PLATFORM_CLIENTS.length);
  const expiring = PLATFORM_CLIENTS.reduce((a, c) => a + c.expiring, 0);
  const openDsrs = PLATFORM_CLIENTS.reduce((a, c) => a + c.openDsrs, 0);

  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:10, marginBottom:20 }}>
        <KpiCard icon="🏢" value={PLATFORM_CLIENTS.length} label="Active Clients" />
        <KpiCard icon="📊" value={`${avgHealth}%`} label="Avg Consent Health" accent="#1553AA" />
        <KpiCard icon="⏳" value={expiring} label="Expiring Platform-wide" warn={expiring>0} />
        <KpiCard icon="📋" value={openDsrs} label="Open DSRs" warn={openDsrs>0} />
        <KpiCard icon="⚙️" value={RETENTION_JOBS.filter(j=>j.status==="running").length} label="Retention Jobs Running" accent="#1A6B3A" />
      </div>
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead>
          <tr style={{ background:"#F3F0FA" }}>
            <Th>Client</Th>
            <Th>Plan</Th>
            <Th>Consent Health</Th>
            <Th>Expiring</Th>
            <Th>Open DSRs</Th>
            <Th>Human Gate</Th>
            <Th>AI Disclosure</Th>
            <Th>Onboarded</Th>
          </tr>
        </thead>
        <tbody>
          {PLATFORM_CLIENTS.map(c => {
            const risk = (!c.humanGate || !c.aiDisclosure || !c.onboarded);
            return (
              <tr key={c.id} style={{ background: risk ? "#FFF9F5" : "white" }}>
                <Td><span style={{ fontWeight:600 }}>{c.name}</span></Td>
                <Td muted>{c.plan}</Td>
                <Td>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ flex:1, background:"#E8E6E0", borderRadius:100, height:6, overflow:"hidden" }}>
                      <div style={{ width:`${c.health}%`, height:"100%", background: c.health===100?"#1A6B3A":c.health>90?"#1553AA":"#8B5500", borderRadius:100 }} />
                    </div>
                    <span style={{ fontSize:12, fontWeight:600, color: c.health===100?"#1A6B3A":c.health>90?"#1553AA":"#8B5500", minWidth:36 }}>{c.health}%</span>
                  </div>
                </Td>
                <Td>{c.expiring > 0 ? <span style={{ color:"#8B5500", fontWeight:600 }}>{c.expiring}</span> : <span style={{ color:"#aaa" }}>0</span>}</Td>
                <Td>{c.openDsrs > 0 ? <span style={{ color:"#1553AA", fontWeight:600 }}>{c.openDsrs}</span> : <span style={{ color:"#aaa" }}>0</span>}</Td>
                <Td><span style={{ fontSize:16, color: c.humanGate?"#1A6B3A":"#A32D2D" }}>{c.humanGate?"✓":"✗"}</span></Td>
                <Td><span style={{ fontSize:16, color: c.aiDisclosure?"#1A6B3A":"#A32D2D" }}>{c.aiDisclosure?"✓":"✗"}</span></Td>
                <Td><span style={{ fontSize:16, color: c.onboarded?"#1A6B3A":"#A32D2D" }}>{c.onboarded?"✓":"✗"}</span></Td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────
// PLATFORM — DSR PIPELINE
// ─────────────────────────────────────────────

function PlatformDsrPipeline() {
  return (
    <div>
      <InfoBanner color="blue" icon="🔗" text="Platform-level DSR routing. Each request is assigned to the responsible client account manager and tracked here for cross-client SLA oversight." />
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead>
          <tr style={{ background:"#F3F0FA" }}>
            <Th>DSR ID</Th>
            <Th>Candidate (hashed)</Th>
            <Th>Client</Th>
            <Th>Type</Th>
            <Th>Filed</Th>
            <Th>Due (SLA)</Th>
            <Th>Status</Th>
            <Th>Assignee</Th>
          </tr>
        </thead>
        <tbody>
          {PLATFORM_DSRS.map(d => {
            const due = daysUntil(d.due);
            return (
              <tr key={d.id}>
                <Td><span style={{ fontFamily:"monospace", fontSize:12 }}>{d.id}</span></Td>
                <Td muted><span style={{ fontFamily:"monospace", fontSize:11 }}>{d.candidate}</span></Td>
                <Td><span style={{ fontWeight:600 }}>{d.client}</span></Td>
                <Td>{d.type}</Td>
                <Td muted>{d.filed}</Td>
                <Td>
                  <span style={{ color: due < 14 ? "#A32D2D" : "#333", fontWeight: due < 14 ? 600 : 400 }}>
                    {d.due} <span style={{ fontSize:11 }}>({due}d)</span>
                  </span>
                </Td>
                <Td><DsrBadge status={d.status} /></Td>
                <Td muted>{d.assignee}</Td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────
// PLATFORM — RETENTION ENGINE
// ─────────────────────────────────────────────

function PlatformRetentionEngine() {
  return (
    <div>
      <InfoBanner color="green" icon="⚙️" text="Automated retention jobs enforce GDPR Art. 5(1)(e) storage limitation. Monitor for failures — a failed job means non-compliant data is not being deleted on schedule." />
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead>
          <tr style={{ background:"#F3F0FA" }}>
            <Th>Job</Th>
            <Th>Schedule</Th>
            <Th>Last Run</Th>
            <Th>Next Run</Th>
            <Th>Records Processed</Th>
            <Th>Status</Th>
          </tr>
        </thead>
        <tbody>
          {RETENTION_JOBS.map(j => (
            <tr key={j.id}>
              <Td><span style={{ fontWeight:600 }}>{j.name}</span></Td>
              <Td muted><span style={{ fontFamily:"monospace", fontSize:12 }}>{j.schedule}</span></Td>
              <Td muted><span style={{ fontSize:12 }}>{j.lastRun}</span></Td>
              <Td muted><span style={{ fontSize:12 }}>{j.nextRun}</span></Td>
              <Td><span style={{ fontWeight:600 }}>{j.processed}</span></Td>
              <Td>
                <span style={{ background:"#E4F5EA", color:"#1A6B3A", borderRadius:100, padding:"2px 9px", fontSize:11, fontWeight:700 }}>
                  ● Running
                </span>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────
// PLATFORM — AI MODULE REGISTRY
// ─────────────────────────────────────────────

function PlatformModuleRegistry() {
  return (
    <div>
      <DeadlineBanner accent="#6B3AAA" />
      <InfoBanner color="amber" icon="🗄️" text="EU AI Database registration (Art. 49) required for all high-risk systems before 2 August 2026. Registration portal: ai-database.eu. A Swiss legal representative must be appointed before registration." />
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead>
          <tr style={{ background:"#F3F0FA" }}>
            <Th>AI Module</Th>
            <Th>Version</Th>
            <Th>DPIA <span style={{ fontWeight:400, color:"#aaa" }}>(Art. 35)</span></Th>
            <Th>Risk Register <span style={{ fontWeight:400, color:"#aaa" }}>(Art. 9)</span></Th>
            <Th>Technical File <span style={{ fontWeight:400, color:"#aaa" }}>(Art. 11)</span></Th>
            <Th>EU AI DB Registered <span style={{ fontWeight:400, color:"#aaa" }}>(Art. 49)</span></Th>
          </tr>
        </thead>
        <tbody>
          {PLATFORM_AI_MODULES.map(m => (
            <tr key={m.id} style={{ background: !m.registered ? "#FFF9F5" : "white" }}>
              <Td><span style={{ fontWeight:600 }}>{m.name}</span></Td>
              <Td muted><span style={{ fontFamily:"monospace", fontSize:12 }}>{m.version}</span></Td>
              <Td><DocBadge status={m.dpia} /></Td>
              <Td><DocBadge status={m.risk} /></Td>
              <Td><DocBadge status={m.techFile} /></Td>
              <Td>
                {m.registered
                  ? <span style={{ background:"#E4F5EA", color:"#1A6B3A", borderRadius:100, padding:"2px 9px", fontSize:11, fontWeight:700 }}>Registered</span>
                  : <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ background:"#FCEBEB", color:"#A32D2D", borderRadius:100, padding:"2px 9px", fontSize:11, fontWeight:700 }}>Unregistered</span>
                      <Btn size="sm">Register →</Btn>
                    </div>
                }
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────
// PLATFORM — STAFF TRAINING
// ─────────────────────────────────────────────

function PlatformStaffTraining() {
  const overdue = PLATFORM_STAFF.filter(s => s.status === "overdue").length;
  return (
    <div>
      <InfoBanner color={overdue > 0 ? "red" : "green"} icon={overdue > 0 ? "🚨" : "✅"}
        text={overdue > 0 ? `${overdue} Allps AI staff member(s) overdue on AI literacy training. Art. 4 deadline passed February 2025.` : "All Allps AI staff AI literacy training is current."} />
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead>
          <tr style={{ background:"#F3F0FA" }}>
            <Th>Staff Member</Th>
            <Th>Role</Th>
            <Th>Status</Th>
            <Th>Completed</Th>
            <Th>Version</Th>
            <Th>Next Due</Th>
            <Th></Th>
          </tr>
        </thead>
        <tbody>
          {PLATFORM_STAFF.map((s, i) => (
            <tr key={i} style={{ background: s.status==="overdue" ? "#FFF5F5" : "white" }}>
              <Td><span style={{ fontWeight:600 }}>{s.name}</span></Td>
              <Td muted>{s.role}</Td>
              <Td>
                <span style={{ background: s.status==="current" ? "#E4F5EA" : "#FCEBEB", color: s.status==="current" ? "#1A6B3A" : "#A32D2D", borderRadius:100, padding:"2px 9px", fontSize:11, fontWeight:700 }}>
                  {s.status === "current" ? "Current" : "OVERDUE"}
                </span>
              </Td>
              <Td muted>{s.completed}</Td>
              <Td muted>{s.version}</Td>
              <Td><span style={{ color: s.status==="overdue"?"#A32D2D":"#333", fontWeight: s.status==="overdue"?700:400 }}>{s.nextDue}</span></Td>
              <Td>{s.status==="overdue" ? <Btn size="sm">Enrol Now</Btn> : <Btn size="sm" variant="ghost">View Record</Btn>}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────
// PLATFORM — DEPLOYER ONBOARDING
// ─────────────────────────────────────────────

function PlatformDeployerOnboarding() {
  const getLevel = c => {
    let issues = 0;
    if (!c.humanGate) issues++;
    if (!c.aiDisclosure) issues++;
    if (!c.onboarded) issues++;
    return issues === 0 ? "Low" : issues <= 2 ? "Medium" : "High";
  };
  return (
    <div>
      <InfoBanner color="blue" icon="📋" text="Deployer onboarding status across all clients. Risk level is computed from missing mandatory obligations. High-risk clients require account manager follow-up." />
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead>
          <tr style={{ background:"#F3F0FA" }}>
            <Th>Client</Th>
            <Th>Onboarded</Th>
            <Th>AI Disclosure</Th>
            <Th>Human Gate</Th>
            <Th>Staff Training Overdue</Th>
            <Th>Risk Level</Th>
          </tr>
        </thead>
        <tbody>
          {PLATFORM_CLIENTS.map(c => {
            const level = getLevel(c);
            const levelColor = level==="High"?"#A32D2D":level==="Medium"?"#8B5500":"#1A6B3A";
            const levelBg = level==="High"?"#FCEBEB":level==="Medium"?"#FEF3E0":"#E4F5EA";
            return (
              <tr key={c.id} style={{ background: level==="High"?"#FFF5F5":level==="Medium"?"#FFFAF0":"white" }}>
                <Td><span style={{ fontWeight:600 }}>{c.name}</span></Td>
                <Td><span style={{ fontSize:16, color: c.onboarded?"#1A6B3A":"#A32D2D" }}>{c.onboarded?"✓":"✗"}</span></Td>
                <Td><span style={{ fontSize:16, color: c.aiDisclosure?"#1A6B3A":"#A32D2D" }}>{c.aiDisclosure?"✓":"✗"}</span></Td>
                <Td><span style={{ fontSize:16, color: c.humanGate?"#1A6B3A":"#A32D2D" }}>{c.humanGate?"✓":"✗"}</span></Td>
                <Td muted>—</Td>
                <Td>
                  <span style={{ background:levelBg, color:levelColor, borderRadius:100, padding:"2px 10px", fontSize:11, fontWeight:700 }}>{level}</span>
                </Td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────
// PLATFORM — MASTER AUDIT LOG
// ─────────────────────────────────────────────

function PlatformMasterAuditLog() {
  const outcomeColor = o => o==="Advanced"||o==="Shortlisted"?"#1553AA":o==="Progressed"?"#1A6B3A":"#8B5500";
  const outcomeBg = o => o==="Advanced"||o==="Shortlisted"?"#EEF2FE":o==="Progressed"?"#E4F5EA":"#FEF3E0";
  return (
    <div>
      <InfoBanner color="blue" icon="🔒" text="Immutable AI decision log across all clients (Art. 12). Minimum 6-month retention. This is a provider obligation — clients receive read-only export access to their slice only." />
      <div style={{ display:"flex", justifyContent:"flex-end", gap:8, marginBottom:12 }}>
        <Btn size="sm" variant="ghost">Export All (JSON)</Btn>
        <Btn size="sm" variant="ghost">Export All (CSV)</Btn>
        <Btn size="sm">Export by Client</Btn>
      </div>
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead>
          <tr style={{ background:"#F3F0FA" }}>
            <Th>Timestamp</Th>
            <Th>Client</Th>
            <Th>Candidate (hashed)</Th>
            <Th>AI Module + Version</Th>
            <Th>Event</Th>
            <Th>Human Action</Th>
            <Th>Outcome</Th>
          </tr>
        </thead>
        <tbody>
          {PLATFORM_AUDIT_LOG.map((e,i) => (
            <tr key={i}>
              <Td muted><span style={{ fontFamily:"monospace", fontSize:11 }}>{e.ts}</span></Td>
              <Td><span style={{ fontWeight:600, fontSize:12 }}>{e.client}</span></Td>
              <Td muted><span style={{ fontFamily:"monospace", fontSize:11 }}>{e.candidate}</span></Td>
              <Td muted><span style={{ fontSize:12 }}>{e.module}</span></Td>
              <Td>{e.event}</Td>
              <Td>
                <span style={{ background: e.humanAction==="Override"?"#FEF3E0":"#F0EDE8", color: e.humanAction==="Override"?"#8B5500":"#555", borderRadius:100, padding:"2px 8px", fontSize:11, fontWeight:500 }}>
                  {e.humanAction}
                </span>
              </Td>
              <Td>
                <span style={{ background:outcomeBg(e.outcome), color:outcomeColor(e.outcome), borderRadius:100, padding:"2px 9px", fontSize:11, fontWeight:600 }}>
                  {e.outcome}
                </span>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────
// PLATFORM DASHBOARD
// ─────────────────────────────────────────────

function PlatformDashboard() {
  const [tab, setTab] = useState("gdpr");
  const [gdprSub, setGdprSub] = useState("overview");
  const [aiSub, setAiSub] = useState("modules");

  const ACC = "#6B3AAA";

  const gdprTabs = [
    { id:"overview",  label:"Consent Overview by Client" },
    { id:"dsr",       label:"DSR Pipeline" },
    { id:"retention", label:"Retention Engine" },
  ];
  const aiTabs = [
    { id:"modules",    label:"AI Module Registry" },
    { id:"training",   label:"Platform Staff Training" },
    { id:"onboarding", label:"Deployer Onboarding" },
    { id:"auditlog",   label:"Master Audit Log" },
  ];

  return (
    <div>
      <div style={{ background:"#F3EFFE", borderRadius:10, padding:"12px 16px", marginBottom:20, display:"flex", justifyContent:"space-between", alignItems:"center", border:"1px solid #D4C8F5" }}>
        <div>
          <div style={{ fontWeight:700, fontSize:14, color:ACC }}>⚙️ Platform Compliance Dashboard</div>
          <div style={{ fontSize:12, color:ACC, opacity:0.8, marginTop:2 }}>Provider obligations — GDPR Art. 5, 12 · EU AI Act Art. 4, 9, 11, 12, 13, 49 · nLPD</div>
        </div>
        <div style={{ fontSize:12, color:ACC }}>Allps AI · CPO / DPO View</div>
      </div>

      <TabBar tabs={[{id:"gdpr",label:"🔐 GDPR Operations"},{id:"aiact",label:"🤖 AI Act (Provider)"}]} active={tab} onChange={t=>{setTab(t); setGdprSub("overview"); setAiSub("modules");}} accent={ACC} />

      {tab === "gdpr" && (
        <div>
          <TabBar tabs={gdprTabs} active={gdprSub} onChange={setGdprSub} accent={ACC} />
          {gdprSub === "overview"  && <PlatformConsentOverview />}
          {gdprSub === "dsr"       && <PlatformDsrPipeline />}
          {gdprSub === "retention" && <PlatformRetentionEngine />}
        </div>
      )}
      {tab === "aiact" && (
        <div>
          <TabBar tabs={aiTabs} active={aiSub} onChange={setAiSub} accent={ACC} />
          {aiSub === "modules"    && <PlatformModuleRegistry />}
          {aiSub === "training"   && <PlatformStaffTraining />}
          {aiSub === "onboarding" && <PlatformDeployerOnboarding />}
          {aiSub === "auditlog"   && <PlatformMasterAuditLog />}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// IMPLEMENTATION HUB — native React render
// Full content faithful to allps_ai_compliance_implementation_hub_v2.html
// ─────────────────────────────────────────────

const HUB_SECTIONS = [
  { id:"overview",    label:"Dashboard",                  group:"Overview",           dot:"#185FA5" },
  { id:"p1",          label:"Legal Basis & Consent",      group:"Pillars",            dot:"#E24B4A" },
  { id:"p2",          label:"Transparency & Notices",     group:"Pillars",            dot:"#E24B4A" },
  { id:"p3",          label:"Data Governance",            group:"Pillars",            dot:"#E24B4A" },
  { id:"p4",          label:"Human Oversight",            group:"Pillars",            dot:"#E24B4A" },
  { id:"p5",          label:"AI Documentation",           group:"Pillars",            dot:"#EF9F27" },
  { id:"p6",          label:"Bias & Monitoring",          group:"Pillars",            dot:"#EF9F27" },
  { id:"p7",          label:"Candidate Rights",           group:"Pillars",            dot:"#E24B4A" },
  { id:"privacy",     label:"Privacy Notice",             group:"Document Templates", dot:"#1D9E75" },
  { id:"rights",      label:"Rights Charter",             group:"Document Templates", dot:"#1D9E75" },
  { id:"howitworks",  label:"How Our AI Works",           group:"Document Templates", dot:"#1D9E75" },
  { id:"consent",     label:"Consent UI Copy",            group:"Document Templates", dot:"#1D9E75" },
  { id:"interview",   label:"Interview Disclosure",       group:"Document Templates", dot:"#1D9E75" },
  { id:"dsr",         label:"DSR Communications",         group:"Document Templates", dot:"#1D9E75" },
];

// ── Shared hub UI primitives ──────────────────

function HBadge({ type }) {
  const map = {
    p1:    { bg:"#FCEBEB", color:"#A32D2D", label:"P1" },
    p2:    { bg:"#FAEEDA", color:"#854F0B", label:"P2" },
    hi:    { bg:"#FCEBEB", color:"#A32D2D", label:"High" },
    med:   { bg:"#FAEEDA", color:"#854F0B", label:"Medium" },
    lo:    { bg:"#EAF3DE", color:"#3B6D11", label:"Low" },
    gdpr:  { bg:"#E1F5EE", color:"#085041", label:"GDPR",         border:"#5DCAA5" },
    aiact: { bg:"#EEEDFE", color:"#26215C", label:"EU AI Act",    border:"#AFA9EC" },
    both:  { bg:"#FAEEDA", color:"#633806", label:"GDPR + AI Act",border:"#EF9F27" },
    ui:    { bg:"#EEEDFE", color:"#3C3489", label:"UI" },
    doc:   { bg:"#E1F5EE", color:"#0F6E56", label:"Doc & Process" },
    back:  { bg:"#F0EDE8", color:"#6B5B3A", label:"Backend" },
    comm:  { bg:"#FAECE7", color:"#993C1D", label:"Comms" },
  };
  const s = map[type] || map.back;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", padding:"2px 7px", borderRadius:100,
      fontSize:10, fontWeight:700, background:s.bg, color:s.color,
      border:s.border ? `0.5px solid ${s.border}` : "none", whiteSpace:"nowrap" }}>
      {s.label}
    </span>
  );
}

function RecCard({ refLabel, title, badges, panes }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab]   = useState(0);
  return (
    <div style={{ border:"0.5px solid rgba(0,0,0,0.11)", borderRadius:10, marginBottom:12, overflow:"hidden" }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ width:"100%", padding:"12px 14px", display:"flex", alignItems:"flex-start", gap:10,
          cursor:"pointer", background: open ? "#F5F4F2" : "white", border:"none", textAlign:"left" }}>
        <span style={{ fontFamily:"monospace", fontSize:11, fontWeight:600, color:"#888", minWidth:32, marginTop:1, flexShrink:0 }}>{refLabel}</span>
        <span style={{ fontSize:13, fontWeight:500, color:"#1A1A18", flex:1, lineHeight:1.4 }}>{title}</span>
        <div style={{ display:"flex", gap:4, flexShrink:0, flexWrap:"wrap", justifyContent:"flex-end", maxWidth:230 }}>
          {badges.map((b,i) => <HBadge key={i} type={b} />)}
        </div>
        <span style={{ color:"#aaa", fontSize:14, marginTop:1, flexShrink:0, transform: open ? "rotate(90deg)" : "none", transition:"transform 0.15s" }}>›</span>
      </button>
      {open && (
        <div style={{ borderTop:"0.5px solid rgba(0,0,0,0.09)" }}>
          {panes.length > 1 && (
            <div style={{ display:"flex", background:"#F5F4F2", borderBottom:"0.5px solid rgba(0,0,0,0.09)" }}>
              {panes.map((p,i) => (
                <button key={i} onClick={() => setTab(i)}
                  style={{ padding:"8px 14px", fontSize:12, cursor:"pointer", background:"none", border:"none",
                    borderBottom: tab===i ? "2px solid #185FA5" : "2px solid transparent",
                    color: tab===i ? "#185FA5" : "#666", fontWeight: tab===i ? 600 : 400 }}>
                  {p.label}
                </button>
              ))}
            </div>
          )}
          <div style={{ padding:14 }}>{panes[tab]?.content}</div>
        </div>
      )}
    </div>
  );
}

function HBlock({ label, children }) {
  return (
    <div style={{ background:"#F5F4F2", borderRadius:8, padding:"10px 12px", marginBottom:10 }}>
      {label && <div style={{ fontSize:10, fontWeight:700, color:"#888", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:6 }}>{label}</div>}
      <div style={{ fontSize:13, color:"#1A1A18", lineHeight:1.65 }}>{children}</div>
    </div>
  );
}

function CopyBlock({ label, text }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text.trim()).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); });
    }
  };
  return (
    <div style={{ border:"0.5px solid rgba(0,0,0,0.1)", borderRadius:8, overflow:"hidden", marginBottom:14 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"7px 12px", background:"#F5F4F2", borderBottom:"0.5px solid rgba(0,0,0,0.09)" }}>
        <span style={{ fontSize:11, fontWeight:600, color:"#888", letterSpacing:"0.03em" }}>{label}</span>
        <button onClick={copy}
          style={{ fontSize:11, padding:"3px 10px", cursor:"pointer", border:"0.5px solid rgba(0,0,0,0.15)", borderRadius:6, background:"white", color:"#555" }}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre style={{ padding:14, fontSize:12, color:"#1A1A18", lineHeight:1.7, fontFamily:"'SF Mono','Fira Mono',monospace",
        background:"white", maxHeight:260, overflowY:"auto", whiteSpace:"pre-wrap", margin:0 }}>
        {text.trim()}
      </pre>
    </div>
  );
}

function Checklist({ items }) {
  const [done, setDone] = useState({});
  return (
    <ul style={{ listStyle:"none", padding:0 }}>
      {items.map((item,i) => (
        <li key={i} onClick={() => setDone(d => ({...d,[i]:!d[i]}))}
          style={{ display:"flex", gap:9, alignItems:"flex-start", padding:"7px 0",
            borderBottom:"0.5px solid rgba(0,0,0,0.06)", fontSize:13, color:"#1A1A18", cursor:"pointer", lineHeight:1.5 }}>
          <span style={{ width:16, height:16, flexShrink:0, marginTop:1, border:"0.5px solid rgba(0,0,0,0.2)",
            borderRadius:3, background: done[i] ? "#185FA5" : "white",
            display:"flex", alignItems:"center", justifyContent:"center" }}>
            {done[i] && <span style={{ color:"white", fontSize:10, fontWeight:700 }}>✓</span>}
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function HAlertBlock({ label, children }) {
  return (
    <div style={{ border:"0.5px solid #F09595", background:"#FCEBEB", borderRadius:8, padding:"10px 14px", marginBottom:14 }}>
      <div style={{ fontSize:11, fontWeight:700, color:"#A32D2D", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:4 }}>{label}</div>
      <div style={{ fontSize:13, color:"#791F1F", lineHeight:1.6 }}>{children}</div>
    </div>
  );
}

function DocSec({ title, children }) {
  return (
    <div style={{ marginBottom:20 }}>
      {title && <div style={{ fontSize:13, fontWeight:600, color:"#1A1A18", marginBottom:10, paddingBottom:6, borderBottom:"0.5px solid rgba(0,0,0,0.08)" }}>{title}</div>}
      {children}
    </div>
  );
}

// ── Section content ───────────────────────────

function HubSection({ id }) {

  // ── OVERVIEW ────────────────────────────────
  if (id === "overview") return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:18 }}>
        {[["Total recommendations","28","across 8 pillars","#1A1A18"],
          ["Critical (P1)","18","immediate action","#A32D2D"],
          ["Core compliance (P2)","10","before Aug 2026","#854F0B"],
          ["Hard deadline","Aug '26","EU AI Act enforcement","#185FA5"]].map(([l,v,s,c]) => (
          <div key={l} style={{ background:"#F5F4F2", borderRadius:8, padding:"12px 14px" }}>
            <div style={{ fontSize:11, color:"#888", marginBottom:4 }}>{l}</div>
            <div style={{ fontSize:22, fontWeight:700, color:c }}>{v}</div>
            <div style={{ fontSize:11, color:"#888", marginTop:2 }}>{s}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:18 }}>
        {[["Phase 1 — Foundation","Stop the bleeding","Now → Q3 2025","#A32D2D"],
          ["Phase 2 — Core compliance","Build high-risk controls","Q4 2025 → Q2 2026","#854F0B"],
          ["Phase 3 — Maturity","Monitor & optimise","Q3 2026 onwards","#3B6D11"]].map(([p,n,d,c]) => (
          <div key={p} style={{ padding:"10px 12px", borderRadius:8, border:"0.5px solid rgba(0,0,0,0.1)" }}>
            <div style={{ fontSize:10, fontWeight:700, color:c, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:2 }}>{p}</div>
            <div style={{ fontSize:13, fontWeight:600, color:"#1A1A18", marginBottom:2 }}>{n}</div>
            <div style={{ fontSize:11, color:"#888" }}>{d}</div>
          </div>
        ))}
      </div>
      <HAlertBlock label="⚠ Prohibited practices — already illegal since 2 February 2025">
        <ul style={{ paddingLeft:18, lineHeight:1.7 }}>
          <li>Emotion recognition in workplace contexts (video/audio/biometric)</li>
          <li>Biometric categorisation to infer race, political opinions, religion, sexual orientation</li>
          <li>Social scoring based on behaviour or characteristics unrelated to the role</li>
          <li>Subliminal manipulation of candidate responses</li>
        </ul>
      </HAlertBlock>
      <HBlock label="Regulation badge legend">
        <div style={{ display:"flex", flexWrap:"wrap", gap:10, alignItems:"center" }}>
          <span><HBadge type="gdpr" /> GDPR obligation only</span>
          <span><HBadge type="aiact" /> EU AI Act obligation only</span>
          <span><HBadge type="both" /> Dual obligation — required by both</span>
        </div>
      </HBlock>
      <HBlock label="How to use this hub">
        Navigate each pillar using the left sidebar to see all 28 recommendations, implementation guidelines, acceptance criteria, and ready-to-use document copy. Each recommendation card is expandable — click to see Specification, Dev Guide, and Acceptance Criteria tabs. Use the Document Templates section for production-ready privacy notices, consent copy, and candidate communications.
      </HBlock>
    </div>
  );

  // ── PILLAR 1 ─────────────────────────────────
  if (id === "p1") return (
    <div>
      <RecCard refLabel="R-01" title="Legitimate Interests Assessment (LIA) for core processing activities" badges={["p1","med","doc","gdpr"]}
        panes={[
          { label:"Specification", content: <div>
            <HBlock label="What to produce">A documented Legitimate Interests Assessment (LIA) stored in the compliance register for: (1) CV parsing & AI matching, (2) AI sourcing, (3) bias monitoring / model improvement. Each LIA must follow the three-step ICO/EDPB framework.</HBlock>
            <HBlock label="Three-step LIA template"><ul style={{paddingLeft:18,lineHeight:1.7}}><li><strong>Purpose test:</strong> Is there a legitimate interest? (Filling roles with best-fit candidates; improving model fairness)</li><li><strong>Necessity test:</strong> Is processing necessary and proportionate? (No less intrusive alternative achieves the same purpose)</li><li><strong>Balancing test:</strong> Do candidate interests override the interest? (Include: nature of data, reasonable expectations, safeguards in place)</li></ul></HBlock>
            <HBlock label="Regulatory basis">GDPR Art. 6(1)(f). Owner: CPO. Legal counsel must review and sign off each LIA. Target: all three LIAs complete within 4 weeks of Phase 1 kickoff.</HBlock>
          </div> },
          { label:"Dev guide", content: <HBlock label="No backend build required">This is a documentation task. Store LIA documents in a compliance register (Notion, Confluence, or a dedicated folder). Link each LIA to the corresponding RoPA entry (R-11). Reference LIA document ID in code comments or database schema documentation where the processing activity is implemented.</HBlock> },
          { label:"Acceptance criteria", content: <Checklist items={["LIA produced for CV parsing & AI matching","LIA produced for AI sourcing","LIA produced for bias monitoring / model improvement","All LIAs reviewed and signed off by external legal counsel","LIAs stored in compliance register with version control","LIAs linked to corresponding RoPA entries"]} /> },
        ]} />
      <RecCard refLabel="R-02" title="Separate consent flows per AI feature (application / screening / skills / talent pool)" badges={["p1","med","ui","gdpr"]}
        panes={[
          { label:"Specification", content: <div>
            <HBlock label="Four distinct consent items required"><ul style={{paddingLeft:18,lineHeight:1.7}}><li><strong>Consent A:</strong> Standard application processing (CV parsing, AI matching) — lawful basis: Legitimate Interest, but consent gate for transparency</li><li><strong>Consent B:</strong> AI screening interview recording — explicit consent, obtained pre-interview</li><li><strong>Consent C:</strong> AI skills interview recording — explicit consent, separate item from B</li><li><strong>Consent D:</strong> Talent pool inclusion beyond active role — explicit consent, separate from application</li></ul></HBlock>
            <HBlock label="UI pattern — step-by-step screens">One consent item per screen. Unchecked toggle by default. Each screen must show: what data is collected, how it will be used, who can see it, how long it will be kept, and how to withdraw. No dark patterns — the withdraw path must be as easy as consent. See Consent UI Copy template in Document Templates.</HBlock>
          </div> },
          { label:"Dev guide", content: <div>
            <HBlock label="Database schema"><code style={{fontFamily:"monospace",fontSize:12}}>consent_records</code> table fields: <code style={{fontFamily:"monospace",fontSize:12}}>candidate_id</code>, <code style={{fontFamily:"monospace",fontSize:12}}>consent_type</code> (enum: APPLICATION, SCREENING, SKILLS, TALENT_POOL), <code style={{fontFamily:"monospace",fontSize:12}}>version</code>, <code style={{fontFamily:"monospace",fontSize:12}}>granted_at</code> (timestamp), <code style={{fontFamily:"monospace",fontSize:12}}>withdrawn_at</code> (nullable timestamp), <code style={{fontFamily:"monospace",fontSize:12}}>capture_method</code>, <code style={{fontFamily:"monospace",fontSize:12}}>ip_hash</code>, <code style={{fontFamily:"monospace",fontSize:12}}>consent_text_snapshot</code>. Store as a dedicated table — never booleans on the candidate profile. Never pre-set any consent field to true.</HBlock>
            <HBlock label="Withdrawal mechanism">Withdrawing Consent B or C must not affect active application status. Withdrawal of Consent D removes candidate from talent pool only. All withdrawal events must be timestamped and written to the audit log. Recruiter must be notified when AI consent is withdrawn mid-process.</HBlock>
          </div> },
          { label:"Acceptance criteria", content: <Checklist items={["Four separate consent screens implemented","All toggles unchecked by default (no pre-ticking)","Each consent item independently withdrawable","Withdrawal does not change application_status for active roles","Consent records stored in dedicated table (not profile table)","Consent version and timestamp captured on every grant/withdrawal"]} /> },
        ]} />
      <RecCard refLabel="R-03" title="Granular consent withdrawal with no impact on application status" badges={["p1","hi","back","gdpr"]}
        panes={[
          { label:"Specification", content: <HBlock label="Core requirement — GDPR Art. 7(3) hard rule">Candidates must be able to withdraw any individual consent at any time without this affecting their active application or candidacy for roles they have applied to. Withdrawal must be as easy as granting consent — accessible from the Candidate Data Portal at all times.</HBlock> },
          { label:"Dev guide", content: <HBlock label="Business logic implementation">Maintain <code style={{fontFamily:"monospace",fontSize:12}}>consent_status</code> as a completely separate concern from <code style={{fontFamily:"monospace",fontSize:12}}>application_status</code>. If screening interview consent is withdrawn after interview is completed: retain the interview data for the duration of the active application only, then delete. Flag to the recruiter that candidate has withdrawn AI interview consent — human review is then required. Log all downstream effects of withdrawal in the audit log.</HBlock> },
          { label:"Acceptance criteria", content: <Checklist items={["Withdrawal UI accessible from candidate dashboard at all times","Withdrawal of any consent does not change application_status","Recruiter is notified when AI consent is withdrawn mid-process","All withdrawal events logged with timestamp and downstream effects"]} /> },
        ]} />
      <RecCard refLabel="R-04" title="Formalise 6-month talent pool consent renewal with specific scope" badges={["p1","lo","back","gdpr"]}
        panes={[
          { label:"Specification", content: <div>
            <HBlock label="Renewal email must include"><ul style={{paddingLeft:18,lineHeight:1.7}}><li>The specific data being renewed (name, CV, skills assessment results, job preferences)</li><li>Current expiry date</li><li>Single-click renewal CTA</li><li>Single-click "delete my data" option with equal visual prominence to renewal</li><li>What happens if no action is taken (auto-delete at expiry)</li></ul></HBlock>
            <HBlock label="Timing and automation">Renewal reminder sent at T-30 days before expiry. Second reminder at T-7 days. Auto-delete job runs at T=0 for all non-renewed records. Log all deletions in the retention audit log. No generic language — emails must name the exact data categories being renewed.</HBlock>
          </div> },
          { label:"Acceptance criteria", content: <Checklist items={["Renewal emails name specific data scope (not generic language)","Two-step reminder system implemented (T-30, T-7)","Auto-delete job runs at expiry for non-renewed records",'"Delete my data" option has equal visual prominence to renewal CTA',"Renewal and non-renewal events logged in consent_records table"]} /> },
        ]} />
      <RecCard refLabel="R-05" title="Standard Contractual Clauses (SCCs) for non-EEA sub-processors" badges={["p1","med","doc","gdpr"]}
        panes={[
          { label:"Specification", content: <HBlock label="Scope">Any LLM API provider or AI model service outside the EEA used in the AI pipeline requires SCCs or a valid adequacy decision. For each sub-processor: execute 2021 EU Commission SCCs, document a transfer impact assessment, implement data minimisation at the API call level (strip or pseudonymise PII before sending where technically feasible). Maintain a sub-processor register and notify clients of changes with 30 days notice.</HBlock> },
          { label:"Dev guide", content: <HBlock label="PII stripping middleware">Implement a PII-stripping middleware layer in the AI pipeline. Before any candidate data is sent to third-party LLM APIs: remove or pseudonymise direct identifiers (name, email, phone, address). Document which fields are sent to each provider and the legal justification for each. This middleware should be the single point of control — all external AI API calls must route through it.</HBlock> },
          { label:"Acceptance criteria", content: <Checklist items={["Sub-processor register created and maintained","SCCs executed with all non-EEA AI API providers","PII-stripping middleware implemented for all external API calls","Transfer impact assessments documented per provider","Client notification procedure in place for sub-processor changes"]} /> },
        ]} />
    </div>
  );

  // ── PILLAR 2 ─────────────────────────────────
  if (id === "p2") return (
    <div>
      <RecCard refLabel="R-06" title="Rewrite candidate-facing Privacy Notice in plain language (max 8th-grade reading level)" badges={["p1","lo","comm","both"]}
        panes={[
          { label:"Specification", content: <div>
            <HBlock label="Two-tier structure required"><strong>Tier 1 (short notice)</strong> — shown inline at point of data collection: 3–4 sentences. Must cover: what data, why, how long, how to get more info. Must mention AI use. Shown at application form start.<br/><br/><strong>Tier 2 (full notice)</strong> — linked from Tier 1. Max 8th-grade reading level. Sections: Who we are / What we collect / How AI uses your data / Who sees your data / How long we keep it / Your rights / How to contact us. See Privacy Notice template in Document Templates section.</HBlock>
          </div> },
          { label:"Acceptance criteria", content: <Checklist items={["Tier 1 short notice displayed at application start","Tier 2 full notice accessible via link from Tier 1","AI use explicitly mentioned in both tiers","Reading level verified (Flesch-Kincaid grade ≤8)","Retention periods included for all data categories"]} /> },
        ]} />
      <RecCard refLabel="R-07" title="Mandatory AI disclosure at the start of every AI interview session" badges={["p1","lo","ui","both"]}
        panes={[
          { label:"Specification", content: <div>
            <HBlock label="Disclosure must name">The AI platform (Allps AI), the specific AI function (screening assessment / skills assessment), the purpose of the assessment, and that a human recruiter will review all AI assessments before any hiring decision. Provide link to How Our AI Works page. Must appear before recording begins — never mid-interview.</HBlock>
            <HBlock label="UI pattern">Full-screen pre-interview modal (not a dismissable banner). Candidate must click an explicit acknowledgement button before proceeding. Modal must not auto-dismiss. Acknowledgement event must be logged with timestamp. See Consent UI Copy template for production copy.</HBlock>
          </div> },
          { label:"Dev guide", content: <HBlock label="Implementation gate">Gate interview recording start behind <code style={{fontFamily:"monospace",fontSize:12}}>interview_disclosure_acknowledged = true</code> flag on the interview session. Set this flag only on explicit candidate button click — never on timer, page load, or scroll event. Log acknowledgement with: session_id, candidate_id (hashed), acknowledgement_timestamp, disclosure_version. Apply same pattern to both screening and skills interviews.</HBlock> },
          { label:"Acceptance criteria", content: <Checklist items={["Disclosure modal shown before every AI interview session","Recording cannot start until candidate explicitly acknowledges","Disclosure names specific AI function (screening vs skills)","Human review statement included in disclosure","Link to How Our AI Works included","Acknowledgement logged with timestamp and disclosure version"]} /> },
        ]} />
      <RecCard refLabel="R-08" title="Candidate AI Rights page (web + in-app)" badges={["p1","med","ui","both"]}
        panes={[
          { label:"Specification", content: <div>
            <HBlock label="Nine rights to cover"><ul style={{paddingLeft:18,lineHeight:1.7}}><li>Right to know AI is used in the process</li><li>Right to human review of any AI-influenced outcome</li><li>Right to explanation of AI assessment factors</li><li>Right to access stored data</li><li>Right to correct inaccurate data</li><li>Right to erasure / deletion</li><li>Right to object to automated processing</li><li>Right to withdraw consent without affecting application</li><li>Right to lodge complaint with supervisory authority (Swiss FDPIC / national DPA)</li></ul>See Rights Charter template in Document Templates.</HBlock>
            <HBlock label="Required link placements">Application confirmation email / Interview pre-notification email / Every consent screen / Platform footer / Company website. URL must be stable: /candidate-rights.</HBlock>
          </div> },
          { label:"Acceptance criteria", content: <Checklist items={["Rights page published at stable URL (/candidate-rights)","All 9 rights listed in plain language (no legal boilerplate)","Contact method and 30-day SLA clearly stated","Link to supervisory authority complaint procedure included","Page linked from all 5 required touchpoints"]} /> },
        ]} />
      <RecCard refLabel="R-09" title="'How Our AI Works' plain-language summary per module" badges={["p2","lo","comm","both"]}
        panes={[
          { label:"Specification", content: <HBlock label="Four modules — separate explainers required"><ul style={{paddingLeft:18,lineHeight:1.7}}><li>AI Sourcing: how candidates are identified, what sources are used, what factors are considered</li><li>AI Matching: what the algorithm evaluates, what it explicitly does not use (no photo, nationality, marital status)</li><li>AI Screening Interview: what questions assess, how answers are evaluated, what AI looks for, what it does not infer</li><li>AI Skills Interview: what tasks test, how responses are scored, what competency areas are covered</li></ul>Each explainer: max 200 words, no technical jargon, include one "What it does NOT do" section per module. See How Our AI Works template in Document Templates.</HBlock> },
        ]} />
      <RecCard refLabel="R-10" title="Deployer Transparency Toolkit for client employers" badges={["p2","med","doc","aiact"]}
        panes={[
          { label:"Specification", content: <div>
            <HBlock label="Toolkit contents"><ul style={{paddingLeft:18,lineHeight:1.7}}><li>Template candidate privacy notice (editable, with required Allps AI AI disclosure section)</li><li>Template job posting AI disclosure paragraph (required field in job creation workflow)</li><li>Template interview invitation email with AI disclosure</li><li>Deployer obligations checklist under EU AI Act Art. 26</li><li>Implementation guide: what clients must configure vs what Allps AI handles natively</li></ul></HBlock>
            <HBlock label="Dev requirement">AI use disclosure must be a required (non-skippable) field in the job creation workflow. Clients cannot publish a job without completing this field. Pre-populate with the standard template but allow editing. Log whether each published job has a disclosure statement.</HBlock>
          </div> },
        ]} />
    </div>
  );

  // ── PILLAR 3 ─────────────────────────────────
  if (id === "p3") return (
    <div>
      <RecCard refLabel="R-11" title="Record of Processing Activities (RoPA)" badges={["p1","med","doc","gdpr"]}
        panes={[
          { label:"Specification", content: <div>
            <HBlock label="Required RoPA fields per processing activity">Activity name / Purpose / Data categories / Data subjects / Lawful basis (with LIA reference if LI) / Recipients / Third countries / Retention period / Security measures / Last reviewed. Minimum 10 activities to document: application intake, CV parsing, AI matching, AI sourcing, screening interview, skills interview, talent pool management, recruiter access to profiles, bias monitoring, model training.</HBlock>
            <HBlock label="Governance">Owner: CPO. Review cadence: quarterly. Tool: Notion, Confluence, or Google Sheets. Must be producible within 24 hours if requested by a supervisory authority.</HBlock>
          </div> },
          { label:"Acceptance criteria", content: <Checklist items={["RoPA created with all required fields","All 10+ processing activities documented","Quarterly review cadence scheduled (calendar invite set)","LIA references linked for all LI-based processing activities"]} /> },
        ]} />
      <RecCard refLabel="R-12" title="Automated data retention enforcement engine" badges={["p1","hi","back","gdpr"]}
        panes={[
          { label:"Specification", content: <HBlock label="Retention policy rules"><ul style={{paddingLeft:18,lineHeight:1.7}}><li>Unsuccessful candidates: auto-delete at T+12 months from application close date</li><li>Talent pool candidates: renewal reminder at T+5 months, auto-delete at T+12 months if not renewed</li><li>AI interview recordings: delete at application close + 6 months</li><li>AI assessment results: same retention as application data</li><li>Audit logs: retain minimum 6 months (AI Act Art. 12)</li><li>Successful hires: employment records retention (typically 7 years)</li></ul></HBlock> },
          { label:"Dev guide", content: <HBlock label="Implementation pattern">Scheduled cron job daily at 02:00 UTC. Soft-delete first: set <code style={{fontFamily:"monospace",fontSize:12}}>deleted_at</code> timestamp. Hard-delete after 30-day grace period. Write every deletion event to immutable audit log: candidate_id (hashed), deletion_reason_code (RETENTION_EXPIRY / CONSENT_WITHDRAWN / DSR_REQUEST), triggered_by (SYSTEM / MANUAL), timestamp. For interview recordings: delete from object storage AND remove database reference in a single transaction.</HBlock> },
          { label:"Acceptance criteria", content: <Checklist items={["Scheduled deletion job runs daily","Soft-delete with 30-day grace period before hard-delete","All deletion events logged to audit table with reason codes","Interview recordings deleted from object storage AND database in single transaction","Talent pool renewal trigger fires at T+5 months","Retention job monitored — on-call alert on job failure"]} /> },
        ]} />
      <RecCard refLabel="R-13" title="AI input data field audit and minimisation" badges={["p1","med","back","both"]}
        panes={[
          { label:"Specification", content: <HBlock label="Fields to audit and likely remove from AI inputs"><ul style={{paddingLeft:18,lineHeight:1.7}}><li>Profile photo — remove from AI matching input (visual bias risk)</li><li>Nationality / citizenship — remove unless legally required for the specific role</li><li>Marital status — remove entirely (not job-relevant in any context)</li><li>Date of birth (full) — use age band only if required for analytics; never send raw DOB to AI models</li><li>Home address — not needed for AI matching; retain for post-hire only</li><li>Social media profile links — audit whether any are used in AI scoring</li></ul>Document the full audit: list every field, justify its inclusion or document its removal. This document is a required input to the Technical File (R-20).</HBlock> },
          { label:"Acceptance criteria", content: <Checklist items={["Profile photo not sent to AI matching model","Nationality and marital status removed from all AI inputs","Full field audit documented and stored in compliance register","Every remaining AI input field has documented justification","Audit document incorporated into Technical File"]} /> },
        ]} />
      <RecCard refLabel="R-14" title="Data Processing Agreements (DPAs) with all sub-processors" badges={["p1","med","doc","gdpr"]}
        panes={[
          { label:"Specification", content: <HBlock label="DPA required for every sub-processor">Cloud providers, LLM API providers, analytics tools, email delivery services, video hosting. DPA must cover: processing instructions, data categories, processing purposes, security obligations, sub-processor restriction, audit rights, deletion on contract termination. Maintain a sub-processor register with: name, service, data categories processed, legal basis for transfer, SCC status, DPA signed date, next review date. Notify clients of sub-processor changes with 30 days notice.</HBlock> },
        ]} />
      <RecCard refLabel="R-15" title="Role-based access controls (RBAC) audit and access logging" badges={["p1","med","back","both"]}
        panes={[
          { label:"Specification", content: <HBlock label="Access model">Interview recordings and AI scores: accessible only to the specific recruiter(s) and hiring manager(s) assigned to that job role. No global admin access to candidate PII unless operationally justified and logged. Allps AI internal staff must access via a separate escalation path with mandatory reason logging.</HBlock> },
          { label:"Dev guide", content: <HBlock label="Implementation">Every request to <code style={{fontFamily:"monospace",fontSize:12}}>GET /candidates/{"{id}"}/interview</code> or <code style={{fontFamily:"monospace",fontSize:12}}>GET /candidates/{"{id}"}/scores</code> must verify caller is on the <code style={{fontFamily:"monospace",fontSize:12}}>job_access_list</code> for the associated job. Log all access events to <code style={{fontFamily:"monospace",fontSize:12}}>access_audit_log</code>: user_id, resource_type, resource_id, action, timestamp, ip_hash. Flag unusual access patterns (bulk downloads, off-hours access). Access log retention: minimum 12 months.</HBlock> },
          { label:"Acceptance criteria", content: <Checklist items={["Interview recordings accessible only to assigned job team","All access events logged with user, resource, timestamp","Admin escalation path requires reason logging","Access logs retained for minimum 12 months"]} /> },
        ]} />
    </div>
  );

  // ── PILLAR 4 ─────────────────────────────────
  if (id === "p4") return (
    <div>
      <RecCard refLabel="R-16" title="Human-in-the-loop gate before any rejection is communicated to a candidate" badges={["p1","hi","back","both"]}
        panes={[
          { label:"Specification", content: <div>
            <HBlock label="Core requirement — GDPR Art. 22 hard block">The ATS workflow must prevent any rejection notification from being sent until a recruiter has explicitly taken an action (Approve for next stage / Reject / Hold). AI can recommend — it cannot auto-reject. Pure automated rejection without human review is prohibited under GDPR Art. 22.</HBlock>
            <HBlock label="ATS state machine">Pipeline states: AI_ASSESSED → PENDING_HUMAN_REVIEW → (APPROVED / REJECTED / HELD). Rejection notification emails can only be triggered from REJECTED state. REJECTED state requires explicit recruiter action. No automated transition from AI_ASSESSED to any outbound communication state.</HBlock>
          </div> },
          { label:"Dev guide", content: <HBlock label="Implementation">Add middleware guard on the rejection notification job: check <code style={{fontFamily:"monospace",fontSize:12}}>candidate.reviewed_by_human !== null</code> before allowing outbound rejection email. Surface a "Candidates pending review" queue as the primary workflow entry point in the recruiter dashboard. Log for every review: reviewer_user_id, review_timestamp, decision (APPROVED/REJECTED/HELD), ai_recommendation_followed (boolean).</HBlock> },
          { label:"Acceptance criteria", content: <Checklist items={["Rejection notification impossible without explicit recruiter action",'"Pending review" queue visible as primary dashboard entry point',"Every rejection logged with reviewer ID and timestamp","No automated state transitions that bypass the review gate"]} /> },
        ]} />
      <RecCard refLabel="R-17" title="Recruiter override function with reason logging in ATS" badges={["p1","med","ui","aiact"]}
        panes={[
          { label:"Specification", content: <div>
            <HBlock label="Override UI pattern">When a recruiter changes an AI rank or rejects an AI-recommended candidate, a prompt appears: "You are overriding the AI recommendation. Reason (optional):" Dropdown: Better fit identified elsewhere / Role requirements changed / AI assessment incomplete / Candidate withdrew / Other. Free text for Other. Reason stored in audit log — never shown to candidate.</HBlock>
            <HBlock label="Override data use">Anonymised override data (reason code + demographic band of overridden candidate) feeds into the bias monitoring pipeline (R-25) to identify systematic patterns where AI recommendations are overridden for specific demographic groups.</HBlock>
          </div> },
          { label:"Acceptance criteria", content: <Checklist items={["Override prompt appears on AI recommendation change","Reason stored in audit log (not candidate-visible)","Override events included in bias monitoring pipeline input"]} /> },
        ]} />
      <RecCard refLabel="R-18" title="Candidate 'Request Human Review' button on AI decision notification pages" badges={["p2","med","ui","both"]}
        panes={[
          { label:"Specification", content: <HBlock label="Flow">Button appears on candidate-facing AI interview result pages. Click triggers: (1) tracked request in DSR workflow, (2) automated acknowledgement email to candidate within 24 hours, (3) task created in recruiter's ATS queue with 5 business day SLA. Request logged with: request_id, candidate_id (hashed), job_id, timestamp.</HBlock> },
          { label:"Acceptance criteria", content: <Checklist items={["Button present on all AI-driven decision notification pages","Acknowledgement email sent automatically within 24 hours","Recruiter task created with 5 business day SLA displayed","All requests logged and trackable with request_id"]} /> },
        ]} />
      <RecCard refLabel="R-19" title="'Explain My Assessment' candidate-facing feature" badges={["p2","hi","ui","both"]}
        panes={[
          { label:"Specification", content: <div>
            <HBlock label="What to show candidates"><ul style={{paddingLeft:18,lineHeight:1.7}}><li>Competency areas evaluated (e.g. Communication, Technical Problem-Solving, Situational Judgement)</li><li>Relative importance / weighting of each competency for this specific role</li><li>Qualitative tier indicator: Strong / Meets Expectations / Needs Development</li><li>One sentence plain-language rationale per competency area</li></ul></HBlock>
            <HBlock label="What NOT to expose">Raw model scores, confidence percentages, internal model weights, training data references, model architecture. The explanation must be human-interpretable — not a raw model output dump.</HBlock>
          </div> },
          { label:"Dev guide", content: <HBlock label="Explainability layer architecture">Build a mapping layer: model output scores → competency tier buckets. Tier thresholds: Strong (top 33% vs role benchmark), Meets Expectations (middle 33%), Needs Development (bottom 33%). Generate rationale text via template or LLM summary referencing only assessed behaviours. Store generated explanation with interview_session_id — serve from storage, never re-generate on each page load.</HBlock> },
          { label:"Acceptance criteria", content: <Checklist items={["Competency areas shown — not raw scores or percentages","Qualitative tiers (Strong / Meets / Needs) displayed per competency","Plain-language rationale provided per competency","No model internals, weights, or confidence scores exposed","Rationale references only job-relevant behaviours"]} /> },
        ]} />
    </div>
  );

  // ── PILLAR 5 ─────────────────────────────────
  if (id === "p5") return (
    <div>
      <RecCard refLabel="R-20" title="EU AI Act Technical File per high-risk AI module (4 modules)" badges={["p2","hi","doc","aiact"]}
        panes={[
          { label:"Specification", content: <HBlock label="Required for 4 high-risk modules">AI Sourcing / AI Matching / AI Screening Interview / AI Skills Interview. Each Technical File must contain all 8 sections per AI Act Annex IV: (a) System description and intended purpose, (b) System architecture overview, (c) Training data description (provenance, size, preprocessing steps, bias assessment), (d) Performance metrics on validation set (accuracy, precision, recall), (e) Bias test results by gender/age/ethnicity, (f) Known limitations and edge cases, (g) Human oversight mechanisms, (h) Version and update history. This is a regulatory inspection document — internal only, not public.</HBlock> },
          { label:"Acceptance criteria", content: <Checklist items={["Technical File produced for AI Sourcing","Technical File produced for AI Matching","Technical File produced for AI Screening Interview","Technical File produced for AI Skills Interview","All 8 Annex IV sections (a–h) complete per file","All files complete before 2 August 2026"]} /> },
        ]} />
      <RecCard refLabel="R-21" title="Risk Register per AI module (AI Act Art. 9)" badges={["p2","med","doc","aiact"]}
        panes={[
          { label:"Specification", content: <HBlock label="Risk register fields per entry">Risk ID / Risk description / Likelihood (1–5) / Severity (1–5) / Risk score (L × S) / Current mitigation / Residual risk level / Review date / Owner. Review before every major model update and at minimum quarterly. Key risks to document per module: discriminatory output, data leakage, model drift, adversarial input manipulation, recruiter over-reliance, training data staleness.</HBlock> },
        ]} />
      <RecCard refLabel="R-22" title="DPIA for each high-risk AI processing activity (3 DPIAs)" badges={["p1","med","doc","both"]}
        panes={[
          { label:"Specification", content: <HBlock label="Three DPIAs required">DPIA 1: AI Screening Interview / DPIA 2: AI Skills Interview / DPIA 3: AI Sourcing and Matching (combined). Use ICO/EDPB DPIA template. Each DPIA must cover: processing description, necessity and proportionality assessment, risk identification (likelihood × severity matrix), mitigation measures, residual risk sign-off by DPO. Review annually or after significant system changes. DPO sign-off required before initial deployment.</HBlock> },
        ]} />
      <RecCard refLabel="R-23" title="Register all high-risk AI systems in EU AI public database (Art. 49)" badges={["p2","lo","doc","aiact"]}
        panes={[
          { label:"Specification", content: <HBlock label="Registration requirements">Register all 4 high-risk AI modules in the EU AI Act database (EAIS) before 2 August 2026. Database portal: ai-database.eu (live 2026). Switzerland-based providers: register as provider with EU representative appointed or via Swiss cross-reference mechanism. All four Technical Files (R-20) must be complete before registration can occur.</HBlock> },
        ]} />
    </div>
  );

  // ── PILLAR 6 ─────────────────────────────────
  if (id === "p6") return (
    <div>
      <HAlertBlock label="Deferred by CPO decision">
        R-24 (bias monitoring pipeline), R-25 (post-market monitoring), and R-26 (bias incident response) are explicitly out of scope for the current build phase. These will be addressed as a separate phase — bias monitoring screens are not yet in the mockup.
      </HAlertBlock>
      <RecCard refLabel="R-24" title="Bias testing across protected characteristics before deployment and per model update" badges={["p1","hi","back","both"]}
        panes={[
          { label:"Specification", content: <div>
            <HBlock label="Protected characteristics to test">Gender / Age band / Ethnicity (where data available) / Disability status (where disclosed). Test must be conducted: before initial deployment, after any model update, quarterly on production data. Use the 80% Rule (4/5 Rule) as threshold: if any group's pass rate is less than 80% of the highest-passing group's rate, flag for investigation. No model may be deployed to production without a passing bias test result.</HBlock>
          </div> },
          { label:"Dev guide", content: <HBlock label="Pipeline implementation">(1) Extract anonymised scoring data with demographic bands — no raw PII. (2) Compute advance/pass rates by demographic group per model per pipeline stage. (3) Calculate adverse impact ratio vs highest-passing group: AIR = (group_rate / highest_rate). (4) Flag if AIR &lt; 0.8. (5) Generate bias test report with statistical significance indicators. (6) Store report in compliance register with model version tag. Run as mandatory gate in CI/CD pipeline for model updates — deployment blocked if bias test fails.</HBlock> },
          { label:"Acceptance criteria", content: <Checklist items={["Bias test suite covers gender, age, and ethnicity","80% adverse impact rule threshold configured","Tests run as mandatory gate in CI/CD for model updates","Test reports stored in compliance register per model version","No model deployable to production without passing bias test"]} /> },
        ]} />
      <RecCard refLabel="R-25" title="Post-market bias monitoring pipeline (AI Act Art. 72)" badges={["p2","hi","back","aiact"]}
        panes={[
          { label:"Specification", content: <HBlock label="Monitoring pipeline">Weekly scheduled job: compute advance rates by demographic group across all active jobs. Alert compliance owner if adverse impact ratio drops below 0.8 for any protected group. Internal compliance dashboard: trend by week, active alerts, models flagged. Named compliance owner reviews alerts within 5 business days. Log all monitoring runs — these records are required for AI Act Art. 72 post-market monitoring documentation.</HBlock> },
        ]} />
      <RecCard refLabel="R-26" title="Incident response procedure for AI bias and discrimination complaints" badges={["p2","lo","doc","both"]}
        panes={[
          { label:"Specification", content: <HBlock label="Procedure steps">1. Complaint intake (email or DSR portal) → assigned to DPO within 24h. 2. Acknowledge candidate within 3 business days. 3. Investigation: review audit logs, bias monitoring data, model version active at time of decision (max 30-day timeline). 4. If personal data breach confirmed: notify supervisory authority within 72h (GDPR Art. 33). 5. Remediation plan and communication to affected candidate. 6. Post-incident review: update risk register and bias monitoring thresholds. Document procedure and store in compliance register.</HBlock> },
        ]} />
    </div>
  );

  // ── PILLAR 7 ─────────────────────────────────
  if (id === "p7") return (
    <div>
      <RecCard refLabel="R-27" title="Self-service Candidate Data Portal" badges={["p1","hi","ui","gdpr"]}
        panes={[
          { label:"Specification", content: <HBlock label="Six required portal capabilities"><ul style={{paddingLeft:18,lineHeight:1.7}}><li>View all stored data (profile, CV, application history, consent records, AI assessment results)</li><li>Update / correct inaccurate profile data</li><li>Download full data export (JSON or PDF) — within 30 days of request</li><li>Withdraw individual consents</li><li>Submit deletion request — triggers DSR workflow, fulfilled within 30 days</li><li>Submit correction request</li></ul>Access via magic link in application confirmation email (time-limited token, 7-day validity) — no new account creation required.</HBlock> },
          { label:"Dev guide", content: <HBlock label="Technical requirements">Magic link authentication: time-limited JWT token (7-day validity), signed with server secret. Data export endpoint: aggregate across all storage systems (candidate_profiles, consent_records, interview recordings metadata, audit_log entries for that candidate). Deletion request: create ticket in DSR workflow, trigger soft-delete pipeline, confirm via email. Identity verification required before deletion: match email + confirmation code. Export file: JSON preferred, PDF fallback.</HBlock> },
          { label:"Acceptance criteria", content: <Checklist items={["All 6 portal capabilities implemented","Data export covers all storage systems","Magic link access — no new account creation required","DSR 30-day fulfilment SLA tracked and enforced","All DSR events logged with timestamps"]} /> },
        ]} />
      <RecCard refLabel="R-28" title="DSR workflow in ATS backend" badges={["p1","med","back","gdpr"]}
        panes={[
          { label:"Specification", content: <HBlock label="DSR workflow steps">1. Intake via portal or email → create DSR ticket with type (access / erasure / correction / portability / objection), auto-assign to DPO. 2. Identity verification: email match + confirmation code within 5 days. 3. Fulfilment (max 30 days from intake): run appropriate data pipeline. 4. Confirmation to candidate: email with summary of actions taken. 5. Log: DSR_id, type, received_at, verified_at, fulfilled_at, outcome, fulfilled_by. Client admins must also have access to export and delete candidate data via admin panel.</HBlock> },
          { label:"Acceptance criteria", content: <Checklist items={["DSR ticketing system implemented (all 5 types)","Identity verification step enforced before fulfilment","30-day fulfilment SLA tracked in ticketing system","Confirmation email sent on fulfilment","Client admin export/delete capability implemented in admin panel"]} /> },
        ]} />
    </div>
  );

  // ── PRIVACY NOTICE ───────────────────────────
  if (id === "privacy") return (
    <div>
      <DocSec title="Tier 1 — Short notice (shown inline at application form)">
        <CopyBlock label="TIER 1 — SHORT NOTICE" text={`We collect and use your personal data — including your CV, application responses, and AI interview recordings — to assess your suitability for this role. Our AI systems help screen and score applications, but a qualified recruiter reviews all AI assessments before any decision is made. We keep unsuccessful candidate data for up to 12 months, then delete it. You have the right to access, correct, or delete your data at any time. Read our full Privacy Notice and Candidate Rights page to learn more, or email privacy@allps.ai with any questions.`} />
      </DocSec>
      <DocSec title="Tier 2 — Full Privacy Notice (sections)">
        <CopyBlock label="SECTION 1 — Who we are" text={`Allps AI AG is a technology company based in Switzerland that provides AI-powered hiring software. For the purposes of this privacy notice, Allps AI is the data processor acting on behalf of the employer (data controller) you applied to. The employer is responsible for deciding how your data is used in their hiring process.

Data Controller: [Employer name and address]
Data Processor: Allps AI AG, [address], Switzerland
Data Protection Contact: privacy@allps.ai`} />
        <CopyBlock label="SECTION 2 — What data we collect and why" text={`YOUR APPLICATION DATA
What: Your name, email address, CV/resume, cover letter, work history, education, skills, and any other information you provide in your application.
Why: To process your application and assess your suitability for the role.
Legal basis: Legitimate interest of the employer to assess candidates for employment.

YOUR AI INTERVIEW RECORDINGS
What: Audio and video recordings of your AI screening and/or skills interview. Your spoken responses and the text transcripts generated from them.
Why: To assess your communication, skills, and suitability for the role using our AI system.
Legal basis: Your explicit consent, obtained before the interview begins. You may withdraw consent at any time.

YOUR AI ASSESSMENT SCORES
What: Scores and competency ratings generated by our AI system based on your application and interviews.
Why: To help recruiters identify suitable candidates. All AI scores are reviewed by a human recruiter before any hiring decision.
Legal basis: Legitimate interest of the employer.

YOUR TALENT POOL DATA (if you opt in)
What: Your profile data kept on file after your application closes.
Why: So the employer can contact you about future relevant roles.
Legal basis: Your explicit consent, renewed every 6 months. You may withdraw at any time.`} />
        <CopyBlock label="SECTION 3 — How AI is used in this process" text={`Allps AI uses artificial intelligence to help employers find the best candidates for their roles. Here is what our AI does and does not do:

AI SOURCING: Our AI searches for candidates whose skills and experience match a job description. It considers your stated qualifications, experience, and skills — not your photo, nationality, marital status, or personal characteristics.

AI MATCHING: Our AI compares your profile to the requirements of each role and generates a match score. This score helps recruiters prioritise which applications to review first. It does not replace recruiter judgment.

AI SCREENING INTERVIEW: Our AI conducts a structured interview to assess your communication and situational judgement. It evaluates what you say in response to interview questions — it does not analyse your facial expressions, emotions, or personal characteristics.

AI SKILLS INTERVIEW: Our AI presents technical tasks or role-specific challenges and evaluates your responses. It assesses the quality and relevance of your answers against defined role competencies.

IMPORTANT: No AI system makes a final hiring decision. A qualified human recruiter reviews all AI assessments before any candidate is progressed or rejected.`} />
        <CopyBlock label="SECTION 4 — How long we keep your data" text={`UNSUCCESSFUL CANDIDATES
We keep your application data, interview recordings, and AI assessment results for up to 12 months after the role closes. After this, all data is permanently deleted.

TALENT POOL CANDIDATES (if you opted in)
We keep your data for 6 months and then ask for your renewed consent to keep it longer. If you do not renew, your data is deleted. Maximum retention with renewed consent: 24 months total.

SUCCESSFUL HIRES
Your data is transferred to the employer's HR systems and retained according to their employment records policy (typically 7 years).

AI INTERVIEW RECORDINGS
Deleted when the application process ends, and no later than 6 months after role closure.`} />
        <CopyBlock label="SECTION 5 — Who sees your data" text={`YOUR DATA IS SHARED WITH:
- The employer you applied to (recruiters and hiring managers assigned to the role)
- Allps AI technical staff (only where necessary for platform support, under strict access controls)

YOUR DATA IS NOT:
- Sold to third parties
- Used to advertise products or services to you
- Shared with other employers without your consent
- Used to train our AI models without your explicit consent

THIRD-PARTY TECHNOLOGY PROVIDERS
We use technology providers to operate our platform (cloud hosting, AI model APIs, email delivery). These providers only process your data on our instructions. We have data processing agreements in place with all providers. For providers outside the EU/EEA, we use Standard Contractual Clauses to protect your data.`} />
        <CopyBlock label="SECTION 6 — Your rights" text={`Under GDPR and the Swiss nFADP, you have the following rights:

RIGHT TO ACCESS — You can request a copy of all personal data we hold about you.
RIGHT TO CORRECTION — You can ask us to correct any inaccurate data.
RIGHT TO ERASURE — You can ask us to delete your data (subject to legal retention requirements).
RIGHT TO OBJECT — You can object to your data being processed by our AI systems.
RIGHT TO HUMAN REVIEW — You can request that a human recruiter reviews any AI-influenced hiring decision.
RIGHT TO EXPLANATION — You can ask us to explain the main factors our AI considered in assessing you.
RIGHT TO DATA PORTABILITY — You can request your data in a machine-readable format.
RIGHT TO WITHDRAW CONSENT — You can withdraw any consent at any time without affecting your active application.

HOW TO EXERCISE YOUR RIGHTS
Use your Candidate Data Portal (link in your application confirmation email), or email privacy@allps.ai. We will respond within 30 days.

COMPLAINTS
If you believe we have not handled your data correctly, you can lodge a complaint with the Swiss Federal Data Protection and Information Commissioner (FDPIC) at edoeb.admin.ch, or with the national data protection authority in your country of residence.`} />
      </DocSec>
    </div>
  );

  // ── RIGHTS CHARTER ───────────────────────────
  if (id === "rights") return (
    <div>
      <CopyBlock label="CANDIDATE RIGHTS CHARTER — full public text" text={`YOUR RIGHTS AS A CANDIDATE ON THE ALLPS AI PLATFORM

At Allps AI, we believe every candidate deserves to know how they are being assessed and to have a fair say in the process. Here are your rights — and how to use them.

1. THE RIGHT TO KNOW AI IS INVOLVED
You will always be told upfront if AI is used to assess your application, screen your CV, or conduct your interview. We will explain which AI tools are involved and what they assess before you begin.

2. THE RIGHT TO HUMAN REVIEW
No AI system makes the final decision about your application. A qualified human recruiter reviews every AI assessment before any hiring decision is made. If you have concerns about your AI assessment, you can request an additional human review at any time — click 'Request Human Review' on your results page or email us.

3. THE RIGHT TO AN EXPLANATION
If you went through an AI interview or AI assessment, you can ask us to explain the main factors considered and how you performed against the competencies tested. We will give you a plain-language summary — not technical jargon. Use the 'Explain My Assessment' feature on your results page or contact us.

4. THE RIGHT TO SEE YOUR DATA
You can view all the personal data we hold about you — including your CV, application responses, interview transcripts, and AI assessment results — through your Candidate Data Portal.

5. THE RIGHT TO CORRECT YOUR DATA
If any information we hold about you is inaccurate or out of date, you can update it in your Candidate Data Portal. If an AI score was based on inaccurate data, it will be recalculated.

6. THE RIGHT TO DELETE YOUR DATA
You can ask us to delete all your personal data at any time. We will confirm deletion within 30 days. Deleting your data will close your application for any active roles.

7. THE RIGHT TO OBJECT
You can object to your application being processed through our AI systems. If you object, we will ensure your application is assessed only by a human recruiter. This may take longer than the standard AI-assisted process.

8. THE RIGHT TO WITHDRAW CONSENT
If you have given consent to AI interview recording or talent pool inclusion, you can withdraw that consent at any time without affecting your application for any active role.

9. THE RIGHT TO COMPLAIN
If you feel your rights have not been respected, you can contact us at privacy@allps.ai. You also have the right to lodge a complaint with the Swiss Federal Data Protection and Information Commissioner (FDPIC) or the national data protection authority in your country.

HOW TO CONTACT US
Email: privacy@allps.ai
Response time: within 3 business days for acknowledgement, within 30 days for fulfilment
Candidate Data Portal: [link]`} />
    </div>
  );

  // ── HOW OUR AI WORKS ─────────────────────────
  if (id === "howitworks") return (
    <div>
      <DocSec title="Module 1 — AI Sourcing">
        <CopyBlock label="AI SOURCING EXPLAINER" text={`HOW OUR AI SOURCING WORKS

Our AI sourcing tool scans professional profiles and talent databases to identify candidates whose skills and experience match a job description.

WHAT IT LOOKS AT: Your stated job titles, skills, years of experience, industry background, and education — the professional information you have chosen to make available.

WHAT IT DOES NOT LOOK AT: Your photo, age, gender, nationality, personal social media, or any characteristic unrelated to the role.

HOW IT WORKS: The AI compares the language in your profile to the language in the job description. It identifies patterns that suggest a good match — for example, relevant technical skills or industry experience.

WHAT HAPPENS NEXT: Sourced candidates are presented to a human recruiter who reviews each profile personally before deciding whether to reach out.

WHAT IT DOES NOT DO: The AI does not make any decision about you. It does not evaluate your personality, social behaviour, or online activity. Sourcing simply surfaces profiles that may be a good match — a human makes every contact decision.`} />
      </DocSec>
      <DocSec title="Module 2 — AI Matching">
        <CopyBlock label="AI MATCHING EXPLAINER" text={`HOW OUR AI MATCHING WORKS

Our AI matching system compares your application to the requirements of the role and generates a match score to help recruiters prioritise their review queue.

WHAT IT LOOKS AT: Your CV content, stated skills and experience, work history, and your responses to application questions — information you have provided directly.

WHAT IT DOES NOT LOOK AT: Your photo, nationality, marital status, age (unless a legal requirement for the role), or any personal characteristic unrelated to the job.

HOW IT WORKS: The AI analyses the overlap between your stated experience and the skills required for the role. It produces a relevance score that helps a recruiter decide which applications to review first — it does not make a yes/no decision.

WHAT HAPPENS NEXT: A recruiter reviews all applications, including those with lower match scores. The AI score is one input among many — it does not determine your outcome.

WHAT IT DOES NOT DO: The AI does not predict your personality, motivation, or cultural fit. It does not access your social media profiles or any data you have not provided.`} />
      </DocSec>
      <DocSec title="Module 3 — AI Screening Interview">
        <CopyBlock label="AI SCREENING INTERVIEW EXPLAINER" text={`HOW OUR AI SCREENING INTERVIEW WORKS

Our AI screening interview is a structured video interview where you answer a set of questions designed to assess your communication skills and suitability for the role.

WHAT IT ASSESSES: The content and relevance of your answers — how clearly you communicate, how you structure your responses, and how well your experience relates to the questions asked.

WHAT IT DOES NOT ASSESS: Your facial expressions, tone of voice, emotional state, appearance, or any physical or personal characteristics. We do not use emotion recognition technology.

HOW IT WORKS: Your responses are transcribed and analysed for relevance, clarity, and alignment with the role competencies. The AI generates a structured assessment report for the recruiter.

WHAT HAPPENS NEXT: A human recruiter reads your assessment report and reviews your interview before making any decision. The AI assessment is a structured summary — not a decision.

WHAT IT DOES NOT DO: The AI does not reject candidates. It does not infer your personality, mental state, or personal characteristics from how you look or sound. It only evaluates what you say in response to the questions.`} />
      </DocSec>
      <DocSec title="Module 4 — AI Skills Interview">
        <CopyBlock label="AI SKILLS INTERVIEW EXPLAINER" text={`HOW OUR AI SKILLS INTERVIEW WORKS

Our AI skills interview presents you with role-specific tasks, problems, or scenarios to assess your technical and professional competencies for the job.

WHAT IT ASSESSES: Your responses to structured tasks — for example, a coding challenge, a case study analysis, or a written problem-solving exercise. The AI evaluates the quality, accuracy, and relevance of your work.

WHAT IT DOES NOT ASSESS: Your speed unless speed is explicitly a stated requirement of the role. How you look, sound, or present yourself. Any characteristic unrelated to the specific competencies being tested.

HOW IT WORKS: Each task is designed around the specific skills required for the role. Your responses are scored against a defined rubric created for that role by the employer and our team.

WHAT HAPPENS NEXT: Your skills assessment results are reviewed by a human recruiter alongside your full application. No decision is made based on the skills interview alone.

WHAT IT DOES NOT DO: The AI does not assess your potential, personality, or growth mindset. It evaluates only the specific competencies tested in the tasks — nothing more.`} />
      </DocSec>
    </div>
  );

  // ── CONSENT UI COPY ──────────────────────────
  if (id === "consent") return (
    <div>
      <DocSec title="Consent Screen A — Standard Application Processing (CV Parsing & AI Matching)">
        <CopyBlock label="APPLICATION PROCESSING CONSENT SCREEN" text={`HEADLINE: How we process your application

SUBHEAD: We want to be upfront about how your data is used before you apply.

BODY:
When you submit your application, your CV and application details will be processed by our AI system to assess how well your experience and skills match this role.

HOW THIS WORKS:
- Our AI reads your CV and application answers to identify relevant skills and experience
- It generates a match score that helps the recruiter prioritise applications to review
- A human recruiter reviews all AI assessments — no AI system makes any final decision

WHAT WE USE:
Your name, CV/resume, work history, skills, education, and application responses.

WHAT WE DO NOT USE:
Your photo, nationality, marital status, or any characteristic unrelated to the role.

HOW LONG WE KEEP IT:
Your application data is kept for up to 12 months after the role closes, then permanently deleted. If you are offered the role, your data transfers to the employer's HR system.

YOUR RIGHTS:
You can access, correct, or delete your data at any time through your Candidate Data Portal. You can also object to AI processing — if you object, a human recruiter will review your application manually.

Read our full Privacy Notice | View your Candidate Rights

[ Toggle — unchecked by default ]
Label: I understand how my application data will be processed and I agree to continue

NOTE: Legal basis is Legitimate Interest — this screen is shown for transparency, not as a strict legal consent requirement. However, presenting it as an active acknowledgement is best practice for candidate trust.

CTA (primary): I understand — continue to application
Secondary: Learn more about how our AI works`} />
      </DocSec>
      <DocSec title="Consent Screen B — AI Screening Interview Recording">
        <CopyBlock label="SCREENING INTERVIEW CONSENT SCREEN" text={`HEADLINE: Before we start your AI screening interview

SUBHEAD: We need your consent to record and analyse your responses.

BODY:
This interview will be recorded (audio and video). Your responses will be transcribed and assessed by our AI system to evaluate your communication skills and how your experience relates to the role.

The assessment report is reviewed by a human recruiter. No decision is made by the AI alone.

WHAT WE COLLECT:
- Audio and video recording of your interview session
- Transcript of your spoken responses
- AI-generated assessment of your answers

HOW LONG WE KEEP IT:
Your recording and transcript are deleted when the role closes, and no later than 6 months after role closure.

YOUR RIGHTS:
You can withdraw this consent at any time from your Candidate Data Portal. Withdrawing consent will not affect your application status, but the recruiter will review your application without the AI assessment.

[ Toggle — unchecked by default ]
Label: I consent to my screening interview being recorded and assessed by Allps AI's screening system

CTA (primary): I consent — start interview
Secondary link: Read our full Privacy Notice
Secondary link: I do not consent (returns to application without recording)`} />
      </DocSec>
      <DocSec title="Consent Screen C — AI Skills Interview Recording">
        <CopyBlock label="SKILLS INTERVIEW CONSENT SCREEN" text={`HEADLINE: Before we start your AI skills assessment

SUBHEAD: We need your consent to record and assess your task responses.

BODY:
This skills assessment will be recorded. Your responses to the tasks presented will be evaluated by our AI system against the competencies required for this role.

The assessment is reviewed by a human recruiter. No decision is made by the AI alone.

WHAT WE COLLECT:
- Your responses to each assessment task (text, code, or recorded answers depending on the task format)
- AI-generated competency scores for each task

HOW LONG WE KEEP IT:
Deleted when the role closes, no later than 6 months after role closure.

YOUR RIGHTS:
You can withdraw this consent at any time from your Candidate Data Portal without affecting your application status.

[ Toggle — unchecked by default ]
Label: I consent to my skills assessment responses being recorded and evaluated by Allps AI's skills assessment system

CTA (primary): I consent — start assessment
Secondary: I do not consent (returns to application)`} />
      </DocSec>
      <DocSec title="Consent Screen D — Talent Pool">
        <CopyBlock label="TALENT POOL CONSENT SCREEN" text={`HEADLINE: Stay in our talent pool for future opportunities

SUBHEAD: This is optional — it has no effect on your current application.

BODY:
If you are not selected for this role, would you like [Employer name] to keep your profile on file for future positions that match your skills?

WHAT THIS MEANS:
- Your CV, profile, and application details will be kept for up to 6 months after this application closes
- We will contact you if a relevant role comes up
- Every 6 months, we will ask if you want to stay in the pool — you choose each time
- You can leave the talent pool at any time from your Candidate Data Portal

WHAT WE KEEP:
Your name, CV, skills, work history, and application answers. We do not keep your interview recordings in the talent pool.

[ Toggle — unchecked by default ]
Label: Yes, keep my profile in [Employer name]'s talent pool for up to 6 months

CTA (primary): Save preference
Secondary: No thanks — delete my data when this application closes`} />
      </DocSec>
      <DocSec title="Pre-Interview Disclosure Modal (R-07) — required before recording begins">
        <CopyBlock label="AI INTERVIEW DISCLOSURE MODAL" text={`HEADLINE: You are about to start an AI-conducted interview

BODY:
This interview is conducted by Allps AI. Your responses will be assessed by our AI screening system to evaluate your communication and situational judgement for this role.

Here is what you should know:
• This session will be recorded (audio and video)
• Your responses will be transcribed and analysed by our AI
• We do not analyse your facial expressions, emotions, or appearance
• A human recruiter will review your AI assessment before any decision is made about your application
• You can stop the interview at any time — contact the employer to reschedule if needed

YOUR RIGHTS:
You can request a human review of your assessment, ask for an explanation of your results, or withdraw your consent after the interview from your Candidate Data Portal or by emailing privacy@allps.ai.

Links: How Our AI Works | Privacy Notice

CTA (primary): I understand — start interview

NOTE FOR DEV: Candidate must click this CTA before recording begins. No auto-proceed on timer or page load. Log acknowledgement with: session_id, candidate_id (hashed), acknowledgement_timestamp, disclosure_version.`} />
      </DocSec>
    </div>
  );

  // ── INTERVIEW DISCLOSURE ─────────────────────
  if (id === "interview") return (
    <div>
      <CopyBlock label="INTERVIEW PRE-NOTIFICATION EMAIL — full template" text={`Subject: Your AI interview for [Role title] at [Employer] — what to expect

Hi [First name],

You have been invited to complete an AI interview for the [Role title] position at [Employer]. Your interview is ready to start whenever you are — you have until [deadline date and time, timezone] to complete it.

WHAT IS AN AI INTERVIEW?
This is a structured video interview conducted by Allps AI. You will answer [X] questions presented on screen. Your responses will be recorded and assessed by our AI system, and then reviewed by a human recruiter at [Employer].

WHAT THE AI ASSESSES:
• How clearly and relevantly you communicate
• How your experience and examples relate to the role requirements
• Situational judgement and problem-solving (depending on role)

WHAT THE AI DOES NOT ASSESS:
• Your facial expressions or emotional state
• How you look or sound
• Any personal characteristic unrelated to the role

HOW TO PREPARE:
• Find a quiet space with good lighting and a stable internet connection
• Test your camera and microphone before starting
• You will see each question for [X] seconds before recording begins
• You will have [X] minutes to answer each question — take your time
• You cannot pause mid-interview, so choose a time when you will not be interrupted

YOUR RIGHTS:
• You can request a human review of your assessment at any time
• You can ask for an explanation of your results once the process concludes
• You can withdraw your consent to AI recording from your Candidate Data Portal — this will not affect your application

[Button CTA: Start my interview]

Interview closes: [Deadline date and time, timezone]

Questions? Contact [recruiter name] at [email], or visit your Candidate Data Portal: [link]

Read How Our AI Works: [link] | Read our Privacy Notice: [link]

Good luck — we look forward to learning more about you.

[Employer name] Recruitment Team, powered by Allps AI`} />
    </div>
  );

  // ── DSR COMMUNICATIONS ───────────────────────
  if (id === "dsr") return (
    <div>
      <DocSec title="Template 1 — DSR receipt acknowledgement (send within 3 business days)">
        <CopyBlock label="DSR ACKNOWLEDGEMENT EMAIL" text={`Subject: We have received your data request — [DSR-XXXXXX]

Hi [First name],

Thank you for contacting us. We have received your request to [access your data / delete your data / correct your data / receive a copy of your data / object to processing — select applicable].

Your request reference number is [DSR-XXXXXX]. Please keep this for your records.

WHAT HAPPENS NEXT:
We will verify your identity (if we have not already done so) and then process your request. Under data protection law, we have up to 30 days to respond to you — though we aim to respond sooner.

If we need any additional information from you to fulfil your request, we will contact you within 5 business days.

HOW TO CHECK YOUR REQUEST STATUS:
Log in to your Candidate Data Portal: [link]
Or reply to this email with your reference number.

If you have any questions, contact us at privacy@allps.ai.

Kind regards,
Allps AI Data Protection Team`} />
      </DocSec>
      <DocSec title="Template 2 — DSR completion (erasure / deletion)">
        <CopyBlock label="DELETION CONFIRMATION EMAIL" text={`Subject: Your data deletion request is complete — [DSR-XXXXXX]

Hi [First name],

We have completed your request to delete your personal data from the Allps AI platform.

WHAT WE HAVE DELETED:
• Your candidate profile and application data
• Your CV and all application responses
• Your AI interview recordings and transcripts
• Your AI assessment results
• Your consent records

PLEASE NOTE:
Some data may be retained temporarily in backup systems, which are purged on a rolling 30-day schedule. Audit log entries relating to your data requests are retained for our compliance records as required by law.

Your application for any active roles has been closed as a result of this deletion. If you applied to roles through employers who use Allps AI, those employers have been notified that your application has been withdrawn.

Request reference: [DSR-XXXXXX]
Completed: [date]

If you have any questions about what has been deleted, contact privacy@allps.ai.

Kind regards,
Allps AI Data Protection Team`} />
      </DocSec>
      <DocSec title="Template 3 — Human review request acknowledgement (send within 24 hours)">
        <CopyBlock label="HUMAN REVIEW REQUEST ACKNOWLEDGEMENT" text={`Subject: Your request for human review — [Role title] at [Employer]

Hi [First name],

We have received your request for a human review of your AI assessment for the [Role title] position at [Employer].

WHAT HAPPENS NEXT:
A qualified recruiter will review your full application and AI assessment results personally. We will complete this review within 5 business days and contact you with the outcome.

Your request reference: [REQ-XXXXXX]

You do not need to do anything else. We will be in touch.

If you have questions in the meantime, contact privacy@allps.ai and quote your reference number.

Kind regards,
Allps AI Candidate Support`} />
      </DocSec>
      <DocSec title="Template 4 — DSR rejection (where legally justified)">
        <CopyBlock label="DSR REJECTION NOTICE" text={`Subject: Update on your data request — [DSR-XXXXXX]

Hi [First name],

Thank you for your data request [DSR-XXXXXX] received on [date].

We have reviewed your request and are unable to fulfil it in full for the following reason:

[Reason — select applicable:]
• We are legally required to retain certain records for [X] months / years under [applicable law]
• We were unable to verify your identity from the information provided — please reply with [additional verification detail]
• The data you have requested does not exist in our systems

WHAT YOU CAN DO:
If you believe we have made an error in this decision, you can contact us at privacy@allps.ai to discuss further. You also have the right to lodge a complaint with the Swiss Federal Data Protection and Information Commissioner (FDPIC) at edoeb.admin.ch.

Request reference: [DSR-XXXXXX]

Kind regards,
Allps AI Data Protection Team`} />
      </DocSec>
    </div>
  );

  return <div style={{ color:"#888", fontSize:13 }}>Section not found.</div>;
}

function ImplHubPanel() {
  const [activeSection, setActiveSection] = useState("overview");
  const groups = [...new Set(HUB_SECTIONS.map(s => s.group))];
  const active = HUB_SECTIONS.find(s => s.id === activeSection);

  return (
    <div style={{ display:"flex", position:"absolute", inset:0, overflow:"hidden" }}>
      {/* Hub sidebar — independently scrollable */}
      <div style={{ width:200, flexShrink:0, borderRight:"1px solid rgba(0,0,0,0.08)", overflowY:"auto", background:"#FAFAF8" }}>
        {groups.map(group => (
          <div key={group} style={{ padding:"8px 0" }}>
            <div style={{ fontSize:10, fontWeight:700, color:"#bbb", letterSpacing:"0.08em", textTransform:"uppercase", padding:"6px 14px 2px" }}>{group}</div>
            {HUB_SECTIONS.filter(s => s.group === group).map(s => (
              <button key={s.id}
                onClick={() => setActiveSection(s.id)}
                style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 14px", cursor:"pointer", fontSize:12, width:"100%", textAlign:"left",
                  color: activeSection===s.id ? "#185FA5" : "#555",
                  background: activeSection===s.id ? "#E6F1FB" : "transparent",
                  borderLeft: `2px solid ${activeSection===s.id ? "#185FA5" : "transparent"}`,
                  borderRight:"none", borderTop:"none", borderBottom:"none",
                  fontWeight: activeSection===s.id ? 600 : 400 }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:s.dot, flexShrink:0 }} />
                {s.label}
              </button>
            ))}
          </div>
        ))}
      </div>
      {/* Hub content — independently scrollable */}
      <div style={{ flex:1, overflowY:"auto", padding:"20px 20px 40px" }}>
        <div style={{ marginBottom:16, paddingBottom:12, borderBottom:"1px solid rgba(0,0,0,0.07)" }}>
          <div style={{ fontSize:15, fontWeight:700, color:"#1A1A18" }}>{active?.label}</div>
          <div style={{ fontSize:11, color:"#999", marginTop:2 }}>Allps AI Compliance Implementation Hub v2 · GDPR + EU AI Act + nLPD</div>
        </div>
        <HubSection id={activeSection} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────

export default function App() {
  const [level, setLevel]       = useState("client");
  const [hubMode, setHubMode]   = useState("closed"); // "closed" | "panel" | "fullscreen"

  const isHubOpen       = hubMode !== "closed";
  const isHubFullscreen = hubMode === "fullscreen";

  // Shared top nav
  const TopNav = () => (
    <div style={{
      background:"white", borderBottom:"1px solid rgba(0,0,0,0.09)",
      padding:"0 20px", display:"flex", alignItems:"center", height:50,
      gap:12, flexShrink:0, zIndex:100
    }}>
      {/* Back button when hub is fullscreen */}
      {isHubFullscreen && (
        <button onClick={() => setHubMode("panel")}
          style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 12px", borderRadius:6,
            fontSize:12, fontWeight:600, cursor:"pointer", border:"1px solid rgba(0,0,0,0.12)",
            background:"white", color:"#333" }}>
          ← Back to Dashboard
        </button>
      )}

      {/* Wordmark — only shown when not fullscreen */}
      {!isHubFullscreen && (
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:26, height:26, background:"linear-gradient(135deg,#1553AA,#6B3AAA)", borderRadius:6,
            display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ color:"white", fontSize:13, fontWeight:700 }}>A</span>
          </div>
          <span style={{ fontWeight:700, fontSize:14, color:"#1A1A18" }}>Allps AI</span>
          <span style={{ color:"#ddd" }}>|</span>
          <span style={{ fontSize:12, color:"#666" }}>Consent Management</span>
          <span style={{ background:"#F0EDE8", color:"#6B5B3A", borderRadius:100, padding:"1px 7px", fontSize:10, fontWeight:600 }}>v1</span>
        </div>
      )}

      {/* Hub title when fullscreen */}
      {isHubFullscreen && (
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontWeight:700, fontSize:14, color:"#1A1A18" }}>📖 Compliance Implementation Hub</span>
          <span style={{ background:"#E4F5EA", color:"#1A6B3A", borderRadius:100, padding:"1px 8px", fontSize:11, fontWeight:600 }}>v2</span>
          <span style={{ fontSize:11, color:"#888" }}>28 recommendations · 8 pillars · GDPR + EU AI Act + nLPD</span>
        </div>
      )}

      {/* Level switcher — only in dashboard mode */}
      {!isHubFullscreen && (
        <div style={{ display:"flex", background:"#F0EDE8", borderRadius:8, padding:3, gap:2, marginLeft:"auto" }}>
          <button onClick={() => setLevel("client")}
            style={{ padding:"4px 14px", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer", border:"none",
              background: level==="client"?"white":"transparent",
              color: level==="client"?"#1553AA":"#888",
              boxShadow: level==="client"?"0 1px 4px rgba(0,0,0,0.1)":"none" }}>
            🏢 Client View
          </button>
          <button onClick={() => setLevel("platform")}
            style={{ padding:"4px 14px", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer", border:"none",
              background: level==="platform"?"white":"transparent",
              color: level==="platform"?"#6B3AAA":"#888",
              boxShadow: level==="platform"?"0 1px 4px rgba(0,0,0,0.1)":"none" }}>
            ⚙️ Platform View
          </button>
        </div>
      )}

      {/* Hub toggle / expand controls */}
      <div style={{ display:"flex", gap:6, marginLeft: isHubFullscreen ? "auto" : 0 }}>
        {isHubOpen && !isHubFullscreen && (
          <button onClick={() => setHubMode("fullscreen")}
            style={{ padding:"4px 12px", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer",
              border:"1px solid rgba(0,0,0,0.12)", background:"white", color:"#333" }}>
            ⛶ Fullscreen
          </button>
        )}
        {isHubFullscreen && (
          <button onClick={() => setHubMode("panel")}
            style={{ padding:"4px 12px", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer",
              border:"1px solid rgba(0,0,0,0.12)", background:"white", color:"#333" }}>
            ⊡ Panel
          </button>
        )}
        <button onClick={() => setHubMode(isHubOpen ? "closed" : "panel")}
          style={{ padding:"4px 12px", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer",
            background: isHubOpen?"#1A1A18":"#F0EDE8",
            color: isHubOpen?"white":"#555", border:"none" }}>
          📖 {isHubOpen ? "Hide Ref" : "Dev Reference"}
        </button>
      </div>
    </div>
  );

  // FULLSCREEN HUB MODE
  if (isHubFullscreen) {
    return (
      <div style={{ fontFamily:"-apple-system,'Segoe UI',Arial,sans-serif", height:"100vh", display:"flex", flexDirection:"column", overflow:"hidden" }}>
        <TopNav />
        <div style={{ flex:1, overflow:"hidden", position:"relative" }}>
          <ImplHubPanel />
        </div>
      </div>
    );
  }

  // NORMAL MODE (dashboard ± side panel)
  return (
    <div style={{ fontFamily:"-apple-system,'Segoe UI',Arial,sans-serif", height:"100vh", display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <TopNav />
      <div style={{ display:"flex", flex:1, overflow:"hidden" }}>

        {/* MAIN DASHBOARD */}
        <div style={{ flex:1, overflowY:"auto", padding:"20px 24px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:18 }}>
            <span style={{ fontSize:11, fontWeight:600, color:"#888", textTransform:"uppercase", letterSpacing:"0.07em" }}>Viewing as:</span>
            {level==="client" &&
              <span style={{ background:"#EEF4FF", color:"#1553AA", borderRadius:100, padding:"2px 10px", fontSize:12, fontWeight:600 }}>
                Recruiter Admin — Bosch Automotive CH
              </span>}
            {level==="platform" &&
              <span style={{ background:"#F3EFFE", color:"#6B3AAA", borderRadius:100, padding:"2px 10px", fontSize:12, fontWeight:600 }}>
                CPO / DPO — Allps AI Internal
              </span>}
            <span style={{ fontSize:11, color:"#aaa" }}>·</span>
            <span style={{ fontSize:11, color:"#aaa" }}>
              {level==="client"
                ? "Deployer obligations — GDPR Art. 7 · EU AI Act Art. 26(7), Art. 14, Art. 4"
                : "Provider obligations — GDPR Art. 5, 12 · EU AI Act Art. 4, 9, 11, 12, 49"}
            </span>
          </div>
          {level==="client"   && <ClientDashboard />}
          {level==="platform" && <PlatformDashboard />}
        </div>

        {/* SIDE PANEL */}
        {hubMode==="panel" && (
          <div style={{
            width:600, flexShrink:0, borderLeft:"1px solid rgba(0,0,0,0.09)",
            background:"white", display:"flex", flexDirection:"column", overflow:"hidden"
          }}>
            <div style={{
              padding:"9px 14px", borderBottom:"1px solid rgba(0,0,0,0.08)",
              background:"#F7F6F3", display:"flex", alignItems:"center", gap:8, flexShrink:0
            }}>
              <span style={{ fontSize:11, fontWeight:700, color:"#555", textTransform:"uppercase", letterSpacing:"0.06em" }}>Dev Reference</span>
              <span style={{ background:"#E4F5EA", color:"#1A6B3A", borderRadius:100, padding:"1px 7px", fontSize:10, fontWeight:600 }}>Hub v2</span>
              <span style={{ fontSize:11, color:"#aaa", marginLeft:"auto" }}>8 pillars · 28 recommendations</span>
            </div>
            <div style={{ flex:1, overflow:"hidden", position:"relative" }}>
              <ImplHubPanel />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

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
// ─────────────────────────────────────────────

const HUB_SECTIONS = [
  { id:"overview", label:"Dashboard",                   group:"Overview",            dot:"#185FA5" },
  { id:"p1",       label:"Legal Basis & Consent",       group:"Pillars",             dot:"#E24B4A" },
  { id:"p2",       label:"Transparency & Notices",      group:"Pillars",             dot:"#E24B4A" },
  { id:"p3",       label:"Data Governance",             group:"Pillars",             dot:"#E24B4A" },
  { id:"p4",       label:"Human Oversight",             group:"Pillars",             dot:"#E24B4A" },
  { id:"p5",       label:"AI Documentation",            group:"Pillars",             dot:"#EF9F27" },
  { id:"p6",       label:"Bias & Monitoring",           group:"Pillars",             dot:"#EF9F27" },
  { id:"p7",       label:"Candidate Rights",            group:"Pillars",             dot:"#E24B4A" },
  { id:"privacy",  label:"Privacy Notice",              group:"Document Templates",  dot:"#1D9E75" },
  { id:"rights",   label:"Rights Charter",              group:"Document Templates",  dot:"#1D9E75" },
  { id:"consent",  label:"Consent UI Copy",             group:"Document Templates",  dot:"#1D9E75" },
  { id:"dsr",      label:"DSR Communications",          group:"Document Templates",  dot:"#1D9E75" },
];

function HBadge({ type }) {
  const map = {
    p1:    { bg:"#FCEBEB", color:"#A32D2D", label:"P1" },
    p2:    { bg:"#FAEEDA", color:"#854F0B", label:"P2" },
    hi:    { bg:"#FCEBEB", color:"#A32D2D", label:"High" },
    med:   { bg:"#FAEEDA", color:"#854F0B", label:"Medium" },
    lo:    { bg:"#EAF3DE", color:"#3B6D11", label:"Low" },
    gdpr:  { bg:"#E1F5EE", color:"#085041", label:"GDPR",      border:"#5DCAA5" },
    aiact: { bg:"#EEEDFE", color:"#26215C", label:"EU AI Act", border:"#AFA9EC" },
    both:  { bg:"#FAEEDA", color:"#633806", label:"GDPR + AI Act", border:"#EF9F27" },
    ui:    { bg:"#EEEDFE", color:"#3C3489", label:"UI" },
    doc:   { bg:"#E1F5EE", color:"#0F6E56", label:"Doc & Process" },
    back:  { bg:"#F0EDE8", color:"#6B5B3A", label:"Backend" },
    comm:  { bg:"#FAECE7", color:"#993C1D", label:"Comms" },
  };
  const s = map[type] || map.back;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", padding:"2px 7px", borderRadius:100, fontSize:10, fontWeight:700,
      background:s.bg, color:s.color, border: s.border ? `0.5px solid ${s.border}` : "none", whiteSpace:"nowrap" }}>
      {s.label}
    </span>
  );
}

function RecCard({ id, ref: refLabel, title, badges, children }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const tabs = children ? (Array.isArray(children) ? children : [children]) : [];
  return (
    <div style={{ border:"0.5px solid rgba(0,0,0,0.12)", borderRadius:10, marginBottom:12, overflow:"hidden" }}>
      <div onClick={() => setOpen(!open)}
        style={{ padding:"12px 14px", display:"flex", alignItems:"flex-start", gap:10, cursor:"pointer", background: open ? "#F5F4F2" : "white" }}>
        <span style={{ fontFamily:"monospace", fontSize:11, fontWeight:600, color:"#888", minWidth:32, marginTop:1 }}>{refLabel}</span>
        <span style={{ fontSize:13, fontWeight:500, color:"#1A1A18", flex:1, lineHeight:1.4 }}>{title}</span>
        <div style={{ display:"flex", gap:4, flexShrink:0, flexWrap:"wrap", justifyContent:"flex-end", maxWidth:220 }}>
          {badges.map((b,i) => <HBadge key={i} type={b} />)}
        </div>
        <span style={{ color:"#aaa", transform: open?"rotate(90deg)":"rotate(0deg)", transition:"transform 0.15s", fontSize:14, marginTop:1 }}>›</span>
      </div>
      {open && (
        <div style={{ borderTop:"0.5px solid rgba(0,0,0,0.1)" }}>
          {tabs.length > 1 && (
            <div style={{ display:"flex", background:"#F5F4F2", borderBottom:"0.5px solid rgba(0,0,0,0.1)" }}>
              {tabs.map((t,i) => (
                <button key={i} onClick={() => setTab(i)}
                  style={{ padding:"8px 14px", fontSize:12, cursor:"pointer", background:"none", border:"none",
                    color: tab===i ? "#185FA5" : "#666", fontWeight: tab===i ? 600 : 400,
                    borderBottom: tab===i ? "2px solid #185FA5" : "2px solid transparent" }}>
                  {t.props.label}
                </button>
              ))}
            </div>
          )}
          <div style={{ padding:14 }}>
            {tabs.length > 1 ? tabs[tab] : tabs[0]}
          </div>
        </div>
      )}
    </div>
  );
}

function HPane({ label, children }) { return <div>{children}</div>; }

function HBlock({ label, children }) {
  return (
    <div style={{ background:"#F5F4F2", borderRadius:8, padding:"10px 12px", marginBottom:10 }}>
      {label && <div style={{ fontSize:10, fontWeight:700, color:"#888", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:6 }}>{label}</div>}
      <div style={{ fontSize:13, color:"#1A1A18", lineHeight:1.65 }}>{children}</div>
    </div>
  );
}

function CopyBlock({ label, children }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ border:"0.5px solid rgba(0,0,0,0.1)", borderRadius:8, overflow:"hidden", marginBottom:12 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"7px 12px", background:"#F5F4F2", borderBottom:"0.5px solid rgba(0,0,0,0.1)" }}>
        <span style={{ fontSize:11, fontWeight:600, color:"#888", letterSpacing:"0.03em" }}>{label}</span>
        <button onClick={() => { if(navigator.clipboard) navigator.clipboard.writeText(children).then(()=>{ setCopied(true); setTimeout(()=>setCopied(false),1500); }); }}
          style={{ fontSize:11, padding:"3px 10px", cursor:"pointer", border:"0.5px solid rgba(0,0,0,0.15)", borderRadius:6, background:"white", color:"#555" }}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre style={{ padding:14, fontSize:12, color:"#1A1A18", lineHeight:1.7, fontFamily:"'SF Mono','Fira Mono',monospace", background:"white", maxHeight:240, overflowY:"auto", whiteSpace:"pre-wrap", margin:0 }}>
        {children}
      </pre>
    </div>
  );
}

function Checklist({ items }) {
  const [checked, setChecked] = useState({});
  return (
    <ul style={{ listStyle:"none", padding:0 }}>
      {items.map((item, i) => (
        <li key={i} onClick={() => setChecked(p => ({...p, [i]:!p[i]}))}
          style={{ display:"flex", gap:9, alignItems:"flex-start", padding:"7px 0", borderBottom:"0.5px solid rgba(0,0,0,0.07)", fontSize:13, color:"#1A1A18", cursor:"pointer" }}>
          <span style={{ width:16, height:16, flexShrink:0, marginTop:1, border:"0.5px solid rgba(0,0,0,0.2)", borderRadius:3,
            background: checked[i] ? "#185FA5" : "white", display:"flex", alignItems:"center", justifyContent:"center" }}>
            {checked[i] && <span style={{ color:"white", fontSize:10, fontWeight:700 }}>✓</span>}
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function HubSection({ id }) {
  if (id === "overview") return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:18 }}>
        {[["Total recommendations","28","across 8 pillars","#1A1A18"],["Critical (P1)","18","immediate action","#A32D2D"],["Core compliance (P2)","10","before Aug 2026","#854F0B"],["Hard deadline","Aug '26","EU AI Act enforcement","#185FA5"]].map(([label,val,sub,color])=>(
          <div key={label} style={{ background:"#F5F4F2", borderRadius:8, padding:"12px 14px" }}>
            <div style={{ fontSize:11, color:"#888", marginBottom:4 }}>{label}</div>
            <div style={{ fontSize:22, fontWeight:700, color }}>{val}</div>
            <div style={{ fontSize:11, color:"#888", marginTop:2 }}>{sub}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:18 }}>
        {[["Phase 1 — PASSED","Stop the bleeding","Now → Q3 2025","#A32D2D"],["Phase 2 — UPCOMING","Build high-risk controls","Q4 2025 → Q2 2026","#854F0B"],["Phase 3 — ONGOING","Monitor & optimise","Q3 2026 onwards","#3B6D11"]].map(([phase,name,date,color])=>(
          <div key={phase} style={{ padding:"10px 12px", borderRadius:8, border:"0.5px solid rgba(0,0,0,0.1)" }}>
            <div style={{ fontSize:10, fontWeight:700, color, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:2 }}>{phase}</div>
            <div style={{ fontSize:13, fontWeight:600, color:"#1A1A18", marginBottom:2 }}>{name}</div>
            <div style={{ fontSize:11, color:"#888" }}>{date}</div>
          </div>
        ))}
      </div>
      <div style={{ background:"#FCEBEB", border:"0.5px solid #F09595", borderRadius:8, padding:"10px 14px", marginBottom:16 }}>
        <div style={{ fontSize:11, fontWeight:700, color:"#A32D2D", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:4 }}>⚠ Prohibited practices — already illegal since 2 February 2025</div>
        <ul style={{ fontSize:13, color:"#791F1F", lineHeight:1.6, paddingLeft:18 }}>
          <li>Emotion recognition in workplace contexts (video/audio/biometric)</li>
          <li>Biometric categorisation to infer race, political opinions, religion, sexual orientation</li>
          <li>Social scoring based on behaviour or characteristics unrelated to the role</li>
          <li>Subliminal manipulation of candidate responses</li>
        </ul>
      </div>
      <HBlock label="How to use this hub">
        Navigate each pillar using the left sidebar to see all recommendations, implementation guidelines, acceptance criteria, and ready-to-use document copy. Each recommendation card is expandable — click to see Specification, Dev Guide, and Acceptance Criteria tabs.
      </HBlock>
    </div>
  );

  if (id === "p1") return (
    <div>
      <HBlock label="Key principle">
        Allps AI uses four consent types (C1–C4). C1 rests on Legitimate Interest (platform-managed LIA). C2, C3, C4 require explicit consent at the feature level — not at onboarding. Withdrawal must be possible per-feature without impacting the application.
      </HBlock>
      {[
        { ref:"R-01", title:"Legitimate Interests Assessment (LIA) for C1 application data and AI matching", badges:["p1","hi","doc","gdpr"],
          spec:<HBlock label="C1 LIA scope">Platform (Allps AI) holds the LIA — not the client. The LIA must document: processing description, purpose, necessity test, balancing test (candidate interests vs legitimate interest), safeguards. C1 covers: CV text, application responses, work history, and structured job requirements — used to generate match scores. Profile photos, DOB, nationality, and marital status must not enter the AI matching pipeline (data minimisation — R-13).</HBlock> },
        { ref:"R-02", title:"Granular consent capture per AI feature (C2, C3, C4)", badges:["p1","hi","ui","gdpr"],
          spec:<HBlock label="Three separate consent events"><ul style={{paddingLeft:18,lineHeight:1.7}}><li>C2: AI Screening — captured before scheduling. Blocking screen, requires explicit click-through.</li><li>C3: AI Skills Interview — captured before evaluation begins.</li><li>C4: Talent Pool — captured at end of active process, 6-month expiry (nLPD Art. 6).</li><li>Each event must record: timestamp, version, method (in-app/email), candidate_id (hashed), role_id.</li></ul></HBlock>,
          accept:<Checklist items={["Separate consent screen per AI feature (C2, C3, C4)","'No thank you' CTA equally prominent — not greyed out or hidden","Consent record includes timestamp, version, method, candidate_id (hashed)","Withdrawal possible per consent type from Candidate Data Portal","Withdrawal of C2 does not affect application status"]} /> },
        { ref:"R-03", title:"Granular consent withdrawal — per feature, without application impact", badges:["p1","hi","ui","gdpr"],
          spec:<HBlock label="Withdrawal rules">Withdrawal must be possible per consent type from the Candidate Data Portal. Withdrawal of C2 must not affect active application — employer must be notified and offered a human-led interview. Withdrawal of C4 removes candidate from talent pool within 24 hours. Confirmation email sent within 24 hours of withdrawal.</HBlock> },
        { ref:"R-04", title:"Formalised talent pool consent renewal every 6 months (nLPD Art. 6)", badges:["p1","med","back","both"],
          spec:<HBlock label="C4 renewal cycle">C4 expires 6 months from capture date. Renewal reminder email sent at T+5 months. If not renewed by expiry date, candidate auto-removed from talent pool (retention job J2). Renewal count tracked per candidate. Second non-renewal triggers permanent removal.</HBlock>,
          accept:<Checklist items={["C4 consent expiry date stored at capture time (T+6 months)","Renewal reminder fires at T+5 months","Auto-removal on expiry if renewal not received","Renewal count tracked per candidate record"]} /> },
        { ref:"R-05", title:"Standard Contractual Clauses (SCCs) for any data transfers outside CH/EEA", badges:["p1","med","doc","gdpr"],
          spec:<HBlock label="Transfer safeguard requirements">Any sub-processor (LLM API, cloud provider, analytics) outside CH/EEA requires SCCs or equivalent adequacy decision. Maintain a transfer impact assessment (TIA) per sub-processor. Review on any new sub-processor engagement. Document in sub-processor register (R-14).</HBlock> },
      ].map(r => (
        <RecCard key={r.ref} id={r.ref} ref={r.ref} title={r.title} badges={r.badges}>
          {r.spec && <HPane label="Specification">{r.spec}</HPane>}
          {r.dev && <HPane label="Dev guide">{r.dev}</HPane>}
          {r.accept && <HPane label="Acceptance criteria">{r.accept}</HPane>}
        </RecCard>
      ))}
    </div>
  );

  if (id === "p2") return (
    <div>
      {[
        { ref:"R-06", title:"Two-tier privacy notice (short inline + full linked notice)", badges:["p1","hi","doc","gdpr"],
          spec:<HBlock label="Two-tier structure">Tier 1 (short, inline at application form): 3–4 sentence summary of data use, AI involvement, retention period, and rights. Tier 2 (full notice, linked): GDPR Art. 13/14 compliant — all processing purposes, legal bases, retention periods, subject rights, DPO contact, supervisory authority. Must be reviewed and updated annually and on any material processing change.</HBlock> },
        { ref:"R-07", title:"AI disclosure screen before every AI interview session", badges:["p1","hi","ui","aiact"],
          spec:<HBlock label="Blocking disclosure screen (Art. 26(7))">Must appear before any AI recording begins. Candidate must click to proceed — no auto-proceed on timer. Must state: what AI assesses, what it does not assess (no emotion recognition, no facial analysis), that a human reviews before any decision. Log acknowledgement: session_id, candidate_id (hashed), timestamp, disclosure_version.</HBlock>,
          dev:<HBlock label="Implementation note">Disclosure version must be stored with the session. If disclosure copy changes, existing sessions must serve the version shown at time of acknowledgement. No recording starts until acknowledgement event is logged.</HBlock>,
          accept:<Checklist items={["Blocking screen appears before recording begins — no auto-proceed","Candidate must click to acknowledge","Disclosure includes: what AI assesses, what it does not, human review statement","Acknowledgement logged with session_id, disclosure_version, timestamp","Disclosure version stored per session record"]} /> },
        { ref:"R-08", title:"'How Our AI Works' plain-language page (permanent, publicly accessible)", badges:["p1","med","doc","aiact"],
          spec:<HBlock label="Required page content">Permanent URL (e.g. allps.ai/how-it-works). Must cover: which AI modules are used in hiring, what each module assesses, what it explicitly does not assess, how human oversight works, how candidates can request review or explanation, contact for AI-related queries. Linked from all consent screens and interview disclosures.</HBlock> },
        { ref:"R-09", title:"AI result notification copy — candidate-facing assessment result pages", badges:["p2","med","ui","both"],
          spec:<HBlock label="Result page requirements">Pages showing AI assessment outcomes must include: statement that a human reviewed the AI assessment before any decision, link to 'How Our AI Works', link to 'Request Human Review' (R-18), link to Candidate Data Portal. Must not show raw AI scores, confidence percentages, or model internals.</HBlock> },
        { ref:"R-10", title:"Deployer Transparency Toolkit — onboarding pack for clients (Art. 13)", badges:["p1","med","doc","aiact"],
          spec:<HBlock label="Toolkit contents">Provide to each client before AI features are enabled: (1) AI Briefing document (intended purpose, capabilities, limitations of each module), (2) DPA template signed before go-live, (3) Candidate Rights page template for clients to host, (4) Instructions for implementing AI disclosure on job postings (Art. 26(7)). Confirm receipt before activating AI features — tracked in Deployer Onboarding Checklist (O6).</HBlock> },
      ].map(r => (
        <RecCard key={r.ref} id={r.ref} ref={r.ref} title={r.title} badges={r.badges}>
          {r.spec && <HPane label="Specification">{r.spec}</HPane>}
          {r.dev && <HPane label="Dev guide">{r.dev}</HPane>}
          {r.accept && <HPane label="Acceptance criteria">{r.accept}</HPane>}
        </RecCard>
      ))}
    </div>
  );

  if (id === "p3") return (
    <div>
      {[
        { ref:"R-11", title:"Record of Processing Activities (RoPA) for all AI processing", badges:["p1","med","doc","gdpr"],
          spec:<HBlock label="RoPA entries required">One entry per processing activity: AI matching, AI screening interview, AI skills interview, talent pool management, audit logging. Each entry: purpose, legal basis, data categories, data subjects, recipients, retention period, transfer safeguards, security measures. Review quarterly and on any material processing change.</HBlock> },
        { ref:"R-12", title:"Automated data retention enforcement engine", badges:["p1","hi","back","gdpr"],
          spec:<HBlock label="Retention policy rules"><ul style={{paddingLeft:18,lineHeight:1.7}}><li>Unsuccessful candidates: auto-delete at T+12 months from application close</li><li>Talent pool: renewal reminder T+5 months, auto-delete T+12 months if not renewed</li><li>AI interview recordings: delete at application close + 6 months</li><li>Audit logs: retain minimum 6 months (Art. 12)</li><li>Successful hires: employment records retention (typically 7 years)</li></ul></HBlock>,
          dev:<HBlock label="Implementation pattern">Scheduled cron job daily 02:00 UTC. Soft-delete first (set deleted_at). Hard-delete after 30-day grace period. Log every deletion: candidate_id (hashed), deletion_reason_code (RETENTION_EXPIRY / CONSENT_WITHDRAWN / DSR_REQUEST), triggered_by (SYSTEM / MANUAL), timestamp. Interview recordings: delete from object storage AND remove DB reference in single transaction.</HBlock>,
          accept:<Checklist items={["Scheduled deletion job runs daily","Soft-delete with 30-day grace before hard-delete","All deletion events logged with reason codes","Recording deleted from object storage AND database in single transaction","Talent pool renewal trigger fires at T+5 months","On-call alert on job failure"]} /> },
        { ref:"R-13", title:"AI input data field audit and minimisation", badges:["p1","med","back","both"],
          spec:<HBlock label="Fields to audit and remove"><ul style={{paddingLeft:18,lineHeight:1.7}}><li>Profile photo — remove from AI matching input</li><li>Nationality — remove unless legally required for specific role</li><li>Marital status — remove entirely</li><li>Date of birth (full) — use age band only; never raw DOB to AI models</li><li>Home address — not needed for AI matching</li></ul>Document full audit: list every field, justify inclusion or document removal. Required input to Technical File (R-20).</HBlock> },
        { ref:"R-14", title:"Data Processing Agreements (DPAs) with all sub-processors", badges:["p1","med","doc","gdpr"],
          spec:<HBlock label="DPA required for every sub-processor">Cloud providers, LLM API providers, analytics tools, email delivery, video hosting. Each DPA must cover: processing instructions, data categories, purposes, security obligations, sub-processor restriction, audit rights, deletion on termination. Maintain sub-processor register. Notify clients of sub-processor changes with 30 days notice.</HBlock> },
        { ref:"R-15", title:"Role-based access controls (RBAC) and access logging", badges:["p1","med","back","both"],
          spec:<HBlock label="Access model">Interview recordings and AI scores: accessible only to recruiter(s) and hiring manager(s) assigned to that job. No global admin access to candidate PII unless operationally justified and logged. Internal staff access via separate escalation path with mandatory reason logging.</HBlock>,
          dev:<HBlock label="Implementation">Every GET /candidates/{"{id}"}/interview or /scores must verify caller is on job_access_list. Log all access: user_id, resource_type, resource_id, action, timestamp, ip_hash. Flag unusual patterns (bulk downloads, off-hours). Log retention: minimum 12 months.</HBlock>,
          accept:<Checklist items={["Interview recordings accessible only to assigned job team","All access events logged with user, resource, timestamp","Admin escalation requires reason logging","Access logs retained minimum 12 months"]} /> },
      ].map(r => (
        <RecCard key={r.ref} id={r.ref} ref={r.ref} title={r.title} badges={r.badges}>
          {r.spec && <HPane label="Specification">{r.spec}</HPane>}
          {r.dev && <HPane label="Dev guide">{r.dev}</HPane>}
          {r.accept && <HPane label="Acceptance criteria">{r.accept}</HPane>}
        </RecCard>
      ))}
    </div>
  );

  if (id === "p4") return (
    <div>
      {[
        { ref:"R-16", title:"Human-in-the-loop gate before any rejection is communicated", badges:["p1","hi","back","both"],
          spec:<><HBlock label="Core requirement — GDPR Art. 22 hard block">The ATS must prevent any rejection notification from being sent until a recruiter has explicitly reviewed and actioned (Approve / Reject / Hold). AI can recommend — it cannot auto-reject.</HBlock><HBlock label="ATS state machine">Pipeline states: AI_ASSESSED → PENDING_HUMAN_REVIEW → (APPROVED / REJECTED / HELD). Rejection notifications can only fire from REJECTED state. REJECTED requires explicit recruiter action. No automated transition from AI_ASSESSED to any outbound communication state.</HBlock></>,
          dev:<HBlock label="Implementation">Add middleware guard on rejection notification job: check candidate.reviewed_by_human !== null. Surface "Candidates pending review" queue as primary workflow entry point. Log every review: reviewer_user_id, review_timestamp, decision, ai_recommendation_followed (boolean).</HBlock>,
          accept:<Checklist items={["Rejection notification impossible without explicit recruiter action","'Pending review' queue is primary dashboard entry point","Every rejection logged with reviewer ID and timestamp","No automated transitions bypass the review gate"]} /> },
        { ref:"R-17", title:"Recruiter override function with reason logging", badges:["p1","med","ui","aiact"],
          spec:<><HBlock label="Override UI pattern">When recruiter changes AI rank or rejects AI-recommended candidate, prompt appears: "You are overriding the AI recommendation. Reason (optional):" Dropdown: Better fit identified elsewhere / Role requirements changed / AI assessment incomplete / Candidate withdrew / Other. Reason stored in audit log — never shown to candidate.</HBlock><HBlock label="Override data use">Anonymised override data (reason code + demographic band) feeds into bias monitoring pipeline (R-25) to identify systematic patterns.</HBlock></>,
          accept:<Checklist items={["Override prompt appears on AI recommendation change","Reason stored in audit log (not candidate-visible)","Override events included in bias monitoring pipeline input"]} /> },
        { ref:"R-18", title:"Candidate 'Request Human Review' button on AI decision pages", badges:["p2","med","ui","both"],
          spec:<HBlock label="Flow">Button on candidate-facing AI result pages. Click triggers: (1) tracked request in DSR workflow, (2) automated acknowledgement email within 24 hours, (3) recruiter ATS task with 5 business day SLA. Log: request_id, candidate_id (hashed), job_id, timestamp.</HBlock>,
          accept:<Checklist items={["Button present on all AI-driven decision notification pages","Acknowledgement email sent within 24 hours","Recruiter task created with 5-day SLA displayed","All requests logged and trackable with request_id"]} /> },
        { ref:"R-19", title:"'Explain My Assessment' candidate-facing feature (Art. 86)", badges:["p2","hi","ui","both"],
          spec:<><HBlock label="What to show">Competency areas evaluated and their relative importance for this role. Qualitative tier per competency: Strong / Meets Expectations / Needs Development. One-sentence plain-language rationale per competency. No raw scores, confidence percentages, model weights, or training data references.</HBlock></>,
          dev:<HBlock label="Explainability layer">Build mapping layer: model output → competency tier buckets. Tier thresholds: Strong (top 33% vs role benchmark), Meets Expectations (middle 33%), Needs Development (bottom 33%). Generate rationale via template or LLM summary referencing only assessed behaviours. Store generated explanation with session_id — serve from storage, never re-generate per request.</HBlock>,
          accept:<Checklist items={["Competency areas shown — not raw scores","Qualitative tiers (Strong / Meets / Needs) per competency","Plain-language rationale per competency","No model internals, weights, or confidence scores exposed","Rationale references only job-relevant behaviours"]} /> },
      ].map(r => (
        <RecCard key={r.ref} id={r.ref} ref={r.ref} title={r.title} badges={r.badges}>
          {r.spec && <HPane label="Specification">{r.spec}</HPane>}
          {r.dev && <HPane label="Dev guide">{r.dev}</HPane>}
          {r.accept && <HPane label="Acceptance criteria">{r.accept}</HPane>}
        </RecCard>
      ))}
    </div>
  );

  if (id === "p5") return (
    <div>
      {[
        { ref:"R-20", title:"EU AI Act Technical File per high-risk AI module (4 modules)", badges:["p2","hi","doc","aiact"],
          spec:<HBlock label="8 required sections per Technical File (Annex IV)"><ul style={{paddingLeft:18,lineHeight:1.7}}><li>(a) System description and intended purpose</li><li>(b) System architecture overview</li><li>(c) Training data description (provenance, size, preprocessing, bias assessment)</li><li>(d) Performance metrics on validation set (accuracy, precision, recall)</li><li>(e) Bias test results by gender/age/ethnicity</li><li>(f) Known limitations and edge cases</li><li>(g) Human oversight mechanisms</li><li>(h) Version and update history</li></ul>Required for: AI Sourcing v1.8.3 / AI Matching v3.1.0 / AI Screening Interview v2.4.1 / AI Skills Interview v2.4.1. Internal inspection document — not public. All 4 files must be complete before EU AI Database registration (R-23).</HBlock>,
          accept:<Checklist items={["Technical File produced for AI Sourcing","Technical File produced for AI Matching","Technical File produced for AI Screening Interview","Technical File produced for AI Skills Interview","All 8 Annex IV sections complete per file","All files complete before 2 August 2026"]} /> },
        { ref:"R-21", title:"Risk Register per AI module (Art. 9)", badges:["p2","med","doc","aiact"],
          spec:<HBlock label="Risk register fields per entry">Risk ID / Description / Likelihood (1–5) / Severity (1–5) / Risk score (L×S) / Current mitigation / Residual risk level / Review date / Owner. Review before every major model update and at minimum quarterly. Key risks to document: discriminatory output, data leakage, model drift, adversarial input, recruiter over-reliance, training data staleness.</HBlock> },
        { ref:"R-22", title:"DPIA for each high-risk AI processing activity (3 DPIAs)", badges:["p1","med","doc","both"],
          spec:<HBlock label="Three DPIAs required">DPIA 1: AI Screening Interview. DPIA 2: AI Skills Interview. DPIA 3: AI Sourcing and Matching (combined). Use ICO/EDPB template. Each DPIA must cover: processing description, necessity and proportionality assessment, risk matrix, mitigation measures, residual risk sign-off by DPO. Review annually or after significant system changes.</HBlock> },
        { ref:"R-23", title:"Register all high-risk AI systems in EU AI public database (Art. 49)", badges:["p2","lo","doc","aiact"],
          spec:<HBlock label="Registration requirements">Register all 4 modules in EU AI database before 2 August 2026. Portal: ai-database.eu. Switzerland-based providers must appoint an EU legal representative or use Swiss cross-reference mechanism. All 4 Technical Files (R-20) must be complete before registration. Current status: all 4 modules unregistered.</HBlock> },
      ].map(r => (
        <RecCard key={r.ref} id={r.ref} ref={r.ref} title={r.title} badges={r.badges}>
          {r.spec && <HPane label="Specification">{r.spec}</HPane>}
          {r.accept && <HPane label="Acceptance criteria">{r.accept}</HPane>}
        </RecCard>
      ))}
    </div>
  );

  if (id === "p6") return (
    <div>
      <div style={{ background:"#FCEBEB", border:"0.5px solid #F09595", borderRadius:8, padding:"10px 14px", marginBottom:16 }}>
        <div style={{ fontSize:11, fontWeight:700, color:"#A32D2D", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:4 }}>Deferred by CPO decision</div>
        <div style={{ fontSize:13, color:"#791F1F", lineHeight:1.6 }}>R-24 (bias monitoring pipeline), R-25 (post-market monitoring), and R-26 (bias incident response) are explicitly out of scope for the current build phase. These will be addressed as a separate phase.</div>
      </div>
      {[
        { ref:"R-24", title:"Bias testing across protected characteristics before deployment", badges:["p1","hi","back","both"],
          spec:<HBlock label="Protected characteristics + 80% rule">Test gender, age band, ethnicity (where available), disability status (where disclosed). Test before initial deployment, after any model update, quarterly on production data. 80% Rule: if any group's pass rate is less than 80% of the highest-passing group's rate, flag for investigation. No model deployed to production without a passing bias test result.</HBlock>,
          accept:<Checklist items={["Bias test covers gender, age, ethnicity","80% adverse impact threshold configured","Tests run as mandatory CI/CD gate for model updates","Test reports stored per model version","No model deployable without passing test"]} /> },
        { ref:"R-25", title:"Post-market bias monitoring pipeline (Art. 72)", badges:["p2","hi","back","aiact"],
          spec:<HBlock label="Monitoring pipeline">Weekly job: compute advance rates by demographic group across all active jobs. Alert compliance owner if adverse impact ratio drops below 0.8. Compliance dashboard: trend by week, active alerts, models flagged. Named compliance owner reviews alerts within 5 business days. Log all monitoring runs — required for Art. 72 documentation.</HBlock> },
        { ref:"R-26", title:"Incident response procedure for AI bias and discrimination complaints", badges:["p2","lo","doc","both"],
          spec:<HBlock label="Procedure steps">1. Complaint intake → assigned to DPO within 24h. 2. Acknowledge candidate within 3 business days. 3. Investigation: review audit logs, bias monitoring data, model version at time of decision (max 30 days). 4. If personal data breach confirmed: notify supervisory authority within 72h (GDPR Art. 33). 5. Remediation plan and communication to candidate. 6. Post-incident review: update risk register and monitoring thresholds.</HBlock> },
      ].map(r => (
        <RecCard key={r.ref} id={r.ref} ref={r.ref} title={r.title} badges={r.badges}>
          <HPane label="Specification">{r.spec}</HPane>
          {r.accept && <HPane label="Acceptance criteria">{r.accept}</HPane>}
        </RecCard>
      ))}
    </div>
  );

  if (id === "p7") return (
    <div>
      {[
        { ref:"R-27", title:"Self-service Candidate Data Portal", badges:["p1","hi","ui","gdpr"],
          spec:<HBlock label="Six required portal capabilities"><ul style={{paddingLeft:18,lineHeight:1.7}}><li>View all stored data (profile, CV, application history, consent records, AI assessment results)</li><li>Update / correct inaccurate profile data</li><li>Download full data export (JSON or PDF) — within 30 days</li><li>Withdraw individual consents</li><li>Submit deletion request — triggers DSR workflow</li><li>Submit correction request</li></ul>Access via magic link in confirmation email (time-limited JWT, 7-day validity) — no new account creation required.</HBlock>,
          dev:<HBlock label="Technical requirements">Magic link: time-limited JWT (7-day validity), signed with server secret. Data export: aggregate across all storage systems. Deletion request: create DSR ticket, trigger soft-delete pipeline, confirm via email. Identity verification required before deletion: email match + confirmation code.</HBlock>,
          accept:<Checklist items={["All 6 portal capabilities implemented","Data export covers all storage systems","Magic link access — no new account creation","DSR 30-day SLA tracked and enforced","All DSR events logged with timestamps"]} /> },
        { ref:"R-28", title:"DSR workflow in ATS backend", badges:["p1","med","back","gdpr"],
          spec:<HBlock label="DSR workflow steps">1. Intake via portal or email → create ticket with type (access / erasure / correction / portability / objection), auto-assign to DPO. 2. Identity verification: email match + confirmation code within 5 days. 3. Fulfilment (max 30 days from intake). 4. Confirmation email with summary of actions. 5. Log: DSR_id, type, received_at, verified_at, fulfilled_at, outcome, fulfilled_by. Client admins must also have access to export and delete candidate data via admin panel.</HBlock>,
          accept:<Checklist items={["DSR ticketing system implemented (all 5 types)","Identity verification enforced before fulfilment","30-day SLA tracked in ticketing system","Confirmation email sent on fulfilment","Client admin export/delete capability in admin panel"]} /> },
      ].map(r => (
        <RecCard key={r.ref} id={r.ref} ref={r.ref} title={r.title} badges={r.badges}>
          {r.spec && <HPane label="Specification">{r.spec}</HPane>}
          {r.dev && <HPane label="Dev guide">{r.dev}</HPane>}
          {r.accept && <HPane label="Acceptance criteria">{r.accept}</HPane>}
        </RecCard>
      ))}
    </div>
  );

  if (id === "privacy") return (
    <div>
      <CopyBlock label="TIER 1 — SHORT NOTICE (inline at application form)">{`We collect and use your personal data — including your CV, application responses, and AI interview recordings — to assess your suitability for this role. Our AI systems help screen and score applications, but a qualified recruiter reviews all AI assessments before any decision is made. We keep unsuccessful candidate data for up to 12 months, then delete it. You have the right to access, correct, or delete your data at any time. Read our full Privacy Notice or email privacy@allps.ai.`}</CopyBlock>
      <CopyBlock label="SECTION 1 — Who we are">{`Allps AI AG is a technology company based in Switzerland that provides AI-powered hiring software. For the purposes of this privacy notice, Allps AI is the data processor acting on behalf of the employer (data controller) you applied to.

Data Controller: [Employer name and address]
Data Processor: Allps AI AG, [address], Switzerland
Data Protection Contact: privacy@allps.ai`}</CopyBlock>
      <CopyBlock label="SECTION 2 — What data we collect and why">{`YOUR APPLICATION DATA
What: Name, email, CV, cover letter, work history, education, skills, and application responses.
Why: To process your application and assess suitability for the role.
Legal basis: Legitimate interest of the employer.

YOUR AI INTERVIEW RECORDINGS (C2/C3 — with your consent)
What: Video recording, audio transcript, structured assessment results.
Why: To provide the employer with a structured assessment of your responses.
Legal basis: Your explicit consent (GDPR Art. 6(1)(a)).
Retention: Deleted 90 days after your process ends.

YOUR TALENT POOL PROFILE (C4 — with your consent)
What: Your profile and assessment results.
Why: To match you to future relevant roles at this employer.
Legal basis: Your explicit consent.
Retention: Up to 6 months, then renewed with your permission or deleted.`}</CopyBlock>
    </div>
  );

  if (id === "rights") return (
    <div>
      <CopyBlock label="CANDIDATE RIGHTS CHARTER — full copy">{`YOUR RIGHTS AS A CANDIDATE

Under GDPR and Swiss nLPD, you have the following rights regarding your personal data processed by Allps AI on behalf of [Employer]:

RIGHT TO ACCESS
You can request a copy of all personal data we hold about you, including your application data, AI assessment results, and consent records. We will respond within 30 days.

RIGHT TO CORRECTION
You can request correction of any inaccurate personal data. We will update records and confirm the change within 30 days.

RIGHT TO DELETION
You can request deletion of your personal data. We will delete all data except where we are legally required to retain it (e.g. compliance audit logs). We will confirm within 30 days.

RIGHT TO WITHDRAW CONSENT
You can withdraw your consent for AI screening or talent pool storage at any time from your Candidate Data Portal. This will not affect your application.

RIGHT TO HUMAN REVIEW
If AI was used in your assessment, you can request that a qualified recruiter reviews your results personally. We will complete the review within 5 business days.

RIGHT TO EXPLANATION
You can request an explanation of your AI assessment — what was evaluated and how your performance was assessed. Available via your Candidate Data Portal.

HOW TO EXERCISE YOUR RIGHTS
Log in to your Candidate Data Portal: [link]
Or email: privacy@allps.ai
Supervisory authority (if your request is declined): Swiss FDPIC at edoeb.admin.ch`}</CopyBlock>
    </div>
  );

  if (id === "consent") return (
    <div>
      <CopyBlock label="C2 — AI SCREENING INTERVIEW CONSENT SCREEN">{`HEADING: About your AI screening interview

This role uses an AI-assisted screening interview, powered by Allps AI. Here is what you need to know before you decide whether to take part.

WHAT THE AI DOES:
• Records and transcribes your responses
• Assesses how your answers relate to the role requirements
• Generates a structured assessment that a human recruiter will review

WHAT THE AI DOES NOT DO:
• Assess your facial expressions, appearance, or emotional state
• Make a final hiring decision — a human always reviews before any decision
• Store your video permanently — recordings are deleted 90 days after your process ends

YOUR RIGHTS:
• You can withdraw this consent at any time from your Candidate Data Portal
• Withdrawing will not affect your application
• You can request an explanation of your assessment results

CTA (primary): I understand and consent
CTA (secondary): No thank you — I prefer a human interview

NOTE FOR DEV: Both CTAs equally prominent. Log capture: candidate_id (hashed), consent_version, method, timestamp, role_id.`}</CopyBlock>
      <CopyBlock label="C4 — TALENT POOL CONSENT SCREEN">{`HEADING: Stay in our talent pool?

Your application for [Role title] has concluded. [Employer] would like to keep your profile in their talent pool for future opportunities.

THIS IS OPTIONAL:
• You are not required to join the talent pool
• Declining will not affect any active application outcomes

IF YOU JOIN:
• Your profile, CV, and assessment results will be stored for up to 6 months
• You may be contacted about relevant future roles
• You can withdraw at any time from your Candidate Data Portal

After 6 months, we will ask if you want to renew. If we do not hear back, your profile will be deleted.

CTA (primary): Yes, keep my profile
CTA (secondary): No thank you

NOTE FOR DEV: Capture: candidate_id (hashed), consent_version, method, timestamp, expiry_date (T+6 months). Set renewal_count = 0.`}</CopyBlock>
    </div>
  );

  if (id === "dsr") return (
    <div>
      <CopyBlock label="DSR ACKNOWLEDGEMENT EMAIL (send within 3 business days)">{`Subject: We have received your data request — [DSR-XXXXXX]

Hi [First name],

Thank you for contacting us. We have received your request to [access your data / delete your data / correct your data].

Your request reference is [DSR-XXXXXX]. Please keep this for your records.

We have up to 30 days to respond. If we need additional information, we will contact you within 5 business days.

Check status: [Candidate Data Portal link]

Kind regards,
Allps AI Data Protection Team`}</CopyBlock>
      <CopyBlock label="DELETION CONFIRMATION EMAIL">{`Subject: Your data deletion request is complete — [DSR-XXXXXX]

Hi [First name],

We have completed your request to delete your personal data.

WHAT WE HAVE DELETED:
• Your candidate profile and application data
• Your CV and all application responses
• Your AI interview recordings and transcripts
• Your AI assessment results
• Your consent records

Some data may be retained temporarily in backup systems (purged on a 30-day rolling schedule). Audit log entries are retained as required by law.

Request reference: [DSR-XXXXXX]
Completed: [date]

Kind regards,
Allps AI Data Protection Team`}</CopyBlock>
      <CopyBlock label="HUMAN REVIEW REQUEST ACKNOWLEDGEMENT (within 24 hours)">{`Subject: Your request for human review — [Role title] at [Employer]

Hi [First name],

We have received your request for a human review of your AI assessment for [Role title] at [Employer].

A qualified recruiter will personally review your full application and AI assessment within 5 business days. We will contact you with the outcome.

Request reference: [REQ-XXXXXX]

Questions? Email privacy@allps.ai with your reference number.

Kind regards,
Allps AI Candidate Support`}</CopyBlock>
    </div>
  );

  return <div style={{ color:"#888", fontSize:13 }}>Section content not available.</div>;
}

function ImplHubPanel() {
  const [activeSection, setActiveSection] = useState("overview");
  const groups = [...new Set(HUB_SECTIONS.map(s => s.group))];

  const active = HUB_SECTIONS.find(s => s.id === activeSection);

  return (
    <div style={{ display:"flex", height:"100%", overflow:"hidden" }}>
      {/* Hub sidebar */}
      <div style={{ width:192, flexShrink:0, borderRight:"0.5px solid rgba(0,0,0,0.1)", overflowY:"auto", background:"#FAFAF8" }}>
        {groups.map(group => (
          <div key={group} style={{ padding:"8px 0" }}>
            <div style={{ fontSize:10, fontWeight:700, color:"#aaa", letterSpacing:"0.08em", textTransform:"uppercase", padding:"4px 14px 2px" }}>{group}</div>
            {HUB_SECTIONS.filter(s => s.group === group).map(s => (
              <div key={s.id} onClick={() => setActiveSection(s.id)}
                style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 14px", cursor:"pointer", fontSize:12,
                  color: activeSection === s.id ? "#185FA5" : "#666",
                  background: activeSection === s.id ? "#E6F1FB" : "transparent",
                  borderLeft: `2px solid ${activeSection === s.id ? "#185FA5" : "transparent"}`,
                  fontWeight: activeSection === s.id ? 600 : 400 }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:s.dot, flexShrink:0 }} />
                {s.label}
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Hub content */}
      <div style={{ flex:1, overflowY:"auto", padding:"20px 18px" }}>
        <div style={{ marginBottom:16, paddingBottom:12, borderBottom:"0.5px solid rgba(0,0,0,0.08)" }}>
          <div style={{ fontSize:16, fontWeight:700, color:"#1A1A18" }}>{active?.label}</div>
          <div style={{ fontSize:11, color:"#888", marginTop:2 }}>Allps AI Compliance Implementation Hub v2</div>
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
  const [level, setLevel] = useState("client");
  const [showHub, setShowHub] = useState(false);

  return (
    <div style={{ fontFamily: "-apple-system, 'Segoe UI', Arial, sans-serif", background: "#FAFAF8", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* TOP NAV */}
      <div style={{ background: "white", borderBottom: "1px solid rgba(0,0,0,0.09)", padding: "0 24px", display: "flex", alignItems: "center", height: 52, gap: 16, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, background: "linear-gradient(135deg, #1553AA 0%, #6B3AAA 100%)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontSize: 14, fontWeight: 700 }}>A</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, color: "#1A1A18" }}>Allps AI</span>
          <span style={{ color: "#ddd", fontSize: 18 }}>|</span>
          <span style={{ fontSize: 13, color: "#666" }}>Consent Management</span>
          <span style={{ background: "#F0EDE8", color: "#6B5B3A", borderRadius: 100, padding: "2px 8px", fontSize: 11, fontWeight: 600 }}>v1</span>
        </div>
        <div style={{ display: "flex", background: "#F0EDE8", borderRadius: 8, padding: 3, gap: 2, marginLeft: "auto" }}>
          <button onClick={() => setLevel("client")} style={{ padding: "5px 16px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "none", background: level === "client" ? "white" : "transparent", color: level === "client" ? "#1553AA" : "#888", boxShadow: level === "client" ? "0 1px 4px rgba(0,0,0,0.1)" : "none", transition: "all 0.15s" }}>🏢 Client View</button>
          <button onClick={() => setLevel("platform")} style={{ padding: "5px 16px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "none", background: level === "platform" ? "white" : "transparent", color: level === "platform" ? "#6B3AAA" : "#888", boxShadow: level === "platform" ? "0 1px 4px rgba(0,0,0,0.1)" : "none", transition: "all 0.15s" }}>⚙️ Platform View</button>
        </div>
        <button onClick={() => setShowHub(!showHub)} style={{ padding: "5px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", background: showHub ? "#1A1A18" : "#F0EDE8", color: showHub ? "white" : "#555", border: "none", transition: "all 0.15s" }}>
          📖 {showHub ? "Hide" : "Dev Reference"}
        </button>
      </div>

      {/* BODY */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* MAIN CONTENT */}
        <div style={{ flex: 1, overflow: "auto", padding: "24px 28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.07em" }}>Viewing as:</span>
            {level === "client" && <span style={{ background: "#EEF4FF", color: "#1553AA", borderRadius: 100, padding: "2px 10px", fontSize: 12, fontWeight: 600 }}>Recruiter Admin — Bosch Automotive CH</span>}
            {level === "platform" && <span style={{ background: "#F3EFFE", color: "#6B3AAA", borderRadius: 100, padding: "2px 10px", fontSize: 12, fontWeight: 600 }}>CPO / DPO — Allps AI Internal</span>}
            <span style={{ fontSize: 11, color: "#aaa" }}>·</span>
            <span style={{ fontSize: 11, color: "#aaa" }}>
              {level === "client" ? "Deployer obligations — GDPR Art. 7 · EU AI Act Art. 26(7), 14, 4" : "Provider obligations — GDPR Art. 5, 12 · EU AI Act Art. 4, 9, 11, 12, 49"}
            </span>
          </div>
          {level === "client"   && <ClientDashboard />}
          {level === "platform" && <PlatformDashboard />}
        </div>

        {/* DEV REFERENCE PANEL — native React render, no iframe */}
        {showHub && (
          <div style={{ width: 620, borderLeft: "1px solid rgba(0,0,0,0.09)", background: "white", display: "flex", flexDirection: "column", flexShrink: 0, overflow: "hidden" }}>
            <div style={{ padding: "10px 16px", borderBottom: "1px solid rgba(0,0,0,0.08)", background: "#F7F6F3", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.06em" }}>Developer Reference</span>
              <span style={{ background: "#E4F5EA", color: "#1A6B3A", borderRadius: 100, padding: "1px 8px", fontSize: 11, fontWeight: 600 }}>Compliance Hub v2</span>
              <span style={{ fontSize: 11, color: "#888", marginLeft: "auto" }}>28 recommendations · 8 pillars · GDPR + EU AI Act + nLPD</span>
            </div>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <ImplHubPanel />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

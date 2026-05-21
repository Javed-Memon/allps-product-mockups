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

// C1 — Legitimate Interest Processing Register seed data
const C1_LIA = {
  version:     "v1.2",
  signedOff:   "2026-01-14",
  signedBy:    "Dr. K. Mäder (External Legal Counsel)",
  nextReview:  "2027-01-14",
  scope:       "CV parsing, AI matching, AI sourcing",
  basis:       "GDPR Art. 6(1)(f) — Legitimate Interest",
  purposeTest: "Filling roles with best-fit candidates; fair and efficient hiring process",
  necessityTest:"No less intrusive alternative achieves equivalent matching quality",
  balancingTest:"Candidates have reasonable expectation data is used for hiring; processing is limited to job-relevant fields; LI does not override rights",
};

// objection status: "none" | "active" | "resolved" | "overridden"
const C1_REGISTER = [
  { id:"C1-001", candidate:"CAND-88291", client:"Bosch Automotive CH", role:"Senior Embedded Engineer", liaVer:"v1.2", started:"2026-04-10", screenShown:true,  objection:"none",       objDate:null,         objStatus:null,        processingActive:true,  stoppedAt:null,         assignee:null,       grounds:null },
  { id:"C1-002", candidate:"CAND-71049", client:"u-blox",              role:"Firmware Engineer",         liaVer:"v1.2", started:"2026-04-22", screenShown:true,  objection:"resolved",   objDate:"2026-05-01", objStatus:"resolved",  processingActive:false, stoppedAt:"2026-05-03", assignee:"R. Gruber",grounds:null },
  { id:"C1-003", candidate:"CAND-30912", client:"Novartis Basel",      role:"Data Scientist",            liaVer:"v1.2", started:"2026-05-02", screenShown:true,  objection:"active",     objDate:"2026-05-11", objStatus:"active",    processingActive:false, stoppedAt:"2026-05-12", assignee:"R. Gruber",grounds:null },
  { id:"C1-004", candidate:"CAND-55183", client:"SAP Switzerland",     role:"Product Manager",           liaVer:"v1.2", started:"2026-04-18", screenShown:true,  objection:"none",       objDate:null,         objStatus:null,        processingActive:true,  stoppedAt:null,         assignee:null,       grounds:null },
  { id:"C1-005", candidate:"CAND-19302", client:"Sensirion",           role:"Embedded Systems Lead",     liaVer:"v1.2", started:"2026-03-30", screenShown:false, objection:"none",       objDate:null,         objStatus:null,        processingActive:true,  stoppedAt:null,         assignee:null,       grounds:null },
  { id:"C1-006", candidate:"CAND-40127", client:"Nestlé CH",           role:"Supply Chain Analyst",      liaVer:"v1.1", started:"2026-02-14", screenShown:true,  objection:"overridden", objDate:"2026-03-02", objStatus:"overridden",processingActive:true,  stoppedAt:null,         assignee:"L. Weber", grounds:"Compelling legitimate ground: active legal obligation to complete hiring process; objection received after interview completed; DPO reviewed and approved override 2026-03-05." },
  { id:"C1-007", candidate:"CAND-22891", client:"Bosch Automotive CH", role:"Senior Embedded Engineer",  liaVer:"v1.2", started:"2026-04-10", screenShown:true,  objection:"none",       objDate:null,         objStatus:null,        processingActive:true,  stoppedAt:null,         assignee:null,       grounds:null },
  { id:"C1-008", candidate:"CAND-77341", client:"u-blox",              role:"RF Engineer",               liaVer:"v1.2", started:"2026-05-05", screenShown:true,  objection:"active",     objDate:"2026-05-13", objStatus:"active",    processingActive:false, stoppedAt:"2026-05-13", assignee:"T. Hofer", grounds:null },
  { id:"C1-009", candidate:"CAND-61209", client:"Novartis Basel",      role:"Regulatory Affairs",        liaVer:"v1.2", started:"2026-04-28", screenShown:true,  objection:"none",       objDate:null,         objStatus:null,        processingActive:true,  stoppedAt:null,         assignee:null,       grounds:null },
  { id:"C1-010", candidate:"CAND-44812", client:"SAP Switzerland",     role:"UX Designer",               liaVer:"v1.1", started:"2026-02-20", screenShown:false, objection:"resolved",   objDate:"2026-03-10", objStatus:"resolved",  processingActive:false, stoppedAt:"2026-03-11", assignee:"L. Weber", grounds:null },
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

// ─────────────────────────────────────────────
// DATA RIGHTS FLOWS — shared primitives
// ─────────────────────────────────────────────

const FLOW_BLUE   = "#1553AA";
const FLOW_GREEN  = "#1A6B3A";
const FLOW_AMBER  = "#8B5500";
const FLOW_RED    = "#A32D2D";
const FLOW_PURPLE = "#6B3AAA";
const FLOW_GRAY   = "#6B7280";

function FlowStep({ n, label, sub, color, icon, width }) {
  const c = color || FLOW_BLUE;
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", width: width || 120 }}>
      <div style={{ width:42, height:42, borderRadius:"50%", background:c, display:"flex", alignItems:"center",
        justifyContent:"center", flexShrink:0, boxShadow:`0 2px 8px ${c}44` }}>
        <span style={{ color:"white", fontSize:n ? 15 : 18, fontWeight:700 }}>{icon || n}</span>
      </div>
      <div style={{ marginTop:8, fontSize:12, fontWeight:600, color:"#1A1A18", textAlign:"center", lineHeight:1.4 }}>{label}</div>
      {sub && <div style={{ marginTop:3, fontSize:10, color:"#888", textAlign:"center", lineHeight:1.4 }}>{sub}</div>}
    </div>
  );
}

function FlowArrow({ label, branch, color }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"0 4px", minWidth:36 }}>
      <div style={{ fontSize:10, color: color || FLOW_GRAY, fontWeight:600, marginBottom:2, whiteSpace:"nowrap" }}>{label}</div>
      <div style={{ fontSize:18, color: color || "#CBD5E1" }}>→</div>
    </div>
  );
}

function FlowRow({ children }) {
  return (
    <div style={{ display:"flex", alignItems:"center", flexWrap:"wrap", gap:0, padding:"4px 0" }}>
      {children}
    </div>
  );
}

function FlowBranch({ leftLabel, rightLabel, leftColor, rightColor, leftSteps, rightSteps }) {
  return (
    <div style={{ marginTop:16 }}>
      <div style={{ display:"flex", alignItems:"flex-start", gap:0 }}>
        {/* Left branch */}
        <div style={{ flex:1, background:"#F0FDF4", border:`1.5px solid #86EFAC`, borderRadius:10, padding:14, marginRight:8 }}>
          <div style={{ fontSize:10, fontWeight:800, color: leftColor || FLOW_GREEN, textTransform:"uppercase",
            letterSpacing:"0.07em", marginBottom:12, display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ width:8, height:8, borderRadius:"50%", background: leftColor || FLOW_GREEN, display:"inline-block" }} />
            {leftLabel}
          </div>
          <FlowRow>{leftSteps}</FlowRow>
        </div>
        {/* Right branch */}
        <div style={{ flex:1, background:"#FEF9EC", border:`1.5px solid #FCD34D`, borderRadius:10, padding:14, marginLeft:8 }}>
          <div style={{ fontSize:10, fontWeight:800, color: rightColor || FLOW_AMBER, textTransform:"uppercase",
            letterSpacing:"0.07em", marginBottom:12, display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ width:8, height:8, borderRadius:"50%", background: rightColor || FLOW_AMBER, display:"inline-block" }} />
            {rightLabel}
          </div>
          <FlowRow>{rightSteps}</FlowRow>
        </div>
      </div>
    </div>
  );
}

function FlowDecision({ label }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", margin:"0 6px" }}>
      <div style={{ background:"#FEF3E0", border:`2px solid ${FLOW_AMBER}`, borderRadius:8,
        padding:"8px 14px", fontSize:12, fontWeight:700, color:FLOW_AMBER, textAlign:"center", whiteSpace:"nowrap" }}>
        ◆ {label}
      </div>
    </div>
  );
}

function SystemActionCard({ title, items, color, icon }) {
  const c = color || FLOW_BLUE;
  return (
    <div style={{ background:"white", border:`1px solid ${c}33`, borderRadius:8, padding:14, flex:1 }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
        <span style={{ fontSize:16 }}>{icon}</span>
        <span style={{ fontSize:12, fontWeight:700, color:c }}>{title}</span>
      </div>
      {items.map((item, i) => (
        <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start", padding:"5px 0",
          borderTop: i > 0 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
          <span style={{ color:c, fontSize:12, flexShrink:0, marginTop:1 }}>→</span>
          <span style={{ fontSize:12, color:"#374151", lineHeight:1.5 }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

function SpecRef({ children, article }) {
  return (
    <div style={{ background:"#F5F4F2", borderRadius:6, padding:"8px 12px", marginBottom:8,
      borderLeft:`3px solid ${FLOW_BLUE}`, fontSize:12, color:"#374151", lineHeight:1.6 }}>
      {article && <span style={{ fontFamily:"monospace", fontSize:10, fontWeight:700, color:FLOW_BLUE,
        background:"#EEF2FE", borderRadius:4, padding:"1px 6px", marginRight:8 }}>{article}</span>}
      {children}
    </div>
  );
}

function InternalOnlyBadge() {
  return (
    <span style={{ background:"#1A1A18", color:"white", borderRadius:4, padding:"2px 8px",
      fontSize:10, fontWeight:700, letterSpacing:"0.06em" }}>INTERNAL ONLY</span>
  );
}

function SectionDivider({ label }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, margin:"24px 0 16px" }}>
      <div style={{ height:1, flex:1, background:"rgba(0,0,0,0.08)" }} />
      <span style={{ fontSize:11, fontWeight:700, color:"#888", textTransform:"uppercase", letterSpacing:"0.07em", whiteSpace:"nowrap" }}>{label}</span>
      <div style={{ height:1, flex:1, background:"rgba(0,0,0,0.08)" }} />
    </div>
  );
}

// ─────────────────────────────────────────────
// SUB-TAB 1: CONSENT WITHDRAWAL FLOW
// ─────────────────────────────────────────────

function ConsentWithdrawalFlow() {
  const [openType, setOpenType] = useState(null);

  const consentTypes = [
    {
      id: "c2", label: "C2 — AI Screening Interview", color: FLOW_BLUE,
      basis: "Explicit Consent · GDPR Art. 6(1)(a)",
      stops: ["AI screening interview cannot be scheduled or started", "Existing recording flagged as consent-withdrawn"],
      deletes: ["Recording deleted within 30 days of role closure", "AI assessment scores deleted with recording"],
      appImpact: "Application status unchanged. Recruiter notified — human-led interview must be offered.",
      flag: "consent_records: SCREENING withdrawn_at = NOW()",
      recruiterNote: "Candidate has withdrawn AI screening consent. Schedule a human-led interview or proceed with CV review only.",
    },
    {
      id: "c3", label: "C3 — AI Skills Interview", color: FLOW_PURPLE,
      basis: "Explicit Consent · GDPR Art. 6(1)(a)",
      stops: ["AI skills assessment cannot be scheduled or started", "Existing task responses flagged as consent-withdrawn"],
      deletes: ["Task responses and competency scores deleted within 30 days of role closure"],
      appImpact: "Application status unchanged. Recruiter notified — skills must be assessed by alternative method.",
      flag: "consent_records: SKILLS withdrawn_at = NOW()",
      recruiterNote: "Candidate has withdrawn AI skills assessment consent. An alternative skills evaluation method must be arranged.",
    },
    {
      id: "c4", label: "C4 — Talent Pool", color: FLOW_GREEN,
      basis: "Explicit Consent · GDPR Art. 6(1)(a) + nLPD Art. 6",
      stops: ["Candidate removed from talent pool immediately", "No future talent pool matching will include this candidate"],
      deletes: ["Talent pool profile deleted within 7 days", "Renewal reminders cancelled"],
      appImpact: "Active applications for specific roles are not affected. Talent pool membership ends.",
      flag: "consent_records: TALENT_POOL withdrawn_at = NOW(); talent_pool_members: status = REMOVED",
      recruiterNote: "Candidate has withdrawn talent pool consent. Their profile has been removed. Any active role applications are unaffected.",
    },
  ];

  const sel = consentTypes.find(t => t.id === openType);

  return (
    <div>
      <div style={{ background:"#EEF4FF", borderRadius:8, padding:"12px 16px", marginBottom:20,
        borderLeft:`4px solid ${FLOW_BLUE}` }}>
        <div style={{ fontSize:13, fontWeight:700, color:FLOW_BLUE, marginBottom:4 }}>
          Consent Withdrawal — Product Specification Reference
        </div>
        <div style={{ fontSize:12, color:"#374151", lineHeight:1.6 }}>
          Covers C2 (AI Screening), C3 (AI Skills Interview), and C4 (Talent Pool). Each type is independently withdrawable.
          Withdrawal is absolute and unconditional — the platform cannot override it. Legal basis: <strong>GDPR Art. 7(3)</strong>.
          Does not apply to C1 (handled separately under Art. 21 Objection).
        </div>
      </div>

      {/* ── A: Candidate journey flow ── */}
      <SectionDivider label="A — Candidate Journey Flow" />
      <div style={{ background:"white", border:"1px solid rgba(0,0,0,0.08)", borderRadius:10, padding:20, overflowX:"auto" }}>
        <FlowRow>
          <FlowStep n={1} label="Data Portal" sub="Candidate opens via magic link" color={FLOW_BLUE} />
          <FlowArrow />
          <FlowStep n={2} label="Consent Status" sub="Sees C2, C3, C4 status cards individually" color={FLOW_BLUE} />
          <FlowArrow />
          <FlowStep n={3} label="Select Type" sub="Chooses one consent type to withdraw" color={FLOW_BLUE} />
          <FlowArrow />
          <FlowStep n={4} label="Confirmation" sub="Plain-language screen — no dark patterns" color={FLOW_AMBER} />
          <FlowArrow />
          <FlowStep n={5} label="Confirm" sub="Single button click" color={FLOW_AMBER} />
        </FlowRow>
        <div style={{ display:"flex", justifyContent:"center", fontSize:20, color:"#CBD5E1", margin:"8px 0" }}>↓</div>
        <FlowRow>
          <FlowStep n={6} label="System Actions" sub="Atomic — all fire in same transaction" color={FLOW_GREEN} />
          <FlowArrow />
          <FlowStep n={7} label="Audit Log" sub="Immutable record written" color={FLOW_GREEN} />
          <FlowArrow />
          <FlowStep n={8} label="Recruiter Alert" sub="ATS notification fired" color={FLOW_PURPLE} />
          <FlowArrow />
          <FlowStep n={9} label="Confirm Email" sub="Sent to candidate within 24h" color={FLOW_GREEN} />
          <FlowArrow />
          <FlowStep icon="✓" label="Complete" sub="Withdrawal recorded" color={FLOW_GREEN} />
        </FlowRow>
      </div>

      {/* ── B: System actions per consent type ── */}
      <SectionDivider label="B — System Actions by Consent Type" />
      <div style={{ fontSize:12, color:"#666", marginBottom:12 }}>
        Select a consent type to see the exact system actions that must fire atomically on withdrawal.
      </div>
      <div style={{ display:"flex", gap:8, marginBottom:16 }}>
        {consentTypes.map(t => (
          <button key={t.id} onClick={() => setOpenType(openType === t.id ? null : t.id)}
            style={{ padding:"6px 16px", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer",
              background: openType === t.id ? t.color : "white",
              color: openType === t.id ? "white" : t.color,
              border:`1.5px solid ${t.color}` }}>
            {t.label}
          </button>
        ))}
      </div>
      {sel && (
        <div style={{ background:"#FAFAF8", border:`1px solid ${sel.color}33`, borderRadius:10, padding:16, marginBottom:16 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:sel.color }}>{sel.label}</div>
              <div style={{ fontSize:11, color:"#888", marginTop:2 }}>{sel.basis}</div>
            </div>
            <span style={{ background:`${sel.color}18`, color:sel.color, borderRadius:100, padding:"2px 10px", fontSize:11, fontWeight:700 }}>
              Withdrawal is unconditional · No override possible
            </span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:12 }}>
            <SystemActionCard title="Processing stops" icon="🛑" color={FLOW_RED} items={sel.stops} />
            <SystemActionCard title="Data deletion" icon="🗑️" color={FLOW_AMBER} items={sel.deletes} />
            <SystemActionCard title="Application impact" icon="📋" color={FLOW_GREEN}
              items={[sel.appImpact]} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <div style={{ background:"white", border:"1px solid rgba(0,0,0,0.08)", borderRadius:8, padding:12 }}>
              <div style={{ fontSize:10, fontWeight:700, color:"#888", textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:6 }}>Database flag written</div>
              <code style={{ fontSize:11, fontFamily:"monospace", color:sel.color, background:`${sel.color}0D`, padding:"6px 10px", borderRadius:6, display:"block", lineHeight:1.6 }}>
                {sel.flag}
              </code>
            </div>
            <div style={{ background:"white", border:"1px solid rgba(0,0,0,0.08)", borderRadius:8, padding:12 }}>
              <div style={{ fontSize:10, fontWeight:700, color:"#888", textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:6 }}>Recruiter notification copy</div>
              <div style={{ fontSize:12, color:"#374151", lineHeight:1.5, fontStyle:"italic" }}>"{sel.recruiterNote}"</div>
            </div>
          </div>
        </div>
      )}

      {/* ── C: Recruiter view ── */}
      <SectionDivider label="C — Recruiter Notification (ATS View)" />
      <div style={{ background:"white", border:"1px solid rgba(0,0,0,0.08)", borderRadius:10, padding:16 }}>
        <div style={{ fontSize:11, color:"#888", marginBottom:12 }}>
          Illustrative ATS notification card shown to the assigned recruiter when withdrawal fires mid-process.
        </div>
        <div style={{ border:"1px solid #FCD34D", borderRadius:8, padding:14, background:"#FFFBEB", maxWidth:520 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
            <div style={{ fontSize:13, fontWeight:700, color:"#92400E" }}>⚠ Candidate consent withdrawn</div>
            <span style={{ fontSize:10, color:"#888" }}>2026-05-14 · 11:42</span>
          </div>
          <div style={{ fontSize:12, color:"#374151", lineHeight:1.6, marginBottom:10 }}>
            <strong>Priya Sharma</strong> has withdrawn consent for <strong>C2 — AI Screening Interview</strong> for the role
            <strong> Senior Embedded Engineer</strong>.
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:12 }}>
            {[
              ["Action required", "Offer a human-led interview or proceed with CV review only"],
              ["Application status", "Active — unchanged"],
              ["AI assessment", "Unavailable — consent withdrawn"],
              ["Recording", "Scheduled for deletion within 30 days of role closure"],
            ].map(([k, v]) => (
              <div key={k} style={{ display:"flex", gap:8, fontSize:12 }}>
                <span style={{ fontWeight:600, color:"#6B7280", minWidth:130, flexShrink:0 }}>{k}</span>
                <span style={{ color:"#374151" }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <span style={{ padding:"5px 14px", background:FLOW_BLUE, color:"white", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer" }}>
              Schedule human interview
            </span>
            <span style={{ padding:"5px 14px", background:"white", color:FLOW_BLUE, border:`1px solid ${FLOW_BLUE}`, borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer" }}>
              View candidate record
            </span>
          </div>
        </div>
      </div>

      {/* ── D: Dark patterns checklist ── */}
      <SectionDivider label="D — Dark Patterns Reference" />
      <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:12 }}>
        <InternalOnlyBadge />
        <span style={{ fontSize:12, color:"#666" }}>Design guardrail for the product team. Do not include in client-facing materials.</span>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        {[
          {
            pattern: "Asymmetric visual weight",
            description: "Withdrawal CTA is smaller, greyed out, or placed below a fold relative to the grant CTA.",
            why: "GDPR Art. 7(3) requires withdrawal to be as easy as granting. Regulators have fined for this pattern explicitly (e.g. CNIL v. Google 2019).",
            fix: "Withdrawal and grant CTAs must be identical in size, colour prominence, and position.",
          },
          {
            pattern: "Confirmshaming copy",
            description: "The decline/withdraw option is labelled 'No thanks, I don't want to be considered for future roles' or similar guilt-inducing phrasing.",
            why: "Named in ICO and EDPB guidance as a dark pattern that undermines freely given consent.",
            fix: "Labels must be neutral: 'Withdraw consent' and 'Keep consent active'. No editorialising.",
          },
          {
            pattern: "Unnecessary friction on withdrawal",
            description: "Withdrawal requires re-entering a password, completing a CAPTCHA, or navigating multiple extra confirmation screens beyond one clear confirmation.",
            why: "GDPR requires withdrawal to be straightforward. Extra friction beyond one confirmation screen is disproportionate.",
            fix: "One confirmation screen maximum. Confirmation must summarise what will change — not add steps.",
          },
          {
            pattern: "Bundled withdrawal",
            description: "Withdrawing C2 also withdraws C3 and C4 in the same action, without the candidate being told.",
            why: "Granularity is a core requirement (R-02, R-03). Each consent type must be independently controllable.",
            fix: "Each consent type is a separate withdrawal action. Show each type as a separate card with its own state.",
          },
          {
            pattern: "Withdrawal with veiled threat",
            description: "Confirmation screen states 'Withdrawing consent may affect your application progress' when the consent type is C2 or C3 — implying the application will be harmed.",
            why: "Art. 7(3) prohibits detriment to the data subject as a result of withdrawal. Implying harm is a coercive pattern.",
            fix: "Copy must clearly state application status is unchanged. If there is a process change (human review), frame it neutrally.",
          },
          {
            pattern: "No post-withdrawal confirmation",
            description: "No email or in-portal confirmation is sent after withdrawal is completed.",
            why: "Candidates need a record that their instruction was executed. Without this, the platform is unaccountable.",
            fix: "Automated confirmation email within 24h is mandatory. Must name the type withdrawn, actions taken, and reference ID.",
          },
        ].map((item, i) => (
          <div key={i} style={{ background:"white", border:"1px solid #FECACA", borderRadius:8, padding:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
              <div style={{ fontSize:12, fontWeight:700, color:FLOW_RED }}>✗ {item.pattern}</div>
            </div>
            <div style={{ fontSize:12, color:"#374151", lineHeight:1.5, marginBottom:8 }}>{item.description}</div>
            <div style={{ fontSize:11, color:FLOW_AMBER, background:"#FEF3E0", borderRadius:6, padding:"6px 10px", marginBottom:6, lineHeight:1.5 }}>
              <strong>Why it's prohibited:</strong> {item.why}
            </div>
            <div style={{ fontSize:11, color:FLOW_GREEN, background:"#F0FDF4", borderRadius:6, padding:"6px 10px", lineHeight:1.5 }}>
              <strong>Correct pattern:</strong> {item.fix}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SUB-TAB 2: ART. 21 OBJECTION FLOW
// ─────────────────────────────────────────────

function Art21ObjectionFlow() {
  return (
    <div>
      <div style={{ background:"#FEF9EC", borderRadius:8, padding:"12px 16px", marginBottom:20,
        borderLeft:`4px solid ${FLOW_AMBER}` }}>
        <div style={{ fontSize:13, fontWeight:700, color:FLOW_AMBER, marginBottom:4 }}>
          Art. 21 Objection — Product Specification Reference
        </div>
        <div style={{ fontSize:12, color:"#374151", lineHeight:1.6 }}>
          Applies to <strong>C1 only</strong> (application data, CV parsing, AI matching) — the processing that rests on
          Legitimate Interest (Art. 6(1)(f)), not consent. This is a distinct legal right from consent withdrawal.
          The platform must stop processing immediately but may override the objection with documented compelling grounds.
          Legal basis: <strong>GDPR Art. 21(1)</strong>.
        </div>
      </div>

      {/* ── A: Candidate journey ── */}
      <SectionDivider label="A — Candidate Journey Flow" />
      <div style={{ background:"white", border:"1px solid rgba(0,0,0,0.08)", borderRadius:10, padding:20, overflowX:"auto" }}>
        <FlowRow>
          <FlowStep n={1} label="Data Portal" sub="Candidate opens via magic link" color={FLOW_AMBER} />
          <FlowArrow />
          <FlowStep n={2} label="C1 Status" sub="Sees LI processing status — distinct section from consent" color={FLOW_AMBER} />
          <FlowArrow />
          <FlowStep n={3} label="Object to Processing" sub="Label: 'Object' not 'Withdraw consent'" color={FLOW_AMBER} />
          <FlowArrow />
          <FlowStep n={4} label="Optional Reason" sub="Free text — explicitly labelled optional. No reason required by law." color={FLOW_GRAY} />
          <FlowArrow />
          <FlowStep n={5} label="Confirmation" sub="Explains what C1 covers, what stops" color={FLOW_AMBER} />
        </FlowRow>
        <div style={{ display:"flex", justifyContent:"center", fontSize:20, color:"#CBD5E1", margin:"8px 0" }}>↓</div>
        <FlowRow>
          <FlowStep n={6} label="Processing Stops" sub="Immediate precautionary stop" color={FLOW_RED} />
          <FlowArrow />
          <FlowStep n={7} label="DPO Queue" sub="Task created with 30-day SLA" color={FLOW_PURPLE} />
          <FlowArrow />
          <FlowStep n={8} label="Acknowledgement" sub="Automated email to candidate within 24h" color={FLOW_GREEN} />
          <FlowArrow />
          <FlowDecision label="DPO Assessment" />
        </FlowRow>
      </div>

      {/* ── DPO branch ── */}
      <SectionDivider label="B — DPO Assessment — Two Outcomes" />
      <div style={{ background:"white", border:"1px solid rgba(0,0,0,0.08)", borderRadius:10, padding:16, marginBottom:4 }}>
        <div style={{ display:"flex", justifyContent:"center", marginBottom:16 }}>
          <div style={{ background:"#FEF3E0", border:`2px solid ${FLOW_AMBER}`, borderRadius:8,
            padding:"10px 20px", fontSize:13, fontWeight:700, color:FLOW_AMBER }}>
            ◆ Are there compelling legitimate grounds that override the candidate's interests?
          </div>
        </div>
        <FlowBranch
          leftLabel="Branch A — No compelling grounds (expected outcome)"
          rightLabel="Branch B — Compelling grounds exist (rare)"
          leftColor={FLOW_GREEN}
          rightColor={FLOW_AMBER}
          leftSteps={
            <>
              <FlowStep n="A1" label="Confirm processing stopped" sub="" color={FLOW_GREEN} width={110} />
              <FlowArrow />
              <FlowStep n="A2" label="Delete C1-scoped data" sub="Match scores, sourcing flags" color={FLOW_GREEN} width={110} />
              <FlowArrow />
              <FlowStep n="A3" label="Notify candidate" sub="Plain-language outcome email" color={FLOW_GREEN} width={110} />
              <FlowArrow />
              <FlowStep icon="✓" label="Mark resolved" sub="Record closed" color={FLOW_GREEN} width={90} />
            </>
          }
          rightSteps={
            <>
              <FlowStep n="B1" label="Document grounds" sub="Written justification" color={FLOW_AMBER} width={110} />
              <FlowArrow />
              <FlowStep n="B2" label="Legal sign-off" sub="DPO + counsel review" color={FLOW_AMBER} width={110} />
              <FlowArrow />
              <FlowStep n="B3" label="Notify candidate" sub="Override + grounds explained + right to complain" color={FLOW_RED} width={130} />
              <FlowArrow />
              <FlowStep n="B4" label="Flag LIA review" sub="Accumulation triggers rebalancing" color={FLOW_AMBER} width={110} />
            </>
          }
        />
      </div>

      {/* ── C: Key distinctions panel ── */}
      <SectionDivider label="C — Key Distinctions: Objection vs. Withdrawal" />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:4 }}>
        {[
          ["Legal provision", "GDPR Art. 21(1)", "GDPR Art. 7(3)"],
          ["Applies to", "C1 — Legitimate Interest processing only", "C2, C3, C4 — Consent-based processing only"],
          ["Correct UI label", '"Object to processing"', '"Withdraw consent"'],
          ["Processing stops", "Immediately (precautionary)", "Immediately (unconditional)"],
          ["Controller can override?", "Yes — with documented compelling grounds + legal sign-off", "No — withdrawal ends the lawful basis. No override possible."],
          ["DPO involvement", "Required — must assess grounds within 30-day SLA", "Not required — fully automated pipeline"],
          ["Candidate notification", "DPO-authored response stating outcome + legal basis", "Automated confirmation email within 24h"],
          ["If candidate disagrees with outcome", "Can complain to supervisory authority (FDPIC / national DPA)", "No outcome to disagree with — withdrawal is absolute"],
        ].map(([dim, obj, with_]) => (
          <div key={dim} style={{ background:"white", border:"1px solid rgba(0,0,0,0.08)", borderRadius:8, padding:12,
            gridColumn: dim === "Legal provision" ? "span 1" : "span 1" }}>
            <div style={{ fontSize:10, fontWeight:700, color:"#888", textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:8 }}>{dim}</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              <div style={{ background:"#FEF9EC", borderRadius:6, padding:"7px 10px" }}>
                <div style={{ fontSize:10, fontWeight:700, color:FLOW_AMBER, marginBottom:3 }}>OBJECTION (C1)</div>
                <div style={{ fontSize:12, color:"#374151", lineHeight:1.5 }}>{obj}</div>
              </div>
              <div style={{ background:"#EEF4FF", borderRadius:6, padding:"7px 10px" }}>
                <div style={{ fontSize:10, fontWeight:700, color:FLOW_BLUE, marginBottom:3 }}>WITHDRAWAL (C2/C3/C4)</div>
                <div style={{ fontSize:12, color:"#374151", lineHeight:1.5 }}>{with_}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── D: SLA reference ── */}
      <SectionDivider label="D — SLA and Notification Requirements" />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
        {[
          { label:"Processing stop", value:"Immediate", sub:"On objection submission — no DPO action required to trigger", color:FLOW_RED, icon:"🛑" },
          { label:"Acknowledgement email", value:"Within 24h", sub:"Automated. Must confirm processing stopped and provide reference ID.", color:FLOW_BLUE, icon:"📧" },
          { label:"DPO assessment SLA", value:"30 days", sub:"Best practice. No GDPR-mandated deadline for objections specifically, but 30-day DSR SLA applies by analogy.", color:FLOW_PURPLE, icon:"⚖️" },
          { label:"Outcome notification", value:"Before SLA", sub:"Must name the outcome (resolved or overridden) and the legal basis for the decision in plain language.", color:FLOW_GREEN, icon:"✉️" },
          { label:"LIA review trigger", value:"On 3+ overrides", sub:"If three or more objections are overridden within any 12-month period, a formal LIA rebalancing review is mandatory.", color:FLOW_AMBER, icon:"📋" },
          { label:"Right to complain", value:"Always", sub:"Every objection response — whether resolved or overridden — must include the supervisory authority contact (FDPIC: edoeb.admin.ch).", color:FLOW_GRAY, icon:"🏛️" },
        ].map(item => (
          <div key={item.label} style={{ background:"white", border:`1px solid ${item.color}33`, borderRadius:8, padding:14 }}>
            <div style={{ fontSize:18, marginBottom:6 }}>{item.icon}</div>
            <div style={{ fontSize:11, fontWeight:700, color:"#888", textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:2 }}>{item.label}</div>
            <div style={{ fontSize:20, fontWeight:800, color:item.color, marginBottom:4 }}>{item.value}</div>
            <div style={{ fontSize:11, color:"#666", lineHeight:1.5 }}>{item.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SUB-TAB 3: COMPARISON VIEW
// ─────────────────────────────────────────────

function RightsComparisonView() {
  return (
    <div>
      <div style={{ background:"#F5F4F2", borderRadius:8, padding:"12px 16px", marginBottom:20,
        borderLeft:"4px solid #1A1A18" }}>
        <div style={{ fontSize:13, fontWeight:700, color:"#1A1A18", marginBottom:4 }}>
          Side-by-Side Reference — Product & Design Team
        </div>
        <div style={{ fontSize:12, color:"#374151", lineHeight:1.6 }}>
          Use this view when designing the Candidate Data Portal and the recruiter-facing notification system.
          The most common design failure is treating these two rights as the same flow. They are not.
        </div>
      </div>

      {/* ── A: Comparison table ── */}
      <SectionDivider label="A — Full Comparison Table" />
      <div style={{ background:"white", border:"1px solid rgba(0,0,0,0.08)", borderRadius:10, overflow:"hidden", marginBottom:4 }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", background:"#F5F4F2" }}>
          <div style={{ padding:"10px 14px", fontSize:11, fontWeight:700, color:"#888", textTransform:"uppercase", letterSpacing:"0.05em" }}>Dimension</div>
          <div style={{ padding:"10px 14px", borderLeft:"1px solid rgba(0,0,0,0.07)" }}>
            <div style={{ fontSize:11, fontWeight:800, color:FLOW_BLUE, textTransform:"uppercase", letterSpacing:"0.05em" }}>Consent Withdrawal</div>
            <div style={{ fontSize:10, color:"#888", marginTop:2 }}>C2, C3, C4 · GDPR Art. 7(3)</div>
          </div>
          <div style={{ padding:"10px 14px", borderLeft:"1px solid rgba(0,0,0,0.07)" }}>
            <div style={{ fontSize:11, fontWeight:800, color:FLOW_AMBER, textTransform:"uppercase", letterSpacing:"0.05em" }}>Art. 21 Objection</div>
            <div style={{ fontSize:10, color:"#888", marginTop:2 }}>C1 only · GDPR Art. 21(1)</div>
          </div>
        </div>
        {[
          ["Lawful basis this covers", "Explicit consent (Art. 6(1)(a))", "Legitimate Interest (Art. 6(1)(f))"],
          ["What triggers it", "Candidate selects 'Withdraw consent' for C2, C3, or C4", "Candidate selects 'Object to processing' for C1 (AI matching/sourcing)"],
          ["Reason required from candidate?", "No", "No — GDPR Art. 21 does not require the candidate to give a reason"],
          ["Processing stops", "Immediately and unconditionally upon confirmation", "Immediately as a precautionary step — assessment follows"],
          ["Can the platform override?", "Never. Withdrawal ends the lawful basis entirely.", "Yes — only if compelling legitimate grounds are documented, legally reviewed, and communicated to the candidate"],
          ["Who handles it?", "Fully automated pipeline. No human involvement needed.", "DPO must assess grounds within 30-day SLA"],
          ["Application status", "Unchanged for C2/C3. C4: removed from talent pool.", "Unchanged — C1 affects matching/sourcing only"],
          ["Candidate notified how?", "Automated confirmation email within 24h — system-generated", "DPO-authored response stating outcome and legal basis"],
          ["If candidate disagrees?", "N/A — withdrawal is absolute. No dispute mechanism.", "Candidate can complain to FDPIC or national supervisory authority"],
          ["Audit record type", "System-generated: consent_records entry + audit log", "System-generated + DPO annotation on grounds assessment"],
          ["Triggers LIA review?", "No", "Yes — if 3+ objections overridden within 12 months"],
        ].map(([dim, left, right], i) => (
          <div key={dim} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr",
            background: i % 2 === 0 ? "white" : "#FAFAF8",
            borderTop:"1px solid rgba(0,0,0,0.06)" }}>
            <div style={{ padding:"10px 14px", fontSize:12, fontWeight:600, color:"#555" }}>{dim}</div>
            <div style={{ padding:"10px 14px", borderLeft:"1px solid rgba(0,0,0,0.06)", fontSize:12, color:"#1A1A18", lineHeight:1.5 }}>{left}</div>
            <div style={{ padding:"10px 14px", borderLeft:"1px solid rgba(0,0,0,0.06)", fontSize:12, color:"#1A1A18", lineHeight:1.5 }}>{right}</div>
          </div>
        ))}
      </div>

      {/* ── B: Portal UX guidance ── */}
      <SectionDivider label="B — Candidate Data Portal UX Guidance" />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:4 }}>
        <div style={{ background:"white", border:`1.5px solid ${FLOW_BLUE}`, borderRadius:10, padding:16 }}>
          <div style={{ fontSize:12, fontWeight:700, color:FLOW_BLUE, marginBottom:10 }}>
            Consent Management Section
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:12 }}>
            {["C2 — AI Screening Interview · Explicit Consent · Art. 6(1)(a)",
              "C3 — AI Skills Interview · Explicit Consent · Art. 6(1)(a)",
              "C4 — Talent Pool · Explicit Consent + 6-month renewal · Art. 6(1)(a)"].map((label, i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                padding:"8px 12px", background:"#F7F9FF", borderRadius:6, border:"1px solid #DBEAFE" }}>
                <span style={{ fontSize:11, color:"#374151" }}>{label}</span>
                <span style={{ fontSize:10, background:FLOW_BLUE, color:"white", borderRadius:100,
                  padding:"2px 8px", fontWeight:700, cursor:"pointer" }}>Withdraw →</span>
              </div>
            ))}
          </div>
          <SpecRef article="Art. 7(3)">Each consent type shown as a separate row with independent withdrawal action. Status chip shows current state. Withdrawal CTA must be equal in visual weight to any grant CTA on the same screen.</SpecRef>
        </div>
        <div style={{ background:"white", border:`1.5px solid ${FLOW_AMBER}`, borderRadius:10, padding:16 }}>
          <div style={{ fontSize:12, fontWeight:700, color:FLOW_AMBER, marginBottom:10 }}>
            Processing Objection Section
          </div>
          <div style={{ padding:"10px 12px", background:"#FFFBEB", borderRadius:6, border:"1px solid #FCD34D", marginBottom:10 }}>
            <div style={{ fontSize:11, fontWeight:600, color:"#92400E", marginBottom:4 }}>C1 — Application & AI Matching</div>
            <div style={{ fontSize:11, color:"#374151", lineHeight:1.5, marginBottom:8 }}>
              Your CV and application responses are processed by our AI matching system to assess your fit for this role.
              This processing is based on our Legitimate Interest (GDPR Art. 6(1)(f)). You have the right to object.
            </div>
            <div style={{ fontSize:10, color:"#888", marginBottom:8 }}>Status: Processing active · LIA v1.2 · Signed off 2026-01-14</div>
            <span style={{ fontSize:10, background:FLOW_AMBER, color:"white", borderRadius:100,
              padding:"3px 10px", fontWeight:700, cursor:"pointer" }}>Object to this processing →</span>
          </div>
          <SpecRef article="Art. 21(1)">This section must be visually separate from the consent section. Label must say "Object" — not "Withdraw consent." The LIA version and sign-off date should be visible for transparency. No reason is required from the candidate.</SpecRef>
        </div>
      </div>
      <div style={{ background:"#F0FDF4", border:"1px solid #86EFAC", borderRadius:8, padding:12, fontSize:12, color:"#1A6B3A", lineHeight:1.6 }}>
        <strong>Portal layout rule:</strong> The consent management section and the processing objection section must be visually and structurally separate — different headings, different section containers. A candidate should never need to understand GDPR law to distinguish them; the UI framing must make the distinction self-evident.
      </div>

      {/* ── C: Anti-patterns ── */}
      <SectionDivider label="C — Anti-Pattern Reference" />
      <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:12 }}>
        <InternalOnlyBadge />
        <span style={{ fontSize:12, color:"#666" }}>Documented failure modes from known ATS implementations. Do not share with clients.</span>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:10 }}>
        {[
          {
            name: 'The "Forget Me" Conflation Pattern',
            description: 'A single "Delete my account / forget me" action that triggers both consent withdrawal AND C1 processing cessation as the same pipeline, with the same confirmation screen and the same downstream deletion job.',
            seen: "Common in early Greenhouse and legacy Workday ATS implementations. A single endpoint handled all data deletion regardless of lawful basis, which meant objections bypassed the grounds assessment step entirely.",
            consequence: "The controller loses the ability to document an overridden objection — the data is already deleted before the DPO can assess compelling grounds. In cases where the platform had a legal obligation to retain data (e.g. active litigation hold), this created a compliance breach.",
            fix: "Consent withdrawal and Art. 21 objection must be separate API endpoints, separate database record types, and separate deletion pipeline triggers. They share a UI entry point (the Data Portal) but nothing downstream.",
          },
          {
            name: "The Single-Toggle Pattern",
            description: 'A single consent toggle on the candidate profile that says "I consent to my data being used for hiring purposes" — treating all processing as consent-based. Candidates toggle it off to "stop everything."',
            seen: "Prevalent in older HRIS systems and some startups building naive consent UIs. The entire processing relationship is represented as one boolean.",
            consequence: "C1 processing has no lawful basis documented under consent — it rests on LI. Framing it as a consent toggle means: (a) the platform is implicitly representing it as consent-based, which is false; (b) toggling it off triggers the absolute withdrawal rules rather than the objection/grounds assessment rules; (c) in an audit, the platform cannot demonstrate it conducted and relied on a proper LIA.",
            fix: "Consent-based processing (C2/C3/C4) and LI-based processing (C1) must be represented using their correct legal labels. Never use a consent toggle for LI processing.",
          },
          {
            name: "The Post-Objection Delete-First Pattern",
            description: "When an Art. 21 objection is received, the system immediately runs the standard deletion pipeline (same as DSR erasure) before the DPO has assessed whether compelling grounds exist.",
            seen: "Occurs when the objection handling code calls the same deletion function as the erasure DSR handler, typically because the DSR handler was built first and the objection flow was bolted on later.",
            consequence: "If the DPO would have found compelling grounds (e.g. ongoing legal proceedings), the data needed to support those grounds has already been deleted. The platform has also lost the ability to notify the candidate of an override — there is nothing left to override.",
            fix: "The objection creates a processing_stopped flag and a DPO task. Data deletion only fires after the DPO marks the objection as resolved with no-grounds. Overridden objections never trigger deletion. The deletion pipeline must check objection_status before running.",
          },
        ].map((item, i) => (
          <div key={i} style={{ background:"white", border:"1px solid #FECACA", borderRadius:10, padding:16 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
              <div style={{ fontSize:13, fontWeight:700, color:FLOW_RED }}>✗ Anti-pattern {i+1}: {item.name}</div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
              <div>
                <div style={{ fontSize:10, fontWeight:700, color:"#888", textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:6 }}>What it is</div>
                <div style={{ fontSize:12, color:"#374151", lineHeight:1.5 }}>{item.description}</div>
              </div>
              <div>
                <div style={{ fontSize:10, fontWeight:700, color:FLOW_AMBER, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:6 }}>Where it's been seen</div>
                <div style={{ fontSize:12, color:"#374151", lineHeight:1.5 }}>{item.seen}</div>
              </div>
              <div>
                <div style={{ fontSize:10, fontWeight:700, color:FLOW_RED, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:6 }}>Compliance consequence</div>
                <div style={{ fontSize:12, color:"#374151", lineHeight:1.5 }}>{item.consequence}</div>
              </div>
            </div>
            <div style={{ marginTop:10, background:"#F0FDF4", borderRadius:6, padding:"8px 12px",
              fontSize:12, color:FLOW_GREEN, lineHeight:1.5, borderLeft:`3px solid ${FLOW_GREEN}` }}>
              <strong>Correct pattern:</strong> {item.fix}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SIMPLIFIED GUIDE — plain language compliance
// ─────────────────────────────────────────────

const GUIDE_BLUE   = "#1553AA";
const GUIDE_GREEN  = "#1A6B3A";
const GUIDE_AMBER  = "#8B5500";
const GUIDE_RED    = "#A32D2D";
const GUIDE_GRAY   = "#6B7280";

const PLAN_MONTHS = [
  {
    month: 1, label: "Month 1", theme: "Stop the obvious risks",
    color: GUIDE_RED, bg: "#FFF5F5", border: "#FECACA",
    weeks: [
      {
        week: "Week 1–2",
        title: "Ask for permission before using AI on candidates",
        why: "If you record someone's video interview and they didn't agree to it, you're breaking the law. Full stop.",
        tasks: [
          "Add a consent screen before every AI screening interview — candidate must click 'I agree' before recording begins",
          "Add a second consent screen before AI skills interviews — separate agreement, same pattern",
          "Both screens must have an equally visible 'No thanks' button — not greyed out, not hidden",
          "Log the click: who agreed, when, which version of the screen they saw",
        ],
        testDone: "No AI interview can start without a logged consent click. QA test: try to start a recording without clicking agree — it must be impossible.",
        owner: "Frontend + Backend",
      },
      {
        week: "Week 3–4",
        title: "Tell candidates an AI is interviewing them",
        why: "Candidates have a legal right to know a machine is assessing them before they start. Finding out after feels like a trap and is non-compliant.",
        tasks: [
          "Show a full-screen disclosure before the AI interview begins — after consent, before recording starts",
          "The screen must say: what the AI assesses (your answers), what it does NOT assess (your face, emotions, appearance), that a human will review before any decision",
          "Add a link to a plain-language 'How our AI works' page — this page must exist and be publicly accessible",
          "Log that the candidate saw and acknowledged this screen",
        ],
        testDone: "A candidate who has never used the product can read the disclosure screen and explain back what the AI does and does not do.",
        owner: "Frontend + Content",
      },
    ],
  },
  {
    month: 2, label: "Month 2", theme: "Give candidates control",
    color: GUIDE_AMBER, bg: "#FFFBEB", border: "#FCD34D",
    weeks: [
      {
        week: "Week 5–6",
        title: "Build the candidate self-service portal",
        why: "Candidates have a legal right to see their data, change it, and delete it. Without a portal, your team handles every request manually — that doesn't scale and breaks the 30-day deadline.",
        tasks: [
          "Build a portal page candidates access via a magic link in their confirmation email — no new account needed",
          "The portal must show: their stored data, which AI consents they've given, and their application status",
          "Add a 'Withdraw consent' button per consent type (screening, skills interview, talent pool — each separately)",
          "Add a 'Delete all my data' button — creates a deletion ticket your team must complete within 30 days",
          "Add a 'Download my data' button — exports their profile as a JSON or PDF",
          "Confirmation email sent automatically when any of these actions are taken",
        ],
        testDone: "A candidate can find the portal, withdraw their AI screening consent, and receive a confirmation email — all without contacting support.",
        owner: "Frontend + Backend",
      },
      {
        week: "Week 7–8",
        title: "Make sure a human reviews every AI decision before rejection",
        why: "You cannot send a rejection based purely on what an AI decided. A human must review and make the call. This is required by both GDPR and the EU AI Act.",
        tasks: [
          "Block the ATS from sending any rejection email until a recruiter has clicked 'Review and action' on a candidate",
          "Add a 'Candidates awaiting review' queue to the recruiter dashboard — this is their primary daily workflow",
          "Recruiter actions: Approve, Reject, Hold. Rejection email only fires after 'Reject' is clicked",
          "Log every review: which recruiter, when, what they decided, whether they followed the AI's recommendation",
        ],
        testDone: "Attempt to trigger a rejection notification without a recruiter action — it must be impossible. Check logs show reviewer ID on every rejected candidate.",
        owner: "Backend + ATS product",
      },
    ],
  },
  {
    month: 3, label: "Month 3", theme: "Keep your house clean automatically",
    color: GUIDE_GREEN, bg: "#F0FDF4", border: "#86EFAC",
    weeks: [
      {
        week: "Week 9–10",
        title: "Automatically delete data you no longer need",
        why: "Keeping candidate data indefinitely is illegal. You need rules for how long you keep it and a system that enforces those rules without someone having to remember.",
        tasks: [
          "Set up a daily automated job that runs at 02:00 UTC",
          "Delete candidate profiles 12 months after their application was closed (unsuccessful candidates only)",
          "Delete AI interview recordings 6 months after the role closes — recordings are the highest-risk data",
          "For talent pool candidates: send a renewal reminder 30 days before 6-month consent expires; delete if no renewal",
          "Log every deletion: who was deleted, why (retention policy / consent expired / they asked), when",
          "Alert: if the deletion job fails to run, someone on the team is notified within 1 hour",
        ],
        testDone: "Check the job ran at 02:00 last night. Check its log shows deletions. Verify a test candidate record was deleted on schedule.",
        owner: "Backend / DevOps",
      },
      {
        week: "Week 11–12",
        title: "Wire up the DSR workflow and respond within 30 days",
        why: "When a candidate formally asks to see, fix, or delete their data, you have 30 days to respond. Missing that deadline is a fine risk. You need a ticketing system, not an inbox.",
        tasks: [
          "The portal's 'Delete my data' and 'Download my data' buttons must create a ticket in a tracked system",
          "Ticket must show: candidate ID, request type, date filed, 30-day deadline",
          "Assign each ticket to a named person — it cannot sit unassigned",
          "Send an automated acknowledgement email to the candidate within 24 hours of filing",
          "When the ticket is completed, send a confirmation email listing exactly what was done",
          "Test the full flow end to end: file a request as a test candidate, verify ticket appears and acknowledgement arrives",
        ],
        testDone: "File a test deletion request. Verify: ticket created, acknowledgement email received within 24h, ticket has an owner and a deadline date.",
        owner: "Backend + Product + Support",
      },
    ],
  },
];

const MINIMUM_SIX = [
  {
    n: 1, title: "Ask permission before AI interviews",
    plain: "Before you start recording anyone for an AI interview, they must click a button that says they agree. No click = no recording. This applies to screening interviews and skills interviews separately.",
    notDoing: "You're recording people without their knowledge. That's a GDPR violation. The fine risk is real.",
    done: "There is a consent screen. Candidates click agree. The click is logged with a timestamp. No recording can start without a logged click.",
    effort: "~3 days frontend + 1 day backend", month: 1, color: GUIDE_RED,
  },
  {
    n: 2, title: "Tell candidates an AI is assessing them",
    plain: "Before the AI interview starts, show a screen that explains: an AI is assessing your answers (not your face, not your emotions), and a human will review the result before anything happens to you.",
    notDoing: "Candidates discover after the fact that a machine assessed them. This is a legal requirement and a trust problem.",
    done: "There is a full-screen disclosure. It names the AI system. It says what the AI does and does not assess. There is a link to a plain-language explainer page that is publicly accessible.",
    effort: "~2 days frontend + content writing", month: 1, color: GUIDE_RED,
  },
  {
    n: 3, title: "Let candidates control their own data",
    plain: "Candidates must be able to see what data you hold on them, download it, withdraw their AI consent, and ask you to delete everything — without emailing your support team.",
    notDoing: "Every request comes in by email. You have no way to track 30-day deadlines. One missed deadline is a formal breach.",
    done: "There is a candidate portal accessible from a link in their emails. It shows their data, consent status, and has buttons to withdraw, delete, and download. Each action creates a logged event.",
    effort: "~1 week full-stack", month: 2, color: GUIDE_AMBER,
  },
  {
    n: 4, title: "A human must approve every rejection",
    plain: "Your ATS cannot send a rejection email based on what the AI decided alone. A recruiter must look at the result, make a decision, and click 'Reject' before any email goes out.",
    notDoing: "AI is making hiring decisions without human review. This is illegal under two separate regulations. It exposes candidates to unfair automated decisions.",
    done: "No rejection email can be sent without a logged recruiter action. There is a pending review queue. Every rejected candidate has a reviewer ID and timestamp.",
    effort: "~3 days backend + 2 days ATS UI", month: 2, color: GUIDE_AMBER,
  },
  {
    n: 5, title: "Delete data you no longer need — automatically",
    plain: "You cannot keep candidate data forever. Set up an automated job that deletes unsuccessful candidate profiles after 12 months and interview recordings after 6 months. Run it every night.",
    notDoing: "You're accumulating data with no deletion schedule. Holding data longer than necessary is a violation even if you never used it.",
    done: "A scheduled job runs nightly. It deletes records on schedule. It logs every deletion. If the job fails, an alert fires. You can show a regulator the deletion log on request.",
    effort: "~2 days backend / DevOps", month: 3, color: GUIDE_GREEN,
  },
  {
    n: 6, title: "Track and respond to data requests within 30 days",
    plain: "When someone asks to see, fix, or delete their data, you have 30 days to respond. You need a ticketing system for this — not an email inbox.",
    notDoing: "Requests land in someone's inbox with no tracking and no deadline visibility. Missing the 30-day window triggers a formal breach notification requirement.",
    done: "Every data request creates a ticket with a 30-day deadline. The candidate gets an automated acknowledgement within 24 hours. Tickets have named owners. Completions are logged.",
    effort: "~3 days backend + integrate with existing task tool", month: 3, color: GUIDE_GREEN,
  },
];

function GuideCard({ item, expanded, onToggle }) {
  const monthLabel = ["Month 1", "Month 2", "Month 3"][item.month - 1];
  return (
    <div style={{ border:`1.5px solid ${item.color}33`, borderRadius:10, overflow:"hidden", marginBottom:10 }}>
      <button onClick={onToggle}
        style={{ width:"100%", padding:"14px 16px", display:"flex", alignItems:"center", gap:14,
          background: expanded ? `${item.color}08` : "white", border:"none", cursor:"pointer", textAlign:"left" }}>
        <div style={{ width:36, height:36, borderRadius:"50%", background:item.color,
          display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <span style={{ color:"white", fontWeight:800, fontSize:15 }}>{item.n}</span>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:14, fontWeight:700, color:"#1A1A18" }}>{item.title}</div>
          <div style={{ fontSize:12, color:"#555", marginTop:2, lineHeight:1.4 }}>{item.plain}</div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4, flexShrink:0 }}>
          <span style={{ background:`${item.color}18`, color:item.color, borderRadius:100,
            padding:"2px 10px", fontSize:11, fontWeight:700 }}>{monthLabel}</span>
          <span style={{ fontSize:11, color:GUIDE_GRAY }}>{expanded ? "▲ Less" : "▼ Details"}</span>
        </div>
      </button>
      {expanded && (
        <div style={{ padding:16, borderTop:`1px solid ${item.color}22`, background:"white" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
            <div style={{ background:"#FFF5F5", border:"1px solid #FECACA", borderRadius:8, padding:12 }}>
              <div style={{ fontSize:10, fontWeight:800, color:GUIDE_RED, textTransform:"uppercase",
                letterSpacing:"0.06em", marginBottom:6 }}>If you skip this</div>
              <div style={{ fontSize:12, color:"#374151", lineHeight:1.6 }}>{item.notDoing}</div>
            </div>
            <div style={{ background:"#F0FDF4", border:"1px solid #86EFAC", borderRadius:8, padding:12 }}>
              <div style={{ fontSize:10, fontWeight:800, color:GUIDE_GREEN, textTransform:"uppercase",
                letterSpacing:"0.06em", marginBottom:6 }}>Definition of done</div>
              <div style={{ fontSize:12, color:"#374151", lineHeight:1.6 }}>{item.done}</div>
            </div>
            <div style={{ background:"#F5F4F2", border:"1px solid rgba(0,0,0,0.08)", borderRadius:8, padding:12 }}>
              <div style={{ fontSize:10, fontWeight:800, color:GUIDE_GRAY, textTransform:"uppercase",
                letterSpacing:"0.06em", marginBottom:6 }}>Effort estimate</div>
              <div style={{ fontSize:13, fontWeight:700, color:"#1A1A18", marginBottom:4 }}>{item.effort}</div>
              <div style={{ fontSize:11, color:GUIDE_GRAY }}>Single focused engineer. Add buffer for review and QA.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function WeekCard({ week }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background:"white", border:"1px solid rgba(0,0,0,0.09)", borderRadius:10, marginBottom:10, overflow:"hidden" }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ width:"100%", padding:"13px 16px", display:"flex", alignItems:"flex-start",
          gap:12, background:"none", border:"none", cursor:"pointer", textAlign:"left" }}>
        <span style={{ fontSize:10, fontWeight:700, color:GUIDE_GRAY, background:"#F5F4F2",
          borderRadius:6, padding:"3px 8px", whiteSpace:"nowrap", marginTop:1 }}>{week.week}</span>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:13, fontWeight:700, color:"#1A1A18" }}>{week.title}</div>
          <div style={{ fontSize:12, color:"#555", marginTop:2, lineHeight:1.4 }}>{week.why}</div>
        </div>
        <span style={{ fontSize:11, color:GUIDE_GRAY, flexShrink:0, marginTop:1 }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={{ padding:"0 16px 16px", borderTop:"1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize:11, fontWeight:700, color:GUIDE_GRAY, textTransform:"uppercase",
            letterSpacing:"0.06em", margin:"12px 0 8px" }}>Tasks</div>
          <ol style={{ paddingLeft:20, margin:0 }}>
            {week.tasks.map((t,i) => (
              <li key={i} style={{ fontSize:12, color:"#374151", lineHeight:1.7, marginBottom:4 }}>{t}</li>
            ))}
          </ol>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:12 }}>
            <div style={{ background:"#F0FDF4", borderRadius:8, padding:"10px 12px", border:"1px solid #86EFAC" }}>
              <div style={{ fontSize:10, fontWeight:800, color:GUIDE_GREEN, textTransform:"uppercase",
                letterSpacing:"0.06em", marginBottom:5 }}>✓ How you know it's done</div>
              <div style={{ fontSize:12, color:"#374151", lineHeight:1.6 }}>{week.testDone}</div>
            </div>
            <div style={{ background:"#F5F4F2", borderRadius:8, padding:"10px 12px", border:"1px solid rgba(0,0,0,0.08)" }}>
              <div style={{ fontSize:10, fontWeight:800, color:GUIDE_GRAY, textTransform:"uppercase",
                letterSpacing:"0.06em", marginBottom:5 }}>Owner</div>
              <div style={{ fontSize:13, fontWeight:700, color:"#1A1A18" }}>{week.owner}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SimplifiedGuide() {
  const [sub, setSub] = useState("essentials");
  const [openCard, setOpenCard] = useState(null);

  const subTabs = [
    { id:"essentials", label:"The 6 Things That Matter" },
    { id:"plan",       label:"3-Month Plan" },
    { id:"glossary",   label:"Glossary" },
  ];

  return (
    <div>
      <div style={{ background:"#1A1A18", borderRadius:10, padding:"14px 18px", marginBottom:20,
        display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <div style={{ fontWeight:700, fontSize:14, color:"white", marginBottom:3 }}>
            🚀 GDPR Essentials — Plain Language Guide
          </div>
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.6)", lineHeight:1.5 }}>
            Six things to build. Three months to do it. Written for engineers with no compliance background.
          </div>
        </div>
        <span style={{ background:"#22C55E", color:"white", borderRadius:6, padding:"4px 12px",
          fontSize:11, fontWeight:700 }}>Start here</span>
      </div>

      <TabBar tabs={subTabs} active={sub} onChange={setSub} accent="#1A1A18" />

      {/* ── THE 6 THINGS ── */}
      {sub === "essentials" && (
        <div>
          <div style={{ background:"#F0FDF4", border:"1px solid #86EFAC", borderRadius:8,
            padding:"10px 14px", marginBottom:18, fontSize:13, color:GUIDE_GREEN }}>
            <strong>How to read this:</strong> Six things you must build, in priority order.
            Click any item to see what happens if you skip it, what done looks like, and a rough effort estimate.
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:20 }}>
            {[
              { label:"Month 1 — Do immediately", items:["Ask permission before AI interviews","Tell candidates an AI is assessing them"], color:GUIDE_RED, bg:"#FFF5F5", border:"#FECACA" },
              { label:"Month 2 — Build control features", items:["Let candidates control their own data","A human must approve every rejection"], color:GUIDE_AMBER, bg:"#FFFBEB", border:"#FCD34D" },
              { label:"Month 3 — Automate the boring stuff", items:["Delete data you no longer need automatically","Track and respond to data requests in 30 days"], color:GUIDE_GREEN, bg:"#F0FDF4", border:"#86EFAC" },
            ].map(col => (
              <div key={col.label} style={{ background:col.bg, border:`1px solid ${col.border}`, borderRadius:10, padding:14 }}>
                <div style={{ fontSize:11, fontWeight:800, color:col.color, textTransform:"uppercase",
                  letterSpacing:"0.06em", marginBottom:10 }}>{col.label}</div>
                {col.items.map((item,i) => (
                  <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start", marginBottom:6 }}>
                    <span style={{ color:col.color, fontWeight:700, flexShrink:0 }}>→</span>
                    <span style={{ fontSize:12, color:"#374151", lineHeight:1.4 }}>{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {MINIMUM_SIX.map(item => (
            <GuideCard key={item.n} item={item}
              expanded={openCard === item.n}
              onToggle={() => setOpenCard(openCard === item.n ? null : item.n)} />
          ))}

          <div style={{ background:"#F5F4F2", border:"1px solid rgba(0,0,0,0.08)", borderRadius:10, padding:14, marginTop:20 }}>
            <div style={{ fontSize:12, fontWeight:700, color:"#1A1A18", marginBottom:8 }}>
              What's deliberately not on this list
            </div>
            <div style={{ fontSize:12, color:GUIDE_GRAY, lineHeight:1.6, marginBottom:10 }}>
              There are 28 compliance items in the full framework. Most are handled by the Allps AI
              platform team, not by client-facing product work. The 6 items above are the minimum the
              product must implement before going live with AI hiring features.
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              {[
                ["Technical documentation (DPIA, Risk Register, Technical File)", "Platform team handles this"],
                ["EU AI Database registration", "Allps AI registers its AI systems — clients don't need to"],
                ["Bias monitoring pipeline", "Deferred — not in scope for minimum viable compliance"],
                ["LIA for AI matching", "Allps AI's legal team drafts this — no engineering work required"],
              ].map(([item, reason],i) => (
                <div key={i} style={{ background:"white", borderRadius:8, padding:10, border:"1px solid rgba(0,0,0,0.07)" }}>
                  <div style={{ fontSize:12, fontWeight:600, color:"#1A1A18", marginBottom:2 }}>✗ {item}</div>
                  <div style={{ fontSize:11, color:GUIDE_GRAY }}>{reason}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── 3-MONTH PLAN ── */}
      {sub === "plan" && (
        <div>
          <div style={{ background:"#EEF4FF", border:"1px solid #BFDBFE", borderRadius:8,
            padding:"10px 14px", marginBottom:18, fontSize:13, color:GUIDE_BLUE, lineHeight:1.6 }}>
            <strong>How to use this:</strong> Each two-week block has a clear theme, tasks written for engineers,
            a test that tells you it's done, and an owner. Work through them in order. Don't start Month 2 until Month 1 is tested.
          </div>

          {PLAN_MONTHS.map(month => (
            <div key={month.month} style={{ marginBottom:24 }}>
              <div style={{ background:month.bg, border:`1.5px solid ${month.border}`,
                borderRadius:10, padding:"12px 16px", marginBottom:10,
                display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ fontSize:16, fontWeight:800, color:month.color }}>{month.label}</div>
                  <div style={{ fontSize:13, fontWeight:600, color:"#374151", marginTop:2 }}>Theme: {month.theme}</div>
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  {month.weeks.map(w => (
                    <span key={w.week} style={{ background:"white", border:`1px solid ${month.border}`,
                      borderRadius:6, padding:"3px 10px", fontSize:11, fontWeight:600, color:month.color }}>
                      {w.week}
                    </span>
                  ))}
                </div>
              </div>
              {month.weeks.map(week => <WeekCard key={week.week} week={week} />)}
            </div>
          ))}

          <div style={{ background:"#1A1A18", borderRadius:10, padding:16, marginTop:8 }}>
            <div style={{ fontSize:14, fontWeight:700, color:"white", marginBottom:12 }}>
              ✓ After 3 months, you will have:
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:14 }}>
              {[
                "Consent screens before every AI interview — candidates click to agree before recording starts",
                "An AI disclosure screen that tells candidates exactly what the AI does and does not assess",
                "A candidate portal where people can see their data, withdraw consent, and request deletion",
                "An ATS that requires a human to review every AI result before a rejection email can be sent",
                "A nightly deletion job that removes old data automatically with a full audit trail",
                "A DSR ticket system with 30-day deadlines, automated acknowledgements, and named owners",
              ].map((item,i) => (
                <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                  <span style={{ color:"#22C55E", fontWeight:700, fontSize:14, flexShrink:0 }}>✓</span>
                  <span style={{ fontSize:12, color:"rgba(255,255,255,0.8)", lineHeight:1.55 }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ padding:"10px 12px", background:"rgba(255,255,255,0.07)", borderRadius:8,
              fontSize:12, color:"rgba(255,255,255,0.55)", lineHeight:1.6 }}>
              <strong style={{ color:"rgba(255,255,255,0.85)" }}>What this doesn't cover:</strong> The
              full 28-item compliance framework includes platform-level obligations (AI documentation,
              EU AI Act registration, bias monitoring) tracked in the Platform Dashboard.
              This 3-month plan covers client-facing product features only.
            </div>
          </div>
        </div>
      )}

      {/* ── GLOSSARY ── */}
      {sub === "glossary" && (
        <div>
          <div style={{ background:"#F5F4F2", border:"1px solid rgba(0,0,0,0.08)", borderRadius:8,
            padding:"10px 14px", marginBottom:18, fontSize:12, color:GUIDE_GRAY }}>
            Plain-language definitions of every compliance term used in this dashboard. No legal background required.
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {[
              ["GDPR", "A European privacy law that governs how you collect, store, and use personal data. It applies to any company handling data from people in the EU or Switzerland. Breaking it leads to fines up to 4% of global revenue."],
              ["Consent", "When a person actively agrees to something — like clicking 'I agree' on a form. Under GDPR, consent must be freely given, specific, informed, and easy to withdraw. Pre-ticked boxes don't count."],
              ["Lawful basis", "The legal reason you're allowed to process someone's data. For AI interviews: consent (they clicked agree). For CV matching: Legitimate Interest. You need one for every type of processing."],
              ["Legitimate Interest", "A legal justification that says you have a genuine business reason to use someone's data and it doesn't unfairly harm them. For Allps AI, this covers CV parsing and AI matching — candidates expect their CV to be used in hiring."],
              ["Consent withdrawal", "When someone takes back their agreement. They can do this at any time for any reason. You must make it as easy as giving consent. It is immediate and you cannot override it."],
              ["Art. 21 Objection", "A separate right that applies when your legal basis is Legitimate Interest. The candidate can formally object to you using their data. You must stop immediately, then assess whether you have a strong enough reason to continue. In practice, you almost always just stop."],
              ["Data Subject Request (DSR)", "A formal request from a candidate to exercise their rights: Access (show me my data), Deletion (delete everything), Correction (fix this), Portability (give me my data to take elsewhere), Objection (stop using my data for X). You have 30 days to respond."],
              ["Data controller", "The company that decides why and how personal data is used. In hiring: the employer (your client). They're responsible for the candidate's data."],
              ["Data processor", "A company that processes data on behalf of a controller. Allps AI is the processor — it handles the technical work but takes instructions from the client. Processors need a signed Data Processing Agreement (DPA) with each controller."],
              ["DPIA", "Data Protection Impact Assessment. A document analysing privacy risks of a new technology before launch. Required for AI systems that make decisions about people. The platform team writes these — not client-facing engineering work."],
              ["Technical File", "A regulatory document required by the EU AI Act for high-risk AI. It describes what the AI does, how it was trained, and its limitations. Allps AI produces one for each AI module — not a client obligation."],
              ["High-risk AI", "Under the EU AI Act, any AI used in hiring is high-risk. Extra rules apply: human oversight, documentation, transparency, and public registration. All four Allps AI modules fall in this category."],
              ["Human-in-the-loop", "A requirement that a human must review and approve an AI decision before it affects a real person. In hiring: a recruiter must review the AI's assessment and make the final call — the AI cannot send a rejection on its own."],
              ["Audit log", "An immutable (tamper-proof) record of every significant action — AI assessments, human decisions, consent grants, data deletions. You need to show this to a regulator if asked."],
              ["nLPD", "Switzerland's national data protection law. Similar to GDPR with minor differences. Applies to Allps AI (Swiss-based) alongside GDPR for Swiss candidates."],
              ["AI Literacy (Art. 4)", "A requirement already in force since February 2025. Anyone working with AI systems — including the client's HR team — must have basic AI literacy training. Both Allps AI staff and client staff are covered."],
              ["Deployer", "In EU AI Act language, the company that uses an AI system built by someone else. The client employer is the deployer. They must implement transparency and human oversight — even though they didn't build the AI."],
              ["Provider", "The company that built and trained the AI. Allps AI is the provider. Providers have heavier obligations: technical documentation, registration, post-market monitoring, bias testing."],
            ].map(([term, def]) => (
              <div key={term} style={{ background:"white", border:"1px solid rgba(0,0,0,0.08)",
                borderRadius:8, padding:14 }}>
                <div style={{ fontSize:13, fontWeight:700, color:"#1A1A18", marginBottom:6 }}>{term}</div>
                <div style={{ fontSize:12, color:"#374151", lineHeight:1.65 }}>{def}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// DATA RIGHTS FLOWS — container tab
// ─────────────────────────────────────────────

function DataRightsFlows() {
  const [sub, setSub] = useState("withdrawal");
  const subTabs = [
    { id:"withdrawal", label:"Consent Withdrawal  ·  C2 · C3 · C4" },
    { id:"objection",  label:"Art. 21 Objection  ·  C1" },
    { id:"comparison", label:"Side-by-Side Comparison" },
  ];
  return (
    <div>
      <div style={{ background:"#F5F4F2", borderRadius:10, padding:"12px 16px", marginBottom:20,
        display:"flex", justifyContent:"space-between", alignItems:"center",
        border:"1px solid rgba(0,0,0,0.08)" }}>
        <div>
          <div style={{ fontWeight:700, fontSize:14, color:"#1A1A18" }}>⚖️ Data Rights Flows</div>
          <div style={{ fontSize:12, color:"#666", marginTop:2 }}>
            Product specification reference · GDPR Art. 7(3) · Art. 21(1) · Internal use only
          </div>
        </div>
        <InternalOnlyBadge />
      </div>
      <TabBar tabs={subTabs} active={sub} onChange={setSub} accent="#1A1A18" />
      {sub === "withdrawal" && <ConsentWithdrawalFlow />}
      {sub === "objection"  && <Art21ObjectionFlow />}
      {sub === "comparison" && <RightsComparisonView />}
    </div>
  );
}

// ─────────────────────────────────────────────
// CLIENT DASHBOARD
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// CONSENT SCREENS — candidate-facing UI samples
// ─────────────────────────────────────────────

const SCREEN_DEFS = [
  { id:"A",  label:"Screen A",   title:"Application & AI Matching",         tag:"Transparency",      tagColor:"#1553AA",  tagBg:"#EEF4FF" },
  { id:"B",  label:"Screen B",   title:"AI Screening Interview",             tag:"Explicit Consent",  tagColor:"#6B3AAA",  tagBg:"#F5F0FF" },
  { id:"C",  label:"Screen C",   title:"AI Skills Assessment",               tag:"Explicit Consent",  tagColor:"#6B3AAA",  tagBg:"#F5F0FF" },
  { id:"D",  label:"Screen D",   title:"Talent Pool Inclusion",              tag:"Explicit Consent",  tagColor:"#1A6B3A",  tagBg:"#E4F5EA" },
  { id:"DR", label:"Screen D-R", title:"Talent Pool Renewal",               tag:"Re-consent",        tagColor:"#8B5500",  tagBg:"#FEF3E0" },
  { id:"E",  label:"Screen E",   title:"AI Interview Disclosure",            tag:"Acknowledgement",   tagColor:"#A32D2D",  tagBg:"#FCEBEB" },
  { id:"F",  label:"Screen F",   title:"Candidate Data Portal",              tag:"Withdrawal / Object",tagColor:"#374151", tagBg:"#F5F4F2" },
];

// ── shared screen chrome ──────────────────────

function ScreenChrome({ children, employerName }) {
  return (
    <div style={{
      maxWidth: 480, margin:"0 auto",
      fontFamily:"-apple-system,'Segoe UI',Arial,sans-serif",
      background:"#FAFAF8", borderRadius:16,
      border:"1px solid rgba(0,0,0,0.09)",
      overflow:"hidden",
      boxShadow:"0 4px 24px rgba(0,0,0,0.08)"
    }}>
      {/* top bar */}
      <div style={{ background:"white", borderBottom:"1px solid rgba(0,0,0,0.08)",
        padding:"12px 20px", display:"flex", alignItems:"center", gap:10 }}>
        <div style={{ width:28, height:28, borderRadius:8,
          background:"linear-gradient(135deg,#1553AA,#6B3AAA)",
          display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span style={{ color:"white", fontSize:13, fontWeight:700 }}>A</span>
        </div>
        <div>
          <div style={{ fontSize:12, fontWeight:700, color:"#1A1A18" }}>Allps AI</div>
          {employerName && <div style={{ fontSize:10, color:"#888" }}>{employerName}</div>}
        </div>
        <div style={{ marginLeft:"auto", display:"flex", gap:6, alignItems:"center" }}>
          <div style={{ width:8, height:8, borderRadius:"50%", background:"#22C55E" }} />
          <span style={{ fontSize:10, color:"#888" }}>Secure · Encrypted</span>
        </div>
      </div>
      {/* body */}
      <div style={{ padding:"24px 24px 28px" }}>
        {children}
      </div>
    </div>
  );
}

function ScreenTitle({ icon, title, sub }) {
  return (
    <div style={{ marginBottom:20, textAlign:"center" }}>
      <div style={{ fontSize:32, marginBottom:10 }}>{icon}</div>
      <div style={{ fontSize:18, fontWeight:700, color:"#1A1A18", marginBottom:6, lineHeight:1.3 }}>{title}</div>
      {sub && <div style={{ fontSize:13, color:"#6B7280", lineHeight:1.5 }}>{sub}</div>}
    </div>
  );
}

function InfoRow({ icon, text, color }) {
  return (
    <div style={{ display:"flex", gap:10, alignItems:"flex-start", padding:"8px 0",
      borderBottom:"1px solid rgba(0,0,0,0.05)" }}>
      <span style={{ fontSize:16, flexShrink:0, marginTop:1 }}>{icon}</span>
      <span style={{ fontSize:13, color: color || "#374151", lineHeight:1.55 }}>{text}</span>
    </div>
  );
}

function ConsentToggle({ label, defaultOn }) {
  const [on, setOn] = useState(defaultOn || false);
  return (
    <div onClick={() => setOn(o => !o)}
      style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"12px 14px", background: on ? "#F0FDF4" : "#F5F4F2",
        border:`1.5px solid ${on ? "#86EFAC" : "rgba(0,0,0,0.1)"}`,
        borderRadius:10, cursor:"pointer", marginBottom:12, gap:10 }}>
      <span style={{ fontSize:13, color:"#1A1A18", lineHeight:1.4, fontWeight: on ? 500 : 400 }}>{label}</span>
      <div style={{ flexShrink:0, width:44, height:24, borderRadius:12,
        background: on ? "#22C55E" : "#D1D5DB", position:"relative", transition:"background 0.2s" }}>
        <div style={{ position:"absolute", top:2, left: on ? 22 : 2, width:20, height:20,
          borderRadius:"50%", background:"white", transition:"left 0.2s",
          boxShadow:"0 1px 3px rgba(0,0,0,0.2)" }} />
      </div>
    </div>
  );
}

function PrimaryBtn({ label, color, onClick }) {
  const c = color || "#1553AA";
  return (
    <button onClick={onClick}
      style={{ width:"100%", padding:"13px 0", background:c, color:"white", border:"none",
        borderRadius:10, fontSize:14, fontWeight:700, cursor:"pointer", marginBottom:10 }}>
      {label}
    </button>
  );
}

function SecondaryBtn({ label, onClick }) {
  return (
    <button onClick={onClick}
      style={{ width:"100%", padding:"11px 0", background:"transparent", color:"#6B7280",
        border:"1.5px solid rgba(0,0,0,0.12)", borderRadius:10, fontSize:13,
        fontWeight:500, cursor:"pointer", marginBottom:8 }}>
      {label}
    </button>
  );
}

function LinkRow({ links }) {
  return (
    <div style={{ display:"flex", justifyContent:"center", gap:16, marginTop:14, flexWrap:"wrap" }}>
      {links.map((l,i) => (
        <span key={i} style={{ fontSize:11, color:"#1553AA", cursor:"pointer",
          textDecoration:"underline", textUnderlineOffset:2 }}>{l}</span>
      ))}
    </div>
  );
}

function ConsentTag({ label, color, bg }) {
  return (
    <span style={{ background:bg, color, borderRadius:100, padding:"2px 10px",
      fontSize:10, fontWeight:700, letterSpacing:"0.04em" }}>{label}</span>
  );
}

function NoteBlock({ children }) {
  return (
    <div style={{ background:"#EEF4FF", borderRadius:8, padding:"10px 12px",
      fontSize:11, color:"#1553AA", lineHeight:1.6, marginTop:12 }}>
      <strong>📋 Spec note for engineers:</strong> {children}
    </div>
  );
}

function ProgressDots({ total, active }) {
  return (
    <div style={{ display:"flex", justifyContent:"center", gap:6, marginBottom:20 }}>
      {Array.from({length:total}).map((_,i) => (
        <div key={i} style={{ width: i===active?20:8, height:8, borderRadius:100,
          background: i===active?"#1553AA":i<active?"#93C5FD":"#E5E7EB",
          transition:"all 0.2s" }} />
      ))}
    </div>
  );
}

// ── SCREEN A ─────────────────────────────────

function ScreenA() {
  return (
    <ScreenChrome employerName="Bosch Automotive CH">
      <ProgressDots total={1} active={0} />
      <ScreenTitle
        icon="👋"
        title="Before you apply"
        sub="Here's a quick summary of how we use your information."
      />
      <div style={{ marginBottom:16 }}>
        <InfoRow icon="📄" text="We'll use your CV and application answers to assess your fit for the role." />
        <InfoRow icon="🤖" text="Our AI helps match your experience to the job requirements. A recruiter always reviews the result — no AI makes a final decision." />
        <InfoRow icon="🔒" text="We don't use your photo, nationality, or marital status in our matching." />
        <InfoRow icon="🗑️" text="If you're not selected, your data is deleted after 12 months." />
        <InfoRow icon="⚖️" text="You can see, correct, or delete your data at any time. You can also ask us to stop using it for matching." />
      </div>
      <div style={{ background:"#F5F4F2", borderRadius:8, padding:"10px 12px",
        fontSize:12, color:"#6B7280", marginBottom:16, lineHeight:1.6 }}>
        Our matching is based on a <strong>legitimate business interest</strong> in finding the right person for the role.
        You're not being asked to 'consent' to this — but we think you should know about it before you apply.
      </div>
      <PrimaryBtn label="Got it — take me to the application →" color="#1553AA" />
      <LinkRow links={["How we use your data","Your rights","How our AI works"]} />
      <NoteBlock>
        Lawful basis is Legitimate Interest — this is a transparency screen, not a consent gate.
        Log: candidate_id (hashed), lia_version, screen_shown_at. No toggle required.
        If candidate does not proceed, no data is collected.
      </NoteBlock>
    </ScreenChrome>
  );
}

// ── SCREEN B ─────────────────────────────────

function ScreenB() {
  return (
    <ScreenChrome employerName="Bosch Automotive CH">
      <ProgressDots total={3} active={0} />
      <ScreenTitle
        icon="🎥"
        title="Your AI screening interview"
        sub="We need your permission before we can record and assess your responses."
      />
      <div style={{ marginBottom:16 }}>
        <InfoRow icon="✅" text={<><strong>What the AI assesses:</strong> Your answers to each question — how clearly you communicate and how your experience relates to the role.</>} />
        <InfoRow icon="❌" text={<><strong>What the AI does NOT assess:</strong> Your face, your emotions, how you look, or how you sound. We do not use emotion recognition technology.</>} />
        <InfoRow icon="👤" text="A recruiter at Bosch will read the AI's summary before any decision is made about your application." />
        <InfoRow icon="🗑️" text="Your recording is deleted when this role closes, and no later than 6 months after that." />
        <InfoRow icon="↩️" text="You can withdraw this permission at any time from your Data Portal. Your application will not be affected." />
      </div>
      <ConsentToggle
        label="I understand, and I'm happy for my interview to be recorded and assessed by the AI"
      />
      <PrimaryBtn label="Confirm and continue →" color="#6B3AAA" />
      <SecondaryBtn label="No thanks — I'd prefer a human-led interview" />
      <LinkRow links={["Full privacy notice","How our AI works","Your rights"]} />
      <NoteBlock>
        Explicit consent required — Art. 6(1)(a). Toggle unchecked by default.
        Both buttons equal in size. Log: candidate_id (hashed), consent_type=SCREENING,
        version, granted_at, method=IN_APP. Gate: recording cannot start until
        consent_records shows SCREENING granted_at is set.
      </NoteBlock>
    </ScreenChrome>
  );
}

// ── SCREEN C ─────────────────────────────────

function ScreenC() {
  return (
    <ScreenChrome employerName="Bosch Automotive CH">
      <ProgressDots total={3} active={1} />
      <ScreenTitle
        icon="🧠"
        title="Your AI skills assessment"
        sub="This is a separate permission from your screening interview."
      />
      <div style={{ marginBottom:16 }}>
        <InfoRow icon="✅" text={<><strong>What the AI assesses:</strong> Your responses to role-specific tasks — how well your answers match the competencies required for this job.</>} />
        <InfoRow icon="❌" text={<><strong>What the AI does NOT assess:</strong> How quickly you answer (unless speed is explicitly part of the role), how you look, or any personal characteristic.</>} />
        <InfoRow icon="👤" text="A recruiter reviews your skills assessment alongside your full application. The AI's output is one input — not a decision." />
        <InfoRow icon="🗑️" text="Your task responses are deleted when this role closes, no later than 6 months after." />
        <InfoRow icon="↩️" text="You can withdraw this at any time from your Data Portal without affecting your application." />
      </div>
      <ConsentToggle
        label="I understand, and I agree for my task responses to be recorded and assessed by the AI"
      />
      <PrimaryBtn label="Confirm and continue →" color="#6B3AAA" />
      <SecondaryBtn label="No thanks — I'd prefer an alternative assessment" />
      <LinkRow links={["Full privacy notice","How our AI works","Your rights"]} />
      <NoteBlock>
        Separate consent record from Screen B — even if both occur in the same session.
        consent_type=SKILLS. Same logging requirements as Screen B.
        Do not pre-tick if Screen B was already granted — each type is independent.
      </NoteBlock>
    </ScreenChrome>
  );
}

// ── SCREEN D ─────────────────────────────────

function ScreenD() {
  return (
    <ScreenChrome employerName="Bosch Automotive CH">
      <ProgressDots total={3} active={2} />
      <ScreenTitle
        icon="📁"
        title="Would you like to stay in our talent pool?"
        sub="This is completely optional and has no effect on this application."
      />
      <div style={{ background:"#F0FDF4", border:"1px solid #86EFAC", borderRadius:10,
        padding:"12px 14px", marginBottom:14 }}>
        <div style={{ fontSize:12, fontWeight:700, color:"#1A6B3A", marginBottom:6 }}>What this means</div>
        <InfoRow icon="📬" text="Bosch may contact you about future roles that match your skills." />
        <InfoRow icon="⏱️" text="We'll keep your profile for 6 months. After that, we'll ask if you want to stay." />
        <InfoRow icon="↩️" text="You can leave the talent pool at any time from your Data Portal." />
      </div>
      <div style={{ background:"#F5F4F2", borderRadius:10, padding:"12px 14px", marginBottom:14 }}>
        <div style={{ fontSize:12, fontWeight:700, color:"#374151", marginBottom:6 }}>What we keep</div>
        <div style={{ fontSize:13, color:"#374151", lineHeight:1.6 }}>
          Your CV, skills, work history, and application answers.
          We do <strong>not</strong> keep your interview recordings in the talent pool.
        </div>
      </div>
      <ConsentToggle
        label="Yes — keep my profile in Bosch's talent pool for 6 months"
      />
      <PrimaryBtn label="Save my preference →" color="#1A6B3A" />
      <SecondaryBtn label="No thanks — delete my data when this application closes" />
      <LinkRow links={["Your rights","Full privacy notice"]} />
      <NoteBlock>
        Explicit consent — Art. 6(1)(a) + nLPD Art. 6. consent_type=TALENT_POOL.
        Set expiry_date = granted_at + 6 months. Set renewal_count = 0.
        Both options equal prominence. "No thanks" triggers deletion on role closure.
      </NoteBlock>
    </ScreenChrome>
  );
}

// ── SCREEN D-R ───────────────────────────────

function ScreenDR() {
  return (
    <ScreenChrome employerName="Bosch Automotive CH">
      <div style={{ background:"#FEF3E0", borderRadius:8, padding:"8px 12px",
        fontSize:12, color:"#8B5500", marginBottom:16, textAlign:"center", fontWeight:600 }}>
        ⏳ Your talent pool profile expires in 30 days
      </div>
      <ScreenTitle
        icon="🔄"
        title="Do you want to stay in our talent pool?"
        sub="Your 6 months are nearly up. Here's what happens next."
      />
      <div style={{ marginBottom:14 }}>
        <InfoRow icon="📅" text={<>Your profile is currently saved until <strong>14 November 2026</strong>.</>} />
        <InfoRow icon="📁" text="We still have: your CV, skills, work history, and application answers from your previous application." />
        <InfoRow icon="📬" text="If you renew, Bosch can continue to contact you about relevant future roles for another 6 months." />
        <InfoRow icon="🗑️" text="If you don't renew by 14 November, everything is permanently deleted." />
      </div>
      <ConsentToggle
        label="Yes — keep my profile in Bosch's talent pool for another 6 months"
      />
      <PrimaryBtn label="Renew for another 6 months →" color="#8B5500" />
      <SecondaryBtn label="No thanks — delete my profile now" />
      <div style={{ textAlign:"center", fontSize:11, color:"#aaa", marginTop:4 }}>
        Renewing is free and you can leave at any time.
      </div>
      <LinkRow links={["Update my data","Your rights","Full privacy notice"]} />
      <NoteBlock>
        Re-consent event — increment renewal_count. Update consent_records:
        new expiry_date = renewed_at + 6 months. capture_method=EMAIL_LINK.
        "No thanks" triggers immediate soft-delete. Send confirmation email
        on either action within 24h.
      </NoteBlock>
    </ScreenChrome>
  );
}

// ── SCREEN E ─────────────────────────────────

function ScreenE() {
  const [step, setStep] = useState(0);
  return (
    <ScreenChrome employerName="Bosch Automotive CH">
      {step === 0 ? (
        <>
          <div style={{ textAlign:"center", marginBottom:20 }}>
            <div style={{ fontSize:36, marginBottom:10 }}>🤖</div>
            <div style={{ fontSize:18, fontWeight:700, color:"#1A1A18", marginBottom:6 }}>
              You're about to start your AI interview
            </div>
            <div style={{ fontSize:13, color:"#6B7280", lineHeight:1.5 }}>
              Before we begin, here's exactly what will happen — and what won't.
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
            <div style={{ background:"#F0FDF4", border:"1px solid #86EFAC", borderRadius:10, padding:12 }}>
              <div style={{ fontSize:11, fontWeight:800, color:"#1A6B3A", textTransform:"uppercase",
                letterSpacing:"0.05em", marginBottom:8 }}>✓ What the AI will do</div>
              {["Listen to your answers","Transcribe what you say","Assess how your answers relate to the role","Generate a summary for the recruiter to read"].map((t,i) => (
                <div key={i} style={{ fontSize:12, color:"#374151", lineHeight:1.5,
                  padding:"4px 0", borderTop: i>0?"1px solid rgba(0,0,0,0.05)":"none" }}>• {t}</div>
              ))}
            </div>
            <div style={{ background:"#FFF5F5", border:"1px solid #FECACA", borderRadius:10, padding:12 }}>
              <div style={{ fontSize:11, fontWeight:800, color:"#A32D2D", textTransform:"uppercase",
                letterSpacing:"0.05em", marginBottom:8 }}>✗ What the AI will NOT do</div>
              {["Analyse your facial expressions","Detect your mood or emotions","Judge how you look or sound","Make a final hiring decision"].map((t,i) => (
                <div key={i} style={{ fontSize:12, color:"#374151", lineHeight:1.5,
                  padding:"4px 0", borderTop: i>0?"1px solid rgba(0,0,0,0.05)":"none" }}>• {t}</div>
              ))}
            </div>
          </div>
          <div style={{ background:"#EEF4FF", borderRadius:10, padding:"10px 14px",
            fontSize:13, color:"#1553AA", marginBottom:16, lineHeight:1.6, textAlign:"center" }}>
            👤 A recruiter at <strong>Bosch</strong> will review your full assessment before any decision is made about your application.
          </div>
          <PrimaryBtn label="I understand — start my interview →" color="#A32D2D" />
          <SecondaryBtn label="I have a question before I start" />
          <LinkRow links={["How our AI works","Your rights","Privacy notice"]} />
          <NoteBlock>
            EU AI Act Art. 26(7) disclosure — separate log entry from Consent B/C.
            Log: session_id, candidate_id (hashed), disclosure_version, acknowledged_at.
            Recording CANNOT start until this acknowledgement is logged.
            No auto-proceed on timer or page load. "I have a question" routes to
            a support contact — does not bypass the gate.
          </NoteBlock>
        </>
      ) : (
        <>
          <div style={{ textAlign:"center", padding:"20px 0 10px" }}>
            <div style={{ fontSize:48, marginBottom:12 }}>✅</div>
            <div style={{ fontSize:16, fontWeight:700, color:"#1A1A18" }}>You're all set</div>
            <div style={{ fontSize:13, color:"#6B7280", marginTop:6 }}>Your interview will begin in a moment.</div>
          </div>
        </>
      )}
      {step === 0 && (
        <div style={{ marginTop:8, textAlign:"center" }}>
          <span onClick={() => setStep(1)} style={{ fontSize:11, color:"#aaa", cursor:"pointer" }}>
            Preview acknowledged state →
          </span>
        </div>
      )}
      {step === 1 && (
        <div style={{ textAlign:"center", marginTop:8 }}>
          <span onClick={() => setStep(0)} style={{ fontSize:11, color:"#aaa", cursor:"pointer" }}>
            ← Back to disclosure screen
          </span>
        </div>
      )}
    </ScreenChrome>
  );
}

// ── SCREEN F ─────────────────────────────────

function ScreenF() {
  const [view, setView] = useState("home");
  const [withdrawnTypes, setWithdrawnTypes] = useState([]);
  const [objected, setObjected] = useState(false);
  const [delRequested, setDelRequested] = useState(false);

  const consentData = [
    { type:"B", label:"AI Screening Interview", status:"active",   expires:null },
    { type:"C", label:"AI Skills Assessment",   status:"active",   expires:null },
    { type:"D", label:"Talent Pool — Bosch",    status:"active",   expires:"14 Nov 2026" },
  ];

  if (view === "withdraw-confirm") return (
    <ScreenChrome>
      <div style={{ textAlign:"center", padding:"16px 0" }}>
        <div style={{ fontSize:40, marginBottom:12 }}>↩️</div>
        <div style={{ fontSize:16, fontWeight:700, color:"#1A1A18", marginBottom:8 }}>
          Withdraw consent for AI Screening Interview?
        </div>
        <div style={{ fontSize:13, color:"#6B7280", lineHeight:1.6, marginBottom:20 }}>
          This stops the AI assessing your interview responses. Your recording will be deleted when this role closes.<br/><br/>
          <strong>Your application is not affected.</strong> The recruiter will review your application without the AI assessment.
        </div>
        <PrimaryBtn label="Yes, withdraw my consent" color="#A32D2D"
          onClick={() => { setWithdrawnTypes(w => [...w,"B"]); setView("home"); }} />
        <SecondaryBtn label="← Go back" onClick={() => setView("home")} />
      </div>
    </ScreenChrome>
  );

  if (view === "object-confirm") return (
    <ScreenChrome>
      <div style={{ textAlign:"center", padding:"16px 0" }}>
        <div style={{ fontSize:40, marginBottom:12 }}>⚖️</div>
        <div style={{ fontSize:16, fontWeight:700, color:"#1A1A18", marginBottom:8 }}>
          Object to AI matching?
        </div>
        <div style={{ fontSize:13, color:"#6B7280", lineHeight:1.6, marginBottom:14 }}>
          This asks us to stop using your CV and application data in our AI matching system.
        </div>
        <div style={{ background:"#F5F4F2", borderRadius:8, padding:"10px 12px",
          fontSize:12, color:"#374151", lineHeight:1.6, marginBottom:14, textAlign:"left" }}>
          <strong>Reason (optional)</strong><br/>
          You don't have to tell us why. If you'd like to share a reason, it helps us improve.
          <textarea placeholder="Add a reason (optional)..." rows={3}
            style={{ width:"100%", marginTop:8, padding:8, borderRadius:6, border:"1px solid rgba(0,0,0,0.12)",
              fontSize:12, color:"#374151", fontFamily:"inherit", resize:"none", boxSizing:"border-box" }} />
        </div>
        <PrimaryBtn label="Submit objection" color="#8B5500"
          onClick={() => { setObjected(true); setView("home"); }} />
        <SecondaryBtn label="← Go back" onClick={() => setView("home")} />
        <NoteBlock>
          Art. 21 objection — candidate does not need to give a reason.
          Creates c1_processing_records entry: processing_active=false, stopped_at=NOW().
          Creates DPO queue task with 30-day SLA. Sends acknowledgement email within 24h.
        </NoteBlock>
      </div>
    </ScreenChrome>
  );

  if (view === "delete-confirm") return (
    <ScreenChrome>
      <div style={{ textAlign:"center", padding:"16px 0" }}>
        <div style={{ fontSize:40, marginBottom:12 }}>🗑️</div>
        <div style={{ fontSize:16, fontWeight:700, color:"#1A1A18", marginBottom:8 }}>
          Delete all your data?
        </div>
        <div style={{ fontSize:13, color:"#6B7280", lineHeight:1.6, marginBottom:14 }}>
          We'll delete everything we hold — your profile, CV, application responses, interview recordings, and assessment results.
        </div>
        <div style={{ background:"#FFF5F5", border:"1px solid #FECACA", borderRadius:8,
          padding:"10px 12px", fontSize:12, color:"#A32D2D", marginBottom:16, textAlign:"left" }}>
          ⚠️ This will close any active applications you have with employers on this platform.
        </div>
        <PrimaryBtn label="Yes, delete everything" color="#A32D2D"
          onClick={() => { setDelRequested(true); setView("home"); }} />
        <SecondaryBtn label="← Go back" onClick={() => setView("home")} />
      </div>
    </ScreenChrome>
  );

  // Home view
  return (
    <ScreenChrome>
      <div style={{ marginBottom:16 }}>
        <div style={{ fontSize:16, fontWeight:700, color:"#1A1A18", marginBottom:2 }}>
          Your data and privacy
        </div>
        <div style={{ fontSize:12, color:"#6B7280" }}>Sarah Müller · sarah.mueller@email.com</div>
      </div>

      {/* Consent section */}
      <div style={{ marginBottom:20 }}>
        <div style={{ fontSize:11, fontWeight:700, color:"#888", textTransform:"uppercase",
          letterSpacing:"0.06em", marginBottom:10 }}>Your AI interview consents</div>
        {consentData.map(c => {
          const withdrawn = withdrawnTypes.includes(c.type);
          return (
            <div key={c.type} style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
              padding:"10px 12px", background: withdrawn?"#FFF5F5":"white",
              border:`1px solid ${withdrawn?"#FECACA":"rgba(0,0,0,0.08)"}`,
              borderRadius:8, marginBottom:8 }}>
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:"#1A1A18" }}>{c.label}</div>
                {c.expires && !withdrawn && (
                  <div style={{ fontSize:11, color:"#8B5500", marginTop:1 }}>Expires {c.expires}</div>
                )}
                {withdrawn && (
                  <div style={{ fontSize:11, color:"#A32D2D", marginTop:1 }}>Withdrawn · recording scheduled for deletion</div>
                )}
              </div>
              {withdrawn
                ? <span style={{ fontSize:11, background:"#FCEBEB", color:"#A32D2D",
                    borderRadius:100, padding:"2px 8px", fontWeight:700 }}>Withdrawn</span>
                : <button onClick={() => setView("withdraw-confirm")}
                    style={{ fontSize:11, padding:"4px 10px", borderRadius:6, cursor:"pointer",
                      border:"1px solid rgba(0,0,0,0.12)", background:"white", color:"#555" }}>
                    Withdraw →
                  </button>
              }
            </div>
          );
        })}
      </div>

      {/* C1 section */}
      <div style={{ marginBottom:20 }}>
        <div style={{ fontSize:11, fontWeight:700, color:"#888", textTransform:"uppercase",
          letterSpacing:"0.06em", marginBottom:10 }}>AI matching & sourcing</div>
        <div style={{ padding:"10px 12px", background: objected?"#FFF5F5":"white",
          border:`1px solid ${objected?"#FECACA":"rgba(0,0,0,0.08)"}`, borderRadius:8 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
            <div style={{ flex:1, marginRight:10 }}>
              <div style={{ fontSize:13, fontWeight:600, color:"#1A1A18", marginBottom:3 }}>
                Application data & AI matching
              </div>
              <div style={{ fontSize:12, color:"#6B7280", lineHeight:1.5 }}>
                {objected
                  ? "You have objected to this processing. We've stopped using your data for AI matching."
                  : "We use your CV and application answers to match you to roles. This is based on our legitimate business interest."
                }
              </div>
            </div>
            {!objected
              ? <button onClick={() => setView("object-confirm")}
                  style={{ fontSize:11, padding:"4px 10px", borderRadius:6, cursor:"pointer",
                    border:"1px solid rgba(0,0,0,0.12)", background:"white", color:"#555", flexShrink:0 }}>
                  Object →
                </button>
              : <span style={{ fontSize:11, background:"#FEF3E0", color:"#8B5500",
                  borderRadius:100, padding:"2px 8px", fontWeight:700, flexShrink:0 }}>Objected</span>
            }
          </div>
        </div>
      </div>

      {/* Data actions */}
      <div style={{ marginBottom:8 }}>
        <div style={{ fontSize:11, fontWeight:700, color:"#888", textTransform:"uppercase",
          letterSpacing:"0.06em", marginBottom:10 }}>Your data</div>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {[
            { label:"📥  Download all my data", action:"download", color:"#1553AA" },
            { label:"✏️  Update or correct my data", action:"edit", color:"#374151" },
            { label: delRequested ? "🗑️  Deletion requested — we'll confirm within 30 days" : "🗑️  Delete all my data", action:"delete", color: delRequested?"#888":"#A32D2D" },
          ].map(item => (
            <button key={item.action}
              onClick={() => item.action==="delete" && !delRequested ? setView("delete-confirm") : null}
              style={{ padding:"11px 14px", background:"white", border:"1px solid rgba(0,0,0,0.09)",
                borderRadius:8, fontSize:13, color:item.color, cursor: item.action==="delete"&&delRequested?"default":"pointer",
                textAlign:"left", fontWeight: item.action==="delete"?600:400 }}>
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <LinkRow links={["Your rights","Privacy notice","Contact privacy@allps.ai"]} />
      <NoteBlock>
        Portal accessed via time-limited JWT magic link (7-day validity) from confirmation email.
        No new account creation required. Each action creates a logged event and a confirmation email.
        Consent withdrawal: sets withdrawn_at in consent_records.
        Art. 21 objection: creates DPO queue task, stops C1 processing.
        Deletion: creates DSR ticket type=DELETION, 30-day SLA.
      </NoteBlock>
    </ScreenChrome>
  );
}

// ─────────────────────────────────────────────
// SOURCING FLOWS — Art. 14 passive candidate
// ─────────────────────────────────────────────

// ── Stage timeline shared primitive ──────────

function SourcingStage({ n, color, icon, label, sub, active, onClick }) {
  const c = color || "#1553AA";
  return (
    <div onClick={onClick}
      style={{ display:"flex", flexDirection:"column", alignItems:"center", cursor: onClick ? "pointer" : "default",
        opacity: active === false ? 0.4 : 1, transition:"opacity 0.15s" }}>
      <div style={{ width:44, height:44, borderRadius:"50%", background: active ? c : "white",
        border:`2px solid ${c}`, display:"flex", alignItems:"center", justifyContent:"center",
        boxShadow: active ? `0 2px 10px ${c}44` : "none" }}>
        <span style={{ fontSize:18 }}>{icon}</span>
      </div>
      <div style={{ marginTop:6, fontSize:11, fontWeight:700, color: active ? c : "#888",
        textAlign:"center", lineHeight:1.3, maxWidth:80 }}>{label}</div>
      {sub && <div style={{ fontSize:10, color:"#aaa", textAlign:"center", lineHeight:1.3,
        marginTop:2, maxWidth:80 }}>{sub}</div>}
    </div>
  );
}

function SourcingArrow({ label, color }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"0 4px", minWidth:48, marginTop:-18 }}>
      <div style={{ fontSize:10, color: color || "#888", fontWeight:600, marginBottom:2, whiteSpace:"nowrap" }}>{label}</div>
      <div style={{ height:2, width:"100%", background: color ? `${color}44` : "#E5E7EB" }} />
      <div style={{ fontSize:14, color: color || "#CBD5E1", marginTop:-4 }}>▶</div>
    </div>
  );
}

// ── Email screen shell ────────────────────────

function EmailShell({ subject, from, to, date, badge, badgeColor, badgeBg, children }) {
  return (
    <div style={{ maxWidth:520, margin:"0 auto", background:"white", borderRadius:12,
      border:"1px solid rgba(0,0,0,0.1)", overflow:"hidden",
      fontFamily:"-apple-system,'Segoe UI',Arial,sans-serif",
      boxShadow:"0 4px 20px rgba(0,0,0,0.08)" }}>
      {/* Email client chrome */}
      <div style={{ background:"#F5F4F2", padding:"10px 16px", borderBottom:"1px solid rgba(0,0,0,0.07)",
        display:"flex", alignItems:"center", gap:8 }}>
        <div style={{ display:"flex", gap:5 }}>
          {["#FF5F57","#FEBC2E","#28C840"].map((c,i) => (
            <div key={i} style={{ width:10, height:10, borderRadius:"50%", background:c }} />
          ))}
        </div>
        <div style={{ fontSize:11, color:"#888", marginLeft:8, flex:1, textAlign:"center" }}>
          {subject}
        </div>
        {badge && (
          <span style={{ background:badgeBg||"#EEF2FE", color:badgeColor||"#1553AA",
            borderRadius:100, padding:"1px 8px", fontSize:10, fontWeight:700 }}>{badge}</span>
        )}
      </div>
      {/* Email header */}
      <div style={{ padding:"14px 20px 10px", borderBottom:"1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize:14, fontWeight:700, color:"#1A1A18", marginBottom:6 }}>{subject}</div>
        <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
          <div style={{ fontSize:11, color:"#888" }}>
            <span style={{ fontWeight:600 }}>From: </span>{from}
          </div>
          <div style={{ fontSize:11, color:"#888" }}>
            <span style={{ fontWeight:600 }}>To: </span>{to}
          </div>
          <div style={{ fontSize:11, color:"#aaa" }}>{date}</div>
        </div>
      </div>
      {/* Email body */}
      <div style={{ padding:"20px 24px 24px", fontSize:13, color:"#374151", lineHeight:1.7 }}>
        {children}
      </div>
    </div>
  );
}

function EmailBtn({ label, color, ghost }) {
  const c = color || "#1553AA";
  return (
    <div style={{ display:"inline-block", padding:"10px 22px", borderRadius:8, cursor:"pointer",
      background: ghost ? "transparent" : c, color: ghost ? c : "white",
      border:`2px solid ${c}`, fontSize:13, fontWeight:700, marginRight:10, marginTop:4 }}>
      {label}
    </div>
  );
}

function EmailDivider() {
  return <div style={{ height:1, background:"rgba(0,0,0,0.07)", margin:"16px 0" }} />;
}

function EmailSmall({ children }) {
  return <div style={{ fontSize:11, color:"#aaa", lineHeight:1.6, marginTop:4 }}>{children}</div>;
}

// ── Flow 1: Pre-processing LIA check ─────────

function Flow1LIACheck() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      icon:"🔍", color:"#1553AA", label:"Candidate data sourced",
      desc:"Platform identifies a candidate from a public professional profile (e.g. LinkedIn) or a partner CV database.",
      checks:[
        { ok:true,  text:"Source type: public professional profile" },
        { ok:true,  text:"LIA version v1.2 in force and signed off" },
        { ok:null,  text:"Checking: existing processing relationship?" },
      ],
    },
    {
      icon:"📋", color:"#8B5500", label:"Duplicate check",
      desc:"Platform checks whether this candidate already exists under a different processing relationship — e.g. they previously applied as an active candidate.",
      checks:[
        { ok:true,  text:"Source type confirmed — eligible for Art. 14 flow" },
        { ok:true,  text:"No existing consent_records or active application found" },
        { ok:true,  text:"No previous Art. 21 objection on file" },
      ],
    },
    {
      icon:"⚖️", color:"#6B3AAA", label:"LIA validation",
      desc:"Platform records the LIA version applied to this sourcing event and confirms the purpose and necessity test are met.",
      checks:[
        { ok:true,  text:"Purpose: suitability assessment and outreach for potential opportunities" },
        { ok:true,  text:"Lawful basis: Legitimate Interest — Art. 6(1)(f)" },
        { ok:true,  text:"LIA v1.2 balancing test: candidate has reasonable professional expectation of contact" },
        { ok:true,  text:"Data minimisation confirmed: only job-relevant fields collected (title, skills, experience, location preference)" },
      ],
    },
    {
      icon:"✅", color:"#1A6B3A", label:"Processing authorised",
      desc:"All checks passed. A sourcing record is created. The 1-month Art. 14 notification clock starts. AI matching may begin.",
      checks:[
        { ok:true,  text:"sourcing_records entry created: candidate_id (hashed), source_type, lia_version, collected_at" },
        { ok:true,  text:"art14_deadline = collected_at + 30 days" },
        { ok:true,  text:"notification_status = PENDING" },
        { ok:true,  text:"AI processing authorised — clock running" },
      ],
    },
  ];

  return (
    <div>
      <div style={{ background:"#EEF4FF", borderRadius:8, padding:"10px 14px",
        marginBottom:20, fontSize:13, color:"#1553AA", lineHeight:1.6 }}>
        <strong>Flow 1 — Pre-processing LIA check.</strong> Runs internally before any AI processing or candidate contact.
        No candidate-facing screen at this stage — this is a system-level gate.
      </div>

      {/* Timeline */}
      <div style={{ display:"flex", alignItems:"center", marginBottom:24, overflowX:"auto", padding:"4px 0" }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center" }}>
            <SourcingStage n={i+1} color={s.color} icon={s.icon} label={s.label}
              active={step === i} onClick={() => setStep(i)} />
            {i < steps.length - 1 && <SourcingArrow color={step > i ? s.color : undefined} />}
          </div>
        ))}
      </div>

      {/* Step detail */}
      <div style={{ background:"white", border:`1.5px solid ${steps[step].color}33`,
        borderRadius:12, padding:18 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
          <span style={{ fontSize:22 }}>{steps[step].icon}</span>
          <div>
            <div style={{ fontSize:14, fontWeight:700, color:"#1A1A18" }}>
              Step {step + 1} — {steps[step].label}
            </div>
            <div style={{ fontSize:12, color:"#6B7280", marginTop:2 }}>{steps[step].desc}</div>
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {steps[step].checks.map((c, i) => (
            <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start",
              padding:"8px 12px", borderRadius:8,
              background: c.ok === true ? "#F0FDF4" : c.ok === false ? "#FFF5F5" : "#FFFBEB",
              border:`1px solid ${c.ok === true ? "#86EFAC" : c.ok === false ? "#FECACA" : "#FCD34D"}` }}>
              <span style={{ fontSize:14, flexShrink:0 }}>
                {c.ok === true ? "✅" : c.ok === false ? "❌" : "⏳"}
              </span>
              <span style={{ fontSize:12, color:"#374151", lineHeight:1.5 }}>{c.text}</span>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:8, marginTop:14, justifyContent:"flex-end" }}>
          {step > 0 && (
            <button onClick={() => setStep(s => s-1)}
              style={{ padding:"6px 14px", borderRadius:6, border:"1px solid rgba(0,0,0,0.12)",
                background:"white", color:"#555", cursor:"pointer", fontSize:12 }}>← Previous</button>
          )}
          {step < steps.length - 1 && (
            <button onClick={() => setStep(s => s+1)}
              style={{ padding:"6px 14px", borderRadius:6, border:"none",
                background:steps[step].color, color:"white", cursor:"pointer", fontSize:12, fontWeight:600 }}>
              Next step →
            </button>
          )}
          {step === steps.length - 1 && (
            <span style={{ fontSize:12, color:"#1A6B3A", fontWeight:600, padding:"6px 14px" }}>
              ✓ All checks passed — Art. 14 clock starts
            </span>
          )}
        </div>
      </div>

      <NoteBlock>
        sourcing_records table fields: candidate_id (hashed), source_type
        (PUBLIC_PROFILE / CV_DATABASE / REFERRAL), lia_version, collected_at, art14_deadline,
        notification_status (PENDING / SENT / ACKNOWLEDGED / OBJECTED / DELETED),
        reengagement_due_at (collected_at + 12 months). Blocked if prior Art. 21 objection exists
        or if active application relationship exists for same candidate.
      </NoteBlock>
    </div>
  );
}

// ── Flow 2: Art. 14 initial notification ─────

function Flow2Art14() {
  const [variant, setVariant] = useState("outreach"); // outreach | standalone

  return (
    <div>
      <div style={{ background:"#FEF9EC", borderRadius:8, padding:"10px 14px",
        marginBottom:20, fontSize:13, color:"#8B5500", lineHeight:1.6 }}>
        <strong>Flow 2 — Art. 14 notification.</strong> Must be sent within 1 month of data collection,
        or included in the first communication if contact occurs sooner. Two variants:
        combined first outreach + Art. 14 notice (recommended), or standalone notice if no immediate outreach.
      </div>

      {/* Deadline strip */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:20 }}>
        {[
          { label:"Notification deadline", value:"Within 1 month", sub:"From date data was first collected", color:"#A32D2D", bg:"#FFF5F5", border:"#FECACA" },
          { label:"If first contact earlier", value:"Include in email", sub:"Art. 14 notice must accompany first outreach", color:"#8B5500", bg:"#FFFBEB", border:"#FCD34D" },
          { label:"On objection", value:"Stop immediately", sub:"Delete sourced data within 30 days", color:"#6B3AAA", bg:"#F5F0FF", border:"#D4C8F5" },
        ].map(item => (
          <div key={item.label} style={{ background:item.bg, border:`1px solid ${item.border}`,
            borderRadius:8, padding:"10px 12px" }}>
            <div style={{ fontSize:10, fontWeight:700, color:item.color, textTransform:"uppercase",
              letterSpacing:"0.05em", marginBottom:4 }}>{item.label}</div>
            <div style={{ fontSize:16, fontWeight:800, color:item.color }}>{item.value}</div>
            <div style={{ fontSize:11, color:"#666", marginTop:2 }}>{item.sub}</div>
          </div>
        ))}
      </div>

      {/* Variant toggle */}
      <div style={{ display:"flex", gap:8, marginBottom:16 }}>
        {[
          { id:"outreach", label:"Combined: First outreach + Art. 14 notice (recommended)" },
          { id:"standalone", label:"Standalone: Art. 14 notice only (no immediate outreach)" },
        ].map(v => (
          <button key={v.id} onClick={() => setVariant(v.id)}
            style={{ padding:"6px 14px", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer",
              background: variant===v.id ? "#8B5500" : "white",
              color: variant===v.id ? "white" : "#555",
              border:`1.5px solid ${variant===v.id ? "#8B5500" : "rgba(0,0,0,0.1)"}` }}>
            {v.label}
          </button>
        ))}
      </div>

      {variant === "outreach" ? (
        <EmailShell
          subject="An opportunity at Bosch Automotive — is this a good time?"
          from="talent@bosch.allps.ai (on behalf of Bosch Automotive CH)"
          to="david.keller@email.com"
          date="14 May 2026 · 09:15"
          badge="Art. 14 Notice included"
          badgeColor="#8B5500"
          badgeBg="#FEF3E0"
        >
          <div>Hi David,</div>
          <div style={{ marginTop:10 }}>
            I'm reaching out from the talent team at <strong>Bosch Automotive CH</strong>.
            Your background in embedded systems engineering caught our attention and we'd love to explore
            whether there could be a good fit for future opportunities on our team.
          </div>
          <div style={{ marginTop:10 }}>
            This isn't a message about a specific open role — we're building relationships with
            engineers whose skills align with where we're headed as a team.
          </div>

          <EmailDivider />

          {/* Art 14 notice block */}
          <div style={{ background:"#F5F4F2", borderRadius:8, padding:"12px 14px", marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:800, color:"#6B7280", textTransform:"uppercase",
              letterSpacing:"0.06em", marginBottom:8 }}>
              📋 How we found you — your privacy rights
            </div>
            <div style={{ fontSize:12, color:"#374151", lineHeight:1.7 }}>
              <strong>Where we found you:</strong> Your publicly available LinkedIn profile.<br/>
              <strong>What we hold:</strong> Your job title, skills, experience, and location preference — no personal contact details beyond this email address.<br/>
              <strong>Why we're using it:</strong> To assess your potential suitability for current and future opportunities at Bosch. This is based on our legitimate business interest in finding the right talent.<br/>
              <strong>How long we keep it:</strong> Up to 12 months. We'll check in at that point to see if you're still open to hearing from us.<br/>
              <strong>Who's involved:</strong> Bosch Automotive CH (data controller) · Allps AI (platform, data processor)
            </div>
          </div>

          <div style={{ fontSize:13, color:"#374151", lineHeight:1.7, marginBottom:14 }}>
            If you're open to a conversation, hit reply or click the button below.
            If this isn't for you, the opt-out link below will remove you from our pipeline immediately
            — no hard feelings.
          </div>

          <div style={{ textAlign:"center", margin:"16px 0" }}>
            <EmailBtn label="Yes, I'm open to a conversation →" color="#1553AA" />
          </div>

          <EmailDivider />

          <EmailSmall>
            Your rights: You can access, correct, delete, or object to the processing of your data at any time.
            Contact: privacy@allps.ai · View our full Privacy Notice.
            To stop hearing from us and have your data deleted: Opt out here.
            This message was sent on behalf of Bosch Automotive CH by Allps AI, Zurich, Switzerland.
          </EmailSmall>
        </EmailShell>
      ) : (
        <EmailShell
          subject="A note about your data — Bosch Automotive CH"
          from="privacy@allps.ai (on behalf of Bosch Automotive CH)"
          to="david.keller@email.com"
          date="14 May 2026 · 09:15"
          badge="Art. 14 Notice"
          badgeColor="#6B3AAA"
          badgeBg="#F5F0FF"
        >
          <div>Hi David,</div>
          <div style={{ marginTop:10 }}>
            We're writing to let you know that <strong>Bosch Automotive CH</strong> has added your
            professional profile to their talent pipeline, powered by Allps AI.
          </div>
          <div style={{ marginTop:10 }}>
            Under data protection law, you have the right to know when your data is being used —
            even when you haven't applied for a role directly. Here's what you need to know.
          </div>

          <EmailDivider />

          {[
            ["Where we found your data", "Your publicly available LinkedIn profile"],
            ["What we hold", "Your job title, skills, experience, and location preference"],
            ["Why we're using it", "To assess your potential suitability for current and future opportunities at Bosch Automotive CH"],
            ["Legal basis", "Legitimate Interest (GDPR Art. 6(1)(f)) — Bosch has a genuine business interest in identifying relevant talent"],
            ["How long we keep it", "Up to 12 months from today. We'll send you a re-engagement check at that point."],
            ["Data controller", "Bosch Automotive CH"],
            ["Data processor", "Allps AI AG, Zurich, Switzerland"],
            ["DPO contact", "privacy@allps.ai"],
          ].map(([k,v]) => (
            <div key={k} style={{ display:"flex", gap:8, fontSize:12, padding:"5px 0",
              borderBottom:"1px solid rgba(0,0,0,0.05)" }}>
              <span style={{ fontWeight:600, color:"#6B7280", minWidth:150, flexShrink:0 }}>{k}</span>
              <span style={{ color:"#374151" }}>{v}</span>
            </div>
          ))}

          <EmailDivider />

          <div style={{ fontSize:13, color:"#374151", lineHeight:1.7, marginBottom:14 }}>
            <strong>Your rights:</strong> You can access, correct, or delete your data at any time.
            You can also <strong>object to this processing</strong> — if you do, we'll stop immediately
            and delete your data within 30 days.
          </div>

          <div style={{ textAlign:"center", margin:"16px 0", display:"flex", gap:10, justifyContent:"center" }}>
            <EmailBtn label="I'm open to opportunities →" color="#1553AA" />
            <EmailBtn label="Remove me" color="#A32D2D" ghost />
          </div>

          <EmailSmall>
            Full privacy notice: allps.ai/privacy · Supervisory authority: Swiss FDPIC (edoeb.admin.ch)
            · This message was sent on behalf of Bosch Automotive CH by Allps AI, Zurich, Switzerland.
          </EmailSmall>
        </EmailShell>
      )}

      <NoteBlock>
        Art. 14(3)(a): notification within 1 month of collection. If first outreach occurs before
        1 month: notice must accompany that communication. Required fields: controller identity,
        processor identity, purpose + legal basis, data categories, source, retention period,
        Art. 21 objection right (must be prominent). Log: notification_sent_at, variant
        (COMBINED_OUTREACH / STANDALONE), notification_status = SENT.
      </NoteBlock>
    </div>
  );
}

// ── Flow 3: Objection handling ────────────────

function Flow3Objection() {
  const [stage, setStage] = useState("email"); // email | stopped | deleted

  return (
    <div>
      <div style={{ background:"#FCEBEB", borderRadius:8, padding:"10px 14px",
        marginBottom:20, fontSize:13, color:"#A32D2D", lineHeight:1.6 }}>
        <strong>Flow 3 — Objection handling.</strong> Triggered when a candidate clicks
        "Opt out / Remove me" in any notification. Processing must stop immediately.
        Data deleted within 30 days. Same Art. 21 pipeline as C1 active candidates.
      </div>

      {/* Stage selector */}
      <div style={{ display:"flex", gap:8, marginBottom:20 }}>
        {[
          { id:"email",   label:"1 — Candidate opts out",   color:"#A32D2D" },
          { id:"stopped", label:"2 — Processing stops",      color:"#8B5500" },
          { id:"deleted", label:"3 — Confirmation sent",     color:"#1A6B3A" },
        ].map(s => (
          <button key={s.id} onClick={() => setStage(s.id)}
            style={{ padding:"6px 16px", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer",
              background: stage===s.id ? s.color : "white",
              color: stage===s.id ? "white" : "#555",
              border:`1.5px solid ${stage===s.id ? s.color : "rgba(0,0,0,0.1)"}` }}>
            {s.label}
          </button>
        ))}
      </div>

      {stage === "email" && (
        <div>
          <div style={{ fontSize:12, color:"#6B7280", marginBottom:12 }}>
            Candidate clicks "Remove me" or "Opt out" in the Art. 14 notification email.
            They land on a simple confirmation page.
          </div>
          <ScreenChrome>
            <div style={{ textAlign:"center", padding:"10px 0" }}>
              <div style={{ fontSize:36, marginBottom:12 }}>🛑</div>
              <div style={{ fontSize:17, fontWeight:700, color:"#1A1A18", marginBottom:8 }}>
                Remove you from Bosch's pipeline?
              </div>
              <div style={{ fontSize:13, color:"#6B7280", lineHeight:1.6, marginBottom:20 }}>
                We'll stop all processing and delete your profile data within 30 days.
                You won't hear from Bosch through this platform again.
              </div>
              <div style={{ background:"#F5F4F2", borderRadius:8, padding:"10px 12px",
                fontSize:12, color:"#374151", lineHeight:1.6, marginBottom:16, textAlign:"left" }}>
                <strong>What will be deleted:</strong><br/>
                Your name, job title, skills, experience, and location preference sourced from your LinkedIn profile.
              </div>
              <div style={{ marginBottom:8 }}>
                <span style={{ fontSize:10, fontWeight:700, color:"#6B7280", marginBottom:4, display:"block" }}>
                  Reason (optional — helps us improve)
                </span>
                <select style={{ width:"100%", padding:"8px 10px", borderRadius:8,
                  border:"1px solid rgba(0,0,0,0.12)", fontSize:12, color:"#374151", background:"white" }}>
                  <option>I'd prefer not to say</option>
                  <option>Not looking for new opportunities</option>
                  <option>Not interested in this company</option>
                  <option>Found this email unexpected</option>
                  <option>Other</option>
                </select>
              </div>
              <PrimaryBtn label="Yes, remove me and delete my data" color="#A32D2D" />
              <SecondaryBtn label="Actually, I'm open to opportunities →" />
            </div>
          </ScreenChrome>
        </div>
      )}

      {stage === "stopped" && (
        <div>
          <div style={{ fontSize:12, color:"#6B7280", marginBottom:12 }}>
            Candidate confirms removal. System actions fire immediately.
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {[
              { status:"done",    icon:"✅", color:"#1A6B3A", bg:"#F0FDF4", border:"#86EFAC",
                title:"Processing stopped immediately",
                desc:"sourcing_records.notification_status = OBJECTED · processing_active = false · stopped_at = NOW()" },
              { status:"done",    icon:"✅", color:"#1A6B3A", bg:"#F0FDF4", border:"#86EFAC",
                title:"DPO queue task created",
                desc:"Art. 21 objection ticket created. type=SOURCING_OBJECTION · deadline = NOW() + 30 days · source = OPT_OUT_LINK" },
              { status:"done",    icon:"✅", color:"#1A6B3A", bg:"#F0FDF4", border:"#86EFAC",
                title:"Future outreach blocked",
                desc:"Candidate added to suppression list. No further outreach from this client can be triggered, regardless of re-sourcing." },
              { status:"pending", icon:"⏳", color:"#8B5500", bg:"#FFFBEB", border:"#FCD34D",
                title:"Data deletion scheduled — within 30 days",
                desc:"Soft-delete triggered. Hard-delete at T+30 days unless legal hold applies." },
            ].map((item, i) => (
              <div key={i} style={{ background:item.bg, border:`1px solid ${item.border}`,
                borderRadius:8, padding:"10px 14px", display:"flex", gap:12, alignItems:"flex-start" }}>
                <span style={{ fontSize:18, flexShrink:0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:item.color }}>{item.title}</div>
                  <div style={{ fontSize:11, fontFamily:"monospace", color:"#6B7280", marginTop:4,
                    lineHeight:1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {stage === "deleted" && (
        <EmailShell
          subject="You've been removed from Bosch's talent pipeline"
          from="privacy@allps.ai (on behalf of Bosch Automotive CH)"
          to="david.keller@email.com"
          date="14 May 2026 · 09:42"
          badge="Deletion confirmed"
          badgeColor="#1A6B3A"
          badgeBg="#E4F5EA"
        >
          <div>Hi David,</div>
          <div style={{ marginTop:10 }}>
            Done. We've removed your profile from <strong>Bosch Automotive CH's</strong> talent
            pipeline and stopped all processing. Your data will be permanently deleted within 30 days.
          </div>
          <EmailDivider />
          <div style={{ display:"flex", flexDirection:"column", gap:6, fontSize:12 }}>
            {[
              ["Request received","14 May 2026 · 09:42"],
              ["Reference","OBJ-2026-0041"],
              ["Processing stopped","Immediately"],
              ["Data deletion","By 13 June 2026"],
            ].map(([k,v]) => (
              <div key={k} style={{ display:"flex", gap:8 }}>
                <span style={{ fontWeight:600, color:"#6B7280", minWidth:150, flexShrink:0 }}>{k}</span>
                <span style={{ color:"#374151" }}>{v}</span>
              </div>
            ))}
          </div>
          <EmailDivider />
          <EmailSmall>
            If you change your mind in the future and want to be considered for Bosch opportunities,
            you're always welcome to apply directly at bosch.com/careers.
            Questions? Contact privacy@allps.ai quoting reference OBJ-2026-0041.
          </EmailSmall>
        </EmailShell>
      )}

      <NoteBlock>
        Objection must stop all processing immediately — not within 30 days, immediately.
        The 30 days is the deletion window, not the processing stop window.
        Suppression list must prevent re-sourcing of the same candidate for the same client.
        Log: objection_source (OPT_OUT_LINK / EMAIL_REPLY / PORTAL), reason_code (optional),
        stopped_at, deletion_scheduled_at.
      </NoteBlock>
    </div>
  );
}

// ── Flow 4: 12-month re-engagement check ─────

function Flow4Reengagement() {
  const [tab, setTab] = useState("positive"); // positive | noresponse | optout

  return (
    <div>
      <div style={{ background:"#F5F0FF", borderRadius:8, padding:"10px 14px",
        marginBottom:20, fontSize:13, color:"#6B3AAA", lineHeight:1.6 }}>
        <strong>Flow 4 — 12-month re-engagement check.</strong> Sent at T+11 months
        (1 month before the 12-month LIA window closes) to all sourced candidates who
        have not yet applied, objected, or been hired. This is not a re-consent request —
        it is an active interest check to maintain proportionality under the LIA.
        Three outcomes: positive response, no response (delete), opt-out (delete + suppress).
      </div>

      {/* Timeline strip */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:1,
        background:"rgba(0,0,0,0.06)", borderRadius:10, overflow:"hidden", marginBottom:20 }}>
        {[
          { label:"Day 0", sub:"Data collected", color:"#1553AA" },
          { label:"Month 1", sub:"Art. 14 notice sent", color:"#8B5500" },
          { label:"Ongoing", sub:"Active opportunities matching", color:"#6B3AAA" },
          { label:"Month 11", sub:"Re-engagement email sent", color:"#A32D2D", active:true },
          { label:"Month 12", sub:"No response → delete", color:"#A32D2D" },
        ].map((item, i) => (
          <div key={i} style={{ padding:"10px 12px", background: item.active ? "#FFF5F5" : "white",
            borderLeft: i>0 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
            <div style={{ fontSize:11, fontWeight:800, color:item.color, marginBottom:2 }}>{item.label}</div>
            <div style={{ fontSize:11, color:"#6B7280", lineHeight:1.4 }}>{item.sub}</div>
            {item.active && <div style={{ fontSize:10, color:"#A32D2D", fontWeight:700, marginTop:4 }}>◀ YOU ARE HERE</div>}
          </div>
        ))}
      </div>

      {/* Outcome selector */}
      <div style={{ display:"flex", gap:8, marginBottom:16 }}>
        {[
          { id:"positive",   label:"✅ Outcome A — Positive response", color:"#1A6B3A" },
          { id:"noresponse", label:"⏳ Outcome B — No response (30 days)", color:"#8B5500" },
          { id:"optout",     label:"🛑 Outcome C — Opts out", color:"#A32D2D" },
        ].map(o => (
          <button key={o.id} onClick={() => setTab(o.id)}
            style={{ padding:"6px 14px", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer",
              flex:1, background: tab===o.id ? o.color : "white",
              color: tab===o.id ? "white" : "#555",
              border:`1.5px solid ${tab===o.id ? o.color : "rgba(0,0,0,0.1)"}` }}>
            {o.label}
          </button>
        ))}
      </div>

      {/* Re-engagement email — shown for all outcomes */}
      <div style={{ marginBottom:16 }}>
        <div style={{ fontSize:11, fontWeight:700, color:"#888", textTransform:"uppercase",
          letterSpacing:"0.06em", marginBottom:10 }}>Re-engagement email (sent at T+11 months)</div>
        <EmailShell
          subject="Still open to hearing about Bosch opportunities?"
          from="talent@bosch.allps.ai (on behalf of Bosch Automotive CH)"
          to="david.keller@email.com"
          date="14 April 2027 · 09:00"
          badge="Re-engagement check"
          badgeColor="#6B3AAA"
          badgeBg="#F5F0FF"
        >
          <div>Hi David,</div>
          <div style={{ marginTop:10 }}>
            Just over a year ago, we added your profile to <strong>Bosch Automotive CH's</strong> talent
            pipeline based on your background in embedded systems engineering.
          </div>
          <div style={{ marginTop:10 }}>
            We wanted to check in — are you still open to hearing about opportunities at Bosch?
          </div>
          <div style={{ marginTop:10, marginBottom:16, display:"flex", gap:10, justifyContent:"center",
            flexWrap:"wrap" }}>
            <EmailBtn label="Yes, keep me in the loop →" color="#1553AA" />
            <EmailBtn label="Remove me" color="#A32D2D" ghost />
          </div>
          <EmailDivider />
          <EmailSmall>
            If we don't hear from you within 30 days, we'll delete your profile automatically —
            no action needed on your part. · Your data has been held since 14 May 2026 under
            Bosch's Legitimate Interest in talent pipeline development. · Privacy: privacy@allps.ai
          </EmailSmall>
        </EmailShell>
      </div>

      {/* Outcome detail */}
      {tab === "positive" && (
        <div style={{ background:"#F0FDF4", border:"1px solid #86EFAC", borderRadius:10, padding:16 }}>
          <div style={{ fontSize:13, fontWeight:700, color:"#1A6B3A", marginBottom:10 }}>
            ✅ Outcome A — Candidate responds positively
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {[
              "sourcing_records.reengagement_confirmed_at = NOW()",
              "sourcing_records.reengagement_due_at = NOW() + 12 months (clock resets)",
              "notification_status = REENGAGED",
              "Candidate enters active outreach phase — recruiter notified",
              "No new consent required — LI processing continues under same lawful basis",
            ].map((t, i) => (
              <div key={i} style={{ display:"flex", gap:8, fontSize:12, color:"#374151" }}>
                <span style={{ color:"#1A6B3A", fontWeight:700, flexShrink:0 }}>→</span>{t}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "noresponse" && (
        <div style={{ background:"#FFFBEB", border:"1px solid #FCD34D", borderRadius:10, padding:16 }}>
          <div style={{ fontSize:13, fontWeight:700, color:"#8B5500", marginBottom:10 }}>
            ⏳ Outcome B — No response within 30 days
          </div>
          <div style={{ fontSize:12, color:"#374151", lineHeight:1.6, marginBottom:12 }}>
            At T+12 months (30 days after the re-engagement email), if no response has been received,
            the nightly deletion job automatically processes this record.
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {[
              "Nightly deletion job: sourcing_records where reengagement_due_at < NOW() AND reengagement_confirmed_at IS NULL AND notification_status != OBJECTED",
              "Soft-delete: sourcing_records.deleted_at = NOW()",
              "Hard-delete: at T+30 day grace period",
              "No email sent — deletion is silent (candidate was warned in the re-engagement email)",
              "Log: deletion_reason = REENGAGEMENT_NO_RESPONSE",
            ].map((t, i) => (
              <div key={i} style={{ display:"flex", gap:8, fontSize:12, color:"#374151",
                fontFamily: i < 4 ? "monospace" : "inherit", lineHeight:1.5 }}>
                <span style={{ color:"#8B5500", fontWeight:700, flexShrink:0 }}>→</span>
                <span style={{ fontSize: i<4 ? 11 : 12 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "optout" && (
        <div style={{ background:"#FFF5F5", border:"1px solid #FECACA", borderRadius:10, padding:16 }}>
          <div style={{ fontSize:13, fontWeight:700, color:"#A32D2D", marginBottom:10 }}>
            🛑 Outcome C — Candidate clicks "Remove me"
          </div>
          <div style={{ fontSize:12, color:"#374151", lineHeight:1.6, marginBottom:10 }}>
            Treated as an Art. 21 objection. Follows the same Flow 3 objection pipeline.
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {[
              "Processing stopped immediately",
              "Candidate added to suppression list for this client",
              "Data deleted within 30 days",
              "Confirmation email sent (same as Flow 3, Stage 3)",
              "notification_status = OBJECTED · suppression_list = true",
            ].map((t, i) => (
              <div key={i} style={{ display:"flex", gap:8, fontSize:12, color:"#374151" }}>
                <span style={{ color:"#A32D2D", fontWeight:700, flexShrink:0 }}>→</span>{t}
              </div>
            ))}
          </div>
        </div>
      )}

      <NoteBlock>
        Re-engagement check is a proportionality measure, not a legal re-consent requirement.
        The lawful basis remains Legitimate Interest throughout — no new consent is created.
        Timing: automated email triggered when reengagement_due_at = NOW() - 30 days.
        Response window: 30 days from send. Auto-delete fires if no reengagement_confirmed_at
        is set by reengagement_due_at. LIA review should be triggered if objection rate
        across re-engagement emails exceeds 20% in any 12-month period.
      </NoteBlock>
    </div>
  );
}

// ── Flow 5: Renewed engagement record ────────

function Flow5Renewed() {
  return (
    <div>
      <div style={{ background:"#E4F5EA", borderRadius:8, padding:"10px 14px",
        marginBottom:20, fontSize:13, color:"#1A6B3A", lineHeight:1.6 }}>
        <strong>Flow 5 — Renewed engagement record.</strong> Triggered when a sourced candidate
        responds positively — either to the Art. 14 notification, a recruiter outreach, or
        the 12-month re-engagement check. The LIA clock resets. The candidate may transition
        to an active C4 talent pool relationship if they apply or express a role-specific interest.
      </div>

      {/* State transition diagram */}
      <div style={{ background:"white", border:"1px solid rgba(0,0,0,0.08)",
        borderRadius:12, padding:20, marginBottom:16 }}>
        <div style={{ fontSize:11, fontWeight:700, color:"#888", textTransform:"uppercase",
          letterSpacing:"0.06em", marginBottom:16 }}>Candidate state transitions</div>
        <div style={{ display:"flex", alignItems:"center", gap:0, overflowX:"auto", flexWrap:"nowrap" }}>
          {[
            { label:"SOURCED", sub:"LI processing\nActive", color:"#1553AA", bg:"#EEF4FF" },
            { label:"NOTIFIED", sub:"Art.14 sent\nAwaiting response", color:"#8B5500", bg:"#FFFBEB" },
            { label:"ENGAGED", sub:"Positive response\nClock reset", color:"#6B3AAA", bg:"#F5F0FF" },
            { label:"APPLICANT", sub:"Applied to a role\nMoves to C1/C2/C3", color:"#1A6B3A", bg:"#E4F5EA" },
          ].map((state, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center" }}>
              <div style={{ background:state.bg, borderRadius:8, padding:"8px 12px",
                border:`1.5px solid ${state.color}33`, minWidth:110, textAlign:"center" }}>
                <div style={{ fontSize:11, fontWeight:800, color:state.color,
                  letterSpacing:"0.04em" }}>{state.label}</div>
                <div style={{ fontSize:10, color:"#6B7280", marginTop:3, lineHeight:1.4,
                  whiteSpace:"pre-line" }}>{state.sub}</div>
              </div>
              {i < 3 && (
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center",
                  padding:"0 6px", minWidth:50 }}>
                  <div style={{ height:1, width:"100%", background:"rgba(0,0,0,0.1)" }} />
                  <div style={{ fontSize:12, color:"#aaa", marginTop:-5 }}>▶</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Also: exit states */}
        <div style={{ marginTop:14, paddingTop:14, borderTop:"1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize:11, fontWeight:600, color:"#888", marginBottom:8 }}>Exit states (at any point)</div>
          <div style={{ display:"flex", gap:10 }}>
            {[
              { label:"OBJECTED", sub:"Art. 21 objection filed — processing stops, delete within 30d", color:"#A32D2D", bg:"#FFF5F5" },
              { label:"DELETED", sub:"Retention window expired, no re-engagement, or deletion request", color:"#6B7280", bg:"#F5F4F2" },
            ].map((state, i) => (
              <div key={i} style={{ background:state.bg, borderRadius:8, padding:"8px 12px",
                border:`1.5px solid ${state.color}33`, flex:1 }}>
                <div style={{ fontSize:11, fontWeight:800, color:state.color }}>{state.label}</div>
                <div style={{ fontSize:11, color:"#6B7280", marginTop:3, lineHeight:1.4 }}>{state.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What changes on re-engagement */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
        <div style={{ background:"white", border:"1px solid rgba(0,0,0,0.08)", borderRadius:10, padding:14 }}>
          <div style={{ fontSize:12, fontWeight:700, color:"#6B3AAA", marginBottom:10 }}>
            What changes in the database
          </div>
          {[
            ["notification_status", "→ REENGAGED"],
            ["reengagement_confirmed_at", "→ NOW()"],
            ["reengagement_due_at", "→ NOW() + 12 months"],
            ["processing_active", "→ true (was already true)"],
            ["recruiter_alerted", "→ true"],
          ].map(([k,v]) => (
            <div key={k} style={{ display:"flex", gap:8, padding:"5px 0",
              borderBottom:"1px solid rgba(0,0,0,0.05)", fontSize:11 }}>
              <span style={{ fontFamily:"monospace", color:"#6B7280", flex:1 }}>{k}</span>
              <span style={{ fontFamily:"monospace", color:"#6B3AAA", fontWeight:600 }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ background:"white", border:"1px solid rgba(0,0,0,0.08)", borderRadius:10, padding:14 }}>
          <div style={{ fontSize:12, fontWeight:700, color:"#1A6B3A", marginBottom:10 }}>
            If candidate applies for a specific role
          </div>
          <div style={{ fontSize:12, color:"#374151", lineHeight:1.7 }}>
            The sourcing relationship transitions to an active candidate relationship.
            A new C1 processing record is created (application & AI matching).
            The sourcing record is retained for audit purposes but its processing purpose
            is superseded. C2/C3/C4 consents are collected through the standard active
            candidate flow (Screens B, C, D).
          </div>
        </div>
      </div>

      <NoteBlock>
        Lawful basis does not change on re-engagement — it remains Legitimate Interest throughout
        the sourcing lifecycle. No new consent is created. If the candidate applies for a specific
        role, a C1 record is created alongside the sourcing record. The sourcing record is kept
        for audit trail — do not delete it when the candidate transitions to active applicant.
        Max sourcing relationship without application: 24 months (two 12-month cycles with
        one positive re-engagement). After 24 months, LIA must be reviewed before continuing.
      </NoteBlock>
    </div>
  );
}

// ── Sourcing flows container ──────────────────

function SourcingFlowsSection() {
  const [flow, setFlow] = useState("overview");

  const flows = [
    { id:"overview",  label:"Overview",                icon:"🗺️" },
    { id:"flow1",     label:"Flow 1 — LIA Check",      icon:"⚖️" },
    { id:"flow2",     label:"Flow 2 — Art. 14 Notice", icon:"📧" },
    { id:"flow3",     label:"Flow 3 — Objection",      icon:"🛑" },
    { id:"flow4",     label:"Flow 4 — Re-engagement",  icon:"🔄" },
    { id:"flow5",     label:"Flow 5 — Renewed Record", icon:"✅" },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ background:"linear-gradient(135deg,#1A4080,#1553AA)", borderRadius:10,
        padding:"14px 18px", marginBottom:20, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <div style={{ fontSize:14, fontWeight:700, color:"white", marginBottom:3 }}>
            🎯 Sourcing & Initial Contact — Passive Candidate Flows
          </div>
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.65)", lineHeight:1.5 }}>
            Art. 14 GDPR notification flows for candidates sourced without direct application.
            Purpose: suitability assessment and outreach for potential opportunities.
            Lawful basis: Legitimate Interest (Art. 6(1)(f)).
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6 }}>
          <span style={{ background:"rgba(255,255,255,0.15)", color:"white",
            borderRadius:6, padding:"3px 10px", fontSize:11, fontWeight:600 }}>5 flows</span>
          <span style={{ background:"rgba(255,255,255,0.15)", color:"white",
            borderRadius:6, padding:"3px 10px", fontSize:11, fontWeight:600 }}>12-month max window</span>
        </div>
      </div>

      {/* Flow nav */}
      <div style={{ display:"flex", gap:6, marginBottom:20, flexWrap:"wrap" }}>
        {flows.map(f => (
          <button key={f.id} onClick={() => setFlow(f.id)}
            style={{ padding:"7px 14px", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer",
              background: flow===f.id ? "#1553AA" : "white",
              color: flow===f.id ? "white" : "#555",
              border:`1.5px solid ${flow===f.id ? "#1553AA" : "rgba(0,0,0,0.1)"}` }}>
            {f.icon} {f.label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {flow === "overview" && (
        <div>
          <div style={{ background:"white", border:"1px solid rgba(0,0,0,0.08)",
            borderRadius:12, padding:20, marginBottom:16 }}>
            <div style={{ fontSize:13, fontWeight:700, color:"#1A1A18", marginBottom:16 }}>
              End-to-end sourcing lifecycle
            </div>

            {/* Full timeline */}
            <div style={{ overflowX:"auto", paddingBottom:8 }}>
              <div style={{ display:"flex", alignItems:"center", minWidth:700 }}>
                {[
                  { icon:"🔍", label:"Data sourced", sub:"Public profile / CV DB", color:"#1553AA", flow:"flow1" },
                  { icon:"⚖️", label:"LIA check", sub:"Flow 1 · Internal", color:"#6B3AAA", flow:"flow1" },
                  { icon:"📧", label:"Art. 14 notice", sub:"Flow 2 · Within 1 month", color:"#8B5500", flow:"flow2" },
                  { icon:"↔️", label:"Candidate responds", sub:"Engaged / Opts out", color:"#374151", flow:null },
                  { icon:"🔄", label:"12-month check", sub:"Flow 4 · T+11 months", color:"#A32D2D", flow:"flow4" },
                  { icon:"✅", label:"Re-engaged / Deleted", sub:"Flow 5 or silent delete", color:"#1A6B3A", flow:"flow5" },
                ].map((step, i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center" }}>
                    <SourcingStage icon={step.icon} label={step.label} sub={step.sub}
                      color={step.color} active={true}
                      onClick={step.flow ? () => setFlow(step.flow) : null} />
                    {i < 5 && <SourcingArrow color={step.color} />}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ fontSize:11, color:"#aaa", marginTop:10, textAlign:"center" }}>
              Click any stage to jump to the detailed flow
            </div>
          </div>

          {/* Key principles */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {[
              { icon:"⚖️", color:"#8B5500", title:"Lawful basis throughout", desc:"The entire sourcing lifecycle runs on Legitimate Interest — not consent. No consent screen is shown. The Art. 14 notification is a transparency obligation, not a consent request." },
              { icon:"📋", color:"#6B3AAA", title:"Purpose statement", desc:'"Suitability assessment and outreach for potential opportunities." Broad enough to cover ongoing pipeline activity without tying to a single vacancy. LIA must justify the breadth.' },
              { icon:"⏱️", color:"#A32D2D", title:"12-month maximum window", desc:"Best practice limit for LI-based passive candidate data. Not a hard GDPR rule, but a proportionality requirement. After 12 months, re-engagement check or delete." },
              { icon:"🛑", color:"#A32D2D", title:"Objection stops everything", desc:"A candidate's Art. 21 objection must stop all processing immediately — sourcing, matching, outreach. Suppression list prevents re-sourcing for the same client." },
              { icon:"🔄", color:"#1A6B3A", title:"Re-engagement resets the clock", desc:"A positive response to any outreach resets the 12-month window. Max two cycles (24 months total) before a fresh LIA review is required." },
              { icon:"➡️", color:"#1553AA", title:"Transition to active candidate", desc:"If the sourced candidate applies for a role, they enter the active candidate flow. New C1 record created. C2/C3/C4 consents collected via Screens B, C, D." },
            ].map(item => (
              <div key={item.title} style={{ background:"white", border:"1px solid rgba(0,0,0,0.08)",
                borderRadius:10, padding:14 }}>
                <div style={{ display:"flex", gap:8, alignItems:"flex-start", marginBottom:8 }}>
                  <span style={{ fontSize:20 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:"#1A1A18", marginBottom:4 }}>{item.title}</div>
                    <div style={{ fontSize:12, color:"#374151", lineHeight:1.6 }}>{item.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sourcing vs active candidate comparison */}
          <div style={{ marginTop:16, background:"white", border:"1px solid rgba(0,0,0,0.08)",
            borderRadius:10, overflow:"hidden" }}>
            <div style={{ padding:"10px 14px", background:"#F5F4F2", borderBottom:"1px solid rgba(0,0,0,0.07)",
              fontSize:11, fontWeight:700, color:"#555", textTransform:"uppercase", letterSpacing:"0.06em" }}>
              Sourced (passive) vs Applied (active) — key differences
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr" }}>
              <div style={{ padding:"8px 12px", fontSize:11, fontWeight:700, color:"#888",
                background:"#FAFAF8" }}>Dimension</div>
              <div style={{ padding:"8px 12px", borderLeft:"1px solid rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize:11, fontWeight:800, color:"#1553AA" }}>SOURCED (passive)</div>
              </div>
              <div style={{ padding:"8px 12px", borderLeft:"1px solid rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize:11, fontWeight:800, color:"#6B3AAA" }}>APPLIED (active)</div>
              </div>
            </div>
            {[
              ["GDPR article","Art. 14 — data not from subject","Art. 13 — data from subject"],
              ["Transparency obligation","Platform sends Art. 14 notice","Shown at point of application (Screen A)"],
              ["Lawful basis","Legitimate Interest throughout","LI (C1) + Consent for AI features (C2/C3/C4)"],
              ["Candidate action required","None to be processed — opt-out to stop","Active consent for each AI feature"],
              ["Max retention","12 months (proportionality limit)","12 months from application close"],
              ["Objection mechanism","Opt-out link in any email","Art. 21 via Candidate Data Portal (Screen F)"],
              ["Transition path","Can apply → becomes active candidate","N/A (already active)"],
            ].map(([dim,left,right],i) => (
              <div key={dim} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr",
                borderTop:"1px solid rgba(0,0,0,0.06)",
                background: i%2===0 ? "white" : "#FAFAF8" }}>
                <div style={{ padding:"8px 12px", fontSize:12, fontWeight:600, color:"#6B7280" }}>{dim}</div>
                <div style={{ padding:"8px 12px", borderLeft:"1px solid rgba(0,0,0,0.06)", fontSize:12, color:"#374151", lineHeight:1.5 }}>{left}</div>
                <div style={{ padding:"8px 12px", borderLeft:"1px solid rgba(0,0,0,0.06)", fontSize:12, color:"#374151", lineHeight:1.5 }}>{right}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {flow === "flow1" && <Flow1LIACheck />}
      {flow === "flow2" && <Flow2Art14 />}
      {flow === "flow3" && <Flow3Objection />}
      {flow === "flow4" && <Flow4Reengagement />}
      {flow === "flow5" && <Flow5Renewed />}
    </div>
  );
}


// ── SCREEN DETAIL PANEL — tabbed (no sticky) ──

const SCREEN_CONTEXT = {
  A:  { body:"Shown once per application, before the form is submitted. The candidate is not being asked to give consent — the lawful basis is Legitimate Interest. This is a transparency notice: it tells them what happens to their data and that AI matching is involved.", rules:"No toggle. No 'I agree' button. A single 'continue to application' CTA. Candidate can close and proceed. Log that the screen was shown, not 'consented to.'" },
  B:  { body:"Shown after interview scheduling, before recording begins. This is the explicit consent gate for AI screening. The candidate must actively toggle on and click confirm. The 'No thanks' option must offer a human-led alternative with equal visual prominence.", rules:"Toggle off by default. Both CTAs equal in size. Declining routes to a human alternative — it must not end the application. Recording physically blocked until consent is logged." },
  C:  { body:"Separate from Screen B even if both interviews occur in the same process. Each type is independent — a candidate may agree to screening but decline skills assessment. The system must not infer consent for C from consent for B.", rules:"Same pattern as B. Do not pre-tick because B was already granted. consent_type=SKILLS is a separate database record." },
  D:  { body:"Shown at the end of the active hiring process, after the outcome is communicated. Must never appear before the outcome is known — framing it during the application would create implicit pressure to consent.", rules:"Toggle off by default. 'No thanks' deletes data on schedule — not a penalised choice. Set expiry_date and renewal_count=0 at grant time." },
  DR: { body:"Delivered by email 30 days before the consent window expires. The candidate clicks a link and lands on this screen. The expiry date must be shown clearly. 'No thanks' must be equal in prominence and must trigger immediate deletion.", rules:"Show specific expiry date and data categories being renewed. Toggle off by default — candidate must actively renew. Increment renewal_count on grant." },
  E:  { body:"EU AI Act Art. 26(7) disclosure gate. A separate screen from Consent B/C — it logs a different regulatory obligation. Consent B/C establishes the GDPR lawful basis. Screen E records that the candidate was informed of what the AI does and does not assess.", rules:"Full-screen blocking modal. No auto-proceed on timer. Candidate must click. 'I have a question' must not bypass the gate. Logs to interview_disclosures, not consent_records." },
  F:  { body:"The Candidate Data Portal. Accessible from a magic link in any email. Consolidates all data rights: consent withdrawal per type, Art. 21 objection for C1, data download, correction, and deletion request. Each action is fully independent.", rules:"Consent withdrawal (Screens B/C/D) and Art. 21 objection (C1) in visually separate sections with distinct labels. 'Withdraw' vs 'Object.' Deletion shows an impact warning for active applications." },
};

const SCREEN_LOG_ROWS = {
  A:  [["Table","(no consent_records entry — transparency screen only)"],["Event logged","screen_shown_at, lia_version, candidate_id (hashed)"],["Consent type","N/A — Legitimate Interest basis"]],
  B:  [["Table","consent_records"],["consent_type","SCREENING"],["Fields","candidate_id (hashed), version, granted_at or withdrawn_at, method=IN_APP"],["Gate","interview_session.recording_allowed requires SCREENING granted_at IS NOT NULL"]],
  C:  [["Table","consent_records"],["consent_type","SKILLS"],["Fields","candidate_id (hashed), version, granted_at or withdrawn_at, method=IN_APP"],["Gate","skills_session.recording_allowed requires SKILLS granted_at IS NOT NULL"],["Note","Separate row from Consent B — never inferred from B"]],
  D:  [["Table","consent_records"],["consent_type","TALENT_POOL"],["Fields","candidate_id (hashed), version, granted_at, expiry_date (T+6 months), renewal_count=0"],["On decline","No record — data deleted on role closure schedule"]],
  DR: [["Table","consent_records (UPDATE existing row)"],["consent_type","TALENT_POOL"],["Fields updated","granted_at (renewed), expiry_date (renewed_at + 6 months), renewal_count++"],["capture_method","EMAIL_LINK"],["On decline","Immediate soft-delete triggered"]],
  E:  [["Table","interview_disclosures (separate from consent_records)"],["Fields","session_id, candidate_id (hashed), disclosure_version, acknowledged_at"],["Gate","recording.start() blocked until acknowledged_at IS NOT NULL"],["Regulatory basis","EU AI Act Art. 26(7) — separate from GDPR consent log"]],
  F:  [["Withdrawal","consent_records: withdrawn_at = NOW() for selected type"],["Objection","c1_processing_records: processing_active=false, stopped_at=NOW()"],["DSR deletion","dsr_tickets: type=DELETION, deadline=NOW()+30d"],["All actions","confirmation email sent to candidate within 24h"]],
};

function ScreenPreviewComponent({ id }) {
  if (id === "A")  return <ScreenA />;
  if (id === "B")  return <ScreenB />;
  if (id === "C")  return <ScreenC />;
  if (id === "D")  return <ScreenD />;
  if (id === "DR") return <ScreenDR />;
  if (id === "E")  return <ScreenE />;
  if (id === "F")  return <ScreenF />;
  return null;
}

function ScreenDetailPanel({ active, sel }) {
  const [detailTab, setDetailTab] = useState("preview");
  const ctx = SCREEN_CONTEXT[active] || {};
  const logRows = SCREEN_LOG_ROWS[active] || [];

  return (
    <div style={{ background:"white", border:"1px solid rgba(0,0,0,0.08)", borderRadius:12, overflow:"hidden" }}>
      {/* Panel header */}
      <div style={{ padding:"14px 18px 0", borderBottom:"1px solid rgba(0,0,0,0.08)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <div>
            <span style={{ fontSize:15, fontWeight:700, color:"#1A1A18" }}>{sel.label} — {sel.title}</span>
            <span style={{ marginLeft:10 }}>
              <ConsentTag label={sel.tag} color={sel.tagColor} bg={sel.tagBg} />
            </span>
          </div>
        </div>
        {/* Tab bar */}
        <div style={{ display:"flex", gap:0 }}>
          {[
            { id:"preview", label:"📱 Preview" },
            { id:"context", label:"📋 Context & Rules" },
            { id:"log",     label:"🗄️ What Gets Logged" },
          ].map(t => (
            <button key={t.id} onClick={() => setDetailTab(t.id)}
              style={{ padding:"8px 16px", fontSize:12, fontWeight: detailTab===t.id ? 700 : 400,
                color: detailTab===t.id ? "#1553AA" : "#666",
                background:"none", border:"none",
                borderBottom: detailTab===t.id ? "2px solid #1553AA" : "2px solid transparent",
                cursor:"pointer" }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div style={{ padding:"20px 20px 24px" }}>

        {/* PREVIEW TAB */}
        {detailTab === "preview" && (
          <div>
            <div style={{ fontSize:12, color:"#888", marginBottom:16, textAlign:"center" }}>
              Interactive prototype — click toggles, buttons, and flows
            </div>
            <div style={{ display:"flex", justifyContent:"center" }}>
              <ScreenPreviewComponent id={active} />
            </div>
          </div>
        )}

        {/* CONTEXT TAB */}
        {detailTab === "context" && (
          <div>
            <div style={{ fontSize:13, color:"#374151", lineHeight:1.75, marginBottom:16 }}>
              {ctx.body}
            </div>
            <div style={{ background:"#EEF4FF", borderRadius:8, padding:"10px 14px",
              fontSize:12, color:"#1553AA", lineHeight:1.65 }}>
              <strong>Key design rules:</strong> {ctx.rules}
            </div>
          </div>
        )}

        {/* LOG TAB */}
        {detailTab === "log" && (
          <div>
            <div style={{ fontSize:12, color:"#888", marginBottom:12 }}>
              Exact database events and fields that must be written when this screen is interacted with.
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:0, border:"1px solid rgba(0,0,0,0.08)", borderRadius:8, overflow:"hidden" }}>
              {logRows.map(([k, v], i) => (
                <div key={i} style={{ display:"flex", gap:0,
                  background: i % 2 === 0 ? "white" : "#FAFAF8",
                  borderTop: i > 0 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
                  <div style={{ padding:"9px 12px", minWidth:160, flexShrink:0,
                    fontSize:11, fontWeight:700, color:"#6B7280",
                    borderRight:"1px solid rgba(0,0,0,0.06)" }}>
                    {k}
                  </div>
                  <div style={{ padding:"9px 12px", fontSize:11, fontFamily:"monospace",
                    color:"#374151", lineHeight:1.6 }}>
                    {v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── CONSENT SCREENS CONTAINER ─────────────────

function ConsentScreensTab() {
  const [section, setSection] = useState("screens"); // "screens" | "sourcing"
  const [active, setActive]   = useState("A");
  const sel = SCREEN_DEFS.find(s => s.id === active);

  return (
    <div>
      {/* Header */}
      <div style={{ background:"#1A1A18", borderRadius:10, padding:"12px 18px",
        marginBottom:20, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <div style={{ fontSize:14, fontWeight:700, color:"white", marginBottom:3 }}>
            📱 Candidate Consent & Notification Screens
          </div>
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.55)", lineHeight:1.5 }}>
            Active candidate consent screens (A–F) · Passive candidate sourcing flows (Art. 14)
          </div>
        </div>
        <span style={{ background:"rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.8)",
          borderRadius:6, padding:"3px 10px", fontSize:11, fontWeight:600 }}>
          7 consent screens · 5 sourcing flows
        </span>
      </div>

      {/* Section switcher */}
      <div style={{ display:"flex", background:"#F0EDE8", borderRadius:10, padding:4,
        gap:4, marginBottom:24, width:"fit-content" }}>
        <button onClick={() => setSection("screens")}
          style={{ padding:"7px 20px", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer",
            border:"none", background: section==="screens" ? "white" : "transparent",
            color: section==="screens" ? "#1A1A18" : "#888",
            boxShadow: section==="screens" ? "0 1px 4px rgba(0,0,0,0.1)" : "none" }}>
          📱 Consent Screens — Active Candidates
        </button>
        <button onClick={() => setSection("sourcing")}
          style={{ padding:"7px 20px", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer",
            border:"none", background: section==="sourcing" ? "white" : "transparent",
            color: section==="sourcing" ? "#1A1A18" : "#888",
            boxShadow: section==="sourcing" ? "0 1px 4px rgba(0,0,0,0.1)" : "none" }}>
          🎯 Sourcing Flows — Passive Candidates
        </button>
      </div>

      {/* SOURCING FLOWS */}
      {section === "sourcing" && <SourcingFlowsSection />}

      {/* ACTIVE CANDIDATE CONSENT SCREENS */}
      {section === "screens" && (
        <div>
          {/* Screen selector */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:20 }}>
            {SCREEN_DEFS.map(s => (
              <button key={s.id} onClick={() => setActive(s.id)}
                style={{ padding:"8px 14px", borderRadius:10, cursor:"pointer", textAlign:"left",
                  background: active===s.id ? s.tagBg : "white",
                  border:`1.5px solid ${active===s.id ? s.tagColor+"66" : "rgba(0,0,0,0.1)"}`,
                  transition:"all 0.12s" }}>
                <div style={{ fontSize:10, fontWeight:700, color: active===s.id ? s.tagColor : "#888",
                  textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:2 }}>{s.label}</div>
                <div style={{ fontSize:12, fontWeight:600, color: active===s.id ? "#1A1A18" : "#555" }}>{s.title}</div>
                <div style={{ marginTop:4 }}>
                  <span style={{ background: active===s.id ? s.tagBg : "#F5F4F2",
                    color: active===s.id ? s.tagColor : "#888",
                    borderRadius:100, padding:"1px 7px", fontSize:10, fontWeight:700 }}>
                    {s.tag}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Tab bar — Context / Preview / Log */}
          <ScreenDetailPanel active={active} sel={sel} />
        </div>
      )}
    </div>
  );
}


function LogRow({ k, v }) {
  return (
    <div style={{ display:"flex", gap:10, padding:"6px 0", borderBottom:"1px solid rgba(0,0,0,0.05)" }}>
      <span style={{ fontSize:11, fontWeight:600, color:"#888", minWidth:120, flexShrink:0 }}>{k}</span>
      <span style={{ fontSize:11, fontFamily:"monospace", color:"#374151", lineHeight:1.5 }}>{v}</span>
    </div>
  );
}

// ─────────────────────────────────────────────
function ClientDashboard() {
  const [tab, setTab] = useState("essentials");
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

      <TabBar tabs={[
        {id:"essentials", label:"🚀 Essentials"},
        {id:"consent",    label:"🔐 Consent & DSR"},
        {id:"aiact",      label:"🤖 AI Act Obligations"},
        {id:"rights",     label:"⚖️ Data Rights Flows"},
        {id:"screens",    label:"📱 Consent Screens"},
      ]} active={tab} onChange={t=>{setTab(t); setConsentSub("m1"); setAiSub("roles");}} accent="#1553AA" />

      {tab === "essentials" && <SimplifiedGuide />}
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
      {tab === "rights"  && <DataRightsFlows />}
      {tab === "screens" && <ConsentScreensTab />}
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

// ─────────────────────────────────────────────
// PLATFORM — C1 LI PROCESSING REGISTER
// ─────────────────────────────────────────────

function PlatformC1Register() {
  const [filterObj, setFilterObj]   = useState("all");   // all | none | active | resolved | overridden
  const [filterClient, setFilterClient] = useState("all");
  const [drawer, setDrawer]         = useState(null);

  const ACC = "#6B3AAA";

  // ── derived counts for KPI row ──
  const total      = C1_REGISTER.length;
  const activeObj  = C1_REGISTER.filter(r => r.objection === "active").length;
  const resolved   = C1_REGISTER.filter(r => r.objection === "resolved").length;
  const overridden = C1_REGISTER.filter(r => r.objection === "overridden").length;
  const noScreen   = C1_REGISTER.filter(r => !r.screenShown).length;

  // ── filter ──
  const clients = ["all", ...Array.from(new Set(C1_REGISTER.map(r => r.client)))];
  const filtered = C1_REGISTER.filter(r => {
    const objMatch    = filterObj === "all" ? true : filterObj === "none" ? r.objection === "none" : r.objection === filterObj;
    const clientMatch = filterClient === "all" ? true : r.client === filterClient;
    return objMatch && clientMatch;
  });

  // ── objection status badge ──
  function ObjBadge({ status }) {
    const map = {
      none:       { bg:"#F5F4F2", color:"#888",    label:"None" },
      active:     { bg:"#FCEBEB", color:"#A32D2D", label:"Active" },
      resolved:   { bg:"#E4F5EA", color:"#1A6B3A", label:"Resolved" },
      overridden: { bg:"#FEF3E0", color:"#8B5500", label:"Overridden" },
    };
    const s = map[status] || map.none;
    return <span style={{ background:s.bg, color:s.color, borderRadius:100, padding:"2px 8px", fontSize:11, fontWeight:700 }}>{s.label}</span>;
  }

  // ── processing status badge ──
  function ProcBadge({ active }) {
    return active
      ? <span style={{ background:"#E4F5EA", color:"#1A6B3A", borderRadius:100, padding:"2px 8px", fontSize:11, fontWeight:700 }}>● Active</span>
      : <span style={{ background:"#F5E4E4", color:"#7A1E1E", borderRadius:100, padding:"2px 8px", fontSize:11, fontWeight:700 }}>■ Stopped</span>;
  }

  const sel = drawer ? C1_REGISTER.find(r => r.id === drawer) : null;

  return (
    <div>
      {/* ── View 1: LIA Status Panel ── */}
      <div style={{ background:"#F3EFFE", border:"1px solid #D4C8F5", borderRadius:10, padding:16, marginBottom:20 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
          <div>
            <div style={{ fontSize:13, fontWeight:700, color:ACC, marginBottom:2 }}>LIA Document — Platform Level</div>
            <div style={{ fontSize:11, color:"#777" }}>GDPR Art. 6(1)(f) · R-01 · Owner: CPO · Scope: CV parsing, AI matching, AI sourcing</div>
          </div>
          <div style={{ display:"flex", gap:6 }}>
            <span style={{ background:"#E4F5EA", color:"#1A6B3A", borderRadius:100, padding:"3px 10px", fontSize:11, fontWeight:700 }}>✓ Signed Off</span>
            <span style={{ background:"#EEF2FE", color:"#2D52C0", borderRadius:100, padding:"3px 10px", fontSize:11, fontWeight:600 }}>{C1_LIA.version}</span>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:12 }}>
          {[
            ["Signed off by",    C1_LIA.signedBy,    false],
            ["Sign-off date",    C1_LIA.signedOff,   false],
            ["Next review due",  C1_LIA.nextReview,  false],
            ["Active objections",activeObj,           activeObj > 0],
          ].map(([label, val, warn]) => (
            <div key={label} style={{ background: warn ? "#FCEBEB" : "white", borderRadius:8, padding:"10px 12px", border:`1px solid ${warn ? "#F09595" : "rgba(0,0,0,0.07)"}` }}>
              <div style={{ fontSize:10, fontWeight:600, color:"#888", textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:4 }}>{label}</div>
              <div style={{ fontSize:13, fontWeight:700, color: warn ? "#A32D2D" : "#1A1A18" }}>{String(val)}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
          {[
            ["Purpose test",    C1_LIA.purposeTest],
            ["Necessity test",  C1_LIA.necessityTest],
            ["Balancing test",  C1_LIA.balancingTest],
          ].map(([label, val]) => (
            <div key={label} style={{ background:"white", borderRadius:8, padding:"10px 12px", border:"1px solid rgba(0,0,0,0.07)" }}>
              <div style={{ fontSize:10, fontWeight:700, color:ACC, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:4 }}>{label}</div>
              <div style={{ fontSize:12, color:"#444", lineHeight:1.5 }}>{val}</div>
            </div>
          ))}
        </div>
        {activeObj > 0 && (
          <div style={{ marginTop:12, background:"#FCEBEB", border:"1px solid #F09595", borderRadius:8, padding:"10px 14px", fontSize:12, color:"#A32D2D" }}>
            <strong>⚠ {activeObj} active objection{activeObj > 1 ? "s" : ""} require resolution.</strong> Under GDPR Art. 21, processing must remain stopped until either the objection is resolved or compelling legitimate grounds are documented. If objections concentrate around a single client or role type, the LIA balancing test should be reviewed.
          </div>
        )}
      </div>

      {/* ── KPI row ── */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:10, marginBottom:20 }}>
        <KpiCard icon="📋" value={total}      label="Processing Records"      />
        <KpiCard icon="🔴" value={activeObj}  label="Active Objections"       warn={activeObj > 0} />
        <KpiCard icon="✅" value={resolved}   label="Objections Resolved"     accent="#1A6B3A" />
        <KpiCard icon="⚖️" value={overridden} label="Overridden (Grounds)"    warn={overridden > 0} />
        <KpiCard icon="👁" value={noScreen}   label="Screen Not Shown"        warn={noScreen > 0} />
      </div>

      {/* ── View 2: Per-application C1 Register table ── */}
      <InfoBanner color="blue" icon="ℹ️" text="Each row is one application event (candidate × client × role). Tracking unit is per application — a candidate who objects for one client does not automatically trigger an objection for another. Art. 21 objections stop processing for that specific relationship only." />

      {/* Filters */}
      <div style={{ display:"flex", gap:10, marginBottom:14, flexWrap:"wrap", alignItems:"center" }}>
        <div style={{ display:"flex", gap:6 }}>
          {["all","none","active","resolved","overridden"].map(f => (
            <button key={f} onClick={() => setFilterObj(f)}
              style={{ padding:"4px 12px", borderRadius:100, fontSize:11, fontWeight:600, cursor:"pointer",
                background: filterObj === f ? ACC : "#F0EDE8",
                color: filterObj === f ? "white" : "#555",
                border:`1px solid ${filterObj === f ? ACC : "rgba(0,0,0,0.1)"}` }}>
              {f === "all" ? "All objections" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div style={{ display:"flex", gap:6, marginLeft:"auto" }}>
          <select value={filterClient} onChange={e => setFilterClient(e.target.value)}
            style={{ padding:"4px 10px", borderRadius:6, fontSize:12, border:"1px solid rgba(0,0,0,0.12)", color:"#444", background:"white", cursor:"pointer" }}>
            {clients.map(c => <option key={c} value={c}>{c === "all" ? "All clients" : c}</option>)}
          </select>
        </div>
      </div>

      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead>
          <tr style={{ background:"#F3F0FA" }}>
            <Th>Record ID</Th>
            <Th>Candidate</Th>
            <Th>Client</Th>
            <Th>Role</Th>
            <Th>LIA Ver.</Th>
            <Th>Processing Started</Th>
            <Th>Transparency Screen</Th>
            <Th>Objection</Th>
            <Th>Processing</Th>
            <Th></Th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(r => (
            <tr key={r.id}
              style={{ background: r.objection === "active" ? "#FFF5F5" : r.objection === "overridden" ? "#FFFAF0" : "white" }}>
              <Td><span style={{ fontFamily:"monospace", fontSize:11, color:"#888" }}>{r.id}</span></Td>
              <Td><span style={{ fontFamily:"monospace", fontSize:11 }}>{r.candidate}</span></Td>
              <Td><span style={{ fontWeight:600, fontSize:12 }}>{r.client}</span></Td>
              <Td muted><span style={{ fontSize:12 }}>{r.role}</span></Td>
              <Td><span style={{ background:"#EEF2FE", color:"#2D52C0", borderRadius:100, padding:"1px 7px", fontSize:10, fontWeight:600 }}>{r.liaVer}</span></Td>
              <Td muted><span style={{ fontSize:12 }}>{r.started}</span></Td>
              <Td>
                {r.screenShown
                  ? <span style={{ fontSize:14, color:"#1A6B3A" }}>✓</span>
                  : <span style={{ background:"#FEF3E0", color:"#8B5500", borderRadius:100, padding:"1px 7px", fontSize:11, fontWeight:600 }}>Not shown</span>
                }
              </Td>
              <Td><ObjBadge status={r.objection} /></Td>
              <Td><ProcBadge active={r.processingActive} /></Td>
              <Td>
                <Btn size="sm" variant="ghost" onClick={() => setDrawer(drawer === r.id ? null : r.id)}>
                  {r.objection !== "none" ? "Review" : "Detail"}
                </Btn>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── View 3: Objection Detail Drawer ── */}
      {sel && (
        <div style={{ margin:"14px 0", background:"#F7F6F3", borderRadius:10, padding:18, border:"1px solid rgba(0,0,0,0.08)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
            <div>
              <div style={{ fontWeight:700, fontSize:14 }}>{sel.candidate} — {sel.role} @ {sel.client}</div>
              <div style={{ fontSize:11, color:"#888", marginTop:2 }}>Record {sel.id} · LIA {sel.liaVer} · Processing started {sel.started}</div>
            </div>
            <button onClick={() => setDrawer(null)}
              style={{ fontSize:12, color:"#888", background:"none", border:"none", cursor:"pointer", padding:"4px 8px" }}>
              Close ✕
            </button>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
            {/* Left: Processing record */}
            <div style={{ background:"white", borderRadius:8, padding:14, border:"1px solid rgba(0,0,0,0.07)" }}>
              <div style={{ fontSize:11, fontWeight:700, color:"#888", textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:10 }}>Processing Record</div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {[
                  ["Lawful basis",        "Legitimate Interest (GDPR Art. 6(1)(f))"],
                  ["LIA version",         sel.liaVer],
                  ["Processing started",  sel.started],
                  ["Transparency screen", sel.screenShown ? "Shown and acknowledged" : "⚠ Not shown — review required"],
                  ["Processing status",   sel.processingActive ? "Active" : `Stopped ${sel.stoppedAt}`],
                ].map(([k, v]) => (
                  <div key={k} style={{ display:"flex", gap:8 }}>
                    <span style={{ fontSize:11, fontWeight:600, color:"#888", minWidth:130, flexShrink:0 }}>{k}</span>
                    <span style={{ fontSize:12, color: k === "Transparency screen" && !sel.screenShown ? "#8B5500" : "#1A1A18" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Objection record */}
            <div style={{ background:"white", borderRadius:8, padding:14, border:`1px solid ${sel.objection === "active" ? "#F09595" : sel.objection === "overridden" ? "#F5D08A" : "rgba(0,0,0,0.07)"}` }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                <div style={{ fontSize:11, fontWeight:700, color:"#888", textTransform:"uppercase", letterSpacing:"0.05em" }}>Art. 21 Objection Record</div>
                {sel.objection !== "none" && <ObjBadge status={sel.objection} />}
              </div>
              {sel.objection === "none" ? (
                <div style={{ fontSize:12, color:"#888", fontStyle:"italic" }}>No objection filed for this processing record.</div>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {[
                    ["Objection filed",   sel.objDate],
                    ["Filed via",         "Candidate Data Portal"],
                    ["Assigned to",       sel.assignee],
                    ["Status",            sel.objStatus],
                    ["Processing stopped",sel.stoppedAt || "—"],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display:"flex", gap:8 }}>
                      <span style={{ fontSize:11, fontWeight:600, color:"#888", minWidth:130, flexShrink:0 }}>{k}</span>
                      <span style={{ fontSize:12, color:"#1A1A18", textTransform:"capitalize" }}>{v}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Compelling grounds — only shown when overridden */}
          {sel.objection === "overridden" && sel.grounds && (
            <div style={{ background:"#FEF3E0", border:"1px solid #F5D08A", borderRadius:8, padding:"12px 14px", marginBottom:12 }}>
              <div style={{ fontSize:11, fontWeight:700, color:"#8B5500", textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:6 }}>
                ⚖️ Compelling Legitimate Grounds — GDPR Art. 21(1)
              </div>
              <div style={{ fontSize:13, color:"#1A1A18", lineHeight:1.6 }}>{sel.grounds}</div>
            </div>
          )}

          {/* Active objection action strip */}
          {sel.objection === "active" && (
            <div style={{ background:"#FCEBEB", border:"1px solid #F09595", borderRadius:8, padding:"12px 14px" }}>
              <div style={{ fontSize:11, fontWeight:700, color:"#A32D2D", textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:6 }}>
                🔴 Action Required — Active Objection
              </div>
              <div style={{ fontSize:12, color:"#791F1F", lineHeight:1.6, marginBottom:10 }}>
                Processing has been stopped for this record. The DPO must either (a) confirm deletion and mark the objection as resolved, or (b) document compelling legitimate grounds to override the objection under Art. 21(1) and seek legal sign-off.
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <Btn size="sm" accent="#1A6B3A">Mark Resolved</Btn>
                <Btn size="sm" variant="ghost" accent="#8B5500">Document Override Grounds</Btn>
              </div>
            </div>
          )}

          {/* Screen not shown warning */}
          {!sel.screenShown && (
            <div style={{ background:"#FEF3E0", border:"1px solid #F5D08A", borderRadius:8, padding:"10px 14px", marginTop:10 }}>
              <div style={{ fontSize:12, color:"#8B5500", lineHeight:1.5 }}>
                <strong>⚠ Transparency screen was not shown</strong> for this application event. While C1 rests on Legitimate Interest (not consent), best practice per R-02 / Consent Screen A requires showing a transparency acknowledgement at application start. This should be investigated and remediated for future applications under this client-role combination.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// PLATFORM — SIMPLIFIED GUIDE
// ─────────────────────────────────────────────

const PLATFORM_SIX_IMMEDIATE = [
  {
    id:"P1", n:"P1", status:"overdue",
    title: "Run the deletion engine every night",
    plain: "Every night, automatically delete candidate data that has passed its keep window. Unsuccessful profiles at 12 months. Interview recordings at 6 months after role closure. Talent pool profiles that weren't renewed. Log what was deleted. Alert the team if the job fails.",
    notDoing: "You're holding data you're no longer allowed to hold. Regulators specifically look for companies with no deletion schedule. This is a violation even if no one ever misused the data.",
    done: "A scheduled job runs nightly at 02:00 UTC. Its log shows what was deleted and why. If it fails, an on-call alert fires within 1 hour. You can show a regulator the deletion log for any date.",
    effort: "~2 days backend / DevOps", cat: "data", catLabel: "Data Infrastructure",
  },
  {
    id:"P2", n:"P2", status:"overdue",
    title: "Route and track every data request with a 30-day deadline",
    plain: "When a candidate asks to see, fix, or delete their data, that request must land in a ticket system with a 30-day countdown, an assigned owner, and an automatic acknowledgement email to the candidate within 24 hours. You see all clients together here — this is the platform-level pipeline.",
    notDoing: "Requests land in an inbox with no tracking. Missing the 30-day window triggers a formal breach notification requirement you then have to file with a supervisory authority.",
    done: "Every data request creates a ticket with: candidate ID, request type, filed date, 30-day deadline, assigned owner. Acknowledgement email fires automatically within 24 hours. Completed tickets send a confirmation to the candidate.",
    effort: "~3 days backend + workflow tool", cat: "data", catLabel: "Data Infrastructure",
  },
  {
    id:"P3", n:"P3", status:"overdue",
    title: "Log every AI decision — permanently and tamper-proof",
    plain: "Every time an AI module produces an output — a match score, a screening result, a skills assessment — write that event to an append-only log. The log must record: which AI module and version ran, which candidate (hashed), which client, what happened, and whether a human reviewed it and what they decided.",
    notDoing: "You have no audit trail. If a candidate challenges their AI assessment, or a regulator asks for records, you cannot prove anything about what the AI decided or whether a human was involved.",
    done: "Every AI pipeline step writes to an immutable audit log. You can pull the full log for any candidate within minutes. Log retention is minimum 6 months. No log entry can be edited or deleted.",
    effort: "~3 days backend", cat: "data", catLabel: "Data Infrastructure",
  },
  {
    id:"P10", n:"P10", status:"overdue",
    title: "AI literacy training — complete it for all relevant staff right now",
    plain: "Everyone on the team who works with the AI hiring features — engineers who build the models, product managers who define the features, customer-facing staff who advise clients — must have completed basic AI literacy training. This was legally required since February 2025. If anyone hasn't done it, that is a live compliance gap today.",
    notDoing: "The February 2025 deadline has passed. If staff haven't completed this, you are already non-compliant. This is one of the simplest items to fix — and one of the easiest for a regulator to check.",
    done: "Every relevant staff member has a completion record: name, role, date completed, training version. Overdue staff are enrolled immediately. New joiners complete it within their first 30 days.",
    effort: "~1 day admin + training time", cat: "internal", catLabel: "Internal Team",
  },
];

const PLATFORM_SIX_MONTH12 = [
  {
    id:"P4", n:"P4", status:"month1",
    title: "Build and maintain the candidate self-service portal",
    plain: "This is the portal candidates use to see their data, withdraw consent, object to processing, and download or delete everything. The platform builds and hosts this — it is the backend to everything clients see in their consent dashboard. Access via magic link in confirmation emails, no account creation needed.",
    notDoing: "Without the portal, candidates have no way to exercise their rights without emailing support. The client consent dashboard shows statuses but nothing updates if there is no portal triggering the changes.",
    done: "Portal accessible via magic link. Shows: stored data, consent status per type (C2/C3/C4), C1 processing status. Has working buttons for: withdraw consent (each type independently), delete all data, download data. Each action creates a logged event and a confirmation email.",
    effort: "~1 week full-stack", cat: "candidate", catLabel: "Candidate Control",
  },
  {
    id:"P5", n:"P5", status:"month2",
    title: "Enforce that processing actually stops when consent is withdrawn",
    plain: "When a candidate withdraws consent for a screening interview, the AI pipeline must be physically blocked from running for that candidate. Not just a database flag that says 'withdrawn' — the pipeline step must fail gracefully if it checks and finds no valid consent. Same for C1 objections.",
    notDoing: "The consent dashboard shows 'withdrawn' but the AI might still process the candidate if the pipeline doesn't check. The record says compliant. The system is not. This is the enforcement layer that makes the client's consent dashboard meaningful.",
    done: "Every AI pipeline step checks consent status before running. If consent is withdrawn for that step type, the step fails gracefully and routes to human review. This check is middleware-level — not an optional application check that can be bypassed.",
    effort: "~3 days backend middleware", cat: "candidate", catLabel: "Candidate Control",
  },
  {
    id:"P11", n:"P11", status:"month2",
    title: "Gate AI features behind a completed client onboarding checklist",
    plain: "Before a client can turn on any AI hiring feature, they must have: received an AI briefing, signed a Data Processing Agreement, confirmed they have added an AI disclosure to job postings, and confirmed they have a candidate rights page. The platform must enforce this as a gate — not a recommendation.",
    notDoing: "Clients are using AI hiring features without completing their own legal obligations as deployers. If something goes wrong, Allps AI shares the liability. The onboarding checklist is currently informational — it must become a hard gate in the client activation flow.",
    done: "AI features (scheduling AI interviews, enabling AI matching) cannot be activated for a client until all four onboarding items are marked complete. The activation flow checks the checklist and blocks if any item is pending. Checklist status is visible in the Platform Deployer Onboarding tab.",
    effort: "~2 days backend + client onboarding UI", cat: "internal", catLabel: "Internal Team",
  },
];

const PLATFORM_AUG2026 = [
  {
    id:"P6", n:"P6", status:"aug2026",
    title: "Write a Technical File for each AI module — before August 2026",
    plain: "For each of the four AI modules (sourcing, matching, screening interview, skills interview), write a document that describes: what the AI does, what data it uses, what it does not use, how it was tested, what its known limitations are, and how humans stay in control. This is an internal compliance record — it is not public. You cannot register with the EU AI database without it.",
    notDoing: "Without Technical Files, you cannot legally deploy high-risk AI in hiring contexts in the EU after August 2026. It is also the foundation for everything else in this category — bias test reports and DPIAs reference it.",
    done: "One Technical File per module, all four complete before 1 July 2026 (to leave time for registration). Each covers: system description, data inputs used and excluded, performance metrics, known limitations, human oversight mechanisms, version history. Stored in compliance register. Updated on every model version change.",
    effort: "~1 week per module (documentation work)", cat: "ai", catLabel: "AI Safety Proof",
  },
  {
    id:"P7", n:"P7", status:"aug2026",
    title: "Test each AI module for bias before it goes live and after every update",
    plain: "Before any AI model is deployed to production — and after every significant update — run a test checking whether the model's pass rates differ significantly across gender, age band, and ethnicity. Use the 80% rule: if any group's pass rate is less than 80% of the highest-passing group, investigate before deploying. This test must be a mandatory step in your deployment pipeline.",
    notDoing: "You're deploying AI that might systematically disadvantage candidates based on protected characteristics. Even without intent, if the model produces biased outputs and you didn't test for it, you're liable.",
    done: "Bias test suite runs automatically as a CI/CD gate on every model update. Deployment is blocked if any protected group falls below the 80% threshold. Test reports are stored in the compliance register with model version tag. You can show a regulator the test history for any model version.",
    effort: "~1 week to build the test pipeline + integrate into CI/CD", cat: "ai", catLabel: "AI Safety Proof",
  },
  {
    id:"P8", n:"P8", status:"aug2026",
    title: "Document the privacy risks of each AI feature before it goes live",
    plain: "For each AI feature that makes decisions about candidates — AI matching, screening interview, skills interview — write a short document assessing the privacy risks before it launches. Cover: what data is processed, why, what the risks are, and what you're doing about them. Your DPO must sign off. Three documents total.",
    notDoing: "Launching AI features that process candidate data without a prior risk assessment is a GDPR requirement gap. If a data breach or discrimination claim occurs, not having done this assessment significantly worsens the regulatory outcome.",
    done: "Three DPIAs completed: AI Matching, AI Screening Interview, AI Skills Interview. Each covers: data description, processing purpose, risk matrix (likelihood × severity), mitigations, residual risk, DPO sign-off. Stored in compliance register. Reviewed annually or on significant system changes.",
    effort: "~2–3 days per DPIA (documentation + DPO review)", cat: "ai", catLabel: "AI Safety Proof",
  },
  {
    id:"P9", n:"P9", status:"aug2026",
    title: "Register all four AI modules in the EU's public database before 2 August 2026",
    plain: "The EU AI Act requires all high-risk AI systems to be registered in a public database. All four of Allps AI's AI modules are high-risk. This is a one-time registration task. It cannot happen until Technical Files (P6) are complete. Because Allps AI is based in Switzerland, check with legal whether you need to appoint an EU legal representative first.",
    notDoing: "After 2 August 2026, operating unregistered high-risk AI systems in hiring contexts is a direct EU AI Act violation. This is a hard regulatory deadline — there is no grace period.",
    done: "All four modules registered in the EU AI database (ai-database.eu) before 2 August 2026. Registration IDs stored in compliance register. Legal representative question resolved before starting. Technical Files complete and referenced in registration.",
    effort: "~1–2 days admin (after Technical Files are done)", cat: "ai", catLabel: "AI Safety Proof",
  },
];

const ALL_PLATFORM_ITEMS = [...PLATFORM_SIX_IMMEDIATE, ...PLATFORM_SIX_MONTH12, ...PLATFORM_AUG2026];

const P_CAT_COLORS = {
  data:      { color:"#A32D2D", bg:"#FFF5F5", border:"#FECACA", label:"Data Infrastructure" },
  candidate: { color:"#8B5500", bg:"#FFFBEB", border:"#FCD34D", label:"Candidate Control" },
  ai:        { color:"#6B3AAA", bg:"#F5F0FF", border:"#D4C8F5", label:"AI Safety Proof" },
  internal:  { color:"#1553AA", bg:"#EEF4FF", border:"#BFDBFE", label:"Internal Team" },
};

const P_STATUS_MAP = {
  overdue:  { bg:"#FCEBEB", color:"#A32D2D", label:"⚠ Overdue — act now" },
  month1:   { bg:"#FFF5F5", color:"#A32D2D", label:"Month 1–2" },
  month2:   { bg:"#FFFBEB", color:"#8B5500", label:"Month 1–2" },
  aug2026:  { bg:"#F5F0FF", color:"#6B3AAA", label:"Before Aug 2026" },
};

function PlatformGuideCard({ item, expanded, onToggle }) {
  const cat  = P_CAT_COLORS[item.cat] || P_CAT_COLORS.data;
  const stat = P_STATUS_MAP[item.status] || P_STATUS_MAP.month2;
  return (
    <div style={{ border:`1.5px solid ${cat.color}33`, borderRadius:10, overflow:"hidden", marginBottom:10 }}>
      <button onClick={onToggle}
        style={{ width:"100%", padding:"13px 16px", display:"flex", alignItems:"center", gap:14,
          background: expanded ? `${cat.color}08` : "white", border:"none", cursor:"pointer", textAlign:"left" }}>
        {/* ID pill */}
        <div style={{ width:36, height:36, borderRadius:8, background:cat.color, display:"flex",
          alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <span style={{ color:"white", fontWeight:800, fontSize:12 }}>{item.n}</span>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3 }}>
            <span style={{ fontSize:14, fontWeight:700, color:"#1A1A18" }}>{item.title}</span>
          </div>
          <div style={{ fontSize:12, color:"#555", lineHeight:1.4 }}>{item.plain}</div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4, flexShrink:0, minWidth:120 }}>
          <span style={{ background:stat.bg, color:stat.color, borderRadius:100,
            padding:"2px 9px", fontSize:10, fontWeight:700, whiteSpace:"nowrap" }}>{stat.label}</span>
          <span style={{ background:cat.bg, color:cat.color, borderRadius:100,
            padding:"2px 9px", fontSize:10, fontWeight:600, whiteSpace:"nowrap" }}>{cat.label}</span>
          <span style={{ fontSize:11, color:"#aaa" }}>{expanded ? "▲ Less" : "▼ Details"}</span>
        </div>
      </button>
      {expanded && (
        <div style={{ padding:16, borderTop:`1px solid ${cat.color}22`, background:"white" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
            <div style={{ background:"#FFF5F5", border:"1px solid #FECACA", borderRadius:8, padding:12 }}>
              <div style={{ fontSize:10, fontWeight:800, color:"#A32D2D", textTransform:"uppercase",
                letterSpacing:"0.06em", marginBottom:6 }}>If you skip this</div>
              <div style={{ fontSize:12, color:"#374151", lineHeight:1.6 }}>{item.notDoing}</div>
            </div>
            <div style={{ background:"#F0FDF4", border:"1px solid #86EFAC", borderRadius:8, padding:12 }}>
              <div style={{ fontSize:10, fontWeight:800, color:"#1A6B3A", textTransform:"uppercase",
                letterSpacing:"0.06em", marginBottom:6 }}>Definition of done</div>
              <div style={{ fontSize:12, color:"#374151", lineHeight:1.6 }}>{item.done}</div>
            </div>
            <div style={{ background:"#F5F4F2", border:"1px solid rgba(0,0,0,0.08)", borderRadius:8, padding:12 }}>
              <div style={{ fontSize:10, fontWeight:800, color:"#6B7280", textTransform:"uppercase",
                letterSpacing:"0.06em", marginBottom:6 }}>Effort estimate</div>
              <div style={{ fontSize:13, fontWeight:700, color:"#1A1A18", marginBottom:4 }}>{item.effort}</div>
              <div style={{ fontSize:11, color:"#6B7280" }}>Single focused engineer unless noted. Add buffer for review and QA.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PlanBlock({ block }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background:"white", border:"1px solid rgba(0,0,0,0.09)", borderRadius:10, marginBottom:10, overflow:"hidden" }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ width:"100%", padding:"12px 16px", display:"flex", alignItems:"flex-start",
          gap:12, background:"none", border:"none", cursor:"pointer", textAlign:"left" }}>
        <span style={{ fontSize:10, fontWeight:700, color:"#6B7280", background:"#F5F4F2",
          borderRadius:6, padding:"3px 8px", whiteSpace:"nowrap", marginTop:1 }}>{block.week}</span>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:13, fontWeight:700, color:"#1A1A18" }}>{block.title}</div>
          <div style={{ fontSize:12, color:"#555", marginTop:2, lineHeight:1.4 }}>{block.why}</div>
        </div>
        <span style={{ fontSize:11, color:"#aaa", marginTop:1, flexShrink:0 }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={{ padding:"0 16px 16px", borderTop:"1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize:11, fontWeight:700, color:"#6B7280", textTransform:"uppercase",
            letterSpacing:"0.06em", margin:"12px 0 8px" }}>Tasks</div>
          <ol style={{ paddingLeft:20, margin:0 }}>
            {block.tasks.map((t, i) => (
              <li key={i} style={{ fontSize:12, color:"#374151", lineHeight:1.7, marginBottom:4 }}>{t}</li>
            ))}
          </ol>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:12 }}>
            <div style={{ background:"#F0FDF4", borderRadius:8, padding:"10px 12px", border:"1px solid #86EFAC" }}>
              <div style={{ fontSize:10, fontWeight:800, color:"#1A6B3A", textTransform:"uppercase",
                letterSpacing:"0.06em", marginBottom:5 }}>✓ How you know it's done</div>
              <div style={{ fontSize:12, color:"#374151", lineHeight:1.6 }}>{block.testDone}</div>
            </div>
            <div style={{ background:"#F5F4F2", borderRadius:8, padding:"10px 12px", border:"1px solid rgba(0,0,0,0.08)" }}>
              <div style={{ fontSize:10, fontWeight:800, color:"#6B7280", textTransform:"uppercase",
                letterSpacing:"0.06em", marginBottom:5 }}>Owner</div>
              <div style={{ fontSize:13, fontWeight:700, color:"#1A1A18" }}>{block.owner}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PlatformSimplifiedGuide() {
  const [sub, setSub]       = useState("essentials");
  const [openCard, setOpen] = useState(null);
  const [filter, setFilter] = useState("all");

  const ACC = "#6B3AAA";

  const subTabs = [
    { id:"essentials", label:"The 11 Things That Matter" },
    { id:"plan",       label:"Implementation Plan" },
    { id:"glossary",   label:"Glossary" },
  ];

  const daysToAug = Math.ceil((new Date("2026-08-02") - new Date()) / (1000*60*60*24));

  const catFilters = [
    { id:"all",       label:"All" },
    { id:"overdue",   label:"⚠ Overdue" },
    { id:"data",      label:"Data Infrastructure" },
    { id:"candidate", label:"Candidate Control" },
    { id:"ai",        label:"AI Safety Proof" },
    { id:"internal",  label:"Internal Team" },
  ];

  const filtered = ALL_PLATFORM_ITEMS.filter(item => {
    if (filter === "all")     return true;
    if (filter === "overdue") return item.status === "overdue";
    return item.cat === filter;
  });

  return (
    <div>
      {/* Header */}
      <div style={{ background:"linear-gradient(135deg, #3B1F7A 0%, #6B3AAA 100%)", borderRadius:10,
        padding:"14px 18px", marginBottom:20, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <div style={{ fontWeight:700, fontSize:14, color:"white", marginBottom:3 }}>
            🚀 Platform GDPR & AI Act Essentials — Plain Language Guide
          </div>
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.65)", lineHeight:1.5 }}>
            11 things the platform team must build or complete. Written for engineers with no compliance background.
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6 }}>
          <span style={{ background:"#EF4444", color:"white", borderRadius:6, padding:"3px 10px",
            fontSize:11, fontWeight:700 }}>4 items already overdue</span>
          <span style={{ background:"rgba(255,255,255,0.15)", color:"white", borderRadius:6, padding:"3px 10px",
            fontSize:11, fontWeight:600 }}>Aug 2026 deadline: {daysToAug} days</span>
        </div>
      </div>

      <TabBar tabs={subTabs} active={sub} onChange={setSub} accent={ACC} />

      {/* ── THE 11 THINGS ── */}
      {sub === "essentials" && (
        <div>
          <div style={{ background:"#F5F0FF", border:"1px solid #D4C8F5", borderRadius:8,
            padding:"10px 14px", marginBottom:18, fontSize:13, color:ACC, lineHeight:1.6 }}>
            <strong>How to read this:</strong> 11 things the platform team must build or complete, grouped by urgency.
            Four are already overdue — start there. Click any item for the full detail.
          </div>

          {/* Status overview strip */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:20 }}>
            {[
              { label:"Already overdue", items:["P1 Deletion engine","P2 DSR pipeline","P3 Audit log","P10 AI literacy training"], color:"#A32D2D", bg:"#FFF5F5", border:"#FECACA" },
              { label:"Month 1–2", items:["P4 Candidate portal","P5 Consent enforcement middleware","P11 Client onboarding gate"], color:"#8B5500", bg:"#FFFBEB", border:"#FCD34D" },
              { label:"Before August 2026", items:["P6 Technical Files (×4)","P7 Bias testing pipeline","P8 DPIAs (×3)","P9 EU AI registration (×4)"], color:"#6B3AAA", bg:"#F5F0FF", border:"#D4C8F5" },
              { label:"Dependency chain", desc:"P6 must be done before P9. P7 must be in CI/CD before next model update. P8 must be done before August 2026.", color:"#1553AA", bg:"#EEF4FF", border:"#BFDBFE" },
            ].map((col,i) => (
              <div key={i} style={{ background:col.bg, border:`1px solid ${col.border}`, borderRadius:10, padding:12 }}>
                <div style={{ fontSize:11, fontWeight:800, color:col.color, textTransform:"uppercase",
                  letterSpacing:"0.06em", marginBottom:8 }}>{col.label}</div>
                {col.items
                  ? col.items.map((item,j) => (
                    <div key={j} style={{ display:"flex", gap:6, alignItems:"flex-start", marginBottom:5 }}>
                      <span style={{ color:col.color, fontWeight:700, flexShrink:0, fontSize:12 }}>→</span>
                      <span style={{ fontSize:11, color:"#374151", lineHeight:1.4 }}>{item}</span>
                    </div>
                  ))
                  : <div style={{ fontSize:11, color:"#374151", lineHeight:1.5 }}>{col.desc}</div>
                }
              </div>
            ))}
          </div>

          {/* Category filters */}
          <div style={{ display:"flex", gap:6, marginBottom:16, flexWrap:"wrap" }}>
            {catFilters.map(f => (
              <button key={f.id} onClick={() => setFilter(f.id)}
                style={{ padding:"4px 14px", borderRadius:100, fontSize:11, fontWeight:600, cursor:"pointer",
                  background: filter===f.id ? ACC : "#F0EDE8",
                  color: filter===f.id ? "white" : "#555",
                  border:`1px solid ${filter===f.id ? ACC : "rgba(0,0,0,0.1)"}` }}>
                {f.label}
              </button>
            ))}
          </div>

          {/* Cards */}
          {filtered.map(item => (
            <PlatformGuideCard key={item.id} item={item}
              expanded={openCard === item.id}
              onToggle={() => setOpen(openCard === item.id ? null : item.id)} />
          ))}
        </div>
      )}

      {/* ── IMPLEMENTATION PLAN ── */}
      {sub === "plan" && (
        <div>
          <div style={{ background:"#F5F0FF", border:"1px solid #D4C8F5", borderRadius:8,
            padding:"10px 14px", marginBottom:20, fontSize:13, color:ACC, lineHeight:1.6 }}>
            <strong>How to use this:</strong> Work through the phases in order. Each phase has a clear
            theme, tasks written for engineers, and a test that tells you it's done. The overdue items
            in Phase 0 should be started immediately — they don't wait for the plan to kick off.
          </div>

          {/* Phase 0 — Immediate */}
          {[
            {
              phase:"Phase 0", label:"Start immediately — already overdue",
              color:"#A32D2D", bg:"#FFF5F5", border:"#FECACA",
              note:"These items have no start date because they should have been done already. Begin this week.",
              blocks:[
                {
                  week:"This sprint",
                  title:"P1 — Nightly deletion engine",
                  why:"Holding expired candidate data is an active violation. Every day this isn't running, you're accumulating liability.",
                  tasks:[
                    "Set up a scheduled cron job at 02:00 UTC daily",
                    "Implement: delete candidate profiles where application_closed_at < NOW() - 12 months (unsuccessful only)",
                    "Implement: delete interview recordings where role_closed_at < NOW() - 6 months",
                    "Implement: delete talent pool profiles where consent_expires_at < NOW() and renewal not received",
                    "Write every deletion to an immutable audit log: candidate_id (hashed), reason_code, triggered_by, timestamp",
                    "Set up monitoring: if the job fails to complete, page the on-call engineer within 1 hour",
                  ],
                  testDone:"Verify the job ran at 02:00 this morning. Check its log. Manually verify that at least one test record that should have been deleted no longer exists in the database.",
                  owner:"Backend / DevOps",
                },
                {
                  week:"This sprint",
                  title:"P2 — DSR ticketing with 30-day deadlines",
                  why:"Data requests with no tracking system mean you cannot prove compliance. The 30-day window is non-negotiable.",
                  tasks:[
                    "Create a dsr_tickets table: id, candidate_id (hashed), client_id, type (ACCESS/DELETION/CORRECTION/PORTABILITY/OBJECTION), received_at, deadline_at (received_at + 30 days), assigned_to, status, fulfilled_at",
                    "Wire candidate portal actions (delete, download) to create tickets in this table automatically",
                    "Send automated acknowledgement email to candidate within 24 hours of ticket creation",
                    "Build a simple admin view showing all open tickets sorted by deadline — closest deadline first",
                    "Send an automated reminder to the assigned owner when a ticket is 7 days from deadline",
                    "On ticket completion, send a confirmation email to the candidate listing what was done",
                  ],
                  testDone:"File a test deletion request from the candidate portal. Verify: ticket appears in admin view with correct deadline, acknowledgement email arrives within 24 hours, ticket has an assigned owner.",
                  owner:"Backend + Product",
                },
                {
                  week:"This sprint",
                  title:"P3 — Immutable AI decision audit log",
                  why:"Without this log you cannot prove a human reviewed any AI decision. You also cannot respond to a candidate challenging their assessment.",
                  tasks:[
                    "Create an ai_audit_log table: event_id, module_name, module_version, candidate_id (hashed), client_id, role_id, event_type (SCORED/REVIEWED/REJECTED/APPROVED), event_data (JSON), human_reviewer_id (nullable), human_action, created_at",
                    "Make this table append-only — no UPDATE or DELETE operations permitted on it",
                    "Instrument each AI pipeline step to write to this table on completion",
                    "Instrument the human review action in the ATS to write to this table when a recruiter takes action",
                    "Build an export endpoint: GET /audit-log?candidate_id=X returns all events for that candidate",
                    "Verify log retention: records must be kept for minimum 6 months",
                  ],
                  testDone:"Run a test AI interview. Check the audit log for the test candidate: the AI assessment event appears, the human review event appears, both have correct timestamps and module versions.",
                  owner:"Backend",
                },
                {
                  week:"This week",
                  title:"P10 — AI literacy training for all relevant staff",
                  why:"The February 2025 deadline has passed. Any untrained staff member is a live compliance gap.",
                  tasks:[
                    "List every staff member who works with AI hiring features: engineers, product managers, customer success, support",
                    "Check who has a training completion record — anyone without one is overdue",
                    "Enrol overdue staff in AI literacy training immediately",
                    "Create a training_completions table or use your existing HR system: staff_id, completed_at, training_version, next_due_at (completed_at + 12 months)",
                    "Set a calendar reminder for each person's annual renewal",
                    "New joiners: AI literacy training added to onboarding checklist as a Day 1 task",
                  ],
                  testDone:"Every relevant staff member has a completion record with a date and training version. Zero overdue staff in the Platform Staff Training tab.",
                  owner:"CPO / HR",
                },
              ],
            },
            {
              phase:"Phase 1", label:"Month 1–2 — Candidate control and client gates",
              color:"#8B5500", bg:"#FFFBEB", border:"#FCD34D",
              note:"These items can run in parallel. P4 should start first as P5 depends on the portal being live.",
              blocks:[
                {
                  week:"Month 1",
                  title:"P4 — Candidate self-service portal",
                  why:"Candidates legally have the right to control their data. The portal is what makes this possible — it is also the backend to everything in the client consent dashboard.",
                  tasks:[
                    "Build a portal page served at a stable URL (e.g. /candidate-portal)",
                    "Access via time-limited JWT magic link (7-day validity) sent in application confirmation emails",
                    "Show on the portal: stored personal data, consent status for C2/C3/C4 independently, C1 processing status",
                    "Implement Withdraw consent button per consent type — each independently, each creating a consent_records withdrawal event",
                    "Implement Delete all my data button — creates a DSR ticket (type: DELETION) in the P2 pipeline",
                    "Implement Download my data button — aggregates data from all storage systems, returns as JSON or PDF",
                    "All actions send an automated confirmation email to the candidate",
                  ],
                  testDone:"A test candidate can: open the portal via magic link, see their data and consent statuses, withdraw C2 consent independently without affecting C3 or C4, request deletion, and receive confirmation emails for all actions — without contacting support.",
                  owner:"Frontend + Backend",
                },
                {
                  week:"Month 2",
                  title:"P5 — Middleware enforcement of consent and objection",
                  why:"The consent dashboard shows statuses but if the pipeline doesn't check them, nothing is actually enforced. P5 is what makes the compliance dashboard real.",
                  tasks:[
                    "Add a consent_check middleware function: takes (candidate_id, consent_type) and returns allowed/blocked",
                    "The function checks consent_records for the given type — if withdrawn_at is set, return blocked",
                    "For C1 objections: check c1_processing_records — if processing_active is false, return blocked",
                    "Wire this check as a gate at the entry point of every AI pipeline step (screening, skills, matching, sourcing)",
                    "If blocked: log the attempt to the audit log, route to human review queue, do not proceed",
                    "Write tests: verify each AI pipeline step fails gracefully when consent is withdrawn for its type",
                  ],
                  testDone:"Withdraw C2 consent for a test candidate. Attempt to schedule an AI screening interview for that candidate. The interview must fail to start, the attempt must appear in the audit log, and the recruiter must see a human review task.",
                  owner:"Backend",
                },
                {
                  week:"Month 2",
                  title:"P11 — Client onboarding gate before AI features are enabled",
                  why:"Clients are using AI features without completing their legal obligations as deployers. This makes Allps AI a party to their non-compliance.",
                  tasks:[
                    "Add a deployer_onboarding_status table: client_id, item (AI_BRIEFING_RECEIVED / DPA_SIGNED / AI_DISCLOSURE_CONFIRMED / RIGHTS_PAGE_CONFIRMED), completed_at, confirmed_by",
                    "In the client activation API, add a pre-condition check: all four onboarding items must be complete before AI features can be enabled",
                    "If any item is incomplete, return a clear error to the activation flow identifying which items are missing",
                    "Build a completion flow for each item: how the client confirms it (checkbox + signature or file upload for DPA)",
                    "Surface completion status in the Platform Deployer Onboarding tab",
                  ],
                  testDone:"Attempt to enable AI matching for a client that has not completed the onboarding checklist. The activation must be blocked with a message naming the missing items. Complete all items. Attempt activation again — it must succeed.",
                  owner:"Backend + Client onboarding flow",
                },
              ],
            },
            {
              phase:"Phase 2", label:"Before August 2026 — AI safety documentation and registration",
              color:"#6B3AAA", bg:"#F5F0FF", border:"#D4C8F5",
              note:`${daysToAug} days remaining to the hard deadline. P6 must be complete before P9 can start. P7 should be wired into the next model update pipeline immediately.`,
              blocks:[
                {
                  week:"Start now — target complete by 1 July 2026",
                  title:"P6 — Technical File for each AI module (×4)",
                  why:"You cannot register with the EU AI database without a complete Technical File. Registration must happen before 2 August 2026. Leaving this until July is risky.",
                  tasks:[
                    "Assign a Technical File owner per module: AI Sourcing, AI Matching, AI Screening Interview, AI Skills Interview",
                    "Use Annex IV of the EU AI Act as your template (8 sections: description, architecture, training data, performance metrics, bias test results, known limitations, human oversight, version history)",
                    "For each module: document what data fields are and are not used as inputs (reference P7 bias test results)",
                    "For each module: document what the AI assesses and what it explicitly does not (emotions, facial expressions, etc.)",
                    "For each module: document the human oversight mechanism (reference P3 audit log and the human-in-the-loop gate)",
                    "Store all four Technical Files in the compliance register with version control",
                    "Update each file when the model version changes — version history section tracks this",
                  ],
                  testDone:"Four Technical Files exist in the compliance register, each covering all 8 Annex IV sections, each referencing the correct model version, each signed off by the CPO.",
                  owner:"Engineering leads + CPO (sign-off)",
                },
                {
                  week:"Next model update — and every update after",
                  title:"P7 — Bias testing as a CI/CD gate",
                  why:"You're deploying AI that makes decisions about people's job applications. Without bias testing, you don't know if the model is systematically disadvantaging protected groups.",
                  tasks:[
                    "Build a bias_test_runner that takes a model version and a sample of anonymised historical scoring data",
                    "Compute pass rates (advance rate) by demographic group: gender, age band, ethnicity",
                    "Compute adverse impact ratio (AIR) for each group: group_pass_rate / highest_pass_rate",
                    "Flag if any AIR < 0.8 (80% rule — the 4/5 rule used by most employment regulators)",
                    "Store test report in compliance_bias_tests table: model_version, run_at, results_json, passed (boolean)",
                    "Add as a required step in the model deployment pipeline: deployment blocked if test fails",
                    "Surface test history in the Platform AI Module Registry",
                  ],
                  testDone:"Trigger a model update deployment. Verify the bias test runs automatically. Verify that a simulated test failure blocks the deployment. Check the compliance_bias_tests table shows the result.",
                  owner:"ML Engineering + DevOps",
                },
                {
                  week:"Target complete by 1 June 2026",
                  title:"P8 — DPIA for each AI feature (×3)",
                  why:"Launching AI features that process candidate data without a prior risk assessment is a GDPR gap. Not having done this worsens the regulatory outcome if a data breach or discrimination complaint occurs.",
                  tasks:[
                    "Produce three DPIAs: AI Matching, AI Screening Interview, AI Skills Interview",
                    "Each DPIA must cover: what data is processed, why, who can see it, what the risks are (likelihood × severity), what you're doing to reduce each risk, what residual risk remains",
                    "Use the ICO or EDPB DPIA template as a starting structure",
                    "DPO must review and sign off each DPIA before it is filed",
                    "Store all three in the compliance register with date and DPO sign-off record",
                    "Schedule annual review or review on significant system changes (whichever comes first)",
                  ],
                  testDone:"Three DPIA documents exist in the compliance register, each with a DPO sign-off and a date. Each covers the required sections. Each is linked to the corresponding Technical File.",
                  owner:"CPO + DPO (sign-off)",
                },
                {
                  week:"Target complete by 2 August 2026 — hard deadline",
                  title:"P9 — Register all four AI modules in the EU AI database",
                  why:"After 2 August 2026, operating unregistered high-risk AI in hiring is a direct EU AI Act violation. No grace period.",
                  tasks:[
                    "Confirm with legal: does Allps AI need to appoint an EU legal representative before registering? (Required if not established in the EU — resolve this first)",
                    "Verify all four Technical Files (P6) are complete — registration cannot proceed without them",
                    "Register each module at ai-database.eu: AI Sourcing, AI Matching, AI Screening Interview, AI Skills Interview",
                    "Store registration IDs in the compliance register — one per module",
                    "Update the Platform AI Module Registry in the dashboard to show registered status",
                  ],
                  testDone:"All four modules show a registration ID in the EU AI database and in the Platform AI Module Registry. Registration completed before 2 August 2026.",
                  owner:"CPO + Legal",
                },
              ],
            },
          ].map(phase => (
            <div key={phase.phase} style={{ marginBottom:24 }}>
              <div style={{ background:phase.bg, border:`1.5px solid ${phase.border}`,
                borderRadius:10, padding:"12px 16px", marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div>
                    <div style={{ fontSize:16, fontWeight:800, color:phase.color }}>{phase.phase}</div>
                    <div style={{ fontSize:13, fontWeight:600, color:"#374151", marginTop:2 }}>{phase.label}</div>
                  </div>
                </div>
                <div style={{ marginTop:8, fontSize:12, color:phase.color, background:`${phase.color}10`,
                  borderRadius:6, padding:"6px 10px", lineHeight:1.5 }}>{phase.note}</div>
              </div>
              {phase.blocks.map(block => (
                <PlanBlock key={block.title} block={block} />
              ))}
            </div>
          ))}

          {/* Completion summary */}
          <div style={{ background:"linear-gradient(135deg, #3B1F7A, #6B3AAA)", borderRadius:10, padding:16 }}>
            <div style={{ fontSize:14, fontWeight:700, color:"white", marginBottom:12 }}>
              ✓ When all 11 items are complete, the platform will have:
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:12 }}>
              {[
                "A nightly deletion job with full audit trail — no more expired data being held",
                "A DSR ticketing system with 30-day deadlines, auto-acknowledgements, and named owners",
                "An immutable AI decision log covering all modules, all clients, all candidates",
                "A candidate portal where people can see, control, and delete their data without contacting support",
                "Middleware that physically blocks AI processing when consent is withdrawn or an objection is filed",
                "A client activation gate that prevents AI features from being enabled until onboarding is complete",
                "Technical Files for all four AI modules — the foundation for EU AI Act registration",
                "Bias testing wired into the CI/CD pipeline — no model goes live without passing",
                "Three DPIAs covering all AI features that process candidate data",
                "All four AI modules registered in the EU AI public database before the August 2026 deadline",
                "Every relevant staff member with a current AI literacy training record",
              ].map((item,i) => (
                <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                  <span style={{ color:"#22C55E", fontWeight:700, fontSize:14, flexShrink:0 }}>✓</span>
                  <span style={{ fontSize:12, color:"rgba(255,255,255,0.8)", lineHeight:1.55 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── GLOSSARY ── */}
      {sub === "glossary" && (
        <div>
          <div style={{ background:"#F5F4F2", border:"1px solid rgba(0,0,0,0.08)", borderRadius:8,
            padding:"10px 14px", marginBottom:18, fontSize:12, color:"#6B7280" }}>
            Platform-specific terms and concepts. Same plain-language standard as the client guide.
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {[
              ["Deletion engine / retention job", "An automated script that runs every night and deletes data that has passed its allowed keep window. Not a manual process — it must run on a schedule and log what it deleted. If it fails, someone gets paged."],
              ["DSR (Data Subject Request)", "A formal request from a candidate to exercise their privacy rights: see their data, delete it, correct it, or download it. You have 30 days to respond. Must be tracked in a ticketing system with a named owner — not an inbox."],
              ["Audit log (immutable)", "A record of every significant AI decision and human action that cannot be edited or deleted. Append-only. If a candidate or regulator asks 'what did the AI decide about me and did a human review it?' — this log is your proof."],
              ["Magic link", "A time-limited login link sent by email that gives a specific person access to their portal without needing to create an account or remember a password. Expires after 7 days. This is how candidates access the self-service portal."],
              ["Consent middleware", "A code-level gate that checks whether a candidate has valid consent before any AI pipeline step runs. If consent has been withdrawn, the pipeline step is blocked — not just noted in a database. This is what makes the consent dashboard enforceable."],
              ["Technical File", "A regulatory document required by the EU AI Act for each high-risk AI module. Describes what the AI does, what data it uses, how it performs, and how humans stay in control. Required before EU AI database registration. Internal document — not public."],
              ["DPIA (Data Protection Impact Assessment)", "A document you produce before launching any feature that processes personal data at scale or uses it to make decisions about people. Describes the risks and what you're doing about them. Your DPO signs off. Required under GDPR for high-risk processing."],
              ["DPO (Data Protection Officer)", "The person responsible for ensuring data protection compliance. They sign off DPIAs, review data processing decisions, and are the named contact for supervisory authorities. Allps AI must have one."],
              ["Bias testing / 80% rule", "A test that checks whether an AI model treats different demographic groups differently. The 80% rule: if any group's pass rate is less than 80% of the highest-passing group's rate, the model has an adverse impact problem and must not be deployed."],
              ["Adverse Impact Ratio (AIR)", "The number that the bias test produces per group: AIR = (group pass rate) ÷ (highest group pass rate). If any group gets an AIR below 0.8, that is a bias flag. Store this result per model version."],
              ["EU AI Database / EAIS", "A public registry of all high-risk AI systems in the EU, run by the European Commission. All four of Allps AI's AI modules must be registered here before 2 August 2026. Registration portal: ai-database.eu."],
              ["High-risk AI (Annex III)", "The EU AI Act classification that covers AI used in hiring. All four Allps AI modules are in this category. Being high-risk means: you must produce Technical Files, run bias tests, appoint human oversight, and register with the EU database."],
              ["Deployer", "The client employer who uses Allps AI's hiring software. They are responsible for their own GDPR obligations — AI disclosure on job postings, human review of AI decisions, staff training. The platform must enforce that they've met these before enabling AI features."],
              ["Provider", "The company that built and trained the AI — Allps AI. Providers have heavier obligations than deployers: Technical Files, bias testing, DPIA, EU AI registration, post-market monitoring."],
              ["Art. 4 AI Literacy", "A requirement in force since February 2025. Everyone who works with high-risk AI systems — engineers, product managers, customer success — must have basic AI literacy training. Annual renewal required. The platform team is covered by this as a provider."],
              ["Compelling legitimate grounds (Art. 21)", "When a candidate objects to C1 processing, the platform can continue processing only if it can document that its legitimate interest overrides the candidate's rights. This is rare, requires DPO sign-off, and must be communicated to the candidate in plain language."],
              ["Append-only / immutable log", "A database table or storage mechanism where rows can only be inserted, never updated or deleted. Ensures the audit trail cannot be tampered with. Implemented by removing UPDATE and DELETE permissions on the table at the database level."],
              ["CI/CD gate", "A step in your deployment pipeline that must pass before code or a model can be deployed to production. Bias testing as a CI/CD gate means: a model update cannot ship unless it passes the bias test. Failing the gate blocks the deployment automatically."],
            ].map(([term, def]) => (
              <div key={term} style={{ background:"white", border:"1px solid rgba(0,0,0,0.08)",
                borderRadius:8, padding:14 }}>
                <div style={{ fontSize:13, fontWeight:700, color:"#1A1A18", marginBottom:6 }}>{term}</div>
                <div style={{ fontSize:12, color:"#374151", lineHeight:1.65 }}>{def}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PlatformDashboard() {
  const [tab, setTab] = useState("essentials");
  const [gdprSub, setGdprSub] = useState("overview");
  const [aiSub, setAiSub] = useState("modules");

  const ACC = "#6B3AAA";

  const gdprTabs = [
    { id:"overview",  label:"Consent Overview by Client" },
    { id:"dsr",       label:"DSR Pipeline" },
    { id:"retention", label:"Retention Engine" },
    { id:"c1",        label:"C1 — LI Processing Register" },
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

      <TabBar tabs={[
        {id:"essentials", label:"🚀 Essentials"},
        {id:"gdpr",       label:"🔐 GDPR Operations"},
        {id:"aiact",      label:"🤖 AI Act (Provider)"},
      ]} active={tab} onChange={t=>{setTab(t); setGdprSub("overview"); setAiSub("modules");}} accent={ACC} />

      {tab === "essentials" && <PlatformSimplifiedGuide />}
      {tab === "gdpr" && (
        <div>
          <TabBar tabs={gdprTabs} active={gdprSub} onChange={setGdprSub} accent={ACC} />
          {gdprSub === "overview"  && <PlatformConsentOverview />}
          {gdprSub === "dsr"       && <PlatformDsrPipeline />}
          {gdprSub === "retention" && <PlatformRetentionEngine />}
          {gdprSub === "c1"        && <PlatformC1Register />}
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

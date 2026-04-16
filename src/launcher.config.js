// ─────────────────────────────────────────────────────────────
//  LAUNCHER CONFIGURATION  — Product Mockups
//  Edit this file to customise the launcher for this deployment
// ─────────────────────────────────────────────────────────────

const config = {
  launcherName: 'Product Mockups',
  orgName: 'Allps AI',
  subtitle: 'Interactive design prototypes for the Product team',
  audience: 'product',

  // Accent colour used for highlights, tags, borders
  accentColor: '#00C2A8',        // Allps teal
  accentColorDark: '#00A08C',
  headerGradient: 'linear-gradient(135deg, #0A0F1E 0%, #0D1B2A 60%, #0A2420 100%)',

  // PIN protection — set to null to disable
  accessPin: null,

  // Categories shown in the filter bar (order matters)
  categories: [
    'All',
    'ATS Workflow',
    'AI Sourcing',
    'AI Matching',
    'AI Interviews',
    'Candidate Experience',
    'Onboarding',
    'Analytics',
    'Settings',
    'Other',
  ],

  // Webhook URL — POST with { title, addedBy, url } when new mockup is pushed
  // Set to null to disable notifications
  notificationWebhookUrl: null,
}

export default config

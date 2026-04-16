# Allps AI — Product Mockups Launcher

Interactive launcher for all Allps AI product design mockups.
Built with Vite + React. Hosted on Vercel.

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Adding a New Mockup

### Option A — Use the Mockup Manager (recommended)
Run the local `allps-mockup-manager` app and push directly from the UI.

### Option B — Manual

1. Add your `.jsx` or `.html` file to `src/mockups/`
2. Add an entry to `src/mockups-registry.json`:

```json
{
  "id": "unique-kebab-id",
  "title": "Human Readable Title",
  "description": "What does this mockup show?",
  "category": "ATS Workflow",
  "tags": ["tag1", "tag2"],
  "type": "react",
  "file": "YourComponentFilename",
  "status": "draft",
  "addedAt": "2025-01-01",
  "addedBy": "Your Name"
}
```

3. Commit and push — Vercel auto-deploys.

## Mockup File Rules

- Each `.jsx` mockup **must** have a default export (`export default function MyMockup()`)
- **No cross-dependencies** between mockup files
- External npm packages are not available in deployed builds — keep mockups self-contained
- HTML mockups go in `src/mockups/html/` and are opened in a new tab

## Status Values
| Status | Meaning |
|--------|---------|
| `draft` | Work in progress, not for team sharing |
| `review` | Ready for feedback |
| `approved` | Signed off, represents current direction |

## Deployment

Push to `main` — Vercel auto-deploys from the connected repository.

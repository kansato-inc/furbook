# furbook — Whistle React SDK Demo

A minimal social-media-style demo app that showcases the **Kansato Whistle React SDK** (`@kansato/whistle-react`). Every post and user profile has a report button powered by Whistle.

> This is a demo/showcase app, not a real product. It uses hardcoded data — no database, no authentication, no backend.

## What It Demonstrates

- **`WhistleProvider`** — wrapping the app with SDK configuration (API key, project ID, base URL)
- **`ReportDialog` on posts** — drop-in report modal attached to every post in the feed
- **`ReportDialog` on users** — reporting user profiles (not just content)
- **Secure server-side submission** — reports go through a Next.js API route handler (`createWhistleHandler`) so the secret API key stays server-side and the reporter identity is attached by your auth system (not spoofable from the browser)
- **`useSecureReportSubmission`** — client-side hook that submits through your route handler instead of directly to the API
- Subject/target distinction — `subject` (who created the content) vs. `target` (what content is being reported)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + Tailwind CSS 4 |
| Language | TypeScript |
| SDK | `@kansato/whistle-react` (workspace dependency) |
| Runtime | Bun (monorepo workspace) |

No database. No auth. No ORM. No Cloudflare.

## Prerequisites

- [Bun](https://bun.sh) (package manager)
- A Kansato Whistle project with API keys (for report submissions to work)

## Quick Start

### 1. Install Dependencies

From the monorepo root:

```bash
cd triage/
bun install
```

### 2. Configure Environment

```bash
cp example-furbook/.env.example example-furbook/.env.local
```

Edit `example-furbook/.env.local`:

#### Client-side (exposed to browser)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_WHISTLE_PUBLISHABLE_KEY` | Publishable API key (`whpk_…`) — used by the embed iframe UI |
| `NEXT_PUBLIC_WHISTLE_PROJECT_ID` | Your Whistle project UUID |
| `NEXT_PUBLIC_WHISTLE_API_BASE` | _(Optional)_ Whistle server URL for the embed iframe |

#### Server-side (never exposed to browser)

| Variable | Description |
|----------|-------------|
| `WHISTLE_API_KEY` | **Secret** API key (`wh_…`) — used by the API route handler to forward reports |
| `WHISTLE_PROJECT_ID` | Your Whistle project UUID (same as above) |
| `WHISTLE_API_URL` | _(Optional)_ Override default Whistle API URL |

Get keys from your Whistle dashboard: **Project Settings > API Keys**. You need **both** keys:
- The **publishable** key (`whpk_` prefix) for the embed iframe
- The **secret** key (`wh_` prefix) for the server-side route handler

### 3. Start the Dev Server

```bash
cd example-furbook/
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Running With the Full Whistle Stack

For report submissions to actually reach the Whistle API:

```bash
# Terminal 1: Whistle API server
cd triage/server && bun run dev          # → localhost:3001

# Terminal 2: This demo app
cd triage/example-furbook && bun dev     # → localhost:3000
```

The demo's API route (`/api/whistle/report`) forwards reports to the Whistle server using the secret key. The browser never sees it.

See the main [README](../README.md) for Docker/database setup instructions if you need the full moderation pipeline.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              Root layout (fonts, WhistleProvider, global CSS)
│   ├── page.tsx                Redirects to /feed
│   ├── globals.css             Tailwind v4 + design tokens
│   ├── api/whistle/report/
│   │   └── route.ts            Secure report ingestion endpoint (server-side)
│   ├── feed/
│   │   └── page.tsx            Social feed — list of PostCard components
│   └── users/
│       ├── page.tsx            User listing
│       └── [username]/
│           └── page.tsx        User profile with ReportDialog + their posts
├── components/
│   ├── whistle-provider.tsx     WhistleProvider wrapper (reads env vars, sets routeHandlerPath)
│   ├── feed/
│   │   └── post-card.tsx       Post component with ReportDialog (controlled mode)
│   └── report-user-button.tsx  User report button with ReportDialog (controlled mode)
└── data/
    ├── types.ts                User & Post interfaces + userToSubject()
    └── mock.ts                 Hardcoded 8 users, 14 posts, lookup helpers
```

## How Reporting Works

### Architecture: Secure Server-Side Submission

```
Browser                          Next.js Server                    Whistle API
────────                         ──────────────                    ──────────
ReportDialog (iframe)
  → user fills form
  → sends data via postMessage
                                  POST /api/whistle/report
                                    createWhistleHandler:
                                      - reads secret WHISTLE_API_KEY
                                      - attaches reporter (from getReporter)
                                      - forwards to Whistle API
                                                                     POST /reports
                                                                       returns { report }
                                  ← response
  ← success/error callback
```

The **browser never touches the secret key**. All API calls happen server-side through the route handler.

### The API Route Handler (`app/api/whistle/report/route.ts`)

Uses `createWhistleHandler` from `@kansato/whistle-react/next`:

```ts
import { createWhistleHandler } from "@kansato/whistle-react/next";

export const { POST } = createWhistleHandler({
  apiKey: process.env.WHISTLE_API_KEY!,      // secret key (server-only!)
  projectId: process.env.WHISTLE_PROJECT_ID!,
  apiUrl: process.env.WHISTLE_API_URL,        // optional override
  getReporter: () => ({
    type: "user",
    externalId: "user-001",                   // resolved from your auth system
    display: { name: "Fluffy McWhiskers", username: "fluffy_mcwhiskers" },
  }),
});
```

In a real app, `getReporter` would resolve the authenticated user from session cookies, JWT, Clerk, NextAuth, etc. In this demo it's hardcoded.

### Client-Side Components (`PostCard`, `ReportUserButton`)

Use `useSecureReportSubmission` hook with controlled mode on `ReportDialog`:

```tsx
const { submit } = useSecureReportSubmission({
  onSuccess: (response) => console.log("Reported:", response.report.id),
});

<ReportDialog subject={...} target={...}
  onSubmit={async (data, helpers) => {
    const result = await submit({ subject: data.subject, target: data.target, ... });
    helpers.resolve({ id: result.report.id, ... });
  }}
/>
```

The `onSubmit` callback intercepts form data from the iframe, calls the secure route handler, then resolves/rejects the dialog.

### Reporting a Post (Feed)

Each post card has a "Report post" button that opens a `ReportDialog`:

```
subject: { type: "user", externalId: "user-001", display: { name: "Fluffy McWhiskers", username: "fluffy_mcwhiskers" } }
target:  { contentType: "post", contentExternalId: "post-001" }
reporter: { type: "user", externalId: "user-001" }  ← attached server-side by getReporter
```

### Reporting a User (Profile Page)

Each user profile has a "Report @username" button:

```
subject: { type: "user", externalId: "user-001", display: { name: "Fluffy McWhiskers", username: "fluffy_mcwhiskers" } }
target:  { contentType: "user", contentExternalId: "user-001" }
reporter: { type: "user", externalId: "user-001" }  ← attached server-side by getReporter
```

### Data Flow (Step by Step)

1. User clicks the report trigger button
2. `ReportDialog` opens an iframe with reason selector + description field
3. User selects a reason(s) and optionally adds details
4. On submit, the iframe sends form data to the parent via `postMessage`
5. Parent's `onSubmit` handler calls `useSecureReportSubmission().submit()`
6. `submit()` POSTs to `/api/whistle/report` (your Next.js route handler)
7. Route handler (`createWhistleHandler`) attaches reporter info from `getReporter`
8. Route handler forwards to the Whistle API using the **secret** key
9. Response propagates back: Whistle API -> route handler -> submit() -> resolve() -> iframe shows success

## License

Internal demo — part of the Kansato Whistle monorepo.

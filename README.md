# mdwarish.com (v2)

Portfolio of **Md Warish**, full-stack software engineer (Delhi NCR). A multi-page Next.js site for two audiences: freelance clients and hiring teams.

- 7 pages plus 8 case studies: `/`, `/about`, `/projects`, `/projects/[slug]`, `/services`, `/experience`, `/contact`, `/resume`
- Light and dark themes (theme button in the header) and an "Animations" switch (in the footer). Both settings are saved and applied before first paint, so the page never flashes the wrong theme.
- CSS-only animation (no animation library): hairline SVG diagrams, one background line drawing per page, a scroll-sequenced process
- A contact form that saves leads to MongoDB, then syncs them to Google Sheets and sends a Gmail notification after the response, with automatic retry

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | One hand-written design-system stylesheet (`src/app/globals.css`) using CSS custom properties |
| Fonts | Instrument Serif + Manrope, self-hosted with `next/font/local` (Latin subset, ≈80 KB total) |
| Icons | Simple Icons brand marks (CC0) embedded as SVG paths in `src/components/icons/tech-icons.ts`; Java uses the Font Awesome Free mark (CC BY 4.0) |
| Lead storage | MongoDB (official `mongodb` driver) |
| Integrations | Google Sheets REST API (service account, signed with `node:crypto`), Gmail SMTP via Nodemailer |
| Tests | Node test runner via `tsx` (unit), Playwright (browser) |

Runtime dependencies are deliberately few: `next`, `react`, `react-dom`, `mongodb` and `nodemailer`.

## Requirements

- Node.js **20.9 or newer** (Next.js 16 requirement). Node 22 LTS is recommended.
- npm 10+

## Install

```bash
npm install
cp .env.example .env.local   # then fill in values (see below)
```

> **Lockfile note.** This package was assembled in an environment without access to the npm registry, so it ships **without** `package-lock.json`. The first `npm install` creates one. Commit it, and use `npm ci` from then on so every install is reproducible.

## Develop

```bash
npm run dev          # http://localhost:3000
npm run typecheck    # tsc --noEmit
npm run lint         # ESLint (eslint-config-next, flat config)
npm test             # unit tests (53)
```

## Production build

```bash
npm run build
npm run start        # serves on port 3000
```

### Browser tests

```bash
npx playwright install chromium        # once
npm run build && npm run start         # terminal 1
BASE_URL=http://localhost:3000 npm run test:e2e   # terminal 2 (33 tests)
```

The contact API is intercepted inside the browser tests, so no real leads, sheet rows or emails are created.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | recommended | Canonical origin; defaults to `https://mdwarish.com` |
| `MONGODB_URI` | **yes, for the form** | MongoDB Atlas connection string. Without it the form shows a friendly error with the email address |
| `MONGODB_DB` | no | Database name (default `portfolio`) |
| `GOOGLE_SERVICE_ACCOUNT_BASE64` | no | Base64 of the service-account JSON key |
| `GOOGLE_SHEET_ID` | no | Spreadsheet ID (from its URL) |
| `GOOGLE_SHEET_NAME` | no | Tab name (default `Leads`) |
| `GMAIL_USER` | no | Gmail address that sends notifications |
| `GMAIL_APP_PASSWORD` | no | 16-character Google App Password |
| `LEAD_NOTIFICATION_EMAIL` | no | Where notifications go (default `GMAIL_USER`) |
| `CRON_SECRET` | no | Protects `/api/cron/retry-sync` |

If Sheets or Gmail variables are missing, that channel is skipped and logged. It does not break the form.

## Contact form setup

1. **MongoDB Atlas:** create a cluster and a database user, allow your server's IP, and paste the URI into `MONGODB_URI`. The app creates its indexes (including a unique index on `idempotencyKey`) on first use.
2. **Google Sheets (optional):**
   - In Google Cloud, enable the Sheets API and create a service account with a JSON key.
   - Create a spreadsheet with a tab named `Leads`. Header row: `Received | Lead ID | Intent | Name | Email | Company | Project type | Message`.
   - Share the spreadsheet with the service account's `client_email` as **Editor**.
   - Run `base64 -w0 key.json` (macOS: `base64 -i key.json | tr -d '\n'`) and put the output in `GOOGLE_SERVICE_ACCOUNT_BASE64`.
3. **Gmail (optional):** turn on 2-Step Verification for the account, create an App Password, and set `GMAIL_USER` and `GMAIL_APP_PASSWORD`.
4. **Retry job (optional but recommended):** set `CRON_SECRET`, then call the retry endpoint every 10–15 minutes:
   ```bash
   */15 * * * * curl -fsS -H "Authorization: Bearer $CRON_SECRET" https://mdwarish.com/api/cron/retry-sync
   ```
   On Vercel, add a cron for `/api/cron/retry-sync` in `vercel.json`; Vercel sends the bearer header automatically when `CRON_SECRET` is set.

## Deployment

### VPS (Node + Nginx)

```bash
npm ci && npm run build
PORT=3000 npm run start            # keep it running with pm2 or systemd
```

Nginx reverse proxy (TLS via certbot):

```nginx
server {
  server_name mdwarish.com www.mdwarish.com;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

`X-Forwarded-For` is what the form's rate limiter uses to tell visitors apart, so keep that header.

### Vercel

Import the repository, add the environment variables, and deploy. No extra configuration is needed.

## Domain configuration

- Point `mdwarish.com` (A/AAAA records, or the host's DNS target) at the server, and `www` as a CNAME.
- Redirect `www` to the apex, either in Nginx or in the hosting dashboard. Canonical tags, the sitemap and Open Graph URLs all use `NEXT_PUBLIC_SITE_URL`.
- After launch, submit `https://mdwarish.com/sitemap.xml` in Google Search Console.

## Updating content

| What | Where |
|---|---|
| Name, email, links, availability, education | `src/config/site.ts` |
| Projects and case studies | `src/content/projects.ts` |
| Experience (add dates here) | `src/content/experience.ts` |
| Services and process | `src/content/services.ts` |
| Skill groups | `src/content/skills.ts` |
| Screenshots | `public/images/projects/`; refresh them with `npm run screenshots` |

`npm test` includes content checks: unique slugs, every referenced screenshot exists with the right dimensions, a single Limra CRM entry with its 18 verified modules, no Fusion POS, and none of the banned buzzwords (passionate, seamless, robust, leveraging, cutting-edge, crafting…).

## Licences

Fonts: SIL Open Font License (`src/app/fonts/OFL-*.txt`). Brand icons: Simple Icons (CC0) and Font Awesome Free (CC BY 4.0, Java icon). All brand names and logos belong to their owners.

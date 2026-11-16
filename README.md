# Md Warish — Multi-Page Full-Stack Software Engineer Portfolio

A hand-crafted, light-first (with dark mode toggle), multi-page Next.js 14 App Router portfolio engineered for **Md Warish**.

## 1. Multi-Page Route Map
- `/` — Curated Home teaser page (Hero + System SVG + Tech Marquee + Featured Projects + About/Skills/Services teasers + Contact CTA)
- `/about` — Full editorial biography, resume download, and "How I Work" process
- `/skills` — Categorized bento layout across Frontend, Backend, Database/ORM, and Infrastructure
- `/projects` — Shareable category filtering (`?category=...`), featured highlights, and full 12-project archive
- `/projects/[slug]` — Dynamic case study page per project with `generateStaticParams`, `generateMetadata`, and adjacent project navigation
- `/experience` — Career timeline (Futurex Trade Fair & Events Pvt. Ltd., NodalXPoint)
- `/services` — 7 business-focused software engineering services
- `/contact` — Validated lead form + direct contact channels
- `/api/contact` — `POST` route handler (Primary: MongoDB Atlas; Secondary: Google Sheets API + Gmail SMTP)

## 2. Quick Local Run Guide
```bash
npm install
cp .env.example .env.local
npx tsc --noEmit
npm run dev
```

## 3. Backend Environment Setup (`.env.local`)

### A. MongoDB Atlas (`MONGODB_URI`)
1. Create a cluster on MongoDB Atlas.
2. Create a database user and whitelist your IP (`0.0.0.0/0` for Vercel deployments).
3. Paste the connection string into `MONGODB_URI`.

### B. Gmail SMTP App Password (`GMAIL_USER` & `GMAIL_APP_PASSWORD`)
1. Enable 2-Step Verification on your Google Account (`warishmohd987@gmail.com`).
2. Visit **Google Account -> Security -> App Passwords** and generate a 16-character password.
3. Set `GMAIL_USER=warishmohd987@gmail.com` and `GMAIL_APP_PASSWORD=<your_16_char_password>`.

### C. Google Sheets Service Account (`GOOGLE_SERVICE_ACCOUNT_BASE64`)
1. In Google Cloud Console, enable **Google Sheets API** and create a Service Account with a JSON key.
2. Create a Google Sheet with a tab named `Leads` and share it with the service account's `client_email` as **Editor**.
3. Convert the downloaded JSON key to Base64:
   ```bash
   base64 -i service-account.json | tr -d '\n'
   ```
4. **Important Security Note:** Base64 is **encoding, NOT encryption**. Anyone who obtains the Base64 string can decode your private key. Keep `GOOGLE_SERVICE_ACCOUNT_BASE64` strictly in server-side environment variables and never commit it to Git.

## 4. Customizing Projects, Screenshots & Resume
- **Add or Edit Projects:** Edit `src/data/projects.ts`. Dynamic routes, filters, and `sitemap.xml` update automatically.
- **Add Real Screenshots:** Place `.webp` files in `public/images/projects/` and set `hasRealScreenshot: true` on the project item in `src/data/projects.ts`.
- **Replace Resume:** Overwrite `public/resume/resume-placeholder.pdf` with your final resume PDF.

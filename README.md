<div align="center">

# PJ Enterprise — Website V2

**Authorized distributor of Shell, Tyrolit, Quaker Houghton & EWAC Alloys**  
*Vadodara, Gujarat · Since 2007*

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## 📋 Project Overview

The official website for PJ Enterprise, an industrial distribution company based in Vadodara, Gujarat. The site showcases products from Shell, Tyrolit, Quaker Houghton, and EWAC Alloys, and provides information about services, company history, and contact details.

### Key Features
- ⚡ Code-split page routes with `React.lazy()` + Suspense
- 🔍 Local SEO with JSON-LD structured data & geo meta tags
- ♿ Accessible — ARIA labels, focus-visible styles, prefers-reduced-motion
- 📱 Fully responsive design with dark industrial aesthetic
- 🧪 Smoke tests for all page components

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 19 |
| **Language** | TypeScript 5.8 |
| **Build Tool** | Vite 6 |
| **Styling** | Tailwind CSS v4 |
| **Animations** | Framer Motion (`motion`) |
| **Icons** | Lucide React |
| **Routing** | React Router v7 |
| **Linting** | ESLint 9 (flat config) |
| **Testing** | Vitest + Testing Library |

---

## 🚀 Local Setup

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/JThite97/PJE-Website.git
cd PJE-Website

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local

# 4. Start development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SITE_URL` | Recommended | Public URL for canonical/OG tags (e.g. `https://pjenterprise.in`) |
| `VITE_WEB3FORMS_KEY` | Optional | API key from [web3forms.com](https://web3forms.com) for contact form emails |

Copy `.env.example` → `.env.local` and fill in the values.

---

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint on `src/` |
| `npm run test` | Run Vitest smoke tests |
| `npm run test:watch` | Run tests in watch mode |

---

## 🌐 Deployment

### Vercel (Static SPA)

1. Connect the GitHub repo to [Vercel](https://vercel.com)
2. Set Framework Preset to **Vite**
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Add a `vercel.json` for SPA routing:
   ```json
   { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
   ```
6. Set environment variables in the Vercel dashboard

### Render (Static Site)

1. Create a new **Static Site** on [Render](https://render.com)
2. Build Command: `npm run build`
3. Publish Directory: `dist`
4. Add a rewrite rule: `/* → /index.html` (status 200)
5. Set environment variables in Settings

---

## 📝 Note on Backend

The `package.json` previously included `express`, `better-sqlite3`, `@google/genai`, and `dotenv` as dependencies. These were **never used** (no server files existed) and have been removed. If a backend API is needed in the future, it should be built as a separate service or added alongside the Vite config.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit changes: `git commit -m "feat: add my feature"`
4. Push to the branch: `git push origin feat/my-feature`
5. Open a Pull Request

### Code Standards
- Run `npm run lint` before committing
- Run `npm run test` to verify smoke tests pass
- Use conventional commit messages (`feat:`, `fix:`, `docs:`, etc.)

---

## 📄 License

© 2026 PJ Enterprise. All rights reserved.

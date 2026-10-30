# Govind Web Solutions

Govind Web Solutions is a premier digital agency building high-performance web applications, modern business websites, and tailored digital solutions.

This repository contains both the public agency web platform and the private founder business analytics dashboard.

---

## Architecture Overview

```
Websmagic/
├── client/                     # Frontend Application (React + Vite + Tailwind CSS)
│   ├── public/                 # Static public assets
│   ├── src/
│   │   ├── assets/             # Images, icons, static resources
│   │   ├── components/         # Reusable UI components
│   │   │   ├── common/         # Navbar, Footer, Buttons, Cards
│   │   │   └── feedback/       # Alerts, Loaders, Empty States
│   │   ├── layouts/            # Page layouts (MainLayout, DashboardLayout)
│   │   ├── pages/              # Route views (Home, About, Services, Projects, Founders, Contact, Dashboard)
│   │   ├── routes/             # AppRoutes configuration
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # API integration clients
│   │   ├── context/            # Global state and contexts
│   │   ├── utils/              # Helper functions and formatters
│   │   ├── styles/             # Additional CSS/styling rules
│   │   ├── App.jsx             # Root component
│   │   ├── index.css           # Tailwind base, components, utilities
│   │   └── main.jsx            # Vite DOM entry point
│   ├── index.html              # HTML shell with Inter typography & metadata
│   ├── package.json            # Client dependencies & scripts
│   ├── tailwind.config.js      # Custom theme colors (navy, brand blue)
│   ├── postcss.config.js       # PostCSS config
│   ├── vite.config.js          # Vite config with '@' path alias
│   └── .env.example            # Client environment variables
├── server/                     # Backend Application (Phase 3)
├── .env.example                # Root environment template
├── .gitignore                  # Git ignore rules
├── package.json                # Root workspace scripts
└── README.md                   # Documentation
```

---

## Technology Stack

- **Frontend**: React 18, Vite, JavaScript (JSX), React Router DOM v6, Tailwind CSS, Lucide Icons, Recharts.
- **Backend**: Node.js, Express.js (Phase 3).
- **Database**: MongoDB, Mongoose (Phase 3).
- **Authentication**: Secure HTTP-only cookie-based sessions (Phase 5).

---

## Getting Started

### 1. Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### 2. Installation
Install client dependencies:
```bash
cd client
npm install
```

### 3. Environment Setup
Copy `.env.example` in `client/`:
```bash
cp client/.env.example client/.env
```

### 4. Development Server
Start the frontend development server:
```bash
npm run dev
# or from client directory:
cd client && npm run dev
```

The application will run at `http://localhost:5173`.

### 5. Production Build
Build for production:
```bash
npm run build
# or from client directory:
cd client && npm run build
```

---

## Phased Development Roadmap

- [x] **Phase 1: Project Foundation** — React + Vite setup, Tailwind CSS configuration, folder structure, placeholder homepage, scripts, build verification.
- [ ] **Phase 2: Public Website UI** — Home, About, Services, Projects, Founders, Contact pages.
- [ ] **Phase 3: Backend and Contact Inquiries** — Express API, MongoDB storage, validation, inquiry submission.
- [ ] **Phase 4: Analytics Dashboard** — Visitor tracking, metrics charts, lead management UI.
- [ ] **Phase 5: Founder Authentication and Security** — Two founder accounts, session management, route protection.
- [ ] **Phase 6: Testing and Deployment** — QA, security verification, Vercel & Render deployment.


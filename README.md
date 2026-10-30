# Govind Web Solutions

Govind Web Solutions is a premier digital agency building high-performance web applications, modern business websites, and tailored digital solutions.

This repository contains both the public agency web platform and the private founder business analytics dashboard.

---

## Architecture Overview

```
Websmagic/
├── client/                     # Frontend Application (React 18 + Vite + Tailwind CSS + Recharts)
│   ├── public/                 # Static public assets
│   ├── src/
│   │   ├── assets/             # Images, icons, static resources
│   │   ├── components/         # Reusable UI components
│   │   │   └── common/         # Navbar, Footer, HeroArtwork, ProjectModal, SectionHeading, Badge, DynamicIcon
│   │   ├── layouts/            # Page layouts (MainLayout with automatic page_view tracking)
│   │   ├── pages/              # Route views (Home, About, Services, Projects, Founders, Contact, Dashboard, NotFound)
│   │   ├── routes/             # AppRoutes configuration
│   │   ├── hooks/              # Custom React hooks (useDocumentTitle)
│   │   ├── services/           # API integration clients (api.js, inquiryService.js, dashboardService.js)
│   │   ├── context/            # Global state and contexts
│   │   ├── utils/              # Analytics tracker (analytics.js), agencyData.js, helpers.js
│   │   ├── styles/             # Additional CSS/styling rules
│   │   ├── App.jsx             # Root component
│   │   ├── index.css           # Tailwind base, components, utilities
│   │   └── main.jsx            # Vite DOM entry point
│   ├── index.html              # HTML shell with Inter typography & metadata
│   ├── package.json            # Client dependencies & scripts
│   ├── tailwind.config.js      # Custom theme colors (navy, brand blue)
│   ├── postcss.config.js       # PostCSS config
│   ├── vite.config.js          # Vite config with '@' path alias
│   └── .env.example            # Client environment variables template
├── server/                     # Backend Application (Node.js + Express + Mongoose)
│   ├── src/
│   │   ├── config/             # Database connection (db.js)
│   │   ├── controllers/        # Controllers (inquiryController.js, analyticsController.js)
│   │   ├── middleware/         # Middleware (validateInquiry, validateAnalyticsEvent, devDashboardAuth, errorHandler, notFound)
│   │   ├── models/             # Mongoose Schemas (Inquiry.js, AnalyticsEvent.js)
│   │   ├── routes/             # Express Routers (inquiryRoutes.js, analyticsRoutes.js)
│   │   ├── services/           # Analytics aggregations & metrics (analyticsService.js)
│   │   ├── utils/              # Helpers (apiResponse.js)
│   │   ├── app.js              # Express app setup (Helmet, CORS, Rate Limit, Parsers)
│   │   └── server.js           # Server entry point & graceful shutdown
│   ├── test-api.js             # Comprehensive backend test suite (Phase 3 + Phase 4)
│   ├── package.json            # Backend dependencies & scripts
│   └── .env.example            # Server environment variables template
├── .env.example                # Root environment template
├── .gitignore                  # Git ignore rules
├── package.json                # Root workspace scripts
└── README.md                   # Documentation
```

---

## Technology Stack

- **Frontend**: React 18, Vite, JavaScript (JSX), React Router DOM v6, Tailwind CSS, Lucide Icons, Recharts.
- **Backend**: Node.js, Express.js (REST API architecture).
- **Database**: MongoDB Atlas, Mongoose ODM.
- **Analytics**: Privacy-conscious first-party telemetry tracking `page_view`, `service_cta_click`, `inquiry_attempt`, and `inquiry_success` without raw IP storage or invasive fingerprinting.
- **Security**: Helmet security headers, CORS origin restriction, rate limiting, request size limits, XSS input sanitization, production dashboard lockdown guard.

---

## Getting Started

### 1. Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm
- MongoDB Atlas database cluster or local MongoDB instance

### 2. Installation
Install dependencies for both frontend and backend:
```bash
# Install client dependencies
npm --prefix client install

# Install server dependencies
npm --prefix server install
```

### 3. Environment Setup
Configure environment variables:
```bash
# Frontend environment
cp client/.env.example client/.env

# Backend environment
cp server/.env.example server/.env
```

Edit `server/.env` with your MongoDB connection string:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/govind_web_solutions?retryWrites=true&w=majority
CLIENT_URL=http://localhost:5173
```

### 4. Running the Development Servers
In separate terminal sessions or using root scripts:

```bash
# Start Backend API Server (http://localhost:5000)
npm run server:dev

# Start Frontend Development Server (http://localhost:5173)
npm run client:dev
```

### 5. Running the Backend Test Suite
```bash
node server/test-api.js
```

### 6. Production Build
Verify the production build of the frontend:
```bash
npm run client:build
```

---

## Phased Development Roadmap

- [x] **Phase 1: Project Foundation** — React + Vite setup, Tailwind CSS configuration, folder structure, placeholder homepage, scripts, build verification.
- [x] **Phase 2: Public Website UI** — Home, About, Services, Projects with filters & case study modal, Founders profiles, responsive Contact UI.
- [x] **Phase 3: Backend and Contact Inquiries** — Express REST API, Mongoose Inquiry model, server-side validation & sanitization, rate limiting, and real frontend contact form integration.
- [x] **Phase 4: Analytics Dashboard** — First-party telemetry collection, MongoDB aggregation pipelines, date filtering (7d/30d/90d), Recharts visualizations, and private founder dashboard.
- [ ] **Phase 5: Founder Authentication and Security** — Two founder accounts, session management, route protection.
- [ ] **Phase 6: Testing and Deployment** — QA, security verification, Vercel & Render deployment.

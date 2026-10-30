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
│   │   ├── pages/              # Route views (Home, About, Services, Projects, Founders, Contact, Login, Dashboard, NotFound)
│   │   ├── routes/             # AppRoutes, ProtectedRoute (intercepts unauthenticated dashboard access)
│   │   ├── hooks/              # Custom React hooks (useDocumentTitle)
│   │   ├── services/           # API integration clients (api.js, inquiryService.js, dashboardService.js, authService.js)
│   │   ├── context/            # AuthContext (centralized session state, login, logout, checkAuth)
│   │   ├── utils/              # Analytics tracker (analytics.js), agencyData.js, helpers.js
│   │   ├── styles/             # Additional CSS/styling rules
│   │   ├── App.jsx             # Root component with AuthProvider
│   │   ├── index.css           # Tailwind base, components, utilities
│   │   └── main.jsx            # Vite DOM entry point
│   ├── index.html              # HTML shell with Inter typography & metadata
│   ├── package.json            # Client dependencies & scripts
│   ├── tailwind.config.js      # Custom theme colors (navy, brand blue)
│   ├── postcss.config.js       # PostCSS config
│   ├── vite.config.js          # Vite config with manual chunking & '@' path alias
│   └── .env.example            # Client environment variables template
├── server/                     # Backend Application (Node.js + Express + Mongoose)
│   ├── src/
│   │   ├── config/             # Database connection (db.js)
│   │   ├── controllers/        # Controllers (authController, inquiryController, analyticsController)
│   │   ├── middleware/         # Middleware (requireFounderAuth, validateInquiry, validateAnalyticsEvent, errorHandler, notFound)
│   │   ├── models/             # Mongoose Schemas (Founder, Inquiry, AnalyticsEvent)
│   │   ├── routes/             # Express Routers (authRoutes, inquiryRoutes, analyticsRoutes)
│   │   ├── services/           # Services (founderProvisioningService, analyticsService)
│   │   ├── utils/              # Helpers (tokenUtils, apiResponse)
│   │   ├── app.js              # Express app setup (Helmet, CORS, CookieParser, Rate Limit, Parsers)
│   │   └── server.js           # Server entry point, founder seeding, & graceful shutdown
│   ├── test-api.js             # Comprehensive backend test suite (Phase 3 + Phase 4 + Phase 5)
│   ├── package.json            # Backend dependencies & scripts
│   └── .env.example            # Server environment variables template
├── .env.example                # Root environment template
├── .gitignore                  # Git ignore rules
├── package.json                # Root workspace scripts
└── README.md                   # Documentation
```

---

## Technology Stack

- **Frontend**: React 18, Vite 6, JavaScript (JSX), React Router DOM v6, Tailwind CSS v3, Lucide Icons, Recharts.
- **Backend**: Node.js, Express.js (REST API architecture).
- **Database**: MongoDB Atlas, Mongoose ODM.
- **Authentication**: Secure HTTP-only cookie-based sessions, cryptographically signed JSON Web Tokens (JWT), bcrypt password hashing (12 salt rounds), strict login rate limiting (5 attempts per 15 minutes per IP).
- **Analytics**: Privacy-conscious first-party telemetry tracking `page_view`, `service_cta_click`, `inquiry_attempt`, and `inquiry_success` without raw IP storage or invasive fingerprinting.
- **Security**: Helmet HTTP headers, CORS origin restriction, rate limiting, request size limits, XSS input sanitization, protected founder routes, zero public registration.

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

Edit `server/.env` with your MongoDB connection string and founder credentials:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/govind_web_solutions?retryWrites=true&w=majority
CLIENT_URL=http://localhost:5173
SESSION_SECRET=change-this-to-a-super-secure-random-32-character-secret

# Founder 1 Provisioning Credentials
FOUNDER_1_NAME=Govind Rathod
FOUNDER_1_EMAIL=govind@govindwebsolutions.com
FOUNDER_1_PASSWORD=FounderGovind#2026

# Founder 2 Provisioning Credentials
FOUNDER_2_NAME=Co-founder (Business Development)
FOUNDER_2_EMAIL=partner@govindwebsolutions.com
FOUNDER_2_PASSWORD=FounderPartner#2026
```

### 4. Running the Development Servers
In separate terminal sessions or using root scripts:

```bash
# Start Backend API Server (http://localhost:5000)
npm run server:dev

# Start Frontend Development Server (http://localhost:5173)
npm run client:dev
```

### 5. Running the Automated Test Suite
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
- [x] **Phase 5: Founder Authentication and Security** — Two founder accounts, secure HTTP-only cookies, session management, protected routes, and login experience.
- [x] **Phase 6: Testing and Deployment** — End-to-end quality assurance, production CORS and cookie hardening, automated test suite (20/20 passed), Vercel SPA routing (`client/vercel.json`), Render blueprint (`render.yaml`), and comprehensive [DEPLOYMENT.md](file:///c:/Users/ASUS/OneDrive/Documents/My%20Projects/Websmagic/DEPLOYMENT.md) production guide.

---

## Production Deployment

For step-by-step instructions on deploying the database to **MongoDB Atlas**, the backend API to **Render**, and the frontend to **Vercel**, refer to the complete deployment guide:

👉 **[DEPLOYMENT.md](file:///c:/Users/ASUS/OneDrive/Documents/My%20Projects/Websmagic/DEPLOYMENT.md)**

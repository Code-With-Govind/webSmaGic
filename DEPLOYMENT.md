# Govind Web Solutions — Production Deployment Guide

This guide provides end-to-end instructions for deploying the **Govind Web Solutions** platform to production using **MongoDB Atlas** (Database), **Render** (Node.js/Express Backend API), and **Vercel** (React Frontend).

---

## 1. Architecture & Deployment Model

```
┌─────────────────────────────────┐           ┌─────────────────────────────────┐
│         Vercel (Frontend)       │           │          Render (Backend)       │
│  https://govindwebsolutions.com │  HTTPS    │   https://api.govindwebsolutions│
│  or *.vercel.app                ├──────────►│   or *.onrender.com             │
│  - React 18 SPA                 │  Cookies  │   - Node.js + Express REST API  │
│  - vercel.json SPA rewrites     │  CORS     │   - Rate Limiters & Helmet      │
└─────────────────────────────────┘           └────────────────┬────────────────┘
                                                               │
                                                               │ Mongoose / TLS
                                                               ▼
                                              ┌─────────────────────────────────┐
                                              │      MongoDB Atlas (Database)   │
                                              │   - Primary Replica Set         │
                                              │   - Collections: inquiries,     │
                                              │     analytics_events, founders  │
                                              └─────────────────────────────────┘
```

---

## 2. Step 1: MongoDB Atlas Database Setup

1. **Create an Account / Log In**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and log into your account.
2. **Create a Cluster**:
   - Create a free **M0 Sandbox** cluster (or M10+ for production performance).
   - Select your preferred cloud provider (AWS, GCP, or Azure) and a region closest to your target audience (e.g., `ap-south-1` Mumbai or `us-east-1` N. Virginia).
3. **Create Database User**:
   - Under **Security > Database Access**, click **Add New Database User**.
   - Authentication Method: **Password**.
   - Set Username (e.g. `gws_admin`) and generate a secure password.
   - Database User Privileges: **Read and write to any database** (or restrict to `govind_web_solutions`).
4. **Configure Network Access**:
   - Under **Security > Network Access**, click **Add IP Address**.
   - For Render cloud deployments (which have dynamic egress IPs), add:
     - IP Address: `0.0.0.0/0` (Allow access from anywhere).
     - Comment: `Render backend access`.
5. **Get Connection String**:
   - Under **Databases > Clusters**, click **Connect**.
   - Select **Drivers** (Node.js, 5.5 or later).
   - Copy the SRV connection URI:
     ```
     mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/govind_web_solutions?retryWrites=true&w=majority
     ```
   - Replace `<username>` and `<password>` with your credentials, and append the database name `/govind_web_solutions`.

---

## 3. Step 2: Render Backend API Deployment

1. **Log In to Render**:
   - Go to [Render Dashboard](https://dashboard.render.com/) and sign in with GitHub.
2. **Create a New Web Service**:
   - Click **New + > Web Service**.
   - Connect your GitHub repository (`Websmagic` or your repository name).
3. **Configure Service Settings**:
   - **Name**: `govind-web-solutions-api`
   - **Region**: Choose closest to your database (e.g., `Oregon (US West)` or `Singapore`).
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free` (or `Starter` for dedicated 24/7 instances without sleep).
4. **Configure Health Check Path**:
   - Under **Advanced Settings**, set **Health Check Path** to:
     ```
     /api/health
     ```
5. **Set Production Environment Variables**:
   Under **Environment Variables**, add the following keys and values:

   | Key | Value / Description | Example |
   |-----|---------------------|---------|
   | `NODE_ENV` | Must be `production` | `production` |
   | `PORT` | Render sets this automatically or default `10000` | `10000` |
   | `MONGODB_URI` | Your full MongoDB Atlas connection string | `mongodb+srv://...` |
   | `CLIENT_URL` | Allowed frontend URL (or comma-separated URLs) | `https://govind-web-solutions.vercel.app,https://govindwebsolutions.com` |
   | `SESSION_SECRET` | 32+ character random string for signing JWT tokens | Generate via `openssl rand -hex 32` |
   | `COOKIE_SAMESITE` | `none` (for cross-domain Vercel/Render) or `lax` (for shared custom domain) | `none` |
   | `FOUNDER_1_NAME` | Govind Rathod | `Govind Rathod` |
   | `FOUNDER_1_EMAIL` | Official login email for Govind | `govind@govindwebsolutions.com` |
   | `FOUNDER_1_PASSWORD` | Strong private password for Govind's account | `[Choose Strong Password]` |
   | `FOUNDER_2_NAME` | Co-founder name | `Co-founder (Business Development)` |
   | `FOUNDER_2_EMAIL` | Official login email for Co-founder | `partner@govindwebsolutions.com` |
   | `FOUNDER_2_PASSWORD` | Strong private password for Co-founder's account | `[Choose Strong Password]` |

6. **Deploy**:
   - Click **Create Web Service**.
   - Render will build dependencies and start the backend.
   - Once deployed, your backend URL will be:
     `https://govind-web-solutions-api.onrender.com`
   - Test it by opening `https://govind-web-solutions-api.onrender.com/api/health` in your browser. You should receive:
     ```json
     {
       "success": true,
       "message": "Govind Web Solutions API is operational",
       "data": {
         "status": "healthy",
         "database": "connected",
         "environment": "production"
       }
     }
     ```

---

## 4. Step 3: Vercel Frontend Deployment

1. **Log In to Vercel**:
   - Go to [Vercel](https://vercel.com/) and sign in with GitHub.
2. **Import Repository**:
   - Click **Add New... > Project**.
   - Select your repository.
3. **Configure Build & Project Settings**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click `Edit` and select `client`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `dist` (default)
   - **Install Command**: `npm install` (default)
4. **Set Frontend Environment Variables**:
   Under **Environment Variables**, add:
   - `VITE_API_BASE_URL` = `https://govind-web-solutions-api.onrender.com` (Your Render backend URL).
5. **Deploy**:
   - Click **Deploy**.
   - Vercel will bundle the React application and deploy to global edge CDNs.
   - Once complete, copy your production URL (e.g. `https://govind-web-solutions.vercel.app`).
6. **Update Render CORS Allowed Origins**:
   - Return to your Render Web Service dashboard.
   - In **Environment Variables**, ensure `CLIENT_URL` includes your newly generated Vercel domain (e.g. `https://govind-web-solutions.vercel.app`).
   - Save changes (Render will automatically re-deploy with updated CORS rules).

> **Note on SPA Routing**: The repository includes `client/vercel.json`, which automatically rewrites all incoming routes to `/index.html`. Direct browser navigation or reloads on routes like `/about`, `/services`, `/projects`, `/founders`, `/contact`, `/login`, and `/dashboard` will work seamlessly.

---

## 5. Step 4: Custom Domain & DNS Configuration (Optional)

If you own a custom domain (e.g., `govindwebsolutions.com`):

### Frontend Domain (Vercel)
1. Go to **Vercel Project Settings > Domains**.
2. Add `govindwebsolutions.com` and `www.govindwebsolutions.com`.
3. In your DNS provider (Cloudflare, GoDaddy, Namecheap):
   - Add an `A` record pointing `@` to `76.76.21.21`.
   - Add a `CNAME` record pointing `www` to `cname.vercel-dns.com`.

### Backend Domain (Render)
1. Go to **Render Web Service Settings > Custom Domains**.
2. Add `api.govindwebsolutions.com`.
3. In your DNS provider:
   - Add a `CNAME` record for `api` pointing to your Render service address (e.g. `govind-web-solutions-api.onrender.com`).
4. Update Environment Variables:
   - In Vercel: Set `VITE_API_BASE_URL=https://api.govindwebsolutions.com`.
   - In Render: Set `CLIENT_URL=https://govindwebsolutions.com,https://www.govindwebsolutions.com`.
   - In Render: Set `COOKIE_SAMESITE=lax` (since frontend and backend now share the apex domain `govindwebsolutions.com`).

---

## 6. Step 5: Post-Deployment Verification & Smoke Tests

Complete the following checklist to verify full operational readiness:

### A. Public Website Verification
- [ ] Visit homepage (`/`) — check Hero, Services preview, Portfolio cards, Founders teaser, and Footer.
- [ ] Navigate to `/about` — check agency story, methodology, and values.
- [ ] Navigate to `/services` — verify all 8 services render with features, technologies, and CTA buttons.
- [ ] Navigate to `/projects` — test category filtering and click a project to open the interactive case study modal.
- [ ] Navigate to `/founders` — verify both founder profiles (Govind Rathod & Business Partner) with technical specializations.
- [ ] Visit an invalid URL (e.g. `/unknown-path`) — verify branded 404 page with return home button.

### B. Contact Inquiries & Telemetry Verification
- [ ] Navigate to `/contact` and submit a real inquiry.
- [ ] Confirm the success alert renders with estimated response time.
- [ ] Inspect MongoDB Atlas collection `inquiries` to verify the document was saved.
- [ ] Inspect MongoDB Atlas collection `analytics_events` to verify `page_view` and `inquiry_success` events were ingested.

### C. Founder Portal Security & Dashboard
- [ ] Navigate directly to `/dashboard` while logged out — verify automatic redirection to `/login`.
- [ ] Attempt login with invalid credentials — verify safe generic error message.
- [ ] Log in with Founder 1 credentials (`govind@govindwebsolutions.com`).
- [ ] Verify HTTP-only session cookie is received and the Business Analytics Dashboard loads.
- [ ] Switch date filter buttons (`7 Days`, `30 Days`, `90 Days`) and observe real metrics recalculating.
- [ ] Click through dashboard navigation tabs:
  - **Overview**: KPI summary cards & conversion rate.
  - **Traffic Analytics**: Daily page views & unique visitors area chart.
  - **Top Pages**: Most visited routes and view counts.
  - **Service Insights**: Service CTA clicks and inquiries.
  - **Inquiries**: Real inquiry pipeline with status badges.
- [ ] Click **Sign Out** — verify cookie is cleared and you are redirected to `/login`.
- [ ] Log in with Founder 2 credentials (`partner@govindwebsolutions.com`) and verify identical analytics capabilities.

---

## 7. Troubleshooting & Common Questions

### 1. Cross-Origin Cookie Blocked in Browser
- **Symptom**: Login succeeds on `/login`, but immediately redirects back to `/login` when attempting to load `/dashboard`.
- **Cause**: Browser blocked cross-site cookie because `COOKIE_SAMESITE` was set to `strict` or `lax` across different domains (`vercel.app` vs `onrender.com`).
- **Fix**: In Render environment variables, ensure `COOKIE_SAMESITE=none` and `NODE_ENV=production`. This instructs the browser to accept the secure HTTPS cookie across origins.

### 2. CORS Errors in Browser Console
- **Symptom**: `Access to fetch at ... from origin ... has been blocked by CORS policy`.
- **Cause**: The Vercel URL does not match `CLIENT_URL` in the Render environment variables.
- **Fix**: Add your exact frontend URL (without trailing slash) to `CLIENT_URL` in Render (e.g., `https://govind-web-solutions.vercel.app`). Comma-separate multiple URLs if needed.

### 3. Render Free Tier Sleep Delay
- **Symptom**: First API request takes 30–50 seconds to respond.
- **Cause**: Free tier instances spin down after 15 minutes of inactivity.
- **Resolution**: Upgrade to Render Starter plan ($7/mo) for 24/7 always-on instances, or use a free uptime monitor (e.g., UptimeRobot) pinging `/api/health` every 10 minutes.

### 4. MongoDB Connection Timeout
- **Symptom**: `/api/health` returns `"database": "disconnected"`.
- **Cause**: IP Whitelist in MongoDB Atlas does not permit Render's IP address.
- **Fix**: In MongoDB Atlas > Security > Network Access, add `0.0.0.0/0` (Allow Access from Anywhere).


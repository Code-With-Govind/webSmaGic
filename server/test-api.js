import { validateInquiry } from './src/middleware/validateInquiry.js';
import { validateAnalyticsEvent } from './src/middleware/validateAnalyticsEvent.js';
import { requireFounderAuth } from './src/middleware/requireFounderAuth.js';
import { notFound } from './src/middleware/notFound.js';
import { errorHandler } from './src/middleware/errorHandler.js';
import { createInquiry } from './src/controllers/inquiryController.js';
import { recordEvent, getOverview } from './src/controllers/analyticsController.js';
import { login, logout, getMe } from './src/controllers/authController.js';
import { generateToken, verifyToken, TOKEN_COOKIE_NAME } from './src/utils/tokenUtils.js';
import { parseDateRange } from './src/services/analyticsService.js';
import Inquiry from './src/models/Inquiry.js';
import AnalyticsEvent from './src/models/AnalyticsEvent.js';
import Founder from './src/models/Founder.js';

// Mock Express response generator
function createMockRes() {
  const res = {
    statusCode: 200,
    headers: {},
    cookies: {},
    clearedCookies: [],
    data: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.data = payload;
      return this;
    },
    cookie(name, val, options) {
      this.cookies[name] = { val, options };
      return this;
    },
    clearCookie(name, options) {
      this.clearedCookies.push({ name, options });
      delete this.cookies[name];
      return this;
    },
    setHeader(key, val) {
      this.headers[key] = val;
      return this;
    },
  };
  return res;
}

async function runPhase5TestSuite() {
  console.log('========================================================');
  console.log('Govind Web Solutions — Comprehensive Phase 5 Test Suite');
  console.log('========================================================');
  let passed = 0;
  let failed = 0;

  const test = async (name, fn) => {
    try {
      await fn();
      console.log(`✓ PASS: ${name}`);
      passed++;
    } catch (err) {
      console.error(`✗ FAIL: ${name} ->`, err.message);
      failed++;
    }
  };

  // ==========================================
  // 1. INQUIRY SYSTEM TESTS (Phase 3 Core)
  // ==========================================
  await test('validateInquiry rejects missing required fields with 400', async () => {
    const req = { body: {} };
    const res = createMockRes();
    let nextCalled = false;

    validateInquiry(req, res, () => {
      nextCalled = true;
    });

    if (nextCalled) throw new Error('next() should not be called');
    if (res.statusCode !== 400) throw new Error(`Expected 400, got ${res.statusCode}`);
  });

  await test('validateInquiry sanitizes XSS tags and normalizes fields', async () => {
    const req = {
      body: {
        fullName: '  <script>alert("hack")</script>Govind Rathod  ',
        email: '  GOVIND@EXAMPLE.COM  ',
        phone: '+91 9876543210',
        company: 'Govind Web Solutions',
        service: 'E-commerce Website Development',
        budget: '$5,000 — $10,000',
        description: 'Need a scalable e-commerce store with modern checkout.',
        contactMethod: 'WhatsApp',
      },
    };
    const res = createMockRes();
    let nextCalled = false;

    validateInquiry(req, res, () => {
      nextCalled = true;
    });

    if (!nextCalled) throw new Error('next() should be called');
    if (req.cleanData.fullName.includes('<script>')) throw new Error('XSS tags should be stripped');
    if (req.cleanData.email !== 'govind@example.com') throw new Error('Email should be normalized to lowercase');
  });

  // ==========================================
  // 2. ANALYTICS EVENT INGESTION TESTS (Phase 4 Core)
  // ==========================================
  await test('validateAnalyticsEvent accepts public page_view event', async () => {
    const req = {
      body: {
        eventType: 'page_view',
        visitorId: 'v_1730000000_abcdef123',
        sessionId: 's_1730000000_fedcba321',
        pagePath: '/services',
        referrer: 'https://google.com/search?q=agency',
        source: 'google',
        medium: 'organic',
      },
    };
    const res = createMockRes();
    let nextCalled = false;

    validateAnalyticsEvent(req, res, () => {
      nextCalled = true;
    });

    if (!nextCalled) throw new Error('next() should be called');
    if (!req.cleanEvent) throw new Error('req.cleanEvent must be set');
  });

  await test('validateAnalyticsEvent rejects internal /dashboard path from tracking', async () => {
    const req = {
      body: {
        eventType: 'page_view',
        visitorId: 'v_1730000000_abcdef123',
        sessionId: 's_1730000000_fedcba321',
        pagePath: '/dashboard/traffic',
      },
    };
    const res = createMockRes();
    let nextCalled = false;

    validateAnalyticsEvent(req, res, () => {
      nextCalled = true;
    });

    if (nextCalled) throw new Error('Dashboard paths must be excluded');
    if (res.statusCode !== 400) throw new Error(`Expected 400, got ${res.statusCode}`);
  });

  // ==========================================
  // 3. FOUNDER AUTHENTICATION & SECURITY (Phase 5)
  // ==========================================
  const f1Email = (process.env.FOUNDER_1_EMAIL || 'govind@govindwebsolutions.com').toLowerCase();
  const f1Pass = process.env.FOUNDER_1_PASSWORD || 'FounderGovind#2026';
  const f2Email = (process.env.FOUNDER_2_EMAIL || 'partner@govindwebsolutions.com').toLowerCase();
  const f2Pass = process.env.FOUNDER_2_PASSWORD || 'FounderPartner#2026';

  await test('Founder 1 (Govind Rathod) login authenticates and sets HTTP-only cookie', async () => {
    const req = {
      body: {
        email: f1Email,
        password: f1Pass,
      },
    };
    const res = createMockRes();

    await login(req, res, () => {});

    if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode}: ${res.data?.message}`);
    if (!res.data?.success) throw new Error('Expected data.success === true');
    if (res.data?.data?.founder?.email !== f1Email) throw new Error('Founder email mismatch');

    // Verify HTTP-only cookie was issued
    const cookieEntry = res.cookies[TOKEN_COOKIE_NAME];
    if (!cookieEntry) throw new Error('HTTP-only cookie was not set');
    if (!cookieEntry.options.httpOnly) throw new Error('Cookie must be httpOnly: true');
    if (cookieEntry.options.sameSite !== 'lax' && cookieEntry.options.sameSite !== 'strict') {
      throw new Error('Cookie must specify sameSite');
    }
  });

  await test('Founder 2 (Business Partner) login authenticates with equal founder permissions', async () => {
    const req = {
      body: {
        email: f2Email,
        password: f2Pass,
      },
    };
    const res = createMockRes();

    await login(req, res, () => {});

    if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode}`);
    if (res.data?.data?.founder?.role !== 'founder') throw new Error('Role must be founder');
    if (res.data?.data?.founder?.email !== f2Email) throw new Error('Founder 2 email mismatch');
  });

  await test('Login rejects invalid password credentials with generic 401', async () => {
    const req = {
      body: {
        email: f1Email,
        password: 'IncorrectPassword999!',
      },
    };
    const res = createMockRes();

    await login(req, res, () => {});

    if (res.statusCode !== 401) throw new Error(`Expected 401, got ${res.statusCode}`);
    if (res.data?.success !== false) throw new Error('Expected success === false');
    if (!res.data?.message?.includes('Invalid email or password')) {
      throw new Error('Expected safe generic error message');
    }
  });

  await test('Login rejects unknown/unauthorized email accounts with generic 401', async () => {
    const req = {
      body: {
        email: 'unauthorized-stranger@gmail.com',
        password: 'SomePassword123!',
      },
    };
    const res = createMockRes();

    await login(req, res, () => {});

    if (res.statusCode !== 401) throw new Error(`Expected 401, got ${res.statusCode}`);
    if (res.data?.success !== false) throw new Error('Expected success === false');
  });

  await test('Public registration endpoint is absent (404 Not Found)', async () => {
    const req = { originalUrl: '/api/auth/register' };
    const res = createMockRes();

    notFound(req, res);

    if (res.statusCode !== 404) throw new Error(`Expected 404, got ${res.statusCode}`);
    if (res.data?.success !== false) throw new Error('Expected success === false');
  });

  // ==========================================
  // 4. PROTECTED DASHBOARD ENDPOINTS TESTS
  // ==========================================
  await test('requireFounderAuth rejects unauthenticated request with 401', async () => {
    const req = { cookies: {}, headers: {} };
    const res = createMockRes();
    let nextCalled = false;

    await requireFounderAuth(req, res, () => {
      nextCalled = true;
    });

    if (nextCalled) throw new Error('next() must not be called without auth');
    if (res.statusCode !== 401) throw new Error(`Expected 401, got ${res.statusCode}`);
    if (!res.data?.message?.includes('Authentication required')) {
      throw new Error(`Unexpected message: ${res.data?.message}`);
    }
  });

  await test('requireFounderAuth allows authenticated request with valid token', async () => {
    const validToken = generateToken({
      id: 'founder_1_govind',
      email: f1Email,
      name: 'Govind Rathod',
      role: 'founder',
    });

    const req = {
      cookies: {
        [TOKEN_COOKIE_NAME]: validToken,
      },
      headers: {},
    };
    const res = createMockRes();
    let nextCalled = false;

    await requireFounderAuth(req, res, () => {
      nextCalled = true;
    });

    if (!nextCalled) throw new Error('next() must be called with valid token');
    if (!req.founder) throw new Error('req.founder must be attached');
    if (req.founder.email !== f1Email) throw new Error('Founder email mismatch on req.founder');
  });

  await test('requireFounderAuth rejects and clears invalid/tampered token with 401', async () => {
    const req = {
      cookies: {
        [TOKEN_COOKIE_NAME]: 'tampered.jwt.token.12345',
      },
      headers: {},
    };
    const res = createMockRes();
    let nextCalled = false;

    await requireFounderAuth(req, res, () => {
      nextCalled = true;
    });

    if (nextCalled) throw new Error('next() must not be called with invalid token');
    if (res.statusCode !== 401) throw new Error(`Expected 401, got ${res.statusCode}`);
    if (!res.clearedCookies.some((c) => c.name === TOKEN_COOKIE_NAME)) {
      throw new Error('Invalid token must clear auth cookie');
    }
  });

  await test('GET /api/auth/me returns authenticated founder profile', async () => {
    const req = {
      founder: {
        id: 'founder_1_govind',
        name: 'Govind Rathod',
        email: f1Email,
        role: 'founder',
      },
    };
    const res = createMockRes();

    getMe(req, res);

    if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode}`);
    if (res.data?.data?.founder?.name !== 'Govind Rathod') throw new Error('Founder name mismatch');
  });

  await test('POST /api/auth/logout clears HTTP-only cookie', async () => {
    const req = {};
    const res = createMockRes();

    logout(req, res);

    if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode}`);
    if (!res.clearedCookies.some((c) => c.name === TOKEN_COOKIE_NAME)) {
      throw new Error('Logout must clear auth cookie');
    }
  });

  // ==========================================
  // 5. DATA AGGREGATION & SCHEMAS
  // ==========================================
  await test('Founder Model schema defines required paths with password select: false', async () => {
    const schema = Founder.schema;
    const paths = schema.paths;

    if (!paths.email) throw new Error('Missing email path in Founder schema');
    if (!paths.password) throw new Error('Missing password path in Founder schema');
    if (paths.password.options.select !== false) {
      throw new Error('Founder password must be select: false by default');
    }
  });

  await test('Analytics & Inquiries models maintain index definitions', async () => {
    const inquiryIndexes = Inquiry.schema.indexes();
    const analyticsIndexes = AnalyticsEvent.schema.indexes();

    if (!inquiryIndexes || inquiryIndexes.length === 0) throw new Error('Missing Inquiry indexes');
    if (!analyticsIndexes || analyticsIndexes.length === 0) throw new Error('Missing Analytics indexes');
  });

  console.log('--------------------------------------------------------');
  console.log(`Test Results: ${passed} Passed, ${failed} Failed`);
  console.log('--------------------------------------------------------');

  if (failed > 0) process.exit(1);
}

runPhase5TestSuite().catch((err) => {
  console.error('[Fatal Test Error]:', err);
  process.exit(1);
});

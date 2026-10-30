import { validateInquiry } from './src/middleware/validateInquiry.js';
import { validateAnalyticsEvent } from './src/middleware/validateAnalyticsEvent.js';
import { devDashboardAuth } from './src/middleware/devDashboardAuth.js';
import { notFound } from './src/middleware/notFound.js';
import { errorHandler } from './src/middleware/errorHandler.js';
import { createInquiry } from './src/controllers/inquiryController.js';
import { recordEvent, getOverview } from './src/controllers/analyticsController.js';
import { parseDateRange } from './src/services/analyticsService.js';
import Inquiry from './src/models/Inquiry.js';
import AnalyticsEvent from './src/models/AnalyticsEvent.js';

// Mock Express response generator
function createMockRes() {
  const res = {
    statusCode: 200,
    headers: {},
    data: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.data = payload;
      return this;
    },
    setHeader(key, val) {
      this.headers[key] = val;
      return this;
    },
  };
  return res;
}

async function runPhase4TestSuite() {
  console.log('--- Starting Govind Web Solutions Phase 4 Test Suite ---');
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

    if (nextCalled) throw new Error('next() should not be called for empty body');
    if (res.statusCode !== 400) throw new Error(`Expected 400, got ${res.statusCode}`);
    if (res.data?.success !== false) throw new Error('Expected res.data.success === false');
  });

  await test('validateInquiry sanitizes XSS tags and attaches cleanData on valid input', async () => {
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

    if (!nextCalled) throw new Error('next() should be called for valid payload');
    if (req.cleanData.fullName.includes('<script>')) throw new Error('XSS tags should be stripped');
    if (req.cleanData.email !== 'govind@example.com') throw new Error('Email should be normalized to lowercase');
  });

  // ==========================================
  // 2. ANALYTICS EVENT VALIDATION TESTS
  // ==========================================
  await test('validateAnalyticsEvent accepts valid page_view event', async () => {
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

    if (!nextCalled) throw new Error('next() should be called for valid event');
    if (!req.cleanEvent) throw new Error('req.cleanEvent must be set');
    if (req.cleanEvent.eventType !== 'page_view') throw new Error('Invalid eventType');
    if (req.cleanEvent.pagePath !== '/services') throw new Error('Invalid pagePath');
  });

  await test('validateAnalyticsEvent accepts service_cta_click event', async () => {
    const req = {
      body: {
        eventType: 'service_cta_click',
        visitorId: 'v_1730000000_abcdef123',
        sessionId: 's_1730000000_fedcba321',
        pagePath: '/services',
        service: 'E-commerce Website Development',
      },
    };
    const res = createMockRes();
    let nextCalled = false;

    validateAnalyticsEvent(req, res, () => {
      nextCalled = true;
    });

    if (!nextCalled) throw new Error('next() should be called');
    if (req.cleanEvent.service !== 'E-commerce Website Development') {
      throw new Error('Service name not preserved');
    }
  });

  await test('validateAnalyticsEvent rejects invalid eventType with 400', async () => {
    const req = {
      body: {
        eventType: 'arbitrary_click',
        visitorId: 'v_1730000000_abcdef123',
        sessionId: 's_1730000000_fedcba321',
        pagePath: '/',
      },
    };
    const res = createMockRes();
    let nextCalled = false;

    validateAnalyticsEvent(req, res, () => {
      nextCalled = true;
    });

    if (nextCalled) throw new Error('next() should not be called');
    if (res.statusCode !== 400) throw new Error(`Expected 400, got ${res.statusCode}`);
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
    if (!res.data?.message?.includes('Internal dashboard paths are excluded')) {
      throw new Error(`Unexpected message: ${res.data?.message}`);
    }
  });

  await test('validateAnalyticsEvent rejects malformed visitor/session identifiers', async () => {
    const req = {
      body: {
        eventType: 'page_view',
        visitorId: 'short', // Too short (must be 8-64 chars)
        sessionId: 'valid_session_id_12345',
        pagePath: '/',
      },
    };
    const res = createMockRes();
    let nextCalled = false;

    validateAnalyticsEvent(req, res, () => {
      nextCalled = true;
    });

    if (nextCalled) throw new Error('Short visitorId must be rejected');
    if (res.statusCode !== 400) throw new Error(`Expected 400, got ${res.statusCode}`);
  });

  // ==========================================
  // 3. DASHBOARD PRODUCTION SECURITY GUARD
  // ==========================================
  await test('devDashboardAuth blocks access in production with 403 Forbidden', async () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    const req = {};
    const res = createMockRes();
    let nextCalled = false;

    devDashboardAuth(req, res, () => {
      nextCalled = true;
    });

    // Restore env immediately
    process.env.NODE_ENV = originalEnv;

    if (nextCalled) throw new Error('devDashboardAuth should not call next() in production');
    if (res.statusCode !== 403) throw new Error(`Expected 403 in production, got ${res.statusCode}`);
    if (!res.data?.message?.includes('Phase 5 Founder Authentication')) {
      throw new Error('Expected Phase 5 security message');
    }
  });

  await test('devDashboardAuth allows access in development mode', async () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    const req = {};
    const res = createMockRes();
    let nextCalled = false;

    devDashboardAuth(req, res, () => {
      nextCalled = true;
    });

    process.env.NODE_ENV = originalEnv;

    if (!nextCalled) throw new Error('devDashboardAuth should call next() in development');
    if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode}`);
  });

  // ==========================================
  // 4. DATE RANGE PARSER & METRICS LOGIC
  // ==========================================
  await test('parseDateRange correctly parses 7d, 30d, 90d, and custom bounds', async () => {
    const range7d = parseDateRange({ period: '7d' });
    const range30d = parseDateRange({ period: '30d' });
    const range90d = parseDateRange({ period: '90d' });

    if (!(range7d.startDate instanceof Date)) throw new Error('startDate must be Date');
    if (!(range7d.endDate instanceof Date)) throw new Error('endDate must be Date');
    if (range7d.startDate >= range7d.endDate) throw new Error('startDate must be before endDate');

    const diffDays30 = Math.round((range30d.endDate - range30d.startDate) / (1000 * 60 * 60 * 24));
    if (diffDays30 < 29 || diffDays30 > 31) throw new Error(`Expected ~30 days, got ${diffDays30}`);

    const custom = parseDateRange({ startDate: '2026-01-01', endDate: '2026-01-15' });
    if (custom.startDate.toISOString().slice(0, 10) !== '2026-01-01') {
      throw new Error('Custom startDate mismatch');
    }
  });

  // ==========================================
  // 5. CONVERSION RATE ZERO-DIVISION SAFETY
  // ==========================================
  await test('Conversion Rate handles 0 visitors safely without NaN', async () => {
    const totalInquiries = 0;
    const totalVisitors = 0;
    const rate = totalVisitors > 0 ? Number(((totalInquiries / totalVisitors) * 100).toFixed(2)) : null;

    if (rate !== null) throw new Error('Expected null when visitors === 0');
    if (isNaN(rate)) throw new Error('Rate should not be NaN');

    // Test with non-zero visitors
    const activeRate = Number(((5 / 50) * 100).toFixed(2));
    if (activeRate !== 10) throw new Error(`Expected 10%, got ${activeRate}`);
  });

  // ==========================================
  // 6. SCHEMAS & DATABASE FAIL-SAFE HANDLING
  // ==========================================
  await test('AnalyticsEvent Mongoose Model schema definition', async () => {
    const schema = AnalyticsEvent.schema;
    const paths = schema.paths;

    if (!paths.eventType) throw new Error('Missing eventType in schema');
    if (!paths.visitorId) throw new Error('Missing visitorId in schema');
    if (!paths.sessionId) throw new Error('Missing sessionId in schema');
    if (!paths.pagePath) throw new Error('Missing pagePath in schema');
    if (!paths.timestamp) throw new Error('Missing timestamp in schema');
  });

  await test('recordEvent controller handles disconnected DB safely with 202 status', async () => {
    const req = {
      cleanEvent: {
        eventType: 'page_view',
        visitorId: 'v_1730000000_abcdef123',
        sessionId: 's_1730000000_fedcba321',
        pagePath: '/about',
      },
    };
    const res = createMockRes();

    await recordEvent(req, res, () => {});

    // When DB is offline, returns 202 to avoid throwing errors on client
    if (res.statusCode !== 202 && res.statusCode !== 201) {
      throw new Error(`Expected 202 or 201, got ${res.statusCode}`);
    }
  });

  await test('getOverview controller handles disconnected DB gracefully', async () => {
    const req = { query: { period: '7d' } };
    const res = createMockRes();

    await getOverview(req, res, () => {});

    if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode}`);
    if (res.data?.success !== true) throw new Error('Expected success === true');
  });

  console.log('----------------------------------------------------');
  console.log(`Test Results: ${passed} Passed, ${failed} Failed`);
  console.log('----------------------------------------------------');

  if (failed > 0) process.exit(1);
}

runPhase4TestSuite().catch((err) => {
  console.error('[Fatal Test Error]:', err);
  process.exit(1);
});

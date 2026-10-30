import { validateInquiry } from './src/middleware/validateInquiry.js';
import { notFound } from './src/middleware/notFound.js';
import { errorHandler } from './src/middleware/errorHandler.js';
import { createInquiry } from './src/controllers/inquiryController.js';
import Inquiry from './src/models/Inquiry.js';

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

async function runDirectTests() {
  console.log('--- Starting Govind Web Solutions Phase 3 Unit & Middleware Test Suite ---');
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

  // Test 1: validateInquiry rejects missing required fields
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
    if (!Array.isArray(res.data?.errors) || res.data.errors.length < 3) {
      throw new Error('Expected at least 3 validation errors');
    }
  });

  // Test 2: validateInquiry rejects invalid email syntax
  await test('validateInquiry rejects invalid email address format', async () => {
    const req = {
      body: {
        fullName: 'Jane Doe',
        email: 'bad-email-format',
        service: 'Business Website Development',
        projectDescription: 'We need an enterprise agency website.',
        preferredContactMethod: 'Email',
      },
    };
    const res = createMockRes();
    let nextCalled = false;

    validateInquiry(req, res, () => {
      nextCalled = true;
    });

    if (nextCalled) throw new Error('next() should not be called for invalid email');
    if (res.statusCode !== 400) throw new Error(`Expected 400, got ${res.statusCode}`);
    const emailErr = res.data?.errors?.find((e) => e.field === 'email');
    if (!emailErr) throw new Error('Expected email field error');
  });

  // Test 3: validateInquiry rejects short description
  await test('validateInquiry rejects description with fewer than 10 characters', async () => {
    const req = {
      body: {
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        service: 'Business Website Development',
        projectDescription: 'Short',
        preferredContactMethod: 'Email',
      },
    };
    const res = createMockRes();
    let nextCalled = false;

    validateInquiry(req, res, () => {
      nextCalled = true;
    });

    if (nextCalled) throw new Error('next() should not be called for short description');
    if (res.statusCode !== 400) throw new Error(`Expected 400, got ${res.statusCode}`);
    const descErr = res.data?.errors?.find((e) => e.field === 'projectDescription');
    if (!descErr) throw new Error('Expected projectDescription field error');
  });

  // Test 4: validateInquiry rejects invalid contact method
  await test('validateInquiry rejects unsupported contact method', async () => {
    const req = {
      body: {
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        service: 'Business Website Development',
        projectDescription: 'Valid project description for testing.',
        preferredContactMethod: 'Smoke Signals',
      },
    };
    const res = createMockRes();
    let nextCalled = false;

    validateInquiry(req, res, () => {
      nextCalled = true;
    });

    if (nextCalled) throw new Error('next() should not be called for invalid method');
    if (res.statusCode !== 400) throw new Error(`Expected 400, got ${res.statusCode}`);
    const methodErr = res.data?.errors?.find((e) => e.field === 'preferredContactMethod');
    if (!methodErr) throw new Error('Expected preferredContactMethod field error');
  });

  // Test 5: validateInquiry sanitizes HTML tags and accepts valid payload
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
    if (!req.cleanData) throw new Error('req.cleanData should be set');
    if (req.cleanData.fullName.includes('<script>')) throw new Error('XSS tags should be stripped');
    if (req.cleanData.fullName !== 'alert("hack")Govind Rathod') {
      throw new Error(`Unexpected sanitized fullName: ${req.cleanData.fullName}`);
    }
    if (req.cleanData.email !== 'govind@example.com') {
      throw new Error(`Email should be normalized to lowercase: ${req.cleanData.email}`);
    }
    if (req.cleanData.projectDescription !== 'Need a scalable e-commerce store with modern checkout.') {
      throw new Error('projectDescription should be normalized from description');
    }
    if (req.cleanData.preferredContactMethod !== 'WhatsApp') {
      throw new Error('preferredContactMethod should be normalized from contactMethod');
    }
  });

  // Test 6: createInquiry controller handles disconnected DB safely with 503
  await test('createInquiry returns 503 safely when database is disconnected', async () => {
    const req = {
      cleanData: {
        fullName: 'Govind Rathod',
        email: 'govind@example.com',
        phone: '+91 9876543210',
        company: 'Govind Web Solutions',
        service: 'Custom Web Application Development',
        budget: '$10,000+',
        projectDescription: 'Building a cloud telemetry platform with real-time analytics.',
        preferredContactMethod: 'Email',
      },
    };
    const res = createMockRes();
    let nextError = null;

    await createInquiry(req, res, (err) => {
      nextError = err;
    });

    if (nextError) throw nextError;
    if (res.statusCode !== 503) throw new Error(`Expected 503, got ${res.statusCode}`);
    if (res.data?.success !== false) throw new Error('Expected success === false');
    if (!res.data?.message?.includes('database service is temporarily unavailable')) {
      throw new Error(`Expected safe DB unavailable message, got: ${res.data?.message}`);
    }
  });

  // Test 7: notFound middleware returns 404
  await test('notFound middleware returns 404 with error message', async () => {
    const req = { originalUrl: '/api/non-existent' };
    const res = createMockRes();

    notFound(req, res);
    if (res.statusCode !== 404) throw new Error(`Expected 404, got ${res.statusCode}`);
    if (res.data?.success !== false) throw new Error('Expected success === false');
    if (!res.data?.message?.includes('Endpoint /api/non-existent not found')) {
      throw new Error(`Unexpected message: ${res.data?.message}`);
    }
  });

  // Test 8: errorHandler middleware handles Mongoose ValidationError without leaking stack
  await test('errorHandler formats ValidationError with 400 status', async () => {
    const fakeMongooseError = {
      name: 'ValidationError',
      errors: {
        email: { path: 'email', message: 'Email address is invalid' },
      },
    };
    const req = {};
    const res = createMockRes();

    errorHandler(fakeMongooseError, req, res, () => {});
    if (res.statusCode !== 400) throw new Error(`Expected 400, got ${res.statusCode}`);
    if (res.data?.success !== false) throw new Error('Expected success === false');
    if (!Array.isArray(res.data?.errors)) throw new Error('Expected errors array');
    if (res.data?.errors[0]?.field !== 'email') throw new Error('Expected field === email');
  });

  // Test 9: Inquiry Model Schema properties
  await test('Inquiry Mongoose Model defines required schema paths and options', async () => {
    const schema = Inquiry.schema;
    const paths = schema.paths;

    if (!paths.fullName) throw new Error('Missing fullName in schema');
    if (!paths.fullName.isRequired) throw new Error('fullName must be required');

    if (!paths.email) throw new Error('Missing email in schema');
    if (!paths.email.isRequired) throw new Error('email must be required');

    if (!paths.service) throw new Error('Missing service in schema');
    if (!paths.service.isRequired) throw new Error('service must be required');

    if (!paths.projectDescription) throw new Error('Missing projectDescription in schema');
    if (!paths.projectDescription.isRequired) throw new Error('projectDescription must be required');

    if (!paths.preferredContactMethod) throw new Error('Missing preferredContactMethod in schema');
    if (!paths.status) throw new Error('Missing status in schema');
    if (paths.status.defaultValue !== 'new') throw new Error('status default must be "new"');
  });

  console.log('----------------------------------------------------');
  console.log(`Test Results: ${passed} Passed, ${failed} Failed`);
  console.log('----------------------------------------------------');

  if (failed > 0) process.exit(1);
}

runDirectTests().catch((err) => {
  console.error('[Fatal Test Error]:', err);
  process.exit(1);
});

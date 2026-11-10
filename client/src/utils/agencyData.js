// Agency Services, Projects, Technologies, Team Data & Company Configuration

/**
 * Centralized, configurable company configuration & contact channels
 */
export const COMPANY_CONFIG = {
  name: 'Govind Web Solutions',
  tagline: 'Professional Web Development & Digital Solutions Agency',
  email: 'contact@govindwebsolutions.com',
  phoneDisplay: '+91 98765 43210',
  whatsappNumber: '919876543210', // Digits only with country code (e.g. 91 for India)
  location: 'India — Delivering Worldwide Remotely',
  operatingHours: 'Monday – Saturday: 9:00 AM – 8:00 PM IST',
  responseTime: 'Replies within 24 business hours (Instant on WhatsApp)',
};

/**
 * Generate formatted WhatsApp chat inquiry URL with pre-filled context
 * @param {Object} options
 * @param {string} [options.service] - Requested service title
 * @param {string} [options.name] - Client full name
 * @param {string} [options.context] - Additional message context
 * @returns {string} Fully encoded wa.me deep link
 */
export const getWhatsAppInquiryUrl = ({ service, name, context } = {}) => {
  let message = `Hi Govind Web Solutions!`;
  if (name && name.trim()) {
    message += ` My name is ${name.trim()}.`;
  }
  if (service && service.trim()) {
    message += ` I am interested in your "${service.trim()}" service.`;
  } else {
    message += ` I would like to inquire about a website development project for my business.`;
  }
  if (context && context.trim()) {
    message += ` ${context.trim()}`;
  }
  message += ` Could we discuss the requirements and timeline?`;

  return `https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
};

export const AGENCY_SERVICES = [
  {
    id: 'business-website-development',
    title: 'Business Website Development',
    targetAudience: 'Small & Medium Businesses, Corporate Agencies, Local Services',
    shortDesc: 'Bespoke corporate websites engineered to represent your brand, captivate prospective clients, and convert visitors into measurable business inquiries.',
    fullDesc: 'We design and engineer bespoke corporate websites tailored to your company identity. Built with lightning-fast load times, SEO-friendly semantic markup, and mobile-first responsiveness, our business platforms convey authority and convert high-intent visitors.',
    realWorldExample: 'A coaching institute, consulting firm, or healthcare provider requiring a mobile-friendly flagship site with course details, credentials, and direct WhatsApp / form booking.',
    typicalDeliverables: [
      'Custom UI/UX Design Tailored to Brand',
      '100% Mobile, Tablet & Desktop Responsive Layouts',
      'Search Engine Optimization & Google Meta Setup',
      'Direct WhatsApp Chat & Inquiry Lead Capture',
      'SSL Security, Fast CDN Hosting & Domain Linking',
    ],
    iconName: 'Globe',
    keyFeatures: [
      'Custom responsive design across mobile, tablet, and ultra-wide displays',
      'Search engine optimized (SEO) architecture and structured metadata',
      'Performance-tuned core web vitals and sub-second load times',
      'Accessible, clean UI components built for intuitive navigation',
      'Integrated contact mechanisms, lead capture, and analytics ready',
    ],
    businessBenefits: [
      'Establishes immediate credibility and brand authority with enterprise clients',
      'Improves organic search rankings and local business discovery on Google',
      'Increases inquiry conversion rates with strategic call-to-actions and WhatsApp',
    ],
    technologies: ['React', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
    popular: true,
  },
  {
    id: 'ecommerce-development',
    title: 'E-commerce Website Development',
    targetAudience: 'Retail Shops, Boutique Brands, Wholesalers, Direct-to-Consumer',
    shortDesc: 'Scalable online storefronts with seamless product catalogs, frictionless checkout flows, and secure transaction handling.',
    fullDesc: 'Empower your online retail operations with custom-crafted e-commerce storefronts. From complex product matrices and inventory tracking to secure payment gateways and one-click checkouts, we build shopping platforms that maximize average order value.',
    realWorldExample: 'A retail clothing or electronics store expanding online with searchable product catalogs, customer cart, automated order notifications, and instant WhatsApp ordering.',
    typicalDeliverables: [
      'Interactive Product Catalog & Category Filters',
      'Shopping Cart & Frictionless Checkout Flow',
      'Payment Gateway Integration (Razorpay, Stripe, UPI, Cards)',
      'Customer Accounts & Order Tracking Portal',
      'Automated Order Notifications via Email & WhatsApp',
    ],
    iconName: 'ShoppingBag',
    keyFeatures: [
      'Intuitive product catalog with dynamic filtering, sorting, and search',
      'Frictionless multi-step and single-page checkout flows',
      'Secure payment gateway integration (Stripe, PayPal, Razorpay)',
      'Customer account portals, order tracking, and wishlist management',
      'Mobile-optimized shopping cart and responsive micro-interactions',
    ],
    businessBenefits: [
      'Reduces cart abandonment with rapid checkout experiences',
      'Scales seamlessly with seasonal traffic spikes and expanding SKUs',
      'Protects customer transactions with modern security standards',
    ],
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    popular: true,
  },
  {
    id: 'custom-web-applications',
    title: 'Custom Web Application Development',
    targetAudience: 'Startups, SaaS Founders, Operations Managers, Growing Enterprises',
    shortDesc: 'Tailored web software, interactive customer portals, and internal workflows engineered to solve unique business challenges.',
    fullDesc: 'Transform complex business logic into high-performance web applications. We build interactive SaaS applications, internal management portals, and client-facing digital tools that streamline operational efficiency.',
    realWorldExample: 'A startup or logistics firm replacing messy spreadsheets with a secure cloud portal for team tracking, client reports, automated invoicing, and live analytics.',
    typicalDeliverables: [
      'Interactive Single Page Application (SPA) Interface',
      'Role-Based User Authentication & Permissions',
      'Real-Time Analytics Dashboards & Data Visualizations',
      'Automated Document / Invoice PDF Generation',
      'Secure Cloud Database Setup & API Connections',
    ],
    iconName: 'LayoutGrid',
    keyFeatures: [
      'Modular Single Page Application (SPA) architecture',
      'Role-based access control (RBAC) and granular permission handling',
      'Real-time data synchronization and interactive dashboards',
      'Complex business workflow automation and custom reporting',
      'Cross-browser compatibility and responsive data tables',
    ],
    businessBenefits: [
      'Eliminates manual bottlenecks by automating critical workflows',
      'Provides actionable data visibility to leadership in real time',
      'Delivers tailored functionality that off-the-shelf software cannot match',
    ],
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    popular: true,
  },
  {
    id: 'full-stack-development',
    title: 'Full Stack Development',
    targetAudience: 'Funded Startups, Digital Products, Scaling Businesses',
    shortDesc: 'End-to-end development bridging intuitive client-side interfaces with robust server architectures and databases.',
    fullDesc: 'Comprehensive full-stack engineering utilizing modern JavaScript/TypeScript ecosystems. We architect seamless data flow from responsive React frontends through secure Express API services down to optimized MongoDB and MySQL databases.',
    realWorldExample: 'An end-to-end digital booking or marketplace platform connecting customers with service providers, complete with payments, reviews, and admin dashboard.',
    typicalDeliverables: [
      'Front-to-Back End-to-End Architecture',
      'Scalable Database Schema Modeling',
      'Secure REST API Endpoints with Rate Limiting',
      'Complete Codebase Repository with Documentation',
      'Automated Production Deployment & CI/CD Setup',
    ],
    iconName: 'Layers',
    keyFeatures: [
      'Cohesive architectural design connecting frontend and backend',
      'Scalable database schema modeling and query optimization',
      'Secure token and cookie-based session management',
      'RESTful API architecture adhering to industry standards',
      'Continuous environment-based configuration and error logging',
    ],
    businessBenefits: [
      'Single point of engineering accountability for the entire tech stack',
      'Lower maintenance overhead through unified JavaScript stack conventions',
      'Rapid iterative feature delivery and cohesive testing coverage',
    ],
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'MySQL'],
    popular: false,
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    targetAudience: 'Product Founders, Website Owners, Apps Needing Modernization',
    shortDesc: 'User-centered digital design combining aesthetic elegance with functional usability, high conversion rates, and accessibility.',
    fullDesc: 'Great software starts with empathetic design. We produce high-fidelity wireframes, interactive component design systems, and responsive user journeys that ensure your digital product is as effortless to use as it is stunning to look at.',
    realWorldExample: 'Transforming an outdated, cluttered web interface into a sleek, dark-mode or clean modern experience that doubles visitor time-on-site.',
    typicalDeliverables: [
      'Figma High-Fidelity UI Mockups & Wireframes',
      'Interactive Clickable Prototypes',
      'Design System with Colors, Typography & Components',
      'Mobile & Desktop Viewport Specifications',
      'Developer-Ready Asset Handoff',
    ],
    iconName: 'Palette',
    keyFeatures: [
      'Interactive wireframing and user journey mapping',
      'Comprehensive design systems with reusable atomic tokens',
      'WCAG accessibility compliance (high contrast, readable typography)',
      'Subtle motion design and meaningful micro-interactions',
      'High-fidelity desktop, tablet, and mobile interface design',
    ],
    businessBenefits: [
      'Elevates brand perception and positions your business as a market leader',
      'Reduces user confusion and decreases customer support requests',
      'Accelerates frontend engineering with clear design tokens and specs',
    ],
    technologies: ['Figma', 'Tailwind CSS', 'CSS3', 'Responsive Design'],
    popular: false,
  },
  {
    id: 'api-development-integration',
    title: 'API Development & Integration',
    targetAudience: 'Software Teams, E-commerce Stores, Businesses with Multiple Tools',
    shortDesc: 'Secure, documented RESTful APIs and third-party service connections powering modern connected ecosystems.',
    fullDesc: 'Connect your software with external services or build robust APIs for web and mobile clients. We develop clean, well-documented REST APIs with authentication, rate limiting, and structured JSON payloads.',
    realWorldExample: 'Connecting an online website to a CRM, payment gateway, WhatsApp notification system, or external inventory database.',
    typicalDeliverables: [
      'Secure REST API Endpoints with JSON Contracts',
      'Third-Party Payment & Messaging Webhooks',
      'Interactive Swagger / Postman Documentation',
      'Input Validation & Token-Based Authentication',
      'Rate Limiting & Protection Against Abuse',
    ],
    iconName: 'Cpu',
    keyFeatures: [
      'RESTful endpoint design with standard HTTP status codes and semantics',
      'Secure authentication via JWT, API keys, or session cookies',
      'Third-party integrations (payment gateways, CRM, messaging, email)',
      'Granular request rate limiting, input sanitization, and CORS controls',
      'Predictable JSON error contracts and interactive API documentation',
    ],
    businessBenefits: [
      'Enables seamless data exchange between your internal and external systems',
      'Safeguards sensitive backend databases from direct exposure',
      'Future-proofs your digital assets for mobile apps and partner syndication',
    ],
    technologies: ['Node.js', 'Express.js', 'REST APIs', 'Postman', 'JSON'],
    popular: false,
  },
  {
    id: 'website-redesign-optimization',
    title: 'Website Redesign & Optimization',
    targetAudience: 'Businesses with Slow, Outdated, or Non-Converting Websites',
    shortDesc: 'Revitalize outdated websites with modern aesthetics, elevated speed metrics, SEO enhancements, and conversion improvements.',
    fullDesc: 'Is your current website lagging behind your competitors? We revitalize legacy sites by rewriting outdated code, modernizing design elements, optimizing asset delivery, and restructuring content hierarchies to revitalize search engine performance.',
    realWorldExample: 'Upgrading a slow, 5-year-old WordPress website to a modern, sub-second React platform that ranks higher on Google and looks exceptional on smartphones.',
    typicalDeliverables: [
      'Complete Code & Performance Audit Report',
      'Modern Visual Refresh & Responsive Rebuilding',
      'Core Web Vitals Optimization (Sub-Second Load Times)',
      'SEO Preservation & 301 Redirect Mapping',
      'New Lead Generation Forms & WhatsApp CTAs',
    ],
    iconName: 'Sparkles',
    keyFeatures: [
      'Core Web Vitals audit and performance optimization',
      'Modern code refactoring removing bloated legacy dependencies',
      'Mobile responsiveness overhaul and touch target optimization',
      'Search engine URL redirect strategy preserving existing authority',
      'Refined typographic scale and high-contrast color balancing',
    ],
    businessBenefits: [
      'Prevents visitor bounce rates caused by slow page loads',
      'Recovers lost organic search traffic and search engine rankings',
      'Modernizes brand image without losing valuable legacy content',
    ],
    technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Lighthouse', 'Vite'],
    popular: false,
  },
  {
    id: 'website-maintenance-support',
    title: 'Website Maintenance & Support',
    targetAudience: 'Active Websites, Busy Business Owners, E-commerce Stores',
    shortDesc: 'Proactive monitoring, security patching, dependency upgrades, and ongoing technical support keeping your systems online.',
    fullDesc: 'Keep your digital flagship secure, updated, and operating without disruption. Our maintenance service covers proactive security audits, dependency updates, uptime monitoring, performance checks, and rapid bug resolution.',
    realWorldExample: 'A monthly retainer where we handle backups, update banners and products, monitor 99.9% uptime, and resolve any urgent technical bugs within hours.',
    typicalDeliverables: [
      'Regular Cloud Backups & Disaster Recovery Guard',
      'Security Patching & Dependency Upgrades',
      '24/7 Uptime & Error Log Monitoring',
      'Content Updates, Banner Swaps & Page Tweaks',
      'Priority Founder Support via WhatsApp / Email',
    ],
    iconName: 'ShieldCheck',
    keyFeatures: [
      'Scheduled dependency updates and security patch management',
      'Proactive uptime and error log monitoring',
      'Database backups and disaster recovery planning',
      'Cross-browser and device compatibility regression checks',
      'Dedicated technical support channel for urgent fixes',
    ],
    businessBenefits: [
      'Prevents costly business downtime and revenue loss',
      'Protects your business reputation against security vulnerabilities',
      'Frees your internal team to focus on core operations, not server bugs',
    ],
    technologies: ['Git', 'GitHub', 'Node.js', 'MongoDB', 'Vite'],
    popular: false,
  },
];

export const AGENCY_INDUSTRIES = [
  {
    id: 'restaurants-hospitality',
    title: 'Restaurants, Cafes & Hotels',
    tag: 'Food & Hospitality',
    iconName: 'UtensilsCrossed',
    desc: 'Interactive digital QR menus, Google Maps discovery, table reservation inquiries, and instant WhatsApp food orders that boost direct revenue.',
    benefits: ['Mobile QR Menu Catalog', 'Table Booking Inquiries', 'Local SEO & Maps Ranking', 'Direct WhatsApp Orders'],
  },
  {
    id: 'education-coaching',
    title: 'Coaching & Tuition Institutes',
    tag: 'Education & Training',
    iconName: 'GraduationCap',
    desc: 'Structured course directories, batch schedules, syllabus download triggers, and direct admission inquiry forms designed to convert parents and students.',
    benefits: ['Course & Fee Details', 'Student Inquiry Forms', 'Batch Timetable Displays', 'Instant WhatsApp Consultation'],
  },
  {
    id: 'gyms-fitness-studios',
    title: 'Gyms & Fitness Studios',
    tag: 'Health & Fitness',
    iconName: 'Dumbbell',
    desc: 'High-energy fitness websites featuring membership plans, personal trainer showcases, class schedules, and 1-click WhatsApp free trial pass booking.',
    benefits: ['Membership Pricing Calculator', 'Trainer Showcase & Specialties', 'Class Schedule & Batch Tracker', '1-Day Free Trial Pass WhatsApp CTA'],
  },
  {
    id: 'retail-local-business',
    title: 'Retail Shops & Local Stores',
    tag: 'Retail & Commerce',
    iconName: 'Store',
    desc: 'Showcase physical store inventory online, attract nearby shoppers with local Google SEO, and accept inquiries and orders directly on WhatsApp.',
    benefits: ['Digital Product Showcase', 'Google Local Map Visibility', 'Promotional Offer Banners', 'One-Click WhatsApp Orders'],
  },
  {
    id: 'startups-entrepreneurs',
    title: 'Startups & Entrepreneurs',
    tag: 'Tech & Innovation',
    iconName: 'Rocket',
    desc: 'Rapid MVP prototyping, responsive SaaS web applications, founder telemetry dashboards, and scalable database backends built for product-market fit.',
    benefits: ['Rapid MVP Turnaround', 'Secure User Authentication', 'Custom RESTful APIs', 'Real-Time Analytics'],
  },
  {
    id: 'professionals-services',
    title: 'Doctors, Lawyers & Consultants',
    tag: 'Professional Services',
    iconName: 'Briefcase',
    desc: 'Authoritative personal & firm profiles, appointment booking request forms, client case studies, and credential verification that build immediate trust.',
    benefits: ['High-Trust Brand Presence', 'Appointment Request Forms', 'Verified Credentials Display', 'Mobile-First Accessibility'],
  },
  {
    id: 'corporate-enterprises',
    title: 'Corporate & Growing Businesses',
    tag: 'Enterprise & B2B',
    iconName: 'Building2',
    desc: 'Multi-page digital flagships, service matrices, corporate governance hubs, career portals, and high-volume inquiry pipelines.',
    benefits: ['Brand Authority Design', 'Custom RESTful APIs', 'Role-Based Access Control', 'Dedicated Maintenance Retainer'],
  },
];

export const AGENCY_FAQS = [
  {
    id: 'faq-1',
    question: 'How much does a website development project cost?',
    answer: 'We provide transparent, milestone-based pricing without hidden fees or surprise invoices. A clean corporate starter website differs in scope from a custom web application or multi-vendor store. Before kickoff, we provide an exact, itemized scope and fixed quotation based strictly on your project specifications.',
  },
  {
    id: 'faq-2',
    question: 'How long will it take to build and launch my website?',
    answer: 'Most standard business websites are fully designed, developed, and launched within 1 to 2 weeks. Custom web applications, e-commerce storefronts, or platforms with complex third-party integrations typically take 3 to 5 weeks depending on requirements.',
  },
  {
    id: 'faq-3',
    question: 'Will my website work smoothly on mobile phones and tablets?',
    answer: 'Yes, 100%. We engineer every platform with a mobile-first philosophy. Your site is thoroughly tested on smartphones, iPads, laptops, and ultra-wide desktop monitors to ensure sub-second page speed, readable typography, and intuitive touch navigation.',
  },
  {
    id: 'faq-4',
    question: 'Will my business be easily found on Google and search engines?',
    answer: 'Yes. Every project includes search engine optimization (SEO) fundamentals: semantic HTML5 markup, custom meta tags, OpenGraph social sharing cards, fast Core Web Vitals performance, XML sitemap generation, and Google Search Console indexing setup.',
  },
  {
    id: 'faq-5',
    question: 'Who owns the website source code and assets after completion?',
    answer: 'You own 100% of the code, design, and digital assets. Upon final project completion, we transfer the full GitHub repository, hosting controls, and production credentials directly to you with zero vendor lock-in.',
  },
  {
    id: 'faq-6',
    question: 'Can prospective customers contact me directly on WhatsApp?',
    answer: 'Yes! We configure smart WhatsApp integration across your site. When a visitor clicks the WhatsApp button, their message automatically includes the specific service or project they are viewing, enabling you to reply and close deals immediately.',
  },
  {
    id: 'faq-7',
    question: 'Do you offer ongoing website maintenance and technical support?',
    answer: 'Yes, we provide flexible ongoing maintenance packages. Our support covers scheduled dependency updates, regular database backups, 24/7 uptime monitoring, security patching, and content updates so your website continues operating without disruption.',
  },
];

export const AGENCY_TRUST_GUARANTEES = [
  {
    title: 'Direct Founder Collaboration',
    desc: 'You work directly with Govind Rathod and the agency co-founders. No junior account managers or communication silos.',
    iconName: 'Target',
  },
  {
    title: 'Milestone-Based Payment Security',
    desc: 'Projects are structured into clear, agreed milestones. You review working demonstrations before releasing phase payments.',
    iconName: 'ShieldCheck',
  },
  {
    title: 'Sub-Second Speed Guarantee',
    desc: 'Lightweight React + Tailwind architecture engineered for pristine Core Web Vitals and lightning-fast load times.',
    iconName: 'Zap',
  },
  {
    title: '100% Intellectual Property Ownership',
    desc: 'Zero proprietary lock-in. Full GitHub source code access and cloud credentials are transferred directly to you.',
    iconName: 'Code',
  },
];

export const AGENCY_PROJECTS = [
  // 1. Classes & Coaching
  {
    id: 'apex-academy',
    title: 'Apex Academy — Coaching & Test Prep Portal',
    category: 'Classes & Coaching',
    shortDesc: 'Modern coaching institute website featuring course syllabi, batch timetables, faculty credentials, and 1-click WhatsApp demo booking.',
    fullDesc: 'A lead-generating web platform built for coaching institutes and tuition academies. Enables prospective students and parents to review batch timings, fee structures, syllabus downloads, previous year rankers, and schedule a 2-day free demo class.',
    problem: 'Local coaching institutes lost prospective student admissions due to lack of an online timetable, fee transparency, and complicated phone enquiry processes.',
    solution: 'Designed a modern mobile-first coaching platform with instant WhatsApp inquiry CTAs, batch schedule filters, and automated parent callback requests.',
    technologies: ['React', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
    keyFeatures: [
      'Course catalog with fee structure & duration details',
      'Faculty credentials & student ranker showcase',
      '1-Click WhatsApp "Book Free Demo Class" CTA',
      'Downloadable PDF syllabus & prospectus'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/Code-With-Govind',
    isSample: true,
    featured: true,
    themeColor: 'from-amber-600 to-navy-900',
  },
  {
    id: 'edusphere-classes',
    title: 'EduSphere — Science & Commerce Classes',
    category: 'Classes & Coaching',
    shortDesc: 'Subject-wise coaching web platform with test series alerts, student testimonials, and admissions enquiry counter.',
    fullDesc: 'An academic flagship website engineered for high school and competitive exam classes with interactive batch availability and parent enquiry forms.',
    problem: 'Parents wanted easy online access to weekly test schedules, faculty backgrounds, and admission dates from their smartphones.',
    solution: 'Delivered a clean, trustworthy academic portal optimized for smartphone browsing with localized SEO ranking for neighborhood searches.',
    technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Express.js'],
    keyFeatures: [
      'Real-time batch vacancy and seat availability indicator',
      'Student success gallery and verified parent testimonials',
      'Quick inquiry capture connected directly to founder CRM',
      'Integrated Google Maps branch locator and timing guide'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/Code-With-Govind',
    isSample: true,
    featured: false,
    themeColor: 'from-blue-600 to-navy-950',
  },

  // 2. Gym & Fitness
  {
    id: 'ironcore-fitness',
    title: 'IronCore — Gym, Crossfit & Personal Training Studio',
    category: 'Gym & Fitness',
    shortDesc: 'High-energy fitness website featuring membership tiers, certified trainer profiles, workout schedules, and free trial pass booking.',
    fullDesc: 'A performance-driven web presence designed for commercial gyms and fitness centers. Converts local visitors into active gym members with transparent package comparisons, photo tour of equipment, and workout timetables.',
    problem: 'Walk-in conversion was low because prospective gym-goers could not inspect equipment, class timings, or pricing without visiting in person.',
    solution: 'Built a bold, dynamic dark-mode fitness site featuring high-res equipment galleries, class schedules (Zumba, CrossFit, Cardio), and WhatsApp trial pass booking.',
    technologies: ['React', 'Tailwind CSS', 'Node.js', 'Express.js'],
    keyFeatures: [
      'Interactive membership pricing calculator (Monthly, Quarterly, Annual)',
      'Certified personal trainer roster with specialization tags',
      'Instant "Claim 1-Day Free Trial Pass" WhatsApp CTA',
      'Weekly group workout timetable & batch tracker'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/Code-With-Govind',
    isSample: true,
    featured: true,
    themeColor: 'from-red-600 to-navy-950',
  },
  {
    id: 'fitpulse-yoga',
    title: 'FitPulse — Boutique Yoga & Calisthenics Hub',
    category: 'Gym & Fitness',
    shortDesc: 'Aesthetic wellness center platform with daily batch timetables, dietary consultation booking, and trainer intros.',
    fullDesc: 'A calm, wellness-focused digital platform tailored for yoga academies, pilates studios, and functional fitness centers.',
    problem: 'Clients struggled to find slot timings and book personal trial sessions smoothly on mobile devices.',
    solution: 'Engineered a minimalist, fast-loading booking interface with direct WhatsApp slot confirmation and automated reminder routing.',
    technologies: ['React', 'Tailwind CSS', 'JavaScript'],
    keyFeatures: [
      'Batch time slot picker for morning and evening classes',
      'Dietician & trainer appointment inquiry form',
      'Client transformation stories and visual milestone gallery',
      'Interactive membership benefits breakdown'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/Code-With-Govind',
    isSample: true,
    featured: false,
    themeColor: 'from-emerald-600 to-navy-900',
  },

  // 3. Cafe / Restro / Hotel
  {
    id: 'urban-table-cafe',
    title: 'The Urban Table — Cafe, Restro & Lounge',
    category: 'Cafe / Restro / Hotel',
    shortDesc: 'Atmospheric restaurant & cafe website featuring digital QR food menu, table reservation system, and food photo gallery.',
    fullDesc: 'A visually appetizing web platform crafted for cafes, fine-dining restaurants, and lounges. Allows diners to view the full categorized menu with prices, discover chef specials, and reserve a table in 2 clicks.',
    problem: 'Restaurant relied solely on paper menus and third-party food app commissions, losing direct diners and table reservations.',
    solution: 'Created a contactless digital menu web app with high-res food photography, ambiance showcase, and zero-commission direct WhatsApp table reservations.',
    technologies: ['React', 'Tailwind CSS', 'Node.js', 'Express.js'],
    keyFeatures: [
      'Categorized food & beverage menu with pricing and dietary tags',
      'Instant table reservation form with date/time/guest count',
      'Direct WhatsApp ordering for takeout/pickup orders',
      'Google Maps direction integration and opening hours indicator'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/Code-With-Govind',
    isSample: true,
    featured: true,
    themeColor: 'from-amber-500 to-stone-900',
  },
  {
    id: 'velvet-haven-hotel',
    title: 'Velvet Haven — Luxury Boutique Stay & Resort',
    category: 'Cafe / Restro / Hotel',
    shortDesc: 'Hotel & resort showcase featuring room categories, amenities overview, banquet hall inquiry, and direct booking.',
    fullDesc: 'A premium hospitality website built for boutique hotels, resorts, and banquet spaces. Showcases room interiors, tariffs, banquet capacity for weddings/events, and location connectivity.',
    problem: 'High OTA platform commissions reduced profit margins on direct room bookings and banquet leads.',
    solution: 'Delivered an elegant, high-conversion hospitality website enabling direct guest inquiries and wedding banquet booking leads.',
    technologies: ['React', 'Tailwind CSS', 'JavaScript', 'REST APIs'],
    keyFeatures: [
      'Room comparison matrix (Deluxe, Suite, Executive) with tariff details',
      'Banquet hall & event booking lead capture form',
      'Interactive room gallery and amenity icons',
      'Direct WhatsApp booking helpline for instant tariff discount'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/Code-With-Govind',
    isSample: true,
    featured: false,
    themeColor: 'from-violet-700 to-navy-950',
  },

  // 4. E-commerce
  {
    id: 'apex-commerce',
    title: 'Apex Commerce — Headless Retail Platform',
    category: 'E-commerce',
    shortDesc: 'A modern, high-speed online storefront with lightning-fast catalog filtering, instant search, and streamlined checkout.',
    fullDesc: 'Apex Commerce is a high-performance headless retail architecture designed for modern lifestyle brands. Featuring sub-500ms catalog search, responsive product showcases, customer wishlists, and an optimized single-page checkout flow.',
    problem: 'Traditional monolithic storefronts suffered from sluggish page transitions, leading to high cart abandonment on mobile devices.',
    solution: 'Built an optimized Single Page Application utilizing React and Tailwind CSS, backed by a REST API for rapid JSON inventory synchronization.',
    technologies: ['React', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
    keyFeatures: [
      'Sub-500ms dynamic product filtering and search',
      'Frictionless responsive single-page checkout flow',
      'Persistent shopping cart with local state hydration',
      'Category badges and high-resolution responsive product galleries'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/Code-With-Govind',
    isSample: true,
    featured: true,
    themeColor: 'from-blue-600 to-indigo-900',
  },
  {
    id: 'gt-clothing-hub',
    title: 'GT Clothing Hub — Multi-Brand Apparel Storefront',
    category: 'E-commerce',
    shortDesc: 'E-commerce clothing store featuring size variants, visual color swatches, cart management, and WhatsApp quick checkout.',
    fullDesc: 'A full-featured fashion and retail web store engineered for clothing brands. Allows shoppers to filter by sizes, fabric types, and trending seasonal collections with instant WhatsApp order transmission.',
    problem: 'Fashion boutiques needed an easy way to showcase new arrivals to Instagram and WhatsApp audiences without complex merchant setups.',
    solution: 'Engineered a lightweight catalog store with product quick-view modals and one-tap WhatsApp "Order This Outfit" messaging.',
    technologies: ['React', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    keyFeatures: [
      'Dynamic size and color variant selector',
      'Instant WhatsApp order button with prefilled product title & SKU',
      'Visual product lookbook carousel',
      'Mobile-optimized drawer navigation'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/Code-With-Govind',
    isSample: true,
    featured: false,
    themeColor: 'from-pink-600 to-purple-950',
  },

  // 5. Business Websites
  {
    id: 'nexus-logistics',
    title: 'Nexus Logistics — Freight & Fleet Corporate Portal',
    category: 'Business Websites',
    shortDesc: 'Enterprise corporate web platform featuring route estimation tools, client inquiry portals, and company service showcases.',
    fullDesc: 'A corporate web platform built for a commercial transportation agency. Delivers authoritative company presentation, interactive freight quote estimation, multi-terminal location directory, and career inquiry handling.',
    problem: 'Outdated static corporate site lacked responsive mobile layouts and failed to capture qualified commercial freight leads.',
    solution: 'Redesigned the entire digital presence with modern dark navy branding, semantic SEO structures, and multi-step inquiry capture.',
    technologies: ['React', 'JavaScript', 'Tailwind CSS', 'HTML5', 'Node.js'],
    keyFeatures: [
      'Interactive quote calculator with service selection',
      'Interactive depot location finder and service map',
      'Strict client-side form validation and inquiry routing',
      'Corporate leadership and regulatory compliance sections'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/Code-With-Govind',
    isSample: true,
    featured: true,
    themeColor: 'from-indigo-600 to-slate-900',
  },
  {
    id: 'vanguard-capital',
    title: 'Vanguard Capital — Boutique Advisory Portal',
    category: 'Business Websites',
    shortDesc: 'Sophisticated corporate presence for an institutional advisory firm, highlighting investment frameworks and research.',
    fullDesc: 'A minimalist, authoritative web presence built for a financial advisory firm. Demonstrates investment philosophies, quarterly market commentaries, and secure client contact protocols.',
    problem: 'The firm needed an ultra-clean digital brand that communicated institutional stability without visual clutter.',
    solution: 'Crafted a bespoke navy and slate interface with sophisticated typography, subtle border treatments, and zero unnecessary distractions.',
    technologies: ['React', 'JavaScript', 'Tailwind CSS'],
    keyFeatures: [
      'Minimalist executive typography and editorial layouts',
      'Market commentary publication and PDF download hubs',
      'Confidential institutional inquiry gateway',
      'Lightweight bundle delivering sub-second first contentful paint'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/Code-With-Govind',
    isSample: true,
    featured: false,
    themeColor: 'from-slate-700 to-navy-950',
  },
];

export const AGENCY_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Requirements',
    desc: 'We begin by thoroughly understanding your business model, target audience, technical specifications, and key performance objectives.',
  },
  {
    step: '02',
    title: 'Architectural Planning',
    desc: 'We map out the system architecture, component hierarchies, database schemas, and integration points before writing a single line of code.',
  },
  {
    step: '03',
    title: 'UI/UX Design & Prototyping',
    desc: 'We create intuitive, high-fidelity responsive interfaces that align precisely with your brand identity and maximize user engagement.',
  },
  {
    step: '04',
    title: 'Engineering & Development',
    desc: 'We craft clean, maintainable, and modular code utilizing React, Node.js, and modern best practices with consistent version control.',
  },
  {
    step: '05',
    title: 'Testing & Quality Assurance',
    desc: 'Rigorous validation across browsers, device viewports, performance benchmarks, input validation, and security fundamentals.',
  },
  {
    step: '06',
    title: 'Deployment & Ongoing Support',
    desc: 'Smooth production launch on reliable cloud infrastructure, followed by proactive monitoring, maintenance, and ongoing technical support.',
  },
];

export const AGENCY_WHY_CHOOSE_US = [
  {
    title: 'Business-Focused Engineering',
    desc: 'We do not build code for the sake of code. Every interface and system architecture is engineered to achieve tangible business outcomes and client acquisition.',
    iconName: 'Target',
  },
  {
    title: 'Modern & Scalable Tech Stack',
    desc: 'We leverage battle-tested technologies including React, Node.js, Express, MongoDB, and Tailwind CSS to guarantee speed, maintainability, and longevity.',
    iconName: 'Layers',
  },
  {
    title: 'Fluid Responsive Design',
    desc: 'Our interfaces adapt seamlessly from small smartphone screens to multi-monitor workstations, ensuring an uncompromised experience on every device.',
    iconName: 'Smartphone',
  },
  {
    title: 'Clean & Maintainable Code',
    desc: 'We adhere to modular architecture, strict naming conventions, and scalable patterns so your software remains effortless to maintain and expand.',
    iconName: 'Code',
  },
  {
    title: 'Transparent Communication',
    desc: 'Direct interaction with the founders. No intermediary sales agents, no jargon, and regular milestone updates throughout every phase.',
    iconName: 'MessageSquare',
  },
  {
    title: 'Dependable Support',
    desc: 'Our commitment extends well beyond launch day. We provide proactive monitoring, performance optimization, and reliable technical assistance.',
    iconName: 'ShieldCheck',
  },
];

export const AGENCY_TECHNOLOGIES = [
  {
    category: 'Frontend Development',
    techs: [
      { name: 'React', desc: 'Component UI Library' },
      { name: 'JavaScript (ES6+)', desc: 'Modern Dynamic Logic' },
      { name: 'Tailwind CSS', desc: 'Utility-First Styling' },
      { name: 'HTML5 & CSS3', desc: 'Semantic Foundation' },
    ],
  },
  {
    category: 'Backend Architecture',
    techs: [
      { name: 'Node.js', desc: 'Asynchronous JavaScript Runtime' },
      { name: 'Express.js', desc: 'High-Speed Web API Framework' },
      { name: 'REST APIs', desc: 'Standardized Endpoints' },
    ],
  },
  {
    category: 'Databases & Storage',
    techs: [
      { name: 'MongoDB', desc: 'Document NoSQL Database' },
      { name: 'MySQL', desc: 'Relational SQL Database' },
      { name: 'Mongoose', desc: 'Schema Modeling' },
    ],
  },
  {
    category: 'Tooling, Versioning & DevOps',
    techs: [
      { name: 'Git', desc: 'Distributed Version Control' },
      { name: 'GitHub', desc: 'Code Collaboration & CI' },
      { name: 'Vite', desc: 'Next-Gen Frontend Bundler' },
      { name: 'Postman', desc: 'API Testing & Verification' },
    ],
  },
];

export const AGENCY_FOUNDERS = [
  {
    id: 'govind-rathod',
    name: 'Govind Rathod',
    role: 'Co-founder & Full Stack Developer',
    status: 'Active Profile',
    bio: 'Govind is a passionate full-stack developer and software craftsman dedicated to engineering robust, performant web applications and bespoke digital systems. With deep technical expertise across React, Node.js, Express, and database architectures, he spearheads the technical design, architectural integrity, and code quality across all Govind Web Solutions client engagements.',
    responsibilities: [
      'Full-stack software architecture and system design',
      'Technical project execution and code quality governance',
      'API development, database modeling, and server security',
      'Frontend engineering, performance tuning, and responsive UI'
    ],
    technicalSkills: [
      'JavaScript (ES6+)',
      'React & React Router',
      'Node.js & Express.js',
      'MongoDB & Mongoose',
      'MySQL',
      'Tailwind CSS & Modern CSS',
      'RESTful API Architecture',
      'Git & GitHub Workflows',
      'Web Performance & Core Web Vitals'
    ],
    developmentInterests: [
      'Scalable Web Architectures',
      'High-Speed Headless E-commerce',
      'Business Telemetry & Analytics Systems',
      'Clean Code & Component Reusability'
    ],
    socialLinks: {
      github: 'https://github.com/Code-With-Govind',
      linkedin: 'https://www.linkedin.com/in/govindrathod',
      email: 'contact@govindwebsolutions.com',
    },
    isPlaceholder: false,
  },
  {
    id: 'cofounder-business',
    name: 'Co-founder (Details To Be Provided)',
    role: 'Co-founder & Business Development / Marketing',
    status: 'Pending Onboarding',
    bio: 'The co-founder oversees business development, client relationship management, strategic partnerships, and marketing initiatives for Govind Web Solutions. Verified name, background, professional biography, and public profile links will be updated upon official onboarding.',
    responsibilities: [
      'Client acquisition, requirement gathering, and proposal alignment',
      'Strategic market positioning and agency branding',
      'Client communications, milestone tracking, and relationship management',
      'Partnership development and business growth strategy'
    ],
    technicalSkills: [
      'Business Development & Strategy',
      'Client Relationship Management',
      'Digital Marketing & Lead Generation',
      'Project Scope & Requirement Analysis',
      'Market Research & Competitive Analysis',
      'Strategic Account Management'
    ],
    developmentInterests: [
      'Digital Transformation for SMBs',
      'Client Success & Value Delivery',
      'Growth Strategies for Modern Agencies'
    ],
    socialLinks: {
      github: '',
      linkedin: '#',
      email: 'business@govindwebsolutions.com',
    },
    isPlaceholder: true,
  },
];


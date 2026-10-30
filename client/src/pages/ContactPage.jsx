import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import SectionHeading from '../components/common/SectionHeading';
import { AGENCY_SERVICES } from '../utils/agencyData';

export default function ContactPage() {
  useDocumentTitle('Contact Us — Project Inquiries & Consultations');
  const [searchParams] = useSearchParams();

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    service: '',
    budget: '',
    description: '',
    contactMethod: 'Email',
  });

  // Validation Errors State
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // UI Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDemoSubmitted, setIsDemoSubmitted] = useState(false);

  // Pre-populate service if passed via query params
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      setFormData((prev) => ({ ...prev, service: serviceParam }));
    }
  }, [searchParams]);

  // Validation Logic
  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service of interest.';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please provide a short description of your project requirements.';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Please provide at least 10 characters describing your project.';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation if field was touched
    if (touched[name]) {
      const validationErrors = validate();
      setErrors((prev) => ({ ...prev, [name]: validationErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const validationErrors = validate();
    setErrors(validationErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setTouched({
      fullName: true,
      email: true,
      service: true,
      description: true,
    });

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate client-side UI processing (Phase 2 frontend demo only)
      setTimeout(() => {
        setIsSubmitting(false);
        setIsDemoSubmitted(true);
      }, 1200);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      companyName: '',
      service: '',
      budget: '',
      description: '',
      contactMethod: 'Email',
    });
    setErrors({});
    setTouched({});
    setIsDemoSubmitted(false);
  };

  const budgetRanges = [
    'Less than $1,000',
    '$1,000 — $3,000',
    '$3,000 — $5,000',
    '$5,000 — $10,000',
    '$10,000+',
    'Flexible / Undetermined',
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-850 border border-navy-750 text-brand-accent text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
            <span>Initiate Collaboration</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Let's Discuss Your Project Requirements
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Have a project in mind or exploring a web development initiative? Complete the inquiry form below and our co-founders will review your technical specifications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Contact Form */}
          <div className="lg:col-span-8 bg-navy-900/90 border border-navy-800 rounded-3xl p-8 sm:p-10 shadow-2xl">
            {isDemoSubmitted ? (
              /* Phase 2 Frontend Demo State Confirmation */
              <div className="text-center py-10 space-y-6">
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2 max-w-md mx-auto">
                  <span className="text-xs uppercase tracking-wider font-bold text-brand-accent">
                    Frontend Verification Successful
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    Form Validation & UI Preview Complete
                  </h3>
                  <div className="p-4 rounded-xl bg-navy-850 border border-navy-750 text-left text-xs text-slate-300 space-y-2 mt-4">
                    <p className="font-semibold text-white">
                      Notice: Phase 2 Scope Boundary
                    </p>
                    <p>
                      All client-side validation rules (full name, email syntax, required fields, and state persistence) executed successfully.
                    </p>
                    <p className="text-slate-400 italic">
                      In Phase 3, this form will connect directly to the Express backend and MongoDB database for real-time lead capture and founder notification dispatch. No data has been saved or emailed in this UI phase.
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-center gap-4">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-secondary text-white text-sm font-semibold transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Reset & Test Form Again</span>
                  </button>
                  <Link
                    to="/"
                    className="px-6 py-3 rounded-xl bg-navy-850 hover:bg-navy-800 text-slate-300 text-sm font-semibold border border-navy-700 transition-colors"
                  >
                    Return to Homepage
                  </Link>
                </div>
              </div>
            ) : (
              /* Contact Form */
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="border-b border-navy-800 pb-4 mb-6">
                  <h2 className="text-xl font-bold text-white mb-1">Project Inquiry Form</h2>
                  <p className="text-xs text-slate-400">
                    Fields marked with an asterisk (<span className="text-brand-accent">*</span>) are required.
                  </p>
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Full Name <span className="text-brand-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. Alex Morgan"
                      className={`w-full px-4 py-3 rounded-xl bg-navy-950 text-white placeholder-slate-500 border transition-colors focus:outline-none focus:ring-2 ${
                        errors.fullName && touched.fullName
                          ? 'border-red-500 focus:ring-red-500/30'
                          : 'border-navy-750 focus:border-brand-primary focus:ring-brand-primary/20'
                      }`}
                      required
                    />
                    {errors.fullName && touched.fullName && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Work Email <span className="text-brand-accent">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="alex@company.com"
                      className={`w-full px-4 py-3 rounded-xl bg-navy-950 text-white placeholder-slate-500 border transition-colors focus:outline-none focus:ring-2 ${
                        errors.email && touched.email
                          ? 'border-red-500 focus:ring-red-500/30'
                          : 'border-navy-750 focus:border-brand-primary focus:ring-brand-primary/20'
                      }`}
                      required
                    />
                    {errors.email && touched.email && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone & Company Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Phone Number <span className="text-slate-500 text-[11px] font-normal">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl bg-navy-950 text-white placeholder-slate-500 border border-navy-750 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Company Name */}
                  <div>
                    <label htmlFor="companyName" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Company / Organization <span className="text-slate-500 text-[11px] font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="e.g. Acme Corporation"
                      className="w-full px-4 py-3 rounded-xl bg-navy-950 text-white placeholder-slate-500 border border-navy-750 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Service Required & Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Service Required */}
                  <div>
                    <label htmlFor="service" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Service Required <span className="text-brand-accent">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 rounded-xl bg-navy-950 text-white border transition-colors focus:outline-none focus:ring-2 ${
                        errors.service && touched.service
                          ? 'border-red-500 focus:ring-red-500/30'
                          : 'border-navy-750 focus:border-brand-primary focus:ring-brand-primary/20'
                      }`}
                      required
                    >
                      <option value="">Select a service category...</option>
                      {AGENCY_SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="Other / General Consultation">
                        Other / General Consultation
                      </option>
                    </select>
                    {errors.service && touched.service && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.service}</span>
                      </p>
                    )}
                  </div>

                  {/* Budget */}
                  <div>
                    <label htmlFor="budget" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Estimated Budget <span className="text-slate-500 text-[11px] font-normal">(Optional)</span>
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-navy-950 text-white border border-navy-750 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none transition-colors"
                    >
                      <option value="">Select budget range...</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label htmlFor="description" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Project Description & Requirements <span className="text-brand-accent">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Describe your project goals, key features, target timeline, or any specific technologies you require..."
                    className={`w-full px-4 py-3 rounded-xl bg-navy-950 text-white placeholder-slate-500 border transition-colors focus:outline-none focus:ring-2 ${
                      errors.description && touched.description
                        ? 'border-red-500 focus:ring-red-500/30'
                        : 'border-navy-750 focus:border-brand-primary focus:ring-brand-primary/20'
                    }`}
                    required
                  />
                  {errors.description && touched.description && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.description}</span>
                    </p>
                  )}
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
                    Preferred Contact Method
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {['Email', 'WhatsApp', 'Phone Call'].map((method) => (
                      <label
                        key={method}
                        className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                          formData.contactMethod === method
                            ? 'bg-blue-500/10 text-brand-accent border-brand-accent/50'
                            : 'bg-navy-950 text-slate-300 border-navy-800 hover:border-navy-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name="contactMethod"
                          value={method}
                          checked={formData.contactMethod === method}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          formData.contactMethod === method ? 'border-brand-accent' : 'border-slate-600'
                        }`}>
                          {formData.contactMethod === method && (
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                          )}
                        </span>
                        <span>{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-primary hover:bg-brand-secondary text-white font-semibold text-base shadow-lg shadow-brand-primary/25 hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Validating & Simulating Submission...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-slate-500 text-center mt-3">
                    Phase 2 UI Mode — Complete validation is enabled. Persistent database submission activates in Phase 3.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Contact Details & Guarantee */}
          <div className="lg:col-span-4 space-y-6">
            {/* Direct Contact Card */}
            <div className="p-7 rounded-3xl bg-navy-900/90 border border-navy-800 space-y-6 shadow-xl">
              <h3 className="text-lg font-bold text-white border-b border-navy-800 pb-3">
                Agency Information
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-brand-accent flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold">
                      Business Inquiries
                    </span>
                    <span className="text-white font-medium text-xs break-all">
                      contact@govindwebsolutions.com
                    </span>
                    <span className="block text-[10px] text-slate-400 italic">
                      (Verified mailbox to be connected)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold">
                      Phone & WhatsApp
                    </span>
                    <span className="text-slate-300 font-mono text-xs">
                      [Verified details to be provided]
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-300 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold">
                      Location & Operating Model
                    </span>
                    <span className="text-white text-xs">
                      India — Delivering Worldwide Remotely
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-300 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold">
                      Response Standard
                    </span>
                    <span className="text-white text-xs">
                      Replies within 24 business hours
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* What to Expect Card */}
            <div className="p-7 rounded-3xl bg-navy-900/60 border border-navy-800 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                What Happens Next?
              </h3>
              <ol className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-brand-primary/20 text-brand-accent flex items-center justify-center font-bold text-[10px] shrink-0">
                    1
                  </span>
                  <span>Our technical founder reviews your requirements and scope.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-brand-primary/20 text-brand-accent flex items-center justify-center font-bold text-[10px] shrink-0">
                    2
                  </span>
                  <span>We schedule an initial discovery call to clarify specifications.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-brand-primary/20 text-brand-accent flex items-center justify-center font-bold text-[10px] shrink-0">
                    3
                  </span>
                  <span>You receive a transparent architecture proposal and milestone roadmap.</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

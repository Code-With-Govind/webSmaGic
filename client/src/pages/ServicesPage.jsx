import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Code2,
  Sparkles,
  HelpCircle,
  MessageSquare,
  MessageCircle,
  PackageCheck,
  Check,
} from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import SectionHeading from '../components/common/SectionHeading';
import Badge from '../components/common/Badge';
import DynamicIcon from '../components/common/DynamicIcon';
import { trackServiceClick } from '../utils/analytics';
import { AGENCY_SERVICES, COMPANY_CONFIG, getWhatsAppInquiryUrl } from '../utils/agencyData';

export default function ServicesPage() {
  useDocumentTitle('Services — Custom Web Development & Digital Solutions');

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-850 border border-navy-750 text-brand-accent text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
            <span>Comprehensive Agency Capabilities</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Engineered Services for Ambitious Businesses
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            From strategic corporate websites and high-speed e-commerce storefronts to complex web applications, we provide end-to-end digital solutions that convert visitors into revenue.
          </p>
        </div>

        {/* Services Showcase Cards */}
        <div className="space-y-14 mb-24">
          {AGENCY_SERVICES.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className="scroll-mt-28 p-8 sm:p-10 lg:p-12 rounded-3xl bg-navy-900/90 border border-navy-800 hover:border-navy-750 transition-all duration-300 shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left Column: Icon, Title, Target Audience, Description, Real-world example */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-brand-accent flex items-center justify-center shadow-inner shrink-0">
                      <DynamicIcon name={service.iconName} className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-slate-400">Service 0{index + 1}</span>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  {/* Target Audience Pill */}
                  {service.targetAudience && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-brand-accent border border-blue-500/20 text-xs font-medium">
                      <span>Target: {service.targetAudience}</span>
                    </div>
                  )}

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {service.fullDesc}
                  </p>

                  {/* Real-World Practical Business Application Box */}
                  {service.realWorldExample && (
                    <div className="p-4 rounded-2xl bg-navy-950/80 border border-navy-800 text-xs text-slate-300 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-brand-accent font-bold uppercase tracking-wider text-[11px]">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Real-World Business Application</span>
                      </div>
                      <p className="leading-relaxed text-slate-200">
                        {service.realWorldExample}
                      </p>
                    </div>
                  )}

                  {/* Technologies */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-brand-accent" />
                      <span>Technologies Deployed</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech) => (
                        <Badge key={tech} variant="default" size="sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Dual Action CTAs */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <Link
                      to={`/contact?service=${encodeURIComponent(service.title)}`}
                      onClick={() => trackServiceClick(service.title)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-secondary text-white text-sm font-semibold shadow-md shadow-brand-primary/20 hover:shadow-lg transition-all"
                    >
                      <span>Discuss Requirements</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a
                      href={getWhatsAppInquiryUrl({
                        service: service.title,
                        context: `I would like to inquire specifically about ${service.title}.`,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-md shadow-emerald-900/30"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Inquire on WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Right Column: Key Features, Typical Deliverables & Business Benefits */}
                <div className="lg:col-span-7 space-y-6 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-navy-800 lg:pl-10">
                  {/* Grid of Features & Deliverables */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Key Features */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-brand-accent" />
                        <span>Key Features</span>
                      </h3>
                      <ul className="space-y-2.5">
                        {service.keyFeatures.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 leading-snug">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0 mt-2" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What You Receive (Deliverables) */}
                    {service.typicalDeliverables && (
                      <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                          <PackageCheck className="w-4 h-4 text-emerald-400" />
                          <span>Typical Deliverables</span>
                        </h3>
                        <ul className="space-y-2.5">
                          {service.typicalDeliverables.map((del, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 leading-snug">
                              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{del}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Business Benefits */}
                  <div className="pt-4 border-t border-navy-800 space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span>Direct Commercial Benefits</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {service.businessBenefits.map((ben, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-navy-950/60 border border-navy-800 text-xs text-slate-300 leading-snug flex items-start gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{ben}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final Project Inquiry Banner */}
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-navy-750 text-center max-w-4xl mx-auto shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-brand-accent flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Need a Customized Solution for Your Organization?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Every business has unique architectural parameters. Share your project requirements with our engineering team for a detailed technical consultation, timeline, and quote.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-secondary text-white font-semibold text-sm shadow-lg shadow-brand-primary/25 transition-all"
            >
              <span>Submit Project Requirements</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={getWhatsAppInquiryUrl({
                context: 'I would like a customized technical consultation for my company website project.',
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-900/30 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Discuss on WhatsApp ({COMPANY_CONFIG.phoneDisplay})</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

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
} from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import SectionHeading from '../components/common/SectionHeading';
import Badge from '../components/common/Badge';
import DynamicIcon from '../components/common/DynamicIcon';
import { trackServiceClick } from '../utils/analytics';
import { AGENCY_SERVICES } from '../utils/agencyData';

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
            From strategic corporate websites to complex full-stack web applications and API integrations, we provide end-to-end digital solutions that convert visitors into revenue.
          </p>
        </div>

        {/* Services Showcase Cards */}
        <div className="space-y-12 mb-24">
          {AGENCY_SERVICES.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className="scroll-mt-28 p-8 sm:p-10 lg:p-12 rounded-3xl bg-navy-900/90 border border-navy-800 hover:border-navy-750 transition-all duration-300 shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left Column: Icon, Title, Description, Technologies */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-brand-accent flex items-center justify-center shadow-inner">
                      <DynamicIcon name={service.iconName} className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-slate-400">Service 0{index + 1}</span>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {service.fullDesc}
                  </p>

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

                  {/* CTA Button */}
                  <div className="pt-2">
                    <Link
                      to={`/contact?service=${encodeURIComponent(service.title)}`}
                      onClick={() => trackServiceClick(service.title)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-secondary text-white text-sm font-semibold shadow-md shadow-brand-primary/20 hover:shadow-lg transition-all"
                    >
                      <span>Discuss {service.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Right Column: Key Features & Business Benefits */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-navy-800 lg:pl-10">
                  {/* Key Features */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-accent" />
                      <span>Key Features</span>
                    </h3>
                    <ul className="space-y-3">
                      {service.keyFeatures.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 leading-snug">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0 mt-2" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Business Benefits */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span>Business Benefits</span>
                    </h3>
                    <ul className="space-y-3">
                      {service.businessBenefits.map((ben, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 leading-snug">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{ben}</span>
                        </li>
                      ))}
                    </ul>
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
            Every business has unique architectural parameters. Share your project requirements with our engineering team for a detailed technical consultation and timeline.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-secondary text-white font-semibold text-sm shadow-lg shadow-brand-primary/25 transition-all"
            >
              <span>Submit Project Requirements</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-navy-950 hover:bg-navy-800 text-slate-200 text-sm font-semibold border border-navy-750 transition-colors"
            >
              <span>Review Completed Case Studies</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

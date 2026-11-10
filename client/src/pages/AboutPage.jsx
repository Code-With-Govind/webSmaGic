import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Eye,
  ShieldCheck,
  Code,
  Users,
  Sparkles,
  Zap,
  CheckCircle2,
  ArrowRight,
  Target,
  FileCheck,
} from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import SectionHeading from '../components/common/SectionHeading';

export default function AboutPage() {
  useDocumentTitle('About Us — Our Mission, Values & Development Approach');

  const agencyValues = [
    {
      title: 'Engineering Craftsmanship',
      desc: 'We treat code as a long-term commercial asset. We write modular, well-documented, and maintainable software that can evolve as your company scales.',
      icon: Code,
    },
    {
      title: 'Radical Transparency',
      desc: 'Clear communication, realistic project milestones, and honest technical guidance. No inflated buzzwords or opaque billing practices.',
      icon: Users,
    },
    {
      title: 'Performance-First Mindset',
      desc: 'Every millisecond of load time affects user retention and conversion. We build lightweight interfaces and eliminate bloat by design.',
      icon: Zap,
    },
    {
      title: 'Commercial Purpose',
      desc: 'Technology must serve business objectives. Every design decision, user journey, and feature is aligned with lead generation and brand authority.',
      icon: Target,
    },
  ];

  const qualityStandards = [
    'Strict responsive behavior tested on smartphones, tablets, and ultra-wide screens',
    'WCAG accessibility standards ensuring clear contrast and readable typography',
    'Clean component abstractions preventing brittle, tightly coupled code',
    'Modern security safeguards against cross-site scripting and unauthorized data access',
    'Semantic HTML5 structure ensuring search engine spiders correctly index your content',
    'Direct communication channels with the technical and business co-founders'
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-850 border border-navy-750 text-brand-accent text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
            Our Identity & Philosophy
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Architecting Digital Solutions with Precision & Integrity
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            WebsMagic is a boutique web development and digital solutions agency dedicated to building high-performance websites and bespoke web applications for ambitious businesses.
          </p>
        </div>

        {/* Agency Introduction Story */}
        <section className="mb-24">
          <div className="p-8 sm:p-12 rounded-3xl bg-navy-900/80 border border-navy-800 shadow-xl">
            <div className="max-w-3xl mx-auto space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                Who We Are
              </h2>
              <p>
                WebsMagic was founded with a singular, resolute objective: to provide modern businesses with genuine software engineering excellence without the overhead, bureaucratic friction, or impersonal treatment of massive agencies.
              </p>
              <p>
                We recognize that in today's digital economy, an agency website is not a digital business card — it is your central commercial engine, client acquisition portal, and brand authority cornerstone. We bridge modern user-centric interface design with dependable, secure full-stack software architecture.
              </p>
              <p>
                Whether partnering with growing enterprises or scaling specialized service providers, we approach every project with architectural discipline, transparent communication, and an uncompromising standard of quality.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision Cards */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="p-8 sm:p-10 rounded-3xl bg-navy-900/90 border border-navy-800 hover:border-brand-primary/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-brand-accent flex items-center justify-center mb-6">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-slate-300 leading-relaxed text-base">
                  To empower forward-thinking businesses by engineering reliable, scalable, and visually compelling digital platforms that drive measurable customer engagement, elevate brand perception, and accelerate commercial growth.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-navy-800 text-xs text-slate-400">
                Focus: Value delivery, engineering integrity, and long-term partnership.
              </div>
            </div>

            {/* Vision */}
            <div className="p-8 sm:p-10 rounded-3xl bg-navy-900/90 border border-navy-800 hover:border-cyan-500/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-brand-cyan flex items-center justify-center mb-6">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                <p className="text-slate-300 leading-relaxed text-base">
                  To establish WebsMagic as the benchmark boutique agency for custom web engineering, known internationally for pristine code quality, transparent founder collaboration, and resilient technical execution.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-navy-800 text-xs text-slate-400">
                Focus: Technical authority, sustainable software, and measurable client success.
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Grid */}
        <section className="mb-24">
          <SectionHeading
            badge="Guiding Principles"
            title="The Values That Guide Every Deployment"
            subtitle="Our team operates by an uncompromising set of standards that govern how we write code, treat clients, and deliver work."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {agencyValues.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-navy-900/80 border border-navy-800 hover:border-navy-700 transition-colors flex items-start gap-5"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-brand-accent flex items-center justify-center shrink-0">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{val.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{val.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Development Approach & Quality Commitment */}
        <section className="mb-24">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-navy-900 via-navy-850 to-navy-900 border border-navy-750">
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
                Engineering Discipline
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 mb-4">
                Our Commitment to Quality Standards
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                We believe that true software quality is measured not only by how an interface looks on launch day, but how effortlessly it runs, scales, and responds years later.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {qualityStandards.map((std, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-navy-950/60 border border-navy-800 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-300 leading-normal">{std}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA to Team and Contact */}
        <div className="text-center pt-8 border-t border-navy-850">
          <h3 className="text-xl font-bold text-white mb-4">
            Meet the Leaders Behind the Agency
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6">
            Get to know Govind Rathod and the agency co-founders on our dedicated team page.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/founders"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-secondary text-white text-sm font-semibold transition-colors"
            >
              <span>Explore Founder Profiles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-900 hover:bg-navy-850 text-slate-200 text-sm font-semibold border border-navy-750 transition-colors"
            >
              <span>Initiate Project Consultation</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

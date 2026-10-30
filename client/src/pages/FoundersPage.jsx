import React from 'react';
import { Link } from 'react-router-dom';
import {
  Github,
  Linkedin,
  Mail,
  CheckCircle2,
  Code,
  Briefcase,
  Layers,
  Sparkles,
  ArrowRight,
  User,
  HeartHandshake,
  ShieldAlert,
} from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import SectionHeading from '../components/common/SectionHeading';
import Badge from '../components/common/Badge';
import { AGENCY_FOUNDERS } from '../utils/agencyData';

export default function FoundersPage() {
  useDocumentTitle('Leadership & Founders — Govind Web Solutions');

  const [founder1, founder2] = AGENCY_FOUNDERS;

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-850 border border-navy-750 text-brand-accent text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
            <span>Executive Leadership</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Meet the Founders Behind Govind Web Solutions
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Our agency is steered by hands-on leadership pairing technical software craftsmanship with strategic client advisory.
          </p>
        </div>

        {/* Detailed Founder Profiles */}
        <div className="space-y-16 mb-24">
          {/* FOUNDER 1: GOVIND RATHOD */}
          <div className="p-8 sm:p-12 rounded-3xl bg-navy-900/90 border border-navy-800 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Avatar & Meta */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
                {/* Profile Placeholder Avatar */}
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-tr from-brand-primary via-blue-600 to-brand-accent p-1 shadow-2xl mb-6">
                  <div className="w-full h-full rounded-[22px] bg-navy-950 flex flex-col items-center justify-center text-white">
                    <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-blue-300 to-white">
                      GR
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono mt-1">
                      Technical Founder
                    </span>
                  </div>
                </div>

                <div className="space-y-1 mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Active Founder
                  </span>
                  <h2 className="text-2xl font-bold text-white pt-2">{founder1.name}</h2>
                  <p className="text-sm font-semibold text-brand-accent">{founder1.role}</p>
                </div>

                {/* Social & Contact Links */}
                <div className="flex items-center gap-3">
                  {founder1.socialLinks.github && (
                    <a
                      href={founder1.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-navy-850 hover:bg-navy-800 text-slate-300 hover:text-white border border-navy-700 transition-colors"
                      title="GitHub Profile"
                      aria-label="GitHub Profile"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {founder1.socialLinks.linkedin && (
                    <a
                      href={founder1.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-navy-850 hover:bg-navy-800 text-slate-300 hover:text-white border border-navy-700 transition-colors"
                      title="LinkedIn Profile"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  <a
                    href={`mailto:${founder1.socialLinks.email}`}
                    className="p-2.5 rounded-xl bg-navy-850 hover:bg-navy-800 text-slate-300 hover:text-white border border-navy-700 transition-colors"
                    title="Direct Email"
                    aria-label="Direct Email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Right Column: Bio, Responsibilities, Skills, Interests */}
              <div className="lg:col-span-8 space-y-8">
                {/* Introduction */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Professional Introduction
                  </h3>
                  <p className="text-base text-slate-200 leading-relaxed">
                    {founder1.bio}
                  </p>
                </div>

                {/* Responsibilities */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-brand-accent" />
                    <span>Executive Responsibilities</span>
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {founder1.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Skills */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                    <Code className="w-4 h-4 text-brand-accent" />
                    <span>Technical Proficiencies</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {founder1.technicalSkills.map((skill) => (
                      <Badge key={skill} variant="default" size="md">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Development Interests */}
                <div className="pt-4 border-t border-navy-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Architectural Interests & Specializations
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {founder1.developmentInterests.map((interest) => (
                      <span
                        key={interest}
                        className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-brand-accent border border-blue-500/20"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FOUNDER 2: CO-FOUNDER & BUSINESS DEVELOPMENT */}
          <div className="p-8 sm:p-12 rounded-3xl bg-navy-900/90 border border-navy-800 shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Avatar & Meta */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
                {/* Profile Placeholder Avatar */}
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-navy-800 border-2 border-dashed border-navy-700 flex flex-col items-center justify-center text-slate-400 mb-6">
                  <User className="w-14 h-14 text-slate-500 mb-2" />
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">
                    Photo Placeholder
                  </span>
                </div>

                <div className="space-y-1 mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/30">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Details To Be Provided
                  </span>
                  <h2 className="text-2xl font-bold text-white pt-2">{founder2.name}</h2>
                  <p className="text-sm font-semibold text-brand-accent">{founder2.role}</p>
                </div>

                {/* Social Link Placeholder */}
                <div className="flex items-center gap-3">
                  <div
                    className="p-2.5 rounded-xl bg-navy-850 text-slate-500 border border-navy-800 cursor-not-allowed opacity-70"
                    title="LinkedIn profile link to be configured"
                  >
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div
                    className="p-2.5 rounded-xl bg-navy-850 text-slate-500 border border-navy-800 cursor-not-allowed opacity-70"
                    title="Direct email to be configured"
                  >
                    <Mail className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Right Column: Bio, Planned Responsibilities, Skills */}
              <div className="lg:col-span-8 space-y-8">
                {/* Onboarding Notice */}
                <div className="p-4 rounded-xl bg-navy-850/60 border border-navy-750 flex items-start gap-3 text-xs text-slate-300">
                  <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p>
                    The official name, photograph, verified biography, and professional links for the co-founder leading Business Development and Marketing will be published upon final corporate onboarding.
                  </p>
                </div>

                {/* Introduction */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Executive Scope & Background
                  </h3>
                  <p className="text-base text-slate-200 leading-relaxed">
                    {founder2.bio}
                  </p>
                </div>

                {/* Responsibilities */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-brand-accent" />
                    <span>Business Development Mandate</span>
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {founder2.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                    <HeartHandshake className="w-4 h-4 text-brand-accent" />
                    <span>Core Commercial Competencies</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {founder2.technicalSkills.map((skill) => (
                      <Badge key={skill} variant="default" size="md">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership Synergy Section */}
        <section className="mb-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-navy-750 text-center max-w-4xl mx-auto shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Direct Founder Access on Every Project
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            When you collaborate with Govind Web Solutions, you work directly with agency leadership. No account coordinators, no communication silos, and direct engineering accountability.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-secondary text-white font-semibold text-sm shadow-lg shadow-brand-primary/25 transition-all"
          >
            <span>Start a Conversation with the Founders</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Github,
  ChevronRight,
  ShieldCheck,
  Code2,
  User,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import SectionHeading from '../components/common/SectionHeading';
import Badge from '../components/common/Badge';
import DynamicIcon from '../components/common/DynamicIcon';
import HeroArtwork from '../components/common/HeroArtwork';
import ProjectModal from '../components/common/ProjectModal';
import {
  AGENCY_SERVICES,
  AGENCY_PROJECTS,
  AGENCY_PROCESS_STEPS,
  AGENCY_WHY_CHOOSE_US,
  AGENCY_TECHNOLOGIES,
  AGENCY_FOUNDERS,
} from '../utils/agencyData';

export default function HomePage() {
  useDocumentTitle('Professional Web Development & Digital Solutions Agency');
  const [selectedProject, setSelectedProject] = useState(null);

  const featuredServices = AGENCY_SERVICES.slice(0, 6);
  const featuredProjects = AGENCY_PROJECTS.filter((p) => p.featured);

  return (
    <div className="relative">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-blue-600/10 via-brand-primary/5 to-transparent blur-[140px] pointer-events-none" />

      {/* 1. HERO SECTION */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-navy-900 border border-navy-750 text-brand-accent text-xs font-semibold tracking-wide shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
                <span>Web Development & Digital Solutions Agency</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                Building Digital Experiences That{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-brand-accent to-cyan-400">
                  Drive Your Business Forward.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                We help businesses transform ideas into powerful digital experiences through modern websites, e-commerce solutions, and custom web applications.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-brand-primary hover:bg-brand-secondary text-white font-semibold text-base shadow-lg shadow-brand-primary/25 hover:shadow-xl hover:shadow-brand-primary/35 transition-all active:scale-98"
                >
                  <span>Let's Discuss Your Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/projects"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-navy-900 hover:bg-navy-850 text-slate-200 hover:text-white font-semibold text-base border border-navy-750 transition-colors"
                >
                  <span>Explore Our Work</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>

              {/* Quick highlights */}
              <div className="pt-6 border-t border-navy-850 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Modern Full-Stack Architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Sub-Second Page Speed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Direct Founder Collaboration</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Composition */}
            <div className="lg:col-span-5">
              <HeroArtwork />
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES PREVIEW SECTION */}
      <section className="py-20 bg-navy-900/40 border-t border-b border-navy-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Agency Capabilities"
            title="Engineered Services for Scalable Growth"
            subtitle="From strategic corporate flagships to high-load custom web applications, we design and build bespoke software solutions."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredServices.map((service) => (
              <div
                key={service.id}
                className="group relative p-7 rounded-2xl bg-navy-900/90 border border-navy-800 hover:border-brand-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-primary/10 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-brand-accent flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                    <DynamicIcon name={service.iconName} className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {service.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-navy-950 text-slate-400 border border-navy-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/services#${service.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent group-hover:text-white transition-colors"
                  >
                    <span>Learn More & Details</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-850 hover:bg-navy-800 text-slate-200 hover:text-white text-sm font-semibold border border-navy-750 transition-colors"
            >
              <span>Explore All 8 Specialized Services</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROJECTS SECTION */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-850 border border-navy-750 text-brand-accent text-xs font-semibold uppercase tracking-wider mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                Selected Case Studies
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Featured Work & Reference Architectures
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:text-white transition-colors shrink-0"
            >
              <span>View All Portfolio Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Sample disclaimer banner */}
          <div className="mb-10 p-4 rounded-xl bg-navy-900/90 border border-navy-750/80 flex items-start gap-3 text-xs text-slate-300">
            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-semibold uppercase text-[10px] tracking-wider shrink-0 mt-0.5">
              Notice
            </span>
            <p>
              The showcases below demonstrate prototype architectures and engineering reference implementations developed by our team. Live client platforms subject to NDAs are available upon consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="group rounded-2xl bg-navy-900/80 border border-navy-800 hover:border-navy-700 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl"
              >
                {/* Visual Representation Header */}
                <div className={`h-48 bg-gradient-to-br ${project.themeColor} p-6 flex flex-col justify-between relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:16px_16px]" />
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-navy-950/70 text-slate-200 border border-white/10 backdrop-blur-sm">
                      {project.category}
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-amber-400/20 text-amber-200 border border-amber-400/30">
                      Sample Case Study
                    </span>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white tracking-tight drop-shadow-sm">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                  <div>
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      {project.shortDesc}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-navy-950 text-slate-300 border border-navy-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-navy-800 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-accent hover:text-white transition-colors"
                    >
                      <span>Explore Case Study</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white transition-colors"
                        aria-label="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US SECTION */}
      <section className="py-20 bg-navy-900/40 border-t border-b border-navy-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The Agency Advantage"
            title="Why Forward-Thinking Businesses Choose Us"
            subtitle="We combine software craftsmanship with genuine business acumen to build platforms that deliver measurable commercial value."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {AGENCY_WHY_CHOOSE_US.map((item, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-navy-900/90 border border-navy-800 hover:border-navy-700 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-brand-accent flex items-center justify-center mb-5">
                  <DynamicIcon name={item.iconName} className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OUR PROCESS ROADMAP */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Methodology"
            title="Our Structured Engineering Process"
            subtitle="A transparent, six-step delivery framework ensuring precision, punctuality, and zero surprises from kickoff to launch."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {AGENCY_PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className="relative p-7 rounded-2xl bg-navy-900/80 border border-navy-800 hover:border-navy-750 transition-colors"
              >
                <div className="text-3xl font-extrabold text-brand-primary/40 font-mono mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TECHNOLOGIES GRID */}
      <section className="py-20 bg-navy-900/40 border-t border-b border-navy-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Demonstrated Capabilities"
            title="Modern & Battle-Tested Technology Stack"
            subtitle="We only deploy technologies that our engineers can genuinely substantiate through working implementations."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {AGENCY_TECHNOLOGIES.map((group, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-navy-900/90 border border-navy-800 space-y-4"
              >
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-accent pb-2 border-b border-navy-800">
                  {group.category}
                </h3>
                <ul className="space-y-3">
                  {group.techs.map((t, tIdx) => (
                    <li key={tIdx} className="flex flex-col">
                      <span className="text-sm font-semibold text-white">{t.name}</span>
                      <span className="text-xs text-slate-400">{t.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TEAM PREVIEW SECTION */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-850 border border-navy-750 text-brand-accent text-xs font-semibold uppercase tracking-wider mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                Agency Leadership
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Meet the Founders
              </h2>
            </div>
            <Link
              to="/founders"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:text-white transition-colors shrink-0"
            >
              <span>View Full Leadership Profiles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {AGENCY_FOUNDERS.map((founder) => (
              <div
                key={founder.id}
                className="p-8 rounded-2xl bg-navy-900/90 border border-navy-800 hover:border-navy-750 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-navy-800 to-navy-700 border border-navy-700 flex items-center justify-center text-brand-accent text-xl font-bold shadow-md">
                      {founder.isPlaceholder ? (
                        <User className="w-7 h-7 text-slate-400" />
                      ) : (
                        'GR'
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{founder.name}</h3>
                      <p className="text-xs text-brand-accent font-semibold">{founder.role}</p>
                      <span className="text-[11px] text-slate-400">
                        {founder.isPlaceholder
                          ? 'Details to be provided upon official onboarding'
                          : 'Technical Lead & Architecture'}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {founder.bio}
                  </p>
                </div>

                <div className="pt-6 border-t border-navy-800 flex items-center justify-between">
                  <Link
                    to="/founders"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-accent hover:text-white transition-colors"
                  >
                    <span>Read Full Profile & Expertise</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex items-center gap-2">
                    {founder.socialLinks.github && (
                      <a
                        href={founder.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-navy-850 hover:bg-navy-800 text-slate-300 hover:text-white transition-colors"
                        aria-label="GitHub Profile"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA SECTION */}
      <section className="py-20 bg-gradient-to-b from-navy-900/60 to-navy-950 border-t border-navy-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-navy-750 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="inline-block px-3.5 py-1 rounded-full bg-blue-500/10 text-brand-accent text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                Kickstart Your Vision
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Have a Project in Mind? Let's Build Something Exceptional Together.
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Whether you need a new bespoke corporate website, an e-commerce platform, or a custom full-stack web application, our founders are ready to consult on your requirements.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-secondary text-white font-semibold text-base shadow-lg shadow-brand-primary/30 transition-all active:scale-98"
                >
                  <span>Contact Our Team</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/services"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-navy-950 hover:bg-navy-800 text-slate-200 hover:text-white font-semibold text-base border border-navy-750 transition-colors"
                >
                  <span>View Services Catalog</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

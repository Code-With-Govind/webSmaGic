import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ExternalLink,
  Layers,
  ArrowUpRight,
  Filter,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import SectionHeading from '../components/common/SectionHeading';
import Badge from '../components/common/Badge';
import ProjectModal from '../components/common/ProjectModal';
import { AGENCY_PROJECTS } from '../utils/agencyData';

export default function ProjectsPage() {
  useDocumentTitle('Projects & Portfolio — Reference Implementations & Work');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  const categories = [
    'All',
    'Classes & Coaching',
    'Gym & Fitness',
    'Cafe / Restro / Hotel',
    'E-commerce',
    'Business Websites',
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? AGENCY_PROJECTS
      : AGENCY_PROJECTS.filter((project) => project.category === selectedCategory);

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-850 border border-navy-750 text-brand-accent text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
            <span>Engineering Showcase</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Featured Projects & Reference Architectures
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Explore our software engineering implementations, e-commerce storefronts, and full-stack web applications.
          </p>
        </div>

        {/* Production Project Showcase Header */}
        <div className="max-w-4xl mx-auto mb-12 p-4 sm:p-5 rounded-2xl bg-navy-900/90 border border-navy-750 flex items-start gap-3.5 text-xs sm:text-sm text-slate-300 shadow-md">
          <Sparkles className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-white block">
              Verified Live Production Platform
            </span>
            <p className="text-slate-300 text-xs leading-relaxed">
              Featured below is a live, production-grade e-commerce flagship engineered by Govind Web Solutions. Explore the live storefront, inspect the responsive catalog, and review the full technical implementation.
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/25 border border-brand-primary'
                  : 'bg-navy-900 text-slate-300 hover:text-white hover:bg-navy-850 border border-navy-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-3xl bg-navy-900/90 border border-navy-800 hover:border-navy-700 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl"
            >
              {/* Card Visual Banner */}
              <div
                className={`h-56 bg-gradient-to-br ${project.themeColor} p-6 flex flex-col justify-between relative overflow-hidden`}
              >
                {project.coverImage && (
                  <>
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/20" />
                  </>
                )}
                <div className="absolute inset-0 bg-grid-white/[0.06] bg-[size:16px_16px]" />
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-navy-950/85 text-slate-100 border border-white/15 backdrop-blur-md shadow-sm">
                    {project.category}
                  </span>
                  {!project.isSample && (
                    <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md shadow-sm">
                      Verified Live
                    </span>
                  )}
                  {project.isSample && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-400/20 text-amber-200 border border-amber-400/30">
                      Sample Architecture
                    </span>
                  )}
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white tracking-tight leading-snug drop-shadow-md">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-7 flex-grow flex flex-col justify-between space-y-6">
                <div>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {project.shortDesc}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-navy-950 text-slate-300 border border-navy-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-navy-800 flex items-center justify-between">
                  <button
                    onClick={() => setActiveProjectModal(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-accent hover:text-white transition-colors"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-3">
                    {project.liveUrl && project.liveUrl !== '#' ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-brand-accent transition-colors p-1"
                        title="Visit Live Website"
                        aria-label="Visit Live Website"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <button
                        onClick={() => setActiveProjectModal(project)}
                        className="text-slate-400 hover:text-brand-accent transition-colors p-1"
                        title="Prototype Details"
                        aria-label="Prototype Details"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state if category has no projects */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 p-8 rounded-3xl bg-navy-900 border border-navy-800 max-w-lg mx-auto shadow-xl">
            <Layers className="w-10 h-10 text-brand-accent mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">Bespoke Architecture Available</h3>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              We design and engineer tailored digital platforms for <span className="text-white font-semibold">{selectedCategory}</span>. Contact Govind Web Solutions to commission a high-converting website for your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/contact"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-secondary text-white text-xs font-semibold shadow-md transition-all"
              >
                Inquire For This Sector
              </Link>
              <button
                onClick={() => setSelectedCategory('All')}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-navy-850 hover:bg-navy-800 text-slate-300 hover:text-white text-xs font-medium border border-navy-750 transition-colors"
              >
                View All Projects
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeProjectModal}
        isOpen={!!activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
      />
    </div>
  );
}

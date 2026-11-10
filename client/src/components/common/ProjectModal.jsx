import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, Layers, AlertCircle } from 'lucide-react';
import Badge from './Badge';

export default function ProjectModal({ project, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="relative w-full max-w-3xl bg-navy-900 border border-navy-750 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-navy-800 bg-navy-950/50">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="primary">{project.category}</Badge>
              {project.isSample && (
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Sample Project Specification
                </span>
              )}
            </div>
            <h3 id="modal-project-title" className="text-xl sm:text-2xl font-bold text-white">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-navy-850 hover:bg-navy-800 transition-colors"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-300">
          {/* Cover image showcase if available */}
          {project.coverImage && (
            <div className="relative rounded-2xl overflow-hidden border border-navy-750 max-h-64 sm:max-h-72 shadow-lg group">
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-navy-900/90 text-slate-200 border border-navy-700 backdrop-blur-md">
                  Live Production Storefront Showcase
                </span>
              </div>
            </div>
          )}

          {/* Sample disclaimer banner (only for sample projects) */}
          {project.isSample && (
            <div className="p-4 rounded-xl bg-navy-850/70 border border-navy-700/60 flex items-start gap-3 text-xs text-slate-300">
              <AlertCircle className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
              <p>
                This case study represents an architectural reference and portfolio prototype developed by our engineering team. Live URLs and verified client case studies will be updated as non-disclosure agreements permit.
              </p>
            </div>
          )}

          {/* Overview */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
              Project Overview
            </h4>
            <p className="text-sm leading-relaxed text-slate-200">{project.fullDesc}</p>
          </div>

          {/* Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-navy-950/60 border border-navy-800">
              <h5 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">
                Challenge / Problem
              </h5>
              <p className="text-xs leading-relaxed text-slate-300">{project.problem}</p>
            </div>
            <div className="p-4 rounded-xl bg-navy-950/60 border border-navy-800">
              <h5 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                Engineered Solution
              </h5>
              <p className="text-xs leading-relaxed text-slate-300">{project.solution}</p>
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3">
              Key Features & Architectural Highlights
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.keyFeatures?.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech) => (
                <Badge key={tech} variant="default" size="md">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-navy-800 bg-navy-950/50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.liveUrl && project.liveUrl !== '#' ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-secondary text-white text-xs font-medium transition-colors shadow-md shadow-brand-primary/25"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Visit Live Website</span>
              </a>
            ) : (
              <button
                onClick={() => alert('Live demonstration environment is deployed on client staging servers. Contact us for a guided demonstration.')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-secondary text-white text-xs font-medium transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Prototype Preview</span>
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}


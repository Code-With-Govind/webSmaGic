import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, ArrowUp, Mail, Phone, MapPin, Github, Linkedin, Globe, Shield } from 'lucide-react';
import { AGENCY_SERVICES } from '../../utils/agencyData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-navy-950 border-t border-navy-800 text-slate-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-14">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-accent flex items-center justify-center text-white shadow-md shadow-brand-primary/20">
                <Code2 className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-brand-accent transition-colors">
                  Govind Web Solutions
                </span>
                <span className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">
                  Digital Agency
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              We engineer bespoke web applications, responsive corporate platforms, and scalable digital systems tailored to help forward-thinking businesses scale online.
            </p>

            {/* Social Links (Clearly identified placeholders) */}
            <div className="pt-2">
              <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                Connect With Us
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/govindrathod"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-navy-900 border border-navy-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-brand-accent hover:bg-navy-850 transition-colors"
                  aria-label="Founder GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-navy-900 border border-navy-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-brand-accent hover:bg-navy-850 transition-colors"
                  aria-label="LinkedIn Profile Placeholder"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <div
                  className="w-9 h-9 rounded-lg bg-navy-900 border border-navy-800 flex items-center justify-center text-slate-400 cursor-not-allowed opacity-60"
                  title="Social profile link to be configured"
                  aria-label="Social Link Placeholder"
                >
                  <Globe className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-brand-accent transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-accent transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brand-accent transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-brand-accent transition-colors">Projects & Case Studies</Link>
              </li>
              <li>
                <Link to="/founders" className="hover:text-brand-accent transition-colors">Our Team & Founders</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-accent transition-colors">Contact & Inquiries</Link>
              </li>
            </ul>
          </div>

          {/* Agency Services Links */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Core Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm">
              {AGENCY_SERVICES.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services#${service.id}`}
                    className="hover:text-brand-accent transition-colors truncate block"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information Placeholders */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-400 text-[11px] uppercase tracking-wider">Business Email</span>
                  <span className="text-slate-200 font-medium">contact@govindwebsolutions.com</span>
                  <span className="block text-[10px] text-slate-400 italic">(Verified address to be configured)</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-400 text-[11px] uppercase tracking-wider">Location</span>
                  <span className="text-slate-200 font-medium">India & Remote Global Delivery</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-400 text-[11px] uppercase tracking-wider">Direct WhatsApp / Phone</span>
                  <span className="text-slate-300 font-mono text-[11px]">[Details to be provided]</span>
                </div>
              </li>
            </ul>

            <div className="mt-5 pt-4 border-t border-navy-850">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-300 transition-colors"
                title="Founder Access Only"
              >
                <Shield className="w-3.5 h-3.5 text-slate-400" />
                <span>Founder Portal</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Back to top */}
        <div className="pt-8 border-t border-navy-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {currentYear} Govind Web Solutions. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <span className="text-slate-400">Professional Web Development Agency</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-900 border border-navy-800 text-slate-300 hover:text-white hover:bg-navy-850 transition-colors"
              aria-label="Scroll to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

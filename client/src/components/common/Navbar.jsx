import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Code2, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu whenever location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Track scroll position for subtle background adjustment
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Our Team', path: '/founders' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-navy-950/95 backdrop-blur-md border-b border-navy-800 shadow-lg shadow-navy-950/40'
          : 'bg-navy-950/80 backdrop-blur-sm border-b border-navy-850'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Wordmark */}
        <Link
          to="/"
          className="flex items-center gap-3.5 group focus:outline-none focus:ring-2 focus:ring-brand-accent rounded-lg p-1"
          aria-label="Govind Web Solutions Homepage"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary via-blue-600 to-brand-accent flex items-center justify-center text-white shadow-lg shadow-brand-primary/25 group-hover:shadow-brand-accent/40 transition-all duration-300">
            <Code2 className="w-5 h-5 group-hover:rotate-6 transition-transform" />
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

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'text-brand-accent bg-navy-850 border border-navy-750 font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-navy-900/60'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-secondary text-white text-sm font-semibold shadow-md shadow-brand-primary/20 hover:shadow-lg hover:shadow-brand-primary/35 transition-all active:scale-98"
          >
            <span>Let's Talk</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-slate-300 hover:text-white bg-navy-900 border border-navy-800 hover:bg-navy-850 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-950/98 backdrop-blur-xl border-b border-navy-800 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'text-brand-accent bg-navy-850 border border-navy-750 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-navy-900'
                  }`
                }
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </NavLink>
            ))}
          </div>
          <div className="pt-3">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-secondary text-white font-semibold text-center shadow-lg shadow-brand-primary/25 transition-all"
            >
              <span>Let's Talk — Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

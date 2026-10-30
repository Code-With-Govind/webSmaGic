import React from 'react';
import { Terminal, Shield, Zap, CheckCircle2, Code2, Server } from 'lucide-react';

export default function HeroArtwork() {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      {/* Background radial gradient glow */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 via-brand-accent to-cyan-500 opacity-20 blur-2xl" />

      {/* Main Terminal Mockup Window */}
      <div className="relative rounded-2xl bg-navy-900/90 border border-navy-750 shadow-2xl backdrop-blur-xl overflow-hidden">
        {/* Terminal Titlebar */}
        <div className="flex items-center justify-between px-4 py-3 bg-navy-950/80 border-b border-navy-800">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <Terminal className="w-3.5 h-3.5 text-brand-accent" />
            <span>govind-web-solutions.config.js</span>
          </div>
          <div className="w-12" />
        </div>

        {/* Code Content */}
        <div className="p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-300 overflow-x-auto">
          <p className="text-slate-500">// Agency Enterprise Architecture</p>
          <p>
            <span className="text-purple-400">const</span>{' '}
            <span className="text-yellow-300">agency</span> = {'{'}
          </p>
          <p className="pl-4">
            <span className="text-blue-300">name</span>:{' '}
            <span className="text-emerald-300">'Govind Web Solutions'</span>,
          </p>
          <p className="pl-4">
            <span className="text-blue-300">mission</span>:{' '}
            <span className="text-emerald-300">'Engineering Business-Driven Web Solutions'</span>,
          </p>
          <p className="pl-4">
            <span className="text-blue-300">capabilities</span>: [
          </p>
          <p className="pl-8 text-cyan-300">
            'High-Performance Web Apps', 'Bespoke E-commerce', 'Full-Stack Architecture'
          </p>
          <p className="pl-4">],</p>
          <p className="pl-4">
            <span className="text-blue-300">techStack</span>: {'{'}
          </p>
          <p className="pl-8">
            <span className="text-slate-400">frontend:</span>{' '}
            <span className="text-brand-accent">['React', 'Tailwind CSS', 'Vite']</span>,
          </p>
          <p className="pl-8">
            <span className="text-slate-400">backend:</span>{' '}
            <span className="text-brand-accent">['Node.js', 'Express.js', 'REST APIs']</span>,
          </p>
          <p className="pl-8">
            <span className="text-slate-400">database:</span>{' '}
            <span className="text-brand-accent">['MongoDB', 'MySQL']</span>
          </p>
          <p className="pl-4">{'}'},</p>
          <p className="pl-4">
            <span className="text-blue-300">deliverables</span>: () =&gt; ({'{'}
          </p>
          <p className="pl-8 text-emerald-400">
            performance: '100% Core Web Vitals',
          </p>
          <p className="pl-8 text-emerald-400">
            responsive: 'Mobile, Tablet, Desktop',
          </p>
          <p className="pl-8 text-emerald-400">
            security: 'Hardened & Audited'
          </p>
          <p className="pl-4">{'})'}</p>
          <p>{'}'};</p>
        </div>

        {/* Floating status footer inside card */}
        <div className="px-5 py-3 bg-navy-950/70 border-t border-navy-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-semibold">Systems Online</span>
          </div>
          <span className="text-slate-400">v2.0 Production Ready</span>
        </div>
      </div>

      {/* Floating Badges */}
      <div className="absolute -bottom-6 -left-4 sm:-left-6 p-3 sm:p-4 rounded-xl bg-navy-850/95 border border-navy-700 shadow-xl backdrop-blur-md flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
          <Zap className="w-5 h-5" />
        </div>
        <div>
          <span className="block text-xs text-slate-400 font-medium">Performance Score</span>
          <span className="text-sm font-bold text-white">99/100 Core Web Vitals</span>
        </div>
      </div>

      <div className="absolute -top-6 -right-4 sm:-right-6 p-3 sm:p-4 rounded-xl bg-navy-850/95 border border-navy-700 shadow-xl backdrop-blur-md hidden sm:flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-brand-accent flex items-center justify-center">
          <Shield className="w-5 h-5" />
        </div>
        <div>
          <span className="block text-xs text-slate-400 font-medium">Enterprise Security</span>
          <span className="text-sm font-bold text-white">Clean & Hardened Code</span>
        </div>
      </div>
    </div>
  );
}

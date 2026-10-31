import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ScrollToTop from '../components/common/ScrollToTop';
import FloatingWhatsApp from '../components/common/FloatingWhatsApp';
import { trackPageView } from '../utils/analytics';

export default function MainLayout() {
  const location = useLocation();

  // Automatic first-party page view tracking on route transitions
  useEffect(() => {
    if (!location.pathname.startsWith('/dashboard')) {
      trackPageView(location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-navy-950 text-slate-100">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}

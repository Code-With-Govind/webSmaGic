import { API_BASE_URL } from '../services/api';

const STORAGE_KEYS = {
  VISITOR_ID: 'gws_vid',
  SESSION_ID: 'gws_sid',
};

// Generate privacy-conscious random ID (no hardware or device fingerprinting)
const generateId = (prefix) => {
  const rand = Math.random().toString(36).substring(2, 12);
  const time = Date.now().toString(36);
  return `${prefix}_${time}_${rand}`;
};

/**
 * Retrieve or generate persistent anonymous Visitor ID
 */
export const getVisitorId = () => {
  try {
    let vid = localStorage.getItem(STORAGE_KEYS.VISITOR_ID);
    if (!vid || typeof vid !== 'string' || vid.length < 8) {
      vid = generateId('v');
      localStorage.setItem(STORAGE_KEYS.VISITOR_ID, vid);
    }
    return vid;
  } catch {
    return generateId('v_temp');
  }
};

/**
 * Retrieve or generate session-scoped anonymous Session ID
 */
export const getSessionId = () => {
  try {
    let sid = sessionStorage.getItem(STORAGE_KEYS.SESSION_ID);
    if (!sid || typeof sid !== 'string' || sid.length < 8) {
      sid = generateId('s');
      sessionStorage.setItem(STORAGE_KEYS.SESSION_ID, sid);
    }
    return sid;
  } catch {
    return generateId('s_temp');
  }
};

/**
 * Parse referrer and UTM attribution parameters
 */
const getAttribution = () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get('utm_source');
    const utmMedium = params.get('utm_medium');
    const utmCampaign = params.get('utm_campaign');

    if (utmSource) {
      return {
        source: utmSource.substring(0, 100).toLowerCase(),
        medium: (utmMedium || '').substring(0, 100).toLowerCase(),
        campaign: (utmCampaign || '').substring(0, 100),
      };
    }

    const referrer = document.referrer || '';
    if (referrer) {
      const parsedRef = new URL(referrer);
      const host = parsedRef.hostname.toLowerCase();

      // Ignore self-referrals
      if (host !== window.location.hostname) {
        if (host.includes('google')) return { source: 'google', medium: 'organic' };
        if (host.includes('bing')) return { source: 'bing', medium: 'organic' };
        if (host.includes('linkedin')) return { source: 'linkedin', medium: 'social' };
        if (host.includes('twitter') || host.includes('x.com')) return { source: 'twitter', medium: 'social' };
        if (host.includes('github')) return { source: 'github', medium: 'referral' };
        return { source: host.replace(/^www\./, '').substring(0, 50), medium: 'referral' };
      }
    }

    return { source: 'direct', medium: '', campaign: '' };
  } catch {
    return { source: 'direct', medium: '', campaign: '' };
  }
};

/**
 * Send an analytics event to the backend API
 */
export const trackEvent = async (eventType, metadata = {}) => {
  // Respect Do Not Track header if set
  if (navigator.doNotTrack === '1' || window.doNotTrack === '1') {
    return;
  }

  // Never track internal dashboard paths
  const currentPath = window.location.pathname;
  if (currentPath.startsWith('/dashboard')) {
    return;
  }

  try {
    const attribution = getAttribution();

    const payload = {
      eventType,
      visitorId: getVisitorId(),
      sessionId: getSessionId(),
      pagePath: currentPath,
      referrer: (document.referrer || '').substring(0, 500),
      source: metadata.source || attribution.source || 'direct',
      medium: metadata.medium || attribution.medium || '',
      campaign: metadata.campaign || attribution.campaign || '',
      service: metadata.service || '',
    };

    // Asynchronous non-blocking dispatch
    fetch(`${API_BASE_URL}/analytics/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // Fail silently; analytics must never affect application functionality
    });
  } catch {
    // Fail silently
  }
};

/**
 * Helper: Track Page View
 */
export const trackPageView = (pagePath) => {
  trackEvent('page_view', { pagePath });
};

/**
 * Helper: Track Service CTA Click
 */
export const trackServiceClick = (service) => {
  trackEvent('service_cta_click', { service });
};

/**
 * Helper: Track Inquiry Attempt
 */
export const trackInquiryAttempt = () => {
  trackEvent('inquiry_attempt');
};

/**
 * Helper: Track Inquiry Success (Only after HTTP 201)
 */
export const trackInquirySuccess = () => {
  trackEvent('inquiry_success');
};

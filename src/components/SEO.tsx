// ✅ FIXED: SEO component now uses useEffect to actually update document.title and meta tags
// The previous version rendered <title> inside a Fragment which React does NOT inject into <head>
import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  name?: string;
  type?: string;
  path?: string;
}

const SITE_URL = 'https://pjenterprise.in';

function setMetaTag(attr: string, key: string, content: string) {
  let element = document.querySelector(`meta[${attr}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setCanonical(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

export default function SEO({
  title,
  description,
  name = 'PJ Enterprise',
  type = 'website',
  path = '',
}: SEOProps) {
  useEffect(() => {
    // ✅ FIXED: This actually updates the browser tab title and what Google sees
    document.title = title;

    const fullUrl = `${SITE_URL}${path}`;

    // Standard meta
    setMetaTag('name', 'description', description);

    // Open Graph
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', fullUrl);

    // Twitter
    setMetaTag('name', 'twitter:creator', name);
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);

    // Canonical
    setCanonical(fullUrl);
  }, [title, description, name, type, path]);

  return null; // ✅ FIXED: No JSX output needed — all work is done via DOM in useEffect
}

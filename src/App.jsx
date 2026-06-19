import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Search, Monitor, AppWindow, Smartphone, Globe, PenTool,
  Target, Plus, Minus, ChevronRight, Sparkles, ArrowUpRight,
  Zap, ArrowRight, Users, PlayCircle, Menu, X
} from 'lucide-react';

import ServicesPage from './ServicesPage';
import ContactPage from './ContactPage';
import LogoImg from './assets/NEXARA.webp';

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const BRAND = {
  name: 'NEXARA',
  tagline: 'Digital strategy. Measurable results.',
  desc: 'NEXARA is a full-stack digital transformation agency based in India, building enterprise web platforms, mobile apps, SEO strategies, and growth marketing campaigns.',
  url: 'https://www.nexara.studio',
  twitter: '@nexara_ai',
};

const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: BRAND.name,
  url: BRAND.url,
  logo: `${BRAND.url}/logo.png`,
  description: BRAND.desc,
  sameAs: ['https://www.instagram.com/nexara.ai_'],
  contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', availableLanguage: 'English' },
};

// ─── MOTION PRESETS (respect prefers-reduced-motion) ──────────────────────────
const useMotionVariants = () => {
  const reduce = useReducedMotion();
  return {
    fadeUp: {
      hidden: { opacity: 0, y: reduce ? 0 : 28 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
    },
    stagger: {
      hidden: {},
      visible: { transition: { staggerChildren: 0.12 } },
    },
    card: {
      hidden: { opacity: 0, scale: reduce ? 1 : 0.94, y: reduce ? 0 : 20 },
      visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 140, damping: 18 } },
    },
  };
};

// ─── SCROLL TO TOP ─────────────────────────────────────────────────────────────
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);
  return null;
};

// ─── SEO HEAD ─────────────────────────────────────────────────────────────────
const SeoHead = ({ title, description, path = '/', noindex = false }) => {
  const fullTitle = title ? `${title} | ${BRAND.name}` : `${BRAND.name} — ${BRAND.tagline}`;
  const canonical = `${BRAND.url}${path}`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || BRAND.desc} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      <link rel="canonical" href={canonical} />
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || BRAND.desc} />
      <meta property="og:image" content={`${BRAND.url}/og-image.jpg`} />
      <meta property="og:site_name" content={BRAND.name} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={BRAND.twitter} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || BRAND.desc} />
      <meta name="twitter:image" content={`${BRAND.url}/og-image.jpg`} />
    </Helmet>
  );
};

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Process', to: '/#process' },
  { label: 'Contact', to: '/contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      role="banner"
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-[#F9F7F2]/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]'
        : 'bg-[#F9F7F2]/80 backdrop-blur-sm'
        }`}
    >
      <nav
        aria-label="Primary navigation"
        className="flex justify-between items-center px-6 md:px-[8%] py-4 md:py-5 max-w-[1400px] mx-auto"
      >
        <Link
          to="/"
          aria-label={`${BRAND.name} — Home`}
          className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity"
        >
          <img
            src={LogoImg}
            alt={`${BRAND.name} logo`}
            width={40}
            height={40}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover shadow-md border border-[#C5A059]/20"
          />
          <span className="text-xl md:text-2xl font-black tracking-[0.15em] uppercase text-[#1A1A1A]">
            {BRAND.name}<span className="text-[#C5A059]">.</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center space-x-8 text-sm font-medium list-none m-0 p-0">
          {NAV_LINKS.map(({ label, to }) => (
            <li key={to}>
              <Link
                to={to}
                className="relative group hover:text-[#C5A059] transition-colors duration-200"
              >
                {label}
                <span
                  aria-hidden="true"
                  className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#C5A059] group-hover:w-full transition-all duration-300"
                />
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="/contact"
          className="hidden sm:inline-flex group relative overflow-hidden border border-[#1A1A1A] px-5 py-2.5 rounded-md font-medium transition-all items-center gap-2 text-sm"
        >
          <span className="relative z-10 group-hover:text-white transition-colors flex items-center gap-2">
            Start a Project
            <ArrowUpRight
              aria-hidden="true"
              className="w-4 h-4 group-hover:rotate-45 transition-transform duration-200"
            />
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[#1A1A1A] translate-y-full group-hover:translate-y-0 transition-transform duration-300"
          />
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-black/5 transition-colors"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(v => !v)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Mobile navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-[#F9F7F2] border-t border-black/5"
          >
            <ul className="flex flex-col px-6 py-4 space-y-4 list-none m-0 p-0">
              {NAV_LINKS.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-base font-medium hover:text-[#C5A059] transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/contact"
                  className="inline-block bg-[#1A1A1A] text-white px-5 py-2.5 rounded-md text-sm font-medium"
                  onClick={() => setOpen(false)}
                >
                  Start a Project
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer
    role="contentinfo"
    className="bg-[#1A1A1A] text-white py-12 md:py-16 px-6 md:px-[8%] relative overflow-hidden"
  >
    <div
      aria-hidden="true"
      className="absolute -bottom-10 left-0 right-0 text-center text-[100px] md:text-[200px] font-bold text-white/[0.02] leading-none pointer-events-none select-none"
    >
      {BRAND.name}
    </div>

    <div className="relative flex flex-col md:flex-row justify-between items-start gap-12 mb-12 z-10">
      <div className="max-w-sm">
        <div className="mb-6 flex items-center gap-3">
          <img
            src={LogoImg}
            alt={`${BRAND.name} logo`}
            width={48}
            height={48}
            loading="lazy"
            decoding="async"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shadow-lg border border-white/10"
          />
          <span className="text-2xl md:text-3xl font-black tracking-[0.15em] uppercase text-white">
            {BRAND.name}<span className="text-[#C5A059]">.</span>
          </span>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed">
          Architecting the future of digital experiences. We combine enterprise-grade development with striking visual design to help modern brands scale globally.
        </p>
      </div>

      <nav aria-label="Footer navigation" className="flex flex-col sm:flex-row gap-10 md:gap-16 w-full md:w-auto">
        <div>
          <h2 className="font-bold mb-4 text-xs md:text-sm uppercase tracking-wider text-[#C5A059]">Navigation</h2>
          <ul className="flex flex-col gap-3 text-sm list-none m-0 p-0">
            {NAV_LINKS.map(({ label, to }) => (
              <li key={to}>
                <Link to={to} className="text-gray-400 hover:text-white transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-bold mb-4 text-xs md:text-sm uppercase tracking-wider text-[#C5A059]">Services</h2>
          <ul className="flex flex-col gap-3 text-sm list-none m-0 p-0">
            {['SEO Services', 'Digital Marketing', 'Web Development', 'UI/UX Design'].map(s => (
              <li key={s}>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors">{s}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>

    <div className="relative flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10 text-xs md:text-sm text-gray-400 z-10">
      <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
      <div className="flex gap-6">
        <a href="/privacy" className="hover:text-[#C5A059] transition-colors">Privacy Policy</a>
        <a href="/terms" className="hover:text-[#C5A059] transition-colors">Terms of Service</a>
      </div>
    </div>
  </footer>
);

// ─── HOME PAGE ─────────────────────────────────────────────────────────────────
const SERVICES_LIST = [
  {
    title: 'Search Engine Optimization',
    icon: <Search className="w-5 h-5" aria-hidden="true" />,
    desc: 'Data-driven SEO campaigns to boost visibility and dominate organic search results.',
    points: ['Technical website audits', 'High-intent keyword mapping', 'Quality backlink building'],
  },
  {
    title: 'Digital Marketing',
    icon: <Target className="w-5 h-5" aria-hidden="true" />,
    desc: 'Targeted marketing strategies designed to acquire customers and scale your brand.',
    points: ['Performance ad campaigns', 'Data-driven analytics', 'Conversion optimization'],
  },
  {
    title: 'Social Media Handling',
    icon: <Globe className="w-5 h-5" aria-hidden="true" />,
    desc: 'Engaging content and management to build a loyal community online.',
    points: ['Brand profile management', 'Engaging content creation', 'Community interaction'],
  },
  {
    title: 'Web Development',
    icon: <Monitor className="w-5 h-5" aria-hidden="true" />,
    desc: 'Lightning-fast, secure, and scalable modern web applications and sites.',
    points: ['Next.js & React ecosystems', 'Custom SaaS development', 'Core Web Vitals tuning'],
  },
  {
    title: 'Mobile Application',
    icon: <Smartphone className="w-5 h-5" aria-hidden="true" />,
    desc: 'High-retention iOS and Android mobile apps built for engagement.',
    points: ['Intuitive gesture UI', 'Secure backend APIs', 'App Store Optimization'],
  },
  {
    title: 'UI/UX Designing',
    icon: <PenTool className="w-5 h-5" aria-hidden="true" />,
    desc: 'Intuitive interface design that builds trust and drives user conversions.',
    points: ['User-centric workflows', 'Scalable design systems', 'Premium visual identity'],
  },
  {
    title: 'Graphics Designing',
    icon: <Sparkles className="w-5 h-5" aria-hidden="true" />,
    desc: 'Stunning visual assets tailored for modern digital and print media.',
    points: ['Brand logo creation', 'Marketing collateral', 'Engaging illustrations'],
  },
];

const TEAM = [
  {
    name: 'Adarsh Dubey',
    role: 'Founder & CEO',
    desc: 'MERN stack expert engineering scalable server architectures and seamless client-side interfaces.',
    image: 'adarsh.jpeg',
  },
  {
    name: 'Inesh Vijay',
    role: 'Lead Designer & Developer',
    desc: 'Crafting intuitive, pixel-perfect user experiences that bridge human psychology and digital interaction.',
    image: 'inesh.png',
  },
  {
    name: 'Amit Dhakane',
    role: 'SEO Specialist & Growth Hacker',
    desc: 'Driving explosive organic traffic growth and ensuring our clients dominate the top spots on search engines.',
    image: 'amit.jpeg',
  },
  {
    name: 'Anshu Jha',
    role: 'Content & Growth Manager',
    desc: 'Creating hyper-targeted, data-driven ad campaigns that turn passive audiences into loyal, high-paying clients.',
    image: 'Anshu.jpg',
  },
];

const FAQS = [
  {
    q: 'How long does a typical full-stack project take?',
    a: 'Project timelines vary based on scope. On average, an enterprise web platform takes 6–10 weeks, while a fully custom native mobile app takes 10–16 weeks from wireframing to App Store launch.',
  },
  {
    q: 'Do you work with early-stage startups?',
    a: 'Absolutely. We love partnering with ambitious founders to build robust MVPs, set up initial cloud infrastructure, and scale their digital presence from day one.',
  },
  {
    q: 'What is your primary technology stack?',
    a: 'We specialise in the MERN stack (MongoDB, Express, React, Node.js), Next.js for SEO-heavy web apps, and React Native for mobile. We also integrate modern AI APIs to automate user workflows.',
  },
  {
    q: 'How do you ensure ROI on digital marketing?',
    a: "We focus entirely on data-driven results — lowering Customer Acquisition Cost (CAC) and maximising lifetime value through targeted ad campaigns and Conversion Rate Optimisation.",
  },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Audit & Strategy', desc: 'We dive deep into your target audience, competitors, and technical bottlenecks.' },
  { num: '02', title: 'Architecture Planning', desc: 'Creating a strategic UI/UX roadmap and secure backend database schema.' },
  { num: '03', title: 'Agile Development', desc: 'Writing clean, scalable code tailored for lightning-fast performance.' },
  { num: '04', title: 'Launch & Optimise', desc: 'Deploying the product and utilising analytics to refine and drive conversions.' },
];

const useInView = (options = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.1, rootMargin: '-40px', ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const FadeIn = ({ children, delay = 0, className = '' }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

const Home = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const toggleFaq = useCallback(i => setOpenFaq(v => (v === i ? -1 : i)), []);

  return (
    <main id="main-content">
      <SeoHead
        path="/"
        description="NEXARA is a full-stack digital agency building enterprise web platforms, mobile apps, SEO strategies, and growth marketing campaigns that deliver measurable results."
      />

      {/* JSON-LD structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }} />

      {/* ── HERO ── */}
      <section
        aria-labelledby="hero-heading"
        className="relative min-h-[70vh] md:min-h-[85vh] flex flex-col md:flex-row items-center justify-between px-6 md:px-[8%] pt-12 pb-16 md:pb-20 overflow-hidden"
      >
        {/* Grid bg */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="flex-1 z-10 relative mt-4 md:mt-0 w-full">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/5 mb-6 shadow-sm"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A059] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A059]" />
            </span>
            <span className="text-[10px] md:text-xs tracking-[0.2em] font-semibold text-[#C5A059] uppercase">
              Digital Transformation Agency
            </span>
          </motion.div>

          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-[1.1] mb-5 tracking-tight text-[#1A1A1A]"
          >
            Digital strategy.<br />
            Measurable{' '}
            <span className="bg-gradient-to-r from-[#C5A059] via-[#e0c179] to-[#C5A059] bg-clip-text text-transparent italic font-light">
              results.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-base md:text-lg lg:text-xl text-gray-600 max-w-lg mb-8 md:mb-10 leading-relaxed font-light"
          >
            We partner with ambitious brands to engineer robust software, design premium interfaces, and execute growth strategies that dominate the market.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row flex-wrap gap-4"
          >
            <Link
              to="/contact"
              className="group text-center relative bg-[#1A1A1A] text-white px-6 md:px-8 py-3.5 md:py-4 rounded-md font-semibold overflow-hidden shadow-lg hover:shadow-xl transition-shadow w-full sm:w-auto"
              style={{ willChange: 'transform' }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Started
                <ArrowUpRight aria-hidden="true" className="w-4 h-4 group-hover:rotate-45 transition-transform duration-200" />
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-[#C5A059] to-[#b08b4a] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"
              />
            </Link>

            <a
              href="https://www.instagram.com/nexara.ai_"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View NEXARA on Instagram"
              className="group flex justify-center items-center gap-2 md:gap-3 px-6 py-3.5 md:py-4 font-medium hover:gap-4 transition-all text-gray-700 w-full sm:w-auto border border-gray-200 sm:border-transparent rounded-md"
            >
              <span
                aria-hidden="true"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-gray-300 flex items-center justify-center group-hover:bg-[#1A1A1A] group-hover:border-[#1A1A1A] group-hover:text-white transition-colors"
              >
                <Globe className="w-4 h-4" />
              </span>
              View our account
            </a>
          </motion.div>
        </div>

        {/* Lottie — desktop only, lazy */}
        <div
          aria-hidden="true"
          className="hidden md:flex flex-1 justify-center items-center w-full mt-8 md:mt-0 relative md:h-[500px] z-0"
        >
          <div className="absolute inset-0 w-full h-full flex justify-center items-center scale-[1.2] md:scale-[1.6] lg:scale-[1.8]">
            <DotLottieReact
              src="https://lottie.host/b07c1b55-1782-4cee-b44e-645e16a8279a/eqZCxWE7FB.lottie"
              loop
              autoplay
            />
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section
        id="services"
        aria-labelledby="services-heading"
        className="bg-white py-16 md:py-24 px-6 md:px-[8%] relative border-y border-black/5 contain-layout"
      >
        <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-start">

          {/* Sticky left column */}
          <div className="lg:w-1/3 lg:sticky lg:top-32 w-full">
            <FadeIn>
              <span className="inline-flex items-center gap-2 text-[#C5A059] text-[10px] md:text-xs font-bold tracking-widest uppercase mb-3 md:mb-4">
                <span aria-hidden="true" className="w-6 md:w-8 h-[1px] bg-[#C5A059]" /> Capabilities
              </span>
              <h2
                id="services-heading"
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight text-[#1A1A1A]"
              >
                Technology.<br />
                <span className="bg-gradient-to-r from-[#C5A059] to-[#b08b4a] bg-clip-text text-transparent">Creativity.</span><br />
                Intelligence.
              </h2>
              <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-lg font-light leading-relaxed">
                We don't just build websites; we architect comprehensive digital ecosystems powered by modern technology.
              </p>
            </FadeIn>

            {/* Raining light — desktop only */}
            <div
              aria-hidden="true"
              className="hidden lg:flex relative w-full max-w-[400px] h-[600px] mt-12 justify-between px-0 overflow-hidden mx-auto lg:mx-0"
              style={{ maskImage: 'linear-gradient(to bottom, transparent, black 2%, black 98%, transparent)' }}
            >
              {[
                { color: 'bg-rose-500 shadow-rose-500/50', delay: 0.2, dur: 4.5, h: 'h-40' },
                { color: 'bg-orange-500 shadow-orange-500/50', delay: 1.2, dur: 5.1, h: 'h-64' },
                { color: 'bg-amber-400 shadow-amber-400/50', delay: 0.5, dur: 4.2, h: 'h-32' },
                { color: 'bg-yellow-400 shadow-yellow-400/50', delay: 2.1, dur: 4.8, h: 'h-56' },
                { color: 'bg-lime-400 shadow-lime-400/50', delay: 1.5, dur: 3.9, h: 'h-48' },
                { color: 'bg-green-500 shadow-green-500/50', delay: 3.1, dur: 5.8, h: 'h-72' },
                { color: 'bg-emerald-500 shadow-emerald-500/50', delay: 0.8, dur: 4.0, h: 'h-36' },
                { color: 'bg-cyan-500 shadow-cyan-500/50', delay: 1.8, dur: 5.5, h: 'h-60' },
                { color: 'bg-blue-500 shadow-blue-500/50', delay: 0.4, dur: 4.4, h: 'h-52' },
                { color: 'bg-indigo-500 shadow-indigo-500/50', delay: 2.5, dur: 5.0, h: 'h-44' },
                { color: 'bg-violet-500 shadow-violet-500/50', delay: 1.1, dur: 4.6, h: 'h-64' },
                { color: 'bg-purple-500 shadow-purple-500/50', delay: 2.8, dur: 5.9, h: 'h-80' },
              ].map((drop, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [-300, 1000], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: drop.dur, repeat: Infinity, delay: drop.delay, ease: 'linear' }}
                  className={`w-[2px] rounded-full shadow-[0_0_12px] ${drop.color} ${drop.h}`}
                  style={{ willChange: 'transform, opacity' }}
                />
              ))}
            </div>
          </div>

          {/* Service cards */}
          <ul className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 w-full relative z-10 list-none m-0 p-0">
            {SERVICES_LIST.map((service, idx) => (
              <li key={idx} className="h-full">
                <FadeIn delay={idx * 0.04} className="h-full">
                  <article
                    className="relative flex flex-col bg-white border border-gray-100 p-6 md:p-8 rounded-2xl hover:shadow-xl hover:border-[#C5A059]/30 hover:-translate-y-1 transition-all duration-300 group overflow-hidden h-full"
                    style={{ willChange: 'transform', contain: 'layout style' }}
                  >
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-br from-[#C5A059]/0 to-[#C5A059]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <span aria-hidden="true" className="absolute top-4 right-4 text-xs font-mono text-gray-300 group-hover:text-[#C5A059] transition-colors">
                      0{idx + 1}
                    </span>
                    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-5 relative z-10">
                      <div
                        aria-hidden="true"
                        className="text-[#C5A059] bg-[#F9F7F2] p-2.5 md:p-3 rounded-xl shadow-sm border border-gray-50 group-hover:bg-[#C5A059] group-hover:text-white group-hover:-rotate-6 transition-all duration-300"
                      >
                        {service.icon}
                      </div>
                      <h3 className="font-bold text-lg md:text-xl text-[#1A1A1A]">{service.title}</h3>
                    </div>
                    <p className="text-xs md:text-sm text-gray-500 mb-5 relative z-10 leading-relaxed font-light">{service.desc}</p>
                    <ul className="space-y-2 mt-auto border-t border-gray-100 pt-4 relative z-10 list-none m-0 p-0">
                      {service.points.map((pt, i) => (
                        <li key={i} className="text-xs md:text-sm text-gray-600 flex items-start gap-2 before:content-['•'] before:text-[#C5A059] before:font-bold">
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </article>
                </FadeIn>
              </li>
            ))}

            <li className="h-full">
              <FadeIn delay={SERVICES_LIST.length * 0.04} className="h-full">
                <div className="relative flex flex-col justify-center items-center text-center bg-gradient-to-br from-[#1A1A1A] via-[#2a2a2a] to-[#1A1A1A] p-6 md:p-8 rounded-2xl shadow-md overflow-hidden group h-full">
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-radial from-[#C5A059]/20 via-transparent to-transparent opacity-50" />
                  <Sparkles aria-hidden="true" className="absolute top-4 right-4 w-4 h-4 text-[#C5A059] animate-pulse" />
                  <h3 className="font-bold text-xl md:text-2xl text-white mb-2 relative z-10">Need a Custom Solution?</h3>
                  <p className="text-xs md:text-sm text-gray-400 mb-6 relative z-10 font-light">
                    Let's combine our technical expertise to build exactly what your brand needs to scale.
                  </p>
                  <Link
                    to="/contact"
                    className="relative z-10 bg-gradient-to-r from-[#C5A059] to-[#b08b4a] text-white px-5 py-2.5 rounded-md text-sm font-medium hover:shadow-[0_0_20px_rgba(197,160,89,0.4)] transition-all flex items-center gap-2 group/btn"
                  >
                    Let's Talk
                    <ChevronRight aria-hidden="true" className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </FadeIn>
            </li>
          </ul>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section
        id="process"
        aria-labelledby="process-heading"
        className="py-16 md:py-24 px-6 md:px-[8%] bg-[#F9F7F2] relative"
      >
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-start lg:items-center">
          <FadeIn className="lg:w-1/4">
            <span className="inline-flex items-center gap-2 text-[#C5A059] text-[10px] md:text-xs font-bold tracking-widest uppercase mb-3 md:mb-4">
              <Zap aria-hidden="true" className="w-3 h-3" /> Execution Framework
            </span>
            <h2 id="process-heading" className="text-3xl md:text-4xl font-bold leading-tight text-[#1A1A1A]">
              A blueprint for{' '}
              <span className="italic font-light text-[#C5A059]">scale.</span>
            </h2>
          </FadeIn>

          <ol className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full relative list-none m-0 p-0">
            <div
              aria-hidden="true"
              className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent -z-0"
            />
            {PROCESS_STEPS.map((step, index) => (
              <li key={step.num} className="h-full">
                <FadeIn delay={index * 0.1} className="h-full">
                  <article
                    className="relative bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-100 z-10 hover:-translate-y-1 hover:shadow-lg hover:border-[#C5A059]/30 transition-all duration-300 group h-full"
                    style={{ willChange: 'transform' }}
                  >
                    <div className="relative flex justify-between items-center mb-3 md:mb-4">
                      <span className="text-3xl md:text-4xl font-black bg-gradient-to-br from-[#C5A059] to-[#b08b4a] bg-clip-text text-transparent opacity-80 group-hover:opacity-100 transition-opacity">
                        {step.num}
                      </span>
                    </div>
                    <h3 className="relative text-base md:text-lg font-bold mb-2 text-[#1A1A1A]">{step.title}</h3>
                    <p className="relative text-gray-500 text-xs md:text-sm leading-relaxed font-light">{step.desc}</p>
                  </article>
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section
        id="team"
        aria-labelledby="team-heading"
        className="py-16 md:py-24 px-6 md:px-[8%] bg-white relative border-y border-black/5"
      >
        <FadeIn className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <span className="inline-flex items-center gap-2 text-[#C5A059] text-[10px] md:text-xs font-bold tracking-widest uppercase mb-3 md:mb-4">
            <Users aria-hidden="true" className="w-4 h-4" /> The Team
          </span>
          <h2 id="team-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-[#1A1A1A]">
            The minds behind the{' '}
            <span className="italic font-light text-[#C5A059]">growth</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-lg font-light">
            A specialised team of developers, designers, and growth marketers. No bloat — pure talent focused on your product.
          </p>
        </FadeIn>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 list-none m-0 p-0">
          {TEAM.map((member, index) => (
            <li key={index} className="h-full">
              <FadeIn delay={index * 0.08} className="h-full">
                <article
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 h-full"
                  style={{ willChange: 'transform' }}
                >
                  <div className="w-full aspect-square md:aspect-[4/5] overflow-hidden bg-gray-100 relative">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-500"
                    />
                    <img
                      src={member.image}
                      alt={`${member.name}, ${member.role} at ${BRAND.name}`}
                      width={400}
                      height={500}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <div className="p-5 md:p-6 flex flex-col flex-grow bg-white">
                    <h3 className="text-lg md:text-xl font-bold text-[#1A1A1A] mb-1">{member.name}</h3>
                    <p className="text-[10px] md:text-xs font-bold text-[#C5A059] uppercase tracking-widest mb-3 md:mb-4">
                      {member.role}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-light">{member.desc}</p>
                  </div>
                </article>
              </FadeIn>
            </li>
          ))}
        </ul>
      </section>

      {/* ── FAQ ── */}
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="bg-[#F9F7F2] py-16 md:py-24 px-6 md:px-[8%]"
      >
        <div className="flex flex-col md:flex-row gap-10 md:gap-16">
          <FadeIn className="md:w-1/3 w-full">
            <span className="inline-flex items-center gap-2 text-[#C5A059] text-[10px] md:text-xs font-bold tracking-widest uppercase mb-3 md:mb-4">
              <span aria-hidden="true" className="w-6 md:w-8 h-[1px] bg-[#C5A059]" /> FAQ
            </span>
            <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-[#1A1A1A]">
              Questions we get asked{' '}
              <span className="italic font-light text-[#C5A059]">often</span>
            </h2>
            <p className="text-gray-600 mb-6 text-sm md:text-base font-light">
              Can't find the answer? Reach out and we'll reply within 24 hours.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-[#C5A059] text-sm md:text-base font-bold hover:gap-3 transition-all"
            >
              Contact Support <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </Link>
          </FadeIn>

          <div className="md:w-2/3 w-full space-y-3 md:space-y-4">
            {FAQS.map((faq, index) => (
              <FadeIn key={index} delay={index * 0.06}>
                <div
                  className={`border rounded-xl overflow-hidden transition-all duration-300 ${openFaq === index
                    ? 'border-[#C5A059] bg-white shadow-sm'
                    : 'border-gray-200 bg-white/50 hover:bg-white hover:border-gray-300'
                    }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    aria-expanded={openFaq === index}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-btn-${index}`}
                    className="w-full text-left p-4 md:p-6 flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] focus-visible:ring-offset-2 rounded-xl"
                  >
                    <span className="font-bold text-sm md:text-lg text-[#1A1A1A] pr-4">{faq.q}</span>
                    <motion.div animate={{ rotate: openFaq === index ? 180 : 0 }} transition={{ duration: 0.2 }} aria-hidden="true">
                      {openFaq === index
                        ? <Minus className="text-[#C5A059] w-4 h-4 md:w-5 md:h-5" />
                        : <Plus className="text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                      }
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === index && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        role="region"
                        aria-labelledby={`faq-btn-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="px-4 md:px-6 pb-4 md:pb-6 text-xs md:text-sm text-gray-600 leading-relaxed font-light overflow-hidden"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRE-FOOTER CTA ── */}
      <section
        aria-labelledby="cta-heading"
        className="py-12 md:py-20 px-4 md:px-[8%] bg-white border-t border-gray-100"
      >
        <div className="bg-[#1A1A1A] rounded-2xl md:rounded-3xl p-8 md:p-24 text-center relative overflow-hidden shadow-xl">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <h2
              id="cta-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight leading-tight"
            >
              Ready to solve your digital roadblocks?
            </h2>
            <p className="text-gray-400 mb-8 md:mb-10 text-sm md:text-xl font-light max-w-2xl px-2">
              Stop settling for average execution. Let's hop on a discovery call to audit your current architecture and map out a growth plan.
            </p>
            <Link
              to="/contact"
              className="w-full sm:w-auto mx-auto bg-gradient-to-r from-[#C5A059] to-[#b08b4a] text-[#1A1A1A] px-6 md:px-8 py-3.5 md:py-4 rounded-md font-bold text-sm md:text-lg hover:shadow-[0_0_30px_rgba(197,160,89,0.4)] transition-all flex items-center justify-center gap-2"
            >
              Book a Strategy Call
              <ArrowRight aria-hidden="true" className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

// ─── APP ───────────────────────────────────────────────────────────────────────
function App() {
  return (
    <Router>
      <ScrollToTop />
      <div
        className="bg-[#F9F7F2] font-sans text-[#1A1A1A] overflow-x-hidden selection:bg-[#C5A059] selection:text-[#1A1A1A]"
      >
        {/* Skip-to-content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-white focus:px-4 focus:py-2 focus:rounded focus:text-[#C5A059] focus:font-bold"
        >
          Skip to content
        </a>

        {/* Preconnect hints */}
        <Helmet>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://lottie.host" />
          <link rel="preconnect" href="https://images.unsplash.com" />
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
          <meta name="theme-color" content="#F9F7F2" />
          <html lang="en" />
        </Helmet>

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import {
  Search,
  Monitor,
  Smartphone,
  PenTool,
  Target,
  CheckCircle2,
  ArrowDownRight,
  Layers,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

const ServicesPage = () => {
  // Smooth animations
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // SEO Optimized Services
  const servicesList = [
    {
      id: 'seo',
      title: 'SEO Services & Optimization',
      icon: <Search strokeWidth={1.5} className="w-7 h-7" />,
      short: 'Advanced SEO services to improve search rankings, traffic, and visibility.',
      challenge: 'Many businesses struggle with low search rankings and poor website traffic due to outdated SEO strategies and technical website issues.',
      solution: 'We provide advanced SEO services including technical SEO, keyword optimization, local SEO, backlink building, and Core Web Vitals optimization.',
      deliverables: ['Technical SEO Audit', 'Keyword Research', 'Local SEO Optimization', 'Backlink Strategy'],
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing & Growth',
      icon: <Target strokeWidth={1.5} className="w-7 h-7" />,
      short: 'Performance marketing campaigns that generate leads, sales, and ROI.',
      challenge: 'Businesses waste budget on poor targeting, weak ad creatives, and low-converting landing pages without seeing a return on investment.',
      solution: 'Our agency creates high-converting digital marketing campaigns optimized for targeted lead generation and sustainable business growth.',
      deliverables: ['Google Ads Campaigns', 'Conversion Tracking', 'Landing Page Setup', 'Performance Analytics'],
    },
    {
      id: 'social-media',
      title: 'Social Media Handling',
      icon: <Layers strokeWidth={1.5} className="w-7 h-7" />,
      short: 'Engaging content and community management across top platforms.',
      challenge: 'Maintaining a consistent and engaging social media presence is time-consuming and difficult without a dedicated strategy.',
      solution: 'We manage your social media profiles, create engaging content, and interact with your community to build lasting brand loyalty.',
      deliverables: ['Profile Management', 'Content Creation', 'Community Building', 'Social Media Strategy'],
    },
    {
      id: 'web',
      title: 'Website Development',
      icon: <Monitor strokeWidth={1.5} className="w-7 h-7" />,
      short: 'Custom responsive website development optimized for speed and SEO.',
      challenge: 'Most business websites fail due to slow loading speed, poor mobile responsiveness, weak user experience, and bad architecture.',
      solution: 'We build high-performance websites using modern technologies with SEO-friendly code, fast loading speed, and mobile optimization.',
      deliverables: ['Responsive Design', 'SEO-Friendly Code', 'Fast Performance', 'Web Vitals Tuning'],
    },
    {
      id: 'mobile',
      title: 'Mobile App Development',
      icon: <Smartphone strokeWidth={1.5} className="w-7 h-7" />,
      short: 'Custom Android and iOS mobile app development for businesses.',
      challenge: 'Poorly optimized apps lead to bad user experience, low user retention, frequent crashes, and negative app store reviews.',
      solution: 'We develop fast, secure, scalable mobile apps with modern UI, optimized performance, and a smooth, engaging user experience.',
      deliverables: ['Android Applications', 'iOS Applications', 'React Native Builds', 'Secure API Integrations'],
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Designing',
      icon: <PenTool strokeWidth={1.5} className="w-7 h-7" />,
      short: 'Modern UI/UX design solutions that improve trust and conversions.',
      challenge: 'Outdated design and poor user experience reduce customer trust and negatively impact sales and user retention rates.',
      solution: 'We create premium brand identity systems, modern UI/UX interfaces, and conversion-focused user journeys for digital products.',
      deliverables: ['User Interface Design', 'User Experience Flow', 'Figma Prototypes', 'Design Systems'],
    },
    {
      id: 'graphics',
      title: 'Graphics Designing',
      icon: <Sparkles strokeWidth={1.5} className="w-7 h-7" />,
      short: 'Stunning visual assets tailored for modern digital and print media.',
      challenge: 'Generic visuals fail to capture audience attention and make the brand look unprofessional in a crowded digital marketplace.',
      solution: 'We craft stunning, bespoke graphics including logos, marketing collateral, and illustrations that elevate your brand identity.',
      deliverables: ['Brand Logos', 'Marketing Materials', 'Custom Illustrations', 'Visual Identity'],
    },
  ];

  return (
    <>
      {/* ================= SEO META TAGS ================= */}
      <Helmet>
        <title>
          Our Services | NEXARA Digital Marketing Agency
        </title>

        <meta
          name="description"
          content="Explore our premium digital marketing, SEO, web development, and mobile app development services designed to scale your business."
        />

        <meta
          name="keywords"
          content="digital marketing services, SEO agency, website development, mobile app development, UI/UX design"
        />

        <meta name="robots" content="index, follow" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />

        <link
          rel="canonical"
          href="https://www.nexara.studio/services"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Best Digital Marketing Agency in Jaipur"
        />

        <meta
          property="og:description"
          content="Leading SEO, web development, Google Ads, and digital marketing services in Jaipur and India."
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:image"
          content="https://www.nexara.studio/cover.jpg"
        />

        {/* Twitter SEO */}
        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Best Digital Marketing Agency in Jaipur"
        />

        <meta
          name="twitter:description"
          content="Professional SEO, web development, and digital marketing services in Jaipur."
        />

        {/* ================= SCHEMA MARKUP ================= */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "DigitalMarketingAgency",
            "name": "NEXARA",
            "url": "https://www.nexara.studio",
            "logo": "https://www.nexara.studio/image_one.png",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Jaipur",
              "addressRegion": "Rajasthan",
              "addressCountry": "India"
            },
            "areaServed": "India",
            "serviceType": [
              "SEO Services",
              "Website Development",
              "Google Ads",
              "Social Media Marketing",
              "Mobile App Development"
            ]
          }
          `}
        </script>

        {/* FAQ Schema */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Which is the best digital marketing agency in Jaipur?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We provide SEO services, website development, Google Ads, and social media marketing services for businesses across India."
                }
              },
              {
                "@type": "Question",
                "name": "Do you provide SEO services in India?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we provide technical SEO, local SEO, ecommerce SEO, and Google ranking optimization services in India."
                }
              }
            ]
          }
          `}
        </script>
      </Helmet>

      {/* ================= MAIN PAGE ================= */}
      <main className="bg-[#F9F7F2] text-[#1A1A1A] min-h-screen">

        {/* ================= HERO SECTION ================= */}
        <header className="pt-20 md:pt-28 pb-16 px-6 md:px-[8%]">

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-5xl"
          >

            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2 mb-4"
            >
              <Layers className="w-4 h-4 text-[#C5A059]" />

              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#C5A059]">
                Top Digital Marketing Company
              </span>
            </motion.div>

            {/* SEO H1 */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6"
            >
              Best Digital Marketing Agency in Jaipur
            </motion.h1>

            {/* SEO Content */}
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-gray-600 max-w-4xl leading-relaxed"
            >
              We provide SEO services, website development,
              Google Ads management, ecommerce marketing,
              social media marketing, and branding solutions
              for startups and businesses across Jaipur and India.
            </motion.p>
          </motion.div>
        </header>

        {/* ================= LOCAL SEO SECTION ================= */}
        <section className="bg-white border-y border-black/5 py-12 px-6 md:px-[8%]">

          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold mb-4">
              Digital Marketing Services in Jaipur
            </h2>

            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              Our Jaipur-based digital marketing agency helps businesses
              improve Google rankings, generate quality leads, increase
              online visibility, and grow faster using advanced SEO,
              performance marketing, and website development strategies.
            </p>
          </div>
        </section>

        {/* ================= SERVICES SECTION ================= */}
        <section className="py-16">

          <div className="flex flex-col gap-14">

            {servicesList.map((service, index) => (
              <motion.article
                key={service.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="px-6 md:px-[8%] flex flex-col lg:flex-row gap-10"
              >

                {/* LEFT */}
                <div className="lg:w-5/12">

                  <div className="w-12 h-12 rounded-xl bg-white border flex items-center justify-center mb-5 shadow-sm">
                    {service.icon}
                  </div>

                  <h2 className="text-2xl md:text-4xl font-bold mb-3">
                    {service.title}
                  </h2>

                  <p className="text-gray-500 text-base leading-relaxed">
                    {service.short}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="lg:w-7/12">

                  <div className="bg-white p-8 rounded-2xl border shadow-sm">

                    <div className="space-y-8">

                      <div>
                        <h3 className="text-sm uppercase tracking-widest text-gray-400 font-bold mb-3">
                          Industry Challenge
                        </h3>

                        <p className="text-gray-700 leading-relaxed">
                          {service.challenge}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm uppercase tracking-widest text-[#C5A059] font-bold mb-3">
                          Our Solution
                        </h3>

                        <p className="text-gray-600 leading-relaxed">
                          {service.solution}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold mb-4">
                          Core Deliverables
                        </h3>

                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {service.deliverables.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-gray-600"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[#C5A059] mt-1" />

                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  </div>
                </div>
              </motion.article>
            ))}

          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section className="px-6 md:px-[8%] py-16 bg-white border-y border-black/5">

          <div className="max-w-4xl mx-auto">

            <div className="flex items-center gap-2 justify-center mb-10">
              <HelpCircle className="w-5 h-5 text-[#C5A059]" />

              <h2 className="text-3xl font-bold">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-5">

              <article className="bg-[#F9F7F2] p-6 rounded-2xl">

                <h3 className="text-xl font-semibold mb-2">
                  Which is the best digital marketing agency in Jaipur?
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  We provide SEO services, website development,
                  Google Ads management, social media marketing,
                  and branding solutions for startups and businesses
                  across India.
                </p>
              </article>

              <article className="bg-[#F9F7F2] p-6 rounded-2xl">

                <h3 className="text-xl font-semibold mb-2">
                  Do you provide SEO services in India?
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  Yes, we provide local SEO, technical SEO,
                  ecommerce SEO, backlink building, and
                  Google ranking optimization services.
                </p>
              </article>

            </div>
          </div>
        </section>

        {/* ================= CTA SECTION ================= */}
        <section className="px-6 md:px-[8%] py-16">

          <div className="bg-[#1A1A1A] rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">

            <div className="max-w-3xl mx-auto relative z-10">

              <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
                Ready to Grow Your Business Online?
              </h2>

              <p className="text-gray-400 mb-8 text-base md:text-lg leading-relaxed">
                Get a free SEO and digital marketing consultation
                from our experts in Jaipur. We’ll analyze your
                website, competitors, and growth opportunities.
              </p>

              <Link
                to="/contact"
                aria-label="Get Free SEO Consultation"
                className="inline-flex items-center gap-2 bg-[#C5A059] text-[#1A1A1A] px-7 py-4 rounded-xl font-bold hover:bg-white transition-all duration-300"
              >
                Get Free SEO Consultation

                <ArrowDownRight className="w-5 h-5" />
              </Link>

            </div>
          </div>
        </section>

      </main>
    </>
  );
};

export default ServicesPage;
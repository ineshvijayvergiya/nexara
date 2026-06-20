import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Mail,
  MapPin,
  Sparkles,
  CheckCircle2,
  Loader2,
  Clock,
  ArrowRight,
} from 'lucide-react';

const ContactPage = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  const GOOGLE_SCRIPT_URL =
    'https://script.google.com/macros/s/AKfycbxxx7ZH-OZ8rl_NqVmVV9sT_xTyrPdIxVy0-cW2ExrNilUF06_OlzuQoL7A7GQV0llOTw/exec';

  const services = [
    'SEO Services',
    'Digital Marketing',
    'Social Media Handling',
    'Website Development',
    'Mobile Application',
    'UI/UX Designing',
    'Graphics Designing',
  ];

  const toggleService = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    formData.append('services', selectedServices.join(', '));

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setIsSubmitted(true);
        e.target.reset();
        setSelectedServices([]);

        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>
          Contact Us | NEXARA Digital Marketing Experts
        </title>

        <meta
          name="description"
          content="Get in touch with NEXARA. Contact our digital marketing experts for a free consultation on SEO, web development, and growth strategies."
        />

        <meta
          name="keywords"
          content="contact digital marketing agency, SEO consultation, hire web developers, marketing agency Jaipur, contact NEXARA"
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href="https://www.nexara.studio/contact"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Best Digital Marketing Agency in Jaipur"
        />

        <meta
          property="og:description"
          content="Leading digital marketing company in Jaipur offering SEO, Google Ads, social media marketing, ecommerce marketing, and website development services."
        />

        <meta property="og:type" content="website" />

        {/* Schema Markup */}
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
              "addressCountry": "India"
            },
            "areaServed": "India",
            "serviceType": [
              "SEO Services",
              "Social Media Marketing",
              "Google Ads",
              "Website Development",
              "Ecommerce Marketing"
            ]
          }
          `}
        </script>
      </Helmet>

      <main className="bg-[#F9F7F2] text-[#1A1A1A] min-h-screen pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-5 md:px-[8%]">

          {/* HERO SECTION */}
          <header className="text-center mb-16">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <span className="inline-flex items-center gap-2 text-[#C5A059] text-xs font-bold tracking-[0.2em] uppercase mb-5">
                <Sparkles className="w-4 h-4" />
                Top Digital Marketing Company
              </span>

              {/* SEO H1 */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                Best Digital Marketing Agency in Jaipur
              </h1>

              <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Leading digital marketing agency in Jaipur offering SEO
                services, social media marketing, Google Ads, website
                development, ecommerce marketing, and online branding
                solutions in India.
              </p>
            </motion.div>
          </header>

          <div className="flex flex-col lg:flex-row gap-12 items-start">

            {/* LEFT SIDEBAR */}
            <motion.aside
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="w-full lg:w-1/3 space-y-6"
            >

              <div className="bg-white p-8 rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold mb-6">
                  Contact Us
                </h2>

                <address className="not-italic space-y-6">

                  <div className="flex items-start gap-4">
                    <div className="bg-[#F9F7F2] p-3 rounded-lg">
                      <Mail className="w-5 h-5" />
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                        Email Address
                      </p>

                      <a
                        href="mailto:nexara0605@gmail.com"
                        className="font-semibold hover:text-[#C5A059]"
                      >
                        nexara0605@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-[#F9F7F2] p-3 rounded-lg">
                      <MapPin className="w-5 h-5" />
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                        Office Location
                      </p>

                      <p className="font-medium text-gray-600">
                        Jaipur, Rajasthan, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 border-t pt-5">
                    <Clock className="w-5 h-5 text-[#C5A059]" />

                    <p className="text-sm text-gray-600">
                      Response Time:
                      <span className="font-bold text-[#1A1A1A]">
                        {' '}
                        Within 24 Hours
                      </span>
                    </p>
                  </div>
                </address>
              </div>

              {/* SEO CONTENT */}
              <div className="bg-[#1A1A1A] text-white p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-5">
                  Why Choose Our Digital Marketing Services?
                </h2>

                <p className="text-gray-300 leading-relaxed mb-5">
                  We help startups, local businesses, ecommerce brands,
                  and companies improve Google rankings, generate quality
                  leads, and increase online visibility using advanced
                  SEO and digital marketing strategies.
                </p>

                <ul className="space-y-3 text-gray-300">
                  <li>✔ SEO Services India</li>
                  <li>✔ Google Ads Management</li>
                  <li>✔ Social Media Marketing</li>
                  <li>✔ Website Development</li>
                  <li>✔ Ecommerce Marketing</li>
                </ul>
              </div>
            </motion.aside>

            {/* FORM SECTION */}
            <motion.section
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="w-full lg:w-2/3"
            >
              <form
                onSubmit={handleSubmit}
                className="bg-white p-8 md:p-12 rounded-3xl shadow-md space-y-10"
              >

                {/* FORM TITLE */}
                <div>
                  <h2 className="text-3xl font-bold mb-3">
                    Get Free Digital Marketing Consultation
                  </h2>

                  <p className="text-gray-600">
                    Contact our digital marketing experts in Jaipur for
                    SEO services, Google Ads, social media marketing,
                    ecommerce marketing, and online growth solutions.
                  </p>
                </div>

                {/* INPUTS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="John Doe"
                      className="w-full p-4 border rounded-xl outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="john@gmail.com"
                      className="w-full p-4 border rounded-xl outline-none focus:border-[#C5A059]"
                    />
                  </div>

                </div>

                {/* SERVICES */}
                <div>
                  <h3 className="text-xl font-bold mb-4">
                    Select Services
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {services.map((service, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => toggleService(service)}
                        className={`px-5 py-3 rounded-full border transition-all ${selectedServices.includes(service)
                          ? 'bg-[#1A1A1A] text-white'
                          : 'bg-white hover:border-[#C5A059]'
                          }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                {/* MESSAGE */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Project Details
                  </label>

                  <textarea
                    rows="5"
                    name="projectBrief"
                    required
                    placeholder="Tell us about your business goals..."
                    className="w-full p-4 border rounded-xl outline-none resize-none focus:border-[#C5A059]"
                  ></textarea>
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full flex items-center justify-center gap-3 p-5 rounded-xl font-bold text-lg transition-all ${isSubmitted
                    ? 'bg-green-600 text-white'
                    : 'bg-[#C5A059] hover:bg-[#1A1A1A] hover:text-white'
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5" />
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Inquiry Sent Successfully
                    </>
                  ) : (
                    <>
                      Get Free Strategy
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

              </form>

              {/* FAQ SEO SECTION */}
              <section className="mt-16 bg-white p-8 rounded-3xl shadow-md">
                <h2 className="text-3xl font-bold mb-8">
                  Frequently Asked Questions
                </h2>

                <div className="space-y-8">

                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Which is the best digital marketing agency in Jaipur?
                    </h3>

                    <p className="text-gray-600 leading-relaxed">
                      Our agency provides SEO services, Google Ads,
                      social media marketing, ecommerce marketing,
                      and website development solutions for businesses
                      across India.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Do you provide SEO services in India?
                    </h3>

                    <p className="text-gray-600 leading-relaxed">
                      Yes, we provide complete SEO services in India
                      including local SEO, technical SEO, ecommerce SEO,
                      and Google ranking optimization.
                    </p>
                  </div>

                </div>
              </section>

            </motion.section>
          </div>
        </div>
      </main>
    </>
  );
};

export default ContactPage;

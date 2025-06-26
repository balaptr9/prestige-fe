'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heading, Text } from '@/shared/core/typography';
import { Animate } from '@/shared/core/animate';
import { motion } from 'framer-motion';
import { Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    'Tryout SNBT',
    'Tryout Kedinasan',
    'Tryout CPNS',
    'Tryout BUMN'
  ];

  const information = [
    'Kebijakan Privasi',
    'Syarat & Ketentuan',
    'Tentang Prestige Academy',
    'Testimoni'
  ];

  const socialMedia = [
    { name: 'Facebook', icon: Facebook, url: '#' },
    { name: 'Twitter', icon: Twitter, url: '#' },
    { name: 'Instagram', icon: Instagram, url: '#' }
  ];

  return (
    <footer className="relative w-full overflow-hidden">
      {/* Background Assets - Larger for Desktop Experience */}
      <div className="absolute inset-0 w-full h-full">
        {/* Left Asset - Progressive scaling dengan ukuran yang lebih balance */}
        <motion.div
          className="absolute bottom-0 left-0 w-[280px] sm:w-[320px] md:w-[380px] lg:w-[520px] xl:w-[600px] h-full"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Image
            src="/images/backgrounds/footer-asset-left.svg"
            alt=""
            fill
            className="object-contain object-bottom"
            sizes="(min-width: 1280px) 600px, (min-width: 1024px) 520px, (min-width: 768px) 380px, (min-width: 640px) 320px, 280px"
          />
        </motion.div>

        {/* Right Asset - Progressive scaling dengan ukuran yang lebih balance */}
        <motion.div
          className="absolute bottom-0 right-0 w-[280px] sm:w-[320px] md:w-[380px] lg:w-[520px] xl:w-[600px] h-full"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Image
            src="/images/backgrounds/footer-asset-right.svg"
            alt=""
            fill
            className="object-contain object-bottom"
            priority
            sizes="(min-width: 1280px) 600px, (min-width: 1024px) 520px, (min-width: 768px) 380px, (min-width: 640px) 320px, 280px"
          />
        </motion.div>
      </div>

      {/* Content Container dengan padding responsif */}
      <div className="relative z-10 pt-12 sm:pt-14 md:pt-16 lg:pt-20 xl:pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Container dengan max-width yang optimal */}
          <div className="mx-auto w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl">
            <Animate animation="fadeInUp" delay={0.1}>
              <motion.div
                className="bg-primary rounded-t-3xl sm:rounded-t-5xl shadow-xl lg:shadow-2xl overflow-hidden"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.3 }}
              >
                {/* Content dengan padding yang compact namun proporsional */}
                <div className="px-4 py-6 sm:px-5 sm:py-7 md:px-8 md:py-8 lg:px-10 lg:py-10">

                  {/* Layout responsif - Mobile: stacked, MD+: 3 column grid */}
                  <div className="md:grid md:grid-cols-3 md:gap-8 lg:gap-10">

                    {/* Company Info Section */}
                    <Animate animation="fadeInLeft" delay={0.2}>
                      <div className="mb-8 sm:mb-10 md:mb-0 md:col-span-1">
                        {/* Logo and Company Name dengan ukuran responsif */}
                        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6">
                          <Image
                            src="/images/logo/logo-prestige-white.svg"
                            alt="Prestige Academy Logo"
                            width={40}
                            height={40}
                            className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <Heading as="h3" size="md" className="text-white text-sm sm:text-base lg:text-lg">
                              Prestige Academy
                            </Heading>
                            <Text size="sm" className="text-white/80 text-xs sm:text-sm">
                              PT Prestige Artha Abadi
                            </Text>
                          </div>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-2 sm:space-y-3 mb-6">
                          <motion.div
                            className="flex items-center gap-2 sm:gap-3"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
                            <Text size="sm" className="text-white text-xs sm:text-sm break-all">
                              prestige.co@gmail.com
                            </Text>
                          </motion.div>
                          <motion.div
                            className="flex items-center gap-2 sm:gap-3"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
                            <Text size="sm" className="text-white text-xs sm:text-sm">
                              +6281338491615
                            </Text>
                          </motion.div>
                        </div>

                        {/* Social Media */}
                        <div>
                          <Heading as="h4" size="sm" className="text-white mb-3 sm:mb-4 text-sm sm:text-base">
                            Sosial Media
                          </Heading>
                          <div className="flex gap-2 sm:gap-3">
                            {socialMedia.map((social, index) => {
                              const IconComponent = social.icon;
                              return (
                                <Animate
                                  key={social.name}
                                  animation="scaleIn"
                                  delay={0.3 + (index * 0.1)}
                                >
                                  <motion.div
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <Link
                                      href={social.url}
                                      className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-white/20 rounded-lg flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                                    >
                                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </Link>
                                  </motion.div>
                                </Animate>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </Animate>

                    {/* Services & Information - 2 Column di Mobile, separate columns di MD+ */}
                    <div className="md:col-span-2 grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">

                      {/* Services Column */}
                      <Animate animation="fadeInUp" delay={0.3}>
                        <div>
                          <Heading as="h4" size="md" className="text-white mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base lg:text-lg">
                            Layanan
                          </Heading>
                          <ul className="space-y-3 sm:space-y-4">
                            {services.map((service, index) => (
                              <motion.li
                                key={service}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + (index * 0.1) }}
                              >
                                <Link
                                  href="#"
                                  className="text-white hover:text-white/80 transition-colors duration-200 block hover:translate-x-1 transform transition-transform"
                                >
                                  <Text size="sm" className="text-white hover:text-white/80 transition-colors text-xs sm:text-sm leading-relaxed">
                                    {service}
                                  </Text>
                                </Link>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </Animate>

                      {/* Information Column */}
                      <Animate animation="fadeInUp" delay={0.4}>
                        <div>
                          <Heading as="h4" size="md" className="text-white mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base lg:text-lg">
                            Informasi
                          </Heading>
                          <ul className="space-y-3 sm:space-y-4">
                            {information.map((info, index) => (
                              <motion.li
                                key={info}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + (index * 0.1) }}
                              >
                                <Link
                                  href="#"
                                  className="text-white hover:text-white/80 transition-colors duration-200 block hover:translate-x-1 transform transition-transform"
                                >
                                  <Text size="sm" className="text-white hover:text-white/80 transition-colors text-xs sm:text-sm leading-relaxed">
                                    {info}
                                  </Text>
                                </Link>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </Animate>
                    </div>
                  </div>

                  {/* Copyright dengan spacing responsif */}
                  <Animate animation="fadeInUp" delay={0.6}>
                    <motion.div
                      className="border-t border-white/20 mt-8 sm:mt-10 md:mt-8 pt-4 sm:pt-5 md:pt-6 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      <Text size="sm" className="text-white/80 text-xs sm:text-sm">
                        Copyright © {currentYear} Prestige Academy. All rights reserved.
                      </Text>
                    </motion.div>
                  </Animate>
                </div>
              </motion.div>
            </Animate>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
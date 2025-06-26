'use client';

import { Button } from '@/shared/components/ui/button';
import { Heading, Text } from '@/shared/core/typography';
import Link from 'next/link';
import Image from 'next/image';
import { Animate } from '@/shared/core/animate';
import { motion } from 'framer-motion';

export function HeroSection() {
  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-16">
      {/* Background Assets */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute bottom-0 left-0 w-[48vw] h-full hidden lg:block"
          variants={fadeInLeft}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Image
            src="/images/backgrounds/hero-asset-left.svg"
            alt=""
            fill
            className="object-contain object-bottom"
            sizes="42vw"
          />
        </motion.div>

        {/* Right Asset - diperbesar untuk mobile/tablet saja */}
        <motion.div
          className="absolute bottom-0 right-0 w-[75vw] sm:w-[65vw] md:w-[55vw] lg:w-[48vw] h-full"
          variants={fadeInRight}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Image
            src="/images/backgrounds/hero-asset-right.svg"
            alt="CPNS Professional"
            fill
            className="object-contain object-bottom"
            priority
            sizes="(min-width: 1024px) 45vw, (min-width: 768px) 55vw, (min-width: 640px) 65vw, 75vw"
          />
        </motion.div>
      </div>

      {/* Main Content - Layout TETAP SAMA untuk lg+ */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-start min-h-[calc(100vh-4rem)] pt-20 pb-8 lg:pl-32">
          <div className="w-full lg:w-[55%] xl:w-[50%]">

            <Animate animation="fadeInUp" duration={0.8} delay={0.5} className="mb-8">
              <Heading
                as="h1"
                size="display-lg"
                variant="default"
                className="tracking-normal text-center sm:text-center md:text-center lg:text-left space-y-2"
              >
                <span className="block text-foreground font-bold text-3xl sm:text-4xl md:text-5xl">Langkah Awal</span>
                <span className="block text-foreground font-bold text-3xl sm:text-4xl md:text-5xl">Menuju Karir</span>
                <span className="block font-bold text-3xl sm:text-4xl md:text-5xl">
                  Impian{' '}
                  <span className="relative text-primary font-bold text-3xl sm:text-4xl md:text-5xl">
                    CPNS!
                    <div className="absolute bottom-0 left-0 w-full h-1 sm:h-1.5 lg:h-1.5 bg-secondary rounded-full origin-left animate-wipe-in-right animation-delay-1000"></div>
                  </span>
                </span>
              </Heading>
            </Animate>

            <Animate animation="fadeInUp" duration={0.8} delay={0.7} className="mb-6">
              <Text
                size="md"
                variant="muted"
                className="max-w-lg mx-auto sm:mx-auto md:mx-auto lg:mx-0 text-center sm:text-center md:text-center lg:text-left"
              >
                Prestige Academy membuka sayap menuju era cemerlangmu! Seperti Jalak Bali yang istimewa, kami mengubah pengetahuan menjadi pencerahan. Terbang tinggi bersama kami, melestarikan nilai berharga sambil menembus batas potensimu!
              </Text>
            </Animate>

            <Animate animation="fadeInUp" duration={0.8} delay={0.9}>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center sm:justify-center md:justify-center lg:justify-start">
                <Button
                  size="lg"
                  variant="secondary"
                  animation="hover"
                  className="font-semibold shadow-colored-secondary min-w-[200px] w-full sm:w-auto"
                  asChild
                >
                  <Link href="/register">
                    Belajar Sekarang!
                  </Link>
                </Button>

                <Button
                  variant="default"
                  size="lg"
                  animation="hover"
                  className="font-semibold text-white hover:bg-primary min-w-[140px] w-full sm:w-auto"
                  asChild
                >
                  <Link href="/login">
                    Masuk
                  </Link>
                </Button>
              </div>
            </Animate>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
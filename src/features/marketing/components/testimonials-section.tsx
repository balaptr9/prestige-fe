'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Section } from '@/shared/core/section';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Heading, Text } from '@/shared/core/typography';
import { Animate, useAnimationDurations } from '@/shared/core/animate';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils/cn';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  position: string;
  avatar: string;
  content: string;
  rating: number;
}

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ SELARAS - Use animation durations from our system
  const durations = useAnimationDurations();

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Nurul Hidayah',
      position: 'PNS Pemerintah Nganjuk',
      avatar: '/images/avatars/nurul.png',
      content: 'Platform yang paling cocok untuk freshgraduate dengan budget pas-pasan, harganya terjangkau tapi ilmunya sangat mahal.',
      rating: 5,
    },
    {
      id: '2',
      name: 'Jessica Halim',
      position: 'Staff Ahli Pemerintah Guangzhou',
      avatar: '/images/avatars/jessica.png',
      content: 'Fitur analisis hasil di Prestige Academy luar biasa! Saya bisa melihat progress belajar dan tahu di bagian mana yang perlu diperbaiki.',
      rating: 5,
    },
    {
      id: '3',
      name: 'Darrel Simanjuntak',
      position: 'Analis Kebijakan Bukittinggi',
      avatar: '/images/avatars/darrel.png',
      content: 'Setelah 3 kali gagal CPNS, akhirnya dengan Prestige Academy saya berhasil! Simulasi ujiannya sangat realistis dan bank soalnya update.',
      rating: 5,
    },
    {
      id: '4',
      name: 'Sari Dewi',
      position: 'Guru Dinas Pendidikan Surabaya',
      avatar: '/images/avatars/sari.png',
      content: 'Sangat mudah digunakan dan soal-soalnya mirip ujian asli. Berkat Prestige Academy, saya berhasil lolos dengan skor memuaskan.',
      rating: 5,
    },
  ];

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  }, [testimonials.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    // ✅ SELARAS - Use semantic timing for autoplay
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [goToNext]);

  return (
    <Section
      id="testimonials"
      padding="lg"
      container="default"
      animation="slide"
    >
      <div className="space-y-16">
        {/* Header Section dengan spacing konsisten */}
        <Animate animation="fadeInUp" speed="normal" className="text-center space-y-4">
          <Heading as="h2" size="display-md" align="center" className="">
            <span className="text-3xl sm:text-4xl md:text-4xl">
             Apa Kata Mereka Mengenai Prestige Academy?
            </span>
          </Heading>
          <Text
            size="md"
            variant="muted"
            align="center"
            className="max-w-3xl mx-auto"
          >
            Ribuan peserta sudah merasakan manfaat belajar di Prestige Academy dan berhasil mencapai impian mereka.
          </Text>
        </Animate>

        {/* Testimonials Container dengan padding yang cukup */}
        <Animate animation="fadeInUp" speed="normal" delay="fast">
          <div className="relative px-4 sm:px-8 md:px-12">
            {/* Spacer untuk badge position yang keluar */}
            <div className="h-8 mb-4"></div>

            {/* Carousel Container */}
            <div className="relative h-[550px] md:h-[500px] overflow-visible">
              <div className="absolute inset-0 flex items-center justify-center">
                {testimonials.map((testimonial, index) => {
                  const offset = (index - currentIndex + testimonials.length) % testimonials.length;
                  const position = offset - 1; // -1 (left), 0 (center), 1 (right)
                  const isInFrame = offset < 3;

                  return (
                    <motion.div
                      key={testimonial.id}
                      className={cn(
                        "absolute flex flex-col items-center w-full max-w-xs sm:max-w-sm",
                        !isInFrame && "hidden" // Hide cards that are not in the [-1, 0, 1] frame
                      )}
                      initial={false}
                      animate={{
                        x: `${position * 100}%`,
                        scale: position === 0 ? 1.05 : 0.9,
                        opacity: position === 0 ? 1 : 0.4,
                        zIndex: position === 0 ? 20 : 10 - Math.abs(position),
                      }}
                      // ✅ SELARAS - Use semantic spring animation
                      transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 25,
                        duration: durations.normal
                      }}
                    >
                      {/* Image Card */}
                      <Card
                        variant="default"
                        className="relative w-full mb-8 rounded-3xl card-interactive"
                      >
                        {/* Position Badge */}
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                          <Badge
                            variant="default"
                            size="sm"
                            animation="glow"
                            className="text-xs sm:text-sm font-semibold whitespace-nowrap shadow-soft shadow-primary/20"
                          >
                            {testimonial.position}
                          </Badge>
                        </div>

                        <div className="h-[350px]">
                          <div className="w-full h-full mx-auto relative rounded-3xl overflow-hidden">
                            <Image
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              fill
                              className="object-cover object-top"
                              priority={index === currentIndex}
                              sizes="(max-width: 640px) 80vw, 384px"
                            />
                          </div>

                          {/* Name Badge */}
                          <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 z-10">
                            <Badge
                              variant="outline"
                              size="default"
                              className="bg-card text-card-foreground font-bold px-5 py-3 shadow-soft border border-border"
                            >
                              {testimonial.name}
                            </Badge>
                          </div>
                        </div>
                      </Card>

                      {/* Content Card dengan glass effect */}
                      <Card
                        variant="glass"
                        className="w-full max-w-md rounded-2xl p-6 text-center"
                      >
                        {/* Rating Stars */}
                        <div className="flex justify-center mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-4 h-4",
                                i < testimonial.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-muted-foreground/50"
                              )}
                            />
                          ))}
                        </div>

                        {/* Testimonial Quote */}
                        <Text
                          variant="muted"
                          size="sm"
                          className="leading-relaxed italic"
                        >
                          "{testimonial.content}"
                        </Text>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Spacer untuk name badge yang keluar */}
            <div className="h-8 mt-4"></div>

            {/* Navigation Controls */}
            <div className="flex justify-center items-center gap-6 mt-8 relative z-30">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevious}
                className="rounded-full interactive bg-background/90 backdrop-blur-sm border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              {/* Pagination Dots */}
              <div className="flex justify-center gap-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-3 h-3 rounded-full transition-all duration-300 ease-in-out interactive",
                      index === currentIndex
                        ? 'bg-primary scale-125 shadow-soft shadow-primary/50'
                        : 'bg-muted-foreground/30 hover:bg-primary/70 hover:scale-110'
                    )}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                className="rounded-full interactive bg-background/90 backdrop-blur-sm border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Animate>
      </div>
    </Section>
  );
};

export default TestimonialsSection;
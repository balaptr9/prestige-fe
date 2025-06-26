import { Metadata } from 'next'

// Static imports for SSG content
import HeroSection from '@/features/marketing/components/hero-section'
import AboutSection from '@/features/marketing/components/about-section'
import BenefitsSection from '@/features/marketing/components/benefits-section'
import FeaturesSection from '@/features/marketing/components/features-section'
import PackagesSection from '@/features/marketing/components/packages-showcase'
import TestimonialsSection from '@/features/marketing/components/testimonials-section'
import FaqSection from '@/features/marketing/components/faq-section'

export const metadata: Metadata = {
  title: 'Prestige Academy - Platform Tryout CASN Terpercaya #1 di Indonesia',
  description: 'Platform tryout online terpercaya untuk persiapan ujian CASN dengan sistem CAT yang terintegrasi. Raih impian menjadi ASN dengan persiapan terbaik bersama 50K+ peserta aktif.',
  keywords: [
    'tryout CPNS',
    'tryout PPPK',
    'CAT BKN',
    'ujian CASN',
    'simulasi ujian',
    'persiapan CPNS',
    'soal CPNS',
    'platform tryout',
    'belajar online',
    'ASN'
  ],
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <BenefitsSection />
      <FeaturesSection />
      <PackagesSection />
      <TestimonialsSection />
      <FaqSection />
    </>
  )
}
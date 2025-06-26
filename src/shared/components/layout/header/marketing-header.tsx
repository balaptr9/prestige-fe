'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { useTheme } from 'next-themes';
import { cn } from '@/shared/lib/utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollProgress } from '@/shared/hooks/use-scroll-progress';
import { useActiveSection } from '@/shared/hooks/use-active-section';

// ✨ PERUBAHAN: Menambahkan link untuk #benefits dan #testimonials
const navigation = [
  { name: 'Beranda', href: '#home' },
  { name: 'Tentang Kami', href: '#about' },
  { name: 'Manfaat', href: '#benefits' },
  { name: 'Keunggulan', href: '#features' },
  { name: 'Paket Belajar', href: '#packages' },
  { name: 'Testimoni', href: '#testimonials' },
  { name: 'FAQ', href: '#faq' },
];

export function MarketingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { isAtTop } = useScrollProgress();
  const sectionIds = navigation.map(item => item.href.substring(1));
  const activeSectionId = useActiveSection(sectionIds);

  // Ensure component is mounted for proper theme detection
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRegisterClick = () => { window.location.href = '/register'; };
  const handleLoginClick = () => { window.location.href = '/login'; };
  const toggleTheme = () => { setTheme(theme === 'dark' ? 'light' : 'dark'); };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  // Get dynamic theme text
  const getThemeText = () => {
    if (!mounted) return 'Mode Tema';
    return theme === 'dark' ? 'Mode Gelap' : 'Mode Terang';
  };

  return (
    <header
      id="home-header"
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Main Header Bar dengan kondisi scroll styling */}
      <div className={cn(
        "transition-all duration-300 ease-in-out",
        !isAtTop && "bg-background/80 backdrop-blur-md border-b border-border shadow-md"
      )}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-3">
              <Image
                src="/images/logo/logo-prestige.svg"
                alt="Logo"
                width={43}
                height={65}
                className="h-10 w-auto"
                priority
              />
              <div className="text-xl font-bold">
                <span className="text-primary">Prestige</span>
                <span className="text-secondary ml-1">Academy</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => {
                const isActive = `#${activeSectionId}` === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      'relative text-sm font-medium transition-colors hover:text-primary',
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary rounded-full"
                        layoutId="active-nav-link"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="relative w-10 h-6 bg-muted rounded-full p-1 transition-colors hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Toggle theme"
              >
                <div className={cn(
                  'w-4 h-4 bg-background rounded-full shadow-sm transition-transform flex items-center justify-center',
                  theme === 'dark' ? 'translate-x-4' : 'translate-x-0'
                )}>
                  {theme === 'dark' ? (
                    <Moon className="w-2.5 h-2.5 text-muted-foreground" />
                  ) : (
                    <Sun className="w-2.5 h-2.5 text-yellow-500" />
                  )}
                </div>
              </button>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-3">
                {/* Register Button */}
                <Button
                  variant="secondary"
                  size="default"
                  onClick={handleRegisterClick}
                  className="font-semibold shadow-colored-secondary"
                >
                  Daftar
                </Button>

                {/* Login Button */}
                <Button
                  variant="default"
                  size="default"
                  animation="hover"
                  onClick={handleLoginClick}
                  className="relative overflow-hidden group"
                >
                  <div className="flex items-center gap-2">
                    <span>Masuk</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      <path
                        d="M5 12h14m-7-7l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </Button>
              </div>
            </div>

            {/* Mobile menu button dengan animasi */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Toggle mobile menu"
            >
              <div className="relative w-6 h-6">
                {/* Menu Icon dengan animasi */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={false}
                  animate={{
                    scale: mobileMenuOpen ? 0 : 1,
                    rotate: mobileMenuOpen ? -180 : 0,
                    opacity: mobileMenuOpen ? 0 : 1
                  }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>

                {/* Close Icon dengan animasi */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={false}
                  animate={{
                    scale: mobileMenuOpen ? 1 : 0,
                    rotate: mobileMenuOpen ? 0 : 180,
                    opacity: mobileMenuOpen ? 1 : 0
                  }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu terpisah dari kondisi scroll styling */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-border bg-background rounded-b-3xl shadow-lg"
          >
            {/* Navigation Links */}
            <div className="py-4 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = `#${activeSectionId}` === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'block py-3 px-4 text-base font-medium rounded-lg transition-all duration-200',
                      isActive
                        ? 'text-primary bg-primary/10 shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/70'
                    )}
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Actions Container dengan rounded corners */}
            <div className="border-t border-border bg-muted/20 rounded-b-xl">
              <div className="py-4 px-4 space-y-4">
                {/* Theme Toggle Mobile dengan teks responsif */}
                <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border/30">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-muted">
                      {theme === 'dark' ? (
                        <Moon className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Sun className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {getThemeText()}
                    </span>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className="relative w-12 h-6 bg-muted rounded-full p-1 transition-all duration-300 hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                  >
                    <motion.div
                      className={cn(
                        'w-4 h-4 bg-background rounded-full shadow-sm flex items-center justify-center border border-border/20',
                      )}
                      animate={{
                        x: theme === 'dark' ? 24 : 0,
                      }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                      {theme === 'dark' ? (
                        <Moon className="w-2.5 h-2.5 text-muted-foreground" />
                      ) : (
                        <Sun className="w-2.5 h-2.5 text-yellow-500" />
                      )}
                    </motion.div>
                  </button>
                </div>

                {/* Mobile Auth Buttons dengan spacing yang lebih baik */}
                <div className="space-y-3">
                  <Button
                    variant="default"
                    size="lg"
                    className="w-full justify-center rounded-xl"
                    onClick={() => {
                      handleLoginClick();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span>Masuk</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="transition-transform group-hover:translate-x-1"
                      >
                        <path
                          d="M5 12h14m-7-7l7 7-7 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full font-semibold rounded-xl"
                    onClick={() => {
                      handleRegisterClick();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Daftar
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
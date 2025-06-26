'use client';

import { useState, useEffect } from 'react';

export const useActiveSection = (
  sectionIds: string[],
  rootMargin: string = '-30% 0px -70% 0px'
): string => {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin } // Opsi ini membuat section aktif saat berada di sekitar tengah viewport
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Membersihkan observer saat komponen di-unmount
    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sectionIds, rootMargin]);

  return activeSection;
};
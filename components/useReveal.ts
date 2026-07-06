'use client';
import { useEffect } from 'react';

export default function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = Number(el.dataset.delay ?? 0);
            setTimeout(() => el.classList.add('in'), delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    const observe = (el: Element) => {
      if (el.classList.contains('reveal')) {
        observer.observe(el as HTMLElement);
      }
      el.querySelectorAll('.reveal').forEach((child) => observer.observe(child as HTMLElement));
    };

    // Initial scan
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el as HTMLElement));

    // Observe dynamic additions
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) observe(node);
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}

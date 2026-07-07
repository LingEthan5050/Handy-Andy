'use client';
import { useEffect, useState, useRef } from 'react';

interface CountUpProps {
  endValue: number;
  suffix?: string;
  duration?: number;
}

export default function CountUp({ endValue, suffix = '', duration = 2000 }: CountUpProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          startAnimation();
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [endValue, duration]);

  const startAnimation = () => {
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Ease out quad function for smoother end
      const easeOutQuad = (t: number) => t * (2 - t);
      const currentCount = Math.floor(easeOutQuad(progress) * endValue);
      
      setCount(currentCount);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  const formattedCount = count.toLocaleString();

  return (
    <div ref={countRef}>
      {formattedCount}{suffix}
    </div>
  );
}

'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UnauthorizedPage() {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      router.push('/');
    }
  }, [countdown, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-(--cream) p-4">
      <div className="max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-red-100 p-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 text-red-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
        </div>

        <h1 className="serif mb-4 text-3xl font-semibold text-stone-900">
          Access Denied
        </h1>
        
        <p className="mb-8 text-stone-600">
          Access denied. Your account is not authorized to access this page.
        </p>

        <div className="mb-8 text-sm font-medium text-stone-500">
          Returning to the homepage in <span className="text-stone-900 font-bold">{countdown}</span> seconds...
        </div>

        <button
          onClick={() => router.push('/')}
          className="cursor-pointer rounded-xl bg-[#c65b37] px-8 py-3.5 text-white font-semibold transition-colors duration-200 hover:bg-[#b34f2e]"
        >
          Return Home Now
        </button>
      </div>
    </div>
  );
}

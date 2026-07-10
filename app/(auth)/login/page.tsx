'use client'

import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-(--cream) p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border border-stone-200 text-center">
        <div className="mb-8">
          <h1 className="serif text-2xl font-semibold text-stone-900">
            Admin Access
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            Please sign in with your authorized Google account to manage the dashboard.
          </p>
        </div>

        <button
          onClick={() =>
            signIn("google", {
              callbackUrl: "/admin",
            })}
          className="group relative flex w-full items-center justify-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-stone-700 transition-all duration-200 border border-stone-300 hover:bg-stone-50 hover:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200 active:scale-[0.98] cursor-pointer"
        >
          <svg 
            className="h-5 w-5" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" 
              fill="#4285F4"
            />
            <path 
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" 
              fill="#34A853"
            />
            <path 
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" 
              fill="#FBBC05"
            />
            <path 
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" 
              fill="#EA4335"
            />
          </svg>
          Sign in with Google
        </button>

        <div className="mt-8 pt-6 border-t border-stone-100">
          <p className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">
            Authorized Personnel Only
          </p>
        </div>
      </div>
    </div>
  );
}

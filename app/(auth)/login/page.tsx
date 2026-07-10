'use client'
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-(--cream)">
        <div className="text-center">
            <h1 className="serif mb-8 text-stone-900 font-semibold">Admin Access 🔒</h1>

            <button
                onClick={() =>
                    signIn("google", {
                    callbackUrl: "/admin",
                })}
                className="cursor-pointer rounded-xl bg-[#c65b37] px-8 py-3.5 text-white font-semibold transition-colors duration-200 hover:bg-[#b34f2e]"
            >
            Sign in with Google
            </button>
        </div>
    </div>
  );
}
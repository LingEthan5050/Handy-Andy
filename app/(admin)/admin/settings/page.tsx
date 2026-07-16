'use client';

import Image from 'next/image';
import { useAdmin } from '@/app/providers/AdminProvider';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function SettingsPage() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const user = useAdmin();

    useEffect(() => {
        setMounted(true)
    }, [])

    const isSelected = (value: "light" | "dark" | "system") => mounted && theme === value;
    
    const displayRole =
        user.role.charAt(0) + user.role.slice(1).toLowerCase();

    const displayName = user.name ?? displayRole;
    const displayEmail = user.email ?? 'Not Available';

    const initials = displayName
        .split(' ')
        .map((word) => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();


    return (
        <main className="mx-auto w-full max-w-5xl space-y-8 p-4 md:p-8">
            {/* Page Header */}
            <header>
                <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">Account Settings</h1>
            </header>

            {/* Profile Section */}
            <section className="overflow-hidden rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm">
                <div className="border-b border-stone-200 dark:border-stone-800 px-6 py-5">
                    <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">Profile</h2>
                    <p className="mt-1 text-sm text-stone-500 dark:text-stone-500">View your administrator account information.</p>
                </div>

                <div className="space-y-8 p-6">
                    {/* Avatar */}
                    <div className="flex items-center gap-4">
                        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-stone-200 text-xl font-semibold text-stone-600 dark:text-stone-400">
                            {user.image ? (
                                <Image
                                src={user.image}
                                alt={displayName}
                                width={80}
                                height={80}
                                className="h-full w-full object-cover"
                                />
                            ) : (
                                initials
                            )}
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
                                {displayName}
                            </h3>

                            <p className="mt-1 text-sm text-stone-500 dark:text-stone-500">
                                {`${displayRole} Account`}
                            </p>
                        </div>
                    </div>

                    {/* Information */}
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                            <label className="text-xs font-medium uppercase tracking-wide text-stone-500 dark:text-stone-500">
                                Full Name
                            </label>

                            <div className="mt-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 px-4 py-3 text-sm font-medium text-stone-900 dark:text-stone-100">
                                {displayName}
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-medium uppercase tracking-wide text-stone-500 dark:text-stone-500">
                                Email Address
                            </label>

                            <div className="mt-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 px-4 py-3 text-sm font-medium text-stone-900 dark:text-stone-100">
                                {displayEmail}
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-medium uppercase tracking-wide text-stone-500 dark:text-stone-500">
                                Role
                            </label>

                            <div className="mt-2">
                                <span className="inline-flex rounded-full bg-stone-100 dark:bg-stone-800 px-3 py-1 text-sm font-medium text-stone-700">
                                {displayRole}
                                </span>
                            </div>
                        </div>

                        <div>
                        <label className="text-xs font-medium uppercase tracking-wide text-stone-500 dark:text-stone-500">
                            Account Status
                        </label>

                        <div className="mt-2">
                            <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                            Active
                            </span>
                        </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Appearance Section */}
            <section className="overflow-hidden rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm">
                <div className="border-b border-stone-200 dark:border-stone-800 px-6 py-5">
                    <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">Appearance</h2>
                    <p className="mt-1 text-sm text-stone-500 dark:text-stone-500">Customize how the admin dashboard looks.</p>
                </div>

                <div className="p-6">
                    <div className="grid gap-4 sm:grid-cols-3">
                        {/* Light */}
                        <button
                            onClick={() => setTheme("light")}
                            type="button"
                            className={`cursor-pointer group rounded-xl border-2 bg-white dark:bg-stone-900 p-4 text-left transition-all hover:border-stone-400 hover:shadow-sm ${
                                isSelected("light")
                                    ? "border-stone-900 dark:border-stone-100"
                                    : "border-stone-200 dark:border-stone-800"
                            }`}
                        >
                            <div className="mb-4 overflow-hidden rounded-md border border-stone-200 dark:border-stone-800">
                                <div className="h-2 bg-stone-100" />
                                <div className="space-y-2 bg-white p-3">
                                    <div className="h-2 w-3/4 rounded bg-stone-300" />
                                    <div className="h-2 w-1/2 rounded bg-stone-200" />
                                    <div className="mt-4 h-8 rounded bg-stone-100" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-stone-900 dark:text-stone-100">Light</p>
                                    <p className="text-xs text-stone-500 dark:text-stone-500">Bright interface</p>
                                </div>

                                <div
                                    className={`h-4 w-4 rounded-full border-2 transition-colors ${
                                        isSelected("light")
                                            ? "border-stone-900 bg-stone-900 dark:border-stone-100 dark:bg-stone-100"
                                            : "border-stone-300 dark:border-stone-600"
                                    }`}
                                />
                            </div>
                        </button>

                        {/* Dark */}
                        <button
                            onClick={() => setTheme("dark")}
                            type="button"
                            className={`cursor-pointer group rounded-xl border-2 bg-white dark:bg-stone-900 p-4 text-left transition-all hover:border-stone-400 hover:shadow-sm ${
                                isSelected("dark")
                                    ? "border-stone-900 dark:border-stone-100"
                                    : "border-stone-200 dark:border-stone-800"
                            }`}
                        >
                            <div className="mb-4 overflow-hidden rounded-md border border-stone-700">
                                <div className="h-2 bg-stone-800" />
                                <div className="space-y-2 bg-stone-900 p-3">
                                    <div className="h-2 w-3/4 rounded bg-stone-600" />
                                    <div className="h-2 w-1/2 rounded bg-stone-700" />
                                    <div className="mt-4 h-8 rounded bg-stone-800" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-stone-900 dark:text-stone-100">Dark</p>
                                    <p className="text-xs text-stone-500 dark:text-stone-500">Easier on your eyes</p>
                                </div>

                                <div
                                    className={`h-4 w-4 rounded-full border-2 transition-colors ${
                                        isSelected("dark")
                                            ? "border-stone-900 bg-stone-900 dark:border-stone-100 dark:bg-stone-100"
                                            : "border-stone-300 dark:border-stone-600"
                                    }`}
                                />
                            </div>
                        </button>

                        {/* System */}
                        <button
                            onClick={() => setTheme("system")}
                            type="button"
                            className={`cursor-pointer group rounded-xl border-2 bg-white dark:bg-stone-900 p-4 text-left transition-all hover:border-stone-400 hover:shadow-sm ${
                                isSelected("system")
                                    ? "border-stone-900 dark:border-stone-100"
                                    : "border-stone-200 dark:border-stone-800"
                            }`}
                        >
                            <div className="mb-4 overflow-hidden rounded-md border border-stone-200 dark:border-stone-800">
                            <div className="flex h-20">
                                <div className="flex-1 bg-white p-2">
                                    <div className="h-2 w-3/4 rounded bg-stone-300" />
                                </div>

                                <div className="flex-1 bg-stone-900 p-2">
                                    <div className="h-2 w-3/4 rounded bg-stone-600" />
                                </div>
                            </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-stone-900 dark:text-stone-100">System</p>
                                    <p className="text-xs text-stone-500 dark:text-stone-500">Match your device</p>
                                </div>

                                <div
                                    className={`h-4 w-4 rounded-full border-2 transition-colors ${
                                        isSelected("system")
                                            ? "border-stone-900 bg-stone-900 dark:border-stone-100 dark:bg-stone-100"
                                            : "border-stone-300 dark:border-stone-600"
                                    }`}
                                />
                            </div>
                        </button>
                    </div>

                    <p className="mt-5 text-sm text-stone-500 dark:text-stone-500">
                        Theme preferences will automatically apply across the entire admin dashboard.
                    </p>
                </div>
            </section>

            {/* Account Management Section */}
            <section className="overflow-hidden rounded-xl border border-red-200 dark:border-red-900/40 bg-white dark:bg-stone-900 shadow-sm">
                <div className="border-b border-red-200 dark:border-red-900/40 px-6 py-5">
                    <h2 className="text-lg font-semibold text-red-700 dark:text-red-400">
                        Account Management
                    </h2>

                    <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                        Manage permanent account actions. These actions are irreversible.
                    </p>
                </div>

                <div className="p-6">
                    <div className="rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20 p-5">
                        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-red-700 dark:text-red-400">
                                    Delete Account
                                </h3>

                                <p className="max-w-2xl text-sm leading-6 text-stone-600 dark:text-stone-400">
                                    Permanently delete your administrator account and all
                                    associated data. This action cannot be undone. Once your
                                    account has been deleted, you will immediately lose access
                                    to the HandyANDY admin dashboard.
                                </p>
                            </div>

                            <button
                                type="button"
                                disabled
                                className="cursor-not-allowed rounded-lg border border-red-300 dark:border-red-800 bg-white dark:bg-stone-900 px-5 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 opacity-60 transition-colors"
                            >
                                Delete Account
                            </button>
                        </div>

                        <div className="mt-5 rounded-lg border border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/20 px-4 py-3">
                            <p className="text-sm text-amber-800 dark:text-amber-300">
                                <span className="font-semibold">Coming Soon.</span> Account
                                deletion has not been implemented yet. This feature will
                                require confirmation and permanently remove your account
                                from the system.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
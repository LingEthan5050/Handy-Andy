'use client'

import Image from 'next/image';
import { useAdmin } from "@/app/providers/AdminProvider";
import { useState, useRef, useEffect } from "react";
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';

const menuItems = [
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
    disabled: false
  },
];

export default function UserMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const pathname = usePathname()
    const user = useAdmin();

    const displayRole = user.role.charAt(0) + user.role.slice(1).toLowerCase();
    const displayName = user.name ?? displayRole;
    const initials = displayName
        .split(" ")
        .map(word => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    }, []);

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/login' });
    };

    return (
        <div ref={menuRef} className="relative">
            <button 
                onClick={() => setIsOpen(prev => !prev)}
                className="cursor-pointer flex items-center justify-center h-8 w-8 rounded-full bg-stone-200 overflow-hidden"
            >
                {user.image ? (
                <Image
                    src={user.image}
                    alt={displayName}
                    width={36}
                    height={36}
                    className="h-full w-full object-cover"
                />
                ) : (
                initials
                )}
            </button>
            {isOpen && (
                <div className="menu-enter absolute right-0 top-[calc(100%+0.5rem)] z-50 w-64 overflow-hidden rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-lg">
                    {/* User Info */}
                    <div className="border-b border-stone-100 px-4 py-4">
                        <p className="truncate text-sm font-semibold text-stone-900 dark:text-stone-100">
                            {displayName}
                        </p>
                        <p className="truncate text-xs text-stone-500 dark:text-stone-500">
                            {user.email}
                        </p>
                    </div>

                    {/* Menu */}
                    <div className="p-2">
                        <nav>
                            {menuItems.map((item) => {
                                const isActive = pathname === item.href
                                const Icon = item.icon
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        item.disabled 
                                            ? 'text-stone-400 cursor-not-allowed pointer-events-none' 
                                            : isActive 
                                            ? 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100' 
                                            : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 hover:dark:bg-stone-950 hover:text-stone-900 hover:dark:text-stone-100'
                                        }`}
                                    >
                                        <Icon className={`h-4 w-4 ${isActive ? 'text-stone-900 dark:text-stone-100' : 'text-stone-400'}`} />
                                        <span className="flex-1">{item.label}</span>
                                        {item.disabled && <span className="text-[10px] uppercase opacity-50">Soon</span>}
                                    </Link>
                                )
                            })}
                        </nav>

                        <button
                            onClick={handleSignOut}
                            className="cursor-pointer mt-1 flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-stone-600 dark:text-stone-400 transition-colors hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Activity, BarChart2, Home, Info, BookOpen } from 'lucide-react';

const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart2 },
    { name: 'Prediction', href: '/prediction', icon: Activity },
    { name: 'Notebook', href: '/notebook', icon: BookOpen },
    { name: 'About', href: '/about', icon: Info },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
            <nav className="max-w-7xl mx-auto flex items-center justify-between p-4 rounded-2xl glass-panel">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Activity className="w-5 h-5 text-background" />
                    </div>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                        FoodPrice<span className="text-primary">AI</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={clsx(
                                    "relative px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200",
                                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-white/10 rounded-xl"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-2">
                                    <item.icon className="w-4 h-4" />
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </div>

                <Link
                    href="/prediction"
                    className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-background font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                    Try Prediction
                </Link>
            </nav>
        </header>
    );
}

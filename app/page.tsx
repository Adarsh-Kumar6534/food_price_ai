'use client';

import Navbar from '@/components/ui/Navbar';
import GlassCard from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart2, Globe, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="min-h-screen pt-24 pb-12 px-6">
            <Navbar />

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto mt-12 mb-24 text-center relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10"
                />

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
                >
                    Predict Global <br />
                    <span className="text-gradient">Food Prices with AI</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
                >
                    Advanced machine learning models to forecast market trends, analyze food security, and visualize global economic data.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="/dashboard"
                        className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md transition-all flex items-center gap-2 font-medium"
                    >
                        Explore Dashboard
                    </Link>
                    <Link
                        href="/prediction"
                        className="px-8 py-4 rounded-xl bg-primary text-background hover:bg-primary/90 transition-all flex items-center gap-2 font-bold shadow-lg shadow-primary/25"
                    >
                        Try Prediction Tool
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>
            </section>

            {/* Features Grid */}
            <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                <GlassCard className="min-h-[240px] flex flex-col justify-between">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4 text-secondary">
                        <Globe className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">Global Coverage</h3>
                        <p className="text-gray-400">Analyze food prices across multiple countries and regions with real-time data updates.</p>
                    </div>
                </GlassCard>

                <GlassCard className="min-h-[240px] flex flex-col justify-between">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 text-primary">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">AI Forecasting</h3>
                        <p className="text-gray-400">Powered by XGBoost and Neural Networks to provide accurate future price predictions.</p>
                    </div>
                </GlassCard>

                <GlassCard className="min-h-[240px] flex flex-col justify-between">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4 text-accent">
                        <BarChart2 className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">Interactive Analytics</h3>
                        <p className="text-gray-400">Deep dive into market trends with interactive charts, heatmaps, and correlation matrices.</p>
                    </div>
                </GlassCard>
            </section>
        </div>
    );
}

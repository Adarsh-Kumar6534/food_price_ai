'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import GlassCard from '@/components/ui/GlassCard';
import PriceTrendChart from '@/components/charts/PriceTrendChart';
import RegionalChart from '@/components/charts/RegionalChart';
import CorrelationMatrix from '@/components/charts/CorrelationMatrix';

interface DashboardData {
    trends: any;
    regional: any;
    correlation: any;
    summary: {
        globalAvgPrice: number;
        mostVolatileCommodity: string;
        totalDataPoints: number;
    };
}

export default function Dashboard() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/api/analytics');
                const jsonData = await res.json();
                setData(jsonData);
            } catch (error) {
                console.error('Failed to fetch dashboard data', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-cyan-500/30">
            <Navbar />

            <main className="pt-24 px-6 max-w-7xl mx-auto pb-20">
                <header className="mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-2">
                        Global Food Price Analytics
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Real-time insights into food security and market trends.
                    </p>
                </header>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <GlassCard className="p-6 flex flex-col items-center justify-center text-center">
                        <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Global Avg Price</h3>
                        <div className="text-4xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                            {loading ? '...' : `$${data?.summary?.globalAvgPrice?.toFixed(2) || '0.00'}`}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Across all commodities</p>
                    </GlassCard>

                    <GlassCard className="p-6 flex flex-col items-center justify-center text-center">
                        <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Most Volatile</h3>
                        <div className="text-3xl font-bold text-purple-400 drop-shadow-[0_0_10px_rgba(192,132,252,0.5)]">
                            {loading ? '...' : data?.summary?.mostVolatileCommodity || 'N/A'}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Highest price fluctuation</p>
                    </GlassCard>

                    <GlassCard className="p-6 flex flex-col items-center justify-center text-center">
                        <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Data Points</h3>
                        <div className="text-4xl font-bold text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">
                            {loading ? '...' : data?.summary?.totalDataPoints?.toLocaleString() || '0'}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Total records analyzed</p>
                    </GlassCard>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Price Trends */}
                    <GlassCard className="p-6 lg:col-span-2">
                        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <span className="w-2 h-8 bg-cyan-500 rounded-full"></span>
                            Price Trends Over Time
                        </h3>
                        {loading ? <div className="h-[300px] flex items-center justify-center text-gray-500">Loading...</div> : <PriceTrendChart data={data?.trends} />}
                    </GlassCard>

                    {/* Regional Analysis */}
                    <GlassCard className="p-6">
                        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
                            Regional Analysis
                        </h3>
                        {loading ? <div className="h-[300px] flex items-center justify-center text-gray-500">Loading...</div> : <RegionalChart data={data?.regional} />}
                    </GlassCard>

                    {/* Correlation Matrix */}
                    <GlassCard className="p-6">
                        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
                            Commodity Correlation
                        </h3>
                        {loading ? <div className="h-[300px] flex items-center justify-center text-gray-500">Loading...</div> : <CorrelationMatrix data={data?.correlation} />}
                    </GlassCard>

                </div>
            </main>
        </div>
    );
}

'use client';

import Navbar from '@/components/ui/Navbar';
import GlassCard from '@/components/ui/GlassCard';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Prediction() {
    const [activeTab, setActiveTab] = useState<'regression' | 'classification'>('regression');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [options, setOptions] = useState<{ countries: string[], commodities: string[] }>({ countries: [], commodities: [] });

    // Regression Form State
    const [formData, setFormData] = useState({
        country: '',
        commodity: '',
        marketDistance: '',
        seasonalityIndex: ''
    });

    // Classification Form State
    const [classFormData, setClassFormData] = useState({
        vulnerabilityIndex: '',
        transportCostIndex: ''
    });

    // Initial Load: Get Countries
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await fetch('/api/options');
                const data = await res.json();
                setOptions(prev => ({ ...prev, countries: data.countries }));
            } catch (error) {
                console.error('Failed to load countries:', error);
            }
        };
        fetchCountries();
    }, []);

    // Dynamic Load: Get Commodities when Country changes
    useEffect(() => {
        const fetchCommodities = async () => {
            if (!formData.country) {
                setOptions(prev => ({ ...prev, commodities: [] }));
                return;
            }

            try {
                const res = await fetch(`/api/options?country=${encodeURIComponent(formData.country)}`);
                const data = await res.json();
                setOptions(prev => ({ ...prev, commodities: data.commodities }));

                // Reset commodity selection if it's no longer valid
                if (!data.commodities.includes(formData.commodity)) {
                    setFormData(prev => ({ ...prev, commodity: '' }));
                }
            } catch (error) {
                console.error('Failed to load commodities:', error);
            }
        };
        fetchCommodities();
    }, [formData.country]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClassInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClassFormData({ ...classFormData, [e.target.name]: e.target.value });
    };

    const handlePrediction = async () => {
        setLoading(true);
        setResult(null);

        try {
            const response = await fetch('/api/predict/regression', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log('Prediction API Response:', data);
            setResult({ ...data, type: 'regression' });
        } catch (error) {
            console.error('Prediction failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClassification = async () => {
        setLoading(true);
        setResult(null);

        try {
            const response = await fetch('/api/predict/classification', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...classFormData,
                    country: formData.country,
                    commodity: formData.commodity
                }),
            });
            const data = await response.json();
            setResult({ ...data, type: 'classification' });
        } catch (error) {
            console.error('Classification failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-6">
            <Navbar />

            <div className="max-w-4xl mx-auto">
                <header className="mb-10 text-center">
                    <h1 className="text-4xl font-bold mb-2">AI Price Prediction</h1>
                    <p className="text-gray-400">Forecast future prices or classify market risks using our advanced models.</p>
                </header>

                <div className="flex justify-center mb-8">
                    <div className="p-1 bg-white/5 rounded-xl backdrop-blur-md border border-white/10 flex gap-1">
                        <button
                            onClick={() => { setActiveTab('regression'); setResult(null); }}
                            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'regression' ? 'bg-primary text-background shadow-lg' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Price Prediction (Regression)
                        </button>
                        <button
                            onClick={() => { setActiveTab('classification'); setResult(null); }}
                            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'classification' ? 'bg-secondary text-background shadow-lg' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Risk Classification
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <GlassCard className="lg:col-span-2 p-8">
                        {activeTab === 'regression' ? (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                key="regression"
                            >
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <span className="w-2 h-8 bg-primary rounded-full" />
                                    Predict Commodity Price
                                </h2>
                                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Country</label>
                                        <select
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                        >
                                            <option value="">Select Country</option>
                                            {options.countries.map(c => (
                                                <option key={c} value={c} className="text-black">{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Commodity</label>
                                        <select
                                            name="commodity"
                                            value={formData.commodity}
                                            onChange={handleInputChange}
                                            disabled={!formData.country}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <option value="">
                                                {!formData.country ? 'Select Country First' : 'Select Commodity'}
                                            </option>
                                            {options.commodities.map(c => (
                                                <option key={c} value={c} className="text-black">{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Market Distance (km)</label>
                                        <input
                                            type="number"
                                            name="marketDistance"
                                            value={formData.marketDistance}
                                            onChange={handleInputChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                            placeholder="e.g. 12.5"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Seasonality Index</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            name="seasonalityIndex"
                                            value={formData.seasonalityIndex}
                                            onChange={handleInputChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                            placeholder="0.0 - 1.0"
                                        />
                                    </div>

                                    <div className="md:col-span-2 mt-4">
                                        <button
                                            type="button"
                                            onClick={handlePrediction}
                                            disabled={loading}
                                            className="w-full py-4 bg-primary text-background font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {loading ? 'Analyzing Market Data...' : 'Run Prediction'}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                key="classification"
                            >
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <span className="w-2 h-8 bg-secondary rounded-full" />
                                    Classify Price Risk
                                </h2>
                                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Reusing Country/Commodity selection logic */}
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Country</label>
                                        <select
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-secondary/50 transition-colors"
                                        >
                                            <option value="">Select Country</option>
                                            {options.countries.map(c => (
                                                <option key={c} value={c} className="text-black">{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Commodity</label>
                                        <select
                                            name="commodity"
                                            value={formData.commodity}
                                            onChange={handleInputChange}
                                            disabled={!formData.country}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-secondary/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <option value="">
                                                {!formData.country ? 'Select Country First' : 'Select Commodity'}
                                            </option>
                                            {options.commodities.map(c => (
                                                <option key={c} value={c} className="text-black">{c}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Vulnerability Index</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            name="vulnerabilityIndex"
                                            value={classFormData.vulnerabilityIndex}
                                            onChange={handleClassInputChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-secondary/50 transition-colors"
                                            placeholder="0.0 - 1.0"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Transport Cost Index</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            name="transportCostIndex"
                                            value={classFormData.transportCostIndex}
                                            onChange={handleClassInputChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-secondary/50 transition-colors"
                                            placeholder="0.0 - 10.0"
                                        />
                                    </div>

                                    <div className="md:col-span-2 mt-4">
                                        <button
                                            type="button"
                                            onClick={handleClassification}
                                            disabled={loading}
                                            className="w-full py-4 bg-secondary text-background font-bold rounded-xl hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {loading ? 'Analyzing Risk Factors...' : 'Analyze Risk Level'}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </GlassCard>

                    {/* Result Card */}
                    <div className="lg:col-span-1">
                        {result && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <GlassCard className={`h-full border-${result.type === 'regression' ? 'primary' : 'secondary'}/30 bg-${result.type === 'regression' ? 'primary' : 'secondary'}/5`}>
                                    {result.error ? (
                                        <div className="flex flex-col items-center justify-center h-full text-center p-6">
                                            <div className="text-red-400 text-5xl mb-4">⚠️</div>
                                            <h3 className="text-xl font-bold text-white mb-2">Prediction Failed</h3>
                                            <p className="text-gray-400">{result.error}</p>
                                        </div>
                                    ) : (
                                        <>
                                            <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-4">
                                                {result.type === 'regression' ? 'Prediction Result' : 'Risk Assessment'}
                                            </h3>

                                            <div className="mb-6">
                                                {result.type === 'regression' ? (
                                                    <>
                                                        <span className="text-5xl font-bold text-white">${result.predicted_price}</span>
                                                        <span className="text-gray-400 ml-2">/ kg</span>
                                                    </>
                                                ) : (
                                                    <span className={`text-5xl font-bold text-${result.color_code === 'red' ? 'red-500' : result.color_code === 'orange' ? 'orange-400' : 'green-400'}`}>
                                                        {result.risk_level}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="space-y-4 mb-6">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-400">{result.type === 'regression' ? 'Confidence' : 'Probability'}</span>
                                                    <span className="text-green-400 font-bold">
                                                        {(result.type === 'regression' ? (result.confidence || 0) * 100 : (result.probability || 0) * 100).toFixed(1)}%
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-sm items-center">
                                                    <span className="text-gray-400">Model</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-white">{result.model_used}</span>
                                                        <div className="group relative">
                                                            <div className="w-4 h-4 rounded-full border border-gray-500 flex items-center justify-center text-[10px] text-gray-400 cursor-help hover:border-white hover:text-white transition-colors">?</div>
                                                            <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-black/90 border border-white/10 rounded-lg text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl backdrop-blur-sm">
                                                                {result.type === 'regression'
                                                                    ? "Combines historical baselines with seasonality and transport adjustments."
                                                                    : "Classifies risk based on historical price distributions (33rd/66th percentiles)."
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                                                <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Key Drivers</h4>
                                                <div className="space-y-1 text-xs text-gray-300">
                                                    {result.type === 'regression' ? (
                                                        <>
                                                            <div className="flex justify-between">
                                                                <span>Base Price</span>
                                                                <span>${result.factors?.base_price}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span>Transport</span>
                                                                <span>{result.factors?.transport_impact}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span>Seasonality</span>
                                                                <span>{result.factors?.seasonality_impact}</span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="flex justify-between">
                                                                <span>Vulnerability</span>
                                                                <span>{result.factors.vulnerability_impact}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span>Transport</span>
                                                                <span>{result.factors.transport_impact}</span>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </GlassCard>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

'use client';

import Navbar from '@/components/ui/Navbar';
import GlassCard from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';

export default function About() {
    return (
        <div className="min-h-screen pt-24 pb-12 px-6">
            <Navbar />

            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">About The Project</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Leveraging advanced machine learning to understand and predict global food price fluctuations.
                    </p>
                </motion.div>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold mb-6 text-primary">The Mission</h2>
                        <GlassCard>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                Food security is one of the most pressing challenges of our time. This project aims to democratize access to food price data and predictive analytics. By analyzing historical trends, market distance, seasonality, and economic indicators, our AI models provide actionable insights for researchers, policy-makers, and the general public.
                            </p>
                        </GlassCard>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6 text-secondary">How It Works</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <GlassCard className="text-center">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">📊</div>
                                <h3 className="font-bold mb-2">Data Collection</h3>
                                <p className="text-sm text-gray-400">Aggregating vast datasets from global markets and economic reports.</p>
                            </GlassCard>
                            <GlassCard className="text-center">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🤖</div>
                                <h3 className="font-bold mb-2">ML Processing</h3>
                                <p className="text-sm text-gray-400">Training XGBoost and Neural Networks to identify complex patterns.</p>
                            </GlassCard>
                            <GlassCard className="text-center">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">📈</div>
                                <h3 className="font-bold mb-2">Predictive Output</h3>
                                <p className="text-sm text-gray-400">Delivering accurate price forecasts and risk assessments.</p>
                            </GlassCard>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6 text-secondary">Model Methodology</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <GlassCard>
                                <h3 className="text-xl font-bold mb-3 text-white flex items-center gap-2">
                                    <span className="text-2xl">📈</span> Hybrid Regression
                                </h3>
                                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                    Used for predicting specific price values. This model combines <strong>historical baselines</strong> with dynamic adjustments.
                                </p>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li className="flex items-start gap-2">
                                        <span className="text-secondary mt-1">•</span>
                                        <span><strong>Baseline:</strong> Calculates the historical average price for the specific country and commodity.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-secondary mt-1">•</span>
                                        <span><strong>Seasonality:</strong> Adjusts based on the month of the year using historical seasonal indices.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-secondary mt-1">•</span>
                                        <span><strong>Transport Cost:</strong> Factors in the distance to markets and current transport cost indices.</span>
                                    </li>
                                </ul>
                            </GlassCard>

                            <GlassCard>
                                <h3 className="text-xl font-bold mb-3 text-white flex items-center gap-2">
                                    <span className="text-2xl">📊</span> Statistical Quantile Classification
                                </h3>
                                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                    Used for assessing risk levels (Low, Medium, High). It places predicted prices within the context of historical distributions.
                                </p>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li className="flex items-start gap-2">
                                        <span className="text-secondary mt-1">•</span>
                                        <span><strong>Low Risk:</strong> Price falls within the bottom 33% of historical data.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-secondary mt-1">•</span>
                                        <span><strong>Medium Risk:</strong> Price falls between the 33rd and 66th percentiles.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-secondary mt-1">•</span>
                                        <span><strong>High Risk:</strong> Price exceeds the 66th percentile, indicating potential crisis levels.</span>
                                    </li>
                                </ul>
                            </GlassCard>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6 text-accent">Tech Stack</h2>
                        <GlassCard>
                            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {['Next.js', 'Tailwind CSS', 'Framer Motion', 'Python', 'XGBoost', 'FastAPI', 'Plotly', 'Pandas'].map((tech) => (
                                    <li key={tech} className="flex items-center gap-2 text-gray-300">
                                        <span className="w-2 h-2 bg-accent rounded-full" />
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                        </GlassCard>
                    </section>
                </div>
            </div>
        </div>
    );
}

'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface RegionalChartProps {
    data: {
        labels: string[];
        datasets: any[];
    } | null;
}

const RegionalChart: React.FC<RegionalChartProps> = ({ data }) => {
    const chartData = data || {
        labels: [],
        datasets: [],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                titleColor: '#f8fafc',
                bodyColor: '#e2e8f0',
                borderColor: 'rgba(148, 163, 184, 0.1)',
                borderWidth: 1,
                callbacks: {
                    label: function (context: any) {
                        return `Volatility Index: ${Number(context.raw).toFixed(2)}`;
                    }
                }
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#94a3b8',
                },
            },
            y: {
                grid: {
                    color: 'rgba(148, 163, 184, 0.1)',
                },
                ticks: {
                    color: '#94a3b8',
                },
                title: {
                    display: true,
                    text: 'Normalized Volatility (0-1)',
                    color: '#64748b'
                }
            },
        },
    };

    return (
        <div className="h-[300px] w-full">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default RegionalChart;

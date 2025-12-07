'use client';

import React from 'react';
import { Bubble } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

interface CorrelationMatrixProps {
    data: any[];
}

const CorrelationMatrix: React.FC<CorrelationMatrixProps> = ({ data }) => {
    const chartData = {
        datasets: data || [],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right' as const,
                labels: {
                    color: '#94a3b8',
                    font: {
                        size: 10
                    }
                },
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                titleColor: '#f8fafc',
                bodyColor: '#e2e8f0',
                borderColor: 'rgba(148, 163, 184, 0.1)',
                borderWidth: 1,
                callbacks: {
                    label: function (context: any) {
                        const raw = context.raw;
                        return [
                            `${context.dataset.label}`,
                            `Transport Cost: ${raw.x.toFixed(2)}`,
                            `Avg Price: $${raw.y.toFixed(2)}`,
                            `Samples: ${raw.r * 10}`
                        ];
                    }
                }
            },
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(148, 163, 184, 0.1)',
                },
                ticks: {
                    color: '#94a3b8',
                },
                title: {
                    display: true,
                    text: 'Transport Cost Index',
                    color: '#64748b',
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
                    text: 'Average Price (USD)',
                    color: '#64748b',
                },
            },
        },
    };

    return (
        <div className="h-[300px] w-full">
            <Bubble data={chartData} options={options} />
        </div>
    );
};

export default CorrelationMatrix;

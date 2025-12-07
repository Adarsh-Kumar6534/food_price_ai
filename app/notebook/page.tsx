'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import NotebookRenderer from '@/components/notebook/NotebookRenderer';
import { JupyterNotebook } from '@/types/notebook';
import { Loader2, AlertCircle } from 'lucide-react';

export default function NotebookPage() {
    const [notebook, setNotebook] = useState<JupyterNotebook | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNotebook = async () => {
            try {
                const response = await fetch('/api/notebook');
                if (!response.ok) throw new Error('Failed to load notebook');
                const data = await response.json();
                setNotebook(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchNotebook();
    }, []);

    return (
        <div className="min-h-screen bg-background text-white overflow-hidden flex flex-col">
            <Navbar />

            <main className="flex-1 pt-24 px-6 pb-6 h-screen flex flex-col">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-3">
                            <span className="text-4xl">📘</span>
                            Notebook Viewer
                        </h1>
                        <p className="text-gray-400 mt-1">
                            Analysis of Global Food Prices using Neural Networks
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <Loader2 className="animate-spin text-secondary" size={48} />
                    </div>
                ) : error ? (
                    <div className="flex-1 flex items-center justify-center text-red-400 gap-2">
                        <AlertCircle />
                        <span>{error}</span>
                    </div>
                ) : notebook ? (
                    <NotebookRenderer notebook={notebook} />
                ) : null}
            </main>
        </div>
    );
}

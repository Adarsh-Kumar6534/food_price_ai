import React, { useState, useEffect, useMemo } from 'react';
import { JupyterNotebook, NotebookCell } from '@/types/notebook';
import { CodeCell, MarkdownCell } from './CellComponents';
import { Search, Menu, X, Download, FileJson, FileCode, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NotebookRendererProps {
    notebook: JupyterNotebook;
}

export default function NotebookRenderer({ notebook }: NotebookRendererProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeSection, setActiveSection] = useState<string>('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Extract TOC from markdown cells
    const toc = useMemo(() => {
        const headers: { id: string; title: string; level: number; index: number }[] = [];
        notebook.cells.forEach((cell, index) => {
            if (cell.cell_type === 'markdown') {
                const source = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
                const lines = source.split('\n');
                lines.forEach(line => {
                    const match = line.match(/^(#{1,3})\s+(.+)$/);
                    if (match) {
                        const level = match[1].length;
                        const title = match[2].trim();
                        const id = `section-${index}-${title.replace(/\s+/g, '-').toLowerCase()}`;
                        headers.push({ id, title, level, index });
                    }
                });
            }
        });
        return headers;
    }, [notebook]);

    // Filter cells based on search
    const filteredCells = useMemo(() => {
        if (!searchTerm) return notebook.cells.map((cell, i) => ({ cell, index: i }));

        return notebook.cells.map((cell, index) => ({ cell, index })).filter(({ cell }) => {
            const source = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
            return source.toLowerCase().includes(searchTerm.toLowerCase());
        });
    }, [notebook, searchTerm]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
        }
    };

    const downloadNotebook = () => {
        const blob = new Blob([JSON.stringify(notebook, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'notebook.ipynb';
        a.click();
    };

    return (
        <div className="flex h-[calc(100vh-100px)] gap-6">
            {/* Sidebar TOC */}
            <AnimatePresence mode="wait">
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: -20, width: 0 }}
                        animate={{ opacity: 1, x: 0, width: '300px' }}
                        exit={{ opacity: 0, x: -20, width: 0 }}
                        className="flex-shrink-0 bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col backdrop-blur-md"
                    >
                        <div className="p-4 border-b border-white/10">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <Menu size={20} /> Contents
                            </h3>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search code..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-secondary/50 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
                            {toc.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${activeSection === item.id
                                            ? 'bg-secondary/20 text-secondary border-l-2 border-secondary'
                                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                        }`}
                                    style={{ paddingLeft: `${item.level * 12}px` }}
                                >
                                    {item.title}
                                </button>
                            ))}
                        </div>

                        <div className="p-4 border-t border-white/10 bg-black/20">
                            <button
                                onClick={downloadNotebook}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors"
                            >
                                <Download size={16} /> Download .ipynb
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md overflow-hidden relative">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="absolute top-4 left-4 z-10 p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors"
                >
                    {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>

                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar scroll-smooth">
                    <div className="max-w-4xl mx-auto">
                        {filteredCells.map(({ cell, index }) => (
                            <div key={index} id={`cell-${index}`}>
                                {cell.cell_type === 'code' ? (
                                    <CodeCell cell={cell} index={index} />
                                ) : (
                                    <div id={toc.find(t => t.index === index)?.id}>
                                        <MarkdownCell cell={cell} index={index} />
                                    </div>
                                )}
                            </div>
                        ))}

                        {filteredCells.length === 0 && (
                            <div className="text-center py-20 text-gray-500">
                                <Search size={48} className="mx-auto mb-4 opacity-50" />
                                <p>No cells found matching "{searchTerm}"</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

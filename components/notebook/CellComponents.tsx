import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { NotebookCell, NotebookOutput } from '@/types/notebook';
import { Copy, Check, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CellProps {
    cell: NotebookCell;
    index: number;
}

export const CodeCell: React.FC<CellProps> = ({ cell, index }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [copied, setCopied] = useState(false);

    const source = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
    const outputs = cell.outputs || [];

    const handleCopy = () => {
        navigator.clipboard.writeText(source);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="mb-6 group">
            <div className="flex items-center gap-2 mb-2 text-xs text-gray-500 font-mono">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="hover:text-white transition-colors"
                >
                    {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                </button>
                <span>In [{cell.execution_count || ' '}]:</span>
            </div>

            {!isCollapsed && (
                <div className="relative rounded-lg overflow-hidden border border-white/10 bg-[#1e1e1e]">
                    <button
                        onClick={handleCopy}
                        className="absolute top-2 right-2 p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10"
                        title="Copy code"
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>

                    <SyntaxHighlighter
                        language="python"
                        style={vscDarkPlus}
                        customStyle={{ margin: 0, padding: '1.5rem', fontSize: '0.9rem' }}
                        showLineNumbers={true}
                    >
                        {source}
                    </SyntaxHighlighter>
                </div>
            )}

            {!isCollapsed && outputs.length > 0 && (
                <div className="mt-2 pl-2 border-l-2 border-white/5">
                    {outputs.map((output, i) => (
                        <OutputCell key={i} output={output} />
                    ))}
                </div>
            )}
        </div>
    );
};

export const MarkdownCell: React.FC<CellProps> = ({ cell }) => {
    const source = Array.isArray(cell.source) ? cell.source.join('') : cell.source;

    return (
        <div className="mb-6 prose prose-invert max-w-none px-4 py-2">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-primary" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-6 mb-3 text-secondary" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-4 mb-2 text-accent" {...props} />,
                    a: ({ node, ...props }) => <a className="text-blue-400 hover:underline" {...props} />,
                    table: ({ node, ...props }) => <div className="overflow-x-auto my-4"><table className="min-w-full divide-y divide-gray-700" {...props} /></div>,
                    th: ({ node, ...props }) => <th className="px-3 py-2 bg-white/5 text-left text-xs font-medium text-gray-300 uppercase tracking-wider" {...props} />,
                    td: ({ node, ...props }) => <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-300 border-b border-gray-700" {...props} />,
                }}
            >
                {source}
            </ReactMarkdown>
        </div>
    );
};

const OutputCell: React.FC<{ output: NotebookOutput }> = ({ output }) => {
    if (output.output_type === 'stream') {
        const text = Array.isArray(output.text) ? output.text.join('') : output.text;
        return (
            <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap p-2 overflow-x-auto">
                {text}
            </pre>
        );
    }

    if (output.output_type === 'execute_result' || output.output_type === 'display_data') {
        const data = output.data;
        if (!data) return null;

        if (data['image/png']) {
            return (
                <div className="my-4 overflow-x-auto">
                    <img
                        src={`data:image/png;base64,${data['image/png']}`}
                        alt="Output"
                        className="max-w-full h-auto rounded bg-white p-2"
                    />
                </div>
            );
        }

        if (data['text/html']) {
            const html = Array.isArray(data['text/html']) ? data['text/html'].join('') : data['text/html'];
            return (
                <div
                    className="my-4 overflow-x-auto bg-white/5 p-4 rounded text-gray-200"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            );
        }

        if (data['text/plain']) {
            const text = Array.isArray(data['text/plain']) ? data['text/plain'].join('') : data['text/plain'];
            return (
                <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap p-2 overflow-x-auto">
                    {text}
                </pre>
            );
        }
    }

    if (output.output_type === 'error') {
        return (
            <div className="my-2 p-4 bg-red-900/20 border border-red-500/50 rounded text-red-200 font-mono text-sm whitespace-pre-wrap">
                <div className="font-bold">{output.ename}: {output.evalue}</div>
                {output.traceback && (
                    <div className="mt-2 opacity-80">
                        {output.traceback.join('\n')}
                    </div>
                )}
            </div>
        );
    }

    return null;
};

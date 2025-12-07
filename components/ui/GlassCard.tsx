import { motion } from 'framer-motion';
import clsx from 'clsx';
import { ReactNode } from 'react';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export default function GlassCard({ children, className, hoverEffect = true }: GlassCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={clsx(
                "glass-card p-6 relative overflow-hidden group",
                hoverEffect && "hover:shadow-primary/20 hover:border-primary/30",
                className
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}

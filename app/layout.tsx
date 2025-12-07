import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import clsx from 'clsx'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    variable: '--font-poppins'
})

export const metadata: Metadata = {
    title: 'Global Food Price Prediction Dashboard',
    description: 'AI-Powered Insights for Global Food Security',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={clsx(inter.variable, poppins.variable, "bg-background text-white min-h-screen selection:bg-primary/30")}>
                <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none opacity-20" />
                <div className="fixed inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 pointer-events-none" />

                <main className="relative z-10 flex flex-col min-h-screen">
                    {children}
                </main>
            </body>
        </html>
    )
}

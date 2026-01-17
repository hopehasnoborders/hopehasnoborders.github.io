'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, Scale, Users, ArrowRight, Sparkles } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

interface Program {
    _id: string
    icon: string
    title: { en: string; es: string }
    summary: { en: string; es: string }
    description: { en: string; es: string }
}

interface ProgramsGridProps {
    header: {
        eyebrow: { en: string; es: string }
        title: { en: string; es: string }
        subtitle: { en: string; es: string }
    }
    programs: Program[]
}

// Map program IDs to Resources page anchors
const RESOURCE_LINKS: Record<string, string> = {
    'housing': '/resources#housing',
    'legal': '/resources#legal',
    'community': '/resources#community',
    // Fallback based on icon
    'home': '/resources#housing',
    'scale': '/resources#legal',
    'users': '/resources#community',
}

const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
    switch (name) {
        case 'home': return <Home strokeWidth={1.5} className={className} />
        case 'scale': return <Scale strokeWidth={1.5} className={className} />
        case 'users': return <Users strokeWidth={1.5} className={className} />
        default: return <Home strokeWidth={1.5} className={className} />
    }
}

export function ProgramsGrid({ header, programs }: ProgramsGridProps) {
    const { t, lang } = useLanguage()

    // Get the link for a program
    const getLink = (program: Program) => {
        return RESOURCE_LINKS[program._id] || RESOURCE_LINKS[program.icon] || '/resources'
    }

    return (
        <section className="py-20 md:py-32 bg-[var(--forrest)] relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--yarrow)] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--sky)] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header - Urgent messaging */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 bg-[var(--yarrow)] text-black px-4 py-2 rounded-full mb-6">
                            <Sparkles className="w-4 h-4" />
                            <span className="font-bold tracking-wide text-xs uppercase">
                                {t(header.eyebrow)}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-white mb-6">
                            {t(header.title)}
                        </h2>
                        <p className="text-[var(--bone)]/80 text-lg md:text-xl font-light max-w-2xl mx-auto">
                            {lang === 'es'
                                ? 'Haga clic en cualquier servicio a continuación para acceder a recursos inmediatos.'
                                : 'Click any service below to access immediate resources.'
                            }
                        </p>
                    </motion.div>
                </div>

                {/* Service Cards - Action-oriented CTAs */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {programs.map((program, i) => (
                        <motion.div
                            key={program._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link
                                href={getLink(program)}
                                className="block group"
                            >
                                <div className="bg-[var(--bone)] border-4 border-transparent hover:border-[var(--yarrow)] rounded-2xl p-8 md:p-10 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-2 active:translate-y-0 active:shadow-lg min-h-[320px] flex flex-col">
                                    {/* Icon */}
                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-[var(--forrest)] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[var(--yarrow)] transition-colors duration-300">
                                        <DynamicIcon
                                            name={program.icon}
                                            className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:text-black transition-colors duration-300"
                                        />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-2xl md:text-3xl font-serif mb-3 text-[var(--forrest)] group-hover:text-black transition-colors duration-300">
                                        {t(program.title)}
                                    </h3>
                                    <p className="text-neutral-600 font-light text-sm md:text-base leading-relaxed flex-grow">
                                        {t(program.summary)}
                                    </p>

                                    {/* CTA Button - Large & Obvious */}
                                    <div className="mt-6 pt-6 border-t border-neutral-200">
                                        <div className="bg-[var(--forrest)] group-hover:bg-[var(--yarrow)] text-white group-hover:text-black px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-xs md:text-sm flex items-center justify-center gap-3 transition-all duration-300 shadow-md group-hover:shadow-lg">
                                            <span>
                                                {lang === 'es' ? 'Ver Recursos' : 'View Resources'}
                                            </span>
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Urgent Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <Link
                        href="/resources"
                        className="inline-flex items-center gap-3 bg-[var(--yarrow)] text-black px-8 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        <span>{lang === 'es' ? 'Ver Todos los Recursos' : 'View All Resources'}</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}

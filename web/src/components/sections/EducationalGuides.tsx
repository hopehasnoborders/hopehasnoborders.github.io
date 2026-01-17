'use client'

import { motion } from 'framer-motion'
import { BookOpen, Clock, ExternalLink, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import Link from 'next/link'

interface Guide {
    title: { en: string; es: string }
    link?: string
    comingSoon?: boolean
}

const AVAILABLE_GUIDES: Guide[] = [
    {
        title: {
            en: 'Understanding Rental Agreements (and avoiding scams)',
            es: 'Entendiendo los Contratos de Alquiler (y evitando estafas)'
        },
        link: '#rental-agreements'
    },
    {
        title: {
            en: 'Domestic Violence (understanding definition and ways to get help)',
            es: 'Violencia Doméstica (comprender la definición y formas de obtener ayuda)'
        },
        link: '#domestic-violence'
    },
    {
        title: {
            en: 'English Learner (EL) Family Toolkit for Students',
            es: 'Kit de Herramientas para Familias de Estudiantes Aprendices de Inglés (EL)'
        },
        link: '#el-toolkit'
    },
    {
        title: {
            en: 'Wage Theft',
            es: 'Robo de Salarios'
        },
        link: '#wage-theft'
    }
]

const COMING_SOON_GUIDES: Guide[] = [
    {
        title: {
            en: 'Child Safety (car seats, legal supervision requirements, neglect and abuse)',
            es: 'Seguridad Infantil (asientos de carro, requisitos legales de supervisión, negligencia y abuso)'
        },
        comingSoon: true
    },
    {
        title: {
            en: 'Work Norms (timeliness, attire, communication, cultural norms, resume, interviews)',
            es: 'Normas Laborales (puntualidad, vestimenta, comunicación, normas culturales, currículum, entrevistas)'
        },
        comingSoon: true
    },
    {
        title: {
            en: 'Bank Accounts (Majority, My Bambu, 1st Bank, account and routing numbers)',
            es: 'Cuentas Bancarias (Majority, My Bambu, 1st Bank, números de cuenta y de ruta)'
        },
        comingSoon: true
    },
    {
        title: {
            en: 'Driving (understanding licenses, registration, insurance, cost, risks, laws)',
            es: 'Conducir (entender licencias, registro, seguro, costos, riesgos, leyes)'
        },
        comingSoon: true
    }
]

export function EducationalGuides() {
    const { t, lang } = useLanguage()

    return (
        <section className="py-20 md:py-32 bg-[var(--bone)]">
            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 max-w-3xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 bg-[var(--forrest)] text-white px-4 py-2 rounded-full mb-6">
                        <BookOpen className="w-4 h-4" />
                        <span className="font-bold tracking-wide text-xs uppercase">
                            {lang === 'es' ? 'Guías Educativas' : 'Educational Guides'}
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif leading-tight text-[var(--forrest)] mb-6">
                        {lang === 'es'
                            ? 'Recursos para Ayudarte a Navegar la Vida en EE.UU.'
                            : 'Resources to Help You Navigate Life in the U.S.'
                        }
                    </h2>
                    <p className="text-neutral-600 text-lg font-light">
                        {lang === 'es'
                            ? 'Guías prácticas sobre temas importantes para inmigrantes y solicitantes de asilo.'
                            : 'Practical guides on important topics for immigrants and asylum seekers.'
                        }
                    </p>
                </motion.div>

                {/* Available Guides Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {AVAILABLE_GUIDES.map((guide, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link
                                href={guide.link || '#'}
                                className="block group"
                            >
                                <div className="bg-white border-2 border-[var(--forrest)]/10 hover:border-[var(--yarrow)] rounded-xl p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex items-start gap-4">
                                    <div className="w-12 h-12 bg-[var(--yarrow)] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <BookOpen className="w-6 h-6 text-black" />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-lg md:text-xl font-serif text-[var(--forrest)] group-hover:text-black transition-colors mb-2 leading-snug">
                                            {t(guide.title)}
                                        </h3>
                                        <div className="flex items-center gap-2 text-[var(--yarrow)] font-bold text-xs uppercase tracking-widest">
                                            <span>{lang === 'es' ? 'Leer Guía' : 'Read Guide'}</span>
                                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Coming Soon Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-[var(--forrest)] rounded-2xl p-8 md:p-12"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <Clock className="w-6 h-6 text-[var(--yarrow)]" />
                        <h3 className="text-2xl font-serif text-white">
                            {lang === 'es' ? 'Próximamente' : 'Coming Soon'}
                        </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {COMING_SOON_GUIDES.map((guide, i) => (
                            <div
                                key={i}
                                className="bg-white/10 border border-white/20 rounded-lg p-5 flex items-start gap-3"
                            >
                                <div className="w-8 h-8 bg-white/20 rounded-md flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-4 h-4 text-[var(--yarrow)]" />
                                </div>
                                <p className="text-white/90 text-sm md:text-base font-light leading-snug">
                                    {t(guide.title)}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

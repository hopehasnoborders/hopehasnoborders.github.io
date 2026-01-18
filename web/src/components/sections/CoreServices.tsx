'use client'

import { motion } from 'framer-motion'
import { FileText, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

const SERVICES = [
    {
        id: 'ead',
        title: { en: 'Work Permit Help (EAD)', es: 'Permiso de Trabajo (EAD)' },
        description: {
            en: 'Assistance with Employment Authorization Document applications.',
            es: 'Asistencia con solicitudes de Documento de Autorización de Empleo.'
        },
        link: 'https://forms.gle/e9WAUpuS9num9uoF8',
        urgent: true
    },
    {
        id: 'court',
        title: { en: 'Court Letters & Fees', es: 'Cartas Judiciales y Tarifas' },
        description: {
            en: 'Support with court letters and asylum fee payments.',
            es: 'Apoyo con cartas para la corte y pagos de tarifas de asilo.'
        },
        link: 'https://forms.gle/kmb5kHgfFxyyLprz6',
        urgent: true
    },
    {
        id: 'asylum',
        title: { en: 'Pro Se Asylum Support', es: 'Apoyo de Asilo Pro Se' },
        description: {
            en: 'Guidance for filling out asylum applications on your own.',
            es: 'Guía para completar solicitudes de asilo por cuenta propia.'
        },
        link: 'https://forms.gle/3Y4gFuCpWBEsteAu6',
        urgent: false
    },
    {
        id: 'family',
        title: { en: 'Family Protection Plan', es: 'Plan de Protección Familiar' },
        description: {
            en: 'Planning and support for family safety and stability.',
            es: 'Planificación y apoyo para la seguridad y estabilidad familiar.'
        },
        link: 'https://forms.gle/67VwXwszkd8pJ9qh9',
        urgent: false
    }
]

export function CoreServices() {
    const { t, lang } = useLanguage()

    return (
        <section className="py-16 md:py-24 bg-neutral-50 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-serif text-[var(--forrest)] mb-6">
                            {lang === 'es' ? 'Programas Principales' : 'Our Core Programs'}
                        </h2>
                        <p className="text-lg text-neutral-600">
                            {lang === 'es'
                                ? 'Acceda directamente a nuestros servicios más solicitados completando los formularios a continuación.'
                                : 'Access our most requested services directly by filling out the intake forms below.'}
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {SERVICES.map((service, i) => (
                        <motion.a
                            key={service.id}
                            href={service.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group block bg-white border border-neutral-200 hover:border-[var(--yarrow)] rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative"
                        >
                            {/* Urgent Badge */}
                            {service.urgent && (
                                <span className="absolute top-6 right-6 inline-flex items-center gap-1 bg-red-100 text-red-800 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full">
                                    {lang === 'es' ? 'Prioridad' : 'Priority'}
                                </span>
                            )}

                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 bg-[var(--bone)] rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[var(--yarrow)] transition-colors duration-300">
                                    <FileText className="w-6 h-6 text-[var(--forrest)] group-hover:text-black transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[var(--forrest)] mb-2 group-hover:text-black transition-colors">
                                        {t(service.title)}
                                    </h3>
                                    <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
                                        {t(service.description)}
                                    </p>
                                    <div className="inline-flex items-center gap-2 text-[var(--forrest)] font-bold text-sm uppercase tracking-wider group-hover:underline">
                                        <span>{lang === 'es' ? 'Completar Formulario' : 'Apply Now'}</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    )
}

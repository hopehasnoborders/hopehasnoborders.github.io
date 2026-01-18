'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Globe } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '@/lib/LanguageContext'

const NAV_LINKS = [
    { label: { en: 'About', es: 'Sobre' }, href: '/about' },
    { label: { en: 'Team', es: 'Equipo' }, href: '/team' },
    { label: { en: 'Programs', es: 'Programas' }, href: '/programs' },
    { label: { en: 'Resources', es: 'Recursos' }, href: '/resources' },
    { label: { en: 'Shop', es: 'Tienda' }, href: '/shop' },
    { label: { en: 'Volunteer', es: 'Voluntariado' }, href: '/volunteer' },
]

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const { lang, setLang, t } = useLanguage()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const textColor = scrolled || isOpen ? 'text-neutral-900' : 'text-white'
    const bgColor = scrolled || isOpen ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
    const topClass = scrolled ? 'top-0' : 'top-10'

    return (
        <nav className={`fixed left-0 w-full z-40 transition-all duration-500 ease-in-out ${bgColor} ${topClass}`}>
            <div className="container mx-auto px-6 h-20 flex justify-between items-center">
                <Link
                    href="/"
                    className="z-50"
                >
                    <Image
                        src={scrolled || isOpen ? "/img/logo-forrest.png" : "/img/logo-bone.png"}
                        alt="Hope Has No Borders"
                        width={180}
                        height={60}
                        className="h-10 w-auto transition-all duration-500"
                        priority
                    />
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-[11px] font-bold uppercase tracking-[0.2em] hover:text-[#FFB81C] transition-colors ${textColor}`}
                        >
                            {t(link.label)}
                        </Link>
                    ))}

                    <div className={`h-4 w-px ${scrolled ? 'bg-neutral-300' : 'bg-white/30'}`} />

                    <button
                        onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
                        className="flex items-center gap-2 bg-[#C7D400] text-neutral-900 px-4 py-2 rounded-full text-xs font-bold hover:bg-[#d8e600] transition-all min-h-[36px]"
                        aria-label={lang === 'en' ? 'Ver sitio en Español' : 'View site in English'}
                    >
                        <Globe size={16} />
                        {lang === 'en' ? 'Español' : 'English'}
                    </button>

                    <a
                        href="https://www.coloradogives.org/organization/hopehasnoborders"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-neutral-900 text-white hover:bg-[#FFB81C] px-6 py-3 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] transition-all"
                    >
                        Donate
                    </a>
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden z-[110]"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X className="text-white" /> : <Menu className={textColor} />}
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 bg-neutral-900 z-[100] flex flex-col items-center justify-center gap-8 h-[100dvh]"
                    >
                        {/* Language Toggle - Top of Mobile Menu */}
                        <button
                            onClick={() => {
                                setLang(lang === 'en' ? 'es' : 'en')
                                setIsOpen(false)
                            }}
                            className="flex items-center justify-center gap-3 bg-[#C7D400] text-neutral-900 px-6 py-3 rounded-full text-base font-bold min-h-[48px] mb-8 hover:bg-[#d8e600] transition-colors"
                            aria-label={lang === 'en' ? 'Ver sitio en Español' : 'View site in English'}
                        >
                            <Globe size={20} />
                            {lang === 'en' ? 'Ver en Español' : 'View in English'}
                        </button>

                        {/* Mobile Menu Content */}
                        <div className="flex flex-col items-center gap-6">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-3xl font-serif text-white hover:text-[#FFB81C] transition-colors text-center"
                                >
                                    {t(link.label)}
                                </Link>
                            ))}

                            <div className="w-12 h-px bg-white/20 my-4" />

                            <a
                                href="https://www.coloradogives.org/organization/hopehasnoborders"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsOpen(false)}
                                className="text-3xl font-serif text-[#FFB81C] hover:text-white transition-colors text-center"
                            >
                                Donate
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import Link from 'next/link'

interface DonationFormProps {
    formType: string
    title: { en: string; es: string }
    description: { en: string; es: string }
    suggestedItems: { en: string; es: string }
    icon: React.ReactNode
}

export function DonationForm({ formType, title, description, suggestedItems, icon }: DonationFormProps) {
    const { t, lang } = useLanguage()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        items: '',
        message: '',
        preferredContact: 'email',
        availableDate: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus('idle')
        setErrorMessage('')

        try {
            const response = await fetch('/api/donate-items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    formType,
                    ...formData
                })
            })

            const data = await response.json()

            if (response.ok) {
                setSubmitStatus('success')
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    items: '',
                    message: '',
                    preferredContact: 'email',
                    availableDate: ''
                })
            } else {
                setSubmitStatus('error')
                setErrorMessage(data.error || 'Something went wrong. Please try again.')
            }
        } catch (error) {
            setSubmitStatus('error')
            setErrorMessage('Network error. Please check your connection and try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-[var(--bone)] pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-3xl">
                {/* Back Button */}
                <Link
                    href="/volunteer"
                    className="inline-flex items-center gap-2 text-[var(--forrest)] hover:text-[var(--yarrow)] transition-colors mb-8 font-bold text-sm uppercase tracking-widest"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {lang === 'es' ? 'Volver a Voluntariado' : 'Back to Volunteer'}
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="w-20 h-20 bg-[var(--yarrow)] rounded-2xl flex items-center justify-center mx-auto mb-6">
                        {icon}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif text-[var(--forrest)] mb-4">
                        {t(title)}
                    </h1>
                    <p className="text-neutral-600 font-light text-lg max-w-xl mx-auto">
                        {t(description)}
                    </p>
                </motion.div>

                {/* Success State */}
                {submitStatus === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-green-50 border-2 border-green-500 rounded-2xl p-8 text-center mb-8"
                    >
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-serif text-green-800 mb-2">
                            {lang === 'es' ? '¡Gracias!' : 'Thank You!'}
                        </h2>
                        <p className="text-green-700">
                            {lang === 'es'
                                ? 'Tu oferta de donación ha sido enviada. Nos pondremos en contacto contigo pronto.'
                                : 'Your donation offer has been sent. We will contact you soon.'
                            }
                        </p>
                        <Link
                            href="/volunteer"
                            className="inline-block mt-6 bg-green-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-600 transition-colors"
                        >
                            {lang === 'es' ? 'Volver a Voluntariado' : 'Back to Volunteer'}
                        </Link>
                    </motion.div>
                )}

                {/* Error State */}
                {submitStatus === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-red-50 border-2 border-red-500 rounded-2xl p-6 mb-8 flex items-start gap-4"
                    >
                        <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                        <div>
                            <h3 className="font-bold text-red-800">
                                {lang === 'es' ? 'Error' : 'Error'}
                            </h3>
                            <p className="text-red-700 text-sm">{errorMessage}</p>
                        </div>
                    </motion.div>
                )}

                {/* Form */}
                {submitStatus !== 'success' && (
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        onSubmit={handleSubmit}
                        className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-[var(--forrest)]/10"
                    >
                        {/* Suggested Items */}
                        <div className="bg-[var(--bone)] rounded-xl p-6 mb-8">
                            <h3 className="font-bold text-[var(--forrest)] mb-2">
                                {lang === 'es' ? 'Artículos Sugeridos:' : 'Suggested Items:'}
                            </h3>
                            <p className="text-neutral-600 text-sm">{t(suggestedItems)}</p>
                        </div>

                        <div className="space-y-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-bold text-[var(--forrest)] mb-2">
                                    {lang === 'es' ? 'Nombre Completo *' : 'Full Name *'}
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--yarrow)] focus:border-transparent transition-all"
                                    placeholder={lang === 'es' ? 'Tu nombre' : 'Your name'}
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-bold text-[var(--forrest)] mb-2">
                                    {lang === 'es' ? 'Correo Electrónico *' : 'Email Address *'}
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--yarrow)] focus:border-transparent transition-all"
                                    placeholder={lang === 'es' ? 'tu@email.com' : 'you@email.com'}
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-bold text-[var(--forrest)] mb-2">
                                    {lang === 'es' ? 'Teléfono' : 'Phone Number'}
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--yarrow)] focus:border-transparent transition-all"
                                    placeholder={lang === 'es' ? '(303) 555-0123' : '(303) 555-0123'}
                                />
                            </div>

                            {/* Preferred Contact */}
                            <div>
                                <label className="block text-sm font-bold text-[var(--forrest)] mb-2">
                                    {lang === 'es' ? 'Método de Contacto Preferido' : 'Preferred Contact Method'}
                                </label>
                                <select
                                    name="preferredContact"
                                    value={formData.preferredContact}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--yarrow)] focus:border-transparent transition-all bg-white"
                                >
                                    <option value="email">{lang === 'es' ? 'Correo Electrónico' : 'Email'}</option>
                                    <option value="phone">{lang === 'es' ? 'Teléfono' : 'Phone'}</option>
                                    <option value="text">{lang === 'es' ? 'Mensaje de Texto' : 'Text Message'}</option>
                                </select>
                            </div>

                            {/* Available Date */}
                            <div>
                                <label className="block text-sm font-bold text-[var(--forrest)] mb-2">
                                    {lang === 'es' ? 'Fecha de Disponibilidad' : 'Available Date'}
                                </label>
                                <input
                                    type="date"
                                    name="availableDate"
                                    value={formData.availableDate}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--yarrow)] focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Items */}
                            <div>
                                <label className="block text-sm font-bold text-[var(--forrest)] mb-2">
                                    {lang === 'es' ? '¿Qué artículos deseas donar? *' : 'What items would you like to donate? *'}
                                </label>
                                <textarea
                                    name="items"
                                    required
                                    rows={4}
                                    value={formData.items}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--yarrow)] focus:border-transparent transition-all resize-none"
                                    placeholder={lang === 'es'
                                        ? 'Describe los artículos que deseas donar...'
                                        : 'Describe the items you would like to donate...'
                                    }
                                />
                            </div>

                            {/* Additional Message */}
                            <div>
                                <label className="block text-sm font-bold text-[var(--forrest)] mb-2">
                                    {lang === 'es' ? 'Mensaje Adicional' : 'Additional Message'}
                                </label>
                                <textarea
                                    name="message"
                                    rows={3}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--yarrow)] focus:border-transparent transition-all resize-none"
                                    placeholder={lang === 'es'
                                        ? 'Cualquier información adicional...'
                                        : 'Any additional information...'
                                    }
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[var(--forrest)] hover:bg-[var(--yarrow)] text-white hover:text-black px-8 py-5 rounded-xl font-bold uppercase tracking-widest text-sm transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        {lang === 'es' ? 'Enviando...' : 'Sending...'}
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        {lang === 'es' ? 'Enviar Oferta de Donación' : 'Submit Donation Offer'}
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.form>
                )}

                {/* Contact Alternative */}
                <div className="text-center mt-12 text-neutral-600">
                    <p className="mb-2">
                        {lang === 'es'
                            ? '¿Prefieres contactarnos directamente?'
                            : 'Prefer to contact us directly?'
                        }
                    </p>
                    <a
                        href="mailto:hopehasnoborders@gmail.com"
                        className="text-[var(--forrest)] font-bold hover:text-[var(--yarrow)] transition-colors"
                    >
                        hopehasnoborders@gmail.com
                    </a>
                </div>
            </div>
        </div>
    )
}

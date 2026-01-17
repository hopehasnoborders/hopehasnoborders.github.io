'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Send, CheckCircle, AlertCircle, Loader2, Users } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import Link from 'next/link'

export default function CollaboratePage() {
    const { lang } = useLanguage()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        organization: '',
        role: '',
        collaborationType: '',
        description: '',
        resources: '',
        timeline: '',
        additionalInfo: ''
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

        try {
            const response = await fetch('/api/donate-items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    formType: 'Collaboration Request',
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    items: `Organization: ${formData.organization}
Role: ${formData.role}
Collaboration Type: ${formData.collaborationType}
Resources They Can Offer: ${formData.resources}`,
                    message: `Description: ${formData.description}

Timeline: ${formData.timeline}

Additional Info: ${formData.additionalInfo}`,
                    preferredContact: 'email'
                })
            })

            if (response.ok) {
                setSubmitStatus('success')
            } else {
                const data = await response.json()
                setSubmitStatus('error')
                setErrorMessage(data.error || 'Something went wrong.')
            }
        } catch (error) {
            setSubmitStatus('error')
            setErrorMessage('Network error. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-[var(--bone)] pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-3xl">
                <Link href="/volunteer" className="inline-flex items-center gap-2 text-[var(--forrest)] hover:text-[var(--yarrow)] transition-colors mb-8 font-bold text-sm uppercase tracking-widest">
                    <ArrowLeft className="w-4 h-4" />
                    {lang === 'es' ? 'Volver a Voluntariado' : 'Back to Volunteer'}
                </Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <div className="w-20 h-20 bg-[var(--sky)] rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Users className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif text-[var(--forrest)] mb-4">
                        {lang === 'es' ? 'Colaborar con Nosotros' : 'Collaborate With Us'}
                    </h1>
                    <p className="text-neutral-600 font-light text-lg max-w-xl mx-auto">
                        {lang === 'es'
                            ? 'Asociarse con Hope Has No Borders para un mayor impacto comunitario.'
                            : 'Partner with Hope Has No Borders for greater community impact.'
                        }
                    </p>
                </motion.div>

                {submitStatus === 'success' && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-green-50 border-2 border-green-500 rounded-2xl p-8 text-center mb-8">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-serif text-green-800 mb-2">{lang === 'es' ? '¡Gracias!' : 'Thank You!'}</h2>
                        <p className="text-green-700">{lang === 'es' ? 'Tu propuesta ha sido enviada. Nos pondremos en contacto contigo pronto.' : 'Your proposal has been submitted. We will contact you soon.'}</p>
                        <Link href="/volunteer" className="inline-block mt-6 bg-green-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-600 transition-colors">{lang === 'es' ? 'Volver a Voluntariado' : 'Back to Volunteer'}</Link>
                    </motion.div>
                )}

                {submitStatus === 'error' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-50 border-2 border-red-500 rounded-2xl p-6 mb-8 flex items-start gap-4">
                        <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                        <p className="text-red-700 text-sm">{errorMessage}</p>
                    </motion.div>
                )}

                {submitStatus !== 'success' && (
                    <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-[var(--forrest)]/10">
                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-[var(--forrest)] mb-2">{lang === 'es' ? 'Nombre Completo *' : 'Full Name *'}</label>
                                    <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--yarrow)]" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[var(--forrest)] mb-2">{lang === 'es' ? 'Correo Electrónico *' : 'Email *'}</label>
                                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--yarrow)]" />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-[var(--forrest)] mb-2">{lang === 'es' ? 'Organización' : 'Organization'}</label>
                                    <input type="text" name="organization" value={formData.organization} onChange={handleChange} className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--yarrow)]" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[var(--forrest)] mb-2">{lang === 'es' ? 'Tu Rol' : 'Your Role'}</label>
                                    <input type="text" name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--yarrow)]" placeholder={lang === 'es' ? 'Director, Voluntario, etc.' : 'Director, Volunteer, etc.'} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[var(--forrest)] mb-2">{lang === 'es' ? 'Tipo de Colaboración' : 'Type of Collaboration'}</label>
                                <select name="collaborationType" value={formData.collaborationType} onChange={handleChange} className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--yarrow)] bg-white">
                                    <option value="">{lang === 'es' ? 'Seleccionar...' : 'Select...'}</option>
                                    <option value="event">{lang === 'es' ? 'Co-organizar un Evento' : 'Co-host an Event'}</option>
                                    <option value="funding">{lang === 'es' ? 'Oportunidad de Financiamiento' : 'Funding Opportunity'}</option>
                                    <option value="services">{lang === 'es' ? 'Servicios Compartidos' : 'Shared Services'}</option>
                                    <option value="referrals">{lang === 'es' ? 'Red de Referencias' : 'Referral Network'}</option>
                                    <option value="other">{lang === 'es' ? 'Otro' : 'Other'}</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[var(--forrest)] mb-2">{lang === 'es' ? 'Describe tu Propuesta *' : 'Describe Your Proposal *'}</label>
                                <textarea name="description" required rows={4} value={formData.description} onChange={handleChange} className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--yarrow)] resize-none" placeholder={lang === 'es' ? '¿Cómo te gustaría colaborar?' : 'How would you like to collaborate?'} />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[var(--forrest)] mb-2">{lang === 'es' ? '¿Qué Recursos Puedes Ofrecer?' : 'What Resources Can You Offer?'}</label>
                                <textarea name="resources" rows={3} value={formData.resources} onChange={handleChange} className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--yarrow)] resize-none" placeholder={lang === 'es' ? 'Espacio, voluntarios, financiamiento, etc.' : 'Space, volunteers, funding, expertise, etc.'} />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[var(--forrest)] mb-2">{lang === 'es' ? 'Cronograma Propuesto' : 'Proposed Timeline'}</label>
                                <input type="text" name="timeline" value={formData.timeline} onChange={handleChange} className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--yarrow)]" placeholder={lang === 'es' ? 'Q1 2025, En curso, etc.' : 'Q1 2025, Ongoing, etc.'} />
                            </div>

                            <button type="submit" disabled={isSubmitting} className="w-full bg-[var(--forrest)] hover:bg-[var(--yarrow)] text-white hover:text-black px-8 py-5 rounded-xl font-bold uppercase tracking-widest text-sm transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50">
                                {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" />{lang === 'es' ? 'Enviando...' : 'Sending...'}</> : <><Send className="w-5 h-5" />{lang === 'es' ? 'Enviar Propuesta' : 'Submit Proposal'}</>}
                            </button>
                        </div>
                    </motion.form>
                )}

                <div className="text-center mt-12 text-neutral-600">
                    <p className="mb-2">{lang === 'es' ? '¿Prefieres una llamada?' : 'Prefer a call?'}</p>
                    <a href="mailto:hopehasnoborders@gmail.com" className="text-[var(--forrest)] font-bold hover:text-[var(--yarrow)] transition-colors">hopehasnoborders@gmail.com</a>
                </div>
            </div>
        </div>
    )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'
import { useLanguage } from '@/lib/LanguageContext'
import { motion } from 'framer-motion'
import { ShoppingBag, ExternalLink } from 'lucide-react'

// Define the Product interface
export interface Product {
    _id: string
    title_en: string
    title_es: string
    desc_en: string
    desc_es: string
    price: number
    image: any
    stripePaymentLink: string
    active: boolean
}

export default function ShopClientPage({ products }: { products: Product[] }) {
    const { t } = useLanguage()

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-neutral-900 pt-32 pb-20">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <ShoppingBag className="w-12 h-12 text-[#FFB81C] mx-auto mb-6" />
                        <h1 className="text-5xl md:text-6xl font-serif text-white mb-6">
                            {t({ en: 'Shop', es: 'Tienda' })}
                        </h1>
                        <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
                            {t({
                                en: 'Support our mission with every purchase. 100% of proceeds go directly to helping our community.',
                                es: 'Apoya nuestra misión con cada compra. El 100% de las ganancias van directamente a ayudar a nuestra comunidad.'
                            })}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    {products.length === 0 ? (
                        <div className="text-center py-20">
                            <ShoppingBag className="w-16 h-16 text-neutral-300 mx-auto mb-6" />
                            <h2 className="text-2xl font-serif text-neutral-600 mb-4">
                                {t({ en: 'Coming Soon', es: 'Próximamente' })}
                            </h2>
                            <p className="text-neutral-500">
                                {t({
                                    en: 'Our shop is being set up. Check back soon!',
                                    es: 'Nuestra tienda está siendo configurada. ¡Vuelve pronto!'
                                })}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {products.map((product, index) => (
                                <motion.div
                                    key={product._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group bg-white rounded-sm border border-neutral-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                                >
                                    {/* Product Image */}
                                    <div className="relative aspect-square bg-neutral-100 overflow-hidden">
                                        {product.image ? (
                                            <Image
                                                src={urlFor(product.image).width(600).height(600).url()}
                                                alt={t({ en: product.title_en, es: product.title_es })}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <ShoppingBag className="w-16 h-16 text-neutral-300" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-6">
                                        <h3 className="font-serif text-xl text-neutral-900 mb-2">
                                            {t({ en: product.title_en, es: product.title_es })}
                                        </h3>
                                        {(product.desc_en || product.desc_es) && (
                                            <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                                                {t({ en: product.desc_en, es: product.desc_es })}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-bold text-neutral-900">
                                                ${product.price}
                                            </span>
                                            {product.stripePaymentLink ? (
                                                <Link
                                                    href={product.stripePaymentLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 bg-[#FFB81C] hover:bg-[#E5A519] text-white px-6 py-3 rounded-sm text-sm font-bold uppercase tracking-wider transition-colors"
                                                >
                                                    {t({ en: 'Buy Now', es: 'Comprar' })}
                                                    <ExternalLink className="w-4 h-4" />
                                                </Link>
                                            ) : (
                                                <span className="text-neutral-400 text-sm italic">
                                                    {t({ en: 'Coming soon', es: 'Próximamente' })}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-neutral-100 py-16">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-serif text-neutral-900 mb-4">
                        {t({ en: 'Want to support in other ways?', es: '¿Quieres apoyar de otras maneras?' })}
                    </h2>
                    <p className="text-neutral-600 mb-8 max-w-xl mx-auto">
                        {t({
                            en: 'Your donation helps us provide housing, legal aid, and support to those in need.',
                            es: 'Tu donación nos ayuda a proporcionar vivienda, asistencia legal y apoyo a quienes lo necesitan.'
                        })}
                    </p>
                    <Link
                        href="/donate"
                        className="inline-block bg-neutral-900 hover:bg-[#FFB81C] text-white px-10 py-4 rounded-sm text-sm font-bold uppercase tracking-widest transition-colors"
                    >
                        {t({ en: 'Make a Donation', es: 'Hacer una Donación' })}
                    </Link>
                </div>
            </section>
        </main>
    )
}

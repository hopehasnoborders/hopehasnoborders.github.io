import { DonationForm } from '@/components/forms/DonationForm'
import { Laptop } from 'lucide-react'

export default function TechDonationPage() {
    return (
        <DonationForm
            formType="Tech Support"
            title={{
                en: 'Tech Support Donation',
                es: 'Donación de Apoyo Tecnológico'
            }}
            description={{
                en: 'Help connect families to resources, job opportunities, and their loved ones.',
                es: 'Ayuda a conectar a las familias con recursos, oportunidades de trabajo y sus seres queridos.'
            }}
            suggestedItems={{
                en: 'Working laptops/computers, smartphones, tablets/iPads, charging cables, phone cases',
                es: 'Laptops/computadoras en funcionamiento, teléfonos inteligentes, tabletas/iPads, cables de carga, fundas para teléfonos'
            }}
            icon={<Laptop className="w-10 h-10 text-black" />}
        />
    )
}

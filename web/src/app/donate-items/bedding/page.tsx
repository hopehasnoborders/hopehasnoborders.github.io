import { DonationForm } from '@/components/forms/DonationForm'
import { Bed } from 'lucide-react'

export default function BeddingDonationPage() {
    return (
        <DonationForm
            formType="Bedding"
            title={{
                en: 'Bedding Donation',
                es: 'Donación de Ropa de Cama'
            }}
            description={{
                en: 'Help families have a comfortable place to rest as they rebuild their lives.',
                es: 'Ayuda a las familias a tener un lugar cómodo para descansar mientras reconstruyen sus vidas.'
            }}
            suggestedItems={{
                en: 'Twin mattresses (new or gently used), twin sheets, blankets, comforters, pillows, mattress protectors',
                es: 'Colchones individuales (nuevos o en buen estado), sábanas individuales, mantas, edredones, almohadas, protectores de colchón'
            }}
            icon={<Bed className="w-10 h-10 text-black" />}
        />
    )
}

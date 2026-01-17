import { DonationForm } from '@/components/forms/DonationForm'
import { Gift } from 'lucide-react'

export default function WelcomeBasketsDonationPage() {
    return (
        <DonationForm
            formType="Welcome Baskets"
            title={{
                en: 'Welcome Baskets Donation',
                es: 'Donación de Canastas de Bienvenida'
            }}
            description={{
                en: 'Create a warm welcome for families arriving to their new homes.',
                es: 'Crea una cálida bienvenida para las familias que llegan a sus nuevos hogares.'
            }}
            suggestedItems={{
                en: "Hygiene items (soap, shampoo, toothpaste, toothbrushes), new socks & underwear (adult & children's sizes), small activities/crafts for children, welcome cards",
                es: 'Artículos de higiene (jabón, champú, pasta de dientes, cepillos de dientes), calcetines y ropa interior nuevos (tallas de adultos y niños), pequeñas actividades/manualidades para niños, tarjetas de bienvenida'
            }}
            icon={<Gift className="w-10 h-10 text-black" />}
        />
    )
}

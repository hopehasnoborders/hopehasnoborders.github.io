import { DonationForm } from '@/components/forms/DonationForm'
import { ShoppingBag } from 'lucide-react'

export default function FoodDonationPage() {
    return (
        <DonationForm
            formType="Food Support"
            title={{
                en: 'Food Support Donation',
                es: 'Donación de Apoyo Alimentario'
            }}
            description={{
                en: 'Provide nutritious food to families transitioning to stability.',
                es: 'Proporciona alimentos nutritivos a familias en transición hacia la estabilidad.'
            }}
            suggestedItems={{
                en: 'Grocery gift cards, non-perishable foods, frozen meals, dry goods (beans, rice, pasta, lentils), cooking oil, spices',
                es: 'Tarjetas de regalo de supermercado, alimentos no perecederos, comidas congeladas, productos secos (frijoles, arroz, pasta, lentejas), aceite de cocina, especias'
            }}
            icon={<ShoppingBag className="w-10 h-10 text-black" />}
        />
    )
}

import { DonationForm } from '@/components/forms/DonationForm'
import { Pill } from 'lucide-react'

export default function MedicineDonationPage() {
    return (
        <DonationForm
            formType="OTC Medicine"
            title={{
                en: 'OTC Medicine Donation',
                es: 'Donación de Medicamentos sin Receta'
            }}
            description={{
                en: 'Help families access basic healthcare supplies and first aid essentials.',
                es: 'Ayuda a las familias a acceder a suministros básicos de salud y elementos esenciales de primeros auxilios.'
            }}
            suggestedItems={{
                en: "Children's and adult Ibuprofen, Tylenol, Neosporin, bandages, first aid kits, cough medicine, allergy medication",
                es: 'Ibuprofeno para niños y adultos, Tylenol, Neosporin, vendas, botiquines de primeros auxilios, jarabe para la tos, medicamentos para alergias'
            }}
            icon={<Pill className="w-10 h-10 text-black" />}
        />
    )
}

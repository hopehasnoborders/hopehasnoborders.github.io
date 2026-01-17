import { DonationForm } from '@/components/forms/DonationForm'
import { Bike } from 'lucide-react'

export default function TransportationDonationPage() {
    return (
        <DonationForm
            formType="Transportation Support"
            title={{
                en: 'Transportation Support Donation',
                es: 'Donación de Apoyo de Transporte'
            }}
            description={{
                en: 'Help our community members get to work, school, and essential appointments.',
                es: 'Ayuda a los miembros de nuestra comunidad a llegar al trabajo, la escuela y citas esenciales.'
            }}
            suggestedItems={{
                en: 'Bikes, helmets, bike locks, RTD bus passes, gift cards for rideshare services',
                es: 'Bicicletas, cascos, candados para bicicletas, pases de autobús RTD, tarjetas de regalo para servicios de transporte'
            }}
            icon={<Bike className="w-10 h-10 text-black" />}
        />
    )
}

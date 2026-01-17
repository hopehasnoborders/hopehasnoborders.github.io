import { DonationForm } from '@/components/forms/DonationForm'
import { Mail } from 'lucide-react'

export default function MailingDonationPage() {
    return (
        <DonationForm
            formType="Mailing Support"
            title={{
                en: 'Mailing Support Donation',
                es: 'Donación de Apoyo de Correo'
            }}
            description={{
                en: 'Help us send important legal documents and correspondence for asylum seekers.',
                es: 'Ayúdanos a enviar documentos legales importantes y correspondencia para solicitantes de asilo.'
            }}
            suggestedItems={{
                en: 'Stamps (Forever stamps preferred), manila envelopes (9x12, 10x13), white envelopes, packing tape',
                es: 'Estampillas (Forever stamps preferidas), sobres manila (9x12, 10x13), sobres blancos, cinta de embalaje'
            }}
            icon={<Mail className="w-10 h-10 text-black" />}
        />
    )
}

import { sanityFetch } from '@/lib/sanity.server'
import { programsPageQuery, allProgramsQuery, siteSettingsQuery } from '@/lib/queries'
import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { Hero, ProgramsGrid, CoreServices } from '@/components/sections'

async function getProgramsData() {
    const [page, programs, siteSettings] = await Promise.all([
        sanityFetch({ query: programsPageQuery, tags: ['programs-page', 'settings'] }),
        sanityFetch({ query: allProgramsQuery, tags: ['programs'] }),
        sanityFetch({ query: siteSettingsQuery, tags: ['settings'] })
    ]) as [any, any, any]
    return { page, programs, siteSettings }
}

export async function generateMetadata(): Promise<Metadata> {
    const { page, siteSettings } = await getProgramsData()
    return generatePageMetadata(page, siteSettings, 'en')
}

export default async function ProgramsPage() {
    const { page, programs } = await getProgramsData()

    return (
        <div className="bg-white min-h-screen">
            <Hero hero={page.hero} />
            <CoreServices />
            <ProgramsGrid
                header={{
                    eyebrow: { en: 'Our Impact', es: 'Nuestro Impacto' },
                    title: { en: 'Comprehensive Support', es: 'Apoyo Integral' },
                    subtitle: page.hero.subtitle
                }}
                programs={programs}
            />
        </div>
    )
}

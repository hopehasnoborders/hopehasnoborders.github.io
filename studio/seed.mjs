// Migration script to populate initial content in Sanity
// Run with: node seed.mjs

import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'fnj6du1o',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN || 'skFiDFb23tEMsUuIIj9dLqcC2aFnF2DAk5d8q55RWkdUTxGyE4A79tFSLEHskZ4lBtbeJI4JdXgNYgDqrIJ2d2TErXOdpH6aXQGnMKig67ATqI155It3ZDsBDScuOxdmSgej6LP7WzVlTzdZujwwLpbsiI1eLCBq0u3U38PSWIrvEtGEsxok',
    useCdn: false,
})

async function seed() {
    console.log('🌱 Seeding Sanity with initial content...')

    // 1. Site Settings
    await client.createOrReplace({
        _id: 'siteSettings',
        _type: 'siteSettings',
        title: { en: 'Hope Has No Borders', es: 'La Esperanza No Tiene Fronteras' },
        description: {
            en: 'A grassroots response to the humanitarian crisis in Denver.',
            es: 'Una respuesta comunitaria a la crisis humanitaria en Denver.'
        },
        announcement: {
            active: true,
            label: { en: 'Urgent Crisis Response:', es: 'Respuesta de Crisis Urgente:' },
            text: {
                en: 'We need winter coats! Drop off today.',
                es: '¡Necesitamos abrigos de invierno! Entréguelos hoy.'
            },
            linkText: { en: 'Learn More', es: 'Aprende Más' },
            linkType: 'internal',
            internalRoute: 'donate',
        },
        contact: {
            email: 'hello@hopehasnoborders.org',
            phone: '(720) 555-HOPE',
            address: 'Denver, CO',
        },
        social: {
            instagram: 'https://instagram.com/hopehasnoborders',
            facebook: 'https://facebook.com/hopehasnoborders',
        },
    })
    console.log('✅ Site Settings created')

    // 2. Home Page
    await client.createOrReplace({
        _id: 'pageHome',
        _type: 'pageHome',
        hero: {
            tagline: { en: 'Est. 2023 • Denver, CO', es: 'Est. 2023 • Denver, CO' },
            title: { en: 'HOPE HAS\nNO BORDERS', es: 'LA ESPERANZA\nNO TIENE FRONTERAS' },
            subtitle: {
                en: 'A grassroots response to the humanitarian crisis in Denver, bridging the gap from crisis to stability through housing, legal aid, and dignity.',
                es: 'Una respuesta comunitaria a la crisis humanitaria en Denver, uniendo la brecha entre crisis y estabilidad a través de vivienda, ayuda legal y dignidad.'
            },
            primaryButton: { text: { en: 'Find Resources', es: 'Buscar Recursos' }, link: '/resources' },
            secondaryButton: { text: { en: 'Our Impact', es: 'Nuestro Impacto' }, link: '/about' },
        },
        stats: [
            { value: 300, label: { en: 'Families Housed', es: 'Familias Alojadas' } },
            { value: 1500, label: { en: 'Legal Forms Filed', es: 'Formularios Legales' } },
            { value: 5000, label: { en: 'Meals Served', es: 'Comidas Servidas' } },
        ],
        videoSection: {
            label: { en: 'See Our Impact', es: 'Vea Nuestro Impacto' },
            title: {
                en: '"We are moms, neighbors, and community members bridging the gap from crisis to stability."',
                es: '"Somos madres, vecinas y miembros de la comunidad uniendo la brecha entre crisis y estabilidad."'
            },
            videoUrl: 'https://www.youtube.com/embed/mh9w6QWdtf8',
            donateText: { en: 'Donate Now', es: 'Donar Ahora' },
        },
        servicesSection: {
            eyebrow: { en: 'What We Do', es: 'Qué Hacemos' },
            title: { en: 'Comprehensive Support for Immigrants', es: 'Apoyo Integral para Inmigrantes' },
            subtitle: {
                en: 'Targeted programs that move families from crisis to stable, independent living.',
                es: 'Programas específicos que ayudan a las familias a pasar de la crisis a una vida estable e independiente.'
            },
        },
        testimonialSection: {
            eyebrow: { en: 'Voices', es: 'Voces' },
            title: { en: 'Stories of Hope', es: 'Historias de Esperanza' },
            subtitle: { en: 'Real families, real outcomes, real stability.', es: 'Familias reales, resultados reales, estabilidad real.' },
        },
    })
    console.log('✅ Home Page created')

    // 3. About Page
    await client.createOrReplace({
        _id: 'pageAbout',
        _type: 'pageAbout',
        hero: {
            title: { en: 'About Us', es: 'Sobre Nosotros' },
            subtitle: {
                en: 'We are moms, neighbors, and community members bridging the gap from crisis to stability.',
                es: 'Somos madres, vecinos y miembros de la comunidad que tienden un puente de la crisis a la estabilidad.'
            },
        },
        mission: {
            en: 'To provide immediate relief and long-term stability to asylum seekers and newcomers in the Denver metro area through housing, legal aid, and community integration.',
            es: 'Proporcionar alivio inmediato y estabilidad a largo plazo a los solicitantes de asilo y recién llegados en el área metropolitana de Denver a través de vivienda, asistencia legal e integración comunitaria.',
        },
        values: [
            { value: { en: 'Dignity First', es: 'Dignidad Primero' } },
            { value: { en: 'Community Led', es: 'Liderado por la Comunidad' } },
            { value: { en: 'Radical Hospitality', es: 'Hospitalidad Radical' } },
            { value: { en: 'Action Over Words', es: 'Acción Sobre Palabras' } },
        ],
    })
    console.log('✅ About Page created')

    // 4. Other Pages
    const pages = [
        { _id: 'pagePrograms', _type: 'pagePrograms', hero: { title: { en: 'Our Programs', es: 'Nuestros Programas' }, subtitle: { en: 'Specific, targeted assistance designed to move families from crisis to stability.', es: 'Asistencia específica y dirigida diseñada para ayudar a las familias a pasar de la crisis a la estabilidad.' } } },
        { _id: 'pageResources', _type: 'pageResources', hero: { title: { en: 'Resource Hub', es: 'Centro de Recursos' }, subtitle: { en: 'Direct links to essential services in Denver.', es: 'Enlaces directos a servicios esenciales en Denver.' } } },
        { _id: 'pageStories', _type: 'pageStories', hero: { title: { en: 'Voices of Resilience', es: 'Voces de Resiliencia' }, subtitle: { en: 'Stories from families and neighbors in our community.', es: 'Historias de familias y vecinos en nuestra comunidad.' } } },
        { _id: 'pageVolunteer', _type: 'pageVolunteer', hero: { title: { en: 'Join the Movement', es: 'Únete al Movimiento' }, subtitle: { en: "Your time and skills can change the trajectory of a family's life.", es: 'Tu tiempo y habilidades pueden cambiar la trayectoria de la vida de una familia.' } } },
        { _id: 'pageDonate', _type: 'pageDonate', hero: { title: { en: 'Invest in Hope', es: 'Invierte en Esperanza' }, subtitle: { en: 'Every dollar goes directly to housing, legal fees, and essential supplies.', es: 'Cada dólar va directamente a vivienda, honorarios legales y suministros esenciales.' } }, amounts: ['$25', '$50', '$100', '$250', '$500', 'Other'] },
    ]

    for (const page of pages) {
        await client.createOrReplace(page)
        console.log(`✅ ${page._type} created`)
    }

    // 5. Programs
    const programs = [
        { _id: 'program-housing', _type: 'program', title: { en: 'Housing Assistance', es: 'Asistencia de Vivienda' }, slug: { current: 'housing' }, summary: { en: 'Emergency shelter placement and long-term affordable housing connections.', es: 'Colocación en refugio de emergencia y conexiones de vivienda asequible a largo plazo.' }, description: { en: 'We work with local landlords and host families to provide safe, stable housing for newcomers. From emergency shelter to long-term leases, we help families find a place to call home.', es: 'Trabajamos con propietarios locales y familias anfitrionas para proporcionar vivienda segura y estable a los recién llegados.' }, icon: 'home', action: { en: 'Get Housing Help', es: 'Obtener Ayuda de Vivienda' }, order: 1 },
        { _id: 'program-legal', _type: 'program', title: { en: 'Legal Aid', es: 'Asistencia Legal' }, slug: { current: 'legal' }, summary: { en: 'Pro-bono immigration attorneys and asylum application support.', es: 'Abogados de inmigración pro-bono y apoyo para solicitudes de asilo.' }, description: { en: 'Our network of volunteer lawyers helps with asylum applications, work permits, and legal documentation. We never let paperwork stand between a family and stability.', es: 'Nuestra red de abogados voluntarios ayuda con solicitudes de asilo, permisos de trabajo y documentación legal.' }, icon: 'scale', action: { en: 'Find Legal Help', es: 'Encontrar Ayuda Legal' }, order: 2 },
        { _id: 'program-community', _type: 'program', title: { en: 'Community Integration', es: 'Integración Comunitaria' }, slug: { current: 'community' }, summary: { en: 'Language classes, job training, and social connections.', es: 'Clases de idiomas, capacitación laboral y conexiones sociales.' }, description: { en: 'Beyond basic needs, we help newcomers thrive. English classes, job placement, school enrollment — the building blocks of a new life.', es: 'Más allá de las necesidades básicas, ayudamos a los recién llegados a prosperar. Clases de inglés, colocación laboral, inscripción escolar.' }, icon: 'users', action: { en: 'Get Connected', es: 'Conectarse' }, order: 3 },
    ]

    for (const program of programs) {
        await client.createOrReplace(program)
        console.log(`✅ Program: ${program.title.en}`)
    }

    // 6. Testimonials
    const testimonials = [
        { _id: 'testimonial-1', _type: 'testimonial', quote: { en: 'When we arrived in Denver, we had nothing. Hope Has No Borders gave us a place to stay, helped us file our asylum paperwork, and treated us like family.', es: 'Cuando llegamos a Denver, no teníamos nada. Hope Has No Borders nos dio un lugar donde quedarnos, nos ayudó a presentar nuestros documentos de asilo y nos trató como familia.' }, author: { en: 'Maria S.', es: 'María S.' }, location: 'Denver, CO', fullStory: { en: 'After fleeing violence in Venezuela, Maria and her two children spent months in shelters before finding Hope Has No Borders. Today, she works as a nursing assistant and her kids are thriving in school.', es: 'Después de huir de la violencia en Venezuela, María y sus dos hijos pasaron meses en refugios antes de encontrar Hope Has No Borders.' } },
        { _id: 'testimonial-2', _type: 'testimonial', quote: { en: 'The volunteers here are like angels. They helped me find a job, enroll my children in school, and believe in myself again.', es: 'Los voluntarios aquí son como ángeles. Me ayudaron a encontrar trabajo, inscribir a mis hijos en la escuela y creer en mí misma de nuevo.' }, author: { en: 'Carlos M.', es: 'Carlos M.' }, location: 'Aurora, CO', fullStory: { en: 'Carlos arrived alone after a harrowing journey from Guatemala. Through our job training program, he now works in construction and is saving to bring his wife to Colorado.', es: 'Carlos llegó solo después de un viaje peligroso desde Guatemala.' } },
    ]

    for (const testimonial of testimonials) {
        await client.createOrReplace(testimonial)
        console.log(`✅ Testimonial: ${testimonial.author.en}`)
    }

    console.log('\n🎉 Seeding complete! All content has been created.')
}

seed().catch(console.error)

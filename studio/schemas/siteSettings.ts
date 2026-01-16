import { defineType, defineField } from 'sanity'
import { i18nString, i18nText } from './helpers/i18n'

export default defineType({
    name: 'siteSettings',
    title: '⚙️ Site Settings',
    type: 'document',
    groups: [
        { name: 'announcement', title: '📢 Announcement Banner' },
        { name: 'seo', title: '🔍 SEO' },
        { name: 'contact', title: '📞 Contact' },
        { name: 'social', title: '🔗 Social' },
    ],
    fields: [
        // ANNOUNCEMENT BANNER
        defineField({
            name: 'announcement',
            title: 'Announcement Banner',
            type: 'object',
            group: 'announcement',
            description: 'Emergency or promotional banner shown at the top of every page.',
            fields: [
                defineField({ name: 'active', title: 'Is Active?', type: 'boolean' }),
                i18nString('label', 'Top Small Label (e.g. "Urgent:")'),
                i18nText('text', 'Banner Text'),
                i18nString('linkText', 'Link Text (e.g. "Learn More")'),
                defineField({
                    name: 'linkType',
                    title: 'Link To',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Internal Page', value: 'internal' },
                            { title: 'External URL', value: 'external' },
                        ],
                        layout: 'radio',
                    },
                    initialValue: 'internal',
                }),
                defineField({
                    name: 'internalRoute',
                    title: 'Internal Route',
                    type: 'string',
                    hidden: ({ parent }) => parent?.linkType !== 'internal',
                    options: {
                        list: [
                            { title: 'Donate', value: 'donate' },
                            { title: 'Volunteer', value: 'volunteer' },
                            { title: 'Programs', value: 'programs' },
                            { title: 'Resources', value: 'resources' },
                            { title: 'About', value: 'about' },
                        ],
                    },
                }),
                defineField({
                    name: 'externalUrl',
                    title: 'External URL',
                    type: 'url',
                    hidden: ({ parent }) => parent?.linkType !== 'external',
                }),
            ],
        }),

        // SEO
        i18nString('title', 'Base Site Title', 'seo'),
        i18nText('description', 'Default Site Description', 'seo'),
        defineField({
            name: 'ogImage',
            title: 'Default Share Image (OG Image)',
            type: 'image',
            group: 'seo',
            options: { hotspot: true },
        }),
        defineField({
            name: 'favicon',
            title: 'Favicon',
            type: 'image',
            group: 'seo',
        }),

        // CONTACT
        defineField({
            name: 'contact',
            title: 'Contact Information',
            type: 'object',
            group: 'contact',
            fields: [
                defineField({ name: 'email', title: 'Email', type: 'email' }),
                defineField({ name: 'phone', title: 'Phone', type: 'string' }),
                defineField({ name: 'address', title: 'Address', type: 'text', rows: 2 }),
            ],
        }),

        // SOCIAL
        defineField({
            name: 'social',
            title: 'Social Media',
            type: 'object',
            group: 'social',
            fields: [
                defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
                defineField({ name: 'facebook', title: 'Facebook URL', type: 'url' }),
            ],
        }),
    ],
    preview: {
        prepare() {
            return { title: 'Site Settings' }
        },
    },
})

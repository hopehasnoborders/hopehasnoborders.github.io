import { defineType, defineField } from 'sanity'
import { i18nString, i18nText } from './helpers/i18n'
import { seoFields } from './objects/seo'

export default defineType({
    name: 'pageVolunteer',
    title: '🤝 Volunteer Page',
    type: 'document',
    groups: [
        { name: 'content', title: 'Content' },
        { name: 'seo', title: '🔍 SEO' },
    ],
    fields: [
        defineField({
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            group: 'content',
            fields: [
                i18nString('title', 'Page Title'),
                i18nText('subtitle', 'Page Subtitle'),
            ],
        }),
        defineField({
            name: 'opportunities',
            title: 'Volunteer Opportunities',
            type: 'array',
            group: 'content',
            of: [{
                type: 'object',
                fields: [
                    i18nString('title', 'Opportunity Title'),
                    i18nText('description', 'Description'),
                ],
                preview: {
                    select: { title: 'title.en' },
                },
            }],
        }),

        ...seoFields,
    ],
    preview: {
        prepare() {
            return { title: 'Volunteer Page' }
        },
    },
})

import { defineType, defineField } from 'sanity'
import { i18nString, i18nText } from './helpers/i18n'
import { seoFields } from './objects/seo'

export default defineType({
    name: 'pageStories',
    title: '💬 Stories Page',
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

        ...seoFields,
    ],
    preview: {
        prepare() {
            return { title: 'Stories Page' }
        },
    },
})

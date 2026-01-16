import { defineType, defineField } from 'sanity'
import { i18nString, i18nText, i18nPortableText } from './helpers/i18n'
import { seoFields } from './objects/seo'

export default defineType({
    name: 'pageAbout',
    title: '📖 About Page',
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
        i18nPortableText('content', 'Main Content', 'content'),
        i18nText('mission', 'Mission Statement', 'content'),
        defineField({
            name: 'values',
            title: 'Core Values',
            type: 'array',
            group: 'content',
            of: [{ type: 'object', fields: [i18nString('value', 'Value')] }],
        }),

        ...seoFields,
    ],
    preview: {
        prepare() {
            return { title: 'About Page' }
        },
    },
})

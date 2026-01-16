import { defineField } from 'sanity'
import { i18nString, i18nText } from '../helpers/i18n'

export const seoFields = [
    defineField({
        name: 'seo',
        title: 'Search Engine Optimization',
        type: 'object',
        group: 'seo',
        fields: [
            i18nString('metaTitle', 'Meta Title (Overrides page title)'),
            i18nText('metaDescription', 'Meta Description'),
            defineField({
                name: 'ogImage',
                title: 'Open Graph Image',
                description: 'Recommended size: 1200x630px',
                type: 'image',
                options: { hotspot: true }
            }),
            defineField({
                name: 'noIndex',
                title: 'Hide from search engines?',
                type: 'boolean',
                initialValue: false
            })
        ]
    })
]

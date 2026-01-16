import { defineType, defineField } from 'sanity'
import { i18nString, i18nText } from './helpers/i18n'

export default defineType({
    name: 'program',
    title: '📦 Program',
    type: 'document',
    groups: [
        { name: 'content', title: 'Content' },
        { name: 'config', title: 'Configuration' },
    ],
    fields: [
        i18nString('title', 'Program Title', 'content'),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            group: 'content',
            options: { source: 'title.en', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        i18nText('summary', 'Short Summary (for cards)', 'content'),
        i18nText('description', 'Full Description', 'content'),
        defineField({
            name: 'icon',
            title: 'Icon',
            type: 'string',
            group: 'content',
            description: 'Icon name from Lucide icons',
            options: {
                list: [
                    { title: '🏠 Home', value: 'home' },
                    { title: '⚖️ Scale (Legal)', value: 'scale' },
                    { title: '👥 Users (Community)', value: 'users' },
                    { title: '❤️ Heart', value: 'heart' },
                    { title: '📚 Book', value: 'book' },
                    { title: '🚗 Car', value: 'car' },
                ],
            },
        }),
        i18nString('action', 'Action Button Text', 'content'),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            group: 'config',
            description: 'Used to sort programs in the list (ascending)',
            initialValue: 0,
        }),
    ],
    preview: {
        select: {
            title: 'title.en',
            subtitle: 'summary.en',
        },
    },
    orderings: [
        {
            title: 'Display Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],
})

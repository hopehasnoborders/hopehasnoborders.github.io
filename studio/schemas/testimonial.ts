import { defineType, defineField } from 'sanity'
import { i18nString, i18nText } from './helpers/i18n'

export default defineType({
    name: 'testimonial',
    title: '💬 Testimonial',
    type: 'document',
    fields: [
        i18nText('quote', 'Quote'),
        i18nString('author', 'Author Name'),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
            description: 'e.g. "Denver, CO" or "Program Graduate"',
        }),
        defineField({
            name: 'image',
            title: 'Photo (optional)',
            type: 'image',
            description: 'Headshot of the author',
            options: { hotspot: true },
        }),
        i18nText('fullStory', 'Full Story / Content', 'Fuller context or interview text for the story page'),
    ],
    preview: {
        select: {
            title: 'author.en',
            subtitle: 'quote.en',
            media: 'image',
        },
    },
})

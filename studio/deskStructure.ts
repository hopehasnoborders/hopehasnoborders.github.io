import type { StructureResolver } from 'sanity/structure'
import { CogIcon, HomeIcon, InfoOutlineIcon, DocumentsIcon, HelpCircleIcon, UsersIcon, HeartIcon, CreditCardIcon, SparklesIcon, CommentIcon } from '@sanity/icons'

// Helper to create singleton list items
const singletonListItem = (S: any, typeName: string, title: string, icon: any) =>
    S.listItem()
        .title(title)
        .icon(icon)
        .child(
            S.document()
                .schemaType(typeName)
                .documentId(typeName)
        )

export const deskStructure: StructureResolver = (S) =>
    S.list()
        .title('Content')
        .items([
            // 1. Site Settings
            singletonListItem(S, 'siteSettings', '⚙️ Site Settings', CogIcon),
            S.divider(),

            // 2. Home
            singletonListItem(S, 'pageHome', '🏠 Home', HomeIcon),

            // 3. About
            singletonListItem(S, 'pageAbout', '📖 About', InfoOutlineIcon),

            // 4. Programs Page
            singletonListItem(S, 'pagePrograms', '📦 Programs Page', DocumentsIcon),

            // 5. Resources
            singletonListItem(S, 'pageResources', '📚 Resources', HelpCircleIcon),

            // 6. Stories
            singletonListItem(S, 'pageStories', '💬 Stories', CommentIcon),

            // 7. Volunteer
            singletonListItem(S, 'pageVolunteer', '🤝 Volunteer', UsersIcon),

            // 8. Donate
            singletonListItem(S, 'pageDonate', '💰 Donate', CreditCardIcon),

            S.divider(),

            // 9. Programs (List)
            S.listItem()
                .title('📦 Programs (List)')
                .icon(SparklesIcon)
                .child(
                    S.documentTypeList('program')
                        .title('All Programs')
                ),

            // 10. Testimonials (List)
            S.listItem()
                .title('💬 Testimonials (List)')
                .icon(HeartIcon)
                .child(
                    S.documentTypeList('testimonial')
                        .title('All Testimonials')
                ),
        ])

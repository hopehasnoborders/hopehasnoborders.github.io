// Export all schema types
import siteSettings from './siteSettings'
import pageHome from './pageHome'
import pageAbout from './pageAbout'
import pagePrograms from './pagePrograms'
import pageResources from './pageResources'
import pageStories from './pageStories'
import pageVolunteer from './pageVolunteer'
import program from './program'
import testimonial from './testimonial'
import product from './product'

export const schemaTypes = [
    // Singletons (one instance each)
    siteSettings,
    pageHome,
    pageAbout,
    pagePrograms,
    pageResources,
    pageStories,
    pageVolunteer,
    // Document types (multiple instances)
    program,
    testimonial,
    product,
]

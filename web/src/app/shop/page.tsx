import { sanityFetch } from '@/lib/sanity.server'
import ShopClientPage, { Product } from '@/components/shop/ShopClientPage'

// Include 'products' tag so this query gets revalidated when 'product' documents change
const productsQuery = `*[_type == "product" && active == true] | order(_createdAt desc) {
    _id,
    title_en,
    title_es,
    desc_en,
    desc_es,
    price,
    image,
    stripePaymentLink,
    active
}`

export default async function ShopPage() {
    const products = await sanityFetch<Product[]>({
        query: productsQuery,
        tags: ['products']
    })

    return <ShopClientPage products={products || []} />
}

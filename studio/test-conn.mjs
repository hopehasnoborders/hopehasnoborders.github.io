import { createClient } from '@sanity/client'

const client = createClient({
    projectId: '2p2ytq4s',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: 'skFiDFb23tEMsUuIIj9dLqcC2aFnF2DAk5d8q55RWkdUTxGyE4A79tFSLEHskZ4lBtbeJI4JdXgNYgDqrIJ2d2TErXOdpH6aXQGnMKig67ATqI155It3ZDsBDScuOxdmSgej6LP7WzVlTzdZujwwLpbsiI1eLCBq0u3U38PSWIrvEtGEsxok',
    useCdn: false,
})

async function test() {
    try {
        const result = await client.fetch('*[_type == "system.pause"][0]')
        console.log('✅ Connection successful!')
        console.log(result)
    } catch (err) {
        console.error('❌ Connection failed!')
        console.error(err.message)
        console.error(err.response?.body)
    }
}

test()

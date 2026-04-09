import type { MetadataRoute } from 'next'
import { fetchProperties } from '@/lib/api'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://inmobiliariadelnorte.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/propiedades`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/contacto`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  try {
    const { data } = await fetchProperties({ per_page: 100 })
    const propertyRoutes: MetadataRoute.Sitemap = data.map((p) => ({
      url: `${BASE_URL}/propiedades/${p.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
    return [...staticRoutes, ...propertyRoutes]
  } catch {
    return staticRoutes
  }
}

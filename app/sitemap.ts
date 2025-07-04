import { MetadataRoute } from 'next'
import { getAllProjects } from '@/actions/project'
import { getAllPropertySlugs } from '@/actions/property'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://stablebricks.com'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/investments`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/properties`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculator`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/partnerships`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/investor-relations`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/land-submissions`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  // Dynamic project pages
  const projectsResult = await getAllProjects()
  const projectPages = projectsResult.success && projectsResult.projects 
    ? projectsResult.projects.map((project: any) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: new Date(project.updatedAt || project.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))
    : []

  // Dynamic property pages
  const propertiesResult = await getAllPropertySlugs()
  const propertyPages = propertiesResult.success && propertiesResult.properties
    ? propertiesResult.properties.map((property: any) => ({
        url: `${baseUrl}/properties/${property.slug}`,
        lastModified: new Date(property.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))
    : []

  return [...staticPages, ...projectPages, ...propertyPages]
}

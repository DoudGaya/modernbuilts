import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getPropertyBySlug } from '@/actions/property'
import PropertyDetailClient from './PropertyDetailClient'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const result = await getPropertyBySlug(slug)
  
  if (!result.success || !result.property) {
    return {
      title: 'Property Not Found',
      description: 'The requested property could not be found.',
    }
  }

  const { property } = result
  
  const title = `${property.title} - ${property.location || 'Nigeria'}`
  const description = property.description || `Premium ${property.type || 'property'} in ${property.location || 'Nigeria'}. ${property.bedrooms ? `${property.bedrooms} bedrooms` : ''} ${property.bathrooms ? `${property.bathrooms} bathrooms` : ''} ${property.area ? `${property.area} sqft` : ''}.`
  
  // Clean description to be under 160 characters
  const cleanDescription = description.length > 160 ? description.substring(0, 157) + '...' : description
  
  const ogImageUrl = `/api/og/property?title=${encodeURIComponent(property.title)}&location=${encodeURIComponent(property.location || 'Nigeria')}&price=${encodeURIComponent(property.price ? `₦${property.price.toLocaleString()}` : 'Contact for Price')}&type=${encodeURIComponent(property.type || 'Property')}&bedrooms=${encodeURIComponent(property.bedrooms?.toString() || '0')}&bathrooms=${encodeURIComponent(property.bathrooms?.toString() || '0')}&size=${encodeURIComponent(property.area || 'N/A')}`

  return {
    title,
    description: cleanDescription,
    keywords: [
      `${property.title}`,
      `${property.type || 'property'} for sale`,
      `${property.location || 'Nigeria'} real estate`,
      `${property.location || 'Nigeria'} property`,
      'real estate investment',
      'property investment Nigeria',
      'buy property Nigeria',
      'real estate Lagos',
      'property for sale',
      'investment property',
      'Nigerian real estate',
      'property listing',
      'real estate deals',
      'property investment opportunities',
      'commercial property',
      'residential property'
    ],
    authors: [{ name: 'StableBricks' }],
    creator: 'StableBricks',
    publisher: 'StableBricks',
    alternates: {
      canonical: `/properties/${slug}`,
    },
    openGraph: {
      title,
      description: cleanDescription,
      url: `/properties/${slug}`,
      siteName: 'StableBricks',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${property.title} - ${property.location || 'Nigeria'}`,
        },
      ],
      locale: 'en_NG',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: cleanDescription,
      images: [ogImageUrl],
      creator: '@stablebricks',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params
  const result = await getPropertyBySlug(slug)
  
  if (!result.success || !result.property) {
    notFound()
  }

  return <PropertyDetailClient property={result.property} />
}

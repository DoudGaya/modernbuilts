import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || 'Premium Property'
    const location = searchParams.get('location') || 'Nigeria'
    const price = searchParams.get('price') || 'Contact for Price'
    const type = searchParams.get('type') || 'Property'
    const bedrooms = searchParams.get('bedrooms') || ''
    const bathrooms = searchParams.get('bathrooms') || ''

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8fafc',
            backgroundImage: 'linear-gradient(45deg, #f8fafc 0%, #e2e8f0 100%)',
            position: 'relative',
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(251, 191, 36, 0.1) 2px, transparent 0)',
              backgroundSize: '50px 50px',
            }}
          />
          
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '0 60px',
              position: 'absolute',
              top: '40px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#1f2937',
              }}
            >
              StableBricks
            </div>
            <div
              style={{
                backgroundColor: '#f59e0b',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '18px',
                fontWeight: 'bold',
              }}
            >
              {type}
            </div>
          </div>

          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '0 60px',
              maxWidth: '1000px',
            }}
          >
            <h1
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '20px',
                lineHeight: '1.2',
                textAlign: 'center',
                maxWidth: '900px',
              }}
            >
              {title}
            </h1>
            
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '24px',
                color: '#6b7280',
                marginBottom: '40px',
              }}
            >
              📍 {location}
            </div>

            {/* Stats */}
            <div
              style={{
                display: 'flex',
                gap: '40px',
                marginTop: '20px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  padding: '20px 30px',
                  borderRadius: '16px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>
                  {price}
                </div>
                <div style={{ fontSize: '16px', color: '#6b7280' }}>
                  Price
                </div>
              </div>
              
              {bedrooms && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    padding: '20px 30px',
                    borderRadius: '16px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#3b82f6' }}>
                    {bedrooms}
                  </div>
                  <div style={{ fontSize: '16px', color: '#6b7280' }}>
                    Bedrooms
                  </div>
                </div>
              )}

              {bathrooms && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    padding: '20px 30px',
                    borderRadius: '16px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b' }}>
                    {bathrooms}
                  </div>
                  <div style={{ fontSize: '16px', color: '#6b7280' }}>
                    Bathrooms
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              display: 'flex',
              alignItems: 'center',
              fontSize: '18px',
              color: '#6b7280',
            }}
          >
            Premium Properties • Trusted Developers • Quality Assurance
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}

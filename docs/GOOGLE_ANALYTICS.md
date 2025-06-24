# Google Analytics Integration

This document explains how to use the Google Analytics tracking implementation in the StableBricks application.

## Setup

Google Analytics has been integrated using your tracking ID: `G-959D9FJV28`

## Configuration

### Environment Variables (Optional)

You can override the default tracking ID by setting environment variables:

```bash
# .env.local
NEXT_PUBLIC_GA_ID=G-959D9FJV28
NEXT_PUBLIC_GA_ENABLED=true
```

### Production vs Development

- **Production**: Analytics is automatically enabled
- **Development**: Analytics is disabled by default (set `NEXT_PUBLIC_GA_ENABLED=true` to enable in development)

## Features

### 1. Automatic Page Tracking
- Tracks all page views automatically
- Works with Next.js App Router navigation
- Includes search parameters in tracking

### 2. Event Tracking
Pre-built tracking functions for common StableBricks events:

#### Investment Events
```javascript
import { trackInvestmentView, trackInvestmentInterest, trackInvestmentComplete } from '@/lib/tracking'

// Track when user views an investment opportunity
trackInvestmentView('project-123', 'Lagos Residential Complex')

// Track when user shows interest
trackInvestmentInterest('project-123', 'Lagos Residential Complex', 500000)

// Track completed investment
trackInvestmentComplete('project-123', 'Lagos Residential Complex', 500000)
```

#### User Engagement
```javascript
import { trackCalculatorUse, trackContactForm, trackNewsletterSignup } from '@/lib/tracking'

// Track calculator usage
trackCalculatorUse('residential', 1000000)

// Track contact form submissions
trackContactForm('investment_inquiry')

// Track newsletter signups
trackNewsletterSignup('footer')
```

#### Property & Project Views
```javascript
import { trackPropertyView, trackProjectView } from '@/lib/tracking'

// Track property views
trackPropertyView('prop-456', 'Luxury Villa in Victoria Island')

// Track project views
trackProjectView('proj-789', 'Abuja Commercial Plaza')
```

#### Authentication Events
```javascript
import { trackUserRegistration, trackUserLogin } from '@/lib/tracking'

// Track user registration
trackUserRegistration('email')

// Track user login
trackUserLogin('email')
```

### 3. Custom Event Tracking
For custom events, use the base tracking function:

```javascript
import { trackEvent } from '@/components/analytics/GoogleAnalytics'

// Custom event tracking
trackEvent('action', 'category', 'label', value)

// Example: Track PDF download
trackEvent('download', 'document', 'investment_brochure', 1)
```

## Usage Examples

### In React Components

```jsx
import { useEffect } from 'react'
import { trackInvestmentView } from '@/lib/tracking'

function InvestmentPage({ project }) {
  useEffect(() => {
    // Track investment page view
    trackInvestmentView(project.id, project.name)
  }, [project])

  const handleInvestmentInterest = () => {
    trackInvestmentInterest(project.id, project.name, investmentAmount)
    // Handle investment logic...
  }

  return (
    <div>
      <h1>{project.name}</h1>
      <button onClick={handleInvestmentInterest}>
        Show Interest
      </button>
    </div>
  )
}
```

### In Server Actions

```javascript
'use server'

import { trackInvestmentComplete } from '@/lib/tracking'

export async function completeInvestment(projectId, amount) {
  // Server logic...
  
  // Note: Server-side tracking requires additional setup
  // Consider tracking on client-side after successful server action
}
```

### In Form Submissions

```jsx
import { trackContactForm } from '@/lib/tracking'

function ContactForm() {
  const handleSubmit = async (formData) => {
    // Track form submission
    trackContactForm('general_inquiry')
    
    // Submit form...
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  )
}
```

## Analytics Dashboard

After deployment, you can view analytics data in your Google Analytics dashboard:

1. Go to [Google Analytics](https://analytics.google.com)
2. Select your property (G-959D9FJV28)
3. View real-time data, events, and user behavior

## Key Metrics to Monitor

### E-commerce Events
- Investment completions
- Average investment amount
- Most popular projects

### User Engagement
- Page views and session duration
- Calculator usage
- Contact form submissions
- Newsletter signups

### Content Performance
- Blog post views
- Most viewed properties/projects
- Popular pages

### User Journey
- Registration and login patterns
- Path to investment completion
- Drop-off points in investment flow

## Privacy Compliance

The implementation includes:
- Only loads in production (privacy-friendly for development)
- GDPR-compliant event tracking
- No personally identifiable information in standard tracking

## Debugging

To verify tracking is working:

1. Open browser developer tools
2. Go to Console tab
3. Look for gtag events being fired
4. Check Network tab for requests to google-analytics.com

## Best Practices

1. **Track User Journey**: Focus on tracking the complete investment journey
2. **Conversion Goals**: Set up goals in Google Analytics for key actions
3. **Regular Review**: Check analytics data weekly to understand user behavior
4. **A/B Testing**: Use data to test different page layouts and flows
5. **Performance**: Keep tracking lightweight and non-blocking

## Troubleshooting

### Events Not Showing
- Check browser console for errors
- Verify GA_TRACKING_ID is correct
- Ensure tracking is enabled in production

### Development Testing
- Set `NEXT_PUBLIC_GA_ENABLED=true` in `.env.local`
- Use Google Analytics DebugView for real-time testing

For support or questions about the analytics implementation, contact the development team.

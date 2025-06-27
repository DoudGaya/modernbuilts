/**
 * Public Routes: Routes that are accessible to the public 
 * @type {[String]}
 */
export const publicRoutes = [
    '/',
    '/about',
    '/contact',
    '/blog',
    '/blog/:slug',
    '/email-verification',
    '/investments',
    '/investments/:slug',
    '/portfolio',
    '/properties',
    '/properties/:slug',
    '/projects/:slug',
    '/calculator',
    '/partnerships',
    '/investor-relations',
    '/land-submissions',
    '/user-investment/:token',
    '/privacy-policy',
    '/terms-of-service',
    '/cookie-policy',
]



/**
 * Public Routes: Routes that are used for authentication
 * routes will redirrect logged in users to dashbord 
 * @type { [String] }
 */


export const authRoutes = [
    '/login',
    '/register',
    '/error',
    '/forgot-password',
    '/new-password',
]

/**
 * Public Routes: Routes that are accessible to the public 
 * @type {String}
 * 
 */
export const apiRoutesPrefix = '/api/auth'


export const DEFAULT_LOGGED_IN_REDIRRECT = '/user/dashboard'
export const ADMIN_LOGGED_IN_REDIRRECT = '/admin/dashboard'

export * from './routes/index';
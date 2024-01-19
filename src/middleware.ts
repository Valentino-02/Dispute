export { default } from 'next-auth/middleware'

/* export default authMiddleware({
  publicRoutes: [
    '/api/uploadthing',
    '/api/socket',
    'api/auth',
    '/',
    '/newUser',
  ],
}) 

matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],

*/

export const config = {
  matcher: ['/servers/:path*', '/home', '/invite/:path*'],
}

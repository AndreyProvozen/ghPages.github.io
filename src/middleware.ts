export { default } from 'next-auth/middleware';

export const config = { matcher: ['/links/', '/links/:path*'] };

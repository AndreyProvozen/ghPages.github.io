/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'http://localhost:3000',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/auth', '/_error', '/links/*/'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: ['/', '/links'],
        disallow: ['/auth', '/_error', '/links/*/'],
      },
    ],
    additionalSitemaps: ['http://localhost:3000/sitemap.xml'],
  },
};

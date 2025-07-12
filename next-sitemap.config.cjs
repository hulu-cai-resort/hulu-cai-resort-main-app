const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  generateIndexSitemap: false, // We handle sitemap with app/sitemap.ts
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/admin/*',
      },
      {
        userAgent: '*',
        disallow: '/api/*',
      },
    ],
  },
}

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/auth/', '/store/', '/loading/'],
    },
    sitemap: 'https://www.teknova.com/sitemap.xml',
  }
}
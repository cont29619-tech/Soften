import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'Soften'
const SITE_URL = 'https://soften.app'
const DEFAULT_OG = '/og-image.png'

export default function SEO({
  title,
  description,
  canonical,
  ogImage,
  type = 'website',
  jsonLd,
}) {
  const fullTitle = `${title} | ${SITE_NAME}`
  const canonicalUrl = canonical ?? (typeof window !== 'undefined' ? window.location.href : SITE_URL)

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage ?? DEFAULT_OG} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage ?? DEFAULT_OG} />
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  )
}

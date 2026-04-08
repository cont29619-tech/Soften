import { Link } from 'react-router-dom'

export default function Breadcrumbs({ crumbs }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      ...(crumb.href ? { item: `https://soften.app${crumb.href}` } : {}),
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="breadcrumb" className="text-sm text-charcoal/50 mb-6">
        <ol className="flex flex-wrap items-center gap-1">
          {crumbs.map((crumb, i) => (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden="true">›</span>}
              {crumb.href && i < crumbs.length - 1 ? (
                <Link to={crumb.href} className="hover:text-sage transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current={i === crumbs.length - 1 ? 'page' : undefined} className="text-charcoal/70">
                  {crumb.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}

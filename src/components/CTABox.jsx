import { Link } from 'react-router-dom'

const VARIANT_STYLES = {
  sage:  'bg-sage/10 border-sage/30',
  clay:  'bg-clay/10 border-clay/30',
  ocean: 'bg-ocean/10 border-ocean/30',
}

const LINK_STYLES = {
  sage:  'bg-sage text-white hover:bg-sage/90',
  clay:  'bg-clay text-white hover:bg-clay/90',
  ocean: 'bg-ocean text-white hover:bg-ocean/90',
}

export default function CTABox({ title, body, linkTo, linkLabel, variant = 'sage' }) {
  const boxClass = VARIANT_STYLES[variant] ?? VARIANT_STYLES.sage
  const btnClass = LINK_STYLES[variant] ?? LINK_STYLES.sage

  return (
    <aside className={`my-8 p-6 rounded-2xl border ${boxClass}`}>
      <h3 className="font-semibold text-charcoal text-lg mb-1">{title}</h3>
      {body && <p className="text-sm text-charcoal/65 mb-4">{body}</p>}
      <Link
        to={linkTo}
        className={`inline-block text-sm font-medium px-4 py-2 rounded-xl transition-colors ${btnClass}`}
      >
        {linkLabel}
      </Link>
    </aside>
  )
}

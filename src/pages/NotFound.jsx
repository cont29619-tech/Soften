import { Link } from 'react-router-dom'
import SEO from '../components/SEO.jsx'

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="This page doesn't exist. Find free nervous system regulation tools on Soften."
      />
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-6">🌿</div>
        <h1 className="text-3xl font-semibold text-charcoal mb-3">Page not found</h1>
        <p className="text-charcoal/60 mb-8 leading-relaxed">
          This page doesn't exist, but your nervous system still deserves support.
          Here's where you can go:
        </p>
        <div className="flex flex-col gap-3 items-center">
          <Link
            to="/tools/breathing-exercise"
            className="w-full max-w-xs bg-sos text-white font-medium py-3 rounded-xl hover:bg-sos/90 transition-colors"
          >
            I need calm now
          </Link>
          <Link
            to="/tools"
            className="w-full max-w-xs bg-sage text-white font-medium py-3 rounded-xl hover:bg-sage/90 transition-colors"
          >
            All tools
          </Link>
          <Link
            to="/check-in"
            className="w-full max-w-xs border border-charcoal/20 text-charcoal font-medium py-3 rounded-xl hover:border-sage/40 transition-colors"
          >
            Daily check-in
          </Link>
          <Link to="/" className="text-sm text-sage hover:underline mt-2">
            ← Back to home
          </Link>
        </div>
      </div>
    </>
  )
}

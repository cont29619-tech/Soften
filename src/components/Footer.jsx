import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-charcoal/5 border-t border-charcoal/10 mt-20">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <Link to="/" className="text-xl font-semibold text-sage">Soften</Link>
            <p className="mt-2 text-sm text-charcoal/55 leading-relaxed">
              Your nervous system first aid kit. Free, instant, no sign-up required.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-charcoal/70 uppercase tracking-wide mb-3">Navigate</h3>
            <ul className="space-y-2">
              {[
                { to: '/tools', label: 'All Tools' },
                { to: '/check-in', label: 'Daily Check-In' },
                { to: '/learn', label: 'Learn' },
                { to: '/blog', label: 'Blog' },
                { to: '/about', label: 'About' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-charcoal/55 hover:text-sage transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Crisis resources */}
          <div>
            <h3 className="text-sm font-semibold text-charcoal/70 uppercase tracking-wide mb-3">Need More Help?</h3>
            <p className="text-sm text-charcoal/55 mb-2">
              If you're in crisis, help is available right now:
            </p>
            <p className="text-sm font-medium text-sos">
              Call or text <strong>988</strong> — Suicide & Crisis Lifeline
            </p>
            <p className="text-sm text-charcoal/55 mt-2">
              Available 24/7, free, confidential.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-charcoal/10 pt-8">
          <p className="text-xs text-charcoal/45 leading-relaxed max-w-3xl">
            Soften is a free wellness resource for educational and self-care purposes only. It is not therapy,
            medical advice, or a substitute for professional mental health treatment. If you are in crisis or
            experiencing a mental health emergency, please contact the 988 Suicide & Crisis Lifeline (call or
            text 988) or go to your nearest emergency room. This site is not affiliated with Somatic
            Experiencing® International.
          </p>
          <p className="text-xs text-charcoal/35 mt-4">
            © {new Date().getFullYear()} Soften. An independent wellness resource.
          </p>
        </div>
      </div>
    </footer>
  )
}

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../../components/SEO.jsx'

const ARTICLES = [
  {
    href: '/learn/nervous-system-101',
    icon: '🧠',
    title: 'Your Nervous System 101',
    description: 'Understand the autonomic nervous system — sympathetic, parasympathetic, and dorsal vagal — in plain language.',
    readTime: '7 min',
  },
  {
    href: '/learn/window-of-tolerance',
    icon: '↕️',
    title: 'The Window of Tolerance',
    description: 'What hyperarousal and hypoarousal look like, why they happen, and how to widen your window over time.',
    readTime: '6 min',
  },
  {
    href: '/learn/why-body-holds-stress',
    icon: '💫',
    title: 'Why Your Body Holds Onto Stress',
    description: 'Somatic memory, muscle holding patterns, and why talking alone isn\'t always enough.',
    readTime: '7 min',
  },
  {
    href: '/learn/polyvagal-theory',
    icon: '🔬',
    title: 'What Is Polyvagal Theory?',
    description: 'Stephen Porges\' three-state model of the nervous system — and what it means for your everyday life.',
    readTime: '8 min',
  },
]

export default function LearnOverview() {
  return (
    <>
      <SEO
        title="Understanding Your Nervous System — Free Guides"
        description="Free guides to nervous system 101, the window of tolerance, polyvagal theory, and why your body holds stress. Written in plain language for everyday people."
        canonical="https://soften.app/learn"
      />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-charcoal mb-3">Understand Your Nervous System</h1>
          <p className="text-charcoal/60 text-lg max-w-xl mx-auto leading-relaxed">
            Knowledge is power. When you understand what's happening in your body, the sensations become
            less frightening — and the tools make more sense.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {ARTICLES.map((article, i) => (
            <motion.div
              key={article.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={article.href}
                className="flex flex-col h-full bg-white rounded-2xl p-6 shadow-sm border border-charcoal/8 hover:border-sage/40 hover:shadow-md transition-all group"
              >
                <div className="text-3xl mb-4">{article.icon}</div>
                <h2 className="font-semibold text-charcoal text-lg mb-2 group-hover:text-sage transition-colors">
                  {article.title}
                </h2>
                <p className="text-sm text-charcoal/60 leading-relaxed flex-1 mb-4">
                  {article.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-sage font-medium">Read →</span>
                  <span className="text-xs text-charcoal/35">{article.readTime} read</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center p-6 bg-sage/8 rounded-2xl">
          <p className="text-charcoal/65 mb-3 text-sm">
            Ready to put this knowledge into practice?
          </p>
          <Link
            to="/tools"
            className="inline-block bg-sage text-white font-medium px-5 py-2.5 rounded-xl hover:bg-sage/90 transition-colors text-sm"
          >
            Explore the tools →
          </Link>
        </div>
      </div>
    </>
  )
}

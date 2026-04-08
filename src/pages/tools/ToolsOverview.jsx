import { motion } from 'framer-motion'
import SEO from '../../components/SEO.jsx'
import ToolCard from '../../components/ToolCard.jsx'
import { firstAidTools, deeperTools } from '../../data/tools.js'

export default function ToolsOverview() {
  return (
    <>
      <SEO
        title="Free Nervous System Regulation Tools"
        description="Browse all free nervous system regulation tools — breathing exercises, grounding techniques, body scan, therapeutic shaking, and more. No sign-up required."
        canonical="https://soften.ink/tools"
      />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-charcoal mb-3">Nervous System Regulation Tools</h1>
          <p className="text-charcoal/60 text-lg max-w-xl mx-auto">
            Pick a tool that fits your moment. Each one takes under 5 minutes — and every one is free.
          </p>
        </div>

        {/* First Aid section */}
        <section aria-labelledby="first-aid-heading" className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <h2 id="first-aid-heading" className="text-xl font-semibold text-charcoal">First Aid — Quick Relief</h2>
            <span className="text-xs bg-sos/10 text-sos px-2.5 py-0.5 rounded-full font-medium">Start here</span>
          </div>
          <p className="text-charcoal/55 text-sm mb-6">
            These tools work fast. Use them when anxiety, overwhelm, or panic needs an immediate response.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {firstAidTools.map((tool, i) => (
              <motion.div
                key={tool.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <ToolCard tool={tool} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Go Deeper section */}
        <section aria-labelledby="deeper-heading">
          <div className="flex items-center gap-3 mb-6">
            <h2 id="deeper-heading" className="text-xl font-semibold text-charcoal">Go Deeper — Build Resilience</h2>
            <span className="text-xs bg-sage/15 text-sage px-2.5 py-0.5 rounded-full font-medium">Somatic</span>
          </div>
          <p className="text-charcoal/55 text-sm mb-6">
            These take a little longer and work at a deeper level. Best used when you have some quiet time
            and aren't in acute crisis.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {deeperTools.map((tool, i) => (
              <motion.div
                key={tool.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 + i * 0.08 }}
              >
                <ToolCard tool={tool} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Not sure where to start */}
        <div className="mt-14 bg-sage/8 rounded-2xl p-7 text-center">
          <p className="text-charcoal/70 mb-3">Not sure which tool to use?</p>
          <a
            href="/check-in"
            className="inline-block bg-sage text-white font-medium px-6 py-2.5 rounded-xl hover:bg-sage/90 transition-colors"
          >
            Take a quick body check-in →
          </a>
          <p className="text-xs text-charcoal/40 mt-2">Takes 30 seconds. We'll suggest the right tool for how you feel.</p>
        </div>
      </div>
    </>
  )
}

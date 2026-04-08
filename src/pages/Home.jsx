import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO.jsx'
import ToolCard from '../components/ToolCard.jsx'
import BlogPostCard from '../components/BlogPostCard.jsx'
import { firstAidTools, deeperTools } from '../data/tools.js'
import { allPosts } from './blog/posts/index.js'

const LEARN_CARDS = [
  {
    href: '/learn/nervous-system-101',
    icon: '🧠',
    title: 'Nervous System 101',
    description: 'Sympathetic, parasympathetic, and dorsal vagal — explained simply.',
  },
  {
    href: '/learn/window-of-tolerance',
    icon: '↕️',
    title: 'Window of Tolerance',
    description: 'What it is and how to widen yours over time.',
  },
  {
    href: '/learn/why-body-holds-stress',
    icon: '💫',
    title: 'Why Your Body Holds Stress',
    description: 'The science of somatic memory and stored tension.',
  },
  {
    href: '/learn/polyvagal-theory',
    icon: '🔬',
    title: 'Polyvagal Theory',
    description: 'The three-state nervous system model, made accessible.',
  },
]

const recentPosts = allPosts.slice(0, 3)

function FadeInSection({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  return (
    <>
      <SEO
        title="Your Nervous System First Aid Kit — Free, Instant, No Sign-Up"
        description="Free nervous system regulation tools based on somatic principles and polyvagal theory. Breathing exercises, grounding techniques, body scans, and more. No account needed."
        canonical="https://soften.app"
      />

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 pt-16 pb-14 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-semibold text-charcoal leading-tight mb-4"
        >
          Your Nervous System<br />
          <span className="text-sage">First Aid Kit</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-charcoal/60 max-w-xl mx-auto mb-8 leading-relaxed"
        >
          Free tools to help you feel safe, grounded, and calm — in under 5 minutes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
        >
          <Link
            to="/tools/breathing-exercise"
            className="w-full sm:w-auto bg-sage text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-sage/90 transition-colors text-base"
          >
            I need calm now
          </Link>
          <Link
            to="/check-in"
            className="w-full sm:w-auto border border-charcoal/20 text-charcoal font-medium px-7 py-3.5 rounded-xl hover:border-sage/50 hover:text-sage transition-colors text-base"
          >
            Start daily check-in
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xs text-charcoal/40"
        >
          Based on somatic principles, polyvagal theory, and nervous system science. No sign-up. No cost.
        </motion.p>
      </section>

      {/* What Soften is */}
      <section className="bg-sage/6 border-y border-sage/15 py-10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-charcoal/70 text-base leading-relaxed max-w-2xl mx-auto">
            When stress, anxiety, or overwhelm hits, your body needs support. Soften gives you instant
            access to body-based exercises that help regulate your nervous system. Like a first aid kit
            for your nervous system — you open it when things get hard.{' '}
            <strong className="text-charcoal/80">No sign-up. No cost. Just relief.</strong>
          </p>
        </div>
      </section>

      {/* First Aid Tools */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <FadeInSection>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-semibold text-charcoal">First Aid Tools</h2>
            <span className="text-xs bg-sos/10 text-sos px-2.5 py-0.5 rounded-full font-medium">Quick relief</span>
          </div>
          <p className="text-charcoal/55 text-sm mb-6">These work fast. Open one when you need help right now.</p>
        </FadeInSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {firstAidTools.map((tool, i) => (
            <FadeInSection key={tool.slug} delay={i * 0.07}>
              <ToolCard tool={tool} />
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* Go Deeper */}
      <section className="max-w-5xl mx-auto px-4 pb-14">
        <FadeInSection>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-semibold text-charcoal">Go Deeper</h2>
            <span className="text-xs bg-sage/15 text-sage px-2.5 py-0.5 rounded-full font-medium">Build resilience</span>
          </div>
          <p className="text-charcoal/55 text-sm mb-6">Somatic practices that build your nervous system's long-term capacity.</p>
        </FadeInSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {deeperTools.map((tool, i) => (
            <FadeInSection key={tool.slug} delay={i * 0.07}>
              <ToolCard tool={tool} />
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* Check-in CTA */}
      <section className="bg-ocean/6 border-y border-ocean/15 py-12">
        <FadeInSection>
          <div className="max-w-2xl mx-auto px-4 text-center">
            <p className="text-xl font-semibold text-charcoal mb-2">Not sure where to start?</p>
            <p className="text-charcoal/60 mb-5">
              Take a quick body check-in and we'll suggest the right tool for you.
            </p>
            <Link
              to="/check-in"
              className="inline-block bg-ocean text-white font-medium px-6 py-3 rounded-xl hover:bg-ocean/90 transition-colors"
            >
              How does your body feel right now? →
            </Link>
          </div>
        </FadeInSection>
      </section>

      {/* Learn section */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <FadeInSection>
          <h2 className="text-2xl font-semibold text-charcoal mb-2">Understand Your Body</h2>
          <p className="text-charcoal/55 text-sm mb-6">
            Knowledge is power. When you understand what's happening in your nervous system, it becomes less scary.
          </p>
        </FadeInSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LEARN_CARDS.map((card, i) => (
            <FadeInSection key={card.href} delay={i * 0.07}>
              <Link
                to={card.href}
                className="block bg-white rounded-2xl p-5 shadow-sm border border-charcoal/8 hover:border-sage/40 hover:shadow-md transition-all h-full"
              >
                <div className="text-2xl mb-3">{card.icon}</div>
                <h3 className="font-semibold text-charcoal text-base mb-1">{card.title}</h3>
                <p className="text-sm text-charcoal/60 leading-relaxed">{card.description}</p>
                <div className="mt-3 text-sm text-sage font-medium">Read →</div>
              </Link>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* Blog preview */}
      <section className="max-w-5xl mx-auto px-4 pb-14">
        <FadeInSection>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-charcoal">Latest from the Blog</h2>
            <Link to="/blog" className="text-sm text-sage hover:underline font-medium">
              All posts →
            </Link>
          </div>
        </FadeInSection>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recentPosts.map((post, i) => (
            <FadeInSection key={post.slug} delay={i * 0.08}>
              <BlogPostCard post={post} />
            </FadeInSection>
          ))}
        </div>
      </section>
    </>
  )
}

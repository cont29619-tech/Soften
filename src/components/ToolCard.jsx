import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ToolCard({ tool, showTags = true }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        to={`/tools/${tool.slug}`}
        className="block h-full glass-card rounded-2xl p-6 group focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
        aria-label={`${tool.title} — ${tool.description}`}
      >
        <div className="text-2xl mb-3" aria-hidden="true">{tool.icon}</div>
        <h3 className="font-semibold text-charcoal text-base mb-1">{tool.title}</h3>
        <p className="text-sm text-charcoal/60 leading-relaxed mb-3">{tool.description}</p>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          {showTags && tool.tags?.slice(0, 2).map(tag => (
            <span
              key={tag}
              className="text-xs bg-sage/10 text-sage px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
          <span className="text-xs text-charcoal/40 ml-auto">{tool.duration}</span>
        </div>
        <div className="mt-3 text-sm text-sage font-medium">Try now →</div>
      </Link>
    </motion.div>
  )
}

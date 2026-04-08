import { tools } from '../data/tools.js'
import ToolCard from './ToolCard.jsx'

export default function RelatedTools({ currentSlug, tags = [] }) {
  const related = tools
    .filter(t => t.slug !== currentSlug)
    .filter(t => tags.some(tag => t.tags.includes(tag)))
    .slice(0, 3)

  // Fallback: just grab first 3 tools if no tag matches
  const display = related.length > 0 ? related : tools.filter(t => t.slug !== currentSlug).slice(0, 3)

  return (
    <section aria-labelledby="related-tools-heading" className="mt-12 pt-10 border-t border-charcoal/10">
      <h2 id="related-tools-heading" className="text-xl font-semibold text-charcoal mb-6">
        Related Tools
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {display.map(tool => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  )
}

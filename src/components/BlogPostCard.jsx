import { Link } from 'react-router-dom'

const CATEGORY_COLORS = {
  Exercises: 'bg-sage/10 text-sage',
  Science:   'bg-ocean/10 text-ocean',
  'Daily Life': 'bg-clay/20 text-clay',
  Recovery:  'bg-sos/10 text-sos',
}

export default function BlogPostCard({ post }) {
  const categoryClass = CATEGORY_COLORS[post.category] ?? 'bg-charcoal/10 text-charcoal/60'

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="block bg-white rounded-2xl p-5 shadow-sm border border-charcoal/8 hover:border-sage/40 hover:shadow-md transition-all group"
      aria-label={post.title}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryClass}`}>
          {post.category}
        </span>
        <span className="text-xs text-charcoal/40">{post.readingTime} min read</span>
      </div>
      <h3 className="font-semibold text-charcoal text-base leading-snug mb-2 group-hover:text-sage transition-colors">
        {post.title}
      </h3>
      <p className="text-sm text-charcoal/60 leading-relaxed line-clamp-2">{post.excerpt}</p>
      <div className="mt-3 text-sm text-sage font-medium">Read more →</div>
    </Link>
  )
}

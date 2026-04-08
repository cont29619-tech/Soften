import { useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../../components/SEO.jsx'
import BlogPostCard from '../../components/BlogPostCard.jsx'
import { allPosts } from './posts/index.js'

const CATEGORIES = ['All', 'Exercises', 'Science', 'Daily Life', 'Recovery']

export default function BlogListing() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? allPosts
    : allPosts.filter(p => p.category === activeCategory)

  return (
    <>
      <SEO
        title="Soften Blog — Nervous System Tips, Somatic Exercises & Wellness Guides"
        description="Practical guides to calming your nervous system, understanding somatic exercises, polyvagal theory, and building resilience. Free articles from the Soften team."
        canonical="https://soften.app/blog"
      />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-semibold text-charcoal mb-3">The Soften Blog</h1>
          <p className="text-charcoal/60 text-lg max-w-xl mx-auto">
            Practical tips for calming your body, understanding your nervous system, and building resilience.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center" role="tablist" aria-label="Filter posts by category">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-sage text-white'
                  : 'bg-charcoal/8 text-charcoal/60 hover:bg-charcoal/12'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Post grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" role="tabpanel">
          {filtered.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <BlogPostCard post={post} />
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 text-charcoal/40">
              No posts in this category yet.
            </div>
          )}
        </div>
      </div>
    </>
  )
}

import { useParams, Link, Navigate } from 'react-router-dom'
import SEO from '../../components/SEO.jsx'
import Breadcrumbs from '../../components/Breadcrumbs.jsx'
import BlogPostCard from '../../components/BlogPostCard.jsx'
import { postsBySlug, allPosts } from './posts/index.js'

// Very simple markdown-to-JSX renderer for the subset of markdown used in posts
function renderMarkdown(text) {
  const lines = text.split('\n')
  const elements = []
  let i = 0
  let key = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      elements.push(<h2 key={key++} className="text-2xl font-semibold text-charcoal mt-8 mb-3">{parseInline(line.slice(3))}</h2>)
      i++
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={key++} className="text-xl font-semibold text-charcoal mt-6 mb-2">{parseInline(line.slice(4))}</h3>)
      i++
    } else if (line.startsWith('- ')) {
      // Collect consecutive list items
      const items = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <ul key={key++} className="list-disc pl-5 my-4 space-y-1.5">
          {items.map((item, j) => (
            <li key={j} className="text-charcoal/75 leading-relaxed">{parseInline(item)}</li>
          ))}
        </ul>
      )
    } else if (line.startsWith('| ') && lines[i + 1]?.startsWith('|---')) {
      // Simple table
      const headers = line.split('|').filter(c => c.trim()).map(c => c.trim())
      i += 2 // skip header and separator
      const rows = []
      while (i < lines.length && lines[i].startsWith('|')) {
        rows.push(lines[i].split('|').filter(c => c.trim()).map(c => c.trim()))
        i++
      }
      elements.push(
        <div key={key++} className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-sage/10">
                {headers.map((h, j) => (
                  <th key={j} className="text-left px-3 py-2 font-semibold text-charcoal border border-charcoal/10">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-charcoal/3'}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2 text-charcoal/70 border border-charcoal/10">{parseInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    } else if (line === '---') {
      elements.push(<hr key={key++} className="border-charcoal/10 my-8" />)
      i++
    } else if (line.trim() === '') {
      i++
    } else {
      // Paragraph
      elements.push(<p key={key++} className="text-charcoal/75 leading-relaxed mb-4">{parseInline(line)}</p>)
      i++
    }
  }

  return elements
}

function parseInline(text) {
  // Handle **bold**, *italic*, [link text](/path), and backtick `code`
  const parts = []
  let remaining = text
  let key = 0

  while (remaining.length > 0) {
    // Bold
    const boldMatch = remaining.match(/^(.*?)\*\*(.+?)\*\*(.*)$/)
    if (boldMatch) {
      if (boldMatch[1]) parts.push(<span key={key++}>{parseInline(boldMatch[1])}</span>)
      parts.push(<strong key={key++} className="font-semibold text-charcoal">{boldMatch[2]}</strong>)
      remaining = boldMatch[3]
      continue
    }

    // Italic (but not bold)
    const italicMatch = remaining.match(/^(.*?)(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)(.*)$/)
    if (italicMatch) {
      if (italicMatch[1]) parts.push(<span key={key++}>{parseInline(italicMatch[1])}</span>)
      parts.push(<em key={key++}>{italicMatch[2]}</em>)
      remaining = italicMatch[3]
      continue
    }

    // Link [text](/path)
    const linkMatch = remaining.match(/^(.*?)\[(.+?)\]\((.+?)\)(.*)$/)
    if (linkMatch) {
      if (linkMatch[1]) parts.push(<span key={key++}>{linkMatch[1]}</span>)
      const href = linkMatch[3]
      const isInternal = href.startsWith('/')
      if (isInternal) {
        parts.push(<Link key={key++} to={href} className="text-sage hover:underline">{linkMatch[2]}</Link>)
      } else {
        parts.push(<a key={key++} href={href} className="text-sage hover:underline" target="_blank" rel="noopener noreferrer">{linkMatch[2]}</a>)
      }
      remaining = linkMatch[4]
      continue
    }

    // No more inline markup — emit the rest as plain text
    parts.push(<span key={key++}>{remaining}</span>)
    break
  }

  return parts.length === 1 ? parts[0] : parts
}

const CATEGORY_COLORS = {
  Exercises:   'bg-sage/10 text-sage',
  Science:     'bg-ocean/10 text-ocean',
  'Daily Life':'bg-clay/20 text-clay',
  Recovery:    'bg-sos/10 text-sos',
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = postsBySlug[slug]

  if (!post) {
    return <Navigate to="/404" replace />
  }

  const categoryClass = CATEGORY_COLORS[post.category] ?? 'bg-charcoal/10 text-charcoal/60'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: post.author ?? 'Soften Editorial Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Soften',
      logo: { '@type': 'ImageObject', url: 'https://soften.ink/favicon.svg' },
    },
    image: `https://soften.ink${post.image ?? '/og-image.png'}`,
  }

  // Related posts: same category, not this post
  const related = allPosts
    .filter(p => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3)

  const fallbackRelated = allPosts
    .filter(p => p.slug !== post.slug)
    .slice(0, 3)

  const relatedPosts = related.length > 0 ? related : fallbackRelated

  const date = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })

  return (
    <>
      <SEO
        title={post.title}
        description={post.metaDescription}
        canonical={`https://soften.ink/blog/${post.slug}`}
        type="article"
        jsonLd={jsonLd}
      />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Breadcrumbs crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: post.title.length > 40 ? post.title.slice(0, 40) + '…' : post.title },
        ]} />

        {/* Post header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${categoryClass}`}>
              {post.category}
            </span>
            <span className="text-xs text-charcoal/40">{post.readingTime} min read</span>
            <span className="text-xs text-charcoal/35">{date}</span>
          </div>
          <h1 className="text-3xl font-semibold text-charcoal leading-snug">{post.title}</h1>
        </div>

        {/* Educational disclaimer for science posts */}
        {post.category === 'Science' && (
          <p className="text-xs text-charcoal/40 mb-6 italic">
            The information here is for educational purposes only and is simplified for accessibility.
            For clinical guidance, please consult a licensed professional.
          </p>
        )}

        {/* Post content */}
        <article className="mb-12">
          {renderMarkdown(post.content)}
        </article>

        {/* Author bio */}
        <div className="border-t border-charcoal/10 pt-6 mb-10">
          <p className="text-sm text-charcoal/50">
            Written by <span className="font-medium text-charcoal/70">{post.author ?? 'the Soften team'}</span>.
            Soften is a free, independent wellness resource based on somatic principles and polyvagal theory.
            <Link to="/about" className="text-sage hover:underline ml-1">About us →</Link>
          </p>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section aria-labelledby="related-posts-heading">
            <h2 id="related-posts-heading" className="text-xl font-semibold text-charcoal mb-5">Related Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map(p => (
                <BlogPostCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}

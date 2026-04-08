// Uses Vite's import.meta.glob to eagerly import all post files in this directory.
// Each post file exports a default object with slug, title, date, etc.
const modules = import.meta.glob('./*.js', { eager: true })

export const allPosts = Object.values(modules)
  .map(m => m.default)
  .filter(Boolean)
  .sort((a, b) => new Date(b.date) - new Date(a.date))

export const postsBySlug = Object.fromEntries(allPosts.map(p => [p.slug, p]))

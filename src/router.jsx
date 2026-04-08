import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from './components/Layout.jsx'

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div
        className="w-10 h-10 rounded-full border-4 border-sage border-t-transparent animate-spin"
        role="status"
        aria-label="Loading page"
      />
    </div>
  )
}

function wrap(importFn) {
  const Component = lazy(importFn)
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true,  element: wrap(() => import('./pages/Home.jsx')) },
      { path: 'about', element: wrap(() => import('./pages/About.jsx')) },
      {
        path: 'tools',
        children: [
          { index: true,  element: wrap(() => import('./pages/tools/ToolsOverview.jsx')) },
          { path: 'breathing-exercise',   element: wrap(() => import('./pages/tools/BreathingExercise.jsx')) },
          { path: 'grounding-54321',      element: wrap(() => import('./pages/tools/Grounding54321.jsx')) },
          { path: 'body-scan',            element: wrap(() => import('./pages/tools/BodyScan.jsx')) },
          { path: 'orienting',            element: wrap(() => import('./pages/tools/Orienting.jsx')) },
          { path: 'pendulation',          element: wrap(() => import('./pages/tools/Pendulation.jsx')) },
          { path: 'resourcing',           element: wrap(() => import('./pages/tools/Resourcing.jsx')) },
          { path: 'self-touch-grounding', element: wrap(() => import('./pages/tools/SelfTouchGrounding.jsx')) },
          { path: 'shake-it-off',         element: wrap(() => import('./pages/tools/ShakeItOff.jsx')) },
        ],
      },
      { path: 'check-in', element: wrap(() => import('./pages/checkin/CheckIn.jsx')) },
      {
        path: 'learn',
        children: [
          { index: true, element: wrap(() => import('./pages/learn/LearnOverview.jsx')) },
          { path: 'nervous-system-101',    element: wrap(() => import('./pages/learn/NervousSystem101.jsx')) },
          { path: 'window-of-tolerance',   element: wrap(() => import('./pages/learn/WindowOfTolerance.jsx')) },
          { path: 'why-body-holds-stress', element: wrap(() => import('./pages/learn/WhyBodyHoldsStress.jsx')) },
          { path: 'polyvagal-theory',      element: wrap(() => import('./pages/learn/PolyvagalTheory.jsx')) },
        ],
      },
      {
        path: 'blog',
        children: [
          { index: true, element: wrap(() => import('./pages/blog/BlogListing.jsx')) },
          { path: ':slug', element: wrap(() => import('./pages/blog/BlogPost.jsx')) },
        ],
      },
      { path: '*', element: wrap(() => import('./pages/NotFound.jsx')) },
    ],
  },
])

export default router

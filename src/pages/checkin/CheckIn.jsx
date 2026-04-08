import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../../components/SEO.jsx'
import { STATES } from './states.js'
import { getHistory, addEntry } from '../../utils/checkInStorage.js'

function HistoryDots({ history }) {
  if (!history.length) return null

  return (
    <div className="mt-8 pt-6 border-t border-charcoal/10">
      <h3 className="text-sm font-medium text-charcoal/60 mb-3">Your recent check-ins</h3>
      <div className="flex flex-wrap gap-2">
        {history.slice(-30).reverse().map((entry, i) => {
          const date = new Date(entry.date)
          const dateStr = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
          return (
            <div
              key={i}
              className="group relative"
              title={`${dateStr} — ${entry.stateLabel}`}
            >
              <div
                className="w-4 h-4 rounded-full cursor-default transition-transform group-hover:scale-125"
                style={{ backgroundColor: entry.dotColor }}
                role="img"
                aria-label={`${dateStr}: ${entry.stateLabel}`}
              />
              {/* Tooltip */}
              <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-charcoal text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                {dateStr}<br />{entry.stateLabel}
              </div>
            </div>
          )
        })}
      </div>
      <p className="text-xs text-charcoal/35 mt-2">Last 30 entries. Stored locally on your device only.</p>
    </div>
  )
}

export default function CheckIn() {
  const [selected, setSelected] = useState(null)
  const [history, setHistory] = useState([])

  useEffect(() => {
    setHistory(getHistory())
  }, [])

  function handleSelect(state) {
    setSelected(state)
    const updated = addEntry({
      stateId: state.id,
      stateLabel: state.label,
      dotColor: state.dotColor,
    })
    setHistory(updated)
    // Scroll to recommendation
    setTimeout(() => {
      document.getElementById('recommendation')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <>
      <SEO
        title="Daily Nervous System Check-In — How Does Your Body Feel?"
        description="A 30-second body check-in to understand your nervous system state and find the right regulation tool for how you feel right now."
        canonical="https://soften.ink/check-in"
      />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-serif text-charcoal mb-4">How Are You Right Now?</h1>
          <p className="text-charcoal/60 text-lg">
            A quick check-in with your body. Takes 30 seconds.
          </p>
        </div>

        {/* State selector */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10"
          role="radiogroup"
          aria-label="How does your body feel right now?"
        >
          {STATES.map((state, i) => (
            <motion.button
              key={state.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => handleSelect(state)}
              className={`flex flex-col items-center justify-center text-center p-6 rounded-[2rem] transition-all duration-300 ${
                selected?.id === state.id
                  ? 'border border-sage/30 bg-sage/15 shadow-md scale-[1.02]'
                  : 'glass-card hover:scale-[1.02]'
              }`}
              role="radio"
              aria-checked={selected?.id === state.id}
              aria-label={state.label}
            >
              <div className="text-4xl mb-3">{state.icon}</div>
              <p className="font-serif font-medium text-charcoal text-lg leading-tight mb-1">{state.label}</p>
              <p className="text-xs text-charcoal/60 leading-snug">{state.description}</p>
            </motion.button>
          ))}
        </div>

        {/* Recommendation */}
        <AnimatePresence>
        {selected && (
          <motion.div
            key={selected.id}
            id="recommendation"
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card rounded-3xl p-8 overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
              <span className="text-3xl bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-sm shrink-0">{selected.icon}</span>
              <div>
                <p className="font-serif text-xl font-medium text-charcoal mb-2">{selected.label}</p>
                <p className="text-charcoal/70 text-base leading-relaxed">{selected.recommendation.text}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to={`/tools/${selected.recommendation.toolSlug}`}
                className="bg-sage text-white font-medium px-6 py-3 rounded-2xl hover:bg-sage/90 shadow-sm hover:translate-y-[-2px] transition-all"
              >
                {selected.recommendation.toolLabel} →
              </Link>
              <button
                onClick={() => setSelected(null)}
                className="text-sm text-charcoal/50 hover:text-charcoal transition-colors underline underline-offset-4"
              >
                Choose again
              </button>
            </div>
          </motion.div>
        )}
        </AnimatePresence>

        {/* Motivational message */}
        <div className="mt-8 text-center">
          <p className="text-charcoal/50 text-sm italic">
            "Checking in with your body is a powerful act of self-care."
          </p>
        </div>

        {/* History dots */}
        <HistoryDots history={history} />

        {/* SEO paragraph */}
        <div className="mt-10 pt-8 border-t border-charcoal/10">
          <p className="text-sm text-charcoal/50 leading-relaxed">
            A daily nervous system check-in helps you build body awareness and catch dysregulation early —
            before it becomes overwhelming. Over time, you'll start to notice patterns: what times of day
            are harder, what events trigger your nervous system, and which tools work best for you.
            Learn more in our guide to{' '}
            <Link to="/learn/nervous-system-101" className="text-sage hover:underline">understanding your nervous system</Link>{' '}
            or explore the{' '}
            <Link to="/tools" className="text-sage hover:underline">full toolkit</Link>.
          </p>
        </div>
      </div>
    </>
  )
}

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
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
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold text-charcoal mb-2">How Are You Right Now?</h1>
          <p className="text-charcoal/60">
            A quick check-in with your body. Takes 30 seconds.
          </p>
        </div>

        {/* State selector */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8"
          role="radiogroup"
          aria-label="How does your body feel right now?"
        >
          {STATES.map((state, i) => (
            <motion.button
              key={state.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              onClick={() => handleSelect(state)}
              className={`text-left p-4 rounded-2xl border-2 transition-all ${
                selected?.id === state.id
                  ? 'border-sage bg-sage/8 shadow-sm'
                  : 'border-charcoal/10 bg-white hover:border-sage/40 hover:shadow-sm'
              }`}
              role="radio"
              aria-checked={selected?.id === state.id}
              aria-label={state.label}
            >
              <div className="text-2xl mb-2">{state.icon}</div>
              <p className="font-medium text-charcoal text-sm leading-tight">{state.label}</p>
              <p className="text-xs text-charcoal/50 mt-0.5 leading-snug">{state.description}</p>
            </motion.button>
          ))}
        </div>

        {/* Recommendation */}
        {selected && (
          <motion.div
            id="recommendation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-sage/25"
          >
            <div className="flex items-start gap-3 mb-4">
              <span className="text-2xl">{selected.icon}</span>
              <div>
                <p className="font-semibold text-charcoal">{selected.label}</p>
                <p className="text-charcoal/60 text-sm mt-1 leading-relaxed">{selected.recommendation.text}</p>
              </div>
            </div>
            <Link
              to={`/tools/${selected.recommendation.toolSlug}`}
              className="inline-block bg-sage text-white font-medium px-5 py-2.5 rounded-xl hover:bg-sage/90 transition-colors text-sm"
            >
              {selected.recommendation.toolLabel} →
            </Link>
            <button
              onClick={() => setSelected(null)}
              className="ml-3 text-sm text-charcoal/40 hover:text-charcoal transition-colors underline underline-offset-2"
            >
              Choose again
            </button>
          </motion.div>
        )}

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

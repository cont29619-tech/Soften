import { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import SEO from '../../components/SEO.jsx'
import Breadcrumbs from '../../components/Breadcrumbs.jsx'
import RelatedTools from '../../components/RelatedTools.jsx'
import CTABox from '../../components/CTABox.jsx'

const PATTERNS = {
  calm: {
    label: 'Calm Breath',
    description: 'Simple 4-count inhale and exhale. Perfect for beginners.',
    phases: [
      { id: 'inhale', label: 'Inhale',  duration: 4 },
      { id: 'exhale', label: 'Exhale',  duration: 4 },
    ],
  },
  box: {
    label: 'Box Breathing',
    description: 'Equal 4-count phases. Used to stay calm under pressure.',
    phases: [
      { id: 'inhale', label: 'Inhale',  duration: 4 },
      { id: 'hold1',  label: 'Hold',    duration: 4 },
      { id: 'exhale', label: 'Exhale',  duration: 4 },
      { id: 'hold2',  label: 'Hold',    duration: 4 },
    ],
  },
  '478': {
    label: '4-7-8 Breath',
    description: 'Inhale 4, hold 7, exhale 8. Activates the parasympathetic system.',
    phases: [
      { id: 'inhale', label: 'Inhale',  duration: 4 },
      { id: 'hold1',  label: 'Hold',    duration: 7 },
      { id: 'exhale', label: 'Exhale',  duration: 8 },
    ],
  },
}

const DURATIONS = [
  { value: 60,  label: '1 min' },
  { value: 180, label: '3 min' },
  { value: 300, label: '5 min' },
]

const CIRCLE_SCALE = {
  inhale: 1.45,
  hold1:  1.45,
  exhale: 1.0,
  hold2:  1.0,
  idle:   1.0,
}

const PHASE_COLOR = {
  inhale: 'rgba(124, 154, 142, 0.5)',
  hold1:  'rgba(124, 154, 142, 0.45)',
  exhale: 'rgba(107, 143, 163, 0.4)',
  hold2:  'rgba(107, 143, 163, 0.35)',
  idle:   'rgba(124, 154, 142, 0.3)',
}

function formatTime(secs) {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

function BreathingCircle({ phase, phaseDuration, phaseLabel, secondsLeft }) {
  const prefersReduced = useReducedMotion()
  const scale = CIRCLE_SCALE[phase] ?? 1
  const color = PHASE_COLOR[phase] ?? PHASE_COLOR.idle

  return (
    <div className="relative flex items-center justify-center w-56 h-56 mx-auto my-6" aria-live="polite" aria-atomic="true">
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: color }}
        animate={{ scale: prefersReduced ? 1 : scale * 1.2 }}
        transition={{ duration: prefersReduced ? 0 : phaseDuration, ease: 'easeInOut' }}
      />
      {/* Main circle */}
      <motion.div
        className="relative w-44 h-44 rounded-full flex items-center justify-center"
        style={{ backgroundColor: color.replace('0.5', '0.7').replace('0.4', '0.6') }}
        animate={{ scale: prefersReduced ? 1 : scale }}
        transition={{ duration: prefersReduced ? 0 : phaseDuration, ease: 'easeInOut' }}
      >
        <div className="text-center select-none">
          <p className="text-white font-medium text-lg leading-tight">{phaseLabel}</p>
          <p className="text-white text-4xl font-bold tabular-nums leading-none mt-1"
             aria-label={`${secondsLeft} seconds`}>
            {secondsLeft}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default function BreathingExercise() {
  const [patternKey, setPatternKey] = useState('calm')
  const [sessionDuration, setSessionDuration] = useState(180)
  const [isRunning, setIsRunning] = useState(false)
  const [isDone, setIsDone] = useState(false)

  // Display state — updated from the timer closure
  const [phase, setPhase] = useState('idle')
  const [phaseLabel, setPhaseLabel] = useState('Ready')
  const [phaseSecondsLeft, setPhaseSecondsLeft] = useState(0)
  const [sessionSecondsLeft, setSessionSecondsLeft] = useState(sessionDuration)

  const timerRef = useRef(null)
  const stateRef = useRef({})

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Breathing Exercise for Anxiety',
    description: 'A guided breathing exercise using 4-7-8, box breathing, or calm breath patterns to regulate the nervous system.',
    step: PATTERNS.calm.phases.map((p, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: p.label,
      text: `${p.label} for ${p.duration} seconds.`,
    })),
    totalTime: 'PT5M',
  }

  function startSession() {
    const pattern = PATTERNS[patternKey]
    const phases = pattern.phases

    stateRef.current = {
      phases,
      phaseIndex: 0,
      phaseStart: Date.now(),
      sessionEnd: Date.now() + sessionDuration * 1000,
    }

    setPhase(phases[0].id)
    setPhaseLabel(phases[0].label)
    setPhaseSecondsLeft(phases[0].duration)
    setSessionSecondsLeft(sessionDuration)
    setIsRunning(true)
    setIsDone(false)
  }

  function stopSession() {
    clearInterval(timerRef.current)
    setIsRunning(false)
    setPhase('idle')
    setPhaseLabel('Ready')
    setPhaseSecondsLeft(0)
    setSessionSecondsLeft(sessionDuration)
  }

  useEffect(() => {
    if (!isRunning) return

    timerRef.current = setInterval(() => {
      const now = Date.now()
      const { phases, phaseStart, sessionEnd } = stateRef.current

      const sessionLeft = Math.max(0, Math.round((sessionEnd - now) / 1000))

      if (sessionLeft <= 0) {
        clearInterval(timerRef.current)
        setIsRunning(false)
        setIsDone(true)
        setPhase('idle')
        setPhaseLabel('Done')
        setSessionSecondsLeft(0)
        return
      }

      const currentPhase = phases[stateRef.current.phaseIndex]
      const elapsed = (now - phaseStart) / 1000
      const remaining = Math.max(0, Math.round(currentPhase.duration - elapsed))

      setPhase(currentPhase.id)
      setPhaseLabel(currentPhase.label)
      setPhaseSecondsLeft(remaining)
      setSessionSecondsLeft(sessionLeft)

      if (elapsed >= currentPhase.duration) {
        const nextIndex = (stateRef.current.phaseIndex + 1) % phases.length
        stateRef.current.phaseIndex = nextIndex
        stateRef.current.phaseStart = now
        const nextPhase = phases[nextIndex]
        setPhase(nextPhase.id)
        setPhaseLabel(nextPhase.label)
        setPhaseSecondsLeft(nextPhase.duration)
      }
    }, 250) // 250ms tick for smooth countdown

    return () => clearInterval(timerRef.current)
  }, [isRunning])

  // Reset session seconds when duration changes
  useEffect(() => {
    if (!isRunning) setSessionSecondsLeft(sessionDuration)
  }, [sessionDuration, isRunning])

  return (
    <>
      <SEO
        title="Free Breathing Exercise for Anxiety — 4-7-8, Box Breathing & More"
        description="Use our free animated breathing pacer for anxiety relief. Choose from 4-7-8 breathing, box breathing, or simple calm breath. No sign-up required."
        canonical="https://soften.app/tools/breathing-exercise"
        jsonLd={jsonLd}
      />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Breadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Tools', href: '/tools' }, { label: 'Breathing Pacer' }]} />

        <h1 className="text-3xl font-semibold text-charcoal mb-3">Breathing Pacer</h1>
        <p className="text-charcoal/65 leading-relaxed mb-8">
          Controlled breathing is one of the fastest ways to calm your nervous system. When you slow
          your exhale, you activate the parasympathetic ("rest and digest") branch — the one that signals
          safety. Choose a pattern below and let the circle guide you.
        </p>

        {/* When to use */}
        <div className="bg-sage/8 rounded-2xl p-5 mb-8">
          <h2 className="font-semibold text-charcoal mb-2">When to use this</h2>
          <ul className="space-y-1 text-sm text-charcoal/70">
            <li>• Before a stressful meeting or conversation</li>
            <li>• When anxiety or panic is rising</li>
            <li>• To wind down before sleep</li>
            <li>• Mid-panic attack — slow the breath, slow the fear</li>
            <li>• Any time you feel your chest tightening</li>
          </ul>
        </div>

        {/* Controls */}
        {!isRunning && !isDone && (
          <div className="space-y-5 mb-6">
            {/* Pattern selector */}
            <div>
              <label className="block text-sm font-medium text-charcoal/70 mb-2">Breathing pattern</label>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(PATTERNS).map(([key, p]) => (
                  <button
                    key={key}
                    onClick={() => setPatternKey(key)}
                    className={`rounded-xl px-3 py-2.5 text-sm font-medium text-left transition-colors border ${
                      patternKey === key
                        ? 'bg-sage text-white border-sage'
                        : 'bg-white text-charcoal/70 border-charcoal/15 hover:border-sage/40'
                    }`}
                    aria-pressed={patternKey === key}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-charcoal/50 mt-1.5">{PATTERNS[patternKey].description}</p>
            </div>

            {/* Duration selector */}
            <div>
              <label className="block text-sm font-medium text-charcoal/70 mb-2">Session length</label>
              <div className="flex gap-2">
                {DURATIONS.map(d => (
                  <button
                    key={d.value}
                    onClick={() => setSessionDuration(d.value)}
                    className={`flex-1 rounded-xl px-3 py-2 text-sm font-medium transition-colors border ${
                      sessionDuration === d.value
                        ? 'bg-sage text-white border-sage'
                        : 'bg-white text-charcoal/70 border-charcoal/15 hover:border-sage/40'
                    }`}
                    aria-pressed={sessionDuration === d.value}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={startSession}
              className="w-full bg-sage text-white font-medium py-3 rounded-xl hover:bg-sage/90 transition-colors text-base"
            >
              Begin breathing
            </button>
          </div>
        )}

        {/* Breathing circle — shown when running */}
        {isRunning && (
          <div className="text-center">
            <BreathingCircle
              phase={phase}
              phaseDuration={PATTERNS[patternKey].phases.find(p => p.id === phase)?.duration ?? 4}
              phaseLabel={phaseLabel}
              secondsLeft={phaseSecondsLeft}
            />
            <p className="text-sm text-charcoal/45 mb-5" aria-live="polite">
              {formatTime(sessionSecondsLeft)} remaining
            </p>
            <button
              onClick={stopSession}
              className="text-sm text-charcoal/50 hover:text-charcoal transition-colors underline underline-offset-2"
            >
              Stop session
            </button>
          </div>
        )}

        {/* Done state */}
        {isDone && (
          <div className="text-center py-8 animate-fade-in">
            <div className="text-5xl mb-4">🌿</div>
            <h2 className="text-2xl font-semibold text-charcoal mb-2">Well done.</h2>
            <p className="text-charcoal/60 mb-6">
              Your nervous system appreciated that. Notice how you feel right now — even a small shift counts.
            </p>
            <button
              onClick={() => { setIsDone(false); setSessionSecondsLeft(sessionDuration) }}
              className="bg-sage text-white px-6 py-2.5 rounded-xl font-medium hover:bg-sage/90 transition-colors"
            >
              Go again
            </button>
          </div>
        )}

        {/* How it works */}
        <section className="mt-12 pt-10 border-t border-charcoal/10">
          <h2 className="text-xl font-semibold text-charcoal mb-4">How it works</h2>
          <div className="prose-soften">
            <p>
              Your breath is the one part of your autonomic nervous system you can consciously control.
              When you slow your breathing — especially lengthening the exhale — you stimulate the vagus
              nerve, which carries signals from your lungs and gut back to your brain that say: "we're safe,
              slow down."
            </p>
            <p>
              The <strong>4-7-8 technique</strong>, popularized by Dr. Andrew Weil, extends the hold and
              exhale phases to maximize this parasympathetic response. <strong>Box breathing</strong> uses
              equal counts to create a rhythmic, meditative pattern favored by Navy SEALs and athletes.
              <strong> Calm breath</strong> is the gentlest entry point — just a soft 4-4 rhythm.
            </p>
            <p>
              Even 60 seconds of paced breathing measurably lowers heart rate and cortisol levels. Three
              to five minutes can shift you from a stressed, contracted state to a calmer, more spacious one.
            </p>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-charcoal/5 rounded-xl text-xs text-charcoal/50 leading-relaxed">
          This exercise is a general wellness tool. It is not a replacement for professional support.
          If you are experiencing severe distress, please reach out to a crisis helpline or mental health professional.
        </div>

        <RelatedTools currentSlug="breathing-exercise" tags={['anxiety', 'nervous-system', 'grounding']} />

        <CTABox
          title="Want to understand why breathing works?"
          body="Read our plain-language guide to polyvagal theory and the vagus nerve."
          linkTo="/learn/polyvagal-theory"
          linkLabel="Read: Polyvagal Theory Explained"
          variant="sage"
        />
      </div>
    </>
  )
}

import { useState, useEffect, useRef } from 'react'
import SEO from '../../components/SEO.jsx'
import Breadcrumbs from '../../components/Breadcrumbs.jsx'
import RelatedTools from '../../components/RelatedTools.jsx'
import CTABox from '../../components/CTABox.jsx'

const BODY_PARTS = [
  { id: 'feet',      label: 'Feet & Toes',       emoji: '🦶', duration: 8,
    prompt: 'Bring your attention to your feet. Notice the ground beneath them. Are they warm or cool? Heavy or light? Wiggle your toes gently.' },
  { id: 'calves',    label: 'Calves & Shins',     emoji: '🦵', duration: 8,
    prompt: 'Move up to your calves and shins. Notice any tightness, tiredness, or ease. You don\'t need to change anything — just observe.' },
  { id: 'knees',     label: 'Knees & Thighs',     emoji: '🦵', duration: 8,
    prompt: 'Bring awareness to your knees and thighs. Notice any holding or bracing. Let your legs feel heavy and supported.' },
  { id: 'hips',      label: 'Hips & Pelvis',      emoji: '🍃', duration: 10,
    prompt: 'Soften your attention into your hips and pelvis. This area carries a lot of stress. Let it be exactly as it is.' },
  { id: 'belly',     label: 'Belly & Lower Back',  emoji: '🌊', duration: 10,
    prompt: 'Feel your belly rise and fall with your breath. Notice your lower back against whatever is supporting you. Can you let the weight sink in?' },
  { id: 'chest',     label: 'Chest & Upper Back',  emoji: '💙', duration: 10,
    prompt: 'Feel your chest. Notice your heartbeat if you can. Notice the gentle expansion with each inhale. Is there any tightness here? Let it be okay.' },
  { id: 'shoulders', label: 'Shoulders & Arms',    emoji: '💪', duration: 8,
    prompt: 'Bring attention to your shoulders. Are they raised? Let them drop. Notice your arms from shoulder to wrist — heavy, light, or something else?' },
  { id: 'hands',     label: 'Hands & Fingers',     emoji: '🤲', duration: 8,
    prompt: 'Notice your hands. The tips of your fingers. Any tingling, warmth, or coolness. Let your hands be completely at rest.' },
  { id: 'neck',      label: 'Neck & Throat',       emoji: '🌸', duration: 8,
    prompt: 'Soften your attention to your neck and throat. These areas often hold unspoken tension. Let them be without needing them to change.' },
  { id: 'face',      label: 'Face & Head',         emoji: '😌', duration: 10,
    prompt: 'Finally, your face. Your jaw — is it clenched? Your forehead — furrowed? Let it all soften. Your scalp, your eyes behind closed lids, everything unwinding.' },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Guided Body Scan for Stress & Tension Relief',
  description: 'A gentle guided body scan meditation to release held tension and reconnect with your body.',
  step: BODY_PARTS.map((p, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: p.label,
    text: p.prompt,
  })),
  totalTime: 'PT12M',
}

function formatTime(s) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

export default function BodyScan() {
  const [started, setStarted] = useState(false)
  const [partIndex, setPartIndex] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(BODY_PARTS[0].duration)
  const [isPaused, setIsPaused] = useState(false)
  const [isDone, setIsDone] = useState(false)

  const timerRef = useRef(null)
  const stateRef = useRef({ partIndex: 0, phaseStart: 0 })

  const totalDuration = BODY_PARTS.reduce((s, p) => s + p.duration, 0)
  const elapsed = BODY_PARTS.slice(0, partIndex).reduce((s, p) => s + p.duration, 0)
  const progress = ((elapsed + (BODY_PARTS[partIndex]?.duration - secondsLeft)) / totalDuration) * 100

  useEffect(() => {
    if (!started || isPaused || isDone) return

    stateRef.current.phaseStart = Date.now()

    timerRef.current = setInterval(() => {
      const partDur = BODY_PARTS[stateRef.current.partIndex].duration
      const elapsedMs = Date.now() - stateRef.current.phaseStart
      const remaining = Math.max(0, Math.round(partDur - elapsedMs / 1000))
      setSecondsLeft(remaining)

      if (elapsedMs / 1000 >= partDur) {
        const next = stateRef.current.partIndex + 1
        if (next >= BODY_PARTS.length) {
          clearInterval(timerRef.current)
          setIsDone(true)
        } else {
          stateRef.current.partIndex = next
          stateRef.current.phaseStart = Date.now()
          setPartIndex(next)
          setSecondsLeft(BODY_PARTS[next].duration)
        }
      }
    }, 500)

    return () => clearInterval(timerRef.current)
  }, [started, isPaused, isDone, partIndex])

  function handleStart() {
    stateRef.current = { partIndex: 0, phaseStart: Date.now() }
    setPartIndex(0)
    setSecondsLeft(BODY_PARTS[0].duration)
    setStarted(true)
    setIsDone(false)
    setIsPaused(false)
  }

  function handleNext() {
    const next = partIndex + 1
    if (next >= BODY_PARTS.length) {
      setIsDone(true)
    } else {
      stateRef.current.partIndex = next
      stateRef.current.phaseStart = Date.now()
      setPartIndex(next)
      setSecondsLeft(BODY_PARTS[next].duration)
    }
  }

  const current = BODY_PARTS[partIndex]

  return (
    <>
      <SEO
        title="Free Guided Body Scan for Stress & Tension Relief"
        description="A gentle guided body scan meditation to release held tension, reduce stress, and reconnect with your body. Free, instant access, no sign-up."
        canonical="https://soften.app/tools/body-scan"
        jsonLd={jsonLd}
      />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Breadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Tools', href: '/tools' }, { label: 'Body Scan' }]} />

        <h1 className="text-3xl font-semibold text-charcoal mb-3">Guided Body Scan</h1>
        <p className="text-charcoal/65 leading-relaxed mb-8">
          Tension hides in the body long after the stressor is gone. A body scan gently moves your
          awareness from head to toe, inviting held muscles to soften. This isn't about relaxing
          on command — it's about noticing what's there. That awareness alone begins to release it.
        </p>

        {!started && (
          <>
            <div className="bg-sage/8 rounded-2xl p-5 mb-6">
              <h2 className="font-semibold text-charcoal mb-2">When to use this</h2>
              <ul className="space-y-1 text-sm text-charcoal/70">
                <li>• Physical tension, tight muscles, or body aches from stress</li>
                <li>• Before sleep when your mind won't quieten</li>
                <li>• After a stressful day at work</li>
                <li>• When you're not sure where you're holding tension</li>
                <li>• As a daily practice to build body awareness</li>
              </ul>
            </div>
            <p className="text-sm text-charcoal/50 mb-6">
              Find a comfortable position — sitting or lying down. This takes about 10–12 minutes.
              The exercise will guide you automatically, or you can tap "Next" to move at your own pace.
            </p>
            <button
              onClick={handleStart}
              className="w-full bg-sage text-white font-medium py-3 rounded-xl hover:bg-sage/90 transition-colors text-base"
            >
              Begin body scan
            </button>
          </>
        )}

        {started && !isDone && current && (
          <div>
            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-charcoal/40 mb-1.5">
                <span>{partIndex + 1} of {BODY_PARTS.length} — {current.label}</span>
                <span>{secondsLeft}s</span>
              </div>
              <div className="h-1.5 bg-charcoal/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sage rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
                  role="progressbar"
                  aria-valuenow={partIndex + 1}
                  aria-valuemin={1}
                  aria-valuemax={BODY_PARTS.length}
                />
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="text-5xl mb-3" aria-hidden="true">{current.emoji}</div>
              <h2 className="text-xl font-semibold text-charcoal mb-1">{current.label}</h2>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-charcoal/8 mb-6 min-h-[120px]">
              <p className="text-charcoal/70 leading-relaxed text-base" aria-live="polite">{current.prompt}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsPaused(p => !p)}
                className="flex-1 border border-charcoal/20 text-charcoal/70 font-medium py-2.5 rounded-xl hover:border-charcoal/40 transition-colors text-sm"
              >
                {isPaused ? '▶ Resume' : '⏸ Pause'}
              </button>
              <button
                onClick={handleNext}
                className="flex-1 bg-sage text-white font-medium py-2.5 rounded-xl hover:bg-sage/90 transition-colors text-sm"
              >
                Next area →
              </button>
            </div>
          </div>
        )}

        {isDone && (
          <div className="text-center py-8 animate-fade-in">
            <div className="text-5xl mb-4">🌿</div>
            <h2 className="text-2xl font-semibold text-charcoal mb-2">Beautifully done.</h2>
            <p className="text-charcoal/60 mb-6 max-w-sm mx-auto">
              You just gave your body 10 minutes of undivided attention. Take a moment to notice
              how you feel from the inside — without judgment.
            </p>
            <button
              onClick={handleStart}
              className="text-sm text-sage font-medium underline underline-offset-2"
            >
              Start again
            </button>
          </div>
        )}

        <section className="mt-12 pt-10 border-t border-charcoal/10">
          <h2 className="text-xl font-semibold text-charcoal mb-4">How it works</h2>
          <div className="prose-soften">
            <p>
              The body scan is one of the most researched relaxation and mindfulness techniques. Developed
              as part of Jon Kabat-Zinn's Mindfulness-Based Stress Reduction (MBSR) program, it has been
              shown in clinical studies to reduce cortisol, lower blood pressure, and improve sleep quality.
            </p>
            <p>
              From a nervous system perspective, the body scan works through interoception — your brain's
              ability to sense what's happening inside your body. Most of us are chronically low on
              interoceptive awareness, which means we accumulate tension without noticing it. Moving
              attention systematically through the body builds this awareness and interrupts the automatic
              muscle bracing that stress triggers.
            </p>
            <p>
              Importantly, the goal is not to force relaxation. It's to notice. That act of compassionate
              noticing — without trying to fix — is often what allows the body to release on its own.
            </p>
          </div>
        </section>

        <div className="mt-8 p-4 bg-charcoal/5 rounded-xl text-xs text-charcoal/50 leading-relaxed">
          This exercise is a general wellness tool. It is not a replacement for professional support.
          If you are experiencing severe distress, please reach out to a crisis helpline or mental health professional.
        </div>

        <RelatedTools currentSlug="body-scan" tags={['tension', 'somatic', 'sleep']} />

        <CTABox
          title="Understand why your body holds stress"
          body="Our guide to somatic memory and stored tension explains what's happening beneath the surface."
          linkTo="/learn/why-body-holds-stress"
          linkLabel="Read: Why Your Body Holds Onto Stress"
          variant="sage"
        />
      </div>
    </>
  )
}

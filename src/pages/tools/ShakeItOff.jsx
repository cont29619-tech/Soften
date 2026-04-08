import { useState, useEffect, useRef } from 'react'
import SEO from '../../components/SEO.jsx'
import Breadcrumbs from '../../components/Breadcrumbs.jsx'
import RelatedTools from '../../components/RelatedTools.jsx'
import CTABox from '../../components/CTABox.jsx'

const PHASES = [
  {
    id: 'setup',
    label: 'Get Ready',
    emoji: '🧘',
    duration: 20,
    instruction: 'Stand with feet shoulder-width apart. Soften your knees slightly — not locked, not deeply bent. Let your arms hang loose at your sides. Take three slow breaths and feel the ground beneath your feet.',
    cue: 'You\'re about to let your body do something it knows how to do.',
  },
  {
    id: 'bounce',
    label: 'Gentle Bounce',
    emoji: '🌊',
    duration: 30,
    instruction: 'Begin a very slight, gentle bounce through your knees. Keep it small — your heels may barely leave the ground. Let the movement travel up through your body like a wave. No forcing, no performing.',
    cue: 'Feel the vibration travel up your spine. Let it be loose and easy.',
  },
  {
    id: 'build',
    label: 'Let It Build',
    emoji: '💃',
    duration: 60,
    instruction: 'Allow the shaking to grow naturally. Let your arms join in — loose, dangling. Let your head nod gently. Your jaw might chatter a little. This is your nervous system discharging stored activation. You are not doing anything wrong.',
    cue: 'Trust the body. It knows how to shake. Animals do this naturally after threat.',
  },
  {
    id: 'shake',
    label: 'Full Shaking',
    emoji: '⚡',
    duration: 90,
    instruction: 'Let the shaking be full but not violent. Find the edge between vigorous and comfortable. Your legs might shake, your chest might vibrate, your teeth might chatter. This is all welcome. This is energy moving.',
    cue: 'Stay with it. If any emotion arises — let it. Laughter is common. So are tears. Both are release.',
  },
  {
    id: 'settle',
    label: 'Slow Down',
    emoji: '🌙',
    duration: 30,
    instruction: 'Very gradually let the shaking slow. Don\'t stop it abruptly — let it diminish like a wave settling. Your movements become smaller, then smaller still, until you\'re barely moving.',
    cue: 'Let your body find its own stillness. Don\'t impose it.',
  },
  {
    id: 'stillness',
    label: 'Stillness',
    emoji: '🌿',
    duration: 30,
    instruction: 'Come to stillness. Stand or sit quietly. Close your eyes if that feels comfortable. Notice the quality of your body right now — any tingling, warmth, a sense of looseness, or calm.',
    cue: 'This feeling — this post-shake settledness — is your nervous system\'s natural regulation state.',
  },
]

function formatTime(s) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

export default function ShakeItOff() {
  const [started, setStarted] = useState(false)
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(PHASES[0].duration)
  const [isDone, setIsDone] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const stateRef = useRef({ phaseIndex: 0, phaseStart: 0 })
  const timerRef = useRef(null)

  const totalDuration = PHASES.reduce((s, p) => s + p.duration, 0)
  const elapsedSoFar = PHASES.slice(0, phaseIndex).reduce((s, p) => s + p.duration, 0)
  const progress = ((elapsedSoFar + (PHASES[phaseIndex]?.duration - secondsLeft)) / totalDuration) * 100

  useEffect(() => {
    if (!started || isPaused || isDone) return

    stateRef.current.phaseStart = Date.now()
    timerRef.current = setInterval(() => {
      const pDur = PHASES[stateRef.current.phaseIndex].duration
      const elapsedMs = Date.now() - stateRef.current.phaseStart
      const remaining = Math.max(0, Math.round(pDur - elapsedMs / 1000))
      setSecondsLeft(remaining)

      if (elapsedMs / 1000 >= pDur) {
        const next = stateRef.current.phaseIndex + 1
        if (next >= PHASES.length) {
          clearInterval(timerRef.current)
          setIsDone(true)
        } else {
          stateRef.current.phaseIndex = next
          stateRef.current.phaseStart = Date.now()
          setPhaseIndex(next)
          setSecondsLeft(PHASES[next].duration)
        }
      }
    }, 500)
    return () => clearInterval(timerRef.current)
  }, [started, isPaused, isDone, phaseIndex])

  function handleStart() {
    stateRef.current = { phaseIndex: 0, phaseStart: Date.now() }
    setPhaseIndex(0)
    setSecondsLeft(PHASES[0].duration)
    setStarted(true)
    setIsDone(false)
    setIsPaused(false)
  }

  const current = PHASES[phaseIndex]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Therapeutic Shaking — Release Stored Tension & Stress',
    description: 'A guided therapeutic shaking exercise to release stored stress and tension. Inspired by TRE (Tension & Trauma Releasing Exercises).',
    step: PHASES.map((p, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: p.label,
      text: p.instruction,
    })),
    totalTime: 'PT8M',
  }

  return (
    <>
      <SEO
        title="Therapeutic Shaking — Release Stored Tension & Stress | Soften"
        description="Let your body shake to release stored stress and tension. A guided therapeutic shaking exercise inspired by TRE. Free, instant, no sign-up required."
        canonical="https://soften.ink/tools/shake-it-off"
        jsonLd={jsonLd}
      />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Breadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Tools', href: '/tools' }, { label: 'Shake It Off' }]} />

        <h1 className="text-3xl font-semibold text-charcoal mb-3">Shake It Off</h1>
        <p className="text-charcoal/65 leading-relaxed mb-3">
          Animals shake after threat. A deer that escapes a predator will shake violently for a
          minute or two, then return to grazing as if nothing happened. The shake discharges the
          activation energy the threat response generated. Humans evolved the same capacity — but
          most of us have learned to suppress it.
        </p>
        <p className="text-charcoal/65 leading-relaxed mb-8">
          This exercise, inspired by TRE (Tension & Trauma Releasing Exercises) developed by
          Dr. David Berceli, invites you to let your body shake intentionally — to complete the
          incomplete threat cycle and discharge stored tension.
        </p>

        <div className="bg-clay/10 border border-clay/20 rounded-2xl p-5 mb-6">
          <p className="font-semibold text-charcoal text-sm mb-1">Before you begin — please read</p>
          <ul className="text-sm text-charcoal/65 space-y-1">
            <li>• You need enough space to stand and move your arms freely</li>
            <li>• Wear comfortable clothing that allows movement</li>
            <li>• If you have knee, back, or leg injuries, do this seated or lying down</li>
            <li>• Stop if you feel dizzy or unwell at any point</li>
          </ul>
        </div>

        {!started && (
          <div className="text-center py-4">
            <div className="text-5xl mb-6">💃</div>
            <p className="text-charcoal/55 mb-8 max-w-sm mx-auto text-sm">
              Total time: about 4–5 minutes. You'll move through 6 phases — from a gentle bounce
              to full shaking and back to stillness.
            </p>
            <button
              onClick={handleStart}
              className="bg-clay text-white font-medium px-8 py-3 rounded-xl hover:bg-clay/90 transition-colors"
            >
              I'm ready — begin
            </button>
          </div>
        )}

        {started && !isDone && current && (
          <div>
            <div className="mb-5">
              <div className="flex justify-between text-xs text-charcoal/40 mb-1.5">
                <span>{current.label}</span>
                <span>{formatTime(secondsLeft)}</span>
              </div>
              <div className="h-1.5 bg-charcoal/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-clay rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
                />
              </div>
            </div>

            <div className="text-center text-5xl mb-4">{current.emoji}</div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-charcoal/8 mb-5">
              <h2 className="text-xl font-semibold text-charcoal mb-3" aria-live="polite">{current.label}</h2>
              <p className="text-charcoal/75 leading-relaxed mb-4">{current.instruction}</p>
              <p className="text-charcoal/45 text-sm italic">{current.cue}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsPaused(p => !p)}
                className="flex-1 border border-charcoal/20 text-charcoal/70 font-medium py-2.5 rounded-xl hover:border-charcoal/40 transition-colors text-sm"
              >
                {isPaused ? '▶ Resume' : '⏸ Pause'}
              </button>
              <button
                onClick={() => {
                  const next = phaseIndex + 1
                  if (next >= PHASES.length) { setIsDone(true) }
                  else {
                    stateRef.current.phaseIndex = next
                    stateRef.current.phaseStart = Date.now()
                    setPhaseIndex(next)
                    setSecondsLeft(PHASES[next].duration)
                  }
                }}
                className="flex-1 bg-clay text-white font-medium py-2.5 rounded-xl hover:bg-clay/90 transition-colors text-sm"
              >
                Next phase →
              </button>
            </div>
          </div>
        )}

        {isDone && (
          <div className="text-center py-8 animate-fade-in">
            <div className="text-5xl mb-4">🌿</div>
            <h2 className="text-2xl font-semibold text-charcoal mb-2">How do you feel?</h2>
            <p className="text-charcoal/60 mb-4 max-w-sm mx-auto">
              Many people feel a deep, loose calm after shaking — sometimes tingling, sometimes warmth,
              sometimes lightness. Some feel emotional. All of it is welcome.
            </p>
            <p className="text-charcoal/45 text-sm mb-8">
              Drink some water. Rest if you need to. Your body just did real work.
            </p>
            <button onClick={handleStart} className="text-sm text-clay font-medium underline underline-offset-2">
              Do it again
            </button>
          </div>
        )}

        <section className="mt-12 pt-10 border-t border-charcoal/10">
          <h2 className="text-xl font-semibold text-charcoal mb-4">How it works</h2>
          <div className="prose-soften">
            <p>
              Shaking and trembling are the body's natural mechanism for discharging excess activation
              energy. In animals, this discharge is automatic and complete — after the threat response
              activates, the body shakes it off and returns to baseline. In humans, social conditioning
              (stay calm, don't cry, control yourself) teaches us to suppress this response.
            </p>
            <p>
              Suppressed activation doesn't disappear — it accumulates as chronic muscle tension,
              hypervigilance, and anxiety. TRE (Tension & Trauma Releasing Exercises), developed by
              Dr. David Berceli, uses intentional shaking to access and release this stored activation.
              The tremoring is neurogenic — generated by the nervous system itself — not a performance.
            </p>
            <p>
              Regular shaking practice has been associated with reduced muscle tension, improved sleep,
              decreased anxiety, and a greater sense of ease in the body. It can be done daily as a
              maintenance practice, or used acutely after a stressful event.
            </p>
          </div>
        </section>

        <div className="mt-8 p-4 bg-charcoal/5 rounded-xl text-xs text-charcoal/50 leading-relaxed">
          This exercise is a general wellness tool. It is not a replacement for professional support.
          If you have a history of trauma or dissociation, consider working with a trained TRE facilitator.
        </div>

        <RelatedTools currentSlug="shake-it-off" tags={['tension', 'somatic', 'stress']} />

        <CTABox
          title="Why does your body hold onto stress?"
          body="Our guide explains somatic memory, stored tension, and why body-based approaches work."
          linkTo="/learn/why-body-holds-stress"
          linkLabel="Read: Why Your Body Holds Onto Stress"
          variant="clay"
        />
      </div>
    </>
  )
}

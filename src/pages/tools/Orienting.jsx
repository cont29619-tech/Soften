import { useState, useEffect, useRef } from 'react'
import SEO from '../../components/SEO.jsx'
import Breadcrumbs from '../../components/Breadcrumbs.jsx'
import RelatedTools from '../../components/RelatedTools.jsx'
import CTABox from '../../components/CTABox.jsx'

const PROMPTS = [
  { id: 1, duration: 12,
    text: 'Slowly let your eyes begin to move around the room. Not looking for anything — just exploring. Let your gaze be soft and curious.' },
  { id: 2, duration: 15,
    text: 'Find something in the room that is pleasant to look at — a color you like, a shape, a patch of light. Let your eyes rest there for a moment.' },
  { id: 3, duration: 15,
    text: 'Now let your gaze move further. Look toward a window or a far wall. Notice what\'s out there, or what\'s at the edge of the room. Take your time.' },
  { id: 4, duration: 12,
    text: 'Let your eyes continue to wander — over objects, textures, surfaces. You\'re a curious animal orienting to its environment. Nothing is threatening here.' },
  { id: 5, duration: 15,
    text: 'Notice you are in a room. Notice the boundaries — the walls, the ceiling, the floor. Feel yourself contained and held by this space.' },
  { id: 6, duration: 12,
    text: 'Let your eyes rest somewhere comfortable. Notice your breath. Notice that you are still here, still safe, still in your body in this room.' },
]

export default function Orienting() {
  const [started, setStarted] = useState(false)
  const [promptIndex, setPromptIndex] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(PROMPTS[0].duration)
  const [isDone, setIsDone] = useState(false)

  const stateRef = useRef({ promptIndex: 0, phaseStart: 0 })
  const timerRef = useRef(null)

  useEffect(() => {
    if (!started || isDone) return

    stateRef.current.phaseStart = Date.now()
    timerRef.current = setInterval(() => {
      const pDur = PROMPTS[stateRef.current.promptIndex].duration
      const elapsedMs = Date.now() - stateRef.current.phaseStart
      const remaining = Math.max(0, Math.round(pDur - elapsedMs / 1000))
      setSecondsLeft(remaining)

      if (elapsedMs / 1000 >= pDur) {
        const next = stateRef.current.promptIndex + 1
        if (next >= PROMPTS.length) {
          clearInterval(timerRef.current)
          setIsDone(true)
        } else {
          stateRef.current.promptIndex = next
          stateRef.current.phaseStart = Date.now()
          setPromptIndex(next)
          setSecondsLeft(PROMPTS[next].duration)
        }
      }
    }, 500)
    return () => clearInterval(timerRef.current)
  }, [started, isDone, promptIndex])

  function handleStart() {
    stateRef.current = { promptIndex: 0, phaseStart: Date.now() }
    setPromptIndex(0)
    setSecondsLeft(PROMPTS[0].duration)
    setStarted(true)
    setIsDone(false)
  }

  const current = PROMPTS[promptIndex]
  const progress = ((promptIndex) / PROMPTS.length) * 100

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Orienting Exercise — Polyvagal Grounding Technique',
    description: 'A guided polyvagal orienting exercise to signal safety to the nervous system through slow, curious visual exploration.',
    step: PROMPTS.map((p, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: `Orienting prompt ${i + 1}`,
      text: p.text,
    })),
    totalTime: 'PT5M',
  }

  return (
    <>
      <SEO
        title="Orienting Exercise — A Polyvagal Grounding Technique | Soften"
        description="The orienting exercise uses slow, curious visual exploration to signal safety to your nervous system. Based on polyvagal theory. Free and instant."
        canonical="https://soften.ink/tools/orienting"
        jsonLd={jsonLd}
      />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Breadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Tools', href: '/tools' }, { label: 'Orienting' }]} />

        <h1 className="text-3xl font-semibold text-charcoal mb-3">Orienting Exercise</h1>
        <p className="text-charcoal/65 leading-relaxed mb-8">
          Orienting is one of the most fundamental nervous system regulation techniques, rooted in
          polyvagal theory. When we feel threatened, our gaze narrows. When we slow down and look
          around — like a deer lifting its head and scanning the forest — we signal to our nervous
          system: nothing is chasing me. I'm safe.
        </p>

        {!started && (
          <>
            <div className="bg-sage/8 rounded-2xl p-5 mb-6">
              <h2 className="font-semibold text-charcoal mb-2">When to use this</h2>
              <ul className="space-y-1 text-sm text-charcoal/70">
                <li>• Hypervigilance — feeling like you need to watch everything</li>
                <li>• Anxiety in unfamiliar environments</li>
                <li>• After a stressful or triggering event</li>
                <li>• When you feel numb or dissociated</li>
                <li>• As a gentle daily reset between tasks</li>
              </ul>
            </div>
            <p className="text-sm text-charcoal/50 mb-6">
              Let your eyes actually move during this exercise. Don't just stare at the screen.
              The prompts will guide you — follow them slowly and curiously.
            </p>
            <button
              onClick={handleStart}
              className="w-full bg-sage text-white font-medium py-3 rounded-xl hover:bg-sage/90 transition-colors"
            >
              Begin orienting
            </button>
          </>
        )}

        {started && !isDone && (
          <div>
            <div className="mb-6">
              <div className="flex justify-between text-xs text-charcoal/40 mb-1.5">
                <span>Prompt {promptIndex + 1} of {PROMPTS.length}</span>
                <span>{secondsLeft}s</span>
              </div>
              <div className="h-1.5 bg-charcoal/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sage rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-charcoal/8 min-h-[160px] flex items-center justify-center text-center">
              <p className="text-charcoal/75 leading-relaxed text-lg" aria-live="polite">
                {current?.text}
              </p>
            </div>
          </div>
        )}

        {isDone && (
          <div className="text-center py-8 animate-fade-in">
            <div className="text-5xl mb-4">👁️</div>
            <h2 className="text-2xl font-semibold text-charcoal mb-2">You've oriented.</h2>
            <p className="text-charcoal/60 mb-6 max-w-sm mx-auto">
              You've looked around. You're here. Nothing is threatening you in this room, right now.
              Let that be enough.
            </p>
            <button onClick={handleStart} className="text-sm text-sage font-medium underline underline-offset-2">
              Go through it again
            </button>
          </div>
        )}

        <section className="mt-12 pt-10 border-t border-charcoal/10">
          <h2 className="text-xl font-semibold text-charcoal mb-4">How it works</h2>
          <div className="prose-soften">
            <p>
              According to polyvagal theory, developed by Dr. Stephen Porges, your nervous system is
              constantly scanning for cues of safety or danger — a process called <strong>neuroception</strong>.
              This scan is mostly unconscious. But your visual system is deeply tied to it: narrow,
              darting eyes signal threat, while wide, slow, exploratory gaze signals safety.
            </p>
            <p>
              Animals in the wild orient constantly — lifting their heads, looking around, scanning for
              predators. When they find none, they return to grazing. This is a complete threat cycle
              with a clear resolution. Humans in chronic stress often stay stuck mid-cycle, with the
              threat response activated but never resolved.
            </p>
            <p>
              The orienting exercise deliberately completes that cycle. By moving your eyes slowly and
              with curiosity — rather than scanning for danger — you activate the ventral vagal pathway
              (your social safety system) and signal to the brainstem: we've looked, nothing's there,
              we can rest.
            </p>
          </div>
        </section>

        <div className="mt-8 p-4 bg-charcoal/5 rounded-xl text-xs text-charcoal/50 leading-relaxed">
          This exercise is a general wellness tool. It is not a replacement for professional support.
        </div>

        <RelatedTools currentSlug="orienting" tags={['anxiety', 'safety', 'nervous-system', 'grounding']} />

        <CTABox
          title="Go deeper: understand polyvagal theory"
          body="Learn how your three-state nervous system works and why safety is felt, not thought."
          linkTo="/learn/polyvagal-theory"
          linkLabel="Read: Polyvagal Theory Explained"
          variant="sage"
        />
      </div>
    </>
  )
}

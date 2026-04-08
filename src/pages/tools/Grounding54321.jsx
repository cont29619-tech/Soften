import { useState } from 'react'
import SEO from '../../components/SEO.jsx'
import Breadcrumbs from '../../components/Breadcrumbs.jsx'
import RelatedTools from '../../components/RelatedTools.jsx'
import CTABox from '../../components/CTABox.jsx'

const STEPS = [
  {
    number: 5,
    sense: 'sight',
    emoji: '👁️',
    instruction: 'Look around you. Find 5 things you can SEE.',
    prompt: 'Take your time. It can be anything — a lamp, a patch of sunlight, the pattern on a wall.',
    cue: 'Notice the color, shape, and texture of each one.',
  },
  {
    number: 4,
    sense: 'touch',
    emoji: '✋',
    instruction: 'Now find 4 things you can FEEL or TOUCH.',
    prompt: 'The chair beneath you, your feet on the floor, your clothes against your skin, the air on your face.',
    cue: 'Press gently into each surface. Notice texture, temperature, pressure.',
  },
  {
    number: 3,
    sense: 'hearing',
    emoji: '👂',
    instruction: 'Listen carefully. What are 3 things you can HEAR?',
    prompt: 'Near sounds and far sounds. Traffic, your own breathing, a fan, birds, silence itself.',
    cue: 'Try not to judge the sounds — just notice they exist.',
  },
  {
    number: 2,
    sense: 'smell',
    emoji: '👃',
    instruction: 'What are 2 things you can SMELL right now?',
    prompt: 'Take a slow breath in. It might be subtle — the room itself, your clothes, food, fresh air.',
    cue: "If you can't smell anything, notice that absence. That's still information.",
  },
  {
    number: 1,
    sense: 'taste',
    emoji: '👅',
    instruction: 'Finally: 1 thing you can TASTE.',
    prompt: 'The lingering taste of a drink, toothpaste, or just the neutral taste of your own mouth.',
    cue: 'This is the quietest sense. Even a very faint taste counts.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: '5-4-3-2-1 Grounding Technique',
  description: 'An interactive sensory grounding exercise to reduce anxiety and return to the present moment.',
  step: STEPS.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: `${s.number} things you can ${s.sense}`,
    text: s.instruction,
  })),
  totalTime: 'PT5M',
}

export default function Grounding54321() {
  const [stepIndex, setStepIndex] = useState(-1) // -1 = intro
  const isDone = stepIndex >= STEPS.length

  const currentStep = STEPS[stepIndex]
  const progress = stepIndex < 0 ? 0 : ((stepIndex) / STEPS.length) * 100

  function handleNext() {
    setStepIndex(i => i + 1)
  }

  function handleRestart() {
    setStepIndex(-1)
  }

  return (
    <>
      <SEO
        title="5-4-3-2-1 Grounding Technique — Free Interactive Exercise"
        description="Use the 5-4-3-2-1 grounding technique to anchor yourself to the present moment and reduce anxiety. Free interactive exercise, no sign-up needed."
        canonical="https://soften.ink/tools/grounding-54321"
        jsonLd={jsonLd}
      />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Breadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Tools', href: '/tools' }, { label: '5-4-3-2-1 Grounding' }]} />

        <h1 className="text-3xl font-semibold text-charcoal mb-3">5-4-3-2-1 Grounding</h1>
        <p className="text-charcoal/65 leading-relaxed mb-8">
          When anxiety pulls you out of the present, your five senses can pull you back. This technique
          uses sensory awareness to interrupt the anxious spiral and anchor you to right now — where you
          are actually safe.
        </p>

        {/* When to use */}
        {stepIndex < 0 && (
          <div className="bg-ocean/8 rounded-2xl p-5 mb-6">
            <h2 className="font-semibold text-charcoal mb-2">When to use this</h2>
            <ul className="space-y-1 text-sm text-charcoal/70">
              <li>• Anxiety spiral or intrusive thoughts</li>
              <li>• Panic attacks or moments of overwhelm</li>
              <li>• Feeling dissociated or disconnected from reality</li>
              <li>• Before or after a difficult conversation</li>
              <li>• Any time you need to feel present and grounded</li>
            </ul>
          </div>
        )}

        {/* Progress bar */}
        {stepIndex >= 0 && !isDone && (
          <div className="mb-6">
            <div className="flex justify-between text-xs text-charcoal/45 mb-1.5">
              <span>Step {stepIndex + 1} of {STEPS.length}</span>
              <span>{STEPS[stepIndex].sense}</span>
            </div>
            <div className="h-1.5 bg-charcoal/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-ocean rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuenow={stepIndex + 1}
                aria-valuemin={0}
                aria-valuemax={STEPS.length}
              />
            </div>
          </div>
        )}

        {/* Interactive area */}
        <div className="min-h-[260px]">
          {/* Intro */}
          {stepIndex < 0 && (
            <div className="text-center py-6">
              <div className="text-6xl mb-4">✋</div>
              <p className="text-charcoal/60 mb-8 max-w-sm mx-auto">
                You'll move through 5 senses, one at a time. Take your time with each one.
                There's no rush.
              </p>
              <button
                onClick={handleNext}
                className="bg-ocean text-white font-medium px-8 py-3 rounded-xl hover:bg-ocean/90 transition-colors text-base"
              >
                I'm ready — begin
              </button>
            </div>
          )}

          {/* Step */}
          {stepIndex >= 0 && !isDone && currentStep && (
            <div className="animate-fade-in">
              <div className="text-5xl mb-5 text-center">{currentStep.emoji}</div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-charcoal/8 mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-ocean/15 text-ocean text-xs font-semibold px-2 py-0.5 rounded-full">
                    {currentStep.number} things
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-charcoal mb-3">{currentStep.instruction}</h2>
                <p className="text-charcoal/60 text-sm leading-relaxed mb-2">{currentStep.prompt}</p>
                <p className="text-charcoal/45 text-sm italic">{currentStep.cue}</p>
              </div>
              <button
                onClick={handleNext}
                className="w-full bg-ocean text-white font-medium py-3 rounded-xl hover:bg-ocean/90 transition-colors"
              >
                {stepIndex < STEPS.length - 1 ? `Done — next sense →` : 'Complete ✓'}
              </button>
            </div>
          )}

          {/* Complete */}
          {isDone && (
            <div className="text-center py-8 animate-fade-in">
              <div className="text-5xl mb-4">🌱</div>
              <h2 className="text-2xl font-semibold text-charcoal mb-2">You're back.</h2>
              <p className="text-charcoal/60 mb-2 max-w-sm mx-auto">
                All five senses checked in. You're here, in this room, in this moment.
                That was real. That was enough.
              </p>
              <p className="text-charcoal/45 text-sm mb-8">
                Notice how you feel now compared to when you started.
              </p>
              <button
                onClick={handleRestart}
                className="text-sm text-ocean font-medium underline underline-offset-2 hover:text-ocean/80 transition-colors"
              >
                Go through it again
              </button>
            </div>
          )}
        </div>

        {/* How it works */}
        <section className="mt-12 pt-10 border-t border-charcoal/10">
          <h2 className="text-xl font-semibold text-charcoal mb-4">How it works</h2>
          <div className="prose-soften">
            <p>
              Anxiety lives in the future. Grounding lives in the present. When your nervous system is
              flooded with threat signals, your prefrontal cortex (the thinking, reasoning part of your brain)
              goes offline and your amygdala takes over — catastrophizing, predicting danger, spiraling.
            </p>
            <p>
              Sensory grounding works by deliberately redirecting your attention to immediate, concrete,
              physical reality. Each sense you engage is a tiny anchor that pulls your attention back from
              the anxious story and into your actual surroundings. After five senses, your brain has
              gathered enough present-moment data to begin downregulating the threat response.
            </p>
            <p>
              Research on grounding techniques shows they are particularly effective for anxiety,
              dissociation, and PTSD flashbacks. The technique works best when done slowly and deliberately —
              the goal is depth of attention, not speed.
            </p>
          </div>
        </section>

        <div className="mt-8 p-4 bg-charcoal/5 rounded-xl text-xs text-charcoal/50 leading-relaxed">
          This exercise is a general wellness tool, not a replacement for professional support.
          If you're experiencing severe distress, please reach out to a crisis helpline or therapist.
        </div>

        <RelatedTools currentSlug="grounding-54321" tags={['anxiety', 'grounding', 'overwhelm']} />

        <CTABox
          title="Learn more about grounding techniques"
          body="Read our full guide to the 5-4-3-2-1 technique, including the science and variations."
          linkTo="/blog/54321-grounding-technique-explained"
          linkLabel="Read: How 5-4-3-2-1 Grounding Works"
          variant="ocean"
        />
      </div>
    </>
  )
}

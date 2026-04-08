import { useState } from 'react'
import SEO from '../../components/SEO.jsx'
import Breadcrumbs from '../../components/Breadcrumbs.jsx'
import RelatedTools from '../../components/RelatedTools.jsx'
import CTABox from '../../components/CTABox.jsx'

const STEPS = [
  {
    id: 'resource',
    phase: 'Resource',
    label: 'Find Your Resource',
    instruction: 'Think of something that brings you a small sense of comfort, warmth, or ease. It could be a person, a place, a memory, or even a colour. Don\'t overthink it — let it be whatever arises.',
    prompt: 'Once you have something, notice how it feels in your body. Even a subtle sense of "okay-ness" counts.',
    duration: 20,
  },
  {
    id: 'difficult',
    phase: 'Difficult',
    label: 'Touch the Difficult Sensation',
    instruction: 'Now gently shift your attention toward something that feels uncomfortable — a tension, a worry, or a difficult emotion. Don\'t dive in. Just touch it lightly, like you\'re dipping a toe into cold water.',
    prompt: 'Notice where you feel this in your body. What\'s its texture? Is it heavy, sharp, constricted?',
    duration: 20,
  },
  {
    id: 'return',
    phase: 'Return',
    label: 'Return to Your Resource',
    instruction: 'Now come back to your resource. Back to the warmth, the comfort, the ease you found before. Let it fill the space the difficult sensation was in.',
    prompt: 'Notice the contrast. Your nervous system is learning that it can visit difficult territory and come back. This is building capacity.',
    duration: 20,
  },
  {
    id: 'reflect',
    phase: 'Reflect',
    label: 'Notice What Happened',
    instruction: 'Take a moment to simply notice how you feel right now. You moved between difficulty and resource without being overwhelmed. That\'s the practice.',
    prompt: 'With repetition, this movement builds your window of tolerance — your capacity to hold more without being swept away.',
    duration: 15,
  },
]

export default function Pendulation() {
  const [stepIndex, setStepIndex] = useState(-1)
  const isDone = stepIndex >= STEPS.length
  const current = STEPS[stepIndex]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Pendulation Exercise — Somatic Nervous System Balance',
    description: 'A somatic pendulation exercise to build nervous system capacity by moving between resource and difficulty.',
    step: STEPS.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.label,
      text: s.instruction,
    })),
    totalTime: 'PT10M',
  }

  return (
    <>
      <SEO
        title="Pendulation Exercise — Somatic Technique for Nervous System Balance"
        description="Learn pendulation, a somatic technique that builds nervous system resilience by gently moving between resource and difficult sensations. Free and guided."
        canonical="https://soften.app/tools/pendulation"
        jsonLd={jsonLd}
      />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Breadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Tools', href: '/tools' }, { label: 'Pendulation' }]} />

        <h1 className="text-3xl font-semibold text-charcoal mb-3">Pendulation</h1>
        <p className="text-charcoal/65 leading-relaxed mb-3">
          Pendulation is a somatic technique developed within the Somatic Experiencing approach.
          Rather than diving into difficult feelings, it gently oscillates your attention between
          a <strong>resource</strong> (something that feels okay) and a <strong>difficult sensation</strong>
          — like a pendulum swinging between two points.
        </p>
        <p className="text-charcoal/65 leading-relaxed mb-8">
          Over time, this builds your window of tolerance — your nervous system's capacity to hold
          difficulty without being overwhelmed.
        </p>

        <div className="bg-clay/10 rounded-2xl p-5 mb-8 border border-clay/20">
          <p className="text-sm text-charcoal/70 font-medium mb-1">A note before you begin</p>
          <p className="text-sm text-charcoal/65">
            This technique is best used when you're not in acute crisis — it works more gently than fast
            first-aid tools. If you're overwhelmed right now, try{' '}
            <a href="/tools/breathing-exercise" className="text-sage underline underline-offset-1">the breathing pacer</a> first.
          </p>
        </div>

        {stepIndex < 0 && (
          <div className="text-center py-4">
            <div className="text-5xl mb-6">🔄</div>
            <p className="text-charcoal/60 mb-8 max-w-sm mx-auto">
              You'll move gently between a resource and a difficult sensation, four times.
              Each round takes just a couple of minutes.
            </p>
            <button
              onClick={() => setStepIndex(0)}
              className="bg-clay text-white font-medium px-8 py-3 rounded-xl hover:bg-clay/90 transition-colors"
            >
              Begin pendulation
            </button>
          </div>
        )}

        {stepIndex >= 0 && !isDone && current && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              {STEPS.map((s, i) => (
                <div
                  key={s.id}
                  className={`flex-1 h-1.5 rounded-full transition-colors ${
                    i < stepIndex ? 'bg-clay' : i === stepIndex ? 'bg-clay' : 'bg-charcoal/10'
                  }`}
                />
              ))}
            </div>

            <div className={`rounded-2xl p-6 mb-5 border ${
              current.phase === 'Resource' || current.phase === 'Return'
                ? 'bg-sage/8 border-sage/25'
                : current.phase === 'Difficult'
                ? 'bg-clay/10 border-clay/25'
                : 'bg-charcoal/5 border-charcoal/15'
            }`}>
              <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/40 mb-2">{current.phase}</p>
              <h2 className="text-xl font-semibold text-charcoal mb-3">{current.label}</h2>
              <p className="text-charcoal/70 leading-relaxed mb-3">{current.instruction}</p>
              <p className="text-charcoal/50 text-sm italic">{current.prompt}</p>
            </div>

            <button
              onClick={() => setStepIndex(i => i + 1)}
              className="w-full bg-clay text-white font-medium py-3 rounded-xl hover:bg-clay/90 transition-colors"
            >
              {stepIndex < STEPS.length - 1 ? 'Continue →' : 'Complete ✓'}
            </button>
          </div>
        )}

        {isDone && (
          <div className="text-center py-8 animate-fade-in">
            <div className="text-5xl mb-4">🌿</div>
            <h2 className="text-2xl font-semibold text-charcoal mb-2">Well done.</h2>
            <p className="text-charcoal/60 mb-6 max-w-sm mx-auto">
              You just practiced the art of pendulation. Each time you do this, you're gently
              expanding your nervous system's capacity. That's real, lasting change.
            </p>
            <button
              onClick={() => setStepIndex(-1)}
              className="text-sm text-clay font-medium underline underline-offset-2"
            >
              Go through it again
            </button>
          </div>
        )}

        <section className="mt-12 pt-10 border-t border-charcoal/10">
          <h2 className="text-xl font-semibold text-charcoal mb-4">How it works</h2>
          <div className="prose-soften">
            <p>
              Pendulation is based on Peter Levine's Somatic Experiencing model, which understands
              trauma and chronic stress as incomplete nervous system responses — energy that got activated
              but never had a chance to complete and discharge. The nervous system then becomes stuck in
              either a state of high activation (anxiety, hypervigilance) or shutdown (numbness, depression).
            </p>
            <p>
              Rather than diving into difficult material, pendulation works with titration — tiny, manageable
              doses of difficulty, alternated with resource. This prevents overwhelm and retraumatization
              while still allowing the nervous system to process.
            </p>
            <p>
              Over time, the nervous system learns that it can visit difficult territory and return to
              safety. The window of tolerance — the band within which you can function without being
              overwhelmed or shutting down — begins to widen. This is what genuine trauma recovery looks like.
            </p>
          </div>
        </section>

        <div className="mt-8 p-4 bg-charcoal/5 rounded-xl text-xs text-charcoal/50 leading-relaxed">
          This exercise is a general wellness tool. If you're working with trauma, consider doing
          pendulation with a trained somatic therapist who can guide and support the process.
        </div>

        <RelatedTools currentSlug="pendulation" tags={['trauma', 'somatic', 'resilience']} />

        <CTABox
          title="Understand your window of tolerance"
          body="Learn what the window of tolerance is and how tools like pendulation help widen it."
          linkTo="/learn/window-of-tolerance"
          linkLabel="Read: The Window of Tolerance"
          variant="clay"
        />
      </div>
    </>
  )
}

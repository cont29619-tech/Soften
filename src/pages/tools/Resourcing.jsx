import { useState } from 'react'
import SEO from '../../components/SEO.jsx'
import Breadcrumbs from '../../components/Breadcrumbs.jsx'
import RelatedTools from '../../components/RelatedTools.jsx'
import CTABox from '../../components/CTABox.jsx'

const STEPS = [
  {
    id: 'choose',
    label: 'Choose Your Resource',
    instruction: 'A resource is anything that brings a small sense of ease, warmth, or support. It might be a real place (your childhood bedroom, a favourite outdoor spot), a real or imagined person or animal, a quality inside yourself (your courage, your love for someone), or a memory of a moment when you felt okay.',
    prompt: 'What comes to mind for you? There\'s no wrong answer. It doesn\'t have to be dramatic — even "slightly less bad" counts.',
    inputLabel: 'My resource is...',
    showInput: true,
  },
  {
    id: 'visualise',
    label: 'Bring It to Life',
    instruction: 'Close your eyes if that feels okay. Imagine your resource as vividly as you can. If it\'s a place, notice what you see, hear, and smell there. If it\'s a person, feel their presence. If it\'s a quality, let yourself feel it as real right now, in this moment.',
    prompt: 'Stay with this for a little while. You don\'t need to do anything — just be in it.',
  },
  {
    id: 'body',
    label: 'Notice Your Body',
    instruction: 'As you hold this resource in your mind, bring attention to your body. Where in your body do you notice even the smallest shift toward ease? It might be a slight warmth in the chest, a softening in the shoulders, a sense of the breath dropping a little lower.',
    prompt: 'Even a tiny change is significant. Your body is responding. Trust what you notice.',
  },
  {
    id: 'anchor',
    label: 'Anchor It',
    instruction: 'Now gently press one hand over your heart, or place both hands on your belly. Feel the weight and warmth of your own touch. This is your anchor — you are bringing your resource into your body through physical sensation.',
    prompt: 'Say to yourself: "This resource is available to me. I can return here."',
  },
  {
    id: 'return',
    label: 'Settle and Return',
    instruction: 'Take three slow breaths. With each exhale, let the resource settle a little deeper. Then, gently, let your eyes open if they were closed. Look around the room slowly. Come back to this moment, carrying a little of that resource with you.',
    prompt: 'Notice how you feel compared to when you started. Even a subtle difference matters.',
  },
]

export default function Resourcing() {
  const [stepIndex, setStepIndex] = useState(-1)
  const [resourceText, setResourceText] = useState('')
  const isDone = stepIndex >= STEPS.length
  const current = STEPS[stepIndex]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Resourcing — Build Your Inner Safe Place',
    description: 'A guided somatic resourcing exercise to build an inner reservoir of calm and safety.',
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
        title="Resourcing — Build Your Inner Safe Place | Soften"
        description="Resourcing is a somatic technique to build an inner reservoir of calm and safety. Guided exercise, free, no sign-up. Based on somatic therapy principles."
        canonical="https://soften.ink/tools/resourcing"
        jsonLd={jsonLd}
      />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Breadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Tools', href: '/tools' }, { label: 'Resourcing' }]} />

        <h1 className="text-3xl font-semibold text-charcoal mb-3">Resourcing</h1>
        <p className="text-charcoal/65 leading-relaxed mb-8">
          Resourcing is the practice of deliberately connecting with a felt sense of support —
          an inner safe place that you can return to, especially when things are difficult.
          It's not about escaping reality. It's about building a real, embodied reservoir of
          calm that your nervous system can draw from.
        </p>

        {stepIndex < 0 && (
          <>
            <div className="bg-sage/8 rounded-2xl p-5 mb-6">
              <h2 className="font-semibold text-charcoal mb-2">When to use this</h2>
              <ul className="space-y-1 text-sm text-charcoal/70">
                <li>• Before entering a stressful situation</li>
                <li>• When you feel depleted or empty inside</li>
                <li>• As a foundation before pendulation or deeper somatic work</li>
                <li>• As a daily practice to build resilience over time</li>
                <li>• Anytime you need to remember that you have inner support</li>
              </ul>
            </div>
            <div className="text-center py-4">
              <div className="text-5xl mb-6">🌿</div>
              <button
                onClick={() => setStepIndex(0)}
                className="bg-sage text-white font-medium px-8 py-3 rounded-xl hover:bg-sage/90 transition-colors"
              >
                Begin resourcing
              </button>
            </div>
          </>
        )}

        {stepIndex >= 0 && !isDone && current && (
          <div className="animate-fade-in">
            <div className="flex gap-1.5 mb-5">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-1.5 rounded-full ${i <= stepIndex ? 'bg-sage' : 'bg-charcoal/10'}`}
                />
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-charcoal/8 mb-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-sage/70 mb-2">
                Step {stepIndex + 1} of {STEPS.length}
              </p>
              <h2 className="text-xl font-semibold text-charcoal mb-3">{current.label}</h2>
              <p className="text-charcoal/70 leading-relaxed mb-3">{current.instruction}</p>
              <p className="text-charcoal/50 text-sm italic">{current.prompt}</p>

              {current.showInput && (
                <div className="mt-4">
                  <label htmlFor="resource-input" className="text-sm font-medium text-charcoal/60 block mb-1.5">
                    {current.inputLabel}
                  </label>
                  <input
                    id="resource-input"
                    type="text"
                    value={resourceText}
                    onChange={e => setResourceText(e.target.value)}
                    placeholder="E.g. my grandmother's kitchen, the ocean, my dog..."
                    className="w-full border border-charcoal/20 rounded-xl px-3 py-2.5 text-sm text-charcoal focus:outline-none focus:border-sage transition-colors"
                  />
                  <p className="text-xs text-charcoal/35 mt-1">Optional — just for yourself. Not stored anywhere.</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setStepIndex(i => i + 1)}
              className="w-full bg-sage text-white font-medium py-3 rounded-xl hover:bg-sage/90 transition-colors"
            >
              {stepIndex < STEPS.length - 1 ? 'Ready — continue →' : 'Complete ✓'}
            </button>
          </div>
        )}

        {isDone && (
          <div className="text-center py-8 animate-fade-in">
            <div className="text-5xl mb-4">🌿</div>
            <h2 className="text-2xl font-semibold text-charcoal mb-2">Your resource is yours.</h2>
            {resourceText && (
              <p className="text-charcoal/60 mb-2">
                <span className="italic">"{resourceText}"</span> — you can return there any time.
              </p>
            )}
            <p className="text-charcoal/60 mb-6 max-w-sm mx-auto">
              The more you practice this, the more accessible your resource becomes. Over time, even
              a single breath while touching your heart can bring you back to that sense of support.
            </p>
            <button
              onClick={() => setStepIndex(-1)}
              className="text-sm text-sage font-medium underline underline-offset-2"
            >
              Practice again
            </button>
          </div>
        )}

        <section className="mt-12 pt-10 border-t border-charcoal/10">
          <h2 className="text-xl font-semibold text-charcoal mb-4">How it works</h2>
          <div className="prose-soften">
            <p>
              In somatic therapy, resourcing is often the first step before any deeper processing work.
              You can't process difficult material from an empty well. Resourcing fills the well.
            </p>
            <p>
              Resources work because memory is embodied. When you recall a safe place or a person who
              loves you, your body actually recreates some of the physiological state you were in during
              that experience. Muscle tension decreases. Breathing slows. The nervous system recognizes
              the pattern and begins to downregulate.
            </p>
            <p>
              The self-touch element (hand on heart, hands on belly) adds an important layer —
              interoceptive sensation grounds the visualization in the present body, preventing it from
              becoming purely cognitive (and therefore less effective). It also activates the
              vagus nerve through gentle pressure, which directly stimulates the parasympathetic system.
            </p>
          </div>
        </section>

        <div className="mt-8 p-4 bg-charcoal/5 rounded-xl text-xs text-charcoal/50 leading-relaxed">
          This exercise is a general wellness tool, not a replacement for professional support.
          If you are experiencing trauma symptoms, please consider working with a somatic therapist.
        </div>

        <RelatedTools currentSlug="resourcing" tags={['somatic', 'safety', 'resilience']} />

        <CTABox
          title="Ready to go deeper? Try pendulation"
          body="Once you have a resource, pendulation uses it to build your capacity to hold difficulty."
          linkTo="/tools/pendulation"
          linkLabel="Try Pendulation"
          variant="sage"
        />
      </div>
    </>
  )
}

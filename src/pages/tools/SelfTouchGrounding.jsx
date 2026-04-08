import { useState } from 'react'
import SEO from '../../components/SEO.jsx'
import Breadcrumbs from '../../components/Breadcrumbs.jsx'
import RelatedTools from '../../components/RelatedTools.jsx'
import CTABox from '../../components/CTABox.jsx'

const STEPS = [
  {
    id: 'heart',
    label: 'Hand on Heart',
    emoji: '💙',
    instruction: 'Place one or both hands flat over your heart. Feel the gentle pressure and warmth.',
    detail: 'This is one of the most direct ways to activate the vagus nerve. The warmth of your own hand tells your nervous system: someone is here. You are not alone.',
    duration: '30 seconds',
  },
  {
    id: 'face',
    label: 'Cup Your Face',
    emoji: '🤲',
    instruction: 'Gently cup your face in both hands. Feel the warmth of your palms against your cheeks. Close your eyes if that feels safe.',
    detail: 'The face has an extraordinarily high density of nerve endings, and touch here sends rapid calming signals to the brainstem. This is why we instinctively cover our faces when upset.',
    duration: '30 seconds',
  },
  {
    id: 'butterfly',
    label: 'Butterfly Hug',
    emoji: '🦋',
    instruction: 'Cross your arms over your chest so each hand rests on the opposite shoulder. Slowly alternate gentle taps — right hand, left hand, right hand, left hand.',
    detail: 'The butterfly hug uses bilateral stimulation — alternating left/right touch — which is the same mechanism used in EMDR therapy. It engages both brain hemispheres and helps integrate difficult feelings.',
    duration: '30–60 seconds',
  },
  {
    id: 'belly',
    label: 'Hands on Belly',
    emoji: '🌊',
    instruction: 'Place both hands on your lower belly. Let them rest there, heavy and warm. Breathe slowly and feel your belly rise into your hands with each inhale.',
    detail: 'The belly is where many people hold fear and anxiety. Placing warm hands here combines gentle pressure with attention, helping the muscles release. The breath rising into your hands brings your breathing downward, activating the parasympathetic system.',
    duration: '30 seconds',
  },
  {
    id: 'arm',
    label: 'Self-Hug',
    emoji: '🫂',
    instruction: 'Wrap your arms around yourself in a gentle hug. Squeeze as firmly as feels good, then soften. Notice the sensation of being held — even if it\'s by yourself.',
    detail: 'Self-holding activates the same neural pathways as being held by another person. Your nervous system doesn\'t fully distinguish between self-touch and the touch of a trusted other — it registers: I am held. I am not alone.',
    duration: '30–60 seconds',
  },
]

export default function SelfTouchGrounding() {
  const [stepIndex, setStepIndex] = useState(-1)
  const isDone = stepIndex >= STEPS.length
  const current = STEPS[stepIndex]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Self-Touch Grounding — Calm Your Nervous System Through Touch',
    description: 'A guided self-touch grounding exercise using hand-on-heart, butterfly hug, and other techniques to activate the vagus nerve and reduce distress.',
    step: STEPS.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.label,
      text: s.instruction,
    })),
    totalTime: 'PT5M',
  }

  return (
    <>
      <SEO
        title="Self-Touch Grounding — Calm Your Nervous System Through Touch"
        description="Use gentle self-touch — hand on heart, butterfly hug, face cup — to activate the vagus nerve and soothe anxiety. Free guided exercise, no sign-up."
        canonical="https://soften.app/tools/self-touch-grounding"
        jsonLd={jsonLd}
      />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Breadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Tools', href: '/tools' }, { label: 'Self-Touch Grounding' }]} />

        <h1 className="text-3xl font-semibold text-charcoal mb-3">Self-Touch Grounding</h1>
        <p className="text-charcoal/65 leading-relaxed mb-8">
          Touch is one of the most direct routes to the nervous system. When we're in distress,
          we instinctively reach for comfort — holding our own chest, covering our face, wrapping
          our arms around ourselves. These aren't weakness. They're your body's wisdom. This exercise
          helps you use that wisdom intentionally.
        </p>

        {stepIndex < 0 && (
          <>
            <div className="bg-sage/8 rounded-2xl p-5 mb-6">
              <h2 className="font-semibold text-charcoal mb-2">When to use this</h2>
              <ul className="space-y-1 text-sm text-charcoal/70">
                <li>• Acute anxiety or distress — this works fast</li>
                <li>• Feeling lonely, unsupported, or disconnected</li>
                <li>• After a difficult conversation or experience</li>
                <li>• When you need to feel held but no one is there</li>
                <li>• As a gentle daily check-in with your body</li>
              </ul>
            </div>
            <div className="text-center py-4">
              <div className="text-5xl mb-6">🤲</div>
              <p className="text-charcoal/55 mb-8 max-w-sm mx-auto text-sm">
                You'll move through five self-touch techniques. For each one, take your time —
                feel the warmth and pressure of your own hands.
              </p>
              <button
                onClick={() => setStepIndex(0)}
                className="bg-sage text-white font-medium px-8 py-3 rounded-xl hover:bg-sage/90 transition-colors"
              >
                Begin
              </button>
            </div>
          </>
        )}

        {stepIndex >= 0 && !isDone && current && (
          <div className="animate-fade-in">
            <div className="flex gap-1.5 mb-5">
              {STEPS.map((_, i) => (
                <div key={i} className={`flex-1 h-1.5 rounded-full ${i <= stepIndex ? 'bg-sage' : 'bg-charcoal/10'}`} />
              ))}
            </div>

            <div className="text-center text-5xl mb-4">{current.emoji}</div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-charcoal/8 mb-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold text-charcoal">{current.label}</h2>
                <span className="text-xs text-charcoal/40 bg-charcoal/5 px-2 py-0.5 rounded-full">{current.duration}</span>
              </div>
              <p className="text-charcoal/80 leading-relaxed mb-4 text-base">{current.instruction}</p>
              <div className="border-t border-charcoal/8 pt-4">
                <p className="text-charcoal/50 text-sm leading-relaxed italic">{current.detail}</p>
              </div>
            </div>

            <button
              onClick={() => setStepIndex(i => i + 1)}
              className="w-full bg-sage text-white font-medium py-3 rounded-xl hover:bg-sage/90 transition-colors"
            >
              {stepIndex < STEPS.length - 1 ? 'Next touch →' : 'Complete ✓'}
            </button>
          </div>
        )}

        {isDone && (
          <div className="text-center py-8 animate-fade-in">
            <div className="text-5xl mb-4">🌸</div>
            <h2 className="text-2xl font-semibold text-charcoal mb-2">You held yourself.</h2>
            <p className="text-charcoal/60 mb-6 max-w-sm mx-auto">
              Five moments of touch, five signals of safety to your nervous system.
              Notice how you feel right now.
            </p>
            <button onClick={() => setStepIndex(-1)} className="text-sm text-sage font-medium underline underline-offset-2">
              Go through it again
            </button>
          </div>
        )}

        <section className="mt-12 pt-10 border-t border-charcoal/10">
          <h2 className="text-xl font-semibold text-charcoal mb-4">How it works</h2>
          <div className="prose-soften">
            <p>
              Touch activates the body's <strong>C-tactile afferent fibers</strong> — a specialized
              nerve system that responds specifically to gentle, slow touch and sends signals directly
              to the brain's social regulation centers. This system evolved for exactly this purpose:
              to let us soothe each other (and ourselves) through touch.
            </p>
            <p>
              The vagus nerve — your body's main parasympathetic highway — has nerve endings in the
              face, ears, and chest. Gentle pressure to these areas directly stimulates vagal tone,
              which slows the heart rate, deepens breathing, and reduces the physiological threat response.
            </p>
            <p>
              Research by Kristen Neff and others on self-compassion has shown that self-touch (particularly
              hand on heart) measurably reduces cortisol and activates the same oxytocin pathways as
              receiving touch from another person. Your nervous system doesn't fully distinguish between
              your own hands and someone else's — compassionate touch is compassionate touch.
            </p>
          </div>
        </section>

        <div className="mt-8 p-4 bg-charcoal/5 rounded-xl text-xs text-charcoal/50 leading-relaxed">
          This exercise is a general wellness tool. It is not a replacement for professional support.
        </div>

        <RelatedTools currentSlug="self-touch-grounding" tags={['anxiety', 'grounding', 'nervous-system']} />

        <CTABox
          title="Try the breathing pacer next"
          body="Combine self-touch with slow breathing for maximum nervous system calming."
          linkTo="/tools/breathing-exercise"
          linkLabel="Try the Breathing Pacer"
          variant="sage"
        />
      </div>
    </>
  )
}

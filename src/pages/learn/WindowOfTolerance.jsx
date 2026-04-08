import { Link } from 'react-router-dom'
import SEO from '../../components/SEO.jsx'
import Breadcrumbs from '../../components/Breadcrumbs.jsx'
import CTABox from '../../components/CTABox.jsx'

export default function WindowOfTolerance() {
  return (
    <>
      <SEO
        title="The Window of Tolerance — What It Is and How to Widen Yours"
        description="The window of tolerance explains why you sometimes feel overwhelmed or numb. Learn what hyperarousal and hypoarousal look like and how to widen your window."
        canonical="https://soften.ink/learn/window-of-tolerance"
        type="article"
      />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Breadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Learn', href: '/learn' }, { label: 'Window of Tolerance' }]} />

        <p className="text-xs text-charcoal/40 mb-6 italic">
          For educational purposes only. For clinical guidance, please consult a licensed professional.
        </p>

        <h1 className="text-3xl font-semibold text-charcoal mb-4">The Window of Tolerance</h1>

        <div className="prose-soften">
          <p>
            One of the most useful concepts in trauma therapy and nervous system work is the
            <strong> window of tolerance</strong> — a term coined by psychiatrist Dr. Dan Siegel to
            describe the zone of nervous system activation within which you can function effectively.
            Understanding it can transform how you relate to your own emotional and physiological responses.
          </p>

          <p>
            Inside the window, you can think clearly, feel your feelings without being overwhelmed by them,
            engage with others, learn, make decisions, and generally function as yourself. Life happens
            here. Growth happens here. Connection happens here.
          </p>

          <p>
            Outside the window — either above or below it — is where things get hard.
          </p>

          {/* Visual diagram */}
          <div className="my-8 rounded-2xl overflow-hidden border border-charcoal/10">
            <div className="bg-sos/15 p-4 text-center">
              <p className="font-semibold text-charcoal/80 text-sm">⬆ HYPERAROUSAL ZONE</p>
              <p className="text-xs text-charcoal/55 mt-1">Anxiety · Panic · Rage · Hypervigilance · Racing thoughts · Overwhelm</p>
            </div>
            <div className="bg-sage/12 p-5 text-center border-y-2 border-sage/30">
              <p className="font-semibold text-charcoal text-sm">WINDOW OF TOLERANCE</p>
              <p className="text-xs text-charcoal/55 mt-1">Present · Flexible · Connected · Able to feel and function</p>
            </div>
            <div className="bg-charcoal/8 p-4 text-center">
              <p className="font-semibold text-charcoal/80 text-sm">⬇ HYPOAROUSAL ZONE</p>
              <p className="text-xs text-charcoal/55 mt-1">Numbness · Shutdown · Dissociation · Depression · Flatness · Fog</p>
            </div>
          </div>

          <h2>Hyperarousal: When You're Above the Window</h2>

          <p>
            Hyperarousal is the state of too much activation. The sympathetic nervous system has fired
            up, flooding the system with stress hormones. Common experiences include:
          </p>

          <ul>
            <li>Racing heart, tight chest, shallow breathing</li>
            <li>Racing thoughts, inability to concentrate</li>
            <li>Panic attacks or waves of dread</li>
            <li>Hypervigilance — scanning constantly for danger</li>
            <li>Irritability, emotional reactivity, feeling overwhelmed</li>
            <li>Sleep disruption — especially trouble falling asleep</li>
          </ul>

          <p>
            In hyperarousal, the prefrontal cortex — the part of the brain responsible for rational
            thought, perspective-taking, and impulse control — goes partially offline. This is why you
            can't "just think your way calm" when you're highly activated. The thinking brain isn't fully
            running the show. The survival brain is.
          </p>

          <h2>Hypoarousal: When You're Below the Window</h2>

          <p>
            Hypoarousal is the opposite: too little activation, or a shutdown. The dorsal vagal system
            has applied the brakes. Common experiences include:
          </p>

          <ul>
            <li>Numbness — difficulty feeling emotions or physical sensations</li>
            <li>Dissociation — feeling "not quite here," foggy, or detached from your body</li>
            <li>Deep fatigue that doesn't lift with rest</li>
            <li>Flat affect — life feels gray, not painful, just empty</li>
            <li>Difficulty making decisions or taking action</li>
            <li>Feeling invisible or absent from your own life</li>
          </ul>

          <p>
            Hypoarousal is often misunderstood as depression — and sometimes it is part of depression.
            But it can also be a nervous system survival response: the system learned that shutdown was
            safer than activation. If expressing emotion or fighting back was dangerous (in childhood
            or in a traumatic relationship), the nervous system may have learned to go quiet instead.
          </p>

          <h2>The Window Is Different for Everyone</h2>

          <p>
            Some people have a naturally wide window — they can tolerate a lot of emotional and physiological
            stimulation before tipping into hyper- or hypoarousal. Others have a very narrow window — small
            stressors can tip them quickly into overwhelm or shutdown.
          </p>

          <p>
            Window size is influenced by genetics, early attachment experiences, trauma history, current
            health and sleep, and — crucially — whether you have a felt sense of support and safety in
            your life. It is not fixed. It can change. That's the central promise of nervous system work.
          </p>

          <h2>How Trauma Narrows the Window</h2>

          <p>
            Trauma — particularly repeated or relational trauma — narrows the window of tolerance
            significantly. The nervous system, designed to detect threat, becomes calibrated for constant
            threat. It sensitizes. Triggers become more numerous and more intense. The zone of workable
            activation shrinks.
          </p>

          <p>
            This is not a flaw. It is an intelligent adaptation. A nervous system that has been in danger
            makes sense to stay on high alert. The problem is that when the danger has passed — or when
            you've moved to a safer life — the nervous system doesn't automatically update. It keeps
            running the old settings.
          </p>

          <h2>How to Widen Your Window</h2>

          <p>
            Widening the window of tolerance is the underlying goal of most trauma-informed therapy
            and of this site's tools. It happens gradually, through repeated experiences of:
          </p>

          <ul>
            <li><strong>Titrated exposure</strong> — visiting difficult territory in small doses (this is what <Link to="/tools/pendulation" className="text-sage">pendulation</Link> does)</li>
            <li><strong>Resourcing</strong> — building a felt sense of internal support before and after difficult work (see <Link to="/tools/resourcing" className="text-sage">resourcing</Link>)</li>
            <li><strong>Discharge</strong> — allowing activation to complete and disperse (see <Link to="/tools/shake-it-off" className="text-sage">therapeutic shaking</Link>)</li>
            <li><strong>Co-regulation</strong> — being in the presence of a regulated other; connection itself is regulating</li>
            <li><strong>Daily regulation practices</strong> — <Link to="/tools/breathing-exercise" className="text-sage">breathing exercises</Link>, body scans, and orienting build capacity over time</li>
          </ul>

          <p>
            The window widens slowly. There are no shortcuts. But the evidence from both clinical research
            and lived experience is clear: it does widen. With consistent practice and, where appropriate,
            skilled therapeutic support, people do recover flexibility. They do come back to a larger,
            more liveable window. And inside that wider window, life becomes more available again.
          </p>

          <h2>A Word About Titration</h2>

          <p>
            One of the most important principles in nervous system work is titration — working with small
            amounts. Trying to process everything at once, or "getting it all out," often drives people
            further out of their window rather than helping them heal. A tiny taste of difficulty, followed
            by a return to resource, teaches the nervous system more than an overwhelming flood.
          </p>

          <p>
            This is counterintuitive in a culture that values intensity and speed. But the nervous system
            heals in drops, not waves.
          </p>
        </div>

        <CTABox
          title="Practice pendulation — widen your window gently"
          body="Pendulation is one of the most direct tools for expanding your window of tolerance through titrated nervous system work."
          linkTo="/tools/pendulation"
          linkLabel="Try Pendulation"
          variant="clay"
        />

        <CTABox
          title="Start with resourcing"
          body="You can't widen your window from empty. Resourcing builds the inner support that makes the rest possible."
          linkTo="/tools/resourcing"
          linkLabel="Try Resourcing"
          variant="sage"
        />

        <div className="mt-8 pt-8 border-t border-charcoal/10">
          <p className="text-sm text-charcoal/50">
            Also read:{' '}
            <Link to="/learn/nervous-system-101" className="text-sage hover:underline">Nervous System 101</Link>
            {' '}·{' '}
            <Link to="/learn/polyvagal-theory" className="text-sage hover:underline">Polyvagal Theory</Link>
            {' '}·{' '}
            <Link to="/blog/what-is-nervous-system-dysregulation" className="text-sage hover:underline">What Is Nervous System Dysregulation?</Link>
          </p>
        </div>
      </div>
    </>
  )
}

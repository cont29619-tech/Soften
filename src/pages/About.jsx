import { Link } from 'react-router-dom'
import SEO from '../components/SEO.jsx'

export default function About() {
  return (
    <>
      <SEO
        title="About Soften — Free Nervous System Regulation Tools"
        description="Soften is a free, independent wellness resource offering nervous system regulation tools based on somatic principles and polyvagal theory. Learn about our mission."
        canonical="https://soften.ink/about"
      />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-semibold text-charcoal mb-6">About Soften</h1>

        <div className="prose-soften">
          <h2>Why Soften Exists</h2>
          <p>
            Nervous system regulation tools work. Breathing exercises, grounding techniques, somatic
            practices, orienting — these are evidence-informed approaches that genuinely help people
            feel calmer, more present, and more capable. But most of them were locked behind paywalls,
            app subscriptions, or required a therapist visit to access.
          </p>
          <p>
            Soften exists to change that. Everything here is free, instant, and requires no account.
            You open it when you need it — like a first aid kit for your nervous system.
          </p>

          <h2>Who This Is For</h2>
          <p>
            Soften is for anyone navigating stress, anxiety, overwhelm, burnout, or the residue of
            difficult life experiences. The entry point is everyday stress — the kind most people live
            with. The tools also serve people in trauma recovery and those who can't access or afford
            professional mental health care.
          </p>
          <p>
            We believe access to basic nervous system regulation tools should not be a privilege.
          </p>

          <h2>What We're Based On</h2>
          <p>
            The exercises and articles on this site are grounded in:
          </p>
          <ul>
            <li><strong>Somatic principles</strong> — the understanding that the body and mind are inseparable, and that healing often needs to happen at the body level</li>
            <li><strong>Polyvagal theory</strong> — Dr. Stephen Porges' framework for understanding how the nervous system detects safety and regulates states</li>
            <li><strong>Trauma-informed practice</strong> — the understanding that many common struggles have roots in adverse experiences that changed the nervous system</li>
            <li><strong>Evidence-informed mindfulness</strong> — techniques like the body scan and paced breathing that have robust research backing</li>
          </ul>
          <p>
            We aim to make this science accessible without oversimplifying it or making it clinical.
            Warm, not textbook.
          </p>

          <h2>Important Disclaimer</h2>
          <p>
            Soften is a free wellness resource for educational and self-care purposes only. It is
            <strong> not therapy, medical advice, or a substitute for professional mental health treatment</strong>.
          </p>
          <p>
            If you are in crisis or experiencing a mental health emergency, please contact the
            <strong> 988 Suicide & Crisis Lifeline</strong> (call or text <strong>988</strong>)
            or go to your nearest emergency room.
          </p>
          <p>
            This site is <strong>not affiliated with Somatic Experiencing® International</strong>.
            It is an independent wellness resource.
          </p>

          <h2>Find a Professional</h2>
          <p>
            If you're ready to work with a professional, these directories can help:
          </p>
          <ul>
            <li>
              <strong>Psychology Today Therapist Finder</strong> — search by location, specialty, and insurance:{' '}
              <span className="text-sage">psychologytoday.com/us/therapists</span>
            </li>
            <li>
              <strong>SE International Practitioner Directory</strong> — find a Somatic Experiencing practitioner:{' '}
              <span className="text-sage">traumahealing.org/find-a-practitioner</span>
            </li>
            <li>
              <strong>Open Path Collective</strong> — reduced-cost therapy for those who can't afford standard rates:{' '}
              <span className="text-sage">openpathcollective.org</span>
            </li>
            <li>
              <strong>988 Suicide & Crisis Lifeline</strong> — 24/7 crisis support, call or text <strong>988</strong>
            </li>
          </ul>

          <h2>Support This Project</h2>
          <p>
            Soften is free and will stay free. If it has helped you and you'd like to support its
            continued development and hosting, you can buy the team a coffee.
          </p>
          <p className="text-charcoal/50 italic text-sm">
            [Donation link coming soon]
          </p>
        </div>

        <div className="mt-10 pt-8 border-t border-charcoal/10 flex flex-wrap gap-4">
          <Link to="/tools" className="text-sm text-sage font-medium hover:underline">Browse all tools →</Link>
          <Link to="/learn" className="text-sm text-sage font-medium hover:underline">Read the guides →</Link>
          <Link to="/check-in" className="text-sm text-sage font-medium hover:underline">Daily check-in →</Link>
        </div>
      </div>
    </>
  )
}

import { useState, useEffect } from 'react'

const KEY = 'soften_disclaimer_dismissed'

export default function DisclaimerBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) {
        setVisible(true)
      }
    } catch {
      // localStorage not available
    }
  }, [])

  function dismiss() {
    try {
      localStorage.setItem(KEY, '1')
    } catch {
      // ignore
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="bg-sage/10 border-b border-sage/20 px-4 py-2.5">
      <div className="max-w-5xl mx-auto flex items-start gap-3 text-sm text-charcoal/70">
        <span className="shrink-0 mt-0.5">ℹ️</span>
        <p className="flex-1">
          Soften is a free wellness resource for self-care purposes only — not therapy or medical advice.
          If you're in crisis, call or text <strong className="text-charcoal">988</strong>.
        </p>
        <button
          onClick={dismiss}
          aria-label="Dismiss disclaimer"
          className="shrink-0 text-charcoal/40 hover:text-charcoal transition-colors text-lg leading-none"
        >
          ×
        </button>
      </div>
    </div>
  )
}

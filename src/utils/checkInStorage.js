const KEY = 'soften_checkin_history'
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000 // 90 days

export function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]')
  } catch {
    return []
  }
}

export function addEntry(entry) {
  // entry shape: { date: ISOString, stateId: string, stateLabel: string, dotColor: string }
  try {
    const history = getHistory()
    history.push({ ...entry, date: new Date().toISOString() })
    const cutoff = Date.now() - MAX_AGE_MS
    const trimmed = history.filter(e => new Date(e.date).getTime() > cutoff)
    localStorage.setItem(KEY, JSON.stringify(trimmed))
    return trimmed
  } catch {
    return []
  }
}

export function clearHistory() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // ignore
  }
}

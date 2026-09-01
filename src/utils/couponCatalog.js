const CATALOG_KEY = 'wawoo_public_coupons'
const CLAIMED_KEY = 'wawoo_claimed_coupons'

export function normalizeCoupons(raw) {
  const list = Array.isArray(raw) ? raw : Object.values(raw || {})
  return list
    .filter((item) => item && item.is_enabled)
    .map((item) => ({
      id: item.id,
      title: item.title || '',
      code: item.code || '',
      percent: Number(item.percent || 100),
      due_date: item.due_date
    }))
}

export function syncPublicCoupons(raw) {
  const list = normalizeCoupons(raw)
  localStorage.setItem(CATALOG_KEY, JSON.stringify(list))
  pruneClaimedCodes(list)
  return list
}

export function readPublicCoupons() {
  try {
    const raw = JSON.parse(localStorage.getItem(CATALOG_KEY) || '[]')
    return Array.isArray(raw) ? raw : []
  } catch {
    return []
  }
}

export function readClaimedCodes() {
  try {
    const raw = JSON.parse(localStorage.getItem(CLAIMED_KEY) || '[]')
    return Array.isArray(raw) ? raw : []
  } catch {
    return []
  }
}

export function pruneClaimedCodes(catalog = readPublicCoupons()) {
  const validCodes = new Set(
    (catalog || []).map((item) => String(item?.code || '').trim()).filter(Boolean)
  )
  const next = readClaimedCodes().filter((code) => validCodes.has(String(code || '').trim()))
  localStorage.setItem(CLAIMED_KEY, JSON.stringify(next))
  return next
}

export function claimCouponCode(code) {
  const next = Array.from(new Set([...readClaimedCodes(), String(code || '').trim()].filter(Boolean)))
  localStorage.setItem(CLAIMED_KEY, JSON.stringify(next))
  return next
}

export function isCouponClaimed(code) {
  return readClaimedCodes().includes(String(code || '').trim())
}

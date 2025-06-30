// lib/cache.ts
const cache: Record<string, { data: any; expiresAt: number }> = {}

export function getCache(key: string) {
  const entry = cache[key]
  const now = Date.now()

  if (entry && entry.expiresAt > now) {
    console.log(`🟢 Cache HIT for key: ${key}`)
    return entry.data
  }

  console.log(`🔴 Cache MISS for key: ${key}`)
  return null
}

export function setCache(key: string, data: any, ttl = 1000 * 60 * 2) { // 2 mins
  console.log(`💾 Setting cache for key: ${key} with TTL ${ttl / 1000}s`)
  cache[key] = {
    data,
    expiresAt: Date.now() + ttl,
  }
}

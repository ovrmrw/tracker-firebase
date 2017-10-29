export function getRandomString(length: number): string {
  return Math.random().toString(36).slice(-1 * length)
}

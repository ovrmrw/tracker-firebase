export class CookieController {

  getValue(key: string): string {
    const regExp: RegExp = new RegExp(key + '=')
    const value: string = document.cookie
      .split(';').map(s => s.trim())
      .map(s => s.match(regExp)).filter(f => f)
      .map(a => a ? a.input || '' : '').filter(f => f)
      .reduce((_, v) => v, '')
      .split('=')[1] || ''
    return value
  }

  setValue(key: string, value: string, domain: string): void {
    const segments: string[] = domain.replace(/\//g, '')
      .split('.').reverse()
    const maxAge: number = 60 * 60 * 24 * 365 * 2
    let topLevelDomain: string = ''
    for (const segment of segments) {
      topLevelDomain = '.' + segment + topLevelDomain
      document.cookie = `${key}=${value}; path=/; domain=${topLevelDomain}; max-age=${maxAge}`
      if (this.getValue(key) === value) {
        break;
      }
    }
  }

}

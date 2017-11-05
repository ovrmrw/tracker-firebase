import { _location } from './config'
import { namespace, getRandomString } from './utils'

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

  setValue(key: string, value: string, maxAge: number): void {
    const segments: string[] = _location.hostname.replace(/\//g, '')
      .split('.').reverse()
    let topLevelDomain: string = ''
    for (const segment of segments) {
      topLevelDomain = '.' + segment + topLevelDomain
      document.cookie = `${key}=${value}; path=/; domain=${topLevelDomain}; max-age=${maxAge}`
      this.setTopLevelDomain(key, value, topLevelDomain)
    }
  }

  private setTopLevelDomain(key, value, domain: string): void {
    if (namespace().topLevelDomain) {
      return
    }
    if (this.getValue(key) === value && domain.split('.').filter(s => s).length > 1) {
      namespace().topLevelDomain = domain.replace(/^\./, '')
    }
  }

  setDummyValueForDetermineTopLevelDomain(): void {
    const key: string = '__' + getRandomString(4)
    const value: string = getRandomString(6)
    const maxAge: number = 1
    this.setValue(key, value, maxAge)
  }

}

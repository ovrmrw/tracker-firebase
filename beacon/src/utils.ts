import { Namespace } from './models'
import { NAMESPACE, _window, _location } from './config'
import { CookieController } from './cookie'

export function namespace(): Namespace {
  if (!_window[NAMESPACE]) {
    _window[NAMESPACE] = {}
  }
  return _window[NAMESPACE]
}

export function getTopLevelDomain(): string {
  return namespace().topLevelDomain || _location.hostname || ''
}

export function getRandomString(length: number): string {
  return Math.random().toString(36).slice(-1 * length)
}

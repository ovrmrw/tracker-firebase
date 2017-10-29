import { TRACKER_DOMAIN, TRACKER_ENDPOINT, NAMESPACE, UID_1ST_KEY } from './config'
import { CookieController } from './cookie'

interface Namespace {
  res?: TrackerResponse
}

interface TrackerResponse {
  uid: string
  generated: boolean
}

const _window: any = window
const cc: CookieController = new CookieController()

fetch(TRACKER_ENDPOINT, { mode: 'cors', credentials: 'include' })
  .then<TrackerResponse>(res => res.json())
  .then(setResponseDataToNamespace)
  .then(set1stPartyCookie)

function setResponseDataToNamespace(data: TrackerResponse): void {
  namespace().res = !!data.uid ? data : undefined
}

function getUid(): string {
  const uidFromCookie: string = cc.getValue(UID_1ST_KEY)
  const res: TrackerResponse | undefined = namespace().res
  if (res && !res.generated) {
    return res.uid;
  } else if (uidFromCookie) {
    return uidFromCookie
  } else {
    return res ? res.uid : '';
  }
}

function set1stPartyCookie(): void {
  const uid: string = getUid();
  cc.setValue(UID_1ST_KEY, uid, location.hostname)
}

function namespace(): Namespace {
  if (!_window[NAMESPACE]) {
    _window[NAMESPACE] = {}
  }
  return _window[NAMESPACE]
}

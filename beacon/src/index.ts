import { firebaseConfig } from './config'

interface Namespace {
  res?: TrackerResponse
}

interface TrackerResponse {
  uid: string
  exist: boolean
}

const TRACKER_DOMAIN = `us-central1-${firebaseConfig.projectId}.cloudfunctions.net`
const TRACKER_ENDPOINT = `https://${TRACKER_DOMAIN}/api/tracker`
const NAMESPACE = '_tracker'
const _window: any = window

fetch(TRACKER_ENDPOINT, { mode: 'cors', credentials: 'include' })
  .then<TrackerResponse>(res => res.json())
  .then(setResponseDataToNamespace)
  .then(set1stPartyCookie)

function setResponseDataToNamespace(data: TrackerResponse): void {
  namespace().res = !!data.uid ? data : undefined
}

function getUid(): string {
  const uidFromCookie: string = document.cookie
    .split(';').map(s => s.trim())
    .map(s => s.match(/_tracker_uid=/)).filter(f => f)
    .map(a => a ? a.input || '' : '').filter(f => f)
    .reduce((_, v) => v, '')
    .split('=')[1] || ''
  if (namespace().res && namespace().res!.exist) {
    return namespace().res!.uid;
  } else if (uidFromCookie) {
    return uidFromCookie
  } else {
    return namespace().res ? namespace().res!.uid : '';
  }
}

function set1stPartyCookie(): void {
  const uid: string = getUid();
  const maxAge: number = 60 * 60 * 24 * 365;
  if (uid) {
    document.cookie = `_tracker_uid=${uid}; path=/; max-age=${maxAge}`
  }
}

function namespace(): Namespace {
  if (!_window[NAMESPACE]) {
    _window[NAMESPACE] = {}
  }
  return _window[NAMESPACE]
}

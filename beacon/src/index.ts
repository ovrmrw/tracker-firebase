import { TRACKER_DOMAIN, TRACKER_ENDPOINT, NAMESPACE, UID_1ST_KEY, _window, _location } from './config'
import { CookieController } from './cookie'
import { Namespace, TrackerResponse } from './models'
import { namespace } from './utils'

const cc: CookieController = new CookieController()
cc.setDummyValueForDetermineTopLevelDomain()

fetch(TRACKER_ENDPOINT, { mode: 'cors', credentials: 'include' })
  .then<TrackerResponse>(res => res.json())
  .then(setResponseDataToNamespace)
  .then(set1stPartyCookie)


function setResponseDataToNamespace(data: TrackerResponse): void {
  namespace().res = !!data.uid ? data : undefined
}

function set1stPartyCookie(): void {
  const uid: string = getUid();
  cc.setValue(UID_1ST_KEY, uid, 60 * 60 * 24 * 365 * 2)
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

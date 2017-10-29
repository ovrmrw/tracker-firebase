import { functions, admin } from './admin'
import * as express from 'express'
import * as cookieParser from 'cookie-parser'
import { CookieOptions } from 'express'
import * as cors from 'cors'
import { getRandomString } from './utils'

const projectId: string = functions.config().firebase.projectId
const COOKIE_DOMAIN = `us-central1-${projectId}.cloudfunctions.net`
const COOKIE_KEY = '_tracker_uid_ssr'

const app = express()

app.use(cors({ origin: true }))

const html = `
<!doctype html>
<head><meta charset="utf-8"><title></title></head>
<body>
<script>
var COOKIE_DOMAIN = '${COOKIE_DOMAIN}';
var COOKIE_KEY = '${COOKIE_KEY}';
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
function receiveMessage(event) {
  console.log(event);
  if (!event.data) {
    return;
  }
  var uid = getCookie(COOKIE_KEY) || Math.random().toString(36).slice(-10);
  var json = {
    uid: uid,
    generated: !getCookie(COOKIE_KEY)
  }
  var maxAge = 60 * 60 * 24 * 365 * 2;

  document.cookie = COOKIE_KEY + '=' + uid + '; path=/; max-age=' + maxAge + '; domain=' + COOKIE_DOMAIN;

  event.source.postMessage(JSON.stringify(json), event.origin);
}
window.addEventListener("message", receiveMessage, false);
</script>
</body>
</html>
`

app.get('/tracker', (req, res) => {
  res.status(200).send(html);
})

export const ssr = functions.https.onRequest(app);

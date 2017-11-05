import { functions, admin } from './admin'
import * as express from 'express'
import * as cookieParser from 'cookie-parser'
import { CookieOptions } from 'express'
import * as cors from 'cors'
import { getRandomString } from './utils'

const projectId: string = functions.config().firebase.projectId
const COOKIE_DOMAIN = `us-central1-${projectId}.cloudfunctions.net`

const app = express()

app.use(cors({ origin: true }))
app.use(cookieParser())

app.get('/log-config', (req, res) => {
  const config: any = functions.config()
  console.log(config)
  res.send('functions.config() is logged.')
})

app.get('/tracker', (req, res) => {
  const uid: string = req.cookies['_uid'] || getRandomString(10)
  const json = {
    uid,
    generated: !req.cookies['_uid'],
  }
  const options: CookieOptions = {
    maxAge: 1000 * 60 * 60 * 24 * 365 * 2,
    httpOnly: false,
    signed: false,
    path: '/',
    domain: COOKIE_DOMAIN,
  }

  res.cookie('_uid', uid, options)
    .set('Access-Control-Allow-Credentials', 'true')
    .send(json)
})

export const api = functions.https.onRequest(app);

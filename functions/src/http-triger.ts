import { functions, admin, projectId } from './admin'
import * as express from 'express'
import * as cookieParser from 'cookie-parser'
import { CookieOptions } from 'express'
import * as cors from 'cors'

const DOMAIN = `us-central1-${projectId}.cloudfunctions.net`

const app = express()

app.use(cors({ origin: true }))
app.use(cookieParser())

app.get('/hello/:name', (req, res) => {
  const name = req.params.name || 'who?'
  res.send(`Hello ${name}`)
})

app.get('/log-config', (req, res) => {
  const config = functions.config()
  console.log(config)
  res.send('functions.config() is logged.')
})

app.get('/js', (req, res) => {
  const js = '(function(){ alert(1); })();'
  res.contentType('text/javascript').send(js)
  /**
   * クライアントコードは下記のようにすると受け取ったJSを動的に実行できる。
   * fetch('https://us-central1-{projectId}.cloudfunctions.net/api/js')
   *   .then(res => res.text())
   *   .then(js => {
   *     const script = document.createElement('script')
   *     script.innerHTML = js
   *     script.async = true
   *     document.body.appendChild(script)
   *   })
   */
})

app.get('/tracker', (req, res) => {
  const uid = req.cookies['_uid'] || Math.random().toString(36).slice(-10)

  const options: CookieOptions = {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    httpOnly: false,
    signed: false,
    path: '/',
    domain: DOMAIN,
  }

  res.cookie('_uid', uid, options).send(`tracking ${uid}`)
})

export const api = functions.https.onRequest(app);
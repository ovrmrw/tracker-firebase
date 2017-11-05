# tracker-firebase

## deploy

```
$ npm run deploy:all
```

## description

1. https://tracker-firebase-ffcd5.firebaseapp.com/ にアクセスする。
1. ページ内の `beacon.js` が発火する。
1. beaconが https://us-central1-tracker-firebase-ffcd5.cloudfunctions.net/api/tracker にリクエストを送る。
1. レスポンスヘッダーにSet-Cookieが仕込まれているので `us-central1-tracker-firebase-ffcd5.cloudfunctions.net` ドメインに対してCookie書き込みがされる。(3rd party Cookie)
1. レスポンス(JSON)にuidが含まれているので、JavaScriptの `document.cookie` で `tracker-firebase-ffcd5.firebaseapp.com` ドメインに対してもCookie書き込みする。(1st party Cookie)

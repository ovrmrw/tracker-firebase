const firebaseConfig = {
  apiKey: "AIzaSyDF-EuQSKISA4YJGBmeDDACZza45ipouZY",
  authDomain: "tracker-firebase-ffcd5.firebaseapp.com",
  databaseURL: "https://tracker-firebase-ffcd5.firebaseio.com",
  projectId: "tracker-firebase-ffcd5",
  storageBucket: "tracker-firebase-ffcd5.appspot.com",
  messagingSenderId: "741454611754"
}

export const TRACKER_DOMAIN = `us-central1-${firebaseConfig.projectId}.cloudfunctions.net`
export const TRACKER_ENDPOINT = `https://${TRACKER_DOMAIN}/api/tracker`
export const NAMESPACE = '_tracker'
export const UID_1ST_KEY = '_tracker_uid'

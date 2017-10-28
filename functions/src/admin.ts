import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

const config = functions.config()

admin.initializeApp(config.firebase)

export { functions, admin }

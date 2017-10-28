import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

const config = functions.config()

admin.initializeApp(config.firebase)

const projectId = config.projectId

export { functions, admin, projectId }

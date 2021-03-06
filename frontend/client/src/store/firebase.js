import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/functions'
import 'firebase/analytics'
import * as firebaseConfigLocal from '../config/firebase.config.local'
import * as firebaseConfigDev from '../config/firebase.config.dev'
import * as firebaseConfigTest from '../config/firebase.config.test'
import * as firebaseConfigProd from '../config/firebase.config.prod'
import * as firebaseConfigStaging from '../config/firebase.config.staging'

var firebaseConfigMap = {
  development: firebaseConfigDev,
  test: firebaseConfigTest,
  production: firebaseConfigProd,
  local: firebaseConfigLocal,
  staging: firebaseConfigStaging,
}

const config = firebaseConfigMap[process.env ? process.env.NODE_ENV : 'development']

app.initializeApp(config)
const auth = app.auth()
const SESSION = app.auth.Auth.Persistence.SESSION
const NONE = app.auth.Auth.Persistence.NONE
const db = app.firestore()
// Instantiation of app.analytics() throws "IDB requires a browser environment" when running jest tests, so just return an empty object for the test env
const analytics = process.env.NODE_ENV !== 'test' ? app.analytics() : {}
const createUserCallable = app.functions().httpsCallable('createUser')
const initiatePasswordRecoveryCallable = app.functions().httpsCallable('initiatePasswordRecovery')
const getVerificationCodeCallable = app.functions().httpsCallable('getVerificationCode')

export {
  auth,
  db,
  SESSION,
  NONE,
  analytics,
  createUserCallable,
  initiatePasswordRecoveryCallable,
  getVerificationCodeCallable,
}

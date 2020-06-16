import { types, cast, onSnapshot } from 'mobx-state-tree'
import 'mobx-react-lite/batchingForReactDom'
import Logging from '../util/logging'

const User = types
  .model({
    isSignedIn: types.boolean,
    email: types.string,
    isAdmin: types.boolean,
    isSuperAdmin: types.boolean,
    disabled: types.boolean,
    prefix: types.maybe(types.string),
    imageBlob: types.maybeNull(types.string),
    firstName: types.string,
    lastName: types.string,
    organizationID: types.string,
    isFirstTimeUser: types.boolean,
    passwordResetRequested: types.boolean,
    passwordResetCompletedInCurrentSession: types.boolean,
    signedInWithEmailLink: types.boolean,
  })
  .actions((self) => {
    const __update = (updates) => {
      Object.keys(updates).forEach((key) => {
        if (self.hasOwnProperty(key)) self[key] = updates[key] // eslint-disable-line no-prototype-builtins
      })
      Logging.log('Updated User:')
      Logging.log(self)
    }

    return { __update }
  })

const Organization = types
  .model({
    id: types.string,
    name: types.string,
    welcomeText: types.string,
    enableExposureText: types.string,
    recommendExposureText: types.string,
    notifyingOthersText: types.string,
    exposureInfoText: types.string,
    exposureAboutText: types.string,
    exposureDetailsText: types.string,
    exposureDetailsLearnText: types.string,
    verificationStartText: types.string,
    verificationIdentifierText: types.string,
    verificationIdentifierAboutText: types.string,
    verificationAdministrationDateText: types.string,
    verificationReviewText: types.string,
    verificationSharedText: types.string,
    verificationNotSharedText: types.string,
    diagnosisText: types.string,
    exposureText: types.string,
    currentPageOfMembers: types.array(User),
  })
  .actions((self) => {
    const __update = (updates) => {
      Object.keys(updates).forEach((key) => {
        if (self.hasOwnProperty(key)) self[key] = updates[key] // eslint-disable-line no-prototype-builtins
      })
      Logging.log('Updated Organization:')
      Logging.log(self)
    }

    const __setCurrentPageOfMembers = (pageOfMembers) => {
      self.currentPageOfMembers = cast(pageOfMembers)
    }

    return { __update, __setCurrentPageOfMembers }
  })

const Store = types.model({
  user: User,
  organization: Organization,
})

const defaultUser = {
  isSignedIn: false, // frontend-only field
  email: '',
  isAdmin: false,
  isSuperAdmin: false,
  disabled: false,
  prefix: '',
  firstName: '',
  lastName: '',
  organizationID: '',
  imageBlob: null,
  isFirstTimeUser: true,
  passwordResetRequested: false,
  passwordResetCompletedInCurrentSession: false, // frontend-only field
  signedInWithEmailLink: false, // frontend-only field
}

const defaultOrganization = {
  id: '',
  name: '',
  welcomeText: '',
  enableExposureText: '',
  recommendExposureText: '',
  notifyingOthersText: '',
  exposureInfoText: '',
  exposureAboutText: '',
  exposureDetailsText: '',
  exposureDetailsLearnText: '',
  verificationStartText: '',
  verificationIdentifierText: '',
  verificationIdentifierAboutText: '',
  verificationAdministrationDateText: '',
  verificationReviewText: '',
  verificationSharedText: '',
  verificationNotSharedText: '',
  diagnosisText: '',
  exposureText: '',
  currentPageOfMembers: [],
}

const defaultStore = {
  user: defaultUser,
  organization: defaultOrganization,
}

let initialStore = defaultStore

// Based on https://egghead.io/lessons/react-store-store-in-local-storage
if (sessionStorage.getItem('store')) {
  initialStore = JSON.parse(sessionStorage.getItem('store'))
}

const rootStore = Store.create({
  ...initialStore,
})

// Based on https://egghead.io/lessons/react-store-store-in-local-storage
onSnapshot(rootStore, (snapshot) => {
  sessionStorage.setItem('store', JSON.stringify(snapshot))
})

export { rootStore, defaultUser, defaultOrganization }

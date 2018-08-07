import { takeLatest, all } from 'redux-saga/effects'
// You'll need to alter this file when you go to connect the api for realsies. Add
// back the lines ending with with a # (and of course, remove the #) :)
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

// Types
import { PatientTypes } from '../Redux/PatientRedux'
import { StartupTypes } from '../Redux/StartupRedux'

// Sagas
import { postPatient, getPatients, getPatient, updatePatient, removePatient } from './PatientSagas'
import { startup } from './StartupSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(PatientTypes.PATIENT_REQUEST, getPatient, api),
    takeLatest(PatientTypes.PATIENT_ALL, getPatients, api),
    takeLatest(PatientTypes.PATIENT_ATTEMPT, postPatient, api),
    takeLatest(PatientTypes.PATIENT_UPDATE, updatePatient, api),
    takeLatest(PatientTypes.PATIENT_REMOVE, removePatient, api),
    takeLatest(StartupTypes.STARTUP, startup)

    // some sagas receive extra parameters in addition to an action
    // takeLatest(UserTypes.USER_REQUEST, getUserAvatar, api)
  ])
}

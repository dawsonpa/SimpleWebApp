import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  patientRequest: ['data'],
  patientAttempt: ['data'],
  patientUpdate: ['data'],
  patientRemove: ['data'],
  patientAll: ['data'],
  patientData: ['data'],
  patientSuccess: ['payload'],
  patientSingleSuccess: ['patient'],
  patientAllSuccess: ['patients'],
  patientFailure: null,
  setFilteredPatients: ['filteredPatients']
})

export const PatientTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: {},
  fetching: null,
  payload: null,
  single: null,
  multi: null,
  error: null,
  patients: [],
  patient: {},
  filteredPatients: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// Or post it, straight out of Redux
export const attempt = state => state.merge({ fetching: true, payload: null })

// or, Update it.
export const update = state => state.merge({ fetching: true, payload: null })

// or, Delete it.
export const remove = state => state.merge({ fetching: true })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

export const singleSuccess = (state, action) => {
  const { patient } = action
  return state.merge({ fetching: false, error: null, patient, single: patient })
}

export const allSuccess = (state, action) => {
  const { patients } = action
  return state.merge({ fetching: false, error: null, patients, multi: patients })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

// Or just merge a new object
export const data = (state, { data }) =>
  state.merge({ data }, {deep: true})

export const setFilteredPatients = (state, action) => {
  const { filteredPatients } = action
  return state.merge({ fetching: false, error: null, filteredPatients, multi: filteredPatients })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PATIENT_REQUEST]: request,
  [Types.PATIENT_ATTEMPT]: attempt,
  [Types.PATIENT_UPDATE]: update,
  [Types.PATIENT_REMOVE]: remove,
  [Types.PATIENT_ALL]: request,
  [Types.PATIENT_DATA]: data,
  [Types.PATIENT_SUCCESS]: success,
  [Types.PATIENT_SINGLE_SUCCESS]: singleSuccess,
  [Types.PATIENT_ALL_SUCCESS]: allSuccess,
  [Types.PATIENT_FAILURE]: failure,
  [Types.SET_FILTERED_PATIENTS]: setFilteredPatients
})

/* ------------- Selectors ------------- */

export const getFilteredPatients = state =>
  state.patient.filteredPatients
    ? state.patient.filteredPatients
    : state.patient.patients

import { call, put, select } from 'redux-saga/effects'
import PatientActions from '../Redux/PatientRedux'
import { getAttributes, mapAttributes, updateMulti, insertMulti } from '../Transforms/TransformAttributes'
import { merge } from 'ramda'
import { showSagaMessage } from '../Translations/SagaMessages'
// import history from '../Services/BrowserHistory'

export const theData = state => state.patient.data
export const theMulti = state => state.patient.multi
export const theUserPrefs = state => state.user.preferences
export const transformedData = response => getAttributes(response.data)

export function * getPatient (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.getPatient, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(PatientActions.patientSingleSuccess(transformedData(response)))
    yield put(PatientActions.patientData(transformedData(response)))
    // history.push('/path/to/some/url' + data.id, { type: 'patient'  })
  } else {
    yield put(PatientActions.patientFailure())
  }
}

export function * postPatient (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.postPatient, data)

  // success?
  if (response.ok) {
    yield put(PatientActions.patientSingleSuccess(transformedData(response)))
    yield put(PatientActions.patientData(transformedData(response)))
    const multi = yield select(theMulti)
    yield put(
      PatientActions.patientAllSuccess(
        insertMulti(transformedData(response), multi)
      )
    )
    yield call(showSagaMessage, 'saved')
  } else {
    yield put(PatientActions.patientFailure())
    yield call(showSagaMessage, 'error')
  }
}

export function * updatePatient (api, action) {
  const { data } = action
  // make the call to the api
  const params = yield select(theData)
  const response = yield call(api.updatePatient, merge(data, params))

  // success?
  if (response.ok) {
    yield put(PatientActions.patientSingleSuccess(transformedData(response)))
    yield put(PatientActions.patientData(transformedData(response)))
    const multi = yield select(theMulti)
    yield put(
      PatientActions.patientAllSuccess(
        updateMulti(transformedData(response), multi)
      )
    )
    yield call(showSagaMessage, 'saved')
  } else {
    yield put(PatientActions.patientFailure())
    yield call(showSagaMessage, 'error')
  }
}

export function * removePatient (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.removePatient, data)

  // success?
  if (response.ok) {
    yield put(PatientActions.patientSuccess(response.data))
  } else {
    yield put(PatientActions.patientFailure())
  }
}

export function * getPatients (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.getPatients, data)

  // success?
  if (response.ok) {
    yield put(PatientActions.patientAllSuccess(response.data))
    // history.push('/path/to/some/url')
  } else {
    yield put(PatientActions.patientFailure())
  }
}

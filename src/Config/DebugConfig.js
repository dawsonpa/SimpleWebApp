export default {
  useFixtures: false,
  ezLogin: false,
  yellowBox: false,
  reduxLogging: false,
  includeExamples: false,
  useReactotron: false,
  apiURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : null,
  keysToFilter: ['Patient Last Name', 'Patient City', 'Patient State', 'Surgery Appt Reason']
}

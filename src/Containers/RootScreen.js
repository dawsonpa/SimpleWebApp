import React from 'react'
import { Header, List } from '../Components'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import Colors from '../Themes/Colors'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import PatientsActions, { getFilteredPatients } from '../Redux/PatientRedux'

export class RootScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentWillMount () {
    this.props.getPatients()
  }

  render () {
    const {
      patients,
      filteredPatients,
      setFilteredPatients
    } = this.props
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 8, backgroundColor: Colors.background }}>
        <Header patients={patients} setFilteredPatients={setFilteredPatients} />
        <List data={filteredPatients} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    patients: state.patient.patients,
    filteredPatients: getFilteredPatients(state)

  }
}

const mapDispatchToProps = dispatch => {
  return {
    setFilteredPatients: filteredPatients => dispatch(PatientsActions.setFilteredPatients(filteredPatients)),
    getPatients: () => dispatch(PatientsActions.patientAll())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  injectIntl(RootScreen)
)

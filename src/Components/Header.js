import React from 'react'
import PropTypes from 'prop-types'
// import { FormattedMessage, injectIntl } from 'react-intl'
// import messages from './Messages/HeaderMessages'
import Img from './Img'
import SearchBar from './SearchBar'
import styles from './Styles/HeaderStyle'
import { Images } from '../Themes'
import DebugConfig from '../Config/DebugConfig'

export default class Header extends React.Component {
 constructor (props) {
   super(props)

   this.onNullSearch = this.onNullSearch.bind(this)
 }

// componentWillReceiveProps (newProps) {
//   this.setState({ something: newProps.something })
// }

  onNullSearch () {
    const {
      setFilteredPatients
    } = this.props

    setFilteredPatients(null)
  }

  render () {
    const {
      patients,
      setFilteredPatients
    } = this.props
    return (
      <div style={styles.container}>
        <div>
          <Img style={{height: 50, width: 200}} src={Images.simply} alt={'simply'} />
        </div>
        <SearchBar keysToFilter={DebugConfig.keysToFilter} dataSource={patients} onChange={setFilteredPatients} onNullSearch={this.onNullSearch} />
      </div>
    )
  }
}

// react-intl Messages, outside of FormatMessage
// https://stackoverflow.com/questions/35186297/how-to-retrieve-a-string-in-reactintl-2-0-without-using-formattedmessage/39161208#39161208
// If you can't use <FormattedMessage /> for some reason, you can use this
// syntax: `this.context.intl.formatMessage({ ...messages.default })`
// by uncommenting the next block.
//  Header.contextTypes = {
//   intl: PropTypes.object.isRequired
// }

// Prop type warnings
Header.propTypes = {
  patients: PropTypes.arrayOf(PropTypes.object),
  setFilteredPatients: PropTypes.func
}
//
// // Defaults for props
// Header.defaultProps = {
//   someSetting: false
// }

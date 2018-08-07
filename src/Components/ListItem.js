import React from 'react'
import PropTypes from 'prop-types'
// import { FormattedMessage, injectIntl } from 'react-intl'
// import messages from './Messages/ListItemMessages'
import { Panel } from 'react-bootstrap'
import styles from './Styles/ListItemStyle'
import './Styles/ListItem.css'

export default class ListItem extends React.Component {
//  constructor (props) {
//    super(props)
//    this.state = {
//      something: props.something
//    }
//  }

// componentWillReceiveProps (newProps) {
//   this.setState({ something: newProps.something })
// }

  renderTitle () {
    const {
      data
    } = this.props
    return (
      <div style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
        <span>{data['Patient Last Name']}</span>
        <span>{`${data['Patient City']}, ${data['Patient State']}`}</span>
      </div>
    )
  }

  renderBody () {
    const {
      data
    } = this.props

    return (
      <div className={'ListItem_Body'}>
        <div className={'ListItem_Body_Row'}>
          <div className={'ListItem_Body_Column'}>
            <strong>Last Name</strong>
            <span style={{borderBottom: '1px solid #cccccc'}}>{data['Patient Last Name']}</span>
          </div>
          <div className={'ListItem_Body_Column'}>
            <strong>City</strong>
            <span style={{borderBottom: '1px solid #cccccc'}}>{data['Patient City']}</span>
          </div>
          <div className={'ListItem_Body_Column'}>
            <strong>State</strong>
            <span style={{borderBottom: '1px solid #cccccc'}}>{data['Patient State']}</span>
          </div>
        </div>
        <div className={'ListItem_Body_Row'}>
          <div className={'ListItem_Body_Column'}>
            <strong>Surgery Appt Reason</strong>
            <span style={{borderBottom: '1px solid #cccccc'}}>{data['Surgery Appt Reason']}</span>
          </div>
        </div>
      </div>
    )
  }

  render () {
    const {
      index
    } = this.props
    return (
      <Panel className={'ListItem_Panel'} eventKey={`${index}`} >
        <Panel.Heading>
          <Panel.Title toggle >
            {this.renderTitle()}
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible>
          {this.renderBody()}
        </Panel.Body>
      </Panel>
    )
  }
}

// react-intl Messages, outside of FormatMessage
// https://stackoverflow.com/questions/35186297/how-to-retrieve-a-string-in-reactintl-2-0-without-using-formattedmessage/39161208#39161208
// If you can't use <FormattedMessage /> for some reason, you can use this
// syntax: `this.context.intl.formatMessage({ ...messages.default })`
// by uncommenting the next block.
//  ListItem.contextTypes = {
//   intl: PropTypes.object.isRequired
// }

// Prop type warnings
ListItem.propTypes = {
  data: PropTypes.object,
  index: PropTypes.number.isRequired
}
//
// // Defaults for props
// ListItem.defaultProps = {
//   someSetting: false
// }

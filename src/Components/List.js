import React from 'react'
import PropTypes from 'prop-types'
import { PanelGroup, Alert } from 'react-bootstrap'
// import { FormattedMessage, injectIntl } from 'react-intl'
// import messages from './Messages/ListMessages'
import ListItem from './ListItem'
import styles from './Styles/ListStyle'
import './Styles/List.css'

export default class List extends React.Component {
//  constructor (props) {
//    super(props)
//    this.state = {
//      something: props.something
//    }
//  }

// componentWillReceiveProps (newProps) {
//   this.setState({ something: newProps.something })
// }

  renderPanelGroup () {
    const {
      data
    } = this.props
    console.log(data, 'dataa')
    let newData = data.asMutable()
    return (
      <div className={'List'}>
        <PanelGroup id="accordion" accordion>
          {
            newData.map((obj, index) => {
              return <ListItem index={index} data={obj} />
            })
          }
        </PanelGroup>
      </div>
    )
  }

  renderEmptyMessage () {
    return (
      <Alert bsStyle={'warning'}>
        <strong>Please Edit your search.</strong> No patients match the criteria you have entered.
      </Alert>
    )
  }

  render () {
    const {
      data
    } = this.props
    return (
      <div className={'List_Container'}>
        {
          data && data.length
            ? this.renderPanelGroup()
            : this.renderEmptyMessage()

        }
      </div>
    )
  }
}

// react-intl Messages, outside of FormatMessage
// https://stackoverflow.com/questions/35186297/how-to-retrieve-a-string-in-reactintl-2-0-without-using-formattedmessage/39161208#39161208
// If you can't use <FormattedMessage /> for some reason, you can use this
// syntax: `this.context.intl.formatMessage({ ...messages.default })`
// by uncommenting the next block.
//  List.contextTypes = {
//   intl: PropTypes.object.isRequired
// }

// // Prop type warnings
List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object)
}
//
// // Defaults for props
// List.defaultProps = {
//   someSetting: false
// }

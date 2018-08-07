import React from 'react'
import PropTypes from 'prop-types'
// import { FormattedMessage, injectIntl } from 'react-intl'
// import messages from './Messages/ImgMessages'
import styles from './Styles/ImgStyle'

export default class Img extends React.Component {
//  constructor (props) {
//    super(props)
//    this.state = {
//      something: props.something
//    }
//  }

// componentWillReceiveProps (newProps) {
//   this.setState({ something: newProps.something })
// }

  render () {
    const {
      src,
      alt,
      style
    } = this.props
    return (
      <img src={src} alt={alt} style={style} />

    )
  }
}

// react-intl Messages, outside of FormatMessage
// https://stackoverflow.com/questions/35186297/how-to-retrieve-a-string-in-reactintl-2-0-without-using-formattedmessage/39161208#39161208
// If you can't use <FormattedMessage /> for some reason, you can use this
// syntax: `this.context.intl.formatMessage({ ...messages.default })`
// by uncommenting the next block.
//  Img.contextTypes = {
//   intl: PropTypes.object.isRequired
// }

// Prop type warnings
Img.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  containerStyle: PropTypes.object,
  style: PropTypes.object
}
//
// // Defaults for props
// Img.defaultProps = {
//   someSetting: false
// }

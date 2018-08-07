import React from 'react'
import PropTypes from 'prop-types'
import SearchInput, {createFilter} from 'react-search-input'
// import { FormattedMessage, injectIntl } from 'react-intl'
// import messages from './Messages/SearchBarMessages'
import styles from './Styles/SearchBarStyle'
import './Styles/SearchBarStyle.css'
export default class SearchBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: props.searchTerm
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.searchTerm !== this.props.searchTerm) {
      this.setState({ searchTerm: newProps.searchTerm })
    }
  }

  handleChange (searchTerm) {
    const {
      dataSource,
      onChange,
      keysToFilter
    } = this.props

    if (onChange) {
      if (searchTerm) {
        const searchResults = dataSource.filter(createFilter(searchTerm, keysToFilter))
        onChange(searchResults)
      } else {

      }
    }
    this.setState({ searchTerm })
  }

  render () {
    return (
      <SearchInput
        onChange={this.handleChange}
        className={'search-input'}
        style={styles.container}
        placeholder={'Search For Patients'}
      />
    )
  }
}

// react-intl Messages, outside of FormatMessage
// https://stackoverflow.com/questions/35186297/how-to-retrieve-a-string-in-reactintl-2-0-without-using-formattedmessage/39161208#39161208
// If you can't use <FormattedMessage /> for some reason, you can use this
// syntax: `this.context.intl.formatMessage({ ...messages.default })`
// by uncommenting the next block.
//  SearchBar.contextTypes = {
//   intl: PropTypes.object.isRequired
// }

// Prop type warnings
SearchBar.propTypes = {
  searchTerm: PropTypes.string,
  onChange: PropTypes.func,
  dataSource: PropTypes.arrayOf(PropTypes.object),
  keysToFilter: PropTypes.arrayOf(PropTypes.string),
  onNullSearch: PropTypes.func
}

//
// // Defaults for props
// SearchBar.defaultProps = {
//   someSetting: false
// }

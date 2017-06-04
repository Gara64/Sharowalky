import React from 'react'
import { translate } from '../lib/I18n'
import '../styles/app'
import FontAwesome from 'react-fontawesome'

class Details extends React.Component {
  render () {
    return (
      <div>
          <h3>Details</h3>
          <i class='fa fa-cog fa-spin fa-3x fa-fw'></i>
          <span class='sr-only'>Loading...</span>
      </div>
    )
  }
}

export default translate()(Details)

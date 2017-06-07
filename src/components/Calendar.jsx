import React from 'react'
import { translate } from '../lib/I18n'
import '../styles/app'
import Iframe from 'react-iframe'

import Dayz from 'react-day-picker'
import moment from 'moment'
import 'moment-range'

class Calendar extends React.Component {
  constructor (props) {
    super(props)
  }

  componentWillMount() {
    const date = moment('2011-10-21')
    this.setState({
      date: date
    })
  }
    render() {
      return (<Dayz
       display='day'
       date={this.state.date}
       />
     )
  }
}

export default translate()(Calendar)

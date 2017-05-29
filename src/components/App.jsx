// import styles from '../styles/app'

import React from 'react'
import { translate } from '../lib/I18n'
// import classNames from 'classnames'
import Traces from './Traces.jsx'
import Map from './Map.jsx'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment()
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (date) {
    this.setState({
      startDate: date
    })
  }

  render () {
    return (
      <div>
        <h1>Sharowalky 2000</h1>
        <DatePicker selected={this.state.startDate} onChange={this.handleChange} />
        <Traces>
        </Traces>
        <div id="map-container">
          <Map date={this.state.startDate}></Map>
        </div>
      </div>
    )
  }
}

export default translate()(App)

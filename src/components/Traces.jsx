import React from 'react'
import { translate } from '../lib/I18n'
import Plotly from 'plotly.js'
import moment from 'moment'
import '../styles/app'

class Traces extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      interval: 6
    }
  }

  createXAxis (date) {
    var x = []
    date = moment(date).startOf('day')
    for (var i = 0; i < 24 / this.state.interval; i++) {
      var time = moment(date).add(this.state.interval * (i + 1), 'hours')
      var newDate = moment(time).format('YYYY-MM-DD HH:mm:ss')
      x.push(newDate)
    }
    return x
  }

  createYAxis (activity) {
    var y = []
    for (var i = 0; i < 24 / this.state.interval; i++) {
      y.push(Math.floor(Math.random() * 10000))
    }
    return y
  }

  componentWillUpdate () {
    var x = this.createXAxis(this.props.date)
    var y = this.createYAxis(this.props.activity)
    Plotly.newPlot('plot', [{
      x: x,
      y: y,
      type: 'bar'
    }])
  }

  componentDidMount () {
    Plotly.newPlot('plot', [{
      x: this.props.activityX,
      y: this.props.activityY }]
    )
  }

  render () {
    return (
      <div>
        <div id="plot">
        </div>
      </div>
    )
  }
}

export default translate()(Traces)

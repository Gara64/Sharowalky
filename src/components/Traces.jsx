import React from 'react'
import { translate } from '../lib/I18n'
import Plotly from 'plotly.js'
import moment from 'moment'
import '../styles/app'

class Traces extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      interval: 4
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
      if (i === 0) {
        y.push(0)
      } else if (i === 24 / this.state.interval - 1) {
        y.push(42)
      } else if (i === 1) {
        y.push(Math.floor(Math.random() * 500))
      } else {
        y.push(Math.floor(Math.random() * 9000))
      }
    }
    return y
  }

  createPlot () {
    var x = this.createXAxis(this.props.date)
    var y = this.createYAxis(this.props.activity)
    Plotly.newPlot('plot', [{
      x: x,
      y: y,
      type: 'bar'
    }])
  }

  componentWillUpdate () {
    this.createPlot()
  }

  componentDidMount () {
    this.createPlot()
  }

  render () {
    return (
      <div>
        <h3>Steps for this day</h3>
        <div id="plot">
        </div>
      </div>
    )
  }
}

export default translate()(Traces)

import React from 'react'
import { translate } from '../lib/I18n'
import Plotly from 'plotly.js'

class Traces extends React.Component {
  componentDidMount () {
    Plotly.newPlot('plot', [{
      x: [1, 2, 3, 4, 5],
      y: [1, 2, 4, 8, 16] }]
    )
  }

  render () {
    return (
      <div>
        <h1>Sharowalky 2000</h1>
        <div id="plot">
        </div>
      </div>
    )
  }
}

export default translate()(Traces)

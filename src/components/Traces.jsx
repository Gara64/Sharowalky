import React from 'react'
import { translate } from '../lib/I18n'
import Plotly from 'plotly.js'
import '../styles/app'

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
        <div id="plot">
        </div>
      </div>
    )
  }
}

export default translate()(Traces)

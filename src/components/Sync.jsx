import React from 'react'
import { translate } from '../lib/I18n'
import '../styles/app'

class Sync extends React.Component {

  render () {
    const smartphone = require('../smartphone.png')
    const smartwatch = require('../smartwatch.png')
    return (
      <div>
          <h3>Sync with your devices</h3>

          <img src={smartphone} width={'100'}></img>
          <img src={smartwatch} width={'100'}></img>
      </div>
    )
  }
}

export default translate()(Sync)

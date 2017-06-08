import React from 'react'
import { translate } from '../lib/I18n'
import '../styles/app'

class Sync extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showSpinner: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.stopSpinner = this.stopSpinner.bind(this)
  }

  stopSpinner () {
    this.setState({
      showSpinner: false
    })
  }

  handleClick () {
    this.setState({
      showSpinner: true
    })
    setTimeout(this.stopSpinner, 10000)
  }

  render () {
    const smartphone = require('../smartphone.png')
    const smartwatch = require('../smartwatch.png')
    return (
      <div>
          <h3>Sync with your devices</h3>
          <img src={smartphone} width={'100'}></img>
          <img src={smartwatch} width={'100'}></img>

          <button type="button" class="btn btn-primary" onClick={this.handleClick}>Import data</button>
          {this.state.showSpinner
          ? <Spinner />
          : null
          }
      </div>
    )
  }
}

export default translate()(Sync)

class Spinner extends React.Component {

  render () {
    return (
      <div id='spinner'>
        <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
        <span class="sr-only">Loading data...</span>
      </div>
    )
  }
}

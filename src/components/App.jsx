// import styles from '../styles/app'
// import classNames from 'classnames'

import React from 'react'
import { translate } from '../lib/I18n'
import Traces from './Traces.jsx'
import Map from './Map.jsx'
import Photos from './Photos.jsx'
import PhotoGallery from './Gallery.jsx'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

class App extends React.Component {
  constructor (props) {
    super(props)

    // Get photos
    this.getPhotos()

    var startDate = moment()
    this.state = {
      startDate: startDate,
      photos: []
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (date) {
    this.setState({
      startDate: date
    })
  }

  async getPhotos () {
    /* let res = cozy.client.data.find('io.cozy.files', '9a15a2ebaf20cdc74d94150b6400adc6')
    res.then(function (res) {
      console.log('res : ', res)
    }) */

    const res = await cozy.client.data.find('io.cozy.files', '9a15a2ebaf20cdc74d94150b6400adc6')
    console.log('res : ', res)

    // const response = await cozy.client.files.downloadById('9a15a2ebaf20cdc74d94150b6400adc6')
    // response.pipe(fs.createWriteStream('test.jpg'))

  }

  render () {
    return (
      <div>
        <h1>Sharowalky 2000</h1>
        <DatePicker selected={this.state.startDate} onChange={this.handleChange} />
        <Traces date={this.state.startDate} activity={this.state.activityY}>
        </Traces>
        <div id="map-container">
          <Map date={this.state.startDate}></Map>
        </div>
        <Photos date={this.state.startDate} photos={this.state.photos}></Photos>
        <PhotoGallery id="photo-gallery"></PhotoGallery>
      </div>
    )
  }
}

export default translate()(App)

/* global cozy */

// import styles from '../styles/app'
// import classNames from 'classnames'

import React from 'react'
import { translate } from '../lib/I18n'
import Traces from './Traces.jsx'
import Sync from './Sync.jsx'
import Details from './Details.jsx'
import Map from './Map.jsx'
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
      photos: [],
      photosReco: []
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (date) {
    this.setState({
      startDate: date
    })
  }

  getPhotos () {
    let photos = []
    let photosReco = []
    let _this = this
    indexFilesByDate().then(function (index) {
      fetchPhotos(index).then(function (docs) {
        for (let doc of docs) {
          getDownloadLink(doc).then(function (link) {
            let photo = {
              src: link,
              id: doc._id,
              name: doc.name
            }
            // Add the photos with recognized faces in separate state
            if (photo.name.indexOf('_reco') > -1) {
              photosReco.push(photo)
              _this.setState({
                photosReco: photosReco
              })
            } else {
              photos.push(photo)
              _this.setState({
                photos: photos
              })
            }
          })
        }

        console.log('photos : ', this.state.photos)
      })
    })
  }

  render () {
    //    <Photos date={this.state.startDate} photos={this.state.photos}></Photos>
    return (
      <div>
        <h1>Sharowalky 2000</h1>
        <DatePicker selected={this.state.startDate} onChange={this.handleChange} />
        <div className='row' className='traces'>
          <div className='col-md-6'>
            <Traces date={this.state.startDate} activity={this.state.activityY}>
            </Traces>
          </div>
          <div className='col-md-6' id="map-container">
            <Map date={this.state.startDate}></Map>
          </div>
        </div>
        <div>
          <PhotoGallery id="photo-gallery" photos={this.state.photos} photosReco={this.state.photosReco}></PhotoGallery>
        </div>
        <div>
          <Details></Details>
        </div>
      </div>
    )
  }
}

export default translate()(App)

const indexFilesByDate = async () => {
  const fields = [ 'class', 'trashed' ]
  return await cozy.client.data.defineIndex('io.cozy.files', fields)
}

const fetchPhotos = async (index) => {
  const options = {
    selector: {
      class: 'image',
      trashed: false
    },
    fields: ['_id', 'dir_id', 'name', 'size', 'updated_at', 'metadata'],
    descending: true,
    wholeResponse: true
  }
  console.log('index fetch : ', JSON.stringify(index))

  return await cozy.client.data.query(index, options)
}

const getDownloadLink = async (doc) => {
  let link = await cozy.client.files.getDownloadLinkById(doc._id)
  // TODO: change by cozy url
  link = 'http://cozy.tools:8080' + link
  console.log('download link: ', link)
  return link
}

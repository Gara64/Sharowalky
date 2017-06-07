/* global cozy */

import '../styles/app'
// import classNames from 'classnames'

import React from 'react'
import { translate } from '../lib/I18n'
import Traces from './Traces.jsx'
import Sync from './Sync.jsx'
import Details from './Details.jsx'
import Map from './Map.jsx'
import PhotoGallery from './Gallery.jsx'
import Calendar from './Calendar.jsx'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

class App extends React.Component {
  constructor (props) {
    super(props)

    // Get photos
    // this.getPhotos()

    var startDate = moment()
    this.state = {
      startDate: startDate,
      photos: [],
      photosReco: [],
      showSteps: false,
      showMap: false,
      showAgenda: false
    }
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleShowChange = this.handleShowChange.bind(this)
  }

  handleDateChange (date) {
    console.log('input : ', date)
    this.setState({
      startDate: date
    })
  }

  handleShowChange (event) {
    const target = event.target
    const id = target.id
    if (target.type === 'checkbox') {
      if (id === 'showSteps') {
        this.setState({
          showSteps: target.checked
        })
      } else if (id === 'showMap') {
        this.setState({
          showMap: target.checked
        })
      } else if (id === 'showAgenda') {
        this.setState({
          showAgenda: target.checked
        })
      }
      console.log('state : ', this.state)
    }
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
      <div className='container'>
        <h1>Sharowalky 2000</h1>
        <Sync></Sync>
        <h3> Select the date</h3>
        <DatePicker selected={this.state.startDate} onChange={this.handleDateChange} />
        <div className="row">
          <div className="col-md-12">
            <PhotoGallery id="photo-gallery" photos={this.state.photos} photosReco={this.state.photosReco}></PhotoGallery>
          </div>
        </div>
        <div className="row">
          <b>For this day:</b>
          <br />
          <ul>
            <li>
            <label> Add my steps
              <input id="showSteps" type="checkbox" onInput={this.handleShowChange} />
            </label>
            </li>
            <li>
            <label> Add my GPS tracks
              <input id="showMap" type="checkbox" onInput={this.handleShowChange} />
            </label>
            </li>
            <li>
            <label> Add my agenda
              <input id="showAgenda" type="checkbox" onInput={this.handleShowChange} />
            </label>
            </li>
          </ul>

        </div>
        <div className='row' className='traces'>
          <div className='col-md-6'>
            { this.state.showSteps
            ? <Traces date={this.state.startDate} activity={this.state.activityY} />
            : null
            }
          </div>
          <div className='col-md-6' id="map-container">
            { this.state.showMap
            ? <Map date={this.state.startDate} />
            : null
            }
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            { this.state.showAgenda
              ? <Calendar date={this.state.startDate} />
            : null
            }
          </div>
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

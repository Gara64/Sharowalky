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
    this.getPhotos()

    var startDate = moment('20180301', 'YYYYMMDD')
    console.log('start date : ' + startDate)
    this.state = {
      startDate: startDate,
      photos: [],
      photosReco: [],
      acls: [],
      showSteps: false,
      showMap: false,
      showAgenda: false,
      photosGroup: [],
      photosPark: [],
      photosRecoPark: [],
      photosDemo: [],
      photosRecoDemo: []
    }
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleShowChange = this.handleShowChange.bind(this)
  }

  handleDateChange (date) {
    console.log('input : ', date)
    this.setState({
      startDate: date,
      showSteps: false,
      showMap: false,
      showAgenda: false
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
    let photosFace = []
    let photosGroup = []
    let photosRecoDemo = []
    let photosRecoPark = []
    let photosDemo = []
    let photosPark = []
    let acls = []
    let _this = this
    indexFilesByDate().then(function (index) {
      fetchPhotos(index).then(function (docs) {
        for (let doc of docs) {
          getDownloadLink(doc).then(function (link) {
            let photo = {
              src: link,
              id: doc._id,
              name: doc.name,
              metadata: doc.metadata
            }
            // Add the photos with recognized faces in separate state
            if (photo.name.indexOf('_reco') > -1) {
              console.log('photo reco : ', photo.name)
              photosReco.push(photo)
              _this.photoMatchDate(photo, 21, 5) ? photosRecoPark.push(photo) : photosRecoDemo.push(photo)
              photosRecoPark.push(photo)
              _this.setState({
                photosReco: photosReco,
                photosRecoPark: photosRecoPark,
                photosRecoDemo: photosRecoDemo
              })
            } else if (photo.name.indexOf('_face') > -1) {
              photosFace.push(photo)
              _this.setState({
                photosFace: photosFace
              })
            } else if (photo.name.indexOf('_group') > -1) {
              console.log('photo group !')
              photosGroup.push(photo)
              _this.setState({
                photosGroup: photosGroup
              })
            } else {
              photos.push(photo)
              _this.photoMatchDate(photo, 21, 5) ? photosPark.push(photo) : photosDemo.push(photo)
              _this.setState({
                photos: photos,
                photosPark: photosPark,
                photosDemo: photosDemo
              })
            }
          })
        }
      })
      fetchACLs(index).then(function (docs) {
        for (let doc of docs) {
          console.log('doc : ', doc)

          getDownloadLink(doc).then(function (link) {
            let acl = {
              src: link,
              id: doc._id
            }
            console.log('acl file : ', acl)
            fetch(acl.src).then((resp) => resp.json())
            .then(function (data) {
              acl = {
                doc: data.doc,
                subjects: data.subjects
              }
              acls.push(acl)
              _this.setState({
                acls: acls
              })
              console.log('acl : ' + JSON.stringify(acl))
            })
          })
        }
      })
    })
  }

  photoMatchDate (photo, day, month) {
    let photoDate = moment(photo.metadata.datetime)
    return photoDate.date() === day && photoDate.month() + 1 === month
  }

  extractPhotosByDate (photos, day, month) {
    let photosMatch = []
    for (let i = 0; i < photos.length; i++) {
      let metadata = photos[i].metadata
      let photoDate = moment(metadata.datetime)

      if (photoDate.date() === day && photoDate.month() + 1 === month) {
        photosMatch.push(photos[i])
      }
    }
    return photosMatch
  }

  render () {
    //    <Photos date={this.state.startDate} photos={this.state.photos}></Photos>

    let date = moment(this.state.startDate)
    let day = date.date()
    let month = date.month() + 1

    console.log('photos demo : ' + JSON.stringify(this.state.photosDemo))
    console.log('photos park : ' + JSON.stringify(this.state.photosPark))

    let gallery = null
    if (day === 28 && month === 3) {
      gallery = <PhotoGallery
        id="photo-gallery"
        photos={this.state.photosDemo}
        photosReco={this.state.photosRecoDemo}
        date={this.state.startDate}
      />
    } else {
      gallery = <PhotoGallery
          id="photo-gallery"
          photos={this.state.photosPark}
          photosReco={this.state.photosRecoPark}
          date={this.state.startDate}
        />
    }

    return (
      <div className='container'>
        <h1>Sharowalky 2000</h1>
        <div className='row'>
          <Sync />
        </div>
        <div className='row'>
          <h3> Select the date</h3>
          <DatePicker selected={this.state.startDate} onChange={this.handleDateChange} />
        </div>
        <div className="row">
          <div className="col-md-12">
            {gallery}
          </div>
        </div>
        <div className="row">
          <div class="form-group">
          <label>For this day:</label>
          <br />
          <ul class='fa-ul'>
            <li>
              <i class="fa-li fa fa-bar-chart fa-2x"></i>
              Add my steps <label> </label>
            <input id="showSteps" type="checkbox" onInput={this.handleShowChange} checked={this.state.showSteps}/>
            </li>
            <li>
              <i class="fa-li fa fa-map-marker fa-2x"></i>
              Add my GPS tracks <label> </label>
            <input id="showMap" type="checkbox" onInput={this.handleShowChange} checked={this.state.showMap}/>
            </li>
            <li>
              <i class="fa-li fa fa-calendar-check-o fa-2x"></i>
              Add my agenda <label> </label>
            <input id="showAgenda" type="checkbox" onInput={this.handleShowChange} checked={this.state.showAgenda} />
            </li>
          </ul>
        </div>
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
          <Details
            date={this.state.startDate}
            photosReco={this.state.photosReco}
            photos={this.state.photos}
            photosFace={this.state.photosFace}
            showTracks={this.state.showMap}
            showSteps={this.state.showSteps}
            showAgenda={this.state.showAgenda}
            acls={this.state.acls}
          />
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
  console.log('index photo fetch : ', JSON.stringify(index))

  return await cozy.client.data.query(index, options)
}

const fetchACLs = async (index) => {
  const options = {
    selector: {
      mime: 'application/json',
      trashed: false
    },
    fields: ['_id'],
    descending: true,
    wholeResponse: true
  }
  console.log('index acl fetch : ', JSON.stringify(index))

  return await cozy.client.data.query(index, options)
}

const getDownloadLink = async (doc) => {
  let link = await cozy.client.files.getDownloadLinkById(doc._id)
  const root = document.querySelector('[role=application]')
  const data = root.dataset
  const scheme = getScheme()

  link = scheme + data.cozyDomain + link
  return link
}

const getScheme = function () {
  const url = window.location.href
  const arr = url.split('/')
  return arr[0] + '//'
}

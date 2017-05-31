import React from 'react'
import { translate } from '../lib/I18n'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import '../styles/app'
import 'leaflet/dist/leaflet.css'

class MapTraces extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      lat: 48.86,
      lng: 2.34,
      zoom: 10
    }
    // this.handleChange = this.handleChange.bind(this)
  }

  render () {
    console.log('date : ' + this.props.date)
    const position = [this.state.lat, this.state.lng]
    return (
      <div>
          <h3>Locations for this day</h3>
          <Map center={position} zoom={this.state.zoom}>
            <TileLayer
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
              </Popup>
            </Marker>
          </Map>
      </div>
    )
  }
}

export default translate()(MapTraces)

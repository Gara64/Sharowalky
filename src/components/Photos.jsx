import React from 'react'
import { translate } from '../lib/I18n'
import Gallery from 'react-photo-gallery'
import '../styles/app'

class Photos extends React.Component {

  constructor (props) {
    super(props)
    this.state = {photos: null, pageNum: 1, totalPages: 1, loadedAll: false, currentImage: 0}
    this.closeLightbox = this.closeLightbox.bind(this)
    this.openLightbox = this.openLightbox.bind(this)
  }

  /*
  buildImages () {
    images = []
    photos = this.props.photos
    for(var i = 0; i < photos.length; i++) {
      image = {
        src
      }
    }
  }
  */

  openLightbox (index, event) {
    event.preventDefault()
    console.log('open fire')
    this.setState({
      currentImage: index,
      lightboxIsOpen: true
    })
  }
  closeLightbox () {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    })
  }

  render () {
    return (
      <div>
        <h3>Photos of the day</h3>
        <Gallery photos={PHOTO_SET} onClickPhoto={this.openLightbox}/>
      </div>
    )
  }
}

const PHOTO_SET = [
  {
    src: 'http://cozy.tools:8080/files/downloads/cb08b150399ecbcc/28361923354_83ba9ec49e_o.jpg',
    sizes: [
      '(min-width: 480px) 50vw',
      '(min-width: 1024px) 33.3vw',
      '100vw'
    ],
    width: 681,
    height: 1024,
    alt: 'image 1'
  },
  {
    src: 'http://cozy.tools:8080/files/downloads/0928e336167e04ea/28361849264_5371ff977b_o.jpg',
    sizes: [
      '(min-width: 480px) 50vw',
      '(min-width: 1024px) 33.3vw',
      '100vw'
    ],
    width: 600,
    height: 600,
    alt: 'image 2'
  }
]

export default translate()(Photos)

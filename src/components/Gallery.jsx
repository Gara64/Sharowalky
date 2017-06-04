import React from 'react'
import Gallery from 'react-photo-gallery'
import Lightbox from 'react-images'
import { translate } from '../lib/I18n'

class PhotoGallery extends React.Component {
  constructor (props) {
    super(props)
    this.state = {pageNum: 1, totalPages: 1, loadedAll: false, currentImage: 0}
    this.handleScroll = this.handleScroll.bind(this)
    this.loadMorePhotos = this.loadMorePhotos.bind(this)
    this.closeLightbox = this.closeLightbox.bind(this)
    this.openLightbox = this.openLightbox.bind(this)
    this.gotoNext = this.gotoNext.bind(this)
    this.gotoPrevious = this.gotoPrevious.bind(this)
  }

  componentDidMount () {
    this.loadMorePhotos()
    window.addEventListener('scroll', this.handleScroll)
  }

  handleScroll () {
    let scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop
    if ((window.innerHeight + scrollY) >= (document.body.offsetHeight - 50)) {
      this.loadMorePhotos()
    }
  }

  loadMorePhotos (e) {
    if (e) {
      e.preventDefault()
    }
    if (this.state.pageNum > this.state.totalPages) {
      this.setState({loadedAll: true})
      return
    }
  }

  openLightbox (index, event) {
    event.preventDefault()
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

  gotoPrevious () {
    this.setState({
      currentImage: this.state.currentImage - 1
    })
  }

  gotoNext () {
    this.setState({
      currentImage: this.state.currentImage + 1
    })
  }

  render () {
    var photos = []
    var photosReco = []
    let p = this.props.photos
    let pReco = this.props.photosReco
    console.log('photos props: ', JSON.stringify(this.props.photos))

    for (let i = 0; i < p.length; i++) {
      let photo = {
        src: p[i].src,

        width: 400,
        height: 400,
        alt: p[i].name
      }
      photos.push(photo)
      for (let j = 0; j < pReco.length; j++) {
        let name = pReco[j].name.replace('_reco', '')
        if (name === p[i].name) {
          console.log(name + ' has reco faces')
          let photoReco = {
            src: pReco[j].src
          }
          photosReco.push(photoReco)
        }
      }
    }
    console.log('photos gallery: ', JSON.stringify(photos))

    return (
      <div>
        <h3>Photos taken this day</h3>
         <Gallery photos={photos} onClickPhoto={this.openLightbox} />
         <Lightbox
           theme={{container: { background: 'rgba(0, 0, 0, 0.85)' }}}
           images={photosReco}
           backdropClosesModal={true}
           onClose={this.closeLightbox}
           onClickPrev={this.gotoPrevious}
           onClickNext={this.gotoNext}
           currentImage={this.state.currentImage}
           isOpen={this.state.lightboxIsOpen}
           width={1600}
         />
       </div>
    )
  }
}
export default translate()(PhotoGallery)

/*
const PHOTO_SET = [
  {
    src: 'http://cozy.tools:8080/files/downloads/5e7055a781aa2f62/P1000417.JPG',
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
    src: 'http://cozy.tools:8080/files/downloads/d00e8979b6ea042e/P1010009.JPG',
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
*/

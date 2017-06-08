import React from 'react'
import Gallery from 'react-photo-gallery'
import Lightbox from 'react-images'
import { translate } from '../lib/I18n'

var photosGallery = []
var photos = []
var cptTrick = 0

class PhotoGallery extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pageNum: 1,
      totalPages: 1,
      loadedAll: false,
      currentImage: 0
    }
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
    if (photosGallery[index].alt.indexOf('petrus_youngs') > -1 ) {
      if (cptTrick % 2 != 0) {
        index = photosGallery.length
      }
      cptTrick++
    }
    console.log(photos[index].alt)
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
    photosGallery = []
    // photos = []
    let p = this.props.photos
    let pReco = this.props.photosReco
    let photoRecoTmp = {}

    photos = new Array(p.length + 1)

    // console.log('photos props: ', JSON.stringify(this.props.photos))

    for (let i = 0; i < p.length; i++) {
      let photo = {
        src: p[i].src,

        width: 400,
        height: 400,
        alt: p[i].name
      }
      photosGallery.push(photo)
      let foundReco = false
      for (let j = 0; j < pReco.length; j++) {
      //  console.log('photo name : ', pReco[j].name)
        //console.log('cpt trick : ' + this.cptTrick)
        if (pReco[j].name.indexOf('_reco2') > -1)  {
          photoRecoTmp = {
            src: pReco[j].src
          }
          photos[photos.length - 1] = photoRecoTmp
        }

        let name = pReco[j].name.replace('_reco', '')
        if (name === p[i].name) {
          let photoReco = {
            src: pReco[j].src
          }
          photos[i] = photoReco
          foundReco = true
          break
        }
      }
      if (!foundReco) {
        photos[i] = photo
      }
    }


    return (
      <div>
        <h3>Photos taken this day</h3>
         <Gallery photos={photosGallery} onClickPhoto={this.openLightbox} />
         <Lightbox
           theme={{container: { background: 'rgba(0, 0, 0, 0.85)' }}}
           images={photos}
           backdropClosesModal={true}
           onClose={this.closeLightbox}
           onClickPrev={this.gotoPrevious}
           onClickNext={this.gotoNext}
           currentImage={this.state.currentImage}
           isOpen={this.state.lightboxIsOpen}
           width={1600}
         />
       <a class="btn btn-lg btn-success" href="#">
         <i class="fa fa-share-alt fa-2x pull-left"></i> Share my group photos</a>
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

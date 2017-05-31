import React from 'react'
import Gallery from 'react-photo-gallery'
import Measure from 'react-measure'
import Lightbox from 'react-images'
import { translate } from '../lib/I18n'

class PhotoGallery extends React.Component {
  constructor () {
    super()
    this.state = {photos: null, pageNum: 1, totalPages: 1, loadedAll: false, currentImage: 0}
    this.handleScroll = this.handleScroll.bind(this)
    this.loadMorePhotos = this.loadMorePhotos.bind(this)
    this.closeLightbox = this.closeLightbox.bind(this)
    this.openLightbox = this.openLightbox.bind(this)
    this.gotoNext = this.gotoNext.bind(this)
    this.gotoPrevious = this.gotoPrevious.bind(this)

    this.getPhotos()
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

  getPhotos () {
    const PHOTO_SET = [
      {
        src: 'http://cozy.tools:8080/files/downloads/cb08b150399ecbcc/28361923354_83ba9ec49e_o.jpg',
        sizes: [
          '(min-width: 480px) 50vw',
          '(min-width: 1024px) 33.3vw',
          '100vw'
        ],
        width: 300,
        height: 500,
        alt: 'image 1'
      },
      {
        src: 'http://cozy.tools:8080/files/downloads/0928e336167e04ea/28361849264_5371ff977b_o.jpg',
        sizes: [
          '(min-width: 480px) 50vw',
          '(min-width: 1024px) 33.3vw',
          '100vw'
        ],
        width: 300,
        height: 500,
        alt: 'image 2'
      }
    ]
    this.setState({
      photos: PHOTO_SET
    })
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
    if (this.state.photos.length - 2 === this.state.currentImage) {
      this.loadMorePhotos()
    }
    this.setState({
      currentImage: this.state.currentImage + 1
    })
  }

  renderGallery () {
    return (
      <Measure whitelist={['width']}>
        {
          ({ width }) => {
            var cols = 1
            if (width >= 480) {
              cols = 2
            }
            if (width >= 1024) {
              cols = 3
            }
            return <Gallery photos={this.state.photos} cols={cols} onClickPhoto={this.openLightbox} />
          }
        }
      </Measure>
    )
  }

  render () {
    // no loading sign if its all loaded
    if (this.state.photos) {
      return (
        <div className="App">
          {this.renderGallery()}
          <Lightbox
            theme={{container: { background: 'rgba(0, 0, 0, 0.85)' }}}
            images={this.state.photos}
            backdropClosesModal={true}
            onClose={this.closeLightbox}
            onClickPrev={this.gotoPrevious}
            onClickNext={this.gotoNext}
            currentImage={this.state.currentImage}
            isOpen={this.state.lightboxIsOpen}
            width={1600}
          />
          {!this.state.loadedAll && <div className="loading-msg" id="msg-loading-more">Loading</div>}
        </div>
      )
    }
    else {
      return (
        <div id='app' className="App">
          <div id="msg-app-loading" className="loading-msg">Loading</div>
        </div>
      )
    }
  }
}
export default translate()(PhotoGallery)
// ReactDOM.render(<App />, document.getElementById('app'))

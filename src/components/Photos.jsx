import React from 'react'
import { translate } from '../lib/I18n'
import Lightbox from 'react-images'
import '../styles/app'

class Photos extends React.Component {

  render () {
    return (
      <div>
        <h3>Photos of the day</h3>
        <Lightbox
          images={[{ src: 'http://example.com/img1.jpg' }, { src: 'http://example.com/img2.jpg' }]}
          isOpen={this.state.lightboxIsOpen}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          onClose={this.closeLightbox}
        />
      </div>
    )
  }
}

export default translate()(Photos)

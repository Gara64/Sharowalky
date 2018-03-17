import React from 'react'
import { translate } from '../lib/I18n'
import '../styles/app'

class Calendar extends React.Component {

  render () {
    console.log('date : ' + this.props.date)
    return (
      <div>
        <h3> My planning for this day</h3>
        <table class="table">
          <thead>
            <tr>
              <th>Hour</th>
              <th>Tracks</th>
              <th>Place</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="field-label col-md-3">
                09:00 - 10:30
              </td>
              <td class="col-md-3">
                Annoucements / Awards
              </td>
              <td class="col-md-3">
                EI 7
              </td>
            </tr>
            <tr>
              <td class="field-label col-md-3">
                11:00 - 12:30
              </td>
              <td class="col-md-3">
                Stream Processing
              </td>
              <td class="col-md-3">
                EI 9
              </td>
            </tr>
            <tr>
              <td class="field-label col-md-3">
                13:30 - 15:00
              </td>
              <td class="col-md-3">
                Research challenges
              </td>
              <td class="col-md-3">
                EI 7
              </td>
            </tr>
            <tr>
              <td class="field-label">
                15:30 - 17:00
              </td>
              <td class="col-md-3">
                Big and Streaming Data
              </td>
              <td class="col-md-3">
                EI 7
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default translate()(Calendar)

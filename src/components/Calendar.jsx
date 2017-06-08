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
                Keynote
              </td>
              <td class="col-md-3">
                Room 1
              </td>
            </tr>
            <tr>
              <td class="field-label col-md-3">
                11:00 - 12:30
              </td>
              <td class="col-md-3">
                Security & Privacy
              </td>
              <td class="col-md-3">
                Room 3
              </td>
            </tr>
            <tr>
              <td class="field-label col-md-3">
                14:00 - 15:30
              </td>
              <td class="col-md-3">
                Persasive computing
              </td>
              <td class="col-md-3">
                Room 2
              </td>
            </tr>
            <tr>
              <td class="field-label">
                16:00 - 17:30
              </td>
              <td class="col-md-3">
                Ubiquitous Mobile
              </td>
              <td class="col-md-3">
                Room 2
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default translate()(Calendar)

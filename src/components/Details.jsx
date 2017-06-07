import React from 'react'
import ReactDOM from 'react-dom'
import { translate } from '../lib/I18n'
import '../styles/app'
import '../styles/highlight'
import mermaid from 'mermaid'
import Highlight from 'react-highlight'

class Details extends React.Component {
  constructor (props) {
    super(props)
    mermaid.initialize({
      startOnLoad: true
    })
    this.state = {
      showFullTree: false
    }
    this.handleShowTreeChange = this.handleShowTreeChange.bind(this)
    this.handleShowACLChange = this.handleShowACLChange.bind(this)

  }

  componentDidMount () {
    this.render()
  }

  handleShowTreeChange (event) {
    let div = document.getElementById('tree')
    div.setAttribute("style", "visibility: visible;")
  }

  handleShowACLChange (event) {
    let div = document.getElementById('details')
    div.innerHTML = ''
    let ACLs = [
      {filename: 'Petrus_phds.jpg', subject: 'Test', href:'http://cozy.tools:8080/files/downloads/adeb5c82ef3fccbf/petrus_phds.jpg'},
      {filename: 'tracks.gpx', subject: 'Test', href:'http://cozy.tools:8080/files/downloads/adeb5c82ef3fccbf/petrus_phds.jpg'}
    ]
    ReactDOM.render(<ACL ACLs={ACLs}/>, div)


  }

  render () {
    console.log('Test page! mermaid version ' + mermaid.version())

    return (
      <div>
        <div className='row'>
          <div className='col-md-3'>
            <h3>ACL production
            <i className='fa fa-cog fa-spin fa-3x fa-fw'>
            <span className='sr-only'>Loading...</span></i>
            </h3>
          </div>
        </div>
          <div className='row'>
            <div className='col-md-3'>
              <h4>Rule Operators </h4>
              <div className='mermaid'>
                graph BT;
                  D(What: Photos)-->ACL;
                  S(Who: Contacts)-->ACL;
                  click ACL ACLCallback "Show ACL";
              </div>
              <button type="button" class="btn btn-info" onClick={this.handleShowTreeChange}>Show rule details</button>
              <button type="button" class="btn btn-info" onClick={this.handleShowACLChange}>Show all ACLs</button>

            </div>
            <div className='col-md-9'>
              <h4>Details</h4>
              <div id='details'></div>
              <div id='tree' style='visibility: hidden;'>
                <OpTree />
              </div>
              <div id='all_acls' style='visibility: hidden;'>
              </div>
            </div>
          </div>
          </div>
    )
  }
}

class Code extends React.Component {
  render () {
    console.log('code : ', this.props.code)
    return (
      <div>
        <p>{this.props.title}</p>
        <Highlight className='json'>
          {this.props.code}
        </Highlight>
      </div>
    )
  }
}

class OpTree extends React.Component {
  render () {
    return (
      <div className='mermaid'>
        graph BT;
          PC1(Database)-->F1;
          PC2(Database)-->F2;
          F1(Filter1)-->DI1;
          F2(Filter2)-->DI2;
          DI1(DI)-->IS;
          IS(IsS)-->SI;
          DI2(DI)-->MS;
          SI-->MS;
          MS(MatchS)-->ACL;
          click PC1 graphCallback "Personal Cloud Database";
          click PC2 graphCallback "Personal Cloud Database";
          click F1 graphCallback "Rule Filter";
          click F2 graphCallback "Rule Filter";
          click DI1 graphCallback "Document Identifiee";
          click DI2 graphCallback "Document Identifiee";
          click IS graphCallback "Subject selection";
          click SI graphCallback "Subject extraction";
          click MS graphCallback "Subject matching";
          style IS fill:#ccf,stroke:#f66,stroke-width:2px,stroke-dasharray: 5, 5;
          style SI fill:#ccf,stroke:#f66,stroke-width:2px,stroke-dasharray: 5, 5;
          style MS fill:#ccf,stroke:#f66,stroke-width:2px,stroke-dasharray: 5, 5;

      </div>
    )
  }
}

class TableRowEl extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <tr>
        <td>
          <a href={this.props.href}>{this.props.filename}</a>
        </td>
        <td>
          {this.props.subject}
        </td>
        <td>
          TODO: remove
        </td>
      </tr>
    )
  }
}

class ACL extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    console.log('acls : ', JSON.stringify(this.props.ACLs))
    let rows = []
    for (var i=0; i<this.props.ACLs.length; i++) {
        rows.push(<TableRowEl subject={this.props.ACLs[i].subject} filename={this.props.ACLs[i].filename} href={this.props.ACLs[i].href} />)
    }

    return (
      <div>
        <table class="table">
          <thead>
            <tr>
              <th>Docs</th>
              <th>Subjects</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}

                /*graph BT;
                  PC1(Database)-->F1;
                  PC2(Database)-->F2;
                  F1(Filter1)-->DI1;
                  F2(Filter2)-->DI2;
                  DI1(DI)-->IS;
                  IS(IsS)-->SI;
                  DI2(DI)-->MS;
                  SI-->MS;
                  MS(MatchS)-->ACL;
                  click PC1 graphCallback "Personal Cloud Database";
                  click PC2 graphCallback "Personal Cloud Database";
                  click F1 graphCallback "Rule Filter";
                  click F2 graphCallback "Rule Filter";
                  click DI1 graphCallback "Document Identifiee";
                  click DI2 graphCallback "Document Identifiee";
                  click IS graphCallback "Subject selection";
                  click SI graphCallback "Subject extraction";
                  click MS graphCallback "Subject matching";
                  */

export default translate()(Details)

window.ACLCallback = function(id) {
  console.log('id: ' + id)
  let div = document.getElementById('details')
  div.innerHTML = '' // reset to avoid buggy HighLight render
  let ACLs = [
    {filename: 'Petrus_phds.jpg', subject: 'Test', href:'http://cozy.tools:8080/files/downloads/adeb5c82ef3fccbf/petrus_phds.jpg'}
  ]
  ReactDOM.render(<ACL ACLs={ACLs}/>, div)


}

window.graphCallback = function (id) {
  let div = document.getElementById('details')
  div.innerHTML = '' // reset to avoid buggy HighLight render

  if (id === 'F1') {
    let code = '{\n' +
      '\t"docType": "io.cozy.contacts"\n' +
      '}\n'
    let title = 'Subject Filter:'
    ReactDOM.render(<Code code={code} title={title}/>, div)
  } else if (id === 'F2') {
    let code = '{\n' +
      '\t"$and": [{\n' +
      '\t\t"$or": [\n' +
      '\t\t\t{"$and": [{"docType": "io.cozy.files"}, {"class": "image"}]},\n' +
      '\t\t\t{"docType": "io.cozy.steps"},\n' +
      '\t\t\t{"docType": "io.cozy.gps"}\n' +
      '\t\t]\n' +
      '\t},\n' +
      '\t\t{"date": "?"}\n' +
      '\t]\n' +
      '}'

    let title = 'Document Filter:'
    ReactDOM.render(<Code code={code} title={title}/>, div)
  } else if (id === 'PC1' || id === 'PC2') {
    let title = 'Number of documents in the database:'
    let code = 123
    ReactDOM.render(<Code code={code} title={title}/>, div)
  } else if (id === 'DI1') {

  } else if (id === 'DI2') {
    div.innerHTML = '<i> FaceRecognition.py</i>'
  } else if (id === 'IS') {
    let title = 'Number of subjects in the Personal Cloud:'
    let code = 12
    ReactDOM.render(<Code code={code} title={title}/>, div)
  } else if (id === 'SI') {
    let title = 'Extracted attributes:'
    let code = '{"name"}'
    ReactDOM.render(<Code code={code} title={title}/>, div)
  } else if (id === 'MS') {
    let title = 'Number of matching subjects:'
    let code = 1
    ReactDOM.render(<Code code={code} title={title}/>, div)
  }
}

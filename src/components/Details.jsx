import React from 'react'
import ReactDOM from 'react-dom'
import { translate } from '../lib/I18n'
import '../styles/app'
import '../styles/highlight'
import mermaid from 'mermaid'
// import ReactMermaid from 'react-mermaid'
import Highlight from 'react-highlight'

class Details extends React.Component {
  constructor (props) {
    super(props)
    mermaid.initialize({
      startOnLoad: true
    })
    this.state = {
      showFullTree: false,
      showAllACLs: false
    }
    this.handleShowTreeChange = this.handleShowTreeChange.bind(this)
    this.handleShowACLChange = this.handleShowACLChange.bind(this)
  }

  // Necessary to deal with the mermaid bug after gallery rendering
  componentDidUpdate () {
  }

  handleShowTreeChange (event) {
    let div = document.getElementById('tree')
    div.setAttribute('style', 'visibility: visible;')
  }

  getPhotoLinkFromName (photos, name) {
    name = name.replace(/\.[^/.]+$/, '')
    name = name.replace('_reco', '')

    console.log('name to find : ' + name)

    for (let i = 0; i < photos.length; i++) {
      let photoName = photos[i].name.replace('_face', '')
      photoName = photoName.replace(/\.[^/.]+$/, '') // remove the extension

      console.log('photo name : ' + photoName)

      if (photoName === name) {
        return photos[i].src
      }
    }
    return ''
  }

  handleShowACLChange (event) {
    let div = document.getElementById('details')
    div.innerHTML = ''
    if (!this.state.showAllACLs) {
      this.state.showAllACLs = true

      let ACLs = []

      for (let i = 0; i < this.props.acls.length; i++) {
        let doc = this.props.acls[i].doc
        let dochref = this.getPhotoLinkFromName(this.props.photos, doc)

        let subjects = this.props.acls[i].subjects
        for (let j = 0; j < subjects.length; j++) {
          let subhref = this.getPhotoLinkFromName(this.props.photosFace, subjects[j])
          if (subhref === '') {
            continue
          }
          let aclPhotos = {
            filename: doc,
            filehref: dochref,
            subjectname: subjects[i],
            subjecthref: subhref
          }
          console.log('acl photo : ' + JSON.stringify(aclPhotos))
          ACLs.push(aclPhotos)
        }

        if (this.props.showTracks) {
          let aclTracks = {
            filename: 'tracks_' + this.props.date + '.gpx',
            filehref: '',
            subjectname: this.props.photosFace[i].name,
            subjecthref: this.props.photosFace[i].src
          }
          ACLs.push(aclTracks)
        }
        if (this.props.showSteps) {
          let aclSteps = {
            filename: 'steps_' + this.props.date + '.csv',
            filehref: '',
            subjectname: this.props.photosFace[i].name,
            subjecthref: this.props.photosFace[i].src
          }
          ACLs.push(aclSteps)
        }
        if (this.props.showAgenda) {
          let aclAgenda = {
            filename: 'planning_' + this.props.date + '.ics',
            filehref: '',
            subjectname: this.props.photosFace[i].name,
            subjecthref: this.props.photosFace[i].src
          }
          ACLs.push(aclAgenda)
        }
      }

      //
      // // Add recognized photos to the acls
      // for (let i = 0; i < this.props.photosFace.length; i++) {
      //   for (let j = 0; j < this.props.photosReco.length; j++) {
      //     // find the corresponding photo without reco
      //     let baseName = this.props.photosReco[j].name
      //     baseName = baseName.replace('_reco', '')
      //
      //     for (let k = 0; k < this.props.photos.length; k++) {
      //       if (this.props.photos[k].name === baseName) {
      //         let aclPhotos = {
      //           filename: this.props.photos[k].name,
      //           filehref: this.props.photos[k].src,
      //           subjectname: this.props.photosFace[i].name,
      //           subjecthref: this.props.photosFace[i].src
      //         }
      //         console.log('acl photo name : ' + aclPhotos.filename)
      //         ACLs.push(aclPhotos)
      //         break
      //       }
      //     }
      //   }
      //
      //   if (this.props.showTracks) {
      //     let aclTracks = {
      //       filename: 'tracks_' + this.props.date + '.gpx',
      //       filehref: '',
      //       subjectname: this.props.photosFace[i].name,
      //       subjecthref: this.props.photosFace[i].src
      //     }
      //     ACLs.push(aclTracks)
      //   }
      //   if (this.props.showSteps) {
      //     let aclSteps = {
      //       filename: 'steps_' + this.props.date + '.csv',
      //       filehref: '',
      //       subjectname: this.props.photosFace[i].name,
      //       subjecthref: this.props.photosFace[i].src
      //     }
      //     ACLs.push(aclSteps)
      //   }
      //   if (this.props.showAgenda) {
      //     let aclAgenda = {
      //       filename: 'planning_' + this.props.date + '.ics',
      //       filehref: '',
      //       subjectname: this.props.photosFace[i].name,
      //       subjecthref: this.props.photosFace[i].src
      //     }
      //     ACLs.push(aclAgenda)
      //   }
      // }
      ReactDOM.render(<ACL ACLs={ACLs}/>, div)
    } else {
      this.state.showAllACLs = false
      ReactDOM.render(null, div)
    }
    this.render()
  }

  /*
  <h4>Rule Operators </h4>
  <Graph name='diagram'>
    graph BT;
      D(What: Photos)-->ACL;
      S(Who: Contacts)-->ACL;
      click ACL ACLCallback "Show ACL";
  </Graph>
  */
  render () {
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
              <div>
                <a class="btn btn-info" href="#" onClick={this.handleShowACLChange}>
                  <i class="fa fa-eye fa-lg"></i> Show all ACLs</a>
              </div>
              <div>
                <a class="btn btn-info" href="#" onClick={this.handleShowTreeChange}>
                  <i class="fa fa-eye fa-lg"></i> Show rule details</a>
              </div>
            </div>
            <div className='col-md-9'>
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

/*
class Graph extends React.Component {
  getDefaultProps () {
    return {
      name: 'mermaid'
    }
  }

  componentDidMount () {
    var div = document.getElementById('graphid')

    var insertSvg = function(svgCode, bindFunctions){
       div.innerHTML = svgCode
       if(typeof callback !== 'undefined'){
           callback(id)
       }
       this.handleShowTreeChange = this.handleShowTreeChange.bind(this)
     }
    // mermaid.mermaidAPI.render(this.props.name, this.props.children.toString(), (html) => this.setState({diagram: html}));
    // mermaid.mermaidAPI.render('graphid', this.props.children.toString(), insertSvg, div )
  }

  render () {
    return (
      <div className='mermaid'>
        {this.props.children.toString()}
      </div>
    )
  }
}
*/

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
      <div className='mermaid' style='width:500px;height:500px'>
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
          click ACL graphCallback "Authorizations";
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
    this.handleACLChange = this.handleACLChange.bind(this)
  }

  handleACLChange (event) {
    const target = event.target
    const id = target.id

    let tr = document.getElementById(id + '_tr')
    tr.setAttribute('class', 'danger')
  }

  render () {
    let subjectName = this.props.subjectname.replace('_face.jpg', '')
    let trId = this.props.index + '_tr'
    return (
      <tr id={trId}>
        <td>
          <a href={this.props.filehref}>{this.props.filename}</a>
        </td>
        <td>
          <img
            src={this.props.subjecthref}
            height="50"
            width="50"
          />
        <label> </label> {subjectName}
        </td>
        <td>
          <button
            id={this.props.index}
            type="button"
            class="btn btn-danger"
            onClick={this.handleACLChange}
          >
            <span class="glyphicon glyphicon-remove"></span> Remove
          </button>
        </td>
      </tr>
    )
  }
}

class ACL extends React.Component {
  render () {
    // console.log('acls : ', JSON.stringify(this.props.ACLs))
    let rows = []
    for (let i = 0; i < this.props.ACLs.length; i++) {
      rows.push(
        <TableRowEl
          index={ i }
          subjecthref={ this.props.ACLs[i].subjecthref }
          subjectname={ this.props.ACLs[i].subjectname }
          filename={ this.props.ACLs[i].filename }
          filehref={ this.props.ACLs[i].filehref }
        />
      )
    }

    return (
      <div>
        <h4>ACLs</h4>
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

export default translate()(Details)

window.ACLCallback = function (id) {
  console.log('id: ' + id)
  let div = document.getElementById('details')
  div.innerHTML = '' // reset to avoid buggy HighLight render
  let ACLs = [
    {filename: 'Petrus_phds.jpg', subject: 'Test', href: 'http://cozy.tools:8080/files/downloads/adeb5c82ef3fccbf/petrus_phds.jpg'}
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
      '\t\t{"$and": [{"docType": "io.cozy.files"}, {"class": "image"}]},\n' +
      '\t\t{"date": "$date"}\n' +
      '\t]\n' +
      '}'

    let title = 'Document Filter:'
    ReactDOM.render(<Code code={code} title={title}/>, div)
  } else if (id === 'PC1' || id === 'PC2') {
    let title = 'Number of documents in the database:'
    let code = 89
    ReactDOM.render(<Code code={code} title={title}/>, div)
  } else if (id === 'DI1') {

  } else if (id === 'DI2') {
    div.innerHTML = '<a href="https://github.com/Gara64/face-recognition">Face recognition source code</a>'
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
    let code = 4
    ReactDOM.render(<Code code={code} title={title}/>, div)
  } else if (id === 'ACL') {
    let title = 'Rule semantic'
    let code = 'ACL <- {(s,d,a) ∈ SxDxA / Filter1 (d,Q) ∧ MatchS(DI(d), SI(s)) }'
    code += '\n\nQ: docType = ".jpg" && date = ?\n'
    code += 'DI: face recognition function from .jpg files\n'
    ReactDOM.render(<Code code={code} title={title}/>, div)
  }
}

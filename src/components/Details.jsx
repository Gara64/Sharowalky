import React from 'react'
import { translate } from '../lib/I18n'
import '../styles/app'
import mermaid from 'mermaid'
import Highlight from 'react-highlight'

class Details extends React.Component {

  render () {
    console.log('Test page! mermaid version ' + mermaid.version())

    return (
      <div>
        <div className='row'>
          <div className='col-md-12'>
            <h3>ACL production</h3>
            <i className='fa fa-cog fa-spin fa-3x fa-fw'></i>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
          <div className='row'>
            <div className='col-md-6'>
              <h4>Operators </h4>
              <div className='mermaid'>
                graph BT;
                  PC1(Database)-->F1;
                  PC2(Database)-->F2;
                  F1(Filter1)-->DI1;
                  F2(Filter2)-->DI2;
                  DI1(DI)-->IS;
                  IS(IsS)-->SI;
                  DI2(Face Recognition)-->MS;
                  SI-->MS;
                  MS(MatchS)-->ACL;
                  click PC1 myGreatCallback "toto1";
                  click PC2 myGreatCallback "toto2";
                  click F1 myGreatCallback "toto2";
                  click F2 myGreatCallback "toto2";
                  click DI1 myGreatCallback "toto2";
                  click DI2 myGreatCallback "toto2";
                  click IS myGreatCallback "toto2";
                  click MS myGreatCallback "toto2";

              </div>
            </div>
            <div className='col-md-6'>
              <h4>Details</h4>
              <div id='details'></div>
            </div>
          </div>
          </div>
    )
  }
}

/*
click Filter1 myGreatCallback "my filter1";
click Filter2 myGreatCallback "";
click FaceReco myGreatCallback "my DI1";
click DI2 myGreatCallback "";
click IsS myGreatCallback "";
click SI myGreatCallback "my SI";
click MatchS myGreatCallback "my match";
*/
export default translate()(Details)

window.myGreatCallback = function (id) {
  console.log('id : ' + id)
  let div = document.getElementById('details')
  // .innerHTML = id
  // div.innerHTML('id : ' + id)
  let startCode = '<pre><code class="json">'
  let endCode = '</code></pre>'
  if (id === 'PC1') {
    let code1 = '[\n'+
        '\t"docType": "io.cozy.contacts"\n'+
      ']\n'
    div.innerHTML = startCode + code + endCode
  } else if (id === 'PC2') {
    let code2 = '[\n'+
        '\t"docType": "io.cozy.contacts"\n'+
      ']\n'

    let code = 'docType === "io.cozy.files" && class === "image"'
    div.innerHTML = startCode + code + endCode
  }
}

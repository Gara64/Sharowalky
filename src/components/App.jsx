// import styles from '../styles/app'

import React from 'react'
import { translate } from '../lib/I18n'
// import classNames from 'classnames'
import Traces from './Traces.jsx'

const App = ({ t }) => (
    // <h1 className={classNames(styles['title'])}>{ t('App.welcome') }</h1>
    React.createElement('div', {},
        React.createElement(Traces, {})
    )
)

export default translate()(App)

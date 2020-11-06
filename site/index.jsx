import React from 'react'
import ReactDOM from 'react-dom'
import WindowScroller from './window-scroller'
import Adaptive from './adaptive'
import Base from './base'

import styles from './style.less'

class Index extends React.PureComponent {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div className="vTable-global-class-name">
        <h1 className={styles['test-header']}>test</h1>
        <WindowScroller />
        {/* <Adaptive /> */}
        {/* <Base></Base> */}
      </div>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('app'))

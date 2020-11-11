import React from 'react'
import ReactDOM from 'react-dom'
import {
  HashRouter as Router, Route, Switch, Link,
} from 'react-router-dom'
import WindowScroller from './page/window-scroller'
import Adaptive from './page/adaptive'
import Base from './page/base'

import styles from './style.less'

class Nav extends React.PureComponent {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Router>
        <div className={styles['main-container']} id="container">
          <div className={styles.nav}>
            <div className={styles.link}><Link to="/base">base</Link></div>
            <div className={styles.link}><Link to="/adaptive">adaptive</Link></div>
            <div className={styles.link}><Link to="/window-scroller">window scroller</Link></div>
          </div>
          <div className={styles.content}>
            <Switch>
              <Route exact path="/"><Base /></Route>
              <Route path="/base"><Base /></Route>
              <Route path="/adaptive"><Adaptive /></Route>
              <Route path="/window-scroller"><WindowScroller /></Route>
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<Nav />, document.getElementById('app'))

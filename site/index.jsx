import React from 'react'
import ReactDOM from 'react-dom'
import WindowScroller from './window-scroller'
import Adaptive from './adaptive'

class Index extends React.PureComponent {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div>
        <WindowScroller autoHeight autoWidth />
      </div>
      // <Adaptive autoHeight autoWidth />
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('app'))

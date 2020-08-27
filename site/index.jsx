import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Test from '../src/index.jsx'

class Index extends Component {
  render() {
    return (
      <div>
        <Test />
      </div>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('app'))

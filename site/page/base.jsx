/* eslint-disable class-methods-use-this */
import React from 'react'
import VT from './v-table'

class Index extends React.PureComponent {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <p>VTable component</p>
        <VT />
      </div>
    )
  }
}

export default Index

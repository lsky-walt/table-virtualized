import React from 'react'
import { Adaptive } from 'src'
import VT from './v-table'

class Index extends React.PureComponent {
  render() {
    return (
      <>
        <h2>VTable wrap Adaptive component</h2>
        <Adaptive>
          {({ width, height }) => (<VT {...this.props} width={width} height={height} />)}
        </Adaptive>
      </>
    )
  }
}

export default Index

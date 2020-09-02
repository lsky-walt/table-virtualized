import React from 'react'
import { Adaptive } from 'src'

import Base from './base'

class Index extends React.PureComponent {
  render() {
    return (
      <Adaptive>
        {({ width, height }) => (<Base {...this.props} width={width} height={height} />)}
      </Adaptive>
    )
  }
}

export default Index

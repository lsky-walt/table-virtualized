import React from 'react'
import { WindowScroller } from 'src'
import Adaptive from './adaptive'
import Base from './base'

class Index extends React.PureComponent {
  // eslint-disable-next-line class-methods-use-this
  tableRender({
    rowIndex, columnIndex, key, style,
  }) {
    return (
      <div key={key} style={style}>{`row-${rowIndex}-col-${columnIndex}`}</div>
    )
  }

  render() {
    return (
      <WindowScroller>
        {({
          scrollLeft,
          scrollTop,
        }) => <Adaptive isWindowScroller scrollLeft={scrollLeft} scrollTop={scrollTop} />}
      </WindowScroller>
    )
  }
}

export default Index

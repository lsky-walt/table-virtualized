import React from 'react'
import { WindowScroller } from 'src'
import Adaptive from './adaptive'
import Base from './base'

class Index extends React.Component {
  constructor() {
    super()
    this.dom = null
    this.state = {
      container: null,
      renderCustomDom: true,
    }
    this.bindContainer = this.bindContainer.bind(this)
  }

  // eslint-disable-next-line class-methods-use-this
  tableRender({
    rowIndex, columnIndex, key, style,
  }) {
    return (
      <div key={key} style={style}>{`row-${rowIndex}-col-${columnIndex}`}</div>
    )
  }

  bindContainer(dom) {
    this.setState({ container: dom })
  }

  renderWithScroller() {
    return (
      <div style={{ display: 'flex', flex: '1 0 auto', overflow: 'scroll' }} id="test-scroller" ref={this.bindContainer}>
        <div style={{ height: 100, backgroundColor: 'silver' }} />
        <WindowScroller
          scrollElement={this.state.container}
        >
          {({
            scrollLeft,
            scrollTop,
          }) => <Adaptive isWindowScroller scrollLeft={scrollLeft} scrollTop={scrollTop} />}
        </WindowScroller>
      </div>
    )
  }

  render() {
    const { renderCustomDom } = this.state
    if (renderCustomDom) {
      return this.renderWithScroller()
    }
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

/* eslint-disable indent */
import React from 'react'
import { WindowScroller } from 'src'
import clsx from 'clsx'
import VT from './v-table'
import styles from '../style.less'

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

  render() {
    const { renderCustomDom } = this.state
    return (
      <div
        className={clsx(styles['window-scroller'], renderCustomDom && styles['custom-scroller'])}
        id="test-scroller"
        ref={this.bindContainer}
      >
        <div className={styles.placeholder}>
          <input
            type="checkbox"
            checked={renderCustomDom}
            onChange={(e) => {
              this.setState({ renderCustomDom: e.target.checked })
            }}
          />
          use custom element scroller
        </div>
        <WindowScroller
          scrollElement={renderCustomDom ? this.state.container : undefined}
        >
          {({
            scrollLeft,
            scrollTop,
          }) => (
              <VT
                isWindowScroller
                scrollLeft={scrollLeft}
                scrollTop={scrollTop}
              />
            )}
        </WindowScroller>
      </div>
    )
  }
}

export default Index

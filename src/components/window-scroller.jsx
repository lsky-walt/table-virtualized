import React from 'react'
import PropTypes from 'prop-types'
import { registerScrollListener, unregisterScrollListener } from 'src/tools/window-scroller'

import styles from 'src/style.less'

class Index extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      scrollLeft: props.scrollLeft || 0,
      scrollTop: props.scrollTop || 0,
    }

    this.bindRef = this.bindRef.bind(this)

    this.domTop = 0
    this.domLeft = 0
  }

  componentDidMount() {
    const { scrollElement } = this.props
    Promise.resolve().then(() => {
      this.updatePosition()
    })
    registerScrollListener(scrollElement, this)
  }

  componentWillUnmount() {
    const { scrollElement } = this.props
    unregisterScrollListener(scrollElement)
  }

  updatePosition() {
    if (this.dom) {
      const rect = this.dom.getBoundingClientRect()
      this.domTop = rect.top
      this.domLeft = rect.left
    }
  }

  handleScroller() {
    const { scrollElement } = this.props
    let newState = {}
    if (scrollElement) {
      newState = {
        scrollTop: scrollElement.scrollTop,
        scrollLeft: scrollElement.scrollLeft,
      }
    } else {
      newState = {
        scrollTop: window.scrollY,
        scrollLeft: window.scrollX,
      }
    }

    this.setState(newState)
  }

  bindRef(node) {
    this.dom = node
  }

  render() {
    const { children } = this.props
    const { scrollTop, scrollLeft } = this.state
    return (
      <div className={`window-scroller ${styles['window-scroller'] || ''}`} ref={this.bindRef}>
        {children({
          scrollTop,
          scrollLeft,
        })}
      </div>
    )
  }
}

Index.propTypes = {
  scrollElement: PropTypes.node,
  children: PropTypes.func,
  scrollLeft: PropTypes.number,
  scrollTop: PropTypes.number,
}

export default Index

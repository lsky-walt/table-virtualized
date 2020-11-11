import React from 'react'
import PropTypes from 'prop-types'
import {
  registerScrollListener, unregisterScrollListener, getPostion, reRegister,
} from 'src/tools/window-scroller'
import { shortID } from 'src/tools/is'
import clsx from 'clsx'
import styles from 'src/style.less'

class Index extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      scrollLeft: props.scrollLeft || 0,
      scrollTop: props.scrollTop || 0,
    }

    this.bindRef = this.bindRef.bind(this)
    this.checkNumber = this.checkNumber.bind(this)

    this.domTop = 0
    this.domLeft = 0

    this.shortID = shortID()
  }

  componentDidMount() {
    const { scrollElement } = this.props

    // wait children render
    Promise.resolve().then(() => {
      this.updatePosition()
    })
    registerScrollListener(scrollElement, this, this.shortID)
  }

  componentDidUpdate(prevProps) {
    const { scrollElement: prevScrollElement } = prevProps
    const { scrollElement } = this.props
    if (prevScrollElement !== scrollElement) {
      unregisterScrollListener(prevScrollElement, this.shortID)
      registerScrollListener(scrollElement, this, this.shortID)
    }
  }

  componentWillUnmount() {
    const { scrollElement } = this.props
    unregisterScrollListener(scrollElement, this.shortID)
  }

  updatePosition() {
    if (this.dom) {
      const rect = getPostion(this.dom)
      this.domTop = rect.top
      this.domLeft = rect.left
    }
  }

  // eslint-disable-next-line class-methods-use-this
  checkNumber(num, mode = 'top') {
    const map = {
      top: num - this.domTop,
      left: num - this.domLeft,
    }

    if (map[mode] >= 0) return map[mode]
    return 0
  }

  handleScroller() {
    const { scrollElement } = this.props
    let newState = {}
    if (scrollElement) {
      newState = {
        scrollTop: this.checkNumber(scrollElement.scrollTop),
        scrollLeft: this.checkNumber(scrollElement.scrollLeft, 'left'),
      }
    } else {
      newState = {
        scrollTop: this.checkNumber(window.scrollY),
        scrollLeft: this.checkNumber(window.scrollX, 'left'),
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
      <div className={clsx('vTable-window-scroller', styles['window-scroller'])} ref={this.bindRef}>
        {children({
          scrollTop,
          scrollLeft,
        })}
      </div>
    )
  }
}

Index.propTypes = {
  children: PropTypes.func,
  /**
   * scroll element
   */
  scrollElement: PropTypes.any,
  /**
   * scrollLeft,
   * controlled
   */
  scrollLeft: PropTypes.number,
  /**
   * scrollTop,
   * controlled
   */
  scrollTop: PropTypes.number,
}

Index.displayName = 'WindowScroller'

export default Index

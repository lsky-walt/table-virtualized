import React from 'react'
import PropTypes from 'prop-types'

import { isNumber } from 'src/tools/is'
import throttle from 'lodash.throttle'
import clsx from 'clsx'

import styles from 'src/style.less'

/**
 * Adaptive container
 */
class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      width: props.defaultWidth || 0,
      height: props.defaultHeight || 0,
    }

    this.bindRef = this.bindRef.bind(this)
    this.updateState = this.updateState.bind(this)
    this.onResize = this.onResize.bind(this)
  }

  componentDidMount() {
    if (this.dom && this.dom.contentWindow) {
      this.dom.contentWindow.addEventListener('resize', throttle(this.onResize, 16))

      // first trigger
      this.updateState({
        width: this.dom.clientWidth,
        height: this.dom.clientHeight,
      })
    }
  }

  componentWillUnmount() {
    if (this.dom && this.dom.contentWindow) {
      this.dom.contentWindow.removeEventListener('resize', throttle(this.onResize, 16))
    }
  }

  onResize(event) {
    this.updateState({
      width: event.target.innerWidth,
      height: event.target.innerHeight,
    })
  }

  bindRef(node) {
    this.dom = node
  }

  updateState({ width, height }) {
    if (!isNumber(width) || !isNumber(height)) {
      return
    }
    this.setState({ width, height })
  }

  render() {
    const { children } = this.props
    const { width, height } = this.state

    return (

      <div className={clsx('vTable-adaptive', styles['adaptive-container'])}>
        <iframe title="adaptive-dom" className={clsx('vTable-dom', styles['adaptive-dom'])} ref={this.bindRef} />
        <div className={clsx('adaptive-content', styles.content)}>
          {children({ width, height })}
        </div>
      </div>

    )
  }
}

Index.propTypes = {
  defaultWidth: PropTypes.number,
  defaultHeight: PropTypes.number,
  children: PropTypes.func,
}

Index.displayName = 'Adaptive'

export default Index

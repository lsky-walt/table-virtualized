import React from 'react'
import PropTypes from 'prop-types'
import { getType, isFunc, isNumber } from 'src/tools/is'
import { TableConfig } from 'src/tools/table'

import throttle from 'lodash.throttle'

import styles from 'src/style.less'

class Index extends React.Component {
  constructor(props) {
    super(props)
    const { scrollLeft, scrollTop } = props
    this.state = {
      tableConfig: new TableConfig(props),
      scrollTop,
      scrollLeft,
    }

    this.bindContainer = this.bindContainer.bind(this)
    this.onScroll = throttle(this.onScroll.bind(this), 16)

    this.updateScroll = this.updateScroll.bind(this)
  }

  componentDidMount() {
    if (this.container) {
      this.container.addEventListener('scroll', this.onScroll)
    }
  }

  componentDidUpdate(prevProps) {
    const { scrollLeft, scrollTop } = this.state
    // if (this.container.scrollLeft !== scrollLeft) {
    //   this.container.scrollLeft = scrollLeft
    // }
    // if (this.container.scrollTop !== scrollTop) {
    //   this.container.scrollTop = scrollTop
    // }
  }

  componentWillUnmount() {
    this.container.removeEventListener('scroll', this.onScroll)
  }

  static getDerivedStateFromProps(props, state) {
    const { tableConfig } = state
    if (tableConfig.determineNeedToUpdate(props)) {
      tableConfig.update(props)
    }
    return null
  }

  onScroll(event) {
    if (event.target !== this.container) {
      return
    }

    const { scrollTop, scrollLeft } = event.target
    this.updateScroll({ scrollLeft, scrollTop })
  }

  updateScroll({ scrollLeft, scrollTop }) {
    this.setState({
      scrollTop,
      scrollLeft,
    })
  }

  bindContainer(node) {
    this.container = node
  }

  calcRenderChildren() {
    // const {scrollTop, scrollLeft, tableConfig} = this.props
  }

  render() {
    const { width, height } = this.props
    const { tableConfig } = this.state

    // inner container style
    const innerContainerStyle = {
      width: tableConfig.getColumnTotalSize(),
      height: tableConfig.getRowTotalSize(),
      position: 'relative',
    }

    tableConfig.calcRange(this.state)

    return (
      <div
        ref={this.bindContainer}
        onScroll={this.onScroll}
        className={styles['table-container']}
        style={{
          width, height,
        }}
      >
        <div style={innerContainerStyle} />
      </div>
    )
  }
}

Index.propTypes = {
  columnWidth: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func,
  ]),
  width: PropTypes.number,
  height: PropTypes.number,
  scrollTop: PropTypes.number,
  scrollLeft: PropTypes.number,
}

export default Index

import React from 'react'
import PropTypes from 'prop-types'
import { getType, isFunc, isNumber } from 'src/tools/is'
import { TableConfig } from 'src/tools/table'

import throttle from 'lodash.throttle'

import styles from 'src/style.less'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.bindContainer = this.bindContainer.bind(this)
    this.onScroll = this.onScroll.bind(this)

    this.updateScroll = this.updateScroll.bind(this)

    const { scrollLeft, scrollTop } = props
    const instance = new TableConfig(props)

    // set scroll callback
    instance.setScrollCallback(this.onScroll)

    this.state = {
      tableConfig: instance,
      scrollTop,
      scrollLeft,
    }
  }

  componentDidMount() {
    this.state.tableConfig.registerScrollListener(this.container)
  }

  componentDidUpdate(prevProps) {
    const { onScroll, scrollLeft, scrollTop } = this.props
    const { scrollLeft: slt, scrollTop: slp } = this.state
    if (isFunc(onScroll)) onScroll({ scrollLeft: slt, scrollTop: slp })

    // distinguish between controlled and uncontrolled
    if ((isNumber(scrollLeft) && scrollLeft !== prevProps.scrollLeft)
      || (isNumber(scrollTop) && scrollTop !== prevProps.scrollTop)) {
      this.updateScroll({ scrollLeft, scrollTop, controll: true })
    }
  }

  componentWillUnmount() {
    this.state.tableConfig.unregisterScrollListener(this.container)
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

  updateScroll({ scrollLeft, scrollTop, controll }) {
    this.setState({
      scrollTop,
      scrollLeft,
    })
  }

  bindContainer(node) {
    this.container = node
  }

  calcRenderChildren() {
    const { render } = this.props
    const { tableConfig } = this.state
    if (!isFunc(render)) return null
    const range = tableConfig.calcRange(this.state)
    return range.map((value) => {
      const [rowIndex, children, style] = value
      if (!children || children.length < 1) return <div key={`row-${rowIndex}`} className="row" />
      return (
        <div key={`row-${rowIndex}`} className="row" style={style}>
          {children.map((cellData) => render({
            columnIndex: cellData[0],
            rowIndex,
            style: cellData[1],
            key: cellData[2],
          }))}
        </div>
      )
    })
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

    return (
      <div
        ref={this.bindContainer}
        onScroll={this.onScroll}
        className={styles['table-container']}
        style={{
          width, height,
        }}
      >
        <div style={innerContainerStyle}>{this.calcRenderChildren()}</div>
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
  render: PropTypes.func,
  onScroll: PropTypes.func,
}

export default Index

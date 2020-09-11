import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import VTable from './components/table'
import Adaptive from './components/adaptive'
import WScroller from './components/window-scroller'

class WindowScroller extends PureComponent {
  renderChild({ scrollLeft, scrollTop }) {
    const {
      adaptive, scrollTop: st, scrollLeft: sf, scrollElement, ...props
    } = this.props
    if (!adaptive) {
      return (
        <VTable
          auto
          scrollLeft={scrollLeft}
          scrollTop={scrollTop}
          {...props}
        />
      )
    }

    return (
      <Adaptive>
        {({ width, height }) => (
          <VTable
            auto
            scrollLeft={scrollLeft}
            scrollTop={scrollTop}
            width={width}
            height={height}
            {...props}
          />
        )}
      </Adaptive>
    )
  }

  render() {
    const { scrollElement, scrollLeft, scrollTop } = this.props
    return (
      <WScroller scrollElement={scrollElement} scrollLeft={scrollLeft} scrollTop={scrollTop}>{this.renderChild.bind(this)}</WScroller>
    )
  }
}

WindowScroller.propTypes = {
  /**
   * use adaptive component ?
   * default true
   */
  adaptive: PropTypes.bool,
  /**
   * scroll element
   */
  scrollElement: PropTypes.node,
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

WindowScroller.defaultProps = {
  adaptive: true,
}

WindowScroller.displayName = 'WindowScroller'

export default WindowScroller

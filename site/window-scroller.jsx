import React from 'react'
import { WindowScroller } from 'src'
import Base from './base'
import Adaptive from './adaptive'

class Index extends React.PureComponent {
  render() {
    return (
      <WindowScroller>
        {({ scrollLeft, scrollTop }) => (
          <Adaptive>
            {({ width, height }) => (
              <Base
                {...this.props}
                width={width}
                height={height}
                scrollTop={scrollTop}
                scrollLeft={scrollLeft}
              />
            )}
          </Adaptive>
        )}
      </WindowScroller>
    )
  }
}

export default Index

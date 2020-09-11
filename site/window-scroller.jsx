import React from 'react'
import { WindowScroller } from 'src'

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
      <WindowScroller
        rowHeight={40}
        columnWidth={100}
        columnCount={100}
        rowCount={1000}
        render={this.tableRender}
        onScroll={({ scrollTop, scrollLeft }) => {
          console.log(`scrollTop: ${scrollTop}, scrollLeft: ${scrollLeft}`)
        }}
      />
    )
  }
}

export default Index

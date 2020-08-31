import React from 'react'
import ReactDOM from 'react-dom'
import Test from 'src/index'

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
      <div>
        <Test
          width={600}
          height={500}
          rowHeight={40}
          columnWidth={100}
          columnCount={100}
          rowCount={1000}
          render={this.tableRender}
          onScroll={({ scrollTop, scrollLeft }) => {
            console.log('scrollTop: ', scrollTop)
            console.log('scrollLeft: ', scrollLeft)
          }}
        />
      </div>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('app'))

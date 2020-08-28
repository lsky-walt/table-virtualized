import React from 'react'
import ReactDOM from 'react-dom'
import Test from 'src/index'

class Index extends React.PureComponent {
  // eslint-disable-next-line class-methods-use-this
  tableRender({ rowIndex, columnIndex }) {
    return (
      <div>{`row-${rowIndex}-col-${columnIndex}`}</div>
    )
  }

  render() {
    return (
      <div>
        <Test
          width={600}
          height={500}
          rowHeight={40}
          columnWidth={40}
          columnCount={100}
          rowCount={1000}
          render={this.tableRender}
        />
      </div>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('app'))

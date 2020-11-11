/* eslint-disable class-methods-use-this */
import React from 'react'
import VTable from 'src'

class Index extends React.PureComponent {
  tableRender({
    rowIndex, columnIndex, key, style,
  }) {
    return (
      <div key={key} style={style}>{`row-${rowIndex}-col-${columnIndex}`}</div>
    )
  }

  render() {
    return (
      <VTable
        width={860}
        height={600}
        rowHeight={40}
        columnWidth={100}
        columnCount={100}
        rowCount={1000}
        render={this.tableRender}
        {...this.props}
      />
    )
  }
}

export default Index

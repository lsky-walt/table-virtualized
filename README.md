# Virtual Table

> React components for render table with virtual

## Installing

### npm
```shell
$ npm i @lsky/v-table
```

### yarn
```shell
$ yarn add @lsky/v-table
```

### And you need to React and ReactDom
```shell
$ npm i react react-dom
```

## Example

### Basic usage

```javascript
import React from 'react'
import VTable from '@lsky/v-table'

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
      />
    )
  }
}
```

### Wrap Adaptive

> `Adaptive` component will adapt the container width and height, and return the width and height value.

*Warning:* The parent element must have `relative` attr.

```javascript
import React from 'react'
import VTable, { Adaptive } from '@lsky/v-table'

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
      <Adaptive>
        {({ width, height }) => (
          <VTable
            width={width}
            height={height}
            rowHeight={40}
            columnWidth={100}
            columnCount={100}
            rowCount={1000}
            render={this.tableRender}
          />
        )}
      </Adaptive>
    )
  }
}

```

### Wrap WindowScroller

*Warning: * WindowScroller cannot be mixed with Adaptive.

```javascript

import React from 'react'
import VTable, { WindowScroller } from '@lsky/v-table'

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
      <WindowScroller>
        {({ scrollTop, scrollLeft }) => (
          <VTable
            width={860}
            height={600}
            scrollTop={scrollTop}
            scrollLeft={scrollLeft}
            rowHeight={40}
            columnWidth={100}
            columnCount={100}
            rowCount={1000}
            render={this.tableRender}
          />
        )}
      </WindowScroller>
    )
  }
}

```


## Component Props

### VTable

| attr | type | default value | required | desc |
| --- | --- | --- | --- | --- |
| columnWidth | number \| ((columnIndex) => number) | null | true | column width |
| columnCount | number | null | true | column count |
| rowHeight | number \| ((rowIndex) => number) | null | true | row height |
| rowCount | number | null | true | row count |
| width | number | null | true | container width |
| height | number | null | true | container height |
| scrollTop | number | null | false | scrollTop. if passed in, change to controlled component |
| scrollLeft | number | null | false | scrollLeft. if passed in, change to controlled component |
| render | (({rowIndex, columnIndex, key, style}) => React.node) | null | true | render cell |
| onScroll | (({scrollTop, scrollLeft}) => void) | null | false | onScroll |
| isWindowScroller | boolean | null | false | is use WindowScroller component wrap |


### Adaptive 

| attr | type | default value | required | desc |
| --- | --- | --- | --- | --- |
| defaultWidth | number | null | false | default width |
| defaultHeight | number | null | false | default height |
| children | (({width, height}) => React.node) | null | true | children |


### WindowScroller

| attr | type | default value | required | desc |
| --- | --- | --- | --- | --- |
| scrollLeft | number | null | false | scroll left |
| scrollTop | number | null | false | scroll top |
| children | (({scrollLeft, scrollTop}) => React.node) | null | true | children |
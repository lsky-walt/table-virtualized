# table-virtualized

> virtualize table

## Component Props

### vTable

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


### Adaptive 

| attr | type | default value | required | desc |
| --- | --- | --- | --- | --- |
| defaultWidth | number | null | false | default width |
| defaultHeight | number | null | false | default height |
| children | (({width, height}) => React.node) | null | true | children |


### WindowScroller

| attr | type | default value | required | desc |
| --- | --- | --- | --- | --- |
| scrollElement | dom | null | false | scroll element |
| scrollLeft | number | null | false | scroll left |
| scrollTop | number | null | false | scroll top |
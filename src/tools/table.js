import { isFunc, isNumber } from './is'

const row = 'row'
const column = 'column'

const defaultOverRender = 5

class TableConfig {
  constructor(config) {
    this.config = config
    this.columnWidth = new Map()
    this.rowHeight = new Map()

    this.totalSize = { column: 0, row: 0 } // [column, row]

    this.size = new Map()

    this.countMap = {
      column: this.getTargetNum.bind(this, 'columnWidth'),
      row: this.getTargetNum.bind(this, 'rowHeight'),
    }

    // init()
    this.init()
  }

  calcTarget(target, index) {
    const t = this.config[target]
    if (isFunc(t)) return t[index] || 0
    if (isNumber(t)) return t
    return 0
  }

  getTargetNum(target, index, n) {
    if (this[target].get(index)) return this[target].get(index) || 0
    const t = this.calcTarget(target, index)
    this[target].set(index, [t, n])
    return t
  }

  getTargetTotalSize(target = row, isUpdate = false) {
    if (!isUpdate) {
      return this.totalSize[target]
    }
    // loop count
    const c = Array.from({ length: this.config[`${target}Count`] || 0 }).reduce((acc, cur, index) => {
      acc += this.countMap[target](index, acc)
      return acc
    }, 0)
    this.totalSize[target] = c
    return c
  }

  getTotalSize() {
    for (const [i, [w, left]] of this.columnWidth.entries()) {
      Array.from({ length: this.rowHeight.size }).forEach((_, index) => {
        const [h, top] = this.rowHeight.get(index)
        this.size.set(`${i}-${index}`, {
          width: w,
          height: h,
          left,
          top,
        })
      })
    }
  }

  /**
   *get column total width
   *
   * @param {boolean} [isUpdate=false]
   * @returns number
   * @memberof TableConfig
   */
  getColumnTotalSize(isUpdate = false) {
    return this.getTargetTotalSize(column, isUpdate)
  }

  /**
   *get row total height
   *
   * @param {boolean} [isUpdate=false]
   * @returns number
   * @memberof TableConfig
   */
  getRowTotalSize(isUpdate = false) {
    return this.getTargetTotalSize(row, isUpdate)
  }

  update(config) {
    this.config = config
    this.init()
  }

  /**
 *determine neet to update config
 * if rowHeight columnWidth rowCount columnCount different, update
 * @param {*} nextConfig
 * @memberof TableConfig
 */
  determineNeedToUpdate(nextConfig) {
    const {
      rowCount, columnCount, rowHeight, columnWidth,
    } = nextConfig
    if (rowCount !== this.config.rowCount
      || columnCount !== this.config.columnCount
      || rowHeight !== this.config.rowHeight
      || columnWidth !== this.config.columnWidth) {
      return true
    }
    return false
  }

  // calcRenderCount() {
  //   const {width, height, rowHeight, columnWidth} = this.config

  // }

  calcRange({
    scrollTop,
    scrollLeft,
  }) {
    const { column, row } = this.totalSize
    const { width, height } = this.config
    // column + defaultOverRender * 2
    // row + defaultOverRender * 2
    const mid = Math.floor(column / 2)
    const res = []
    const colw = 0

    for (const [i, [w, left]] of this.columnWidth.entries()) {
      if (left < scrollLeft) {
        res.push({
          left,
        })
      }
    }
  }

  init() {
    this.getTargetTotalSize(row, true)
    this.getTargetTotalSize(column, true)

    // size
    this.getTotalSize()
  }
}

export {
  TableConfig,
}

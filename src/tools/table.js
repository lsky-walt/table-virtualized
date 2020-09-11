import throttle from 'lodash.throttle'
import { isFunc, isNumber } from './is'

const row = 'row'
const column = 'column'

const defaultOverRender = 2

class TableConfig {
  constructor(config) {
    this.config = config
    this.totalSize = { column: 0, row: 0 } // [column, row]

    /**
     * key: column-row
     * value: {
     *  width,
     *  height,
     *  top,
     *  left
     * }
     */
    this.size = new Map()

    this.column = []
    this.row = []

    this.countMap = {
      column: this.getTargetNum.bind(this, column),
      row: this.getTargetNum.bind(this, row),
    }

    // init()
    this.init()

    this.register = []
  }

  static getTargetKey(target, prefix = false) {
    if (target === column) {
      return prefix ? `${target}Width` : 'width'
    }
    return prefix ? `${target}Height` : 'height'
  }

  static getSizeKey(columnIndex, rowIndex, target) {
    const map = {
      column: () => `${columnIndex}-0`,
      row: () => `0-${rowIndex}`,
    }
    if (target) {
      return map[target]()
    }
    return `${columnIndex}-${rowIndex}`
  }

  calcTarget(target, index) {
    const t = this.config[TableConfig.getTargetKey(target, true)]
    if (isFunc(t)) return t[index] || 0
    if (isNumber(t)) return t
    return 0
  }

  getTargetNum(target, index) {
    const key = TableConfig.getSizeKey(index, index, target)
    if (this.size.get(key)) return this.size.get(key)[TableConfig.getTargetKey(target)] || 0
    const n = this.calcTarget(target, index)
    this[target][index] = n
    return n
  }

  getTargetTotalSize(target = row, isUpdate = false) {
    if (!isUpdate && this.totalSize[target]) {
      return this.totalSize[target]
    }
    // loop count
    const c = Array.from({ length: this.config[`${target}Count`] || 0 }).reduce((acc, cur, index) => {
      // getTargetNum
      acc += this.countMap[target](index)
      return acc
    }, 0)
    this.totalSize[target] = c
    return c
  }

  getTotalSize() {
    // cache all size
    const { rowCount, columnCount } = this.config
    const r = Array.from({ length: rowCount })
    let left = 0 // column width

    Array.from({ length: columnCount }).reduce((acc, _, index) => {
      const w = this.getTargetNum(column, index)
      let top = 0
      r.forEach((__, i) => {
        const h = this.getTargetNum(row, i)
        acc.set(`${index}-${i}`, {
          width: w,
          height: h,
          top,
          left,
        })

        // ++
        top += h
      })
      left += w
      return acc
    }, this.size)
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
      rowCount, columnCount, rowHeight, columnWidth, width, height,
    } = nextConfig
    if (rowCount !== this.config.rowCount
      || columnCount !== this.config.columnCount
      || rowHeight !== this.config.rowHeight
      || columnWidth !== this.config.columnWidth
      || width !== this.config.width
      || height !== this.config.height) {
      return true
    }
    return false
  }

  // make up range with overRenderCount
  makeUp(arr, max) {
    const { overRenderCount = defaultOverRender } = this.config
    const min = arr[0]
    // front
    let makeUp = min - 1 // index
    while (makeUp >= 0 && (min - makeUp) <= overRenderCount) {
      arr.unshift(makeUp)
      makeUp -= 1
    }

    // end
    const last = arr[arr.length - 1]
    makeUp = last + 1
    while (makeUp <= max && (makeUp - last <= (overRenderCount))) {
      arr.push(makeUp)
      makeUp += 1
    }
  }

  calcRange({
    scrollTop = 0,
    scrollLeft = 0,
  }) {
    const {
      width, height, columnCount, rowCount,
    } = this.config
    const res = []
    const colr = []
    const rowr = []
    let colw = 0
    let rowh = 0

    this.column.every((v, index) => {
      const diff = colw - scrollLeft
      if (diff > width) {
        return false
      }

      if (diff >= 0) {
        colr.push(index)
      }
      colw += v
      return true
    })

    this.row.every((v, index) => {
      const diff = rowh - scrollTop
      if (diff > height) {
        return false
      }

      if (diff >= 0) {
        rowr.push(index)
      }

      rowh += v
      return true
    })

    // make up
    this.makeUp(colr, columnCount)
    this.makeUp(rowr, rowCount)

    rowr.forEach((i) => {
      const ro = colr.map((n) => {
        const style = this.size.get(`${n}-${i}`)
        return [n, { ...style, position: 'absolute' }, `${n}-${i}`]
      })
      res.push([i, ro, { height: this.getTargetNum(row, i) }])
    })

    return res
  }

  setScrollCallback(fun = () => {}) {
    this.scrollCallback = fun
  }

  registerScrollListener(dom) {
    const { scrollTop, scrollLeft } = this.config
    if (dom && !isNumber(scrollTop) && !isNumber(scrollLeft)) {
      dom.addEventListener('scroll', throttle(this.scrollCallback, 16))
    }
    // cache dom
    this.register.push(dom)
  }

  unregisterScrollListener(dom) {
    const { scrollTop, scrollLeft } = this.config
    if (dom && !isNumber(scrollTop) && !isNumber(scrollLeft)) {
      dom.removeEventListener('scroll', throttle(this.scrollCallback, 16))
    }
    // remove dom
    this.register = this.register.filter((d) => (d !== dom))
  }

  // get container style
  getContainerStyle() {
    const {
      width, height, auto,
    } = this.config
    const style = {
      width,
      height,
    }
    if (auto) {
      style.width = this.getColumnTotalSize()
      style.height = this.getRowTotalSize()
    }

    return style
  }

  init() {
    // size
    this.getTotalSize()
  }
}

export {
  TableConfig,
}

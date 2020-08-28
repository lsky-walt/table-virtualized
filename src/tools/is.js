export function curry(f, ...args) {
  if (args.length >= f.length) {
    return f(...args)
  }

  return (...next) => curry(f.bind(f, ...args), ...next)
}

export const getType = (val) => val && val.constructor && val.constructor.name

const nameIs = curry((name, val) => getType(val) === name)

// eslint-disable-next-line
export const isArray = Array.isArray
export const isUndef = (v) => v == null
export const isNotUndef = (v) => v != null
// eslint-disable-next-line
export const isNan = a => a !== a
export const isFunc = (f) => typeof f === 'function'
export const isNumber = (n) => typeof n === 'number'
export const isObject = (val) => val && typeof val === 'object' && !isArray(val)
export const isString = (s) => typeof s === 'string'
export const isDate = (val) => val instanceof Date
export const isError = (val) => val instanceof Error
export const isRegexp = (val) => val instanceof RegExp
export const isMap = nameIs('Map')
export const isSet = nameIs('Set')
export const isSymbol = nameIs('Symbol')
export const isPromise = (p) => p && (nameIs('Promise', p) || isFunc(p.then))

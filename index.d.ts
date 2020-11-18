import * as React from 'react'

interface VTableRenderParams {
  columnIndex: number,
  rowIndex: number,
  style: object,
  key: string
}

interface ScrollParams {
  scrollTop: number,
  scrollLeft: number
}

interface AdaptiveChildrenParams {
  width: number,
  height: number
}

interface WindowScrollerChildrenParams extends ScrollParams { }

export interface VTableProps {
  columnWidth: number | ((index: number) => number),
  columnCount: number,
  rowHeight: number | ((index: number) => number),
  rowCount: number,
  width: number,
  height: number,
  scrollTop?: number,
  scrollLeft?: number,
  render: ((renderParams: VTableRenderParams) => React.ReactNode),
  onScroll?: ((scrollParams: ScrollParams) => void),
  isWindowScroller?: boolean
}

interface VTableState {
  tableConfig: any,
  scrollTop: number | void,
  scrollLeft: number | void
}

export interface AdaptiveProps {
  defaultWidth?: number,
  defaultHeight?: number,
  children?: ((adaptiveChildrenParams: AdaptiveChildrenParams) => React.ReactNode)
}

interface AdaptiveState {
  width: number | 0,
  height: number | 0
}

export interface WindowScrollerProps {
  scrollLeft?: number,
  scrollTop?: number,
  scrollElement?: HTMLElement,
  children: ((windowScrollerChildrenParams: WindowScrollerChildrenParams) => React.ReactNode)
}

interface WindowScrollerState {
  scrollLeft: number | 0,
  scrollTop: number | 0
}

declare class VTable extends React.Component<VTableProps, VTableState> {
  render(): JSX.Element
}

declare class Adaptive extends React.Component<AdaptiveProps, AdaptiveState>  {
  render(): JSX.Element
}

declare class WindowScroller extends React.Component<WindowScrollerProps, WindowScrollerState> {
  render(): JSX.Element
}
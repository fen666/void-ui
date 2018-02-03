export type TableCell = string | number;
export type TextAlign = 'left' | 'center' | 'right';
export type SorterFunction = (a: TableRow, b: TableRow, c?: string) => number;
export interface TableRow {
  [key: string]: TableCell;
}

export interface Sorter {
  asc: SorterFunction;
  desc: SorterFunction;
  normal: SorterFunction;
  [key: string]: SorterFunction;
}

export interface TableHeaderItem {
  content: string;
  key: string;
  sortable?: boolean;
  formatter?: (cell: TableCell, row?: TableRow, headerItem?: TableHeaderItem) => string;
  sorter?: Sorter | SorterFunction;
  // compareLocales?: string | string[];
  // compareOptions?: Intl.CollatorOptions;

  [prop: string]: any;
}

export enum SortEventName {
  normal,
  asc,
  desc,
}

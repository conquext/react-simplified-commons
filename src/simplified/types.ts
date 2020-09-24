export interface Props {
  className?: string | Record<string, unknown>
  ordered?: boolean
  item?: boolean
}

export interface gFilterProps {
  preGlobalFilteredRows: unknown
  globalFilter: unknown
  setGlobalFilter: unknown
}

export type gFilterState = unknown

export type filterColumnProps = unknown

export type FilterType = {
  fuzzyText: unknown
  text: (rows: unknown, id: unknown, filterValue: unknown) => unknown
}

export interface CheckboxProps {
  className?: string | Record<string, unknown>
  ordered?: boolean
  item?: boolean
}

export type DefaultColumn = {
  Filter?: ({
    column: { filterValue, preFilteredRows, setFilter },
  }: {
    column: {
      filterValue: unknown
      preFilteredRows: unknown
      setFilter: unknown
    }
  }) => JSX.Element
  Cell?: ({
    value: initialValue,
    row: { index },
    column,
    updateData,
  }: {
    value: unknown
    row: {
      index: unknown
    }
    column: unknown
    updateData: (index, id, value) => unknown
  }) => unknown
}

export type GlobalFilter = {
  use: boolean
  pos: 'below' | 'above'
  Component: ({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) => JSX.Element
}

export interface TableOptions {
  tableClassName?: string
  filterTypes?: FilterType
  defaultColumn?: DefaultColumn
  globalFilter?: GlobalFilter
  renderHeader?: (header: unknown) => JSX.Element
  renderFilter?: (column: unknown) => JSX.Element
  renderTableBody?: (column: unknown) => JSX.Element
  renderTableRow?: (row: unknown, prepareTableRow: unknown) => JSX.Element
  renderExtraTableTd?: (controls: unknown) => JSX.Element
  renderTableCell?: (cell: unknown) => JSX.Element
  handleTableControls?: {
    beforeTableRender?: (controls: unknown) => JSX.Element
    jsx?: (controls) => JSX.Element
  }
  customHook?: (hooks: unknown) => unknown
}

export interface Props {
  className?: string | Record<string, unknown>
  buttonLabel: string | React.ReactElement
}

export interface UploadProps {
  disabled?: boolean
  autoUpload?: boolean
  allowedExtensions?: string[]
  maxFileSize?: number
  className?: string
  render: (el: HTMLInputElement | null) => JSX.Element
  refreshCallback?: (data: UploadState) => void
  uploadHandler?: (
    data: FormData,
    state: UploadState,
    cb: (update: any) => void
  ) => Promise<boolean> | void
}

export type UploadState = {
  files: any[]
  events: any[]
  filePreviews: any
  uploading: boolean
  content: string
  selectedFile: any
  loaded: number
  warning: string
  error: string
}

export type UploadStateOptional = {
  files?: any[]
  events?: any[]
  filePreviews?: any
  uploading?: boolean
  content?: string
  selectedFile?: any
  loaded?: number
  warning?: string
  error?: string
}

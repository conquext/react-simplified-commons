![Forked from React-table](https://github.com/tannerlinsley/react-table/)

Hooks for building **lightweight, fast and extendable datagrids** for React

## Visit [react-table.tanstack.com](https://react-table.tanstack.com) for docs, guides, API and more!

## Quick Features of the original react-table

- Headless (100% customizable, Bring-your-own-UI)
- Auto out of the box, fully controllable API
- Sorting (Multi and Stable)
- Filters
- Pivoting & Aggregation
- Row Selection
- Row Expansion
- Column Ordering
- Animatable
- Virtualizable
- Resizable
- Server-side/controlled data/state
- Extensible via hook-based plugin system

### [Become a Sponsor](https://github.com/sponsors/conquext/)

[Sample Code](https://github.com/conquext/react-simplified-commons/blob/master/examples/simplified-commons/src/App.js)

[Live Example](http://rewarddemo.herokuapp.com/)

[Contact me on twitter](https://twitter.com/rash3ye)

````

    import {Table, Upload, Popdown} from 'react-simplified-commons'

    <Table
        columns={columns}
        data={data}
        setData={setData}
        tableClassName="w-full"
        filterTypes={filterTypes}
        defaultColumn={defaultColumn}
        globalFilter={{
            use: true,
            Component: GlobalFilter,
            pos: 'below',
        }}
        renderHeader={renderTableHeader}
        // renderFilter= {(column: unknown) => JSX.Element}
        // renderTableBody={renderTableBody}
        renderTableRow={renderTableRow}
        renderExtraTableTd={(controls) =>
        renderExtraTableTd(controls, formikProps)
        }
        loading={pageLoading}
        // renderTableCell= {(cell: unknown) => JSX.Element}
        handleTableControls={{ jsx: handleBatchActions }}
        tableWrapper={{
            use: true,
            wrapper: tableWrapper,
            props: {
                onSubmit: formikProps.handleSubmit,
            },
        }}
        customHook={renderTableHooks}
    />

        <Popdown
          buttonLabel={<span className="self-center hidden text-default text-sm md:flex">
                        Table of contents
                      </span>}
          className="relative outline-none cursor-pointer"
          childrenClass="absolute z-50 p-2 mt-1 space-y-2 bg-white border rounded shadow-md top-10"
          addButtonClass="outline-none p-1"
          overrideButtonClass={(showDropdown) => "p-2 rounded-full cursor-pointer border-none outline-none"}
        >
          <div>
            <ul className="w-56 px-2 py-2 space-y-4 text-sm">
              <li>
                <div className="flex flex-col text-sm">
                  <p className="text-left">Table of Content</p>

                  <p className="text-xs text-left text-default">
                    Filter by Sections or Headers
                  </p>
                </div>
              </li>
              <li>
                <hr className="my-2 dark:border-gray-700" />
              </li>
              {contentsLists &&
                contentsLists.map((coll: any) => (
                  <li key={coll.email}>{/* //the content */}</li>
                ))}
            </ul>
          </div>
        </Popdown>


    <Upload
        allowedExtensions={['xls', 'xlsx',]}
        // autoUpload={true}
        render={(el) => {
        return (
            <span
             onClick={(e) => {
                 <!-- this function receives an html input:file, so initiate a click on it to get the native file uplaod ui -->
                e.preventDefault()
                el && el.click()
            }}
            >
            <FaCloudUploadAlt className="w-6 h-6 mr-2" />
            Upload SpreadSheet
            </span>
        )
        }}

        uploadHandler={(data, state, cb) => {
            <!-- this is your custom function -->
            <!-- it receives the upload state and file data -->
            <!-- the state contains everything you need -->
            uploadDatabase(state, 'spreadsheet')
        }}
    />
    ```
````

Missing Type definitions

```
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
      <!-- controls is defined below -->
  renderExtraTableTd?: (controls: unknown) => JSX.Element
  renderTableCell?: (cell: unknown) => JSX.Element
  handleTableControls?: {
    beforeTableRender?: (controls: unknown) => JSX.Element
    jsx?: (controls) => JSX.Element
  }
  customHook?: (hooks: unknown) => unknown
}

export interface ButtonProps {
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
```

Visit [react-table.tanstack.com](https://react-table.tanstack.com) for details on these controls properties.
If you are already familiar with them, this are properties you can destructure from it.

```
const controls = {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setGlobalFilter,
    setGlobalFilteredRows,
    setPageSize,
    selectedFlatRows,
    visibleColumns,
    preGlobalFilteredRows,
    setColumnOrder,
    state,
  }
```

import React, { useEffect, useState } from 'react'
import {
  useTable,
  usePagination,
  useRowSelect,
  useSortBy,
  useFilters,
  useColumnOrder,
  useGlobalFilter,
  useAsyncDebounce,
} from 'react-table'
import { motion, AnimatePresence } from 'framer-motion'
import matchSorter from 'match-sorter'
import styled from 'styled-components'
import { isEmpty } from './helpers'

const Styles = styled.div``

function TableComponent({
  columns,
  data,
  setData,
  loading,
  tableClassName,
  tableWrapper,
  ...rest
}) {
  const [skipPageReset, setSkipPageReset] = useState(false)

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true)
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
  }

  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  useEffect(() => {
    setSkipPageReset(false)
  }, [data])

  const tableOptions = {}

  Array.from([
    'renderHeader',
    'renderFilter',
    'renderTableBody',
    'renderTableRow',
    'renderExtraTableTd',
    'renderTableCell',
    'defaultColumn',
    'globalFilter',
    'handleTableControls',
    'customHook',
  ]).forEach(option => {
    if (rest[option]) {
      tableOptions[option] = rest[option]
    }
  })

  let TableWrapper = Styles
  if (tableWrapper.use) {
    TableWrapper = tableWrapper.wrapper
  }

  return (
    <TableWrapper {...(tableWrapper.use && { ...tableWrapper.props })}>
      <Table
        tableClassName={tableClassName}
        columns={columns}
        loading={loading}
        data={data}
        updateData={updateData}
        skipPageReset={skipPageReset}
        options={{ ...tableOptions }}
      />
    </TableWrapper>
  )
}

export default TableComponent

// Be sure to pass our updateData and the skipPageReset option
function Table({
  columns,
  data,
  updateData,
  skipPageReset,
  loading,
  options,
  tableClassName,
}) {
  const {
    filterTypes,
    defaultColumn,
    globalFilter,
    renderHeader,
    renderFilter,
    renderTableBody,
    renderTableRow,
    renderExtraTableTd,
    renderTableCell,
    handleTableControls,
    customHook,
  } = options || {}

  let extraHook = hooks => {
    hooks.visibleColumns.push(columns => [...columns])
  }
  if (customHook) extraHook = customHook

  const hookOptions = {}

  if (filterTypes) hookOptions.filterTypes = filterTypes
  if (defaultColumn) hookOptions.defaultColumn = defaultColumn
  else hookOptions.defaultColumn = {}

  const {
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
  } = useTable(
    {
      columns,
      data,
      // use the skipPageReset option to disable page resetting temporarily
      autoResetPage: !skipPageReset,
      updateData,
      ...hookOptions,
    },
    useColumnOrder,
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    extraHook
  )

  const { pageIndex, pageSize, selectedRowIds } = state

  const spring = React.useMemo(
    () => ({
      type: 'spring',
      damping: 50,
      stiffness: 100,
    }),
    []
  )

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

  if (handleTableControls && handleTableControls.beforeTableRender) {
    return handleTableControls.beforeTableRender(controls)
  }

  // Render the UI for your table
  return (
    <React.Fragment>
      {handleTableControls &&
        handleTableControls.jsx &&
        handleTableControls.jsx(controls)}
      <table {...getTableProps()} className={tableClassName || ''}>
        <thead>
          {globalFilter?.use &&
            globalFilter?.pos === 'above' &&
            data.length > 10 && (
              <tr>
                <th
                  colSpan={visibleColumns.length}
                  style={{
                    textAlign: 'left',
                  }}
                >
                  <globalFilter.Component
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                  />
                </th>
              </tr>
            )}
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <motion.th
                  {...column.getHeaderProps({
                    layoutTransition: spring,
                    style: {},
                  })}
                >
                  <div {...column.getSortByToggleProps()}>
                    {renderHeader ? (
                      renderHeader(column)
                    ) : (
                      <React.Fragment>
                        {column.render('Header')}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? ' 🔽'
                              : ' 🔼'
                            : ''}
                        </span>
                      </React.Fragment>
                    )}
                  </div>
                  <div>
                    {column.canFilter && filterTypes
                      ? renderFilter
                        ? renderFilter(column)
                        : column.render('Filter')
                      : null}
                  </div>
                </motion.th>
              ))}
            </tr>
          ))}
          {globalFilter?.use &&
            globalFilter?.pos === 'below' &&
            data.length > 10 && (
              <tr>
                <th
                  colSpan={visibleColumns.length}
                  style={{
                    textAlign: 'left',
                  }}
                >
                  <globalFilter.Component
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                  />
                </th>
              </tr>
            )}
          {isEmpty(data) && (
            <tr>
              <th
                colSpan={visibleColumns.length}
                className=""
                style={{
                  width: '100%',
                  height: '12rem',
                  margin: '1rem 0',
                  textAlign: 'center',
                  fontWeight: 'normal',
                  textAlign: 'center',
                  border: '1px dashed darkgreen',
                }}
              >
                {loading ? (
                  <div className="spinner"></div>
                ) : (
                  <p className="">Nothing to show</p>
                )}
              </th>
            </tr>
          )}
        </thead>
        <tbody {...getTableBodyProps()}>
          <AnimatePresence>
            {renderTableRow
              ? renderTableRow(page, prepareRow)
              : page.map((row, i) => {
                  prepareRow(row)
                  return (
                    <motion.tr
                      {...row.getRowProps({
                        layoutTransition: spring,
                        exit: { opacity: 0, maxHeight: 0 },
                      })}
                    >
                      {row.cells.map((cell, i) => {
                        return (
                          <motion.td
                            {...cell.getCellProps({
                              layoutTransition: spring,
                            })}
                          >
                            {renderTableCell
                              ? renderTableCell(cell)
                              : cell.render('Cell')}
                          </motion.td>
                        )
                      })}
                    </motion.tr>
                  )
                })}
          </AnimatePresence>
          {renderExtraTableTd && renderExtraTableTd(controls)}
        </tbody>
      </table>
      <div className="mt-2 pagination">
        {data.length > 10 && (
          <React.Fragment>
            <button
              onClick={() => gotoPage(0)}
              className={`${!canPreviousPage ? 'opacity-25' : ''}`}
              disabled={!canPreviousPage}
            >
              {'<<'}
            </button>{' '}
            <button
              onClick={() => previousPage()}
              className={`${!canPreviousPage ? 'opacity-25' : ''}`}
              disabled={!canPreviousPage}
            >
              {'<'}
            </button>{' '}
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className={`${!canNextPage ? 'opacity-25' : ''}`}
            >
              {'>'}
            </button>{' '}
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              className={`${!canNextPage ? 'opacity-25' : ''}`}
            >
              {'>>'}
            </button>
          </React.Fragment>
        )}
        {data?.length > 10 && (
          <React.Fragment>
            <span className="text-sm">
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
            <span>
              | Go to page:{' '}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  gotoPage(page)
                }}
                style={{
                  width: '100px',
                }}
              />
            </span>

            <select
              value={pageSize}
              className="px-2 mx-4 text-sm"
              onChange={e => {
                setPageSize(Number(e.target.value))
              }}
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  )
}

export { useAsyncDebounce, matchSorter }

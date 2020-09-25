import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import XLSX from 'xlsx'
import { ToastContainer, toast } from 'react-toastify'
import LoadingMask from 'react-loadingmask'
import { Formik } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'
import { FiMoreHorizontal } from 'react-icons/fi'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { SiMinutemailer } from 'react-icons/si'
import { MdMore, MdDelete } from 'react-icons/md'
import { deleteUser, getUsers, inviteUser } from './api'

import Checkbox from '@components/Checkbox'
import Dropdown from '@components/Dropdown'
import TableComponent, {
  matchSorter,
  useAsyncDebounce,
} from '@components/Table'
import UploadComponent from '@components/FileUpload'

import { makeData, isEmpty } from './helpers'

const editableFields = ['firstName', 'lastName', 'email']

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue)
  const inputRef = useRef(null)

  const onChange = e => {
    setValue(e.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateData(index, id, value)
  }

  const onKeyPress = e => {
    if (e.key === 'Escape' || e.key === 'Enter') {
      inputRef.current && inputRef.current.blur()
    }
  }

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return editableFields.includes(id) ? (
    <input
      value={value}
      // id={id}
      // name={id} disabled because browser autocomplete can be annoying
      ref={inputRef}
      onChange={onChange}
      onKeyPress={onKeyPress}
      onKeyUp={onKeyPress}
      onBlur={onBlur}
      className="w-full px-2 text-center bg-transparent focus:bg-white"
    />
  ) : (
    <div className="inline-flex justify-center w-full text-center">{value}</div>
  )
}

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <span className="mr-4 text-xl">
      Search:{' '}
      <input
        value={value || ''}
        onChange={e => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        className="w-2/5 px-4 py-1 radius-input"
        placeholder={`${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  )
}

// Define a UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}
const fontSize = 24
const Icon = ({ type = 'rocket', className = '', style = {} } = {}) => (
  <i className={`fas fa-${type} ${className}`} style={style} />
)

const RocketHor = (
  <Icon
    type="rocket"
    className="animation-horizon"
    style={{ fontSize, color: '#120338' }}
  />
)

const tableWrapper = styled.form`
  table {
    border-collapse: separate;
    border-style: 1em;
    border-spacing: 1em;

    thead tr {
      :nth-child(1) {
        display: none;
      }
      background: none !important;
      border-radius: none !important;
    }

    tbody {
      tr {
        border-radius: 1rem;
        padding: 1.5rem;

        margin: 0.5rem 0;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.57), 0 2px 4px rgba(0, 0, 0, 0.05);
        transition: transform 0.5s -webkit-transform 0.5s;
        :last-child {
          border-radius: 1rem;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;

      :last-child {
        border-right: 0;
      }
    }

    .pagination {
      padding: 0.5rem;
    }
  }
`

function App() {
  const data = React.useMemo(() => makeData(20), [])
  const [pageLoading, setPageLoading] = useState(false)
  const [inlinePageLoading, setInlinePageLoading] = useState(false)

  const columns = useMemo(
    () => [
      {
        Header: 'Table',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
          {
            Header: 'Email',
            accessor: 'email',
          },
        ],
      },
      {
        Header: 'Test Info',
        columns: [
          {
            Header: 'Invite Sent',
            accessor: 'inviteSent',
          },
          {
            Header: 'Test Sent',
            accessor: 'testSent',
          },
          {
            Header: 'Test Status',
            accessor: 'testStatus',
          },
        ],
      },
    ],
    []
  )
  const spring = React.useMemo(
    () => ({
      type: 'spring',
      damping: 50,
      stiffness: 100,
    }),
    []
  )
  const filterTypes = useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const sendInvite = async (e, xdata) => {
    e.preventDefault()
    const resp = await inviteUser([xdata])
    if (resp) {
      const currentData = data.map(d => {
        if (d.email === xdata.email) d.inviteSent = 'Yes'
        return d
      })
      toast.success('User invited successfully')
      setData(currentData)
    }
  }

  const getAndSetUsers = async () => {
    setPageLoading(true)

    const dataX = await getUsers()
    const data = dataX?.data
    if (!isEmpty(data)) {
      setData(Array.from(data))
    }
    setPageLoading(false)
  }

  useEffect(() => {
    getAndSetUsers()
  }, [])

  const uploadDatabase = (file, type) => {
    setInlinePageLoading(true)
    switch (type) {
      case 'spreadsheet':
        const f = file.selectedFile[0]
        const reader = new FileReader()
        const stateData = data
        reader.onload = async function(e) {
          const data = e.target.result
          const readedData = XLSX.read(data, { type: 'binary' })
          const wsname = readedData.SheetNames[0]
          const ws = readedData.Sheets[wsname]

          const dataParse = XLSX.utils.sheet_to_json(ws, { raw: true })

          const fieldNames = [
            'Serial No',
            'firstName',
            'lastName',
            'email',
            'inviteSent',
            'testSent',
            'testStatus',
            'subRows',
          ]
          const newDataSet = dataParse.map(d => {
            const pos = Object.keys(d)
            fieldNames.forEach((name, i) => {
              if (name !== 'Serial No') {
                d[name] = d[name] || d[pos[i]] || ''
                d[name] = String(d[name])
              }
              if (name === 'subRows') d[name] = undefined
            })
            return d
          })

          let update = newDataSet

          const resp = await inviteUser(newDataSet)
          if (resp) {
            toast.success('Upload successful')
            update = Array.from(new Set(newDataSet.concat(stateData)))
          }
          setData(update)
          setInlinePageLoading(false)
        }
        reader.readAsBinaryString(f)
        break

      default:
        break
    }
    setInlinePageLoading(false)
  }

  const deleteRecord = async row => {
    setInlinePageLoading(true)
    const { data: update } = await deleteUser(row.original)
    toast.success('Deleted Successfully')
    setData(update)
    setInlinePageLoading(false)
  }

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our Filter UI
      Filter: DefaultColumnFilter,
      Cell: EditableCell,
    }),
    []
  )

  const renderTableHooks = hooks => {
    hooks.visibleColumns.push(columns => [
      // Let's make a column for selection
      {
        id: 'selection',
        // The header can use the table's getToggleAllRowsSelectedProps method
        // to render a checkbox
        Header: ({ getToggleAllPageRowsSelectedProps }) => (
          <div>
            <Checkbox {...getToggleAllPageRowsSelectedProps()} />
          </div>
        ),
        // The cell can use the individual row's getToggleRowSelectedProps method
        // to the render a checkbox
        Cell: ({ row }) => (
          <div>
            <Checkbox {...row.getToggleRowSelectedProps()} />
          </div>
        ),
      },
      ...columns,
      {
        id: 'deletion',
        // The header can use the table's getToggleAllRowsSelectedProps method
        // to render a checkbox
        Header: ({ getToggleAllPageRowsSelectedProps }) => <div></div>,
        // The cell can use the individual row's getToggleRowSelectedProps method
        // to the render a checkbox
        Cell: ({ row }) => (
          <div
            {...row.getToggleRowSelectedProps()}
            onClick={() => deleteRecord(row)}
            className="group"
          >
            <MdDelete
              {...row.getToggleRowSelectedProps()}
              className="opacity-50 group-hover:opacity-100 group-hover:hover:text-red-600"
            />
          </div>
        ),
      },
    ])
  }

  const renderTableHeader = column => {
    const header = column.render('Header')
    return <React.Fragment>{header}</React.Fragment>
  }

  const renderTableRow = (page, prepareRow) => {
    const renderTableCell = cell => {
      if (cell.column.id === 'inviteSent') {
        if (cell.row?.values?.inviteSent?.toLowerCase() === 'no') {
          return (
            <div className="z-50 inline-flex items-center justify-center w-full h-full align-middle group">
              <span className="text-red-600">{cell.render('Cell')}</span>
              <span className="align-middle group-focus:flex group-hover:flex align-center">
                <Dropdown
                  className="z-20 hidden ml-4 group-hover:flex"
                  buttonLabel={
                    <FiMoreHorizontal className="flex self-center opacity-50" />
                  }
                >
                  <ul className="w-40 py-2 space-y-4 text-sm">
                    <li>
                      <span
                        className="cursor-pointer text-primary hover:underline"
                        title="components"
                        onClick={e => {
                          e.stopPropagation()
                          sendInvite(e, cell.row.values)
                        }}
                      >
                        <SiMinutemailer className="inline ml-6 mr-4" />
                        Send Invite
                      </span>
                    </li>
                    <li>
                      <hr className="dark:border-gray-700" />
                    </li>
                    <li className="cursor-not-allowed">
                      <span
                        className="text-primary hover:underline"
                        title="Typography"
                      >
                        <MdMore className="inline ml-6 mr-4 " />
                        More Options
                      </span>
                    </li>
                  </ul>
                </Dropdown>
              </span>
            </div>
          )
        } else {
          return (
            <div className="inline-flex items-center justify-center w-full align-middle group">
              <span className="text-green-600">{cell.render('Cell')}</span>
            </div>
          )
        }
      }
      if (cell.column.id === 'testSent') {
        if (cell.row.values?.testSent?.toLowerCase() === 'no') {
          return (
            <div className="inline-flex items-center justify-center w-full text-red-600">
              {cell.render('Cell')}
            </div>
          )
        } else {
          return (
            <div className="inline-flex items-center justify-center w-full text-green-600">
              {cell.render('Cell')}
            </div>
          )
        }
      }
      if (cell.column.id === 'testStatus') {
        if (cell.row?.values?.testStatus?.toLowerCase() === 'pending') {
          return (
            <div className="inline-flex items-center justify-center w-full text-yellow-700">
              {cell.render('Cell')}
            </div>
          )
        } else {
          return (
            <div className="inline-flex items-center justify-center w-full text-green-600">
              {cell.render('Cell')}
            </div>
          )
        }
      }
      return (
        <div className="inline-flex items-center justify-center w-full ">
          {cell.render('Cell')}
        </div>
      )
    }
    return (
      <React.Fragment>
        {page.map((row, i1) => {
          prepareRow(row)
          return (
            <motion.tr
              {...row.getRowProps({
                layoutTransition: spring,
                exit: { opacity: 0, maxHeight: 0 },
              })}
              className={`${i1 % 2 ? '' : ''} text-center h-16`}
            >
              {row.cells.map((cell, i) => {
                return (
                  <motion.td
                    {...cell.getCellProps({
                      layoutTransition: spring,
                    })}
                    className="text-center"
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
      </React.Fragment>
    )
  }

  const renderExtraTableTd = (controls, formikProps) => {
    const { visibleColumns } = controls
    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      isSubmitting,
    } = formikProps
    return (
      <tr role="row" className="h-16 elevation-3">
        <td role="cell" className="text-center">
          &nbsp;
        </td>
        <td role="cell" className="text-right">
          <div className="flex flex-col items-start">
            <input
              value={values.fName}
              name="fName"
              id="fName"
              placeholder={'First Name'}
              className="h-8 px-2 radius-input hover:border-primary"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <span>
              {errors.fName && touched.fName && (
                <p className="text-xs text-left text-red-600">{errors.fName}</p>
              )}
            </span>
          </div>
        </td>
        <td role="cell" className="text-right">
          <div className="flex flex-col items-start">
            <input
              value={values.lName}
              name="lName"
              id="lName"
              placeholder={'Last Name'}
              className="h-8 px-2 radius-input hover:border-primary"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span>
              {errors.lName && touched.lName && (
                <p className="text-xs text-left text-red-600">{errors.lName}</p>
              )}
            </span>
          </div>
        </td>
        <td role="cell" className="text-right" placeholder={'Last Name'}>
          <div className="flex flex-col items-start">
            <input
              value={values.email}
              id="email"
              name="email"
              placeholder={'Email'}
              className="h-8 px-2 radius-input hover:border-primary"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span>
              {errors.email && touched.email && (
                <p className="text-xs text-left text-red-600">{errors.email}</p>
              )}
            </span>
          </div>
        </td>
        <td
          role="cell"
          className="w-full text-right"
          colSpan={visibleColumns.length - 4}
        >
          <button type="primary" htmlFor="submit" disabled={isSubmitting}>
            Add new
          </button>
        </td>
      </tr>
    )
  }

  const handleBatchActions = controls => {
    const { state: tableState, selectedFlatRows } = controls
    const { selectedRowIds } = tableState
    const selectedLen = Object.keys(selectedRowIds || {}).length

    const selectedMembers = selectedFlatRows.map(d => d.original)
    const uninvitedMembers = selectedMembers.filter(
      d => d['inviteSent']?.toLowerCase() === 'no'
    )
    const uninvitedLen = uninvitedMembers.length

    return (
      <div
        className={`flex ${
          selectedLen ? 'justify-between' : 'justify-end'
        } w-full mb-2`}
      >
        {selectedLen > 0 && (
          <React.Fragment>
            <p>You have selected {selectedLen} members</p>
            {uninvitedLen > 0 && (
              <div>
                <button
                  onClick={e => {
                    e.stopPropagation()
                    sendInvite(e, uninvitedMembers)
                  }}
                >
                  Send Invitation to {uninvitedLen} members
                </button>
              </div>
            )}
          </React.Fragment>
        )}
        {!selectedLen && (
          <React.Fragment>
            <UploadComponent
              allowedExtensions={[
                'xls',
                'xlsx',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              ]}
              // autoUpload={true}
              render={el => {
                return (
                  <span
                    className="flex justify-end w-full px-4 py-2 border cursor-pointer hover:text-primary-lighter hover:border-primary-darker text-primary"
                    onClick={e => {
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
                uploadDatabase(state, 'spreadsheet')
              }}
            />
          </React.Fragment>
        )}
      </div>
    )
  }

  const handleFormSubmit = async (data, cb) => {
    setInlinePageLoading(true)
    const payload = {}
    payload.firstName = data.fName
    payload.lastName = data.lName
    payload.email = data.email
    payload.inviteSent = 'No'
    payload.testSent = 'No'
    payload.testStatus = 'NA'

    const resp = await inviteUser([payload])
    if (resp) {
      cb.resetForm()
      toast.success('New data added')
      setData(resp.data)
    }
    setInlinePageLoading(false)
  }

  return (
    <LoadingMask
      loading={inlinePageLoading}
      text={'loading...'}
      indicator={RocketHor}
    >
      <div style={{ width: '100vw', height: '100vh' }}>
        <ToastContainer />

        <h3 className="mb-2 text-lg font-bolder">Demo Table and File Upload</h3>
        <p className="p-2 text-xs text-blue-600">
          You can upload a spreadsheet (.xls, .xlsx), and use the checkbox to
          send invite to multiple selections at a go or You can send individual
          invite by toggling the inviteSent on hover.
        </p>
        <em className="p-2 text-xs text-green-600 ">
          (Excel columns must include firstName, lastName, age and so on in that
          format)
        </em>
        <p className="p-2 text-xs text-blue-600">
          You can edit a row inline by clicking on the data or add a new record.
        </p>
        <span className="p-2 text-xs text-red-700">
          Not mobile responsive yet{' '}
          <span role="img" aria-label="sad">
            😥
          </span>
        </span>

        <div>
          <Formik
            initialValues={{ fName: '', lName: '', email: '' }}
            onSubmit={handleFormSubmit}
            validateOnBlur={false}
            validateOnMount={false}
            validationSchema={Yup.object({
              fName: Yup.string()
                .min(3, 'Must contain 3 characters or more')
                .required('First Name is required'),
              lName: Yup.string()
                .min(3, 'Must contain 3 characters or more')
                .required('Last Name is required'),
              email: Yup.string()
                .email('Invalid email address')
                .required('Please provide the email'),
            })}
          >
            {formikProps => (
              <TableComponent
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
                renderExtraTableTd={controls =>
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
            )}
          </Formik>
        </div>
      </div>
    </LoadingMask>
  )
}

export default App

import * as React from 'react'
import clsx from 'clsx'

const Dropdown = ({ className, buttonLabel, children }) => {
  const node = React.useRef()
  const [showDropdown, setShowDropdown] = React.useState(false)

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  const handleClickOutside = e => {
    if (node?.current?.contains(e.target)) {
      return
    }
    setShowDropdown(false)
  }

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={node} className={clsx('relative inline-block', className)}>
      <button
        className={clsx('p-2 rounded-full', {
          'hover:bg-primary hover:bg-opacity-25': !showDropdown,
          'bg-primary text-white': showDropdown,
        })}
        onClick={toggleDropdown}
      >
        {buttonLabel}
      </button>
      {showDropdown && (
        <div className="absolute right-0 p-2 mt-1 space-y-2 bg-white border rounded shadow-md dark:bg-gray-800 dark:border-gray-700">
          {children}
        </div>
      )}
    </div>
  )
}

export default Dropdown

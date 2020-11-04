import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const Popdown = ({
  className,
  addButtonClass = '',
  overrideButtonClass,
  childrenClass,
  labelRender,
  show,
  autoClose = true,
  autoAdjust,
  children,
}) => {
  const node = useRef()
  const popRef = useRef()
  const parentNode = useRef()
  const [showDropdown, setShowDropdown] = useState(!!show)

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  const handleClickOutside = e => {
    if (autoClose) {
      if (parentNode?.current?.contains(e.target)) {
        return
      }
      setShowDropdown(false)
    }
  }

  useEffect(() => {
    const clearOnEscape = ({ key }) => {
      if (key === 'Escape') setShowDropdown(false)
    }

    const unmountOtherInstance = e => {
      setShowDropdown(false)
    }

    document.addEventListener('keydown', clearOnEscape)
    const allMount = document.querySelectorAll('[data-id="popover-toggler"]')
    allMount &&
      allMount.forEach(mount => {
        node.current !== mount &&
          mount.addEventListener('click', unmountOtherInstance)
      })

    return () => {
      document.removeEventListener('keydown', clearOnEscape)
      allMount &&
        allMount.forEach(
          mount =>
            node.current !== mount &&
            mount.removeEventListener('click', unmountOtherInstance)
        )
    }
  }, [])

  useEffect(() => {
    if (autoAdjust?.use && showDropdown) {
      const { container } = autoAdjust
      const $container = container?.current
      if ($container) {
        fixFlyout($, 'html', '[data-id="popover-toggler"]', '#popdown-item')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDropdown])

  function fixFlyout(selector, containerElement, parentElement, flyoutElement) {
    const $ = selector
    var element = $(flyoutElement, this)
    var offset = element.offset()
    ;['top', 'down', 'right', 'left'].forEach(pos => {
      if (pos === 'top' || pos === 'down') {
        var top = offset['top']
        var height = element.height()
        var windowHeight = $(containerElement).height()
        var isEntirelyVisible = height === 0 || top > 0

        if (pos === 'down') {
          isEntirelyVisible = height === 0 || top + height <= windowHeight
        }
        if (!isEntirelyVisible) {
          $(element).addClass(`${pos}-edge`)
        } else {
          $(element).removeClass(`${pos}-edge`)
        }
      } else {
        var left = offset['left']
        var width = element.width()
        var windowWidth = $(containerElement).width()
        var isEntirelyVisible = width === 0 || left > 0
        if (pos === 'left') {
          var isEntirelyVisible = width === 0 || left + width <= windowWidth
        }
        if (!isEntirelyVisible) {
          $(element).addClass(`${pos}-edge`)
        } else {
          $(element).removeClass(`${pos}-edge`)
        }
      }
    })
  }

  return (
    <StyledPopdown
      ref={parentNode}
      className={className || 'relative inline-block'}
    >
      <div
        data-id="popover-toggler"
        ref={node}
        className={
          overrideButtonClass
            ? overrideButtonClass(showDropdown)
            : `${addButtonClass} p-2 rounded-full cursor-pointer ${
                !showDropdown
                  ? 'hover:bg-primary hover:bg-opacity-25'
                  : 'bg-primary text-white'
              }`
        }
        onClick={toggleDropdown}
      >
        {typeof labelRender === 'function'
          ? labelRender(toggleDropdown)
          : labelRender}
      </div>
      {showDropdown && (
        <div
          id="popdown-item"
          ref={popRef}
          className={
            childrenClass
              ? childrenClass
              : `absolute z-50 p-2 mt-1 space-y-2 bg-white border rounded shadow-md top-10 right-4`
          }
        >
          {children}
        </div>
      )}
    </StyledPopdown>
  )
}

export default Popdown

var StyledPopdown = styled.div`
  #popdown-item {
    z-index: 1000 !important;
  }
  #popdown-item.left-edge {
    right: 1rem;
    min-width: fit-content !important;
  }
  #popdown-item.right-edge {
    left: 1rem;
    min-width: fit-content !important;
  }
  #popdown-item.top-edge {
    bottom: 1rem;
    min-width: fit-content !important;
  }
  #popdown-item.down-edge {
    top: 1rem;
    min-width: fit-content !important;
  }
`

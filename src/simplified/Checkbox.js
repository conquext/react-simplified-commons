import * as React from 'react'

const Checkbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef()
  const resolvedRef = ref || defaultRef

  React.useEffect(() => {
    if (resolvedRef && resolvedRef.current)
      resolvedRef.current.indeterminate = indeterminate
  }, [resolvedRef, indeterminate])

  return (
    <React.Fragment>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </React.Fragment>
  )
})

export default Checkbox

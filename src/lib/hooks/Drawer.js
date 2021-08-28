import React, { forwardRef } from 'react'
const Drawer = forwardRef((props, ref) => {
  return <div ref={ref}>{props.children}</div>
})
export default Drawer

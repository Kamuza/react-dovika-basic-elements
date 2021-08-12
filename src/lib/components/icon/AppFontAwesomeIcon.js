import React from 'react'

const AppFontAwesomeIcon = (props) => {
  const { icon, variant, size, color, className, ...others } = props
  return (
    <i
      className={`${className} fa${variant} fa-${icon}`}
      style={{ fontSize: size ? `${size}px` : 'inherit', color }}
      {...others}
    />
  )
}
export default AppFontAwesomeIcon
AppFontAwesomeIcon.defaultProps = {
  icon: 'square',
  variant: 's'
}

import React from 'react'

const AppFontAwesomeIcon = (props) => {
  const { icon, variant, size, color } = props
  return (
    <i
      className={`fa${variant} fa-${icon}`}
      style={{ fontSize: `${size}px`, color }}
    />
  )
}
export default AppFontAwesomeIcon
AppFontAwesomeIcon.defaultProps = {
  icon: 'square',
  variant: 's',
  size: 12
}
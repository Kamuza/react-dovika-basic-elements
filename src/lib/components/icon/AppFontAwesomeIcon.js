import React from 'react'

export default function AppFontAwesomeIcon(props) {
  const {
    icon = 'square',
    variant = 's',
    size,
    color,
    className = '',
    ...others
  } = props
  return (
    <i
      className={`${className} fa${variant} fa-${icon}`}
      style={{ fontSize: size ? `${size}px` : 'inherit', color }}
      {...others}
    />
  )
}

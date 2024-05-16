import React from 'react'

export default function AppRemixIcon(props) {
  const {
    icon = 'checkbox-blank',
    size,
    color,
    filled = false,
    noVariants = false,
    className = '',
    ...others
  } = props
  return (
    <i
      className={`${className} ri-${icon}${
        noVariants ? '' : `-${filled ? 'fill' : 'line'}`
      }`}
      style={{ fontSize: size ? `${size}px` : 'inherit', color }}
      {...others}
    />
  )
}

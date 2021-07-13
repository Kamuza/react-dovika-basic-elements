import React from 'react'

const AppRemixIcon = (props) => {
  const { icon, size, color, filled, noVariants } = props

  return (
    <i
      className={`ri-${icon}${
        noVariants ? '' : `-${filled ? 'fill' : 'line'}`
      }`}
      style={{ fontSize: `${size}px`, color }}
    />
  )
}
export default AppRemixIcon
AppRemixIcon.defaultProps = {
  icon: 'checkbox-blank',
  size: 12,
  filled: false,
  noVariants: false
}

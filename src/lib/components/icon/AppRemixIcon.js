import React from 'react'

const AppRemixIcon = (props) => {
  const { icon, size, color, filled, noVariants, className, ...others } = props
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
export default AppRemixIcon
AppRemixIcon.defaultProps = {
  icon: 'checkbox-blank',
  filled: false,
  noVariants: false,
  className: ''
}

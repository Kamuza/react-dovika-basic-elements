import React from 'react'

export default function AppCard(props) {
  const {
    header = null,
    children,
    footer = null,
    className,
    bodyClassName = '',
    headerClassName = '',
    footerClassName = '',
    ...others
  } = props
  return (
    <div className={`card ${className}`} {...others}>
      {header && (
        <div className={`card-header ${headerClassName}`}>{header}</div>
      )}
      {children && (
        <div className={`card-body ${bodyClassName}`}>{children}</div>
      )}
      {footer && (
        <div className={`card-footer ${footerClassName}`}>{footer}</div>
      )}
    </div>
  )
}

import React from 'react'

const AppCard = (props) => {
  const {
    header,
    children,
    footer,
    className,
    bodyClassName,
    headerClassName,
    footerClassName
  } = props
  return (
    <div className={`card ${className}`}>
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

export default AppCard
AppCard.defaultProps = {
  header: null,
  footer: null,
  className: '',
  bodyClassName: '',
  headerClassName: '',
  footerClassName: ''
}

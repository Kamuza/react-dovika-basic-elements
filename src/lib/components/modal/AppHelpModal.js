import React, { useState } from 'react'
import AppModal from './AppModal'
import AppFontAwesomeIcon from '../icon/AppFontAwesomeIcon'
import defaultColors from '../../constants/defaultColors'

const colors = window.dovikaBasicElementsColors || defaultColors

const AppHelpModal = (props) => {
  const {
    children,
    size,
    iconClassName,
    title,
    customSelector,
    confirmBtnText,
    ...others
  } = props
  const [show, setShow] = useState(false)

  return (
    <>
      <AppModal
        show={show}
        isConfirmBtn
        isCancelBtn={false}
        title={title}
        size={size}
        confirmBtnText={confirmBtnText}
        onClose={() => setShow(false)}
        onConfirm={() => setShow(false)}
        {...others}
      >
        {children}
      </AppModal>
      {!customSelector ? (
        <AppFontAwesomeIcon
          icon='question-circle'
          onClick={() => setShow(true)}
          color={colors.primary}
          className={`pointer ${iconClassName}`}
        />
      ) : (
        <div style={{ display: 'inline-block' }} onClick={() => setShow(true)}>
          {customSelector}
        </div>
      )}
    </>
  )
}

export default AppHelpModal

AppHelpModal.defaultProps = {
  size: 'md',
  className: '',
  title: 'Ayuda',
  confirmBtnText: 'Entendido'
}

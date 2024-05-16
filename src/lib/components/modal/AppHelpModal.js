import React, { useState } from 'react'
import AppModal from './AppModal'
import AppFontAwesomeIcon from '../icon/AppFontAwesomeIcon'
import defaultColors from '../../constants/defaultColors'

const colors = window.dovikaBasicElementsColors || defaultColors

export default function AppHelpModal(props) {
  const {
    children,
    size = 'md',
    iconClassName,
    title = 'Ayuda',
    customSelector,
    confirmBtnText = 'Entendido',
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

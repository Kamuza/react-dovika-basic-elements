import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import defaultColors from '../../constants/defaultColors'
import { AppRemixIcon } from '../../index'
const colors = window.dovikaBasicElementsColors || defaultColors

export default function AppModal(props) {
  const {
    trigger = null,
    show,
    type,
    size = 'md',
    title,
    children,
    isConfirmBtn,
    isCancelBtn,
    confirmBtnText,
    cancelBtnText,
    onClose = () => {},
    onConfirm,
    isConfirmDisabled = false,
    isCloseButton = true,
    ...others
  } = props
  const [showModal, setShowModal] = useState()
  const handleClose = () => {
    onClose(false)
    setShowModal(false)
  }
  const handleConfirm = () => {
    onConfirm()
    setShowModal(false)
  }

  const iconType = () => {
    switch (type) {
      case 'danger':
        return <AppRemixIcon icon='alert' color='red' className='mr-2' />
      case 'info':
        return <AppRemixIcon icon='alert' color='blue' className='mr-2' />
      default:
        return ''
    }
  }
  const ClickableComponent = (props) =>
    React.cloneElement(props.trigger, {
      onClick: () => setShowModal(true)
    })

  return (
    <>
      {trigger && <ClickableComponent trigger={trigger} />}
      <Modal
        show={trigger ? showModal : show}
        onHide={handleClose}
        size={size}
        {...others}
      >
        {(title || isCloseButton) && (
          <Modal.Header closeButton={isCloseButton}>
            <Modal.Title
              style={{
                color: colors.primary,
                fontSize: '16px',
                margin: '4px 0'
              }}
            >
              {iconType()}
              {title}
            </Modal.Title>
          </Modal.Header>
        )}
        <Modal.Body>{children}</Modal.Body>
        {(isCancelBtn || isConfirmBtn) && (
          <Modal.Footer>
            {isCancelBtn && (
              <Button variant='default' onClick={handleClose}>
                {cancelBtnText || 'Cancelar'}
              </Button>
            )}
            {isConfirmBtn && (
              <Button
                variant={type}
                onClick={handleConfirm}
                disabled={isConfirmDisabled}
              >
                {confirmBtnText || 'Confirmar'}
              </Button>
            )}
          </Modal.Footer>
        )}
      </Modal>
    </>
  )
}

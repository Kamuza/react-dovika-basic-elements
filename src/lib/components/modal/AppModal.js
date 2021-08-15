import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import defaultColors from '../../constants/defaultColors'
import { AppRemixIcon } from '../../index'
const colors = window.dovikaBasicElementsColors || defaultColors

const AppModal = (props) => {
  const {
    show,
    type,
    size,
    title,
    children,
    isConfirmBtn,
    isCancelBtn,
    confirmBtnText,
    cancelBtnText,
    onClose,
    onConfirm,
    isConfirmDisabled,
    isCloseButton,
    ...others
  } = props
  const handleClose = () => onClose(false)
  const handleConfirm = () => onConfirm()

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

  return (
    <>
      <Modal show={show} onHide={handleClose} size={size} {...others}>
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

export default AppModal

AppModal.defaultProps = {
  size: 'md',
  isConfirmDisabled: false,
  isCloseButton: true,
  onClose: () => {}
}

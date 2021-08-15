import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import AppRemixIcon from '../icon/AppRemixIcon'
import defaultColors from '../../constants/defaultColors'

const colors = window.dovikaBasicElementsColors || defaultColors

const AppDeleteModal = (props) => {
  const {
    show,
    size,
    title,
    text,
    onClose,
    onConfirm,
    sensitive,
    sensitiveWord
  } = props
  const handleClose = () => onClose(false)
  const handleConfirm = () => onConfirm()
  const [removeButtonDisabled, setRemoveButtonDisabled] = useState(sensitive)

  const handleSensitiveCase = (value) => {
    if (value === sensitiveWord) setRemoveButtonDisabled(false)
    else setRemoveButtonDisabled(true)
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} size={size}>
        <Modal.Header closeButton>
          <Modal.Title>
            <AppRemixIcon
              icon='delete-bin'
              color={colors.danger}
              className='mr-2'
            />
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            {text}
            <br />
            <br />
            {sensitive && (
              <>
                <p>
                  Por seguridad, para eliminar este elemento, debe escribir{' '}
                  <b>'{sensitiveWord}'</b> en el siguiente campo.
                </p>
                <div className='row'>
                  <div className='col-sm-12'>
                    <input
                      onChange={(e) => handleSensitiveCase(e.target.value)}
                      className='form-control mb-2'
                    />
                  </div>
                </div>
              </>
            )}
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='default' onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant='danger'
            onClick={handleConfirm}
            disabled={removeButtonDisabled}
          >
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AppDeleteModal

AppDeleteModal.defaultProps = {
  size: 'md',
  title: 'Confirmar eliminar',
  text: '¿Seguro que desea eliminar el elemento seleccionado?',
  sensitive: false,
  sensitiveWord: 'delete me'
}

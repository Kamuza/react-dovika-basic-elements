import React, { useState } from 'react'
import { AppInput, AppRemixIcon, AppSelect } from './lib'
import ReactNotification from 'react-notifications-component'
import styled from 'styled-components'
import AppTextArea from './lib/components/form/AppTextArea'
import './scss/App.scss'
import AppCard from './lib/components/layout/AppCard'
import AppInputNumber from './lib/components/form/AppInputNumber'
import AppDatePicker from './lib/components/form/AppDatePicker'
import AppFileUploader from './lib/components/form/AppFileUploader'
import AppModal from './lib/components/modal/AppModal'
import AppNotificationAlert from './lib/components/info/AppNotificationAlert'
import AppImageCropper from './lib/components/form/AppImageCropper'
import AppNoInfo from './lib/components/info/AppNoInfo'
import AppDeleteModal from './lib/components/modal/AppDeleteModal'

const App = () => {
  const [showAppModal, setShowAppModal] = useState(false)
  const [showAppDeleteModal, setShowAppDeleteModal] = useState(false)
  const [image, setImage] = useState(null)

  const handleOpenNotification = () =>
    AppNotificationAlert({
      title: 'AppNotificationAlert',
      message: 'Ejemplo de notificación',
      type: 'danger',
      duration: 5000
    })

  return (
    <Container>
      <ReactNotification />
      <div className='row m-5'>
        <div className='col-lg-12'>
          <AppCard header='Ejemplo de componentes'>
            <AppInput
              title='AppInput1'
              icon={<AppRemixIcon icon='checkbox-blank' />}
              onChange={(v) => console.log(v)}
              value='aa'
              isClearable
              tabIndex={2}
            />
            <AppInput
              title='AppInput2'
              icon={<AppRemixIcon icon='checkbox-blank' />}
              onChange={(v) => console.log(v)}
              value='aa'
              isClearable
              tabIndex={1}
            />
            <AppTextArea
              title='AppTextArea'
              icon={<AppRemixIcon icon='checkbox-blank' />}
              onChange={(v) => console.log(v)}
              value='aa'
              isClearable
            />
            <AppSelect
              title='AppSelect'
              icon={<AppRemixIcon icon='checkbox-blank' />}
              options={[
                { label: 'Hola', isOptGroup: true },
                { label: 'Hijo', value: 1, group: 'Hola' },
                { label: 'Hijo2', value: 12, group: 'Hola' }
              ]}
              // isMulti
              hasSearchBox
              hasSelectOptions
              onChange={(v) => console.log('ALGO', v)}
              value={{ label: 'Hola', isOptGroup: true }}
              isClearable
            />
            <AppInputNumber
              title='AppInputNumber'
              icon={<AppRemixIcon icon='checkbox-blank' />}
              onChange={(v) => console.log(v)}
              value='1'
              isClearable
            />
            <AppDatePicker
              title='AppDatePicker'
              onChange={(v) => console.log(v)}
            />
            <AppFileUploader
              title='AppDatePicker'
              onChange={(v) => console.log(v)}
              isMulti
            />
            <AppImageCropper
              cropShape='rect'
              image={image}
              width={200}
              height={200}
              onSave={(v) => {
                AppNotificationAlert({
                  title: 'Imagen guardada',
                  message:
                    v === null
                      ? 'Se elimina la imagen y devuelve null'
                      : 'Se devuelve blob de imagen a función personalizada',
                  type: 'success',
                  duration: 5000
                })
                setImage(v)
              }}
            />
            <span
              className='btn btn-primary'
              onClick={() => setShowAppModal(true)}
            >
              Abrir AppModal
            </span>
            <span
              className='btn btn-danger'
              onClick={() => setShowAppDeleteModal(true)}
            >
              Abrir AppDeleteModal
            </span>
            <span
              className='btn btn-primary'
              onClick={() => handleOpenNotification()}
            >
              Mostrar notificacion
            </span>
            <AppModal
              show={showAppModal}
              isConfirmBtn
              confirmBtnText='Aceptar'
              title='AppModal'
              onConfirm={() => setShowAppModal(false)}
              onClose={() => setShowAppModal(false)}
            >
              Hola!
            </AppModal>
            <AppNoInfo text='Cargando...' />
            <AppDeleteModal
              show={showAppDeleteModal}
              onClose={() => setShowAppDeleteModal(false)}
              onConfirm={() => {
                setShowAppDeleteModal(false)
                AppNotificationAlert({
                  title: 'Eliminado',
                  message: 'Contenido eliminado ',
                  type: 'success',
                  duration: 5000
                })
              }}
              sensitive
              sensitiveWord='palabra mágica'
            />
          </AppCard>
        </div>
      </div>
    </Container>
  )
}

export default App

const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, Liberation Sans, sans-serif,
    Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
`

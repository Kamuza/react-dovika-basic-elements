import React, { useState } from 'react'
import { AppInput, AppSelect } from './lib'
import { RiCheckLine } from 'react-icons/all'
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

const App = () => {
  const [showAppModal, setShowAppModal] = useState(false)

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
              title='AppInput'
              icon={<RiCheckLine />}
              onChange={(v) => console.log(v)}
            />
            <AppTextArea
              title='AppTextArea'
              icon={<RiCheckLine />}
              onChange={(v) => console.log(v)}
            />
            <AppSelect
              title='AppSelect'
              icon={<RiCheckLine />}
              options={[
                { label: 'Hola', isOptGroup: true },
                { label: 'Hijo', value: 1, group: 'Hola' }
              ]}
              isMulti
              hasSearchBox
              hasSelectOptions
              onChange={(v) => console.log(v)}
            />
            <AppInputNumber
              title='AppInputNumber'
              icon={<RiCheckLine />}
              onChange={(v) => console.log(v)}
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
            <span
              className='btn btn-primary'
              onClick={() => setShowAppModal(true)}
            >
              Abrir AppModal
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

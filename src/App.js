import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { AppRemixIcon } from './lib'
import ReactNotification from 'react-notifications-component'
import styled from 'styled-components'
import defaultTranslations from './lib/constants/defaultTranslations'
import AppTextArea from './lib/components/form/AppTextArea'
import './css/App.css'
import AppCard from './lib/components/layout/AppCard'
import AppInput from './lib/components/form/AppInput'
import AppInputNumber from './lib/components/form/AppInputNumber'
import AppDatePicker from './lib/components/form/AppDatePicker'
import AppFileUploader from './lib/components/form/AppFileUploader'
import AppModal from './lib/components/modal/AppModal'
import AppNotificationAlert from './lib/components/info/AppNotificationAlert'
import AppImageCropper from './lib/components/form/AppImageCropper'
import AppNoInfo from './lib/components/info/AppNoInfo'
import AppDeleteModal from './lib/components/modal/AppDeleteModal'
import AppSingleSelect from './lib/components/form/AppSingleSelect'
import AppMultiSelect from './lib/components/form/AppMultiSelect'
import AppCheckbox from './lib/components/form/AppCheckbox'
import AppSingleAsync from './lib/components/form/AppSingleAsync'
import AppMultiAsync from './lib/components/form/AppMultiAsync'

const App = () => {
  const [showAppModal, setShowAppModal] = useState(false)
  const [showAppDeleteModal, setShowAppDeleteModal] = useState(false)
  const [image, setImage] = useState(null)
  const [val, setVal] = useState(1)
  const [valMulti, setValMulti] = useState([])
  const [date, setDate] = useState('')
  const [check, setCheck] = useState(false)
  const [fileValue, setFileValue] = useState()
  const [inputNumber, setInputNumber] = useState('')
  const [asyncOptions, setAsyncOptions] = useState()
  const [asyncSingleVal, setAsyncSingleVal] = useState({
    label: 'Opt1',
    value: 1
  })
  const [asyncMultiVal, setAsyncMultiVal] = useState([
    { label: 'Opt1', value: 1, group: 'Grupo' }
  ])

  const handleOpenNotification = () =>
    AppNotificationAlert({
      title: 'AppNotificationAlert',
      message: 'Ejemplo de notificación',
      type: 'danger',
      duration: 5000
    })

  const handleAddOptions = async () => {
    setAsyncOptions([
      { label: 'Grupo', isOptGroup: true },
      { label: 'Opt1', value: 1, group: 'Grupo' },
      { label: 'Opt2', value: 2, group: 'Grupo' },
      { label: 'Opt3', value: 3, group: 'Grupo' }
    ])
  }

  useEffect(() => {
    handleAddOptions()
  }, [])

  // > LOAD ASYNC VALUES
  const loadAsyncOptions = useCallback(async (input) => {
    const options = await [
      { label: 'Grupo', isOptGroup: true },
      {
        label: 'Opt2',
        value: 2,
        group: 'Grupo',
        tag: '#003942',
        bgColor: '#00a0b9'
      },
      { label: 'Opt3', value: 3, group: 'Grupo' },
      { label: 'Grupo 2', isOptGroup: true },
      {
        label: 'Opt4',
        value: 4,
        group: 'Grupo 2',
        tag: '#FF077B',
        bgColor: '#FF99C8'
      },
      { label: 'Opt5', value: 5, group: 'Grupo 2' },
      { label: 'Opt6', value: 6, group: 'Grupo 2' }
    ]
    // const options = await axios
    //   .post('http://ip.jsontest.com/', { input })
    //   .then((r) => {
    //     // return r.data
    //     return [
    //       { label: 'Grupo', isOptGroup: true },
    //       {
    //         label: 'Opt2',
    //         value: 2,
    //         group: 'Grupo',
    //         tag: '#003942',
    //         bgColor: '#00a0b9'
    //       },
    //       { label: 'Opt3', value: 3, group: 'Grupo' },
    //       { label: 'Grupo 2', isOptGroup: true },
    //       {
    //         label: 'Opt4',
    //         value: 4,
    //         group: 'Grupo 2',
    //         tag: '#FF077B',
    //         bgColor: '#FF99C8'
    //       },
    //       { label: 'Opt5', value: 5, group: 'Grupo 2' },
    //       { label: 'Opt6', value: 6, group: 'Grupo 2' }
    //     ]
    //   })
    //   .catch(() => [])
    return options
  }, [])
  // > LOAD ASYNC VALUES

  return (
    <Container>
      <ReactNotification />
      <div className='row m-5'>
        <div className='col-lg-12'>
          <AppCard header='Ejemplo de componentes'>
            <AppModal
              title='Hola!'
              trigger={<span className='btn btn-info'>Abrir</span>}
            >
              Hola este lleva trigger
            </AppModal>
            <AppInput
              title='AppInput1'
              icon={<AppRemixIcon icon='checkbox-blank' />}
              onChange={(v) => console.log(v)}
              value=''
              isClearable
              tabIndex={2}
              error='Esto es un error largo para ver como sale'
              required
            />
            <AppInput
              title='AppInput2 con nombre larguito para cortarlo  y cortar tb el contenido'
              onChange={(v) => setVal(v)}
              value={val}
              isClearable
              tabIndex={1}
              isReadOnly
            />
            <AppTextArea
              title='AppTextArea'
              icon={<AppRemixIcon icon='checkbox-blank' />}
              //   error='Un error con texto'
              placeholder='hola'
              required
              onChange={(v) => console.log(v)}
              resize
              isDisabled
            />
            <AppCheckbox onChange={(v) => setCheck(v)} value={check} hasBorder>
              Hola!
            </AppCheckbox>
            <AppTextArea
              title='AppTextArea'
              icon={<AppRemixIcon icon='checkbox-blank' />}
              onChange={(v) => console.log(v)}
              error='Un error con texto'
              required
              value={
                <div>
                  Hola me llamo <b>Paco!!</b>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  Hola me llamo <b>Paco!!</b>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  Hola me llamo <b>Paco!!</b>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  Hola me llamo <b>Paco!!</b>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
              }
              isReadOnly
            />
            <AppInputNumber
              title='AppInputNumber'
              icon={<AppRemixIcon icon='checkbox-blank' />}
              onChange={(v) => setInputNumber(v)}
              value={inputNumber}
              isClearable
              error='Esto es un error'
              required
            />
            <AppFileUploader
              title='Archivo'
              placeholder={
                fileValue?.length > 0
                  ? `${fileValue?.length}${defaultTranslations.elementsSelected}`
                  : defaultTranslations.selectMultipleFiles
              }
              onChange={setFileValue}
              isMulti
              //   isDisabled
            />
            <AppSingleSelect
              options={asyncOptions}
              title='Single Select con Loading'
              value={val}
              onChange={(opt) => {
                setVal(opt)
              }}
              hasSearchBox
              required
              isLoading={!asyncOptions}
              //   error='Tiene uhj error larguísimo uy que bla bla bla bla bla bla sadfjklhsd jklhsdaf jsdfsj dhfsdjkf hdsjkfh ds'
            />
            <AppSingleSelect
              options={[
                { label: 'Opt1', value: 1, tag: '#FF077B', bgColor: '#FF99C8' },
                {
                  label: 'Opt2',
                  value: 2,
                  tag: '#003942',
                  bgColor: '#00a0b9',
                  disabled: true
                }
              ]}
              title='Single Select'
              icon={<AppRemixIcon icon='numbers' />}
              value={val}
              onChange={(opt) => {
                setVal(opt)
              }}
              isClearable
              hasSearchBox
              error='Tiene uhj error larguísimo uy que bla bla bla bla bla bla sadfjklhsd jklhsdaf jsdfsj dhfsdjkf hdsjkfh ds'
            />
            <AppMultiSelect
              options={[
                { label: 'Grupo', isOptGroup: true },
                {
                  label: 'Opt1',
                  value: 1,
                  group: 'Grupo',
                  tag: '#FF077B',
                  bgColor: '#FF99C8'
                },
                {
                  label: 'Opt2',
                  value: 2,
                  group: 'Grupo',
                  tag: '#003942',
                  bgColor: '#00a0b9'
                },
                { label: 'Opt3', value: 3, group: 'Grupo' },
                { label: 'Grupo 2', isOptGroup: true },
                {
                  label: 'Opcion4',
                  value: 4,
                  group: 'Grupo 2',
                  disabled: true
                },
                { label: 'Opcion5', value: 5, group: 'Grupo 2' },
                { label: 'Opcion6', value: 6, group: 'Grupo 2' }
              ]}
              title='Multi Select'
              icon={<AppRemixIcon icon='numbers' />}
              value={valMulti}
              onChange={(opt) => setValMulti(opt)}
              isClearable
              hasSearchBox
              hasSelectOptions
              required
            />
            <AppSingleAsync
              asyncFunction={loadAsyncOptions}
              title='Single Async Select'
              value={asyncSingleVal}
              onChange={setAsyncSingleVal}
            />
            <AppMultiAsync
              asyncFunction={loadAsyncOptions}
              title='Multi Async Select'
              icon={<AppRemixIcon icon='numbers' />}
              value={asyncMultiVal}
              onChange={setAsyncMultiVal}
              isClearable
              required
            />
            <AppDatePicker
              title='Fecha manual'
              onChange={(v) => setDate(v)}
              required
              value={date}
              isManual
              isClearable
            />
            <AppDatePicker
              title='Fecha'
              onChange={(v) => setDate(v)}
              required
              placeholder='hola'
              hasToggleType
              value={date}
              isDisabled
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

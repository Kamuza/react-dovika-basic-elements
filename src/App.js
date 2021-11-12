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
import AppSingleSelect from './lib/components/form/AppSingleSelect'
import AppMultiSelect from './lib/components/form/AppMultiSelect'
import AppCheckbox from './lib/components/form/AppCheckbox'

const App = () => {
  const [showAppModal, setShowAppModal] = useState(false)
  const [showAppDeleteModal, setShowAppDeleteModal] = useState(false)
  const [image, setImage] = useState(null)
  const [val, setVal] = useState(1)
  const [valMulti, setValMulti] = useState([])
  const [check, setCheck] = useState(false)

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
              value=''
              isClearable
              tabIndex={2}
              error='Esto es un error largo para ver como sale'
            />
            <AppInput
              title='AppInput2'
              icon={<AppRemixIcon icon='checkbox-blank' />}
              onChange={(v) => setVal(v)}
              value={val}
              isClearable
              tabIndex={1}
            />
            <AppTextArea
              title='AppTextArea'
              icon={<AppRemixIcon icon='checkbox-blank' />}
              error='Un error con texto'
              placeholder='hola'
              required
              onChange={(v) => console.log(v)}
              // value=' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at felis eget dolor malesuada interdum. Cras ultrices nisi nec nisl vehicula ullamcorper. Nulla sit amet mauris condimentum, semper justo eu, fringilla nisi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean consequat eu leo vitae iaculis. Vivamus placerat aliquam elit, sit amet iaculis elit hendrerit eleifend. Pellentesque bibendum, erat consequat tempor iaculis, felis nisl scelerisque neque, et laoreet justo lectus nec dui. Morbi imperdiet, nulla quis luctus dictum, est sem pellentesque ligula, ac aliquam ex nunc vel lectus. Nullam rutrum pretium enim, vitae pulvinar tellus finibus in. Nunc convallis lectus fringilla augue rhoncus efficitur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse aliquet dignissim luctus. Integer at mi tortor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam posuere neque et augue rhoncus aliquam. Fusce augue lectus, scelerisque sed arcu vitae, interdum tempor ante.
              //
              //        Sed consequat lobortis tempus. Sed elementum ligula ut sapien imperdiet, eget cursus tellus dictum. In ut nisl odio. Phasellus sed interdum urna. Sed tempor faucibus nibh, eget condimentum dolor facilisis sit amet. Phasellus metus augue, vestibulum dapibus hendrerit quis, tempus in dolor. Phasellus at elit elit. Nullam velit metus, lobortis nec fermentum sed, iaculis et dolor. Donec nec ex pulvinar tortor feugiat congue. Cras facilisis pretium lacus, id sollicitudin dui facilisis ac. Ut vitae dapibus dolor, sit amet gravida dolor. Suspendisse potenti.
              //
              //        Aliquam finibus consectetur iaculis. Aliquam odio diam, fermentum sit amet felis et, fringilla pharetra neque. Donec a pretium orci. Mauris tincidunt orci a nunc venenatis egestas. Sed ut sagittis nisi. Vivamus convallis consequat porta. Aenean porttitor tincidunt aliquam. Phasellus sit amet leo finibus, iaculis lacus eget, suscipit ex. Sed tincidunt mollis purus, a ultricies urna auctor eget. In est ex, maximus in gravida non, porttitor eget lacus. Mauris semper porta quam, id placerat velit consectetur eu. Praesent ac tincidunt metus. Duis volutpat nisl sed dui cursus, et eleifend purus luctus. Nam convallis posuere nibh eget lacinia. Aliquam suscipit, justo in maximus eleifend, dolor quam rhoncus dui, ac consectetur est dolor non metus.
              //
              //        Donec dapibus odio tellus, ut congue leo sollicitudin vitae. Suspendisse felis ante, gravida sit amet enim ac, maximus pharetra sem. In cursus nunc vel porttitor lobortis. Curabitur commodo pulvinar est ut venenatis. Praesent eget risus turpis. Sed nec semper turpis. Aenean nisl quam, pulvinar id ullamcorper vel, pellentesque non tortor. Vivamus sit amet justo luctus, tristique lectus ac, consequat nunc. '
              // isClearable
              resize
            />
            <AppCheckbox
              onChange={(v) => setCheck(v)}
              value={check}
              text='Hola!'
            />
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
            {/* <AppSelect */}
            {/*  title='AppSelect' */}
            {/*  icon={<AppRemixIcon icon='checkbox-blank' />} */}
            {/*  options={[ */}
            {/*    { label: 'Hola', isOptGroup: true }, */}
            {/*    { label: 'Hijo', value: 1, group: 'Hola' }, */}
            {/*    { label: 'Hijo2', value: 12, group: 'Hola' } */}
            {/*  ]} */}
            {/*  // isMulti */}
            {/*  hasSearchBox */}
            {/*  hasSelectOptions */}
            {/*  onChange={(v) => console.log('ALGO', v)} */}
            {/*  value={{ label: 'Hola', isOptGroup: true }} */}
            {/*  isClearable */}
            {/* /> */}
            <AppInputNumber
              title='AppInputNumber'
              icon={<AppRemixIcon icon='checkbox-blank' />}
              onChange={(v) => console.log(v)}
              value=''
              isClearable
              error='Esto es un error'
              required
            />
            <AppDatePicker
              title='AppDatePicker'
              onChange={(v) => console.log(v)}
              error='Un error largo'
              required
              placeholder='hola'
            />
            <AppFileUploader
              title='AppDatePicker'
              onChange={(v) => console.log(v)}
              isMulti
            />

            {/* <AppSelect */}
            {/*  options={[ */}
            {/*    { label: 'Opt1', value: 1 }, */}
            {/*    { label: 'Opt2', value: 2 }, */}
            {/*    { label: 'Opt3', value: 3 } */}
            {/*  ]} */}
            {/*  title='isOnlyValue' */}
            {/*  icon={<AppRemixIcon icon='numbers' />} */}
            {/*  value={val} */}
            {/*  onChange={(opt) => { */}
            {/*    setVal(opt) */}
            {/*    console.log(opt) */}
            {/*  }} */}
            {/*  isMulti */}
            {/* /> */}

            <AppSingleSelect
              options={[
                { label: 'Grupo', isOptGroup: true },
                { label: 'Opt1', value: 1, group: 'Grupo' },
                { label: 'Opt2', value: 2, group: 'Grupo' },
                { label: 'Opt3', value: 3, group: 'Grupo' }
              ]}
              title='Single Select'
              icon={<AppRemixIcon icon='numbers' />}
              value={val}
              onChange={(opt) => {
                setVal(opt)
              }}
              isClearable
              hasSearchBox
              required
              error='Tiene uhj error larguísimo uy que bla bla bla bla bla bla sadfjklhsd jklhsdaf jsdfsj dhfsdjkf hdsjkfh ds'
            />
            {console.log('ValMulti', valMulti)}
            <AppMultiSelect
              options={[
                { label: 'Grupo', isOptGroup: true },
                { label: 'Opt1', value: 1, group: 'Grupo' },
                { label: 'Opt2', value: 2, group: 'Grupo' },
                { label: 'Opt3', value: 3 }
              ]}
              title='Multi Select'
              icon={<AppRemixIcon icon='numbers' />}
              value={valMulti}
              onChange={(opt) => {
                setValMulti(opt)
              }}
              isClearable
              hasSearchBox
              hasSelectOptions
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

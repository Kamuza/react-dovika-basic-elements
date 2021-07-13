import React from 'react'
import { AppInput, AppSelect } from './lib'
import { RiCheckLine } from 'react-icons/all'
import styled from 'styled-components'
import AppTextArea from './lib/components/form/AppTextArea'
import './scss/App.scss'

const App = () => {
  return (
    <Container>
      <AppInput title='AppInput' icon={<RiCheckLine />} />
      <AppTextArea title='AppTextArea' icon={<RiCheckLine />} />
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
    </Container>
  )
}

export default App

const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, Liberation Sans, sans-serif,
    Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
`

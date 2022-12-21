import React, { useState } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import defaultColors from '../../constants/defaultColors'
import AppRemixIcon from '../icon/AppRemixIcon'
const colors = window.dovikaBasicElementsColors || defaultColors

/**
 *   Elements: [
 *      title:                  Título del input, se mostrará sobre el input.
 *      onChange:               Función que ejecutará cada vez que se ejecute un cambio.
 *      value:                  Valor(es) seleccionado(s).
 *      placeholder (OPC):      Texto informativo. Se muestra cuando no hay texto escrito.
 *      icon (OPC):             Icono a la izquierda. Si no se establece, queda el hueco.
 *      name (OPC):             Nombre del input. Si no se establece, se queda en blanco.
 *      onKeyDown (OPC):        Función al pulsar una tecla. Return event.
 *      onPressKey (OPC):       Función al pulsar una tecla concreta deu na lista (onPressKeyList). Se ejecuta también onKeyDown. Return tecla pulsada.
 *      onPressKeyList (OPC):   Obligatorio si se establece onPressKey. Array de teclas en formato ['a','Enter','Escape'] que ejecutarán onPressKey.
 *      required (OPC):         Añade un asterisco rojo tras el title. No tiene función de validación.
 *      error (OPC):            Si se recibe, añade el texto recibido en rojo tras el title.
 *      isClearable (OPC):      TRUE si se quiere poder dejar en blanco el campo con un botón a la derecha. Por defecto FALSE.
 *      append (OPC):           WIP: esto va a desaparecer.
 *      autoFocus (OPC):        Añadirá autoFocus al input.
 *      others (OPC):           Añadirá cualquiero otro campo al INPUT.
 *   ]
 **/
const AppCheckbox = (props) => {
  const {
    children,
    onChange,
    value,
    iconUncheck,
    iconCheck,
    checkboxSize,
    error,
    hasBorder,
    isDisabled,
    color,
    ...others
  } = props

  return (
    <Container
      {...others}
      hasBorder={hasBorder}
      error={error}
      className={`${isDisabled ? ' disabled' : ''}`}
      onClick={() => (!isDisabled ? onChange(!value) : undefined)}
    >
      {value ? (
        <AppRemixIcon
          icon={iconCheck}
          color={error ? colors.danger : color}
          size={checkboxSize}
        />
      ) : (
        <AppRemixIcon
          icon={iconUncheck}
          color={error ? colors.danger : color}
          size={checkboxSize}
        />
      )}
      <span>{children}</span>
    </Container>
  )
}

export default AppCheckbox

AppCheckbox.defaultProps = {
  iconCheck: 'checkbox',
  iconUncheck: 'checkbox-blank',
  color: colors.primary,
  checkboxSize: 16,
  hasBorder: false,
  isDisabled: false
}
const Container = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
  padding: ${(props) => (props.hasBorder ? '5px 5px 5px 12px' : '6px 0')};
  border: ${(props) => (props.hasBorder ? '#ddd solid 1px' : 'none')};
  border-color: ${(props) =>
    props.error && props.hasBorder ? colors.danger : '#ddd'};
  cursor: pointer;
  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  & > span {
    padding-left: 6px;
  }
`

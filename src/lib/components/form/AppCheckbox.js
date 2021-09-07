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
    text,
    onChange,
    value,
    iconUncheck,
    iconCheck,
    error,
    isDisabled,
    color,
    ...others
  } = props

  const handleOnChange = () => {}

  return (
    <div {...others} onClick={() => handleOnChange()}>
      {value ? (
        <AppRemixIcon icon={iconCheck} color={color} />
      ) : (
        <AppRemixIcon icon={iconUncheck} color={color} />
      )}
    </div>
  )
}

export default AppCheckbox

AppCheckbox.defaultProps = {
  name: '',
  iconCheck: 'checkbox',
  iconUncheck: 'checkbox-blank',
  color: colors.primary
}

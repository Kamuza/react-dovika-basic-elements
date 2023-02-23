import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import defaultColors from '../../constants/defaultColors'
import { useIsFirstRender } from '../../hooks/isFirstRender'
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
 *      decimals (OPC):         Números de decimales permitidos. Si se establece 0, no se permitirán comas o puntos. Por defecto 3.
 *      others (OPC):           Añadirá cualquiero otro campo al INPUT.
 *   ]
 **/
const AppInputNumber = (props) => {
  const {
    title,
    onChange,
    value,
    placeholder,
    icon,
    name,
    onKeyDown,
    onPressKey,
    onPressKeyList,
    required,
    error,
    isClearable,
    append,
    autoFocus,
    readOnly,
    decimals,
    ...others
  } = props
  const [hasValue, setHasValue] = useState(value)
  const isFirstRender = useIsFirstRender()
  const regex = `^(\\d+)${decimals === 0 ? '' : '?[,.]'}?(\\d{0,${decimals}})?$`
  const re = new RegExp(regex)
  const [formattedValue, setFormattedValue] = useState(
    value ? value.toString() : ''
  )

  useEffect(() => {
    if (value) setFormattedValue(value.toString())
  }, [value])

  useEffect(() => {
    if (!isFirstRender) {
      onChange(formattedValue)
      setHasValue(formattedValue)
    }
  }, [formattedValue])

  const handleOnChange = (val) => {
    if (re.test(val)) setFormattedValue(val.replaceAll(',', '.'))
  }

  return (
    <Container className='mb-2' hasIcon={!!icon}>
      <input
        type='text'
        name={name}
        className={`outside ${hasValue ? 'has-value' : ''} ${
          error ? 'error' : ''
        }`}
        value={value || ''}
        readOnly={readOnly}
        onChange={(e) => handleOnChange(e.target.value)}
        autoFocus={autoFocus}
        onKeyDown={(e) => {
          onKeyDown(e)
          _.forEach(onPressKeyList, (key) => {
            if (e.key === key) onPressKey(key)
          })
        }}
        {...others}
      />
      <span className='floating-label-outside'>
        <span title={title}>
          {title}
          {required && <span className='text-danger'>*</span>}
        </span>
        {error && (
          <span className='text-danger input-error' title={error}>
            {error}
          </span>
        )}
      </span>
      {placeholder && <span className='placeholder'>{placeholder}</span>}
      {icon && <span className='input-icon-outside'>{icon}</span>}
      {value && isClearable ? (
        <span
          className='clearable'
          onClick={() => {
            onChange('')
            setHasValue('')
          }}
        >
          <AppRemixIcon icon='close-circle' />
        </span>
      ) : (
        ''
      )}
      {append && <div className='input-append'>{append}</div>}
    </Container>
  )
}

export default AppInputNumber
AppInputNumber.defaultProps = {
  name: '',
  autoFocus: false,
  append: '',
  onKeyDown: () => {},
  min: null,
  max: null,
  decimals: 3,
  readOnly: false
}

const Container = styled.div`
  margin: 10px 0;
  position: relative;
  input.outside,
  input[type='text'].outside {
    color: #555;
    width: 100%;
    font-size: 15px;
    height: 36px;
    line-height: normal;
    border: #ddd solid 1px;
    border-radius: 0;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    margin-bottom: -1px;
    padding: 6px 10px 6px ${(props) => (props.hasIcon ? '40px' : '10px')};
    -webkit-appearance: none;
    -moz-appearance: none;
    position: relative;
    z-index: 1;

    &::placeholder {
      transition: all ease 0.8s;
      font-size: 0;
    }
    &:focus {
      &::placeholder {
        transition: all ease 0.8s;
        font-size: 12px;
      }
    }
    &.error {
      border-color: ${colors.danger};
    }
  }
  .placeholder {
    position: absolute;
    pointer-events: none;
    top: 8px;
    left: 0;
    right: 8px;
    color: #aaa;
    z-index: 3;
    opacity: 0;
    transition: all ease 0.3s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  input:focus:not(.has-value) ~ .placeholder {
    left: 40px;
    opacity: 1;
  }

  input:focus,
  select:focus {
    outline: 0 !important;
    color: #555 !important;
    border-color: #9e9e9e;
    z-index: 2;
  }
  input:focus
    ~ .floating-label-outside
    input:not(:focus).has-value
    ~ .floating-label-outside {
    top: 12px;
    left: ${(props) => (props.hasIcon ? '40' : '10')}px;
    font-size: 10px;
    opacity: 1;
    font-weight: 400;
  }
  input:focus ~ .floating-label-outside,
  input.has-value ~ .floating-label-outside,
  .input-error {
    top: -6px;
    opacity: 1;
    font-size: 10px;
    color: ${colors.primary};
    background: transparent;
    padding: 0px 5px;
    span {
      background: white;
      padding: 0 4px;
    }
  }
  input:focus ~ .floating-label-outside,
  input:not(:focus).has-value ~ .floating-label-outside {
    left: ${(props) => (props.hasIcon ? '40' : '0')}px;
  }
  .floating-label-outside {
    position: absolute;
    pointer-events: none;
    left: ${(props) => (props.hasIcon ? '40' : '10')}px;
    top: 8px;
    right: 8px;
    transition: 0.2s ease all;
    color: #777;
    font-weight: 400;
    font-size: 12px;
    letter-spacing: 0.5px;
    z-index: 4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .input-icon-outside svg,
  .input-icon-outside span,
  .input-icon-outside i {
    position: absolute;
    top: 12px;
    left: 15px;
    z-index: 3;
    color: #727272;
    transition: color ease 0.2s;
  }
  .input-icon-outside span,
  .input-icon-outside i {
    top: 8px;
  }
  input:focus ~ .input-icon-outside,
  input:focus ~ .input-icon-outside span {
    color: lighten(${colors.primary}, 10%);
  }

  .clearable {
    position: absolute;
    right: 2px;
    top: 2px;
    z-index: 4;
    cursor: pointer;
    padding: 4px;
    color: ${colors.primary};
  }

  .input-append {
    position: absolute;
    right: 0;
    top: 0;
    height: 35px;
    min-width: 15px;
    z-index: 5;
  }

  .inputDropDown {
    position: relative;
    border: #ddd solid 1px;
    background-color: ${colors.grey200};
    text-align: right;
    .selected-value {
      line-height: 34px;
      margin: 0 8px;
      font-size: 12px;
    }
    .caret {
      margin-top: 35px;
    }
    .inputDropDown-options {
      position: absolute;
      background-color: white;
      border: #ddd solid 1px;
      list-style: none;
      margin: 0;
      padding: 0;
      top: 35px;
      right: 0;
      z-index: 6;
      li {
        text-align: left;
        padding: 4px 12px;
        min-width: 200px;
        max-width: 400px;
        &:hover {
          background-color: ${colors.grey200};
        }
      }
    }
  }
`

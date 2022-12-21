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
 *      resize (OPC):           Permite cambiar la propiedad resize de css del textarea. Por defecto none.
 *      height (OPC):           Permite establecer la altura inicial (o definitiva, dependiendo de resize) del textarea. Por defecto 80px.
 *      maxHeight (OPC):        En caso de cambiar resize a vertical, permite establecer una altura máxima.
 *      others (OPC):           Añadirá cualquiero otro campo al INPUT.
 *   ]
 * */
const AppTextArea = (props) => {
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
    resize,
    height,
    maxHeight,
    isReadOnly,
    isDisabled,
    ...others
  } = props
  const [hasValue, setHasValue] = useState(value)

  return (
    <Container
      className={`mb-2${isDisabled ? ' disabled' : ''}`}
      resize={resize}
      height={height}
      maxHeight={maxHeight}
      hasIcon={!!icon}
    >
      {isReadOnly ? (
        <div className='outside is-read-only has-value'>{value}</div>
      ) : (
        <textarea
          name={name}
          className={`outside ${hasValue ? 'has-value' : ''} ${
            error ? 'error' : ''
          }`}
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            setHasValue(e.target.value)
          }}
          autoFocus={autoFocus}
          readOnly={isDisabled}
          onKeyDown={(e) => {
            onKeyDown(e)
            _.forEach(onPressKeyList, (key) => {
              if (e.key === key) onPressKey(key)
            })
          }}
          {...others}
        />
      )}

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
      {value && isClearable && !isDisabled && (
        <span
          className='clearable'
          onClick={() => {
            onChange('')
            setHasValue('')
          }}
        >
          <AppRemixIcon icon='close-circle' />
        </span>
      )}
      {append && <div className='input-append'>{append}</div>}
    </Container>
  )
}

export default AppTextArea
AppTextArea.defaultProps = {
  name: '',
  autoFocus: false,
  append: '',
  onKeyDown: () => {},
  resize: 'none',
  maxHeight: null,
  height: '80px',
  isReadOnly: false,
  isDisabled: false
}

const Container = styled.div`
  position: relative;
  margin: 10px 0;
  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  textarea.outside,
  div.outside {
    color: #555;
    width: 100%;
    font-size: 15px;
    min-height: 36px;
    max-height: ${(props) => props.maxHeight};
    overflow: auto;
    height: ${(props) => props.height};
    line-height: normal;
    border: #ddd solid 1px;
    border-radius: 0;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    margin-bottom: -1px;
    padding: 6px 26px 6px ${(props) => (props.hasIcon ? '40px' : '10px')};
    -webkit-appearance: none;
    -moz-appearance: none;
    position: relative;
    z-index: 1;
    resize: ${(props) => props.resize};

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
  }

  textarea:focus:not(.has-value) ~ .placeholder {
    left: 40px;
    opacity: 1;
  }

  textarea:focus,
  select:focus {
    outline: 0 !important;
    color: #555 !important;
    border-color: #9e9e9e;
    z-index: 2;
  }
  textarea:focus
    ~ .floating-label-outside
    textarea:not(:focus).has-value
    ~ .floating-label-outside {
    top: 12px;
    left: ${(props) => (props.hasIcon ? '40' : '10')}px;
    font-size: 10px;
    opacity: 1;
    font-weight: 400;
  }
  textarea:focus ~ .floating-label-outside,
  textarea.has-value ~ .floating-label-outside,
  .is-read-only ~ .floating-label-outside,
  .input-error {
    top: -7px;
    opacity: 1;
    font-size: 10px;
    color: ${colors.primary};
    background: transparent;
    padding: 0px 5px;
    pointer-events: auto;
    span {
      background: white;
      padding: 0 4px;
    }
  }
  textarea:focus ~ .floating-label-outside,
  textarea:not(:focus).has-value ~ .floating-label-outside {
    left: ${(props) => (props.hasIcon ? '40' : '0')}px;
  }
  .floating-label-outside {
    position: absolute;
    left: ${(props) => (props.hasIcon ? '40px' : '10px')};
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
    pointer-events: none;
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
  .input-icon-outside span {
    top: 8px;
  }
  textarea:focus ~ .input-icon-outside,
  textarea:focus ~ .input-icon-outside span {
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

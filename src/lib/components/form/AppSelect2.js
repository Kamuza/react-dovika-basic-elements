import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import ReactDOMServer from 'react-dom/server'
import defaultTranslations from '../../constants/defaultTranslations'
import defaultColors from '../../constants/defaultColors'
import AppRemixIcon from '../icon/AppRemixIcon'
import AppFontAwesomeIcon from '../icon/AppFontAwesomeIcon'
import useDetectClickOut from '../../hooks/useDetectClickOut'
const colors = window.dovikaBasicElementsColors || defaultColors

/**
 *   Elements: [
 *      title:                  Título del input, se mostrará sobre el input.
 *      options:                Opciones del selector. Debe ser un array con objetos en formato
 *                              {
 *                                  label: 'Texto para mostrar',
 *                                  value: 'Valor que se enviará',
 *                                  isOptGroup: 'OPC. Si se incluye, se mostrará como grupo no seleccionable',
 *                                  group: 'OPC. Si se incluye, se podrá utilizar como filtro de texto para encontrar el elemento'
 *                              }
 *      onChange:               Función que ejecutará cada vez que se ejecute un cambio.
 *      value:                  Valor(es) seleccionado(s).
 *      className (OPC):        Clase para añadir al input. Por defecto 'pointer'.
 *      placeholder (OPC):      Texto informativo. Se muestra cuando no hay opciones seleccionadas.
 *      icon (OPC):             Icono a la izquierda. Si no se establece, queda el hueco.
 *      isMulti (OPC):          TRUE si se quieren poder seleccionar múltiples opciones. Por defecto FALSE.
 *      hasSearchBox (OPC):     TRUE si se quiere poder realizar búsquedas entre los elementos. Por defecto FALSE
 *      hasSelectOptions (OPC): TRUE si se quiere tener botón de Seleccionar Todo y Deseleccionar todo. Śeleccionará o deseleccionará todo lo visible (es decir, utilizará el filtro de hasSearchBox si existe)
 *      setValueField (OPC):    Nombre del campo Value dentro de los objetos en 'options'. Por defecto value.
 *      setLabelField (OPC):    Nombre del campo Label dentro de los objetos en 'options'. Por defecto label.
 *      isClearable (OPC):      TRUE si se quiere poder dejar en blanco el campo con un botón a la derecha. Por defecto FALSE.
 *      isLoading (OPC):        TRUE si se quiere mostrar un Select en modo carga mientras se reciben los datos. Por defecto FALSE.
 *      isOnlyValue             TRUE si se quiere poder utilizar solo con value en vez de el objecto completo.
 *   ]
 * */

export default function AppSelect(props) {
  const {
    title,
    options,
    onChange,
    value,
    className = 'pointer',
    placeholder = 'Seleccionar',
    icon,
    isMulti = false,
    hasSearchBox = false,
    hasSelectOptions = false,
    setValueField = 'value',
    setLabelField = 'label',
    isClearable,
    isLoading,
    isOnlyValue = false,
    required,
    error
  } = props
  const [selectedOptions, setSelectedOptions] = useState(isMulti ? [] : null)

  const [filteredOptions, setFilteredOptions] = useState(options)
  const { show, nodeRef, triggerRef } = useDetectClickOut(false)

  const translations =
    window.dovikaBasicElementsTranslations || defaultTranslations

  useEffect(() => {
    if (value !== undefined) {
      if (isOnlyValue) {
        setSelectedOptions(
          isMulti
            ? options.filter((o) => value.includes(o.value))
            : options.find((o) => value === o.value)
        )
      } else setSelectedOptions(value)
    }
  }, [value])

  useEffect(() => {
    setFilteredOptions(options)
  }, [options])

  const handleClickOption = (opt) => {
    let tempValue
    if (!isMulti) {
      tempValue = isOnlyValue ? opt.value || null : opt
      // setSelectedOptions(opt)
      const body = document.getElementsByTagName('body')[0]
      body.click()
    } else if ('isOptGroup' in opt) {
      // let tempOptions = [...selectedOptions]
      // const optChildOptions = options.filter((o) =>
      //   o.group?.toUpperCase().includes(opt[setLabelField].toUpperCase())
      // )
      // const selectedTempOptions = tempOptions.filter((o) =>
      //   o.group?.toUpperCase().includes(opt[setLabelField].toUpperCase())
      // )
      //
      // if (optChildOptions.length === selectedTempOptions.length) {
      //   const diff = _.difference(selectedOptions, optChildOptions)
      //   setSelectedOptions(diff)
      // } else {
      //   tempOptions = [...selectedOptions, ...optChildOptions]
      //   setSelectedOptions(_.uniqBy(tempOptions, setValueField))
      // }
    } else {
      const tempOptions = [...selectedOptions]
      if (tempOptions.filter((to) => to === opt).length > 0) {
        // tempOptions.filter((o) => o !== opt)
        tempOptions.splice(_.findIndex(tempOptions, opt), 1)
      } else tempOptions.push(opt)
      if (isOnlyValue) {
        tempValue = _.map(tempOptions, 'value')
        tempValue = tempValue.length > 0 ? tempValue : []
      } else tempValue = tempOptions

      // setSelectedOptions(tempOptions)
    }
    onChange(tempValue)
  }

  // > SEARCHBOX
  const changeSearchBox = (event) => {
    const tempOptions = options.filter(
      (o) =>
        o[setLabelField]
          .toUpperCase()
          .includes(event.target.value.toUpperCase()) ||
        (o.meta &&
          o.meta.toUpperCase().includes(event.target.value.toUpperCase())) ||
        o.group?.toUpperCase().includes(event.target.value.toUpperCase())
    )
    setFilteredOptions(tempOptions)
  }
  const keyUpSearchBox = (event) => {
    if (event.keyCode === 27) {
      // ESC
      event.target.value = ''
      changeSearchBox(event)
    } else if (event.keyCode === 13) selectAll()
  }
  // < SEARCHBOX

  // > SELECT OPTIONS
  const selectAll = () => {
    let options = null
    if (isMulti) options = [...selectedOptions, ...filteredOptions]
    else options = [...selectedOptions, ...filteredOptions[0]]
    options = options.filter((o) => !o.hasOwnProperty('isOptGroup'))
    setSelectedOptions(_.uniqBy(options, setValueField))
  }

  const deselectAll = () => {
    const options = [...selectedOptions]
    filteredOptions.forEach((fopt) => {
      if (options.includes(fopt)) options.splice(_.findIndex(options, fopt), 1)
    })
    setSelectedOptions(options)
  }
  // < SELECT OPTIONS

  if (isLoading) {
    return (
      <Container>
        <Input className={`${className}`} hasIcon={!!icon} error={error}>
          <InputIcon>
            <AppRemixIcon
              icon='loader-4'
              className='fa-spin'
              color={colors.primary}
            />
          </InputIcon>
          {title && (
            <InputTitle icon={icon}>
              {title} {required && <span className='text-danger'>*</span>}
            </InputTitle>
          )}
          <InputPlaceholder>{placeholder}</InputPlaceholder>
          <AppFontAwesomeIcon
            icon='caret-down'
            className='float-right'
            color={colors.primary}
            style={{ marginTop: 3 }}
          />
          {/* <FaCaretDown */}
          {/*  className='float-right' */}
          {/*  color={colors.primary} */}
          {/*  style={{ marginTop: 3 }} */}
          {/* /> */}
        </Input>
      </Container>
    )
  }

  return (
    <Container>
      <Input
        active={selectedOptions}
        className={`${className}`}
        hasIcon={!!icon}
        error={error}
        ref={triggerRef}
      >
        {icon && <InputIcon>{icon}</InputIcon>}
        {title && (
          <InputTitle icon={icon}>
            {title} {required && <span className='text-danger'>*</span>}
          </InputTitle>
        )}
        {isMulti ? (
          selectedOptions && selectedOptions.length === 0 ? (
            <InputPlaceholder>{placeholder}</InputPlaceholder>
          ) : (
            <SelectedContainer>
              {selectedOptions.length === 1
                ? selectedOptions[0][setLabelField]
                : `${selectedOptions.length}${translations.elementsSelected}`}
            </SelectedContainer>
          )
        ) : // : `${selectedOptions.length} elementos seleccionados`
        selectedOptions ? (
          <SelectedContainer>
            {selectedOptions[setLabelField]}
          </SelectedContainer>
        ) : (
          <InputPlaceholder>{placeholder}</InputPlaceholder>
        )}
        <AppFontAwesomeIcon
          icon='caret-down'
          className='float-right'
          color={colors.primary}
          style={{ marginTop: 3 }}
        />
      </Input>
      {isClearable &&
        ((isMulti && selectedOptions.length > 0) ||
          (!isMulti && selectedOptions)) && (
          <ClearButton onClick={() => setSelectedOptions(isMulti ? [] : null)}>
            <AppRemixIcon icon='close-circle' color={colors.primary} />
          </ClearButton>
        )}
      {show && (
        <DropdownContainer ref={nodeRef}>
          <DropdownContent>
            {hasSearchBox && (
              <div className='m-2'>
                <SearchInput
                  type='text'
                  className='w-100'
                  placeholder={ReactDOMServer.renderToString(
                    translations.search
                  )}
                  onKeyDown={keyUpSearchBox}
                  onChange={changeSearchBox}
                  autoFocus
                />
              </div>
            )}
            {hasSelectOptions && isMulti && (
              <div className='m-2'>
                <div className='row'>
                  <div className='col-lg-6'>
                    <span
                      className='btn btn-outline-primary btn-block btn-xs'
                      onClick={selectAll}
                    >
                      {translations.selectAll}
                    </span>
                  </div>
                  <div className='col-lg-6'>
                    <span
                      className='btn btn-outline-primary btn-block btn-xs'
                      onClick={deselectAll}
                    >
                      {translations.unselectAll}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <ul>
              {filteredOptions ? (
                filteredOptions.map((opt, i) => (
                  <div key={i}>
                    {'isOptGroup' in opt ? (
                      <li onClick={() => isMulti && handleClickOption(opt)}>
                        <OptGroup>{opt[setLabelField]}</OptGroup>
                      </li>
                    ) : (
                      <li
                        style={{
                          backgroundColor: opt.bgColor,
                          color: opt.fgColor
                        }}
                        onClick={() => handleClickOption(opt)}
                        className={
                          (!isMulti &&
                            selectedOptions !== null &&
                            selectedOptions === opt) ||
                          (isMulti &&
                            selectedOptions !== null &&
                            selectedOptions.includes(opt))
                            ? 'selected'
                            : ''
                        }
                      >
                        {opt.icon}
                        {opt.circle && (
                          <span
                            className='mr-2'
                            style={{
                              display: 'inline-block',
                              width: '10px',
                              height: '10px',
                              backgroundColor: opt.circle,
                              borderRadius: '10px',
                              padding: '0'
                            }}
                          />
                        )}
                        {opt[setLabelField]}
                        {((!isMulti &&
                          selectedOptions !== null &&
                          selectedOptions === opt) ||
                          (isMulti &&
                            selectedOptions !== null &&
                            selectedOptions.includes(opt))) && (
                          <AppRemixIcon
                            icon='check'
                            className='float-right ks-check'
                          />
                        )}
                      </li>
                    )}
                  </div>
                ))
              ) : (
                <div>{translations.noOptions}</div>
              )}
            </ul>
          </DropdownContent>
        </DropdownContainer>
      )}
    </Container>
  )
}

const OptGroup = styled.span`
  background: ${colors.primary};
  padding: 3px 6px;
  border-radius: 2px;
  color: white;
`

const Container = styled.div`
  display: flex;
  flex: 1 auto;
  flex-direction: column;
  position: relative;
  margin: 10px 0;
`
const ClearButton = styled.div`
  position: absolute;
  top: 6px;
  right: 30px;
  z-index: 10;
  cursor: pointer;
`

const Input = styled.div`
  position: relative;
  border: ${(props) => (props.error ? 'red' : '#ddd')} solid 1px;
  padding: 6px 6px 1px ${(props) => (props.hasIcon ? '40px' : '10px')};
  cursor: pointer;
`

const SearchInput = styled.input`
  position: relative;
  border: #ddd solid 1px;
  padding: 2px 6px 2px 6px;
  cursor: pointer;
  &:active,
  &:focus {
    border: #ddd solid 1px;
  }
`

const InputIcon = styled.span`
  svg,
  i {
    position: absolute;
    top: 10px;
    left: 14px;
    z-index: 3;
    color: #727272;
    transition: color ease 0.2s;
  }
  i {
    top: 6px;
  }
`

const InputTitle = styled.span`
  position: absolute;
  top: -10px;
  left: ${(props) => (props.icon ? '34' : '0')}px;
  z-index: 4;
  font-size: 10px;
  color: ${colors.primary};
  background: #fff;
  padding: 0px 5px;
`

const InputPlaceholder = styled.span`
  color: #aaa;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  width: calc(100% - 50px);
`

const SelectedContainer = styled.span`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  width: calc(100% - 50px);
`

const DropdownContainer = styled.div`
  position: relative;
`

const DropdownContent = styled.div`
  position: absolute;
  top: 0px;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
  z-index: 99;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  ul {
    margin: 0;
    padding: 0px;
    list-style: none;
    max-height: 350px;
    overflow-y: auto;
    overflow-x: hidden;
    li {
      padding: 6px 10px;
      cursor: pointer;
      color: #003d47;
      &:hover {
        background: #e9ecef;
      }
      &.selected {
        background: #dfe2e5;
      }
      .ks-check {
        margin-top: 4px;
      }
    }
  }
`

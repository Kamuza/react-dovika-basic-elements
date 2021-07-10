import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import {
  RiCloseCircleLine,
  RiLoader4Line,
  RiCheckLine,
  FaCaretDown
} from 'react-icons/all'
import _ from 'lodash'
import colors from '../colors'
import defaultTranslations from '../../constants/defaultTranslations'
import defaultColors from '../../constants/defaultColors'
import { useIsFirstRender } from '../../hooks/isFirstRender'

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
 *      selectedValue:          Valor(es) seleccionado(s).
 *      className (OPC):        Clase para añadir al input. Por defecto 'pointer'.
 *      placeholder (OPC):      Texto informativo. Se muestra cuando no hay opciones seleccionadas.
 *      icon (OPC):             Icono a la izquierda. Si no se establece, queda el hueco.
 *      isMulti (OPC):          TRUE si se quieren poder seleccionar múltiples opciones. Por defecto FALSE.
 *      hasSearchBox (OPC):     TRUE si se quiere poder realizar búsquedas entre los elementos. Por defecto FALSE
 *      hasSelectOptions (OPC): TRUE si se quiere tener botón de Seleccionar Todo y Deseleccionar todo. Seleccionará o deseleccionará todo lo visible (es decir, utilizará el filtro de hasSearchBox si existe)
 *      defaultValue (OPC):     Valor por defecto (hay que ver si esto es necesario o ya no).
 *      setValueField (OPC):    Nombre del campo Value dentro de los objetos en 'options'. Por defecto value.
 *      setLabelField (OPC):    Nombre del campo Label dentro de los objetos en 'options'. Por defecto label.
 *      isClearable (OPC):      TRUE si se quiere poder dejar en blanco el campo con un botón a la derecha. Por defecto FALSE.
 *      isLoading (OPC):        TRUE si se quiere mostrar un Select en modo carga mientras se reciben los datos. Por defecto FALSE.
 *   ]
 **/

const AppSelect = (props) => {
  const {
    title,
    options,
    onChange,
    selectedValue,
    className,
    placeholder,
    icon,
    isMulti,
    hasSearchBox,
    hasSelectOptions,
    defaultValue,
    setValueField,
    setLabelField,
    isClearable,
    isLoading
  } = props
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState(
    defaultValue !== undefined
      ? !isMulti
        ? options.find((o) => o[setValueField] === defaultValue)
        : options.filter((o) => defaultValue.includes(o[setValueField]))
      : isMulti
      ? []
      : null
  )
  const [filteredOptions, setFilteredOptions] = useState(options)
  const block = useRef(null)
  const isFirstRender = useIsFirstRender()

  const translations =
    window.dovikaBasicElementsTranslations || defaultTranslations
  const colors = window.dovikaBasicElementsColors || defaultColors

  useEffect(() => {
    if (!isFirstRender && !_.isEqual(selectedValue, selectedOptions))
      onChange(selectedOptions)
  }, [selectedOptions])

  useEffect(() => {
    if (selectedValue !== undefined) setSelectedOptions(selectedValue)
  }, [selectedValue])

  useEffect(() => {
    setFilteredOptions(options)
  }, [options])

  // > CLOSE ON CLICK OUTSIDE
  const handleClickOutisde = (event) => {
    if ((block && !block.current.contains(event.target)) || !isMulti) {
      setIsOpen(false)
      setFilteredOptions(options)
      window.removeEventListener('click', handleClickOutisde)
    }
  }
  useEffect(() => {
    if (isOpen) window.addEventListener('click', handleClickOutisde)
  }, [isOpen])
  // < CLOSE ON CLICK OUTSIDE

  const handleClickOption = (opt) => {
    if (!isMulti) {
      setSelectedOptions(opt)
    } else {
      const options = [...selectedOptions]
      if (!options.includes(opt)) options.push(opt)
      else {
        options.splice(_.findIndex(options, opt), 1)
      }
      setSelectedOptions(options)
    }
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

  if (isLoading)
    return (
      <Container ref={block}>
        <Input className={`${className}`}>
          <InputIcon>
            <RiLoader4Line className='fa-spin' color={colors.primary} />
          </InputIcon>
          {title && <InputTitle>{title}</InputTitle>}
          <InputPlaceholder>{placeholder}</InputPlaceholder>
          <FaCaretDown
            className='float-right'
            color={colors.primary}
            style={{ marginTop: 3 }}
          />
        </Input>
      </Container>
    )

  return (
    <Container ref={block}>
      <Input
        active={selectedOptions}
        className={`${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon && <InputIcon>{icon}</InputIcon>}
        {title && <InputTitle>{title}</InputTitle>}
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
        <FaCaretDown
          className='float-right'
          color={colors.primary}
          style={{ marginTop: 3 }}
        />
      </Input>
      {isClearable &&
        ((isMulti && selectedOptions.length > 0) ||
          (!isMulti && selectedOptions)) && (
          <ClearButton onClick={() => setSelectedOptions(isMulti ? [] : null)}>
            <RiCloseCircleLine color={colors.primary} />
          </ClearButton>
        )}
      {isOpen && (
        <DropdownContainer style={{ minWidth: '300px' }}>
          <DropdownContent>
            {hasSearchBox && (
              <div className='m-2'>
                <SearchInput
                  type='text'
                  className='w-100'
                  placeholder={translations.search}
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
                      <li>
                        <OptGroup>{opt[setLabelField]}</OptGroup>
                      </li>
                    ) : (
                      <li
                        style={{
                          backgroundColor: opt.bgColor,
                          color: opt.fgColor
                        }}
                        onClick={() =>
                          'isOptGroup' in opt ? {} : handleClickOption(opt)
                        }
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
                              borderRadius: '10px'
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
                          <RiCheckLine className='float-right ks-check' />
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

export default AppSelect
AppSelect.defaultProps = {
  className: 'pointer',
  placeholder: 'Seleccionar',
  isMulti: false,
  hasSearchBox: false,
  hasSelectOptions: false,
  value: undefined,
  defaultValue: undefined,
  setValueField: 'value',
  setLabelField: 'label'
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
  border: #ddd solid 1px;
  padding: 6px 6px 1px 40px;
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
  svg {
    position: absolute;
    top: 10px;
    left: 14px;
    z-index: 3;
    color: #727272;
    transition: color ease 0.2s;
  }
`

const InputTitle = styled.span`
  position: absolute;
  top: -10px;
  left: 34px;
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

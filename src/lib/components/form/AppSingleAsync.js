import React, { useState, useEffect, useCallback } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import defaultTranslations from '../../constants/defaultTranslations'
import defaultColors from '../../constants/defaultColors'
import AppRemixIcon from '../icon/AppRemixIcon'
import AppFontAwesomeIcon from '../icon/AppFontAwesomeIcon'
import useDetectClickOut from '../../hooks/useDetectClickOut'
import TagName from '../layout/TagName'
const colors = window.dovikaBasicElementsColors || defaultColors

/**
 *   Elements: [
 *      title:                    Título del input, se mostrará sobre el input.
 *      asyncFunction:            Opciones del selector dadas por una función asíncrona. Debe ser un array con objetos en formato
 *                                {
 *                                  label: 'Texto para mostrar',
 *                                  value: 'Valor que se enviará',
 *                                  isOptGroup: 'OPC. Si se incluye, se mostrará como grupo no seleccionable',
 *                                  group: 'OPC. Si se incluye, se podrá utilizar como filtro de texto para encontrar el elemento'
 *                                }
 *      onChange:                 Función que ejecutará cada vez que se ejecute un cambio.
 *      value:                    Valor seleccionado.
 *      className (OPC):          Clase para añadir al input. Por defecto 'pointer'.
 *      placeholder (OPC):        Texto informativo. Se muestra cuando no hay opciones seleccionadas.
 *      icon (OPC):               Icono a la izquierda. Si no se establece, queda el hueco.
 *      setValueField (OPC):      Nombre del campo Value dentro de los objetos en 'options'. Por defecto value.
 *      setLabelField (OPC):      Nombre del campo Label dentro de los objetos en 'options'. Por defecto label.
 *      inputMinSearch (OPC):     Número mínimo de caracteres para comenzar la búsqueda. Por defecto 3.
 *      required (OPC):           Pone asterisco rojo y no permite deseleccionar una vez seleccionada una opción.
 *   ]
 * */

const AppSingleAsync = (props) => {
  const {
    title,
    asyncFunction,
    onChange,
    value,
    className,
    placeholder,
    icon,
    setValueField,
    setLabelField,
    inputMinSearch,
    required,
    error
  } = props
  const [isLoading, setIsLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [options, setOptions] = useState([])
  const { show, nodeRef, triggerRef, setShow } = useDetectClickOut(false)

  const translations =
    window.dovikaBasicElementsTranslations || defaultTranslations

  useEffect(() => {
    setSelectedOption(value)
  }, [value, options])

  useEffect(() => {
    if (!show) setOptions([])
  }, [show])

  const handleClickOption = useCallback(
    (opt) => {
      if (opt) {
        if (!opt?.isOptGroup) {
          if (
            selectedOption?.[setValueField] === opt[setValueField] &&
            !required
          )
            onChange(null)
          else onChange(opt)
        }
      } else onChange(null)
      setShow(false)
    },
    [selectedOption, setValueField, required]
  )

  // > SEARCHBOX
  const changeSearchBox = useCallback(
    async (input) => {
      if (input.length < inputMinSearch) {
        setOptions([])
        return
      }
      setIsLoading(true)
      setOptions(await asyncFunction(input))
      setIsLoading(false)
    },
    [asyncFunction, inputMinSearch]
  )

  const keyUpSearchBox = useCallback(
    (event) => {
      if (event.keyCode === 13) {
        // Enter
        if (options) {
          for (var i = 0; i < options.length; i++) {
            if (options[i]?.value) {
              handleClickOption(options[i])
              break
            }
          }
        }
      }
      if (event.keyCode === 27) {
        // ESC
        event.target.value = ''
        changeSearchBox(event.target.value)
      }
    },
    [changeSearchBox, options]
  )
  // < SEARCHBOX

  return (
    <Container>
      <Input
        active={selectedOption}
        className={`${className}`}
        hasIcon={!!icon}
        error={error}
        ref={triggerRef}
      >
        {icon && !isLoading && <InputIcon>{icon}</InputIcon>}
        {icon && isLoading && (
          <InputIcon>
            <AppRemixIcon
              icon='loader-4'
              className='fa-spin'
              color={colors.primary}
            />
          </InputIcon>
        )}
        {title && (
          <InputTitle icon={icon}>
            <span title={title}>
              {title}
              {required && <span className='text-danger'>*</span>}
            </span>{' '}
            {error && (
              <span className='text-danger' title={error}>
                {error}
              </span>
            )}
          </InputTitle>
        )}
        {selectedOption ? (
          <SelectedContainer>{selectedOption[setLabelField]}</SelectedContainer>
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
      {selectedOption && !required && (
        <ClearButton onClick={() => handleClickOption(null)}>
          <AppRemixIcon icon='close-circle' color={colors.primary} />
        </ClearButton>
      )}
      {show && (
        <DropdownContainer ref={nodeRef}>
          <DropdownContent>
            <div className='m-2'>
              <SearchInput
                type='text'
                className='w-100'
                placeholder={translations.search}
                onKeyDown={keyUpSearchBox}
                onChange={(e) =>
                  _.debounce(changeSearchBox, 800)(e.target.value)
                }
                autoFocus
              />
            </div>
            <ul>
              {options ? (
                options.map((opt, i) => (
                  <div key={i}>
                    {'isOptGroup' in opt ? (
                      <li>
                        <OptGroup>{opt[setLabelField]}</OptGroup>
                      </li>
                    ) : (
                      <li
                        style={
                          opt.tag
                            ? {}
                            : {
                                backgroundColor: opt.bgColor,
                                color: opt.fgColor
                              }
                        }
                        onClick={() => handleClickOption(opt)}
                        className={
                          selectedOption &&
                          selectedOption[setValueField] === opt[setValueField]
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
                        {opt.tag ? (
                          <TagName bgColor={opt.bgColor} tag={opt.tag}>
                            {opt[setLabelField]}
                          </TagName>
                        ) : (
                          opt[setLabelField]
                        )}
                        {selectedOption &&
                          selectedOption[setValueField] ===
                            opt[setValueField] && (
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
                <div className='m-2'>{translations.noOptions}</div>
              )}
            </ul>
          </DropdownContent>
        </DropdownContainer>
      )}
    </Container>
  )
}

export default AppSingleAsync
AppSingleAsync.defaultProps = {
  className: 'pointer',
  placeholder: 'Seleccionar',
  loadingPlaceholder: 'Cargando...',
  hasSelectOptions: false,
  value: null,
  setValueField: 'value',
  setLabelField: 'label',
  inputMinSearch: 3,
  required: false
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
  cursor: text;
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
  top: -8px;
  left: ${(props) => (props.icon ? '34' : '0')}px;
  right: 8px;
  z-index: 4;
  font-size: 10px;
  color: ${colors.primary};
  padding: 0px 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  span {
    background: #fff;
    padding: 0 4px;
  }
`

const InputPlaceholder = styled.span`
  color: #aaa;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: calc(100% - 50px);
`

const SelectedContainer = styled.span`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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

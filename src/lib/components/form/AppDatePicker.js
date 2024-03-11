import React, { useCallback, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import InputMask from 'react-input-mask'
import Moment from 'moment'
import { createPortal } from 'react-dom'
import defaultColors from '../../constants/defaultColors'
import AppRemixIcon from '../icon/AppRemixIcon'
const colors = window.dovikaBasicElementsColors || defaultColors

const AppDatePicker = (props) => {
  const {
    value,
    onChange,
    title,
    placeholder,
    className,
    containerClassName,
    icon,
    required,
    error,
    isClearable,
    isDisabled,
    minDate,
    maxDate,
    dateFormat,
    displayDateFormat,
    filterDate,
    dropdownMode,
    showMonthDropdown,
    showYearDropdown,
    showMonthYearPicker,
    showYearPicker,
    hasToggleType,
    isTypeMode,
    mask,
    locale,
    popperClassName,
    popperContainer,
    ...others
  } = props

  const [typeMode, setTypeMode] = useState(isTypeMode)
  const [date, setDate] = useState(value)
  const inputManual = useRef(null)

  useEffect(() => {
    if (!isTypeMode) {
      setDate(
        value && Moment(value, displayDateFormat).isValid()
          ? Moment(value, displayDateFormat).toDate()
          : ''
      )
    }
  }, [value])

  const handleTypeMode = async () => {
    if (typeMode && inputManual?.current) {
      await onChange('')
      inputManual.current.focus()
    }
  }

  useEffect(() => {
    handleTypeMode()
  }, [typeMode, inputManual])

  const handleBlur = useCallback(() => {
    if (
      value &&
      (value.includes('_') || !Moment(value, displayDateFormat).isValid())
    )
      onChange('')
  }, [value])

  const handleOnChange = useCallback(
    (date) => {
      const stringDate = Moment(date).format(displayDateFormat)
      onChange(stringDate)
    },
    [onChange]
  )

  const setInputRef = (el) => {
    if (!inputManual.current) {
      inputManual.current = el
    }
  }

  return (
    <Container
      hasPointer={!typeMode}
      className={`${className}${
        isDisabled ? ' disabled' : ''
      } ${containerClassName}`}
    >
      <div className={`${hasToggleType && typeMode ? 'd-flex' : 'd-none'}`}>
        <span className={`outside${error ? ' error' : ''}`}>
          <InputMask
            mask={mask}
            onChange={(e) => onChange(e.target.value)}
            value={value || ''}
            placeholder={placeholder}
            onBlur={handleBlur}
            ref={setInputRef}
            disabled={isDisabled}
          />
        </span>
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
        <span className='input-icon-outside'>{icon}</span>
        {value && isClearable && (
          <span className='clearable' onClick={() => onChange('')}>
            <AppRemixIcon icon='close-circle' />
          </span>
        )}
        {hasToggleType && !isDisabled && (
          <span
            className='toggle-edit text-primary'
            onClick={() => setTypeMode(!typeMode)}
          >
            <AppRemixIcon icon='edit' />
          </span>
        )}
      </div>
      <DatePickerWrapper show={!hasToggleType || !typeMode}>
        <DatePicker
          locale={locale}
          selected={
            date && Moment(date, displayDateFormat).isValid()
              ? Moment(date, displayDateFormat).toDate()
              : ''
          }
          dateFormat={dateFormat}
          onChange={handleOnChange}
          minDate={minDate}
          maxDate={maxDate}
          showMonthDropdown={showMonthDropdown}
          showYearDropdown={showYearDropdown}
          showMonthYearPicker={showMonthYearPicker}
          showYearPicker={showYearPicker}
          filterDate={filterDate}
          dropdownMode={dropdownMode}
          popperClassName={popperClassName}
          popperContainer={popperContainer}
          disabled={isDisabled}
          customInput={
            <div>
              <span className={`outside${error ? ' error' : ''}`}>
                {date ? Moment(date).format(displayDateFormat) : ''}
              </span>
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
              <span className='input-icon-outside'>{icon}</span>
              {placeholder && (
                <span className={`placeholder ${value ? 'has-value' : ''}`}>
                  {placeholder}
                </span>
              )}
            </div>
          }
          {...others}
        />
        {hasToggleType && !isDisabled && (
          <span
            className='toggle-edit text-light'
            onClick={() => setTypeMode(!typeMode)}
          >
            <AppRemixIcon icon='edit' />
          </span>
        )}
        {value && isClearable && (
          <span className='clearable' onClick={() => onChange(undefined)}>
            <AppRemixIcon icon='close-circle' />
          </span>
        )}
      </DatePickerWrapper>
    </Container>
  )
}

export default AppDatePicker
AppDatePicker.defaultProps = {
  name: '',
  autoFocus: false,
  className: '',
  containerClassName: '',
  append: '',
  isDisabled: false,
  onKeyDown: () => {},
  icon: <AppRemixIcon icon='calendar' />,
  showMonthDropdown: false,
  showYearDropdown: false,
  showMonthYearPicker: false,
  showYearPicker: false,
  dateFormat: 'dd/MM/yyyy',
  displayDateFormat: 'DD/MM/YYYY',
  minDate: false,
  maxDate: false,
  filterDate: false,
  dropdownMode: 'scroll',
  hasToggleType: false,
  isTypeMode: false,
  mask: '99/99/9999',
  locale: 'en',
  popperClassName: 'react-datepicker-popper-100',
  popperContainer: ({ children }) => createPortal(children, document.body)
}

const Container = styled.div`
  display: flex;
  flex: 1 auto;
  flex-direction: column;
  position: relative;
  margin: 10px 0;
  width: 100%;
  cursor: ${(props) => (props.hasPointer ? 'pointer' : 'default')};
  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .outside {
    display: block;
    color: #555;
    width: 100%;
    font-size: 14px;
    height: 36px;
    line-height: 1.6;
    border: #ddd solid 1px;
    border-radius: 0;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    margin-bottom: -1px;
    padding: 6px 10px 6px 40px;
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
    height: 36px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 6px 10px 6px 40px;
    color: #aaa;
    z-index: 3;
    opacity: 1;
    transition: all ease 0.3s;
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
    top: 6px;
  }

  .has-value.placeholder {
    left: 50px;
    opacity: 0;
  }
  .floating-label-outside {
    position: absolute;
    pointer-events: auto;
    top: -7px;
    left: 34px;
    right: 8px;
    z-index: 4;
    font-size: 10px;
    color: ${colors.primary};
    background: transparent;
    padding: 0px 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    span {
      background: white;
      padding: 0 4px;
    }
  }
  .toggle-edit {
    position: absolute;
    right: 25px;
    top: 2px;
    z-index: 4;
    cursor: pointer;
    padding: 4px;
    color: ${colors.primary};
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
  input {
    border: 0px;
    color: #555 !important;
    padding: 0;
    width: 100%;
    &::placeholder {
      font-size: 14px !important;
      margin-left: 100px !important;
    }
  }
`

const DatePickerWrapper = styled.div`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  .react-datepicker-wrapper {
    width: 100%;
  }
`

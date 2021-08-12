import React from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import Moment from 'moment'
import defaultColors from '../../constants/defaultColors'
import AppRemixIcon from '../icon/AppRemixIcon'
const colors = window.dovikaBasicElementsColors || defaultColors

const AppDatePicker = (props) => {
  const {
    value,
    onChange,
    title,
    placeholder,
    icon,
    required,
    error,
    isClearable,
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
    locale,
    ...others
  } = props

  return (
    <Container>
      <DatePicker
        locale={locale}
        selected={value}
        dateFormat={dateFormat}
        onChange={(date) => onChange(date)}
        className='mb-2'
        minDate={minDate}
        maxDate={maxDate}
        showMonthDropdown={showMonthDropdown}
        showYearDropdown={showYearDropdown}
        showMonthYearPicker={showMonthYearPicker}
        showYearPicker={showYearPicker}
        filterDate={filterDate}
        dropdownMode={dropdownMode}
        customInput={
          <div>
            <span className={`outside  ${error ? 'error' : ''}`}>
              {value ? Moment(value).format(displayDateFormat) : ''}
            </span>
            <span className='floating-label-outside'>
              {title} {required && <span className='text-danger'>*</span>}{' '}
              {error && <small className='text-danger'>{error}</small>}
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
      {value && isClearable && (
        <span className='clearable' onClick={() => onChange(undefined)}>
          <AppRemixIcon icon='close-circle' />
        </span>
      )}
    </Container>
  )
}

export default AppDatePicker
AppDatePicker.defaultProps = {
  name: '',
  isField: false,
  autoFocus: false,
  clearable: false,
  append: '',
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
  locale: window.dovikaBasicElementsColors || 'en'
}

const Container = styled.div`
  display: flex;
  flex: 1 auto;
  flex-direction: column;
  position: relative;
  margin: 10px 0 0 0;
  width: 100%;
  cursor: pointer;
  .outside {
    display: block;
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
    top: 8px;
    left: 42px;
    right: 8px;
    color: #aaa;
    z-index: 3;
    opacity: 1;
    transition: all ease 0.3s;
    white-space: nowrap;
    overflow: hidden;
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

  .has-value.placeholder {
    left: 50px;
    opacity: 0;
  }
  .floating-label-outside {
    position: absolute;
    top: -7px;
    left: 34px;
    z-index: 4;
    font-size: 10px;
    color: ${colors.primary};
    background: #fff;
    padding: 0px 5px;
    white-space: nowrap;
    text-overflow: ellipsis;
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
`

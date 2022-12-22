import React from 'react'
import defaultTranslations from '../../constants/defaultTranslations'
import styled from 'styled-components'
import colors from '../colors'

const AppFileUploader = (props) => {
  const {
    id,
    value,
    isMulti,
    btnText,
    btnClass,
    onChange,
    isDisabled,
    placeholder,
    error,
    ...others
  } = props

  const translations =
    window.dovikaBasicElementsTranslations || defaultTranslations

  return (
    <Container
      className={`${isDisabled ? ' disabled' : ''}`}
      error={error}
      htmlFor={`upload-${id}`}
    >
      <div className='file-uploader'>
        {placeholder ||
          (isMulti
            ? defaultTranslations.selectMultipleFiles
            : defaultTranslations.selectSingleFile)}
      </div>
      <input
        id={`upload-${id}`}
        type='file'
        style={{ display: 'none' }}
        onChange={(e) => onChange(e.target.files)}
        multiple={isMulti}
        disabled={isDisabled}
        {...others}
      />
      <div className='upload-btn'>
        <label className={`m-0 btn ${isDisabled ? 'btn-secondary' : btnClass}`}>
          {btnText || translations.search}
        </label>
      </div>
    </Container>
  )
}

export default AppFileUploader

AppFileUploader.defaultProps = {
  isMulti: false,
  btnClass: 'btn-info',
  id: 0,
  isDisabled: false,
  placeholder: ''
}

const Container = styled.label`
  position: relative;
  display: flex;
  width: 100%;
  background-color: white;
  margin: 10px 0;
  cursor: pointer;
  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  border: ${(props) => (props.error ? colors.danger : '#ddd')} solid 1px;
  border-right: 0;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  .btn {
    border-radius: 0 !important;
  }
  .file-uploader {
    flex: 1 auto;
    padding: 4px 10px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    pointer-events: none;
    color: #aaa;
    line-height: 1.8;
  }
  .upload-btn {
    label {
      pointer-events: none;
      z-index: 0;
      &.btn {
        padding: 4px 10px;
      }
    }
  }
`

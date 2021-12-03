import React from 'react'
import defaultTranslations from '../../constants/defaultTranslations'
import styled from 'styled-components'
import colors from '../colors'

const AppFileUploader = (props) => {
  const {
    id,
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

  const handleOnChange = (files) => {
    onChange(files)
  }

  return (
    <Container className='input-group' isDisabled={isDisabled} error={error}>
      <span className='form-control file-uploader' title={placeholder}>
        {placeholder}
      </span>
      <input
        id={`upload-${id}`}
        type='file'
        style={{ display: 'none' }}
        onChange={(e) => handleOnChange(e.target.files)}
        multiple={isMulti}
        disabled={isDisabled}
        {...others}
      />
      {/* <label htmlFor={`upload-${id}`} className="file-uploader-label font-weight-light text-truncate"> */}
      {/*    {selectedFilesName} */}
      {/* </label> */}
      <div className='input-group-append'>
        <label
          htmlFor={`upload-${id}`}
          className={`m-0 btn ${isDisabled ? 'btn-secondary' : btnClass}`}
        >
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

const Container = styled.div`
  background-color: ${(props) => (props.isDisabled ? '#e9ecef' : 'white')};
  border: ${(props) => (props.error ? colors.danger : '#ddd')} solid 1px;
  border-right: 0;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  .btn {
    border-radius: 0 !important;
  }
  .file-uploader {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border: none !important;
    font-size: 15px !important;
  }

  .file-uploader-label {
    position: absolute;
    top: 50%;
    left: 0.5rem;
    transform: translateY(-50%);
    width: calc(100% - 100px);
  }

  .input-group-append {
    label {
      z-index: 0;
    }
  }
`

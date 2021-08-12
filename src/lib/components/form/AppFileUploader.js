import React from 'react'
import defaultTranslations from '../../constants/defaultTranslations'

const AppFileUploader = (props) => {
  const { id, isMulti, btnText, btnClass, onChange, isDisabled, ...others } = props

  const translations =
    window.dovikaBasicElementsTranslations || defaultTranslations

  const handleOnChange = (files) => {
    onChange(files)
  }

  return (
    <div
      className='input-group file-uploader-group'
      style={isDisabled ? { backgroundColor: '#e9ecef' } : {}}
    >
      <input
        id={`upload-${id}`}
        type='file'
        className='form-control file-uploader'
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
    </div>
  )
}

export default AppFileUploader

AppFileUploader.defaultProps = {
  isMultiple: false,
  btnClass: 'btn-info',
  id: 0,
  isDisabled: false
}

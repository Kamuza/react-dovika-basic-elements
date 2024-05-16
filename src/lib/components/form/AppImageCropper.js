import React, { useState, useRef, useEffect } from 'react'
import Cropper from 'react-easy-crop'
import styled from 'styled-components'
import AppRemixIcon from '../icon/AppRemixIcon'
import defaultColors from '../../constants/defaultColors'

const colors = window.dovikaBasicElementsColors || defaultColors

export default function AppImageCropper(props) {
  const {
    image,
    width,
    height,
    onSave,
    cropShape,
    showDeleteButton = true,
    bgImage = require('../../images/noUser.png')
  } = props
  const [isEditingAvatar, setIsEditingAvatar] = useState(false)
  const [isImgHover, setIsImgHover] = useState(false)
  const [isImgLoading, setIsImgLoading] = useState(false)
  const [editedImage, setEditedImage] = useState(null)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const canvasRef = useRef(null)
  const fileInput = useRef(null)

  useEffect(() => {
    setZoom(1)
    setEditedImage(null)
    setIsImgHover(false)
    setIsEditingAvatar(false)
    setIsImgLoading(false)
  }, [image])

  const openFileDialog = () => {
    if (!isImgLoading) {
      fileInput.current.click()
      setIsImgHover(false)
    }
  }

  const handleFileChange = (e) => {
    setIsImgHover(false)
    const file = e.target.files[0]
    if (verifyFile(file)) getBase64(file)
  }

  const getBase64 = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setEditedImage(reader.result)
      setIsEditingAvatar(true)
    }
    reader.onerror = (error) => console.log('Error: ', error)
  }

  const verifyFile = (file) => {
    if (file) {
      const acceptedFileTypes =
        'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
      const acceptedFileTypesArray = acceptedFileTypes
        .split(',')
        .map((item) => {
          return item.trim()
        })
      const currentFileType = file.type
      if (!acceptedFileTypesArray.includes(currentFileType)) {
        console.log('Sólo se permiten imágenes')
        return false
      }
      return true
    }
  }

  const saveAvatar = () => {
    setIsImgLoading(true)
    if (editedImage) {
      const savedImage = image64toCanvasRef(
        canvasRef,
        editedImage,
        croppedAreaPixels
      )
      onSave(savedImage)
    }
  }

  const removeAvatar = () => {
    setIsImgLoading(true)
    onSave(null)
  }

  const cancelAvatar = () => {
    setIsImgHover(false)
    setIsEditingAvatar(false)
    setEditedImage(null)
  }

  const onZoomChange = (zoom) => setZoom(zoom)

  const onCropChange = (crop) => setCrop(crop)

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
    if (editedImage && isEditingAvatar) {
      setEditedImage(editedImage)
    }
  }

  const image64toCanvasRef = (canvasRef, image64, pixelCrop) => {
    const canvas = canvasRef.current
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height
    const ctx = canvas.getContext('2d')
    const newImage = new Image()
    newImage.src = image64
    ctx.drawImage(
      newImage,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    )

    return canvas.toDataURL()
  }

  return (
    <>
      <Container
        className='mb-2 text-center d-flex justify-content-center align-items-center'
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {image && !isEditingAvatar && showDeleteButton && (
          <span
            className='top-right pointer btn btn-sm btn-danger cr-remove'
            title='Eliminar imagen de perfil'
            onClick={removeAvatar}
          >
            <AppRemixIcon icon='delete-bin' />
          </span>
        )}
        {editedImage && isEditingAvatar && (
          <span
            className='top-left pointer btn btn-sm btn-success'
            title='Guardar'
            onClick={saveAvatar}
          >
            <AppRemixIcon icon='check' />
          </span>
        )}
        {editedImage && isEditingAvatar && (
          <span
            className='top-right pointer btn btn-sm btn-danger'
            title='Cancelar'
            onClick={cancelAvatar}
          >
            <AppRemixIcon icon='close' />
          </span>
        )}
        {editedImage && isEditingAvatar ? (
          <>
            <Cropper
              image={editedImage}
              crop={crop}
              zoom={zoom}
              cropShape={cropShape || 'round'}
              showGrid={false}
              zoomSpeed={10}
              aspect={1}
              cropSize={{
                width: width - width * 0.1,
                height: height - height * 0.1
              }}
              onZoomChange={onZoomChange}
              onCropChange={onCropChange}
              onCropComplete={onCropComplete}
            />
            <div className='controls'>
              <input
                type='range'
                className='custom-range'
                onChange={(e) => setZoom(e.target.value)}
                min='1'
                max='7'
                step='0.01'
                value={zoom}
              />
            </div>
          </>
        ) : (
          <>
            <div
              className={`pointer ${
                (!cropShape || cropShape === 'round') && `img-circle`
              }`}
              style={{
                backgroundImage: `url(${image || bgImage})`,
                backgroundPosition: 'center center no-repeat',
                backgroundSize: 'cover',
                width: `${width}px`,
                height: `${height}px`
              }}
              onClick={openFileDialog}
              onMouseEnter={() => setIsImgHover(true)}
            />
            {isImgHover && !isImgLoading && (
              <div
                className={`img-profile-hover ${
                  (!cropShape || cropShape === 'round') && `img-circle`
                } pointer d-flex justify-content-center align-items-center`}
                style={{ width: `${width}px`, height: `${height}px` }}
                onClick={openFileDialog}
                onMouseEnter={() => setIsImgHover(true)}
                onMouseLeave={() => setIsImgHover(false)}
              >
                <AppRemixIcon icon='upload' size={30} color={colors.primary} />
              </div>
            )}
            <input
              type='file'
              ref={fileInput}
              className='d-none'
              accept='image/png, image/jpeg'
              onChange={(e) => handleFileChange(e)}
            />
          </>
        )}
        {isImgLoading && (
          <div className='img-profile-loading'>
            <AppRemixIcon icon='loader-4' />
            {/* <FontAwesomeIcon icon={faCircleNotch} size='2x' spin /> */}
          </div>
        )}
      </Container>
      <canvas className='d-none' ref={canvasRef} />
    </>
  )
}

const Container = styled.div`
  position: relative;
  margin: auto;
  .img-profile-hover {
    position: absolute;
    z-index: 999;
    opacity: 0.7;
    background-color: #ccc;
  }
  .img-profile-loading {
    position: absolute;
    z-index: 999;
    opacity: 0.7;
  }
  .top-left {
    position: absolute;
    bottom: -25px;
    left: -36px;
    z-index: 99999;
  }
  .top-right {
    position: absolute;
    bottom: -25px;
    right: -33px;
    z-index: 99999;
  }
  .cr-remove {
    opacity: 0;
  }
  &:hover {
    .cr-remove {
      opacity: 1;
    }
  }
  .controls {
    position: absolute;
    bottom: -32px;
  }
`

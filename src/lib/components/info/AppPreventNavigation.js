import React, { useEffect } from 'react'
import { Prompt } from 'react-router-dom'

export default function AppPreventNavigation(props) {
  const {
    message = '¿Seguro que quiere salir de la página? Se perderán los datos no guardados.'
  } = props
  useEffect(() => {
    let isSubscribed = true
    if (isSubscribed) window.onbeforeunload = () => true
    return () => {
      window.onbeforeunload = () => undefined
      isSubscribed = false
    }
  }, [])

  return <Prompt when message={message} />
}

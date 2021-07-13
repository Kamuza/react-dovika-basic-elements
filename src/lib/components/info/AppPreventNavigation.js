import React, { useEffect } from 'react'
import { Prompt } from 'react-router-dom'

const AppPreventNavigation = (props) => {
  const { message } = props
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

export default AppPreventNavigation
AppPreventNavigation.defaultProps = {
  message:
    '¿Seguro que quiere salir de la página? Se perderán los datos no guardados.'
}

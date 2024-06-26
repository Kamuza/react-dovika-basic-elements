import { store as alert } from 'react-notifications-component'

export default function AppNotificationAlert(props) {
  const { title, message, type, position, duration = 5000, ...others } = props

  if (type) {
    alert.addNotification({
      title: title || 'Info',
      message: message,
      type: type || 'info',
      insert: 'top',
      container: position || 'top-right',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: {
        // duration: duration ? duration === 'no' ? 0 : duration : 5000,
        duration: duration,
        showIcon: duration === 0
      },
      ...others
    })
  }
  return null
}

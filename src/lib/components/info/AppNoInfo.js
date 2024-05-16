import React from 'react'
import styled from 'styled-components'
import defaultColors from '../../constants/defaultColors'
import AppRemixIcon from '../icon/AppRemixIcon'

const colors = window.dovikaBasicElementsColors || defaultColors

export default function AppNoInfo(props) {
  const {
    icon,
    text,
    color = colors.primary,
    spin = false,
    button,
    buttonOnClick,
    minHeight,
    iconSize = 34,
    separation = '20px'
  } = props

  return (
    <Container minHeight={minHeight || null}>
      {!icon && !spin ? (
        <Spinner>
          <AppRemixIcon icon='loader-4' color={color} size={iconSize} />
        </Spinner>
      ) : spin ? (
        <Spinner>
          {icon || (
            <AppRemixIcon icon='loader-4' color={color} size={iconSize} />
          )}
        </Spinner>
      ) : (
        icon
      )}
      <p style={{ color: color || '#ccc', marginTop: separation }}>{text}</p>
      {button && (
        <span className='btn-default' onClick={buttonOnClick}>
          {button}
        </span>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  ${(props) => props.minHeight && `min-height: ${props.minHeight}px;`}
  text-align: center;
`

const Spinner = styled.div`
  -webkit-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
  -ms-transform-origin: 50% 50%; /* IE 9 */
  -webkit-animation: spin 2s infinite linear;
  -moz-animation: spin 2s infinite linear;
  -o-animation: spin 2s infinite linear;
  animation: spin 2s infinite linear;

  @-moz-keyframes spin {
    from {
      -moz-transform: rotate(0deg);
    }
    to {
      -moz-transform: rotate(360deg);
    }
  }

  @-webkit-keyframes spin {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

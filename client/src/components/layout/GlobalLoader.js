import React from 'react'
import { useIsFetching } from 'react-query'
import { ImSpinner2 } from 'react-icons/im'
import styled, { css, keyframes } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`


const rotateRule = css`
  ${rotate} 1s linear infinite;
`

const LoaderComponent = styled(ImSpinner2)`
  vertical-align: middle;
  animation: ${rotateRule}
  font-size: 1.5rem;
  transition: 0.1s ease;
  pointer-events: none;
`

export default function GlobalLoader() {
  const isFetching = useIsFetching()

  return (
    <LoaderComponent
      style={{
        opacity: isFetching ? 1 : 0,
      }}
    />
  )
}
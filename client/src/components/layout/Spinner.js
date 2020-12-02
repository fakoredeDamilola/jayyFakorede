import React from 'react'

export default function Spinner(props) {
  let { value } = props
  return (
    <div className="lds-wrapper">

      <div className="lds-text">{value}</div>
      <div className="lds-hourglass"></div>
    </div>

  )
}

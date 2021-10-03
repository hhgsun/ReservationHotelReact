import React from 'react'

export default function AlertBox({ message }) {
  return (
    <div className="alert-box" style={{ backgroundColor: "bisque"}}>
      { message }
    </div>
  )
}

import React from 'react'
import snake from "../Snake.gif"

export default function Loading() {
  return (
    <div style={{textAlign:"center",marginTop:10}}>
      <img src={snake} alt="Loading" />
    </div>
  )
}

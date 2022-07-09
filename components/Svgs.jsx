import React from 'react'

export function LineSVG() {
  return (
    <svg className='line-svg' mlns="http://www.w3.org/2000/svg"
      width="70%" height="40" stroke="#000" strokeWidth="1px" preserveAspectRatio="xMidYMid meet"> 
      <path d="M0 0 H 1000 0"/>
      <path d="M0 5 H 1000 0"/>
    </svg>
  )
}
export function LineSVGFull() {
  return (
    <svg className='line-svg' mlns="http://www.w3.org/2000/svg"
      width="100%" height="40" stroke="#000" strokeWidth="1px" preserveAspectRatio="xMidYMid meet"> 
      <path d="M0 0 H 1000 0"/>
      <path d="M0 5 H 1000 0"/>
    </svg>
  )
}

export function LeftCrossSVG() {
  return (
    <svg className='cross-svg' mlns="http://www.w3.org/2000/svg"
        width="100%" height="100%" stroke="#00000090" strokeWidth="1" preserveAspectRatio="xMidYMid meet"> 
    <path d="M 0 50 H 10 50"/>
    <path d="M 50 0 V 50 100"/>
    </svg>
  )
}
export function RightCrossSVG() {
  return (
    <svg className='cross-svg' mlns="http://www.w3.org/2000/svg"
        width="100%" height="100%" stroke="#00000090" strokeWidth="1" preserveAspectRatio="xMidYMid meet"> 
    <path d="M 0 50 H 10 50"/>
    <path d="M 1 0 V 50 100"/>
    </svg>
  )
}

export function DownChevronSVG() {
  return (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
  </svg>
  )
}

export function UpChevronSVG() {
  return (
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
</svg>
  )
}


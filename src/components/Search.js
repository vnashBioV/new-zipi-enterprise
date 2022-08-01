import React from 'react'
import '../css/search.css'

export default function Search(props) {
  return (
    <div className='search'>
        {props.children}
    </div>
  )
}

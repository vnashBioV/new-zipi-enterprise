import React from 'react'
import '../css/contacts.css'

export default function ContactsDetails(props) {
  return (
    <div className='contacts-details'>
        {props.children}
    </div>
  )
}

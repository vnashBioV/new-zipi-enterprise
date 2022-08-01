import React from 'react'
import {Avatar} from '@mui/material';
import logo from '../icons/zipilogoo.png'
import {Link, useNavigate } from "react-router-dom";
import '../css/enterprisenav.css'
import firebase from '../firebase-config';


export default function EnterpriseNav({name}) {
    // const name = "Jane Doe";
    const iconName = name.substring(0,2);
    const navigate = useNavigate();

  return (
    <div className='nav-container'>
        <div className='nav'>
            <div className='logo'>
                <img src={logo} alt="" />
                <p>enterprise</p>
            </div>
            <div className='profile'>
                <p>{name}</p>
                <Avatar className='Enterprise-icon'>{iconName.toUpperCase()}</Avatar>
                <i className="fa-solid fa-chevron-down chearrow"></i>
                <ul className='dropdown-wrapper'>
                    <li><Link to="/tracking"><i className="fa-solid fa-location-arrow"></i>Tracking</Link></li>
                    <li><Link to="/schedule"><i className="fa-solid fa-calendar"></i>Schedule</Link></li>
                    <li><Link to="/bidding"><i className="fa-solid fa-clipboard-list"></i>Requets</Link></li>
                    <li><Link to="" onClick={()=> {
                        firebase.auth().signOut().then(() => {
                            navigate('/')
                          }).catch((error) => {
                            alert(error)
                          });
                    }}><i class="fa-solid fa-arrow-right-from-bracket"></i>Logout</Link></li>
                </ul>
            </div>
        </div>
    </div>
  )
}


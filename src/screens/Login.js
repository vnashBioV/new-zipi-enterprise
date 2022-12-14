import React, { useState } from 'react'
import logo from '../icons/we-tracking-logo.png';
import firebase from '../firebase-config';
import { Link, useNavigate  } from 'react-router-dom';
import '../css/login.css'

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType,  setUserType] = useState("");
    const navigate = useNavigate();

    const authenticateUser = (e) =>{
      e.preventDefault()
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        if(userType === "pick up"){
          navigate('/pickup')
        }else if(userType === "fleet owner"){
          navigate('/home')
        }else if(userType === "zipi"){
          navigate('/enterprise')
        }
        console.log(user)
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
      });

      setEmail('')
      setPassword('')
  }


  return (
    <div className='login' style={{height:"100vh"}}>
        <div className='side-section'>
            <img src={logo} alt="" />
        </div>
        <form action="" className='login-form'>
            <div className='header-container'>
              <h1 className='heading-text-login' style={{fontSize:"35px", marginBottom:"14px"}}>Sign in</h1>
            </div>
            <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
            <select 
                className='select-option login-select'
                onChange={(e) => setUserType(e.target.value)}
            >
                <option value="">User Type</option>
                <option value="fleet owner">Fleet Owner</option>
                <option value="zipi">Zipi</option>
                <option value="pick up">Pick up</option>
                <option value="drop off">Drop off</option>
            </select>
            <button className='login-btn register-btn' onClick={authenticateUser}>Login <i class="fa-solid fa-arrow-right"></i></button>
            <h2>or</h2> <Link to='/registration'>Create an account</Link>
        </form>
    </div>
  )
}

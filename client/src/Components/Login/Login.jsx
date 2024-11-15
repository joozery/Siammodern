import React, {useEffect, useState} from 'react'
import './Login.css'
import '../../App.css'
import { Link, useNavigate} from 'react-router-dom'
import Axios from 'axios'

// Import our assets
import video from '../../LoginAssets/palm.mp4'
import logo from '../../LoginAssets/logopalm.png'

//IMported Icons
import {FaUserShield} from 'react-icons/fa'
import {BsFillShieldLockFill} from 'react-icons/bs'
import {AiOutlineSwapRight} from 'react-icons/ai'



const Login = () => {
 

  // Usestate Hook to store inputs
  const [loginUserName, setLoginUserName] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const navigateTo = useNavigate()

  // Let us now show the message to the user
  const [loginStatus, setLoginStatus] = useState('')
  const [statusHolder, setstatusHolder] = useState('message')


   // Onclick let us get what the user has entered
   const loginUser = (e)=>{
    // Lets prevent submitting
    e.preventDefault();
    // We shall require Axios to create an API that connects to the server - lets install that 
    Axios.post('http://localhost:3002/login', {
      // create variable to send to the server through the route
      LoginUserName: loginUserName, 
      LoginPassword: loginPassword
    }).then((response)=>{
      // I want to catch the response first - We have data successully from the database and we can catch an error if the credentails are wrong.
     if(response.data.message || loginUserName == '' || loginPassword == ''){
      // if credential dont match
      navigateTo('/') //so we shall navigate to the same login page
      setLoginStatus(`Credentials Don't Exist!`)
      console.log(`Credentials Don't Exist!`)
     }
     else{
      navigateTo('/dashboard') //if the credentils match we shall navigate to the dashboard
     }
    })
  }

  useEffect(()=>{
  if(loginStatus !== ''){
    setstatusHolder('showMessage') //show message
    setTimeout(() => {
      setstatusHolder('message') //hide it after 4s
    }, 4000);
  }
  }, [loginStatus])


  // Lets clear the form on submit
  const onSubmit = ()=>{
    setLoginUserName('')
    setLoginPassword('')
  }


  return (
    <div className='loginPage flex'>
      <div className="container flex">

        <div className="videoDiv">
        <video src={video} autoPlay muted loop></video>

        <div className="textDiv">
          <h2 className='title'>SIAM MODERN PALM COMPANY LIMITED</h2>
          <p>บริษัท สยามโมเดิร์นปาล์ม จำกัด</p>
        </div>

        <div className="footerDiv flex">
          <span className="text">หากคุณยังไม่มีบัญชีใช้งาน ?</span>
          <Link to={'/register'}>
          <button className='btn'>ติดต่อผ่ายดูแล</button>
          </Link>
        </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo Image" />
            <h3>ยินดีต้อนรับสู่ระบบ</h3>
          </div>

          <form className='form grid' onSubmit={onSubmit}>
            <span className={statusHolder}>{loginStatus}</span>

            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <FaUserShield className='icon'/>
                <input type="text" id='username' placeholder='Enter Username'
                onChange={(event)=>{
                  setLoginUserName(event.target.value)
                }}/>
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className='icon'/>
                <input type="password" id='password' placeholder='Enter Password' onChange={(event)=>{
                  setLoginPassword(event.target.value)
                }}/>
              </div>
            </div>

            <button type='submit' className='btn flex' onClick={loginUser}>
              <span>เข้าสู่ระบบ</span>
              <AiOutlineSwapRight className='icon'/>
            </button>

            <span className='forgotPassword'>
              Forgot your password? <a href="">Click Here</a>
              <p>by woo you creative</p>
            </span>

          </form>
        </div>

      </div>
    </div>
  )
}

export default Login
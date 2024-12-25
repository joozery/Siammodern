import React, {useState}from 'react'
import './Register.css'
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
import {MdMarkEmailRead} from 'react-icons/md'



const Register = () => {
  // UseState to hold our inputs
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const navigateTo = useNavigate()

  // Onclick let us get what the user has entered
  const createUser = (e)=>{
    e.preventDefault()
    // We shall require Axios to create an API that connects to the server - lets install that 
    Axios.post('http://localhost:3002/register', {
      // create variable to send to the server through the route
      Email: email,
      UserName: userName, 
      Password: password
    }).then(()=>{
      // On register let us redirect the user to the login page
      navigateTo('/')

      // Let us clear the fields too
      setEmail('')
      setUserName('')
      setUserName('')

    })
  }


  return (
    <div className='registerPage flex'>
      <div className="container flex">

        <div className="videoDiv">
        <video src={video} autoPlay muted loop></video>

        <div className="textDiv">
          <h2 className='title'>ติดต่อผู้ดูแลเพื่อเพิ่มบัญชี</h2>
          <p>แผนกจัดหาหรือผ่านไอทีของบริษัท</p>
        </div>

        <div className="footerDiv flex">
          <span className="text">หากคุณยังไม่มีบัญชีใช้งานแล้ว</span>
          <Link to={'/'}>
          <button className='btn'>เข้าสู่ระบบ</button>
          </Link>
        </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo Image" />

          </div>

          <form action="" className='form grid dashboard'>

            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className="input flex">
                <MdMarkEmailRead className='icon'/>
                <input type="email" id='email' placeholder='Enter Email' onChange={(event)=>{
                  setEmail(event.target.value)
                }}/>
              </div>
            </div>


            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <FaUserShield className='icon'/>
                <input type="text" id='username' placeholder='Enter Username'  onChange={(event)=>{
                  setUserName(event.target.value)
                }}/>
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className='icon'/>
                <input type="password" id='password' placeholder='Enter Password'   onChange={(event)=>{
                  setPassword(event.target.value)
                }}/>
              </div>
            </div>

            <button type='submit' className='btn flex' onClick={createUser}>
              <span>ลงทะเบียน</span>
              <AiOutlineSwapRight className='icon'/>
            </button>

            <span className='forgotPassword'>
              Forgot your password? <a href="">Click Here</a>
            </span>

          </form>
        </div>

      </div>
    </div>
  )
}

export default Register
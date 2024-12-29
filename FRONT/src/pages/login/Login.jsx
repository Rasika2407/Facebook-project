import { useState } from "react";
import "./login.css";
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const handleLogin = async(e)=>{
    e.preventDefault();
    const payload = {email, password}
    try{
      const response = await fetch('http://localhost:3000/api/auth/login',{
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(payload),
      })
      if(response.ok){
        const data = await response.json()
        console.log('login Successfull', data);
        navigate('/')
      }else{
        let data = await response.json()
        setErrorMessage(data.message)
      }
    }catch(error){
      console.error('Error:', error);
    }
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Facebook</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Facebook.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input placeholder="Email" className="loginInput" value={email} onChange={(e)=>setEmail(e.target.value)}/>

            <input placeholder="Password" className="loginInput" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <Link to='/'>
            <button className="loginButton" onClick={handleLogin}>Log In</button>
            </Link>

            {errorMessage && <div className="error">{errorMessage}</div>}

            <span className="loginForgot">Forgot Password?</span>
            <Link to='/login'>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}



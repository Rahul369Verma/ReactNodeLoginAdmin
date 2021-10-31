import React, { useState, useContext } from "react"
import axios from "axios"
import { Context } from '../context';
import { useHistory } from 'react-router-dom';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css"


const Register = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errMess, setErrMess] = useState("")


  const { state, dispatch } = useContext(Context);

  const history = useHistory()

  const getName = (e) => {
    setName(e.target.value)
  }
  const getEmail = (e) => {
    setEmail(e.target.value)
  }
  const getPassword = (e) => {
    setPassword(e.target.value)
  }
  const formSubmit = async (e) => {
    e.preventDefault();
    const registerData = {
      name,
      email,
      password,
      type: "normal"
    }
    try {
      const response = await axios.post('http://localhost:5000/register', registerData)
      if (response.data.register === true) {
        console.log(response.data.message);
        history.push("/login")
      } else {
        console.log(response.data.message);
        setErrMess(response.data.message)
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (state.email && state.username) {
    history.push("/user")
  }


  return (
    <div className="outer">
      <form className="inner" onSubmit={formSubmit}>
        <h3>Register</h3>
        <p style={{ marginRight: '30px' }}>{errMess}</p>
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={name} onChange={getName}
           className="form-control" placeholder="First name" />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={getEmail}
           className="form-control" placeholder="Enter email" />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={getPassword}
           className="form-control" placeholder="Enter password" />
        </div>

        <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
        <p className="forgot-password text-right">
          Already registered <a href="/login">log in?</a>
        </p>
      </form>
    </div>
  )
}

export default Register

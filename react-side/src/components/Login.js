import { useContext, useState } from "react"
import axios from "axios"
import { Context } from '../context';
import { useHistory } from 'react-router-dom';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css"


const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errMess, setErrMess] = useState("")

  const { state, dispatch } = useContext(Context);


  const history = useHistory()

  const getEmail = (e) => {
    setEmail(e.target.value)
  }
  const getPassword = (e) => {
    setPassword(e.target.value)
  }
  const formSubmit = async (e) => {
    e.preventDefault();
    const login = {
      email,
      password,
    }
    try {
      
      const response = await axios.post('http://localhost:5000/login', login, {
        withCredentials: true
      })
      // const user = JSON.stringify(response.data)
      window.sessionStorage.setItem("user", JSON.stringify(response.data))
      dispatch({
        type: "LOGIN",
        payload: response.data
      })
      history.push("/user")
    } catch (error) {
      setErrMess(error.response?.data)
      console.log(error.response);
    }
  }
  
  if (state.email && state.username) {
    history.push("/user")
  }

  return (
    <div className="outer">
      <form className="inner" onSubmit={formSubmit}>

        <h3>Log in</h3>
        <p style={{ marginRight: '30px' }}>{errMess}</p>
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

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="customCheck1" />
            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
          </div>
        </div>

        <button type="submit" className="btn btn-dark btn-lg btn-block">Login</button>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    </div>
  )
}

export default Login

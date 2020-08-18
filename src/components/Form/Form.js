import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import Auth from '../../Auth/Authentication'
function Form(props) {
  const [state, setState] = useState({
    username: "",
    password: ""
  })
  const handleChange = (e) => {
    const { id, value } = e.target
    setState(prevState => ({
      ...prevState,
      [id]: value,
      'successMessage': ''

    }))
  }
  const redirectToHome = () => {

    props.history.push('/home');
  }

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (state.username.length && state.password.length) {

      const payload = {
        "uname": state.username,
        "pass": state.password,
      }
      axios.post("https://putforshare.herokuapp.com/login/", payload)
        .then(function (response) {
          console.log(response)
          if (response.status === 200) {
            if (response.data == "true") {


              setState(prevState => ({
                ...prevState,
                'successMessage': 'Login successful.'
              }))
              console.log(Auth.isAuthenticated());
              Auth.login(() => {
                console.log(Auth.isAuthenticated());
                redirectToHome();
              })
            } else {
              setState(prevState => ({
                ...prevState,
                'successMessage': 'Login failed.'
              }))
            }

          } else {

            setState(prevState => ({
              ...prevState,
              'successMessage': 'Login failed.'
            }))
          }
        })
        .catch(function (error) {
          alert(error);
        });
    } else {

    }

  }
  return (
    <div className="container">
      <div className="row justify-content-lg-around my-5">
        <div className="pb-5 border bg-white col-lg-4 ">

          <form className="p-3" >
            <div className="text-center">
              <h1 className="display-4 mb-4">Login</h1>
            </div>

            <div className="form-group text-left">

              <label htmlFor="username">Username</label>
              <input type="text" className="form-control"
                value={state.username}
                id="username"

                onChange={handleChange}
              />
            </div>
            <div className="form-group text-left">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control"
                value={state.password}
                id="password"
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block"
              onClick={handleSubmitClick}
            >Submit</button>
          </form>
          <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
            {state.successMessage}
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Form);
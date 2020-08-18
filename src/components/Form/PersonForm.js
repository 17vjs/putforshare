import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import Auth from '../../Auth/Authentication'
function PersonForm(props) {
  const [state, setState] = useState({
    name: "",
    email: "",
    mobile: "",
    profilePic: "",
    multiple: false,
    persons: [],

  })
  const handleCheck = (e) => {
    const { checked } = e.target
    console.log(checked)
    setState(prevState => ({
      ...prevState,
      multiple: checked,
      'successMessage': ''

    }))
  }
  const handleChange = (e) => {
    const { id, value } = e.target
    console.log(value)
    setState(prevState => ({
      ...prevState,
      [id]: value,
      'successMessage': ''

    }))
  }


  const handleSubmitClick = (e) => {

    e.preventDefault();
    console.log(state.profilePic)
    if (state.name.length && state.mobile.length && state.email.length && state.profilePic != "") {
      const formData = new FormData()
      formData.append(
        state.mobile + "_" + state.profilePic.name,
        state.profilePic,
        state.mobile + "_" + state.profilePic.name
      )

      const payload = {
        "name": state.name,
        "mobile": state.mobile,
        "email": state.email,
        "profilePic": state.mobile + "_" + state.profilePic.name
        ,
        "file": formData,

      }
      if (state.multiple == true) {

        setState(prevState => ({
          ...prevState,
          persons: state.persons.concat(payload),

        }))

        return;
      }
      console.log(payload)

      axios.post("https://putforshare.herokuapp.com/addPerson/", payload)
        .then(function (response) {
          console.log(response)
          if (response.status === 200) {
            if (response.data == "true") {
              axios.post("https://putforshare.herokuapp.com/set-image/", payload["file"]).then(function (res) { console.log(res) }).catch(function (error) {
                alert(error);
              });

              setState(prevState => ({
                ...prevState,
                'successMessage': 'Data sent successfully.'
              }))

            } else {
              setState(prevState => ({
                ...prevState,
                'successMessage': 'failed to add'
              }))
            }

          } else {

            setState(prevState => ({
              ...prevState,
              'successMessage': 'failed to add'
            }))
          }
        })
        .catch(function (error) {
          alert(error);
        });
    } else {
      alert("All fields are mandatory");
    }

  }
  const handleMultiplePersonClick = (e) => {
    e.preventDefault();

    const payload = state.persons
    console.log(payload)
    var images = new FormData()
    for (var i in payload) {
      var person = payload[i]["file"];
      for (var pair of person.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
        images.append(
          pair[0],
          pair[1],
          pair[0]

        )
      }

    }
    console.log(images)
    if (payload.length) {

      axios.post("https://putforshare.herokuapp.com/addManyPerson/", payload)
        .then(function (response) {
          console.log(response)
          if (response.status === 200) {
            if (response.data == "true") {

              axios.post("https://putforshare.herokuapp.com/set-image/", images).then(function (res) { console.log(res) }).catch(function (error) {
                alert(error);
              });
              setState(prevState => ({
                ...prevState,
                'successMessage': 'Data sent successfully.'
              }))

            } else {
              setState(prevState => ({
                ...prevState,
                'successMessage': 'failed to add'
              }))
            }

          } else {

            setState(prevState => ({
              ...prevState,
              'successMessage': 'failed to add'
            }))
          }
        })
        .catch(function (error) {
          alert(error);
        });
    } else {
      alert("Empty list");
    }

  }
  const fileChangedHandler = (event) => {
    const file = event.target.files[0]
    console.log(file.type);
    if (file.type === "image/jpeg" || file.type === "image/png") {
      setState(prevState => ({
        ...prevState,
        profilePic: file,
        'successMessage': ''

      }))
    } else {
      alert("Only jpg and png files allowed");
    }
  }
  return (
    <div className="container">
      <div className="row py-5  justify-content-lg-around">
        <div className="pb-5  border bg-white col-lg-4 ">

          <form className="p-3" >
            <div className="form-group form-check">
              <input checked={state.multiple} onChange={handleCheck} type="checkbox" className="form-check-input" id="multiple" />
              <label className="form-check-label" htmlFor="multiple">Add many person</label>
            </div>
            <div className="form-group text-left">

              <label htmlFor="name">Name</label>
              <input type="text" className="form-control"
                value={state.name}
                id="name"
                onChange={handleChange}
              />
            </div>
            <div className="form-group text-left">

              <label htmlFor="mobile">Mobile</label>
              <input type="number" className="form-control"
                value={state.mobile}
                id="mobile"

                onChange={handleChange}
              />
            </div>
            <div className="form-group text-left">

              <label htmlFor="email">Email</label>
              <input type="email" className="form-control"
                value={state.email}
                id="email"

                onChange={handleChange}
              />
            </div>
            <div className="form-group text-left">
              <label htmlFor="profilePic">Profile Picture</label>
              {/* <input type="text" className="form-control"
                value={state.profilePic}
                id="profilePic"
                onChange={handleChange}
              /> */}
              <input className="form-control" type="file" onChange={fileChangedHandler} />
              {/* <button onClick={this.uploadHandler}>Upload!</button> */}
            </div>

            <button type="submit" className="btn btn-primary btn-block"
              onClick={handleSubmitClick}
            >Submit</button>
          </form>
          <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
            {state.successMessage}
          </div>
        </div>
        {state.multiple == true ? <div className="pb-5  border bg-white col-lg-4 ">
          <button type="submit" className="btn btn-success btn"
            onClick={handleMultiplePersonClick}
          >Add all</button>
          {state.persons.map(function (item) {
            return <div key={state.persons.indexOf(item)} >
              <p>{item.profilePic} </p>
              <p>{item.name}</p>
              <p>{item.mobile}</p>
              <p>{item.email}</p>
            </div>
          })}</div> : null}
      </div>
      <div className="row justify-content-lg-between">

      </div>
    </div>
  )
}

export default PersonForm;
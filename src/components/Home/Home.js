import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Auth from '../../Auth/Authentication';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import axios from 'axios';
import PersonForm from '../Form/PersonForm'
function Home(props) {
  const [state, setState] = useState({
    persons: [],
  });

  const redirectToLogin = () => {

    props.history.push('/login');
  }
  const handleSubmitClick = (e) => {
    console.log(Auth.isAuthenticated());
    e.preventDefault();
    Auth.logout(() => {
      console.log(Auth.isAuthenticated());
      redirectToLogin();
    })
  }
  const addPerson = (e) => {
    console.log(Auth.isAuthenticated());
    e.preventDefault();
    props.history.push('/home/hi');

  }
  const getAllPersons = () => {
    axios.get("https://putforshare.herokuapp.com/getAllPerson/")
      .then(function (response) {
        console.log(response.data);
        setState(prevState => ({
          ...prevState,

          persons: response.data["persons"]

        }))
      })
      .catch(function (error) {
        alert(error);
      });
  }
  useEffect(() => {
    getAllPersons();
    // do stuff here...
  }, [])
  return (
    <div >
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Put For Share
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
          </ul>

          <button type="submit" className="btn btn-danger "
            onClick={handleSubmitClick}
          >Logout</button>

        </div>
      </nav>
      <div className="container bg-light my-5">
        <Tabs

          onSelect={(index) => {
            if (index == 0) {
              getAllPersons();
            } else {
              console.log(index);

            }
          }}>
          <TabList>
            <Tab >Show Person</Tab>
            <Tab>Add Person</Tab>

          </TabList>

          <TabPanel>
            <div className="row justify-content-lg-between">
              {state.persons.map(function (item) {
                return <div key={state.persons.indexOf(item)} className="col-lg-6  bg-light" >
                  <img src={`https://putforshare.herokuapp.com/get-image/${item.profilePic}`}

                    height='100' width='100'></img>
                  <h1>{item.name}</h1>
                  <p>{item.mobile}</p>
                  <p>{item.email}</p>
                </div>
              })}
            </div>
          </TabPanel>
          <TabPanel>

            <PersonForm />

          </TabPanel>

        </Tabs>

      </div>

    </div >
  )
}

export default withRouter(Home);
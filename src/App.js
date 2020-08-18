import React from 'react';
import './App.css';
import Home from './components/Home/Home';
import Form from './components/Form/Form';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute';
import { ProtectedRouteLogin } from './ProtectedRoute/ProtectedRouteLogin';

function App() {

  return (
    <Router>
      <div className="App">

        <Switch>
          <ProtectedRouteLogin exact path="/login"

            component={Form}
          />

          <ProtectedRoute exact path="/home"

            component={Home}
          />

          <Route path="*" component={() => <h1 className="display-4" style={{ color: "blue", backgroundColor: "InfoBackground" }}>404 Not Found</h1>} />

        </Switch>
      </div>

    </Router>
  );
}

export default App;

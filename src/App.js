import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Login from "./Routes/Login";
import Dashboard from "./Routes/Dashboard";

class App extends Component {
  render() {
    return (
      <div>
        <Route
          exact path="/"
          render={({ match }) => { return <Login />; }}
        />
        <Route
          exact path="/dashboard"
          render={({ match }) => { return <Dashboard />; }}
        />
      </div>
    );
  }
}
export default App;
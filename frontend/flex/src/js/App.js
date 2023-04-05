import '../style/App.css';
import Authentication from './Authentication';
import Homepage from './Homepage';
import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { withRouter } from './withRouter';

class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      loggedIn: false, 
      username: ""
    }
  }

  userLogin(username) {
    this.setState({
      loggedIn: true,
      username: username
    })

    this.props.navigate('/home');
  }

  userLogout() {
    this.setState({
      loggedIn: false,
      username: ""
    })
  }

  render() {
    /*
    Router info:
    '*' covers all paths that aren't known. 
    */
    return (
      <>
        <Routes>
          <Route path="*" element={
            this.state.loggedIn ? (
              <Navigate to="/home" />
            ) : (
              <Navigate to="/auth" />
            )
          } />
          <Route path="/auth" element={<Authentication userLogin={(username) => this.userLogin(username)} />} />
          <Route path="/home" element={<Homepage userLogout={() => this.userLogout()} username={this.state.username} />} />
        </Routes>
      </>
    )
    // this.state.loggedIn ? <Homepage userLogout={() => this.userLogout()} username={this.state.username}></Homepage> : <Authentication userLogin={(username) => this.userLogin(username)}></Authentication>;
  }
}

export default withRouter(App);

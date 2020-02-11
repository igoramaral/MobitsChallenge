import React, { Component } from "react";
import AuthService from "../services/AuthService";

import logo from "../assets/logo.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      logged: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.loginClicked = this.loginClicked.bind(this);
  }

  loginClicked() {
    let user = this.state.username;
    let pass = this.state.password;
    localStorage.setItem("account", user);
    AuthService.makeLogin(user, pass).then(response => {
      if (response.status === 200 && response.data.jwt) {
        let jwt = response.data.jwt;
        console.log(jwt);
        localStorage.setItem("token", jwt);
      }
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div id="login" className="text-center">
        <form className="form-signin">
          <img src={logo} className="img-fluid" alt="Mobits Bank"></img>
          <h3 className="mb-3 font-weigth-normal text-secondary">
            Please sign in
          </h3>
          <label htmlFor="username" className="sr-only">
            Account:
          </label>
          <input
            id="username"
            type="text"
            name="username"
            className="form-control"
            value={this.state.username}
            placeholder="Account Number"
            onChange={this.handleChange}
            required
            autoFocus
          />
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="form-control"
            value={this.state.password}
            placeholder="Password"
            onChange={this.handleChange}
            required
          />
          <a href="/" className="btn btn-primary" onClick={this.loginClicked}>
            Sign In
          </a>
        </form>
      </div>
    );
  }
}

export default Login;

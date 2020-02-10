import React, { Component } from "react";
import AuthService from "../services/AuthService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.loginClicked = this.loginClicked.bind(this);
  }

  loginClicked() {
    let user = this.state.username;
    let pass = this.state.password;
    AuthService.makeLogin(user, pass).then(() => {
      if (AuthService.isAuthenticated) {
        localStorage.setItem("account", user);
        this.props.history.push(`/`);
      }
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div>
        <h1>Welcome to Mobits Bank!</h1>
        <h3>Please Login</h3>
        User Name:{" "}
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <br></br>
        Password:{" "}
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <a href="/" className="btn btn-primary" onClick={this.loginClicked}>
          Sign In
        </a>
      </div>
    );
  }
}

export default Login;

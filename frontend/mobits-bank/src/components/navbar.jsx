import React, { Component } from "react";
import AuthService from "../services/AuthService";
import logo from "../assets/logo.png";

class NavBar extends Component {
  logout = () => {
    AuthService.logout();
  };

  render() {
    return (
      <nav className="navbar fixed-top navbar-light bg-light">
        <a href="/" className="navbar-brand h1">
          <img src={logo} height="33" alt="Mobits Bank"></img>
        </a>
        {localStorage.getItem("token") && (
          <a
            href="/"
            id="btnLogout"
            className="btn btn-primary"
            onClick={this.logout}
          >
            Logout
          </a>
        )}
      </nav>
    );
  }
}

export default NavBar;

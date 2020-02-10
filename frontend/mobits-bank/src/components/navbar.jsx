import React, { Component } from "react";
import AuthService from "../services/AuthService";

class NavBar extends Component {
  logout = () => {
    AuthService.logout();
  };

  render() {
    return (
      <nav className="navbar-light bg-light">
        <a href="/" className="navbar-brand h1">
          Mobits Bank{" "}
        </a>
        {localStorage.getItem("account") && (
          <a href="/" className="btn btn-primary" onClick={this.logout}>
            Logout
          </a>
        )}
      </nav>
    );
  }
}

export default NavBar;

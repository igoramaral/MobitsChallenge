import React, { Component } from "react";

class Footer extends Component {
  render() {
    const divStyle = {
      marginTop: "20px"
    };

    return (
      <footer className="mastfoot mt-auto">
        <div className="inner" style={divStyle}>
          <p className="text-muted">
            Created by
            <a href="https://github.com/igoramaral/"> Igor Amaral</a> for the
            Mobits internship selection process.
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;

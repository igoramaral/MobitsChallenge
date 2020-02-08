import React, { Component } from "react";
import NavBar from "./components/navbar";
import Account from "./components/account";
import AccountDataService from "./services/AccountDataService";

class App extends Component {
  state = {
    account: {}
  };

  refreshAccount = () => {
    AccountDataService.retriveAccount().then(response => {
      this.setState({ account: response.data });
    });
  };

  componentDidMount() {
    this.refreshAccount();
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Account account={this.state.account} />
        </main>
      </React.Fragment>
    );
  }
}

export default App;

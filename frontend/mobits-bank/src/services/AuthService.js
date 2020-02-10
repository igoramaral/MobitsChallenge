import axios from "axios";

const API_URL = "http://shimes.dlinkddns.com:8080/authenticate";

class AuthService {
  makeLogin = async (username, password) => {
    const req = {
      username: username,
      password: password
    };

    console.log("Making call to athentication api...");
    return axios.post(`${API_URL}`, req);
  };

  isAuthenticated() {
    if (localStorage.getItem("token")) {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem("account");
    localStorage.removeItem("token");
  }
}

export default new AuthService();

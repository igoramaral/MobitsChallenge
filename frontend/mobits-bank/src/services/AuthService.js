import axios from "axios";

const API_URL = "http://192.168.0.109:8080/authenticate";

class AuthService {
  makeLogin = async (username, password) => {
    const req = {
      username: username,
      password: password
    };

    try {
      let response = await axios.post(`${API_URL}`, req);
      if (response.status === 200 && response.data.jwt) {
        let jwt = response.data.jwt;
        localStorage.setItem("token", jwt);
      }
    } catch (e) {
      console.log(e);
    }
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

import axios from "axios";

//const ACCOUNT = "12345";
const API_URL = "http://localhost:8080/api/v1/account";
const headers = {
  headers: { authorization: "Bearer " + localStorage.getItem("token") }
};

class AccountDataService {
  retriveAccount(account) {
    return axios.get(`${API_URL}/${account}`, headers);
  }
}

export default new AccountDataService();

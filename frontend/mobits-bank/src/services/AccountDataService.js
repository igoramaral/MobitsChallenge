import axios from "axios";

//const ACCOUNT = "12345";
const API_URL = "http://192.168.0.109:8080/api/v1/account";

class AccountDataService {
  retriveAccount(account) {
    return axios.get(`${API_URL}/${account}`);
  }
}

export default new AccountDataService();
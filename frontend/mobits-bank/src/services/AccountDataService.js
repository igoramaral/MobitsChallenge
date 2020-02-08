import axios from "axios";

const ACCOUNT = "12345";
const API_URL = "http://localhost:8080/api/v1/account";

class AccountDataService {
  retriveAccount() {
    return axios.get(`${API_URL}/${ACCOUNT}`);
  }
}

export default new AccountDataService();

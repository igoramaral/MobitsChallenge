import axios from "axios";

//const ACCOUNT = "12345";
const API_URL = "http://shimes.dlinkddns.com:8080/api/v1/account";
const headers = {
  headers: { Authorization: "Bearer " + localStorage.getItem("token") }
};

class AccountDataService {
  retriveAccount(account) {
    console.log("Making call to account api...");
    return axios.get(`${API_URL}/${account}`, headers);
  }
}

export default new AccountDataService();

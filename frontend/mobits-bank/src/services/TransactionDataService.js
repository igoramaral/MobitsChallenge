import axios from "axios";

//const ACCOUNT = "12345";
const API_URL = "http://192.168.0.109:8080/api/v1/transaction";
const headers = {
  headers: { authorization: "Bearer " + localStorage.getItem("token") }
};

class TransactionDataService {
  makeTransaction(accTo, accFrom, value, type) {
    const req = {
      id: null,
      date: null,
      accFrom: accFrom,
      accTo: accTo,
      value: value,
      transDesc: type
    };
    return axios.post(`${API_URL}`, req, headers);
  }

  getStatement(accNum) {
    return axios.get(`${API_URL}/${accNum}`, headers);
  }
}

export default new TransactionDataService();

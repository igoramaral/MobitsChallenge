import axios from "axios";

//const ACCOUNT = "12345";
const API_URL = "http://192.168.0.109:8080/api/v1/transaction";

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
    return axios.post(`${API_URL}`, req);
  }

  getStatement(accNum) {
    return axios.get(`${API_URL}/${accNum}`);
  }
}

export default new TransactionDataService();

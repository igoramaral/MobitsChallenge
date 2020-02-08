import axios from "axios";

//const ACCOUNT = "12345";
const API_URL = "http://localhost:8080/api/v1/transaction";

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
}

export default new TransactionDataService();

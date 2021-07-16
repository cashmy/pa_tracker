import axios from 'axios';
import authHeader from "./authHeader";

const API_URL = "https://localhost:44394/api/cptCode";

class CPTCodeService {
  getAllCPTCodes = () => {
    return axios.get(API_URL, { headers: authHeader() });
  };

  getCPTCode = (id) => {
    return axios.get(API_URL + `/${id}`, { headers: authHeader() });
  };

  addCPTCode = (data) => {
    return axios.post(API_URL, data, { headers: authHeader() });
  };

  updateCPTCode = (data) => {
    axios
        .put(API_URL + `/${data.cptCodeId}`, data, { headers: authHeader() })
        .then((response) => {
            if (response.data) {
                console.log("Response: ", response.data)
            }

            return response.data;
        });
  };

  deleteCPTCode = (id) => {
    return axios.delete(API_URL + `/${id}`, { headers: authHeader() });
  }
}

export default new CPTCodeService();
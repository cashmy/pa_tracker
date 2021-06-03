import axios from 'axios';
import authHeader from "./authHeader";

const API_URL = "https://localhost:44394/api/diagnosisCode";

class DiagCodeService {
  getAllDiagCodes = () => {
    return axios.get(API_URL, { headers: authHeader() });
  };

  getDiagCode = (id) => {
    return axios.get(API_URL + `/${id}`, { headers: authHeader() });
  };

  addDiagCode = (data) => {
    return axios.post(API_URL, data, { headers: authHeader() });
  };

  updateDiagCode = (data) => {
        axios
            .put(API_URL + `/${data.diagCode}`, data, { headers: authHeader() })
            .then((response) => {
                if (response.data) {
                    console.log("Response: ", response.data)
                }

                return response.data;
            });

    // return axios.put(API_URL + `/${data.providerId}`, data, { headers: authHeader() })
  };

  deleteDiagCode = (id) => {
    return axios.delete(API_URL + `/${id}`, { headers: authHeader() });
  }
}

export default new DiagCodeService();
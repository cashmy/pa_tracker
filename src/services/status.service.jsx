import axios from 'axios';
import authHeader from "./authHeader";

const API_URL = "https://localhost:44394/api/status";

class StatusService {
  getAllStatuses = () => {
    return axios.get(API_URL, { headers: authHeader() });
  };

  getStatus = (id) => {
    return axios.get(API_URL + `/${id}`, { headers: authHeader() });
  };

  addStatus = (data) => {
    console.log("requesting post: ", data)
    return axios.post(API_URL, data, { headers: authHeader() });
  };

  updateStatus = (data) => {
    axios
        .put(API_URL + `/${data.statusId}`, data, { headers: authHeader() })
        .then((response) => {
            if (response.data) {
                console.log("Response: ", response.data)
            }

            return response.data;
        });
  };

  deleteStatus = (id) => {
    return axios.delete(API_URL + `/${id}`, { headers: authHeader() });
  }
}

export default new StatusService();
import axios from 'axios';
import authHeader from "./authHeader";

const API_URL = "https://localhost:44394/api/provider";

class ProviderService {
  getAllProviders = () => {
    return axios.get(API_URL, { headers: authHeader() });
  };

  getProvider = (id) => {
    return axios.get(API_URL + `/${id}`, { headers: authHeader() });
  };

  addProvider = (data) => {
    return axios.post(API_URL, data, { headers: authHeader() });
  };

  updateProvider = (data) => {
    axios
        .put(API_URL + `/${data.providerId}`, data, { headers: authHeader() })
        .then((response) => {
            if (response.data) {
                console.log("Response: ", response.data)
            }

            return response.data;
        });
  };

  deleteProvider = (id) => {
    return axios.delete(API_URL + `/${id}`, { headers: authHeader() });
  }
}

export default new ProviderService();
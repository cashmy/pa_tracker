import axios from 'axios';
import authHeader from "./authHeader";

const API_URL = "https://localhost:44394/api/treatmentClass";

class SpecialtyService {
  getAllSpecialties = () => {
    return axios.get(API_URL, { headers: authHeader() });
  };

  getSpecialty = (id) => {
    return axios.get(API_URL + `/${id}`, { headers: authHeader() });
  };

  addSpecialty = (data) => {
    console.log("requesting post: ", data)
    return axios.post(API_URL, data, { headers: authHeader() });
  };

  updateSpecialty = (data) => {
        axios
            .put(API_URL + `/${data.treatmentCode}`, data, { headers: authHeader() })
            .then((response) => {
                if (response.data) {
                    console.log("Response: ", response.data)
                }

                return response.data;
            });
  };

  deleteSpecialty = (id) => {
    return axios.delete(API_URL + `/${id}`, { headers: authHeader() });
  }
}

export default new SpecialtyService();
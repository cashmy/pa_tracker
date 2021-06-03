import axios from 'axios';
import authHeader from "./authHeader";

const API_URL = "https://localhost:44394/api/clinic";

class ClinicService {
  getAllClinics = () => {
    return axios.get(API_URL, { headers: authHeader() });
  };

  getClinic = (id) => {
    return axios.get(API_URL + `/${id}`, { headers: authHeader() });
  };

  addClinic = (data) => {
    return axios.post(API_URL, data, { headers: authHeader() });
  };

  updateClinic = (data) => {
    axios
      .put(API_URL + `/${data.clinicId}`, data, { headers: authHeader() })
      .then((response) => {
          if (response.data) {
              console.log("Response: ", response.data)
          }

          return response.data;
      });
  };

  deleteClinic = (id) => {
    return axios.delete(API_URL + `/${id}`, { headers: authHeader() });
  }
}

export default new ClinicService();
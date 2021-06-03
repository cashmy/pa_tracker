import axios from 'axios';
import authHeader from "./authHeader";

const API_URL = "https://localhost:44394/api/carrier";

class CarrierService {
  getAllCarriers = () => {
    return axios.get(API_URL, { headers: authHeader() });
  };

  getCarrier = (id) => {
    return axios.get(API_URL + `/${id}`, { headers: authHeader() });
  };

  addCarrier = (data) => {
    return axios.post(API_URL, data, { headers: authHeader() });
  };

  updateCarrier = (data) => {
    axios
        .put(API_URL + `/${data.carrierId}`, data, { headers: authHeader() })
        .then((response) => {
            if (response.data) {
                console.log("Response: ", response.data)
            }

            return response.data;
        });
  };

  deleteCarrier = (id) => {
    return axios.delete(API_URL + `/${id}`, { headers: authHeader() });
  }
}

export default new CarrierService();
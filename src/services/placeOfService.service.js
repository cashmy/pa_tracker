import axios from 'axios';
import authHeader from "./authHeader";

const API_URL = "https://localhost:44394/api/placeofservice";

class PlaceOfServiceService {
  getAllPlacesOfService = () => {
    return axios.get(API_URL, { headers: authHeader() });
  };

  getPlaceOfService = (id) => {
    return axios.get(API_URL + `/${id}`, { headers: authHeader() });
  };

  addPlaceOfService = (data) => {
    return axios.post(API_URL, data, { headers: authHeader() });
  };

  updatePlaceOfService = (data) => {
    axios
        .put(API_URL + `/${data.providerId}`, data, { headers: authHeader() })
        .then((response) => {
            if (response.data) {
                console.log("Response: ", response.data)
            }

            return response.data;
        });
  };

  deletePlaceOfService = (id) => {
    return axios.delete(API_URL + `/${id}`, { headers: authHeader() });
  }
}

export default new PlaceOfServiceService();
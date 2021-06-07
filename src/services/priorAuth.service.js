import axios from 'axios';
import authHeader from "./authHeader";

const API_URL = "https://localhost:44394/api/priorAuth";

class ProviderService {
  getAllPAs = () => {
    return axios.get(API_URL, { headers: authHeader() });
  };

  getAllPAsByArchiveStatus = (archiveStatus) => {
    return axios.get(API_URL + `/archive/${archiveStatus}`, { headers: authHeader() });
  };

  getAllPAsbyCarrierAndArchive = (id, archiveStatus) => {
    return axios.get(API_URL + `/carrier/${id}/archive/${archiveStatus}`, { headers: authHeader() });
  }

  getAllPAsbyProviderAndArchive = (id, archiveStatus) => {
    return axios.get(API_URL + `/provider/${id}/archive/${archiveStatus}`, { headers: authHeader() });
  }

  getAllPAsbyStsAndArchive = (id, archiveStatus) => {
    return axios.get(API_URL + `/status/${id}/archive/${archiveStatus}`, { headers: authHeader() });
  }

  getNonApprvdCountForProviders = () => {
    return axios.get(API_URL + '/provcount', { headers: authHeader() });
  };

  getNonApprvdCountForCarriers = () => {
    return axios.get(API_URL + '/carrcount', { headers: authHeader() });
  };

  getPABasic = (id) => {
    return axios.get(API_URL + `/${id}`, { headers: authHeader() });
  };

  getPAFull = (id) => {
    return axios.get(API_URL + `/joins/${id}`, { headers: authHeader() });
  };

  addPA = (data) => {
    return axios.post(API_URL, data, { headers: authHeader() });
  };

  updatePA = (data) => {
    axios
        .put(API_URL + `/${data.id}`, data, { headers: authHeader() })
        .then((response) => {
            if (response.data) {
                console.log("Response: ", response.data)
            }

            return response.data;
        });
  };

  deletePA = (id) => {
    return axios.delete(API_URL + `/${id}`, { headers: authHeader() });
  }
}

export default new ProviderService();
import axios from 'axios';
import authHeader from "./authHeader";

const API_URL = "https://localhost:44394/api/patient";

class PatientService {
  getAllPatients = () => {
    return axios.get(API_URL, { headers: authHeader() });
  };

  getAllPatientsSelect = () => {
    axios
      .get(API_URL, { headers: authHeader() })
      .then((response) => {
        let items = response.data
        // let newItem = {}
        let mapResults =[]
        mapResults = items.map((item, i) => {
          item.id = item.patientId
          item.title = item.patientLastName + ', ' + item.patientFirstName
          return item;
        })
        console.log("Service layer: ", mapResults)
        return mapResults
      });
  };

  getPatient = (id) => {
    return axios.get(API_URL + `/${id}`, { headers: authHeader() });
  };

  addPatient = (data) => {
    return axios.post(API_URL, data, { headers: authHeader() });
  };

  updatePatient = (data) => {
    axios
        .put(API_URL + `/${data.patientId}`, data, { headers: authHeader() })
        .then((response) => {
            return response.data;
        });
  };

  deletePatient = (id) => {
    return axios.delete(API_URL + `/${id}`, { headers: authHeader() });
  }
}

export default new PatientService();
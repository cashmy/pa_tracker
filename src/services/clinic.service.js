import axios from 'axios';
import authHeader from "./authHeader";

const API_URL = "https://localhost:44394/api/";


const getAllClinics = () => {
    return axios.get(API_URL + "clinic", { headers: authHeader() });
};

// async const getAllClinics = () => {
//     try{
//         const response = await axios.get(API_URL + "clinic", { headers: authHeader() });
//         console.log("Inside svc layer:  ", response.data)
//         return response.data
//     }
//     catch(e){
//         console.log('API call unsuccessful. ',e)
//     }
// }

const getClinic = (id) => {
  return axios.get(API_URL + `/${id}`, { headers: authHeader() });
};

const addClinic = (data) => {
    return axios.post(API_URL + "clinic", data, { headers: authHeader() });
};

const updateClinic = (data) => {
  return axios.put(API_URL + `clinic/${data.clinicId}`, data, { headers: authHeader() })
};

const deleteClinic = (id) => {
    return axios.delete(API_URL + `clinic/${id}`, { headers: authHeader() });
}

export default {
    getAllClinics,
    getClinic,
    addClinic,
    updateClinic,
    deleteClinic,
};
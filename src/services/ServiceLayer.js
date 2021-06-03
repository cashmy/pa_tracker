import axios from 'axios';
import authHeader from "./authHeader";

const API_URL = "https://localhost:44394/api/";

class ServiceLayer {
    // Financial Class - Used here for potential later refactoring into a separate model in the database.
    // for now it will simply be a "standard"
    getAllFinancialClasses = () => ([
        { id: 'CO', title: 'Commercial' },
        { id: 'MD', title: 'Medicaid' },
        { id: 'SP', title: 'Self-Pay' }
    ])

    // ***** PATIENT End points *****
    getAllPatients(){
        return axios.get(API_URL + 'patient', { headers: authHeader() });
    }

    getPatient(id){
        return axios.get(API_URL + `patient/${id}`, { headers: authHeader() });
    }

    addPatient(data){
        console.log(data)
        return axios.post(API_URL + 'patient', data, { headers: authHeader() });
    }

    updatePatient(id, data){
        return axios.put(API_URL + `patient/${id}`, data, { headers: authHeader() });
    }

    deletePatient(id){
        return axios.delete(API_URL + `patient/${id}`, { headers: authHeader() });
    }

    // ***** USER End points: Authentication and Profile *****
    // Request for User
    registerUser(data){
        return axios.post(API_URL + 'authentication', data);
    }

    userLogin(data){
        return axios.post(API_URL + 'authentication/login', data);
    }

    // login = (username, password) => {
    //     return axios
    //         .post(API_URL + "authentication/login", data)
    //         .then((response) => {
    //             if (response.data.accessToken) {
    //                 localStorage.setItem("user", JSON.stringify(response.data));
    //             }

    //             return response.data;
    //         });
    // };

    logout = () => {
        localStorage.removeItem("user");
    }

    getUserProfile(){

        return axios.get(API_URL + 'user/profile', { headers: authHeader() });
    }
    
    updateUser(data){
        return axios.put(API_URL + 'user', data, { headers: authHeader() });
    }

    // Admin use only
    addUser(data){

        return axios.post(API_URL + 'user', data, { headers: authHeader() });
    }

    // Admin use only
    getAllUsers(){
        return axios.get(API_URL + 'user/', { headers: authHeader() });
    }

    // Admin use only
    deleteUser(){
        return axios.delete(API_URL + 'user', { headers: authHeader() });
    }

}

export default new ServiceLayer();
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

        // ***** CLINC End points *****
        getAllClinics(){
            return axios.get(API_URL + "clinic", { headers: authHeader() });
    }
    
        async getClinic(id){
            try{
                const response = await axios.get(API_URL + `/${id}`, { headers: authHeader() });
                return response.data
            }
            catch(e){
                console.log('API call unsuccessful. ',e)
            }
        }
    
        async addClinic(data){
            try{
                const response = await axios.post(API_URL + "clinic", data, { headers: authHeader() });
                return response.data
            }
            catch(e){
                console.log('API call unsuccessful. ',e)
            }
        }
    
        async updateClinic(data){
            // console.log("SL-Clinc-Id: ",id)
            console.log("SL-Clinc-Data: ",data)
            try{
                const response = await axios.put(API_URL + `clinic/${data.clinicId}`, data, { headers: authHeader() });
                return response.data
            }
            catch(e){
                console.log('API call unsuccessful. ',e)
            }
        }
    
        async deleteClinic(id){
            try{
                const response = await axios.delete(API_URL + `clinic/${id}`, { headers: authHeader() });
                return response.data
            }
            catch(e){
                console.log('API call unsuccessful. ',e)
            }
        }

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
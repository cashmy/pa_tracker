import axios from 'axios';

class ServiceLayer {

    // Example to get Token
    // jwt = localStorage.getItem('token')
    //return http.post('authentication/login',{headers: {Authorization: 'Bearer ' + jwt}}, data);

    getToken(){
        const jwt = localStorage.getItem('token');
        if(jwt){
            return jwt;
        }
        else{
            window.location.href="/login"
        }
    }

    // ***** PATIENT End points *****
    getAllPatients(){
        return axios.get('https://localhost:44394/api/patient/', {headers: {Authorization: 'Bearer ' + jwt}});
    }

    getPatient(id){
        return axios.get(`https://localhost:44394/api/patient/${id}`, {headers: {Authorization: 'Bearer ' + jwt}});
    }

    addPatient(){
        return axios.post('https://localhost:44394/api/patient/', data, {headers: {Authorization: 'Bearer ' + jwt}});
    }

    updatePatient(id){
        return axios.put(`https://localhost:44394/api/patient/${id}`, data, {headers: {Authorization: 'Bearer ' + jwt}});
    }

    deletePatient(id){
        return axios.delete(`https://localhost:44394/api/patient/${id}`, {headers: {Authorization: 'Bearer ' + jwt}});
    }

    // ***** USER End points: Authentication and Profile *****
    // Request for User
    registerUser(data){
        return axios.post('https://localhost:44394/api/authentication/', data);
    }

    userLogin(data){
        return axios.post('https://localhost:44394/api/authentication/login', data);
    }

    
    getUserProfile(){
        return axios.get('https://localhost:44394/api/user/profile', {headers: {Authorization: 'Bearer ' + jwt}});
    }
    
    updateUser(data){
        const jwt = localStorage.getItem('token')
        return axios.put('https://localhost:44394/api/user', data, {headers: {Authorization: 'Bearer ' + jwt}});
    }

    // Admin use only
    addUser(){
        return axios.post('https://localhost:44394/api/user', data, {headers: {Authorization: 'Bearer ' + jwt}})
    }

    // Admin use only
    getAllUsers(){
        return axios.get('https://localhost:44394/api/user/', {headers: {Authorization: 'Bearer ' + jwt}});
    }

    // Admin use only
    deleteUser(){
        const jwt = localStorage.getItem('token')
        return axios.delete('https://localhost:44394/api/user', {headers: {Authorization: 'Bearer ' + jwt}});
    }

}
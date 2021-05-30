import axios from 'axios';

class ServiceLayer {

    getToken(){
        const jwt = localStorage.getItem('token');
        if(jwt){
            return jwt;
        }
        else{
            window.location.href="/login"
        }
    }
    // Financial Class - Used here in case of refactoring into a separate model in the database.
    // for now it will simply be a "standard"
    getAllFinancialClasses = () => ([
        { id: 'CO', title: 'Commercial' },
        { id: 'MD', title: 'Medicaid' },
        { id: 'SP', title: 'Self-Pay' }
    ])

        // ***** CLINC End points *****
        getAllClinics(){
            const jwt = localStorage.getItem('token')
            return axios.get('https://localhost:44394/api/clinic/', {headers: {Authorization: 'Bearer ' + jwt}});
        }
    
        getClinic(id){
            const jwt = localStorage.getItem('token')
            return axios.get(`https://localhost:44394/api/clinic/${id}`, {headers: {Authorization: 'Bearer ' + jwt}});
        }
    
        addClinic(data){
            const jwt = localStorage.getItem('token')
            return axios.post('https://localhost:44394/api/clinic/', data, {headers: {Authorization: 'Bearer ' + jwt}});
        }
    
        updateClinic(id, data){
            const jwt = localStorage.getItem('token')
            return axios.put(`https://localhost:44394/api/clinic/${id}`, data, {headers: {Authorization: 'Bearer ' + jwt}});
        }
    
        deleteClinic(id){
            const jwt = localStorage.getItem('token')
            return axios.delete(`https://localhost:44394/api/clinic/${id}`, {headers: {Authorization: 'Bearer ' + jwt}});
        }

    // ***** PATIENT End points *****
    getAllPatients(){
        const jwt = localStorage.getItem('token')
        return axios.get('https://localhost:44394/api/patient/', {headers: {Authorization: 'Bearer ' + jwt}});
    }

    getPatient(id){
        const jwt = localStorage.getItem('token')
        return axios.get(`https://localhost:44394/api/patient/${id}`, {headers: {Authorization: 'Bearer ' + jwt}});
    }

    addPatient(data){
        const jwt = localStorage.getItem('token')
        return axios.post('https://localhost:44394/api/patient/', data, {headers: {Authorization: 'Bearer ' + jwt}});
    }

    updatePatient(id, data){
        const jwt = localStorage.getItem('token')
        return axios.put(`https://localhost:44394/api/patient/${id}`, data, {headers: {Authorization: 'Bearer ' + jwt}});
    }

    deletePatient(id){
        const jwt = localStorage.getItem('token')
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
        const jwt = localStorage.getItem('token')
        return axios.get('https://localhost:44394/api/user/profile', {headers: {Authorization: 'Bearer ' + jwt}});
    }
    
    updateUser(data){
        const jwt = localStorage.getItem('token')
        return axios.put('https://localhost:44394/api/user', data, {headers: {Authorization: 'Bearer ' + jwt}});
    }

    // Admin use only
    addUser(data){
        const jwt = localStorage.getItem('token')
        return axios.post('https://localhost:44394/api/user', data, {headers: {Authorization: 'Bearer ' + jwt}})
    }

    // Admin use only
    getAllUsers(){
        const jwt = localStorage.getItem('token')
        return axios.get('https://localhost:44394/api/user/', {headers: {Authorization: 'Bearer ' + jwt}});
    }

    // Admin use only
    deleteUser(){
        const jwt = localStorage.getItem('token')
        return axios.delete('https://localhost:44394/api/user', {headers: {Authorization: 'Bearer ' + jwt}});
    }

}

export default new ServiceLayer();
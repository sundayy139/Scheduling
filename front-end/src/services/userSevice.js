import axios from '../axios';

export const handleLoginApi = (email, password) => {
    return axios.post('/api/login', {email,password})
}

export const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`, {
        id: inputId
    });
}
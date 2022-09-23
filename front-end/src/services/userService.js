import axios from '../axios';

export const handleLoginApi = (email, password) => {
    return axios.post('/api/login', {email,password})
}

export const getAllUsersService = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`, {
        id: inputId
    });
}

export const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data);
}
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

export const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });
}

export const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}


export const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
}

export const getTopDoctorService = (limit) => {
    return axios.get(`/api/top-doctor?limit=${limit}`);
}
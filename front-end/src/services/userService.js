import axios from '../axios';

export const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password })
}

export const changePasswordService = (data) => {
    return axios.post('/api/change-password', data)
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

export const getAllDoctorsService = () => {
    return axios.get('/api/get-all-doctors');
}

export const createDetailDoctorService = (data) => {
    return axios.post('/api/save-info-doctor', data);
}

export const getDetailDoctorService = (doctorId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${doctorId}`);
}

export const createScheduleDoctorService = (data) => {
    return axios.post('/api/create-schedule-doctor', data);
}

export const deleteScheduleDoctorService = (id) => {
    return axios.delete('/api/delete-schedule-doctor', { data: { id: id } });
}

export const editScheduleDoctorService = (inputData) => {
    return axios.put('/api/edit-schedule-doctor', inputData);
}

export const getScheduleDoctorService = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor?doctorId=${doctorId}&date=${date}`);
}

export const getExtraInfoDoctorService = (doctorId) => {
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`);
}

export const getProfileDoctorService = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
}

export const postPatientBookAppointmentService = (data) => {
    return axios.post('/api/patient-book-appoinment', data);
}

export const postVerifyBookAppointmentService = (data) => {
    return axios.post('/api/verify-booking-appoinment', data);
}

export const createNewSpecialtyService = (data) => {
    return axios.post('/api/create-new-specialty', data);
}

export const getAllSpecialtyService = (inputId) => {
    return axios.get(`/api/get-all-specialty?id=${inputId}`, {
        id: inputId
    });
}

export const deleteSpecialtyService = (id) => {
    return axios.delete('/api/delete-specialty', {
        data: {
            id: id
        }
    });
}

export const editSpecialtyService = (inputData) => {
    return axios.put('/api/edit-specialty', inputData);
}

export const getDetailSpecialtyService = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}

export const createNewClinicService = (data) => {
    return axios.post('/api/create-new-clinic', data);
}

export const getAllClinicService = (inputId) => {
    return axios.get(`/api/get-all-clinic?id=${inputId}`, {
        id: inputId
    });
}

export const deleteClinicService = (id) => {
    return axios.delete('/api/delete-clinic', {
        data: {
            id: id
        }
    });
}

export const editClinicService = (inputData) => {
    return axios.put('/api/edit-clinic', inputData);
}

export const getDetailClinicService = (id) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${id}`)
}

export const getListPatientService = (data) => {
    return axios.get(`/api/get-list-patient?doctorId=${data.doctorId}&date=${data.date}`);
}

export const sendRemedyService = (data) => {
    return axios.post('/api/send-remedy', data);
}


export const getAllHandbookService = (inputId) => {
    return axios.get(`/api/get-all-handbook?id=${inputId}`, {
        id: inputId
    });
}

export const getLimitHandbookService = (limit) => {
    return axios.get(`/api/get-limit-handbook?limit=${limit}`, {
        limit: limit
    });
}

export const createNewHandbookService = (data) => {
    return axios.post('/api/create-new-handbook', data);
}

export const deleteHandbookService = (id) => {
    return axios.delete('/api/delete-handbook', {
        data: {
            id: id
        }
    });
}

export const editHandbookService = (inputData) => {
    return axios.put('/api/edit-handbook', inputData);
}

export const getDetailHandbookService = (id) => {
    return axios.get(`/api/get-detail-handbook-by-id?id=${id}`)
}
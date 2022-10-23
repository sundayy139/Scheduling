import { createDetailDoctorService, createNewClinicService, createNewSpecialtyService, createNewUserService, deleteClinicService, deleteSpecialtyService, deleteUserService, editClinicService, editSpecialtyService, editUserService, getAllClinicService, getAllCodeService, getAllDoctorsService, getAllSpecialtyService, getAllUsersService, getTopDoctorService } from '../../services/userService';

import actionTypes from './actionTypes';
import { toast } from 'react-toastify';

export const fetchGenderStart = () => {
    return async (dispatch) => {
        try {
            let res = await getAllCodeService("GENDER");

            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })

            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            }

        } catch (e) {
            dispatch(fetchGenderFail());
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL,
})

export const fetchPositionStart = () => {
    return async (dispatch) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFail());
            }

        } catch (e) {
            dispatch(fetchPositionFail());
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL,
})

export const fetchRoleStart = () => {
    return async (dispatch) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFail());
            }

        } catch (e) {
            dispatch(fetchRoleFail());
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL,
})

// fetch price/payment-provine
export const fetchRequiredDoctorInfoStart = () => {
    return async (dispatch) => {
        try {
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialtyService("ALL");
            let resClinic = await getAllClinicService("ALL");
            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0
                && resClinic && resClinic.errCode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.specialties,
                    resClinic: resClinic.clinics
                }
                dispatch(fetchRequiredDoctorInfoSuccess(data));
            } else {
                dispatch(fetchRequiredDoctorInfoFail());
            }

        } catch (e) {
            dispatch(fetchRequiredDoctorInfoFail());
        }
    }
}

export const fetchRequiredDoctorInfoSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
    data: allRequiredData
})

export const fetchRequiredDoctorInfoFail = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAIL,
})





//fetch all user
export const fetchAllUsersStart = () => {
    return async (dispatch) => {
        try {
            let res = await getAllUsersService("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users));
            } else {
                toast.error('Fetch all user failure', {
                    theme: 'colored',
                })
                dispatch(fetchAllUsersFail());
            }

        } catch (e) {
            dispatch(fetchAllUsersFail());
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})

export const fetchAllUsersFail = () => ({
    type: actionTypes.FETCH_ALL_USER_FAIL,
})


// create user
export const createUserStart = (data) => {
    return async (dispatch) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage, {
                    theme: 'colored',
                })
                dispatch(createUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error(res.errMessage, {
                    theme: 'colored',
                })
                dispatch(createUserFail());
            }

        } catch (e) {
            toast.error('Create user failure', {
                theme: 'colored',
            })
            dispatch(createUserFail());
        }
    }
}

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const createUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL,
})


// delete user
export const editUserStart = (data) => {
    return async (dispatch) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage, {
                    theme: 'colored',
                })
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error(res.errMessage, {
                    theme: 'colored',
                })
                dispatch(editUserFail());
            }

        } catch (e) {
            toast.error('Update user failure', {
                theme: 'colored',
            })
            dispatch(editUserFail());
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const editUserFail = () => ({
    type: actionTypes.EDIT_USER_FAIL,
})


// delete user
export const deleteUserStart = (userId) => {
    return async (dispatch) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage, {
                    theme: 'colored',
                })
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error(res.errMessage, {
                    theme: 'colored',
                })
                dispatch(deleteUserFail());
            }

        } catch (e) {
            toast.error('Delete user failure', {
                theme: 'colored',
            })
            dispatch(deleteUserFail());
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL,
})


// get top doctor
export const fetchTopDoctorStart = () => {
    return async (dispatch) => {
        try {
            let res = await getTopDoctorService('');
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorSuccess(res.data));
            } else {
                toast.error('Fetch top doctor failure', {
                    theme: 'colored',
                })
                dispatch(fetchTopDoctorFail());
            }

        } catch (e) {
            dispatch(fetchTopDoctorFail());
        }
    }
}

export const fetchTopDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    doctor: data
})

export const fetchTopDoctorFail = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAIL,
})


// get ALL doctor
export const fetchAllDoctorsStart = () => {
    return async (dispatch) => {
        try {
            let res = await getAllDoctorsService();
            if (res && res.errCode === 0) {
                dispatch(fetchAllDoctorsSuccess(res.data));
            } else {
                toast.error('Fetch all doctors failure', {
                    theme: 'colored',
                })
                dispatch(fetchAllDoctorsFail());
            }

        } catch (e) {
            dispatch(fetchAllDoctorsFail());
        }
    }
}

export const fetchAllDoctorsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    doctors: data
})

export const fetchAllDoctorsFail = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAIL,
})

// create detail doctor
export const createDetailDoctorStart = (data) => {
    return async (dispatch) => {
        try {
            let res = await createDetailDoctorService(data);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage, {
                    theme: 'colored',
                })
                dispatch(createDetailDoctorSuccess());
            } else {
                toast.error(res.errMessage, {
                    theme: 'colored',
                })
                dispatch(createDetailDoctorFail());
            }

        } catch (e) {
            dispatch(createDetailDoctorFail());
            toast.error('Save detail doctor failure', {
                theme: 'colored',
            })
        }
    }
}

export const createDetailDoctorSuccess = () => ({
    type: actionTypes.CREATE_DETAIL_DOCTOR_SUCCESS
})

export const createDetailDoctorFail = () => ({
    type: actionTypes.CREATE_DETAIL_DOCTOR_FAIL,
})



// get ALL doctor
export const fetchAllScheduleTimeStart = () => {
    return async (dispatch) => {
        try {
            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch(fetchAllScheduleTimeSuccess(res.data));
            } else {
                toast.error('Fetch all doctors failure', {
                    theme: 'colored',
                })
                dispatch(fetchAllScheduleTimeFail());
            }

        } catch (e) {
            dispatch(fetchAllScheduleTimeFail());
        }
    }
}

export const fetchAllScheduleTimeSuccess = (data) => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
    dataTimes: data
})

export const fetchAllScheduleTimeFail = () => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL,
})

export const fetchAllSpecitaltyStart = () => {
    return async (dispatch) => {
        try {
            let res = await getAllSpecialtyService("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllSpecitaltySuccess(res.specialties));
            } else {
                toast.error('Fetch all specialty failure', {
                    theme: 'colored',
                })
                dispatch(fetchAllSpecitaltyFail());
            }

        } catch (e) {
            dispatch(fetchAllSpecitaltyFail());
        }
    }
}

export const fetchAllSpecitaltySuccess = (data) => ({
    type: actionTypes.FETCH_ALL_SPECIALTY_SUCCESS,
    specialties: data
})

export const fetchAllSpecitaltyFail = () => ({
    type: actionTypes.FETCH_ALL_SPECIALTY_FAIL,
})

export const createSpecialtyStart = (data) => {
    return async (dispatch) => {
        try {
            let res = await createNewSpecialtyService(data);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage, {
                    theme: 'colored',
                })
                dispatch(createSpecialtySuccess());
                dispatch(fetchAllSpecitaltyStart());
            } else {
                toast.error(res.errMessage, {
                    theme: 'colored',
                })
                dispatch(createSpecialtyFail());
            }

        } catch (e) {
            toast.error('Create specialty failure', {
                theme: 'colored',
            })
            dispatch(createSpecialtyFail());
        }
    }
}

export const createSpecialtySuccess = () => ({
    type: actionTypes.CREATE_SPECIALTY_SUCCESS,
})

export const createSpecialtyFail = () => ({
    type: actionTypes.CREATE_SPECIALTY_FAIL,
})

export const deleteSpecialtyStart = (id) => {
    return async (dispatch) => {
        try {
            let res = await deleteSpecialtyService(id);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage, {
                    theme: 'colored',
                })
                dispatch(deleteSpecialtySuccess());
                dispatch(fetchAllSpecitaltyStart());
            } else {
                toast.error(res.errMessage, {
                    theme: 'colored',
                })
                dispatch(deleteSpecialtyFailed());
            }

        } catch (e) {
            toast.error('Delete specialty failure', {
                theme: 'colored',
            })
            dispatch(deleteSpecialtyFailed());
        }
    }
}

export const deleteSpecialtySuccess = () => ({
    type: actionTypes.DELETE_SPECIALTY_SUCCESS,
})

export const deleteSpecialtyFailed = () => ({
    type: actionTypes.DELETE_SPECIALTY_FAIL,
})

export const editSpecialtyStart = (data) => {
    return async (dispatch) => {
        try {
            let res = await editSpecialtyService(data);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage, {
                    theme: 'colored',
                })
                dispatch(editSpecialtySuccess());
                dispatch(fetchAllSpecitaltyStart());
            } else {
                toast.error(res.errMessage, {
                    theme: 'colored',
                })
                dispatch(editSpecialtyFail());
            }

        } catch (e) {
            toast.error('Update specialty failure', {
                theme: 'colored',
            })
            dispatch(editSpecialtyFail());
        }
    }
}

export const editSpecialtySuccess = () => ({
    type: actionTypes.EDIT_SPECIALTY_SUCCESS,
})

export const editSpecialtyFail = () => ({
    type: actionTypes.EDIT_SPECIALTY_FAIL,
})

export const fetchAllClinicStart = () => {
    return async (dispatch) => {
        try {
            let res = await getAllClinicService("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllClinicSuccess(res.clinics));
            } else {
                toast.error('Fetch all clinic failure', {
                    theme: 'colored',
                })
                dispatch(fetchAllClinicFail());
            }

        } catch (e) {
            dispatch(fetchAllClinicFail());
        }
    }
}

export const fetchAllClinicSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_CLINIC_SUCCESS,
    clinics: data
})

export const fetchAllClinicFail = () => ({
    type: actionTypes.FETCH_ALL_CLINIC_FAIL,
})


export const createClinicStart = (data) => {
    return async (dispatch) => {
        try {
            let res = await createNewClinicService(data);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage, {
                    theme: 'colored',
                })
                dispatch(createClinicSuccess());
                dispatch(fetchAllClinicStart());
            } else {
                toast.error(res.errMessage, {
                    theme: 'colored',
                })
                dispatch(createClinicFail());
            }

        } catch (e) {
            toast.error('Create specialty failure', {
                theme: 'colored',
            })
            dispatch(createSpecialtyFail());
        }
    }
}

export const createClinicSuccess = () => ({
    type: actionTypes.CREATE_CLINIC_SUCCESS,
})

export const createClinicFail = () => ({
    type: actionTypes.CREATE_CLINIC_FAIL,
})

export const editClinicStart = (data) => {
    return async (dispatch) => {
        try {
            let res = await editClinicService(data);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage, {
                    theme: 'colored',
                })
                dispatch(editClinicSuccess());
                dispatch(fetchAllClinicStart());
            } else {
                toast.error(res.errMessage, {
                    theme: 'colored',
                })
                dispatch(editClinicFail());
            }

        } catch (e) {
            console.log(e)
            toast.error('Update clinic failure', {
                theme: 'colored',
            })
            dispatch(editClinicFail());
        }
    }
}

export const editClinicSuccess = () => ({
    type: actionTypes.EDIT_CLINIC_SUCCESS,
})

export const editClinicFail = () => ({
    type: actionTypes.EDIT_CLINIC_FAIL,
})

export const deleteClinicStart = (id) => {
    return async (dispatch) => {
        try {
            let res = await deleteClinicService(id);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage, {
                    theme: 'colored',
                })
                dispatch(deleteClinicSuccess());
                dispatch(fetchAllClinicStart());
            } else {
                toast.error(res.errMessage, {
                    theme: 'colored',
                })
                dispatch(deleteClinicFail());
            }

        } catch (e) {
            toast.error('Delete clinic failure', {
                theme: 'colored',
            })
            dispatch(deleteClinicFail());
        }
    }
}

export const deleteClinicSuccess = () => ({
    type: actionTypes.DELETE_CLINIC_SUCCESS,
})

export const deleteClinicFail = () => ({
    type: actionTypes.DELETE_CLINIC_FAIL,
})
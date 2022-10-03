import { createNewUserService, deleteUserService, editUserService, getAllCodeService, getAllUsersService, getTopDoctorService } from '../../services/userService';

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


//fetch all user
export const fetchAllUsersStart = () => {
    return async (dispatch) => {
        try {
            let res = await getAllUsersService("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
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
                toast.success('Create user successfully', {
                    theme: 'colored',
                }
                )
                dispatch(createUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error('Create user failure', {
                    theme: 'colored',
                })
                dispatch(createUserFail());
            }

        } catch (e) {
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
                toast.success('Update user successfully', {
                    theme: 'colored',
                })
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error('Update user failure', {
                    theme: 'colored',
                })
                dispatch(editUserFail());
            }

        } catch (e) {
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
                toast.success('Delete user successfully', {
                    theme: 'colored',
                })
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error('Delete user failure', {
                    theme: 'colored',
                })
                dispatch(deleteUserFail());
            }

        } catch (e) {
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
                toast.error('Fetch all user failure', {
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





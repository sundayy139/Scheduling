import { createNewUserService, getAllCodeService } from '../../services/userService';
import actionTypes from './actionTypes';

export const fetchGenderStart = () => {
    return async (dispatch) => {
        try {
            let res = await getAllCodeService("GENDER");

            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })

            if (res && res.errCode === 0 ){
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
            if (res && res.errCode === 0 ){
                dispatch(fetchPositionSuccess(res.data));
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
            if (res && res.errCode === 0 ){
                dispatch(fetchRoleSuccess(res.data));
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


// create user
export const createUserStart = (data) => {
    return async (dispatch) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0 ){
                dispatch(createUserSuccess());
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





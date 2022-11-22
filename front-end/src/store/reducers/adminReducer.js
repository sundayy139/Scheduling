import actionTypes from '../actions/actionTypes';


const initialState = {
    genders: [],
    roles: [],
    positions: [],
    allRequiredData: [],
    users: [],
    topDoctors: [],
    doctors: [],
    scheduleTimes: [],
    specialties: [],
    clinics: [],
    handbooks: [],
    scheduleByDay: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.genders = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAIL:
            state.genders = [];
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAIL:
            state.positions = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAIL:
            state.roles = [];
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:
            state.allRequiredData = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAIL:
            state.allRequiredData = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USER_FAIL:
            state.users = [];
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctors = action.doctor;
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAIL:
            state.topDoctors = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.doctors = action.doctors;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAIL:
            state.doctors = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.scheduleTimes = action.dataTimes;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL:
            state.scheduleTimes = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_SPECIALTY_SUCCESS:
            state.specialties = action.specialties;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_SPECIALTY_FAIL:
            state.specialties = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_CLINIC_SUCCESS:
            state.clinics = action.clinics;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_CLINIC_FAIL:
            state.clinics = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_HANDBOOK_SUCCESS:
            state.handbooks = action.handbooks;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_HANDBOOK_FAIL:
            state.handbooks = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_SCHEDULE_DOCTOR_BY_DATE_SUCCESS:
            state.scheduleByDay = action.dataSchedule;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_SCHEDULE_DOCTOR_BY_DATE_FAIL:
            state.scheduleByDay = [];
            return {
                ...state
            }
        default:
            return state;
    }
}

export default adminReducer;
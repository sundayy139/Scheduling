import actionTypes from '../actions/actionTypes';


const initialState = {
    loading: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.genders = [];
            state.loading = true;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.loading = false;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAIL:
            state.genders = [];
            state.loading = false;
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
        default:
            return state;
    }
}

export default adminReducer;
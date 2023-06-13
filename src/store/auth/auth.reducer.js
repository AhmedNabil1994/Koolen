import { LOGIN, LOGOUT, EDIT_PROFILE } from './auth.types';

const initState = {
    token: '',
    user: {},
};

export default function userReducer(state = initState, action) {
    switch (action.type) {
    case LOGIN:
        return {
            ...action.payload,
        };

    case LOGOUT:
        return initState;

    case EDIT_PROFILE:
        return {
            ...state,
            ...action.payload,
        };
    default:
        return state;
    }
}

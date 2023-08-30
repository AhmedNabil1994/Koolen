import { EDIT_PROFILE, LOGIN, LOGOUT } from './auth.types';

export function userLogin(userData) {
    return {
        type: LOGIN,
        payload: userData,
    };
}

export function userLogout() {
    return {
        type: LOGOUT,
    };
}

export function editUserdata(userData) {
    return {
        type: EDIT_PROFILE,
        payload: userData,
    };
}

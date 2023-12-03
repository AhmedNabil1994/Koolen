import { getRequest, postRequest } from './network';

export function loginUser({ email, password }, onSuccess, onFail) {
    const path = '/api/v1/auth/login';
    const data = { email, password };
    postRequest(path, data, onSuccess, onFail);
}

export function signUpUser({
    name, email, phone, password,
}, onSuccess, onFail) {
    const path = '/api/v1/auth/signup';
    const data = {
        name,
        email,
        password,
        phone,
        user_type: 'customer',
    };
    postRequest(path, data, onSuccess, onFail);
}
export function resendCode(
    data, onSuccess, onFail,
) {
    const path = '/api/v1/auth/resend-code';
    postRequest(path, data, onSuccess, onFail);
}
export function verifyCode(
    data, onSuccess, onFail,
) {
    const path = '/api/v1/auth/verify';
    postRequest(path, data, onSuccess, onFail);
}
export function getUserInfo(onSuccess, onFail) {
    const path = '/api/v1/user/info';
    getRequest(path, onSuccess, onFail);
}

export function editUserInfo(data, onSuccess, onFail) {
    const path = '/api/v1/user/info/update';
    postRequest(path, data, onSuccess, onFail);
}

export function createNewPassword(email, onSuccess, onFail) {
    const path = '/api/v1/auth/password/create';
    const data = { email };
    postRequest(path, data, onSuccess, onFail);
}

export function resetPassword({
    code,
    email,
    password,
}, onSuccess, onFail) {
    const path = '/api/v1/auth/password/reset';
    const data = { password, email, code };

    postRequest(path, data, onSuccess, onFail);
}

export function logout(onSuccess, onFail) {
    const path = '/api/v1/auth/logout';
    getRequest(path, onSuccess, onFail);
}

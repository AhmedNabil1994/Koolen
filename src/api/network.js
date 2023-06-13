import axios from 'axios';

let baseUrl = 'http://koolen.shaha.com.sa';

let token = null;
let currentLang = 'en';

export function getToken(newToken) {
    token = newToken;
}

export function getCurrentLanguage(lang) {
    currentLang = lang;
}

function reqHeader(method, path, data, reqAuth, multiPart, newPath = false) {
    if (path[0] === '/') path.slice(1);

    if (newPath) baseUrl = 'https://shaha.com.sa';
    const reqData = {
        method,
        url: baseUrl + path,
        headers: {
            'Accept-Language': currentLang,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };

    if (data) {
        reqData.data = data;
    }

    if (token && reqAuth) {
        reqData.headers = {
            ...reqData.headers,
            Authorization: `Bearer ${token}`,
        };
    }

    if (multiPart) {
        reqData.headers = {
            ...reqData.headers,
            'content-type': 'multipart/form-data',
        };
    }

    return reqData;
}

export function getRequest(path, onSuccess, onFail, newPath = false, reqAuth = true) {
    const reqData = reqHeader('get', path, null, reqAuth, false, newPath);
    axios(reqData).then((res) => onSuccess(res.data)).catch((fail) => onFail(fail.response));
}

export function postRequest(path, data, onSuccess, onFail, newPath = false, reqAuth = true) {
    const reqData = reqHeader('post', path, data, reqAuth, false, newPath);
    axios(reqData).then((res) => onSuccess(res.data)).catch((fail) => onFail(fail.response));
}

export function patchRequest(path, data, onSuccess, onFail, newPath = false, reqAuth = true) {
    const reqData = reqHeader('patch', path, data, reqAuth, false, newPath);
    axios(reqData).then((res) => onSuccess(res.data)).catch((fail) => onFail(fail.response));
}

export function putRequest(path, data, onSuccess, onFail, newPath = false, reqAuth = true) {
    const reqData = reqHeader('put', path, data, reqAuth, newPath);
    axios(reqData).then((res) => onSuccess(res.data)).catch((fail) => onFail(fail.response));
}

export function deleteRequest(path, data, onSuccess, onFail, newPath = false, reqAuth = true) {
    const reqData = reqHeader('delete', path, data, newPath, reqAuth);
    axios(reqData).then((res) => onSuccess(res.data)).catch((fail) => onFail(fail.response));
}

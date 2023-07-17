import axios from 'axios';

let baseUrl = 'https://koolen.shaha.com.sa/dashboard/public';
/*
eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZTQ0OGMzMTg1NzkxYWQ4ZTI2ZmQ5NWQ2NTE4ZDZmODZlMzVjM2JiYTk1MjVhZTlmOTM5ZWM1ODVmYjEzMDkyZjE5MDQ2NmIzOGFhMDRjMzciLCJpYXQiOjE2ODkxNjQwNDUuNTIyMjIyOTk1NzU4MDU2NjQwNjI1LCJuYmYiOjE2ODkxNjQwNDUuNTIyMjI0OTAzMTA2Njg5NDUzMTI1LCJleHAiOjE3MjA3ODY0NDUuNTE3MzU5OTcyMDAwMTIyMDcwMzEyNSwic3ViIjoiMTU5Iiwic2NvcGVzIjpbXX0.anf7m2ws-I0d0oks1TM_1Ze898UD8fWmXToTUVsqLPzBKUbyeHjcIQPVVdgfTFZ9u_Y39u9iAO7v90HCc7xg6Ir5zWes4FaLFmsl1_l_HzdR_IRsrPSCWBCooMpO7SHqhW82DK_tWn5RrF7ddzgtVpbD8jKDq5Zir-QZ3p-G7TVb_qM5ckBWqO7uMCQTh2ex01jgYE0vHRkSTIziObMofOBJmM6xZMZQWPuEeH4RvtXMPQFKy8xHtwDd5bzRExfvHXO9WfRId8ykV_njemvTBvHhy7odQZfRRzqi_ALWoqJj6SvtME91SexdAFZItRjrP6eGm9UOASN1eXwFWKDLJ8g47z55kC0AeahV4S9BRhIYncJm_6n11-3bD53ulfjd4SScGpnZM3HVlti9wH5wZXnHnWHd9aGKbyxTBNaKZ6Kmiq2T1j4lHjz_jyuhUm19hYiseOvxMYb5Ny50QBtpJ-3u6Xqp5rGYhkSwZi8TmEbsx2w_g0Wg_l_nQcEHsD1lk27sEhf2zVGljN7JdIIoPaB3RNpATzViA7SdOHh5JZOcxbjwYNiga0O5_6w5o3Nns-lLZIUhH_0lGuviajlFdWlnoQwuFiiLD-7tODkFHO6PQKO68gQKew8av4PFZuoaTWTQlQc7m-_uD_m82tw6UeJee1gPb8NlIqapJDYrj84
*/

let token = null;
let currentLang = 'en';

// eslint-disable-next-line
export function getToken(newToken) {
    token = newToken;
    // todo: remove fake api
    // token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZTQ0OGMzMTg1NzkxYWQ4ZTI2ZmQ5NWQ2NTE4ZDZmODZlMzVjM2JiYTk1MjVhZTlmOTM5ZWM1ODVmYjEzMDkyZjE5MDQ2NmIzOGFhMDRjMzciLCJpYXQiOjE2ODkxNjQwNDUuNTIyMjIyOTk1NzU4MDU2NjQwNjI1LCJuYmYiOjE2ODkxNjQwNDUuNTIyMjI0OTAzMTA2Njg5NDUzMTI1LCJleHAiOjE3MjA3ODY0NDUuNTE3MzU5OTcyMDAwMTIyMDcwMzEyNSwic3ViIjoiMTU5Iiwic2NvcGVzIjpbXX0.anf7m2ws-I0d0oks1TM_1Ze898UD8fWmXToTUVsqLPzBKUbyeHjcIQPVVdgfTFZ9u_Y39u9iAO7v90HCc7xg6Ir5zWes4FaLFmsl1_l_HzdR_IRsrPSCWBCooMpO7SHqhW82DK_tWn5RrF7ddzgtVpbD8jKDq5Zir-QZ3p-G7TVb_qM5ckBWqO7uMCQTh2ex01jgYE0vHRkSTIziObMofOBJmM6xZMZQWPuEeH4RvtXMPQFKy8xHtwDd5bzRExfvHXO9WfRId8ykV_njemvTBvHhy7odQZfRRzqi_ALWoqJj6SvtME91SexdAFZItRjrP6eGm9UOASN1eXwFWKDLJ8g47z55kC0AeahV4S9BRhIYncJm_6n11-3bD53ulfjd4SScGpnZM3HVlti9wH5wZXnHnWHd9aGKbyxTBNaKZ6Kmiq2T1j4lHjz_jyuhUm19hYiseOvxMYb5Ny50QBtpJ-3u6Xqp5rGYhkSwZi8TmEbsx2w_g0Wg_l_nQcEHsD1lk27sEhf2zVGljN7JdIIoPaB3RNpATzViA7SdOHh5JZOcxbjwYNiga0O5_6w5o3Nns-lLZIUhH_0lGuviajlFdWlnoQwuFiiLD-7tODkFHO6PQKO68gQKew8av4PFZuoaTWTQlQc7m-_uD_m82tw6UeJee1gPb8NlIqapJDYrj84';
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
            'Content-Type': 'application/json',
        },
    };

    if (data) {
        reqData.data = data;
    }

    if (token) {
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
    axios(reqData)
        .then((res) => onSuccess(res.data))
        .catch((fail) => onFail(fail.response));
}

export function postRequest(path, data, onSuccess, onFail, newPath = false, reqAuth = true) {
    const reqData = reqHeader('post', path, data, reqAuth, false, newPath);
    axios(reqData)
        .then((res) => onSuccess(res.data))
        .catch((fail) => onFail(fail.response));
}

export function patchRequest(path, data, onSuccess, onFail, newPath = false, reqAuth = true) {
    const reqData = reqHeader('patch', path, data, reqAuth, false, newPath);
    axios(reqData)
        .then((res) => onSuccess(res.data))
        .catch((fail) => onFail(fail.response));
}

export function putRequest(path, data, onSuccess, onFail, newPath = false, reqAuth = true) {
    const reqData = reqHeader('put', path, data, reqAuth, newPath);
    axios(reqData)
        .then((res) => onSuccess(res.data))
        .catch((fail) => onFail(fail.response));
}

export function deleteRequest(path, data, onSuccess, onFail, newPath = false, reqAuth = true) {
    const reqData = reqHeader('delete', path, data, newPath, reqAuth);
    axios(reqData)
        .then((res) => onSuccess(res.data))
        .catch((fail) => onFail(fail.response));
}

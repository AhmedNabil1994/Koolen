import { getRequest, postRequest } from './network';

export default function getFooterData(onSuccess, onFail) {
    const path = '/api/v1/setting/footer';
    getRequest(path, onSuccess, onFail);
}

export function subscribe(email, onSuccess, onFail) {
    const path = '/api/v1/subscribe';
    const data = { email };
    postRequest(path, data, onSuccess, onFail);
}

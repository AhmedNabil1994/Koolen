import { getRequest, postRequest } from './network';

export function getCountry(onSuccess, onFail) {
    const path = '/api/v1/all-countries';
    getRequest(path, onSuccess, onFail);
}

export function getStates(id, onSuccess, onFail) {
    const path = `/api/v1/states/${id}`;
    getRequest(path, onSuccess, onFail);
}

export function getCities(id, onSuccess, onFail) {
    const path = `/api/v1/cities/${id}`;
    getRequest(path, onSuccess, onFail);
}

export function getAddresses(onSuccess, onFail) {
    const path = '/api/v1/user/addresses';
    getRequest(path, onSuccess, onFail);
}

export function addNewAddress({
    address, country, city, postalCode, state, phone, defaultAddress, name,
}, onSuccess, onFail) {
    const path = '/api/v1/user/address/create';
    const data = {
        address, country, state, city, postal_code: postalCode, phone, default: defaultAddress, name,
    };
    postRequest(path, data, onSuccess, onFail);
}

export function editAddress(data, onSuccess, onFail) {
    const path = '/api/v1/user/address/update';
    const updatedData = { ...data, postal_code: data.postalCode };
    postRequest(path, updatedData, onSuccess, onFail);
}

export function deleteAddress(id, onSuccess, onFail) {
    const path = `/api/v1/user/address/delete/${id}`;
    getRequest(path, onSuccess, onFail);
}

export function getAddressById(id, onSuccess, onFail) {
    const path = `/api/v1/user/address/default-shipping/${id}`;
    getRequest(path, onSuccess, onFail);
}

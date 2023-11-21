import { getRequest, postRequest } from './network';

export function addToCart({ qty, variation_id }, onSuccess, onFail) {
    const path = '/api/v1/carts/add';
    const data = {
        qty,
        variation_id,
    };
    postRequest(path, data, onSuccess, onFail);
}

export function getCart(id, onSuccess, onFail) {
    const path = '/api/v1/carts';
    getRequest(path, onSuccess, onFail);
}

export function deleteCart(id, onSuccess, onFail) {
    const path = '/api/v1/carts/destroy';
    getRequest(path, onSuccess, onFail);
}

export function changeQuantity(onSuccess, onFail) {
    const path = '/api/v1/carts/change-quantity';
    getRequest(path, onSuccess, onFail);
}

// export function editAddress(data, onSuccess, onFail) {
//     const path = '/api/v1/user/address/update';
//     const updatedData = { ...data, postal_code: data.postalCode };
//     postRequest(path, updatedData, onSuccess, onFail);
// }

// export function deleteAddress(id, onSuccess, onFail) {
//     const path = `/api/v1/user/address/delete/${id}`;
//     getRequest(path, onSuccess, onFail);
// }

// export function getAddressById(id, onSuccess, onFail) {
//     const path = `/api/v1/user/address/default-shipping/${id}`;
//     getRequest(path, onSuccess, onFail);
// }

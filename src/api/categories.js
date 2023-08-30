import { getRequest } from './network';

// eslint-disable-next-line
export function getAllCategories(onSuccess, onFail) {
    const path = '/api/v1/all-categories';
    getRequest(path, onSuccess, onFail);
}

import { getRequest, postRequest } from './network';

export function getReviews(productId, onSuccess, onFail) {
    const path = `/api/v1/product/reviews/${productId}`;
    getRequest(path, onSuccess, onFail);
}

export function createReview({ product_id, rating, comment }, onSuccess, onFail) {
    const path = '/api/v1/user/review/submit';
    const data = { product_id, rating, comment };
    postRequest(path, data, onSuccess, onFail);
}

import { getRequest, postRequest } from './network';

export function getAllProducts(page, category, prices, onSuccess, onFail) {
    let path = `/api/v1/product/search?&page=${page}&brand_ids=&attribute_values=&sort_by=popular`;
    if (category) path += `&category_slug=${category}`;
    if (prices?.length) path += `&min_price=${prices[0]}&max_price=${prices[1]}`;
    getRequest(path, onSuccess, onFail);
}

export function getBestSellingProducts(onSuccess, onFail) {
    const path = '/api/v1/product/search?&page=1&brand_ids=&attribute_values=&sort_by=popular';
    getRequest(path, onSuccess, onFail);
}

export function getNewArrivalProducts(limit, onSuccess, onFail) {
    const path = `/api/v1/product/latest/${limit}`;
    getRequest(path, onSuccess, onFail);
}

export function getRelatedProducts(productId, onSuccess, onFail) {
    const path = `/api/v1/product/related/${productId}`;
    getRequest(path, onSuccess, onFail);
}

export function getSearchedProduct(searchVal, onSuccess, onFail) {
    const path = `/api/v1/search.ajax/${searchVal}`;
    getRequest(path, onSuccess, onFail);
}

export function getProductDetails(slug, onSuccess, onFail) {
    const path = `/api/v1/product/details/${slug}`;
    // getRequest(path, onSuccess, onFail);
    getRequest(path, onSuccess, onFail);
}

export function getAllRatingAndReviews(productId, onSuccess, onFail) {
    const path = `/api/v1/product/reviews/${productId}`;
    getRequest(path, onSuccess, onFail);
}

export function addReviews({ product_id, rating, comment }, onSuccess, onFail) {
    const path = '/api/v1/user/review/submit';
    const data = { product_id, rating, comment };
    postRequest(path, data, onSuccess, onFail);
}

export function applyCoupon(code, onSuccess, onFail) {
    const path = '/api/v1/checkout/coupon/apply';
    const data = {
        coupon_code: code,
    };
    postRequest(path, data, onSuccess, onFail);
}

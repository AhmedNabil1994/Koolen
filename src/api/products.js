import { getRequest } from './network';

// dummy schema
import reviews from '../data/shopProductReviews';

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
    getRequest(path, onSuccess, onFail);
}

// productId
export function getAllRatingAndReviews() {
    return [...reviews];
//    const path = `${}`
//    getRequest(path, onSuccess,onFail)
}

export function addReviews(data) {
    // eslint-disable-next-line
    console.log('addReviews payload: ', data);
}

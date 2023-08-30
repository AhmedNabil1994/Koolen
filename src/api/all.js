import { getRequest } from './network';

export function getPrivacyAndPolicy(onSuccess, onFail) {
    const path = '/api/v1/page/privacy-policy';
    getRequest(path, onSuccess, onFail);
}

export function getRefundPolicy(onSuccess, onFail) {
    const path = '/refund-policy';
    getRequest(path, onSuccess, onFail);
}

export function shippingPolicy(onSuccess, onFail) {
    const path = '/shipping-policy';
    getRequest(path, onSuccess, onFail);
}

// TODO: ADD THIS API
export function getAboutUsData(onSuccess, onFail) {
    const path = '/about-us';
    getRequest(path, onSuccess, onFail);
}

// TODO: ADD THIS API
export function getContactusData(onSuccess, onFail) {
    const path = '/contact-us';
    getRequest(path, onSuccess, onFail);
}

// TODO: ADD THIS API
export function getFAQ(onSuccess, onFail) {
    const path = '/faq';
    getRequest(path, onSuccess, onFail);
}

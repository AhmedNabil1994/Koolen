import { getRequest, postRequest } from './network';

export function getRecentOrders(onSuccess, onFail) {
    const path = '/api/v1/user/orders';
    getRequest(path, onSuccess, onFail);
}
export function getOrderDetails(orderId, onSuccess, onFail) {
    const path = `/api/v1/user/order/${orderId}`;
    getRequest(path, onSuccess, onFail);
}

export function orderRequest({ data }, onSuccess, onFail) {
    const path = '/api/v1/user/orders';
    const payload = { data };
    postRequest(path, payload, onSuccess, onFail);
}

export function createOrder(
    {
        shipping_address_id, payment_type, coupon_codes, cart,
    },
    onSuccess,
    onFail,
) {
    const path = '/api/v1/checkout/order/store';
    const payload = {
        shipping_address_id,
        billing_address_id: shipping_address_id,
        payment_type,
        coupon_codes,
        cart,
    };
    postRequest(path, payload, onSuccess, onFail);
}

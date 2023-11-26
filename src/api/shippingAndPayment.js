import { getRequest, postRequest } from './network';

export function getShippingCost(addressId, onSuccess, onFail) {
    const path = `/api/v1/checkout/get-shipping-cost/${addressId}`;
    getRequest(path, onSuccess, onFail);
}
// {
//     "success": true,
//    ------------------------------------------------------------------> "standard_delivery_cost": 12,
//     "express_delivery_cost": 25
// }

export function orderNow({
    shippingshipping_address_id,
    billing_address_id,
    payment_type, // payment_type : "standard" || "payment"
    coupon_codes,
    cart,
}, onSuccess, onFail) {
    const data = {
        shippingshipping_address_id, billing_address_id, payment_type, coupon_codes, cart,
    };
    const path = '/api/v1/checkout/order/store';
    postRequest(path, data, onSuccess, onFail);
}

export function paymentGateway({ user_Id, order_Code }, onSuccess, onFail) {
    const data = {
        user_Id,
        order_Code,
    };
    const path = '/api/v1/payment/:gateway/pay';
    postRequest(path, data, onSuccess, onFail);
}

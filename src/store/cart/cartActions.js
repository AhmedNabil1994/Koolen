// import { toast } from 'react-toastify';
import {
    CART_ADD_ITEM, CART_REMOVE_ITEM, CART_UPDATE_QUANTITIES, CART_EMPTY,
} from './cartActionTypes';
import { toastSuccess } from '../../components/toast/toastComponent';

export function cartAddItemSuccess(product, options = [], quantity = 1) {
    // toast.success(`Product "${product.name}" added to cart!`, { theme: 'colored' });
    return {
        type: CART_ADD_ITEM,
        product,
        options,
        quantity,
    };
}

export function emptyCartSuccess() {
    return {
        type: CART_EMPTY,
    };
}

export function cartRemoveItemSuccess(itemId) {
    return {
        type: CART_REMOVE_ITEM,
        itemId,
    };
}

export function cartUpdateQuantitiesSuccess(quantities) {
    return {
        type: CART_UPDATE_QUANTITIES,
        quantities,
    };
}

export function cartAddItem(product, options = [], quantity = 1, msg) {
    toastSuccess({ message: msg });
    // sending request to server, timeout is used as a stub
    return (dispatch) => (
        new Promise((resolve) => {
            setTimeout(() => {
                dispatch(cartAddItemSuccess(product, options, quantity));
                resolve();
            }, 100);
        })
    );
}

export function cartRemoveItem(itemId) {
    // sending request to server, timeout is used as a stub
    return (dispatch) => (
        new Promise((resolve) => {
            setTimeout(() => {
                dispatch(cartRemoveItemSuccess(itemId));
                resolve();
            }, 100);
        })
    );
}

export function emptyCartFromItems() {
    return (dispatch) => (
        new Promise((resolve) => {
            setTimeout(() => {
                dispatch(emptyCartSuccess());
                resolve();
            }, 100);
        })
    );
}

export function cartUpdateQuantities(quantities) {
    // sending request to server, timeout is used as a stub
    return (dispatch) => (
        new Promise((resolve) => {
            setTimeout(() => {
                dispatch(cartUpdateQuantitiesSuccess(quantities));
                resolve();
            }, 100);
        })
    );
}

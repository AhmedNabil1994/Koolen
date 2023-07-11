// import { toast } from 'react-toastify';
import { toastSuccess } from '../../components/toast/toastComponent';
import { WISHLIST_ADD_ITEM, WISHLIST_REMOVE_ITEM } from './wishlistActionTypes';

export function wishlistAddItemSuccess(product) {
    // toast.success(`Product "${product.name}" added to wish list!`, { theme: 'colored' });

    return {
        type: WISHLIST_ADD_ITEM,
        product,
    };
}

export function wishlistRemoveItemSuccess(productId) {
    return {
        type: WISHLIST_REMOVE_ITEM,
        productId,
    };
}

export function wishlistAddItem(product, msg) {
    toastSuccess({ message: msg });
    // sending request to server, timeout is used as a stub
    return (dispatch) => (
        new Promise((resolve) => {
            setTimeout(() => {
                dispatch(wishlistAddItemSuccess(product));
                resolve();
            }, 100);
        })
    );
}

export function wishlistRemoveItem(productId) {
    // sending request to server, timeout is used as a stub
    return (dispatch) => (
        new Promise((resolve) => {
            setTimeout(() => {
                dispatch(wishlistRemoveItemSuccess(productId));
                resolve();
            }, 100);
        })
    );
}

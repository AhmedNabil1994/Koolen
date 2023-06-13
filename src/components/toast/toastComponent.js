import { toast } from 'react-toastify';

const autoClose = 5000;
const theme = 'light';

const toastData = {
    position: 'bottom-center',
    autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme,
};

export function toastSuccess(success) {
    const { message } = success;
    if (message) toast.success(message, toastData);
}

export function toastError(fail) {
    if (fail?.data)toast.error(fail?.data?.message, toastData);
    else if (fail?.message)toast.error(fail.message, toastData);
    else toast.error('An Error Occured', toastData);
}

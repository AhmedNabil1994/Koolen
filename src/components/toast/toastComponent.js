import { toast } from 'react-toastify';

const autoClose = 2000;
const theme = 'light';

const toastData = {
    position: 'bottom-center',
    autoClose,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme,
    limit: 3,
};

export function toastSuccess(success) {
    const { message } = success;
    if (message) toast.success(message, toastData);
}

export function toastError(fail) {
    toastData.toastId = 'only one';
    if (fail?.data)toast.error(fail?.data?.message, toastData);
    // if (fail?.data)toast.error('Email cannot be null or empty!', toastData);
    else if (fail?.message)toast.error(fail.message, toastData);
    else toast.error('An Error Occured', toastData);
}

// export function toastErrorMail() {
//     toast.error('Empty fiels', toastData);
// }

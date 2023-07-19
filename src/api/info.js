import { getRequest } from './network';

function getInfoData(onSuccess, onFail) {
    const path = '';
    getRequest(path, onSuccess, onFail);
}
export default getInfoData;

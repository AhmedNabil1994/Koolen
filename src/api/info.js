import { getRequest } from './network';

function getInfoData(onSuccess, onFail) {
    const path = '/api/v1/page';
    getRequest(path, onSuccess, onFail);
}
export default getInfoData;

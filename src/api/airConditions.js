import { getRequest } from './network';

export default function getAirConditions(onSuccess, onFail) {
    const path = '/api/v1/page/airconditions';
    getRequest(path, onSuccess, onFail);
}

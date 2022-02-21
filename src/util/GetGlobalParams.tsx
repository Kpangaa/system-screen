import {store} from '../index';

export const GetGlobalParams = () => {
    return store.getState().general.globalParams;
};
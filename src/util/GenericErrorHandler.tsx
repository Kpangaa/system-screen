import { ERROR_MESSAGE } from '../actions/types';
import {store} from '../index';

export const genericErrorHandler = (error: any) => {
  const {dispatch} = store;

  let title = 'UPS! Ocurrió un error';
  let description = 'Error Sistema';

  if (error.message === 'Network Error') {
    title = '¡UPS! Error de conexión';
    description = 'Intenta conectarte a una red Wi-Fi o datos móviles';
  } else {
    if (error.response && error.response.data && error.response.data.message) {
      title = error.response.data.message;
    }

    if (error.response && error.response.data && error.response.data.errors) {
      description = error.response.data.errors
        .map((err: any) => err.message)
        .join(' ');
    }
  }
  debugger
  dispatch({
    type: ERROR_MESSAGE,
    payload: {title: title, description: description},
  });
};
import {api, BASE_URL} from './apis';
import axios from 'axios';

const configParams = {
  'Content-Type': 'application/json',
};

export const LOGIN_CALL = data => {
  return axios.post(api.auth.login, data, {headers: configParams});
};

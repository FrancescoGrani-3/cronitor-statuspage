import axios from 'axios';

import { API_BASE_URL } from '../constants/api';
import configs from '../configs'

const fetchAPI = axios.create({
  baseURL: API_BASE_URL,
});

fetchAPI.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

fetchAPI.defaults.headers['Authorization'] = 'Basic ' + new Buffer.from(configs.CRONITOR_API_KEY + ':').toString('base64')

export default fetchAPI;

export const fetchInternalAPI = axios.create({
  baseURL: 'api'
});

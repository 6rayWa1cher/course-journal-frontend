import axios from 'axios';
import { stringify } from 'qs';

const ip = process.env.REACT_APP_BACKEND_URL;

const defaultHeaders = {};

const defaultBodyHeaders = {
  ...defaultHeaders,
  'Content-Type': 'application/json',
};

const goodStatus = (status: number) => [200, 201, 204].includes(status);

export const basicAxios = axios.create({
  baseURL: ip,
  headers: defaultBodyHeaders,
  validateStatus: goodStatus,
});

export const mainAxios = axios.create({
  baseURL: ip,
  headers: defaultBodyHeaders,
  validateStatus: goodStatus,
  paramsSerializer: (params) => stringify(params, { arrayFormat: 'repeat' }),
});

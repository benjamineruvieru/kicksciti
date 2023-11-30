import axios from 'axios';
import {BASEURL} from './base';

export const findEmail = ({email}) => {
  const res = axios.post(`${BASEURL}/find-email`, {email});
  return res;
};

export const createUser = ({email, password, username, name}) => {
  const res = axios.post(`${BASEURL}/create-user`, {
    email,
    password,
    username,
    name,
  });
  return res;
};
export const login = ({identifier, password}) => {
  const res = axios.post(`${BASEURL}/login`, {identifier, password});
  return res;
};

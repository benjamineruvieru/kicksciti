import axios from 'axios';
import {BASEURL} from './base';

export const findEmail = ({email}) => {
  const res = axios.post(`${BASEURL}/find-email`, {email});
  return res;
};

export const createUser = ({email, password, username, name, token}) => {
  const res = axios.post(
    `${BASEURL}/create-user`,
    {
      email,
      password,
      username,
      name,
    },
    {
      headers: {Authorization: `Bearer ${token}`},
    },
  );
  return res;
};
export const login = ({identifier, password}) => {
  const res = axios.post(`${BASEURL}/login`, {identifier, password});
  return res;
};

export const verifyEmail = ({otp, token}) => {
  console.log('to', token);
  const res = axios.post(
    `${BASEURL}/verify-otp`,
    {
      otp,
    },
    {
      headers: {Authorization: `Bearer ${token}`},
    },
  );
  return res;
};

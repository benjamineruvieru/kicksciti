import axios from 'axios';
import {BASEURL, axiosBase} from './base';

export const findEmail = ({email}) => {
  const res = axios.post(`${BASEURL}/find-email`, {email});
  return res;
};

export const createUser = ({email, password, username, name, token}) => {
  console.log({
    email,
    password,
    username,
    name,
  });
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

export const logout = () => {
  const axiosInstance = axiosBase();

  const res = axiosInstance.post(`${BASEURL}/logout`);
  return res;
};

export const deleteAccount = () => {
  const axiosInstance = axiosBase();

  const res = axiosInstance.delete(`${BASEURL}/delete-account`);
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

export const resendOtp = ({token}) => {
  console.log('to', token);
  const res = axios.post(`${BASEURL}/resend-otp`, null, {
    headers: {Authorization: `Bearer ${token}`},
  });
  return res;
};

export const resetPassword = ({otp, password, email}) => {
  const res = axios.post(`${BASEURL}/reset-password`, {
    otp,
    password,
    email,
  });
  return res;
};

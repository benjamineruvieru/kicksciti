import axios, {AxiosResponse} from 'axios';
import {BASEURL, axiosBase} from './base';

interface AxiosBaseResponse extends AxiosResponse {
  data: any | {error: any};
}

interface CreateUserRequest {
  email?: string;
  password?: string;
  username?: string;
  name?: string;
  token?: string;
}

interface VerifyEmailRequest {
  otp?: string;
  token: string;
}

interface ResetPaswordRequest {
  otp?: string;
  email: string;
  password?: string;
}

interface LoginRequest {
  identifier: string;
  password: string;
}
export const findEmail = ({
  email,
}: {
  email: string;
}): Promise<AxiosBaseResponse> => {
  const res = axios.post(`${BASEURL}/find-email`, {email});
  return res;
};

export const createUser = ({
  email,
  password,
  username,
  name,
  token,
}: CreateUserRequest): Promise<AxiosBaseResponse> => {
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
export const login = ({identifier, password}: LoginRequest) => {
  const res = axios.post(`${BASEURL}/login`, {identifier, password});
  return res;
};

export const logout = () => {
  const axiosInstance = axiosBase();

  const res = axiosInstance?.post(`${BASEURL}/logout`);
  return res;
};

export const deleteAccount = () => {
  const axiosInstance = axiosBase();

  const res = axiosInstance?.delete(`${BASEURL}/delete-account`);
  return res;
};

export const verifyEmail = ({otp, token}: VerifyEmailRequest) => {
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

export const resendOtp = ({token}: VerifyEmailRequest) => {
  console.log('to', token);
  const res = axios.post(`${BASEURL}/resend-otp`, null, {
    headers: {Authorization: `Bearer ${token}`},
  });
  return res;
};

export const resetPassword = ({otp, password, email}: ResetPaswordRequest) => {
  const res = axios.post(`${BASEURL}/reset-password`, {
    otp,
    password,
    email,
  });
  return res;
};

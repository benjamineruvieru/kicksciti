import axios from 'axios';
import {BASEURL, axiosBase} from './base';

export const addToServerFavourite = async ({_id, add = true}) => {
  const axiosInstance = axiosBase();
  const res = axiosInstance.post(`${BASEURL}/add-favourite`, {_id, add});
  return res;
};

export const addToServerCart = async ({_id, add = true, quantity, size}) => {
  const axiosInstance = axiosBase();

  const res = axiosInstance.post(`${BASEURL}/add-cart`, {
    _id,
    add,
    quantity,
    size,
  });
  return res;
};

export const updateServerCart = async ({_id, quantity, size}) => {
  const axiosInstance = axiosBase();

  const res = axiosInstance.post(`${BASEURL}/update-cart`, {
    _id,
    quantity,
    size,
  });
  return res;
};

export const getEarnings = async ({}) => {
  const axiosInstance = axiosBase();

  const res = await axiosInstance.get(`${BASEURL}/get-earnings`);
  return res.data;
};

export const updateProfilePic = async ({picture}) => {
  const axiosInstance = axiosBase();

  const res = axiosInstance.post(`${BASEURL}/update-profilepic`, {picture});
  return res;
};

export const getNotifications = async ({pageParam = 1}) => {
  const axiosInstance = axiosBase();

  const res = await axiosInstance.get(
    `${BASEURL}/fetch-notifications?page=${pageParam}&pageSize=20`,
  );
  return res?.data;
};

export const getBanks = async ({}) => {
  const axiosInstance = axiosBase();

  const res = await axiosInstance.get(`${BASEURL}/get-banks`);
  return res?.data;
};

export const verifyBankDetails = async ({account_number, account_bank}) => {
  const axiosInstance = axiosBase();

  const res = axiosInstance.post(`${BASEURL}/verify-bankdetails`, {
    account_number,
    account_bank,
  });
  return res;
};

export const getWithdrawFee = async ({amount}) => {
  const axiosInstance = axiosBase();

  const res = axiosInstance.post(`${BASEURL}/get-withdrawfee`, {amount});
  return res;
};

export const withdraw = async ({amount, fee, account_bank, account_number}) => {
  const axiosInstance = axiosBase();

  const res = axiosInstance.post(`${BASEURL}/withdraw`, {
    amount,
    fee,
    account_bank,
    account_number,
  });
  return res;
};

export const getAppVersion = async () => {
  const res = axios.get(`${BASEURL}/getapp-version`);
  return res;
};

export const updateFcmtoken = async ({token}) => {
  const axiosInstance = axiosBase();

  const res = axiosInstance.post(`${BASEURL}/update-fcmtoken`, {token});
  return res;
};

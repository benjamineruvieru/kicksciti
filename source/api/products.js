import axios from 'axios';
import {BASEURL, axiosBase} from './base';

export const getProducts = async ({pageParam = 1, queryKey}) => {
  const category = queryKey[1];
  console.log('category', category);
  const res = await axios.get(
    `${BASEURL}/fetch-products?page=${pageParam}&pageSize=20&category=${category}`,
  );
  console.log('prod res', res);
  return res?.data;
};

export const getCategories = async ({}) => {
  const res = await axios.get(`${BASEURL}/get-categories`);
  console.log('cate res', res);
  return res?.data;
};

export const getCart = async () => {
  const axiosInstance = axiosBase();

  const res = axiosInstance.get(`${BASEURL}/get-cart`);
  return res;
};

export const makePayment = async ({state, lga, address, phone}) => {
  const axiosInstance = axiosBase();

  const res = axiosInstance.post(`${BASEURL}/make-payment`, {
    state,
    lga,
    address,
    phone,
  });
  return res;
};

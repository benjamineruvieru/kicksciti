import axios from 'axios';
import {BASEURL, axiosBase} from './base';

export const getProducts = async ({pageParam = 1, queryKey}) => {
  const category = queryKey[1];
  const search = queryKey[2];
  console.log('search', search);
  const res = await axios.get(
    `${BASEURL}/fetch-products?page=${pageParam}&pageSize=20&category=${category}`,
    {
      params: {
        search,
      },
    },
  );
  return res?.data;
};

export const getCategories = async ({}) => {
  const res = await axios.get(`${BASEURL}/get-categories`);
  return res?.data;
};

export const getCart = async () => {
  const axiosInstance = axiosBase();

  const res = axiosInstance.get(`${BASEURL}/get-cart`);
  return res;
};

export const makePayment = async ({
  state,
  lga,
  address,
  phone,
  paymentOnDelivery = false,
}) => {
  const axiosInstance = axiosBase();

  const res = axiosInstance.post(`${BASEURL}/make-payment`, {
    state,
    lga,
    address,
    phone,
    BASEURL,
    paymentOnDelivery,
  });
  return res;
};

export const getProduct = async ({product_id}) => {
  const res = axios.get(`${BASEURL}/get-product?product_id=${product_id}`);
  return res;
};

export const addReferredby = async ({product_id, username}) => {
  const axiosInstance = axiosBase();

  const res = axiosInstance.post(`${BASEURL}/add-referredby`, {
    product_id,
    username,
  });
  return res;
};

export const viewProduct = async ({product_id}) => {
  const axiosInstance = axiosBase();

  const res = axiosInstance.post(`${BASEURL}/view-product`, {product_id});
  return res;
};

export const updateFaveProduct = async ({product_id, isIncrease}) => {
  const axiosInstance = axiosBase();

  const res = axiosInstance.post(`${BASEURL}/update-favecount`, {
    product_id,
    isIncrease,
  });
  return res;
};

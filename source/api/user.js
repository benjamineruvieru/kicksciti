import {BASEURL, axiosBase} from './base';

export const addToFavourite = async ({_id, add = true}) => {
  const axiosInstance = axiosBase();
  const res = axiosInstance.post(`${BASEURL}/add-favourite`, {_id, add});
  return res;
};

export const addToCart = async ({_id, add = true}) => {
  const axiosInstance = axiosBase();

  const res = axiosInstance.post(`${BASEURL}/add-cart`, {_id, add});
  return res;
};

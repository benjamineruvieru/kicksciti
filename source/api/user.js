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

import {BASEURL, axiosBase} from './base';

export const getOrder = async ({queryKey}) => {
  const order_id = queryKey[1];

  const axiosInstance = axiosBase();

  const res = await axiosInstance.get(
    `${BASEURL}/get-order?order_id=${order_id}`,
  );
  return res?.data;
};

export const fetchOrders = async ({}) => {
  const axiosInstance = axiosBase();

  const res = await axiosInstance.get(`${BASEURL}/fetch-orders`);
  return res?.data;
};

export const retryPayment = async ({order_id}) => {
  const axiosInstance = axiosBase();

  const res = axiosInstance.post(`${BASEURL}/retry-payment`, {
    BASEURL,
    order_id,
  });
  return res;
};

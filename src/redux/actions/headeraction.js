import {
  CHANGE_NAV,
  PUT_CARTLIST,
  PUT_SUBPRICE,
  ADD_SUBPRICE,
  PUT_DELIVERY,
  PUT_FAVORTIES,
  PUT_GENDER,
  PUT_NAME,
  PUT_PHONENUMBER,
  PUT_LOGIN,
  PUT_NETWORK,
  ADD_FAVORTIES,
} from './actions';

export const nav_change = header => {
  return {type: CHANGE_NAV, data: header};
};

export const put_cartlist = map => {
  return {type: PUT_CARTLIST, data: map};
};

export const put_subprice = num => {
  return {type: PUT_SUBPRICE, data: num};
};

export const add_subprice = num => {
  return {type: ADD_SUBPRICE, data: num};
};

export const put_delivery = num => {
  return {type: PUT_DELIVERY, data: num};
};

export const put_favorties = num => {
  return {type: PUT_FAVORTIES, data: num};
};

export const put_gender = text => {
  return {type: PUT_GENDER, data: text};
};
export const put_name = text => {
  return {type: PUT_NAME, data: text};
};
export const put_phonenumber = text => {
  return {type: PUT_PHONENUMBER, data: text};
};
export const put_login = text => {
  return {type: PUT_LOGIN, data: text};
};
export const put_network = text => {
  return {type: PUT_NETWORK, data: text};
};
export const add_favorties = text => {
  return {type: ADD_FAVORTIES, data: text};
};

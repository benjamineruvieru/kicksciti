import {Provider} from 'react-redux';
import {
  CHANGE_NAV,
  PUT_CARTLIST,
  ADD_SUBPRICE,
  PUT_SUBPRICE,
  PUT_DELIVERY,
  PUT_FAVORTIES,
  PUT_GENDER,
  PUT_NAME,
  PUT_PHONENUMBER,
  PUT_LOGIN,
  PUT_NETWORK,
  ADD_FAVORTIES,
} from './actions/actions';
import React from 'react';
import {storeData} from '../constants';

import {createStore} from 'redux';
import {DBSubprice} from '../constants/Functions';

const initialState = {
  header: 'no',
  cartList: [],
  subprice: 0,
  delivery: 0,
  favList: [],
  gender: '',
  name: '',
  phonenumber: '',
  loggedin: null,
  network: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_NAV:
      return {
        ...state,
        header: action.data,
      };

    case PUT_CARTLIST:
      return {
        ...state,
        cartList: action.data,
      };
    case PUT_SUBPRICE:
      DBSubprice(action.data);
      return {
        ...state,
        subprice: action.data,
      };
    case ADD_SUBPRICE:
      storeData('subprice', (state.subprice + action.data).toString(10));
      DBSubprice(state.subprice + action.data);
      return {
        ...state,
        subprice: state.subprice + action.data,
      };
    case PUT_DELIVERY:
      return {
        ...state,
        delivery: action.data,
      };
    case ADD_FAVORTIES:
      return {
        ...state,
        favList: action.data,
      };
    case PUT_FAVORTIES:
      //console.log(action.data);
      storeData('favorites', JSON.stringify([...state.favList, action.data]));

      return {
        ...state,
        favList: [...state.favList, action.data],
      };

    case PUT_GENDER:
      return {
        ...state,
        gender: action.data,
      };
    case PUT_NAME:
      return {
        ...state,
        name: action.data,
      };
    case PUT_PHONENUMBER:
      return {
        ...state,
        phonenumber: action.data,
      };
    case PUT_LOGIN:
      return {
        ...state,
        loggedin: action.data,
      };
    case PUT_NETWORK:
      return {
        ...state,
        network: action.data,
      };

    default:
      return state;
  }
};

const store = createStore(reducer);

const ProviderContainer = props => {
  return <Provider store={store}>{props.children}</Provider>;
};

export default ProviderContainer;

import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Action } from "../actions/index";

export const addToCart = (id: string, qty: number) => {
  return async (dispatch: Dispatch<Action>) => {
    const { data } = await axios.get(`/api/v1/products/${id}`);

    dispatch({
      type: ActionType.CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });
  };
};

export const removeFromCart = (id: string) => {
  return async (dispatch: Dispatch<Action>, getState: any) => {
    dispatch({
      type: ActionType.CART_REMOVE_ITEM,
      payload: id,
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

export const saveShippingAddress = (data: any) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CART_SAVE_SHIPPING_ITEM,
      payload: data,
    });

    localStorage.setItem("shippingAddress", JSON.stringify(data));
  };
};

export const savePaymentMethod = (data: any) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CART_SAVE_PAYMENT_ITEM,
      payload: data,
    });

    localStorage.setItem("paymentMethod", JSON.stringify(data));
  };
};

export const getProducts = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({
        type: ActionType.GET_PRODUCT_REQUEST,
      });

      const { data } = await axios.get(`/api/v1/products`);

      dispatch({
        type: ActionType.GET_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.GET_PRODUCT_FAIL,
        payload: error,
      });
    }
  };
};

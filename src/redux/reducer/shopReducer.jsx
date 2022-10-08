// rxslice (Redux toolkit)
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cart: [{ id: 1, name: "product1", image: "", price: 100, quantity: 1 }],
  dataProduct: [],
};

const shopReducer = createSlice({
  name: "shopReducer", //ten reducer/ actionname
  initialState, // gia tri mac dinh cua (state Default)
  reducers: {
    // switch case
    getProductApiAction: (state, action) => {
      console.log(action);
      state.dataProduct = action.payload;
    },

    addToCartAction: (state, action) => {
      // console.log('action',action);
      const itemCart = state.cart.find((item) => item.id === action.payload.id);
      if (itemCart) {
        itemCart.quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
    },
    delItemAction: (state, action) => {
      const id = action.payload;
      state.cart = state.cart.filter((item) => item.id !== id);
    },
    changeQuantityAction: (state, action, a) => {
      const { id, quantity } = action.payload;

      const itemCart = state.cart.find((item) => item.id === id);
      if (itemCart) {
        itemCart.quantity += quantity;
        if (itemCart.quantity < 1) {
          // alert('Số lượng nhỏ hơn 1');
          // itemCart.quantity -= quantity;
          if (window.confirm("Do you want to del ?")) {
            state.cart = state.cart.filter((item) => item.id !== id);
          } else {
            itemCart.quantity -= quantity;
          }
        }
      }
    },
  },
});

export const {
  getProductApiAction,
  delItemAction,
  changeQuantityAction,
  addToCartAction,
} = shopReducer.actions;

export default shopReducer.reducer;

//=============== redux thunk =================
export const getAllProductApi = () => {
  return async (dispatch, getState) => {
    try {
      const result = await axios({
        url: "https://shop.cyberlearn.vn/api/Product",
        method: "GET",
      });
      //Xử lý dispatch lên reducer
      // dispatch({
      //     type:'shopReducer/getProductApi',
      //     data:result.data.content
      // })
      dispatch(getProductApiAction(result.data.content));
      // action = {
      //     type: 'shopReducer/getProductApiAction',
      //     payload: result.data.content
      // }
    } catch (err) {
      console.log(err);
    }
  };
};

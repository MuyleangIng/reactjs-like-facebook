import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalItems: 0
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCard: (state, action) => {
      //   console.log("action", action);
      const { payload } = action;
      // check if product existing
      const isExisting = state.cartItems.some(
        (item) => item.id === action.payload.id
      );
      //   if Existing increase qty
      if (isExisting) {
        state.cartItems.map((item) => {
          if (item.id === action.payload.id) {
            item.qty += 1;
            state.totalItems += 1;
          }
        });
      } else {
        state.cartItems.push(payload);
        state.totalItems += 1;
      }
    },
    increaseQty: (state, action) => {
      // if product existing
      const isExisting = state.cartItems.some(
        (item) => item.id === action.payload.id
      );
      if (isExisting) {
        state.cartItems.map((item) => {
          if (item.id === action.payload.id) {
            item.qty += 1;
          }
        });
      }
      console.log("isExisting", isExisting);
    },
    decreaseQty: (state, action) => {
      // if product existing
      const isExisting = state.cartItems.some(
        (item) => item.id === action.payload.id
      );
      if (isExisting) {
        state.cartItems.map((item) => {
          if (item.id === action.payload.id && item.qty > 1) {
            item.qty -= 1;
            state.totalItems -= 1;
          } else if (item.id === action.payload.id && item.qty === 1) {
            state.cartItems = state.cartItems.filter(
              (item) => item.id !== action.payload.id
            );
            state.totalItems -= 1;
          }
        });
      }
    },
    removeAll: (state) => {
      state.cartItems = [];
      state.totalItems = 0;
    }
  }
});

// export action
export const { addToCard, increaseQty, decreaseQty, removeAll } =
  cartSlice.actions;
// export select
export const selectCartITems = (state) => state?.cart?.cartItems;

// export reducer
export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      // console.log("action", action);
      state.value += action.payload;
    }
  }
});

// export action
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectValue = (state) => state.counter.value;
// export reducer
export default counterSlice.reducer;

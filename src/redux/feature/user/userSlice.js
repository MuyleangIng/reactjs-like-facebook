import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SportHub_Base_Url } from "../../api";

const initialState = {
  createUser: {},
  verifyEmail: {},
  status: "idle",
  error: null
};

// create fetch user
export const fetchCreateUser = createAsyncThunk(
  "user/fetchCreateUser",
  async ({ username, email, password, confirmPassword }) => {
    // convert javascript object to json
    const body = JSON.stringify({
      username,
      email,
      password,
      confirmPassword
    });
    const response = await fetch(`${SportHub_Base_Url}register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body
    });
    // convert json to javascript object
    const user = await response.json();
    return user;
  }
);
// verify-email
export const fetchVerifyEmail = createAsyncThunk(
  "user/fetchVerifyEmail",
  async ({ email, otp_code }) => {
    const body = JSON.stringify({
      email,
      otp_code
    });
    const response = await fetch(`${SportHub_Base_Url}verify-otp/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body
    });
    const apiResponse = await response.json();
    return apiResponse;
  }
);

// create reducer and action
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCreateUser.fulfilled, (state, action) => {
        // console.log("action.payload", action.payload);
        state.status = "success";
        state.createUser = action.payload;
      })
      .addCase(fetchCreateUser.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchVerifyEmail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVerifyEmail.fulfilled, (state, action) => {
        console.log("action.payload", action.payload);
        state.status = "success";
        state.verifyEmail = action.payload;
      })
      .addCase(fetchVerifyEmail.rejected, (state) => {
        state.status = "failed";
      });
  }
});

// export reducer
export default userSlice.reducer;

// export action
// export const {} = userSlice.actions;
// export selector
export const selectUser = (state) => state?.user?.createUser;
export const selectVerifyEmail = (state) => state?.user?.verifyEmail;

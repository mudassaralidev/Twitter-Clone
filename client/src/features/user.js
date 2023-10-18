import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    data: undefined,
    error: undefined,
    loginUserId: undefined,
    loggedIn: false,
  },
  reducers: {
    request: (state) => {
      state.loading = true;
    },
    getLoggedInUserId: (state) => {
      if (document.cookie !== "") {
        const token = document.cookie.split("=")[1];
        state.loginUserId = jwt_decode(token).userId;
      }
    },
    isLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    fail: (state, action) => {
      Object.assign(state, { loading: false, error: action.payload });
    },
  },
});

export const {
  request,
  isLoggedIn,
  getLoggedInUserId,
  fail,
} = userSlice.actions;

export default userSlice.reducer;

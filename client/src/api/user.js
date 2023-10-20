import axios from "axios";
import { toast } from "react-toastify";
import { isLoggedIn, request } from "../features/user";

export const registerUser = async (data) => {
  try {
    const res = await axios.post("/users/signup", data, {
      withCredentials: true,
    });
    toast.success(res.data, {
      autoClose: 3000,
    });
  } catch (error) {
    toast.error(error.response.data.msg, {
      autoClose: 5000,
    });
  }
};

export const logIn = async (data) => {
  try {
    const res = await axios.post("/users/login", data, {
      withCredentials: true,
    });

    toast.success(res.data, {
      autoClose: 3000,
    });
    return "success";
  } catch (error) {
    toast.error(error.response.data.msg, {
      autoClose: 5000,
    });
  }
};

export const loggedInDetail = async (dispatch) => {
  try {
    dispatch(request(true))
    const res = await axios.get("/users/loggedIn").then((res) => res.data);
    dispatch(isLoggedIn(res));
    dispatch(request(false))
  } catch (err) {
    dispatch(isLoggedIn(false));
    dispatch(request(false))
  }
};

export const logoutUser = async () => {
  await axios.get("/users/logout", {
    withCredentials: true,
  });
  window.location.href = "/";
  toast.success("Log out successfully", {
    autoClose: 3000,
  });
};

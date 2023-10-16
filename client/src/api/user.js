import axios from "axios";
import { toast } from "react-toastify";

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

export const loggedInDetail = async (setLoggedIn) => {
  const res = await axios.get("/users/loggedIn").then((res) => res.data);
  setLoggedIn(res)
};

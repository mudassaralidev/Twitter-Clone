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
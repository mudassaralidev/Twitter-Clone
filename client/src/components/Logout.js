import { React } from "react";
import { logoutUser, loggedInDetail } from "../api/user";

import { useDispatch } from "react-redux";

export default function Logout() {
  const dispatch = useDispatch();

  const loggingOut = async () => {
    await logoutUser();

    await loggedInDetail(dispatch);
  };
  return (
    <button className="btn btn-secondary btn-lg mt-3" style={{ borderRadius: "25px !important" }} onClick={loggingOut}>
      Log Out
    </button>
  );
}

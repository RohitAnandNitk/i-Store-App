import { serverURL } from "../store";
import axios from "axios";

//action login
export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "loginRequest",
      });
      // console.log("Login action triggered");
      // console.log("Request body:", typeof email, email);
      // console.log("Request body:", typeof password, password);
      const { data } = await axios.post(
        `${serverURL}/user/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Login successful:", data);

      dispatch({
        type: "loginSuccess",
        payload: data?.message,
      });
    } catch (error) {
      console.error("Login error:", error);
      dispatch({
        type: "loginFailed",
        payload: error.response.data.message,
      });
    }
  };
};

import { serverURL } from "../store";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// USER LOGIN ACTION
export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "loginRequest",
      });
      const { data } = await axios.post(
        `${serverURL}/user/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Login successful");
      dispatch({
        type: "loginSuccess",
        payload: data,
      });
      // set token to local storage
      console.log("getting token atfer login : ", data?.token);
      await AsyncStorage.setItem("@token", data?.token);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        dispatch({
          type: "loginFailed",
          payload: error.response.data.message,
        });
      } else {
        console.error("Unexpected login error:", error);
        const errorMessage =
          error.response?.data?.message || "An unexpected error occurred";
        dispatch({
          type: "loginFailed",
          payload: errorMessage,
        });
      }
    }
  };
};

//GET USER DATA ACTION
export const getUserData = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "getUserDataRequest",
      });
      const { data } = await axios.get(`${serverURL}/user/profile`);

      console.log("Data fetched successful:", data);
      dispatch({
        type: "getUserDataSuccess",
        payload: data?.user,
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        dispatch({
          type: "getUserDataFailed",
          payload: error.response.data.message,
        });
      } else {
        console.error("Unexpected login error:", error);
        const errorMessage =
          error.response?.data?.message || "An unexpected error occurred";
        dispatch({
          type: "getUserDataFailed",
          payload: errorMessage,
        });
      }
    }
  };
};
//REGISTER ACTION
export const register = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "registerRequest",
    });
    // now call the api
    const { data } = await axios.post(`${serverURL}/user/register`, formData, {
      "Content-Type": "application/json",
    });

    dispatch({
      type: "registerSuccess",
      payload: data.message,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "registerFailed",
      payload: error.response.data.message,
    });
  }
};

//LOGOUT ACTION
export const logout = () => {
  return async (dispatch) => {
    console.log("req for logut...");
    try {
      dispatch({
        type: "logoutRequest",
      });
      const { data } = await axios.get(`${serverURL}/user/logout`);

      console.log("Logout successful:", data);
      dispatch({
        type: "logoutSuccess",
        payload: data?.message,
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        dispatch({
          type: "logoutFailed",
          payload: error.response.data.message,
        });
      } else {
        console.error("Unexpected login error:", error);
        const errorMessage =
          error.response?.data?.message || "An unexpected error occurred";
        dispatch({
          type: "logoutFailed",
          payload: errorMessage,
        });
      }
    }
  };
};

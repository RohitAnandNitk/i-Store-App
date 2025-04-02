import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useReduxStateHook = (navigation, path = "login") => {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.user);

  useEffect(() => {
    console.log("error :", error);

    if (error) {
      alert(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      alert(message);
      dispatch({ type: "clearMessage" });
      navigation.reset({
        index: 0,
        routes: [{ name: path }],
      });
    }
  }, [error, dispatch, message]);
  return loading;
};

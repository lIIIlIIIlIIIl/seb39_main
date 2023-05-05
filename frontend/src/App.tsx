/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { useDispatch } from "react-redux";

import { loginActions } from "./redux/loginSlice";
import RoutesTree from "./RoutesTree";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const localData = localStorage.getItem("user");
    const userInfo = localData && JSON.parse(localData);

    dispatch(loginActions.login());
    dispatch(loginActions.setUserInfo(userInfo));
  }, []);

  return (
    <>
      <RoutesTree />
      <ReactQueryDevtools />
    </>
  );
};

export default App;

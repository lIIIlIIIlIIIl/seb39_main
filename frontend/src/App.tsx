/* eslint-disable react-hooks/exhaustive-deps */
import { ReactQueryDevtools } from "react-query/devtools";

import { useAppDispatch } from "./hooks/Redux";
import { loginActions } from "./redux/loginSlice";
import RoutesTree from "./RoutesTree";

const App = () => {
  const dispatch = useAppDispatch();
  const userInfo = localStorage.getItem("user");

  if (!userInfo) {
    dispatch(loginActions.logout());
  }

  if (userInfo) {
    dispatch(loginActions.login());
  }

  return (
    <>
      <RoutesTree />
      <ReactQueryDevtools />
    </>
  );
};

export default App;

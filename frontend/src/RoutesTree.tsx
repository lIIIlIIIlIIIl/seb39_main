import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import Main from "./Main";
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const New = lazy(() => import("./pages/New"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Participate = lazy(() => import("./pages/Participate"));
const Password = lazy(() => import("./pages/Password"));
const SignUp = lazy(() => import("./pages/SignUp"));
const User = lazy(() => import("./pages/User"));
const Category = lazy(() => import("./pages/Category"));
const Chat = lazy(() => import("./pages/Chat"));
const CurrentStatus = lazy(() => import("./pages/CurrentStatus"));
const Detail = lazy(() => import("./pages/Detail"));
const Edit = lazy(() => import("./pages/Edit"));
const Favorite = lazy(() => import("./pages/Favorite"));
const GroupBuying = lazy(() => import("./pages/GroupBuying"));

const RoutesTree = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/groupbuying" element={<GroupBuying />} />
          <Route path="/groupbuying/:regions" element={<GroupBuying />} />
          <Route
            path="/groupbuying/:regions/:towns"
            element={<GroupBuying />}
          />
          <Route path="/:user_id/:product_id" element={<Detail />} />
          <Route
            path="/participate/:user_id/:product_id"
            element={<Participate />}
          />
          <Route path="/edit" element={<Edit />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/new" element={<New />} />
          <Route path="/user" element={<User />} />
          <Route path="/current" element={<CurrentStatus />} />
          <Route path="/favorite" element={<Favorite />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/password" element={<Password />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default RoutesTree;

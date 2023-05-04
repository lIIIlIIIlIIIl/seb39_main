/* eslint-disable import/named */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  isLogin: boolean;
  profileImage_uri: string;
  userId: number;
  userNickname: string;
}

export interface UserInfo {
  profileImage_uri: string;
  userId: number;
  userNickname: string;
}

const initialState: LoginState = {
  isLogin: false,
  profileImage_uri: "",
  userId: 0,
  userNickname: "",
};

const loginSlice = createSlice({
  name: "loginHandler",
  initialState,
  reducers: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },
    setUserInfo(state, action: PayloadAction<UserInfo>) {
      state.profileImage_uri = action.payload.profileImage_uri;
      state.userId = action.payload.userId;
      state.userNickname = action.payload.userNickname;
    },
    deleteUserInfo(state) {
      state.profileImage_uri = "";
      state.userId = 0;
      state.userNickname = "";
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice;

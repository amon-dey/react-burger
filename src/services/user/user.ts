import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, logout, postRegister, userGetInfo, userSetInfo } from "../thunks/thunks";
import { IUserType, IUserPayload } from "../../utils/types";

type TUserState = {
  user: IUserType | null;
  isAuthChecked: boolean;
  lastError: string | null;
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  lastError: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<IUserType | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.lastError = '';
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<IUserPayload>) => {
        state.user = action.payload.user;
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        state.isAuthChecked = true;
        state.lastError = '';
      })
      .addCase(login.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.lastError = action.payload || "Не известная ошибка";
      })
      .addCase(logout.fulfilled, (state) => {
        state.lastError = '';
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        state.user = null;
      })
      .addCase(logout.rejected, (state) => {
        state.lastError = '';
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        state.user = null;
      })
      .addCase(postRegister.fulfilled, (state, action: PayloadAction<IUserPayload>) => {
        state.user = action.payload.user;
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        state.isAuthChecked = true;
      })
      .addCase(postRegister.rejected, (state, action: PayloadAction<string | undefined>) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        state.isAuthChecked = true;
        state.lastError = action.payload || "ошибка";
      })
      .addCase(userGetInfo.fulfilled, (state, action: PayloadAction<{ user: IUserType }>) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(userGetInfo.rejected, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(userSetInfo.fulfilled, (state, action: PayloadAction<{ user: IUserType }>) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      });
  },
});

export const { setIsAuthChecked, setUser } = userSlice.actions;

export const getIsAuthChecked = (state: { user: TUserState }) => state.user.isAuthChecked;
export const getUser = (state: { user: TUserState }) => state.user.user;
export const getLastLoginError = (state: { user: TUserState }) => state.user.lastError;
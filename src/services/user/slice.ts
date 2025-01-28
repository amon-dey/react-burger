import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, logout, postRegister, checkUserAuth } from "./../thunks/thunks";
import { UserType } from "../../utils/types";

type TUserState = {
  user: UserType | null;
  isAuthChecked: boolean;
  lastError: string | null
}

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
    setUser: (state, action: PayloadAction<UserType | null>) => {
      state.user = action.payload;
    }
  },
  selectors: {
    getIsAuthChecked: (state) => state.isAuthChecked,
    getUser: (state) => state.user,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload)
          state.user = action.payload.user
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        state.isAuthChecked = true;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        state.user = null;
      })
      .addCase(logout.rejected, (state) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        state.user = null;
      })
      .addCase(postRegister.fulfilled, (state, action) => {
        if (action.payload)
          state.user = action.payload.user
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        state.isAuthChecked = true
      })
      .addCase(postRegister.rejected, (state, action) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        state.isAuthChecked = true
        state.lastError = "ошибка"
        if (action.payload) {
          if (typeof action.payload === 'string') {
            state.lastError = action.payload
          }
        }
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.isAuthChecked = true
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.isAuthChecked = true
        state.user = action.payload
      })
  }
});

export const { setIsAuthChecked, setUser } = userSlice.actions;
export const { getIsAuthChecked, getUser } = userSlice.selectors;
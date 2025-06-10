import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  email: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email: string; token: string }>) {
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.email = null;
      state.token = null;
    },
  },
});

export const { login, setEmail, logout } = authSlice.actions;
export default authSlice.reducer;
